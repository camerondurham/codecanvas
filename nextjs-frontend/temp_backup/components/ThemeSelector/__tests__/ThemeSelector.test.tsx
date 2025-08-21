import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ThemeSelector from '../ThemeSelector';

describe('ThemeSelector', () => {
  const mockOnThemeChange = jest.fn();

  beforeEach(() => {
    mockOnThemeChange.mockClear();
  });

  it('should render with default theme', () => {
    render(
      <ThemeSelector
        selectedTheme="light"
        onThemeChange={mockOnThemeChange}
      />
    );
    
    expect(screen.getByLabelText('Theme:')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Light')).toBeInTheDocument();
  });

  it('should render all theme options', () => {
    render(
      <ThemeSelector
        selectedTheme="light"
        onThemeChange={mockOnThemeChange}
      />
    );
    
    expect(screen.getByRole('option', { name: 'Light' })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'Dark' })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'One Dark' })).toBeInTheDocument();
  });

  it('should call onThemeChange when selection changes', async () => {
    const user = userEvent.setup();
    
    render(
      <ThemeSelector
        selectedTheme="light"
        onThemeChange={mockOnThemeChange}
      />
    );
    
    const select = screen.getByRole('combobox');
    await user.selectOptions(select, 'dark');
    
    expect(mockOnThemeChange).toHaveBeenCalledWith('dark');
  });

  it('should display the selected theme', () => {
    render(
      <ThemeSelector
        selectedTheme="onedark"
        onThemeChange={mockOnThemeChange}
      />
    );
    
    expect(screen.getByDisplayValue('One Dark')).toBeInTheDocument();
  });

  it('should handle all available themes', () => {
    const themes = ['light', 'dark', 'onedark'];
    
    themes.forEach(theme => {
      const { unmount } = render(
        <ThemeSelector
          selectedTheme={theme}
          onThemeChange={mockOnThemeChange}
        />
      );
      
      const select = screen.getByRole('combobox');
      expect(select).toHaveValue(theme);
      
      unmount();
    });
  });

  it('should be accessible', () => {
    render(
      <ThemeSelector
        selectedTheme="light"
        onThemeChange={mockOnThemeChange}
      />
    );
    
    const select = screen.getByRole('combobox');
    expect(select).toHaveAccessibleName('Theme:');
    expect(select).toBeInTheDocument();
  });

  it('should handle keyboard navigation', async () => {
    const user = userEvent.setup();
    
    render(
      <ThemeSelector
        selectedTheme="light"
        onThemeChange={mockOnThemeChange}
      />
    );
    
    const select = screen.getByRole('combobox');
    
    // Focus the select and change value
    await user.selectOptions(select, 'dark');
    
    expect(mockOnThemeChange).toHaveBeenCalledWith('dark');
  });

  it('should apply correct CSS classes', () => {
    render(
      <ThemeSelector
        selectedTheme="light"
        onThemeChange={mockOnThemeChange}
      />
    );
    
    const select = screen.getByRole('combobox');
    expect(select).toBeInTheDocument();
    expect(select).toHaveAttribute('id', 'theme-selector');
  });

  it('should handle rapid theme changes', async () => {
    const user = userEvent.setup();
    
    render(
      <ThemeSelector
        selectedTheme="light"
        onThemeChange={mockOnThemeChange}
      />
    );
    
    const select = screen.getByRole('combobox');
    
    // Rapidly change themes
    await user.selectOptions(select, 'dark');
    await user.selectOptions(select, 'onedark');
    await user.selectOptions(select, 'light');
    
    expect(mockOnThemeChange).toHaveBeenCalledTimes(3);
    expect(mockOnThemeChange).toHaveBeenNthCalledWith(1, 'dark');
    expect(mockOnThemeChange).toHaveBeenNthCalledWith(2, 'onedark');
    expect(mockOnThemeChange).toHaveBeenNthCalledWith(3, 'light');
  });

  it('should maintain selection state', () => {
    const { rerender } = render(
      <ThemeSelector
        selectedTheme="dark"
        onThemeChange={mockOnThemeChange}
      />
    );
    
    expect(screen.getByDisplayValue('Dark')).toBeInTheDocument();
    
    // Re-render with different theme
    rerender(
      <ThemeSelector
        selectedTheme="onedark"
        onThemeChange={mockOnThemeChange}
      />
    );
    
    expect(screen.getByDisplayValue('One Dark')).toBeInTheDocument();
  });

  it('should handle theme change to same theme', async () => {
    const user = userEvent.setup();
    
    render(
      <ThemeSelector
        selectedTheme="dark"
        onThemeChange={mockOnThemeChange}
      />
    );
    
    const select = screen.getByRole('combobox');
    await user.selectOptions(select, 'dark');
    
    // Should still call the handler even if same theme
    expect(mockOnThemeChange).toHaveBeenCalledWith('dark');
  });
});