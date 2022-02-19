package main

import (
	"context"
	"fmt"
	"github.com/runner-x/runner-x/engine/runtime"
	"golang.org/x/sys/unix"
	"os/exec"
	"time"
)

func executeCommand(cmd *exec.Cmd, limiter *runtime.OnSelf, done chan struct{}) {
	fmt.Println("preparing to run command")
	limiter.ApplyLimits(&runtime.ResourceLimits{
		NumProcesses: &unix.Rlimit{
			Cur: 2,
			Max: 2,
		},
		MaxFileSize: &unix.Rlimit{
			Cur: unix.RLIM_INFINITY,
			Max: unix.RLIM_INFINITY,
		},
	})
	stdoutPipe, err := cmd.StdoutPipe()
	stderrPipe, err := cmd.StderrPipe()
	err = cmd.Run()
	if err != nil {
		fmt.Errorf("error running command: %v", err)
	}
	stdoutCh := runtime.GetWriterChannelOutput(stdoutPipe)
	stderrCh := runtime.GetWriterChannelOutput(stderrPipe)
	outStr := <-stdoutCh
	errStr := <-stderrCh
	fmt.Printf("\nstdoutCh: [%v]\nstderrCh: [%v]\n", outStr, errStr)

	fmt.Println("finished running command")
	done <- struct{}{}
}

func main() {
	done := make(chan struct{})
	ctx, cancel := context.WithTimeout(context.Background(), time.Duration(3))
	defer cancel()
	cmd := exec.CommandContext(ctx, "echo", "hello world")
	limiter := runtime.NewLimiterOnSelf()

	go executeCommand(cmd, limiter, done)

	// wait until command completes
	<-done

	if ctx.Err() == context.DeadlineExceeded {
		fmt.Println("command timed out")
	}
	fmt.Println("done")
}
