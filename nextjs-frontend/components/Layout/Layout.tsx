import React from 'react';
import Head from 'next/head';
import styles from './Layout.module.css';

interface LayoutProps {
  children: React.ReactNode;
  title?: string;
}

const Layout: React.FC<LayoutProps> = ({ 
  children, 
  title = 'Code Canvas' 
}) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content="Code runner application with syntax highlighting and multiple language support" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <div className={styles.container}>
        <header className={styles.header}>
          <h1 className={styles.title}>{title}</h1>
        </header>
        
        <main className={styles.main}>
          {children}
        </main>
        
        <footer className={styles.footer}>
          <p>
            {title} project.{' '}
            <a 
              href="https://github.com/camerondurham/codecanvas"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.link}
            >
              source code
            </a>
          </p>
        </footer>
      </div>
    </>
  );
};

export default Layout;