package controller

import (
	"errors"
	"os"
	"path/filepath"
	"strconv"
	"sync"

	"github.com/runner-x/runner-x/engine/controller/writerremover"
	print2 "github.com/runner-x/runner-x/util/print"

	"github.com/runner-x/runner-x/engine/runtime"
)

type Controller interface {
	SubmitRequest(runprops *Props) *CtrlRunOutput
}

type CtrlErr error
type CtrlRunOutput struct {
	ControllerErr CtrlErr
	RunOutput     *runtime.RunOutput
	CommandErr    error
}

// Props store the commands to run before and after the isolated run command
type Props struct {
	Data        *writerremover.Blob
	PreRunProps *runtime.RunProps
	RunProps    *runtime.RunProps
}

type AsyncController struct {
	agents map[uint]*agentData
}

type agentData struct {
	rwmutex       sync.RWMutex
	agent         runtime.Runtime
	writerRemover writerremover.BlobWriterRemover
	claim         chan struct{}
}

func NewAsyncControllerWithMap(agents map[uint]*agentData) *AsyncController {
	for _, a := range agents {
		if a.claim == nil {
			a.claim = make(chan struct{}, 1)
			a.claim <- struct{}{}
		}
	}
	return &AsyncController{agents}
}

func NewAsyncController(size uint, provider runtime.ArgProvider, parentWorkdir string, pattern string) *AsyncController {
	agents := make(map[uint]*agentData)

	for i := uint(0); i < size; i++ {
		key := uint(i + 1)
		workdir := filepath.Join(parentWorkdir, pattern+strconv.FormatInt(int64(key), 10))
		if parentWorkdir != "" {
			if err := os.MkdirAll(workdir, 0o755); err != nil {
				print2.DebugPrintf("failed to create runner workdir %q: %v", workdir, err)
			}
		}
		agents[key] = &agentData{
			rwmutex:       sync.RWMutex{},
			agent:         runtime.NewRuntimeAgentWithIds("agent"+strconv.FormatInt(int64(key), 10), int(key), provider, workdir),
			writerRemover: writerremover.NewWorkdirWriter(workdir, 0644),
			claim:         newClaim(),
		}
	}
	return &AsyncController{agents}
}

func newClaim() chan struct{} {
	ch := make(chan struct{}, 1)
	ch <- struct{}{}
	return ch
}

func (a *agentData) tryClaim() bool {
	if a.claim == nil {
		// legacy: behave like "no claim" semantics
		return true
	}
	select {
	case <-a.claim:
		return true
	default:
		return false
	}
}

func (a *agentData) releaseClaim() {
	if a.claim == nil {
		return
	}
	select {
	case a.claim <- struct{}{}:
	default:
	}
}

var (
	NoRunnerIsReady   = CtrlErr(errors.New("no runner available"))
	InvalidInput      = CtrlErr(errors.New("invalid input"))
	PreRunError       = CtrlErr(errors.New("error in pre-run hook before command run"))
	PreRunWriteError  = CtrlErr(errors.New("error writing sourcecode"))
	PostRunPurgeError = CtrlErr(errors.New("error in post-run workflow"))
)

// SubmitRequest will run a command on the first runner agent it finds that is ready
func (ac *AsyncController) SubmitRequest(runprops *Props) *CtrlRunOutput {

	// RunProps cannot be nil, you want to run something after all, right?!
	if runprops == nil || runprops.RunProps == nil {
		return &CtrlRunOutput{
			ControllerErr: InvalidInput,
			RunOutput:     nil,
			CommandErr:    nil,
		}
	}

	for _, agentData := range ac.agents {
		if !agentData.agent.IsReady() {
			continue
		}
		if !agentData.tryClaim() {
			continue
		}
		defer agentData.releaseClaim()

		// unpack these, easier to reference below
		agent := agentData.agent
		writerRemover := agentData.writerRemover
		preRunProps := runprops.PreRunProps
		runProps := runprops.RunProps
		data := runprops.Data

		// pre-pre run props is to actually write some the blob
		err := writerRemover.Write(data)
		if err != nil {
			print2.DebugPrintf("error writing file before running command: %v", err)
			return &CtrlRunOutput{
				ControllerErr: PreRunWriteError,
				RunOutput:     nil,
				CommandErr:    nil,
			}
		}

		if preRunProps != nil && len(preRunProps.RunArgs) > 0 {
			preRunOut, commandErr := agent.SafeRunCmd(preRunProps)
			if commandErr != nil {
				print2.DebugPrintf("error preparing command: output=%v\n \nerror=%v", preRunOut, commandErr)
				return &CtrlRunOutput{
					ControllerErr: nil,
					RunOutput:     preRunOut,
					CommandErr:    commandErr,
				}
			}
		}

		timeout := runProps.Timeout
		if timeout <= 0 {
			timeout = runtime.DefaultTimeout
		}
		nprocs := runProps.Nprocs
		if nprocs <= 0 {
			nprocs = runtime.DefaultNproc
		}
		fsize := runProps.Fsize
		if fsize <= 0 {
			fsize = runtime.DefaultFsize
		}
		cputime := runProps.Cputime
		if cputime <= 0 {
			cputime = runtime.DefaultCputime
		}
		stacksize := runProps.Stacksize
		if stacksize <= 0 {
			stacksize = runtime.DefaultStackSize
		}

		// the actual command must be run as non-root user
		runOutput, commandErr := agent.SafeRunCmd(&runtime.RunProps{
			RunArgs:   runProps.RunArgs,
			Timeout:   timeout,
			Nprocs:    nprocs,
			Fsize:     fsize,
			Cputime:   cputime,
			Stacksize: stacksize,
			Uid:       agentData.agent.RuntimeUid(),
			Gid:       agentData.agent.RuntimeGid(),
		})

		err = writerRemover.Remove()
		if err != nil {
			print2.DebugPrintf("error cleaning up")
			return &CtrlRunOutput{
				ControllerErr: PostRunPurgeError,
				RunOutput:     runOutput,
				CommandErr:    commandErr,
			}
		}
		return &CtrlRunOutput{
			ControllerErr: nil,
			RunOutput:     runOutput,
			CommandErr:    commandErr,
		}
	}

	return &CtrlRunOutput{
		ControllerErr: NoRunnerIsReady,
		RunOutput:     nil,
		CommandErr:    nil,
	}
}
