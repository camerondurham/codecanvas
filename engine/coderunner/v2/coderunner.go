package v2

import (
	"github.com/runner-x/runner-x/engine/controller"
	"github.com/runner-x/runner-x/engine/sandbox"
)

type CodeRunner struct {
	controller    controller.Controller
	numRunners    uint
	sandboxRunner sandbox.Runner
	sandboxPolicy sandbox.Policy
	sandboxImages map[string]string
	sandboxSlots  chan struct{}
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

type SandboxConfig struct {
	Runner         sandbox.Runner
	Policy         sandbox.Policy
	Images         map[string]string
	MaxConcurrency int
}
