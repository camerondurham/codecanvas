package docker

import (
	"archive/tar"
	"bytes"
	"context"
	"crypto/rand"
	"encoding/hex"
	"encoding/json"
	"errors"
	"fmt"
	"os/exec"
	"path"
	"path/filepath"
	"strconv"
	"strings"
	"time"

	"github.com/runner-x/runner-x/engine/sandbox"
)

const (
	DefaultDockerPath       = "docker"
	DefaultContainerWorkDir = "/work"
	DefaultTimeoutSec       = 2
	DefaultCPUs             = "1"
	DefaultMemory           = "128m"
	DefaultPidsLimit        = 64
	DefaultUser             = "65532:65532"
	DefaultNoFileLimit      = "64:64"
	DefaultOutputLimitBytes = 128000
	DefaultPullPolicy       = "never"
	DefaultWorkDirSize      = "16m"
	runnerScriptName        = ".codecanvas-run.sh"
)

type Runner struct {
	DockerPath string
	ParentDir  string
}

func NewRunner(parentDir string) *Runner {
	return &Runner{
		DockerPath: DefaultDockerPath,
		ParentDir:  parentDir,
	}
}

func (r *Runner) Preflight(ctx context.Context, policy sandbox.Policy, images []string) error {
	policy = normalizePolicy(policy)
	docker := dockerPath(r)

	if output, err := exec.CommandContext(ctx, docker, "version", "--format", "{{.Server.Version}}").CombinedOutput(); err != nil {
		return fmt.Errorf("docker daemon unavailable: %w: %s", err, strings.TrimSpace(string(output)))
	}

	if len(policy.Runtime) > 0 {
		if err := ensureRuntimeAvailable(ctx, docker, policy.Runtime); err != nil {
			return err
		}
	}

	if shouldInspectImagesInPreflight(policy) {
		for _, image := range uniqueStrings(images) {
			if len(image) == 0 {
				continue
			}
			if output, err := exec.CommandContext(ctx, docker, "image", "inspect", image).CombinedOutput(); err != nil {
				return fmt.Errorf("sandbox image %q is unavailable locally: %w: %s", image, err, strings.TrimSpace(string(output)))
			}
		}
	}

	return nil
}

func (r *Runner) Run(ctx context.Context, job sandbox.Job, policy sandbox.Policy) (*sandbox.Output, error) {
	if len(job.Image) == 0 {
		return nil, errors.New("sandbox image is required")
	}
	if len(job.Steps) == 0 {
		return nil, errors.New("sandbox job must include at least one command step")
	}

	policy = normalizePolicy(policy)

	script, err := scriptForSteps(job.Steps)
	if err != nil {
		return nil, err
	}

	archive, err := buildJobArchive(job, script, runnerScriptName)
	if err != nil {
		return nil, err
	}

	containerName := containerName(job.ID)
	args := BuildDockerArgs(job, policy, runnerScriptName, containerName)

	runCtx, cancel := context.WithTimeout(ctx, time.Duration(policy.TimeoutSec)*time.Second)
	defer cancel()

	var stdout cappedBuffer
	var stderr cappedBuffer
	stdout.limit = policy.OutputLimitBytes
	stderr.limit = policy.OutputLimitBytes

	cmd := exec.CommandContext(runCtx, dockerPath(r), args...)
	cmd.Stdin = bytes.NewReader(archive)
	cmd.Stdout = &stdout
	cmd.Stderr = &stderr

	err = cmd.Run()
	out := &sandbox.Output{
		Stdout:          stdout.String(),
		Stderr:          stderr.String(),
		ExitCode:        exitCode(err),
		TimedOut:        runCtx.Err() == context.DeadlineExceeded,
		StdoutTruncated: stdout.truncated,
		StderrTruncated: stderr.truncated,
	}

	if runCtx.Err() != nil {
		cleanupContainer(dockerPath(r), containerName)
	}
	if out.TimedOut {
		return out, fmt.Errorf("sandbox timed out after %d seconds", policy.TimeoutSec)
	}

	return out, err
}

