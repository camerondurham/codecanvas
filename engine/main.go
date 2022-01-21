package main

import (
	"bytes"
	"errors"
	"fmt"
	"io"
	"os"
	"os/exec"
)

type RunProps struct {
	RunArgs     []string `json:"run_args"`     // program arguments
	Timeout     int      `json:"timeout"`      // timeout before program is killed
	ExecutePath string   `json:"execute_path"` // path in the filesystem to execute commands in
}

type RunOutput struct {
	Stdout       string `json:"stdout"`
	Stderr       string `json:"stderr"`
	CommandError error  `json:"error"`
}

var (
	ErrDoesNotExist = errors.New("does not exist")
)

const (
	// install timeout on macos with
	//   brew install coreutils
	TIMEOUT_EXECUTABLE   = "timeout"
	SIGNAL_FLAG          = "--signal"
	SIGKILL              = "SIGKILL"
	TIMEOUT_SIGKILL_FLAG = SIGNAL_FLAG + "=" + SIGKILL // --signal=SIGKILL
)

// TODO: move into utility module
// DebugPrintf prints message if DEBUG environment variable is set
func DebugPrintf(format string, fmtArgs ...interface{}) {
	if _, ok := os.LookupEnv("DEBUG"); ok {
		fmt.Printf(format, fmtArgs...)
	}
}

// RunCommandList synchronously runs a list of commands
func RunCommandList(runprops []RunProps) ([]*RunOutput, error) {

	// outputArr := new([]*RunOutput)
	var outputArr []*RunOutput

	for _, runprop := range runprops {
		commandArgs := append([]string{TIMEOUT_EXECUTABLE, TIMEOUT_SIGKILL_FLAG, fmt.Sprintf("%d", runprop.Timeout)}, runprop.RunArgs...)
		output, err := runCommand(RunProps{
			RunArgs:     commandArgs,
			Timeout:     runprop.Timeout,
			ExecutePath: runprop.ExecutePath,
		})
		outputArr = append(outputArr, output)
		if err != nil {
			DebugPrintf("error running command: \"%v\"\n\t%v", commandArgs, err)
			// return outputArr, err
		}
	}

	return outputArr, nil
}

// RunCommand wraps commands from user in a timeout duration specified in RunProps
func RunCommand(runprops RunProps) (*RunOutput, error) {
	commandArgs := append([]string{TIMEOUT_EXECUTABLE, TIMEOUT_SIGKILL_FLAG, fmt.Sprintf("%d", runprops.Timeout)}, runprops.RunArgs...)
	input := RunProps{
		RunArgs:     commandArgs,
		Timeout:     runprops.Timeout,
		ExecutePath: "",
	}
	return runCommand(input)
}

// runCommand executes a command, returns output and is lowercase so private function is not exposed outside the module
func runCommand(runprops RunProps) (*RunOutput, error) {
	var cmd *exec.Cmd

	numArgs := len(runprops.RunArgs)

	if numArgs < 1 {
		return nil, nil
	} else if numArgs == 1 {
		cmd = exec.Command(runprops.RunArgs[0])
	} else {
		cmd = exec.Command(runprops.RunArgs[0], runprops.RunArgs[1:]...)
	}

	stdoutPipe, stdoutErr := cmd.StdoutPipe()
	if stdoutErr != nil {
		panic(stdoutErr)
	}

	stderrPipe, stderrErr := cmd.StderrPipe()
	if stderrErr != nil {
		panic(stderrErr)
	}

	stdoutChannel := getWriterChannelOutput(stdoutPipe)
	stderrChannel := getWriterChannelOutput(stderrPipe)

	DebugPrintf("\nrunning command with RunProps: %v\n", runprops)
	err := cmd.Run()

	stdoutPipe.Close()
	stdoutAsString := <-stdoutChannel
	stderrAsString := <-stderrChannel

	if err != nil {
		// this will show error result from `timeout` if applicable
		fmt.Printf("error running command: %v\n", err)
	}

	return &RunOutput{
		Stdout:       stdoutAsString,
		Stderr:       stderrAsString,
		CommandError: err, // TODO: convert to engine error
	}, err
}

func getWriterChannelOutput(pipeReadCloser io.ReadCloser) chan string {
	outChannel := make(chan string)

	// copy output to separate goroutine so printing can't block indefinitely
	go func() {
		var buf bytes.Buffer
		_, err := io.Copy(&buf, pipeReadCloser)
		if err != nil {
			DebugPrintf("error copying output: %v", err)
		}
		outChannel <- buf.String()
	}()

	return outChannel
}

func main() {

	// TODO: this interface is trash, should make it easier to run a bunch of commands with the same timeout
	runOutputArr, err := RunCommandList([]RunProps{
		RunProps{
			RunArgs: []string{"sleep", "3"},
			Timeout: 1,
		},
		RunProps{
			RunArgs: []string{"clang++", "test/test.cpp", "-o", "test/bin/test"},
			Timeout: 1,
		},
		RunProps{
			RunArgs: []string{"./test/bin/test"},
			Timeout: 1,
		},
	})

	// if err != nil {
	// 	panic(err)
	// }

	for _, out := range runOutputArr {
		fmt.Printf("\ncommand output: %v command error: [%v] func error: [%v]", out.Stdout, out.CommandError, err)
	}

}
