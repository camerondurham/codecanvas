package cmd

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"os"
	"time"
)

const (
	SERVER        = "http://localhost:8080"
	RUN_ENDPOINT  = "/api/v1/run"
	LANG_ENDPOINT = "/api/v1/languages"

	CLIENT_TIMEOUT = 5.0
)

type Langs struct {
	Languages []string `json:"languages"`
}

type StdReturn struct {
	Stdout string `json:"stdout"`
	Stderr string `json:"stderr"`
}

// This function is designed to send an API call to the specified endpoint.
// The server parameter is designed to take in a URL, such as 'http://localhost:8080'.
// The endpoint parameter is designed to take in the proper API endpoint, such as '/api/v1/languages'.
// This function will return a pointer to the Langs struct which contains a list of the languages
// currently supported by the API, and an error parameter in the case of failure.
func getLangListJSON(server string, endpoint string) (*Langs, error) {
	req, err := http.NewRequest("GET", server+endpoint, nil)
	if err != nil {
		return nil, err
	}
	client := &http.Client{
		Timeout: time.Second * CLIENT_TIMEOUT,
	}
	//Add any headers or cookies necessary here

	resp, err := client.Do(req)
	if err != nil {
		return nil, err
	} else if resp.StatusCode > 299 {
		return nil, fmt.Errorf("Request failed with status code: %d\n", resp.StatusCode)
	}
	defer resp.Body.Close()

	body, err := io.ReadAll(resp.Body)
	if err != nil {
		return nil, err
	}

	var jsonLangs Langs
	decodeErr := json.Unmarshal(body, &jsonLangs)
	panicCheck(decodeErr)

	return &jsonLangs, nil
}

// This function is designed to send a POST request to the specified endpoint.
// The server parameter contains an API host, such as 'http://localhost:8080'
// The endpoint parameter contains an API endpoint, such as '/api/v1/run'
// The filepath parameter contains the relative filepath to the source file
// The explicit parameter tells us whether or not the user would like to
// have the CLI check the language, or to have the server handle it internally
func postSourceFile(server string, endpoint string, filepath string, langCheck string) (*StdReturn, error) {
	source, err := os.ReadFile(filepath)
	if err != nil {
		return nil, err
	}

	body := bytes.NewReader(source)
	req, err := http.NewRequest("POST", server+endpoint, body)
	if err != nil {
		return nil, err
	}
	req.Header.Add("Content-Type", "application/json")

	//TODO: implement CLI check language logic before adding cookie
	cookie := http.Cookie{
		Name:  "language",
		Value: langCheck,
	}
	req.AddCookie(&cookie)

	client := &http.Client{
		Timeout: time.Second * CLIENT_TIMEOUT,
	}

	resp, err := client.Do(req)
	if err != nil {
		return nil, err
	} else if resp.StatusCode > 299 {
		return nil, fmt.Errorf("Request failed with status code: %d\n", resp.StatusCode)
	}
	defer resp.Body.Close()

	respReader, readErr := io.ReadAll(resp.Body)
	if readErr != nil {
		return nil, err
	}

	var ret StdReturn
	decodeErr := json.Unmarshal(respReader, &ret)
	panicCheck(decodeErr)

	return &ret, nil
}

func panicCheck(err error) {
	if err != nil {
		panic(err)
	}
}
