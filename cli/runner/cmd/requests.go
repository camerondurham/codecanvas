package cmd

import (
	"encoding/json"
	"fmt"
	"io"
	"net/http"
)

//file to contain helper functions for different commands

// Simple struct to hold JSON vals from API call
type Langs struct {
	Languages []string `json:"languages"`
	Error     bool
}

func getLangListJSON(server string, endpoint string) (*Langs, error) {
	var jsonLangs Langs
	resp, err := http.Get(server + endpoint)
	if err != nil {
		return nil, fmt.Errorf("Bad API call")
	}

	body, err := io.ReadAll(resp.Body)
	//all of these error checks get pretty redundant,
	//maybe there's a way to make this better in the future
	if resp.StatusCode > 299 {
		return nil, fmt.Errorf("Response failed with status code: %d\n", resp.StatusCode)
	}
	if err != nil {
		return nil, err
	}
	json.Unmarshal(body, &jsonLangs)
	return &jsonLangs, fmt.Errorf("")
}

func postSourceFile(server string, endpoint string, filepath string, explicit bool) string {
	return "placeholder"
}
