// API Configuration and Constants

// Environment Configuration
export const ENV_CONFIG = {
  NODE_ENV: process.env.NODE_ENV || 'development',
  APP_ENV: process.env.NEXT_PUBLIC_APP_ENV || 'development',
  DEBUG_MODE: process.env.NEXT_PUBLIC_DEBUG_MODE === 'true',
  ANALYTICS_ID: process.env.NEXT_PUBLIC_ANALYTICS_ID,
  SENTRY_DSN: process.env.NEXT_PUBLIC_SENTRY_DSN,
} as const;

// API Base URLs with fallback logic
export const API_BASE_URL = (() => {
  const customUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  const defaultUrl = process.env.NODE_ENV === 'production'
    ? 'https://runner.fly.dev/api/v1'
    : 'http://localhost:10100/api/v1';
  
  const finalUrl = customUrl || defaultUrl;
  
  // Log API configuration in development
  if (typeof window !== 'undefined' && ENV_CONFIG.DEBUG_MODE) {
    console.log('🔗 API Configuration:', {
      baseUrl: finalUrl,
      environment: ENV_CONFIG.NODE_ENV,
      appEnv: ENV_CONFIG.APP_ENV,
      customUrl: customUrl ? 'Yes' : 'No'
    });
  }
  
  return finalUrl;
})();

// API Endpoints
export const API_ENDPOINTS = {
  LANGUAGES: '/languages',
  RUN: '/run',
} as const;

// Default Configuration
export const DEFAULT_CONFIG = {
  LANGUAGE: 'python3',
  THEME: 'default',
  EDITOR_OPTIONS: {
    lineNumbers: true,
    autoFocus: true,
    indentUnit: 2,
    tabSize: 2,
  },
} as const;

// CodeMirror Theme Options
export const CODEMIRROR_THEMES = [
  'default',
  '3024-day',
  '3024-night',
  'blackboard',
  'darcula',
  'dracula',
  'eclipse',
  'elegant',
  'erlang-dark',
  'idea',
  'isotope',
  'lucario',
  'material',
  'monokai',
  'solarized',
] as const;

export type CodeMirrorTheme = typeof CODEMIRROR_THEMES[number];

// Application Configuration
export const APP_CONFIG = {
  NAME: 'Code Runner',
  DESCRIPTION: 'Online code runner with syntax highlighting and multiple language support',
  VERSION: '1.0.0',
  AUTHOR: 'Code Runner Team',
} as const;

// Feature Flags
export const FEATURE_FLAGS = {
  ANALYTICS_ENABLED: Boolean(ENV_CONFIG.ANALYTICS_ID),
  ERROR_REPORTING_ENABLED: Boolean(ENV_CONFIG.SENTRY_DSN),
  DEBUG_MODE: ENV_CONFIG.DEBUG_MODE,
} as const;