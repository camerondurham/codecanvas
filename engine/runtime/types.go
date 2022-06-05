package runtime

type Runtime interface {
	// RunCmd will try to run the command immediately
	RunCmd(runprops *RunProps) (*RunOutput, error)

	// SafeRunCmd should verify no other command is being run by the agent/worker
	SafeRunCmd(props *RunProps) (*RunOutput, error)
	IsReady() bool
	RuntimeUid() int
	RuntimeGid() int
}

type FileProps struct {
	Filename string
	Data     string
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
	RunArgs   []string `json:"run_args"` // program arguments
	Timeout   int      `json:"timeout"`  // timeout before program is killed
	Uid       int      `json:"uid"`      // TODO: remove, only the runtime agent itself should care about the uid and this should be overridden
	Gid       int      `json:"gid"`      // TODO: remove, same as above
	Nprocs    int      `json:"nprocs"`
	Fsize     int      `json:"fsize"`
	Cputime   int      `json:"cputime"`
	Stacksize int      `json:"stacksize"`
}

// TODO: add additional context to exited command
type RunOutput struct {
	Stdout string `json:"stdout"`
	Stderr string `json:"stderr"`
}
