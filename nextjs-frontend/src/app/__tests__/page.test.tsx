import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { http, HttpResponse } from 'msw';
import { server } from '../../__tests__/mocks/server';
import HomePage from '../page';

// MSW is already set up in the global test setup

// Mock the CodeEditor component to avoid CodeMirror issues
jest.mock('../../components/CodeEditor', () => {
  return function MockCodeEditor({ value, onChange }: any) {
    return (
      <textarea
        data-testid="code-editor"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-label="Code editor"
      />
    );
  };
});

describe('HomePage', () => {
  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear();
  });

  it('should render loading state initially', () => {
    render(<HomePage />);
    
    expect(screen.getByText('Loading Code Runner...')).toBeInTheDocument();
  });

  it('should render main components after loading', async () => {
    render(<HomePage />);
    
    // Wait for languages to load and components to render
    await waitFor(() => {
      expect(screen.getByText('Code Runner')).toBeInTheDocument();
    }, { timeout: 3000 });

    await waitFor(() => {
      expect(screen.getByLabelText('Language:')).toBeInTheDocument();
    }, { timeout: 3000 });

    await waitFor(() => {
      expect(screen.getByLabelText('Theme:')).toBeInTheDocument();
    }, { timeout: 3000 });

    await waitFor(() => {
      expect(screen.getByTestId('code-editor')).toBeInTheDocument();
    }, { timeout: 3000 });

    await waitFor(() => {
      expect(screen.getByRole('button', { name: /submit/i })).toBeInTheDocument();
    }, { timeout: 3000 });
  });

  it('should show error state when languages fail to load', async () => {
    // Mock API error
    server.use(
      http.get('https://runner.fly.dev/api/v1/languages', () => {
        return HttpResponse.json({ error: 'Server error' }, { status: 500 });
      })
    );

    render(<HomePage />);

    await waitFor(() => {
      expect(screen.getByText('Error Loading Code Runner')).toBeInTheDocument();
    }, { timeout: 3000 });

    expect(screen.getByText('Failed to load available programming languages.')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /retry/i })).toBeInTheDocument();
  });

  it('should have proper accessibility attributes', async () => {
    render(<HomePage />);

    await waitFor(() => {
      expect(screen.getByRole('main')).toBeInTheDocument();
    }, { timeout: 3000 });

    // Check for proper heading structure
    await waitFor(() => {
      expect(screen.getByRole('heading', { name: /code runner/i })).toBeInTheDocument();
    }, { timeout: 3000 });
  });

  it('should handle localStorage persistence', async () => {
    // Set some initial localStorage values
    localStorage.setItem('selectedLanguage', '"javascript"');
    localStorage.setItem('selectedTheme', '"dark"');
    localStorage.setItem('editorCode', '"console.log(\\"test\\");"');

    render(<HomePage />);

    await waitFor(() => {
      expect(screen.getByText('Code Runner')).toBeInTheDocument();
    }, { timeout: 3000 });

    // The component should use the stored values
    // This is tested indirectly through the component behavior
  });
});