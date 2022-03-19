package runtime

import (
	"context"
	"fmt"
	"os"
	"os/exec"
	"sync"
	"time"

	"github.com/runner-x/runner-x/util/iohelpers"
	"github.com/runner-x/runner-x/util/print"
)

const (
	DefaultSoftNproc   = 2000
	DefaultHardNproc   = 5000
	DefaultSoftFsize   = 100000
	DefaultHardFsize   = 250000
	DefaultUid         = 1234
	DefaultGid         = 1234
	ProcessCommandName = "process"
)

func NewTimeoutRuntime(id string, provider ArgProvider) *RuntimeAgent {
	return &RuntimeAgent{Id: id, Provider: provider, Uid: DefaultUid, Gid: DefaultGid}
}

func NewRuntimeAgentWithIds(idStr string, id int, provider ArgProvider) *RuntimeAgent {
	return &RuntimeAgent{
		Id:       idStr,
		Provider: provider,
		Uid:      id,
		Gid:      id,
		state:    Ready,
		rwmutex:  sync.RWMutex{},
	}
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
		cmd = r.Provider.Provide(&ctx, runprops)
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

func (r *RuntimeAgent) IsReady() bool {
	r.rwmutex.RLock() // acquire the lock to read to reading while agent is trying to write to the state

	defer r.rwmutex.RUnlock() // make sure we unlock when we're done
	return r.state == Ready
}
