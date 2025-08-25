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
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  
  // CSS optimization through compiler options
  compiler: {
    // Remove console.log in production
    removeConsole: process.env.NODE_ENV === 'production',
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
    
    // Bundle analyzer (optional, can be enabled when needed)
    // bundleAnalyzer: {
    //   enabled: process.env.ANALYZE === 'true',
    // },
  }),
  
  // Development-specific configuration
  ...(process.env.NODE_ENV === 'development' && {
    // Development optimizations
    reactStrictMode: true,
  }),
}

module.exports = nextConfig