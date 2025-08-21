import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ThemeSelector from './ThemeSelector';

describe('ThemeSelector', () => {
  const mockOnThemeChange = jest.fn();

  beforeEach(() => {
    mockOnThemeChange.mockClear();
  });

  it('renders with correct label and options', () => {
    render(
      <ThemeSelector
        selectedTheme="light"
        onThemeChange={mockOnThemeChange}
      />
    );

    expect(screen.getByLabelText('Theme:')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Light')).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'Light' })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'Dark' })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'One Dark' })).toBeInTheDocument();
  });

  it('calls onThemeChange when selection changes', () => {
    render(
      <ThemeSelector
        selectedTheme="light"
        onThemeChange={mockOnThemeChange}
      />
    );

    const select = screen.getByLabelText('Theme:');
    fireEvent.change(select, { target: { value: 'dark' } });

    expect(mockOnThemeChange).toHaveBeenCalledWith('dark');
  });

  it('displays the correct selected theme', () => {
    render(
      <ThemeSelector
        selectedTheme="onedark"
        onThemeChange={mockOnThemeChange}
      />
    );

    expect(screen.getByDisplayValue('One Dark')).toBeInTheDocument();
  });
});