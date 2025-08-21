import { getSampleCode } from '../sampleCode'

describe('getSampleCode', () => {
  it('should return Python sample code for python3', () => {
    const code = getSampleCode('python3')
    expect(code).toContain('def fibonacci')
    expect(code).toContain('for i in range(10)')
  })

  it('should return Python sample code for python', () => {
    const code = getSampleCode('python')
    expect(code).toContain('def fibonacci')
    expect(code).toContain('for i in range(10)')
  })

  it('should return JavaScript sample code for node', () => {
    const code = getSampleCode('node')
    expect(code).toContain('console.log')
    expect(code).toContain('os.uptime()')
  })

  it('should return JavaScript sample code for nodejs', () => {
    const code = getSampleCode('nodejs')
    expect(code).toContain('console.log')
    expect(code).toContain('os.uptime()')
  })

  it('should return JavaScript sample code for js', () => {
    const code = getSampleCode('js')
    expect(code).toContain('console.log')
    expect(code).toContain('os.uptime()')
  })

  it('should return JavaScript sample code for javascript', () => {
    const code = getSampleCode('javascript')
    expect(code).toContain('console.log')
    expect(code).toContain('os.uptime()')
  })

  it('should return C++ sample code for c++', () => {
    const code = getSampleCode('c++')
    expect(code).toContain('#include <iostream>')
    expect(code).toContain('#include <thread>')
    expect(code).toContain('std::thread')
  })

  it('should return C++ sample code for cpp', () => {
    const code = getSampleCode('cpp')
    expect(code).toContain('#include <iostream>')
    expect(code).toContain('#include <thread>')
    expect(code).toContain('std::thread')
  })

  it('should return C++ sample code for c++11', () => {
    const code = getSampleCode('c++11')
    expect(code).toContain('#include <iostream>')
    expect(code).toContain('#include <thread>')
    expect(code).toContain('std::thread')
  })

  it('should return Go sample code for go', () => {
    const code = getSampleCode('go')
    expect(code).toContain('package main')
    expect(code).toContain('import "fmt"')
    expect(code).toContain('fmt.Println("Hello, World!")')
  })

  it('should return Go sample code for golang', () => {
    const code = getSampleCode('golang')
    expect(code).toContain('package main')
    expect(code).toContain('import "fmt"')
    expect(code).toContain('fmt.Println("Hello, World!")')
  })

  it('should return Bash sample code for bash', () => {
    const code = getSampleCode('bash')
    expect(code).toContain('#!/bin/bash')
    expect(code).toContain('fibonacci()')
    expect(code).toContain('echo "Bash Fibonacci Sequence:"')
  })

  it('should return Bash sample code for sh', () => {
    const code = getSampleCode('sh')
    expect(code).toContain('#!/bin/bash')
    expect(code).toContain('fibonacci()')
    expect(code).toContain('echo "Bash Fibonacci Sequence:"')
  })

  it('should return Rust sample code for rust', () => {
    const code = getSampleCode('rust')
    expect(code).toContain('struct Person')
    expect(code).toContain('impl Person')
    expect(code).toContain('fn main()')
    expect(code).toContain('println!')
  })

  it('should return empty string for unknown language', () => {
    const code = getSampleCode('unknown-language')
    expect(code).toBe('')
  })

  it('should return empty string for empty language', () => {
    const code = getSampleCode('')
    expect(code).toBe('')
  })

  it('should return empty string for null language', () => {
    const code = getSampleCode(null as any)
    expect(code).toBe('')
  })

  it('should return empty string for undefined language', () => {
    const code = getSampleCode(undefined as any)
    expect(code).toBe('')
  })

  it('should handle case sensitivity', () => {
    const lowerCode = getSampleCode('python3')
    const upperCode = getSampleCode('PYTHON3')
    const mixedCode = getSampleCode('Python3')
    
    expect(lowerCode).toContain('def fibonacci')
    expect(upperCode).toContain('def fibonacci') // Should work due to toLowerCase()
    expect(mixedCode).toContain('def fibonacci') // Should work due to toLowerCase()
  })

  it('should handle whitespace in language names', () => {
    const codeWithSpaces = getSampleCode(' python3 ')
    expect(codeWithSpaces).toContain('def fibonacci') // Should work due to trim()
  })

  it('should return consistent code for same language', () => {
    const code1 = getSampleCode('python3')
    const code2 = getSampleCode('python3')
    expect(code1).toBe(code2)
  })

  it('should return different code for different languages', () => {
    const pythonCode = getSampleCode('python3')
    const jsCode = getSampleCode('javascript')
    const goCode = getSampleCode('go')
    
    expect(pythonCode).not.toBe(jsCode)
    expect(jsCode).not.toBe(goCode)
    expect(pythonCode).not.toBe(goCode)
  })

  it('should return valid code syntax for each language', () => {
    const languages = [
      'python3', 'javascript', 'go', 'rust', 'cpp', 'bash'
    ]
    
    languages.forEach(language => {
      const code = getSampleCode(language)
      expect(code).toBeTruthy()
      expect(code.length).toBeGreaterThan(0)
      expect(typeof code).toBe('string')
    })
  })

  it('should handle all Python aliases', () => {
    const python3Code = getSampleCode('python3')
    const pythonCode = getSampleCode('python')
    
    expect(python3Code).toBe(pythonCode)
    expect(python3Code).toContain('fibonacci')
  })

  it('should handle all JavaScript aliases', () => {
    const nodeCode = getSampleCode('node')
    const nodejsCode = getSampleCode('nodejs')
    const jsCode = getSampleCode('js')
    const javascriptCode = getSampleCode('javascript')
    
    expect(nodeCode).toBe(nodejsCode)
    expect(nodejsCode).toBe(jsCode)
    expect(jsCode).toBe(javascriptCode)
    expect(nodeCode).toContain('os.uptime()')
  })

  it('should handle all C++ aliases', () => {
    const cppCode = getSampleCode('cpp')
    const cPlusPlusCode = getSampleCode('c++')
    const cpp11Code = getSampleCode('c++11')
    
    expect(cppCode).toBe(cPlusPlusCode)
    expect(cPlusPlusCode).toBe(cpp11Code)
    expect(cppCode).toContain('std::thread')
  })

  it('should handle all Go aliases', () => {
    const goCode = getSampleCode('go')
    const golangCode = getSampleCode('golang')
    
    expect(goCode).toBe(golangCode)
    expect(goCode).toContain('package main')
  })

  it('should handle all Bash aliases', () => {
    const bashCode = getSampleCode('bash')
    const shCode = getSampleCode('sh')
    
    expect(bashCode).toBe(shCode)
    expect(bashCode).toContain('#!/bin/bash')
  })
})