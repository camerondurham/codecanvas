import { renderHook, act } from '@testing-library/react';
import { useLocalStorage, useRemoveFromLocalStorage, useIsLocalStorageAvailable } from '../useLocalStorage';

// Mock localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {};

  return {
    getItem: jest.fn((key: string) => store[key] || null),
    setItem: jest.fn((key: string, value: string) => {
      store[key] = value;
    }),
    removeItem: jest.fn((key: string) => {
      delete store[key];
    }),
    clear: jest.fn(() => {
      store = {};
    }),
  };
})();

// Mock window.localStorage
Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
  writable: true,
});

// Mock console methods to avoid noise in tests
const consoleSpy = {
  warn: jest.spyOn(console, 'warn').mockImplementation(() => {}),
  error: jest.spyOn(console, 'error').mockImplementation(() => {}),
};

describe('useLocalStorage', () => {
  beforeEach(() => {
    localStorageMock.clear();
    // Clear mock call history but keep the implementation
    consoleSpy.warn.mockClear();
    consoleSpy.error.mockClear();
    localStorageMock.getItem.mockClear();
    localStorageMock.setItem.mockClear();
    localStorageMock.removeItem.mockClear();
  });

  afterAll(() => {
    consoleSpy.warn.mockRestore();
    consoleSpy.error.mockRestore();
  });

  it('should return initial value when localStorage is empty', () => {
    const { result } = renderHook(() => useLocalStorage('test-key', 'initial'));
    
    expect(result.current[0]).toBe('initial');
  });

  it('should return stored value from localStorage', () => {
    localStorageMock.setItem('test-key', JSON.stringify('stored-value'));
    
    const { result } = renderHook(() => useLocalStorage('test-key', 'initial'));
    
    expect(result.current[0]).toBe('stored-value');
  });

  it('should update localStorage when value is set', () => {
    const { result } = renderHook(() => useLocalStorage('test-key', 'initial'));
    
    act(() => {
      result.current[1]('new-value');
    });
    
    expect(result.current[0]).toBe('new-value');
    expect(localStorageMock.setItem).toHaveBeenCalledWith('test-key', JSON.stringify('new-value'));
  });

  it('should work with function updater', () => {
    const { result } = renderHook(() => useLocalStorage('test-key', 0));
    
    act(() => {
      result.current[1](prev => prev + 1);
    });
    
    expect(result.current[0]).toBe(1);
    expect(localStorageMock.setItem).toHaveBeenCalledWith('test-key', JSON.stringify(1));
  });

  it('should handle complex objects', () => {
    const complexObject = { name: 'test', count: 42, nested: { value: true } };
    
    const { result } = renderHook(() => useLocalStorage('test-key', complexObject));
    
    const newObject = { ...complexObject, count: 100 };
    
    act(() => {
      result.current[1](newObject);
    });
    
    expect(result.current[0]).toEqual(newObject);
    expect(localStorageMock.setItem).toHaveBeenCalledWith('test-key', JSON.stringify(newObject));
  });

  it('should handle localStorage getItem errors gracefully', () => {
    localStorageMock.getItem.mockImplementationOnce(() => {
      throw new Error('localStorage error');
    });
    
    const { result } = renderHook(() => useLocalStorage('test-key', 'fallback'));
    
    expect(result.current[0]).toBe('fallback');
    expect(consoleSpy.warn).toHaveBeenCalledWith(
      'Error reading localStorage key "test-key":',
      expect.any(Error)
    );
  });

  it('should handle localStorage setItem errors gracefully', () => {
    localStorageMock.setItem.mockImplementationOnce(() => {
      throw new Error('localStorage error');
    });
    
    const { result } = renderHook(() => useLocalStorage('test-key', 'initial'));
    
    act(() => {
      result.current[1]('new-value');
    });
    
    expect(consoleSpy.error).toHaveBeenCalledWith(
      'Error setting localStorage key "test-key":',
      expect.any(Error)
    );
  });

  it('should handle invalid JSON in localStorage', () => {
    localStorageMock.getItem.mockReturnValueOnce('invalid-json{');
    
    const { result } = renderHook(() => useLocalStorage('test-key', 'fallback'));
    
    expect(result.current[0]).toBe('fallback');
    expect(consoleSpy.warn).toHaveBeenCalledWith(
      'Error reading localStorage key "test-key":',
      expect.any(Error)
    );
  });

  it('should sync with storage events from other tabs', () => {
    const { result } = renderHook(() => useLocalStorage('test-key', 'initial'));
    
    // Simulate storage event from another tab
    const storageEvent = new StorageEvent('storage', {
      key: 'test-key',
      newValue: JSON.stringify('updated-from-other-tab'),
    });
    
    act(() => {
      window.dispatchEvent(storageEvent);
    });
    
    expect(result.current[0]).toBe('updated-from-other-tab');
  });

  it('should ignore storage events for different keys', () => {
    const { result } = renderHook(() => useLocalStorage('test-key', 'initial'));
    
    const storageEvent = new StorageEvent('storage', {
      key: 'different-key',
      newValue: JSON.stringify('should-be-ignored'),
    });
    
    act(() => {
      window.dispatchEvent(storageEvent);
    });
    
    expect(result.current[0]).toBe('initial');
  });

  it('should handle storage events with invalid JSON', () => {
    const { result } = renderHook(() => useLocalStorage('test-key', 'initial'));
    
    const storageEvent = new StorageEvent('storage', {
      key: 'test-key',
      newValue: 'invalid-json{',
    });
    
    act(() => {
      window.dispatchEvent(storageEvent);
    });
    
    expect(result.current[0]).toBe('initial');
    expect(consoleSpy.warn).toHaveBeenCalledWith(
      'Error parsing localStorage value for key "test-key":',
      expect.any(Error)
    );
  });
});

