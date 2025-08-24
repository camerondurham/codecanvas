/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable TypeScript strict mode
  typescript: {
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    ignoreBuildErrors: false,
  },
  
  // Configure static file serving
  trailingSlash: false,
  
  // Optimize images
  images: {
    formats: ['image/webp', 'image/avif'],
  },
  
  // Security headers
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
        ],
      },
    ];
  },
  
  // Environment-specific configuration
  ...(process.env.NODE_ENV === 'production' && {
    // Production optimizations
    compress: true,
    poweredByHeader: false,
  }),
  
  // Development-specific configuration
  ...(process.env.NODE_ENV === 'development' && {
    // Development optimizations
    reactStrictMode: true,
  }),
}

module.exports = nextConfig