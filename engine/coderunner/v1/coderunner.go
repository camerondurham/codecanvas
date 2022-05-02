package v1

import (
	"github.com/runner-x/runner-x/engine/runtime"
)

// CodeRunner contains any state needed while CodeRunner is initialized
type CodeRunner struct {
	runner      runtime.Runtime
	workdirPath string
}

type RunnerProps struct {
	Source string   `json:"source"`
	Lang   Language `json:"language"`
}

type RunnerOutput struct {
	Stdout       string `json:"stdout"`
	Stderr       string `json:"stderr"`
	CommandError error  `json:"error"`
}
