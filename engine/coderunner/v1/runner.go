package v1

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

// FileExtensionMap contains maps languages to file extensions
// but language keys may not match the languages a user is allowed to request
var FileExtensionMap = map[Language]string{
	PYTHON3: "py",
	SHELL:   "sh",
	CPP11:   "cpp",
}

var ExtensionFileMap = map[string]Language{
	"py":  PYTHON3,
	"sh":  SHELL,
	"cpp": CPP11,
}

func NewCodeRunner(id, dir string, p runtime.ArgProvider) *CodeRunner {
	r := runtime.NewTimeoutRuntime(id, p)
	return &CodeRunner{runner: r, workdirPath: dir}
}

func DebugPrintRunOutput(out runtime.RunOutput) {
	print.DebugPrintf("\n[stdout]: %s", out.Stdout)
	print.DebugPrintf("\n[stderr]: %s", out.Stderr)
}

func (cr *CodeRunner) Run(props *RunnerProps) (*RunnerOutput, error) {
	// TODO: error handling

	// TODO: add intermediate step to allow multiple code runs concurrently

	filename := "code." + FileExtensionMap[props.Lang]

	var writePath string
	var cleanupPath string
	if len(cr.workdirPath) == 0 {
		// if no path was provided, we can create a throwaway directory
		dir, err := os.MkdirTemp(cr.workdirPath, "runner")
		if err != nil {
			fmt.Printf("unable to make tmpdir: [%v]", err)
			return nil, err
		}
		// cleanup the temporary directory
		cleanupPath = dir
		writePath = filepath.Join(dir, filename)
	} else {
		// if code runner has a path provided, we can

		// this will need to change when changing to using "runtime agents"
		// since each agent we get will have its own working directory
		writePath = filepath.Join(cr.workdirPath, filename)
		cleanupPath = writePath
	}

	print.DebugPrintf("source path: %s", writePath)
	err := os.WriteFile(writePath, []byte(props.Source), 0644)
	if err != nil {
		print.DebugPrintf("error writing to path: [%v], aborting", err)
		return nil, err
	}

	defer func(path string) {
		err := os.RemoveAll(path)
		if err != nil {
			print.DebugPrintf("error removing tmp dir in handler: %v", err)
		}
	}(cleanupPath)

	// runner compiles with timeout
	// TODO: implement compilation step if language is compiled

	// runner runs with timeout
	runCmds := getRunCmds(writePath, props.Lang)
	runOutput, err := cr.runner.RunCmd(&runtime.RunProps{
		RunArgs: runCmds,
		Timeout: TIMEOUT_DEFAULT,
	})

	DebugPrintRunOutput(*runOutput)

	// transform output
	return &RunnerOutput{
		runOutput.Stdout,
		runOutput.Stderr,
		err,
	}, nil
}

// TODO: refactor these into a module and handle with pre-run hooks
func getRunCmds(filename string, lang Language) []string {
	var cmds []string
	switch lang {
	case PYTHON3:
		cmds = []string{"python3", filename}
	case SHELL:
		cmds = []string{"bash", filename}
	default:
		panic(fmt.Sprintf("lang [%v] not supported", lang))
	}
	return cmds
}
