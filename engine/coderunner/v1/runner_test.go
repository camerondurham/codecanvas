package v1

import (
	"errors"
	"fmt"
	"os"
	"reflect"
	"testing"

	"github.com/golang/mock/gomock"
	"github.com/runner-x/runner-x/engine/runtime"
	"github.com/runner-x/runner-x/engine/runtime/mocks"
)

func TestCodeRunner_Run(t *testing.T) {
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

	// happy case
	mockSuccess.EXPECT().RunCmd(
		gomock.Any(),
	).Return(&runtime.RunOutput{Stdout: "hello world", Stderr: ""}, nil)
	mockSuccessWorkdir.EXPECT().RunCmd(
		gomock.Any(),
	).Return(&runtime.RunOutput{Stdout: "hello world", Stderr: ""}, nil)

	mockFails.EXPECT().RunCmd(
		gomock.Any(),
	).Return(&runtime.RunOutput{Stdout: "", Stderr: "error"}, signalKilledError)

	tests := []struct {
		name    string
		mock    runtime.Runtime
		args    args
		workdir string
		want    *RunnerOutput
		wantErr bool
	}{
		{
			name: "Test Successful Run",
			mock: mockSuccess,
			args: args{
				props: &RunnerProps{
					Lang:   PYTHON3,
					Source: "print(\"hello world\")",
				},
			},
			workdir: "",
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
			args: args{
				props: &RunnerProps{
					Lang: SHELL,
					Source: `
					#!/bin/bash
					sleep 10
					`},
			},
			workdir: "",
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
			args: args{
				props: &RunnerProps{
					Lang:   PYTHON3,
					Source: "print(\"hello world\")",
				},
			},
			workdir: dir,
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

			d := &CodeRunner{runner: tt.mock, workdirPath: tt.workdir}
			got, err := d.Run(tt.args.props)
			if (err != nil) != tt.wantErr {
				t.Errorf("Run() error : %v, wantErr %v", err, tt.wantErr)
			}
			if !reflect.DeepEqual(got, tt.want) {
				t.Errorf("Run() got = %v, want %v", got, tt.want)
			}
		})
	}
}

func TestNewCodeRunner(t *testing.T) {
	type args struct {
		id  string
		dir string
		p   runtime.ArgProvider
	}
	tests := []struct {
		name string
		args args
		want *CodeRunner
	}{
		{
			name: "Create Code Runner Test",
			args: args{
				id:  "1",
				dir: "/tmp",
				p:   &runtime.NilProvider{},
			},
			want: &CodeRunner{
				runner:      runtime.NewTimeoutRuntime("1", &runtime.NilProvider{}),
				workdirPath: "/tmp",
			},
		},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			if got := NewCodeRunner(tt.args.id, tt.args.dir, tt.args.p); !reflect.DeepEqual(got, tt.want) {
				t.Errorf("NewCodeRunner() = %v, want %v", got, tt.want)
			}
		})
	}
}
