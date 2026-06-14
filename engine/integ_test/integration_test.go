//go:build linux || darwin
// +build linux darwin

package integtest

import (
	"fmt"
	"os"
	"path/filepath"
	"sync"
	"testing"
	"time"

	ctrl "github.com/runner-x/runner-x/engine/controller"
	"github.com/runner-x/runner-x/engine/runtime"
)

// Test_ControllerRunMultipleRequests verifies that the contoller
// actually limits the number of concurrent requests that can be made
// at one time. This is different from the unit tests in controller_test.go
// since we are not using mocked RuntimeAgents.
func Test_ControllerRunMultipleRequests(t *testing.T) {

	var wg sync.WaitGroup

	asyncCtrl := ctrl.NewAsyncController(2, &runtime.NilProvider{}, "", "")
	tempDir := t.TempDir()
	marker1 := filepath.Join(tempDir, "runner-1-started")
	marker2 := filepath.Join(tempDir, "runner-2-started")

	blockingRequest := func(marker string) *ctrl.Props {
		return &ctrl.Props{
			PreRunProps: &runtime.RunProps{
				RunArgs: []string{"sh", "-c", "touch \"$1\"; sleep 2", "marker", marker},
				Timeout: 5,
			},
			RunProps: &runtime.RunProps{
				RunArgs: []string{"echo", "done"},
			},
		}
	}

	quickRequest := &ctrl.Props{
		RunProps: &runtime.RunProps{
			RunArgs: []string{"echo", "available"},
		},
	}

	// pass pointer to waitgroup instead of copying by value so we use the right lock value
	wg.Add(2)
	go runSafeCmdAndPrintResult(asyncCtrl, blockingRequest(marker1), &wg)
	go runSafeCmdAndPrintResult(asyncCtrl, blockingRequest(marker2), &wg)

	// Wait until both submitted requests have reached the blocking command.
	// At that point both runners should be reserved and unavailable.
	waitForFiles(t, marker1, marker2)

	runSafeCmdAndAssertControllerError(asyncCtrl, quickRequest, &ctrl.CtrlRunOutput{ControllerErr: ctrl.NoRunnerIsReady}, t)

	// allow other commands to finish before retying
	wg.Wait()

	// run command again after the other commands have finished
	runSafeCmdAndAssertControllerError(asyncCtrl, quickRequest, &ctrl.CtrlRunOutput{ControllerErr: nil}, t)
}

func runSafeCmdAndPrintResult(ac *ctrl.AsyncController, props *ctrl.Props, wg *sync.WaitGroup) {
	// let the test wait until this job completes
	defer wg.Done()
	output := ac.SubmitRequest(props)

	// print for debugging output
	fmt.Printf("output: %v\n", output)
}

func waitForFiles(t *testing.T, paths ...string) {
	t.Helper()

	deadline := time.Now().Add(5 * time.Second)
	for time.Now().Before(deadline) {
		allExist := true
		for _, path := range paths {
			if _, err := os.Stat(path); err != nil {
				allExist = false
				break
			}
		}
		if allExist {
			return
		}
		time.Sleep(10 * time.Millisecond)
	}

	for _, path := range paths {
		if _, err := os.Stat(path); err != nil {
			t.Fatalf("timed out waiting for marker file %q: %v", path, err)
		}
	}
}

func runSafeCmdAndAssertControllerError(ac *ctrl.AsyncController, props *ctrl.Props, expect *ctrl.CtrlRunOutput, t *testing.T) {
	output := ac.SubmitRequest(props)
	if output.ControllerErr != expect.ControllerErr {
		t.Errorf("expected controller error %v but got %v", expect.ControllerErr, output.ControllerErr)
	}
}
