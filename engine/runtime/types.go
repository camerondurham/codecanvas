package runtime

import "golang.org/x/sys/unix"

type Runtime interface {
	RunCmd(runprops *RunProps) (*RunOutput, error)
}

type RuntimeAgent struct {
	id string
}

type RunProps struct {
	RunArgs []string `json:"run_args"` // program arguments
	Timeout int      `json:"timeout"`  // timeout before program is killed
}

// TODO: add additional context to exited command
type RunOutput struct {
	Stdout string `json:"stdout"`
	Stderr string `json:"stderr"`
}

type ResourceLimits struct {
	// TODO: merge or reuse limits with types from #36 PRs
	NumProcesses *unix.Rlimit
	MaxFileSize  *unix.Rlimit
}

type Limiter interface {
	ApplyLimits(rlimits *ResourceLimits) error
}

type OnSelf struct{}
type NilLimiter struct{}
