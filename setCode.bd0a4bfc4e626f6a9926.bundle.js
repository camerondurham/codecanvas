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
      "def fibonacci(n):\n\tif n<=1:\n\t\treturn n\n\telse:\n\t\treturn(fibonacci(n-1) + fibonacci(n-2))\n\nn = 5\n\nfibo_series = []\n\nfor i in range(0,n):\n\tfibo_series.append(fibonacci(i))\n\nprint('Hello, World from Python! Here\\'s some fibonacci numbers:')\nprint(fibo_series)"
    );
  } else if (
    lang === "node" ||
    lang === "nodejs" ||
    lang === "js" ||
    lang === "javascript"
  ) {
    _editor__WEBPACK_IMPORTED_MODULE_0__["default"].setValue('const { exec } = require("child_process");\n\nconsole.log("Hello world from Node.js! My uptime is:");\n\nexec("uptime", (error, stdout, stderr) => {\n\tif (error) {\n\t\tconsole.log(`error: ${error.message}`);\n\t\treturn;\n}\n\tif (stderr) {\n\t\tconsole.log(`stderr: ${stderr}`);\n\t\treturn;\n\t}\n\t\tconsole.log(`stdout: ${stdout}`);\n});');
  } else if (lang === "c++" || lang === "cpp" || lang === "c++11") {
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
    _editor__WEBPACK_IMPORTED_MODULE_0__["default"].setValue(
      `package main
import "fmt"
func main() {
    fmt.Println("hello world")
}`
    );
  } else {
    _editor__WEBPACK_IMPORTED_MODULE_0__["default"].setValue(
      "def fibonacci(n):\n\tif n<=1:\n\t\treturn n\n\telse:\n\t\treturn(fibonacci(n-1) + fibonacci(n-2))\n\nn = 5\n\nfibo_series = []\n\nfor i in range(0,n):\n\tfibo_series.append(fibonacci(i))\n\nprint('Hello, World from Python! Here\\'s some fibonacci numbers:')\nprint(fibo_series)"
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2V0Q29kZS5iZDBhNGJmYzRlNjI2ZjZhOTkyNi5idW5kbGUuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFBa0M7O0FBRWxDO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSSx3REFBbUI7QUFDdkI7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSSx3REFBbUIsVUFBVSxPQUFPLDJCQUEyQiwyREFBMkQsK0NBQStDLGdCQUFnQiw0QkFBNEIsY0FBYyxHQUFHLGFBQWEsR0FBRyxpQkFBaUIsNkJBQTZCLE9BQU8sR0FBRyxhQUFhLEtBQUssNkJBQTZCLE9BQU8sR0FBRyxHQUFHLEVBQUU7QUFDaFgsSUFBSTtBQUNKLElBQUksd0RBQW1CO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0EsSUFBSTtBQUNKLElBQUksd0RBQW1CO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0EsSUFBSTtBQUNKLElBQUksd0RBQW1CO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGlFQUFlLE9BQU8sRUFBQyIsInNvdXJjZXMiOlsid2VicGFjazovL3J1bm5lci13ZWItZnJvbnRlbmQvLi9qcy9zZXQtY29kZS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgY29kZU1pcnJvciBmcm9tIFwiLi9lZGl0b3JcIjtcblxuZnVuY3Rpb24gc2V0TGFuZygpIHtcbiAgY29uc3Qgc2VsZWN0b3IgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImxhbmctc2VsZWN0XCIpO1xuICBjb25zdCBsYW5nID0gc2VsZWN0b3Iub3B0aW9uc1tzZWxlY3Rvci5zZWxlY3RlZEluZGV4XS5pbm5lclRleHQ7XG4gIGlmIChsYW5nID09PSBcInB5dGhvbjNcIiB8fCBsYW5nID09PSBcInB5dGhvblwiKSB7XG4gICAgY29kZU1pcnJvci5zZXRWYWx1ZShcbiAgICAgIFwiZGVmIGZpYm9uYWNjaShuKTpcXG5cXHRpZiBuPD0xOlxcblxcdFxcdHJldHVybiBuXFxuXFx0ZWxzZTpcXG5cXHRcXHRyZXR1cm4oZmlib25hY2NpKG4tMSkgKyBmaWJvbmFjY2kobi0yKSlcXG5cXG5uID0gNVxcblxcbmZpYm9fc2VyaWVzID0gW11cXG5cXG5mb3IgaSBpbiByYW5nZSgwLG4pOlxcblxcdGZpYm9fc2VyaWVzLmFwcGVuZChmaWJvbmFjY2koaSkpXFxuXFxucHJpbnQoJ0hlbGxvLCBXb3JsZCBmcm9tIFB5dGhvbiEgSGVyZVxcXFwncyBzb21lIGZpYm9uYWNjaSBudW1iZXJzOicpXFxucHJpbnQoZmlib19zZXJpZXMpXCJcbiAgICApO1xuICB9IGVsc2UgaWYgKFxuICAgIGxhbmcgPT09IFwibm9kZVwiIHx8XG4gICAgbGFuZyA9PT0gXCJub2RlanNcIiB8fFxuICAgIGxhbmcgPT09IFwianNcIiB8fFxuICAgIGxhbmcgPT09IFwiamF2YXNjcmlwdFwiXG4gICkge1xuICAgIGNvZGVNaXJyb3Iuc2V0VmFsdWUoJ2NvbnN0IHsgZXhlYyB9ID0gcmVxdWlyZShcImNoaWxkX3Byb2Nlc3NcIik7XFxuXFxuY29uc29sZS5sb2coXCJIZWxsbyB3b3JsZCBmcm9tIE5vZGUuanMhIE15IHVwdGltZSBpczpcIik7XFxuXFxuZXhlYyhcInVwdGltZVwiLCAoZXJyb3IsIHN0ZG91dCwgc3RkZXJyKSA9PiB7XFxuXFx0aWYgKGVycm9yKSB7XFxuXFx0XFx0Y29uc29sZS5sb2coYGVycm9yOiAke2Vycm9yLm1lc3NhZ2V9YCk7XFxuXFx0XFx0cmV0dXJuO1xcbn1cXG5cXHRpZiAoc3RkZXJyKSB7XFxuXFx0XFx0Y29uc29sZS5sb2coYHN0ZGVycjogJHtzdGRlcnJ9YCk7XFxuXFx0XFx0cmV0dXJuO1xcblxcdH1cXG5cXHRcXHRjb25zb2xlLmxvZyhgc3Rkb3V0OiAke3N0ZG91dH1gKTtcXG59KTsnKTtcbiAgfSBlbHNlIGlmIChsYW5nID09PSBcImMrK1wiIHx8IGxhbmcgPT09IFwiY3BwXCIgfHwgbGFuZyA9PT0gXCJjKysxMVwiKSB7XG4gICAgY29kZU1pcnJvci5zZXRWYWx1ZShcbiAgICAgIGAjaW5jbHVkZTxpb3N0cmVhbT5cbiNpbmNsdWRlPHRocmVhZD5cbmludCBtYWluKCkge1xuXHR1bnNpZ25lZCBpbnQgbnRocmVhZHMgPSBzdGQ6OnRocmVhZDo6aGFyZHdhcmVfY29uY3VycmVuY3koKTtcblx0c3RkOjpjb3V0IDw8IFwiaGVsbG8gd29ybGQgZnJvbSBDKyshXCIgPDwgc3RkOjplbmRsO1xuXHRzdGQ6OmNlcnIgPDwgXCJJIGhhdmUgXCIgPDwgbnRocmVhZHMgPDwgXCIgdGhyZWFkcyFcIiA8PCBzdGQ6OmVuZGw7XG5cdHJldHVybiAwO1xufWBcbiAgICApO1xuICB9IGVsc2UgaWYgKGxhbmcgPT09IFwiZ29cIiB8fCBsYW5nID09PSBcImdvbGFuZ1wiKSB7XG4gICAgY29kZU1pcnJvci5zZXRWYWx1ZShcbiAgICAgIGBwYWNrYWdlIG1haW5cbmltcG9ydCBcImZtdFwiXG5mdW5jIG1haW4oKSB7XG4gICAgZm10LlByaW50bG4oXCJoZWxsbyB3b3JsZFwiKVxufWBcbiAgICApO1xuICB9IGVsc2Uge1xuICAgIGNvZGVNaXJyb3Iuc2V0VmFsdWUoXG4gICAgICBcImRlZiBmaWJvbmFjY2kobik6XFxuXFx0aWYgbjw9MTpcXG5cXHRcXHRyZXR1cm4gblxcblxcdGVsc2U6XFxuXFx0XFx0cmV0dXJuKGZpYm9uYWNjaShuLTEpICsgZmlib25hY2NpKG4tMikpXFxuXFxubiA9IDVcXG5cXG5maWJvX3NlcmllcyA9IFtdXFxuXFxuZm9yIGkgaW4gcmFuZ2UoMCxuKTpcXG5cXHRmaWJvX3Nlcmllcy5hcHBlbmQoZmlib25hY2NpKGkpKVxcblxcbnByaW50KCdIZWxsbywgV29ybGQgZnJvbSBQeXRob24hIEhlcmVcXFxcJ3Mgc29tZSBmaWJvbmFjY2kgbnVtYmVyczonKVxcbnByaW50KGZpYm9fc2VyaWVzKVwiXG4gICAgKTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBzZXRMYW5nO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9