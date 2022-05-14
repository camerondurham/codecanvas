"use strict";
(self["webpackChunkrunner_web_frontend"] = self["webpackChunkrunner_web_frontend"] || []).push([["setCode"],{

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
    _editor__WEBPACK_IMPORTED_MODULE_0__["default"].setValue(
      "def main():\n\tprint('Hello, World!')\n\nif __name__ == '__main__':\n\tmain()"
    );
  } else if (
    lang === "node" ||
    lang === "nodejs" ||
    lang === "js" ||
    lang === "javascript"
  ) {
    _editor__WEBPACK_IMPORTED_MODULE_0__["default"].setValue("console.log('hello world');");
  } else if (lang === "c++" || lang === "cpp" || lang === "c++11") {
    _editor__WEBPACK_IMPORTED_MODULE_0__["default"].setValue(
      `#include<iostream>
int main() {
	std::cout << "hello world" << std::endl;
	return 0;
}`
    );
  } else if (lang === "go" || lang === "golang") {
    _editor__WEBPACK_IMPORTED_MODULE_0__["default"].setValue(
      `package main
import "fmt"
func main() {
    fmt.Println("hello world")
}`
    );
  } else {
    _editor__WEBPACK_IMPORTED_MODULE_0__["default"].setValue(
      "def main():\n\tprint('Hello, World!')\n\nif __name__ == '__main__':\n\tmain()"
    );
  }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (setLang);


/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ __webpack_require__.O(0, ["vendors-node_modules_codemirror_lib_codemirror_js"], () => (__webpack_exec__("./js/set-code.js")));
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2V0Q29kZS45ZWYxNWM2MThhNzE0YTY1ZjA3OS5idW5kbGUuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFBa0M7O0FBRWxDO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSSx3REFBbUI7QUFDdkI7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSSx3REFBbUIsNkJBQTZCO0FBQ3BELElBQUk7QUFDSixJQUFJLHdEQUFtQjtBQUN2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBLElBQUk7QUFDSixJQUFJLHdEQUFtQjtBQUN2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBLElBQUk7QUFDSixJQUFJLHdEQUFtQjtBQUN2QjtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxpRUFBZSxPQUFPLEVBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9ydW5uZXItd2ViLWZyb250ZW5kLy4vanMvc2V0LWNvZGUuanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGNvZGVNaXJyb3IgZnJvbSBcIi4vZWRpdG9yXCI7XG5cbmZ1bmN0aW9uIHNldExhbmcoKSB7XG4gIGNvbnN0IHNlbGVjdG9yID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJsYW5nLXNlbGVjdFwiKTtcbiAgY29uc3QgbGFuZyA9IHNlbGVjdG9yLm9wdGlvbnNbc2VsZWN0b3Iuc2VsZWN0ZWRJbmRleF0uaW5uZXJUZXh0O1xuICBpZiAobGFuZyA9PT0gXCJweXRob24zXCIgfHwgbGFuZyA9PT0gXCJweXRob25cIikge1xuICAgIGNvZGVNaXJyb3Iuc2V0VmFsdWUoXG4gICAgICBcImRlZiBtYWluKCk6XFxuXFx0cHJpbnQoJ0hlbGxvLCBXb3JsZCEnKVxcblxcbmlmIF9fbmFtZV9fID09ICdfX21haW5fXyc6XFxuXFx0bWFpbigpXCJcbiAgICApO1xuICB9IGVsc2UgaWYgKFxuICAgIGxhbmcgPT09IFwibm9kZVwiIHx8XG4gICAgbGFuZyA9PT0gXCJub2RlanNcIiB8fFxuICAgIGxhbmcgPT09IFwianNcIiB8fFxuICAgIGxhbmcgPT09IFwiamF2YXNjcmlwdFwiXG4gICkge1xuICAgIGNvZGVNaXJyb3Iuc2V0VmFsdWUoXCJjb25zb2xlLmxvZygnaGVsbG8gd29ybGQnKTtcIik7XG4gIH0gZWxzZSBpZiAobGFuZyA9PT0gXCJjKytcIiB8fCBsYW5nID09PSBcImNwcFwiIHx8IGxhbmcgPT09IFwiYysrMTFcIikge1xuICAgIGNvZGVNaXJyb3Iuc2V0VmFsdWUoXG4gICAgICBgI2luY2x1ZGU8aW9zdHJlYW0+XG5pbnQgbWFpbigpIHtcblx0c3RkOjpjb3V0IDw8IFwiaGVsbG8gd29ybGRcIiA8PCBzdGQ6OmVuZGw7XG5cdHJldHVybiAwO1xufWBcbiAgICApO1xuICB9IGVsc2UgaWYgKGxhbmcgPT09IFwiZ29cIiB8fCBsYW5nID09PSBcImdvbGFuZ1wiKSB7XG4gICAgY29kZU1pcnJvci5zZXRWYWx1ZShcbiAgICAgIGBwYWNrYWdlIG1haW5cbmltcG9ydCBcImZtdFwiXG5mdW5jIG1haW4oKSB7XG4gICAgZm10LlByaW50bG4oXCJoZWxsbyB3b3JsZFwiKVxufWBcbiAgICApO1xuICB9IGVsc2Uge1xuICAgIGNvZGVNaXJyb3Iuc2V0VmFsdWUoXG4gICAgICBcImRlZiBtYWluKCk6XFxuXFx0cHJpbnQoJ0hlbGxvLCBXb3JsZCEnKVxcblxcbmlmIF9fbmFtZV9fID09ICdfX21haW5fXyc6XFxuXFx0bWFpbigpXCJcbiAgICApO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IHNldExhbmc7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=