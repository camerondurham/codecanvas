package sandbox

// SandboxPolicy captures runtime restrictions for a sandboxed command.
type SandboxPolicy struct {
	CpuCores     int
	MemoryBytes  int64
	PidsMax      int
	TimeoutSec   int
	EnableNet    bool
	ReadonlyRoot bool
}

// SandboxInput describes what to execute inside the sandbox.
type SandboxInput struct {
	SourceFiles map[string][]byte
	WorkDir     string
	Command     []string
}

// SandboxOutput is the normalized command result returned to callers.
type SandboxOutput struct {
	Stdout   string
	Stderr   string
	ExitCode int
}

// SandboxRunner is the primary abstraction for isolated execution.
type SandboxRunner interface {
	Run(input SandboxInput, policy SandboxPolicy) (*SandboxOutput, error)
}
