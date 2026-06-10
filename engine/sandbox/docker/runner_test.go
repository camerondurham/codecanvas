package docker

import (
	"strings"
	"testing"

	"github.com/runner-x/runner-x/engine/sandbox"
)

func TestBuildDockerArgsSecureDefaults(t *testing.T) {
	args := BuildDockerArgs(sandbox.Job{
		Image: "python:3-slim",
	}, sandbox.Policy{}, "/tmp/codecanvas-job", runnerScriptName, "codecanvas-test")

	got := strings.Join(args, "\x00")
	assertContains(t, got, "run")
	assertContains(t, got, "--init")
	assertContains(t, got, "--network\x00none")
	assertContains(t, got, "--read-only")
	assertContains(t, got, "--cap-drop\x00ALL")
	assertContains(t, got, "--security-opt\x00no-new-privileges")
	assertContains(t, got, "--hostname\x00codecanvas-sandbox")
	assertContains(t, got, "--ipc\x00none")
	assertContains(t, got, "--cpus\x001")
	assertContains(t, got, "--memory\x00128m")
	assertContains(t, got, "--memory-swap\x00128m")
	assertContains(t, got, "--pids-limit\x0064")
	assertContains(t, got, "--ulimit\x00nofile=64:64")
	assertContains(t, got, "--user\x0065532:65532")
	assertContains(t, got, "--pull\x00never")
	assertContains(t, got, "type=bind,source=/tmp/codecanvas-job,target=/work")
	assertContains(t, got, "python:3-slim\x00/bin/sh\x00/work/.codecanvas-run.sh")
}

func TestBuildDockerArgsRuntimeOverride(t *testing.T) {
	args := BuildDockerArgs(sandbox.Job{
		Image: "python:3-slim",
	}, sandbox.Policy{
		Runtime: "runsc",
	}, "/tmp/codecanvas-job", runnerScriptName, "codecanvas-test")

	got := strings.Join(args, "\x00")
	assertContains(t, got, "--runtime\x00runsc")
}

func TestScriptForStepsQuotesArgs(t *testing.T) {
	script, err := scriptForSteps([]sandbox.Command{
		{Args: []string{"python3", "run.py"}},
		{Args: []string{"echo", "can't inject; rm -rf /"}},
	})
	if err != nil {
		t.Fatalf("scriptForSteps() error = %v", err)
	}

	assertContains(t, script, "'python3' 'run.py'")
	assertContains(t, script, "'echo' 'can'\"'\"'t inject; rm -rf /'")
}

func TestCleanRelativePathRejectsEscape(t *testing.T) {
	if _, err := cleanRelativePath("../run.py"); err == nil {
		t.Fatalf("expected parent path escape to fail")
	}
	if _, err := cleanRelativePath("/run.py"); err == nil {
		t.Fatalf("expected absolute path to fail")
	}
}

func TestCappedBufferTruncatesWithoutShortWrite(t *testing.T) {
	writer := &cappedBuffer{limit: 5}
	n, err := writer.Write([]byte("hello world"))
	if err != nil {
		t.Fatalf("Write() error = %v", err)
	}
	if n != len("hello world") {
		t.Fatalf("Write() n = %d, want %d", n, len("hello world"))
	}
	if writer.String() != "hello" {
		t.Fatalf("buffer = %q, want hello", writer.String())
	}
	if !writer.truncated {
		t.Fatalf("expected writer to mark output truncated")
	}
}

func assertContains(t *testing.T, got string, want string) {
	t.Helper()
	if !strings.Contains(got, want) {
		t.Fatalf("expected %q to contain %q", got, want)
	}
}