func BuildDockerArgs(job sandbox.Job, policy sandbox.Policy, scriptName, containerName string) []string {
	policy = normalizePolicy(policy)
	containerWorkDir := policy.WorkDir
	scriptPath := path.Join(containerWorkDir, scriptName)
	setupAndRun := fmt.Sprintf("tar -C %s -xf - && /bin/sh %s", shellQuote(containerWorkDir), shellQuote(scriptPath))

	args := []string{
		"run",
		"--rm",
		"--interactive",
		"--init",
		"--name", containerName,
		"--label", "codecanvas.sandbox=true",
		"--pull", policy.PullPolicy,
		"--hostname", "codecanvas-sandbox",
		"--ipc", "none",
		"--cpus", policy.CPUs,
		"--memory", policy.Memory,
		"--memory-swap", policy.Memory,
		"--pids-limit", strconv.Itoa(policy.PidsLimit),
		"--ulimit", "nofile=" + policy.NoFileLimit,
		"--user", policy.User,
		"--cap-drop", "ALL",
		"--security-opt", "no-new-privileges",
		"--tmpfs", "/tmp:rw,nosuid,nodev,size=64m",
		"--tmpfs", fmt.Sprintf("%s:rw,nosuid,nodev,size=%s,mode=1777", containerWorkDir, policy.WorkDirSize),
		"--workdir", containerWorkDir,
		"--env", "HOME=/tmp",
		"--env", "TMPDIR=/tmp",
		"--env", "GOCACHE=/tmp/go-cache",
		"--env", "GOMODCACHE=/tmp/go-mod",
		"--env", "CARGO_HOME=/tmp/cargo",
	}

	if len(policy.Runtime) > 0 {
		args = append(args, "--runtime", policy.Runtime)
	}
	if len(policy.SeccompProfile) > 0 {
		args = append(args, "--security-opt", "seccomp="+policy.SeccompProfile)
	}
	if !policy.EnableNetwork {
		args = append(args, "--network", "none")
	}
	if !policy.WritableRoot {
		args = append(args, "--read-only")
	}

	args = append(args, job.Image, "/bin/sh", "-c", setupAndRun)
	return args
}

func normalizePolicy(policy sandbox.Policy) sandbox.Policy {
	if policy.TimeoutSec <= 0 {
		policy.TimeoutSec = DefaultTimeoutSec
	}
	if len(policy.CPUs) == 0 {
		policy.CPUs = DefaultCPUs
	}
	if len(policy.Memory) == 0 {
		policy.Memory = DefaultMemory
	}
	if policy.PidsLimit <= 0 {
		policy.PidsLimit = DefaultPidsLimit
	}
	if len(policy.User) == 0 {
		policy.User = DefaultUser
	}
	if len(policy.WorkDir) == 0 {
		policy.WorkDir = DefaultContainerWorkDir
	}
	if len(policy.WorkDirSize) == 0 {
		policy.WorkDirSize = DefaultWorkDirSize
	}
	if len(policy.NoFileLimit) == 0 {
		policy.NoFileLimit = DefaultNoFileLimit
	}
	if policy.OutputLimitBytes <= 0 {
		policy.OutputLimitBytes = DefaultOutputLimitBytes
	}
	if len(policy.PullPolicy) == 0 {
		policy.PullPolicy = DefaultPullPolicy
	}
	return policy
}

func shouldInspectImagesInPreflight(policy sandbox.Policy) bool {
	return normalizePolicy(policy).PullPolicy == "never"
}

func ensureRuntimeAvailable(ctx context.Context, dockerPath, runtimeName string) error {
	output, err := exec.CommandContext(ctx, dockerPath, "info", "--format", "{{json .Runtimes}}").CombinedOutput()
	if err != nil {
		return fmt.Errorf("unable to inspect docker runtimes: %w: %s", err, strings.TrimSpace(string(output)))
	}

	runtimes := map[string]interface{}{}
	if err := json.Unmarshal(bytes.TrimSpace(output), &runtimes); err != nil {
		return fmt.Errorf("unable to parse docker runtimes: %w: %s", err, strings.TrimSpace(string(output)))
	}
	if _, ok := runtimes[runtimeName]; !ok {
		return fmt.Errorf("requested sandbox runtime %q is not registered with docker", runtimeName)
	}
	return nil
}

func uniqueStrings(values []string) []string {
	seen := map[string]bool{}
	unique := make([]string, 0, len(values))
	for _, value := range values {
		if seen[value] {
			continue
		}
		seen[value] = true
		unique = append(unique, value)
	}
	return unique
}

func buildJobArchive(job sandbox.Job, script string, scriptName string) ([]byte, error) {
	var buf bytes.Buffer
	writer := tar.NewWriter(&buf)
	createdDirs := map[string]bool{}

	for name, data := range job.Files {
		cleanName, err := cleanRelativePath(name)
		if err != nil {
			_ = writer.Close()
			return nil, err
		}
		if err := writeArchiveFile(writer, createdDirs, filepath.ToSlash(cleanName), data, 0644); err != nil {
			_ = writer.Close()
			return nil, err
		}
	}

	if err := writeArchiveFile(writer, createdDirs, scriptName, []byte(script), 0755); err != nil {
		_ = writer.Close()
		return nil, err
	}
	if err := writer.Close(); err != nil {
		return nil, err
	}
	return buf.Bytes(), nil
}

