package runtime

import (
	"reflect"
	"runtime"
	"testing"

	"golang.org/x/sys/unix"
)

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

// TODO: test that limits are not actually changed (low priority)
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
				MaxCpuTime: &unix.Rlimit{
					Cur: 60,
					Max: 120,
				},
				MaxStackSize: &unix.Rlimit{
					Cur: 524288,
					Max: 524288,
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
				MaxCpuTime: &unix.Rlimit{
					Cur: 60,
					Max: 120,
				},
				MaxStackSize: &unix.Rlimit{
					Cur: 524288,
					Max: 524288,
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

// Test_applyLimitsLinux actually verifies RLIMITs are changed after running
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
				MaxCpuTime: &unix.Rlimit{
					Cur: 60,
					Max: 120,
				},
				MaxStackSize: &unix.Rlimit{
					Cur: 524288,
					Max: 524288,
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
				getRlimit(unix.RLIMIT_NPROC, rlimitVal, t)
				if rlimitVal.Cur != tt.args.rlimits.NumProcesses.Cur || rlimitVal.Max != tt.args.rlimits.NumProcesses.Max {
					t.Errorf("expected system rlimit %v but got: %v", tt.args.rlimits.NumProcesses, rlimitVal)
				}
				getRlimit(unix.RLIMIT_FSIZE, rlimitVal, t)
				if rlimitVal.Cur != tt.args.rlimits.MaxFileSize.Cur || rlimitVal.Max != tt.args.rlimits.MaxFileSize.Max {
					t.Errorf("expected system rlimit %v but got: %v", tt.args.rlimits.MaxFileSize, rlimitVal)
				}

				getRlimit(unix.RLIMIT_CPU, rlimitVal, t)
				if rlimitVal.Cur != tt.args.rlimits.MaxCpuTime.Cur || rlimitVal.Max != tt.args.rlimits.MaxCpuTime.Max {
					t.Errorf("expected system rlimit %v but got: %v", tt.args.rlimits.MaxCpuTime, rlimitVal)
				}

				getRlimit(unix.RLIMIT_STACK, rlimitVal, t)
				if rlimitVal.Cur != tt.args.rlimits.MaxStackSize.Cur || rlimitVal.Max != tt.args.rlimits.MaxStackSize.Max {
					t.Errorf("expected system rlimit %v but got: %v", tt.args.rlimits.MaxStackSize, rlimitVal)
				}
			})
		}
	}
}

func getRlimit(identifier int, rlimitVal *unix.Rlimit, t *testing.T) {
	err := unix.Getrlimit(identifier, rlimitVal)
	if err != nil {
		t.Errorf("error fetching limits: %v", err)
	}
}
