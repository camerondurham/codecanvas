import React from 'react';
import styles from './OutputDisplay.module.css';

export interface OutputDisplayProps {
  output: {
    stdout: string;
    stderr: string;
    error: string;
  } | null;
  loading: boolean;
}

const OutputDisplay: React.FC<OutputDisplayProps> = ({ output, loading }) => {
  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.loadingContainer} role="status" aria-live="polite">
          <div className={styles.loadingSpinner} aria-hidden="true"></div>
          <span className={styles.loadingText}>Executing code...</span>
        </div>
      </div>
    );
  }

  const formatOutput = (value: string | undefined | null): string => {
    if (!value || value.trim() === '') {
      return 'none';
    }
    return value;
  };

  return (
    <div className={styles.container}>
      <div className={styles.section}>
        <div className={styles.label}>stdout:</div>
        <pre 
          className={styles.output}
          aria-live="polite"
          role="log"
          aria-label="stdout output"
        >
          {formatOutput(output?.stdout)}
        </pre>
      </div>
      
      <div className={styles.section}>
        <div className={styles.label}>stderr:</div>
        <pre 
          className={styles.output}
          aria-live="polite"
          role="log"
          aria-label="stderr output"
        >
          {formatOutput(output?.stderr)}
        </pre>
      </div>
      
      <div className={styles.section}>
        <div className={styles.label}>error:</div>
        <pre 
          className={styles.output}
          aria-live="polite"
          role="log"
          aria-label="error output"
        >
          {formatOutput(output?.error)}
        </pre>
      </div>
    </div>
  );
};

export default OutputDisplay;