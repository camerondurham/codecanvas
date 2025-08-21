import { LANGUAGE_MODES, CODEMIRROR_THEMES, type Language, type Theme } from './constants';

/**
 * Language mode mapping utilities
 */

/**
 * Get CodeMirror mode for a given language
 */
export function getLanguageMode(language: string): string {
  const normalizedLanguage = language.toLowerCase();
  return LANGUAGE_MODES[normalizedLanguage as Language] || 'text';
}

/**
 * Check if a language is supported
 */
export function isLanguageSupported(language: string): boolean {
  const normalizedLanguage = language.toLowerCase();
  return normalizedLanguage in LANGUAGE_MODES;
}

/**
 * Get all supported languages
 */
export function getSupportedLanguages(): string[] {
  return Object.keys(LANGUAGE_MODES);
}

/**
 * Theme handling utilities
 */

/**
 * Check if a theme is valid
 */
export function isValidTheme(theme: string): theme is Theme {
  return CODEMIRROR_THEMES.includes(theme as Theme);
}

/**
 * Get all available themes
 */
export function getAvailableThemes(): readonly Theme[] {
  return CODEMIRROR_THEMES;
}

/**
 * Get theme with fallback to default
 */
export function getThemeWithFallback(theme: string): Theme {
  return isValidTheme(theme) ? theme : 'default';
}

/**
 * Detect system theme preference
 */
export function getSystemThemePreference(): 'light' | 'dark' {
  if (typeof window === 'undefined') {
    return 'light'; // Default for SSR
  }
  
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

/**
 * Get recommended theme based on system preference
 */
export function getRecommendedTheme(): Theme {
  const systemPreference = getSystemThemePreference();
  return systemPreference === 'dark' ? 'dark' : 'default';
}

/**
 * General utility functions
 */

/**
 * Debounce function for performance optimization
 */
export function debounce<T extends (...args: unknown[]) => unknown>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

/**
 * Safe JSON parse with fallback
 */
export function safeJsonParse<T>(json: string, fallback: T): T {
  try {
    return JSON.parse(json);
  } catch {
    return fallback;
  }
}

/**
 * Format output text for display
 */
export function formatOutput(output: string | null | undefined): string {
  if (!output || output.trim() === '') {
    return 'none';
  }
  return output;
}

/**
 * Capitalize first letter of a string
 */
export function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}