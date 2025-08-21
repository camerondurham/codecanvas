#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🚀 Starting build optimization...');

// Clean previous builds
console.log('🧹 Cleaning previous builds...');
try {
  execSync('npm run clean', { stdio: 'inherit' });
} catch (error) {
  console.warn('⚠️  Clean command failed, continuing...');
}

// Run type checking
console.log('🔍 Running type checking...');
try {
  execSync('npm run type-check', { stdio: 'inherit' });
  console.log('✅ Type checking passed');
} catch (error) {
  console.error('❌ Type checking failed');
  process.exit(1);
}

// Run linting
console.log('🔍 Running linting...');
try {
  execSync('npm run lint', { stdio: 'inherit' });
  console.log('✅ Linting passed');
} catch (error) {
  console.error('❌ Linting failed');
  process.exit(1);
}

// Run tests
console.log('🧪 Running tests...');
try {
  execSync('npm run test:ci', { stdio: 'inherit' });
  console.log('✅ Tests passed');
} catch (error) {
  console.error('❌ Tests failed');
  process.exit(1);
}

// Build the application
console.log('🏗️  Building application...');
const buildCommand = process.env.NODE_ENV === 'production' 
  ? 'npm run build:production' 
  : 'npm run build';

try {
  execSync(buildCommand, { stdio: 'inherit' });
  console.log('✅ Build completed successfully');
} catch (error) {
  console.error('❌ Build failed');
  process.exit(1);
}

// Analyze bundle if requested
if (process.env.ANALYZE === 'true') {
  console.log('📊 Running bundle analysis...');
  try {
    execSync('npm run build:analyze', { stdio: 'inherit' });
  } catch (error) {
    console.warn('⚠️  Bundle analysis failed, continuing...');
  }
}

// Generate build report
console.log('📋 Generating build report...');
const buildDir = path.join(__dirname, '..', '.next');
const reportPath = path.join(__dirname, '..', 'build-report.json');

if (fs.existsSync(buildDir)) {
  const buildInfo = {
    timestamp: new Date().toISOString(),
    nodeVersion: process.version,
    environment: process.env.NODE_ENV || 'development',
    buildSize: getBuildSize(buildDir),
    chunks: getChunkInfo(buildDir),
  };

  fs.writeFileSync(reportPath, JSON.stringify(buildInfo, null, 2));
  console.log(`📄 Build report saved to: ${reportPath}`);
}

console.log('🎉 Build optimization completed successfully!');

function getBuildSize(buildDir) {
  try {
    const stats = fs.statSync(buildDir);
    return {
      size: stats.size,
      sizeFormatted: formatBytes(stats.size),
    };
  } catch (error) {
    return { size: 0, sizeFormatted: '0 B' };
  }
}

function getChunkInfo(buildDir) {
  try {
    const staticDir = path.join(buildDir, 'static');
    if (!fs.existsSync(staticDir)) return [];

    const chunks = [];
    const jsDir = path.join(staticDir, 'chunks');
    
    if (fs.existsSync(jsDir)) {
      const files = fs.readdirSync(jsDir);
      files.forEach(file => {
        if (file.endsWith('.js')) {
          const filePath = path.join(jsDir, file);
          const stats = fs.statSync(filePath);
          chunks.push({
            name: file,
            size: stats.size,
            sizeFormatted: formatBytes(stats.size),
          });
        }
      });
    }

    return chunks.sort((a, b) => b.size - a.size);
  } catch (error) {
    return [];
  }
}

function formatBytes(bytes, decimals = 2) {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}