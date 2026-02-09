package linux

import (
	"errors"
	"testing"

	"github.com/runner-x/runner-x/engine/sandbox"
)

func TestRunner_RunNotImplemented(t *testing.T) {
	r := NewRunner()

	_, err := r.Run(
		sandbox.SandboxInput{Command: []string{"echo", "hello"}},
		sandbox.SandboxPolicy{TimeoutSec: 1},
	)
	if !errors.Is(err, ErrNotImplemented) {
		t.Fatalf("expected %v, got %v", ErrNotImplemented, err)
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
