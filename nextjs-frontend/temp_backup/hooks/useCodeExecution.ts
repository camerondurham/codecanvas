import { useState, useCallback, useRef } from 'react';
import { executeCode, CodeExecutionResponse, ApiError } from '../lib/api';

/**
 * Return type for the useCodeExecution hook
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
 * Custom hook for executing code and managing execution state
 * 
 * Features:
 * - Async code execution with proper error handling
 * - Loading state management during execution
 * - API response parsing and error formatting
 * - Prevention of multiple simultaneous executions
 * - Manual output and error clearing
 * - Graceful error handling with user-friendly messages
 */
export function useCodeExecution(): UseCodeExecutionReturn {
  const [output, setOutput] = useState<CodeExecutionResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  
  // Use ref to prevent multiple simultaneous executions
  const executingRef = useRef<boolean>(false);

  /**
   * Execute code on the server
   */
  const handleExecuteCode = useCallback(async (
    code: string, 
    language: string
  ): Promise<void> => {
    // Prevent multiple simultaneous executions
    if (executingRef.current) {
      return;
    }

    // Validate inputs
    if (!code.trim()) {
      setError('Code cannot be empty');
      return;
    }

    if (!language.trim()) {
      setError('Language must be selected');
      return;
    }

    executingRef.current = true;
    setLoading(true);
    setError(null);
    setOutput(null);

    try {
      const result = await executeCode(code, language);
      
      // Parse and format the response
      const formattedOutput: CodeExecutionResponse = {
        stdout: result.stdout || '',
        stderr: result.stderr || '',
        error: result.error || '',
      };
      
      setOutput(formattedOutput);
      setError(null);
    } catch (err) {
      let errorMessage = 'Failed to execute code';
      
      if (err instanceof ApiError) {
        // Handle API-specific errors
        if (err.status === 400) {
          errorMessage = 'Invalid code or language selection';
        } else if (err.status === 500) {
          errorMessage = 'Server error occurred during execution';
        } else if (err.status === 503) {
          errorMessage = 'Code execution service is temporarily unavailable';
        } else {
          errorMessage = `API Error (${err.status}): ${err.message}`;
        }
      } else if (err instanceof Error) {
        // Handle network or other errors
        if (err.message.includes('fetch')) {
          errorMessage = 'Network error: Unable to connect to the server';
        } else {
          errorMessage = err.message;
        }
      }
      
      console.error('useCodeExecution: Error executing code:', err);
      setError(errorMessage);
      setOutput(null);
    } finally {
      setLoading(false);
      executingRef.current = false;
    }
  }, []);

  /**
   * Clear the current output
   */
  const clearOutput = useCallback((): void => {
    setOutput(null);
  }, []);

  /**
   * Clear the current error
   */
  const clearError = useCallback((): void => {
    setError(null);
  }, []);

  return {
    executeCode: handleExecuteCode,
    output,
    loading,
    error,
    clearOutput,
    clearError,
  };
}