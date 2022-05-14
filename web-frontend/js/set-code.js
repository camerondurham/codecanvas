import codeMirror from "./editor";

function setLang() {
  const selector = document.getElementById("lang-select");
  const lang = selector.options[selector.selectedIndex].innerText;
  if (lang === "python3" || lang === "python") {
    codeMirror.setValue(
      "def main():\n\tprint('Hello, World!')\n\nif __name__ == '__main__':\n\tmain()"
    );
  } else if (
    lang === "node" ||
    lang === "nodejs" ||
    lang === "js" ||
    lang === "javascript"
  ) {
    codeMirror.setValue("console.log('hello world');");
  } else if (lang === "c++" || lang === "cpp" || lang === "c++11") {
    codeMirror.setValue(
      `#include<iostream>
int main() {
	std::cout << "hello world" << std::endl;
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
