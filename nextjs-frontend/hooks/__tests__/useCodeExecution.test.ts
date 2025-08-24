import { renderHook, act } from '@testing-library/react';
import { useCodeExecution } from '../useCodeExecution';
import { executeCode as apiExecuteCode, ApiError } from '../../lib/api';

// Mock the API module
jest.mock('../../lib/api', () => ({
  executeCode: jest.fn(),
  ApiError: class extends Error {
    constructor(message: string, public status?: number) {
      super(message);
      this.name = 'ApiError';
    }
  },
}));

const mockApiExecuteCode = apiExecuteCode as jest.MockedFunction<typeof apiExecuteCode>;

describe('useCodeExecution', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should initialize with default state', () => {
    const { result } = renderHook(() => useCodeExecution());

    expect(result.current.output).toBeNull();
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeNull();
    expect(typeof result.current.executeCode).toBe('function');
    expect(typeof result.current.clearOutput).toBe('function');
    expect(typeof result.current.clearError).toBe('function');
  });

  it('should execute code successfully', async () => {
    const mockResponse = {
      stdout: 'Hello, World!',
      stderr: '',
      error: '',
    };
    mockApiExecuteCode.mockResolvedValue(mockResponse);

    const { result } = renderHook(() => useCodeExecution());

    await act(async () => {
      await result.current.executeCode('print("Hello, World!")', 'python');
    });

    expect(result.current.output).toEqual(mockResponse);
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeNull();
    expect(mockApiExecuteCode).toHaveBeenCalledWith('print("Hello, World!")', 'python');
  });

  it('should handle loading state correctly', async () => {
    let resolvePromise: (value: any) => void;
    const promise = new Promise<any>((resolve) => {
      resolvePromise = resolve;
    });
    mockApiExecuteCode.mockReturnValue(promise);

    const { result } = renderHook(() => useCodeExecution());

    // Start execution
    act(() => {
      result.current.executeCode('console.log("test")', 'javascript');
    });

    // Should be loading
    expect(result.current.loading).toBe(true);
    expect(result.current.output).toBeNull();
    expect(result.current.error).toBeNull();

    // Resolve the promise
    await act(async () => {
      resolvePromise!({
        stdout: 'test',
        stderr: '',
        error: '',
      });
    });

    // Should no longer be loading
    expect(result.current.loading).toBe(false);
    expect(result.current.output).toEqual({
      stdout: 'test',
      stderr: '',
      error: '',
    });
  });

  it('should handle API errors with status codes', async () => {
    const apiError = new ApiError('Bad Request', 400);
    mockApiExecuteCode.mockRejectedValue(apiError);

    const { result } = renderHook(() => useCodeExecution());

    await act(async () => {
      await result.current.executeCode('invalid code', 'python');
    });

    expect(result.current.output).toBeNull();
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBe('Invalid request: Please check your code and language selection');
  });

  it('should handle server errors', async () => {
    const apiError = new ApiError('Internal Server Error', 500);
    mockApiExecuteCode.mockRejectedValue(apiError);

    const { result } = renderHook(() => useCodeExecution());

    await act(async () => {
      await result.current.executeCode('print("test")', 'python');
    });

    expect(result.current.error).toBe('Server error: The code execution service is temporarily unavailable');
  });

  it('should handle rate limit errors', async () => {
    const apiError = new ApiError('Too Many Requests', 429);
    mockApiExecuteCode.mockRejectedValue(apiError);

    const { result } = renderHook(() => useCodeExecution());

    await act(async () => {
      await result.current.executeCode('print("test")', 'python');
    });

    expect(result.current.error).toBe('Rate limit exceeded: Please wait before submitting again');
  });

  it('should handle generic API errors', async () => {
    const apiError = new ApiError('Network Error', 503);
    mockApiExecuteCode.mockRejectedValue(apiError);

    const { result } = renderHook(() => useCodeExecution());

    await act(async () => {
      await result.current.executeCode('print("test")', 'python');
    });

    expect(result.current.error).toBe('API Error: Network Error');
  });

  it('should handle network errors', async () => {
    const networkError = new Error('Network connection failed');
    mockApiExecuteCode.mockRejectedValue(networkError);

    const { result } = renderHook(() => useCodeExecution());

    await act(async () => {
      await result.current.executeCode('print("test")', 'python');
    });

    expect(result.current.error).toBe('Network connection failed');
  });

  it('should handle unknown errors', async () => {
    mockApiExecuteCode.mockRejectedValue('Unknown error');

    const { result } = renderHook(() => useCodeExecution());

    await act(async () => {
      await result.current.executeCode('print("test")', 'python');
    });

    expect(result.current.error).toBe('An unexpected error occurred during code execution');
  });

  it('should validate empty code', async () => {
    const { result } = renderHook(() => useCodeExecution());

    await act(async () => {
      await result.current.executeCode('', 'python');
    });

    expect(result.current.error).toBe('Code cannot be empty');
    expect(result.current.output).toBeNull();
    expect(mockApiExecuteCode).not.toHaveBeenCalled();
  });

  it('should validate empty language', async () => {
    const { result } = renderHook(() => useCodeExecution());

    await act(async () => {
      await result.current.executeCode('print("test")', '');
    });

    expect(result.current.error).toBe('Language must be selected');
    expect(result.current.output).toBeNull();
    expect(mockApiExecuteCode).not.toHaveBeenCalled();
  });

  it('should validate whitespace-only code', async () => {
    const { result } = renderHook(() => useCodeExecution());

    await act(async () => {
      await result.current.executeCode('   \n\t  ', 'python');
    });

    expect(result.current.error).toBe('Code cannot be empty');
    expect(result.current.output).toBeNull();
    expect(mockApiExecuteCode).not.toHaveBeenCalled();
  });

  it('should clear output', async () => {
    const mockResponse = {
      stdout: 'test',
      stderr: '',
      error: '',
    };
    mockApiExecuteCode.mockResolvedValue(mockResponse);

    const { result } = renderHook(() => useCodeExecution());

    // First execute code to set output
    await act(async () => {
      await result.current.executeCode('print("test")', 'python');
    });

    expect(result.current.output).toEqual(mockResponse);

    // Then clear output
    act(() => {
      result.current.clearOutput();
    });

    expect(result.current.output).toBeNull();
  });

  it('should clear error', async () => {
    const { result } = renderHook(() => useCodeExecution());

    // First cause an error
    mockApiExecuteCode.mockRejectedValue(new Error('Test error'));

    await act(async () => {
      await result.current.executeCode('invalid', 'python');
    });

    expect(result.current.error).toBe('Test error');

    // Then clear error
    act(() => {
      result.current.clearError();
    });

    expect(result.current.error).toBeNull();
  });

  it('should clear previous state when executing new code', async () => {
    const { result } = renderHook(() => useCodeExecution());

    // Set initial state
    mockApiExecuteCode.mockResolvedValue({
      stdout: 'first output',
      stderr: '',
      error: '',
    });

    await act(async () => {
      await result.current.executeCode('print("first")', 'python');
    });

    expect(result.current.output?.stdout).toBe('first output');

    // Execute again - should clear previous output
    mockApiExecuteCode.mockResolvedValue({
      stdout: 'second output',
      stderr: '',
      error: '',
    });

    await act(async () => {
      await result.current.executeCode('print("second")', 'python');
    });

    expect(result.current.output?.stdout).toBe('second output');
    expect(result.current.error).toBeNull();
  });

  it('should clear previous error when executing new code', async () => {
    const { result } = renderHook(() => useCodeExecution());

    // First execution fails
    mockApiExecuteCode.mockRejectedValue(new Error('First error'));

    await act(async () => {
      await result.current.executeCode('invalid', 'python');
    });

    expect(result.current.error).toBe('First error');

    // Second execution succeeds - should clear error
    mockApiExecuteCode.mockResolvedValue({
      stdout: 'success',
      stderr: '',
      error: '',
    });

    await act(async () => {
      await result.current.executeCode('print("success")', 'python');
    });

    expect(result.current.error).toBeNull();
    expect(result.current.output?.stdout).toBe('success');
  });
});