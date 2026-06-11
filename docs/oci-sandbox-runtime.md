# OCI Sandbox Runtime Design

## Decision

Move code execution behind a per-request OCI sandbox. The first backend uses
Docker-compatible `docker run` flags and can be upgraded to gVisor by setting a
runtime such as `runsc` once that runtime is installed on the host.

This is the production-shaped path for the current repo. The older
namespace/cgroup redesign remains useful for learning, but hand-rolling a
container runtime should not be the first security upgrade for an internet
facing code runner.

## Goals

- Run every submitted program in a disposable sandbox.
- Disable network by default.
- Run as a non-root UID/GID inside the sandbox.
- Bound CPU, memory, process count, wall time, and output size.
- Keep the public API and language command model stable.
- Support a stronger OCI runtime, especially gVisor `runsc`, without changing
  CodeRunner call sites.

## Non-goals

- Firecracker microVM support in the first implementation.
- Kubernetes scheduling.
- Pulling images dynamically on user requests.
- Supporting arbitrary user-provided commands.

## Current Risk Being Removed

The legacy execution path writes source into a long-lived runner directory and
executes a local `process` helper. That helper applies rlimits and changes
UID/GID for the user command. It does not create a new mount, PID, network, or
cgroup boundary per request.

The OCI backend moves the trust boundary from "same server container, lower
UID" to "new container per request, constrained by namespaces, cgroups,
capability drop, no-new-privileges, read-only root, no network, and optional
gVisor syscall mediation."

## Backend Contract

CodeRunner builds a language execution plan:

1. Source filename, for example `run.py`.
2. Optional compile step, for example `g++ run.cpp`.
3. Run step, for example `./a.out`.
4. Sandbox image for that language target.

The sandbox runner receives:

- files to materialize in `/work`
- ordered command steps
- sandbox policy
- image name

The backend owns:

- temporary workspace creation and cleanup
- container lifecycle
- stdout/stderr capture with truncation
- timeout cleanup
- exit code mapping

## Docker/OCI Policy

Default policy:

- `--network none`
- `--read-only`
- `--user 65532:65532`
- `--cap-drop ALL`
- `--security-opt no-new-privileges`
- `--cpus 1`
- `--memory 128m`
- `--memory-swap 128m`
- `--pids-limit 64`
- `--tmpfs /tmp:rw,nosuid,nodev,size=64m`
- `--pull never`
- bounded `/work` workspace; see [Required next iteration](#required-next-iteration-bound-workspace-writes)

`CODECANVAS_SANDBOX_RUNTIME=runsc` switches Docker to gVisor after `runsc` is
installed and registered with Docker/containerd.

## Required Next Iteration: Bound Workspace Writes

The first Docker backend implementation still bind-mounts a writable host
directory to `/work`. That is not sufficient for public untrusted execution:
`--read-only` protects the container root filesystem, but Docker bind mounts
remain writable unless the mount itself is read-only. User code can therefore
write unbounded data under `/work` and consume host disk.

Before enabling this backend publicly, replace the writable host bind mount
with a bounded container workspace.

Target design:

1. Create the container without starting it.
2. Mount `/work` as Docker-managed tmpfs with an explicit size, for example:
   `--tmpfs /work:rw,nosuid,nodev,size=16m`.
3. Copy generated source files and `.codecanvas-run.sh` into the stopped
   container with `docker cp`, or stream a tar archive into an initialization
   command before execution.
4. Start/attach to the container and capture stdout/stderr.
5. Remove the container on success, failure, and timeout.

This keeps untrusted writes off the host filesystem while preserving a writable
workspace for compilers and interpreters.

Add config:

- `CODECANVAS_SANDBOX_WORKDIR_SIZE=16m`

Acceptance tests:

- Python can run from `/work` with the bounded tmpfs.
- C++ can compile and run from `/work`.
- `yes > /work/bigfile` fails when the workspace tmpfs fills.
- A workspace-fill attempt does not grow a host directory.
- Timeout cleanup removes the created container.
- The Docker integration test asserts `--tmpfs /work:...size=<limit>` and no
  writable host bind mount for `/work`.

## Configuration

- `CODECANVAS_EXECUTION_BACKEND=process|docker`
- `CODECANVAS_SANDBOX_DOCKER=docker`
- `CODECANVAS_SANDBOX_RUNTIME=runsc`
- `CODECANVAS_SANDBOX_PREFLIGHT=true|false`
- `CODECANVAS_SANDBOX_PULL=never|missing|always`
- `CODECANVAS_SANDBOX_CPUS=1`
- `CODECANVAS_SANDBOX_MEMORY=128m`
- `CODECANVAS_SANDBOX_PIDS=64`
- `CODECANVAS_SANDBOX_TIMEOUT=2`
- `CODECANVAS_SANDBOX_USER=65532:65532`
- `CODECANVAS_SANDBOX_NOFILE=64:64`
- `CODECANVAS_SANDBOX_WORKDIR_SIZE=16m`
- `CODECANVAS_SANDBOX_SECCOMP_PROFILE=<path>`
- `CODECANVAS_SANDBOX_IMAGE=<fallback image>`
- `CODECANVAS_SANDBOX_IMAGE_PYTHON3=<image>`
- `CODECANVAS_SANDBOX_IMAGE_NODEJS=<image>`
- `CODECANVAS_SANDBOX_IMAGE_CPP=<image>`
- `CODECANVAS_SANDBOX_IMAGE_GO=<image>`
- `CODECANVAS_SANDBOX_IMAGE_BASH=<image>`
- `CODECANVAS_SANDBOX_IMAGE_RUST=<image>`

The first local deployment can use one all-tools image for every target. Split
per-language images after the lifecycle and tests are stable.

Build the local all-tools image:

```shell
make dkr-build-sandbox
```

Run the server against that image:

```shell
CODECANVAS_EXECUTION_BACKEND=docker \
CODECANVAS_SANDBOX_IMAGE=codecanvas-sandbox:local \
CODECANVAS_SANDBOX_PULL=never \
go run ./server
```

The Docker backend runs startup preflight by default. It verifies:

- Docker daemon access.
- The requested Docker runtime exists, for example `runsc`.
- Every sandbox image the server may use is available locally.

Set `CODECANVAS_SANDBOX_PREFLIGHT=false` only for development workflows where
you intentionally want first-request failure instead of startup failure.

Use gVisor after installing and registering `runsc` with Docker:

```shell
CODECANVAS_EXECUTION_BACKEND=docker \
CODECANVAS_SANDBOX_RUNTIME=runsc \
CODECANVAS_SANDBOX_IMAGE=codecanvas-sandbox:local \
CODECANVAS_SANDBOX_PULL=never \
go run ./server
```

## Rollout Plan

1. Land OCI backend behind `CODECANVAS_EXECUTION_BACKEND=docker`.
2. Build/pull sandbox images out of band.
3. Run compatibility tests for each language.
4. Run adversarial tests:
   - cannot reach network
   - cannot read server filesystem
   - cannot see another request workspace
   - fork bomb hits `pids-limit`
   - memory bomb hits cgroup memory limit
   - workspace write bomb hits `/work` tmpfs limit without host disk growth
   - infinite sleep hits wall timeout and leaves no container behind
   - output flood truncates without blocking
5. Enable Docker backend in a non-public environment.
6. Register gVisor and set `CODECANVAS_SANDBOX_RUNTIME=runsc`.
7. Re-run compatibility and adversarial tests before public exposure.

## Firecracker Later

Firecracker should be a separate backend behind the same sandbox interface. Use
it only after the OCI backend proves the contract, because Firecracker adds
kernel/rootfs packaging, jailer setup, VM lifecycle, metrics, and snapshot
management.
