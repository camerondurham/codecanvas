package main

// TODO: extend mock server, this is currently an exact copy of api/main.go

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"time"

	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
	coderunner "github.com/runner-x/runner-x/engine/coderunner/v1"
	"github.com/runner-x/runner-x/server/api"
)

const (
	API_PORT               = ":10100"
	SERVER_REQUEST_TIMEOUT = 10
)

func languagesHandler(w http.ResponseWriter, r *http.Request) {
	langs := api.LanguagesResponse{
		Languages: coderunner.SupportedLanguages,
	}
	err := json.NewEncoder(w).Encode(langs)
	if err != nil {
		log.Printf("failed to encode languages reponse: %v", err)
	}
}

func runHandler(w http.ResponseWriter, r *http.Request) {
	// TODO: parse request body

	// TODO: transform request body into runner engine input

	// TODO: let code runner run the code

	// TODO: replace hard-coded reponse with transformed runner output
	output := api.RunResponse{
		Stdout: "hello world",
		Stderr: "",
		Error:  nil,
	}

	err := json.NewEncoder(w).Encode(output)
	if err != nil {
		log.Printf("failed to encode run output: %v\n", err)
	}
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
