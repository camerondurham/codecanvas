function getSelectedLanguage() {
  const selector = document.getElementById("lang-select");
  return selector.options[selector.selectedIndex].innerText;
}

// Environment configuration
const environments = {
  local: {
    url: "http://localhost:10100/api/v1/",
    name: "Local Development",
    description: "Local development server"
  },
  staging: {
    url: "https://runner-staging.fly.dev/api/v1/",
    name: "Staging",
    description: "Pre-production testing environment"
  },
  production: {
    url: "https://runner.fly.dev/api/v1/",
    name: "Production",
    description: "Live production environment"
  }
};

// Current environment state
let currentEnvironment = 'production'; // Default to production

// Environment detection logic (fallback for initial load)
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

// Get selected environment from dropdown
function getSelectedEnvironment() {
  const selector = document.getElementById("env-select");
  if (selector) {
    return selector.value;
  }
  return detectEnvironment();
}

// Set environment and update configuration
function setEnvironment(env) {
  if (environments[env]) {
    currentEnvironment = env;
    
    // Update dropdown if it exists
    const selector = document.getElementById("env-select");
    if (selector) {
      selector.value = env;
    }
    
    // Update the runnerConfig URL
    runnerConfig.url = environments[env].url;
    runnerConfig.environment = env;
    
    // Trigger environment change event
    const event = new CustomEvent('environmentChanged', { 
      detail: { 
        environment: env, 
        config: environments[env] 
      } 
    });
    document.dispatchEvent(event);
  }
}

// Get current environment configuration
function getEnvironmentConfig() {
  const env = getSelectedEnvironment();
  return environments[env] || environments.production;
}

// Initialize environment on page load
function initializeEnvironment() {
  const detectedEnv = detectEnvironment();
  setEnvironment(detectedEnv);
  
  // Set up environment selector change handler
  const selector = document.getElementById("env-select");
  if (selector) {
    selector.addEventListener('change', function() {
      setEnvironment(this.value);
    });
  }
}

const runnerConfig = {
  getSelectedLanguage: getSelectedLanguage,
  get url() {
    return getEnvironmentConfig().url;
  },
  runEndpoint: "run",
  langEndpoint: "languages",
  get environment() {
    return getSelectedEnvironment();
  },
  setEnvironment: setEnvironment,
  getSelectedEnvironment: getSelectedEnvironment,
  initializeEnvironment: initializeEnvironment,
  environments: environments
};

// only single export per .js file allowed
// exporting this since we will need it to retrieve the current language from the document/DOM
export default runnerConfig;
