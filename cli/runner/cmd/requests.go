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
		return nil, err
	}

	body, err := io.ReadAll(resp.Body)
	defer resp.Body.Close()

	//should I just avoid the status code check and just have one single error check here?
	if resp.StatusCode > 299 {
		return nil, fmt.Errorf("Response failed with status code: %d\n", resp.StatusCode)
	} else if err != nil {
		return nil, err
	}
	json.Unmarshal(body, &jsonLangs)
	return &jsonLangs, fmt.Errorf("")
}

func postSourceFile(server string, endpoint string, filepath string, explicit bool) string {
	return "placeholder"
}
