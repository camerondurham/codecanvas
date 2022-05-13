package controller

import (
	"errors"
	print2 "github.com/runner-x/runner-x/util/print"
	"path/filepath"
	"strconv"
	"sync"

	"github.com/runner-x/runner-x/engine/runtime"
)

type Controller interface {
	SubmitRequest(runprops *Props) *CtrlRunOutput
	runRequest(runprops *runtime.RunProps, agent *runtime.RuntimeAgent)
}

type CtrlErr error
type CtrlRunOutput struct {
	ControllerErr CtrlErr
	RunOutput     *runtime.RunOutput
	CommandErr    error
}

// Props store the commands to run before and after the isolated run command
type Props struct {
	Data        *Blob
	PreRunProps *runtime.RunProps
	RunProps    *runtime.RunProps
}

type AsyncController struct {
	agents map[uint]*agentData
}

type agentData struct {
	rwmutex       sync.RWMutex
	agent         runtime.Runtime
	writerRemover BlobWriterRemover
}

func NewAsyncControllerWithMap(agents map[uint]*agentData) *AsyncController {
	return &AsyncController{agents}
}

func NewAsyncController(size uint, provider runtime.ArgProvider, parentWorkdir string, pattern string) *AsyncController {
	agents := make(map[uint]*agentData)

	for i := uint(0); i < size; i++ {
		key := uint(i + 1)
		workdir := filepath.Join(parentWorkdir, pattern+strconv.FormatInt(int64(key), 10))
		agents[key] = &agentData{
			rwmutex:       sync.RWMutex{},
			agent:         runtime.NewRuntimeAgentWithIds("agent"+strconv.FormatInt(int64(key), 10), int(key), provider, workdir),
			writerRemover: NewWorkdirWriter(workdir, 0644),
		}
	}
	return &AsyncController{agents}
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
		if agentData.agent.IsReady() {

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

			if runprops.PreRunProps != nil {
				preRunOut, commandErr := agent.SafeRunCmd(preRunProps)
				print2.DebugPrintf("error preparing command: output=%v\n \nerror=%v", preRunOut, commandErr)
				if commandErr != nil {
					return &CtrlRunOutput{
						ControllerErr: PreRunError,
						RunOutput:     nil,
						CommandErr:    nil,
					}
				}
			}

			runOutput, commandErr := agent.SafeRunCmd(&runtime.RunProps{
				RunArgs: runProps.RunArgs,
				Timeout: runProps.Timeout,
				Nprocs:  runProps.Nprocs,
				Uid:     agentData.agent.RuntimeUid(),
				Gid:     agentData.agent.RuntimeGid(),
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
	}

	return &CtrlRunOutput{
		ControllerErr: NoRunnerIsReady,
		RunOutput:     nil,
		CommandErr:    nil,
	}
}
