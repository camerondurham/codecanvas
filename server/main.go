package main

import (
	"encoding/json"
	"fmt"
	"io"
	"log"
	"net/http"
	"os"
	"strconv"
	"time"

	print2 "github.com/runner-x/runner-x/util/print"

	"github.com/runner-x/runner-x/engine/runtime"

	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
	"github.com/go-chi/cors"
	coderunner "github.com/runner-x/runner-x/engine/coderunner/v2"
	api "github.com/runner-x/runner-x/server/api/v2"
)

const (
	API_PORT               = ":10100"
	SERVER_REQUEST_TIMEOUT = 10
)

type RunnerServer struct {
	coderunner coderunner.CodeRunner
}

func (rs RunnerServer) languagesHandler(w http.ResponseWriter, r *http.Request) {
	langs := api.LanguagesResponse{
		Languages: coderunner.SupportedLanguages,
	}
	err := json.NewEncoder(w).Encode(langs)
	if err != nil {
		log.Printf("failed to encode languages reponse: %v", err)
	}
}

func (rs RunnerServer) runHandler(w http.ResponseWriter, r *http.Request) {
	decoder := json.NewDecoder(r.Body)
	var res api.RunRequest
	var err error

	// keep looping as decoder continues reading json.
	// breaks when EOF reached
	for {
		err = decoder.Decode(&res)
		if err != nil && err != io.EOF {
			rs.throwE400(w, "failed to parse request body")
			return
		}
		if err == io.EOF {
			break
		}
	}

	// verify request contains both language and source code to run
	if len(res.Lang) == 0 || len(res.Source) == 0 {
		rs.throwE400(w, "\"language\" and \"source\" fields are required")
		return
	}

	if _, ok := coderunner.SupportedLanguageSet[res.Lang]; !ok {
		rs.throwE400(w, fmt.Sprintf("invalid language: [%v] not currently supported", res.Lang))
		return
	}

	RunProps := coderunner.RunnerProps{
		Source: res.Source,
		Lang:   res.Lang,
	}

	RunnerOutput, err := rs.coderunner.Run(&RunProps)

	if err != nil {
		rs.throwE400(w, "failed to run output: "+err.Error())
		return
	}

	output := api.RunResponse{
		Stdout: RunnerOutput.Stdout,
		Stderr: RunnerOutput.Stderr,
		Error:  RunnerOutput.CommandError,
	}

	err = json.NewEncoder(w).Encode(output)
	if err != nil {
		rs.throwE400(w, "failed to encode run output: "+err.Error())
		return
	}
}

func (rs *RunnerServer) throwE400(w http.ResponseWriter, err string) {
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

func CreateCodeRunner() *coderunner.CodeRunner {
	var numRunners int
	numRunnersStr := os.Getenv("NUM_RUNNERS")
	numRunners, err := strconv.Atoi(numRunnersStr)
	if err != nil {
		print2.DebugPrintf("error reading NUM_RUNNERS, setting to default of 1")
		numRunners = 1
	}

	parentDir := "/tmp"
	if _, ok := os.LookupEnv("UNIT_TEST"); ok {
		parentDir, err = os.MkdirTemp("/tmp", "runner")
		print2.DebugPrintf("err result making unit test tmp dir: %v", err)
	}

	cr := coderunner.NewCodeRunner(uint(numRunners), &runtime.ProcessorArgsProvider{}, parentDir, "runner")
	return &cr
}

func CreateServer(cr coderunner.CodeRunner) *RunnerServer {
	return &RunnerServer{coderunner: cr}

}

func main() {

	r := CreateNewRouter()
	cr := CreateCodeRunner()
	server := CreateServer(*cr)

	r.Get("/api/v1/languages", server.languagesHandler)
	r.Post("/api/v1/run", server.runHandler)
	setCORSOptionHandler(r, []string{"/api/v1/languages", "/api/v1/run"})

	err := http.ListenAndServe(API_PORT, r)
	if err != nil {
		fmt.Printf("error starting server: %v", err)
		return
	}
}
