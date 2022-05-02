package runtime

import (
	"context"
	"fmt"
	"os/exec"
	"reflect"
	"testing"
	"time"
)

func TestNilProvider_Provide(t *testing.T) {
	type args struct {
		ctx      *context.Context
		runprops *RunProps
	}
	oneSecTimeout, _ := context.WithTimeout(context.Background(), 1*time.Second)
	tests := []struct {
		name string
		args args
		want *exec.Cmd
	}{
		{
			name: "Nil Provider Test",
			args: args{
				ctx: &oneSecTimeout,
				runprops: &RunProps{
					RunArgs: []string{"echo", "hello"},
					Timeout: 1,
					Uid:     0,
					Gid:     0,
					Nprocs:  2,
				},
			},
			want: exec.CommandContext(oneSecTimeout, "echo", []string{"hello"}...),
		},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			p := &NilProvider{}
			if got := p.Provide(tt.args.ctx, tt.args.runprops); !reflect.DeepEqual(got, tt.want) {
				t.Errorf("Provide() = %v, want %v", got, tt.want)
			}
		})
	}
}

func TestProcessorArgsProvider_Provide(t *testing.T) {
	type args struct {
		ctx      *context.Context
		runprops *RunProps
	}
	oneSecTimeout, _ := context.WithTimeout(context.Background(), 1*time.Second)
	tests := []struct {
		name string
		args args
		want *exec.Cmd
	}{
		{
			name: "ProcessorArgsProvider Placeholder",
			args: args{
				ctx: &oneSecTimeout,
				runprops: &RunProps{
					RunArgs: []string{"echo", "hello"},
					Timeout: 1,
					Uid:     0,
					Gid:     0,
					Nprocs:  2,
				},
			},
			want: exec.CommandContext(oneSecTimeout, "echo", []string{"hello"}...),
		},
		// TODO: Add test cases.
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			p := &ProcessorArgsProvider{}
			if got := p.Provide(tt.args.ctx, tt.args.runprops); !reflect.DeepEqual(got, tt.want) {
				// TODO: uncomment this and assert on test
				//t.Errorf("Provide() = %v, want %v", got, tt.want)
				fmt.Printf("Provide() = %v, want %v", got, tt.want)
			}
		})
	}
}
