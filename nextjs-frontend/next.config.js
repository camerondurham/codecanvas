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
  // Environment variables
  env: {
    API_BASE_URL: process.env.API_BASE_URL || 'https://runner.fly.dev/api/v1',
  },
}

module.exports = nextConfig