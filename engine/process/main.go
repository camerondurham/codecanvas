//go:build linux || darwin
// +build linux darwin

package main

import (
	"flag"
	"os"
	"os/exec"
	"syscall"
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
// The process CLI is used to handle set limits on the current process/user
//
// usage:
//     process -uid=1234 -gid=1234 -nprocs=80 -fsize=20000 -timeout=5 -cmd=runcmd runargs...
//     process -uid=1234 -gid=1234 -nprocs=80 -fsize=20000 -timeout=5 -cmd=python3 file.py
//
func main() {
	nprocs := flag.Uint("nprocs", DefaultMaxNprocs, "max number of processes")
	fsize := flag.Uint("fsize", DefaultMaxFileSize, "max file size process can create")

	timeout := flag.Uint("timeout", DefaultTimeout, "timeout to apply on command in seconds")
	uid := flag.Uint("uid", uint(os.Getuid()), "user id to run commands with")
	gid := flag.Uint("gid", uint(os.Getgid()), "group id to run command with")
	runcmd := flag.String("cmd", "", "command to run")

	flag.Parse()

	cmdArgs := flag.Args() // other args not parsed

	print.ProcDebug("parsed args: nprocs=\"%d\" fsize=\"%d\" timeout:\"%d\"  uid:\"%d\" gid:\"%d\" runcmd:\"%s\" cmds:%v\n",
		*nprocs, *fsize, *timeout, *uid, *gid, *runcmd, cmdArgs)

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

	cmd := exec.Command(processArgs.runcmd, processArgs.runargs...)

	// TODO: determine how the host must be configured to run this
	cmd.SysProcAttr = &unix.SysProcAttr{
		// run child process with different uid than user
		Credential: &syscall.Credential{
			Uid: uint32(*uid),
			Gid: uint32(*gid),
		},
	}

	cmd.Stdout = os.Stdout
	cmd.Stderr = os.Stderr
	err = cmd.Run()

	if err != nil {
		print.ProcDebug("error running process: %v\n", err)
		os.Exit(ERunningProc)
	}
}
