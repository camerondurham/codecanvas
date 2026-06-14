package docker

import (
	"archive/tar"
	"bytes"
	"io"
	"strings"
	"testing"

	"github.com/runner-x/runner-x/engine/sandbox"
)

func TestBuildDockerArgsSecureDefaults(t *testing.T) {
	args := BuildDockerArgs(sandbox.Job{
		Image: "python:3-slim",
	}, sandbox.Policy{}, runnerScriptName, "codecanvas-test")

	got := strings.Join(args, "\x00")
	assertContains(t, got, "run")
	assertContains(t, got, "--interactive")
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
	assertContains(t, got, "--tmpfs\x00/work:rw,nosuid,nodev,size=16m,mode=1777")
	assertNotContains(t, got, "type=bind")
	assertContains(t, got, "python:3-slim\x00/bin/sh\x00-c\x00tar -C '/work' -xf - && /bin/sh '/work/.codecanvas-run.sh'")
}

func TestBuildDockerArgsRuntimeOverride(t *testing.T) {
	args := BuildDockerArgs(sandbox.Job{
		Image: "python:3-slim",
	}, sandbox.Policy{
		Runtime: "runsc",
	}, runnerScriptName, "codecanvas-test")

	got := strings.Join(args, "\x00")
	assertContains(t, got, "--runtime\x00runsc")
}

func TestBuildDockerArgsWorkDirSizeOverride(t *testing.T) {
	args := BuildDockerArgs(sandbox.Job{
		Image: "python:3-slim",
	}, sandbox.Policy{
		WorkDirSize: "4m",
	}, runnerScriptName, "codecanvas-test")

	got := strings.Join(args, "\x00")
	assertContains(t, got, "--tmpfs\x00/work:rw,nosuid,nodev,size=4m,mode=1777")
}

func TestBuildJobArchiveIncludesFilesAndScript(t *testing.T) {
	archive, err := buildJobArchive(sandbox.Job{
		Files: map[string][]byte{
			"nested/run.py": []byte("print('ok')"),
		},
	}, "#!/bin/sh\npython3 run.py\n", runnerScriptName)
	if err != nil {
		t.Fatalf("buildJobArchive() error = %v", err)
	}

	files := map[string]string{}
	reader := tar.NewReader(bytes.NewReader(archive))
	for {
		header, err := reader.Next()
		if err == io.EOF {
			break
		}
		if err != nil {
			t.Fatalf("archive read error = %v", err)
		}
		if header.Typeflag == tar.TypeDir {
			continue
		}
		data, err := io.ReadAll(reader)
		if err != nil {
			t.Fatalf("archive file read error = %v", err)
		}
		files[header.Name] = string(data)
	}

	if files["nested/run.py"] != "print('ok')" {
		t.Fatalf("archive source file = %q", files["nested/run.py"])
	}
	if !strings.Contains(files[runnerScriptName], "python3 run.py") {
		t.Fatalf("archive runner script = %q", files[runnerScriptName])
	}
}

func TestBuildJobArchiveRejectsEscapedPath(t *testing.T) {
	if _, err := buildJobArchive(sandbox.Job{
		Files: map[string][]byte{
			"../run.py": []byte("print('bad')"),
		},
	}, "#!/bin/sh\n", runnerScriptName); err == nil {
		t.Fatalf("expected escaped archive path to fail")
	}
}

func TestShouldInspectImagesInPreflight(t *testing.T) {
	if !shouldInspectImagesInPreflight(sandbox.Policy{}) {
		t.Fatalf("default pull policy should inspect local images")
	}
	if shouldInspectImagesInPreflight(sandbox.Policy{PullPolicy: "missing"}) {
		t.Fatalf("pull=missing should skip local image inspection")
	}
	if shouldInspectImagesInPreflight(sandbox.Policy{PullPolicy: "always"}) {
		t.Fatalf("pull=always should skip local image inspection")
	}
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

func assertNotContains(t *testing.T, got string, want string) {
	t.Helper()
	if strings.Contains(got, want) {
		t.Fatalf("expected %q not to contain %q", got, want)
	}
}
