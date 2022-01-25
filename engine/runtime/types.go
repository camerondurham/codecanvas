package runtime

type RunProps struct {
	RunArgs []string `json:"run_args"` // program arguments
	Timeout int      `json:"timeout"`  // timeout before program is killed
}

// TODO: add additional context to exited command
type RunOutput struct {
	Stdout string `json:"stdout"`
	Stderr string `json:"stderr"`
}
