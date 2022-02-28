package main

import (
	"context"
	"flag"
	"os"
	"os/exec"
	"time"

	"github.com/runner-x/runner-x/engine/runtime"
	"github.com/runner-x/runner-x/util/print"
	"golang.org/x/sys/unix"
)

type args struct {
	nprocs  *unix.Rlimit
	fsize   *unix.Rlimit
	timeout time.Duration
	runcmd  string
	runargs []string
}

const (
	DefaultMaxNprocs   = 200
	DefaultMaxFileSize = 2000000
	DefaultTimeout     = 3

	// TODO: find better way to handle errors
	EApplyingLimits = 10 // error code for applying limits
	ERunningProc    = 20 // error code when running command
)

//
// usage:
//     process -nprocs=80 -fsize=20000 -timeout=5 -cmd=runcmd runargs...
//     process -nprocs=80 -fsize=20000 -timeout=5 -cmd=python3 file.py
//
func main() {
	nprocs := flag.Uint("nprocs", DefaultMaxNprocs, "max number of processes")
	fsize := flag.Uint("fsize", DefaultMaxFileSize, "max file size process can create")

	timeout := flag.Uint("timeout", DefaultTimeout, "timeout to apply on command in seconds")
	runcmd := flag.String("cmd", "", "command to run")

	flag.Parse()

	cmdArgs := flag.Args() // other args not parsed

	print.ProcDebug("parsed args: nprocs=\"%d\" fsize=\"%d\" timeout:\"%d\"  runcmd:\"%s\" cmds:%v\n",
		*nprocs, *fsize, *timeout, *runcmd, cmdArgs)

	processArgs := &args{
		nprocs:  &unix.Rlimit{Cur: uint64(*nprocs), Max: uint64(*nprocs)},
		fsize:   &unix.Rlimit{Cur: uint64(*fsize), Max: uint64(*fsize)},
		timeout: time.Second * time.Duration(*timeout),
		runcmd:  *runcmd,
		runargs: cmdArgs,
	}

	limiter := runtime.NewLimiterOnSelf()
	err := limiter.ApplyLimits(&runtime.ResourceLimits{
		NumProcesses: processArgs.nprocs,
		MaxFileSize:  processArgs.fsize,
	})

	if err != nil {
		print.ProcDebug("error applying limits: %v\n", err)
		os.Exit(EApplyingLimits)
	}

	ctx, cancel := context.WithTimeout(context.Background(), processArgs.timeout)
	defer cancel()

	cmd := exec.CommandContext(ctx, processArgs.runcmd, processArgs.runargs...)

	cmd.Stdout = os.Stdout
	cmd.Stderr = os.Stderr
	err = cmd.Run()

	if err != nil {
		print.ProcDebug("error running process: %v\n", err)
		os.Exit(ERunningProc)
	}
}
