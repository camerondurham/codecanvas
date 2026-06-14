package sandbox

import "context"

type Command struct {
	Args []string
}

type Job struct {
	ID    string
	Image string
	Files map[string][]byte
	Steps []Command
}

type Policy struct {
	TimeoutSec       int
	CPUs             string
	Memory           string
	PidsLimit        int
	EnableNetwork    bool
	WritableRoot     bool
	Runtime          string
	User             string
	WorkDir          string
	WorkDirSize      string
	NoFileLimit      string
	SeccompProfile   string
	OutputLimitBytes int64
	PullPolicy       string
}

type Output struct {
	Stdout          string
	Stderr          string
	ExitCode        int
	TimedOut        bool
	StdoutTruncated bool
	StderrTruncated bool
}

type Runner interface {
	Run(ctx context.Context, job Job, policy Policy) (*Output, error)
}
