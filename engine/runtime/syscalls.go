//go:build linux
// +build linux

package runtime

// This package will only build on linux, requires the Linux (not FreeBDS or Windows) syscalls such as prlimit
// More info on build directives: https://pkg.go.dev/go/build

import (
	"golang.org/x/sys/unix"
)

type ResourceLimits struct {
	NumProcesses *unix.Rlimit
	MaxFileSize  *unix.Rlimit
}

// prlimit syscall: https://linux.die.net/man/2/prlimit
func ApplyLimits(pid int, rlimits *ResourceLimits) {
	// set process limit
	unix.Prlimit(pid, unix.RLIMIT_NPROC, rlimits.NumProcesses, nil)

	// set max file size process can create
	unix.Prlimit(pid, unix.RLIMIT_FSIZE, rlimits.MaxFileSize, nil)
}
