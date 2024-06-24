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
	nprocs    *unix.Rlimit
	fsize     *unix.Rlimit
	cputime   *unix.Rlimit
	stacksize *unix.Rlimit
	timeout   time.Duration
	runcmd    string
	runargs   []string
}

const (
	// TODO: better defaults or automatic defaults based on system this is running on
	DefaultMaxNprocs   = 200    // default max 200 procs
	DefaultMaxFileSize = 524288 // default ~0.5MB max file size
	DefaultTimeout     = 2      // default 2s timeout
	DefaultCpuTime     = 1      // default max 1s in CPU
	DefaultStackSize   = 262144 // set default stack size to 0.25MB

	// TODO: find better way to handle errors
	EApplyingLimits = 10 // error code for applying limits
	ERunningProc    = 20 // error code when running command
	EFallbackError = 21 // error code if cannot find error code of child process
)

// The process CLI is used to handle set limits on the current process/user
//
// usage:
//
//	process -uid=1234 -gid=1234 -nprocs=80 -fsize=20000 -timeout=5 -cputime=2 -stacksize=524288 -cmd=runcmd runargs...
//	process -uid=1234 -gid=1234 -nprocs=80 -fsize=20000 -timeout=5 -cputime=2 -stacksize=524288 -cmd=python3 file.py
func main() {
	nprocs := flag.Uint("nprocs", DefaultMaxNprocs, "max number of processes")
	fsize := flag.Uint("fsize", DefaultMaxFileSize, "max file size process can create")
	cputime := flag.Uint("cputime", DefaultCpuTime, "max time in seconds process can spend in CPU")
	stacksize := flag.Uint("stacksize", DefaultStackSize, "max stack size program can use")

	timeout := flag.Uint("timeout", DefaultTimeout, "timeout to apply on command in seconds")
	uid := flag.Uint("uid", uint(os.Getuid()), "user id to run commands with")
	gid := flag.Uint("gid", uint(os.Getgid()), "group id to run command with")
	runcmd := flag.String("cmd", "", "command to run")

	flag.Parse()

	cmdArgs := flag.Args() // other args not parsed

	print.ProcDebug("parsed args: nprocs=\"%d\" fsize=\"%d\" timeout:\"%d\" cputime:\"%d\" stacksize: \"%d\" uid:\"%d\" gid:\"%d\" runcmd:\"%s\" cmds:%v\n",
		*nprocs, *fsize, *timeout, *cputime, *stacksize, *uid, *gid, *runcmd, cmdArgs)

	processArgs := &args{
		nprocs:    &unix.Rlimit{Cur: uint64(*nprocs), Max: uint64(*nprocs)},
		fsize:     &unix.Rlimit{Cur: uint64(*fsize), Max: uint64(*fsize)},
		cputime:   &unix.Rlimit{Cur: uint64(*cputime), Max: uint64(*cputime)},
		stacksize: &unix.Rlimit{Cur: uint64(*stacksize), Max: uint64(*stacksize)},
		timeout:   time.Second * time.Duration(*timeout),
		runcmd:    *runcmd,
		runargs:   cmdArgs,
	}

	limiter := runtime.NewLimiterOnSelf()
	err := limiter.ApplyLimits(&runtime.ResourceLimits{
		NumProcesses: processArgs.nprocs,
		MaxFileSize:  processArgs.fsize,
		MaxCpuTime:   processArgs.cputime,
		MaxStackSize: processArgs.stacksize,
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

	if exiterr, ok := err.(*exec.ExitError); ok {
		print.ProcDebug("process exit status: %d", exiterr.ExitCode())
		os.Exit(exiterr.ExitCode())
	} else {
		print.ProcDebug("error running process: %v\n", err)
		os.Exit(EFallbackError)
	}

	os.Exit(0)
}
