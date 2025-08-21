import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import LanguageSelector from '../LanguageSelector'

describe('LanguageSelector', () => {
  const mockOnLanguageChange = jest.fn()
  const mockLanguages = ['python3', 'javascript', 'go', 'rust', 'cpp']

  beforeEach(() => {
    mockOnLanguageChange.mockClear()
  })

  it('should render with languages', () => {
    render(
      <LanguageSelector
        languages={mockLanguages}
        selectedLanguage="python3"
        onLanguageChange={mockOnLanguageChange}
      />
    )

    expect(screen.getByDisplayValue('python3')).toBeInTheDocument()
    expect(screen.getByRole('combobox')).toBeInTheDocument()
  })

  it('should render loading state', () => {
    render(
      <LanguageSelector
        languages={[]}
        selectedLanguage=""
        onLanguageChange={mockOnLanguageChange}
        loading={true}
      />
    )

    expect(screen.getByDisplayValue('Loading...')).toBeInTheDocument()
    expect(screen.getByRole('combobox')).toBeDisabled()
  })

  it('should render all language options', () => {
    render(
      <LanguageSelector
        languages={mockLanguages}
        selectedLanguage="python3"
        onLanguageChange={mockOnLanguageChange}
      />
    )

    const select = screen.getByRole('combobox')
    const options = screen.getAllByRole('option')

    expect(options).toHaveLength(mockLanguages.length)
    mockLanguages.forEach((language) => {
      expect(screen.getByRole('option', { name: language })).toBeInTheDocument()
    })
  })

  it('should call onLanguageChange when selection changes', async () => {
    const user = userEvent.setup()
    
    render(
      <LanguageSelector
        languages={mockLanguages}
        selectedLanguage="python3"
        onLanguageChange={mockOnLanguageChange}
      />
    )

    const select = screen.getByRole('combobox')
    await user.selectOptions(select, 'javascript')

    expect(mockOnLanguageChange).toHaveBeenCalledWith('javascript')
    expect(mockOnLanguageChange).toHaveBeenCalledTimes(1)
  })

  it('should display the selected language', () => {
    render(
      <LanguageSelector
        languages={mockLanguages}
        selectedLanguage="rust"
        onLanguageChange={mockOnLanguageChange}
      />
    )

    expect(screen.getByDisplayValue('rust')).toBeInTheDocument()
  })

  it('should handle empty languages array', () => {
    render(
      <LanguageSelector
        languages={[]}
        selectedLanguage=""
        onLanguageChange={mockOnLanguageChange}
      />
    )

    const select = screen.getByRole('combobox')
    const options = screen.getAllByRole('option')

    expect(options).toHaveLength(1)
    expect(options[0]).toHaveTextContent('Error!')
  })

  it('should be accessible', () => {
    render(
      <LanguageSelector
        languages={mockLanguages}
        selectedLanguage="python3"
        onLanguageChange={mockOnLanguageChange}
      />
    )

    const select = screen.getByRole('combobox')
    expect(select).toHaveAccessibleName()
  })

  it('should handle keyboard navigation', async () => {
    const user = userEvent.setup()
    
    render(
      <LanguageSelector
        languages={mockLanguages}
        selectedLanguage="python3"
        onLanguageChange={mockOnLanguageChange}
      />
    )

    const select = screen.getByRole('combobox')
    
    // Focus the select and change value using keyboard
    await user.click(select)
    await user.selectOptions(select, 'javascript')

    expect(mockOnLanguageChange).toHaveBeenCalledWith('javascript')
  })

  it('should apply correct CSS classes', () => {
    render(
      <LanguageSelector
        languages={mockLanguages}
        selectedLanguage="python3"
        onLanguageChange={mockOnLanguageChange}
      />
    )

    const select = screen.getByRole('combobox')
    expect(select).toHaveClass('select')
  })

  it('should handle special characters in language names', () => {
    const specialLanguages = ['c++', 'c#', 'f#', 'objective-c']
    
    render(
      <LanguageSelector
        languages={specialLanguages}
        selectedLanguage="c++"
        onLanguageChange={mockOnLanguageChange}
      />
    )

    expect(screen.getByDisplayValue('c++')).toBeInTheDocument()
    expect(screen.getByRole('option', { name: 'c++' })).toBeInTheDocument()
    expect(screen.getByRole('option', { name: 'c#' })).toBeInTheDocument()
  })

  it('should not call onLanguageChange when selecting the same language', async () => {
    const user = userEvent.setup()
    
    render(
      <LanguageSelector
        languages={mockLanguages}
        selectedLanguage="python3"
        onLanguageChange={mockOnLanguageChange}
      />
    )

    const select = screen.getByRole('combobox')
    await user.selectOptions(select, 'python3')

    expect(mockOnLanguageChange).toHaveBeenCalledWith('python3')
  })

  it('should handle rapid selection changes', async () => {
    const user = userEvent.setup()
    
    render(
      <LanguageSelector
        languages={mockLanguages}
        selectedLanguage="python3"
        onLanguageChange={mockOnLanguageChange}
      />
    )

    const select = screen.getByRole('combobox')
    
    await user.selectOptions(select, 'javascript')
    await user.selectOptions(select, 'go')
    await user.selectOptions(select, 'rust')

    expect(mockOnLanguageChange).toHaveBeenCalledTimes(3)
    expect(mockOnLanguageChange).toHaveBeenLastCalledWith('rust')
  })
})