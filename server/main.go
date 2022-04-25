package main

import (
	"encoding/json"
	"fmt"
	"io"
	"log"
	"net/http"
	"os"
	"time"

	"github.com/runner-x/runner-x/engine/runtime"

	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
	"github.com/go-chi/cors"
	"github.com/runner-x/runner-x/engine/coderunner"
	"github.com/runner-x/runner-x/server/api"
)

const (
	API_PORT               = ":10100"
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
	decoder := json.NewDecoder(r.Body)
	var res api.RunRequest
	var err error

	// keep looping as decoder continues reading json.
	// breaks when EOF reached
	for {
		err = decoder.Decode(&res)
		if err != nil && err != io.EOF {
			throwE400(w, "failed to parse request body")
			return
		}
		if err == io.EOF {
			break
		}
	}

	// verify request contains both language and source code to run
	if len(res.Lang) == 0 || len(res.Source) == 0 {
		throwE400(w, "\"language\" and \"source\" fields are required")
		return
	}

	var handler *coderunner.CodeRunner

	// TODO: don't hard code the directory here
	workdirPath := "/tmp/runner1"
	if _, ok := os.LookupEnv("UNIT_TEST"); ok {
		workdirPath = ""
	}

	handler = coderunner.NewCodeRunner("api-runhandler", workdirPath, &runtime.ProcessorArgsProvider{})

	RunProps := coderunner.RunnerProps{
		Source: res.Source,
		Lang:   res.Lang,
	}

	RunnerOutput, err := handler.Run(&RunProps)

	if err != nil {
		throwE400(w, ("failed to run output: " + err.Error()))
		return
	}

	output := api.RunResponse{
		Stdout: RunnerOutput.Stdout,
		Stderr: RunnerOutput.Stderr,
		Error:  RunnerOutput.CommandError,
	}

	err = json.NewEncoder(w).Encode(output)
	if err != nil {
		throwE400(w, ("failed to encode run output: " + err.Error()))
		return
	}
}

func throwE400(w http.ResponseWriter, err string) {
	log.Printf("%v\n", err)
	w.WriteHeader(http.StatusBadRequest)
	w.Header().Set("Content-Type", "application/json")
	resp := make(map[string]string) // map[key-type]val-type
	resp["error"] = err
	jsonResp, _ := json.Marshal(resp) // _ is a blank identifier (disregard)
	_, writeErr := w.Write(jsonResp)

	if writeErr != nil {
		fmt.Printf("failed to write 400 error")
	}
}

func CreateNewRouter() *chi.Mux {
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

	// basic CORS configuration from https://go-chi.io/#/pages/middleware?id=cors
	// TODO: make CORS policy more restrictive
	r.Use(cors.Handler(cors.Options{
		// AllowedOrigins:   []string{"https://foo.com"}, // Use this to allow specific origin hosts
		AllowedOrigins: []string{"https://*", "http://*"},
		// AllowOriginFunc:  func(r *http.Request, origin string) bool { return true },
		AllowedMethods:   []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowedHeaders:   []string{"Accept", "Authorization", "Content-Type", "X-CSRF-Token", "X-Requested-With"},
		ExposedHeaders:   []string{"Link"},
		AllowCredentials: false,
		MaxAge:           300, // Maximum value not ignored by any of major browsers
	}))
	return r
}

func setCORSOptionHandler(r *chi.Mux, paths []string) {
	for _, v := range paths {
		r.Options(v, optionHandler)
	}
}

// try to prevent
//   has been blocked by CORS policy:
//   Response to preflight request doesn’t pass access control check:
//   It does not have HTTP ok status.

func optionHandler(w http.ResponseWriter, r *http.Request) {
	w.WriteHeader(http.StatusOK)
}

func main() {

	r := CreateNewRouter()

	r.Get("/api/v1/languages", languagesHandler)
	r.Post("/api/v1/run", runHandler)
	setCORSOptionHandler(r, []string{"/api/v1/languages", "/api/v1/run"})

	err := http.ListenAndServe(API_PORT, r)
	if err != nil {
		fmt.Printf("error starting server: %v", err)
		return
	}
}
