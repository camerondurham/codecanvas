"use strict";
(self["webpackChunkrunner_web_frontend"] = self["webpackChunkrunner_web_frontend"] || []).push([["langs"],{

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


/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ __webpack_require__.O(0, ["vendors-node_modules_codemirror_lib_codemirror_js"], () => (__webpack_exec__("./js/langs-request.js")));
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGFuZ3MuMzM5YzQ0MGE4YmQ0Y2M4ZjM5ODMuYnVuZGxlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsdUNBQXVDOztBQUV2QztBQUNBO0FBQ0E7QUFDQSxNQUFNLElBQWtDO0FBQ3hDLFdBQVcsT0FBVztBQUN0QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxpRUFBZSxZQUFZLEVBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7QUN2SGM7O0FBRTFDO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQixxREFBWSxPQUFPLHFEQUFZO0FBQ25EO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQSxpRUFBZSxXQUFXLEVBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9ydW5uZXItd2ViLWZyb250ZW5kLy4vanMvY29uZmlnLXV0aWxzLmpzIiwid2VicGFjazovL3J1bm5lci13ZWItZnJvbnRlbmQvLi9qcy9sYW5ncy1yZXF1ZXN0LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImZ1bmN0aW9uIGdldFNlbGVjdGVkTGFuZ3VhZ2UoKSB7XG4gIGNvbnN0IHNlbGVjdG9yID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJsYW5nLXNlbGVjdFwiKTtcbiAgcmV0dXJuIHNlbGVjdG9yLm9wdGlvbnNbc2VsZWN0b3Iuc2VsZWN0ZWRJbmRleF0uaW5uZXJUZXh0O1xufVxuXG4vLyBFbnZpcm9ubWVudCBjb25maWd1cmF0aW9uXG5jb25zdCBlbnZpcm9ubWVudHMgPSB7XG4gIGxvY2FsOiB7XG4gICAgdXJsOiBcImh0dHA6Ly9sb2NhbGhvc3Q6MTAxMDAvYXBpL3YxL1wiLFxuICAgIG5hbWU6IFwiTG9jYWwgRGV2ZWxvcG1lbnRcIixcbiAgICBkZXNjcmlwdGlvbjogXCJMb2NhbCBkZXZlbG9wbWVudCBzZXJ2ZXJcIlxuICB9LFxuICBzdGFnaW5nOiB7XG4gICAgdXJsOiBcImh0dHBzOi8vcnVubmVyLXN0YWdpbmcuZmx5LmRldi9hcGkvdjEvXCIsXG4gICAgbmFtZTogXCJTdGFnaW5nXCIsXG4gICAgZGVzY3JpcHRpb246IFwiUHJlLXByb2R1Y3Rpb24gdGVzdGluZyBlbnZpcm9ubWVudFwiXG4gIH0sXG4gIHByb2R1Y3Rpb246IHtcbiAgICB1cmw6IFwiaHR0cHM6Ly9ydW5uZXIuZmx5LmRldi9hcGkvdjEvXCIsXG4gICAgbmFtZTogXCJQcm9kdWN0aW9uXCIsXG4gICAgZGVzY3JpcHRpb246IFwiTGl2ZSBwcm9kdWN0aW9uIGVudmlyb25tZW50XCJcbiAgfVxufTtcblxuLy8gQ3VycmVudCBlbnZpcm9ubWVudCBzdGF0ZVxubGV0IGN1cnJlbnRFbnZpcm9ubWVudCA9ICdwcm9kdWN0aW9uJzsgLy8gRGVmYXVsdCB0byBwcm9kdWN0aW9uXG5cbi8vIEVudmlyb25tZW50IGRldGVjdGlvbiBsb2dpYyAoZmFsbGJhY2sgZm9yIGluaXRpYWwgbG9hZClcbmZ1bmN0aW9uIGRldGVjdEVudmlyb25tZW50KCkge1xuICAvLyBDaGVjayBpZiBlbnZpcm9ubWVudCB3YXMgc2V0IGF0IGJ1aWxkIHRpbWVcbiAgaWYgKHR5cGVvZiBFTlZJUk9OTUVOVCAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICByZXR1cm4gRU5WSVJPTk1FTlQ7XG4gIH1cbiAgXG4gIC8vIEZhbGxiYWNrIHRvIGhvc3RuYW1lLWJhc2VkIGRldGVjdGlvblxuICBjb25zdCBob3N0bmFtZSA9IHdpbmRvdy5sb2NhdGlvbi5ob3N0bmFtZTtcbiAgXG4gIGlmIChob3N0bmFtZSA9PT0gJ2xvY2FsaG9zdCcgfHwgaG9zdG5hbWUgPT09ICcxMjcuMC4wLjEnKSB7XG4gICAgcmV0dXJuICdsb2NhbCc7XG4gIH0gZWxzZSBpZiAoaG9zdG5hbWUuaW5jbHVkZXMoJ3N0YWdpbmcnKSkge1xuICAgIHJldHVybiAnc3RhZ2luZyc7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuICdwcm9kdWN0aW9uJztcbiAgfVxufVxuXG4vLyBHZXQgc2VsZWN0ZWQgZW52aXJvbm1lbnQgZnJvbSBkcm9wZG93blxuZnVuY3Rpb24gZ2V0U2VsZWN0ZWRFbnZpcm9ubWVudCgpIHtcbiAgY29uc3Qgc2VsZWN0b3IgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImVudi1zZWxlY3RcIik7XG4gIGlmIChzZWxlY3Rvcikge1xuICAgIHJldHVybiBzZWxlY3Rvci52YWx1ZTtcbiAgfVxuICByZXR1cm4gZGV0ZWN0RW52aXJvbm1lbnQoKTtcbn1cblxuLy8gU2V0IGVudmlyb25tZW50IGFuZCB1cGRhdGUgY29uZmlndXJhdGlvblxuZnVuY3Rpb24gc2V0RW52aXJvbm1lbnQoZW52KSB7XG4gIGlmIChlbnZpcm9ubWVudHNbZW52XSkge1xuICAgIGN1cnJlbnRFbnZpcm9ubWVudCA9IGVudjtcbiAgICBcbiAgICAvLyBVcGRhdGUgZHJvcGRvd24gaWYgaXQgZXhpc3RzXG4gICAgY29uc3Qgc2VsZWN0b3IgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImVudi1zZWxlY3RcIik7XG4gICAgaWYgKHNlbGVjdG9yKSB7XG4gICAgICBzZWxlY3Rvci52YWx1ZSA9IGVudjtcbiAgICB9XG4gICAgXG4gICAgLy8gVXBkYXRlIHRoZSBydW5uZXJDb25maWcgVVJMXG4gICAgcnVubmVyQ29uZmlnLnVybCA9IGVudmlyb25tZW50c1tlbnZdLnVybDtcbiAgICBydW5uZXJDb25maWcuZW52aXJvbm1lbnQgPSBlbnY7XG4gICAgXG4gICAgLy8gVHJpZ2dlciBlbnZpcm9ubWVudCBjaGFuZ2UgZXZlbnRcbiAgICBjb25zdCBldmVudCA9IG5ldyBDdXN0b21FdmVudCgnZW52aXJvbm1lbnRDaGFuZ2VkJywgeyBcbiAgICAgIGRldGFpbDogeyBcbiAgICAgICAgZW52aXJvbm1lbnQ6IGVudiwgXG4gICAgICAgIGNvbmZpZzogZW52aXJvbm1lbnRzW2Vudl0gXG4gICAgICB9IFxuICAgIH0pO1xuICAgIGRvY3VtZW50LmRpc3BhdGNoRXZlbnQoZXZlbnQpO1xuICB9XG59XG5cbi8vIEdldCBjdXJyZW50IGVudmlyb25tZW50IGNvbmZpZ3VyYXRpb25cbmZ1bmN0aW9uIGdldEVudmlyb25tZW50Q29uZmlnKCkge1xuICBjb25zdCBlbnYgPSBnZXRTZWxlY3RlZEVudmlyb25tZW50KCk7XG4gIHJldHVybiBlbnZpcm9ubWVudHNbZW52XSB8fCBlbnZpcm9ubWVudHMucHJvZHVjdGlvbjtcbn1cblxuLy8gSW5pdGlhbGl6ZSBlbnZpcm9ubWVudCBvbiBwYWdlIGxvYWRcbmZ1bmN0aW9uIGluaXRpYWxpemVFbnZpcm9ubWVudCgpIHtcbiAgY29uc3QgZGV0ZWN0ZWRFbnYgPSBkZXRlY3RFbnZpcm9ubWVudCgpO1xuICBzZXRFbnZpcm9ubWVudChkZXRlY3RlZEVudik7XG4gIFxuICAvLyBTZXQgdXAgZW52aXJvbm1lbnQgc2VsZWN0b3IgY2hhbmdlIGhhbmRsZXJcbiAgY29uc3Qgc2VsZWN0b3IgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImVudi1zZWxlY3RcIik7XG4gIGlmIChzZWxlY3Rvcikge1xuICAgIHNlbGVjdG9yLmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIGZ1bmN0aW9uKCkge1xuICAgICAgc2V0RW52aXJvbm1lbnQodGhpcy52YWx1ZSk7XG4gICAgfSk7XG4gIH1cbn1cblxuY29uc3QgcnVubmVyQ29uZmlnID0ge1xuICBnZXRTZWxlY3RlZExhbmd1YWdlOiBnZXRTZWxlY3RlZExhbmd1YWdlLFxuICBnZXQgdXJsKCkge1xuICAgIHJldHVybiBnZXRFbnZpcm9ubWVudENvbmZpZygpLnVybDtcbiAgfSxcbiAgcnVuRW5kcG9pbnQ6IFwicnVuXCIsXG4gIGxhbmdFbmRwb2ludDogXCJsYW5ndWFnZXNcIixcbiAgZ2V0IGVudmlyb25tZW50KCkge1xuICAgIHJldHVybiBnZXRTZWxlY3RlZEVudmlyb25tZW50KCk7XG4gIH0sXG4gIHNldEVudmlyb25tZW50OiBzZXRFbnZpcm9ubWVudCxcbiAgZ2V0U2VsZWN0ZWRFbnZpcm9ubWVudDogZ2V0U2VsZWN0ZWRFbnZpcm9ubWVudCxcbiAgaW5pdGlhbGl6ZUVudmlyb25tZW50OiBpbml0aWFsaXplRW52aXJvbm1lbnQsXG4gIGVudmlyb25tZW50czogZW52aXJvbm1lbnRzXG59O1xuXG4vLyBvbmx5IHNpbmdsZSBleHBvcnQgcGVyIC5qcyBmaWxlIGFsbG93ZWRcbi8vIGV4cG9ydGluZyB0aGlzIHNpbmNlIHdlIHdpbGwgbmVlZCBpdCB0byByZXRyaWV2ZSB0aGUgY3VycmVudCBsYW5ndWFnZSBmcm9tIHRoZSBkb2N1bWVudC9ET01cbmV4cG9ydCBkZWZhdWx0IHJ1bm5lckNvbmZpZztcbiIsImltcG9ydCBydW5uZXJDb25maWcgZnJvbSBcIi4vY29uZmlnLXV0aWxzXCI7XG5cbmZ1bmN0aW9uIGxhbmdSZXF1ZXN0KCkge1xuICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgIGxldCB4aHIgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcbiAgICBjb25zdCBmdWxsVXJsID0gcnVubmVyQ29uZmlnLnVybCArIHJ1bm5lckNvbmZpZy5sYW5nRW5kcG9pbnQ7XG4gICAgeGhyLm9wZW4oXCJHRVRcIiwgZnVsbFVybCk7XG4gICAgeGhyLm9ubG9hZCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIGlmICh0aGlzLnN0YXR1cyA+PSAyMDAgJiYgdGhpcy5zdGF0dXMgPCA0MDApIHtcbiAgICAgICAgcmVzb2x2ZSh4aHIucmVzcG9uc2UpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmVqZWN0KHtcbiAgICAgICAgICBzdGF0dXM6IHRoaXMuc3RhdHVzLFxuICAgICAgICAgIHN0YXR1c1RleHQ6IHhoci5zdGF0dXNUZXh0LFxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9O1xuICAgIHhoci5vbmVycm9yID0gZnVuY3Rpb24gKCkge1xuICAgICAgcmVqZWN0KHtcbiAgICAgICAgc3RhdHVzOiB0aGlzLnN0YXR1cyxcbiAgICAgICAgc3RhdHVzVGV4dDogeGhyLnN0YXR1c1RleHQsXG4gICAgICB9KTtcbiAgICB9O1xuICAgIHhoci5zZW5kKCk7XG4gIH0pO1xufVxuXG5leHBvcnQgZGVmYXVsdCBsYW5nUmVxdWVzdDtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==