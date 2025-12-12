// API configuration and utilities for codecanvas backend

// Detect if we're running locally or in production
const getApiUrl = () => {
  // Check if running on localhost
  if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    // Check if local backend is available, otherwise use production
    return 'http://localhost:10100/api/v1/';
  }
  // Production URL
  return 'https://runner.fly.dev/api/v1/';
};

const API_BASE_URL = getApiUrl();

/**
 * Fetch available programming languages from the backend
 * @returns {Promise<string[]>} Array of language names
 */
export async function fetchLanguages() {
  try {
    const response = await fetch(`${API_BASE_URL}languages`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data.languages || [];
  } catch (error) {
    console.error('Error fetching languages:', error);
    throw error;
  }
}

/**
 * Execute code on the backend
 * @param {string} source - The source code to execute
 * @param {string} language - The programming language
 * @returns {Promise<{stdout: string, stderr: string, error: string}>}
 */
export async function runCode(source, language) {
  try {
    const response = await fetch(`${API_BASE_URL}run`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        source,
        language,
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return {
      stdout: data.stdout || '',
      stderr: data.stderr || '',
      error: data.error || '',
    };
  } catch (error) {
    console.error('Error running code:', error);
    return {
      stdout: '',
      stderr: '',
      error: `Request failed: ${error.message}`,
    };
  }
}

// Export the API URL for debugging
export { API_BASE_URL };
