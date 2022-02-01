package coderunner

import (
	"errors"
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

	mockSuccess := mocks.NewMockRuntime(ctrl)
	mockFails := mocks.NewMockRuntime(ctrl)

	// happy case
	mockSuccess.EXPECT().RunCmd(
		gomock.Any(),
	).Return(&runtime.RunOutput{Stdout: "hello world", Stderr: ""}, nil)

	mockFails.EXPECT().RunCmd(
		gomock.Any(),
	).Return(&runtime.RunOutput{Stdout: "", Stderr: "error"}, signalKilledError)

	tests := []struct {
		name    string
		mock    runtime.Runtime
		args    args
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
			want: &RunnerOutput{
				Stdout:       "",
				Stderr:       "error",
				CommandError: signalKilledError,
			},
			wantErr: false,
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {

			d := &CodeRunner{runner: tt.mock, workdirPath: ""}
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
