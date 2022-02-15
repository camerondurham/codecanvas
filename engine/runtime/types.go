package runtime

import "syscall"

// type POSIXRlimit struct {
// 	// Type of the rlimit to set
// 	Type string `json:"type"`
// 	// Hard is the hard limit for the specified type
// 	Hard uint64 `json:"hard"`
// 	// Soft is the soft limit for the specified type
// 	Soft uint64 `json:"soft"`
// }

type Runtime interface {
	RunCmd(runprops *RunProps) (*RunOutput, error)
}

type RuntimeAgent struct {
	id string
}

type RunProps struct {
	RunArgs []string `json:"run_args"` // program arguments
	Timeout int      `json:"timeout"`  // timeout before program is killed
	Root string `json:"root,omitempty"` // path to root filesystem
	// Rlimits []POSIXRlimit `json:"rlimits,omitempty"` // RLIMIT_NPROC, RLIMIT_FSIZE, RLIMIT_CPU
	Rlimits []syscall.Rlimit
	Hostname string `json:"hostname,omitempty"` // the hostname of the container (this isn't in the spec)
}

// TODO: add additional context to exited command
type RunOutput struct {
	Stdout string `json:"stdout"`
	Stderr string `json:"stderr"`
}
