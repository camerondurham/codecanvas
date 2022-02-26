package main

import (
	"encoding/json"
	"fmt"
	"io"
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
	var err error

	for {
		err = decoder.Decode(&res)
		if err != nil {
			log.Printf("error parsing request: %v\n", err)
		}
		if err == io.EOF {
			break
		}
	}

	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		w.Header().Set("Content-Type", "application/json")
		resp := make(map[string]string)
		resp["error"] = "cannot parse request"
		jsonResp, _ := json.Marshal(resp)
		w.Write(jsonResp)
		return
	}

	// TODO: transform request body into runner engine input

	handler := coderunner.NewCodeRunner("api-runhandler", "")

	runProps := coderunner.RunnerProps{
		Source: res.Source,
		Lang:   res.Lang,
	}

	// TODO: let code runner run the code

	runnerOutput, err := handler.Run(&runProps)

	if err != nil {
		log.Printf("failed to run output: %v\n", err)
	}

	// TODO: replace hard-coded reponse with transformed runner output
	output := api.RunResponse{
		Stdout: runnerOutput.Stdout,
		Stderr: runnerOutput.Stderr,
		Error:  runnerOutput.CommandError,
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
