package linux

import (
	"bytes"
	"context"
	"errors"
	"fmt"
	"os"
	"os/exec"
	"path/filepath"
	"runtime"
	"strconv"
	"strings"
	"sync/atomic"
	"time"

	"github.com/runner-x/runner-x/engine/sandbox"
)

var (
	ErrInvalidCommand = errors.New("sandbox input command cannot be empty")
)

type RunnerOptions struct {
	Strict bool
	// Best effort cgroup root (v2); defaults to /sys/fs/cgroup.
	CgroupRoot string
	// Binary used for namespace setup.
	UnshareBin string
	// Parent directory for per-run metadata/rootfs.
	StateRoot string
}

// Runner is the Linux sandbox implementation.
type Runner struct {
	opts    RunnerOptions
	cgroups *cgroupManager
}

func NewRunner() *Runner {
	return NewRunnerWithOptions(RunnerOptions{})
}

func NewRunnerWithOptions(opts RunnerOptions) *Runner {
	if opts.UnshareBin == "" {
		opts.UnshareBin = "unshare"
	}
	if opts.CgroupRoot == "" {
		opts.CgroupRoot = "/sys/fs/cgroup"
	}
	if opts.StateRoot == "" {
		opts.StateRoot = "/tmp/sandbox"
	}
	return &Runner{
		opts:    opts,
		cgroups: newCgroupManager(opts.CgroupRoot),
	}
}

var _ sandbox.SandboxRunner = (*Runner)(nil)

func (r *Runner) Run(input sandbox.SandboxInput, policy sandbox.SandboxPolicy) (*sandbox.SandboxOutput, error) {
	if len(input.Command) == 0 {
		return nil, ErrInvalidCommand
	}

	workDir := input.WorkDir
	if workDir == "" {
		workDir = filepath.Join(os.TempDir(), "sandbox-work-"+nextGlobalJobID())
	}
	if err := ensureWorkDir(workDir); err != nil {
		return nil, err
	}
	if err := writeSourceFiles(workDir, input.SourceFiles); err != nil {
		return nil, err
	}

	timeout := time.Second
	if policy.TimeoutSec > 0 {
		timeout = time.Duration(policy.TimeoutSec) * time.Second
	}
	ctx, cancel := context.WithTimeout(context.Background(), timeout)
	defer cancel()

	// Non-linux platforms fallback to direct execution.
	if runtime.GOOS != "linux" {
		return runDirect(ctx, input.Command, workDir)
	}

	out, err := r.runIsolated(ctx, input.Command, workDir, policy)
	if err == nil || r.opts.Strict {
		return out, err
	}

	// Best-effort fallback preserves availability while sandbox features are
	// being rolled out to environments with different privilege models.
	sandbox.DebugPrintf("sandbox fallback to direct run after isolation error: %v", err)
	return runDirect(ctx, input.Command, workDir)
}

func (r *Runner) runIsolated(ctx context.Context, cmdArgs []string, workDir string, policy sandbox.SandboxPolicy) (*sandbox.SandboxOutput, error) {
	jobID := nextGlobalJobID()
	if err := os.MkdirAll(r.opts.StateRoot, 0o755); err != nil {
		return nil, err
	}
	stateDir := filepath.Join(r.opts.StateRoot, jobID)
	rootDir := filepath.Join(stateDir, "rootfs")
	if err := os.MkdirAll(rootDir, 0o755); err != nil {
		return nil, err
	}
	defer os.RemoveAll(stateDir)

	ns := defaultNamespaceConfig(policy.EnableNet)
	useRoot := policy.ReadonlyRoot

	var args []string
	if ns.Mount {
		args = append(args, "--mount")
	}
	if ns.UTS {
		args = append(args, "--uts")
	}
	if ns.IPC {
		args = append(args, "--ipc")
	}
	if ns.PID {
		args = append(args, "--pid")
	}
	if !ns.Network {
		args = append(args, "--net")
	}
	if ns.User {
		args = append(args, "--user", "--map-root-user")
	}
	args = append(args, "--fork", "--kill-child", "--mount-proc")

	if useRoot {
		// Build a scratch-like root from selected read-only host mounts and a
		// writable /work bind mount.
		script := rootSetupScript
		args = append(args, "--", "/bin/sh", "-ceu", script, "sandbox-init", rootDir, workDir, boolToIntString(policy.ReadonlyRoot))
		args = append(args, cmdArgs...)
	} else {
		args = append(args, "--wd", workDir, "--")
		args = append(args, cmdArgs...)
	}

	cmd := exec.CommandContext(ctx, r.opts.UnshareBin, args...)
	var stdout, stderr bytes.Buffer
	cmd.Stdout = &stdout
	cmd.Stderr = &stderr

	if err := cmd.Start(); err != nil {
		return nil, err
	}

	cleanup := func() {}
	limits := limitsFromPolicy(policy)
	if cgroupCleanup, cgErr := r.cgroups.setup(jobID, limits, cmd.Process.Pid); cgErr == nil {
		cleanup = cgroupCleanup
	} else if r.opts.Strict && limits.hasAnyLimit() {
		_ = cmd.Process.Kill()
		_, _ = cmd.Process.Wait()
		return nil, cgErr
	} else if cgErr != nil {
		sandbox.DebugPrintf("cgroup setup skipped: %v", cgErr)
	}
	defer cleanup()

	err := cmd.Wait()
	exitCode := 0
	if err != nil {
		var exitErr *exec.ExitError
		if errors.As(err, &exitErr) {
			exitCode = exitErr.ExitCode()
		}
	} else if cmd.ProcessState != nil {
		exitCode = cmd.ProcessState.ExitCode()
	}

	return &sandbox.SandboxOutput{
		Stdout:   stdout.String(),
		Stderr:   stderr.String(),
		ExitCode: exitCode,
	}, err
}

