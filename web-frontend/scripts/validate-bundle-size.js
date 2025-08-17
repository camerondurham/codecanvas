#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Bundle size thresholds in bytes (244 KiB = 249,856 bytes)
const THRESHOLDS = {
  // Individual chunk thresholds
  maxChunkSize: 249856, // 244 KiB - webpack recommendation
  maxInitialBundle: 249856, // 244 KiB for initial load
  maxTotalSize: 1048576, // 1 MiB total application size
  
  // Specific bundle thresholds based on requirements
  editor: 524288, // 512 KiB for editor bundle (down from 1.06 MiB)
  index: 249856,  // 244 KiB for index bundle (down from 696 KiB)
};

function formatBytes(bytes) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KiB', 'MiB', 'GiB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

function validateBundleSize() {
  const statsPath = path.join(__dirname, '../dist/bundle-stats.json');
  
  if (!fs.existsSync(statsPath)) {
    console.error('❌ Bundle stats file not found. Run build with ANALYZE=true first.');
    process.exit(1);
  }

  const stats = JSON.parse(fs.readFileSync(statsPath, 'utf8'));
  const assets = stats.assets || [];
  
  let hasErrors = false;
  let totalSize = 0;
  const violations = [];

  console.log('📊 Bundle Size Analysis');
  console.log('='.repeat(50));

  // Analyze each asset
  assets.forEach(asset => {
    const size = asset.size;
    totalSize += size;
    
    console.log(`📦 ${asset.name}: ${formatBytes(size)}`);
    
    // Check individual chunk size
    if (size > THRESHOLDS.maxChunkSize) {
      violations.push({
        type: 'chunk',
        name: asset.name,
        size: size,
        threshold: THRESHOLDS.maxChunkSize,
        message: `Chunk ${asset.name} (${formatBytes(size)}) exceeds maximum chunk size (${formatBytes(THRESHOLDS.maxChunkSize)})`
      });
      hasErrors = true;
    }
    
    // Check specific bundle thresholds
    if (asset.name.includes('editor') && size > THRESHOLDS.editor) {
      violations.push({
        type: 'editor',
        name: asset.name,
        size: size,
        threshold: THRESHOLDS.editor,
        message: `Editor bundle ${asset.name} (${formatBytes(size)}) exceeds editor threshold (${formatBytes(THRESHOLDS.editor)})`
      });
      hasErrors = true;
    }
    
    if (asset.name.includes('index') && size > THRESHOLDS.index) {
      violations.push({
        type: 'index',
        name: asset.name,
        size: size,
        threshold: THRESHOLDS.index,
        message: `Index bundle ${asset.name} (${formatBytes(size)}) exceeds index threshold (${formatBytes(THRESHOLDS.index)})`
      });
      hasErrors = true;
    }
  });

  console.log('='.repeat(50));
  console.log(`📊 Total Bundle Size: ${formatBytes(totalSize)}`);
  
  // Check total size
  if (totalSize > THRESHOLDS.maxTotalSize) {
    violations.push({
      type: 'total',
      name: 'Total Bundle',
      size: totalSize,
      threshold: THRESHOLDS.maxTotalSize,
      message: `Total bundle size (${formatBytes(totalSize)}) exceeds maximum total size (${formatBytes(THRESHOLDS.maxTotalSize)})`
    });
    hasErrors = true;
  }

  if (hasErrors) {
    console.log('\n❌ Bundle Size Violations:');
    console.log('='.repeat(50));
    violations.forEach(violation => {
      console.log(`❌ ${violation.message}`);
      const percentage = ((violation.size / violation.threshold) * 100).toFixed(1);
      console.log(`   Size: ${formatBytes(violation.size)} (${percentage}% of threshold)`);
    });
    
    console.log('\n💡 Recommendations:');
    console.log('- Implement code splitting for large chunks');
    console.log('- Use dynamic imports for non-critical code');
    console.log('- Enable tree shaking for unused code elimination');
    console.log('- Consider lazy loading for editor components');
    
    process.exit(1);
  } else {
    console.log('\n✅ All bundle sizes are within acceptable thresholds!');
    console.log(`✅ Total size: ${formatBytes(totalSize)} (${((totalSize / THRESHOLDS.maxTotalSize) * 100).toFixed(1)}% of limit)`);
  }
}

// Export thresholds for use in other scripts
module.exports = { THRESHOLDS, validateBundleSize, formatBytes };

// Run validation if called directly
if (require.main === module) {
  validateBundleSize();
}