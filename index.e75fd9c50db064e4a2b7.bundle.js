"use strict";
(self["webpackChunkrunner_web_frontend"] = self["webpackChunkrunner_web_frontend"] || []).push([["index"],{

/***/ "./js/config-utils.js":
/*!****************************!*\
  !*** ./js/config-utils.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
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
  if (true) {
    return "local";
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
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (runnerConfig);


/***/ }),

/***/ "./js/langs-request.js":
/*!*****************************!*\
  !*** ./js/langs-request.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _config_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./config-utils */ "./js/config-utils.js");


function langRequest() {
  return new Promise(function (resolve, reject) {
    let xhr = new XMLHttpRequest();
    const fullUrl = _config_utils__WEBPACK_IMPORTED_MODULE_0__["default"].url + _config_utils__WEBPACK_IMPORTED_MODULE_0__["default"].langEndpoint;
    xhr.open("GET", fullUrl);
    xhr.onload = function () {
      if (this.status >= 200 && this.status < 400) {
        resolve(xhr.response);
      } else {
        reject({
          status: this.status,
          statusText: xhr.statusText,
        });
      }
    };
    xhr.onerror = function () {
      reject({
        status: this.status,
        statusText: xhr.statusText,
      });
    };
    xhr.send();
  });
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (langRequest);


/***/ }),

/***/ "./js/load.js":
/*!********************!*\
  !*** ./js/load.js ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var codemirror_lib_codemirror_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! codemirror/lib/codemirror.css */ "./node_modules/codemirror/lib/codemirror.css");
/* harmony import */ var codemirror_theme_material_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! codemirror/theme/material.css */ "./node_modules/codemirror/theme/material.css");
/* harmony import */ var codemirror_theme_neat_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! codemirror/theme/neat.css */ "./node_modules/codemirror/theme/neat.css");
/* harmony import */ var codemirror_mode_xml_xml__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! codemirror/mode/xml/xml */ "./node_modules/codemirror/mode/xml/xml.js");
/* harmony import */ var codemirror_mode_xml_xml__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(codemirror_mode_xml_xml__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var codemirror_mode_javascript_javascript__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! codemirror/mode/javascript/javascript */ "./node_modules/codemirror/mode/javascript/javascript.js");
/* harmony import */ var codemirror_mode_javascript_javascript__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(codemirror_mode_javascript_javascript__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var codemirror_mode_python_python__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! codemirror/mode/python/python */ "./node_modules/codemirror/mode/python/python.js");
/* harmony import */ var codemirror_mode_python_python__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(codemirror_mode_python_python__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var codemirror_mode_shell_shell__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! codemirror/mode/shell/shell */ "./node_modules/codemirror/mode/shell/shell.js");
/* harmony import */ var codemirror_mode_shell_shell__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(codemirror_mode_shell_shell__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var codemirror_mode_go_go__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! codemirror/mode/go/go */ "./node_modules/codemirror/mode/go/go.js");
/* harmony import */ var codemirror_mode_go_go__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(codemirror_mode_go_go__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var codemirror_mode_clike_clike__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! codemirror/mode/clike/clike */ "./node_modules/codemirror/mode/clike/clike.js");
/* harmony import */ var codemirror_mode_clike_clike__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(codemirror_mode_clike_clike__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var codemirror_mode_rust_rust__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! codemirror/mode/rust/rust */ "./node_modules/codemirror/mode/rust/rust.js");
/* harmony import */ var codemirror_mode_rust_rust__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(codemirror_mode_rust_rust__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var codemirror_theme_3024_day_css__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! codemirror/theme/3024-day.css */ "./node_modules/codemirror/theme/3024-day.css");
/* harmony import */ var codemirror_theme_3024_night_css__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! codemirror/theme/3024-night.css */ "./node_modules/codemirror/theme/3024-night.css");
/* harmony import */ var codemirror_theme_blackboard_css__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! codemirror/theme/blackboard.css */ "./node_modules/codemirror/theme/blackboard.css");
/* harmony import */ var codemirror_theme_darcula_css__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! codemirror/theme/darcula.css */ "./node_modules/codemirror/theme/darcula.css");
/* harmony import */ var codemirror_theme_dracula_css__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! codemirror/theme/dracula.css */ "./node_modules/codemirror/theme/dracula.css");
/* harmony import */ var codemirror_theme_eclipse_css__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! codemirror/theme/eclipse.css */ "./node_modules/codemirror/theme/eclipse.css");
/* harmony import */ var codemirror_theme_elegant_css__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! codemirror/theme/elegant.css */ "./node_modules/codemirror/theme/elegant.css");
/* harmony import */ var codemirror_theme_erlang_dark_css__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! codemirror/theme/erlang-dark.css */ "./node_modules/codemirror/theme/erlang-dark.css");
/* harmony import */ var codemirror_theme_idea_css__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! codemirror/theme/idea.css */ "./node_modules/codemirror/theme/idea.css");
/* harmony import */ var codemirror_theme_isotope_css__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! codemirror/theme/isotope.css */ "./node_modules/codemirror/theme/isotope.css");
/* harmony import */ var codemirror_theme_midnight_css__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! codemirror/theme/midnight.css */ "./node_modules/codemirror/theme/midnight.css");
/* harmony import */ var codemirror_theme_lucario_css__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! codemirror/theme/lucario.css */ "./node_modules/codemirror/theme/lucario.css");
/* harmony import */ var codemirror_theme_monokai_css__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! codemirror/theme/monokai.css */ "./node_modules/codemirror/theme/monokai.css");
/* harmony import */ var codemirror_theme_solarized_css__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! codemirror/theme/solarized.css */ "./node_modules/codemirror/theme/solarized.css");
/* harmony import */ var _style_main_css__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! ../style/main.css */ "./style/main.css");
/* harmony import */ var _run_request__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! ./run-request */ "./js/run-request.js");
/* harmony import */ var _editor__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! ./editor */ "./js/editor.js");
/* harmony import */ var _langs_request__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! ./langs-request */ "./js/langs-request.js");
/* harmony import */ var _config_utils__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(/*! ./config-utils */ "./js/config-utils.js");
/* harmony import */ var _set_code__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(/*! ./set-code */ "./js/set-code.js");











// other themes























var langs;

_editor__WEBPACK_IMPORTED_MODULE_26__["default"].setValue(
      "def fibonacci(n):\n\tif n<=1:\n\t\treturn n\n\telse:\n\t\treturn(fibonacci(n-1) + fibonacci(n-2))\n\nn = 5\n\nfibo_series = []\n\nfor i in range(0,n):\n\tfibo_series.append(fibonacci(i))\n\nprint('Hello, World from Python! Here\\'s some fibonacci numbers:')\nprint(fibo_series)"
);

(0,_langs_request__WEBPACK_IMPORTED_MODULE_27__["default"])()
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
    _config_utils__WEBPACK_IMPORTED_MODULE_28__["default"].getSelectedLanguage();
  });

function selectTheme() {
  const select = document.getElementById("theme-select");
  var theme = select.options[select.selectedIndex].textContent;
  _editor__WEBPACK_IMPORTED_MODULE_26__["default"].setOption("theme", theme);
}

const submitBtn = document.getElementById("submit-btn");
submitBtn.addEventListener("click", _run_request__WEBPACK_IMPORTED_MODULE_25__["default"]);

const selector = document.getElementById("theme-select");
selector.addEventListener("change", selectTheme);

const langSelector = document.getElementById("lang-select");
langSelector.addEventListener("change", _set_code__WEBPACK_IMPORTED_MODULE_29__["default"]);

// Initialize environment selector
_config_utils__WEBPACK_IMPORTED_MODULE_28__["default"].initializeEnvironment();

