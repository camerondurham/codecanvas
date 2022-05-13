package v2

import (
	"errors"
	"fmt"
	"github.com/golang/mock/gomock"
	"github.com/runner-x/runner-x/engine/controller"
	mocks2 "github.com/runner-x/runner-x/engine/controller/mocks"
	"github.com/runner-x/runner-x/engine/runtime"
	"github.com/runner-x/runner-x/engine/runtime/mocks"
	"os"
	"reflect"
	"testing"
)

func TestCodeRunner_Run(t *testing.T) {
	type fields struct {
		controller controller.Controller
		numRunners uint
	}
	type args struct {
		props *RunnerProps
	}

	signalKilledError := errors.New("signal: killed")
	ctrl := gomock.NewController(t)
	defer ctrl.Finish()

	// run making a workdir path
	dir, _ := os.MkdirTemp("", "runner")
	defer func(path string) {
		err := os.RemoveAll(path)
		if err != nil {
			fmt.Println("error cleaning up after runner test")
		}
	}(dir)

	mockSuccess := mocks.NewMockRuntime(ctrl)
	mockSuccessWorkdir := mocks.NewMockRuntime(ctrl)
	mockFails := mocks.NewMockRuntime(ctrl)

	// TODO: make these into init functions
	mockCtrlOk1 := mocks2.NewMockController(ctrl)
	mockCtrlOk2 := mocks2.NewMockController(ctrl)
	mockCtrlOk3 := mocks2.NewMockController(ctrl)

	mockCtrlOk1.EXPECT().SubmitRequest(gomock.Any()).Return(&controller.CtrlRunOutput{
		ControllerErr: nil,
		RunOutput:     &runtime.RunOutput{Stdout: "hello world", Stderr: ""},
		CommandErr:    nil,
	}).AnyTimes()
	mockCtrlOk2.EXPECT().SubmitRequest(gomock.Any()).Return(&controller.CtrlRunOutput{
		ControllerErr: nil,
		RunOutput:     &runtime.RunOutput{Stdout: "", Stderr: "error"},
		CommandErr:    signalKilledError,
	}).AnyTimes()
	mockCtrlOk3.EXPECT().SubmitRequest(gomock.Any()).Return(&controller.CtrlRunOutput{
		ControllerErr: nil,
		RunOutput:     &runtime.RunOutput{Stdout: "hello world", Stderr: ""},
		CommandErr:    nil,
	}).AnyTimes()

	tests := []struct {
		name    string
		mock    runtime.Runtime
		fields  fields
		args    args
		want    *RunnerOutput
		wantErr bool
	}{
		{
			name: "Test Successful Run",
			mock: mockSuccess,
			fields: fields{
				controller: mockCtrlOk1,
				numRunners: 1,
			},
			args: args{
				props: &RunnerProps{
					Lang:   Python3.Name,
					Source: "print(\"hello world\")",
				},
			},
			want: &RunnerOutput{
				Stdout:       "hello world",
				Stderr:       "",
				CommandError: nil,
			},
			wantErr: false,
		},
		{
			name: "Runtime Failure",
			mock: mockFails,
			fields: fields{
				controller: mockCtrlOk2,
				numRunners: 1,
			},
			args: args{
				props: &RunnerProps{
					Lang: Shell.Name,
					Source: `
					#!/bin/bash
					sleep 10
					`},
			},
			want: &RunnerOutput{
				Stdout:       "",
				Stderr:       "error",
				CommandError: signalKilledError,
			},
			wantErr: false,
		},
		{
			name: "Test Successful Run With Workdir",
			mock: mockSuccessWorkdir,
			fields: fields{
				controller: mockCtrlOk3,
				numRunners: 1,
			},
			args: args{
				props: &RunnerProps{
					Lang:   Shell.Name,
					Source: "print(\"hello world\")",
				},
			},
			want: &RunnerOutput{
				Stdout:       "hello world",
				Stderr:       "",
				CommandError: nil,
			},
			wantErr: false,
		},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			cr := &CodeRunner{
				controller: tt.fields.controller,
				numRunners: tt.fields.numRunners,
			}
			got, err := cr.Run(tt.args.props)
			if (err != nil) != tt.wantErr {
				t.Errorf("Run() error = %v, wantErr %v", err, tt.wantErr)
				return
			}
			if !reflect.DeepEqual(got, tt.want) {
				t.Errorf("Run() got = %v, want %v", got, tt.want)
			}
		})
	}
}

func TestNewCodeRunner(t *testing.T) {
	type args struct {
		numRunners  uint
		argProvider runtime.ArgProvider
		parentDir   string
		pattern     string
	}
	type runnerProps struct {
		size uint
	}
	tests := []struct {
		name string
		args args
		want runnerProps
	}{
		{
			name: "Trivial Single Runner",
			args: args{
				numRunners:  1,
				argProvider: &runtime.NilProvider{},
				parentDir:   "/tmp",
				pattern:     "runner",
			},
			want: runnerProps{size: 1},
		},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			if got := NewCodeRunner(tt.args.numRunners, tt.args.argProvider, tt.args.parentDir, tt.args.pattern); got.numRunners != tt.want.size || got.controller == nil {
				t.Errorf("NewCodeRunner() = %v, want %v runners, controller is %v", got, tt.want, got)
			}
		})
	}
}
