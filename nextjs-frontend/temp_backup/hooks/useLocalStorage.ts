import { useState, useEffect, useCallback } from 'react';

/**
 * Return type for the useLocalStorage hook
 */
export interface UseLocalStorageReturn<T> {
  value: T;
  setValue: (value: T) => void;
  removeValue: () => void;
  loading: boolean;
  error: string | null;
}

/**
 * Check if localStorage is available (SSR-safe)
 */
function isLocalStorageAvailable(): boolean {
  if (typeof window === 'undefined') {
    return false;
  }

  try {
    const testKey = '__localStorage_test__';
    window.localStorage.setItem(testKey, 'test');
    window.localStorage.removeItem(testKey);
    return true;
  } catch {
    return false;
  }
}

/**
 * Safely serialize a value to JSON string
 */
function serializeValue<T>(value: T): string {
  try {
    return JSON.stringify(value);
  } catch (error) {
    throw new Error(`Failed to serialize value: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

/**
 * Safely deserialize a JSON string to a value
 */
function deserializeValue<T>(serializedValue: string, defaultValue: T): T {
  try {
    const parsed = JSON.parse(serializedValue);
    return parsed;
  } catch (error) {
    console.warn(`Failed to deserialize localStorage value, using default:`, error);
    return defaultValue;
  }
}

/**
 * Custom hook for SSR-safe localStorage access with TypeScript generics
 * 
 * Features:
 * - SSR-safe localStorage access
 * - Type-safe storage operations with generics
 * - Automatic serialization/deserialization
 * - Error handling for localStorage unavailability
 * - Loading state during hydration
 * - Remove value functionality
 * 
 * @param key - The localStorage key
 * @param defaultValue - The default value to use if no stored value exists
 * @returns Object with value, setValue, removeValue, loading, and error
 */
export function useLocalStorage<T>(
  key: string,
  defaultValue: T
): UseLocalStorageReturn<T> {
  const [value, setValue] = useState<T>(defaultValue);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Initialize value from localStorage on client-side
  useEffect(() => {
    if (!isLocalStorageAvailable()) {
      setError('localStorage is not available');
      setLoading(false);
      return;
    }

    try {
      const storedValue = window.localStorage.getItem(key);
      
      if (storedValue !== null) {
        const deserializedValue = deserializeValue(storedValue, defaultValue);
        setValue(deserializedValue);
      }
      
      setError(null);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to read from localStorage';
      console.error(`useLocalStorage: Error reading key "${key}":`, err);
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  }, [key, defaultValue]);

  /**
   * Update the stored value
   */
  const setStoredValue = useCallback((newValue: T) => {
    try {
      // Update state immediately
      setValue(newValue);
      
      // Update localStorage if available
      if (isLocalStorageAvailable()) {
        const serializedValue = serializeValue(newValue);
        window.localStorage.setItem(key, serializedValue);
        setError(null);
      } else {
        setError('localStorage is not available');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to write to localStorage';
      console.error(`useLocalStorage: Error writing key "${key}":`, err);
      setError(errorMessage);
    }
  }, [key]);

  /**
   * Remove the stored value and reset to default
   */
  const removeValue = useCallback(() => {
    try {
      // Reset to default value
      setValue(defaultValue);
      
      // Remove from localStorage if available
      if (isLocalStorageAvailable()) {
        window.localStorage.removeItem(key);
        setError(null);
      } else {
        setError('localStorage is not available');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to remove from localStorage';
      console.error(`useLocalStorage: Error removing key "${key}":`, err);
      setError(errorMessage);
    }
  }, [key, defaultValue]);

  return {
    value,
    setValue: setStoredValue,
    removeValue,
    loading,
    error,
  };
}