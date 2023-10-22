import codeMirror from "./editor";

function setLang() {
  const selector = document.getElementById("lang-select");
  const lang = selector.options[selector.selectedIndex].innerText;
  if (lang === "python3" || lang === "python") {
    codeMirror.setValue(
      "def fibonacci(n):\n\tif n<=1:\n\t\treturn n\n\telse:\n\t\treturn(fibonacci(n-1) + fibonacci(n-2))\n\nn = 5\n\nfibo_series = []\n\nfor i in range(0,n):\n\tfibo_series.append(fibonacci(i))\n\nprint(fibo_series)"
    );
  } else if (
    lang === "node" ||
    lang === "nodejs" ||
    lang === "js" ||
    lang === "javascript"
  ) {
    codeMirror.setValue(`const { exec } = require("child_process");
console.log("Hello world from Node.js! My uptime is:");
exec("uptime", (error, stdout, stderr) => {
    if (error) {
        console.log(\`error: ${error.message}\`);
        return;
    }
    if (stderr) {
        console.log(\`stderr: ${stderr}\`);
        return;
    }
    console.log(\`stdout: ${stdout}\`);
});`);
  } else if (lang === "c++" || lang === "cpp" || lang === "c++11") {
    codeMirror.setValue(
      `#include<iostream>
#include<thread>
int main() {
	unsigned int nthreads = std::thread::hardware_concurrency();
	std::cout << "hello world from C++!" << std::endl;
	std::cerr << "I have " << nthreads << " threads!" << std::endl;
	return 0;
}`
    );
  } else if (lang === "go" || lang === "golang") {
    codeMirror.setValue(
      `package main
import "fmt"
func main() {
    fmt.Println("hello world")
}`
    );
  } else {
    codeMirror.setValue(
      "def main():\n\tprint('Hello, World!')\n\nif __name__ == '__main__':\n\tmain()"
    );
  }
}

export default setLang;
