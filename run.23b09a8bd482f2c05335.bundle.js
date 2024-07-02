"use strict";
(self["webpackChunkrunner_web_frontend"] = self["webpackChunkrunner_web_frontend"] || []).push([["run"],{

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

const runnerConfig = {
  getSelectedLanguage: getSelectedLanguage,
  // Uncomment for local testing
  // url: "http://localhost:10100/api/v1/",
  url: "https://runner.fly.dev/api/v1/",
  runEndpoint: "run",
  langEndpoint: "languages",
};

// only single export per .js file allowed
// exporting this since we will need it to retrieve the current language from the document/DOM
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (runnerConfig);


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


/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ __webpack_require__.O(0, ["vendors-node_modules_codemirror_lib_codemirror_css","vendors-node_modules_codemirror_lib_codemirror_js"], () => (__webpack_exec__("./js/run-request.js")));
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicnVuLjIzYjA5YThiZDQ4MmYyYzA1MzM1LmJ1bmRsZS5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsaUVBQWUsWUFBWSxFQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNoQk07QUFDUTtBQUNIOztBQUV2QztBQUNBO0FBQ0E7QUFDQSxjQUFjLHdEQUFtQjtBQUNqQyxnQkFBZ0IseUVBQWdDO0FBQ2hEO0FBQ0E7QUFDQSxvQkFBb0IseURBQWdCLEdBQUcsaUVBQXdCO0FBQy9EO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0EsR0FBRzs7QUFFSDs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQSxpRUFBZSxPQUFPLEVBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9ydW5uZXItd2ViLWZyb250ZW5kLy4vanMvY29uZmlnLXV0aWxzLmpzIiwid2VicGFjazovL3J1bm5lci13ZWItZnJvbnRlbmQvLi9qcy9ydW4tcmVxdWVzdC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJmdW5jdGlvbiBnZXRTZWxlY3RlZExhbmd1YWdlKCkge1xuICBjb25zdCBzZWxlY3RvciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibGFuZy1zZWxlY3RcIik7XG4gIHJldHVybiBzZWxlY3Rvci5vcHRpb25zW3NlbGVjdG9yLnNlbGVjdGVkSW5kZXhdLmlubmVyVGV4dDtcbn1cblxuY29uc3QgcnVubmVyQ29uZmlnID0ge1xuICBnZXRTZWxlY3RlZExhbmd1YWdlOiBnZXRTZWxlY3RlZExhbmd1YWdlLFxuICAvLyBVbmNvbW1lbnQgZm9yIGxvY2FsIHRlc3RpbmdcbiAgLy8gdXJsOiBcImh0dHA6Ly9sb2NhbGhvc3Q6MTAxMDAvYXBpL3YxL1wiLFxuICB1cmw6IFwiaHR0cHM6Ly9ydW5uZXIuZmx5LmRldi9hcGkvdjEvXCIsXG4gIHJ1bkVuZHBvaW50OiBcInJ1blwiLFxuICBsYW5nRW5kcG9pbnQ6IFwibGFuZ3VhZ2VzXCIsXG59O1xuXG4vLyBvbmx5IHNpbmdsZSBleHBvcnQgcGVyIC5qcyBmaWxlIGFsbG93ZWRcbi8vIGV4cG9ydGluZyB0aGlzIHNpbmNlIHdlIHdpbGwgbmVlZCBpdCB0byByZXRyaWV2ZSB0aGUgY3VycmVudCBsYW5ndWFnZSBmcm9tIHRoZSBkb2N1bWVudC9ET01cbmV4cG9ydCBkZWZhdWx0IHJ1bm5lckNvbmZpZztcbiIsImltcG9ydCBjb2RlTWlycm9yIGZyb20gXCIuL2VkaXRvclwiO1xuaW1wb3J0IHJ1bm5lckNvbmZpZyBmcm9tIFwiLi9jb25maWctdXRpbHNcIjtcbmltcG9ydCBcImNvZGVtaXJyb3IvbGliL2NvZGVtaXJyb3IuY3NzXCI7XG5cbmZ1bmN0aW9uIHJ1blJlcXVlc3QoKSB7XG4gIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcbiAgICB2YXIgcmVxID0ge1xuICAgICAgc291cmNlOiBjb2RlTWlycm9yLmdldFZhbHVlKCksXG4gICAgICBsYW5ndWFnZTogcnVubmVyQ29uZmlnLmdldFNlbGVjdGVkTGFuZ3VhZ2UoKSxcbiAgICB9O1xuICAgIGxldCB4aHIgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcbiAgICBjb25zdCBmdWxsVXJsID0gcnVubmVyQ29uZmlnLnVybCArIHJ1bm5lckNvbmZpZy5ydW5FbmRwb2ludDtcbiAgICB4aHIub3BlbihcIlBPU1RcIiwgZnVsbFVybCk7XG4gICAgeGhyLnNldFJlcXVlc3RIZWFkZXIoXCJDb250ZW50LVR5cGVcIiwgXCJhcHBsaWNhdGlvbi9qc29uXCIpO1xuICAgIHhoci5vbmxvYWQgPSBmdW5jdGlvbigpIHtcbiAgICAgIGlmICh0aGlzLnN0YXR1cyA+PSAyMDAgJiYgdGhpcy5zdGF0dXMgPCA0MDApIHtcbiAgICAgICAgcmVzb2x2ZSh4aHIucmVzcG9uc2UpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmVqZWN0KHtcbiAgICAgICAgICBzdGF0dXM6IHRoaXMuc3RhdHVzLFxuICAgICAgICAgIHN0YXR1c1RleHQ6IHhoci5zdGF0dXNUZXh0LFxuICAgICAgICAgIGJvZHk6IHhoci5yZXNwb25zZVxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9O1xuICAgIHhoci5vbmVycm9yID0gZnVuY3Rpb24oKSB7XG4gICAgICByZWplY3Qoe1xuICAgICAgICBzdGF0dXM6IHRoaXMuc3RhdHVzLFxuICAgICAgICBzdGF0dXNUZXh0OiB4aHIuc3RhdHVzVGV4dCxcbiAgICAgICAgYm9keTogeGhyLnJlc3BvbnNlXG4gICAgICB9KTtcbiAgICB9O1xuICAgIHhoci5zZW5kKEpTT04uc3RyaW5naWZ5KHJlcSkpO1xuICB9KTtcbn1cblxuZnVuY3Rpb24gc3RyaW5naWZ5KG9iaikge1xuICBjb25zdCBTRVAgPSBcIiwgXCI7XG4gIGNvbnN0IEVNUFRZX1RFWFQgPSBcIm5vbmVcIjtcblxuICBpZiAob2JqID09PSBudWxsKSByZXR1cm4gRU1QVFlfVEVYVDtcblxuICBsZXQgaW5uZXIgPSBcIlwiO1xuICBjb25zdCBrZXlzID0gT2JqZWN0LmtleXMob2JqKTtcbiAga2V5cy5mb3JFYWNoKChrZXksIGkpID0+IHtcbiAgICBpZiAob2JqW2tleV0gPT09IG51bGwpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpbm5lciArPSBrZXkgKyBcIjogXCIgKyBTdHJpbmcob2JqW2tleV0pO1xuXG4gICAgaWYgKGkgPCBrZXlzLmxlbmd0aCAtIDEpIGlubmVyICs9IFNFUDtcbiAgfSk7XG5cbiAgaWYgKGlubmVyID09IFwiXCIpIGlubmVyID0gRU1QVFlfVEVYVDtcblxuICByZXR1cm4gaW5uZXI7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIHJ1bkNhbGwoKSB7XG4gIGxldCBzdGRvdXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInN0ZG91dC1maWVsZFwiKTtcbiAgbGV0IHN0ZGVyciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic3RkZXJyLWZpZWxkXCIpO1xuICBsZXQgZXJyb3IgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImVyci1maWVsZFwiKTtcblxuXG4gIGF3YWl0IHJ1blJlcXVlc3QoKVxuICAgIC50aGVuKGZ1bmN0aW9uKHJlc3VsdCkge1xuICAgICAgbGV0IG91dCA9IEpTT04ucGFyc2UocmVzdWx0KTtcblxuXG4gICAgICBzdGRvdXQuaW5uZXJIVE1MID1cbiAgICAgICAgXCI8cHJlPlN0ZG91dDogXCIgKyBvdXRbXCJzdGRvdXRcIl0gKyBcIjwvcHJlPlwiO1xuICAgICAgc3Rkb3V0LnJlbW92ZUF0dHJpYnV0ZShcImhpZGRlblwiKTtcblxuICAgICAgc3RkZXJyLmlubmVySFRNTCA9XG4gICAgICAgIFwiPHByZT5TdGRlcnI6IFwiICsgb3V0W1wic3RkZXJyXCJdICsgXCI8L3ByZT5cIjtcbiAgICAgIHN0ZGVyci5yZW1vdmVBdHRyaWJ1dGUoXCJoaWRkZW5cIik7XG5cbiAgICAgIGVycm9yLmlubmVySFRNTCA9IFwiPHByZT5FcnJvcjogXCIgKyBvdXRbXCJlcnJvclwiXSArIFwiPC9wcmU+XCI7XG4gICAgfSlcbiAgICAuY2F0Y2goZnVuY3Rpb24oZXJyKSB7XG4gICAgICBjb25zb2xlLmxvZyhlcnIpO1xuICAgICAgc3Rkb3V0LnNldEF0dHJpYnV0ZShcImhpZGRlblwiLCB0cnVlKTtcbiAgICAgIHN0ZGVyci5zZXRBdHRyaWJ1dGUoXCJoaWRkZW5cIiwgdHJ1ZSk7XG4gICAgICBlcnJvci5pbm5lckhUTUwgPSBcIjxwcmU+RXJyb3I6IFwiICsgc3RyaW5naWZ5KGVycikgKyBcIjwvcHJlPlwiO1xuICAgIH0pO1xufVxuXG5leHBvcnQgZGVmYXVsdCBydW5DYWxsO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9