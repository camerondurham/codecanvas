/**
 * Sample code for different programming languages
 */

export const SAMPLE_CODE = {
  // Python sample - Fibonacci
  python: `def fibonacci(n):
    if n <= 1:
        return n
    return fibonacci(n-1) + fibonacci(n-2)

# Calculate and print first 10 Fibonacci numbers
for i in range(10):
    print(f"F({i}) = {fibonacci(i)}")`,

  python3: `def fibonacci(n):
    if n <= 1:
        return n
    return fibonacci(n-1) + fibonacci(n-2)

# Calculate and print first 10 Fibonacci numbers
for i in range(10):
    print(f"F({i}) = {fibonacci(i)}")`,

  // Node.js sample - Uptime
  node: `const os = require('os');

console.log('System Information:');
console.log('Platform:', os.platform());
console.log('Architecture:', os.arch());
console.log('CPU Count:', os.cpus().length);
console.log('Total Memory:', Math.round(os.totalmem() / 1024 / 1024 / 1024) + ' GB');
console.log('Free Memory:', Math.round(os.freemem() / 1024 / 1024 / 1024) + ' GB');
console.log('Uptime:', Math.round(os.uptime() / 3600) + ' hours');`,

  nodejs: `const os = require('os');

console.log('System Information:');
console.log('Platform:', os.platform());
console.log('Architecture:', os.arch());
console.log('CPU Count:', os.cpus().length);
console.log('Total Memory:', Math.round(os.totalmem() / 1024 / 1024 / 1024) + ' GB');
console.log('Free Memory:', Math.round(os.freemem() / 1024 / 1024 / 1024) + ' GB');
console.log('Uptime:', Math.round(os.uptime() / 3600) + ' hours');`,

  js: `const os = require('os');

console.log('System Information:');
console.log('Platform:', os.platform());
console.log('Architecture:', os.arch());
console.log('CPU Count:', os.cpus().length);
console.log('Total Memory:', Math.round(os.totalmem() / 1024 / 1024 / 1024) + ' GB');
console.log('Free Memory:', Math.round(os.freemem() / 1024 / 1024 / 1024) + ' GB');
console.log('Uptime:', Math.round(os.uptime() / 3600) + ' hours');`,

  javascript: `const os = require('os');

console.log('System Information:');
console.log('Platform:', os.platform());
console.log('Architecture:', os.arch());
console.log('CPU Count:', os.cpus().length);
console.log('Total Memory:', Math.round(os.totalmem() / 1024 / 1024 / 1024) + ' GB');
console.log('Free Memory:', Math.round(os.freemem() / 1024 / 1024 / 1024) + ' GB');
console.log('Uptime:', Math.round(os.uptime() / 3600) + ' hours');`,

  // C++ sample - Threading
  'c++': `#include <iostream>
#include <thread>
#include <vector>
#include <chrono>

void worker(int id) {
    std::cout << "Thread " << id << " starting work..." << std::endl;
    std::this_thread::sleep_for(std::chrono::milliseconds(100));
    std::cout << "Thread " << id << " finished work!" << std::endl;
}

int main() {
    const int num_threads = 4;
    std::vector<std::thread> threads;
    
    std::cout << "Creating " << num_threads << " threads..." << std::endl;
    
    for (int i = 0; i < num_threads; ++i) {
        threads.emplace_back(worker, i + 1);
    }
    
    for (auto& t : threads) {
        t.join();
    }
    
    std::cout << "All threads completed!" << std::endl;
    return 0;
}`,

  cpp: `#include <iostream>
#include <thread>
#include <vector>
#include <chrono>

void worker(int id) {
    std::cout << "Thread " << id << " starting work..." << std::endl;
    std::this_thread::sleep_for(std::chrono::milliseconds(100));
    std::cout << "Thread " << id << " finished work!" << std::endl;
}

int main() {
    const int num_threads = 4;
    std::vector<std::thread> threads;
    
    std::cout << "Creating " << num_threads << " threads..." << std::endl;
    
    for (int i = 0; i < num_threads; ++i) {
        threads.emplace_back(worker, i + 1);
    }
    
    for (auto& t : threads) {
        t.join();
    }
    
    std::cout << "All threads completed!" << std::endl;
    return 0;
}`,

  'c++11': `#include <iostream>
#include <thread>
#include <vector>
#include <chrono>

void worker(int id) {
    std::cout << "Thread " << id << " starting work..." << std::endl;
    std::this_thread::sleep_for(std::chrono::milliseconds(100));
    std::cout << "Thread " << id << " finished work!" << std::endl;
}

int main() {
    const int num_threads = 4;
    std::vector<std::thread> threads;
    
    std::cout << "Creating " << num_threads << " threads..." << std::endl;
    
    for (int i = 0; i < num_threads; ++i) {
        threads.emplace_back(worker, i + 1);
    }
    
    for (auto& t : threads) {
        t.join();
    }
    
    std::cout << "All threads completed!" << std::endl;
    return 0;
}`,

  // Go sample - Hello World
  go: `package main

import (
    "fmt"
    "runtime"
    "time"
)

func main() {
    fmt.Println("Hello from Go!")
    fmt.Printf("Go version: %s\\n", runtime.Version())
    fmt.Printf("Operating system: %s\\n", runtime.GOOS)
    fmt.Printf("Architecture: %s\\n", runtime.GOARCH)
    fmt.Printf("Number of CPUs: %d\\n", runtime.NumCPU())
    fmt.Printf("Number of goroutines: %d\\n", runtime.NumGoroutine())
    fmt.Printf("Current time: %s\\n", time.Now().Format("2006-01-02 15:04:05"))
}`,

  golang: `package main

import (
    "fmt"
    "runtime"
    "time"
)

func main() {
    fmt.Println("Hello from Go!")
    fmt.Printf("Go version: %s\\n", runtime.Version())
    fmt.Printf("Operating system: %s\\n", runtime.GOOS)
    fmt.Printf("Architecture: %s\\n", runtime.GOARCH)
    fmt.Printf("Number of CPUs: %d\\n", runtime.NumCPU())
    fmt.Printf("Number of goroutines: %d\\n", runtime.NumGoroutine())
    fmt.Printf("Current time: %s\\n", time.Now().Format("2006-01-02 15:04:05"))
}`,

  // Bash sample - Fibonacci
  bash: `#!/bin/bash

# Fibonacci sequence generator
fibonacci() {
    local n=$1
    if [ $n -le 1 ]; then
        echo $n
    else
        local a=$(fibonacci $((n-1)))
        local b=$(fibonacci $((n-2)))
        echo $((a + b))
    fi
}

echo "First 10 Fibonacci numbers:"
for i in {0..9}; do
    result=$(fibonacci $i)
    echo "F($i) = $result"
done`,

  sh: `#!/bin/bash

# Fibonacci sequence generator
fibonacci() {
    local n=$1
    if [ $n -le 1 ]; then
        echo $n
    else
        local a=$(fibonacci $((n-1)))
        local b=$(fibonacci $((n-2)))
        echo $((a + b))
    fi
}

echo "First 10 Fibonacci numbers:"
for i in {0..9}; do
    result=$(fibonacci $i)
    echo "F($i) = $result"
done`,

  // Rust sample - Struct
  rust: `#[derive(Debug)]
struct Person {
    name: String,
    age: u32,
    email: String,
}

impl Person {
    fn new(name: String, age: u32, email: String) -> Self {
        Person { name, age, email }
    }
    
    fn greet(&self) {
        println!("Hello, my name is {} and I'm {} years old!", self.name, self.age);
    }
    
    fn is_adult(&self) -> bool {
        self.age >= 18
    }
}

fn main() {
    let person = Person::new(
        "Alice".to_string(),
        25,
        "alice@example.com".to_string()
    );
    
    println!("Person: {:?}", person);
    person.greet();
    println!("Is adult: {}", person.is_adult());
}`,
} as const;

/**
 * Get sample code for a given language
 */
export function getSampleCode(language: string): string {
  const normalizedLanguage = language.toLowerCase();
  return SAMPLE_CODE[normalizedLanguage as keyof typeof SAMPLE_CODE] || SAMPLE_CODE.python3;
}

/**
 * Get all available sample languages
 */
export function getSampleLanguages(): string[] {
  return Object.keys(SAMPLE_CODE);
}