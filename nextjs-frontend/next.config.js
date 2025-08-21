/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    // Enable CSS Modules
    cssModules: true,
  },
  // CSS Modules configuration
  cssModules: {
    localIdentName: '[name]__[local]___[hash:base64:5]',
  },
  // Enable TypeScript strict mode
  typescript: {
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    ignoreBuildErrors: false,
  },
  // Optimize for production
  swcMinify: true,
  // Configure static file serving
  trailingSlash: false,
  // Environment variables
  env: {
    API_BASE_URL: process.env.API_BASE_URL || 'https://runner.fly.dev/api/v1',
  },
}

module.exports = nextConfig