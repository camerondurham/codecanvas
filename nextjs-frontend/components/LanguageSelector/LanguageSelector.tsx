import React from 'react';
import styles from './LanguageSelector.module.css';

interface LanguageSelectorProps {
  languages: string[];
  selectedLanguage: string;
  onLanguageChange: (language: string) => void;
  loading?: boolean;
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  languages,
  selectedLanguage,
  onLanguageChange,
  loading = false,
}) => {
  const handleLanguageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newLanguage = event.target.value;
    onLanguageChange(newLanguage);
  };

  return (
    <div className={styles.container}>
      <label htmlFor="language-selector" className={styles.label}>
        Language:
      </label>
      <select
        id="language-selector"
        className={styles.select}
        value={selectedLanguage}
        onChange={handleLanguageChange}
        disabled={loading}
        aria-label="Select programming language"
      >
        {loading ? (
          <option value="">Loading languages...</option>
        ) : languages.length === 0 ? (
          <option value="">Error!</option>
        ) : (
          languages.map((language) => (
            <option key={language} value={language}>
              {language}
            </option>
          ))
        )}
      </select>
      {loading && (
        <div className={styles.loadingIndicator} aria-live="polite">
          <span className={styles.spinner} />
          <span className="sr-only">Loading languages...</span>
        </div>
      )}
    </div>
  );
};

export default LanguageSelector;