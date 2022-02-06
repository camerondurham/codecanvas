package client

import (
	"github.com/runner-x/runner-x/server/api"
	"net/http"
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
}

func NewClient() *Client {
	// TODO: implement client with defaults like localhost url (nice to have)
	panic("not implemented")
}

func NewClientFromConfig(c Config) *Client {
	// TODO: create client from config
	return nil
}

func (c *Client) Run(r *api.RunRequest) (error, *api.RunResponse) {
	// TODO: implement/refactor
	return nil, nil
}

func (c *Client) Languages() (error, *api.LanguagesResponse) {
	// TODO: implement/refactor
	return nil, nil
}
