package v2

import (
	"github.com/runner-x/runner-x/engine/controller"
	"github.com/runner-x/runner-x/engine/controller/writerremover"
	"github.com/runner-x/runner-x/engine/runtime"
	print2 "github.com/runner-x/runner-x/util/print"
)

const TimeoutDefault = 1

func NewCodeRunner(numRunners uint, argProvider runtime.ArgProvider, parentDir, pattern string) *CodeRunner {
	ctrl := controller.NewAsyncController(numRunners, argProvider, parentDir, pattern)
	return &CodeRunner{
		controller: ctrl,
		numRunners: numRunners,
	}
}

func (cr *CodeRunner) Run(props *RunnerProps) (*RunnerOutput, error) {

	language := LangNameToLangMap[props.Lang]
	compileCommands := &runtime.RunProps{
		RunArgs: language.CompileCmd,
		Timeout: TimeoutDefault,
		Nprocs:  20,
	}
	runCommands := language.RunCmd

	// TODO: actually use the right Uid and Gid and Nprocs????
	runtimeProps := &runtime.RunProps{
		RunArgs: runCommands,
		Timeout: TimeoutDefault,
	}
	print2.DebugPrintf("writing file: %v", props.Source)
	print2.DebugPrintf("compile commands: %v", compileCommands.RunArgs)
	print2.DebugPrintf("run commands: %v", runtimeProps.RunArgs)
	runOut := cr.controller.SubmitRequest(&controller.Props{
		Data:        writerremover.NewBlob([]byte(props.Source), "run"+FileExtensionToLangMap[props.Lang].FileExtension),
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
