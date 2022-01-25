package main

import (
	"encoding/json"
	"fmt"
	"net/http"
	"time"

	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
	"github.com/runner-x/runner-x/engine/coderunner"
)

const (
	API_PORT               = ":8080"
	SERVER_REQUEST_TIMEOUT = 10
)

type LanguagesResponse struct {
	Languages []coderunner.Language `json:"languages"`
}

func languagesHandler(w http.ResponseWriter, r *http.Request) {
	langs := LanguagesResponse{
		Languages: coderunner.Languages,
	}
	json.NewEncoder(w).Encode(langs)
}

type RunResponse struct {
	Stdout string `json:"stdout"`
	Stderr string `json:"stderr"`
}

func runHandler(w http.ResponseWriter, r *http.Request) {
	// TODO: parse request body

	// TODO: transform request body into runner engine input

	// TODO: let code runner run the code

	// TODO: replace hard-coded reponse with transformed runner output
	output := RunResponse{
		Stdout: "hello world",
		Stderr: "",
	}

	json.NewEncoder(w).Encode(output)
}

func main() {
	r := chi.NewRouter()

	// use request ID to help with Recoverer and debugging logs
	r.Use(middleware.RequestID)

	// logger should come before recoverer
	r.Use(middleware.Logger)

	// use Recoverer to try to recover server health if a panic occurs
	// uses request ID if available
	r.Use(middleware.Recoverer)

	// use middleware to set a timeout to avoid saturating the server
	r.Use(middleware.Timeout(SERVER_REQUEST_TIMEOUT * time.Second))

	r.Get("/api/v1/languages", languagesHandler)
	r.Post("/api/v1/run", runHandler)

	err := http.ListenAndServe(API_PORT, r)
	if err != nil {
		fmt.Printf("error starting server: %v", err)
		return
	}
}
