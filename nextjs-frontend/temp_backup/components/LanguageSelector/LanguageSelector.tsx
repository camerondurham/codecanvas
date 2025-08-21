import React from 'react';
import styles from './LanguageSelector.module.css';

interface LanguageSelectorProps {
  languages: string[];
  selectedLanguage: string;
  onLanguageChange: (language: string) => void;
  loading?: boolean;
}

export default function LanguageSelector({
  languages,
  selectedLanguage,
  onLanguageChange,
  loading = false
}: LanguageSelectorProps) {
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onLanguageChange(event.target.value);
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
        onChange={handleChange}
        disabled={loading}
      >
        {loading ? (
          <option value="">Loading...</option>
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
    </div>
  );
}