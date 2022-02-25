package main

import (
	"fmt"

	codehandler "github.com/runner-x/runner-x/engine/coderunner"
)

func printOutput(r *codehandler.RunnerOutput, err error) {
	if err != nil {
		fmt.Printf("\nerror [%v]", err)
	}
	fmt.Println("code output")
	fmt.Printf("  stdout: %v\n", r.Stdout)
	fmt.Printf("  stderr: %v\n", r.Stderr)
}

func helper(handler *codehandler.CodeRunner, props codehandler.RunnerProps) {
	fmt.Println("------------")
	fmt.Printf("running %s source:\n--------\n%s\n--------\n", props.Lang, props.Source)
	runnerOutput, err := handler.Run(&props)
	printOutput(runnerOutput, err)
}

func main() {

	handler := codehandler.NewCodeRunner("integ-test", "")

	// TODO: eventually this PID should **not** be the same PID as the host runner
	sourcecode := `#!/bin/bash
echo "hello world"
echo $$
echo $PPID
sleep 4
`
	shellRunProps := codehandler.RunnerProps{
		Source: sourcecode,
		Lang:   codehandler.SHELL,
	}
	helper(handler, shellRunProps)

	pythonsource := `
mylist = ["hello", "world", "from", "python"]
for item in mylist:
	print(item)
	`
	pythonRunProps := codehandler.RunnerProps{
		Source: pythonsource,
		Lang:   codehandler.PYTHON3,
	}
	helper(handler, pythonRunProps)

	bashSourcecode := `#!/bin/bash
sleep 2 &
sleep 2 &
sleep 2 &
sleep 2 &
sleep 2 &
sleep 2 &
sleep 2 &
sleep 2 &
sleep 2 &
sleep 2 &
sleep 2 &
sleep 2 &
sleep 2 &
sleep 2 &
`
	shellRunPropsNprocs := codehandler.RunnerProps{
		Source: bashSourcecode,
		Lang:   codehandler.SHELL,
	}
	helper(handler, shellRunPropsNprocs)

	// TODO: implement c++11 source test
	_ = `
	#include<iostream>
	#include<algorithm>

	typedef unsigned int uint;

	using namespace std;

	int main() {
		string inp = "hello world";

		if(inp.length() > 1){

			for(uint start = 0, end = inp.length() - 1; start < end; start++, end--){
				std::swap(inp[start], inp[end]);
			}
		}
		std::cout<< inp;
	}
	`
}
