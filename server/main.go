package main

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"time"

	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
	"github.com/runner-x/runner-x/engine/coderunner"
	"github.com/runner-x/runner-x/server/api"
)

const (
	API_PORT               = ":8080"
	SERVER_REQUEST_TIMEOUT = 10
)

func languagesHandler(w http.ResponseWriter, r *http.Request) {
	langs := api.LanguagesResponse{
		Languages: coderunner.Languages,
	}
	err := json.NewEncoder(w).Encode(langs)
	if err != nil {
		log.Printf("failed to encode languages reponse: %v", err)
	}
}

func runHandler(w http.ResponseWriter, r *http.Request) {
	// TODO: parse request body
	decoder := json.NewDecoder(r.Body)
	var res api.RunRequest
	err := decoder.Decode(&res)

	if err != nil {
		log.Printf("failed to parse request body: %b\n", err)
	}
	// TODO: transform request body into runner engine input

	handler := coderunner.NewCodeRunner("api-runhandler", "")

	RunProps := coderunner.RunnerProps{
		Source: res.Source,
		Lang:   res.Lang,
	}

	// TODO: let code runner run the code

	RunnerOutput, err := handler.Run(&RunProps)

	if err != nil {
		log.Printf("failed to run output: %v\n", err)
	}

	// TODO: replace hard-coded reponse with transformed runner output
	output := api.RunResponse{
		Stdout: RunnerOutput.Stdout,
		Stderr: RunnerOutput.Stderr,
		Error:  nil,
	}

	err = json.NewEncoder(w).Encode(output)
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
