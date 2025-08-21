import React from 'react';
import styles from './ThemeSelector.module.css';

interface ThemeSelectorProps {
  selectedTheme: string;
  onThemeChange: (theme: string) => void;
}

// Available themes that work with the current CodeEditor implementation
const AVAILABLE_THEMES = [
  { value: 'light', label: 'Light' },
  { value: 'dark', label: 'Dark' },
  { value: 'onedark', label: 'One Dark' },
] as const;

export default function ThemeSelector({
  selectedTheme,
  onThemeChange
}: ThemeSelectorProps) {
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onThemeChange(event.target.value);
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
        onChange={handleChange}
      >
        {AVAILABLE_THEMES.map((theme) => (
          <option key={theme.value} value={theme.value}>
            {theme.label}
          </option>
        ))}
      </select>
    </div>
  );
}