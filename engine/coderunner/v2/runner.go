package v2

import (
	"context"

	"github.com/runner-x/runner-x/engine/controller"
	"github.com/runner-x/runner-x/engine/controller/writerremover"
	"github.com/runner-x/runner-x/engine/runtime"
	"github.com/runner-x/runner-x/engine/sandbox"
	print2 "github.com/runner-x/runner-x/util/print"
)

func NewCodeRunner(numRunners uint, argProvider runtime.ArgProvider, parentDir, pattern string) CodeRunner {
	ctrl := controller.NewAsyncController(numRunners, argProvider, parentDir, pattern)
	return CodeRunner{
		controller: ctrl,
		numRunners: numRunners,
	}
}

func NewCodeRunnerWithSandbox(config SandboxConfig) CodeRunner {
	return CodeRunner{
		sandboxRunner: config.Runner,
		sandboxPolicy: config.Policy,
		sandboxImages: config.Images,
	}
}

func (cr *CodeRunner) Run(props *RunnerProps) (*RunnerOutput, error) {
	plan := executionPlanFor(LangNameToLangMap[props.Lang], cr.sandboxImages)

	if cr.sandboxRunner != nil {
		return cr.runSandboxed(props, plan)
	}

	return cr.runLegacy(props, plan)
}

type executionPlan struct {
	filename   string
	compileCmd []string
	runCmd     []string
	image      string
}

func executionPlanFor(language Language, imageOverrides map[string]string) executionPlan {
	filename := "run" + language.FileExtension
	compileCmd := append([]string{}, language.CompileCmd...)
	if len(compileCmd) > 0 {
		compileCmd = append(compileCmd, filename)
	}

	runCmd := append([]string{}, language.RunCmd...)
	if len(compileCmd) == 0 {
		runCmd = append(runCmd, "./"+filename)
	}

	image := language.SandboxImage
	if imageOverrides != nil {
		if override, ok := imageOverrides[language.Name]; ok && len(override) > 0 {
			image = override
		}
	}

	return executionPlan{
		filename:   filename,
		compileCmd: compileCmd,
		runCmd:     runCmd,
		image:      image,
	}
}

func (cr *CodeRunner) runLegacy(props *RunnerProps, plan executionPlan) (*RunnerOutput, error) {
	compileCommands := &runtime.RunProps{
		RunArgs:   plan.compileCmd,
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
	switch props.Lang {
	case "rust":
		compileCommands.Fsize = 1 << 25 // 32 mB
	}

	// TODO: actually use the right Uid and Gid and Nprocs????
	runtimeProps := &runtime.RunProps{
		RunArgs: plan.runCmd,
		Timeout: runtime.DefaultTimeout,
	}

	print2.DebugPrintf("writing file: %v", props.Source)
	print2.DebugPrintf("compile commands: %v", compileCommands.RunArgs)
	print2.DebugPrintf("run commands: %v", runtimeProps.RunArgs)
	runOut := cr.controller.SubmitRequest(&controller.Props{
		Data:        writerremover.NewBlob([]byte(props.Source), plan.filename),
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

func (cr *CodeRunner) runSandboxed(props *RunnerProps, plan executionPlan) (*RunnerOutput, error) {
	steps := make([]sandbox.Command, 0, 2)
	if len(plan.compileCmd) > 0 {
		steps = append(steps, sandbox.Command{Args: plan.compileCmd})
	}
	steps = append(steps, sandbox.Command{Args: plan.runCmd})

	out, err := cr.sandboxRunner.Run(context.Background(), sandbox.Job{
		Image: plan.image,
		Files: map[string][]byte{
			plan.filename: []byte(props.Source),
		},
		Steps: steps,
	}, cr.sandboxPolicy)
	if out == nil {
		return nil, err
	}

	return &RunnerOutput{
		Stdout:       out.Stdout,
		Stderr:       out.Stderr,
		CommandError: err,
	}, nil
}
