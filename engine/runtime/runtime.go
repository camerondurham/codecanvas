package runtime

import (
	"bytes"
	"context"
	"fmt"
	"io"
	"os"
	"os/exec"
	"syscall"
	"time"

	"github.com/runner-x/runner-x/util/print"
)

const (
	BUF_SZ = 256
)

func NewTimeoutRuntime(id string) *RuntimeAgent {
	return &RuntimeAgent{id}
}

func throw(err error) {
	if err!=nil {
		panic(err)
	}
}

func (r *RuntimeAgent) RunCmd(runprops *RunProps) (*RunOutput, error) {
	if runprops == nil {
		return nil, nil
	}

	// TODO: set restrictions for Rootfs, Rlimits, Hostname
	throw(os.MkdirAll(runprops.Root, 0700))
	throw(syscall.Chdir(runprops.Root))
	// throw(syscall.Chroot(runprops.Root))
    // throw(syscall.Chdir("/"))
	// throw(syscall.Sethostname([]byte(runprops.Hostname)))


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

	stdoutChannel := getWriterChannelOutput(stdoutPipe)
	stderrChannel := getWriterChannelOutput(stderrPipe)

	print.DebugPrintf("\nrunning command with RunProps: %v\n", runprops)
	err := cmd.Run()

	stdoutPipe.Close()
	stdoutAsString := <-stdoutChannel
	stderrAsString := <-stderrChannel

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
