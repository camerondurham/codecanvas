import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import Providers, { useAppContext } from '../Providers';

// Mock the config module
jest.mock('@/lib/config', () => ({
  getConfig: jest.fn(() => ({
    apiBaseUrl: 'https://runner.fly.dev/api/v1',
    analytics: { id: 'test-analytics-id' },
    errorReporting: { dsn: 'test-error-dsn' },
  })),
  logConfig: jest.fn(),
}));

// Test component that uses the context
const TestComponent = () => {
  const { theme, setTheme, apiBaseUrl } = useAppContext();
  
  return (
    <div>
      <div data-testid="theme">{theme}</div>
      <div data-testid="api-url">{apiBaseUrl}</div>
      <button onClick={() => setTheme('light')}>Set Light</button>
      <button onClick={() => setTheme('dark')}>Set Dark</button>
      <button onClick={() => setTheme('auto')}>Set Auto</button>
    </div>
  );
};

// Component that throws an error for testing error boundary
const ErrorComponent = () => {
  throw new Error('Test error');
};

describe('Providers', () => {
  beforeEach(() => {
    // Clear any theme classes from previous tests
    document.documentElement.classList.remove('light-theme', 'dark-theme');
    jest.clearAllMocks();
  });

  it('should provide app context to children', () => {
    render(
      <Providers>
        <TestComponent />
      </Providers>
    );

    expect(screen.getByTestId('theme')).toHaveTextContent('auto');
    expect(screen.getByTestId('api-url')).toHaveTextContent('https://runner.fly.dev/api/v1');
  });

  it('should allow theme changes', () => {
    render(
      <Providers>
        <TestComponent />
      </Providers>
    );

    expect(screen.getByTestId('theme')).toHaveTextContent('auto');

    act(() => {
      fireEvent.click(screen.getByText('Set Light'));
    });

    expect(screen.getByTestId('theme')).toHaveTextContent('light');

    act(() => {
      fireEvent.click(screen.getByText('Set Dark'));
    });

    expect(screen.getByTestId('theme')).toHaveTextContent('dark');
  });

  it('should apply theme classes to document element', () => {
    render(
      <Providers>
        <TestComponent />
      </Providers>
    );

    // Initially auto theme should not add classes
    expect(document.documentElement.classList.contains('light-theme')).toBe(false);
    expect(document.documentElement.classList.contains('dark-theme')).toBe(false);

    act(() => {
      fireEvent.click(screen.getByText('Set Light'));
    });

    expect(document.documentElement.classList.contains('light-theme')).toBe(true);
    expect(document.documentElement.classList.contains('dark-theme')).toBe(false);

    act(() => {
      fireEvent.click(screen.getByText('Set Dark'));
    });

    expect(document.documentElement.classList.contains('light-theme')).toBe(false);
    expect(document.documentElement.classList.contains('dark-theme')).toBe(true);

    act(() => {
      fireEvent.click(screen.getByText('Set Auto'));
    });

    expect(document.documentElement.classList.contains('light-theme')).toBe(false);
    expect(document.documentElement.classList.contains('dark-theme')).toBe(false);
  });

  it('should wrap children in error boundary', () => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    render(
      <Providers>
        <ErrorComponent />
      </Providers>
    );

    expect(screen.getByText('Something went wrong')).toBeInTheDocument();

    consoleSpy.mockRestore();
  });

  it('should throw error when useAppContext is used outside provider', () => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    expect(() => {
      render(<TestComponent />);
    }).toThrow('useAppContext must be used within an AppProvider');

    consoleSpy.mockRestore();
  });

  it('should initialize with correct default values', () => {
    render(
      <Providers>
        <TestComponent />
      </Providers>
    );

    expect(screen.getByTestId('theme')).toHaveTextContent('auto');
    expect(screen.getByTestId('api-url')).toHaveTextContent('https://runner.fly.dev/api/v1');
  });

  it('should handle multiple children', () => {
    render(
      <Providers>
        <div data-testid="child-1">Child 1</div>
        <div data-testid="child-2">Child 2</div>
        <TestComponent />
      </Providers>
    );

    expect(screen.getByTestId('child-1')).toBeInTheDocument();
    expect(screen.getByTestId('child-2')).toBeInTheDocument();
    expect(screen.getByTestId('theme')).toHaveTextContent('auto');
  });

  it('should call logConfig on initialization', () => {
    const { logConfig } = require('@/lib/config');
    
    render(
      <Providers>
        <div>Test</div>
      </Providers>
    );

    expect(logConfig).toHaveBeenCalledTimes(1);
  });

  it('should log analytics initialization in development', () => {
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});

    render(
      <Providers>
        <div>Test</div>
      </Providers>
    );

    expect(consoleSpy).toHaveBeenCalledWith(
      'Analytics would be initialized here with ID:',
      'test-analytics-id'
    );

    consoleSpy.mockRestore();
  });

  it('should log error reporting initialization in development', () => {
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});

    render(
      <Providers>
        <div>Test</div>
      </Providers>
    );

    expect(consoleSpy).toHaveBeenCalledWith(
      'Error reporting would be initialized here with DSN:',
      'test-error-dsn'
    );

    consoleSpy.mockRestore();
  });

  it('should handle config without analytics or error reporting', () => {
    const { getConfig } = require('@/lib/config');
    getConfig.mockReturnValueOnce({
      apiBaseUrl: 'https://runner.fly.dev/api/v1',
    });

    const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});

    render(
      <Providers>
        <TestComponent />
      </Providers>
    );

    expect(screen.getByTestId('api-url')).toHaveTextContent('https://runner.fly.dev/api/v1');
    
    // Should not log analytics or error reporting initialization
    expect(consoleSpy).not.toHaveBeenCalledWith(
      expect.stringContaining('Analytics would be initialized')
    );
    expect(consoleSpy).not.toHaveBeenCalledWith(
      expect.stringContaining('Error reporting would be initialized')
    );

    consoleSpy.mockRestore();
  });

  it('should preserve theme state across re-renders', () => {
    const { rerender } = render(
      <Providers>
        <TestComponent />
      </Providers>
    );

    act(() => {
      fireEvent.click(screen.getByText('Set Dark'));
    });

    expect(screen.getByTestId('theme')).toHaveTextContent('dark');

    rerender(
      <Providers>
        <TestComponent />
      </Providers>
    );

    expect(screen.getByTestId('theme')).toHaveTextContent('dark');
  });
});