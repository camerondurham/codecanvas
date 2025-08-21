/**
 * API Configuration and Constants
 */

// API Base URLs
export const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? 'https://runner.fly.dev/api/v1'
  : process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:10100/api/v1';

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
  'dark',
] as const;

export type CodeMirrorTheme = typeof CODEMIRROR_THEMES[number];