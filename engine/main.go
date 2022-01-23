package main

import (
	"fmt"

	"github.com/runner-x/runner-x/engine/runtime"
)

func main() {

	// TODO: this interface is trash, should make it easier to run a bunch of commands with the same timeout
	runOutputArr, err := runtime.RunCmdList([]runtime.RunProps{
		{
			RunArgs: []string{"sleep", "3"},
			Timeout: 1,
		},
		{
			RunArgs: []string{"clang++", "test/test.cpp", "-o", "test/bin/test"},
			Timeout: 1,
		},
		{
			RunArgs: []string{"./test/bin/test"},
			Timeout: 1,
		},
	})

	for _, out := range runOutputArr {
		fmt.Printf("\ncommand output: %v command error: [%v] func error: [%v]", out.Stdout, out.CommandError, err)
	}

}
