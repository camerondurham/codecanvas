package v2

import (
	"github.com/runner-x/runner-x/engine/controller"
	"github.com/runner-x/runner-x/engine/runtime"
)

const TimeoutDefault = 1

func (cr *CodeRunner) Run(props *RunnerProps) (*RunnerOutput, error) {

	// TODO: parse language and get compile commands
	language := LangNameToLangMap[props.Lang]
	compileCommands := &runtime.RunProps{
		RunArgs: language.CompileCmd,
		Timeout: TimeoutDefault,
	}
	runCommands := language.RunCmd

	// TODO: write the file????
	// TODO: actually use the right Uid and Gid and Nprocs????
	runtimeProps := &runtime.RunProps{
		RunArgs: runCommands,
		Timeout: TimeoutDefault,
		Uid:     0,
		Gid:     0,
		Nprocs:  0,
	}
	runOut := cr.controller.SubmitRequest(&controller.Props{
		PreRunProps: compileCommands,
		RunProps:    runtimeProps,
	})

	// This run command will fail if the controller has an error.
	// For example, controller can have no runners left
	// in this case, we should probably fail all new run requests quickly
	// and avoid overloading the server with a long list of open threads
	// waiting to run some job.
	if runOut.ControllerErr != nil {
		return nil, runOut.ControllerErr
	}

	// If the command has an error, we want to return this to the user.
	// The user really doesn't care about the internal errors they just want to run their code.
	return &RunnerOutput{
		Stdout:       runOut.RunOutput.Stdout,
		Stderr:       runOut.RunOutput.Stderr,
		CommandError: runOut.CommandErr,
	}, nil
}
