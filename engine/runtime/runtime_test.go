package runtime

import (
	"reflect"
	"testing"
	"time"
)

func Test_RunCmd(t *testing.T) {

	type args struct {
		props *RunProps
	}

	runtimeAgent := NewTimeoutRuntime("test", &NilProvider{})

	tests := []struct {
		name    string
		args    args
		want    *RunOutput
		wantErr bool
	}{
		{
			name: "Empty RunProps",
			args: args{
				props: nil,
			},
			want:    nil,
			wantErr: false,
		},
		{
			name: "Exceed Timeout",
			args: args{
				props: &RunProps{
					RunArgs: []string{"sleep", "5"},
					Timeout: 2,
				},
			},
			want:    &RunOutput{},
			wantErr: true,
		},
		{
			name: "Print Message",
			args: args{
				props: &RunProps{
					RunArgs: []string{"echo", "hello", "world"},
					Timeout: 1,
				},
			},
			want: &RunOutput{
				Stdout: "hello world\n",
			},
			wantErr: false,
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			got, err := runtimeAgent.RunCmd(tt.args.props)
			if (err != nil) != tt.wantErr {
				t.Errorf("RunCmd() error = %v, wantErr = %v", err, tt.wantErr)
			}
			if !reflect.DeepEqual(got, tt.want) {
				t.Errorf("RunCmd() got = %v, want %v", got, tt.want)
			}
		})
	}
}

// TODO: improve this test to avoid using sleeping
func Test_SafeRunCmd(t *testing.T) {
	runtimeAgent := NewRuntimeAgentWithIds("test", 1, &NilProvider{})

	if !runtimeAgent.IsReady() {
		t.Errorf("RuntimeAgent is not ready when created")
	}

	go runtimeAgent.SafeRunCmd(&RunProps{
		RunArgs: []string{"sleep", "3"},
		Timeout: 5,
	})

	time.Sleep(time.Second * 1)

	if runtimeAgent.IsReady() {
		t.Errorf("RuntimeAgent is in state ready  while it is running a command")
	}

	// wait until process finishes
	time.Sleep(time.Second * 5)

	if !runtimeAgent.IsReady() {
		t.Errorf("RuntimeAgent did not set its state to be ready again after finishing command execution")
	}
}
