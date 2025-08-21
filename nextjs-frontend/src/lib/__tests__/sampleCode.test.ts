import { getSampleCode, hasSampleCode, SAMPLE_CODE } from '../sampleCode'

describe('sampleCode', () => {
  describe('getSampleCode', () => {
    it('should return sample code for python3', () => {
      const code = getSampleCode('python3')
      expect(code).toContain('fibonacci')
      expect(code).toContain('def fibonacci(n):')
    })

    it('should return sample code for javascript', () => {
      const code = getSampleCode('javascript')
      expect(code).toContain('require(\'os\')')
      expect(code).toContain('Node.js System Information')
    })

    it('should return sample code for go', () => {
      const code = getSampleCode('go')
      expect(code).toContain('package main')
      expect(code).toContain('fmt.Println')
    })

    it('should return sample code for rust', () => {
      const code = getSampleCode('rust')
      expect(code).toContain('struct Person')
      expect(code).toContain('impl Person')
    })

    it('should return sample code for cpp', () => {
      const code = getSampleCode('cpp')
      expect(code).toContain('#include <iostream>')
      expect(code).toContain('std::thread')
    })

    it('should return sample code for bash', () => {
      const code = getSampleCode('bash')
      expect(code).toContain('#!/bin/bash')
      expect(code).toContain('fibonacci()')
    })

    it('should handle case insensitive language names', () => {
      expect(getSampleCode('PYTHON3')).toBe(getSampleCode('python3'))
      expect(getSampleCode('JavaScript')).toBe(getSampleCode('javascript'))
      expect(getSampleCode('GO')).toBe(getSampleCode('go'))
    })

    it('should handle language aliases', () => {
      expect(getSampleCode('python')).toBe(getSampleCode('python3'))
      expect(getSampleCode('js')).toBe(getSampleCode('javascript'))
      expect(getSampleCode('node')).toBe(getSampleCode('javascript'))
      expect(getSampleCode('nodejs')).toBe(getSampleCode('javascript'))
      expect(getSampleCode('c++')).toBe(getSampleCode('cpp'))
      expect(getSampleCode('c++11')).toBe(getSampleCode('cpp'))
      expect(getSampleCode('golang')).toBe(getSampleCode('go'))
      expect(getSampleCode('sh')).toBe(getSampleCode('bash'))
    })

    it('should return empty string for unknown languages', () => {
      expect(getSampleCode('unknown')).toBe('')
      expect(getSampleCode('invalid')).toBe('')
      expect(getSampleCode('nonexistent')).toBe('')
    })

    it('should handle empty or invalid input', () => {
      expect(getSampleCode('')).toBe('')
      expect(getSampleCode('   ')).toBe('')
      expect(getSampleCode(null as any)).toBe('')
      expect(getSampleCode(undefined as any)).toBe('')
      expect(getSampleCode(123 as any)).toBe('')
    })

    it('should handle whitespace in language names', () => {
      expect(getSampleCode('  python3  ')).toBe(getSampleCode('python3'))
      expect(getSampleCode('\tjavascript\n')).toBe(getSampleCode('javascript'))
    })
  })

  describe('hasSampleCode', () => {
    it('should return true for supported languages', () => {
      expect(hasSampleCode('python3')).toBe(true)
      expect(hasSampleCode('javascript')).toBe(true)
      expect(hasSampleCode('go')).toBe(true)
      expect(hasSampleCode('rust')).toBe(true)
      expect(hasSampleCode('cpp')).toBe(true)
      expect(hasSampleCode('bash')).toBe(true)
    })

    it('should return true for language aliases', () => {
      expect(hasSampleCode('python')).toBe(true)
      expect(hasSampleCode('js')).toBe(true)
      expect(hasSampleCode('node')).toBe(true)
      expect(hasSampleCode('nodejs')).toBe(true)
      expect(hasSampleCode('c++')).toBe(true)
      expect(hasSampleCode('c++11')).toBe(true)
      expect(hasSampleCode('golang')).toBe(true)
      expect(hasSampleCode('sh')).toBe(true)
    })

    it('should return false for unsupported languages', () => {
      expect(hasSampleCode('unknown')).toBe(false)
      expect(hasSampleCode('invalid')).toBe(false)
      expect(hasSampleCode('nonexistent')).toBe(false)
    })

    it('should handle case insensitive checks', () => {
      expect(hasSampleCode('PYTHON3')).toBe(true)
      expect(hasSampleCode('JavaScript')).toBe(true)
      expect(hasSampleCode('GO')).toBe(true)
      expect(hasSampleCode('UNKNOWN')).toBe(false)
    })

    it('should handle empty or invalid input', () => {
      expect(hasSampleCode('')).toBe(false)
      expect(hasSampleCode('   ')).toBe(false)
    })
  })

  describe('SAMPLE_CODE constant', () => {
    it('should contain all expected languages', () => {
      const expectedLanguages = [
        'python3', 'python', 'node', 'nodejs', 'js', 'javascript',
        'c++', 'cpp', 'c++11', 'go', 'golang', 'bash', 'sh', 'rust'
      ]

      expectedLanguages.forEach(lang => {
        expect(SAMPLE_CODE).toHaveProperty(lang)
        expect(typeof SAMPLE_CODE[lang as keyof typeof SAMPLE_CODE]).toBe('string')
        expect(SAMPLE_CODE[lang as keyof typeof SAMPLE_CODE].length).toBeGreaterThan(0)
      })
    })

    it('should have non-empty sample code for all languages', () => {
      Object.values(SAMPLE_CODE).forEach(code => {
        expect(code.trim().length).toBeGreaterThan(0)
      })
    })

    it('should have valid syntax in sample code', () => {
      // Python samples should have proper indentation
      expect(SAMPLE_CODE.python3).toMatch(/def fibonacci\(n\):/)
      expect(SAMPLE_CODE.python3).toMatch(/    if n <= 1:/)

      // JavaScript samples should have proper syntax
      expect(SAMPLE_CODE.javascript).toMatch(/const os = require\('os'\);/)
      expect(SAMPLE_CODE.javascript).toMatch(/console\.log\(/)

      // Go samples should have package declaration
      expect(SAMPLE_CODE.go).toMatch(/package main/)
      expect(SAMPLE_CODE.go).toMatch(/import "fmt"/)

      // Rust samples should have proper struct syntax
      expect(SAMPLE_CODE.rust).toMatch(/struct Person \{/)
      expect(SAMPLE_CODE.rust).toMatch(/impl Person \{/)

      // C++ samples should have includes
      expect(SAMPLE_CODE.cpp).toMatch(/#include <iostream>/)
      expect(SAMPLE_CODE.cpp).toMatch(/int main\(\) \{/)

      // Bash samples should have shebang
      expect(SAMPLE_CODE.bash).toMatch(/#!\/bin\/bash/)
    })
  })
})