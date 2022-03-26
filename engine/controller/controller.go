package controller

import (
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

func NewAsyncControllerWithMap(a map[uint]*agentData) *AsyncController {
	return &AsyncController{agents: a}
}

func NewAsyncController(size uint) *AsyncController {
	m := make(map[uint]*agentData)

	for i := uint(0); i < size; i++ {
		key := uint(i + 1)
		m[key] = &agentData{
			rwmutex: sync.RWMutex{},
			agent: runtime.NewRuntimeAgentWithIds(
				"agent_"+strconv.FormatInt(int64(key), 10),
				int(key),
				&runtime.ProcessorArgsProvider{}),
		}
	}
	return &AsyncController{agents: m}
}

// SubmitRequest will run a command on the first runner agent it finds that is ready
func (ac *AsyncController) SubmitRequest(runprops *runtime.RunProps) (*runtime.RunOutput, error) {
	panic("not implemented yet")
}
