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


/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ __webpack_require__.O(0, ["vendors-node_modules_codemirror_lib_codemirror_js"], () => (__webpack_exec__("./js/set-code.js")));
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2V0Q29kZS5hNmQyYTc1ZmE2YWY1OWNjZDYzOC5idW5kbGUuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFBa0M7O0FBRWxDO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSSwrQ0FBVTtBQUNkLElBQUksK0NBQVU7QUFDZDtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJLCtDQUFVO0FBQ2QsSUFBSSwrQ0FBVSxtQkFBbUIsT0FBTywyQkFBMkIsMkRBQTJELCtDQUErQyxnQkFBZ0IsNEJBQTRCLGNBQWMsR0FBRyxhQUFhLEdBQUcsaUJBQWlCLDZCQUE2QixPQUFPLEdBQUcsYUFBYSxLQUFLLDZCQUE2QixPQUFPLEdBQUcsR0FBRyxFQUFFO0FBQ2hYLElBQUk7QUFDSixJQUFJLCtDQUFVO0FBQ2QsSUFBSSwrQ0FBVTtBQUNkO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0EsSUFBSTtBQUNKLElBQUksK0NBQVU7QUFDZCxJQUFJLCtDQUFVO0FBQ2Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQSxJQUFJO0FBQ0osSUFBSSwrQ0FBVTtBQUNkLElBQUksK0NBQVU7QUFDZDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxnQkFBZ0IsT0FBTztBQUN2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0osSUFBSSwrQ0FBVTtBQUNkLElBQUksK0NBQVU7QUFDZDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWM7QUFDZDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKLElBQUksK0NBQVU7QUFDZDtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxpRUFBZSxPQUFPLEVBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9ydW5uZXItd2ViLWZyb250ZW5kLy4vanMvc2V0LWNvZGUuanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGNvZGVNaXJyb3IgZnJvbSBcIi4vZWRpdG9yXCI7XG5cbmZ1bmN0aW9uIHNldExhbmcoKSB7XG4gIGNvbnN0IHNlbGVjdG9yID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJsYW5nLXNlbGVjdFwiKTtcbiAgY29uc3QgbGFuZyA9IHNlbGVjdG9yLm9wdGlvbnNbc2VsZWN0b3Iuc2VsZWN0ZWRJbmRleF0uaW5uZXJUZXh0O1xuICBpZiAobGFuZyA9PT0gXCJweXRob24zXCIgfHwgbGFuZyA9PT0gXCJweXRob25cIikge1xuICAgIGNvZGVNaXJyb3Iuc2V0T3B0aW9uKFwibW9kZVwiLCBcInB5dGhvblwiKVxuICAgIGNvZGVNaXJyb3Iuc2V0VmFsdWUoXG4gICAgICBcImRlZiBmaWJvbmFjY2kobik6XFxuXFx0aWYgbjw9MTpcXG5cXHRcXHRyZXR1cm4gblxcblxcdGVsc2U6XFxuXFx0XFx0cmV0dXJuKGZpYm9uYWNjaShuLTEpICsgZmlib25hY2NpKG4tMikpXFxuXFxubiA9IDVcXG5cXG5maWJvX3NlcmllcyA9IFtdXFxuXFxuZm9yIGkgaW4gcmFuZ2UoMCxuKTpcXG5cXHRmaWJvX3Nlcmllcy5hcHBlbmQoZmlib25hY2NpKGkpKVxcblxcbnByaW50KCdIZWxsbywgV29ybGQgZnJvbSBQeXRob24hIEhlcmVcXFxcJ3Mgc29tZSBmaWJvbmFjY2kgbnVtYmVyczonKVxcbnByaW50KGZpYm9fc2VyaWVzKVwiXG4gICAgKTtcbiAgfSBlbHNlIGlmIChcbiAgICBsYW5nID09PSBcIm5vZGVcIiB8fFxuICAgIGxhbmcgPT09IFwibm9kZWpzXCIgfHxcbiAgICBsYW5nID09PSBcImpzXCIgfHxcbiAgICBsYW5nID09PSBcImphdmFzY3JpcHRcIlxuICApIHtcbiAgICBjb2RlTWlycm9yLnNldE9wdGlvbihcIm1vZGVcIiwgXCJqYXZhc2NyaXB0XCIpO1xuICAgIGNvZGVNaXJyb3Iuc2V0VmFsdWUoJ2NvbnN0IHsgZXhlYyB9ID0gcmVxdWlyZShcImNoaWxkX3Byb2Nlc3NcIik7XFxuXFxuY29uc29sZS5sb2coXCJIZWxsbyB3b3JsZCBmcm9tIE5vZGUuanMhIE15IHVwdGltZSBpczpcIik7XFxuXFxuZXhlYyhcInVwdGltZVwiLCAoZXJyb3IsIHN0ZG91dCwgc3RkZXJyKSA9PiB7XFxuXFx0aWYgKGVycm9yKSB7XFxuXFx0XFx0Y29uc29sZS5sb2coYGVycm9yOiAke2Vycm9yLm1lc3NhZ2V9YCk7XFxuXFx0XFx0cmV0dXJuO1xcbn1cXG5cXHRpZiAoc3RkZXJyKSB7XFxuXFx0XFx0Y29uc29sZS5sb2coYHN0ZGVycjogJHtzdGRlcnJ9YCk7XFxuXFx0XFx0cmV0dXJuO1xcblxcdH1cXG5cXHRcXHRjb25zb2xlLmxvZyhgc3Rkb3V0OiAke3N0ZG91dH1gKTtcXG59KTsnKTtcbiAgfSBlbHNlIGlmIChsYW5nID09PSBcImMrK1wiIHx8IGxhbmcgPT09IFwiY3BwXCIgfHwgbGFuZyA9PT0gXCJjKysxMVwiKSB7XG4gICAgY29kZU1pcnJvci5zZXRPcHRpb24oXCJtb2RlXCIsIFwiY2xpa2VcIik7XG4gICAgY29kZU1pcnJvci5zZXRWYWx1ZShcbiAgICAgIGAjaW5jbHVkZTxpb3N0cmVhbT5cbiNpbmNsdWRlPHRocmVhZD5cbmludCBtYWluKCkge1xuXHR1bnNpZ25lZCBpbnQgbnRocmVhZHMgPSBzdGQ6OnRocmVhZDo6aGFyZHdhcmVfY29uY3VycmVuY3koKTtcblx0c3RkOjpjb3V0IDw8IFwiaGVsbG8gd29ybGQgZnJvbSBDKyshXCIgPDwgc3RkOjplbmRsO1xuXHRzdGQ6OmNlcnIgPDwgXCJJIGhhdmUgXCIgPDwgbnRocmVhZHMgPDwgXCIgdGhyZWFkcyFcIiA8PCBzdGQ6OmVuZGw7XG5cdHJldHVybiAwO1xufWBcbiAgICApO1xuICB9IGVsc2UgaWYgKGxhbmcgPT09IFwiZ29cIiB8fCBsYW5nID09PSBcImdvbGFuZ1wiKSB7XG4gICAgY29kZU1pcnJvci5zZXRPcHRpb24oXCJtb2RlXCIsIFwiZ29cIik7XG4gICAgY29kZU1pcnJvci5zZXRWYWx1ZShcbiAgICAgIGBwYWNrYWdlIG1haW5cbmltcG9ydCBcImZtdFwiXG5mdW5jIG1haW4oKSB7XG4gICAgZm10LlByaW50bG4oXCJoZWxsbyB3b3JsZCBmcm9tIEdvIVwiKVxufWBcbiAgICApO1xuICB9IGVsc2UgaWYgKGxhbmcgPT09IFwiYmFzaFwiIHx8IGxhbmcgPT09IFwic2hcIikge1xuICAgIGNvZGVNaXJyb3Iuc2V0T3B0aW9uKFwibW9kZVwiLCBcInNoZWxsXCIpXG4gICAgY29kZU1pcnJvci5zZXRWYWx1ZShcbiAgICAgIGBcbiMgRnVuY3Rpb24gdG8gcHJpbnQgRmlib25hY2NpIFNlcXVlbmNlXG5mdW5jdGlvbiBwcmludF9maWJvbmFjY2koKSB7XG4gICAgbnVtPSQxXG4gICAgYT0wXG4gICAgYj0xXG4gICAgZWNobyBcIlRoZSBGaWJvbmFjY2kgc2VxdWVuY2UgZm9yICRudW0gdGVybXMgaXM6IFwiXG5cbiAgICBmb3IgKCggaT0wOyBpPG51bTsgaSsrICkpXG4gICAgZG9cbiAgICAgICAgZWNobyAtbiBcIiRhIFwiXG4gICAgICAgIGZuPSQoKGEgKyBiKSlcbiAgICAgICAgYT0kYlxuICAgICAgICBiPSRmblxuICAgIGRvbmVcbn1cblxucHJpbnRfZmlib25hY2NpIDVcblx0XHRcdGBcbiAgICApO1xuICB9IGVsc2UgaWYgKGxhbmcgPT09IFwicnVzdFwiKSB7XG4gICAgY29kZU1pcnJvci5zZXRPcHRpb24oXCJtb2RlXCIsIFwicnVzdFwiKTtcbiAgICBjb2RlTWlycm9yLnNldFZhbHVlKGBcbnN0cnVjdCBNeVN0cnVjdCB7XG5cdG1zZzogU3RyaW5nLFxufVxuXG5pbXBsIE15U3RydWN0IHtcblx0Zm4gbmV3KG1zZzogU3RyaW5nKSAtPiBTZWxmIHtcblx0XHRTZWxmIHtcblx0XHRcdG1zZ1xuXHRcdH1cblx0fVxuXHRcblx0Zm4gcHJpbnQoJnNlbGYpIHtcblx0XHRwcmludGxuIShcInt9XCIsIHNlbGYubXNnKTtcblx0fVxufVxuXG5mbiBtYWluKCkge1xuICAgIGxldCBteV9zdHJ1Y3QgPSBNeVN0cnVjdDo6bmV3KFN0cmluZzo6ZnJvbShcIkhlbGxvLCBXb3JsZCFcIikpO1xuXHRcblx0bXlfc3RydWN0LnByaW50KCk7XG59XG5gXG4gICAgKTtcbiAgfSBlbHNlIHtcbiAgICBjb2RlTWlycm9yLnNldFZhbHVlKFxuICAgICAgXCJkZWYgZmlib25hY2NpKG4pOlxcblxcdGlmIG48PTE6XFxuXFx0XFx0cmV0dXJuIG5cXG5cXHRlbHNlOlxcblxcdFxcdHJldHVybihmaWJvbmFjY2kobi0xKSArIGZpYm9uYWNjaShuLTIpKVxcblxcbm4gPSA1XFxuXFxuZmlib19zZXJpZXMgPSBbXVxcblxcbmZvciBpIGluIHJhbmdlKDAsbik6XFxuXFx0Zmlib19zZXJpZXMuYXBwZW5kKGZpYm9uYWNjaShpKSlcXG5cXG5wcmludCgnSGVsbG8sIFdvcmxkIGZyb20gUHl0aG9uISBIZXJlXFxcXCdzIHNvbWUgZmlib25hY2NpIG51bWJlcnM6JylcXG5wcmludChmaWJvX3NlcmllcylcIlxuICAgICk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgc2V0TGFuZztcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==