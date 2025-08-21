/**
 * Sample code mappings for different programming languages
 */

export const SAMPLE_CODE = {
  python3: `def fibonacci(n):
    if n <= 1:
        return n
    else:
        return fibonacci(n-1) + fibonacci(n-2)

# Print first 10 Fibonacci numbers
for i in range(10):
    print(f"F({i}) = {fibonacci(i)}")`,

  python: `def fibonacci(n):
    if n <= 1:
        return n
    else:
        return fibonacci(n-1) + fibonacci(n-2)

# Print first 10 Fibonacci numbers
for i in range(10):
    print(f"F({i}) = {fibonacci(i)}")`,

  node: `const os = require('os');

console.log('Node.js System Information:');
console.log('Platform:', os.platform());
console.log('Architecture:', os.arch());
console.log('CPU Count:', os.cpus().length);
console.log('Total Memory:', Math.round(os.totalmem() / 1024 / 1024 / 1024) + ' GB');
console.log('Free Memory:', Math.round(os.freemem() / 1024 / 1024 / 1024) + ' GB');
console.log('Uptime:', Math.round(os.uptime() / 3600) + ' hours');`,

  nodejs: `const os = require('os');

console.log('Node.js System Information:');
console.log('Platform:', os.platform());
console.log('Architecture:', os.arch());
console.log('CPU Count:', os.cpus().length);
console.log('Total Memory:', Math.round(os.totalmem() / 1024 / 1024 / 1024) + ' GB');
console.log('Free Memory:', Math.round(os.freemem() / 1024 / 1024 / 1024) + ' GB');
console.log('Uptime:', Math.round(os.uptime() / 3600) + ' hours');`,

  js: `const os = require('os');

console.log('Node.js System Information:');
console.log('Platform:', os.platform());
console.log('Architecture:', os.arch());
console.log('CPU Count:', os.cpus().length);
console.log('Total Memory:', Math.round(os.totalmem() / 1024 / 1024 / 1024) + ' GB');
console.log('Free Memory:', Math.round(os.freemem() / 1024 / 1024 / 1024) + ' GB');
console.log('Uptime:', Math.round(os.uptime() / 3600) + ' hours');`,

  javascript: `const os = require('os');

console.log('Node.js System Information:');
console.log('Platform:', os.platform());
console.log('Architecture:', os.arch());
console.log('CPU Count:', os.cpus().length);
console.log('Total Memory:', Math.round(os.totalmem() / 1024 / 1024 / 1024) + ' GB');
console.log('Free Memory:', Math.round(os.freemem() / 1024 / 1024 / 1024) + ' GB');
console.log('Uptime:', Math.round(os.uptime() / 3600) + ' hours');`,

  'c++': `#include <iostream>
#include <thread>
#include <vector>
#include <chrono>

void worker(int id) {
    std::cout << "Thread " << id << " starting work..." << std::endl;
    std::this_thread::sleep_for(std::chrono::milliseconds(1000));
    std::cout << "Thread " << id << " finished work!" << std::endl;
}

int main() {
    std::cout << "C++ Threading Example" << std::endl;
    
    std::vector<std::thread> threads;
    
    // Create 3 worker threads
    for (int i = 1; i <= 3; ++i) {
        threads.emplace_back(worker, i);
    }
    
    // Wait for all threads to complete
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
    std::this_thread::sleep_for(std::chrono::milliseconds(1000));
    std::cout << "Thread " << id << " finished work!" << std::endl;
}

int main() {
    std::cout << "C++ Threading Example" << std::endl;
    
    std::vector<std::thread> threads;
    
    // Create 3 worker threads
    for (int i = 1; i <= 3; ++i) {
        threads.emplace_back(worker, i);
    }
    
    // Wait for all threads to complete
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
    std::this_thread::sleep_for(std::chrono::milliseconds(1000));
    std::cout << "Thread " << id << " finished work!" << std::endl;
}

int main() {
    std::cout << "C++ Threading Example" << std::endl;
    
    std::vector<std::thread> threads;
    
    // Create 3 worker threads
    for (int i = 1; i <= 3; ++i) {
        threads.emplace_back(worker, i);
    }
    
    // Wait for all threads to complete
    for (auto& t : threads) {
        t.join();
    }
    
    std::cout << "All threads completed!" << std::endl;
    return 0;
}`,

  go: `package main

import "fmt"

func main() {
    fmt.Println("Hello, World!")
    fmt.Println("Welcome to Go programming!")
    
    // Simple variable demonstration
    name := "Go Developer"
    version := 1.21
    
    fmt.Printf("Hello, %s! You're using Go %.2f\\n", name, version)
}`,

  golang: `package main

import "fmt"

func main() {
    fmt.Println("Hello, World!")
    fmt.Println("Welcome to Go programming!")
    
    // Simple variable demonstration
    name := "Go Developer"
    version := 1.21
    
    fmt.Printf("Hello, %s! You're using Go %.2f\\n", name, version)
}`,

  bash: `#!/bin/bash

# Fibonacci sequence in bash
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

echo "Bash Fibonacci Sequence:"
for i in {0..9}; do
    result=$(fibonacci $i)
    echo "F($i) = $result"
done`,

  sh: `#!/bin/bash

# Fibonacci sequence in bash
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

echo "Bash Fibonacci Sequence:"
for i in {0..9}; do
    result=$(fibonacci $i)
    echo "F($i) = $result"
done`,

  rust: `struct Person {
    name: String,
    age: u32,
}

impl Person {
    fn new(name: String, age: u32) -> Person {
        Person { name, age }
    }
    
    fn greet(&self) {
        println!("Hello, my name is {} and I'm {} years old!", self.name, self.age);
    }
    
    fn have_birthday(&mut self) {
        self.age += 1;
        println!("Happy birthday! {} is now {} years old.", self.name, self.age);
    }
}

fn main() {
    println!("Rust Struct Example");
    
    let mut person = Person::new("Alice".to_string(), 25);
    person.greet();
    person.have_birthday();
    person.greet();
}`,
} as const;

/**
 * Get sample code for a given language
 */
export function getSampleCode(language: string): string {
  if (!language || typeof language !== 'string') {
    return '';
  }
  const normalizedLanguage = language.trim().toLowerCase();
  return SAMPLE_CODE[normalizedLanguage as keyof typeof SAMPLE_CODE] || '';
}

/**
 * Check if a language has sample code available
 */
export function hasSampleCode(language: string): boolean {
  const normalizedLanguage = language.toLowerCase();
  return normalizedLanguage in SAMPLE_CODE;
}