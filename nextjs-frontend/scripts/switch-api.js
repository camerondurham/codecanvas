#!/usr/bin/env node

/**
 * Script to switch between different API configurations for development
 * Usage: node scripts/switch-api.js [local|prod|demo]
 */

const fs = require('fs');
const path = require('path');

const configs = {
  local: {
    file: '.env.local',
    content: `# Development environment variables
# This file is automatically loaded by Next.js in development

# API Configuration - Local development
NEXT_PUBLIC_API_BASE_URL=http://localhost:10100/api/v1
NEXT_PUBLIC_APP_ENV=development

# Development flags
NEXT_PUBLIC_DEBUG_MODE=true

# Optional: Analytics (disabled for development)
# NEXT_PUBLIC_ANALYTICS_ID=

# Optional: Error reporting (disabled for development)
# NEXT_PUBLIC_SENTRY_DSN=
`
  },
  prod: {
    file: '.env.local',
    content: `# Development environment with production API endpoint
# Use this for testing frontend against the production API

# API Configuration - Production endpoint
NEXT_PUBLIC_API_BASE_URL=https://runner.fly.dev/api/v1
NEXT_PUBLIC_APP_ENV=development

# Development flags
NEXT_PUBLIC_DEBUG_MODE=true

# Optional: Analytics (disabled for development)
# NEXT_PUBLIC_ANALYTICS_ID=

# Optional: Error reporting (disabled for development)
# NEXT_PUBLIC_SENTRY_DSN=
`
  },
  demo: {
    file: '.env.local',
    content: `# Development environment for demo mode (no API)
# This will trigger demo mode with fallback responses

# API Configuration - Invalid URL to trigger demo mode
NEXT_PUBLIC_API_BASE_URL=http://demo-mode-no-api
NEXT_PUBLIC_APP_ENV=development

# Development flags
NEXT_PUBLIC_DEBUG_MODE=true

# Optional: Analytics (disabled for development)
# NEXT_PUBLIC_ANALYTICS_ID=

# Optional: Error reporting (disabled for development)
# NEXT_PUBLIC_SENTRY_DSN=
`
  }
};

const mode = process.argv[2];

if (!mode || !configs[mode]) {
  console.log('Usage: node scripts/switch-api.js [local|prod|demo]');
  console.log('');
  console.log('Available modes:');
  console.log('  local - Use local API server (http://localhost:10100/api/v1)');
  console.log('  prod  - Use production API server (https://runner.fly.dev/api/v1)');
  console.log('  demo  - Force demo mode with fallback responses');
  process.exit(1);
}

const config = configs[mode];
const envPath = path.join(process.cwd(), config.file);

try {
  fs.writeFileSync(envPath, config.content);
  console.log(`✅ Switched to ${mode} mode`);
  console.log(`📝 Updated ${config.file}`);
  console.log('');
  console.log('Next steps:');
  console.log('1. Restart your development server: npm run dev');
  console.log('2. Check the console for API configuration logs');
  
  if (mode === 'local') {
    console.log('3. Make sure your local API server is running on port 10100');
  } else if (mode === 'prod') {
    console.log('3. Ensure you have internet connection for production API');
  } else if (mode === 'demo') {
    console.log('3. Application will run in demo mode with fallback responses');
  }
} catch (error) {
  console.error('❌ Failed to update environment file:', error.message);
  process.exit(1);
}