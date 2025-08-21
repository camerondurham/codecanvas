'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import ErrorBoundary from '../ErrorBoundary';
import { getConfig, logConfig } from '@/lib/config';

// Global app context for shared state
interface AppContextType {
  theme: 'light' | 'dark' | 'auto';
  setTheme: (theme: 'light' | 'dark' | 'auto') => void;
  apiBaseUrl: string;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};

interface ProvidersProps {
  children: React.ReactNode;
}

export default function Providers({ children }: ProvidersProps) {
  const [theme, setTheme] = useState<'light' | 'dark' | 'auto'>('auto');
  
  // Get configuration
  const config = getConfig();

  // Apply theme to document
  useEffect(() => {
    const root = document.documentElement;
    
    if (theme === 'auto') {
      // Remove any manual theme classes and let CSS media queries handle it
      root.classList.remove('light-theme', 'dark-theme');
    } else {
      // Apply manual theme
      root.classList.remove('light-theme', 'dark-theme');
      root.classList.add(`${theme}-theme`);
    }
  }, [theme]);

  // Initialize application
  useEffect(() => {
    // Log configuration in development
    logConfig();

    // Initialize analytics if configured
    if (typeof window !== 'undefined' && config.analytics) {
      console.log('Analytics would be initialized here with ID:', config.analytics.id);
      // Example: Initialize your analytics service here
      // analytics.init(config.analytics.id);
    }

    // Initialize error reporting if configured
    if (typeof window !== 'undefined' && config.errorReporting) {
      console.log('Error reporting would be initialized here with DSN:', config.errorReporting.dsn);
      // Example: Initialize Sentry or other error reporting service
      // Sentry.init({ dsn: config.errorReporting.dsn });
    }
  }, [config]);

  const contextValue: AppContextType = {
    theme,
    setTheme,
    apiBaseUrl: config.apiBaseUrl,
  };

  return (
    <AppContext.Provider value={contextValue}>
      <ErrorBoundary>
        {children}
      </ErrorBoundary>
    </AppContext.Provider>
  );
}