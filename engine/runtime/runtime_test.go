package runtime

import (
	"reflect"
	"syscall"
	"testing"
)

func Test_RunCmd(t *testing.T) {

	type args struct {
		props *RunProps
	}

	runtimeAgent := NewTimeoutRuntime("test")

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
					Root:     "rootfs",
					// Rlimits:  []POSIXRlimit{},
					Rlimits:  []syscall.Rlimit{},
					Hostname: "host",
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
					Root:     "rootfs",
					Rlimits:  []syscall.Rlimit{},
					Hostname: "host",
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
