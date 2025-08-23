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
          <div className={styles.spinner} aria-hidden="true" />
          <span className={styles.loadingText}>Executing code...</span>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.section}>
        <label className={styles.label}>stdout:</label>
        <pre className={styles.output}>
          {output?.stdout || 'none'}
        </pre>
      </div>
      
      <div className={styles.section}>
        <label className={styles.label}>stderr:</label>
        <pre className={styles.output}>
          {output?.stderr || 'none'}
        </pre>
      </div>
      
      <div className={styles.section}>
        <label className={styles.label}>error:</label>
        <pre className={styles.output}>
          {output?.error || 'none'}
        </pre>
      </div>
    </div>
  );
};

export default OutputDisplay;