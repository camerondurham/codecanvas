import { renderHook, act, waitFor } from '@testing-library/react'
import { http, HttpResponse } from 'msw'
import { server } from './mocks/server'

// Import components and hooks
import { useLocalStorage } from '../hooks/useLocalStorage'
import { useLanguages } from '../hooks/useLanguages'
import { useCodeExecution } from '../hooks/useCodeExecution'

describe('Comprehensive Test Suite', () => {
  beforeEach(() => {
    // Reset localStorage mock
    const mockLocalStorage = {
      getItem: jest.fn(() => null),
      setItem: jest.fn(),
      removeItem: jest.fn(),
      clear: jest.fn(),
    }
    Object.defineProperty(window, 'localStorage', {
      value: mockLocalStorage,
      writable: true,
    })
  })

  describe('useLocalStorage Hook', () => {
    it('should handle basic storage operations', async () => {
      const { result } = renderHook(() => useLocalStorage('test-key', 'default'))
      
      // Wait for initial load
      await waitFor(() => {
        expect(result.current.loading).toBe(false)
      })
      
      expect(result.current.value).toBe('default')
      
      // Test setValue
      act(() => {
        result.current.setValue('new-value')
      })
      
      expect(result.current.value).toBe('new-value')
      expect(window.localStorage.setItem).toHaveBeenCalledWith('test-key', '"new-value"')
    })

    it('should handle removeValue', async () => {
      const { result } = renderHook(() => useLocalStorage('test-key', 'default'))
      
      await waitFor(() => {
        expect(result.current.loading).toBe(false)
      })
      
      act(() => {
        result.current.removeValue()
      })
      
      expect(result.current.value).toBe('default')
      expect(window.localStorage.removeItem).toHaveBeenCalledWith('test-key')
    })

    it('should handle complex objects', async () => {
      const complexObject = { name: 'test', count: 42, nested: { value: true } }
      const { result } = renderHook(() => useLocalStorage('complex-key', complexObject))
      
      await waitFor(() => {
        expect(result.current.loading).toBe(false)
      })
      
      const updatedObject = { ...complexObject, count: 100 }
      act(() => {
        result.current.setValue(updatedObject)
      })
      
      expect(result.current.value).toEqual(updatedObject)
    })
  })

  describe('useLanguages Hook', () => {
    it('should fetch languages successfully', async () => {
      const { result } = renderHook(() => useLanguages())
      
      await waitFor(() => {
        expect(result.current.loading).toBe(false)
      })
      
      expect(result.current.languages).toEqual(['python3', 'javascript', 'go', 'rust', 'cpp', 'bash'])
      expect(result.current.error).toBe(null)
    })

    it('should handle fetch errors', async () => {
      server.use(
        http.get('https://runner.fly.dev/api/v1/languages', () => {
          return HttpResponse.error()
        })
      )

      const { result } = renderHook(() => useLanguages())
      
      await waitFor(() => {
        expect(result.current.loading).toBe(false)
      })
      
      expect(result.current.error).toBe('Failed to fetch languages')
    })
  })

  describe('useCodeExecution Hook', () => {
    it('should execute code successfully', async () => {
      const { result } = renderHook(() => useCodeExecution())
      
      await act(async () => {
        await result.current.executeCode('print("Hello World")', 'python3')
      })
      
      expect(result.current.loading).toBe(false)
      expect(result.current.output).toEqual({
        stdout: 'Hello from python3!\n',
        stderr: '',
        error: ''
      })
      expect(result.current.error).toBe(null)
    })

    it('should handle execution errors', async () => {
      server.use(
        http.post('https://runner.fly.dev/api/v1/run', () => {
          return HttpResponse.error()
        })
      )

      const { result } = renderHook(() => useCodeExecution())
      
      await act(async () => {
        await result.current.executeCode('invalid code', 'python3')
      })
      
      expect(result.current.loading).toBe(false)
      expect(result.current.output).toBe(null)
      expect(result.current.error).toBe('Failed to execute code')
    })

    it('should set loading state during execution', async () => {
      server.use(
        http.post('https://runner.fly.dev/api/v1/run', async () => {
          await new Promise(resolve => setTimeout(resolve, 100))
          return HttpResponse.json({
            stdout: 'test',
            stderr: '',
            error: ''
          })
        })
      )

      const { result } = renderHook(() => useCodeExecution())
      
      // Start execution
      const executePromise = act(async () => {
        await result.current.executeCode('print("test")', 'python3')
      })
      
      // Should be loading
      expect(result.current.loading).toBe(true)
      
      await executePromise
      
      expect(result.current.loading).toBe(false)
    })
  })

  describe('Error Handling', () => {
    it('should handle localStorage unavailability', () => {
      // Mock localStorage to be unavailable
      Object.defineProperty(window, 'localStorage', {
        value: undefined,
        writable: true,
      })

      const { result } = renderHook(() => useLocalStorage('test-key', 'default'))
      
      expect(result.current.error).toBe('localStorage is not available')
    })

    it('should handle JSON parsing errors', async () => {
      const mockLocalStorage = {
        getItem: jest.fn(() => 'invalid-json{'),
        setItem: jest.fn(),
        removeItem: jest.fn(),
        clear: jest.fn(),
      }
      Object.defineProperty(window, 'localStorage', {
        value: mockLocalStorage,
        writable: true,
      })

      const consoleSpy = jest.spyOn(console, 'warn').mockImplementation(() => {})

      const { result } = renderHook(() => useLocalStorage('test-key', 'default'))
      
      await waitFor(() => {
        expect(result.current.loading).toBe(false)
      })
      
      expect(result.current.value).toBe('default')
      expect(consoleSpy).toHaveBeenCalled()
      
      consoleSpy.mockRestore()
    })

    it('should handle API errors gracefully', async () => {
      server.use(
        http.get('https://runner.fly.dev/api/v1/languages', () => {
          return HttpResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 }
          )
        })
      )

      const { result } = renderHook(() => useLanguages())
      
      await waitFor(() => {
        expect(result.current.loading).toBe(false)
      })
      
      expect(result.current.error).toBe('Failed to fetch languages')
    })
  })

  describe('Integration Tests', () => {
    it('should handle complete workflow', async () => {
      const { result: languagesResult } = renderHook(() => useLanguages())
      
      await waitFor(() => {
        expect(languagesResult.current.loading).toBe(false)
      })
      
      expect(languagesResult.current.languages).toEqual(['python3', 'javascript', 'go', 'rust', 'cpp', 'bash'])

      const { result: executionResult } = renderHook(() => useCodeExecution())
      
      await act(async () => {
        await executionResult.current.executeCode('print("Hello from Python!")', 'python3')
      })
      
      expect(executionResult.current.output).toEqual({
        stdout: 'Hello from python3!\n',
        stderr: '',
        error: ''
      })
    })
  })

  describe('Edge Cases', () => {
    it('should handle empty responses', async () => {
      server.use(
        http.get('https://runner.fly.dev/api/v1/languages', () => {
          return HttpResponse.json({})
        })
      )

      const { result } = renderHook(() => useLanguages())
      
      await waitFor(() => {
        expect(result.current.loading).toBe(false)
      })
      
      expect(result.current.languages).toEqual([])
    })

    it('should handle null values in localStorage', async () => {
      const { result } = renderHook(() => useLocalStorage('test-key', null))
      
      await waitFor(() => {
        expect(result.current.loading).toBe(false)
      })
      
      expect(result.current.value).toBe(null)
      
      act(() => {
        result.current.setValue(null)
      })
      
      expect(result.current.value).toBe(null)
    })

    it('should handle very large data', async () => {
      const largeData = 'x'.repeat(10000)
      const { result } = renderHook(() => useLocalStorage('large-key', ''))
      
      await waitFor(() => {
        expect(result.current.loading).toBe(false)
      })
      
      act(() => {
        result.current.setValue(largeData)
      })
      
      expect(result.current.value).toBe(largeData)
    })
  })
})