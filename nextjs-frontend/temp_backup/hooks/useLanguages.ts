import { useState, useEffect, useRef } from 'react';
import { fetchLanguages, ApiError } from '../lib/api';

/**
 * Return type for the useLanguages hook
 */
export interface UseLanguagesReturn {
  languages: string[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

/**
 * Cache for languages to prevent unnecessary API calls
 */
let languagesCache: string[] | null = null;
let cacheTimestamp: number | null = null;

/**
 * Clear the languages cache (useful for testing)
 */
export function clearLanguagesCache(): void {
  languagesCache = null;
  cacheTimestamp = null;
}

// Cache duration: 5 minutes
const CACHE_DURATION = 5 * 60 * 1000;

/**
 * Check if cached data is still valid
 */
function isCacheValid(): boolean {
  return (
    languagesCache !== null &&
    cacheTimestamp !== null &&
    Date.now() - cacheTimestamp < CACHE_DURATION
  );
}

/**
 * Custom hook for fetching and managing available programming languages
 * 
 * Features:
 * - Automatic fetching on mount
 * - Loading and error state management
 * - Caching to prevent unnecessary API calls
 * - Manual refetch capability
 * - Graceful error handling
 */
export function useLanguages(): UseLanguagesReturn {
  const [languages, setLanguages] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  // Use ref to prevent multiple simultaneous requests
  const fetchingRef = useRef<boolean>(false);

  /**
   * Fetch languages from API or cache
   */
  const fetchLanguagesData = async (): Promise<void> => {
    // Prevent multiple simultaneous requests
    if (fetchingRef.current) {
      return;
    }

    // Check cache first
    if (isCacheValid() && languagesCache) {
      setLanguages(languagesCache);
      setLoading(false);
      setError(null);
      return;
    }

    fetchingRef.current = true;
    setLoading(true);
    setError(null);

    try {
      const fetchedLanguages = await fetchLanguages();
      
      // Update cache
      languagesCache = fetchedLanguages;
      cacheTimestamp = Date.now();
      
      // Update state
      setLanguages(fetchedLanguages);
      setError(null);
    } catch (err) {
      let errorMessage = 'Failed to fetch languages';
      
      if (err instanceof ApiError) {
        errorMessage = `API Error: ${err.message}`;
      } else if (err instanceof Error) {
        errorMessage = err.message;
      }
      
      console.error('useLanguages: Error fetching languages:', err);
      setError(errorMessage);
      
      // If we have cached data, use it as fallback
      if (languagesCache) {
        setLanguages(languagesCache);
      } else {
        setLanguages([]);
      }
    } finally {
      setLoading(false);
      fetchingRef.current = false;
    }
  };

  /**
   * Manual refetch function that bypasses cache
   */
  const refetch = async (): Promise<void> => {
    // Clear cache to force fresh fetch
    languagesCache = null;
    cacheTimestamp = null;
    
    await fetchLanguagesData();
  };

  // Fetch languages on mount
  useEffect(() => {
    fetchLanguagesData();
  }, []);

  return {
    languages,
    loading,
    error,
    refetch,
  };
}