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

type Requester interface {
	Run(r *api.RunRequest) (error, *api.RunResponse)
	Languages() (error, *api.LanguagesResponse)
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
	c.BaseUrl = "http://localhost:8080"
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

func (c *Client) Run(r *api.RunRequest, endpoint string) (*api.RunResponse, error) {
	// TODO: implement/refactor
	source := r.Source

	body := strings.NewReader(source)
	req, err := http.NewRequest("POST", c.BaseUrl+endpoint, body)
	if err != nil {
		return nil, err
	}
	req.Header.Add("Content-Type", "application/json")

	//TODO: implement CLI check language logic before adding cookie
	//if r.Lang == "implicit" {
	// implicit language checking
	// relies on having the source file,
	// but the api.RunRequest doesn't have that stored.
	// What should I do here?
	/*
		ext := extractExtension(filepath)
		if lang, found := coderunner.ExtensionFileMap[ext]; found {
			langCheck = lang
		} else {
			return nil, fmt.Errorf("unrecognized file type: %s", ext)
		}
	*/
	//}

	cookie := http.Cookie{
		Name:  "language",
		Value: string(r.Lang),
	}
	req.AddCookie(&cookie)

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

func (c *Client) Languages(endpoint string) (*api.LanguagesResponse, error) {
	// TODO: implement/refactor
	req, err := http.NewRequest("GET", c.BaseUrl+endpoint, nil)
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
