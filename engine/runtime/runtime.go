package runtime

import (
	"bytes"
	"context"
	"fmt"
	"golang.org/x/sys/unix"
	"io"
	"os"
	"os/exec"
	"time"

	"github.com/runner-x/runner-x/util/print"
)

const (
	DEFAULT_SOFT_NPROC = 250
	DEFAULT_HARD_NPROC = 250
	DEFAULT_SOFT_FSIZE = 100000
	DEFAULT_HARD_FSIZE = 250000
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
	print.DebugPrintf("running command from PID: %v\n", os.Getpid())
	done := make(chan error)
	go func() {
		// TODO: make goroutine into a separate function
		err := r.limiter.ApplyLimits(&ResourceLimits{
			NumProcesses: &unix.Rlimit{
				Cur: DEFAULT_SOFT_NPROC,
				Max: DEFAULT_HARD_NPROC,
			},
			MaxFileSize: &unix.Rlimit{
				Cur: DEFAULT_SOFT_FSIZE,
				Max: DEFAULT_HARD_FSIZE,
			},
		})
		if err != nil {
			print.DebugPrintf("error applying limits: %v\n", err)
			done <- err
			return
		}
		print.DebugPrintf("running processes from goroutine PID: %v\n", os.Getpid())
		err = cmd.Run()
		done <- err
	}()

	stdoutAsString := <-stdoutChannel
	stderrAsString := <-stderrChannel

	err := <-done

	if ctx.Err() == context.DeadlineExceeded {
		print.DebugPrintf("command error: %v\n", err)
		fmt.Println("command timed out")
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

// GetWriterChannelOutput gets a string channel from read close to be converted into a string after closer is finished
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
