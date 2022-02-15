package coderunner

import (
	"fmt"
	"os"
	"path/filepath"
	"syscall"

	"github.com/runner-x/runner-x/engine/runtime"
	"github.com/runner-x/runner-x/util/print"
)

const (
	TIMEOUT_DEFAULT = 3
	ROOTFS_DEFAULT = "rootfs"
	HOST_DEFAULT = "host"
	// RLIMIT_NPROC_DEFAULT  // Maximum number of processes that the user associated with the real UID of a process may own
	// RLIMIT_FSIZE_DEFAULT  // Maximum file size allowed
	// RLIMIT_CPU_DEFAULT  // Maximum CPU time in milliseconds
)

// FileExtensionMap contains maps languages to file extensions
// but language keys may not match the languages a user is allowed to request
var FileExtensionMap = map[Language]string{
	PYTHON3: "py",
	SHELL:   "sh",
	CPP11:   "cpp",
}

func NewCodeRunner(id, dir string) *CodeRunner {
	r := runtime.NewTimeoutRuntime(id)
	return &CodeRunner{runner: r, workdirPath: dir}
}

func DebugPrintRunOutput(out runtime.RunOutput) {
	print.DebugPrintf("\n[stdout]: %s", out.Stdout)
	print.DebugPrintf("\n[stderr]: %s", out.Stderr)
}

func (cr *CodeRunner) Run(props *RunnerProps) (*RunnerOutput, error) {
	// TODO: error handling

	// TODO: add intermediate step to allow multiple code runs concurrently

	// TODO: create parent directory to create temp dirs in
	// create temporary directory
	dir, err := os.MkdirTemp(cr.workdirPath, "runner")
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
	filename := "code." + FileExtensionMap[props.Lang]
	writePath := filepath.Join(dir, filename)

	print.DebugPrintf("source path: %s", writePath)
	err = os.WriteFile(writePath, []byte(props.Source), 0644)
	if err != nil {
		print.DebugPrintf("error writing to path: [%v], aborting", err)
		return nil, err
	}

	// runner compiles with timeout
	// TODO: implement compilation step if language is compiled

	// runner runs with timeout
	runCmds := getRunCmds(writePath, props.Lang)
	runOutput, err := cr.runner.RunCmd(&runtime.RunProps{
		RunArgs: runCmds,
		Timeout: TIMEOUT_DEFAULT,
		Root:    ROOTFS_DEFAULT,
		Rlimits:  []syscall.Rlimit{
			{Cur: 10, Max: 10},
		},
		Hostname: HOST_DEFAULT,
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
