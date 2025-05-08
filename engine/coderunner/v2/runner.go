package v2

import (
	"github.com/runner-x/runner-x/engine/controller"
	"github.com/runner-x/runner-x/engine/controller/writerremover"
	"github.com/runner-x/runner-x/engine/runtime"
	print2 "github.com/runner-x/runner-x/util/print"
)

func NewCodeRunner(numRunners uint, argProvider runtime.ArgProvider, parentDir, pattern string) CodeRunner {
	ctrl := controller.NewAsyncController(numRunners, argProvider, parentDir, pattern)
	return CodeRunner{
		controller: ctrl,
		numRunners: numRunners,
	}
}

func (cr *CodeRunner) Run(props *RunnerProps) (*RunnerOutput, error) {

	language := LangNameToLangMap[props.Lang]
	filename := "run" + language.FileExtension
	compileCmd := language.CompileCmd
	if language.CompileCmd != nil {
		compileCmd = append(compileCmd, filename)
	}

	compileCommands := &runtime.RunProps{
		RunArgs:   compileCmd,
		Timeout:   runtime.DefaultTimeout,
		Nprocs:    runtime.DefaultNproc,
		Fsize:     runtime.DefaultCompileFsize,
		Stacksize: runtime.DefaultCompileStackSize,
		Cputime:   runtime.DefaultCputime,
	}

	// Language-specific modifications
	// Rust has large binaries, even for simple applications
	//
	// ... is there a better way to do this without switching on names?
	switch language.Name {
	case "rust":
		compileCommands.Fsize = 1 << 25 // 32 mB
	}

	runCommands := language.RunCmd
	if language.CompileCmd == nil || len(language.CompileCmd) == 0 {
		runCommands = append(runCommands, "./"+filename)
	}

	// TODO: actually use the right Uid and Gid and Nprocs????
	runtimeProps := &runtime.RunProps{
		RunArgs: runCommands,
		Timeout: runtime.DefaultTimeout,
	}

	print2.DebugPrintf("writing file: %v", props.Source)
	print2.DebugPrintf("compile commands: %v", compileCommands.RunArgs)
	print2.DebugPrintf("run commands: %v", runtimeProps.RunArgs)
	runOut := cr.controller.SubmitRequest(&controller.Props{
		Data:        writerremover.NewBlob([]byte(props.Source), filename),
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
