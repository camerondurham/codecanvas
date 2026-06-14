package v2

import (
	"context"
	"errors"
	"github.com/golang/mock/gomock"
	"github.com/runner-x/runner-x/engine/controller"
	mocks2 "github.com/runner-x/runner-x/engine/controller/mocks"
	"github.com/runner-x/runner-x/engine/runtime"
	"github.com/runner-x/runner-x/engine/runtime/mocks"
	"github.com/runner-x/runner-x/engine/sandbox"
	"github.com/runner-x/runner-x/util/files"
	"os"
	"reflect"
	"sync"
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
	defer files.RemovePath(dir)

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
			name: "Test Successful Run Compiled Code",
			mock: mockSuccess,
			fields: fields{
				controller: mockCtrlOk1,
				numRunners: 1,
			},
			args: args{
				props: &RunnerProps{
					Lang: Cpp.Name,
					Source: `#include<iostream>
int main() {
	std::cout << "hello world" << std::endl;
	return 0;
}`,
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

func TestCodeRunnerRunSandboxed(t *testing.T) {
	fake := &fakeSandboxRunner{
		output: &sandbox.Output{
			Stdout: "hello\n",
		},
	}
	cr := NewCodeRunnerWithSandbox(SandboxConfig{
		Runner: fake,
		Policy: sandbox.Policy{
			TimeoutSec: 3,
		},
		Images: map[string]string{
			Cpp.Name: "codecanvas/cpp:test",
		},
	})

	got, err := cr.Run(&RunnerProps{
		Lang:   Cpp.Name,
		Source: "int main() { return 0; }",
	})
	if err != nil {
		t.Fatalf("Run() error = %v", err)
	}
	if got.Stdout != "hello\n" {
		t.Fatalf("Run() stdout = %q, want hello", got.Stdout)
	}
	if fake.job.Image != "codecanvas/cpp:test" {
		t.Fatalf("sandbox image = %q, want override", fake.job.Image)
	}
	if string(fake.job.Files["run.cpp"]) != "int main() { return 0; }" {
		t.Fatalf("sandbox source file not populated")
	}
	if len(fake.job.Steps) != 2 {
		t.Fatalf("sandbox steps = %d, want 2", len(fake.job.Steps))
	}
	if !reflect.DeepEqual(fake.job.Steps[0].Args, []string{"g++", "run.cpp"}) {
		t.Fatalf("compile step = %v", fake.job.Steps[0].Args)
	}
	if !reflect.DeepEqual(fake.job.Steps[1].Args, []string{"./a.out"}) {
		t.Fatalf("run step = %v", fake.job.Steps[1].Args)
	}
	if fake.policy.TimeoutSec != 3 {
		t.Fatalf("sandbox policy timeout = %d, want 3", fake.policy.TimeoutSec)
	}
}

func TestCodeRunnerRunSandboxedCapsConcurrency(t *testing.T) {
	fake := &fakeSandboxRunner{
		output:  &sandbox.Output{},
		started: make(chan struct{}),
		release: make(chan struct{}),
	}
	cr := NewCodeRunnerWithSandbox(SandboxConfig{
		Runner:         fake,
		MaxConcurrency: 1,
	})

	firstDone := make(chan error, 1)
	go func() {
		_, err := cr.Run(&RunnerProps{
			Lang:   Python3.Name,
			Source: `print("first")`,
		})
		firstDone <- err
	}()

	<-fake.started
	_, err := cr.Run(&RunnerProps{
		Lang:   Python3.Name,
		Source: `print("second")`,
	})
	if err != controller.NoRunnerIsReady {
		t.Fatalf("second Run() error = %v, want NoRunnerIsReady", err)
	}

	close(fake.release)
	if err := <-firstDone; err != nil {
		t.Fatalf("first Run() error = %v", err)
	}
}

func TestCodeRunnerRunSandboxedPassesContext(t *testing.T) {
	fake := &fakeSandboxRunner{
		output: &sandbox.Output{},
	}
	cr := NewCodeRunnerWithSandbox(SandboxConfig{
		Runner: fake,
	})
	ctx, cancel := context.WithCancel(context.Background())
	cancel()

	_, err := cr.RunContext(ctx, &RunnerProps{
		Lang:   Python3.Name,
		Source: `print("context")`,
	})
	if err != nil {
		t.Fatalf("RunContext() error = %v", err)
	}
	fake.mu.Lock()
	gotCtx := fake.ctx
	fake.mu.Unlock()
	if gotCtx == nil {
		t.Fatalf("sandbox context was not captured")
	}
	if gotCtx.Err() != context.Canceled {
		t.Fatalf("sandbox context err = %v, want context.Canceled", gotCtx.Err())
	}
}

type fakeSandboxRunner struct {
	mu      sync.Mutex
	job     sandbox.Job
	policy  sandbox.Policy
	ctx     context.Context
	output  *sandbox.Output
	err     error
	started chan struct{}
	release chan struct{}
}

func (f *fakeSandboxRunner) Run(ctx context.Context, job sandbox.Job, policy sandbox.Policy) (*sandbox.Output, error) {
	f.mu.Lock()
	f.job = job
	f.policy = policy
	f.ctx = ctx
	started := f.started
	release := f.release
	f.mu.Unlock()

	if started != nil {
		close(started)
	}
	if release != nil {
		<-release
	}

	return f.output, f.err
}
