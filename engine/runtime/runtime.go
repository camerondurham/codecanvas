package runtime

import (
	"bytes"
	"fmt"
	"io"
	"os/exec"

	"github.com/runner-x/runner-x/util/print"
)

func NewTimeoutRuntime(id string) *RuntimeAgent {
	return &RuntimeAgent{id}
}

// RunCommand wraps commands from user in a timeout duration specified in RunProps
func (r *RuntimeAgent) RunCmd(runprops *RunProps) (*RunOutput, error) {
	if runprops == nil {
		return nil, nil
	}

	commandArgs := timedCommand(runprops.Timeout, runprops.RunArgs)
	input := RunProps{
		RunArgs: commandArgs,
		Timeout: runprops.Timeout,
	}
	return r.runCommand(input)
}

// runCommand executes a command, returns output and is lowercase so private function is not exposed outside the module
func (r *RuntimeAgent) runCommand(runprops RunProps) (*RunOutput, error) {
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

	print.DebugPrintf("\nrunning command with RunProps: %v\n", runprops)
	err := cmd.Run()

	stdoutPipe.Close()
	stdoutAsString := <-stdoutChannel
	stderrAsString := <-stderrChannel

	if err != nil {
		print.DebugPrintf("(runCommand) error from running command: %v", err)
	}

	return &RunOutput{
		Stdout: stdoutAsString,
		Stderr: stderrAsString,
	}, err
}

func timedCommand(timeout int, cmds []string) []string {
	return append([]string{"timeout", "--signal=SIGKILL", fmt.Sprintf("%d", timeout)}, cmds...)
}

// TODO: this may belong in util
func getWriterChannelOutput(pipeReadCloser io.ReadCloser) chan string {
	outChannel := make(chan string)

	// copy output to separate goroutine so printing can't block indefinitely
	go func() {
		var buf bytes.Buffer
		_, err := io.Copy(&buf, pipeReadCloser)
		if err != nil {
			print.DebugPrintf("error copying output: %v", err)
		}
		outChannel <- buf.String()
	}()

	return outChannel
}