describe('useRemoveFromLocalStorage', () => {
  beforeEach(() => {
    localStorageMock.clear();
    // Clear mock call history but keep the implementation
    consoleSpy.warn.mockClear();
    consoleSpy.error.mockClear();
    localStorageMock.getItem.mockClear();
    localStorageMock.setItem.mockClear();
    localStorageMock.removeItem.mockClear();
  });

  it('should remove item from localStorage', () => {
    localStorageMock.setItem('test-key', 'test-value');
    
    const { result } = renderHook(() => useRemoveFromLocalStorage());
    
    act(() => {
      result.current('test-key');
    });
    
    expect(localStorageMock.removeItem).toHaveBeenCalledWith('test-key');
  });

  it('should handle removeItem errors gracefully', () => {
    localStorageMock.removeItem.mockImplementationOnce(() => {
      throw new Error('localStorage error');
    });
    
    const { result } = renderHook(() => useRemoveFromLocalStorage());
    
    // The function should not throw even when localStorage.removeItem throws
    expect(() => {
      act(() => {
        result.current('test-key');
      });
    }).not.toThrow();
    
    // Verify that removeItem was called
    expect(localStorageMock.removeItem).toHaveBeenCalledWith('test-key');
  });
});

describe('useIsLocalStorageAvailable', () => {
  beforeEach(() => {
    // Clear mock call history but keep the implementation
    consoleSpy.warn.mockClear();
    consoleSpy.error.mockClear();
    localStorageMock.getItem.mockClear();
    localStorageMock.setItem.mockClear();
    localStorageMock.removeItem.mockClear();
  });

  it('should return true when localStorage is available', () => {
    const { result } = renderHook(() => useIsLocalStorageAvailable());
    
    expect(result.current).toBe(true);
  });

  it('should return false when localStorage throws an error', () => {
    const originalSetItem = localStorageMock.setItem;
    localStorageMock.setItem.mockImplementationOnce(() => {
      throw new Error('localStorage not available');
    });
    
    const { result } = renderHook(() => useIsLocalStorageAvailable());
    
    expect(result.current).toBe(false);
    
    // Restore original implementation
    localStorageMock.setItem = originalSetItem;
  });
});