func runDirect(ctx context.Context, args []string, workDir string) (*sandbox.SandboxOutput, error) {
	cmd := exec.CommandContext(ctx, args[0], args[1:]...)
	cmd.Dir = workDir

	var stdout, stderr bytes.Buffer
	cmd.Stdout = &stdout
	cmd.Stderr = &stderr

	err := cmd.Run()
	exitCode := 0
	if err != nil {
		var exitErr *exec.ExitError
		if errors.As(err, &exitErr) {
			exitCode = exitErr.ExitCode()
		}
	} else if cmd.ProcessState != nil {
		exitCode = cmd.ProcessState.ExitCode()
	}

	if errors.Is(ctx.Err(), context.DeadlineExceeded) {
		err = ctx.Err()
		if exitCode == 0 {
			exitCode = 124
		}
	}

	return &sandbox.SandboxOutput{
		Stdout:   stdout.String(),
		Stderr:   stderr.String(),
		ExitCode: exitCode,
	}, err
}

var globalJobIDSequence uint64

func nextGlobalJobID() string {
	id := atomic.AddUint64(&globalJobIDSequence, 1)
	// Include PID to avoid collisions when multiple test binaries share the same StateRoot.
	return strconv.Itoa(os.Getpid()) + "-" + strconv.FormatUint(id, 10)
}

func boolToIntString(v bool) string {
	if v {
		return "1"
	}
	return "0"
}

// rootSetupScript runs inside the unshared mount/user namespace and prepares a
// scratch-like root that still has enough runtime bits for common language
// toolchains.
var rootSetupScript = strings.TrimSpace(`
ROOT="$1"
WORK="$2"
READONLY="$3"
shift 3

mount_if_exists() {
  SRC="$1"
  DST="$2"
  if [ -e "$SRC" ]; then
    mkdir -p "$DST"
    mount --rbind "$SRC" "$DST"
  fi
}

remount_readonly_if_exists() {
  DST="$1"
  if [ -e "$DST" ]; then
    mount -o remount,bind,ro "$DST" || true
  fi
}

mount --make-rprivate /
mkdir -p "$ROOT" "$ROOT/work" "$ROOT/proc" "$ROOT/tmp"
mount_if_exists /usr "$ROOT/usr"
mount_if_exists /bin "$ROOT/bin"
mount_if_exists /sbin "$ROOT/sbin"
mount_if_exists /lib "$ROOT/lib"
mount_if_exists /lib64 "$ROOT/lib64"
mount_if_exists /run "$ROOT/run"
mount_if_exists /nix "$ROOT/nix"
mount_if_exists "$WORK" "$ROOT/work"
mount -t proc proc "$ROOT/proc"

if [ "$READONLY" = "1" ]; then
  remount_readonly_if_exists "$ROOT/usr"
  remount_readonly_if_exists "$ROOT/bin"
  remount_readonly_if_exists "$ROOT/sbin"
  remount_readonly_if_exists "$ROOT/lib"
  remount_readonly_if_exists "$ROOT/lib64"
  remount_readonly_if_exists "$ROOT/run"
  remount_readonly_if_exists "$ROOT/nix"
fi

exec chroot "$ROOT" /bin/sh -ceu 'cd /work; exec "$@"' sandbox-cmd "$@"
`)

func (r *Runner) String() string {
	return fmt.Sprintf("linux.Runner{strict=%v, unshare=%q}", r.opts.Strict, r.opts.UnshareBin)
}
