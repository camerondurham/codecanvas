import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { CodeEditor } from '../CodeEditor'

// Mock CodeMirror
jest.mock('@codemirror/view', () => ({
  EditorView: jest.fn().mockImplementation(() => ({
    destroy: jest.fn(),
    dispatch: jest.fn(),
    state: {
      doc: {
        toString: () => 'mocked content'
      }
    }
  })),
  keymap: {
    of: jest.fn()
  }
}))

jest.mock('@codemirror/state', () => ({
  EditorState: {
    create: jest.fn().mockReturnValue({
      doc: {
        toString: () => 'mocked content'
      }
    })
  },
  Compartment: jest.fn().mockImplementation(() => ({
    of: jest.fn(),
    reconfigure: jest.fn()
  }))
}))

jest.mock('@codemirror/commands', () => ({
  defaultKeymap: []
}))

jest.mock('@codemirror/language', () => ({
  LanguageSupport: jest.fn(),
  syntaxHighlighting: jest.fn(),
  defaultHighlightStyle: {}
}))

jest.mock('@codemirror/lang-python', () => ({
  python: jest.fn().mockReturnValue({})
}))

jest.mock('@codemirror/lang-javascript', () => ({
  javascript: jest.fn().mockReturnValue({})
}))

jest.mock('@codemirror/lang-go', () => ({
  go: jest.fn().mockReturnValue({})
}))

jest.mock('@codemirror/lang-rust', () => ({
  rust: jest.fn().mockReturnValue({})
}))

jest.mock('@codemirror/lang-cpp', () => ({
  cpp: jest.fn().mockReturnValue({})
}))



