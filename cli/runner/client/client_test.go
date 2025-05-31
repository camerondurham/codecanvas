package client_test

import (
	"net/http"
	"net/http/httptest"
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
	resp, err := client.LanguageRequest()

	if err == nil {
		t.Errorf("expected error, got valid response: %v", resp)
	}
}

func TestLanguageBadStatusCode(t *testing.T) {
	statusCode := 500
	testResponseServer := httptest.NewServer(http.HandlerFunc(func(res http.ResponseWriter, req *http.Request) {
		res.WriteHeader(statusCode)
	}))
	defer testResponseServer.Close()

	client := client.NewClientFromConfig(client.Config{
		BaseUrl: testResponseServer.URL,
	})

	resp, err := client.LanguageRequest()
	if err == nil {
		t.Errorf("expected error, got non-nil response %v", resp)
	}
}
