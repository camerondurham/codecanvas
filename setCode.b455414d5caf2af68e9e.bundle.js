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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2V0Q29kZS5iNDU1NDE0ZDVjYWYyYWY2OGU5ZS5idW5kbGUuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFBa0M7O0FBRWxDO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSSx3REFBbUI7QUFDdkI7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSSx3REFBbUIsVUFBVSxPQUFPLDJCQUEyQiwyREFBMkQsK0NBQStDLGdCQUFnQiw0QkFBNEIsY0FBYyxHQUFHLGFBQWEsR0FBRyxpQkFBaUIsNkJBQTZCLE9BQU8sR0FBRyxhQUFhLEtBQUssNkJBQTZCLE9BQU8sR0FBRyxHQUFHLEVBQUU7QUFDaFgsSUFBSTtBQUNKLElBQUksd0RBQW1CO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0EsSUFBSTtBQUNKLElBQUksd0RBQW1CO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0EsSUFBSTtBQUNKLElBQUksd0RBQW1CO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGdCQUFnQixPQUFPO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSixJQUFJLHdEQUFtQjtBQUN2QjtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxpRUFBZSxPQUFPLEVBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9ydW5uZXItd2ViLWZyb250ZW5kLy4vanMvc2V0LWNvZGUuanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGNvZGVNaXJyb3IgZnJvbSBcIi4vZWRpdG9yXCI7XG5cbmZ1bmN0aW9uIHNldExhbmcoKSB7XG4gIGNvbnN0IHNlbGVjdG9yID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJsYW5nLXNlbGVjdFwiKTtcbiAgY29uc3QgbGFuZyA9IHNlbGVjdG9yLm9wdGlvbnNbc2VsZWN0b3Iuc2VsZWN0ZWRJbmRleF0uaW5uZXJUZXh0O1xuICBpZiAobGFuZyA9PT0gXCJweXRob24zXCIgfHwgbGFuZyA9PT0gXCJweXRob25cIikge1xuICAgIGNvZGVNaXJyb3Iuc2V0VmFsdWUoXG4gICAgICBcImRlZiBmaWJvbmFjY2kobik6XFxuXFx0aWYgbjw9MTpcXG5cXHRcXHRyZXR1cm4gblxcblxcdGVsc2U6XFxuXFx0XFx0cmV0dXJuKGZpYm9uYWNjaShuLTEpICsgZmlib25hY2NpKG4tMikpXFxuXFxubiA9IDVcXG5cXG5maWJvX3NlcmllcyA9IFtdXFxuXFxuZm9yIGkgaW4gcmFuZ2UoMCxuKTpcXG5cXHRmaWJvX3Nlcmllcy5hcHBlbmQoZmlib25hY2NpKGkpKVxcblxcbnByaW50KCdIZWxsbywgV29ybGQgZnJvbSBQeXRob24hIEhlcmVcXFxcJ3Mgc29tZSBmaWJvbmFjY2kgbnVtYmVyczonKVxcbnByaW50KGZpYm9fc2VyaWVzKVwiXG4gICAgKTtcbiAgfSBlbHNlIGlmIChcbiAgICBsYW5nID09PSBcIm5vZGVcIiB8fFxuICAgIGxhbmcgPT09IFwibm9kZWpzXCIgfHxcbiAgICBsYW5nID09PSBcImpzXCIgfHxcbiAgICBsYW5nID09PSBcImphdmFzY3JpcHRcIlxuICApIHtcbiAgICBjb2RlTWlycm9yLnNldFZhbHVlKCdjb25zdCB7IGV4ZWMgfSA9IHJlcXVpcmUoXCJjaGlsZF9wcm9jZXNzXCIpO1xcblxcbmNvbnNvbGUubG9nKFwiSGVsbG8gd29ybGQgZnJvbSBOb2RlLmpzISBNeSB1cHRpbWUgaXM6XCIpO1xcblxcbmV4ZWMoXCJ1cHRpbWVcIiwgKGVycm9yLCBzdGRvdXQsIHN0ZGVycikgPT4ge1xcblxcdGlmIChlcnJvcikge1xcblxcdFxcdGNvbnNvbGUubG9nKGBlcnJvcjogJHtlcnJvci5tZXNzYWdlfWApO1xcblxcdFxcdHJldHVybjtcXG59XFxuXFx0aWYgKHN0ZGVycikge1xcblxcdFxcdGNvbnNvbGUubG9nKGBzdGRlcnI6ICR7c3RkZXJyfWApO1xcblxcdFxcdHJldHVybjtcXG5cXHR9XFxuXFx0XFx0Y29uc29sZS5sb2coYHN0ZG91dDogJHtzdGRvdXR9YCk7XFxufSk7Jyk7XG4gIH0gZWxzZSBpZiAobGFuZyA9PT0gXCJjKytcIiB8fCBsYW5nID09PSBcImNwcFwiIHx8IGxhbmcgPT09IFwiYysrMTFcIikge1xuICAgIGNvZGVNaXJyb3Iuc2V0VmFsdWUoXG4gICAgICBgI2luY2x1ZGU8aW9zdHJlYW0+XG4jaW5jbHVkZTx0aHJlYWQ+XG5pbnQgbWFpbigpIHtcblx0dW5zaWduZWQgaW50IG50aHJlYWRzID0gc3RkOjp0aHJlYWQ6OmhhcmR3YXJlX2NvbmN1cnJlbmN5KCk7XG5cdHN0ZDo6Y291dCA8PCBcImhlbGxvIHdvcmxkIGZyb20gQysrIVwiIDw8IHN0ZDo6ZW5kbDtcblx0c3RkOjpjZXJyIDw8IFwiSSBoYXZlIFwiIDw8IG50aHJlYWRzIDw8IFwiIHRocmVhZHMhXCIgPDwgc3RkOjplbmRsO1xuXHRyZXR1cm4gMDtcbn1gXG4gICAgKTtcbiAgfSBlbHNlIGlmIChsYW5nID09PSBcImdvXCIgfHwgbGFuZyA9PT0gXCJnb2xhbmdcIikge1xuICAgIGNvZGVNaXJyb3Iuc2V0VmFsdWUoXG4gICAgICBgcGFja2FnZSBtYWluXG5pbXBvcnQgXCJmbXRcIlxuZnVuYyBtYWluKCkge1xuICAgIGZtdC5QcmludGxuKFwiaGVsbG8gd29ybGQgZnJvbSBHbyFcIilcbn1gXG4gICAgKTtcbiAgfSBlbHNlIGlmIChsYW5nID09PSBcImJhc2hcIiB8fCBsYW5nZSA9PT0gXCJzaFwiKSB7XG4gICAgY29kZU1pcnJvci5zZXRWYWx1ZShcbiAgICAgIGBcbiMgRnVuY3Rpb24gdG8gcHJpbnQgRmlib25hY2NpIFNlcXVlbmNlXG5mdW5jdGlvbiBwcmludF9maWJvbmFjY2koKSB7XG4gICAgbnVtPSQxXG4gICAgYT0wXG4gICAgYj0xXG4gICAgZWNobyBcIlRoZSBGaWJvbmFjY2kgc2VxdWVuY2UgZm9yICRudW0gdGVybXMgaXM6IFwiXG5cbiAgICBmb3IgKCggaT0wOyBpPG51bTsgaSsrICkpXG4gICAgZG9cbiAgICAgICAgZWNobyAtbiBcIiRhIFwiXG4gICAgICAgIGZuPSQoKGEgKyBiKSlcbiAgICAgICAgYT0kYlxuICAgICAgICBiPSRmblxuICAgIGRvbmVcbn1cblxucHJpbnRfZmlib25hY2NpIDVcblx0XHRcdGBcbiAgICApO1xuICB9IGVsc2Uge1xuICAgIGNvZGVNaXJyb3Iuc2V0VmFsdWUoXG4gICAgICBcImRlZiBmaWJvbmFjY2kobik6XFxuXFx0aWYgbjw9MTpcXG5cXHRcXHRyZXR1cm4gblxcblxcdGVsc2U6XFxuXFx0XFx0cmV0dXJuKGZpYm9uYWNjaShuLTEpICsgZmlib25hY2NpKG4tMikpXFxuXFxubiA9IDVcXG5cXG5maWJvX3NlcmllcyA9IFtdXFxuXFxuZm9yIGkgaW4gcmFuZ2UoMCxuKTpcXG5cXHRmaWJvX3Nlcmllcy5hcHBlbmQoZmlib25hY2NpKGkpKVxcblxcbnByaW50KCdIZWxsbywgV29ybGQgZnJvbSBQeXRob24hIEhlcmVcXFxcJ3Mgc29tZSBmaWJvbmFjY2kgbnVtYmVyczonKVxcbnByaW50KGZpYm9fc2VyaWVzKVwiXG4gICAgKTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBzZXRMYW5nO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9