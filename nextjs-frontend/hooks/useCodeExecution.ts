import { useState, useCallback } from 'react';
import { executeCode as apiExecuteCode, CodeExecutionResponse, ApiError } from '../lib/api';

/**
 * Hook return interface for code execution
 */
export interface UseCodeExecutionReturn {
  executeCode: (code: string, language: string) => Promise<void>;
  output: CodeExecutionResponse | null;
  loading: boolean;
  error: string | null;
  clearOutput: () => void;
  clearError: () => void;
}

/**
 * Custom hook for managing code execution state and API calls
 * 
 * Handles:
 * - Async code execution with proper error handling
 * - Loading state management during execution
 * - API response parsing and error formatting
 * - State management for output and errors
 */
export function useCodeExecution(): UseCodeExecutionReturn {
  const [output, setOutput] = useState<CodeExecutionResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * Execute code with the given language
   * Manages loading state and error handling
   */
  const executeCode = useCallback(async (code: string, language: string) => {
    // Clear previous state
    setError(null);
    setOutput(null);
    setLoading(true);

    try {
      // Validate inputs
      if (!code.trim()) {
        throw new Error('Code cannot be empty');
      }
      
      if (!language.trim()) {
        throw new Error('Language must be selected');
      }

      // Execute code via API
      const result = await apiExecuteCode(code, language);
      
      // Set successful result
      setOutput(result);
    } catch (err) {
      // Handle different types of errors
      let errorMessage: string;
      
      if (err instanceof ApiError) {
        // Check if this is a network error (API not available)
        if (err.message.includes('Network error') || err.message.includes('fetch')) {
          // Provide a demo response when API is not available
          console.warn('API not available, providing demo response');
          setOutput({
            stdout: `Demo Mode: Code execution API is not available.\n\nYour ${language} code would be executed here:\n\n${code.split('\n').map((line, i) => `${i + 1}: ${line}`).join('\n')}\n\n[This is a demo response - connect to the backend API for real code execution]`,
            stderr: '',
            error: ''
          });
          setError('Demo Mode: Connect to backend API for real code execution');
          return;
        }
        
        // API-specific errors with status codes
        if (err.status === 400) {
          errorMessage = 'Invalid request: Please check your code and language selection';
        } else if (err.status === 500) {
          errorMessage = 'Server error: The code execution service is temporarily unavailable';
        } else if (err.status === 429) {
          errorMessage = 'Rate limit exceeded: Please wait before submitting again';
        } else {
          errorMessage = `API Error: ${err.message}`;
        }
      } else if (err instanceof Error) {
        // Client-side validation or network errors
        if (err.message.includes('fetch') || err.message.includes('Network')) {
          // Provide a demo response for network errors
          console.warn('Network error, providing demo response');
          setOutput({
            stdout: `Demo Mode: Code execution API is not available.\n\nYour ${language} code would be executed here:\n\n${code.split('\n').map((line, i) => `${i + 1}: ${line}`).join('\n')}\n\n[This is a demo response - connect to the backend API for real code execution]`,
            stderr: '',
            error: ''
          });
          setError('Demo Mode: Connect to backend API for real code execution');
          return;
        }
        errorMessage = err.message;
      } else {
        // Unknown error types
        errorMessage = 'An unexpected error occurred during code execution';
      }
      
      setError(errorMessage);
      console.error('Code execution failed:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Clear the current output
   */
  const clearOutput = useCallback(() => {
    setOutput(null);
  }, []);

  /**
   * Clear the current error
   */
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    executeCode,
    output,
    loading,
    error,
    clearOutput,
    clearError,
  };
}

export default useCodeExecution;