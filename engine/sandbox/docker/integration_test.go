package docker

import (
	"context"
	"os"
	"strings"
	"testing"

	"github.com/runner-x/runner-x/engine/sandbox"
)

func TestRunnerDockerIntegration(t *testing.T) {
	if os.Getenv("CODECANVAS_DOCKER_INTEGRATION") != "1" {
		t.Skip("set CODECANVAS_DOCKER_INTEGRATION=1 to run Docker integration test")
	}

	image := os.Getenv("CODECANVAS_SANDBOX_IMAGE")
	if len(image) == 0 {
		image = "codecanvas-sandbox:local"
	}

	runner := NewRunner("")
	out, err := runner.Run(context.Background(), sandbox.Job{
		Image: image,
		Files: map[string][]byte{
			"run.py": []byte(`
import os
import socket

print("uid=%d" % os.geteuid())
try:
    socket.create_connection(("1.1.1.1", 53), 0.2)
except OSError:
    print("network=blocked")
else:
    print("network=open")
`),
		},
		Steps: []sandbox.Command{
			{Args: []string{"python3", "run.py"}},
		},
	}, sandbox.Policy{
		TimeoutSec: 10,
		PullPolicy: "never",
	})
	if err != nil {
		t.Fatalf("Run() error = %v\nstdout=%s\nstderr=%s", err, out.Stdout, out.Stderr)
	}

	if !strings.Contains(out.Stdout, "uid=65532") {
		t.Fatalf("stdout = %q, want non-root sandbox uid", out.Stdout)
	}
	if !strings.Contains(out.Stdout, "network=blocked") {
		t.Fatalf("stdout = %q, want network blocked", out.Stdout)
	}
}

func TestRunnerDockerPreflightIntegration(t *testing.T) {
	if os.Getenv("CODECANVAS_DOCKER_INTEGRATION") != "1" {
		t.Skip("set CODECANVAS_DOCKER_INTEGRATION=1 to run Docker integration test")
	}

	image := os.Getenv("CODECANVAS_SANDBOX_IMAGE")
	if len(image) == 0 {
		image = "codecanvas-sandbox:local"
	}

	runner := NewRunner("")
	if err := runner.Preflight(context.Background(), sandbox.Policy{}, []string{image}); err != nil {
		t.Fatalf("Preflight() error = %v", err)
	}
}
