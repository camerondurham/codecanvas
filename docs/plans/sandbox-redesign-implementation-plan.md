# Sandbox Redesign Implementation Plan

Created: 2026-02-09T07:21:38Z (UTC)  
Source: `docs/sandbox-redesign.md`

## How To Mark Progress
- Use `[ ]` for not started, `[~]` for in progress, `[x]` for done.
- When a task is done, fill in `Completed At (UTC)` with an ISO timestamp (example: `2026-02-09T08:05:12Z`).

## Implementation Plan

### Phase 0: Scaffolding
- [x] Create `engine/sandbox/types.go` with `SandboxPolicy`, `SandboxInput`, `SandboxOutput`, `SandboxRunner`  
  Completed At (UTC): `2026-02-09T07:24:21Z`
- [x] Create Linux package skeleton:
  `engine/sandbox/linux/runner.go`, `engine/sandbox/linux/namespaces.go`, `engine/sandbox/linux/filesystem.go`, `engine/sandbox/linux/cgroups.go`  
  Completed At (UTC): `2026-02-09T07:24:21Z`
- [x] Add unit tests for types/mapping basics under `engine/sandbox`  
  Completed At (UTC): `2026-02-09T07:24:21Z`

### Phase 1: Namespace + Filesystem Isolation
- [x] Implement isolated process execution in new namespaces (PID, mount, UTS, IPC, net-by-default-off) in `engine/sandbox/linux/namespaces.go`  
  Completed At (UTC): `2026-02-09T07:57:51Z`
- [x] Implement minimal/scratch filesystem setup with writable `/work` bind mount in `engine/sandbox/linux/filesystem.go`  
  Completed At (UTC): `2026-02-09T07:57:51Z`
- [x] Implement stdout/stderr/exit-code capture in parent process path in `engine/sandbox/linux/runner.go`  
  Completed At (UTC): `2026-02-09T07:57:51Z`
- [x] Make compile and run steps share the same workspace so compiled artifacts persist between steps  
  Completed At (UTC): `2026-02-09T07:57:51Z`

### Phase 2: Cgroups v2 Limits
- [~] Create and clean up per-run cgroup in `engine/sandbox/linux/cgroups.go`  
  Completed At (UTC): ``
- [~] Apply `memory.max`, `cpu.max`, and `pids.max` before command execution  
  Completed At (UTC): ``
- [ ] Ensure subprocess trees are also constrained by cgroup limits  
  Completed At (UTC): ``

### Phase 3: Wire Into Existing Runtime/Controller Flow
- [x] Add runtime adapter: update `engine/runtime/runtime_agent.go` to execute via `SandboxRunner` (without breaking controller behavior)  
  Completed At (UTC): `2026-02-09T07:57:51Z`
- [x] Keep `engine/controller/controller.go` flow unchanged (write source -> optional compile -> run -> cleanup), but route execution through sandboxed runtime path  
  Completed At (UTC): `2026-02-09T07:57:51Z`
- [ ] Update `server/main.go` runner construction to initialize sandbox-capable runtime wiring  
  Completed At (UTC): ``
- [x] Preserve current API behavior in `server` and `engine/coderunner/v2` output semantics  
  Completed At (UTC): `2026-02-09T07:57:51Z`

### Phase 4: Optional Hardening
- [ ] Add `no_new_privileges` and capability dropping in Linux runner path  
  Completed At (UTC): ``
- [ ] Add seccomp allowlist and validation tests  
  Completed At (UTC): ``

## Testing Strategy

### 1) Fast Unit Tests (Default CI Path)
- [x] Add/update unit tests for sandbox types and policy conversion logic  
  Command: `go test ./engine/sandbox/...`  
  Completed At (UTC): `2026-02-09T07:24:21Z`
- [ ] Update runtime unit tests to mock sandbox execution and keep readiness/state behavior coverage  
  Command: `go test ./engine/runtime/...`  
  Completed At (UTC): ``
- [ ] Keep coderunner/controller tests green while swapping execution backend  
  Commands: `go test ./engine/controller/...` and `go test ./engine/coderunner/v2/...`  
  Completed At (UTC): ``

### 2) Linux Sandbox Integration Tests (Privileged/Tagged)
- [x] Namespace isolation test (`TestNamespaces`) verifies PID/mount/network isolation  
  Command: `go test ./engine/sandbox/linux -run TestNamespaces`  
  Completed At (UTC): `2026-02-09T07:57:51Z`
- [x] Filesystem visibility test verifies minimal root and controlled `/work` mount  
  Command: `go test ./engine/sandbox/linux -run TestFilesystem`  
  Completed At (UTC): `2026-02-09T07:57:51Z`
- [~] Cgroup enforcement test (`TestCgroupLimits`) verifies CPU/memory/pids limits  
  Command: `go test ./engine/sandbox/linux -run TestCgroupLimits`  
  Completed At (UTC): ``

### 3) End-to-End and API Validation
- [ ] End-to-end language flow test for interpreted and compiled paths (at least Python + C++)  
  Command: `go test ./engine/coderunner/v2 -run TestRunner`  
  Completed At (UTC): ``
- [ ] API smoke tests still pass with sandbox backend  
  Command: `go test ./server/...`  
  Completed At (UTC): ``

### 4) Regression and Operational Validation
- [x] Full repo test run remains green  
  Command: `go test ./...`  
  Completed At (UTC): `2026-02-09T07:57:51Z`
- [ ] Container image build/run still works with runtime dependencies available to sandbox  
  Commands: `docker build -f docker/server-debian/Dockerfile .` and runtime smoke check  
  Completed At (UTC): ``

## Risks To Track During Execution
- [ ] Runtime binaries/libs not mounted correctly into scratch FS (language commands fail at runtime)  
  Completed At (UTC): ``
- [ ] Privilege/capability requirements for namespace/cgroup setup differ between local/dev/CI environments  
  Completed At (UTC): ``
- [ ] Compile and run workspace continuity regressions for compiled languages  
  Completed At (UTC): ``

## Execution Log
- 2026-02-09T07:21:38Z: Plan file created in `docs/plans/`.
- 2026-02-09T07:24:21Z: Completed Phase 0 scaffolding files under `engine/sandbox` and `engine/sandbox/linux`.
- 2026-02-09T07:24:21Z: Ran `go test ./engine/sandbox/...` successfully.
- 2026-02-09T07:24:21Z: Attempted `go test ./...`; blocked in this environment by restricted network access to module download endpoints.
- 2026-02-09T07:57:51Z: Implemented Linux sandbox runner (namespace + scratch-ish root + /work bind) and wired RuntimeAgent to use it.
- 2026-02-09T07:57:51Z: Fixed controller agent double-booking by adding non-blocking agent claim.
- 2026-02-09T07:57:51Z: Fixed coderunner compile step to be optional (no empty pre-run command).
- 2026-02-09T07:57:51Z: Ran `go test ./...` successfully (with escalated permissions).
