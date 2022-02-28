package runtime

import (
	"context"
	"fmt"
	"os"
	"os/exec"
	"strconv"
	"time"

	"github.com/runner-x/runner-x/util/iohelpers"
	"github.com/runner-x/runner-x/util/print"
)

const (
	// TODO: this is only done to allow passing during local testin
	// should override to lower value
	DefaultSoftNproc   = 2000
	DefaultHardNproc   = 5000
	DefaultSoftFsize   = 100000
	DefaultHardFsize   = 250000
	ProcessCommandName = "process"
)

func NewTimeoutRuntime(id string) *RuntimeAgent {
	return &RuntimeAgent{id}
}

func getProcessArgs(runprops *RunProps) []string {

	var args []string

	if len(runprops.RunArgs) < 1 {
		return args
	}

	args = []string{
		//	"process",
		"-nprocs=" + strconv.Itoa(DefaultSoftNproc),
		"-fsize=" + strconv.Itoa(DefaultSoftFsize),
		"-timeout=" + strconv.Itoa(runprops.Timeout),
		"-cmd=" + runprops.RunArgs[0]}

	if len(runprops.RunArgs) > 1 {
		args = append(args, runprops.RunArgs[1:]...)
	}

	return args
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
	} else {
		args := getProcessArgs(runprops)
		print.DebugPrintf("running command: %s %v", ProcessCommandName, args)
		cmd = exec.CommandContext(ctx, ProcessCommandName, args...)
	}

	stdoutPipe, stdoutErr := cmd.StdoutPipe()
	if stdoutErr != nil {
		panic(stdoutErr)
	}

	stderrPipe, stderrErr := cmd.StderrPipe()
	if stderrErr != nil {
		panic(stderrErr)
	}

	stdoutChannel := iohelpers.GetWriterChannelOutput(stdoutPipe)
	stderrChannel := iohelpers.GetWriterChannelOutput(stderrPipe)

	print.DebugPrintf("\nrunning command with RunProps: %v\n", runprops)
	print.DebugPrintf("running command from PID: %v\n", os.Getpid())

	err := cmd.Run()

	stdoutAsString := <-stdoutChannel
	stderrAsString := <-stderrChannel

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
