package linux

import (
	"fmt"
	"os"
	"path/filepath"
	"strconv"
	"strings"

	"github.com/runner-x/runner-x/engine/sandbox"
)

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

func (l CgroupLimits) hasAnyLimit() bool {
	return l.CpuCores > 0 || l.MemoryBytes > 0 || l.PidsMax > 0
}

type cgroupManager struct {
	root string
}

func newCgroupManager(root string) *cgroupManager {
	if root == "" {
		root = "/sys/fs/cgroup"
	}
	return &cgroupManager{root: root}
}

func (m *cgroupManager) setup(jobID string, limits CgroupLimits, pid int) (func(), error) {
	if !limits.hasAnyLimit() {
		return func() {}, nil
	}

	// cgroup v2 path: /sys/fs/cgroup/sandbox/<job-id>
	dir := filepath.Join(m.root, "sandbox", jobID)
	if err := os.MkdirAll(dir, 0o755); err != nil {
		return nil, err
	}

	if limits.MemoryBytes > 0 {
		if err := writeCgroupFile(dir, "memory.max", strconv.FormatInt(limits.MemoryBytes, 10)); err != nil {
			return nil, err
		}
	}
	if limits.PidsMax > 0 {
		if err := writeCgroupFile(dir, "pids.max", strconv.Itoa(limits.PidsMax)); err != nil {
			return nil, err
		}
	}
	if limits.CpuCores > 0 {
		// cpu.max format: "<quota> <period>".
		period := 100000
		quota := limits.CpuCores * period
		if err := writeCgroupFile(dir, "cpu.max", fmt.Sprintf("%d %d", quota, period)); err != nil {
			return nil, err
		}
	}

	if err := writeCgroupFile(dir, "cgroup.procs", strconv.Itoa(pid)); err != nil {
		return nil, err
	}

	cleanup := func() {
		_ = os.Remove(dir)
	}
	return cleanup, nil
}

func writeCgroupFile(dir, name, val string) error {
	path := filepath.Join(dir, name)
	return os.WriteFile(path, []byte(strings.TrimSpace(val)), 0o644)
}
