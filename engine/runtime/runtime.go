package runtime

import (
  "bytes"
  "fmt"
  "syscall"
  "os/exec"
  "io"
	"github.com/runner-x/runner-x/util/print"
)


// RunCommandList synchronously runs a list of commands
func RunCmdList(runprops []RunProps) ([]*RunOutput, error) {

	var outputArr []*RunOutput

	for _, runprop := range runprops {
		commandArgs := timedCommand(runprop.Timeout, runprop.RunArgs)
		output, err := runCommand(RunProps{
			RunArgs:     commandArgs,
			Timeout:     runprop.Timeout,
			ExecutePath: runprop.ExecutePath,
		})
		outputArr = append(outputArr, output)
		if err != nil {
			print.DebugPrintf("error running command: \"%v\"\n\t%v", commandArgs, err)
			// return outputArr, err
		}
	}

	return outputArr, nil
}

// RunCommand wraps commands from user in a timeout duration specified in RunProps
func RunCmd(runprops RunProps) (*RunOutput, error) {
	commandArgs := timedCommand(runprops.Timeout, runprops.RunArgs)
	// append([]string{TIMEOUT_EXECUTABLE, TIMEOUT_SIGKILL_FLAG, fmt.Sprintf("%d", runprops.Timeout)}, runprops.RunArgs...)
	input := RunProps{
		RunArgs:     commandArgs,
		Timeout:     runprops.Timeout,
		ExecutePath: "",
	}
	return runCommand(input)
}

func timedCommand(timeout int, cmds []string) []string {
	return append([]string{"timeout", "--signal=" + syscall.SIGKILL.String(), fmt.Sprintf("%d", timeout)}, cmds...)
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

	print.DebugPrintf("\nrunning command with RunProps: %v\n", runprops)
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
			print.DebugPrintf("error copying output: %v", err)
		}
		outChannel <- buf.String()
	}()

	return outChannel
}

