package runtime

import (
	"golang.org/x/sys/unix"
	"reflect"
	"runtime"
	"testing"
)

// TODO: these tests should verify that on linux at least one rlimit is set

func TestNewLimiterOnSelf(t *testing.T) {
	tests := []struct {
		name string
		want *OnSelf
	}{
		{
			name: "Simple New Limiter Test",
			want: &OnSelf{},
		},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			if got := NewLimiterOnSelf(); !reflect.DeepEqual(got, tt.want) {
				t.Errorf("NewLimiterOnSelf() = %v, want %v", got, tt.want)
			}
		})
	}
}

func TestNilLimiter_ApplyLimits(t *testing.T) {
	type args struct {
		rlimits *ResourceLimits
	}
	tests := []struct {
		name    string
		args    args
		wantErr bool
	}{
		{
			name: "Simple RLIMIT Test",
			args: args{rlimits: &ResourceLimits{
				NumProcesses: &unix.Rlimit{
					Cur: 2000,
					Max: 2000,
				},
				MaxFileSize: &unix.Rlimit{
					Cur: 20000,
					Max: 20000,
				},
			}},
			wantErr: false,
		},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			n := &NilLimiter{}
			if err := n.ApplyLimits(tt.args.rlimits); (err != nil) != tt.wantErr {
				t.Errorf("ApplyLimits() error = %v, wantErr %v", err, tt.wantErr)
			}
		})
	}
}

func TestOnSelf_ApplyLimits(t *testing.T) {
	type args struct {
		rlimits *ResourceLimits
	}
	tests := []struct {
		name    string
		args    args
		wantErr bool
	}{
		{
			name: "Simple RLIMIT Test",
			args: args{rlimits: &ResourceLimits{
				NumProcesses: &unix.Rlimit{
					Cur: 2000,
					Max: 2000,
				},
				MaxFileSize: &unix.Rlimit{
					Cur: 20000,
					Max: 20000,
				},
			}},
		},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			s := &OnSelf{}
			if err := s.ApplyLimits(tt.args.rlimits); (err != nil) != tt.wantErr {
				t.Errorf("ApplyLimits() error = %v, wantErr %v", err, tt.wantErr)
			}
		})
	}
}

func Test_applyLimitsLinux(t *testing.T) {
	type args struct {
		rlimits *ResourceLimits
	}
	tests := []struct {
		name    string
		args    args
		wantErr bool
	}{
		{
			name: "Simple RLIMIT Test",
			args: args{rlimits: &ResourceLimits{
				NumProcesses: &unix.Rlimit{
					Cur: 2000,
					Max: 2000,
				},
				MaxFileSize: &unix.Rlimit{
					Cur: 20000,
					Max: 20000,
				},
			}},
			wantErr: false,
		},
	}
	for _, tt := range tests {
		switch runtime.GOOS {
		case "linux":
			t.Run(tt.name, func(t *testing.T) {
				if err := applyLimitsLinux(tt.args.rlimits); (err != nil) != tt.wantErr {
					t.Errorf("applyLimitsLinux() error = %v, wantErr %v", err, tt.wantErr)
				}
				rlimitVal := &unix.Rlimit{}
				err := unix.Getrlimit(unix.RLIMIT_NPROC, rlimitVal)
				if err != nil {
					t.Errorf("error fetching limits: %v", err)
				}
				if rlimitVal.Cur != tt.args.rlimits.NumProcesses.Cur || rlimitVal.Max != tt.args.rlimits.NumProcesses.Max {
					t.Errorf("expected system rlimit %v but got: %v", tt.args.rlimits.NumProcesses, rlimitVal)
				}
				err = unix.Getrlimit(unix.RLIMIT_FSIZE, rlimitVal)
				if err != nil {
					t.Errorf("error fetching limits: %v", err)
				}
				if rlimitVal.Cur != tt.args.rlimits.MaxFileSize.Cur || rlimitVal.Max != tt.args.rlimits.MaxFileSize.Max {
					t.Errorf("expected system rlimit %v but got: %v", tt.args.rlimits.NumProcesses, rlimitVal)
				}
			})
		}
	}
}
