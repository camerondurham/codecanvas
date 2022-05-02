package api

import coderunner "github.com/runner-x/runner-x/engine/coderunner/v1"

// A LanguagesResponse contains the languages users are allowed to run on the server
type LanguagesResponse struct {
	Languages []coderunner.Language `json:"languages"`
}

// A RunRequest contains the data required to run used code in the CodeRunner
// Language will not be checked by the server explicitly. The requester is responsible
// for querying the /api/v1/languages endpoint to verify the supported languages.
//
// The api server should return 400 Bad Request if either of these fields are missing
// or Language is not supported by the server.
type RunRequest struct {
	// TODO: document and enforce a size limit for Source string (e.g. 4K characters)
	Source string              `json:"source"`   // Source code for CodeRunner to execute
	Lang   coderunner.Language `json:"language"` // Programming language to compile and run the source code as
}

// A RunResponse contains the program stdout, stderr stream ouput from the code runner
type RunResponse struct {
	// TODO: rename and/or create new error type to wrap error types
	Stdout string `json:"stdout"`
	Stderr string `json:"stderr"`
	Error  error  `json:"error"` // Error result from either compilation or runtime errors. Will be nil if both compilation and runtime were successful.
}
