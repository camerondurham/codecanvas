"use strict";
(self["webpackChunkrunner_web_frontend"] = self["webpackChunkrunner_web_frontend"] || []).push([["langs"],{

/***/ "./js/langs-request.js":
/*!*****************************!*\
  !*** ./js/langs-request.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
// TODO: make this a configurable export from load.js
const url = "https://runner.fly.dev/api/v1/";
const lang_endpoint = "languages";

function langRequest() {
  return new Promise(function (resolve, reject) {
    let xhr = new XMLHttpRequest();
    xhr.open("GET", url + lang_endpoint);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGFuZ3MuZWMxNmE0NTNjZGQxMWMwZGVkZGUuYnVuZGxlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0EsR0FBRztBQUNIOztBQUVBLGlFQUFlLFdBQVcsRUFBQyIsInNvdXJjZXMiOlsid2VicGFjazovL3J1bm5lci13ZWItZnJvbnRlbmQvLi9qcy9sYW5ncy1yZXF1ZXN0LmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIFRPRE86IG1ha2UgdGhpcyBhIGNvbmZpZ3VyYWJsZSBleHBvcnQgZnJvbSBsb2FkLmpzXG5jb25zdCB1cmwgPSBcImh0dHBzOi8vcnVubmVyLmZseS5kZXYvYXBpL3YxL1wiO1xuY29uc3QgbGFuZ19lbmRwb2ludCA9IFwibGFuZ3VhZ2VzXCI7XG5cbmZ1bmN0aW9uIGxhbmdSZXF1ZXN0KCkge1xuICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgIGxldCB4aHIgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcbiAgICB4aHIub3BlbihcIkdFVFwiLCB1cmwgKyBsYW5nX2VuZHBvaW50KTtcbiAgICB4aHIub25sb2FkID0gZnVuY3Rpb24gKCkge1xuICAgICAgaWYgKHRoaXMuc3RhdHVzID49IDIwMCAmJiB0aGlzLnN0YXR1cyA8IDQwMCkge1xuICAgICAgICByZXNvbHZlKHhoci5yZXNwb25zZSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZWplY3Qoe1xuICAgICAgICAgIHN0YXR1czogdGhpcy5zdGF0dXMsXG4gICAgICAgICAgc3RhdHVzVGV4dDogeGhyLnN0YXR1c1RleHQsXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH07XG4gICAgeGhyLm9uZXJyb3IgPSBmdW5jdGlvbiAoKSB7XG4gICAgICByZWplY3Qoe1xuICAgICAgICBzdGF0dXM6IHRoaXMuc3RhdHVzLFxuICAgICAgICBzdGF0dXNUZXh0OiB4aHIuc3RhdHVzVGV4dCxcbiAgICAgIH0pO1xuICAgIH07XG4gICAgeGhyLnNlbmQoKTtcbiAgfSk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGxhbmdSZXF1ZXN0O1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9