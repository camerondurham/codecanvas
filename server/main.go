package main

import (
	"context"
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
	"github.com/runner-x/runner-x/engine/sandbox"
	sandboxdocker "github.com/runner-x/runner-x/engine/sandbox/docker"

	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
	"github.com/go-chi/cors"
	coderunner "github.com/runner-x/runner-x/engine/coderunner/v2"
	api "github.com/runner-x/runner-x/server/api/v2"
)

const (
	API_PORT               = ":10100"
	SERVER_REQUEST_TIMEOUT = 10
	ExecutionBackendDocker = "docker"
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
		// Error:  RunnerOutput.CommandError.Error(),
	}
	if RunnerOutput.CommandError != nil {
		output.Error = RunnerOutput.CommandError.Error()
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
	if os.Getenv("CODECANVAS_EXECUTION_BACKEND") == ExecutionBackendDocker {
		parentDir := os.Getenv("CODECANVAS_SANDBOX_PARENT_DIR")
		runner := sandboxdocker.NewRunner(parentDir)
		if dockerPath := os.Getenv("CODECANVAS_SANDBOX_DOCKER"); len(dockerPath) > 0 {
			runner.DockerPath = dockerPath
		}

		policy := sandboxPolicyFromEnv()
		images := sandboxImageOverridesFromEnv()
		if envBool("CODECANVAS_SANDBOX_PREFLIGHT", true) {
			if err := runner.Preflight(context.Background(), policy, coderunner.SandboxImages(images)); err != nil {
				panic(fmt.Sprintf("sandbox preflight failed: %v", err))
			}
		}

		cr := coderunner.NewCodeRunnerWithSandbox(coderunner.SandboxConfig{
			Runner: runner,
			Policy: policy,
			Images: images,
		})
		return &cr
	}

	var numRunners int
	numRunnersStr := os.Getenv("NUM_RUNNERS")
	numRunners, err := strconv.Atoi(numRunnersStr)
	if err != nil {
		print2.DebugPrintf("error reading NUM_RUNNERS, setting to default of 1")
		numRunners = 1
	}

	parentDir := os.TempDir()
	if _, ok := os.LookupEnv("UNIT_TEST"); ok {
		parentDir, err = os.MkdirTemp(os.TempDir(), "runner")
		print2.DebugPrintf("err result making unit test tmp dir: %v", err)
	}

	cr := coderunner.NewCodeRunner(uint(numRunners), &runtime.ProcessorArgsProvider{}, parentDir, "runner")
	return &cr
}

func sandboxPolicyFromEnv() sandbox.Policy {
	return sandbox.Policy{
		TimeoutSec:       envInt("CODECANVAS_SANDBOX_TIMEOUT", sandboxdocker.DefaultTimeoutSec),
		CPUs:             envString("CODECANVAS_SANDBOX_CPUS", sandboxdocker.DefaultCPUs),
		Memory:           envString("CODECANVAS_SANDBOX_MEMORY", sandboxdocker.DefaultMemory),
		PidsLimit:        envInt("CODECANVAS_SANDBOX_PIDS", sandboxdocker.DefaultPidsLimit),
		Runtime:          os.Getenv("CODECANVAS_SANDBOX_RUNTIME"),
		User:             envString("CODECANVAS_SANDBOX_USER", sandboxdocker.DefaultUser),
		NoFileLimit:      envString("CODECANVAS_SANDBOX_NOFILE", sandboxdocker.DefaultNoFileLimit),
		SeccompProfile:   os.Getenv("CODECANVAS_SANDBOX_SECCOMP_PROFILE"),
		OutputLimitBytes: int64(envInt("CODECANVAS_SANDBOX_OUTPUT_BYTES", sandboxdocker.DefaultOutputLimitBytes)),
		PullPolicy:       envString("CODECANVAS_SANDBOX_PULL", sandboxdocker.DefaultPullPolicy),
	}
}

func sandboxImageOverridesFromEnv() map[string]string {
	images := map[string]string{}
	fallback := os.Getenv("CODECANVAS_SANDBOX_IMAGE")
	if len(fallback) > 0 {
		for _, lang := range coderunner.SupportedLanguages {
			images[lang] = fallback
		}
	}

	setImageOverride(images, coderunner.Python3.Name, "CODECANVAS_SANDBOX_IMAGE_PYTHON3")
	setImageOverride(images, coderunner.NodeJs.Name, "CODECANVAS_SANDBOX_IMAGE_NODEJS")
	setImageOverride(images, coderunner.Cpp.Name, "CODECANVAS_SANDBOX_IMAGE_CPP")
	setImageOverride(images, coderunner.Go.Name, "CODECANVAS_SANDBOX_IMAGE_GO")
	setImageOverride(images, coderunner.Shell.Name, "CODECANVAS_SANDBOX_IMAGE_BASH")
	setImageOverride(images, coderunner.Rust.Name, "CODECANVAS_SANDBOX_IMAGE_RUST")
	return images
}

func setImageOverride(images map[string]string, lang string, envName string) {
	if image := os.Getenv(envName); len(image) > 0 {
		images[lang] = image
	}
}

func envString(name string, defaultValue string) string {
	value := os.Getenv(name)
	if len(value) == 0 {
		return defaultValue
	}
	return value
}

func envInt(name string, defaultValue int) int {
	value := os.Getenv(name)
	if len(value) == 0 {
		return defaultValue
	}
	parsed, err := strconv.Atoi(value)
	if err != nil {
		print2.DebugPrintf("error reading %s=%q, using default %d", name, value, defaultValue)
		return defaultValue
	}
	return parsed
}

func envBool(name string, defaultValue bool) bool {
	value := os.Getenv(name)
	if len(value) == 0 {
		return defaultValue
	}
	parsed, err := strconv.ParseBool(value)
	if err != nil {
		print2.DebugPrintf("error reading %s=%q, using default %t", name, value, defaultValue)
		return defaultValue
	}
	return parsed
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
