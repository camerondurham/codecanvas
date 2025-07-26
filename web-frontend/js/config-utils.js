function getSelectedLanguage() {
  const selector = document.getElementById("lang-select");
  return selector.options[selector.selectedIndex].innerText;
}

// Environment configuration
const environments = {
  local: {
    url: "http://localhost:10100/api/v1/",
  },
  staging: {
    url: "https://runner-staging.fly.dev/api/v1/",
  },
  production: {
    url: "https://runner.fly.dev/api/v1/",
  }
};

// Environment detection logic
function detectEnvironment() {
  // Check if environment was set at build time
  if (typeof ENVIRONMENT !== 'undefined') {
    return ENVIRONMENT;
  }
  
  // Fallback to hostname-based detection
  const hostname = window.location.hostname;
  
  if (hostname === 'localhost' || hostname === '127.0.0.1') {
    return 'local';
  } else if (hostname.includes('staging')) {
    return 'staging';
  } else {
    return 'production';
  }
}

// Get current environment configuration
function getEnvironmentConfig() {
  const env = detectEnvironment();
  return environments[env] || environments.production;
}

const runnerConfig = {
  getSelectedLanguage: getSelectedLanguage,
  url: getEnvironmentConfig().url,
  runEndpoint: "run",
  langEndpoint: "languages",
  environment: detectEnvironment(),
};

// only single export per .js file allowed
// exporting this since we will need it to retrieve the current language from the document/DOM
export default runnerConfig;
