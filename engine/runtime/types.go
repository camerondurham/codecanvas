package runtime

import "errors"

type RunProps struct {
	RunArgs     []string `json:"run_args"`     // program arguments
	Timeout     int      `json:"timeout"`      // timeout before program is killed
	ExecutePath string   `json:"execute_path"` // path in the filesystem to execute commands in
}

// TODO: do we need this or can we just use the codehandler types?
type RunOutput struct {
	Stdout       string `json:"stdout"`
	Stderr       string `json:"stderr"`
	CommandError error  `json:"error"`
}

var (
	ErrDoesNotExist = errors.New("does not exist")
)
