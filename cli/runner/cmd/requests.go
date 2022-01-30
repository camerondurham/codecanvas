//file to contain helper functions for different commands

package cmd

import (
	"encoding/json"
	"fmt"
	"io"
	"net/http"
)

// Simple struct to hold JSON vals from API call
type Langs struct {
	Languages []string `json:"languages"`
}

// This function is designed to send an API call to the specified endpoint.
// The server parameter is designed to take in a URL, such as 'http://localhost:8080'.
// The endpoint parameter is designed to take in the proper API endpoint, such as '/api/v1/languages'.
// This function will return a pointer to the Langs struct which contains a list of the languages
// currently supported by the API, and an error parameter in the case of failure.
func getLangListJSON(server string, endpoint string) (*Langs, error) {
	resp, err := http.Get(server + endpoint)
	if err != nil {
		return nil, err
	} else if resp.StatusCode > 299 {
		return nil, fmt.Errorf("Response failed with status code: %d\n", resp.StatusCode)
	}
	defer resp.Body.Close()

	body, err := io.ReadAll(resp.Body)
	if err != nil {
		return nil, err
	}

	var jsonLangs Langs
	json.Unmarshal(body, &jsonLangs)
	return &jsonLangs, fmt.Errorf("")
}

/*
func postSourceFile(server string, endpoint string, filepath string, explicit bool) string {
	return "placeholder"
}
*/
