package codehandler

import (
	"fmt"
	"os"
	"path/filepath"
	goruntime "runtime"

	"github.com/runner-x/runner-x/engine/runtime"
	"github.com/runner-x/runner-x/util/print"
)

const (
	TIMEOUT_DEFAULT   = 3
	COMPILED_FILENAME = "compiled"
)

func fileExtensionMap() map[Language]string {
	return map[Language]string{
		PYTHON3: "py",
		SHELL:   "sh",
		CPP11:   "cpp",
	}
}

// TODO: refactor these into a module and handle with pre-run hooks
func createRunCmds(filename string, lang Language) []string {
	var cmds []string
	switch lang {
	case PYTHON3:
		cmds = []string{"python3", filename}
	case SHELL:
		cmds = []string{"bash", filename}
	case CPP11:
		cmds = []string{""}
	default:
		panic(fmt.Sprintf("lang [%v] not supported", lang))
	}
	return cmds
}

func createCompileCmds(filename string, lang Language) []string {
	var cmds []string
	switch lang {
	case PYTHON3:
	case SHELL:
		cmds = nil
	case CPP11:
		if goruntime.GOOS == "linux" {
			cmds = []string{"g++", filename, "--std=c++11", "-o", COMPILED_FILENAME}
		} else if goruntime.GOOS == "darwin" {
			cmds = []string{"clang++", filename, "--std=c++11", "-o", COMPILED_FILENAME}
		}
	}
	return cmds
}

func DebugPrintRunOutput(out runtime.RunOutput) {
	print.DebugPrintf("\n[cmderr]: %v", out.Error)
	print.DebugPrintf("\n[stdout]: %s", out.Stdout)
	print.DebugPrintf("\n[stderr]: %s", out.Stderr)
}

func Handle(props *RunnerProps) (*RunnerOutput, error) {
	// TODO: error handling

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
	compileCmds := createCompileCmds(writePath, props.Lang)
	if compileCmds != nil {
		compileOutput, err := runtime.RunCmd(runtime.RunProps{
			RunArgs:     compileCmds,
			Timeout:     TIMEOUT_DEFAULT,
			ExecutePath: dir,
		})

		if err != nil {
			panic(err)
		}
		DebugPrintRunOutput(*compileOutput)
	}

	// runner runs with timeout
	runCmds := createRunCmds(writePath, props.Lang)
	runOutput, err := runtime.RunCmd(runtime.RunProps{
		RunArgs:     runCmds,
		Timeout:     TIMEOUT_DEFAULT,
		ExecutePath: dir,
	})

	DebugPrintRunOutput(*runOutput)

	// transform output
	return &RunnerOutput{
		runOutput.Stdout,
		runOutput.Stderr,
		runOutput.Error,
	}, nil
}
