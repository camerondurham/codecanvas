import { CodeMirrorTheme, CODEMIRROR_THEMES } from './constants';

/**
 * Language to CodeMirror mode mapping
 */
const LANGUAGE_MODE_MAP: Record<string, string> = {
  // Python
  python: 'python',
  python3: 'python',
  
  // JavaScript/Node.js
  javascript: 'javascript',
  js: 'javascript',
  node: 'javascript',
  nodejs: 'javascript',
  
  // C++
  'c++': 'clike',
  cpp: 'clike',
  'c++11': 'clike',
  c: 'clike',
  
  // Go
  go: 'go',
  golang: 'go',
  
  // Shell/Bash
  bash: 'shell',
  sh: 'shell',
  shell: 'shell',
  
  // Rust
  rust: 'rust',
  rs: 'rust',
  
  // Java
  java: 'clike',
  
  // TypeScript
  typescript: 'javascript',
  ts: 'javascript',
  
  // PHP
  php: 'php',
  
  // Ruby
  ruby: 'ruby',
  rb: 'ruby',
  
  // Default fallback
  default: 'text',
};

/**
 * Map language name to CodeMirror mode
 */
export function getLanguageMode(language: string): string {
  const normalizedLanguage = language.toLowerCase();
  return LANGUAGE_MODE_MAP[normalizedLanguage] || LANGUAGE_MODE_MAP.default;
}

/**
 * Check if a theme is valid
 */
export function isValidTheme(theme: string): theme is CodeMirrorTheme {
  return CODEMIRROR_THEMES.includes(theme as CodeMirrorTheme);
}

/**
 * Get a valid theme or return default
 */
export function getValidTheme(theme: string): CodeMirrorTheme {
  return isValidTheme(theme) ? theme : 'default';
}

/**
 * Normalize language name for consistency
 */
export function normalizeLanguage(language: string): string {
  const normalized = language.toLowerCase().trim();
  
  // Handle common aliases
  const aliases: Record<string, string> = {
    'js': 'javascript',
    'py': 'python',
    'cpp': 'c++',
    'golang': 'go',
    'sh': 'bash',
    'rs': 'rust',
    'rb': 'ruby',
    'ts': 'typescript',
  };
  
  return aliases[normalized] || normalized;
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
 * Debounce function for performance optimization
 */
export function debounce<T extends (...args: any[]) => any>(
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
 * Check if we're running in the browser
 */
export function isBrowser(): boolean {
  return typeof window !== 'undefined';
}

/**
 * Safe localStorage access with SSR support
 */
export function getStorageItem(key: string, defaultValue: string = ''): string {
  if (!isBrowser()) {
    return defaultValue;
  }
  
  try {
    const item = localStorage.getItem(key);
    return item !== null ? item : defaultValue;
  } catch (error) {
    console.warn(`Failed to read from localStorage: ${error}`);
    return defaultValue;
  }
}

/**
 * Safe localStorage write with SSR support
 */
export function setStorageItem(key: string, value: string): void {
  if (!isBrowser()) {
    return;
  }
  
  try {
    localStorage.setItem(key, value);
  } catch (error) {
    console.warn(`Failed to write to localStorage: ${error}`);
  }
}

/**
 * Remove item from localStorage safely
 */
export function removeStorageItem(key: string): void {
  if (!isBrowser()) {
    return;
  }
  
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.warn(`Failed to remove from localStorage: ${error}`);
  }
}