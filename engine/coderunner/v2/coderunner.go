package v2

import "github.com/runner-x/runner-x/engine/controller"

type CodeRunner struct {
	controller controller.Controller
	numRunners int
}

type Runner interface {
	Run(props *RunnerProps) (*RunnerOutput, error)
}

type RunnerProps struct {
	Source string `json:"source"`
	Lang   string `json:"language"`
}

type RunnerOutput struct {
	Stdout       string `json:"stdout"`
	Stderr       string `json:"stderr"`
	CommandError error  `json:"error"`
}
