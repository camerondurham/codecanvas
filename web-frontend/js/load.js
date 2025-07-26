import "codemirror/lib/codemirror.css";
import "codemirror/theme/material.css";
import "codemirror/theme/neat.css";
import "codemirror/mode/xml/xml";
import "codemirror/mode/javascript/javascript";
import "codemirror/mode/python/python";
import "codemirror/mode/shell/shell";
import "codemirror/mode/go/go";
import "codemirror/mode/clike/clike";
import "codemirror/mode/rust/rust";

// other themes
import "codemirror/theme/3024-day.css";
import "codemirror/theme/3024-night.css";
import "codemirror/theme/blackboard.css";
import "codemirror/theme/darcula.css";
import "codemirror/theme/dracula.css";
import "codemirror/theme/eclipse.css";
import "codemirror/theme/elegant.css";
import "codemirror/theme/erlang-dark.css";
import "codemirror/theme/idea.css";
import "codemirror/theme/isotope.css";
import "codemirror/theme/midnight.css";
import "codemirror/theme/lucario.css";
import "codemirror/theme/material.css";
import "codemirror/theme/monokai.css";
import "codemirror/theme/solarized.css";

import "../style/main.css";
import runCall from "./run-request";
import codeMirror from "./editor";
import langRequest from "./langs-request";
import runnerConfig from "./config-utils";
import setLang from "./set-code";

var langs;

codeMirror.setValue(
  "def fibonacci(n):\n\tif n<=1:\n\t\treturn n\n\telse:\n\t\treturn(fibonacci(n-1) + fibonacci(n-2))\n\nn = 5\n\nfibo_series = []\n\nfor i in range(0,n):\n\tfibo_series.append(fibonacci(i))\n\nprint('Hello, World from Python! Here\\'s some fibonacci numbers:')\nprint(fibo_series)"
);

langRequest()
  .then(function (result) {
    var res = JSON.parse(result);
    // uncomment for testing
    // var res = { languages: ["python3", "node", "c++11", "go"] };
    langs = res.languages;
  })
  .catch(function (err) {
    langs = ["Error!"];
    console.log("Error when fetching languages: " + err);
  })
  .finally(function () {
    var lang_menu = document.getElementById("lang-select");
    for (const lang of langs) {
      var child = document.createElement("option");
      child.innerText = lang;
      lang_menu.appendChild(child);
    }
    runnerConfig.getSelectedLanguage();
  });

function selectTheme() {
  const select = document.getElementById("theme-select");
  var theme = select.options[select.selectedIndex].textContent;
  codeMirror.setOption("theme", theme);
}

const submitBtn = document.getElementById("submit-btn");
submitBtn.addEventListener("click", runCall);

const selector = document.getElementById("theme-select");
selector.addEventListener("change", selectTheme);

const langSelector = document.getElementById("lang-select");
langSelector.addEventListener("change", setLang);

// Initialize environment selector
runnerConfig.initializeEnvironment();

// Add environment status indicator
function updateEnvironmentStatus() {
  const currentEnv = runnerConfig.getSelectedEnvironment();
  const envConfig = runnerConfig.environments[currentEnv];

  // Create or update environment status indicator
  let statusIndicator = document.getElementById("env-status");
  if (!statusIndicator) {
    statusIndicator = document.createElement("div");
    statusIndicator.id = "env-status";
    statusIndicator.style.cssText = `
      margin: 10px 0;
      padding: 5px 10px;
      border-radius: 4px;
      font-size: 12px;
      font-weight: bold;
      text-align: center;
    `;

    const selectors = document.querySelector(".selectors");
    selectors.parentNode.insertBefore(statusIndicator, selectors.nextSibling);
  }

  // Update status indicator with API URL
  statusIndicator.innerHTML = `
    <strong>Environment:</strong> ${envConfig.name}<br>
    <small>${envConfig.description}</small><br>
    <small><strong>API:</strong> ${envConfig.url}</small>
  `;

  // Color coding for different environments
  if (currentEnv === 'local') {
    statusIndicator.style.backgroundColor = '#e3f2fd';
    statusIndicator.style.color = '#1976d2';
    statusIndicator.style.border = '1px solid #bbdefb';
  } else if (currentEnv === 'staging') {
    statusIndicator.style.backgroundColor = '#fff3e0';
    statusIndicator.style.color = '#f57c00';
    statusIndicator.style.border = '1px solid #ffcc02';
  } else {
    statusIndicator.style.backgroundColor = '#e8f5e8';
    statusIndicator.style.color = '#2e7d32';
    statusIndicator.style.border = '1px solid #c8e6c9';
  }
}

// Optional: Add environment health check
async function checkEnvironmentHealth(env) {
  try {
    const response = await fetch(runnerConfig.environments[env].url + 'health', {
      method: 'GET',
      timeout: 5000
    });
    return response.ok;
  } catch (error) {
    return false;
  }
}

// Listen for environment changes
document.addEventListener('environmentChanged', updateEnvironmentStatus);

// Initial status update
updateEnvironmentStatus();
