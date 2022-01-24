package main

import (
	"fmt"

	"github.com/runner-x/runner-x/engine/codehandler"
)

func main() {

	sourcecode := `#!/bin/bash
	echo "hello world"
	sleep 4
	`
	shellRunProps := codehandler.RunnerProps{
		Source: sourcecode,
		Lang:   codehandler.SHELL,
	}
	runnerOutput, err := codehandler.Handle(&shellRunProps)
	fmt.Println(err)
	fmt.Println(runnerOutput)

	pythonsource := `
mylist = ["hello", "world", "from", "python"]
for item in mylist:
	print(item)
	`
	pythonRunProps := codehandler.RunnerProps{
		Source: pythonsource,
		Lang:   codehandler.PYTHON3,
	}

	pyRunnerOutput, err := codehandler.Handle(&pythonRunProps)
	fmt.Println(err)
	fmt.Println(pyRunnerOutput)

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
