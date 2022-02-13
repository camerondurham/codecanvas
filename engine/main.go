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

func main() {

	handler := codehandler.NewCodeRunner("integ-test", "")

	sourcecode := `#!/bin/bash
echo "hello world"
sleep 4
	`
	shellRunProps := codehandler.RunnerProps{
		Source: sourcecode,
		Lang:   codehandler.SHELL,
	}

	fmt.Println("------------")
	fmt.Printf("running bash source:\n--------\n%s\n--------\n", sourcecode)
	runnerOutput, err := handler.Run(&shellRunProps)
	printOutput(runnerOutput, err)

	pythonsource := `
mylist = ["hello", "world", "from", "python"]
for item in mylist:
	print(item)
	`
	pythonRunProps := codehandler.RunnerProps{
		Source: pythonsource,
		Lang:   codehandler.PYTHON3,
	}

	fmt.Println("------------")
	fmt.Printf("\nrunning python source:\n--------\n%s\n--------\n", pythonsource)
	pyRunnerOutput, err := handler.Run(&pythonRunProps)
	printOutput(pyRunnerOutput, err)

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
