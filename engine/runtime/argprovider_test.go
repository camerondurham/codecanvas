package runtime

import (
	"context"
	"os/exec"
	"testing"
)

func TestNilProvider_Provide(t *testing.T) {
	type args struct {
		ctx      *context.Context
		runprops *RunProps
	}
	testContext := context.Background()
	tests := []struct {
		name string
		args args
		want *exec.Cmd
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
			want: exec.CommandContext(testContext, "echo", []string{"hello"}...),
		},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			p := &NilProvider{}
			assertCommand(t, p.Provide(tt.args.ctx, tt.args.runprops), tt.want)
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
		name string
		args args
		want *exec.Cmd
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
			want: exec.CommandContext(testContext, "echo", []string{"hello"}...),
		},
		// TODO: Add test cases.
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			p := &ProcessorArgsProvider{}
			got := p.Provide(tt.args.ctx, tt.args.runprops)
			if got.Path != ProcessCommandName {
				t.Errorf("Provide() path = %v, want %v", got.Path, ProcessCommandName)
			}
			wantArgs := []string{
				ProcessCommandName,
				"-nprocs=2",
				"-uid=0",
				"-gid=0",
				"-fsize=0",
				"-timeout=1",
				"-cputime=0",
				"-cmd=echo",
				"hello",
			}
			assertArgs(t, got.Args, wantArgs)
		})
	}
}

func assertCommand(t *testing.T, got *exec.Cmd, want *exec.Cmd) {
	t.Helper()
	if got.Path != want.Path {
		t.Errorf("command path = %v, want %v", got.Path, want.Path)
	}
	assertArgs(t, got.Args, want.Args)
}

func assertArgs(t *testing.T, got []string, want []string) {
	t.Helper()
	if len(got) != len(want) {
		t.Fatalf("args = %v, want %v", got, want)
	}
	for i := range got {
		if got[i] != want[i] {
			t.Fatalf("args = %v, want %v", got, want)
		}
	}
}
