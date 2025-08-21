import { renderHook, act, waitFor } from '@testing-library/react'
import { http, HttpResponse } from 'msw'
import { server } from '../../__tests__/mocks/server'
import { useLocalStorage } from '../useLocalStorage'
import { useLanguages } from '../useLanguages'
import { useCodeExecution } from '../useCodeExecution'

describe('Custom Hooks', () => {

  describe('useLocalStorage', () => {
    it('should return initial value and provide setValue function', () => {
      const { result } = renderHook(() => useLocalStorage('test-key', 'initial'))
      
      expect(result.current.value).toBe('initial')
      expect(typeof result.current.setValue).toBe('function')
      expect(typeof result.current.removeValue).toBe('function')
      expect(typeof result.current.loading).toBe('boolean')
    })

    it('should update value when setValue is called', () => {
      const { result } = renderHook(() => useLocalStorage('test-key', 'initial'))
      
      act(() => {
        result.current.setValue('updated')
      })
      
      expect(result.current.value).toBe('updated')
    })
  })

  describe('useLanguages', () => {
    it('should fetch languages successfully', async () => {
      const { result } = renderHook(() => useLanguages())
      
      expect(result.current.loading).toBe(true)
      
      await waitFor(() => {
        expect(result.current.loading).toBe(false)
      })
      
      expect(result.current.languages).toEqual(['python3', 'javascript', 'go', 'rust', 'cpp', 'bash'])
      expect(result.current.error).toBe(null)
    })

    it('should handle fetch errors', async () => {
      // Clear the cache first to ensure fresh fetch
      const { clearLanguagesCache } = await import('../useLanguages')
      clearLanguagesCache()
      
      // Override the handler to return an error
      server.use(
        http.get('https://runner.fly.dev/api/v1/languages', () => {
          return HttpResponse.json(
            { message: 'Server error' },
            { status: 500 }
          )
        })
      )

      const { result } = renderHook(() => useLanguages())
      
      await waitFor(() => {
        expect(result.current.loading).toBe(false)
      })
      
      expect(result.current.languages).toEqual([])
      expect(result.current.error).toContain('API Error')
    })
  })

  describe('useCodeExecution', () => {
    it('should execute code successfully', async () => {
      const { result } = renderHook(() => useCodeExecution())
      
      expect(result.current.loading).toBe(false)
      expect(result.current.output).toBe(null)
      
      await act(async () => {
        await result.current.executeCode('print("Hello")', 'python3')
      })
      
      expect(result.current.loading).toBe(false)
      expect(result.current.output).toEqual({
        stdout: 'Hello from python3!\n',
        stderr: '',
        error: ''
      })
    })

    it('should handle execution errors', async () => {
      // Override the handler to return an error
      server.use(
        http.post('https://runner.fly.dev/api/v1/run', () => {
          return HttpResponse.json(
            { message: 'Server error' },
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
      expect(result.current.error).toBe('Server error occurred during execution')
    })

    it('should set loading state during execution', async () => {
      // Use MSW with delay to test loading state
      server.use(
        http.post('https://runner.fly.dev/api/v1/run', async () => {
          return HttpResponse.json({
            stdout: 'Hello from python3!\n',
            stderr: '',
            error: ''
          }, { delay: 200 })
        })
      )

      const { result } = renderHook(() => useCodeExecution())
      
      // Start execution without awaiting
      act(() => {
        result.current.executeCode('print("test")', 'python3')
      })
      
      // Should be loading immediately after starting
      expect(result.current.loading).toBe(true)
      
      // Wait for execution to complete
      await waitFor(() => {
        expect(result.current.loading).toBe(false)
      })
      
      expect(result.current.output).toEqual({
        stdout: 'Hello from python3!\n',
        stderr: '',
        error: ''
      })
    })
  })
})