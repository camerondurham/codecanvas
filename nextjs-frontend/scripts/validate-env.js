#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Load environment variables from .env files
function loadEnvFile(filePath) {
  if (fs.existsSync(filePath)) {
    const content = fs.readFileSync(filePath, 'utf8');
    content.split('\n').forEach(line => {
      const match = line.match(/^([^#][^=]*?)=(.*)$/);
      if (match) {
        const [, key, value] = match;
        if (!process.env[key.trim()]) {
          process.env[key.trim()] = value.trim();
        }
      }
    });
  }
}

// Load environment files in order of precedence
loadEnvFile('.env.local');
loadEnvFile('.env.production');
loadEnvFile('.env');

// Required environment variables for production
const REQUIRED_VARS = [
  'NEXT_PUBLIC_API_BASE_URL',
  'NEXT_PUBLIC_APP_ENV'
];

// Optional environment variables
const OPTIONAL_VARS = [
  'NEXT_PUBLIC_ANALYTICS_ID',
  'NEXT_PUBLIC_SENTRY_DSN'
];

console.log('🔍 Validating environment configuration...');

let hasErrors = false;
const warnings = [];

// Check required variables
REQUIRED_VARS.forEach(varName => {
  const value = process.env[varName];
  if (!value) {
    console.error(`❌ Missing required environment variable: ${varName}`);
    hasErrors = true;
  } else {
    console.log(`✅ ${varName}: ${value}`);
  }
});

// Check optional variables
OPTIONAL_VARS.forEach(varName => {
  const value = process.env[varName];
  if (!value) {
    warnings.push(`⚠️  Optional environment variable not set: ${varName}`);
  } else {
    console.log(`✅ ${varName}: ${value.substring(0, 20)}...`);
  }
});

// Validate API URL format
const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
if (apiUrl) {
  try {
    new URL(apiUrl);
    if (!apiUrl.endsWith('/api/v1')) {
      warnings.push(`⚠️  API URL should end with '/api/v1': ${apiUrl}`);
    }
  } catch (error) {
    console.error(`❌ Invalid API URL format: ${apiUrl}`);
    hasErrors = true;
  }
}

// Validate environment value
const appEnv = process.env.NEXT_PUBLIC_APP_ENV;
if (appEnv && !['development', 'staging', 'production'].includes(appEnv)) {
  console.error(`❌ Invalid APP_ENV value: ${appEnv}. Must be one of: development, staging, production`);
  hasErrors = true;
}

// Check for .env files
const envFiles = ['.env.local', '.env.production', '.env.example'];
envFiles.forEach(file => {
  if (fs.existsSync(file)) {
    console.log(`📄 Found environment file: ${file}`);
  }
});

// Show warnings
if (warnings.length > 0) {
  console.log('\nWarnings:');
  warnings.forEach(warning => console.log(warning));
}

// Final result
if (hasErrors) {
  console.error('\n❌ Environment validation failed!');
  process.exit(1);
} else {
  console.log('\n✅ Environment validation passed!');
  
  // Generate environment report
  const report = {
    timestamp: new Date().toISOString(),
    environment: appEnv || 'unknown',
    apiUrl: apiUrl || 'not set',
    requiredVars: REQUIRED_VARS.reduce((acc, varName) => {
      acc[varName] = !!process.env[varName];
      return acc;
    }, {}),
    optionalVars: OPTIONAL_VARS.reduce((acc, varName) => {
      acc[varName] = !!process.env[varName];
      return acc;
    }, {}),
    warnings: warnings.length
  };
  
  fs.writeFileSync('env-validation-report.json', JSON.stringify(report, null, 2));
  console.log('📋 Environment report saved to: env-validation-report.json');
}