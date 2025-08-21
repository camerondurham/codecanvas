import { render, screen } from '@testing-library/react'
import OutputDisplay from '../OutputDisplay'

describe('OutputDisplay', () => {
  it('should render loading state', () => {
    render(<OutputDisplay output={null} loading={true} />)
    
    expect(screen.getByText('Executing code...')).toBeInTheDocument()
    expect(screen.getByRole('status')).toBeInTheDocument()
  })

  it('should render output with all fields', () => {
    const output = {
      stdout: 'Hello World\n',
      stderr: 'Warning: deprecated function\n',
      error: 'SyntaxError: invalid syntax'
    }

    render(<OutputDisplay output={output} loading={false} />)
    
    expect(screen.getByText('stdout:')).toBeInTheDocument()
    expect(screen.getByText('Hello World')).toBeInTheDocument()
    
    expect(screen.getByText('stderr:')).toBeInTheDocument()
    expect(screen.getByText('Warning: deprecated function')).toBeInTheDocument()
    
    expect(screen.getByText('error:')).toBeInTheDocument()
    expect(screen.getByText('SyntaxError: invalid syntax')).toBeInTheDocument()
  })

  it('should render "none" for empty fields', () => {
    const output = {
      stdout: '',
      stderr: '',
      error: ''
    }

    render(<OutputDisplay output={output} loading={false} />)
    
    const noneElements = screen.getAllByText('none')
    expect(noneElements).toHaveLength(3)
  })

  it('should handle null output when not loading', () => {
    render(<OutputDisplay output={null} loading={false} />)
    
    expect(screen.getByText('stdout:')).toBeInTheDocument()
    expect(screen.getByText('stderr:')).toBeInTheDocument()
    expect(screen.getByText('error:')).toBeInTheDocument()
    
    const noneElements = screen.getAllByText('none')
    expect(noneElements).toHaveLength(3)
  })

  it('should preserve whitespace and formatting in output', () => {
    const output = {
      stdout: 'Line 1\n  Indented line\nLine 3\n',
      stderr: '',
      error: ''
    }

    render(<OutputDisplay output={output} loading={false} />)
    
    const stdoutElement = screen.getByLabelText('stdout output')
    expect(stdoutElement).toBeInTheDocument()
    expect(stdoutElement.tagName).toBe('PRE')
    expect(stdoutElement.textContent).toBe('Line 1\n  Indented line\nLine 3\n')
  })

  it('should handle only stdout output', () => {
    const output = {
      stdout: 'Success message\n',
      stderr: '',
      error: ''
    }

    render(<OutputDisplay output={output} loading={false} />)
    
    expect(screen.getByText('Success message')).toBeInTheDocument()
    
    // stderr and error should show "none"
    const noneElements = screen.getAllByText('none')
    expect(noneElements).toHaveLength(2)
  })

  it('should handle only stderr output', () => {
    const output = {
      stdout: '',
      stderr: 'Warning message\n',
      error: ''
    }

    render(<OutputDisplay output={output} loading={false} />)
    
    expect(screen.getByText('Warning message')).toBeInTheDocument()
    
    // stdout and error should show "none"
    const noneElements = screen.getAllByText('none')
    expect(noneElements).toHaveLength(2)
  })

  it('should handle only error output', () => {
    const output = {
      stdout: '',
      stderr: '',
      error: 'Runtime error occurred'
    }

    render(<OutputDisplay output={output} loading={false} />)
    
    expect(screen.getByText('Runtime error occurred')).toBeInTheDocument()
    
    // stdout and stderr should show "none"
    const noneElements = screen.getAllByText('none')
    expect(noneElements).toHaveLength(2)
  })

  it('should apply correct CSS classes', () => {
    const output = {
      stdout: 'test output',
      stderr: '',
      error: ''
    }

    render(<OutputDisplay output={output} loading={false} />)
    
    const stdoutOutput = screen.getByLabelText('stdout output')
    expect(stdoutOutput).toBeInTheDocument()
    
    const stderrOutput = screen.getByLabelText('stderr output')
    expect(stderrOutput).toBeInTheDocument()
    
    const errorOutput = screen.getByLabelText('error output')
    expect(errorOutput).toBeInTheDocument()
  })

  it('should handle very long output', () => {
    const longOutput = 'A'.repeat(10000)
    const output = {
      stdout: longOutput,
      stderr: '',
      error: ''
    }

    render(<OutputDisplay output={output} loading={false} />)
    
    expect(screen.getByText(longOutput)).toBeInTheDocument()
  })

  it('should handle special characters in output', () => {
    const output = {
      stdout: 'Special chars: <>&"\'',
      stderr: 'Unicode: 🚀 ñ ü',
      error: 'Symbols: @#$%^&*()'
    }

    render(<OutputDisplay output={output} loading={false} />)
    
    expect(screen.getByText('Special chars: <>&"\'')).toBeInTheDocument()
    expect(screen.getByText('Unicode: 🚀 ñ ü')).toBeInTheDocument()
    expect(screen.getByText('Symbols: @#$%^&*()')).toBeInTheDocument()
  })

  it('should handle multiline output correctly', () => {
    const output = {
      stdout: 'Line 1\nLine 2\nLine 3',
      stderr: 'Error line 1\nError line 2',
      error: 'Exception:\n  at line 5\n  at function foo()'
    }

    render(<OutputDisplay output={output} loading={false} />)
    
    const stdoutElement = screen.getByLabelText('stdout output')
    const stderrElement = screen.getByLabelText('stderr output')
    const errorElement = screen.getByLabelText('error output')
    
    expect(stdoutElement.textContent).toBe('Line 1\nLine 2\nLine 3')
    expect(stderrElement.textContent).toBe('Error line 1\nError line 2')
    expect(errorElement.textContent).toBe('Exception:\n  at line 5\n  at function foo()')
  })

  it('should be accessible', () => {
    const output = {
      stdout: 'test output',
      stderr: '',
      error: ''
    }

    render(<OutputDisplay output={output} loading={false} />)
    
    expect(screen.getAllByRole('log')).toHaveLength(3)
    expect(screen.getByLabelText('stdout output')).toBeInTheDocument()
    expect(screen.getByLabelText('stderr output')).toBeInTheDocument()
    expect(screen.getByLabelText('error output')).toBeInTheDocument()
  })

  it('should handle transition from loading to output', () => {
    const output = {
      stdout: 'Execution complete',
      stderr: '',
      error: ''
    }

    const { rerender } = render(<OutputDisplay output={null} loading={true} />)
    
    expect(screen.getByText('Executing code...')).toBeInTheDocument()
    
    rerender(<OutputDisplay output={output} loading={false} />)
    
    expect(screen.queryByText('Executing code...')).not.toBeInTheDocument()
    expect(screen.getByText('Execution complete')).toBeInTheDocument()
  })
})