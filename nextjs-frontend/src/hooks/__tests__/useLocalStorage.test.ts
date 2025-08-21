import { renderHook, act, waitFor } from '@testing-library/react';
import { useLocalStorage } from '../useLocalStorage';

// Mock localStorage
const mockLocalStorage = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
  length: 0,
  key: jest.fn(),
};

Object.defineProperty(window, 'localStorage', {
  value: mockLocalStorage,
  writable: true,
});

describe('useLocalStorage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // Mock the test key check to succeed
    mockLocalStorage.setItem.mockImplementation((key, value) => {
      if (key === '__localStorage_test__') {
        return;
      }
      // Store the actual calls for verification
      mockLocalStorage.setItem.mock.calls.push([key, value]);
    });
    mockLocalStorage.removeItem.mockImplementation((key) => {
      if (key === '__localStorage_test__') {
        return;
      }
      // Store the actual calls for verification
      mockLocalStorage.removeItem.mock.calls.push([key]);
    });
    mockLocalStorage.getItem.mockReturnValue(null);
  });

  it('should return initial value when localStorage is empty', async () => {
    mockLocalStorage.getItem.mockReturnValue(null);
    
    const { result } = renderHook(() => useLocalStorage('test-key', 'initial-value'));
    
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });
    
    expect(result.current.value).toBe('initial-value');
    expect(result.current.error).toBeNull();
  });

  it('should return stored value from localStorage', async () => {
    mockLocalStorage.getItem.mockImplementation((key) => {
      if (key === 'test-key') return '"stored-value"';
      return null;
    });
    
    const { result } = renderHook(() => useLocalStorage('test-key', 'initial-value'));
    
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });
    
    expect(result.current.value).toBe('stored-value');
    expect(result.current.error).toBeNull();
  });

  it('should update localStorage when setValue is called', async () => {
    const { result } = renderHook(() => useLocalStorage('test-key', 'initial-value'));
    
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });
    
    act(() => {
      result.current.setValue('new-value');
    });
    
    expect(result.current.value).toBe('new-value');
    expect(mockLocalStorage.setItem).toHaveBeenCalledWith('test-key', '"new-value"');
  });

  it('should handle localStorage errors gracefully', async () => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    
    // Make setItem throw an error for non-test keys
    mockLocalStorage.setItem.mockImplementation((key, value) => {
      if (key === '__localStorage_test__') {
        return;
      }
      throw new Error('localStorage is not available');
    });
    
    const { result } = renderHook(() => useLocalStorage('test-key', 'initial-value'));
    
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });
    
    act(() => {
      result.current.setValue('new-value');
    });
    
    expect(result.current.error).toBe('localStorage is not available');
    expect(consoleSpy).toHaveBeenCalled();
    
    consoleSpy.mockRestore();
  });

  it('should handle invalid JSON in localStorage', async () => {
    const consoleSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});
    mockLocalStorage.getItem.mockImplementation((key) => {
      if (key === 'test-key') return 'invalid-json{';
      return null;
    });
    
    const { result } = renderHook(() => useLocalStorage('test-key', 'initial-value'));
    
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });
    
    expect(result.current.value).toBe('initial-value');
    expect(consoleSpy).toHaveBeenCalled();
    
    consoleSpy.mockRestore();
  });

  it('should work with complex objects', async () => {
    const complexObject = { name: 'test', count: 50, nested: { value: true } };
    
    const { result } = renderHook(() => useLocalStorage('complex-key', complexObject));
    
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });
    
    act(() => {
      result.current.setValue({ ...complexObject, count: 100 });
    });
    
    expect(result.current.value).toEqual({ ...complexObject, count: 100 });
    expect(mockLocalStorage.setItem).toHaveBeenCalledWith(
      'complex-key', 
      JSON.stringify({ ...complexObject, count: 100 })
    );
  });

  it('should handle null and undefined values', async () => {
    const { result } = renderHook(() => useLocalStorage('null-key', 'initial'));
    
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });
    
    act(() => {
      result.current.setValue(null);
    });
    
    expect(result.current.value).toBe(null);
    expect(mockLocalStorage.setItem).toHaveBeenCalledWith('null-key', JSON.stringify(null));
  });

  it('should handle removeValue functionality', async () => {
    const { result } = renderHook(() => useLocalStorage('remove-key', 'initial'));
    
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });
    
    act(() => {
      result.current.removeValue();
    });
    
    expect(result.current.value).toBe('initial');
    expect(mockLocalStorage.removeItem).toHaveBeenCalledWith('remove-key');
  });
});