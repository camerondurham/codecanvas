package sandbox

import "testing"

type fakeRunner struct {
	out       *SandboxOutput
	err       error
	lastInput SandboxInput
	lastPol   SandboxPolicy
}

func (f *fakeRunner) Run(input SandboxInput, policy SandboxPolicy) (*SandboxOutput, error) {
	f.lastInput = input
	f.lastPol = policy
	return f.out, f.err
}

func TestSandboxRunnerContract(t *testing.T) {
	r := &fakeRunner{
		out: &SandboxOutput{
			Stdout:   "ok",
			Stderr:   "",
			ExitCode: 0,
		},
	}

	input := SandboxInput{
		SourceFiles: map[string][]byte{"run.py": []byte("print('ok')")},
		WorkDir:     "/work",
		Command:     []string{"python3", "run.py"},
	}

	policy := SandboxPolicy{
		CpuCores:     1,
		MemoryBytes:  64 << 20,
		PidsMax:      16,
		TimeoutSec:   2,
		EnableNet:    false,
		ReadonlyRoot: true,
	}

	out, err := r.Run(input, policy)
	if err != nil {
		t.Fatalf("unexpected error: %v", err)
	}
	if out == nil || out.Stdout != "ok" || out.ExitCode != 0 {
		t.Fatalf("unexpected output: %+v", out)
	}
	if r.lastInput.WorkDir != "/work" {
		t.Fatalf("unexpected recorded workdir: %q", r.lastInput.WorkDir)
	}
	if r.lastPol.PidsMax != 16 {
		t.Fatalf("unexpected recorded pids limit: %d", r.lastPol.PidsMax)
	}
}
