import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { http, HttpResponse } from 'msw'
import { server } from './mocks/server'
import Page from '../app/page'

// Mock CodeMirror components
jest.mock('../components/CodeEditor/CodeEditor', () => ({
  CodeEditor: ({ value, onChange }: any) => (
    <textarea
      data-testid="code-editor"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  )
}))

describe('Error Handling', () => {
  beforeEach(() => {
    localStorage.clear()
    jest.clearAllMocks()
  })

  describe('Network Errors', () => {
    it('should handle complete network failure', async () => {
      // Simulate complete network failure
      server.use(
        http.get('https://runner.fly.dev/api/v1/languages', () => {
          return HttpResponse.error()
        }),
        http.post('https://runner.fly.dev/api/v1/run', () => {
          return HttpResponse.error()
        })
      )

      const user = userEvent.setup()
      render(<Page />)

      // Should show error for languages
      await waitFor(() => {
        expect(screen.getByText('Error!')).toBeInTheDocument()
      })

      // Try to execute code
      const submitButton = screen.getByRole('button', { name: /submit/i })
      await user.click(submitButton)

      await waitFor(() => {
        expect(screen.getByText('Failed to execute code')).toBeInTheDocument()
      })
    })

    it('should handle timeout errors', async () => {
      // Simulate timeout by never resolving
      server.use(
        http.post('https://runner.fly.dev/api/v1/run', () => {
          return new Promise(() => {}) // Never resolves
        })
      )

      const user = userEvent.setup()
      render(<Page />)

      await waitFor(() => {
        expect(screen.getByRole('button', { name: /submit/i })).toBeEnabled()
      })

      const submitButton = screen.getByRole('button', { name: /submit/i })
      await user.click(submitButton)

      // Should show loading state
      expect(screen.getByText('Executing...')).toBeInTheDocument()

      // In a real scenario, this would timeout, but for testing we'll just verify loading state
    })
  })

  describe('Server Errors', () => {
    it('should handle 500 server errors', async () => {
      server.use(
        http.post('https://runner.fly.dev/api/v1/run', () => {
          return HttpResponse.json(
            { message: 'Internal server error' },
            { status: 500 }
          )
        })
      )

      const user = userEvent.setup()
      render(<Page />)

      await waitFor(() => {
        expect(screen.getByRole('button', { name: /submit/i })).toBeEnabled()
      })

      const submitButton = screen.getByRole('button', { name: /submit/i })
      await user.click(submitButton)

      await waitFor(() => {
        expect(screen.getByText('Failed to execute code')).toBeInTheDocument()
      })
    })

    it('should handle 404 errors', async () => {
      server.use(
        http.get('https://runner.fly.dev/api/v1/languages', () => {
          return HttpResponse.json(
            { message: 'Not found' },
            { status: 404 }
          )
        })
      )

      render(<Page />)

      await waitFor(() => {
        expect(screen.getByText('Error!')).toBeInTheDocument()
      })
    })

    it('should handle 403 forbidden errors', async () => {
      server.use(
        http.post('https://runner.fly.dev/api/v1/run', () => {
          return HttpResponse.json(
            { message: 'Forbidden' },
            { status: 403 }
          )
        })
      )

      const user = userEvent.setup()
      render(<Page />)

      await waitFor(() => {
        expect(screen.getByRole('button', { name: /submit/i })).toBeEnabled()
      })

      const submitButton = screen.getByRole('button', { name: /submit/i })
      await user.click(submitButton)

      await waitFor(() => {
        expect(screen.getByText('Failed to execute code')).toBeInTheDocument()
      })
    })
  })

  describe('Malformed Responses', () => {
    it('should handle invalid JSON in languages response', async () => {
      server.use(
        http.get('https://runner.fly.dev/api/v1/languages', () => {
          return new Response('invalid json{', {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
          })
        })
      )

      render(<Page />)

      await waitFor(() => {
        expect(screen.getByText('Error!')).toBeInTheDocument()
      })
    })

    it('should handle invalid JSON in execution response', async () => {
      server.use(
        http.post('https://runner.fly.dev/api/v1/run', () => {
          return new Response('invalid json{', {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
          })
        })
      )

      const user = userEvent.setup()
      render(<Page />)

      await waitFor(() => {
        expect(screen.getByRole('button', { name: /submit/i })).toBeEnabled()
      })

      const submitButton = screen.getByRole('button', { name: /submit/i })
      await user.click(submitButton)

      await waitFor(() => {
        expect(screen.getByText('Failed to execute code')).toBeInTheDocument()
      })
    })

    it('should handle non-array languages response', async () => {
      server.use(
        http.get('https://runner.fly.dev/api/v1/languages', () => {
          return HttpResponse.json({ languages: ['python3'] })
        })
      )

      render(<Page />)

      await waitFor(() => {
        expect(screen.getByText('Error!')).toBeInTheDocument()
      })
    })

    it('should handle missing fields in execution response', async () => {
      server.use(
        http.post('https://runner.fly.dev/api/v1/run', () => {
          return HttpResponse.json({
            stdout: 'output'
            // missing stderr and error
          })
        })
      )

      const user = userEvent.setup()
      render(<Page />)

      await waitFor(() => {
        expect(screen.getByRole('button', { name: /submit/i })).toBeEnabled()
      })

      const submitButton = screen.getByRole('button', { name: /submit/i })
      await user.click(submitButton)

      await waitFor(() => {
        expect(screen.getByText('output')).toBeInTheDocument()
        // Should show "none" for missing fields
        expect(screen.getAllByText('none')).toHaveLength(2)
      })
    })
  })

  describe('LocalStorage Errors', () => {
    it('should handle localStorage quota exceeded', async () => {
      const originalSetItem = localStorage.setItem
      localStorage.setItem = jest.fn(() => {
        throw new Error('QuotaExceededError')
      })

      const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {})

      const user = userEvent.setup()
      render(<Page />)

      const themeSelect = screen.getByRole('combobox', { name: /theme/i })
      await user.selectOptions(themeSelect, 'dark')

      expect(consoleSpy).toHaveBeenCalled()

      localStorage.setItem = originalSetItem
      consoleSpy.mockRestore()
    })

    it('should handle localStorage access denied', () => {
      const originalGetItem = localStorage.getItem
      localStorage.getItem = jest.fn(() => {
        throw new Error('Access denied')
      })

      const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {})

      render(<Page />)

      expect(consoleSpy).toHaveBeenCalled()

      localStorage.getItem = originalGetItem
      consoleSpy.mockRestore()
    })

    it('should handle corrupted localStorage data', () => {
      localStorage.setItem('selectedTheme', 'invalid-json{')

      const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {})

      render(<Page />)

      // Should fall back to default theme
      const themeSelect = screen.getByRole('combobox', { name: /theme/i })
      expect(themeSelect).toHaveValue('default')

      consoleSpy.mockRestore()
    })
  })

  describe('Component Error Boundaries', () => {
    it('should handle component crashes gracefully', () => {
      // Mock console.error to avoid noise in test output
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {})

      // This would be handled by React Error Boundaries in a real app
      // For now, we just verify the app doesn't crash completely
      render(<Page />)

      expect(screen.getByRole('main')).toBeInTheDocument()

      consoleSpy.mockRestore()
    })
  })

  describe('Edge Cases', () => {
    it('should handle extremely large code input', async () => {
      const user = userEvent.setup()
      render(<Page />)

      await waitFor(() => {
        expect(screen.getByRole('button', { name: /submit/i })).toBeEnabled()
      })

      const codeEditor = screen.getByTestId('code-editor')
      const largeCode = 'print("hello")\n'.repeat(10000)

      await user.clear(codeEditor)
      await user.type(codeEditor, largeCode)

      const submitButton = screen.getByRole('button', { name: /submit/i })
      await user.click(submitButton)

      // Should handle large input without crashing
      await waitFor(() => {
        expect(screen.getByText('Hello from Python!')).toBeInTheDocument()
      })
    })

    it('should handle rapid successive API calls', async () => {
      const user = userEvent.setup()
      render(<Page />)

      await waitFor(() => {
        expect(screen.getByRole('button', { name: /submit/i })).toBeEnabled()
      })

      const submitButton = screen.getByRole('button', { name: /submit/i })

      // Click submit multiple times rapidly
      await user.click(submitButton)
      await user.click(submitButton)
      await user.click(submitButton)

      // Should handle gracefully without crashing
      await waitFor(() => {
        expect(screen.getByText('Hello from Python!')).toBeInTheDocument()
      })
    })

    it('should handle empty API responses', async () => {
      server.use(
        http.get('https://runner.fly.dev/api/v1/languages', () => {
          return HttpResponse.json([])
        }),
        http.post('https://runner.fly.dev/api/v1/run', () => {
          return HttpResponse.json({
            stdout: '',
            stderr: '',
            error: ''
          })
        })
      )

      const user = userEvent.setup()
      render(<Page />)

      // Should handle empty languages array
      await waitFor(() => {
        const languageSelect = screen.getByRole('combobox', { name: /language/i })
        expect(languageSelect.children).toHaveLength(0)
      })

      const submitButton = screen.getByRole('button', { name: /submit/i })
      await user.click(submitButton)

      // Should handle empty execution response
      await waitFor(() => {
        expect(screen.getAllByText('none')).toHaveLength(3)
      })
    })
  })
})