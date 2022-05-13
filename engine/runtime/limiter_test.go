package runtime

import (
	"reflect"
	"testing"
)

// TODO: these tests should verify that on linux at least one rlimit is set

func TestNewLimiterOnSelf(t *testing.T) {
	tests := []struct {
		name string
		want *OnSelf
	}{
		// TODO: Add test cases.
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
		// TODO: Add test cases.
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
		// TODO: Add test cases.
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
		// TODO: Add test cases.
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			if err := applyLimitsLinux(tt.args.rlimits); (err != nil) != tt.wantErr {
				t.Errorf("applyLimitsLinux() error = %v, wantErr %v", err, tt.wantErr)
			}
		})
	}
}
