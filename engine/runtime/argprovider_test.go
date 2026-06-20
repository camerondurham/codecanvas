package runtime

import (
	"context"
	"os/exec"
	"reflect"
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
			got := p.Provide(tt.args.ctx, tt.args.runprops)
			if got.Path != tt.want.Path {
				t.Errorf("Provide().Path = %v, want %v", got.Path, tt.want.Path)
			}
			if !reflect.DeepEqual(got.Args, tt.want.Args) {
				t.Errorf("Provide().Args = %v, want %v", got.Args, tt.want.Args)
			}
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
			if got.Path == "" {
				t.Errorf("Provide().Path should not be empty")
			}
		})
	}
}
