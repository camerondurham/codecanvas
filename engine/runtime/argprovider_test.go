package runtime

import (
	"context"
	"os/exec"
	"path/filepath"
	"reflect"
	"testing"
)

func assertCommand(t *testing.T, got *exec.Cmd, wantName string, wantArgs []string) {
	t.Helper()
	if got == nil {
		t.Fatalf("Provide() returned nil command")
	}
	if filepath.Base(got.Path) != wantName {
		t.Fatalf("unexpected command path: got=%q want command=%q", got.Path, wantName)
	}
	want := append([]string{wantName}, wantArgs...)
	if !reflect.DeepEqual(got.Args, want) {
		t.Fatalf("unexpected command args: got=%v want=%v", got.Args, want)
	}
}

func TestNilProvider_Provide(t *testing.T) {
	type args struct {
		ctx      *context.Context
		runprops *RunProps
	}
	testContext := context.Background()
	tests := []struct {
		name     string
		args     args
		wantName string
		wantArgs []string
	}{
		{
			name: "Nil Provider Test",
			args: args{
				ctx: &testContext,
				runprops: &RunProps{
					RunArgs: []string{"echo", "hello"},
					Timeout: 1,
					Uid:     0,
					Gid:     0,
					Nprocs:  2,
				},
			},
			wantName: "echo",
			wantArgs: []string{"hello"},
		},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			p := &NilProvider{}
			assertCommand(t, p.Provide(tt.args.ctx, tt.args.runprops), tt.wantName, tt.wantArgs)
		})
	}
}

func TestProcessorArgsProvider_Provide(t *testing.T) {
	type args struct {
		ctx      *context.Context
		runprops *RunProps
	}
	testContext := context.Background()
	tests := []struct {
		name     string
		args     args
		wantName string
		wantArgs []string
	}{
		{
			name: "ProcessorArgsProvider Placeholder",
			args: args{
				ctx: &testContext,
				runprops: &RunProps{
					RunArgs: []string{"echo", "hello"},
					Timeout: 1,
					Uid:     0,
					Gid:     0,
					Nprocs:  2,
				},
			},
			wantName: ProcessCommandName,
			wantArgs: []string{
				"-nprocs=2",
				"-uid=0",
				"-gid=0",
				"-fsize=0",
				"-timeout=1",
				"-cputime=0",
				"-cmd=echo",
				"hello",
			},
		},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			p := &ProcessorArgsProvider{}
			assertCommand(t, p.Provide(tt.args.ctx, tt.args.runprops), tt.wantName, tt.wantArgs)
		})
	}
}
