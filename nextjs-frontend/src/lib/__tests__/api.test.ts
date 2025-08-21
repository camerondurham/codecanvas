import { http, HttpResponse } from 'msw'
import { server } from '../../__tests__/mocks/server'
import { fetchLanguages, executeCode, ApiError } from '../api'

describe('API Functions', () => {
  describe('fetchLanguages', () => {
    it('should fetch languages successfully', async () => {
      const languages = await fetchLanguages()
      expect(languages).toEqual(['python3', 'javascript', 'go', 'rust', 'cpp', 'bash'])
    })

    it('should handle server errors', async () => {
      server.use(
        http.get('https://runner.fly.dev/api/v1/languages', () => {
          return HttpResponse.json(
            { message: 'Server error' },
            { status: 500 }
          )
        })
      )

      await expect(fetchLanguages()).rejects.toThrow(ApiError)
    })

    it('should handle network errors', async () => {
      server.use(
        http.get('https://runner.fly.dev/api/v1/languages', () => {
          return HttpResponse.error()
        })
      )

      await expect(fetchLanguages()).rejects.toThrow(ApiError)
    })

    it('should handle empty response', async () => {
      server.use(
        http.get('https://runner.fly.dev/api/v1/languages', () => {
          return HttpResponse.json([])
        })
      )

      const languages = await fetchLanguages()
      expect(languages).toEqual([])
    })
  })

  describe('executeCode', () => {
    it('should execute code successfully', async () => {
      const result = await executeCode('print("Hello World")', 'python3')
      expect(result).toEqual({
        stdout: 'Hello from python3!\n',
        stderr: '',
        error: ''
      })
    })

    it('should handle different languages', async () => {
      const result = await executeCode('console.log("Hello World")', 'javascript')
      expect(result).toEqual({
        stdout: 'Hello from javascript!\n',
        stderr: '',
        error: ''
      })
    })

    it('should handle server errors', async () => {
      server.use(
        http.post('https://runner.fly.dev/api/v1/run', () => {
          return HttpResponse.json(
            { message: 'Execution failed' },
            { status: 500 }
          )
        })
      )

      await expect(executeCode('print("test")', 'python3')).rejects.toThrow(ApiError)
    })

    it('should handle network errors', async () => {
      server.use(
        http.post('https://runner.fly.dev/api/v1/run', () => {
          return HttpResponse.error()
        })
      )

      await expect(executeCode('print("test")', 'python3')).rejects.toThrow(ApiError)
    })

    it('should handle execution with stderr', async () => {
      server.use(
        http.post('https://runner.fly.dev/api/v1/run', () => {
          return HttpResponse.json({
            stdout: '',
            stderr: 'Warning: deprecated function\n',
            error: ''
          })
        })
      )

      const result = await executeCode('deprecated_function()', 'python3')
      expect(result).toEqual({
        stdout: '',
        stderr: 'Warning: deprecated function\n',
        error: ''
      })
    })

    it('should handle execution with error', async () => {
      server.use(
        http.post('https://runner.fly.dev/api/v1/run', () => {
          return HttpResponse.json({
            stdout: '',
            stderr: '',
            error: 'SyntaxError: invalid syntax'
          })
        })
      )

      const result = await executeCode('invalid syntax', 'python3')
      expect(result).toEqual({
        stdout: '',
        stderr: '',
        error: 'SyntaxError: invalid syntax'
      })
    })

    it('should handle missing response fields', async () => {
      server.use(
        http.post('https://runner.fly.dev/api/v1/run', () => {
          return HttpResponse.json({
            stdout: 'output'
            // missing stderr and error
          })
        })
      )

      const result = await executeCode('print("test")', 'python3')
      expect(result).toEqual({
        stdout: 'output',
        stderr: '',
        error: ''
      })
    })
  })

  describe('ApiError', () => {
    it('should create ApiError with message', () => {
      const error = new ApiError('Test error')
      expect(error.message).toBe('Test error')
      expect(error.name).toBe('ApiError')
      expect(error.status).toBeUndefined()
    })

    it('should create ApiError with status', () => {
      const error = new ApiError('Test error', 404)
      expect(error.message).toBe('Test error')
      expect(error.status).toBe(404)
    })

    it('should create ApiError with response', () => {
      const mockResponse = new Response()
      const error = new ApiError('Test error', 500, mockResponse)
      expect(error.response).toBe(mockResponse)
    })
  })
})