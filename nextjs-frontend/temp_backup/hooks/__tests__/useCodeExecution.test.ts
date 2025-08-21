import { renderHook, act, waitFor } from '@testing-library/react'
import { http, HttpResponse } from 'msw'
import { server } from '../../__tests__/mocks/server'
import { useCodeExecution } from '../useCodeExecution'

describe('useCodeExecution', () => {
  it('should execute code successfully', async () => {
    const { result } = renderHook(() => useCodeExecution())
    
    // Initially should have no output and not be loading
    expect(result.current.output).toBe(null)
    expect(result.current.loading).toBe(false)
    expect(result.current.error).toBe(null)
    
    // Execute code
    await act(async () => {
      await result.current.executeCode('print("Hello World")', 'python3')
    })
    
    expect(result.current.loading).toBe(false)
    expect(result.current.output).toEqual({
      stdout: 'Hello from Python!\n',
      stderr: '',
      error: ''
    })
    expect(result.current.error).toBe(null)
  })

  it('should handle different languages', async () => {
    const { result } = renderHook(() => useCodeExecution())
    
    await act(async () => {
      await result.current.executeCode('console.log("Hello World")', 'javascript')
    })
    
    expect(result.current.output).toEqual({
      stdout: 'Hello from JavaScript!\n',
      stderr: '',
      error: ''
    })
  })

  it('should set loading state during execution', async () => {
    const { result } = renderHook(() => useCodeExecution())
    
    // Start execution but don't await it immediately
    const executePromise = act(async () => {
      await result.current.executeCode('print("test")', 'python3')
    })
    
    // Check that loading is true during execution
    expect(result.current.loading).toBe(true)
    
    // Wait for execution to complete
    await executePromise
    
    expect(result.current.loading).toBe(false)
  })

  it('should handle server errors', async () => {
    // Override the handler to return an error
    server.use(
      http.post('https://runner.fly.dev/api/v1/run', () => {
        return HttpResponse.json(
          { message: 'Execution failed' },
          { status: 500 }
        )
      })
    )
    
    const { result } = renderHook(() => useCodeExecution())
    
    await act(async () => {
      await result.current.executeCode('print("test")', 'python3')
    })
    
    expect(result.current.loading).toBe(false)
    expect(result.current.output).toBe(null)
    expect(result.current.error).toBe('Failed to execute code')
  })

  it('should handle network errors', async () => {
    server.use(
      http.post('https://runner.fly.dev/api/v1/run', () => {
        return HttpResponse.error()
      })
    )
    
    const { result } = renderHook(() => useCodeExecution())
    
    await act(async () => {
      await result.current.executeCode('print("test")', 'python3')
    })
    
    expect(result.current.loading).toBe(false)
    expect(result.current.output).toBe(null)
    expect(result.current.error).toBe('Failed to execute code')
  })

  it('should handle execution with stderr output', async () => {
    server.use(
      http.post('https://runner.fly.dev/api/v1/run', () => {
        return HttpResponse.json({
          stdout: '',
          stderr: 'Warning: deprecated function used\n',
          error: ''
        })
      })
    )
    
    const { result } = renderHook(() => useCodeExecution())
    
    await act(async () => {
      await result.current.executeCode('deprecated_function()', 'python3')
    })
    
    expect(result.current.output).toEqual({
      stdout: '',
      stderr: 'Warning: deprecated function used\n',
      error: ''
    })
    expect(result.current.error).toBe(null)
  })

  it('should handle execution with error output', async () => {
    server.use(
      http.post('https://runner.fly.dev/api/v1/run', () => {
        return HttpResponse.json({
          stdout: '',
          stderr: '',
          error: 'SyntaxError: invalid syntax'
        })
      })
    )
    
    const { result } = renderHook(() => useCodeExecution())
    
    await act(async () => {
      await result.current.executeCode('invalid syntax', 'python3')
    })
    
    expect(result.current.output).toEqual({
      stdout: '',
      stderr: '',
      error: 'SyntaxError: invalid syntax'
    })
    expect(result.current.error).toBe(null)
  })

  it('should clear previous output on new execution', async () => {
    const { result } = renderHook(() => useCodeExecution())
    
    // First execution
    await act(async () => {
      await result.current.executeCode('print("first")', 'python3')
    })
    
    expect(result.current.output?.stdout).toBe('Hello from Python!\n')
    
    // Second execution with different response
    server.use(
      http.post('https://runner.fly.dev/api/v1/run', () => {
        return HttpResponse.json({
          stdout: 'Second execution\n',
          stderr: '',
          error: ''
        })
      })
    )
    
    await act(async () => {
      await result.current.executeCode('print("second")', 'python3')
    })
    
    expect(result.current.output?.stdout).toBe('Second execution\n')
  })

  it('should handle malformed JSON response', async () => {
    server.use(
      http.post('https://runner.fly.dev/api/v1/run', () => {
        return new Response('invalid json{', {
          status: 200,
          headers: { 'Content-Type': 'application/json' }
        })
      })
    )
    
    const { result } = renderHook(() => useCodeExecution())
    
    await act(async () => {
      await result.current.executeCode('print("test")', 'python3')
    })
    
    expect(result.current.loading).toBe(false)
    expect(result.current.output).toBe(null)
    expect(result.current.error).toBe('Failed to execute code')
  })

  it('should handle empty code execution', async () => {
    const { result } = renderHook(() => useCodeExecution())
    
    await act(async () => {
      await result.current.executeCode('', 'python3')
    })
    
    expect(result.current.output).toEqual({
      stdout: 'Hello from Python!\n',
      stderr: '',
      error: ''
    })
  })

  it('should handle concurrent executions properly', async () => {
    const { result } = renderHook(() => useCodeExecution())
    
    // Start two executions concurrently
    const promise1 = act(async () => {
      await result.current.executeCode('print("first")', 'python3')
    })
    
    const promise2 = act(async () => {
      await result.current.executeCode('print("second")', 'javascript')
    })
    
    await Promise.all([promise1, promise2])
    
    // The last execution should win
    expect(result.current.loading).toBe(false)
    expect(result.current.output).toBeDefined()
  })
})