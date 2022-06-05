package runtime

import (
	"context"
	"os/exec"
	"strconv"

	"github.com/runner-x/runner-x/util/print"
)

type ArgProvider interface {
	Provide(ctx *context.Context, runprops *RunProps) *exec.Cmd
}

// ProcessorArgsProvider wraps commands to pass to the process CLI
type ProcessorArgsProvider struct{}

// NilProvider returns the args provided
type NilProvider struct{}

func (p *ProcessorArgsProvider) Provide(ctx *context.Context, runprops *RunProps) *exec.Cmd {
	var args []string

	if len(runprops.RunArgs) < 1 {
		return exec.CommandContext(*ctx, runprops.RunArgs[0])
	}

	args = []string{
		"-nprocs=" + strconv.Itoa(runprops.Nprocs),
		"-uid=" + strconv.Itoa(runprops.Uid),
		"-gid=" + strconv.Itoa(runprops.Gid),
		"-fsize=" + strconv.Itoa(runprops.Fsize),
		"-timeout=" + strconv.Itoa(runprops.Timeout),
		"-cputime=" + strconv.Itoa(runprops.Cputime),
		"-cmd=" + runprops.RunArgs[0]}

	if len(runprops.RunArgs) > 1 {
		args = append(args, runprops.RunArgs[1:]...)
	}

	print.DebugPrintf("running command: %s %v", ProcessCommandName, args)
	return exec.CommandContext(*ctx, ProcessCommandName, args...)
}

func (p *NilProvider) Provide(ctx *context.Context, runprops *RunProps) *exec.Cmd {
	print.DebugPrintf("running command: %v", runprops.RunArgs)

	if len(runprops.RunArgs) < 1 {
		return exec.CommandContext(*ctx, runprops.RunArgs[0])
	}

	return exec.CommandContext(*ctx, runprops.RunArgs[0], runprops.RunArgs[1:]...)
}
