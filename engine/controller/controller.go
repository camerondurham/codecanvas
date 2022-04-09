package controller

import (
	"errors"
	"strconv"
	"sync"

	"github.com/runner-x/runner-x/engine/runtime"
)

type Controller interface {
	SubmitRequest(runprops *runtime.RunProps) (*runtime.RunOutput, error)
	runRequest(runprops *runtime.RunProps, agent *runtime.RuntimeAgent)
}

type AsyncController struct {
	agents map[uint]*agentData
}

type agentData struct {
	rwmutex sync.RWMutex
	agent   runtime.Runtime
}

func NewAsyncControllerWithMap(agents map[uint]*agentData) *AsyncController {
	return &AsyncController{agents}
}

func NewAsyncController(size uint, provider runtime.ArgProvider) *AsyncController {
	agents := make(map[uint]*agentData)

	for i := uint(0); i < size; i++ {
		key := uint(i + 1)
		agents[key] = &agentData{
			rwmutex: sync.RWMutex{},
			agent: runtime.NewRuntimeAgentWithIds(
				"agent_"+strconv.FormatInt(int64(key), 10),
				int(key),
				provider),
		}
	}
	return &AsyncController{agents}
}

type ControllerError error

var (
	NoRunnerIsReady = ControllerError(errors.New("no runner available"))
	InvalidInput    = ControllerError(errors.New("invalid input"))
)

type ControllerRunOutput struct {
	ControllerErr ControllerError
	RunOutput     *runtime.RunOutput
	CommandErr    error
}

// SubmitRequest will run a command on the first runner agent it finds that is ready
func (ac *AsyncController) SubmitRequest(runprops *runtime.RunProps) *ControllerRunOutput {

	if runprops == nil {
		return &ControllerRunOutput{
			ControllerErr: InvalidInput,
			RunOutput:     nil,
			CommandErr:    nil,
		}
	}

	for _, agentData := range ac.agents {
		if agentData.agent.IsReady() {
			runOutput, commandErr := agentData.agent.SafeRunCmd(&runtime.RunProps{
				RunArgs: runprops.RunArgs,
				Timeout: runprops.Timeout,
				Nprocs:  runprops.Nprocs,
				Uid:     agentData.agent.RuntimeUid(),
				Gid:     agentData.agent.RuntimeGid(),
			})
			return &ControllerRunOutput{
				ControllerErr: nil,
				RunOutput:     runOutput,
				CommandErr:    commandErr,
			}
		}
	}

	return &ControllerRunOutput{
		ControllerErr: NoRunnerIsReady,
		RunOutput:     nil,
		CommandErr:    nil,
	}
}
