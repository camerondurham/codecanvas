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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGFuZ3MuMDY2ODlmY2VkNTRkNDcyZGFmZjIuYnVuZGxlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxpRUFBZSxZQUFZLEVBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7QUNoQmM7O0FBRTFDO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQix5REFBZ0IsR0FBRyxrRUFBeUI7QUFDaEU7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0EsR0FBRztBQUNIOztBQUVBLGlFQUFlLFdBQVcsRUFBQyIsInNvdXJjZXMiOlsid2VicGFjazovL3J1bm5lci13ZWItZnJvbnRlbmQvLi9qcy9jb25maWctdXRpbHMuanMiLCJ3ZWJwYWNrOi8vcnVubmVyLXdlYi1mcm9udGVuZC8uL2pzL2xhbmdzLXJlcXVlc3QuanMiXSwic291cmNlc0NvbnRlbnQiOlsiZnVuY3Rpb24gZ2V0U2VsZWN0ZWRMYW5ndWFnZSgpIHtcbiAgY29uc3Qgc2VsZWN0b3IgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImxhbmctc2VsZWN0XCIpO1xuICByZXR1cm4gc2VsZWN0b3Iub3B0aW9uc1tzZWxlY3Rvci5zZWxlY3RlZEluZGV4XS5pbm5lclRleHQ7XG59XG5cbmNvbnN0IHJ1bm5lckNvbmZpZyA9IHtcbiAgZ2V0U2VsZWN0ZWRMYW5ndWFnZTogZ2V0U2VsZWN0ZWRMYW5ndWFnZSxcbiAgLy8gVW5jb21tZW50IGZvciBsb2NhbCB0ZXN0aW5nXG4gIC8vIHVybDogXCJodHRwOi8vbG9jYWxob3N0OjEwMTAwL2FwaS92MS9cIixcbiAgdXJsOiBcImh0dHBzOi8vcnVubmVyLmZseS5kZXYvYXBpL3YxL1wiLFxuICBydW5FbmRwb2ludDogXCJydW5cIixcbiAgbGFuZ0VuZHBvaW50OiBcImxhbmd1YWdlc1wiLFxufTtcblxuLy8gb25seSBzaW5nbGUgZXhwb3J0IHBlciAuanMgZmlsZSBhbGxvd2VkXG4vLyBleHBvcnRpbmcgdGhpcyBzaW5jZSB3ZSB3aWxsIG5lZWQgaXQgdG8gcmV0cmlldmUgdGhlIGN1cnJlbnQgbGFuZ3VhZ2UgZnJvbSB0aGUgZG9jdW1lbnQvRE9NXG5leHBvcnQgZGVmYXVsdCBydW5uZXJDb25maWc7XG4iLCJpbXBvcnQgcnVubmVyQ29uZmlnIGZyb20gXCIuL2NvbmZpZy11dGlsc1wiO1xuXG5mdW5jdGlvbiBsYW5nUmVxdWVzdCgpIHtcbiAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICBsZXQgeGhyID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG4gICAgY29uc3QgZnVsbFVybCA9IHJ1bm5lckNvbmZpZy51cmwgKyBydW5uZXJDb25maWcubGFuZ0VuZHBvaW50O1xuICAgIHhoci5vcGVuKFwiR0VUXCIsIGZ1bGxVcmwpO1xuICAgIHhoci5vbmxvYWQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICBpZiAodGhpcy5zdGF0dXMgPj0gMjAwICYmIHRoaXMuc3RhdHVzIDwgNDAwKSB7XG4gICAgICAgIHJlc29sdmUoeGhyLnJlc3BvbnNlKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJlamVjdCh7XG4gICAgICAgICAgc3RhdHVzOiB0aGlzLnN0YXR1cyxcbiAgICAgICAgICBzdGF0dXNUZXh0OiB4aHIuc3RhdHVzVGV4dCxcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfTtcbiAgICB4aHIub25lcnJvciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIHJlamVjdCh7XG4gICAgICAgIHN0YXR1czogdGhpcy5zdGF0dXMsXG4gICAgICAgIHN0YXR1c1RleHQ6IHhoci5zdGF0dXNUZXh0LFxuICAgICAgfSk7XG4gICAgfTtcbiAgICB4aHIuc2VuZCgpO1xuICB9KTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgbGFuZ1JlcXVlc3Q7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=