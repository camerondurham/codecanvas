package codehandler

import (
	"fmt"
	"os"
	"path/filepath"

	"github.com/runner-x/runner-x/engine/runtime"
	"github.com/runner-x/runner-x/util/print"
)

const (
	TIMEOUT_DEFAULT = 3
)

func fileExtensionMap() map[Language]string {
	return map[Language]string{
		PYTHON3: "py",
		SHELL:   "sh",
	}
}

func createRunCmds(filename string, lang Language) []string {
	var cmds []string
	switch lang {
	case PYTHON3:
		cmds = []string{"python3", filename}
	case SHELL:
		cmds = []string{"bash", filename}
	default:
		panic(fmt.Sprintf("lang not supported: %v", lang))
	}
	return cmds
}

func DebugPrintRunOutput(out runtime.RunOutput) {
	print.DebugPrintf("\n[cmderr]: %v", out.CommandError)
	print.DebugPrintf("\n[stdout]: %s", out.Stdout)
	print.DebugPrintf("\n[stderr]: %s", out.Stderr)
}

func Handle(props RunnerProps) RunnerOutput {
	// TODO: add intermediate step to allow multiple code runs concurrently

	// TODO: create parent directory to create temp dirs in
	// create temporary directory
	dir, err := os.MkdirTemp("", "runner")
	if err != nil {
		panic(err)
	}

	defer func(path string) {
		err := os.RemoveAll(path)
		if err != nil {
			print.DebugPrintf("error removing tmp dir in handler: %v", err)
		}
	}(dir)

	// write user input into tempdir
	extensionMap := fileExtensionMap()
	filename := "code." + extensionMap[props.Lang]
	writePath := filepath.Join(dir, filename)

	print.DebugPrintf("source path: %s", writePath)
	err = os.WriteFile(writePath, []byte(props.Source), 0644)
	if err != nil {
		panic(err)
	}

	// runner compiles with timeout
	// TODO: implement this if language is compiled

	// runner runs with timeout
	runCmds := createRunCmds(writePath, props.Lang)
	runOutput, err := runtime.RunCmd(runtime.RunProps{
		RunArgs:     runCmds,
		Timeout:     TIMEOUT_DEFAULT,
		ExecutePath: dir,
	})

	DebugPrintRunOutput(*runOutput)

	// transform output
	runnerOutput := RunnerOutput{
		runOutput.Stdout,
		runOutput.Stderr,
		runOutput.CommandError,
	}

	return runnerOutput
}
