package client

import (
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"strings"
	"time"

	"github.com/runner-x/runner-x/engine/coderunner"
	"github.com/runner-x/runner-x/server/api"
)

// TODO: fill in this client package as needed and create, use Client as needed in CLI commands

const (
	DEFAULT_URL   = "http://localhost:10100"
	LANG_ENDPOINT = "/api/v1/languages"
	RUN_ENDPOINT  = "/api/v1/run"
)

type Requester interface {
	Run(r *api.RunRequest) (*api.RunResponse, error)
	Languages() (*api.LanguagesResponse, error)
}

type Client struct {
	BaseUrl    string      // the URL to use for the runner server (i.e. localhost)
	HttpClient http.Client // http client to use for GET, POST requests
}

type Config struct {
	BaseUrl string
	// add any other configurable values we may want here
	Timeout int
}

func NewClient() *Client {
	// TODO: implement client with defaults like localhost url (nice to have)
	var c Client
	c.BaseUrl = DEFAULT_URL
	c.HttpClient = http.Client{
		Timeout: time.Second * coderunner.TIMEOUT_DEFAULT,
	}

	return &c
}

func NewClientFromConfig(c Config) *Client {
	// TODO: create client from config
	var client Client
	client.BaseUrl = c.BaseUrl
	client.HttpClient = http.Client{
		Timeout: time.Second * time.Duration(c.Timeout),
	}

	return &client
}

func (c *Client) Run(r *api.RunRequest) (*api.RunResponse, error) {
	// TODO: implement/refactor
	source := r.Source

	reqBody := api.RunRequest{
		Source: source,
		Lang:   r.Lang,
	}

	jsonBody, err := json.Marshal(reqBody)
	PanicCheck(err)

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

	var ret api.RunResponse
	decodeErr := json.Unmarshal(respReader, &ret)
	PanicCheck(decodeErr)

	return &ret, nil
}

func (c *Client) Languages() (*api.LanguagesResponse, error) {
	// TODO: implement/refactor
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

	var jsonLangs api.LanguagesResponse
	decodeErr := json.Unmarshal(body, &jsonLangs)
	PanicCheck(decodeErr)

	return &jsonLangs, nil
}

func PanicCheck(err error) {
	if err != nil {
		panic(err)
	}
}
