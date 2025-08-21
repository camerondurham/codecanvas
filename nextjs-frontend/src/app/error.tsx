'use client';

import { useEffect } from 'react';
import styles from './error.module.css';

interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    // Log the error to console in development
    if (process.env.NODE_ENV === 'development') {
      console.error('Global error boundary caught:', error);
    }

    // In production, you could send this to an error reporting service
    if (process.env.NODE_ENV === 'production') {
      // Example: Send to analytics or error reporting service
      // analytics.track('global_error', { 
      //   error: error.message, 
      //   digest: error.digest,
      //   stack: error.stack 
      // });
    }
  }, [error]);

  return (
    <div className={styles.errorContainer}>
      <div className={styles.errorContent}>
        <h1>Something went wrong!</h1>
        <p>
          An unexpected error occurred while loading the application. 
          This might be a temporary issue.
        </p>
        
        {process.env.NODE_ENV === 'development' && (
          <details className={styles.errorDetails}>
            <summary>Error details (development only)</summary>
            <div className={styles.errorInfo}>
              <p><strong>Message:</strong> {error.message}</p>
              {error.digest && <p><strong>Digest:</strong> {error.digest}</p>}
              {error.stack && (
                <div>
                  <strong>Stack trace:</strong>
                  <pre>{error.stack}</pre>
                </div>
              )}
            </div>
          </details>
        )}

        <div className={styles.actions}>
          <button onClick={reset} className={styles.retryButton}>
            Try again
          </button>
          <button 
            onClick={() => window.location.href = '/'}
            className={styles.homeButton}
          >
            Go to home
          </button>
        </div>
      </div>
    </div>
  );
}