package v1

type Language string

const (
	// Languages for now, though we should really not support shell code, these two will make it easy to use for testing
	PYTHON3 = Language("python3")
	SHELL   = Language("bash")
	CPP11   = Language("c++11")
)

var (
	// SupportedLanguages that API callers can use
	SupportedLanguages = []Language{
		PYTHON3,
	}
)
