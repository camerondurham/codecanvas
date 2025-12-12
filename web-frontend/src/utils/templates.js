// Language templates and mode mappings for CodeMirror

export const languageTemplates = {
  python3: {
    mode: 'python',
    code: `def fibonacci(n):
\tif n<=1:
\t\treturn n
\telse:
\t\treturn(fibonacci(n-1) + fibonacci(n-2))

n = 5

fibo_series = []

for i in range(0,n):
\tfibo_series.append(fibonacci(i))

print('Hello, World from Python! Here\\'s some fibonacci numbers:')
print(fibo_series)`
  },
  python: {
    mode: 'python',
    code: `def fibonacci(n):
\tif n<=1:
\t\treturn n
\telse:
\t\treturn(fibonacci(n-1) + fibonacci(n-2))

n = 5

fibo_series = []

for i in range(0,n):
\tfibo_series.append(fibonacci(i))

print('Hello, World from Python! Here\\'s some fibonacci numbers:')
print(fibo_series)`
  },
  nodejs: {
    mode: 'javascript',
    code: `const { exec } = require("child_process");

console.log("Hello world from Node.js! My uptime is:");

exec("uptime", (error, stdout, stderr) => {
\tif (error) {
\t\tconsole.log(\`error: \${error.message}\`);
\t\treturn;
}
\tif (stderr) {
\t\tconsole.log(\`stderr: \${stderr}\`);
\t\treturn;
\t}
\t\tconsole.log(\`stdout: \${stdout}\`);
});`
  },
  node: {
    mode: 'javascript',
    code: `const { exec } = require("child_process");

console.log("Hello world from Node.js! My uptime is:");

exec("uptime", (error, stdout, stderr) => {
\tif (error) {
\t\tconsole.log(\`error: \${error.message}\`);
\t\treturn;
}
\tif (stderr) {
\t\tconsole.log(\`stderr: \${stderr}\`);
\t\treturn;
\t}
\t\tconsole.log(\`stdout: \${stdout}\`);
});`
  },
  javascript: {
    mode: 'javascript',
    code: `const { exec } = require("child_process");

console.log("Hello world from Node.js! My uptime is:");

exec("uptime", (error, stdout, stderr) => {
\tif (error) {
\t\tconsole.log(\`error: \${error.message}\`);
\t\treturn;
}
\tif (stderr) {
\t\tconsole.log(\`stderr: \${stderr}\`);
\t\treturn;
\t}
\t\tconsole.log(\`stdout: \${stdout}\`);
});`
  },
  js: {
    mode: 'javascript',
    code: `const { exec } = require("child_process");

console.log("Hello world from Node.js! My uptime is:");

exec("uptime", (error, stdout, stderr) => {
\tif (error) {
\t\tconsole.log(\`error: \${error.message}\`);
\t\treturn;
}
\tif (stderr) {
\t\tconsole.log(\`stderr: \${stderr}\`);
\t\treturn;
\t}
\t\tconsole.log(\`stdout: \${stdout}\`);
});`
  },
  'c++': {
    mode: 'clike',
    code: `#include<iostream>
#include<thread>
int main() {
\tunsigned int nthreads = std::thread::hardware_concurrency();
\tstd::cout << "hello world from C++!" << std::endl;
\tstd::cerr << "I have " << nthreads << " threads!" << std::endl;
\treturn 0;
}`
  },
  cpp: {
    mode: 'clike',
    code: `#include<iostream>
#include<thread>
int main() {
\tunsigned int nthreads = std::thread::hardware_concurrency();
\tstd::cout << "hello world from C++!" << std::endl;
\tstd::cerr << "I have " << nthreads << " threads!" << std::endl;
\treturn 0;
}`
  },
  'c++11': {
    mode: 'clike',
    code: `#include<iostream>
#include<thread>
int main() {
\tunsigned int nthreads = std::thread::hardware_concurrency();
\tstd::cout << "hello world from C++!" << std::endl;
\tstd::cerr << "I have " << nthreads << " threads!" << std::endl;
\treturn 0;
}`
  },
  go: {
    mode: 'go',
    code: `package main
import "fmt"
func main() {
    fmt.Println("hello world from Go!")
}`
  },
  golang: {
    mode: 'go',
    code: `package main
import "fmt"
func main() {
    fmt.Println("hello world from Go!")
}`
  },
  bash: {
    mode: 'shell',
    code: `
# Function to print Fibonacci Sequence
function print_fibonacci() {
    num=$1
    a=0
    b=1
    echo "The Fibonacci sequence for $num terms is: "

    for (( i=0; i<num; i++ ))
    do
        echo -n "$a "
        fn=$((a + b))
        a=$b
        b=$fn
    done
}

print_fibonacci 5
\t\t`
  },
  sh: {
    mode: 'shell',
    code: `
# Function to print Fibonacci Sequence
function print_fibonacci() {
    num=$1
    a=0
    b=1
    echo "The Fibonacci sequence for $num terms is: "

    for (( i=0; i<num; i++ ))
    do
        echo -n "$a "
        fn=$((a + b))
        a=$b
        b=$fn
    done
}

print_fibonacci 5
\t\t`
  },
  rust: {
    mode: 'rust',
    code: `
struct MyStruct {
\tmsg: String,
}

impl MyStruct {
\tfn new(msg: String) -> Self {
\t\tSelf {
\t\t\tmsg
\t\t}
\t}
\t
\tfn print(&self) {
\t\tprintln!("{}", self.msg);
\t}
}

fn main() {
    let my_struct = MyStruct::new(String::from("Hello, World!"));
\t
\tmy_struct.print();
}
`
  }
};

/**
 * Get template for a given language
 * @param {string} language - The language name
 * @returns {{mode: string, code: string}} Template object
 */
export function getTemplate(language) {
  return languageTemplates[language] || languageTemplates.python3;
}

/**
 * Get CodeMirror mode for a language
 * @param {string} language - The language name
 * @returns {string} CodeMirror mode
 */
export function getMode(language) {
  const template = getTemplate(language);
  return template.mode;
}

/**
 * Get default code for a language
 * @param {string} language - The language name
 * @returns {string} Default code
 */
export function getDefaultCode(language) {
  const template = getTemplate(language);
  return template.code;
}
