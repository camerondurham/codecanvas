package main

import (
	"encoding/json"
	"net/http"

	"github.com/runner-x/runner-x/engine/codehandler"
)

const (
	API_PORT = ":8080"
)

type languages struct {
	Languages []codehandler.Language `json:"languages"`
}

func main() {
	http.HandleFunc("/api/v1/languages", func(w http.ResponseWriter, r *http.Request) {
		langs := languages{
			Languages: codehandler.Languages,
		}
		json.NewEncoder(w).Encode(langs)
	})

	http.HandleFunc("/api/v1/run", func(w http.ResponseWriter, r *http.Request) {
		// TODO: handle function call and retrieve output
		output := codehandler.RunnerOutput{
			Stdout:       "hello world",
			Stderr:       "",
			CommandError: nil,
		}

		json.NewEncoder(w).Encode(output)
	})

	err := http.ListenAndServe(API_PORT, nil)
	if err != nil {
		return
	}
}
