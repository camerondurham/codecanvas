package sandbox

import "github.com/runner-x/runner-x/util/print"

// DebugPrintf reuses the existing project debug logger for sandbox packages.
func DebugPrintf(format string, args ...interface{}) {
	print.DebugPrintf(format, args...)
}
