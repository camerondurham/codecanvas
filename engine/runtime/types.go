package runtime

import (
	"context"
	"golang.org/x/sys/unix"
	"os/exec"
	"sync"
)

type Runtime interface {
	// RunCmd will try to run the command immediately
	RunCmd(runprops *RunProps) (*RunOutput, error)

	// SafeRunCmd should verify no other command is being run by the agent/worker
	SafeRunCmd(props *RunProps) (*RunOutput, error)
	IsReady() bool
	RuntimeUid() int
	RuntimeGid() int
}

// RuntimeAgent struct stores metadata to execute user code with restricted host resources
type RuntimeAgent struct {
	Id       string
	Provider ArgProvider
	Uid      int
	Gid      int

	// rwmutex restricts access to running code with the RuntimeAgent
	rwmutex sync.RWMutex
	state   State
}

// State represents whether the worker is ready for another job or not
type State uint32

const (
	// Ready means ready to run another job and no other jobs are currently running
	Ready = State(0)

	// NotReady means not ready to run another job since agent is running request or cleaning up from a finished job
	NotReady = State(1)
)

type RunProps struct {
	RunArgs []string `json:"run_args"` // program arguments
	Timeout int      `json:"timeout"`  // timeout before program is killed
	Uid     int      `json:"uid"`      // TODO: remove, only the runtime agent itself should care about the uid and this should be overridden
	Gid     int      `json:"gid"`      // TODO: remove, same as above
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
