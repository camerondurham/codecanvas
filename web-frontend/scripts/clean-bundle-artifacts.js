#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

function cleanBundleArtifacts() {
  const distPath = path.join(__dirname, '../dist');
  
  if (!fs.existsSync(distPath)) {
    console.log('✅ No dist directory found, nothing to clean');
    return;
  }

  try {
    // Remove the entire dist directory
    fs.rmSync(distPath, { recursive: true, force: true });
    console.log('✅ Cleaned bundle artifacts from dist directory');
  } catch (error) {
    console.error('❌ Failed to clean bundle artifacts:', error.message);
    process.exit(1);
  }
}

if (require.main === module) {
  cleanBundleArtifacts();
}

module.exports = { cleanBundleArtifacts };