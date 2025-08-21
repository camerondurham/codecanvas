import Link from 'next/link';
import styles from './not-found.module.css';

export default function NotFound() {
  return (
    <div className={styles.notFoundContainer}>
      <div className={styles.notFoundContent}>
        <h1>404</h1>
        <h2>Page Not Found</h2>
        <p>
          The page you are looking for doesn&apos;t exist or has been moved.
        </p>
        <Link href="/" className={styles.homeLink}>
          Return to Code Runner
        </Link>
      </div>
    </div>
  );
}