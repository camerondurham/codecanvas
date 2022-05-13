package controller

import (
	"errors"
	mocks3 "github.com/runner-x/runner-x/engine/controller/writerremover/mocks"
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
			ac := NewAsyncController(tt.numAgents, &runtime.ProcessorArgsProvider{}, "", "")
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

	preRunProps := &runtime.RunProps{
		RunArgs: []string{"echo", "hello", "world"},
		Timeout: 0,
		Uid:     0,
		Gid:     0,
		Nprocs:  0,
	}

	tests := []struct {
		name     string
		runProps *Props
		mockInfo []mockProps
		want     CtrlRunOutput
	}{
		{
			name:     "Invalid input: props nil",
			runProps: nil,
			mockInfo: []mockProps{
				{
					state:                  runtime.Ready,
					shouldBePickedAsRunner: true,
				},
			},
			want: CtrlRunOutput{
				ControllerErr: InvalidInput,
			},
		},
		{
			name:     "Invalid input: RunProps nil",
			runProps: &Props{},
			mockInfo: []mockProps{
				{
					state:                  runtime.Ready,
					shouldBePickedAsRunner: true,
				},
			},
			want: CtrlRunOutput{
				ControllerErr: InvalidInput,
			},
		},
		{
			name: "No runner ready",
			runProps: &Props{
				RunProps: &runtime.RunProps{},
			},
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
			want: CtrlRunOutput{
				ControllerErr: NoRunnerIsReady,
			},
		},
		{
			name: "First runner is ready",
			runProps: &Props{
				RunProps: &runtime.RunProps{},
			},
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
			want: CtrlRunOutput{
				ControllerErr: nil,
				RunOutput:     happyCaseOutput,
				CommandErr:    nil,
			},
		},
		{
			name: "Runner in middle is ready",
			runProps: &Props{
				RunProps: &runtime.RunProps{},
			},
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
			want: CtrlRunOutput{
				ControllerErr: nil,
				RunOutput:     happyCaseOutput,
				CommandErr:    nil,
			},
		},
		{
			name: "Last runner is ready",
			runProps: &Props{
				RunProps: &runtime.RunProps{},
			},
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
			want: CtrlRunOutput{
				ControllerErr: nil,
				RunOutput:     happyCaseOutput,
				CommandErr:    nil,
			},
		},
		{
			name: "Last runner is ready: write error",
			runProps: &Props{
				RunProps: &runtime.RunProps{},
			},
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
					writeErr:               errors.New("some error"),
				},
			},
			want: CtrlRunOutput{
				ControllerErr: PreRunWriteError,
				RunOutput:     nil,
				CommandErr:    nil,
			},
		},
		{
			name: "Last runner is ready: post run write error",
			runProps: &Props{
				RunProps: &runtime.RunProps{},
			},
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
					writeErr:               nil,
					postRunRemoveErr:       errors.New("some error"),
				},
			},
			want: CtrlRunOutput{
				ControllerErr: PostRunPurgeError,
				RunOutput:     happyCaseOutput,
				CommandErr:    nil,
			},
		},
		{
			name: "Last runner is ready: pre run cmd error",
			runProps: &Props{
				PreRunProps: preRunProps,
				RunProps:    &runtime.RunProps{},
			},
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
					writeErr:               nil,
					preRunErr:              errors.New("some error"),
					preRunCmd:              preRunProps,
				},
			},
			want: CtrlRunOutput{
				ControllerErr: PreRunError,
				RunOutput:     nil,
				CommandErr:    nil,
			},
		}}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			asyncController := createMocksWithState(tt.mockInfo, ctrl)
			got := asyncController.SubmitRequest(tt.runProps)
			if got.ControllerErr != tt.want.ControllerErr {
				t.Errorf("Run() got = %v, want = %v", got.ControllerErr, tt.want.ControllerErr)
			}
			if got.CommandErr != tt.want.CommandErr {
				t.Errorf("Run() got = %v, want = %v", got.CommandErr, tt.want.CommandErr)
			}
			if got.RunOutput != tt.want.RunOutput {
				t.Errorf("Run() got = %v, want = %v", got.RunOutput, tt.want.RunOutput)
			}
		})
	}
}

type mockProps struct {
	state                  runtime.State
	shouldBePickedAsRunner bool
	returnOutput           *runtime.RunOutput
	returnErr              error
	writeErr               error
	postRunRemoveErr       error
	preRunErr              error
	preRunCmd              *runtime.RunProps
}

func createMocksWithState(stateArray []mockProps, ctrl *gomock.Controller) *AsyncController {
	agents := make(map[uint]*agentData)

	for index, mockProp := range stateArray {
		key := uint(index + 1)
		runtimeMock := mocks.NewMockRuntime(ctrl)

		// every agent should be checked at most once to see if it's ready
		runtimeMock.EXPECT().IsReady().MaxTimes(1).Return(mockProp.state == runtime.Ready)

		// do not expect these to be called every time since some tests will exit early when there is invalid input
		runtimeMock.EXPECT().RuntimeUid().AnyTimes().Return(1234)
		runtimeMock.EXPECT().RuntimeGid().AnyTimes().Return(1234)

		if mockProp.preRunCmd != nil && mockProp.preRunErr != nil {
			runtimeMock.EXPECT().SafeRunCmd(gomock.Eq(mockProp.preRunCmd)).Return(nil, mockProp.preRunErr)
		}

		if mockProp.shouldBePickedAsRunner {
			runtimeMock.EXPECT().SafeRunCmd(gomock.Any()).MaxTimes(1).Return(mockProp.returnOutput, mockProp.returnErr)
		}

		writerRemoverMock := mocks3.NewMockBlobWriterRemover(ctrl)
		if mockProp.writeErr != nil {
			writerRemoverMock.EXPECT().Write(gomock.Any()).Return(mockProp.writeErr)
		} else {
			writerRemoverMock.EXPECT().Write(gomock.Any()).AnyTimes()
		}

		if mockProp.postRunRemoveErr != nil {
			writerRemoverMock.EXPECT().Remove().Return(mockProp.postRunRemoveErr)
		} else {
			writerRemoverMock.EXPECT().Remove().MaxTimes(1)
		}
		agents[key] = &agentData{
			rwmutex:       sync.RWMutex{},
			agent:         runtimeMock,
			writerRemover: writerRemoverMock,
		}
	}

	return &AsyncController{agents}
}
