/**
 * TypeScript interfaces for CodeEditor component
 */

export interface CodeEditorProps {
  /** The current code value */
  value: string;
  /** Callback when code changes */
  onChange: (value: string) => void;
  /** Programming language for syntax highlighting */
  language: string;
  /** Theme name for the editor */
  theme: string;
}

export type SupportedLanguage = 
  | 'python' 
  | 'python3' 
  | 'javascript' 
  | 'js' 
  | 'node' 
  | 'nodejs' 
  | 'c++' 
  | 'cpp' 
  | 'c++11' 
  | 'rust' 
  | 'go' 
  | 'golang' 
  | 'bash' 
  | 'sh';

export type SupportedTheme = 
  | 'light' 
  | 'dark' 
  | 'onedark' 
  | 'one-dark';