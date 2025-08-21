/**
 * Application configuration utilities
 * Centralizes environment variable access and validation
 */

export interface AppConfig {
  apiBaseUrl: string;
  appEnv: 'development' | 'production' | 'test';
  isDevelopment: boolean;
  isProduction: boolean;
  isTest: boolean;
  analytics?: {
    id: string;
  };
  errorReporting?: {
    dsn: string;
  };
}

/**
 * Get application configuration from environment variables
 */
export function getConfig(): AppConfig {
  const appEnv = (process.env.NEXT_PUBLIC_APP_ENV || 'development') as AppConfig['appEnv'];
  
  // Validate API base URL
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  if (!apiBaseUrl) {
    throw new Error('NEXT_PUBLIC_API_BASE_URL environment variable is required');
  }

  // Validate URL format
  try {
    new URL(apiBaseUrl);
  } catch (error) {
    throw new Error(`Invalid NEXT_PUBLIC_API_BASE_URL: ${apiBaseUrl}`);
  }

  const config: AppConfig = {
    apiBaseUrl,
    appEnv,
    isDevelopment: appEnv === 'development',
    isProduction: appEnv === 'production',
    isTest: appEnv === 'test',
  };

  // Optional analytics configuration
  if (process.env.NEXT_PUBLIC_ANALYTICS_ID) {
    config.analytics = {
      id: process.env.NEXT_PUBLIC_ANALYTICS_ID,
    };
  }

  // Optional error reporting configuration
  if (process.env.NEXT_PUBLIC_SENTRY_DSN) {
    config.errorReporting = {
      dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
    };
  }

  return config;
}

/**
 * Get API base URL with validation
 */
export function getApiBaseUrl(): string {
  return getConfig().apiBaseUrl;
}

/**
 * Check if running in development mode
 */
export function isDevelopment(): boolean {
  return getConfig().isDevelopment;
}

/**
 * Check if running in production mode
 */
export function isProduction(): boolean {
  return getConfig().isProduction;
}

/**
 * Log configuration info (development only)
 */
export function logConfig(): void {
  if (isDevelopment()) {
    const config = getConfig();
    console.log('App Configuration:', {
      appEnv: config.appEnv,
      apiBaseUrl: config.apiBaseUrl,
      hasAnalytics: !!config.analytics,
      hasErrorReporting: !!config.errorReporting,
    });
  }
}