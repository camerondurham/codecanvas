import { renderHook, act, waitFor } from '@testing-library/react';
import { useLanguages, clearLanguagesCache } from '../useLanguages';
import { fetchLanguages, ApiError } from '../../lib/api';

// Mock the API module
jest.mock('../../lib/api', () => ({
  fetchLanguages: jest.fn(),
  ApiError: class MockApiError extends Error {
    constructor(message: string, public status?: number) {
      super(message);
      this.name = 'ApiError';
    }
  },
}));

const mockFetchLanguages = fetchLanguages as jest.MockedFunction<typeof fetchLanguages>;

// Mock console methods to avoid noise in tests
const consoleSpy = {
  error: jest.spyOn(console, 'error').mockImplementation(() => {}),
  warn: jest.spyOn(console, 'warn').mockImplementation(() => {}),
};

describe('useLanguages', () => {
  beforeEach(() => {
    // Clear cache before each test
    clearLanguagesCache();
    
    // Clear mock call history
    mockFetchLanguages.mockClear();
    consoleSpy.error.mockClear();
    consoleSpy.warn.mockClear();
    
    // Reset mock implementation to default success
    mockFetchLanguages.mockResolvedValue(['python3', 'javascript', 'java', 'cpp']);
  });

  afterAll(() => {
    consoleSpy.error.mockRestore();
    consoleSpy.warn.mockRestore();
  });

  it('should fetch languages on mount', async () => {
    const { result } = renderHook(() => useLanguages());
    
    // Initially loading should be true
    expect(result.current.loading).toBe(true);
    expect(result.current.languages).toEqual([]);
    expect(result.current.error).toBe(null);
    
    // Wait for the API call to complete
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });
    
    expect(result.current.languages).toEqual(['python3', 'javascript', 'java', 'cpp']);
    expect(result.current.error).toBe(null);
    expect(mockFetchLanguages).toHaveBeenCalledTimes(1);
  });

  it('should use cached data on subsequent mounts', async () => {
    // First mount
    const { unmount } = renderHook(() => useLanguages());
    
    await waitFor(() => {
      expect(mockFetchLanguages).toHaveBeenCalledTimes(1);
    });
    
    unmount();
    
    // Second mount should use cache
    const { result: result2 } = renderHook(() => useLanguages());
    
    // Should immediately have data from cache
    await waitFor(() => {
      expect(result2.current.languages).toEqual(['python3', 'javascript', 'java', 'cpp']);
    });
    
    // Should not make another API call
    expect(mockFetchLanguages).toHaveBeenCalledTimes(1);
  });

  it('should handle API errors gracefully', async () => {
    const apiError = new ApiError('Network error', 500);
    mockFetchLanguages.mockRejectedValueOnce(apiError);
    
    const { result } = renderHook(() => useLanguages());
    
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });
    
    expect(result.current.languages).toEqual([]);
    expect(result.current.error).toBe('Server error: Unable to fetch available languages');
    expect(consoleSpy.error).toHaveBeenCalledWith('Failed to fetch languages:', apiError);
  });

  it('should handle different API error status codes', async () => {
    const testCases = [
      { status: 404, expectedMessage: 'Languages endpoint not found. Please check the API configuration.' },
      { status: 503, expectedMessage: 'Service unavailable: Language service is temporarily down' },
      { status: 400, expectedMessage: 'API Error: Bad request' },
    ];

    for (const testCase of testCases) {
      clearLanguagesCache();
      const apiError = new ApiError('Bad request', testCase.status);
      mockFetchLanguages.mockRejectedValueOnce(apiError);
      
      const { result } = renderHook(() => useLanguages());
      
      await waitFor(() => {
        expect(result.current.loading).toBe(false);
      });
      
      expect(result.current.error).toBe(testCase.expectedMessage);
    }
  });

  it('should handle network errors', async () => {
    const networkError = new Error('Network connection failed');
    mockFetchLanguages.mockRejectedValueOnce(networkError);
    
    const { result } = renderHook(() => useLanguages());
    
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });
    
    expect(result.current.error).toBe('Network connection failed');
  });

  it('should handle unknown errors', async () => {
    mockFetchLanguages.mockRejectedValueOnce('Unknown error');
    
    const { result } = renderHook(() => useLanguages());
    
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });
    
    expect(result.current.error).toBe('An unexpected error occurred while fetching languages');
  });

  it('should validate API response format', async () => {
    // Mock invalid response (not an array)
    mockFetchLanguages.mockResolvedValueOnce('invalid' as any);
    
    const { result } = renderHook(() => useLanguages());
    
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });
    
    expect(result.current.error).toBe('Invalid response format: expected array of languages');
    expect(result.current.languages).toEqual([]);
  });

  it('should filter out invalid language names', async () => {
    mockFetchLanguages.mockResolvedValueOnce([
      'python3',
      '', // empty string
      'javascript',
      '   ', // whitespace only
      null as any, // null value
      'java',
      123 as any, // number
    ]);
    
    const { result } = renderHook(() => useLanguages());
    
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });
    
    expect(result.current.languages).toEqual(['python3', 'javascript', 'java']);
    expect(result.current.error).toBe(null);
  });

  it('should handle empty valid languages array', async () => {
    mockFetchLanguages.mockResolvedValueOnce(['', '   ', null as any]);
    
    const { result } = renderHook(() => useLanguages());
    
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });
    
    expect(result.current.error).toBe('No valid languages received from API');
    expect(result.current.languages).toEqual([]);
  });

  it('should provide refetch functionality', async () => {
    const { result } = renderHook(() => useLanguages());
    
    // Wait for initial load
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });
    
    expect(mockFetchLanguages).toHaveBeenCalledTimes(1);
    
    // Mock different response for refetch
    mockFetchLanguages.mockResolvedValueOnce(['python3', 'go', 'rust']);
    
    // Trigger refetch
    await act(async () => {
      await result.current.refetch();
    });
    
    expect(result.current.languages).toEqual(['python3', 'go', 'rust']);
    expect(mockFetchLanguages).toHaveBeenCalledTimes(2);
  });

  it('should use cached data as fallback when API fails', async () => {
    // First successful call to populate cache
    const { unmount } = renderHook(() => useLanguages());
    
    await waitFor(() => {
      expect(mockFetchLanguages).toHaveBeenCalledTimes(1);
    });
    
    unmount();
    
    // Clear the cache and force a new API call that will fail
    clearLanguagesCache();
    
    // Mock the first call to succeed (to populate cache)
    mockFetchLanguages.mockResolvedValueOnce(['python3', 'javascript', 'java', 'cpp']);
    
    // Mount again to populate cache
    const { unmount: unmount2 } = renderHook(() => useLanguages());
    
    await waitFor(() => {
      expect(mockFetchLanguages).toHaveBeenCalledTimes(2);
    });
    
    unmount2();
    
    // Now mock a failure and force refresh
    const apiError = new ApiError('Server error', 500);
    mockFetchLanguages.mockRejectedValueOnce(apiError);
    
    const { result: result2 } = renderHook(() => useLanguages());
    
    // Force a refetch which will fail and use cache as fallback
    await act(async () => {
      await result2.current.refetch();
    });
    
    // Should use cached data as fallback
    expect(result2.current.languages).toEqual(['python3', 'javascript', 'java', 'cpp']);
    expect(result2.current.error).toBe('Server error: Unable to fetch available languages (using cached data)');
    expect(consoleSpy.warn).toHaveBeenCalledWith('Using cached languages as fallback');
  });

  it('should respect cache duration', async () => {
    // Mock Date.now to control cache timing
    const originalDateNow = Date.now;
    let mockTime = 1000000;
    Date.now = jest.fn(() => mockTime);
    
    try {
      // First mount
      const { unmount } = renderHook(() => useLanguages());
      
      await waitFor(() => {
        expect(mockFetchLanguages).toHaveBeenCalledTimes(1);
      });
      
      unmount();
      
      // Advance time by 6 minutes (beyond cache duration of 5 minutes)
      mockTime += 6 * 60 * 1000;
      
      // Second mount should make new API call due to expired cache
      const { result: result2 } = renderHook(() => useLanguages());
      
      await waitFor(() => {
        expect(result2.current.loading).toBe(false);
      });
      
      expect(mockFetchLanguages).toHaveBeenCalledTimes(2);
    } finally {
      Date.now = originalDateNow;
    }
  });

  it('should not update state after component unmount', async () => {
    // Mock a delayed API response
    let resolvePromise: (value: string[]) => void;
    const delayedPromise = new Promise<string[]>((resolve) => {
      resolvePromise = resolve;
    });
    mockFetchLanguages.mockReturnValueOnce(delayedPromise);
    
    const { result, unmount } = renderHook(() => useLanguages());
    
    expect(result.current.loading).toBe(true);
    
    // Unmount before API call completes
    unmount();
    
    // Resolve the promise after unmount
    resolvePromise!(['python3', 'javascript']);
    
    // Wait a bit to ensure any state updates would have happened
    await new Promise(resolve => setTimeout(resolve, 10));
    
    // No errors should be thrown due to setting state on unmounted component
    // This test mainly ensures we don't get React warnings
  });
});

describe('clearLanguagesCache', () => {
  it('should clear the languages cache', async () => {
    // Clear any existing cache and reset mocks
    clearLanguagesCache();
    mockFetchLanguages.mockClear();
    
    // First mount to populate cache
    const { unmount } = renderHook(() => useLanguages());
    
    await waitFor(() => {
      expect(mockFetchLanguages).toHaveBeenCalledTimes(1);
    });
    
    unmount();
    
    // Second mount should use cache (no new API call)
    const { unmount: unmount2 } = renderHook(() => useLanguages());
    
    await waitFor(() => {
      expect(mockFetchLanguages).toHaveBeenCalledTimes(1); // Still 1, using cache
    });
    
    unmount2();
    
    // Clear cache
    clearLanguagesCache();
    
    // Third mount should make new API call
    const { result: result3 } = renderHook(() => useLanguages());
    
    await waitFor(() => {
      expect(result3.current.loading).toBe(false);
    });
    
    expect(mockFetchLanguages).toHaveBeenCalledTimes(2); // Now 2, cache was cleared
  });
});