package main

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"net/http/httptest"
	"os"
	"os/exec"
	"syscall"
	"testing"

	"github.com/go-chi/chi/v5"
	coderunner "github.com/runner-x/runner-x/engine/coderunner/v1"
	"github.com/runner-x/runner-x/server/api"
)

func newRequest(reqType string, url string, reqStruct interface{}) *http.Request {
	reqBytes, _ := json.Marshal(reqStruct)
	fmt.Printf("reqBytes: %v\n", reqBytes)
	req, _ := http.NewRequest(reqType, url, bytes.NewReader(reqBytes))
	return req
}

func Test_runHandler(t *testing.T) {
	type args struct {
		r                  *http.Request
		expectedStatusCode int
	}

	type invalidRequest struct {
		SomeKey string
	}

	tests := []struct {
		name string
		args args
	}{
		{
			name: "basic happy case",
			args: args{
				r: newRequest("POST", "url", api.RunRequest{
					Source: "print(\"hello world\")",
					Lang:   coderunner.PYTHON3,
				}),
				expectedStatusCode: 200,
			},
		},
		{
			name: "basic malformed request case",
			args: args{
				r: newRequest("POST", "url", invalidRequest{
					SomeKey: "SomeVal",
				}),
				expectedStatusCode: 400,
			},
		},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {

			// https://pkg.go.dev/net/http/httptest#ResponseRecorder
			w := httptest.NewRecorder()

			if err := os.Setenv("UNIT_TEST", "1"); err != nil {
				// skip the rest if we can't test this
				fmt.Printf("cannot unit test runHandler: [%v]\n", err)
				return
			}

			runHandler(w, tt.args.r)

			resp := w.Result()
			if resp.StatusCode != tt.args.expectedStatusCode {
				t.Errorf("StatusCode unexpected got = %v, want = %v", resp.StatusCode, tt.args.expectedStatusCode)
			}
			body, _ := io.ReadAll(resp.Body)
			fmt.Printf("resp body: %v", body)

			// TODO: better assertions on response body
		})
	}
}

func Test_optionHandler(t *testing.T) {
	w := httptest.NewRecorder()
	optionHandler(w, &http.Request{})

	resp := w.Result()
	if resp.StatusCode != http.StatusOK {
		t.Errorf("Expected status OK, got = %v", resp.StatusCode)
	}
}

// TODO: make this actually query languages endpoint
func Test_server_startup(t *testing.T) {
	cmd := exec.Command("go", []string{"run", "main.go"}...)

	fmt.Printf("starting server")
	err := cmd.Start()
	if err != nil {
		fmt.Printf("error starting server, skipping test")
		t.Skip()
	}

	done := make(chan struct{})
	go func() {
		err := cmd.Wait()
		fmt.Printf("command started waiting")
		status := cmd.ProcessState.Sys().(syscall.WaitStatus)
		exitStatus := status.ExitStatus()
		signaled := status.Signaled()
		signal := status.Signal()
		fmt.Println("Error:", err)
		if signaled {
			fmt.Println("Signal:", signal)
		} else {
			fmt.Println("Status:", exitStatus)
		}
		close(done)
	}()

	_ = cmd.Process.Kill()
	<-done
	fmt.Printf("finished calling and killed process")
}

func Test_CreateNewRouter(t *testing.T) {
	r := CreateNewRouter()
	if r == nil {
		t.Fatalf("CreateNewRouter returned nil")
	}

	// TODO: find out if it's possible to actually assert on router state for better testing
}

func Test_setCORSOptionHandler(t *testing.T) {
	r := chi.NewMux()
	// trivial non-test for coverage for now, just make sure the function API works
	setCORSOptionHandler(r, []string{"/test/path1", "/test/path2"})
}
