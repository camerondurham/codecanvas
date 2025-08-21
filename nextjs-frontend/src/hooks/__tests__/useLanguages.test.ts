import { renderHook, waitFor } from '@testing-library/react'
import { http, HttpResponse } from 'msw'
import { server } from '../../__tests__/mocks/server'
import { useLanguages } from '../useLanguages'

describe('useLanguages', () => {
  it('should fetch languages successfully', async () => {
    const { result } = renderHook(() => useLanguages())
    
    // Initially loading should be true
    expect(result.current.loading).toBe(true)
    expect(result.current.languages).toEqual([])
    expect(result.current.error).toBe(null)
    
    // Wait for the fetch to complete
    await waitFor(() => {
      expect(result.current.loading).toBe(false)
    })
    
    expect(result.current.languages).toEqual(['python3', 'javascript', 'go', 'rust', 'cpp', 'bash'])
    expect(result.current.error).toBe(null)
  })

  it('should handle fetch errors', async () => {
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
    expect(result.current.error).toBe('API Error: API request failed: 500 Internal Server Error')
  })

  it('should handle network errors', async () => {
    // Override the handler to simulate network error
    server.use(
      http.get('https://runner.fly.dev/api/v1/languages', () => {
        return HttpResponse.error()
      })
    )
    
    const { result } = renderHook(() => useLanguages())
    
    await waitFor(() => {
      expect(result.current.loading).toBe(false)
    })
    
    expect(result.current.languages).toEqual([])
    expect(result.current.error).toContain('Network error')
  })

  it('should not refetch on subsequent renders', async () => {
    const { result, rerender } = renderHook(() => useLanguages())
    
    await waitFor(() => {
      expect(result.current.loading).toBe(false)
    })
    
    const firstLanguages = result.current.languages
    
    // Rerender the hook
    rerender()
    
    // Should not be loading again
    expect(result.current.loading).toBe(false)
    expect(result.current.languages).toBe(firstLanguages)
  })

  it('should handle empty response', async () => {
    server.use(
      http.get('https://runner.fly.dev/api/v1/languages', () => {
        return HttpResponse.json([])
      })
    )
    
    const { result } = renderHook(() => useLanguages())
    
    await waitFor(() => {
      expect(result.current.loading).toBe(false)
    })
    
    expect(result.current.languages).toEqual([])
    expect(result.current.error).toBe(null)
  })

  it('should handle malformed JSON response', async () => {
    server.use(
      http.get('https://runner.fly.dev/api/v1/languages', () => {
        return new Response('invalid json{', {
          status: 200,
          headers: { 'Content-Type': 'application/json' }
        })
      })
    )
    
    const { result } = renderHook(() => useLanguages())
    
    await waitFor(() => {
      expect(result.current.loading).toBe(false)
    })
    
    expect(result.current.languages).toEqual([])
    expect(result.current.error).toContain('Network error')
  })
})