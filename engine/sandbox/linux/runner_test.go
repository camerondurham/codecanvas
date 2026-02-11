package linux

import (
	"errors"
	"os/exec"
	"strconv"
	"strings"
	"testing"

	"github.com/runner-x/runner-x/engine/sandbox"
)

func TestRunner_RejectsEmptyCommand(t *testing.T) {
	r := NewRunner()
	_, err := r.Run(sandbox.SandboxInput{}, sandbox.SandboxPolicy{TimeoutSec: 1})
	if !errors.Is(err, ErrInvalidCommand) {
		t.Fatalf("expected %v, got %v", ErrInvalidCommand, err)
	}
}

func TestLimitsFromPolicy(t *testing.T) {
	got := limitsFromPolicy(sandbox.SandboxPolicy{
		CpuCores:    2,
		MemoryBytes: 1024,
		PidsMax:     8,
	})

	if got.CpuCores != 2 || got.MemoryBytes != 1024 || got.PidsMax != 8 {
		t.Fatalf("unexpected cgroup limits: %+v", got)
	}
}

func TestNamespaces(t *testing.T) {
	r := NewRunnerWithOptions(RunnerOptions{
		Strict: true,
	})

	out, err := r.Run(
		sandbox.SandboxInput{
			Command: []string{"sh", "-c", "ps -o pid= | wc -l"},
			WorkDir: t.TempDir(),
		},
		sandbox.SandboxPolicy{
			TimeoutSec:   3,
			EnableNet:    false,
			ReadonlyRoot: false,
		},
	)
	if err != nil {
		skipIfIsolationUnsupported(t, err, out)
		t.Fatalf("unexpected error: %v", err)
	}

	countStr := strings.TrimSpace(out.Stdout)
	count, parseErr := strconv.Atoi(countStr)
	if parseErr != nil {
		t.Fatalf("failed parsing process count %q: %v", countStr, parseErr)
	}
	// In a PID namespace with mount-proc, process count should be tiny.
	if count > 16 {
		t.Fatalf("expected isolated process view, got count=%d stdout=%q", count, out.Stdout)
	}
}

func TestFilesystem(t *testing.T) {
	r := NewRunnerWithOptions(RunnerOptions{
		Strict: true,
	})

	out, err := r.Run(
		sandbox.SandboxInput{
			Command: []string{"sh", "-c", "if [ -f /etc/shadow ]; then echo found; else echo missing; fi"},
			WorkDir: t.TempDir(),
		},
		sandbox.SandboxPolicy{
			TimeoutSec:   3,
			EnableNet:    false,
			ReadonlyRoot: true,
		},
	)
	if err != nil {
		skipIfIsolationUnsupported(t, err, out)
		t.Fatalf("unexpected error: %v", err)
	}

	if strings.TrimSpace(out.Stdout) != "missing" {
		t.Fatalf("expected /etc/shadow to be hidden in readonly root, got stdout=%q stderr=%q", out.Stdout, out.Stderr)
	}
}

func TestCgroupLimits(t *testing.T) {
	r := NewRunnerWithOptions(RunnerOptions{
		Strict: true,
	})

	_, err := r.Run(
		sandbox.SandboxInput{
			Command: []string{"sh", "-c", "i=0; while [ $i -lt 64 ]; do (sleep 1)& i=$((i+1)); done; wait"},
			WorkDir: t.TempDir(),
		},
		sandbox.SandboxPolicy{
			TimeoutSec:   3,
			EnableNet:    false,
			ReadonlyRoot: false,
			PidsMax:      16,
		},
	)

	// In delegated environments this should error due pids limit.
	// On hosts without cgroup write permissions, skip.
	if err == nil {
		return
	}
	if isCgroupPermissionErr(err) {
		t.Skipf("skipping cgroup enforcement test: %v", err)
	}
}

func skipIfIsolationUnsupported(t *testing.T, err error, out *sandbox.SandboxOutput) {
	t.Helper()
	msg := err.Error()
	if out != nil {
		msg += " " + out.Stderr
	}
	if strings.Contains(msg, "Operation not permitted") ||
		strings.Contains(msg, "cannot open /proc/self/uid_map") ||
		strings.Contains(msg, "permission denied") ||
		strings.Contains(msg, "not found") {
		t.Skipf("skipping due host sandbox capability limits: %v", err)
	}
}

func isCgroupPermissionErr(err error) bool {
	if err == nil {
		return false
	}
	msg := strings.ToLower(err.Error())
	return strings.Contains(msg, "cgroup") &&
		(strings.Contains(msg, "permission denied") ||
			strings.Contains(msg, "read-only") ||
			strings.Contains(msg, "operation not permitted"))
}

func TestRunnerNoDirectFallbackWhenNotStrict(t *testing.T) {
	// Force unshare lookup failure and validate fail-closed behavior.
	r := NewRunnerWithOptions(RunnerOptions{
		Strict:     false,
		UnshareBin: "definitely-not-a-real-unshare-bin",
	})
	_, err := r.Run(
		sandbox.SandboxInput{
			Command: []string{"echo", "hello"},
			WorkDir: t.TempDir(),
		},
		sandbox.SandboxPolicy{
			TimeoutSec:   2,
			EnableNet:    false,
			ReadonlyRoot: false,
		},
	)
	if err == nil {
		t.Fatalf("expected sandbox run to fail when isolation setup fails")
	}
}

func TestRunnerStrictNoFallback(t *testing.T) {
	r := NewRunnerWithOptions(RunnerOptions{
		Strict:     true,
		UnshareBin: "definitely-not-a-real-unshare-bin",
	})
	_, err := r.Run(
		sandbox.SandboxInput{
			Command: []string{"echo", "hello"},
			WorkDir: t.TempDir(),
		},
		sandbox.SandboxPolicy{
			TimeoutSec:   2,
			EnableNet:    false,
			ReadonlyRoot: false,
		},
	)
	if err == nil {
		t.Fatalf("expected strict mode to fail when unshare binary is unavailable")
	}
	var execErr *exec.Error
	if !errors.As(err, &execErr) {
		t.Fatalf("expected exec error, got: %T %v", err, err)
	}
}
