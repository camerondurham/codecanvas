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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicnVuLjIzYjA5YThiZDQ4MmYyYzA1MzM1LmJ1bmRsZS5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsaUVBQWUsWUFBWSxFQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNoQk07QUFDUTtBQUNIOztBQUV2QztBQUNBO0FBQ0E7QUFDQSxjQUFjLCtDQUFVO0FBQ3hCLGdCQUFnQixxREFBWTtBQUM1QjtBQUNBO0FBQ0Esb0JBQW9CLHFEQUFZLE9BQU8scURBQVk7QUFDbkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0EsR0FBRztBQUNIOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQSxHQUFHOztBQUVIOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBLGlFQUFlLE9BQU8sRUFBQyIsInNvdXJjZXMiOlsid2VicGFjazovL3J1bm5lci13ZWItZnJvbnRlbmQvLi9qcy9jb25maWctdXRpbHMuanMiLCJ3ZWJwYWNrOi8vcnVubmVyLXdlYi1mcm9udGVuZC8uL2pzL3J1bi1yZXF1ZXN0LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImZ1bmN0aW9uIGdldFNlbGVjdGVkTGFuZ3VhZ2UoKSB7XG4gIGNvbnN0IHNlbGVjdG9yID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJsYW5nLXNlbGVjdFwiKTtcbiAgcmV0dXJuIHNlbGVjdG9yLm9wdGlvbnNbc2VsZWN0b3Iuc2VsZWN0ZWRJbmRleF0uaW5uZXJUZXh0O1xufVxuXG5jb25zdCBydW5uZXJDb25maWcgPSB7XG4gIGdldFNlbGVjdGVkTGFuZ3VhZ2U6IGdldFNlbGVjdGVkTGFuZ3VhZ2UsXG4gIC8vIFVuY29tbWVudCBmb3IgbG9jYWwgdGVzdGluZ1xuICAvLyB1cmw6IFwiaHR0cDovL2xvY2FsaG9zdDoxMDEwMC9hcGkvdjEvXCIsXG4gIHVybDogXCJodHRwczovL3J1bm5lci5mbHkuZGV2L2FwaS92MS9cIixcbiAgcnVuRW5kcG9pbnQ6IFwicnVuXCIsXG4gIGxhbmdFbmRwb2ludDogXCJsYW5ndWFnZXNcIixcbn07XG5cbi8vIG9ubHkgc2luZ2xlIGV4cG9ydCBwZXIgLmpzIGZpbGUgYWxsb3dlZFxuLy8gZXhwb3J0aW5nIHRoaXMgc2luY2Ugd2Ugd2lsbCBuZWVkIGl0IHRvIHJldHJpZXZlIHRoZSBjdXJyZW50IGxhbmd1YWdlIGZyb20gdGhlIGRvY3VtZW50L0RPTVxuZXhwb3J0IGRlZmF1bHQgcnVubmVyQ29uZmlnO1xuIiwiaW1wb3J0IGNvZGVNaXJyb3IgZnJvbSBcIi4vZWRpdG9yXCI7XG5pbXBvcnQgcnVubmVyQ29uZmlnIGZyb20gXCIuL2NvbmZpZy11dGlsc1wiO1xuaW1wb3J0IFwiY29kZW1pcnJvci9saWIvY29kZW1pcnJvci5jc3NcIjtcblxuZnVuY3Rpb24gcnVuUmVxdWVzdCgpIHtcbiAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xuICAgIHZhciByZXEgPSB7XG4gICAgICBzb3VyY2U6IGNvZGVNaXJyb3IuZ2V0VmFsdWUoKSxcbiAgICAgIGxhbmd1YWdlOiBydW5uZXJDb25maWcuZ2V0U2VsZWN0ZWRMYW5ndWFnZSgpLFxuICAgIH07XG4gICAgbGV0IHhociA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuICAgIGNvbnN0IGZ1bGxVcmwgPSBydW5uZXJDb25maWcudXJsICsgcnVubmVyQ29uZmlnLnJ1bkVuZHBvaW50O1xuICAgIHhoci5vcGVuKFwiUE9TVFwiLCBmdWxsVXJsKTtcbiAgICB4aHIuc2V0UmVxdWVzdEhlYWRlcihcIkNvbnRlbnQtVHlwZVwiLCBcImFwcGxpY2F0aW9uL2pzb25cIik7XG4gICAgeGhyLm9ubG9hZCA9IGZ1bmN0aW9uKCkge1xuICAgICAgaWYgKHRoaXMuc3RhdHVzID49IDIwMCAmJiB0aGlzLnN0YXR1cyA8IDQwMCkge1xuICAgICAgICByZXNvbHZlKHhoci5yZXNwb25zZSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZWplY3Qoe1xuICAgICAgICAgIHN0YXR1czogdGhpcy5zdGF0dXMsXG4gICAgICAgICAgc3RhdHVzVGV4dDogeGhyLnN0YXR1c1RleHQsXG4gICAgICAgICAgYm9keTogeGhyLnJlc3BvbnNlXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH07XG4gICAgeGhyLm9uZXJyb3IgPSBmdW5jdGlvbigpIHtcbiAgICAgIHJlamVjdCh7XG4gICAgICAgIHN0YXR1czogdGhpcy5zdGF0dXMsXG4gICAgICAgIHN0YXR1c1RleHQ6IHhoci5zdGF0dXNUZXh0LFxuICAgICAgICBib2R5OiB4aHIucmVzcG9uc2VcbiAgICAgIH0pO1xuICAgIH07XG4gICAgeGhyLnNlbmQoSlNPTi5zdHJpbmdpZnkocmVxKSk7XG4gIH0pO1xufVxuXG5mdW5jdGlvbiBzdHJpbmdpZnkob2JqKSB7XG4gIGNvbnN0IFNFUCA9IFwiLCBcIjtcbiAgY29uc3QgRU1QVFlfVEVYVCA9IFwibm9uZVwiO1xuXG4gIGlmIChvYmogPT09IG51bGwpIHJldHVybiBFTVBUWV9URVhUO1xuXG4gIGxldCBpbm5lciA9IFwiXCI7XG4gIGNvbnN0IGtleXMgPSBPYmplY3Qua2V5cyhvYmopO1xuICBrZXlzLmZvckVhY2goKGtleSwgaSkgPT4ge1xuICAgIGlmIChvYmpba2V5XSA9PT0gbnVsbCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlubmVyICs9IGtleSArIFwiOiBcIiArIFN0cmluZyhvYmpba2V5XSk7XG5cbiAgICBpZiAoaSA8IGtleXMubGVuZ3RoIC0gMSkgaW5uZXIgKz0gU0VQO1xuICB9KTtcblxuICBpZiAoaW5uZXIgPT0gXCJcIikgaW5uZXIgPSBFTVBUWV9URVhUO1xuXG4gIHJldHVybiBpbm5lcjtcbn1cblxuYXN5bmMgZnVuY3Rpb24gcnVuQ2FsbCgpIHtcbiAgbGV0IHN0ZG91dCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic3Rkb3V0LWZpZWxkXCIpO1xuICBsZXQgc3RkZXJyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzdGRlcnItZmllbGRcIik7XG4gIGxldCBlcnJvciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZXJyLWZpZWxkXCIpO1xuXG5cbiAgYXdhaXQgcnVuUmVxdWVzdCgpXG4gICAgLnRoZW4oZnVuY3Rpb24ocmVzdWx0KSB7XG4gICAgICBsZXQgb3V0ID0gSlNPTi5wYXJzZShyZXN1bHQpO1xuXG5cbiAgICAgIHN0ZG91dC5pbm5lckhUTUwgPVxuICAgICAgICBcIjxwcmU+U3Rkb3V0OiBcIiArIG91dFtcInN0ZG91dFwiXSArIFwiPC9wcmU+XCI7XG4gICAgICBzdGRvdXQucmVtb3ZlQXR0cmlidXRlKFwiaGlkZGVuXCIpO1xuXG4gICAgICBzdGRlcnIuaW5uZXJIVE1MID1cbiAgICAgICAgXCI8cHJlPlN0ZGVycjogXCIgKyBvdXRbXCJzdGRlcnJcIl0gKyBcIjwvcHJlPlwiO1xuICAgICAgc3RkZXJyLnJlbW92ZUF0dHJpYnV0ZShcImhpZGRlblwiKTtcblxuICAgICAgZXJyb3IuaW5uZXJIVE1MID0gXCI8cHJlPkVycm9yOiBcIiArIG91dFtcImVycm9yXCJdICsgXCI8L3ByZT5cIjtcbiAgICB9KVxuICAgIC5jYXRjaChmdW5jdGlvbihlcnIpIHtcbiAgICAgIGNvbnNvbGUubG9nKGVycik7XG4gICAgICBzdGRvdXQuc2V0QXR0cmlidXRlKFwiaGlkZGVuXCIsIHRydWUpO1xuICAgICAgc3RkZXJyLnNldEF0dHJpYnV0ZShcImhpZGRlblwiLCB0cnVlKTtcbiAgICAgIGVycm9yLmlubmVySFRNTCA9IFwiPHByZT5FcnJvcjogXCIgKyBzdHJpbmdpZnkoZXJyKSArIFwiPC9wcmU+XCI7XG4gICAgfSk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IHJ1bkNhbGw7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=