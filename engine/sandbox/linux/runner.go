package linux

import (
	"errors"

	"github.com/runner-x/runner-x/engine/sandbox"
)

var ErrNotImplemented = errors.New("linux sandbox runner not implemented")

// Runner is the Linux sandbox implementation placeholder.
type Runner struct{}

func NewRunner() *Runner {
	return &Runner{}
}

var _ sandbox.SandboxRunner = (*Runner)(nil)

func (r *Runner) Run(input sandbox.SandboxInput, policy sandbox.SandboxPolicy) (*sandbox.SandboxOutput, error) {
	_ = input
	_ = policy
	return nil, ErrNotImplemented
}
