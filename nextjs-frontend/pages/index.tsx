import React, { useState, useEffect, useCallback } from 'react';
import { 
  Layout, 
  CodeEditor, 
  LanguageSelector, 
  ThemeSelector, 
  OutputDisplay,
  ErrorBoundary
} from '../components';
import { useLanguages } from '../hooks/useLanguages';
import { useCodeExecution } from '../hooks/useCodeExecution';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { getSampleCode } from '../lib/sampleCode';
import { getLanguageMode, getValidTheme } from '../lib/utils';
import { DEFAULT_CONFIG } from '../lib/constants';
import styles from '../styles/Home.module.css';

export default function Home() {
  // Custom hooks for API interactions
  const { languages, loading: languagesLoading, error: languagesError } = useLanguages();
  const { executeCode, output, loading: executionLoading, error: executionError } = useCodeExecution();
  
  // Local storage for persistence
  const [selectedLanguage, setSelectedLanguage] = useLocalStorage<string>('selectedLanguage', DEFAULT_CONFIG.LANGUAGE);
  const [selectedTheme, setSelectedTheme] = useLocalStorage<string>('selectedTheme', DEFAULT_CONFIG.THEME);
  const [code, setCode] = useLocalStorage<string>('editorCode', '');

  // Local state for UI
  const [isInitialized, setIsInitialized] = useState(false);

  // Debug logging can be removed in production

  // Initialize code with sample when language changes or on first load
  useEffect(() => {
    if (!isInitialized && selectedLanguage) {
      const sampleCode = getSampleCode(selectedLanguage);
      if (!code.trim()) {
        setCode(sampleCode);
      }
      setIsInitialized(true);
    }
  }, [selectedLanguage, code, setCode, isInitialized]);

  // Handle language selection change
  const handleLanguageChange = useCallback((language: string) => {
    setSelectedLanguage(language);
    
    // Load sample code for the new language
    const sampleCode = getSampleCode(language);
    setCode(sampleCode);
  }, [setSelectedLanguage, setCode]);

  // Handle theme change
  const handleThemeChange = useCallback((theme: string) => {
    const validTheme = getValidTheme(theme);
    setSelectedTheme(validTheme);
  }, [setSelectedTheme]);

  // Handle code change
  const handleCodeChange = useCallback((newCode: string) => {
    setCode(newCode);
  }, [setCode]);

  // Handle code execution
  const handleSubmit = useCallback(async () => {
    if (!code.trim()) {
      return;
    }
    
    await executeCode(code, selectedLanguage);
  }, [code, selectedLanguage, executeCode]);

  // Handle key press for submit (Ctrl+Enter or Cmd+Enter)
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key === 'Enter') {
        event.preventDefault();
        handleSubmit();
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [handleSubmit]);

  // Determine if submit should be disabled
  const isSubmitDisabled = !code.trim() || executionLoading || languagesLoading || !selectedLanguage;

  // Get current language mode for CodeMirror
  const currentLanguageMode = getLanguageMode(selectedLanguage);

  // Show loading screen while languages are loading
  if (languagesLoading) {
    return (
      <Layout title="Code Canvas">
        <div className={styles.container}>
          <div className={styles.loadingScreen}>
            <div className={styles.loadingSpinner} />
            <h2>Loading Code Canvas...</h2>
            <p>Initializing editor and loading languages...</p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout title="Code Canvas">
      <ErrorBoundary>
        <div className={styles.container}>
        {/* Header Section */}
        <header className={styles.header}>
          <h1 className={styles.title}>Code Canvas</h1>
          <p className={styles.subtitle}>
            Write, run, and test code in multiple programming languages
          </p>
        </header>

        {/* Controls Section */}
        <div className={styles.controls}>
          <div className={styles.selectors}>
            <LanguageSelector
              languages={languages}
              selectedLanguage={selectedLanguage}
              onLanguageChange={handleLanguageChange}
              loading={languagesLoading}
            />
            <ThemeSelector
              selectedTheme={selectedTheme}
              onThemeChange={handleThemeChange}
            />
          </div>
          
          {/* Error Display for Languages */}
          {languagesError && (
            <div className={styles.error} role="alert">
              <strong>Language Loading Error:</strong> {languagesError}
            </div>
          )}
        </div>

        {/* Editor Section */}
        <div className={styles.editorSection}>
          <div className={styles.editorHeader}>
            <h2>Code Editor</h2>
            <span className={styles.languageIndicator}>
              {selectedLanguage} ({currentLanguageMode})
            </span>
          </div>
          
          <ErrorBoundary fallback={
            <div className={styles.error} role="alert">
              <strong>Editor Error:</strong> The code editor failed to load. Please refresh the page.
            </div>
          }>
            <CodeEditor
              value={code}
              onChange={handleCodeChange}
              language={currentLanguageMode}
              theme={selectedTheme}
            />
          </ErrorBoundary>
          
          <div className={styles.editorFooter}>
            <button
              onClick={handleSubmit}
              disabled={isSubmitDisabled}
              className={styles.submitButton}
              type="button"
            >
              {executionLoading ? 'Running...' : 'Run Code'}
            </button>
            <span className={styles.shortcut}>
              Ctrl+Enter to run
            </span>
          </div>
        </div>

        {/* Output Section */}
        <div className={styles.outputSection}>
          <h2>Output</h2>
          
          {/* Execution Error Display */}
          {executionError && (
            <div className={styles.error} role="alert">
              <strong>Execution Error:</strong> {executionError}
            </div>
          )}
          
          <ErrorBoundary fallback={
            <div className={styles.error} role="alert">
              <strong>Output Error:</strong> The output display failed to render. Please try running your code again.
            </div>
          }>
            <OutputDisplay
              output={output}
              loading={executionLoading}
            />
          </ErrorBoundary>
        </div>
      </div>
      </ErrorBoundary>
    </Layout>
  );
}