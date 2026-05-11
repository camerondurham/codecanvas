package client_test

import (
	"net/http"
	"net/http/httptest"
	"os"
	"testing"

	gomock "github.com/golang/mock/gomock"
	"github.com/runner-x/runner-x/cli/runner/client"
	mock_client "github.com/runner-x/runner-x/cli/runner/client/mocks"
	v2 "github.com/runner-x/runner-x/server/api/v2"
)

func TestLanguageRequest(t *testing.T) {
	ctrl := gomock.NewController(t)
	defer ctrl.Finish()

	expected := []string{
		"python3",
		"nodejs",
		"c++",
		"go",
		"bash",
		"rust",
	}
	mockLanguageAgent := mock_client.NewMockRequester(ctrl)

	langResponse := v2.LanguagesResponse{
		Languages: expected,
	}

	mockLanguageAgent.EXPECT().Languages().Return(&langResponse, nil)
	agent := client.NewClientWithRequester(mockLanguageAgent)

	resp, err := agent.LanguageRequest()

	if err != nil {
		t.Errorf("expected no error, got %v", err)
	}

	for i, lang := range resp.Languages {
		if expected[i] != lang {
			t.Errorf("language request response mismatch: wanted %v, got %v", expected, resp.Languages)
			return
		}
	}
}

func TestLanguageHttpRequest(t *testing.T) {
	testResponseServer := httptest.NewServer(http.HandlerFunc(func(res http.ResponseWriter, req *http.Request) {
		res.WriteHeader(200)
		res.Write([]byte("{\"languages\":[\"python3\",\"nodejs\",\"c++\",\"go\",\"bash\",\"rust\"]}"))
	}))
	defer testResponseServer.Close()

	expected := []string{
		"python3",
		"nodejs",
		"c++",
		"go",
		"bash",
		"rust",
	}

	client := client.NewClientFromConfig(client.Config{
		BaseUrl: testResponseServer.URL,
	})

	resp, err := client.LanguageRequest()

	if err != nil {
		t.Errorf("expected no error, got %v", err)
	}

	for i, lang := range resp.Languages {
		if expected[i] != lang {
			t.Errorf("language request response mismatch: wanted %v, got %v", expected, resp.Languages)
			return
		}
	}
}

func TestHTTPRequestError(t *testing.T) {
	client := client.NewClientFromConfig(client.Config{
		BaseUrl: "malformed-url",
	})
	langResp, err := client.LanguageRequest()

	if err == nil {
		t.Errorf("expected error, got valid language response: %v", langResp)
	}

	runResp, err := client.RunRequest("c++", "test-files/test.cpp")
	if err == nil {
		t.Errorf("expected error, got valid run response: %v", runResp)
	}
}

func TestBadStatusCode(t *testing.T) {
	statusCode := 500
	testResponseServer := httptest.NewServer(http.HandlerFunc(func(res http.ResponseWriter, req *http.Request) {
		res.WriteHeader(statusCode)
	}))
	defer testResponseServer.Close()

	client := client.NewClientFromConfig(client.Config{
		BaseUrl: testResponseServer.URL,
	})

	langResp, err := client.LanguageRequest()
	if err == nil {
		t.Errorf("expected error, got non-nil language response %v", langResp)
	}

	runResp, err := client.RunRequest("c++", "test-files/test.cpp")
	if err == nil {
		t.Errorf("expected error, got non-nil run response %v", runResp)
	}
}

func TestRunRequest(t *testing.T) {
	ctrl := gomock.NewController(t)
	defer ctrl.Finish()

	mockAgent := mock_client.NewMockRequester(ctrl)
	contents, err := os.ReadFile("test-files/test.cpp")
	if err != nil {
		t.Fatalf("unable to read test file: %v", err)
		return
	}

	mockRequest := v2.RunRequest{
		Source: string(contents),
		Lang:   "c++",
	}
	mockLangs := v2.LanguagesResponse{
		Languages: []string{"c++"},
	}
	mockResponse := v2.RunResponse{
		Stdout: "Hello, World!",
		Stderr: "",
		Error:  "",
	}

	mockAgent.EXPECT().Run(&mockRequest).Return(&mockResponse, nil)
	mockAgent.EXPECT().Languages().Return(&mockLangs, nil)
	agent := client.NewClientWithRequester(mockAgent)

	resp, err := agent.RunRequest("c++", "test-files/test.cpp")

	if err != nil {
		t.Errorf("expected no error, got %v", err)
	}

	if *resp != mockResponse {
		t.Errorf("response mismatch, wanted %v, got %v", mockResponse, *resp)
	}
}

func TestRunInvalidLanguage(t *testing.T) {
	testServer := httptest.NewServer(http.HandlerFunc(func(res http.ResponseWriter, req *http.Request) {
		res.WriteHeader(200)
		res.Write([]byte("{\"languages\": [\"invalid-language\"]}"))
	}))
	defer testServer.Close()

	agent := client.NewClientFromConfig(client.Config{
		BaseUrl: testServer.URL,
	})

	resp, err := agent.RunRequest("c++", "test-files/test.cpp")
	if err == nil {
		t.Errorf("wanted err, got non-nil response %v", resp)
	}
}

func TestRunInvalidSource(t *testing.T) {
	testServer := httptest.NewServer(http.HandlerFunc(func(res http.ResponseWriter, req *http.Request) {
		res.WriteHeader(200)
		res.Write([]byte("{\"languages\": [\"c++\"]}"))
	}))
	defer testServer.Close()
	agent := client.NewClient()
	resp, err := agent.RunRequest("c++", "nonexistent-file")

	if err == nil {
		t.Errorf("wanted err, got non-nil response %v", resp)
	}
}
