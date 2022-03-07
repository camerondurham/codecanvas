package print

import (
	"fmt"
	"os"
)

// DebugPrintf prints message if DEBUG environment variable is set
func DebugPrintf(format string, fmtArgs ...interface{}) {
	if _, ok := os.LookupEnv("DEBUG"); ok {
		fmt.Printf(format, fmtArgs...)
	}
}

// ProcDebug prints message if DEBUG environment variable is set
// Until process binary has a better way of handling i/o streams this should
// **only** be used for debugging proc, not debugging server
func ProcDebug(format string, fmtArgs ...interface{}) {
	if _, ok := os.LookupEnv("PROC_DEBUG"); ok {
		fmt.Printf(format, fmtArgs...)
	}
}
