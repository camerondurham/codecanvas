import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* Font loading */}
        <link
          href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
        
        {/* DNS prefetch for API domain */}
        <link rel="dns-prefetch" href="https://runner.fly.dev" />
        
        {/* Security headers */}
        <meta httpEquiv="X-Content-Type-Options" content="nosniff" />
        <meta httpEquiv="Referrer-Policy" content="strict-origin-when-cross-origin" />
        
        {/* PWA manifest (placeholder for future implementation) */}
        <link rel="manifest" href="/manifest.json" />
        
        {/* Apple touch icon */}
        <link rel="apple-touch-icon" href="/favicon.ico" />
        
        {/* Open Graph meta tags for social sharing */}
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Code Runner" />
        <meta property="og:image" content="/favicon.ico" />
        
        {/* Twitter Card meta tags */}
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:site" content="@coderunner" />
      </Head>
      <body>
        {/* Skip to main content link for accessibility */}
        <a href="#main-content" className="sr-only">
          Skip to main content
        </a>
        
        <Main />
        <NextScript />
        
        {/* No-JS fallback message */}
        <noscript>
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            backgroundColor: '#f59e0b',
            color: '#000',
            padding: '1rem',
            textAlign: 'center',
            zIndex: 9999,
            fontFamily: 'monospace'
          }}>
            This application requires JavaScript to function properly. Please enable JavaScript in your browser.
          </div>
        </noscript>
      </body>
    </Html>
  )
}