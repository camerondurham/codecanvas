package v2

import (
	"github.com/runner-x/runner-x/engine/controller"
	"github.com/runner-x/runner-x/engine/runtime"
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
	tests := []struct {
		name    string
		fields  fields
		args    args
		want    *RunnerOutput
		wantErr bool
	}{
		// TODO: Add test cases.
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