describe('CodeEditor', () => {
  const mockOnChange = jest.fn()

  beforeEach(() => {
    mockOnChange.mockClear()
  })

  it('should render editor container', () => {
    render(
      <CodeEditor
        value="print('hello')"
        onChange={mockOnChange}
        language="python3"
        theme="default"
      />
    )

    expect(screen.getByTestId('code-editor')).toBeInTheDocument()
  })

  it('should apply correct CSS classes', () => {
    render(
      <CodeEditor
        value="console.log('hello')"
        onChange={mockOnChange}
        language="javascript"
        theme="dark"
      />
    )

    const container = screen.getByTestId('code-editor')
    expect(container).toHaveClass('codeEditor')
  })

  it('should handle different languages', () => {
    const languages = ['python3', 'javascript', 'go', 'rust', 'cpp', 'bash']
    
    languages.forEach(language => {
      const { unmount } = render(
        <CodeEditor
          value={`// ${language} code`}
          onChange={mockOnChange}
          language={language}
          theme="default"
        />
      )
      
      expect(screen.getByTestId('code-editor')).toBeInTheDocument()
      unmount()
    })
  })

  it('should handle different themes', () => {
    const themes = ['default', 'dark', 'github-light', 'dracula', 'material-dark']
    
    themes.forEach(theme => {
      const { unmount } = render(
        <CodeEditor
          value="test code"
          onChange={mockOnChange}
          language="python3"
          theme={theme}
        />
      )
      
      expect(screen.getByTestId('code-editor')).toBeInTheDocument()
      unmount()
    })
  })

  it('should handle empty value', () => {
    render(
      <CodeEditor
        value=""
        onChange={mockOnChange}
        language="python3"
        theme="default"
      />
    )

    expect(screen.getByTestId('code-editor')).toBeInTheDocument()
  })

  it('should handle language changes', () => {
    const { rerender } = render(
      <CodeEditor
        value="print('hello')"
        onChange={mockOnChange}
        language="python3"
        theme="default"
      />
    )

    expect(screen.getByTestId('code-editor')).toBeInTheDocument()

    rerender(
      <CodeEditor
        value="console.log('hello')"
        onChange={mockOnChange}
        language="javascript"
        theme="default"
      />
    )

    expect(screen.getByTestId('code-editor')).toBeInTheDocument()
  })

  it('should handle theme changes', () => {
    const { rerender } = render(
      <CodeEditor
        value="print('hello')"
        onChange={mockOnChange}
        language="python3"
        theme="default"
      />
    )

    expect(screen.getByTestId('code-editor')).toBeInTheDocument()

    rerender(
      <CodeEditor
        value="print('hello')"
        onChange={mockOnChange}
        language="python3"
        theme="dark"
      />
    )

    expect(screen.getByTestId('code-editor')).toBeInTheDocument()
  })

  it('should handle value changes', () => {
    const { rerender } = render(
      <CodeEditor
        value="initial value"
        onChange={mockOnChange}
        language="python3"
        theme="default"
      />
    )

    expect(screen.getByTestId('code-editor')).toBeInTheDocument()

    rerender(
      <CodeEditor
        value="updated value"
        onChange={mockOnChange}
        language="python3"
        theme="default"
      />
    )

    expect(screen.getByTestId('code-editor')).toBeInTheDocument()
  })

  it('should be accessible', () => {
    render(
      <CodeEditor
        value="print('hello')"
        onChange={mockOnChange}
        language="python3"
        theme="default"
      />
    )

    const editor = screen.getByTestId('code-editor')
    expect(editor).toHaveAttribute('role', 'textbox')
    expect(editor).toHaveAttribute('aria-label', 'Code editor')
  })

  it('should handle multiline content', () => {
    const multilineCode = `def hello():
    print("Hello, World!")
    return True

hello()`

    render(
      <CodeEditor
        value={multilineCode}
        onChange={mockOnChange}
        language="python3"
        theme="default"
      />
    )

    expect(screen.getByTestId('code-editor')).toBeInTheDocument()
  })

  it('should handle special characters', () => {
    const specialCode = `print("Special chars: <>&'\"")
# Unicode: 🚀 ñ ü
# Symbols: @#$%^&*()`

    render(
      <CodeEditor
        value={specialCode}
        onChange={mockOnChange}
        language="python3"
        theme="default"
      />
    )

    expect(screen.getByTestId('code-editor')).toBeInTheDocument()
  })

  it('should handle very long content', () => {
    const longCode = 'print("hello")\n'.repeat(1000)

    render(
      <CodeEditor
        value={longCode}
        onChange={mockOnChange}
        language="python3"
        theme="default"
      />
    )

    expect(screen.getByTestId('code-editor')).toBeInTheDocument()
  })

  it('should cleanup on unmount', () => {
    const { unmount } = render(
      <CodeEditor
        value="print('hello')"
        onChange={mockOnChange}
        language="python3"
        theme="default"
      />
    )

    expect(screen.getByTestId('code-editor')).toBeInTheDocument()
    
    // Should not throw error on unmount
    expect(() => unmount()).not.toThrow()
  })

  it('should handle rapid prop changes', () => {
    const { rerender } = render(
      <CodeEditor
        value="initial"
        onChange={mockOnChange}
        language="python3"
        theme="default"
      />
    )

    // Rapidly change props
    for (let i = 0; i < 10; i++) {
      rerender(
        <CodeEditor
          value={`code ${i}`}
          onChange={mockOnChange}
          language={i % 2 === 0 ? 'python3' : 'javascript'}
          theme={i % 2 === 0 ? 'default' : 'dark'}
        />
      )
    }

    expect(screen.getByTestId('code-editor')).toBeInTheDocument()
  })

  it('should handle unsupported language gracefully', () => {
    render(
      <CodeEditor
        value="some code"
        onChange={mockOnChange}
        language="unsupported-language"
        theme="default"
      />
    )

    expect(screen.getByTestId('code-editor')).toBeInTheDocument()
  })

  it('should handle unsupported theme gracefully', () => {
    render(
      <CodeEditor
        value="some code"
        onChange={mockOnChange}
        language="python3"
        theme="unsupported-theme"
      />
    )

    expect(screen.getByTestId('code-editor')).toBeInTheDocument()
  })
})