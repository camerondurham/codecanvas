package iohelpers

import (
	"bytes"
	"io"

	"github.com/runner-x/runner-x/util/print"
)

// GetWriterChannelOutput gets a string channel from read close to be converted into a string after closer is finished
func GetWriterChannelOutput(pipeReadCloser io.ReadCloser) chan string {
	outChannel := make(chan string)

	// copy output to separate goroutine so printing can't block indefinitely
	go func() {
		var buf bytes.Buffer
		_, err := io.Copy(&buf, pipeReadCloser)
		if err != nil {
			print.DebugPrintf("error copying output: %v", err)
		}
		outChannel <- buf.String()
	}()

	return outChannel
}
