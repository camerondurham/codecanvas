#!/usr/bin/env node

/**
 * Script to validate that the production API endpoint is accessible
 * Usage: node scripts/validate-prod-endpoint.js
 */

const https = require('https');
const http = require('http');

const PROD_API_URL = 'https://runner.fly.dev/api/v1';

function makeRequest(url) {
  return new Promise((resolve, reject) => {
    const startTime = Date.now();
    const client = url.startsWith('https') ? https : http;
    const request = client.get(url, (response) => {
      let data = '';
      
      response.on('data', (chunk) => {
        data += chunk;
      });
      
      response.on('end', () => {
        const endTime = Date.now();
        resolve({
          statusCode: response.statusCode,
          headers: response.headers,
          data: data,
          responseTime: endTime - startTime
        });
      });
    });
    
    request.on('error', (error) => {
      reject(error);
    });
    
    request.setTimeout(10000, () => {
      request.destroy();
      reject(new Error('Request timeout'));
    });
  });
}

async function validateEndpoint() {
  console.log('🔍 Validating production API endpoint...');
  console.log(`📡 Testing: ${PROD_API_URL}`);
  console.log('');
  
  try {
    // Test basic connectivity
    const response = await makeRequest(PROD_API_URL);
    
    console.log('✅ Connection successful!');
    console.log(`📊 Status Code: ${response.statusCode}`);
    console.log(`🕒 Response Time: ${response.responseTime}ms`);
    
    if (response.statusCode === 200) {
      console.log('🎉 Production API is accessible and responding correctly');
      console.log('');
      console.log('✨ You can now run:');
      console.log('   npm run dev:prod-endpoint');
      console.log('');
      console.log('This will start your development server connected to the production API.');
    } else if (response.statusCode === 404) {
      console.log('⚠️  API endpoint returned 404 - this might be expected for the base URL');
      console.log('   The API might only respond to specific endpoints like /languages or /execute');
      console.log('');
      console.log('✨ You can still try running:');
      console.log('   npm run dev:prod-endpoint');
    } else {
      console.log(`⚠️  Unexpected status code: ${response.statusCode}`);
      console.log('   This might still work for your application');
    }
    
  } catch (error) {
    console.log('❌ Connection failed!');
    console.log(`🚨 Error: ${error.message}`);
    console.log('');
    console.log('Possible issues:');
    console.log('• No internet connection');
    console.log('• Production API server is down');
    console.log('• Firewall blocking the request');
    console.log('• DNS resolution issues');
    console.log('');
    console.log('💡 You can still develop using:');
    console.log('   npm run dev:demo    (demo mode with fallback responses)');
    console.log('   npm run dev:local   (if you have a local API server)');
  }
}

// Test languages endpoint specifically
async function testLanguagesEndpoint() {
  const languagesUrl = `${PROD_API_URL}/languages`;
  console.log('');
  console.log('🔍 Testing languages endpoint...');
  
  try {
    const response = await makeRequest(languagesUrl);
    console.log(`📡 ${languagesUrl}: ${response.statusCode}`);
    
    if (response.statusCode === 200) {
      try {
        const languages = JSON.parse(response.data);
        console.log(`✅ Found ${languages.length || 'unknown number of'} languages`);
      } catch (e) {
        console.log('✅ Languages endpoint responding (data format unknown)');
      }
    }
  } catch (error) {
    console.log(`❌ Languages endpoint failed: ${error.message}`);
  }
}

async function main() {
  await validateEndpoint();
  await testLanguagesEndpoint();
  
  console.log('');
  console.log('📚 For more development options, see: DEVELOPMENT_MODES.md');
}

if (require.main === module) {
  main();
}

module.exports = { validateEndpoint, testLanguagesEndpoint };