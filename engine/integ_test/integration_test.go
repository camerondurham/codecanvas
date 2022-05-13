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

	asyncCtrl := ctrl.NewAsyncController(2, &runtime.NilProvider{}, "", "")

	sleepy := &ctrl.Props{
		RunProps: &runtime.RunProps{
			RunArgs: []string{"sleep", "1"},
			Timeout: 2,
		}}

	// pass pointer to waitgroup instead of copying by value so we use the right lock value
	go runSafeCmdAndPrintResult(asyncCtrl, sleepy, &wg)
	go runSafeCmdAndPrintResult(asyncCtrl, sleepy, &wg)

	// Let other commands run first. Unfortunately without this sleep,
	// the SubmitRequest below will run before the goroutines have a time
	// to execute. We want this test to verify that when all runners are
	// occupied, the controller will return an error instead of accepting
	// a job it has no room to do.
	time.Sleep(time.Millisecond * 100)

	runSafeCmdAndAssertControllerError(asyncCtrl, sleepy, &ctrl.CtrlRunOutput{ControllerErr: ctrl.NoRunnerIsReady}, t)

	// allow other commands to finish before retying
	wg.Wait()

	// run command again after the other commands have finished
	runSafeCmdAndAssertControllerError(asyncCtrl, sleepy, &ctrl.CtrlRunOutput{ControllerErr: nil}, t)
}

func runSafeCmdAndPrintResult(ac *ctrl.AsyncController, props *ctrl.Props, wg *sync.WaitGroup) {
	// let the test wait until this job completes
	wg.Add(1)
	defer wg.Done()
	output := ac.SubmitRequest(props)

	// print for debugging output
	fmt.Printf("output: %v\n", output)
}

func runSafeCmdAndAssertControllerError(ac *ctrl.AsyncController, props *ctrl.Props, expect *ctrl.CtrlRunOutput, t *testing.T) {
	// TODO: fix this. this is un-believably dumb and hacky to try to get around flaky tests
	output := ac.SubmitRequest(props)
	if output.ControllerErr != nil && expect.ControllerErr == nil {
		t.Errorf("expected no controller error but got: %v", output.ControllerErr.Error())
	} else if output.ControllerErr == nil && expect.ControllerErr != nil {
		t.Errorf("expected controller error: \"%s\" but got: %v", expect.ControllerErr.Error(), output.ControllerErr)
	}
}
