/**
 * Configuration utilities for the application
 */

/**
 * Get the API base URL from environment variables or default
 */
export function getApiBaseUrl(): string {
  // Check for Next.js public environment variable first
  if (typeof window !== 'undefined' && process.env.NEXT_PUBLIC_API_BASE_URL) {
    return process.env.NEXT_PUBLIC_API_BASE_URL;
  }
  
  // Server-side or fallback
  return process.env.NEXT_PUBLIC_API_BASE_URL || 'https://runner.fly.dev/api/v1';
}

/**
 * Check if we're in development mode
 */
export function isDevelopment(): boolean {
  return process.env.NODE_ENV === 'development';
}

/**
 * Check if we're in production mode
 */
export function isProduction(): boolean {
  return process.env.NODE_ENV === 'production';
}