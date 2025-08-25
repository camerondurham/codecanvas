import type { AppProps } from 'next/app'
import { useEffect } from 'react'
import Head from 'next/head'
import ErrorBoundary from '@/components/ErrorBoundary'
import { 
  isAnalyticsEnabled, 
  isErrorReportingEnabled, 
  logConfigInfo, 
  validateEnvironment,
  isDevelopment 
} from '@/lib/config'
import { ENV_CONFIG, APP_CONFIG } from '@/lib/constants'
import '@/styles/critical.css'
import '@/styles/globals.css'
import '@/styles/themes.css'

// Analytics integration (placeholder for future implementation)
const initializeAnalytics = () => {
  if (typeof window !== 'undefined' && isAnalyticsEnabled()) {
    // Google Analytics or other analytics initialization would go here
    console.log('Analytics initialized with ID:', ENV_CONFIG.ANALYTICS_ID)
    
    // Example: Google Analytics 4 initialization
    // gtag('config', ENV_CONFIG.ANALYTICS_ID, {
    //   page_title: APP_CONFIG.NAME,
    //   page_location: window.location.href,
    // });
  }
}

// Global error handler for unhandled promise rejections and errors
const setupGlobalErrorHandling = () => {
  if (typeof window !== 'undefined') {
    // Handle unhandled promise rejections
    window.addEventListener('unhandledrejection', (event) => {
      console.error('Unhandled promise rejection:', event.reason)
      
      // Report to error tracking service if configured
      if (isErrorReportingEnabled()) {
        // Sentry or other error reporting would go here
        console.log('Error would be reported to error tracking service')
        
        // Example: Sentry error reporting
        // Sentry.captureException(event.reason);
      }
    })

    // Handle uncaught errors
    window.addEventListener('error', (event) => {
      console.error('Uncaught error:', event.error)
      
      // Report to error tracking service if configured
      if (isErrorReportingEnabled()) {
        // Sentry or other error reporting would go here
        console.log('Error would be reported to error tracking service')
        
        // Example: Sentry error reporting
        // Sentry.captureException(event.error);
      }
    })
  }
}

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    // Validate environment configuration
    const { isValid, errors } = validateEnvironment()
    
    if (!isValid) {
      console.error('❌ Environment validation failed:', errors)
    }
    
    // Initialize analytics
    initializeAnalytics()
    
    // Set up global error handling
    setupGlobalErrorHandling()
    
    // Log configuration info in development
    if (isDevelopment()) {
      logConfigInfo()
    }
  }, [])

  return (
    <>
      <Head>
        <title>{APP_CONFIG.NAME}</title>
        <meta name="description" content={APP_CONFIG.DESCRIPTION} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#007acc" />
        <meta name="author" content={APP_CONFIG.AUTHOR} />
        <meta name="version" content={APP_CONFIG.VERSION} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <ErrorBoundary>
        <Component {...pageProps} />
      </ErrorBoundary>
    </>
  )
}