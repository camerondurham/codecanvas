# Sandbox-First Redesign Specification

This document is a concrete, implementation-ready specification for rebuilding the execution engine around **sandbox-first primitives**. The goal is to replace the current “exec + ulimit” runtime with a Linux namespace + cgroup based sandbox runner while preserving the existing controller/runner flow.

---

## Goals

### Primary
- **Hard isolation**: separate PID, mount, UTS, and user namespaces for each run.
- **Deterministic resource limits**: enforce CPU, memory, and PIDs using cgroups.
- **Minimal host exposure**: run with a scratch filesystem; no network by default.
- **API compatibility**: keep the existing CodeRunner + Controller flow intact.

### Non-goals (for the initial POC)
- Full container image support (e.g., OCI images).
- Multi-node scheduling.
- Network policy enforcement beyond “no network”.

---

## Proposed Architecture (Sandbox-First)

### 1) New Interfaces
Create a new sandbox runtime module that becomes the primary execution abstraction.

```go
// engine/sandbox/types.go
package sandbox

type SandboxPolicy struct {
  CpuCores     int   // cpu quota or shares
  MemoryBytes  int64 // memory limit
  PidsMax      int   // max processes
  TimeoutSec   int   // wall-clock timeout
  EnableNet    bool  // default: false
  ReadonlyRoot bool  // default: true
}

type SandboxInput struct {
  SourceFiles map[string][]byte // filename -> contents
  WorkDir     string
  Command     []string
}

type SandboxOutput struct {
  Stdout string
  Stderr string
  ExitCode int
}

type SandboxRunner interface {
  Run(input SandboxInput, policy SandboxPolicy) (*SandboxOutput, error)
}
```

### 2) Linux Sandbox Implementation
Add a `linux` sandbox implementation using namespaces, cgroups, and seccomp (phase 2).

```
engine/sandbox/
  linux/
    runner.go
    namespaces.go
    cgroups.go
    filesystem.go
    seccomp.go (phase 2)
```

### 3) Integration Points
- **CodeRunner** builds compile/run commands and passes them to the sandbox runner.
- **Controller** remains the concurrency + scheduling layer.
- **RuntimeAgent** becomes a thin wrapper around `SandboxRunner`.

---

## Implementation Checklist (Actionable)

### Phase 0 — Repo scaffolding
- [ ] Create `engine/sandbox` module with types and interfaces.
- [ ] Add a `linux` subpackage for namespace + cgroup implementation.
- [ ] Add basic logging utilities (reusing existing `util/print`).

**Success criteria**
- `go test ./...` succeeds with the new module added.

---

### Phase 1 — Linux namespace runner (no cgroups yet)
- [ ] Implement `unshare` / `clone` logic (PID + mount + UTS + IPC).
- [ ] Ensure child process runs with isolated namespace context.
- [ ] Mount a tmpfs or scratch directory as root; bind-mount language runtimes as needed.
- [ ] Disable network by default (unshare network namespace, no interfaces).
- [ ] Route stdout/stderr to parent for capture.

**Success criteria**
- Running a sandboxed command cannot see host processes (`ps` shows only itself).
- Running inside sandbox cannot access `/etc/shadow` or host filesystem.
- No outbound network unless explicitly enabled.

**Testing criteria**
- ✅ `go test ./engine/sandbox/linux -run TestNamespaces`
- ✅ Integration test that runs `ls /` inside sandbox and confirms minimal FS.

---

### Phase 2 — Cgroup enforcement
- [ ] Implement `cgroups.go` with CPU, memory, and pids cgroup setup (v2 preferred).
- [ ] Apply resource limits before running the child process.
- [ ] Ensure subprocess trees are restricted.

**Success criteria**
- CPU-bound infinite loop is throttled and/or killed by cgroup limits.
- Memory exhaustion triggers OOM kill within sandbox, not host.
- Fork bomb fails with `pids.max` restriction.

**Testing criteria**
- ✅ `go test ./engine/sandbox/linux -run TestCgroupLimits`
- ✅ Manual: run a fork bomb script and ensure it terminates without host impact.

---

### Phase 3 — Wire into CodeRunner
- [ ] Replace `RuntimeAgent.SafeRunCmd` usage with `SandboxRunner.Run`.
- [ ] Convert `RunnerProps` into `SandboxInput`.
- [ ] Maintain compile → run flow (compile step also sandboxed).

**Success criteria**
- Existing API calls still return stdout/stderr/errors correctly.
- All compile/run languages still work (python, node, go, etc.).

**Testing criteria**
- ✅ `go test ./engine/coderunner/v2 -run TestRunner`
- ✅ End-to-end: CLI invocation executes Python and C++ in sandbox.

---

### Phase 4 — Optional (Security hardening)
- [ ] Add seccomp allowlist for syscalls.
- [ ] Drop all Linux capabilities.
- [ ] Set no-new-privileges.

**Success criteria**
- Common languages still run with restricted syscall profile.
- Obvious privileged syscalls fail inside sandbox.

**Testing criteria**
- ✅ `go test ./engine/sandbox/linux -run TestSeccomp`

---

## Detailed Implementation Notes

### Namespaces
Use `clone`/`unshare` with:
- `CLONE_NEWPID`
- `CLONE_NEWNS`
- `CLONE_NEWUTS`
- `CLONE_NEWIPC`
- `CLONE_NEWNET`

Set up mount namespace with:
- `mount("tmpfs", "/", "tmpfs", 0, "")`
- Bind-mount required runtime paths (`/usr/bin/python3`, `/lib`, `/lib64`, etc.)

### Filesystem
- Create per-job work directory (e.g., `/tmp/sandbox/<job-id>`).
- Bind-mount that directory as `/work` inside sandbox.
- Optionally use read-only root with overlayfs if needed.

### Cgroups v2
- Create cgroup per job under `/sys/fs/cgroup/sandbox/<job-id>`.
- Set `memory.max`, `cpu.max`, `pids.max`.
- Move child PID to cgroup.

### Execution Model
- Parent sets up sandbox environment.
- Child executes `execve` within namespace and cgroup.
- Parent captures stdout/stderr and enforces timeout.

---

## Suggested Package Layout
```
engine/
  sandbox/
    types.go
    linux/
      runner.go
      namespaces.go
      filesystem.go
      cgroups.go
      seccomp.go (optional)
```

---

## Example POC User Flow
1. CodeRunner receives request.
2. CodeRunner creates `SandboxInput` and `SandboxPolicy`.
3. SandboxRunner sets namespaces + cgroups.
4. Sandbox executes compile and run steps.
5. Output returned to API.

---

## Acceptance Checklist (Final)
- [ ] `SandboxRunner` interface defined and used.
- [ ] Linux namespace runner implemented.
- [ ] Cgroup limits enforced with v2.
- [ ] CodeRunner integrated and working.
- [ ] Tests cover namespace isolation + cgroup enforcement.
- [ ] No network by default.

---

## Why this design fits your current repo
- Keeps your existing controller + runner architecture intact.
- Isolates the new sandbox logic into a dedicated module.
- Lets you iteratively upgrade security without rewriting everything.

---

## Next Steps (Recommended)
1. Implement Phase 0 + Phase 1.
2. Run minimal compile/run tests with Python + C++.
3. Add cgroup limits and validate with load tests.
4. Only then add seccomp and other hardening.

---

## Success Definition
The rewrite is successful if:
- User code runs in a hardened sandbox with **no host FS/network visibility**.
- Resource limits are enforced at the kernel level (cgroups + namespaces).
- The public API behavior remains unchanged.

