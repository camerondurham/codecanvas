#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const { formatBytes } = require('./validate-bundle-size');

function generateBundleReport() {
  console.log('🔍 Generating bundle analysis report...');
  
  try {
    // Build with analysis enabled
    console.log('📦 Building with bundle analysis...');
    execSync('npm run build:analyze', { stdio: 'inherit', cwd: __dirname + '/..' });
    
    // Check if report was generated
    const reportPath = path.join(__dirname, '../dist/bundle-report.html');
    const statsPath = path.join(__dirname, '../dist/bundle-stats.json');
    
    if (fs.existsSync(reportPath)) {
      console.log(`✅ Bundle report generated: ${reportPath}`);
    }
    
    if (fs.existsSync(statsPath)) {
      console.log(`✅ Bundle stats generated: ${statsPath}`);
      
      // Display quick summary
      const stats = JSON.parse(fs.readFileSync(statsPath, 'utf8'));
      const assets = stats.assets || [];
      
      console.log('\n📊 Bundle Summary:');
      console.log('='.repeat(40));
      
      let totalSize = 0;
      assets.forEach(asset => {
        totalSize += asset.size;
        console.log(`  ${asset.name}: ${formatBytes(asset.size)}`);
      });
      
      console.log('='.repeat(40));
      console.log(`  Total: ${formatBytes(totalSize)}`);
      
      // Show largest chunks
      const sortedAssets = assets.sort((a, b) => b.size - a.size);
      console.log('\n🔍 Largest Chunks:');
      sortedAssets.slice(0, 3).forEach((asset, index) => {
        console.log(`  ${index + 1}. ${asset.name}: ${formatBytes(asset.size)}`);
      });
    }
    
    console.log('\n💡 Next steps:');
    console.log('- Open bundle-report.html in your browser for detailed analysis');
    console.log('- Run "npm run validate-bundle" to check size thresholds');
    
  } catch (error) {
    console.error('❌ Failed to generate bundle analysis:', error.message);
    process.exit(1);
  }
}

if (require.main === module) {
  generateBundleReport();
}

module.exports = { generateBundleReport };