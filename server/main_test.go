package main

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"net/http/httptest"
	"testing"

	"github.com/runner-x/runner-x/engine/coderunner"
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
