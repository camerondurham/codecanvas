package client

import (
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"os"
	"strings"
	"time"

	v2 "github.com/runner-x/runner-x/server/api/v2"
)

const (
	// DEFAULT_URL = "http://localhost:10100"
	DEFAULT_URL = "https://runner.fly.dev"

	// Notably, the server still serves under these endpoints
	// Despite the migration to v2 on the backend.
	LANG_ENDPOINT = "/api/v1/languages"
	RUN_ENDPOINT  = "/api/v1/run"

	TIMEOUT_DEFAULT = time.Second * 5
)

type Requester interface {
	Run(r *v2.RunRequest) (*v2.RunResponse, error)
	Languages() (*v2.LanguagesResponse, error)
}

type Client struct {
	BaseUrl    string      // the URL to use for the runner server (i.e. localhost)
	HttpClient http.Client // http client to use for GET, POST requests
}

// abstracts the inner requester to allow us to generate mocks
type CliClient struct {
	client Requester
}

type Config struct {
	BaseUrl string
	// add any other configurable values we may want here
	Timeout int
}

func NewClient() *CliClient {
	var client Client
	client.BaseUrl = DEFAULT_URL
	client.HttpClient = http.Client{
		Timeout: TIMEOUT_DEFAULT,
	}

	return &CliClient{
		client,
	}
}

func NewClientFromConfig(c Config) *CliClient {
	var client Client
	client.BaseUrl = c.BaseUrl
	client.HttpClient = http.Client{
		Timeout: time.Second * time.Duration(c.Timeout),
	}

	return &CliClient{
		client,
	}
}

func NewClientWithRequester(r Requester) *CliClient {
	return &CliClient{
		client: r,
	}
}

func (c Client) Run(r *v2.RunRequest) (*v2.RunResponse, error) {
	source := r.Source

	reqBody := v2.RunRequest{
		Source: source,
		Lang:   r.Lang,
	}

	jsonBody, err := json.Marshal(reqBody)
	if err != nil {
		return nil, err
	}

	body := strings.NewReader(string(jsonBody))

	req, err := http.NewRequest("POST", c.BaseUrl+RUN_ENDPOINT, body)
	if err != nil {
		return nil, err
	}
	req.Header.Add("Content-Type", "application/json")

	resp, err := c.HttpClient.Do(req)
	if err != nil {
		return nil, err
	} else if resp.StatusCode > 299 {
		return nil, fmt.Errorf("request failed with status code: %d", resp.StatusCode)
	}
	defer resp.Body.Close()

	respReader, readErr := io.ReadAll(resp.Body)
	if readErr != nil {
		return nil, err
	}

	var ret v2.RunResponse
	err = json.Unmarshal(respReader, &ret)
	if err != nil {
		return nil, err
	}

	return &ret, nil
}

func (c Client) Languages() (*v2.LanguagesResponse, error) {
	req, err := http.NewRequest("GET", c.BaseUrl+LANG_ENDPOINT, nil)
	if err != nil {
		return nil, err
	}

	resp, err := c.HttpClient.Do(req)
	if err != nil {
		return nil, err
	} else if resp.StatusCode > 299 {
		return nil, fmt.Errorf("request failed with status code: %d", resp.StatusCode)
	}
	defer resp.Body.Close()

	body, err := io.ReadAll(resp.Body)
	if err != nil {
		return nil, err
	}

	var jsonLangs v2.LanguagesResponse
	err = json.Unmarshal(body, &jsonLangs)
	if err != nil {
		return nil, err
	}

	return &jsonLangs, nil
}

func (cli *CliClient) LanguageRequest() (*v2.LanguagesResponse, error) {
	return cli.client.Languages()
}

func (cli *CliClient) RunRequest(language string, filename string) (*v2.RunResponse, error) {
	// check if the language is supported
	langs, err := cli.client.Languages()
	if err != nil {
		return nil, err
	}

	validLanguage := false
	for _, lang := range langs.Languages {
		if lang == language {
			validLanguage = true
			break
		}
	}
	if !validLanguage {
		return nil, fmt.Errorf("invalid language: %s", language)
	}

	source, err := os.ReadFile(filename)
	if err != nil {
		return nil, fmt.Errorf("file not found: %s", filename)
	}

	req := &v2.RunRequest{
		Source: string(source),
		Lang:   language,
	}

	return cli.client.Run(req)
}
