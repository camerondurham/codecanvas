import React from 'react';
import { CODEMIRROR_THEMES } from '../../lib/constants';
import styles from './ThemeSelector.module.css';

interface ThemeSelectorProps {
  selectedTheme: string;
  onThemeChange: (theme: string) => void;
}

const ThemeSelector: React.FC<ThemeSelectorProps> = ({
  selectedTheme,
  onThemeChange,
}) => {
  const handleThemeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newTheme = event.target.value;
    onThemeChange(newTheme);
  };

  return (
    <div className={styles.container}>
      <label htmlFor="theme-selector" className={styles.label}>
        Theme:
      </label>
      <select
        id="theme-selector"
        className={styles.select}
        value={selectedTheme}
        onChange={handleThemeChange}
        aria-label="Select editor theme"
      >
        {CODEMIRROR_THEMES.map((theme) => (
          <option key={theme} value={theme}>
            {theme}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ThemeSelector;