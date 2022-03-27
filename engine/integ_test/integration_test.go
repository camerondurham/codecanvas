package integtest

import (
	"fmt"
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

	asyncCtrl := ctrl.NewAsyncController(2, &runtime.NilProvider{})

	sleepy := &runtime.RunProps{
		RunArgs: []string{"sleep", "1"},
		Timeout: 2,
	}
	go runSafeCmdAndPrintResult(asyncCtrl, sleepy, wg)

	go runSafeCmdAndPrintResult(asyncCtrl, sleepy, wg)

	// Let other commands run first. Unfortunately without this sleep,
	// the SubmitRequest below will run before the goroutines have a time
	// to execute. We want this test to verify that when all runners are
	// occupied, the controller will return an error instead of accepting
	// a job it has no room to do.
	time.Sleep(time.Millisecond * 100)

	runSafeCmdAndAssertControllerError(asyncCtrl, sleepy, &ctrl.ControllerRunOutput{ControllerErr: ctrl.NoRunnerIsReady}, t)

	// allow other commands to finish
	wg.Wait()

	// TODO: find out why this is needed to let other jobs finish and the wait group is not sufficient
	time.Sleep(time.Second * 3)

	// run command again after the other commands have finished
	runSafeCmdAndAssertControllerError(asyncCtrl, sleepy, &ctrl.ControllerRunOutput{ControllerErr: nil}, t)
}

func runSafeCmdAndPrintResult(ac *ctrl.AsyncController, props *runtime.RunProps, wg sync.WaitGroup) {
	// let the test wait until this job completes
	wg.Add(1)
	defer wg.Done()
	output := ac.SubmitRequest(props)

	// print for debugging output
	fmt.Printf("output: %v\n", output)
}

func runSafeCmdAndAssertControllerError(ac *ctrl.AsyncController, props *runtime.RunProps, expect *ctrl.ControllerRunOutput, t *testing.T) {
	output := ac.SubmitRequest(props)
	if output.ControllerErr != nil && expect.ControllerErr == nil {
		t.Errorf("expected no controller error but got: %v", output.ControllerErr.Error())
	} else if output.ControllerErr == nil && expect.ControllerErr != nil {
		t.Errorf("expected controller error: \"%s\" but got: %v", expect.ControllerErr.Error(), output.ControllerErr)
	}
}
