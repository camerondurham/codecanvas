package v2

import (
	"os"
	"testing"

	"github.com/runner-x/runner-x/engine/sandbox"
	sandboxdocker "github.com/runner-x/runner-x/engine/sandbox/docker"
)

func TestCodeRunnerDockerIntegration(t *testing.T) {
	if os.Getenv("CODECANVAS_DOCKER_INTEGRATION") != "1" {
		t.Skip("set CODECANVAS_DOCKER_INTEGRATION=1 to run Docker integration test")
	}

	image := os.Getenv("CODECANVAS_SANDBOX_IMAGE")
	if len(image) == 0 {
		image = "codecanvas-sandbox:local"
	}

	cr := NewCodeRunnerWithSandbox(SandboxConfig{
		Runner: sandboxdocker.NewRunner(""),
		Policy: sandbox.Policy{
			TimeoutSec: 10,
			PullPolicy: "never",
		},
		Images: map[string]string{
			Python3.Name: image,
		},
	})

	out, err := cr.Run(&RunnerProps{
		Lang:   Python3.Name,
		Source: `print("codecanvas docker ok")`,
	})
	if err != nil {
		t.Fatalf("Run() error = %v", err)
	}
	if out.Stdout != "codecanvas docker ok\n" {
		t.Fatalf("stdout = %q, want codecanvas docker ok", out.Stdout)
	}
}
