/*
package cmd

const (
	SERVER        = "http://localhost:8080"
	RUN_ENDPOINT  = "/api/v1/run"
	LANG_ENDPOINT = "/api/v1/languages"

	CLIENT_TIMEOUT = 5.0
)

type Langs struct {
	Languages []string `json:"languages"`
}


type StdReturn struct {
	Stdout string `json:"stdout"`
	Stderr string `json:"stderr"`
}


// This function is designed to send an API call to the specified endpoint.
// The server parameter is designed to take in a URL, such as 'http://localhost:8080'.
// The endpoint parameter is designed to take in the proper API endpoint, such as '/api/v1/languages'.
// This function will return a pointer to the Langs struct which contains a list of the languages
// currently supported by the API, and an error parameter in the case of failure.
//func getLangListJSON(server string, endpoint string) (*Langs, error) {

//}

// This function is designed to send a POST request to the specified endpoint.
// The server parameter contains an API host, such as 'http://localhost:8080'
// The endpoint parameter contains an API endpoint, such as '/api/v1/run'
// The filepath parameter contains the relative filepath to the source file
// The explicit parameter tells us whether or not the user would like to
// have the CLI check the language, or to have the server handle it internally
//func postSourceFile(server string, endpoint string, filepath string, langCheck coderunner.Language) (*coderunner.RunnerOutput, error) {

//}

func panicCheck(err error) {
	if err != nil {
		panic(err)
	}
}

func extractExtension(filename string) string {
	f := []rune(filename)
	for i := len(f) - 1; i >= 0; i -= 1 {
		if f[i] == '.' {
			return string(f[i+1:])
		}
	}
	return filename
}
*/
package cmd

func hi() {}
