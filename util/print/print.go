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
