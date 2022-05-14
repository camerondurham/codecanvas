package v2

// A LanguagesResponse contains the languages users are allowed to run on the server
type LanguagesResponse struct {
	Languages []string `json:"languages"`
}

// A RunRequest contains the data required to run used code in the CodeRunner
// Language will not be checked by the server explicitly. The requester is responsible
// for querying the /api/v1/languages endpoint to verify the supported languages.
//
// The api server should return 400 Bad Request if either of these fields are missing
// or Language is not supported by the server.
type RunRequest struct {
	Source string `json:"source"`
	Lang   string `json:"language"`
}

type RunResponse struct {
	// Stdout will contain the standard output stream contents from running the program
	Stdout string `json:"stdout"`
	// Stderr is standard error stream from running program
	Stderr string `json:"stderr"`
	// Error result from either compilation or runtime errors. Will be nil if both compilation and runtime were successful.
	Error error `json:"error"`
}