func writeArchiveFile(writer *tar.Writer, createdDirs map[string]bool, name string, data []byte, mode int64) error {
	if err := writeArchiveDirs(writer, createdDirs, path.Dir(name)); err != nil {
		return err
	}
	if err := writer.WriteHeader(&tar.Header{
		Name: name,
		Mode: mode,
		Size: int64(len(data)),
	}); err != nil {
		return err
	}
	_, err := writer.Write(data)
	return err
}

func writeArchiveDirs(writer *tar.Writer, createdDirs map[string]bool, dir string) error {
	if dir == "." || len(dir) == 0 {
		return nil
	}
	parts := strings.Split(dir, "/")
	current := ""
	for _, part := range parts {
		if len(part) == 0 {
			continue
		}
		if len(current) == 0 {
			current = part
		} else {
			current = path.Join(current, part)
		}
		if createdDirs[current] {
			continue
		}
		if err := writer.WriteHeader(&tar.Header{
			Name:     current + "/",
			Typeflag: tar.TypeDir,
			Mode:     0755,
		}); err != nil {
			return err
		}
		createdDirs[current] = true
	}
	return nil
}

func cleanRelativePath(name string) (string, error) {
	if len(name) == 0 {
		return "", errors.New("sandbox file name cannot be empty")
	}
	if filepath.IsAbs(name) || strings.HasPrefix(name, "/") || strings.HasPrefix(name, `\`) {
		return "", fmt.Errorf("sandbox file path must be relative: %s", name)
	}
	cleanName := filepath.Clean(name)
	if cleanName == "." || cleanName == ".." || strings.HasPrefix(cleanName, ".."+string(filepath.Separator)) {
		return "", fmt.Errorf("sandbox file path escapes workdir: %s", name)
	}
	return cleanName, nil
}

func scriptForSteps(steps []sandbox.Command) (string, error) {
	var b strings.Builder
	b.WriteString("#!/bin/sh\n")
	b.WriteString("set -e\n")

	for _, step := range steps {
		if len(step.Args) == 0 {
			return "", errors.New("sandbox command step cannot be empty")
		}
		b.WriteString(shellCommand(step.Args))
		b.WriteString("\n")
	}

	return b.String(), nil
}

func shellCommand(args []string) string {
	quoted := make([]string, len(args))
	for i, arg := range args {
		quoted[i] = shellQuote(arg)
	}
	return strings.Join(quoted, " ")
}

func shellQuote(s string) string {
	if len(s) == 0 {
		return "''"
	}
	return "'" + strings.ReplaceAll(s, "'", "'\"'\"'") + "'"
}

func dockerPath(r *Runner) string {
	if r != nil && len(r.DockerPath) > 0 {
		return r.DockerPath
	}
	return DefaultDockerPath
}

func containerName(jobID string) string {
	suffix := jobID
	if len(suffix) == 0 {
		var b [8]byte
		if _, err := rand.Read(b[:]); err == nil {
			suffix = hex.EncodeToString(b[:])
		} else {
			suffix = strconv.FormatInt(time.Now().UnixNano(), 10)
		}
	}
	return "codecanvas-" + sanitizeContainerName(suffix)
}

func sanitizeContainerName(s string) string {
	var b strings.Builder
	for _, r := range s {
		switch {
		case r >= 'a' && r <= 'z':
			b.WriteRune(r)
		case r >= 'A' && r <= 'Z':
			b.WriteRune(r)
		case r >= '0' && r <= '9':
			b.WriteRune(r)
		case r == '_' || r == '-' || r == '.':
			b.WriteRune(r)
		default:
			b.WriteRune('-')
		}
	}
	out := strings.Trim(b.String(), "-_.")
	if len(out) == 0 {
		return "job"
	}
	return out
}

func cleanupContainer(dockerPath, name string) {
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()
	_ = exec.CommandContext(ctx, dockerPath, "rm", "-f", name).Run()
}

func exitCode(err error) int {
	if err == nil {
		return 0
	}
	if exitErr, ok := err.(*exec.ExitError); ok {
		return exitErr.ExitCode()
	}
	return -1
}

type cappedBuffer struct {
	buf       bytes.Buffer
	limit     int64
	truncated bool
}

func (w *cappedBuffer) Write(p []byte) (int, error) {
	if w.limit <= 0 {
		return len(p), nil
	}

	remaining := w.limit - int64(w.buf.Len())
	if remaining > 0 {
		toWrite := p
		if int64(len(toWrite)) > remaining {
			toWrite = p[:remaining]
		}
		_, _ = w.buf.Write(toWrite)
	}
	if int64(len(p)) > remaining {
		w.truncated = true
	}
	return len(p), nil
}

func (w *cappedBuffer) String() string {
	return w.buf.String()
}
