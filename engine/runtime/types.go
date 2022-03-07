package runtime

import (
	"context"
	"golang.org/x/sys/unix"
	"os/exec"
)

type Runtime interface {
	RunCmd(runprops *RunProps) (*RunOutput, error)
}

type RuntimeAgent struct {
	id       string
	provider ArgProvider
}

type RunProps struct {
	RunArgs []string `json:"run_args"` // program arguments
	Timeout int      `json:"timeout"`  // timeout before program is killed
	Uid     int      `json:"uid"`
	Gid     int      `json:"gid"`
	Nprocs  int      `json:"nprocs"`
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

type ArgProvider interface {
	Provide(ctx *context.Context, runprops *RunProps) *exec.Cmd
}

// ProcessorArgsProvider wraps commands to pass to the process CLI
type ProcessorArgsProvider struct{}

// NilProvider returns the args provided
type NilProvider struct{}

// Limiter interface applies resource limits in a Linux environment
type Limiter interface {
	ApplyLimits(rlimits *ResourceLimits) error
}

// OnSelf is used for setting Linux resource limits
type OnSelf struct{}

// NilLimiter has no effect and is used for testing
type NilLimiter struct{}
