import React from 'react';
import styles from './Layout.module.css';

interface LayoutProps {
  children: React.ReactNode;
  title?: string;
}

export default function Layout({ children, title = "Code Runner" }: LayoutProps) {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>{title}</h1>
      </header>
      
      <main className={styles.main}>
        <div className={styles.wrapper}>
          {children}
        </div>
      </main>
      
      <footer className={styles.footer}>
        <p>Code Runner - Execute code in multiple languages</p>
      </footer>
    </div>
  );
}