// Add environment status indicator
function updateEnvironmentStatus() {
  const currentEnv = _config_utils__WEBPACK_IMPORTED_MODULE_28__["default"].getSelectedEnvironment();
  const envConfig = _config_utils__WEBPACK_IMPORTED_MODULE_28__["default"].environments[currentEnv];
  
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
    `;
    
    const selectors = document.querySelector(".selectors");
    selectors.parentNode.insertBefore(statusIndicator, selectors.nextSibling);
  }
  
  // Update status indicator
  statusIndicator.textContent = `Environment: ${envConfig.name} - ${envConfig.description}`;
  
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

// Listen for environment changes
document.addEventListener('environmentChanged', updateEnvironmentStatus);

// Initial status update
updateEnvironmentStatus();


/***/ }),

/***/ "./js/run-request.js":
/*!***************************!*\
  !*** ./js/run-request.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _editor__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./editor */ "./js/editor.js");
/* harmony import */ var _config_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./config-utils */ "./js/config-utils.js");
/* harmony import */ var codemirror_lib_codemirror_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! codemirror/lib/codemirror.css */ "./node_modules/codemirror/lib/codemirror.css");




function runRequest() {
  return new Promise(function(resolve, reject) {
    var req = {
      source: _editor__WEBPACK_IMPORTED_MODULE_0__["default"].getValue(),
      language: _config_utils__WEBPACK_IMPORTED_MODULE_1__["default"].getSelectedLanguage(),
    };
    let xhr = new XMLHttpRequest();
    const fullUrl = _config_utils__WEBPACK_IMPORTED_MODULE_1__["default"].url + _config_utils__WEBPACK_IMPORTED_MODULE_1__["default"].runEndpoint;
    xhr.open("POST", fullUrl);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onload = function() {
      if (this.status >= 200 && this.status < 400) {
        resolve(xhr.response);
      } else {
        reject({
          status: this.status,
          statusText: xhr.statusText,
          body: xhr.response
        });
      }
    };
    xhr.onerror = function() {
      reject({
        status: this.status,
        statusText: xhr.statusText,
        body: xhr.response
      });
    };
    xhr.send(JSON.stringify(req));
  });
}

function stringify(obj) {
  const SEP = ", ";
  const EMPTY_TEXT = "none";

  if (obj === null) return EMPTY_TEXT;

  let inner = "";
  const keys = Object.keys(obj);
  keys.forEach((key, i) => {
    if (obj[key] === null) {
      return;
    }

    inner += key + ": " + String(obj[key]);

    if (i < keys.length - 1) inner += SEP;
  });

  if (inner == "") inner = EMPTY_TEXT;

  return inner;
}

async function runCall() {
  let stdout = document.getElementById("stdout-field");
  let stderr = document.getElementById("stderr-field");
  let error = document.getElementById("err-field");


  await runRequest()
    .then(function(result) {
      let out = JSON.parse(result);


      stdout.innerHTML =
        "<pre>Stdout: " + out["stdout"] + "</pre>";
      stdout.removeAttribute("hidden");

      stderr.innerHTML =
        "<pre>Stderr: " + out["stderr"] + "</pre>";
      stderr.removeAttribute("hidden");

      error.innerHTML = "<pre>Error: " + out["error"] + "</pre>";
    })
    .catch(function(err) {
      console.log(err);
      stdout.setAttribute("hidden", true);
      stderr.setAttribute("hidden", true);
      error.innerHTML = "<pre>Error: " + stringify(err) + "</pre>";
    });
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (runCall);


/***/ }),

/***/ "./js/set-code.js":
/*!************************!*\
  !*** ./js/set-code.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _editor__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./editor */ "./js/editor.js");


function setLang() {
  const selector = document.getElementById("lang-select");
  const lang = selector.options[selector.selectedIndex].innerText;
  if (lang === "python3" || lang === "python") {
    _editor__WEBPACK_IMPORTED_MODULE_0__["default"].setOption("mode", "python")
    _editor__WEBPACK_IMPORTED_MODULE_0__["default"].setValue(
      "def fibonacci(n):\n\tif n<=1:\n\t\treturn n\n\telse:\n\t\treturn(fibonacci(n-1) + fibonacci(n-2))\n\nn = 5\n\nfibo_series = []\n\nfor i in range(0,n):\n\tfibo_series.append(fibonacci(i))\n\nprint('Hello, World from Python! Here\\'s some fibonacci numbers:')\nprint(fibo_series)"
    );
  } else if (
    lang === "node" ||
    lang === "nodejs" ||
    lang === "js" ||
    lang === "javascript"
  ) {
    _editor__WEBPACK_IMPORTED_MODULE_0__["default"].setOption("mode", "javascript");
    _editor__WEBPACK_IMPORTED_MODULE_0__["default"].setValue('const { exec } = require("child_process");\n\nconsole.log("Hello world from Node.js! My uptime is:");\n\nexec("uptime", (error, stdout, stderr) => {\n\tif (error) {\n\t\tconsole.log(`error: ${error.message}`);\n\t\treturn;\n}\n\tif (stderr) {\n\t\tconsole.log(`stderr: ${stderr}`);\n\t\treturn;\n\t}\n\t\tconsole.log(`stdout: ${stdout}`);\n});');
  } else if (lang === "c++" || lang === "cpp" || lang === "c++11") {
    _editor__WEBPACK_IMPORTED_MODULE_0__["default"].setOption("mode", "clike");
    _editor__WEBPACK_IMPORTED_MODULE_0__["default"].setValue(
      `#include<iostream>
#include<thread>
int main() {
	unsigned int nthreads = std::thread::hardware_concurrency();
	std::cout << "hello world from C++!" << std::endl;
	std::cerr << "I have " << nthreads << " threads!" << std::endl;
	return 0;
}`
    );
  } else if (lang === "go" || lang === "golang") {
    _editor__WEBPACK_IMPORTED_MODULE_0__["default"].setOption("mode", "go");
    _editor__WEBPACK_IMPORTED_MODULE_0__["default"].setValue(
      `package main
import "fmt"
func main() {
    fmt.Println("hello world from Go!")
}`
    );
  } else if (lang === "bash" || lang === "sh") {
    _editor__WEBPACK_IMPORTED_MODULE_0__["default"].setOption("mode", "shell")
    _editor__WEBPACK_IMPORTED_MODULE_0__["default"].setValue(
      `
# Function to print Fibonacci Sequence
function print_fibonacci() {
    num=$1
    a=0
    b=1
    echo "The Fibonacci sequence for $num terms is: "

    for (( i=0; i<num; i++ ))
    do
        echo -n "$a "
        fn=$((a + b))
        a=$b
        b=$fn
    done
}

print_fibonacci 5
			`
    );
  } else if (lang === "rust") {
    _editor__WEBPACK_IMPORTED_MODULE_0__["default"].setOption("mode", "rust");
    _editor__WEBPACK_IMPORTED_MODULE_0__["default"].setValue(`
struct MyStruct {
	msg: String,
}

impl MyStruct {
	fn new(msg: String) -> Self {
		Self {
			msg
		}
	}
	
	fn print(&self) {
		println!("{}", self.msg);
	}
}

fn main() {
    let my_struct = MyStruct::new(String::from("Hello, World!"));
	
	my_struct.print();
}
`
    );
  } else {
    _editor__WEBPACK_IMPORTED_MODULE_0__["default"].setValue(
      "def fibonacci(n):\n\tif n<=1:\n\t\treturn n\n\telse:\n\t\treturn(fibonacci(n-1) + fibonacci(n-2))\n\nn = 5\n\nfibo_series = []\n\nfor i in range(0,n):\n\tfibo_series.append(fibonacci(i))\n\nprint('Hello, World from Python! Here\\'s some fibonacci numbers:')\nprint(fibo_series)"
    );
  }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (setLang);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./style/main.css":
/*!**************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./style/main.css ***!
  \**************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
___CSS_LOADER_EXPORT___.push([module.id, "@import url(https://fonts.googleapis.com/css2?family=Quicksand:wght@300;400&display=swap);"]);
___CSS_LOADER_EXPORT___.push([module.id, "@import url(https://fonts.googleapis.com/css2?family=IBM+Plex+Mono&display=swap);"]);
___CSS_LOADER_EXPORT___.push([module.id, "@import url(https://fonts.googleapis.com/css2?family=Work+Sans&display=swap);"]);
// Module
___CSS_LOADER_EXPORT___.push([module.id, "/* Dark mode */\n@media (prefers-color-scheme: dark) {\n    body {\n        background: #181818;\n        color: #d8d8d8;\n    }\n\n    a {\n        color: #CF9FFF;\n    }\n\n    .field {\n        background-color: #282828;\n        color: #d8d8d8;\n    }\n}\n\n\n\n/* Light mode */\n@media (prefers-color-scheme: light) {\n    body {\n        background-color: #f5f5f5;\n        color: #282828;\n    }\n\n    a {\n        color: #400080;\n    }\n\n    .field {\n        background-color: #d8d8d8;\n        color: #282828;\n    }\n}\n\n.CodeMirror {\n    margin: auto;\n    height: 450px;\n    font-size: 15px;\n    text-align: left;\n    text-shadow: none;\n}\n\nbutton {\n    font-style: \"IBM Plex Mono\", monospace;\n    padding: 4px;\n    margin-top: 5px;\n}\n\n.selectors {\n    display: flex;\n    justify-content: space-between;\n}\n\nselect {\n    font-family: monospace;\n    font: \"IBM Plex Mono\";\n}\n\n#wrapper {\n    margin-top: 3%;\n    width: 50%;\n}\n\n\nbody {\n    font-family: \"IBM Plex Mono\", monospace;\n    text-rendering: optimizeLegibility;\n    /* line-height: 1.5; */\n    /* margin: 1rem 1rem; */\n}\n\nhtml {\n    margin-left: calc(100vw - 100%);\n}\n\na:visited {\n    color: gray;\n    font-weight: bold;\n}\n\nfooter {\n    font-size: 14px;\n    padding: 20px;\n    margin-left: 30%;\n    align-items: center;\n}\n\n.output {\n    width: 70%;\n    margin-top: 10px;\n}\n\n.field {\n    border-radius: 10px;\n    -moz-border-radius: 10px;\n    margin: auto;\n    text-align: left;\n    padding: 5px;\n    font-size: 14px;\n}\n\n.box {\n    width: 90%;\n}\n\npre {\n    text-wrap: balance;\n}\n\n#wrapper {\n    width: 50%;\n    margin-left: 25%;\n}\n", "",{"version":3,"sources":["webpack://./style/main.css"],"names":[],"mappings":"AAKA,cAAc;AACd;IACI;QACI,mBAAmB;QACnB,cAAc;IAClB;;IAEA;QACI,cAAc;IAClB;;IAEA;QACI,yBAAyB;QACzB,cAAc;IAClB;AACJ;;;;AAIA,eAAe;AACf;IACI;QACI,yBAAyB;QACzB,cAAc;IAClB;;IAEA;QACI,cAAc;IAClB;;IAEA;QACI,yBAAyB;QACzB,cAAc;IAClB;AACJ;;AAEA;IACI,YAAY;IACZ,aAAa;IACb,eAAe;IACf,gBAAgB;IAChB,iBAAiB;AACrB;;AAEA;IACI,sCAAsC;IACtC,YAAY;IACZ,eAAe;AACnB;;AAEA;IACI,aAAa;IACb,8BAA8B;AAClC;;AAEA;IACI,sBAAsB;IACtB,qBAAqB;AACzB;;AAEA;IACI,cAAc;IACd,UAAU;AACd;;;AAGA;IACI,uCAAuC;IACvC,kCAAkC;IAClC,sBAAsB;IACtB,uBAAuB;AAC3B;;AAEA;IACI,+BAA+B;AACnC;;AAEA;IACI,WAAW;IACX,iBAAiB;AACrB;;AAEA;IACI,eAAe;IACf,aAAa;IACb,gBAAgB;IAChB,mBAAmB;AACvB;;AAEA;IACI,UAAU;IACV,gBAAgB;AACpB;;AAEA;IACI,mBAAmB;IACnB,wBAAwB;IACxB,YAAY;IACZ,gBAAgB;IAChB,YAAY;IACZ,eAAe;AACnB;;AAEA;IACI,UAAU;AACd;;AAEA;IACI,kBAAkB;AACtB;;AAEA;IACI,UAAU;IACV,gBAAgB;AACpB","sourcesContent":["@import url(\"https://fonts.googleapis.com/css2?family=Quicksand:wght@300;400&display=swap\");\n@import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Mono&display=swap');\n\n@import url(\"https://fonts.googleapis.com/css2?family=Work+Sans&display=swap\");\n\n/* Dark mode */\n@media (prefers-color-scheme: dark) {\n    body {\n        background: #181818;\n        color: #d8d8d8;\n    }\n\n    a {\n        color: #CF9FFF;\n    }\n\n    .field {\n        background-color: #282828;\n        color: #d8d8d8;\n    }\n}\n\n\n\n/* Light mode */\n@media (prefers-color-scheme: light) {\n    body {\n        background-color: #f5f5f5;\n        color: #282828;\n    }\n\n    a {\n        color: #400080;\n    }\n\n    .field {\n        background-color: #d8d8d8;\n        color: #282828;\n    }\n}\n\n.CodeMirror {\n    margin: auto;\n    height: 450px;\n    font-size: 15px;\n    text-align: left;\n    text-shadow: none;\n}\n\nbutton {\n    font-style: \"IBM Plex Mono\", monospace;\n    padding: 4px;\n    margin-top: 5px;\n}\n\n.selectors {\n    display: flex;\n    justify-content: space-between;\n}\n\nselect {\n    font-family: monospace;\n    font: \"IBM Plex Mono\";\n}\n\n#wrapper {\n    margin-top: 3%;\n    width: 50%;\n}\n\n\nbody {\n    font-family: \"IBM Plex Mono\", monospace;\n    text-rendering: optimizeLegibility;\n    /* line-height: 1.5; */\n    /* margin: 1rem 1rem; */\n}\n\nhtml {\n    margin-left: calc(100vw - 100%);\n}\n\na:visited {\n    color: gray;\n    font-weight: bold;\n}\n\nfooter {\n    font-size: 14px;\n    padding: 20px;\n    margin-left: 30%;\n    align-items: center;\n}\n\n.output {\n    width: 70%;\n    margin-top: 10px;\n}\n\n.field {\n    border-radius: 10px;\n    -moz-border-radius: 10px;\n    margin: auto;\n    text-align: left;\n    padding: 5px;\n    font-size: 14px;\n}\n\n.box {\n    width: 90%;\n}\n\npre {\n    text-wrap: balance;\n}\n\n#wrapper {\n    width: 50%;\n    margin-left: 25%;\n}\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./style/main.css":
/*!************************!*\
  !*** ./style/main.css ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_main_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../node_modules/css-loader/dist/cjs.js!./main.css */ "./node_modules/css-loader/dist/cjs.js!./style/main.css");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_main_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_main_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_main_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_main_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ __webpack_require__.O(0, ["vendors-node_modules_codemirror_lib_codemirror_css","vendors-node_modules_codemirror_mode_clike_clike_js-node_modules_codemirror_mode_go_go_js-nod-ec148a","vendors-node_modules_codemirror_lib_codemirror_js"], () => (__webpack_exec__("./js/load.js")));
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguZTc1ZmQ5YzUwZGIwNjRlNGEyYjcuYnVuZGxlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsdUNBQXVDOztBQUV2QztBQUNBO0FBQ0E7QUFDQSxNQUFNLElBQWtDO0FBQ3hDLFdBQVcsT0FBVztBQUN0QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxpRUFBZSxZQUFZLEVBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7QUN2SGM7O0FBRTFDO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQixxREFBWSxPQUFPLHFEQUFZO0FBQ25EO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FB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QVksNkJBQTZCLDhCQUE4QixHQUFHLGNBQWMscUJBQXFCLGlCQUFpQixHQUFHLFlBQVksZ0RBQWdELHlDQUF5QywyQkFBMkIsOEJBQThCLEtBQUssVUFBVSxzQ0FBc0MsR0FBRyxlQUFlLGtCQUFrQix3QkFBd0IsR0FBRyxZQUFZLHNCQUFzQixvQkFBb0IsdUJBQXVCLDBCQUEwQixHQUFHLGFBQWEsaUJBQWlCLHVCQUF1QixHQUFHLFlBQVksMEJBQTBCLCtCQUErQixtQkFBbUIsdUJBQXVCLG1CQUFtQixzQkFBc0IsR0FBRyxVQUFVLGlCQUFpQixHQUFHLFNBQVMseUJBQXlCLEdBQUcsY0FBYyxpQkFBaUIsdUJBQXVCLEdBQUcscUJBQXFCO0FBQ3RnSjtBQUNBLGlFQUFlLHVCQUF1QixFQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ1R2QyxNQUErRjtBQUMvRixNQUFxRjtBQUNyRixNQUE0RjtBQUM1RixNQUErRztBQUMvRyxNQUF3RztBQUN4RyxNQUF3RztBQUN4RyxNQUFrRztBQUNsRztBQUNBOztBQUVBOztBQUVBLDRCQUE0QixxR0FBbUI7QUFDL0Msd0JBQXdCLGtIQUFhOztBQUVyQyx1QkFBdUIsdUdBQWE7QUFDcEM7QUFDQSxpQkFBaUIsK0ZBQU07QUFDdkIsNkJBQTZCLHNHQUFrQjs7QUFFL0MsYUFBYSwwR0FBRyxDQUFDLHFGQUFPOzs7O0FBSTRDO0FBQ3BFLE9BQU8saUVBQWUscUZBQU8sSUFBSSxxRkFBTyxVQUFVLHFGQUFPLG1CQUFtQixFQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vcnVubmVyLXdlYi1mcm9udGVuZC8uL2pzL2NvbmZpZy11dGlscy5qcyIsIndlYnBhY2s6Ly9ydW5uZXItd2ViLWZyb250ZW5kLy4vanMvbGFuZ3MtcmVxdWVzdC5qcyIsIndlYnBhY2s6Ly9ydW5uZXItd2ViLWZyb250ZW5kLy4vanMvbG9hZC5qcyIsIndlYnBhY2s6Ly9ydW5uZXItd2ViLWZyb250ZW5kLy4vanMvcnVuLXJlcXVlc3QuanMiLCJ3ZWJwYWNrOi8vcnVubmVyLXdlYi1mcm9udGVuZC8uL2pzL3NldC1jb2RlLmpzIiwid2VicGFjazovL3J1bm5lci13ZWItZnJvbnRlbmQvLi9zdHlsZS9tYWluLmNzcyIsIndlYnBhY2s6Ly9ydW5uZXItd2ViLWZyb250ZW5kLy4vc3R5bGUvbWFpbi5jc3M/N2Y1NCJdLCJzb3VyY2VzQ29udGVudCI6WyJmdW5jdGlvbiBnZXRTZWxlY3RlZExhbmd1YWdlKCkge1xuICBjb25zdCBzZWxlY3RvciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibGFuZy1zZWxlY3RcIik7XG4gIHJldHVybiBzZWxlY3Rvci5vcHRpb25zW3NlbGVjdG9yLnNlbGVjdGVkSW5kZXhdLmlubmVyVGV4dDtcbn1cblxuLy8gRW52aXJvbm1lbnQgY29uZmlndXJhdGlvblxuY29uc3QgZW52aXJvbm1lbnRzID0ge1xuICBsb2NhbDoge1xuICAgIHVybDogXCJodHRwOi8vbG9jYWxob3N0OjEwMTAwL2FwaS92MS9cIixcbiAgICBuYW1lOiBcIkxvY2FsIERldmVsb3BtZW50XCIsXG4gICAgZGVzY3JpcHRpb246IFwiTG9jYWwgZGV2ZWxvcG1lbnQgc2VydmVyXCJcbiAgfSxcbiAgc3RhZ2luZzoge1xuICAgIHVybDogXCJodHRwczovL3J1bm5lci1zdGFnaW5nLmZseS5kZXYvYXBpL3YxL1wiLFxuICAgIG5hbWU6IFwiU3RhZ2luZ1wiLFxuICAgIGRlc2NyaXB0aW9uOiBcIlByZS1wcm9kdWN0aW9uIHRlc3RpbmcgZW52aXJvbm1lbnRcIlxuICB9LFxuICBwcm9kdWN0aW9uOiB7XG4gICAgdXJsOiBcImh0dHBzOi8vcnVubmVyLmZseS5kZXYvYXBpL3YxL1wiLFxuICAgIG5hbWU6IFwiUHJvZHVjdGlvblwiLFxuICAgIGRlc2NyaXB0aW9uOiBcIkxpdmUgcHJvZHVjdGlvbiBlbnZpcm9ubWVudFwiXG4gIH1cbn07XG5cbi8vIEN1cnJlbnQgZW52aXJvbm1lbnQgc3RhdGVcbmxldCBjdXJyZW50RW52aXJvbm1lbnQgPSAncHJvZHVjdGlvbic7IC8vIERlZmF1bHQgdG8gcHJvZHVjdGlvblxuXG4vLyBFbnZpcm9ubWVudCBkZXRlY3Rpb24gbG9naWMgKGZhbGxiYWNrIGZvciBpbml0aWFsIGxvYWQpXG5mdW5jdGlvbiBkZXRlY3RFbnZpcm9ubWVudCgpIHtcbiAgLy8gQ2hlY2sgaWYgZW52aXJvbm1lbnQgd2FzIHNldCBhdCBidWlsZCB0aW1lXG4gIGlmICh0eXBlb2YgRU5WSVJPTk1FTlQgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgcmV0dXJuIEVOVklST05NRU5UO1xuICB9XG4gIFxuICAvLyBGYWxsYmFjayB0byBob3N0bmFtZS1iYXNlZCBkZXRlY3Rpb25cbiAgY29uc3QgaG9zdG5hbWUgPSB3aW5kb3cubG9jYXRpb24uaG9zdG5hbWU7XG4gIFxuICBpZiAoaG9zdG5hbWUgPT09ICdsb2NhbGhvc3QnIHx8IGhvc3RuYW1lID09PSAnMTI3LjAuMC4xJykge1xuICAgIHJldHVybiAnbG9jYWwnO1xuICB9IGVsc2UgaWYgKGhvc3RuYW1lLmluY2x1ZGVzKCdzdGFnaW5nJykpIHtcbiAgICByZXR1cm4gJ3N0YWdpbmcnO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiAncHJvZHVjdGlvbic7XG4gIH1cbn1cblxuLy8gR2V0IHNlbGVjdGVkIGVudmlyb25tZW50IGZyb20gZHJvcGRvd25cbmZ1bmN0aW9uIGdldFNlbGVjdGVkRW52aXJvbm1lbnQoKSB7XG4gIGNvbnN0IHNlbGVjdG9yID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJlbnYtc2VsZWN0XCIpO1xuICBpZiAoc2VsZWN0b3IpIHtcbiAgICByZXR1cm4gc2VsZWN0b3IudmFsdWU7XG4gIH1cbiAgcmV0dXJuIGRldGVjdEVudmlyb25tZW50KCk7XG59XG5cbi8vIFNldCBlbnZpcm9ubWVudCBhbmQgdXBkYXRlIGNvbmZpZ3VyYXRpb25cbmZ1bmN0aW9uIHNldEVudmlyb25tZW50KGVudikge1xuICBpZiAoZW52aXJvbm1lbnRzW2Vudl0pIHtcbiAgICBjdXJyZW50RW52aXJvbm1lbnQgPSBlbnY7XG4gICAgXG4gICAgLy8gVXBkYXRlIGRyb3Bkb3duIGlmIGl0IGV4aXN0c1xuICAgIGNvbnN0IHNlbGVjdG9yID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJlbnYtc2VsZWN0XCIpO1xuICAgIGlmIChzZWxlY3Rvcikge1xuICAgICAgc2VsZWN0b3IudmFsdWUgPSBlbnY7XG4gICAgfVxuICAgIFxuICAgIC8vIFVwZGF0ZSB0aGUgcnVubmVyQ29uZmlnIFVSTFxuICAgIHJ1bm5lckNvbmZpZy51cmwgPSBlbnZpcm9ubWVudHNbZW52XS51cmw7XG4gICAgcnVubmVyQ29uZmlnLmVudmlyb25tZW50ID0gZW52O1xuICAgIFxuICAgIC8vIFRyaWdnZXIgZW52aXJvbm1lbnQgY2hhbmdlIGV2ZW50XG4gICAgY29uc3QgZXZlbnQgPSBuZXcgQ3VzdG9tRXZlbnQoJ2Vudmlyb25tZW50Q2hhbmdlZCcsIHsgXG4gICAgICBkZXRhaWw6IHsgXG4gICAgICAgIGVudmlyb25tZW50OiBlbnYsIFxuICAgICAgICBjb25maWc6IGVudmlyb25tZW50c1tlbnZdIFxuICAgICAgfSBcbiAgICB9KTtcbiAgICBkb2N1bWVudC5kaXNwYXRjaEV2ZW50KGV2ZW50KTtcbiAgfVxufVxuXG4vLyBHZXQgY3VycmVudCBlbnZpcm9ubWVudCBjb25maWd1cmF0aW9uXG5mdW5jdGlvbiBnZXRFbnZpcm9ubWVudENvbmZpZygpIHtcbiAgY29uc3QgZW52ID0gZ2V0U2VsZWN0ZWRFbnZpcm9ubWVudCgpO1xuICByZXR1cm4gZW52aXJvbm1lbnRzW2Vudl0gfHwgZW52aXJvbm1lbnRzLnByb2R1Y3Rpb247XG59XG5cbi8vIEluaXRpYWxpemUgZW52aXJvbm1lbnQgb24gcGFnZSBsb2FkXG5mdW5jdGlvbiBpbml0aWFsaXplRW52aXJvbm1lbnQoKSB7XG4gIGNvbnN0IGRldGVjdGVkRW52ID0gZGV0ZWN0RW52aXJvbm1lbnQoKTtcbiAgc2V0RW52aXJvbm1lbnQoZGV0ZWN0ZWRFbnYpO1xuICBcbiAgLy8gU2V0IHVwIGVudmlyb25tZW50IHNlbGVjdG9yIGNoYW5nZSBoYW5kbGVyXG4gIGNvbnN0IHNlbGVjdG9yID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJlbnYtc2VsZWN0XCIpO1xuICBpZiAoc2VsZWN0b3IpIHtcbiAgICBzZWxlY3Rvci5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCBmdW5jdGlvbigpIHtcbiAgICAgIHNldEVudmlyb25tZW50KHRoaXMudmFsdWUpO1xuICAgIH0pO1xuICB9XG59XG5cbmNvbnN0IHJ1bm5lckNvbmZpZyA9IHtcbiAgZ2V0U2VsZWN0ZWRMYW5ndWFnZTogZ2V0U2VsZWN0ZWRMYW5ndWFnZSxcbiAgZ2V0IHVybCgpIHtcbiAgICByZXR1cm4gZ2V0RW52aXJvbm1lbnRDb25maWcoKS51cmw7XG4gIH0sXG4gIHJ1bkVuZHBvaW50OiBcInJ1blwiLFxuICBsYW5nRW5kcG9pbnQ6IFwibGFuZ3VhZ2VzXCIsXG4gIGdldCBlbnZpcm9ubWVudCgpIHtcbiAgICByZXR1cm4gZ2V0U2VsZWN0ZWRFbnZpcm9ubWVudCgpO1xuICB9LFxuICBzZXRFbnZpcm9ubWVudDogc2V0RW52aXJvbm1lbnQsXG4gIGdldFNlbGVjdGVkRW52aXJvbm1lbnQ6IGdldFNlbGVjdGVkRW52aXJvbm1lbnQsXG4gIGluaXRpYWxpemVFbnZpcm9ubWVudDogaW5pdGlhbGl6ZUVudmlyb25tZW50LFxuICBlbnZpcm9ubWVudHM6IGVudmlyb25tZW50c1xufTtcblxuLy8gb25seSBzaW5nbGUgZXhwb3J0IHBlciAuanMgZmlsZSBhbGxvd2VkXG4vLyBleHBvcnRpbmcgdGhpcyBzaW5jZSB3ZSB3aWxsIG5lZWQgaXQgdG8gcmV0cmlldmUgdGhlIGN1cnJlbnQgbGFuZ3VhZ2UgZnJvbSB0aGUgZG9jdW1lbnQvRE9NXG5leHBvcnQgZGVmYXVsdCBydW5uZXJDb25maWc7XG4iLCJpbXBvcnQgcnVubmVyQ29uZmlnIGZyb20gXCIuL2NvbmZpZy11dGlsc1wiO1xuXG5mdW5jdGlvbiBsYW5nUmVxdWVzdCgpIHtcbiAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICBsZXQgeGhyID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG4gICAgY29uc3QgZnVsbFVybCA9IHJ1bm5lckNvbmZpZy51cmwgKyBydW5uZXJDb25maWcubGFuZ0VuZHBvaW50O1xuICAgIHhoci5vcGVuKFwiR0VUXCIsIGZ1bGxVcmwpO1xuICAgIHhoci5vbmxvYWQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICBpZiAodGhpcy5zdGF0dXMgPj0gMjAwICYmIHRoaXMuc3RhdHVzIDwgNDAwKSB7XG4gICAgICAgIHJlc29sdmUoeGhyLnJlc3BvbnNlKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJlamVjdCh7XG4gICAgICAgICAgc3RhdHVzOiB0aGlzLnN0YXR1cyxcbiAgICAgICAgICBzdGF0dXNUZXh0OiB4aHIuc3RhdHVzVGV4dCxcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfTtcbiAgICB4aHIub25lcnJvciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIHJlamVjdCh7XG4gICAgICAgIHN0YXR1czogdGhpcy5zdGF0dXMsXG4gICAgICAgIHN0YXR1c1RleHQ6IHhoci5zdGF0dXNUZXh0LFxuICAgICAgfSk7XG4gICAgfTtcbiAgICB4aHIuc2VuZCgpO1xuICB9KTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgbGFuZ1JlcXVlc3Q7XG4iLCJpbXBvcnQgXCJjb2RlbWlycm9yL2xpYi9jb2RlbWlycm9yLmNzc1wiO1xuaW1wb3J0IFwiY29kZW1pcnJvci90aGVtZS9tYXRlcmlhbC5jc3NcIjtcbmltcG9ydCBcImNvZGVtaXJyb3IvdGhlbWUvbmVhdC5jc3NcIjtcbmltcG9ydCBcImNvZGVtaXJyb3IvbW9kZS94bWwveG1sXCI7XG5pbXBvcnQgXCJjb2RlbWlycm9yL21vZGUvamF2YXNjcmlwdC9qYXZhc2NyaXB0XCI7XG5pbXBvcnQgXCJjb2RlbWlycm9yL21vZGUvcHl0aG9uL3B5dGhvblwiO1xuaW1wb3J0IFwiY29kZW1pcnJvci9tb2RlL3NoZWxsL3NoZWxsXCI7XG5pbXBvcnQgXCJjb2RlbWlycm9yL21vZGUvZ28vZ29cIjtcbmltcG9ydCBcImNvZGVtaXJyb3IvbW9kZS9jbGlrZS9jbGlrZVwiO1xuaW1wb3J0IFwiY29kZW1pcnJvci9tb2RlL3J1c3QvcnVzdFwiO1xuXG4vLyBvdGhlciB0aGVtZXNcbmltcG9ydCBcImNvZGVtaXJyb3IvdGhlbWUvMzAyNC1kYXkuY3NzXCI7XG5pbXBvcnQgXCJjb2RlbWlycm9yL3RoZW1lLzMwMjQtbmlnaHQuY3NzXCI7XG5pbXBvcnQgXCJjb2RlbWlycm9yL3RoZW1lL2JsYWNrYm9hcmQuY3NzXCI7XG5pbXBvcnQgXCJjb2RlbWlycm9yL3RoZW1lL2RhcmN1bGEuY3NzXCI7XG5pbXBvcnQgXCJjb2RlbWlycm9yL3RoZW1lL2RyYWN1bGEuY3NzXCI7XG5pbXBvcnQgXCJjb2RlbWlycm9yL3RoZW1lL2VjbGlwc2UuY3NzXCI7XG5pbXBvcnQgXCJjb2RlbWlycm9yL3RoZW1lL2VsZWdhbnQuY3NzXCI7XG5pbXBvcnQgXCJjb2RlbWlycm9yL3RoZW1lL2VybGFuZy1kYXJrLmNzc1wiO1xuaW1wb3J0IFwiY29kZW1pcnJvci90aGVtZS9pZGVhLmNzc1wiO1xuaW1wb3J0IFwiY29kZW1pcnJvci90aGVtZS9pc290b3BlLmNzc1wiO1xuaW1wb3J0IFwiY29kZW1pcnJvci90aGVtZS9taWRuaWdodC5jc3NcIjtcbmltcG9ydCBcImNvZGVtaXJyb3IvdGhlbWUvbHVjYXJpby5jc3NcIjtcbmltcG9ydCBcImNvZGVtaXJyb3IvdGhlbWUvbWF0ZXJpYWwuY3NzXCI7XG5pbXBvcnQgXCJjb2RlbWlycm9yL3RoZW1lL21vbm9rYWkuY3NzXCI7XG5pbXBvcnQgXCJjb2RlbWlycm9yL3RoZW1lL3NvbGFyaXplZC5jc3NcIjtcblxuaW1wb3J0IFwiLi4vc3R5bGUvbWFpbi5jc3NcIjtcbmltcG9ydCBydW5DYWxsIGZyb20gXCIuL3J1bi1yZXF1ZXN0XCI7XG5pbXBvcnQgY29kZU1pcnJvciBmcm9tIFwiLi9lZGl0b3JcIjtcbmltcG9ydCBsYW5nUmVxdWVzdCBmcm9tIFwiLi9sYW5ncy1yZXF1ZXN0XCI7XG5pbXBvcnQgcnVubmVyQ29uZmlnIGZyb20gXCIuL2NvbmZpZy11dGlsc1wiO1xuaW1wb3J0IHNldExhbmcgZnJvbSBcIi4vc2V0LWNvZGVcIjtcblxudmFyIGxhbmdzO1xuXG5jb2RlTWlycm9yLnNldFZhbHVlKFxuICAgICAgXCJkZWYgZmlib25hY2NpKG4pOlxcblxcdGlmIG48PTE6XFxuXFx0XFx0cmV0dXJuIG5cXG5cXHRlbHNlOlxcblxcdFxcdHJldHVybihmaWJvbmFjY2kobi0xKSArIGZpYm9uYWNjaShuLTIpKVxcblxcbm4gPSA1XFxuXFxuZmlib19zZXJpZXMgPSBbXVxcblxcbmZvciBpIGluIHJhbmdlKDAsbik6XFxuXFx0Zmlib19zZXJpZXMuYXBwZW5kKGZpYm9uYWNjaShpKSlcXG5cXG5wcmludCgnSGVsbG8sIFdvcmxkIGZyb20gUHl0aG9uISBIZXJlXFxcXCdzIHNvbWUgZmlib25hY2NpIG51bWJlcnM6JylcXG5wcmludChmaWJvX3NlcmllcylcIlxuKTtcblxubGFuZ1JlcXVlc3QoKVxuICAudGhlbihmdW5jdGlvbiAocmVzdWx0KSB7XG4gICAgdmFyIHJlcyA9IEpTT04ucGFyc2UocmVzdWx0KTtcbiAgICAvLyB1bmNvbW1lbnQgZm9yIHRlc3RpbmdcbiAgICAvLyB2YXIgcmVzID0geyBsYW5ndWFnZXM6IFtcInB5dGhvbjNcIiwgXCJub2RlXCIsIFwiYysrMTFcIiwgXCJnb1wiXSB9O1xuICAgIGxhbmdzID0gcmVzLmxhbmd1YWdlcztcbiAgfSlcbiAgLmNhdGNoKGZ1bmN0aW9uIChlcnIpIHtcbiAgICBsYW5ncyA9IFtcIkVycm9yIVwiXTtcbiAgICBjb25zb2xlLmxvZyhcIkVycm9yIHdoZW4gZmV0Y2hpbmcgbGFuZ3VhZ2VzOiBcIiArIGVycik7XG4gIH0pXG4gIC5maW5hbGx5KGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgbGFuZ19tZW51ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJsYW5nLXNlbGVjdFwiKTtcbiAgICBmb3IgKGNvbnN0IGxhbmcgb2YgbGFuZ3MpIHtcbiAgICAgIHZhciBjaGlsZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJvcHRpb25cIik7XG4gICAgICBjaGlsZC5pbm5lclRleHQgPSBsYW5nO1xuICAgICAgbGFuZ19tZW51LmFwcGVuZENoaWxkKGNoaWxkKTtcbiAgICB9XG4gICAgcnVubmVyQ29uZmlnLmdldFNlbGVjdGVkTGFuZ3VhZ2UoKTtcbiAgfSk7XG5cbmZ1bmN0aW9uIHNlbGVjdFRoZW1lKCkge1xuICBjb25zdCBzZWxlY3QgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInRoZW1lLXNlbGVjdFwiKTtcbiAgdmFyIHRoZW1lID0gc2VsZWN0Lm9wdGlvbnNbc2VsZWN0LnNlbGVjdGVkSW5kZXhdLnRleHRDb250ZW50O1xuICBjb2RlTWlycm9yLnNldE9wdGlvbihcInRoZW1lXCIsIHRoZW1lKTtcbn1cblxuY29uc3Qgc3VibWl0QnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzdWJtaXQtYnRuXCIpO1xuc3VibWl0QnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBydW5DYWxsKTtcblxuY29uc3Qgc2VsZWN0b3IgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInRoZW1lLXNlbGVjdFwiKTtcbnNlbGVjdG9yLmFkZEV2ZW50TGlzdGVuZXIoXCJjaGFuZ2VcIiwgc2VsZWN0VGhlbWUpO1xuXG5jb25zdCBsYW5nU2VsZWN0b3IgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImxhbmctc2VsZWN0XCIpO1xubGFuZ1NlbGVjdG9yLmFkZEV2ZW50TGlzdGVuZXIoXCJjaGFuZ2VcIiwgc2V0TGFuZyk7XG5cbi8vIEluaXRpYWxpemUgZW52aXJvbm1lbnQgc2VsZWN0b3JcbnJ1bm5lckNvbmZpZy5pbml0aWFsaXplRW52aXJvbm1lbnQoKTtcblxuLy8gQWRkIGVudmlyb25tZW50IHN0YXR1cyBpbmRpY2F0b3JcbmZ1bmN0aW9uIHVwZGF0ZUVudmlyb25tZW50U3RhdHVzKCkge1xuICBjb25zdCBjdXJyZW50RW52ID0gcnVubmVyQ29uZmlnLmdldFNlbGVjdGVkRW52aXJvbm1lbnQoKTtcbiAgY29uc3QgZW52Q29uZmlnID0gcnVubmVyQ29uZmlnLmVudmlyb25tZW50c1tjdXJyZW50RW52XTtcbiAgXG4gIC8vIENyZWF0ZSBvciB1cGRhdGUgZW52aXJvbm1lbnQgc3RhdHVzIGluZGljYXRvclxuICBsZXQgc3RhdHVzSW5kaWNhdG9yID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJlbnYtc3RhdHVzXCIpO1xuICBpZiAoIXN0YXR1c0luZGljYXRvcikge1xuICAgIHN0YXR1c0luZGljYXRvciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgc3RhdHVzSW5kaWNhdG9yLmlkID0gXCJlbnYtc3RhdHVzXCI7XG4gICAgc3RhdHVzSW5kaWNhdG9yLnN0eWxlLmNzc1RleHQgPSBgXG4gICAgICBtYXJnaW46IDEwcHggMDtcbiAgICAgIHBhZGRpbmc6IDVweCAxMHB4O1xuICAgICAgYm9yZGVyLXJhZGl1czogNHB4O1xuICAgICAgZm9udC1zaXplOiAxMnB4O1xuICAgICAgZm9udC13ZWlnaHQ6IGJvbGQ7XG4gICAgYDtcbiAgICBcbiAgICBjb25zdCBzZWxlY3RvcnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnNlbGVjdG9yc1wiKTtcbiAgICBzZWxlY3RvcnMucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUoc3RhdHVzSW5kaWNhdG9yLCBzZWxlY3RvcnMubmV4dFNpYmxpbmcpO1xuICB9XG4gIFxuICAvLyBVcGRhdGUgc3RhdHVzIGluZGljYXRvclxuICBzdGF0dXNJbmRpY2F0b3IudGV4dENvbnRlbnQgPSBgRW52aXJvbm1lbnQ6ICR7ZW52Q29uZmlnLm5hbWV9IC0gJHtlbnZDb25maWcuZGVzY3JpcHRpb259YDtcbiAgXG4gIC8vIENvbG9yIGNvZGluZyBmb3IgZGlmZmVyZW50IGVudmlyb25tZW50c1xuICBpZiAoY3VycmVudEVudiA9PT0gJ2xvY2FsJykge1xuICAgIHN0YXR1c0luZGljYXRvci5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSAnI2UzZjJmZCc7XG4gICAgc3RhdHVzSW5kaWNhdG9yLnN0eWxlLmNvbG9yID0gJyMxOTc2ZDInO1xuICAgIHN0YXR1c0luZGljYXRvci5zdHlsZS5ib3JkZXIgPSAnMXB4IHNvbGlkICNiYmRlZmInO1xuICB9IGVsc2UgaWYgKGN1cnJlbnRFbnYgPT09ICdzdGFnaW5nJykge1xuICAgIHN0YXR1c0luZGljYXRvci5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSAnI2ZmZjNlMCc7XG4gICAgc3RhdHVzSW5kaWNhdG9yLnN0eWxlLmNvbG9yID0gJyNmNTdjMDAnO1xuICAgIHN0YXR1c0luZGljYXRvci5zdHlsZS5ib3JkZXIgPSAnMXB4IHNvbGlkICNmZmNjMDInO1xuICB9IGVsc2Uge1xuICAgIHN0YXR1c0luZGljYXRvci5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSAnI2U4ZjVlOCc7XG4gICAgc3RhdHVzSW5kaWNhdG9yLnN0eWxlLmNvbG9yID0gJyMyZTdkMzInO1xuICAgIHN0YXR1c0luZGljYXRvci5zdHlsZS5ib3JkZXIgPSAnMXB4IHNvbGlkICNjOGU2YzknO1xuICB9XG59XG5cbi8vIExpc3RlbiBmb3IgZW52aXJvbm1lbnQgY2hhbmdlc1xuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignZW52aXJvbm1lbnRDaGFuZ2VkJywgdXBkYXRlRW52aXJvbm1lbnRTdGF0dXMpO1xuXG4vLyBJbml0aWFsIHN0YXR1cyB1cGRhdGVcbnVwZGF0ZUVudmlyb25tZW50U3RhdHVzKCk7XG4iLCJpbXBvcnQgY29kZU1pcnJvciBmcm9tIFwiLi9lZGl0b3JcIjtcbmltcG9ydCBydW5uZXJDb25maWcgZnJvbSBcIi4vY29uZmlnLXV0aWxzXCI7XG5pbXBvcnQgXCJjb2RlbWlycm9yL2xpYi9jb2RlbWlycm9yLmNzc1wiO1xuXG5mdW5jdGlvbiBydW5SZXF1ZXN0KCkge1xuICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgdmFyIHJlcSA9IHtcbiAgICAgIHNvdXJjZTogY29kZU1pcnJvci5nZXRWYWx1ZSgpLFxuICAgICAgbGFuZ3VhZ2U6IHJ1bm5lckNvbmZpZy5nZXRTZWxlY3RlZExhbmd1YWdlKCksXG4gICAgfTtcbiAgICBsZXQgeGhyID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG4gICAgY29uc3QgZnVsbFVybCA9IHJ1bm5lckNvbmZpZy51cmwgKyBydW5uZXJDb25maWcucnVuRW5kcG9pbnQ7XG4gICAgeGhyLm9wZW4oXCJQT1NUXCIsIGZ1bGxVcmwpO1xuICAgIHhoci5zZXRSZXF1ZXN0SGVhZGVyKFwiQ29udGVudC1UeXBlXCIsIFwiYXBwbGljYXRpb24vanNvblwiKTtcbiAgICB4aHIub25sb2FkID0gZnVuY3Rpb24oKSB7XG4gICAgICBpZiAodGhpcy5zdGF0dXMgPj0gMjAwICYmIHRoaXMuc3RhdHVzIDwgNDAwKSB7XG4gICAgICAgIHJlc29sdmUoeGhyLnJlc3BvbnNlKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJlamVjdCh7XG4gICAgICAgICAgc3RhdHVzOiB0aGlzLnN0YXR1cyxcbiAgICAgICAgICBzdGF0dXNUZXh0OiB4aHIuc3RhdHVzVGV4dCxcbiAgICAgICAgICBib2R5OiB4aHIucmVzcG9uc2VcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfTtcbiAgICB4aHIub25lcnJvciA9IGZ1bmN0aW9uKCkge1xuICAgICAgcmVqZWN0KHtcbiAgICAgICAgc3RhdHVzOiB0aGlzLnN0YXR1cyxcbiAgICAgICAgc3RhdHVzVGV4dDogeGhyLnN0YXR1c1RleHQsXG4gICAgICAgIGJvZHk6IHhoci5yZXNwb25zZVxuICAgICAgfSk7XG4gICAgfTtcbiAgICB4aHIuc2VuZChKU09OLnN0cmluZ2lmeShyZXEpKTtcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIHN0cmluZ2lmeShvYmopIHtcbiAgY29uc3QgU0VQID0gXCIsIFwiO1xuICBjb25zdCBFTVBUWV9URVhUID0gXCJub25lXCI7XG5cbiAgaWYgKG9iaiA9PT0gbnVsbCkgcmV0dXJuIEVNUFRZX1RFWFQ7XG5cbiAgbGV0IGlubmVyID0gXCJcIjtcbiAgY29uc3Qga2V5cyA9IE9iamVjdC5rZXlzKG9iaik7XG4gIGtleXMuZm9yRWFjaCgoa2V5LCBpKSA9PiB7XG4gICAgaWYgKG9ialtrZXldID09PSBudWxsKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaW5uZXIgKz0ga2V5ICsgXCI6IFwiICsgU3RyaW5nKG9ialtrZXldKTtcblxuICAgIGlmIChpIDwga2V5cy5sZW5ndGggLSAxKSBpbm5lciArPSBTRVA7XG4gIH0pO1xuXG4gIGlmIChpbm5lciA9PSBcIlwiKSBpbm5lciA9IEVNUFRZX1RFWFQ7XG5cbiAgcmV0dXJuIGlubmVyO1xufVxuXG5hc3luYyBmdW5jdGlvbiBydW5DYWxsKCkge1xuICBsZXQgc3Rkb3V0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzdGRvdXQtZmllbGRcIik7XG4gIGxldCBzdGRlcnIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInN0ZGVyci1maWVsZFwiKTtcbiAgbGV0IGVycm9yID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJlcnItZmllbGRcIik7XG5cblxuICBhd2FpdCBydW5SZXF1ZXN0KClcbiAgICAudGhlbihmdW5jdGlvbihyZXN1bHQpIHtcbiAgICAgIGxldCBvdXQgPSBKU09OLnBhcnNlKHJlc3VsdCk7XG5cblxuICAgICAgc3Rkb3V0LmlubmVySFRNTCA9XG4gICAgICAgIFwiPHByZT5TdGRvdXQ6IFwiICsgb3V0W1wic3Rkb3V0XCJdICsgXCI8L3ByZT5cIjtcbiAgICAgIHN0ZG91dC5yZW1vdmVBdHRyaWJ1dGUoXCJoaWRkZW5cIik7XG5cbiAgICAgIHN0ZGVyci5pbm5lckhUTUwgPVxuICAgICAgICBcIjxwcmU+U3RkZXJyOiBcIiArIG91dFtcInN0ZGVyclwiXSArIFwiPC9wcmU+XCI7XG4gICAgICBzdGRlcnIucmVtb3ZlQXR0cmlidXRlKFwiaGlkZGVuXCIpO1xuXG4gICAgICBlcnJvci5pbm5lckhUTUwgPSBcIjxwcmU+RXJyb3I6IFwiICsgb3V0W1wiZXJyb3JcIl0gKyBcIjwvcHJlPlwiO1xuICAgIH0pXG4gICAgLmNhdGNoKGZ1bmN0aW9uKGVycikge1xuICAgICAgY29uc29sZS5sb2coZXJyKTtcbiAgICAgIHN0ZG91dC5zZXRBdHRyaWJ1dGUoXCJoaWRkZW5cIiwgdHJ1ZSk7XG4gICAgICBzdGRlcnIuc2V0QXR0cmlidXRlKFwiaGlkZGVuXCIsIHRydWUpO1xuICAgICAgZXJyb3IuaW5uZXJIVE1MID0gXCI8cHJlPkVycm9yOiBcIiArIHN0cmluZ2lmeShlcnIpICsgXCI8L3ByZT5cIjtcbiAgICB9KTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgcnVuQ2FsbDtcbiIsImltcG9ydCBjb2RlTWlycm9yIGZyb20gXCIuL2VkaXRvclwiO1xuXG5mdW5jdGlvbiBzZXRMYW5nKCkge1xuICBjb25zdCBzZWxlY3RvciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibGFuZy1zZWxlY3RcIik7XG4gIGNvbnN0IGxhbmcgPSBzZWxlY3Rvci5vcHRpb25zW3NlbGVjdG9yLnNlbGVjdGVkSW5kZXhdLmlubmVyVGV4dDtcbiAgaWYgKGxhbmcgPT09IFwicHl0aG9uM1wiIHx8IGxhbmcgPT09IFwicHl0aG9uXCIpIHtcbiAgICBjb2RlTWlycm9yLnNldE9wdGlvbihcIm1vZGVcIiwgXCJweXRob25cIilcbiAgICBjb2RlTWlycm9yLnNldFZhbHVlKFxuICAgICAgXCJkZWYgZmlib25hY2NpKG4pOlxcblxcdGlmIG48PTE6XFxuXFx0XFx0cmV0dXJuIG5cXG5cXHRlbHNlOlxcblxcdFxcdHJldHVybihmaWJvbmFjY2kobi0xKSArIGZpYm9uYWNjaShuLTIpKVxcblxcbm4gPSA1XFxuXFxuZmlib19zZXJpZXMgPSBbXVxcblxcbmZvciBpIGluIHJhbmdlKDAsbik6XFxuXFx0Zmlib19zZXJpZXMuYXBwZW5kKGZpYm9uYWNjaShpKSlcXG5cXG5wcmludCgnSGVsbG8sIFdvcmxkIGZyb20gUHl0aG9uISBIZXJlXFxcXCdzIHNvbWUgZmlib25hY2NpIG51bWJlcnM6JylcXG5wcmludChmaWJvX3NlcmllcylcIlxuICAgICk7XG4gIH0gZWxzZSBpZiAoXG4gICAgbGFuZyA9PT0gXCJub2RlXCIgfHxcbiAgICBsYW5nID09PSBcIm5vZGVqc1wiIHx8XG4gICAgbGFuZyA9PT0gXCJqc1wiIHx8XG4gICAgbGFuZyA9PT0gXCJqYXZhc2NyaXB0XCJcbiAgKSB7XG4gICAgY29kZU1pcnJvci5zZXRPcHRpb24oXCJtb2RlXCIsIFwiamF2YXNjcmlwdFwiKTtcbiAgICBjb2RlTWlycm9yLnNldFZhbHVlKCdjb25zdCB7IGV4ZWMgfSA9IHJlcXVpcmUoXCJjaGlsZF9wcm9jZXNzXCIpO1xcblxcbmNvbnNvbGUubG9nKFwiSGVsbG8gd29ybGQgZnJvbSBOb2RlLmpzISBNeSB1cHRpbWUgaXM6XCIpO1xcblxcbmV4ZWMoXCJ1cHRpbWVcIiwgKGVycm9yLCBzdGRvdXQsIHN0ZGVycikgPT4ge1xcblxcdGlmIChlcnJvcikge1xcblxcdFxcdGNvbnNvbGUubG9nKGBlcnJvcjogJHtlcnJvci5tZXNzYWdlfWApO1xcblxcdFxcdHJldHVybjtcXG59XFxuXFx0aWYgKHN0ZGVycikge1xcblxcdFxcdGNvbnNvbGUubG9nKGBzdGRlcnI6ICR7c3RkZXJyfWApO1xcblxcdFxcdHJldHVybjtcXG5cXHR9XFxuXFx0XFx0Y29uc29sZS5sb2coYHN0ZG91dDogJHtzdGRvdXR9YCk7XFxufSk7Jyk7XG4gIH0gZWxzZSBpZiAobGFuZyA9PT0gXCJjKytcIiB8fCBsYW5nID09PSBcImNwcFwiIHx8IGxhbmcgPT09IFwiYysrMTFcIikge1xuICAgIGNvZGVNaXJyb3Iuc2V0T3B0aW9uKFwibW9kZVwiLCBcImNsaWtlXCIpO1xuICAgIGNvZGVNaXJyb3Iuc2V0VmFsdWUoXG4gICAgICBgI2luY2x1ZGU8aW9zdHJlYW0+XG4jaW5jbHVkZTx0aHJlYWQ+XG5pbnQgbWFpbigpIHtcblx0dW5zaWduZWQgaW50IG50aHJlYWRzID0gc3RkOjp0aHJlYWQ6OmhhcmR3YXJlX2NvbmN1cnJlbmN5KCk7XG5cdHN0ZDo6Y291dCA8PCBcImhlbGxvIHdvcmxkIGZyb20gQysrIVwiIDw8IHN0ZDo6ZW5kbDtcblx0c3RkOjpjZXJyIDw8IFwiSSBoYXZlIFwiIDw8IG50aHJlYWRzIDw8IFwiIHRocmVhZHMhXCIgPDwgc3RkOjplbmRsO1xuXHRyZXR1cm4gMDtcbn1gXG4gICAgKTtcbiAgfSBlbHNlIGlmIChsYW5nID09PSBcImdvXCIgfHwgbGFuZyA9PT0gXCJnb2xhbmdcIikge1xuICAgIGNvZGVNaXJyb3Iuc2V0T3B0aW9uKFwibW9kZVwiLCBcImdvXCIpO1xuICAgIGNvZGVNaXJyb3Iuc2V0VmFsdWUoXG4gICAgICBgcGFja2FnZSBtYWluXG5pbXBvcnQgXCJmbXRcIlxuZnVuYyBtYWluKCkge1xuICAgIGZtdC5QcmludGxuKFwiaGVsbG8gd29ybGQgZnJvbSBHbyFcIilcbn1gXG4gICAgKTtcbiAgfSBlbHNlIGlmIChsYW5nID09PSBcImJhc2hcIiB8fCBsYW5nID09PSBcInNoXCIpIHtcbiAgICBjb2RlTWlycm9yLnNldE9wdGlvbihcIm1vZGVcIiwgXCJzaGVsbFwiKVxuICAgIGNvZGVNaXJyb3Iuc2V0VmFsdWUoXG4gICAgICBgXG4jIEZ1bmN0aW9uIHRvIHByaW50IEZpYm9uYWNjaSBTZXF1ZW5jZVxuZnVuY3Rpb24gcHJpbnRfZmlib25hY2NpKCkge1xuICAgIG51bT0kMVxuICAgIGE9MFxuICAgIGI9MVxuICAgIGVjaG8gXCJUaGUgRmlib25hY2NpIHNlcXVlbmNlIGZvciAkbnVtIHRlcm1zIGlzOiBcIlxuXG4gICAgZm9yICgoIGk9MDsgaTxudW07IGkrKyApKVxuICAgIGRvXG4gICAgICAgIGVjaG8gLW4gXCIkYSBcIlxuICAgICAgICBmbj0kKChhICsgYikpXG4gICAgICAgIGE9JGJcbiAgICAgICAgYj0kZm5cbiAgICBkb25lXG59XG5cbnByaW50X2ZpYm9uYWNjaSA1XG5cdFx0XHRgXG4gICAgKTtcbiAgfSBlbHNlIGlmIChsYW5nID09PSBcInJ1c3RcIikge1xuICAgIGNvZGVNaXJyb3Iuc2V0T3B0aW9uKFwibW9kZVwiLCBcInJ1c3RcIik7XG4gICAgY29kZU1pcnJvci5zZXRWYWx1ZShgXG5zdHJ1Y3QgTXlTdHJ1Y3Qge1xuXHRtc2c6IFN0cmluZyxcbn1cblxuaW1wbCBNeVN0cnVjdCB7XG5cdGZuIG5ldyhtc2c6IFN0cmluZykgLT4gU2VsZiB7XG5cdFx0U2VsZiB7XG5cdFx0XHRtc2dcblx0XHR9XG5cdH1cblx0XG5cdGZuIHByaW50KCZzZWxmKSB7XG5cdFx0cHJpbnRsbiEoXCJ7fVwiLCBzZWxmLm1zZyk7XG5cdH1cbn1cblxuZm4gbWFpbigpIHtcbiAgICBsZXQgbXlfc3RydWN0ID0gTXlTdHJ1Y3Q6Om5ldyhTdHJpbmc6OmZyb20oXCJIZWxsbywgV29ybGQhXCIpKTtcblx0XG5cdG15X3N0cnVjdC5wcmludCgpO1xufVxuYFxuICAgICk7XG4gIH0gZWxzZSB7XG4gICAgY29kZU1pcnJvci5zZXRWYWx1ZShcbiAgICAgIFwiZGVmIGZpYm9uYWNjaShuKTpcXG5cXHRpZiBuPD0xOlxcblxcdFxcdHJldHVybiBuXFxuXFx0ZWxzZTpcXG5cXHRcXHRyZXR1cm4oZmlib25hY2NpKG4tMSkgKyBmaWJvbmFjY2kobi0yKSlcXG5cXG5uID0gNVxcblxcbmZpYm9fc2VyaWVzID0gW11cXG5cXG5mb3IgaSBpbiByYW5nZSgwLG4pOlxcblxcdGZpYm9fc2VyaWVzLmFwcGVuZChmaWJvbmFjY2koaSkpXFxuXFxucHJpbnQoJ0hlbGxvLCBXb3JsZCBmcm9tIFB5dGhvbiEgSGVyZVxcXFwncyBzb21lIGZpYm9uYWNjaSBudW1iZXJzOicpXFxucHJpbnQoZmlib19zZXJpZXMpXCJcbiAgICApO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IHNldExhbmc7XG4iLCIvLyBJbXBvcnRzXG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyBmcm9tIFwiLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL3NvdXJjZU1hcHMuanNcIjtcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18gZnJvbSBcIi4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanNcIjtcbnZhciBfX19DU1NfTE9BREVSX0VYUE9SVF9fXyA9IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fKTtcbl9fX0NTU19MT0FERVJfRVhQT1JUX19fLnB1c2goW21vZHVsZS5pZCwgXCJAaW1wb3J0IHVybChodHRwczovL2ZvbnRzLmdvb2dsZWFwaXMuY29tL2NzczI/ZmFtaWx5PVF1aWNrc2FuZDp3Z2h0QDMwMDs0MDAmZGlzcGxheT1zd2FwKTtcIl0pO1xuX19fQ1NTX0xPQURFUl9FWFBPUlRfX18ucHVzaChbbW9kdWxlLmlkLCBcIkBpbXBvcnQgdXJsKGh0dHBzOi8vZm9udHMuZ29vZ2xlYXBpcy5jb20vY3NzMj9mYW1pbHk9SUJNK1BsZXgrTW9ubyZkaXNwbGF5PXN3YXApO1wiXSk7XG5fX19DU1NfTE9BREVSX0VYUE9SVF9fXy5wdXNoKFttb2R1bGUuaWQsIFwiQGltcG9ydCB1cmwoaHR0cHM6Ly9mb250cy5nb29nbGVhcGlzLmNvbS9jc3MyP2ZhbWlseT1Xb3JrK1NhbnMmZGlzcGxheT1zd2FwKTtcIl0pO1xuLy8gTW9kdWxlXG5fX19DU1NfTE9BREVSX0VYUE9SVF9fXy5wdXNoKFttb2R1bGUuaWQsIFwiLyogRGFyayBtb2RlICovXFxuQG1lZGlhIChwcmVmZXJzLWNvbG9yLXNjaGVtZTogZGFyaykge1xcbiAgICBib2R5IHtcXG4gICAgICAgIGJhY2tncm91bmQ6ICMxODE4MTg7XFxuICAgICAgICBjb2xvcjogI2Q4ZDhkODtcXG4gICAgfVxcblxcbiAgICBhIHtcXG4gICAgICAgIGNvbG9yOiAjQ0Y5RkZGO1xcbiAgICB9XFxuXFxuICAgIC5maWVsZCB7XFxuICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjMjgyODI4O1xcbiAgICAgICAgY29sb3I6ICNkOGQ4ZDg7XFxuICAgIH1cXG59XFxuXFxuXFxuXFxuLyogTGlnaHQgbW9kZSAqL1xcbkBtZWRpYSAocHJlZmVycy1jb2xvci1zY2hlbWU6IGxpZ2h0KSB7XFxuICAgIGJvZHkge1xcbiAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogI2Y1ZjVmNTtcXG4gICAgICAgIGNvbG9yOiAjMjgyODI4O1xcbiAgICB9XFxuXFxuICAgIGEge1xcbiAgICAgICAgY29sb3I6ICM0MDAwODA7XFxuICAgIH1cXG5cXG4gICAgLmZpZWxkIHtcXG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6ICNkOGQ4ZDg7XFxuICAgICAgICBjb2xvcjogIzI4MjgyODtcXG4gICAgfVxcbn1cXG5cXG4uQ29kZU1pcnJvciB7XFxuICAgIG1hcmdpbjogYXV0bztcXG4gICAgaGVpZ2h0OiA0NTBweDtcXG4gICAgZm9udC1zaXplOiAxNXB4O1xcbiAgICB0ZXh0LWFsaWduOiBsZWZ0O1xcbiAgICB0ZXh0LXNoYWRvdzogbm9uZTtcXG59XFxuXFxuYnV0dG9uIHtcXG4gICAgZm9udC1zdHlsZTogXFxcIklCTSBQbGV4IE1vbm9cXFwiLCBtb25vc3BhY2U7XFxuICAgIHBhZGRpbmc6IDRweDtcXG4gICAgbWFyZ2luLXRvcDogNXB4O1xcbn1cXG5cXG4uc2VsZWN0b3JzIHtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xcbn1cXG5cXG5zZWxlY3Qge1xcbiAgICBmb250LWZhbWlseTogbW9ub3NwYWNlO1xcbiAgICBmb250OiBcXFwiSUJNIFBsZXggTW9ub1xcXCI7XFxufVxcblxcbiN3cmFwcGVyIHtcXG4gICAgbWFyZ2luLXRvcDogMyU7XFxuICAgIHdpZHRoOiA1MCU7XFxufVxcblxcblxcbmJvZHkge1xcbiAgICBmb250LWZhbWlseTogXFxcIklCTSBQbGV4IE1vbm9cXFwiLCBtb25vc3BhY2U7XFxuICAgIHRleHQtcmVuZGVyaW5nOiBvcHRpbWl6ZUxlZ2liaWxpdHk7XFxuICAgIC8qIGxpbmUtaGVpZ2h0OiAxLjU7ICovXFxuICAgIC8qIG1hcmdpbjogMXJlbSAxcmVtOyAqL1xcbn1cXG5cXG5odG1sIHtcXG4gICAgbWFyZ2luLWxlZnQ6IGNhbGMoMTAwdncgLSAxMDAlKTtcXG59XFxuXFxuYTp2aXNpdGVkIHtcXG4gICAgY29sb3I6IGdyYXk7XFxuICAgIGZvbnQtd2VpZ2h0OiBib2xkO1xcbn1cXG5cXG5mb290ZXIge1xcbiAgICBmb250LXNpemU6IDE0cHg7XFxuICAgIHBhZGRpbmc6IDIwcHg7XFxuICAgIG1hcmdpbi1sZWZ0OiAzMCU7XFxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxufVxcblxcbi5vdXRwdXQge1xcbiAgICB3aWR0aDogNzAlO1xcbiAgICBtYXJnaW4tdG9wOiAxMHB4O1xcbn1cXG5cXG4uZmllbGQge1xcbiAgICBib3JkZXItcmFkaXVzOiAxMHB4O1xcbiAgICAtbW96LWJvcmRlci1yYWRpdXM6IDEwcHg7XFxuICAgIG1hcmdpbjogYXV0bztcXG4gICAgdGV4dC1hbGlnbjogbGVmdDtcXG4gICAgcGFkZGluZzogNXB4O1xcbiAgICBmb250LXNpemU6IDE0cHg7XFxufVxcblxcbi5ib3gge1xcbiAgICB3aWR0aDogOTAlO1xcbn1cXG5cXG5wcmUge1xcbiAgICB0ZXh0LXdyYXA6IGJhbGFuY2U7XFxufVxcblxcbiN3cmFwcGVyIHtcXG4gICAgd2lkdGg6IDUwJTtcXG4gICAgbWFyZ2luLWxlZnQ6IDI1JTtcXG59XFxuXCIsIFwiXCIse1widmVyc2lvblwiOjMsXCJzb3VyY2VzXCI6W1wid2VicGFjazovLy4vc3R5bGUvbWFpbi5jc3NcIl0sXCJuYW1lc1wiOltdLFwibWFwcGluZ3NcIjpcIkFBS0EsY0FBYztBQUNkO0lBQ0k7UUFDSSxtQkFBbUI7UUFDbkIsY0FBYztJQUNsQjs7SUFFQTtRQUNJLGNBQWM7SUFDbEI7O0lBRUE7UUFDSSx5QkFBeUI7UUFDekIsY0FBYztJQUNsQjtBQUNKOzs7O0FBSUEsZUFBZTtBQUNmO0lBQ0k7UUFDSSx5QkFBeUI7UUFDekIsY0FBYztJQUNsQjs7SUFFQTtRQUNJLGNBQWM7SUFDbEI7O0lBRUE7UUFDSSx5QkFBeUI7UUFDekIsY0FBYztJQUNsQjtBQUNKOztBQUVBO0lBQ0ksWUFBWTtJQUNaLGFBQWE7SUFDYixlQUFlO0lBQ2YsZ0JBQWdCO0lBQ2hCLGlCQUFpQjtBQUNyQjs7QUFFQTtJQUNJLHNDQUFzQztJQUN0QyxZQUFZO0lBQ1osZUFBZTtBQUNuQjs7QUFFQTtJQUNJLGFBQWE7SUFDYiw4QkFBOEI7QUFDbEM7O0FBRUE7SUFDSSxzQkFBc0I7SUFDdEIscUJBQXFCO0FBQ3pCOztBQUVBO0lBQ0ksY0FBYztJQUNkLFVBQVU7QUFDZDs7O0FBR0E7SUFDSSx1Q0FBdUM7SUFDdkMsa0NBQWtDO0lBQ2xDLHNCQUFzQjtJQUN0Qix1QkFBdUI7QUFDM0I7O0FBRUE7SUFDSSwrQkFBK0I7QUFDbkM7O0FBRUE7SUFDSSxXQUFXO0lBQ1gsaUJBQWlCO0FBQ3JCOztBQUVBO0lBQ0ksZUFBZTtJQUNmLGFBQWE7SUFDYixnQkFBZ0I7SUFDaEIsbUJBQW1CO0FBQ3ZCOztBQUVBO0lBQ0ksVUFBVTtJQUNWLGdCQUFnQjtBQUNwQjs7QUFFQTtJQUNJLG1CQUFtQjtJQUNuQix3QkFBd0I7SUFDeEIsWUFBWTtJQUNaLGdCQUFnQjtJQUNoQixZQUFZO0lBQ1osZUFBZTtBQUNuQjs7QUFFQTtJQUNJLFVBQVU7QUFDZDs7QUFFQTtJQUNJLGtCQUFrQjtBQUN0Qjs7QUFFQTtJQUNJLFVBQVU7SUFDVixnQkFBZ0I7QUFDcEJcIixcInNvdXJjZXNDb250ZW50XCI6W1wiQGltcG9ydCB1cmwoXFxcImh0dHBzOi8vZm9udHMuZ29vZ2xlYXBpcy5jb20vY3NzMj9mYW1pbHk9UXVpY2tzYW5kOndnaHRAMzAwOzQwMCZkaXNwbGF5PXN3YXBcXFwiKTtcXG5AaW1wb3J0IHVybCgnaHR0cHM6Ly9mb250cy5nb29nbGVhcGlzLmNvbS9jc3MyP2ZhbWlseT1JQk0rUGxleCtNb25vJmRpc3BsYXk9c3dhcCcpO1xcblxcbkBpbXBvcnQgdXJsKFxcXCJodHRwczovL2ZvbnRzLmdvb2dsZWFwaXMuY29tL2NzczI/ZmFtaWx5PVdvcmsrU2FucyZkaXNwbGF5PXN3YXBcXFwiKTtcXG5cXG4vKiBEYXJrIG1vZGUgKi9cXG5AbWVkaWEgKHByZWZlcnMtY29sb3Itc2NoZW1lOiBkYXJrKSB7XFxuICAgIGJvZHkge1xcbiAgICAgICAgYmFja2dyb3VuZDogIzE4MTgxODtcXG4gICAgICAgIGNvbG9yOiAjZDhkOGQ4O1xcbiAgICB9XFxuXFxuICAgIGEge1xcbiAgICAgICAgY29sb3I6ICNDRjlGRkY7XFxuICAgIH1cXG5cXG4gICAgLmZpZWxkIHtcXG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6ICMyODI4Mjg7XFxuICAgICAgICBjb2xvcjogI2Q4ZDhkODtcXG4gICAgfVxcbn1cXG5cXG5cXG5cXG4vKiBMaWdodCBtb2RlICovXFxuQG1lZGlhIChwcmVmZXJzLWNvbG9yLXNjaGVtZTogbGlnaHQpIHtcXG4gICAgYm9keSB7XFxuICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZjVmNWY1O1xcbiAgICAgICAgY29sb3I6ICMyODI4Mjg7XFxuICAgIH1cXG5cXG4gICAgYSB7XFxuICAgICAgICBjb2xvcjogIzQwMDA4MDtcXG4gICAgfVxcblxcbiAgICAuZmllbGQge1xcbiAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogI2Q4ZDhkODtcXG4gICAgICAgIGNvbG9yOiAjMjgyODI4O1xcbiAgICB9XFxufVxcblxcbi5Db2RlTWlycm9yIHtcXG4gICAgbWFyZ2luOiBhdXRvO1xcbiAgICBoZWlnaHQ6IDQ1MHB4O1xcbiAgICBmb250LXNpemU6IDE1cHg7XFxuICAgIHRleHQtYWxpZ246IGxlZnQ7XFxuICAgIHRleHQtc2hhZG93OiBub25lO1xcbn1cXG5cXG5idXR0b24ge1xcbiAgICBmb250LXN0eWxlOiBcXFwiSUJNIFBsZXggTW9ub1xcXCIsIG1vbm9zcGFjZTtcXG4gICAgcGFkZGluZzogNHB4O1xcbiAgICBtYXJnaW4tdG9wOiA1cHg7XFxufVxcblxcbi5zZWxlY3RvcnMge1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XFxufVxcblxcbnNlbGVjdCB7XFxuICAgIGZvbnQtZmFtaWx5OiBtb25vc3BhY2U7XFxuICAgIGZvbnQ6IFxcXCJJQk0gUGxleCBNb25vXFxcIjtcXG59XFxuXFxuI3dyYXBwZXIge1xcbiAgICBtYXJnaW4tdG9wOiAzJTtcXG4gICAgd2lkdGg6IDUwJTtcXG59XFxuXFxuXFxuYm9keSB7XFxuICAgIGZvbnQtZmFtaWx5OiBcXFwiSUJNIFBsZXggTW9ub1xcXCIsIG1vbm9zcGFjZTtcXG4gICAgdGV4dC1yZW5kZXJpbmc6IG9wdGltaXplTGVnaWJpbGl0eTtcXG4gICAgLyogbGluZS1oZWlnaHQ6IDEuNTsgKi9cXG4gICAgLyogbWFyZ2luOiAxcmVtIDFyZW07ICovXFxufVxcblxcbmh0bWwge1xcbiAgICBtYXJnaW4tbGVmdDogY2FsYygxMDB2dyAtIDEwMCUpO1xcbn1cXG5cXG5hOnZpc2l0ZWQge1xcbiAgICBjb2xvcjogZ3JheTtcXG4gICAgZm9udC13ZWlnaHQ6IGJvbGQ7XFxufVxcblxcbmZvb3RlciB7XFxuICAgIGZvbnQtc2l6ZTogMTRweDtcXG4gICAgcGFkZGluZzogMjBweDtcXG4gICAgbWFyZ2luLWxlZnQ6IDMwJTtcXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG59XFxuXFxuLm91dHB1dCB7XFxuICAgIHdpZHRoOiA3MCU7XFxuICAgIG1hcmdpbi10b3A6IDEwcHg7XFxufVxcblxcbi5maWVsZCB7XFxuICAgIGJvcmRlci1yYWRpdXM6IDEwcHg7XFxuICAgIC1tb3otYm9yZGVyLXJhZGl1czogMTBweDtcXG4gICAgbWFyZ2luOiBhdXRvO1xcbiAgICB0ZXh0LWFsaWduOiBsZWZ0O1xcbiAgICBwYWRkaW5nOiA1cHg7XFxuICAgIGZvbnQtc2l6ZTogMTRweDtcXG59XFxuXFxuLmJveCB7XFxuICAgIHdpZHRoOiA5MCU7XFxufVxcblxcbnByZSB7XFxuICAgIHRleHQtd3JhcDogYmFsYW5jZTtcXG59XFxuXFxuI3dyYXBwZXIge1xcbiAgICB3aWR0aDogNTAlO1xcbiAgICBtYXJnaW4tbGVmdDogMjUlO1xcbn1cXG5cIl0sXCJzb3VyY2VSb290XCI6XCJcIn1dKTtcbi8vIEV4cG9ydHNcbmV4cG9ydCBkZWZhdWx0IF9fX0NTU19MT0FERVJfRVhQT1JUX19fO1xuIiwiXG4gICAgICBpbXBvcnQgQVBJIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5qZWN0U3R5bGVzSW50b1N0eWxlVGFnLmpzXCI7XG4gICAgICBpbXBvcnQgZG9tQVBJIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVEb21BUEkuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRGbiBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydEJ5U2VsZWN0b3IuanNcIjtcbiAgICAgIGltcG9ydCBzZXRBdHRyaWJ1dGVzIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0U3R5bGVFbGVtZW50IGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0U3R5bGVFbGVtZW50LmpzXCI7XG4gICAgICBpbXBvcnQgc3R5bGVUYWdUcmFuc2Zvcm1GbiBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlVGFnVHJhbnNmb3JtLmpzXCI7XG4gICAgICBpbXBvcnQgY29udGVudCwgKiBhcyBuYW1lZEV4cG9ydCBmcm9tIFwiISEuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL21haW4uY3NzXCI7XG4gICAgICBcbiAgICAgIFxuXG52YXIgb3B0aW9ucyA9IHt9O1xuXG5vcHRpb25zLnN0eWxlVGFnVHJhbnNmb3JtID0gc3R5bGVUYWdUcmFuc2Zvcm1Gbjtcbm9wdGlvbnMuc2V0QXR0cmlidXRlcyA9IHNldEF0dHJpYnV0ZXM7XG5cbiAgICAgIG9wdGlvbnMuaW5zZXJ0ID0gaW5zZXJ0Rm4uYmluZChudWxsLCBcImhlYWRcIik7XG4gICAgXG5vcHRpb25zLmRvbUFQSSA9IGRvbUFQSTtcbm9wdGlvbnMuaW5zZXJ0U3R5bGVFbGVtZW50ID0gaW5zZXJ0U3R5bGVFbGVtZW50O1xuXG52YXIgdXBkYXRlID0gQVBJKGNvbnRlbnQsIG9wdGlvbnMpO1xuXG5cblxuZXhwb3J0ICogZnJvbSBcIiEhLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9tYWluLmNzc1wiO1xuICAgICAgIGV4cG9ydCBkZWZhdWx0IGNvbnRlbnQgJiYgY29udGVudC5sb2NhbHMgPyBjb250ZW50LmxvY2FscyA6IHVuZGVmaW5lZDtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==