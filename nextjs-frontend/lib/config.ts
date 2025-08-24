/**
 * Configuration utilities and environment helpers
 */

import { ENV_CONFIG, FEATURE_FLAGS } from './constants';

/**
 * Check if the application is running in development mode
 */
export const isDevelopment = (): boolean => {
  return ENV_CONFIG.NODE_ENV === 'development';
};

/**
 * Check if the application is running in production mode
 */
export const isProduction = (): boolean => {
  return ENV_CONFIG.NODE_ENV === 'production';
};

/**
 * Check if debug mode is enabled
 */
export const isDebugMode = (): boolean => {
  return FEATURE_FLAGS.DEBUG_MODE;
};

/**
 * Get the current environment name
 */
export const getEnvironment = (): string => {
  return ENV_CONFIG.APP_ENV;
};

/**
 * Check if analytics is enabled
 */
export const isAnalyticsEnabled = (): boolean => {
  return FEATURE_FLAGS.ANALYTICS_ENABLED;
};

/**
 * Check if error reporting is enabled
 */
export const isErrorReportingEnabled = (): boolean => {
  return FEATURE_FLAGS.ERROR_REPORTING_ENABLED;
};

/**
 * Log configuration info (development only)
 */
export const logConfigInfo = (): void => {
  if (isDevelopment() && typeof window !== 'undefined') {
    console.group('🔧 Application Configuration');
    console.log('Environment:', getEnvironment());
    console.log('Debug Mode:', isDebugMode());
    console.log('Analytics Enabled:', isAnalyticsEnabled());
    console.log('Error Reporting Enabled:', isErrorReportingEnabled());
    console.groupEnd();
  }
};

/**
 * Validate required environment variables
 */
export const validateEnvironment = (): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];
  
  // Check for required environment variables
  if (!process.env.NEXT_PUBLIC_API_BASE_URL && !isProduction()) {
    errors.push('NEXT_PUBLIC_API_BASE_URL is not set for development environment');
  }
  
  // Warn about missing optional configurations
  if (isProduction()) {
    if (!ENV_CONFIG.ANALYTICS_ID) {
      console.warn('⚠️ Analytics ID not configured for production');
    }
    
    if (!ENV_CONFIG.SENTRY_DSN) {
      console.warn('⚠️ Error reporting not configured for production');
    }
  }
  
  return {
    isValid: errors.length === 0,
    errors,
  };
};