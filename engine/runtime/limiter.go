//go:build linux || darwin
// +build linux darwin

package runtime

// This package will only build on linux, requires the Linux (not FreeBDS or Windows) syscalls such as prlimit
// More info on build directives: https://pkg.go.dev/go/build

import (
	"fmt"
	"runtime"

	"github.com/runner-x/runner-x/util/print"
	"golang.org/x/sys/unix"
)

// Limiter interface applies resource limits in a Linux environment
type Limiter interface {
	ApplyLimits(rlimits *ResourceLimits) error
}

type ResourceLimits struct {
	// TODO: merge or reuse limits with types from #36 PRs
	NumProcesses *unix.Rlimit
	MaxFileSize  *unix.Rlimit
	MaxCpuTime   *unix.Rlimit
	MaxStackSize *unix.Rlimit
}

// OnSelf is used for setting Linux resource limits
type OnSelf struct{}

// NilLimiter has no effect and is used for testing
type NilLimiter struct{}

func NewLimiterOnSelf() *OnSelf {
	return &OnSelf{}
}

func (s *OnSelf) ApplyLimits(rlimits *ResourceLimits) error {
	switch runtime.GOOS {
	case "darwin":
		print.DebugPrintf("skip applying limits on Darwin")
		return nil
	case "linux":
		return applyLimitsLinux(rlimits)
	}
	return nil
}

func applyLimitsLinux(rlimits *ResourceLimits) error {
	// setrlimit syscall sets resource limits for the current process
	err := unix.Setrlimit(unix.RLIMIT_NPROC, rlimits.NumProcesses)
	if err != nil {
		fmt.Printf("error setting NPROC rlimit: %v", err)
		return err
	}

	err = unix.Setrlimit(unix.RLIMIT_FSIZE, rlimits.MaxFileSize)
	if err != nil {
		fmt.Printf("error setting FSIZE rlimit: %v", err)
		return err
	}

	err = unix.Setrlimit(unix.RLIMIT_CPU, rlimits.MaxCpuTime)
	if err != nil {
		fmt.Printf("error setting CPU rlimit: %v", err)
		return err
	}

	err = unix.Setrlimit(unix.RLIMIT_STACK, rlimits.MaxStackSize)
	if err != nil {
		fmt.Printf("error setting STACK rlimit: %v", err)
		return err
	}

	return nil
}

func (n *NilLimiter) ApplyLimits(rlimits *ResourceLimits) error {
	// this is just for unit tests that isolate to just runtime tests
	return nil
}
