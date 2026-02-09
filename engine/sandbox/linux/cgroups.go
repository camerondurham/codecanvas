package linux

import "github.com/runner-x/runner-x/engine/sandbox"

// CgroupLimits is the cgroup-friendly representation of policy limits.
type CgroupLimits struct {
	CpuCores    int
	MemoryBytes int64
	PidsMax     int
}

func limitsFromPolicy(policy sandbox.SandboxPolicy) CgroupLimits {
	return CgroupLimits{
		CpuCores:    policy.CpuCores,
		MemoryBytes: policy.MemoryBytes,
		PidsMax:     policy.PidsMax,
	}
}
