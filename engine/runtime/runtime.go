package runtime

import (
	"bytes"
	"context"
	"fmt"
	"golang.org/x/sys/unix"
	"io"
	"os/exec"
	"time"

	"github.com/runner-x/runner-x/util/print"
)

const (
	DEFAULT_SOFT_NPROC = 10
	DEFAULT_HARD_NPROC = 100
)

func NewTimeoutRuntime(id string, limiter Limiter) *RuntimeAgent {
	return &RuntimeAgent{id, limiter}
}

func (r *RuntimeAgent) RunCmd(runprops *RunProps) (*RunOutput, error) {
	if runprops == nil {
		return nil, nil
	}

	// Create a new context and add a timeout to it
	timeout, _ := time.ParseDuration(fmt.Sprintf("%ds", runprops.Timeout))
	ctx, cancel := context.WithTimeout(context.Background(), timeout)
	defer cancel()

	var cmd *exec.Cmd

	numArgs := len(runprops.RunArgs)
	if numArgs < 1 {
		return nil, nil
	} else if numArgs == 1 {
		cmd = exec.CommandContext(ctx, runprops.RunArgs[0])
	} else {
		cmd = exec.CommandContext(ctx, runprops.RunArgs[0], runprops.RunArgs[1:]...)
	}

	stdoutPipe, stdoutErr := cmd.StdoutPipe()
	if stdoutErr != nil {
		panic(stdoutErr)
	}

	stderrPipe, stderrErr := cmd.StderrPipe()
	if stderrErr != nil {
		panic(stderrErr)
	}

	stdoutChannel := GetWriterChannelOutput(stdoutPipe)
	stderrChannel := GetWriterChannelOutput(stderrPipe)

	print.DebugPrintf("\nrunning command with RunProps: %v\n", runprops)
	done := make(chan error)
	go func() {
		r.limiter.ApplyLimits(&ResourceLimits{NumProcesses: &unix.Rlimit{
			Cur: DEFAULT_SOFT_NPROC,
			Max: DEFAULT_HARD_NPROC,
		}})
		err := cmd.Run()
		done <- err
	}()

	stdoutAsString := <-stdoutChannel
	_ = stdoutPipe.Close()
	stderrAsString := <-stderrChannel
	_ = stderrPipe.Close()

	err := <-done

	if ctx.Err() == context.DeadlineExceeded {
		fmt.Println("Command timed out")
		return &RunOutput{
			Stdout: stdoutAsString,
			Stderr: stderrAsString,
		}, err
	}

	if err != nil {
		print.DebugPrintf("(runCommand) error from running command: %v", err)
	}

	return &RunOutput{
		Stdout: stdoutAsString,
		Stderr: stderrAsString,
	}, err
}

// TODO: this may belong in util
func GetWriterChannelOutput(pipeReadCloser io.ReadCloser) chan string {
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
