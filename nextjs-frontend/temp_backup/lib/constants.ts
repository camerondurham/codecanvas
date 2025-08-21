/**
 * API endpoints and configuration constants
 */

// API Configuration
export const API_CONFIG = {
  BASE_URL: process.env.NODE_ENV === 'production' 
    ? 'https://runner.fly.dev/api/v1' 
    : 'http://localhost:10100/api/v1',
  ENDPOINTS: {
    LANGUAGES: '/languages',
    RUN: '/run',
  },
} as const;

// Default application settings
export const APP_DEFAULTS = {
  LANGUAGE: 'python3',
  THEME: 'default',
} as const;

// CodeMirror themes available
export const CODEMIRROR_THEMES = [
  'default',
  'dark',
  'material',
  'monokai',
  'solarized-light',
  'solarized-dark',
  'dracula',
  'github-light',
  'github-dark',
] as const;

// Language mode mappings for CodeMirror
export const LANGUAGE_MODES = {
  'python3': 'python',
  'python': 'python',
  'node': 'javascript',
  'nodejs': 'javascript',
  'js': 'javascript',
  'javascript': 'javascript',
  'c++': 'cpp',
  'cpp': 'cpp',
  'c++11': 'cpp',
  'go': 'go',
  'golang': 'go',
  'bash': 'shell',
  'sh': 'shell',
  'rust': 'rust',
} as const;

export type Language = keyof typeof LANGUAGE_MODES;
export type Theme = typeof CODEMIRROR_THEMES[number];