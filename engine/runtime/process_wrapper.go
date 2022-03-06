package runtime

import (
	"context"
	"os/exec"
	"strconv"

	"github.com/runner-x/runner-x/util/print"
)

func (p *ProcessorArgsProvider) Provide(ctx *context.Context, runprops *RunProps) *exec.Cmd {
	var args []string

	if len(runprops.RunArgs) < 1 {
		return exec.CommandContext(*ctx, runprops.RunArgs[0])
	}

	args = []string{
		"-nprocs=" + strconv.Itoa(DefaultSoftNproc),
		"-uid=" + strconv.Itoa(DefaultUid),
		"-gid=" + strconv.Itoa(DefaultGid),
		"-fsize=" + strconv.Itoa(DefaultSoftFsize),
		"-timeout=" + strconv.Itoa(runprops.Timeout),
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
