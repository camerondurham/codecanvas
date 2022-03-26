package controller

import (
	"reflect"
	"sync"
	"testing"

	"github.com/golang/mock/gomock"
	"github.com/runner-x/runner-x/engine/runtime"
	"github.com/runner-x/runner-x/engine/runtime/mocks"
)

func TestNewAsyncController(t *testing.T) {

	tests := []struct {
		name      string
		numAgents uint
	}{
		{
			name:      "Single Agent Map",
			numAgents: 1,
		},
		{
			name:      "One Hundred Agent Map",
			numAgents: 100,
		},
		{
			name:      "Zero Agent Map",
			numAgents: 0,
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			ac := NewAsyncController(tt.numAgents)
			m := ac.agents
			if len(m) != int(tt.numAgents) {
				t.Errorf("incorrect map size: got %d, want %d", len(m), tt.numAgents)
			}
			for k, v := range m {
				if k <= 0 {
					t.Errorf("found key <= 0")
				}
				if !v.agent.IsReady() {
					t.Errorf("found agent in new async controller in a non-ready state")
				}
				if v.agent.RuntimeUid() != int(k) || v.agent.RuntimeGid() != int(k) {
					t.Errorf("found agent with invalid initialization of Uid or Gid: expected value = %d, got uid = %d, gid = %d", k, v.agent.RuntimeUid(), v.agent.RuntimeGid())
				}
			}
		})
	}

}

// This is unbelieveably trivial and probably shouldn't be written but I want to make sure it works how expected anyway :P
func TestNewAsyncControllerWithMap(t *testing.T) {
	emptyMap := make(map[uint]*agentData)
	nonEmptyMap := make(map[uint]*agentData)
	nonEmptyMap[1] = &agentData{}

	tests := []struct {
		name               string
		agentMap           map[uint]*agentData
		expectedController *AsyncController
	}{
		{
			name:               "Basic empty map",
			agentMap:           emptyMap,
			expectedController: &AsyncController{agents: emptyMap},
		},
		{
			name:               "Non empty map",
			agentMap:           nonEmptyMap,
			expectedController: &AsyncController{agents: nonEmptyMap},
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			ac := NewAsyncControllerWithMap(tt.agentMap)
			if !reflect.DeepEqual(ac, tt.expectedController) {
				t.Errorf("Run() got = %v, want %v", ac, tt.expectedController)
			}
		})
	}
}

func TestSubmitRequest(t *testing.T) {

	ctrl := gomock.NewController(t)
	defer ctrl.Finish()

	happyCaseOutput := &runtime.RunOutput{
		Stdout: "hello",
		Stderr: "world",
	}

	tests := []struct {
		name     string
		runProps *runtime.RunProps
		mockInfo []mockProps
		want     ControllerRunOutput
	}{
		{
			name:     "Invalid input",
			runProps: nil,
			mockInfo: []mockProps{
				{
					state:                  runtime.Ready,
					shouldBePickedAsRunner: true,
				},
			},
			want: ControllerRunOutput{
				controllerErr: InvalidInput,
			},
		},
		{
			name:     "No runner ready",
			runProps: &runtime.RunProps{},
			mockInfo: []mockProps{
				{
					state:                  runtime.NotReady,
					shouldBePickedAsRunner: false,
				},
				{
					state:                  runtime.NotReady,
					shouldBePickedAsRunner: false,
				},
			},
			want: ControllerRunOutput{
				controllerErr: NoRunnerIsReady,
			},
		},
		{
			name:     "First runner is ready",
			runProps: &runtime.RunProps{},
			mockInfo: []mockProps{
				{
					state:                  runtime.Ready,
					shouldBePickedAsRunner: true,
					returnOutput:           happyCaseOutput,
					returnErr:              nil,
				},
				{
					state:                  runtime.NotReady,
					shouldBePickedAsRunner: false,
				},
				{
					state:                  runtime.NotReady,
					shouldBePickedAsRunner: false,
				},
			},
			want: ControllerRunOutput{
				controllerErr: nil,
				runOutput:     happyCaseOutput,
				commandErr:    nil,
			},
		},
		{
			name:     "Runner in middle is ready",
			runProps: &runtime.RunProps{},
			mockInfo: []mockProps{
				{
					state:                  runtime.NotReady,
					shouldBePickedAsRunner: false,
				},
				{
					state:                  runtime.Ready,
					shouldBePickedAsRunner: true,
					returnOutput:           happyCaseOutput,
					returnErr:              nil,
				},
				{
					state:                  runtime.NotReady,
					shouldBePickedAsRunner: false,
				},
			},
			want: ControllerRunOutput{
				controllerErr: nil,
				runOutput:     happyCaseOutput,
				commandErr:    nil,
			},
		},
		{
			name:     "Last runner is ready",
			runProps: &runtime.RunProps{},
			mockInfo: []mockProps{
				{
					state:                  runtime.NotReady,
					shouldBePickedAsRunner: false,
				},
				{
					state:                  runtime.NotReady,
					shouldBePickedAsRunner: false,
				},
				{
					state:                  runtime.Ready,
					shouldBePickedAsRunner: true,
					returnOutput:           happyCaseOutput,
					returnErr:              nil,
				},
			},
			want: ControllerRunOutput{
				controllerErr: nil,
				runOutput:     happyCaseOutput,
				commandErr:    nil,
			},
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			asyncController := createMocksWithState(tt.mockInfo, ctrl)
			got := asyncController.SubmitRequest(tt.runProps)
			if got.controllerErr != tt.want.controllerErr {
				t.Errorf("Run() got = %v, want = %v", got.controllerErr, tt.want.controllerErr)
			}
			if got.commandErr != tt.want.commandErr {
				t.Errorf("Run() got = %v, want = %v", got.commandErr, tt.want.commandErr)
			}
			if got.runOutput != tt.want.runOutput {
				t.Errorf("Run() got = %v, want = %v", got.runOutput, tt.want.runOutput)
			}
		})
	}
}

type mockProps struct {
	state                  runtime.State
	shouldBePickedAsRunner bool
	returnOutput           *runtime.RunOutput
	returnErr              error
}

func createMocksWithState(stateArray []mockProps, ctrl *gomock.Controller) *AsyncController {
	agents := make(map[uint]*agentData)

	for index, mockProp := range stateArray {
		key := uint(index + 1)
		runtimeMock := mocks.NewMockRuntime(ctrl)
		runtimeMock.EXPECT().IsReady().MaxTimes(1).Return(mockProp.state == runtime.Ready)
		if mockProp.shouldBePickedAsRunner {
			runtimeMock.EXPECT().SafeRunCmd(gomock.Any()).MaxTimes(1).Return(mockProp.returnOutput, mockProp.returnErr)
		}
		agents[key] = &agentData{
			rwmutex: sync.RWMutex{},
			agent:   runtimeMock,
		}
	}

	return &AsyncController{agents}
}
