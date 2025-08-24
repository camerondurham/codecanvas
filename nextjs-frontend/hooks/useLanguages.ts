import { useState, useEffect, useCallback, useRef } from 'react';
import { fetchLanguages, ApiError } from '../lib/api';

/**
 * Hook return interface for language fetching
 */
export interface UseLanguagesReturn {
  languages: string[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

/**
 * Cache configuration for languages
 */
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes in milliseconds

interface LanguagesCache {
  data: string[];
  timestamp: number;
}

// Global cache to persist across component unmounts
let languagesCache: LanguagesCache | null = null;

/**
 * Custom hook for fetching and managing available programming languages
 * 
 * Features:
 * - Fetches available languages from API on mount
 * - Manages loading and error states
 * - Includes caching logic to prevent unnecessary API calls
 * - Handles API failure gracefully with error state
 * - Provides refetch functionality for manual refresh
 */
export function useLanguages(): UseLanguagesReturn {
  const [languages, setLanguages] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const isMountedRef = useRef(true);

  /**
   * Check if cached data is still valid
   */
  const isCacheValid = useCallback((): boolean => {
    if (!languagesCache) {
      return false;
    }
    
    const now = Date.now();
    const cacheAge = now - languagesCache.timestamp;
    return cacheAge < CACHE_DURATION;
  }, []);

  /**
   * Fetch languages from API or cache
   */
  const fetchLanguagesData = useCallback(async (forceRefresh = false) => {
    // Use cache if valid and not forcing refresh
    if (!forceRefresh && isCacheValid() && languagesCache) {
      setLanguages(languagesCache.data);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const fetchedLanguages = await fetchLanguages();
      
      // Only update state if component is still mounted
      if (isMountedRef.current) {
        // Validate that we received an array
        if (!Array.isArray(fetchedLanguages)) {
          throw new Error('Invalid response format: expected array of languages');
        }

        // Filter out empty or invalid language names
        const validLanguages = fetchedLanguages.filter(
          (lang): lang is string => typeof lang === 'string' && lang.trim().length > 0
        );

        if (validLanguages.length === 0) {
          throw new Error('No valid languages received from API');
        }

        // Update cache
        languagesCache = {
          data: validLanguages,
          timestamp: Date.now(),
        };

        setLanguages(validLanguages);
      }
    } catch (err) {
      // Only update error state if component is still mounted
      if (isMountedRef.current) {
        let errorMessage: string;
        
        if (err instanceof ApiError) {
          // API-specific errors with status codes
          if (err.status === 404) {
            errorMessage = 'Languages endpoint not found. Please check the API configuration.';
          } else if (err.status === 500) {
            errorMessage = 'Server error: Unable to fetch available languages';
          } else if (err.status === 503) {
            errorMessage = 'Service unavailable: Language service is temporarily down';
          } else {
            errorMessage = `API Error: ${err.message}`;
          }
        } else if (err instanceof Error) {
          // Client-side validation or network errors
          errorMessage = err.message;
        } else {
          // Unknown error types
          errorMessage = 'An unexpected error occurred while fetching languages';
        }
        
        setError(errorMessage);
        console.error('Failed to fetch languages:', err);

        // If we have cached data, use it as fallback
        if (languagesCache && languagesCache.data.length > 0) {
          console.warn('Using cached languages as fallback');
          setLanguages(languagesCache.data);
          setError(`${errorMessage} (using cached data)`);
        }
      }
    } finally {
      if (isMountedRef.current) {
        setLoading(false);
      }
    }
  }, [isCacheValid]);

  /**
   * Refetch languages (force refresh)
   */
  const refetch = useCallback(async () => {
    await fetchLanguagesData(true);
  }, [fetchLanguagesData]);

  // Fetch languages on mount
  useEffect(() => {
    fetchLanguagesData();
  }, [fetchLanguagesData]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  return {
    languages,
    loading,
    error,
    refetch,
  };
}

/**
 * Utility function to clear the languages cache
 * Useful for testing or when API configuration changes
 */
export function clearLanguagesCache(): void {
  languagesCache = null;
}

export default useLanguages;