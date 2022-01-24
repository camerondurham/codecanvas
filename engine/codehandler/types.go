package codehandler

type Language string

const (
	// iota: https://github.com/golang/go/wiki/Iota

	// Languages for now, though we should really not support shell code, these two will make it easy to use for testing
	PYTHON3 = Language("python3")
	SHELL   = Language("bash")
	CPP11   = Language("c++11")
)

var (
	// supported languages exposed to user
	Languages = []Language{
		PYTHON3,
	}
)

type RunnerProps struct {
	Source string   `json:"source"`
	Lang   Language `json:"language"`
}

type RunnerOutput struct {
	Stdout       string `json:"stdout"`
	Stderr       string `json:"stderr"`
	CommandError error  `json:"error"`
}
