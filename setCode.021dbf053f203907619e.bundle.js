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
    fmt.Println("hello world from Go!")
}`
    );
  } else if (lang === "bash" || lange === "sh") {
    _editor__WEBPACK_IMPORTED_MODULE_0__["default"].setValue(
      "echo hello world from bash!"
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2V0Q29kZS4wMjFkYmYwNTNmMjAzOTA3NjE5ZS5idW5kbGUuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFBa0M7O0FBRWxDO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSSx3REFBbUI7QUFDdkI7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSSx3REFBbUIsVUFBVSxPQUFPLDJCQUEyQiwyREFBMkQsK0NBQStDLGdCQUFnQiw0QkFBNEIsY0FBYyxHQUFHLGFBQWEsR0FBRyxpQkFBaUIsNkJBQTZCLE9BQU8sR0FBRyxhQUFhLEtBQUssNkJBQTZCLE9BQU8sR0FBRyxHQUFHLEVBQUU7QUFDaFgsSUFBSTtBQUNKLElBQUksd0RBQW1CO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0EsSUFBSTtBQUNKLElBQUksd0RBQW1CO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0EsSUFBSTtBQUNKLElBQUksd0RBQW1CO0FBQ3ZCO0FBQ0E7QUFDQSxJQUFJO0FBQ0osSUFBSSx3REFBbUI7QUFDdkI7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsaUVBQWUsT0FBTyxFQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vcnVubmVyLXdlYi1mcm9udGVuZC8uL2pzL3NldC1jb2RlLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBjb2RlTWlycm9yIGZyb20gXCIuL2VkaXRvclwiO1xuXG5mdW5jdGlvbiBzZXRMYW5nKCkge1xuICBjb25zdCBzZWxlY3RvciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibGFuZy1zZWxlY3RcIik7XG4gIGNvbnN0IGxhbmcgPSBzZWxlY3Rvci5vcHRpb25zW3NlbGVjdG9yLnNlbGVjdGVkSW5kZXhdLmlubmVyVGV4dDtcbiAgaWYgKGxhbmcgPT09IFwicHl0aG9uM1wiIHx8IGxhbmcgPT09IFwicHl0aG9uXCIpIHtcbiAgICBjb2RlTWlycm9yLnNldFZhbHVlKFxuICAgICAgXCJkZWYgZmlib25hY2NpKG4pOlxcblxcdGlmIG48PTE6XFxuXFx0XFx0cmV0dXJuIG5cXG5cXHRlbHNlOlxcblxcdFxcdHJldHVybihmaWJvbmFjY2kobi0xKSArIGZpYm9uYWNjaShuLTIpKVxcblxcbm4gPSA1XFxuXFxuZmlib19zZXJpZXMgPSBbXVxcblxcbmZvciBpIGluIHJhbmdlKDAsbik6XFxuXFx0Zmlib19zZXJpZXMuYXBwZW5kKGZpYm9uYWNjaShpKSlcXG5cXG5wcmludCgnSGVsbG8sIFdvcmxkIGZyb20gUHl0aG9uISBIZXJlXFxcXCdzIHNvbWUgZmlib25hY2NpIG51bWJlcnM6JylcXG5wcmludChmaWJvX3NlcmllcylcIlxuICAgICk7XG4gIH0gZWxzZSBpZiAoXG4gICAgbGFuZyA9PT0gXCJub2RlXCIgfHxcbiAgICBsYW5nID09PSBcIm5vZGVqc1wiIHx8XG4gICAgbGFuZyA9PT0gXCJqc1wiIHx8XG4gICAgbGFuZyA9PT0gXCJqYXZhc2NyaXB0XCJcbiAgKSB7XG4gICAgY29kZU1pcnJvci5zZXRWYWx1ZSgnY29uc3QgeyBleGVjIH0gPSByZXF1aXJlKFwiY2hpbGRfcHJvY2Vzc1wiKTtcXG5cXG5jb25zb2xlLmxvZyhcIkhlbGxvIHdvcmxkIGZyb20gTm9kZS5qcyEgTXkgdXB0aW1lIGlzOlwiKTtcXG5cXG5leGVjKFwidXB0aW1lXCIsIChlcnJvciwgc3Rkb3V0LCBzdGRlcnIpID0+IHtcXG5cXHRpZiAoZXJyb3IpIHtcXG5cXHRcXHRjb25zb2xlLmxvZyhgZXJyb3I6ICR7ZXJyb3IubWVzc2FnZX1gKTtcXG5cXHRcXHRyZXR1cm47XFxufVxcblxcdGlmIChzdGRlcnIpIHtcXG5cXHRcXHRjb25zb2xlLmxvZyhgc3RkZXJyOiAke3N0ZGVycn1gKTtcXG5cXHRcXHRyZXR1cm47XFxuXFx0fVxcblxcdFxcdGNvbnNvbGUubG9nKGBzdGRvdXQ6ICR7c3Rkb3V0fWApO1xcbn0pOycpO1xuICB9IGVsc2UgaWYgKGxhbmcgPT09IFwiYysrXCIgfHwgbGFuZyA9PT0gXCJjcHBcIiB8fCBsYW5nID09PSBcImMrKzExXCIpIHtcbiAgICBjb2RlTWlycm9yLnNldFZhbHVlKFxuICAgICAgYCNpbmNsdWRlPGlvc3RyZWFtPlxuI2luY2x1ZGU8dGhyZWFkPlxuaW50IG1haW4oKSB7XG5cdHVuc2lnbmVkIGludCBudGhyZWFkcyA9IHN0ZDo6dGhyZWFkOjpoYXJkd2FyZV9jb25jdXJyZW5jeSgpO1xuXHRzdGQ6OmNvdXQgPDwgXCJoZWxsbyB3b3JsZCBmcm9tIEMrKyFcIiA8PCBzdGQ6OmVuZGw7XG5cdHN0ZDo6Y2VyciA8PCBcIkkgaGF2ZSBcIiA8PCBudGhyZWFkcyA8PCBcIiB0aHJlYWRzIVwiIDw8IHN0ZDo6ZW5kbDtcblx0cmV0dXJuIDA7XG59YFxuICAgICk7XG4gIH0gZWxzZSBpZiAobGFuZyA9PT0gXCJnb1wiIHx8IGxhbmcgPT09IFwiZ29sYW5nXCIpIHtcbiAgICBjb2RlTWlycm9yLnNldFZhbHVlKFxuICAgICAgYHBhY2thZ2UgbWFpblxuaW1wb3J0IFwiZm10XCJcbmZ1bmMgbWFpbigpIHtcbiAgICBmbXQuUHJpbnRsbihcImhlbGxvIHdvcmxkIGZyb20gR28hXCIpXG59YFxuICAgICk7XG4gIH0gZWxzZSBpZiAobGFuZyA9PT0gXCJiYXNoXCIgfHwgbGFuZ2UgPT09IFwic2hcIikge1xuICAgIGNvZGVNaXJyb3Iuc2V0VmFsdWUoXG4gICAgICBcImVjaG8gaGVsbG8gd29ybGQgZnJvbSBiYXNoIVwiXG4gICAgKTtcbiAgfSBlbHNlIHtcbiAgICBjb2RlTWlycm9yLnNldFZhbHVlKFxuICAgICAgXCJkZWYgZmlib25hY2NpKG4pOlxcblxcdGlmIG48PTE6XFxuXFx0XFx0cmV0dXJuIG5cXG5cXHRlbHNlOlxcblxcdFxcdHJldHVybihmaWJvbmFjY2kobi0xKSArIGZpYm9uYWNjaShuLTIpKVxcblxcbm4gPSA1XFxuXFxuZmlib19zZXJpZXMgPSBbXVxcblxcbmZvciBpIGluIHJhbmdlKDAsbik6XFxuXFx0Zmlib19zZXJpZXMuYXBwZW5kKGZpYm9uYWNjaShpKSlcXG5cXG5wcmludCgnSGVsbG8sIFdvcmxkIGZyb20gUHl0aG9uISBIZXJlXFxcXCdzIHNvbWUgZmlib25hY2NpIG51bWJlcnM6JylcXG5wcmludChmaWJvX3NlcmllcylcIlxuICAgICk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgc2V0TGFuZztcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==