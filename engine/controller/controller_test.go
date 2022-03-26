package controller

import (
	"reflect"
	"testing"

	"github.com/golang/mock/gomock"
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
	// signalKilledError := errors.New("signal: killed")

	// mockReady := mocks.NewMockRuntime(ctrl)
	// mockReady.EXPECT().RunCmd(
	// 	gomock.Any(),
	// ).Return(&runtime.RunOutput{Stdout: "hello world", Stderr: ""}, nil)
	// mockReady.EXPECT().IsReady().Return(true)

	// mockNotReady := mocks.NewMockRuntime(ctrl)
	// mockNotReady.EXPECT().RunCmd(
	// 	gomock.Any(),
	// ).Return(&runtime.RunOutput{Stdout: "", Stderr: "error"}, signalKilledError)

}
