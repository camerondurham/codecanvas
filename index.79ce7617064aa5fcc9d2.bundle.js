"use strict";
(self["webpackChunkrunner_web_frontend"] = self["webpackChunkrunner_web_frontend"] || []).push([["index"],{

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


/***/ }),

/***/ "./js/load.js":
/*!********************!*\
  !*** ./js/load.js ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var codemirror_lib_codemirror_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! codemirror/lib/codemirror.css */ "./node_modules/codemirror/lib/codemirror.css");
/* harmony import */ var codemirror_theme_material_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! codemirror/theme/material.css */ "./node_modules/codemirror/theme/material.css");
/* harmony import */ var codemirror_theme_neat_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! codemirror/theme/neat.css */ "./node_modules/codemirror/theme/neat.css");
/* harmony import */ var codemirror_mode_xml_xml__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! codemirror/mode/xml/xml */ "./node_modules/codemirror/mode/xml/xml.js");
/* harmony import */ var codemirror_mode_xml_xml__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(codemirror_mode_xml_xml__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var codemirror_mode_javascript_javascript__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! codemirror/mode/javascript/javascript */ "./node_modules/codemirror/mode/javascript/javascript.js");
/* harmony import */ var codemirror_mode_javascript_javascript__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(codemirror_mode_javascript_javascript__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var codemirror_mode_python_python__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! codemirror/mode/python/python */ "./node_modules/codemirror/mode/python/python.js");
/* harmony import */ var codemirror_mode_python_python__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(codemirror_mode_python_python__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var codemirror_mode_shell_shell__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! codemirror/mode/shell/shell */ "./node_modules/codemirror/mode/shell/shell.js");
/* harmony import */ var codemirror_mode_shell_shell__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(codemirror_mode_shell_shell__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var codemirror_mode_go_go__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! codemirror/mode/go/go */ "./node_modules/codemirror/mode/go/go.js");
/* harmony import */ var codemirror_mode_go_go__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(codemirror_mode_go_go__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var codemirror_mode_clike_clike__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! codemirror/mode/clike/clike */ "./node_modules/codemirror/mode/clike/clike.js");
/* harmony import */ var codemirror_mode_clike_clike__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(codemirror_mode_clike_clike__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var codemirror_mode_rust_rust__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! codemirror/mode/rust/rust */ "./node_modules/codemirror/mode/rust/rust.js");
/* harmony import */ var codemirror_mode_rust_rust__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(codemirror_mode_rust_rust__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var codemirror_theme_3024_day_css__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! codemirror/theme/3024-day.css */ "./node_modules/codemirror/theme/3024-day.css");
/* harmony import */ var codemirror_theme_3024_night_css__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! codemirror/theme/3024-night.css */ "./node_modules/codemirror/theme/3024-night.css");
/* harmony import */ var codemirror_theme_blackboard_css__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! codemirror/theme/blackboard.css */ "./node_modules/codemirror/theme/blackboard.css");
/* harmony import */ var codemirror_theme_darcula_css__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! codemirror/theme/darcula.css */ "./node_modules/codemirror/theme/darcula.css");
/* harmony import */ var codemirror_theme_dracula_css__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! codemirror/theme/dracula.css */ "./node_modules/codemirror/theme/dracula.css");
/* harmony import */ var codemirror_theme_eclipse_css__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! codemirror/theme/eclipse.css */ "./node_modules/codemirror/theme/eclipse.css");
/* harmony import */ var codemirror_theme_elegant_css__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! codemirror/theme/elegant.css */ "./node_modules/codemirror/theme/elegant.css");
/* harmony import */ var codemirror_theme_erlang_dark_css__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! codemirror/theme/erlang-dark.css */ "./node_modules/codemirror/theme/erlang-dark.css");
/* harmony import */ var codemirror_theme_idea_css__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! codemirror/theme/idea.css */ "./node_modules/codemirror/theme/idea.css");
/* harmony import */ var codemirror_theme_isotope_css__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! codemirror/theme/isotope.css */ "./node_modules/codemirror/theme/isotope.css");
/* harmony import */ var codemirror_theme_midnight_css__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! codemirror/theme/midnight.css */ "./node_modules/codemirror/theme/midnight.css");
/* harmony import */ var codemirror_theme_lucario_css__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! codemirror/theme/lucario.css */ "./node_modules/codemirror/theme/lucario.css");
/* harmony import */ var codemirror_theme_monokai_css__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! codemirror/theme/monokai.css */ "./node_modules/codemirror/theme/monokai.css");
/* harmony import */ var codemirror_theme_solarized_css__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! codemirror/theme/solarized.css */ "./node_modules/codemirror/theme/solarized.css");
/* harmony import */ var _style_main_css__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! ../style/main.css */ "./style/main.css");
/* harmony import */ var _run_request__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! ./run-request */ "./js/run-request.js");
/* harmony import */ var _editor__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! ./editor */ "./js/editor.js");
/* harmony import */ var _langs_request__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! ./langs-request */ "./js/langs-request.js");
/* harmony import */ var _config_utils__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(/*! ./config-utils */ "./js/config-utils.js");
/* harmony import */ var _set_code__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(/*! ./set-code */ "./js/set-code.js");











// other themes























var langs;

_editor__WEBPACK_IMPORTED_MODULE_26__["default"].setValue(
      "def fibonacci(n):\n\tif n<=1:\n\t\treturn n\n\telse:\n\t\treturn(fibonacci(n-1) + fibonacci(n-2))\n\nn = 5\n\nfibo_series = []\n\nfor i in range(0,n):\n\tfibo_series.append(fibonacci(i))\n\nprint('Hello, World from Python! Here\\'s some fibonacci numbers:')\nprint(fibo_series)"
);

(0,_langs_request__WEBPACK_IMPORTED_MODULE_27__["default"])()
  .then(function (result) {
    var res = JSON.parse(result);
    // uncomment for testing
    // var res = { languages: ["python3", "node", "c++11", "go"] };
    langs = res.languages;
  })
  .catch(function (err) {
    langs = ["Error!"];
    console.log("Error when fetching languages: " + err);
  })
  .finally(function () {
    var lang_menu = document.getElementById("lang-select");
    for (const lang of langs) {
      var child = document.createElement("option");
      child.innerText = lang;
      lang_menu.appendChild(child);
    }
    _config_utils__WEBPACK_IMPORTED_MODULE_28__["default"].getSelectedLanguage();
  });

function selectTheme() {
  const select = document.getElementById("theme-select");
  var theme = select.options[select.selectedIndex].textContent;
  _editor__WEBPACK_IMPORTED_MODULE_26__["default"].setOption("theme", theme);
}

const submitBtn = document.getElementById("submit-btn");
submitBtn.addEventListener("click", _run_request__WEBPACK_IMPORTED_MODULE_25__["default"]);

const selector = document.getElementById("theme-select");
selector.addEventListener("change", selectTheme);

const langSelector = document.getElementById("lang-select");
langSelector.addEventListener("change", _set_code__WEBPACK_IMPORTED_MODULE_29__["default"]);


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


/***/ }),

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


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./style/main.css":
/*!**************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./style/main.css ***!
  \**************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
___CSS_LOADER_EXPORT___.push([module.id, "@import url(https://fonts.googleapis.com/css2?family=Quicksand:wght@300;400&display=swap);"]);
___CSS_LOADER_EXPORT___.push([module.id, "@import url(https://fonts.googleapis.com/css2?family=IBM+Plex+Mono&display=swap);"]);
___CSS_LOADER_EXPORT___.push([module.id, "@import url(https://fonts.googleapis.com/css2?family=Work+Sans&display=swap);"]);
// Module
___CSS_LOADER_EXPORT___.push([module.id, "/* Dark mode */\n@media (prefers-color-scheme: dark) {\n    body {\n        background: #181818;\n        color: #d8d8d8;\n    }\n\n    a {\n        color: #CF9FFF;\n    }\n\n    .field {\n        background-color: #282828;\n        color: #d8d8d8;\n    }\n}\n\n\n\n/* Light mode */\n@media (prefers-color-scheme: light) {\n    body {\n        background-color: #f5f5f5;\n        color: #282828;\n    }\n\n    a {\n        color: #400080;\n    }\n\n    .field {\n        background-color: #d8d8d8;\n        color: #282828;\n    }\n}\n\n.CodeMirror {\n    margin: auto;\n    height: 450px;\n    font-size: 15px;\n    text-align: left;\n    text-shadow: none;\n}\n\nbutton {\n    font-style: \"IBM Plex Mono\", monospace;\n    padding: 4px;\n    margin-top: 5px;\n}\n\n.selectors {\n    display: flex;\n    justify-content: space-between;\n}\n\nselect {\n    font-family: monospace;\n    font: \"IBM Plex Mono\";\n}\n\n#wrapper {\n    margin-top: 3%;\n    width: 50%;\n}\n\n\nbody {\n    font-family: \"IBM Plex Mono\", monospace;\n    text-rendering: optimizeLegibility;\n    /* line-height: 1.5; */\n    /* margin: 1rem 1rem; */\n}\n\nhtml {\n    margin-left: calc(100vw - 100%);\n}\n\na:visited {\n    color: gray;\n    font-weight: bold;\n}\n\nfooter {\n    font-size: 14px;\n    padding: 20px;\n    margin-left: 30%;\n    align-items: center;\n}\n\n.output {\n    width: 70%;\n    margin-top: 10px;\n}\n\n.field {\n    border-radius: 10px;\n    -moz-border-radius: 10px;\n    margin: auto;\n    text-align: left;\n    padding: 5px;\n    font-size: 14px;\n}\n\n.box {\n    width: 90%;\n}\n\npre {\n    text-wrap: balance;\n}\n\n#wrapper {\n    width: 50%;\n    margin-left: 25%;\n}\n", "",{"version":3,"sources":["webpack://./style/main.css"],"names":[],"mappings":"AAKA,cAAc;AACd;IACI;QACI,mBAAmB;QACnB,cAAc;IAClB;;IAEA;QACI,cAAc;IAClB;;IAEA;QACI,yBAAyB;QACzB,cAAc;IAClB;AACJ;;;;AAIA,eAAe;AACf;IACI;QACI,yBAAyB;QACzB,cAAc;IAClB;;IAEA;QACI,cAAc;IAClB;;IAEA;QACI,yBAAyB;QACzB,cAAc;IAClB;AACJ;;AAEA;IACI,YAAY;IACZ,aAAa;IACb,eAAe;IACf,gBAAgB;IAChB,iBAAiB;AACrB;;AAEA;IACI,sCAAsC;IACtC,YAAY;IACZ,eAAe;AACnB;;AAEA;IACI,aAAa;IACb,8BAA8B;AAClC;;AAEA;IACI,sBAAsB;IACtB,qBAAqB;AACzB;;AAEA;IACI,cAAc;IACd,UAAU;AACd;;;AAGA;IACI,uCAAuC;IACvC,kCAAkC;IAClC,sBAAsB;IACtB,uBAAuB;AAC3B;;AAEA;IACI,+BAA+B;AACnC;;AAEA;IACI,WAAW;IACX,iBAAiB;AACrB;;AAEA;IACI,eAAe;IACf,aAAa;IACb,gBAAgB;IAChB,mBAAmB;AACvB;;AAEA;IACI,UAAU;IACV,gBAAgB;AACpB;;AAEA;IACI,mBAAmB;IACnB,wBAAwB;IACxB,YAAY;IACZ,gBAAgB;IAChB,YAAY;IACZ,eAAe;AACnB;;AAEA;IACI,UAAU;AACd;;AAEA;IACI,kBAAkB;AACtB;;AAEA;IACI,UAAU;IACV,gBAAgB;AACpB","sourcesContent":["@import url(\"https://fonts.googleapis.com/css2?family=Quicksand:wght@300;400&display=swap\");\n@import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Mono&display=swap');\n\n@import url(\"https://fonts.googleapis.com/css2?family=Work+Sans&display=swap\");\n\n/* Dark mode */\n@media (prefers-color-scheme: dark) {\n    body {\n        background: #181818;\n        color: #d8d8d8;\n    }\n\n    a {\n        color: #CF9FFF;\n    }\n\n    .field {\n        background-color: #282828;\n        color: #d8d8d8;\n    }\n}\n\n\n\n/* Light mode */\n@media (prefers-color-scheme: light) {\n    body {\n        background-color: #f5f5f5;\n        color: #282828;\n    }\n\n    a {\n        color: #400080;\n    }\n\n    .field {\n        background-color: #d8d8d8;\n        color: #282828;\n    }\n}\n\n.CodeMirror {\n    margin: auto;\n    height: 450px;\n    font-size: 15px;\n    text-align: left;\n    text-shadow: none;\n}\n\nbutton {\n    font-style: \"IBM Plex Mono\", monospace;\n    padding: 4px;\n    margin-top: 5px;\n}\n\n.selectors {\n    display: flex;\n    justify-content: space-between;\n}\n\nselect {\n    font-family: monospace;\n    font: \"IBM Plex Mono\";\n}\n\n#wrapper {\n    margin-top: 3%;\n    width: 50%;\n}\n\n\nbody {\n    font-family: \"IBM Plex Mono\", monospace;\n    text-rendering: optimizeLegibility;\n    /* line-height: 1.5; */\n    /* margin: 1rem 1rem; */\n}\n\nhtml {\n    margin-left: calc(100vw - 100%);\n}\n\na:visited {\n    color: gray;\n    font-weight: bold;\n}\n\nfooter {\n    font-size: 14px;\n    padding: 20px;\n    margin-left: 30%;\n    align-items: center;\n}\n\n.output {\n    width: 70%;\n    margin-top: 10px;\n}\n\n.field {\n    border-radius: 10px;\n    -moz-border-radius: 10px;\n    margin: auto;\n    text-align: left;\n    padding: 5px;\n    font-size: 14px;\n}\n\n.box {\n    width: 90%;\n}\n\npre {\n    text-wrap: balance;\n}\n\n#wrapper {\n    width: 50%;\n    margin-left: 25%;\n}\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./style/main.css":
/*!************************!*\
  !*** ./style/main.css ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_main_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../node_modules/css-loader/dist/cjs.js!./main.css */ "./node_modules/css-loader/dist/cjs.js!./style/main.css");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_main_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_main_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_main_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_main_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ __webpack_require__.O(0, ["vendors-node_modules_codemirror_lib_codemirror_css","vendors-node_modules_codemirror_mode_clike_clike_js-node_modules_codemirror_mode_go_go_js-nod-ec148a","vendors-node_modules_codemirror_lib_codemirror_js"], () => (__webpack_exec__("./js/load.js")));
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguNzljZTc2MTcwNjRhYTVmY2M5ZDIuYnVuZGxlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxpRUFBZSxZQUFZLEVBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7QUNoQmM7O0FBRTFDO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQixxREFBWSxPQUFPLHFEQUFZO0FBQ25EO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQSxpRUFBZSxXQUFXLEVBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUMzQlk7QUFDQTtBQUNKO0FBQ0Y7QUFDYztBQUNSO0FBQ0Y7QUFDTjtBQUNNO0FBQ0Y7O0FBRW5DO0FBQ3VDO0FBQ0U7QUFDQTtBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0k7QUFDUDtBQUNHO0FBQ0M7QUFDRDtBQUNDO0FBQ0Q7QUFDRTs7QUFFYjtBQUNTO0FBQ0Y7QUFDUTtBQUNBO0FBQ1Q7O0FBRWpDOztBQUVBLGdEQUFVO0FBQ1Y7QUFDQTs7QUFFQSwyREFBVztBQUNYO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQjtBQUNuQjtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJLHNEQUFZO0FBQ2hCLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0EsRUFBRSxnREFBVTtBQUNaOztBQUVBO0FBQ0Esb0NBQW9DLHFEQUFPOztBQUUzQztBQUNBOztBQUVBO0FBQ0Esd0NBQXdDLGtEQUFPOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUMzRWI7QUFDUTtBQUNI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QixHQUFHLGdCQUFnQixvQkFBb0IscUNBQXFDLEdBQUcsWUFBWSw2QkFBNkIsOEJBQThCLEdBQUcsY0FBYyxxQkFBcUIsaUJBQWlCLEdBQUcsWUFBWSxnREFBZ0QseUNBQXlDLDJCQUEyQiw4QkFBOEIsS0FBSyxVQUFVLHNDQUFzQyxHQUFHLGVBQWUsa0JBQWtCLHdCQUF3QixHQUFHLFlBQVksc0JBQXNCLG9CQUFvQix1QkFBdUIsMEJBQTBCLEdBQUcsYUFBYSxpQkFBaUIsdUJBQXVCLEdBQUcsWUFBWSwwQkFBMEIsK0JBQStCLG1CQUFtQix1QkFBdUIsbUJBQW1CLHNCQUFzQixHQUFHLFVBQVUsaUJBQWlCLEdBQUcsU0FBUyx5QkFBeUIsR0FBRyxjQUFjLGlCQUFpQix1QkFBdUIsR0FBRyxxQkFBcUI7QUFDdGdKO0FBQ0EsaUVBQWUsdUJBQXVCLEVBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDVHZDLE1BQStGO0FBQy9GLE1BQXFGO0FBQ3JGLE1BQTRGO0FBQzVGLE1BQStHO0FBQy9HLE1BQXdHO0FBQ3hHLE1BQXdHO0FBQ3hHLE1BQWtHO0FBQ2xHO0FBQ0E7O0FBRUE7O0FBRUEsNEJBQTRCLHFHQUFtQjtBQUMvQyx3QkFBd0Isa0hBQWE7O0FBRXJDLHVCQUF1Qix1R0FBYTtBQUNwQztBQUNBLGlCQUFpQiwrRkFBTTtBQUN2Qiw2QkFBNkIsc0dBQWtCOztBQUUvQyxhQUFhLDBHQUFHLENBQUMscUZBQU87Ozs7QUFJNEM7QUFDcEUsT0FBTyxpRUFBZSxxRkFBTyxJQUFJLHFGQUFPLFVBQVUscUZBQU8sbUJBQW1CLEVBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9ydW5uZXItd2ViLWZyb250ZW5kLy4vanMvY29uZmlnLXV0aWxzLmpzIiwid2VicGFjazovL3J1bm5lci13ZWItZnJvbnRlbmQvLi9qcy9sYW5ncy1yZXF1ZXN0LmpzIiwid2VicGFjazovL3J1bm5lci13ZWItZnJvbnRlbmQvLi9qcy9sb2FkLmpzIiwid2VicGFjazovL3J1bm5lci13ZWItZnJvbnRlbmQvLi9qcy9ydW4tcmVxdWVzdC5qcyIsIndlYnBhY2s6Ly9ydW5uZXItd2ViLWZyb250ZW5kLy4vanMvc2V0LWNvZGUuanMiLCJ3ZWJwYWNrOi8vcnVubmVyLXdlYi1mcm9udGVuZC8uL3N0eWxlL21haW4uY3NzIiwid2VicGFjazovL3J1bm5lci13ZWItZnJvbnRlbmQvLi9zdHlsZS9tYWluLmNzcz83ZjU0Il0sInNvdXJjZXNDb250ZW50IjpbImZ1bmN0aW9uIGdldFNlbGVjdGVkTGFuZ3VhZ2UoKSB7XG4gIGNvbnN0IHNlbGVjdG9yID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJsYW5nLXNlbGVjdFwiKTtcbiAgcmV0dXJuIHNlbGVjdG9yLm9wdGlvbnNbc2VsZWN0b3Iuc2VsZWN0ZWRJbmRleF0uaW5uZXJUZXh0O1xufVxuXG5jb25zdCBydW5uZXJDb25maWcgPSB7XG4gIGdldFNlbGVjdGVkTGFuZ3VhZ2U6IGdldFNlbGVjdGVkTGFuZ3VhZ2UsXG4gIC8vIFVuY29tbWVudCBmb3IgbG9jYWwgdGVzdGluZ1xuICAvLyB1cmw6IFwiaHR0cDovL2xvY2FsaG9zdDoxMDEwMC9hcGkvdjEvXCIsXG4gIHVybDogXCJodHRwczovL3J1bm5lci5mbHkuZGV2L2FwaS92MS9cIixcbiAgcnVuRW5kcG9pbnQ6IFwicnVuXCIsXG4gIGxhbmdFbmRwb2ludDogXCJsYW5ndWFnZXNcIixcbn07XG5cbi8vIG9ubHkgc2luZ2xlIGV4cG9ydCBwZXIgLmpzIGZpbGUgYWxsb3dlZFxuLy8gZXhwb3J0aW5nIHRoaXMgc2luY2Ugd2Ugd2lsbCBuZWVkIGl0IHRvIHJldHJpZXZlIHRoZSBjdXJyZW50IGxhbmd1YWdlIGZyb20gdGhlIGRvY3VtZW50L0RPTVxuZXhwb3J0IGRlZmF1bHQgcnVubmVyQ29uZmlnO1xuIiwiaW1wb3J0IHJ1bm5lckNvbmZpZyBmcm9tIFwiLi9jb25maWctdXRpbHNcIjtcblxuZnVuY3Rpb24gbGFuZ1JlcXVlc3QoKSB7XG4gIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgbGV0IHhociA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuICAgIGNvbnN0IGZ1bGxVcmwgPSBydW5uZXJDb25maWcudXJsICsgcnVubmVyQ29uZmlnLmxhbmdFbmRwb2ludDtcbiAgICB4aHIub3BlbihcIkdFVFwiLCBmdWxsVXJsKTtcbiAgICB4aHIub25sb2FkID0gZnVuY3Rpb24gKCkge1xuICAgICAgaWYgKHRoaXMuc3RhdHVzID49IDIwMCAmJiB0aGlzLnN0YXR1cyA8IDQwMCkge1xuICAgICAgICByZXNvbHZlKHhoci5yZXNwb25zZSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZWplY3Qoe1xuICAgICAgICAgIHN0YXR1czogdGhpcy5zdGF0dXMsXG4gICAgICAgICAgc3RhdHVzVGV4dDogeGhyLnN0YXR1c1RleHQsXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH07XG4gICAgeGhyLm9uZXJyb3IgPSBmdW5jdGlvbiAoKSB7XG4gICAgICByZWplY3Qoe1xuICAgICAgICBzdGF0dXM6IHRoaXMuc3RhdHVzLFxuICAgICAgICBzdGF0dXNUZXh0OiB4aHIuc3RhdHVzVGV4dCxcbiAgICAgIH0pO1xuICAgIH07XG4gICAgeGhyLnNlbmQoKTtcbiAgfSk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGxhbmdSZXF1ZXN0O1xuIiwiaW1wb3J0IFwiY29kZW1pcnJvci9saWIvY29kZW1pcnJvci5jc3NcIjtcbmltcG9ydCBcImNvZGVtaXJyb3IvdGhlbWUvbWF0ZXJpYWwuY3NzXCI7XG5pbXBvcnQgXCJjb2RlbWlycm9yL3RoZW1lL25lYXQuY3NzXCI7XG5pbXBvcnQgXCJjb2RlbWlycm9yL21vZGUveG1sL3htbFwiO1xuaW1wb3J0IFwiY29kZW1pcnJvci9tb2RlL2phdmFzY3JpcHQvamF2YXNjcmlwdFwiO1xuaW1wb3J0IFwiY29kZW1pcnJvci9tb2RlL3B5dGhvbi9weXRob25cIjtcbmltcG9ydCBcImNvZGVtaXJyb3IvbW9kZS9zaGVsbC9zaGVsbFwiO1xuaW1wb3J0IFwiY29kZW1pcnJvci9tb2RlL2dvL2dvXCI7XG5pbXBvcnQgXCJjb2RlbWlycm9yL21vZGUvY2xpa2UvY2xpa2VcIjtcbmltcG9ydCBcImNvZGVtaXJyb3IvbW9kZS9ydXN0L3J1c3RcIjtcblxuLy8gb3RoZXIgdGhlbWVzXG5pbXBvcnQgXCJjb2RlbWlycm9yL3RoZW1lLzMwMjQtZGF5LmNzc1wiO1xuaW1wb3J0IFwiY29kZW1pcnJvci90aGVtZS8zMDI0LW5pZ2h0LmNzc1wiO1xuaW1wb3J0IFwiY29kZW1pcnJvci90aGVtZS9ibGFja2JvYXJkLmNzc1wiO1xuaW1wb3J0IFwiY29kZW1pcnJvci90aGVtZS9kYXJjdWxhLmNzc1wiO1xuaW1wb3J0IFwiY29kZW1pcnJvci90aGVtZS9kcmFjdWxhLmNzc1wiO1xuaW1wb3J0IFwiY29kZW1pcnJvci90aGVtZS9lY2xpcHNlLmNzc1wiO1xuaW1wb3J0IFwiY29kZW1pcnJvci90aGVtZS9lbGVnYW50LmNzc1wiO1xuaW1wb3J0IFwiY29kZW1pcnJvci90aGVtZS9lcmxhbmctZGFyay5jc3NcIjtcbmltcG9ydCBcImNvZGVtaXJyb3IvdGhlbWUvaWRlYS5jc3NcIjtcbmltcG9ydCBcImNvZGVtaXJyb3IvdGhlbWUvaXNvdG9wZS5jc3NcIjtcbmltcG9ydCBcImNvZGVtaXJyb3IvdGhlbWUvbWlkbmlnaHQuY3NzXCI7XG5pbXBvcnQgXCJjb2RlbWlycm9yL3RoZW1lL2x1Y2FyaW8uY3NzXCI7XG5pbXBvcnQgXCJjb2RlbWlycm9yL3RoZW1lL21hdGVyaWFsLmNzc1wiO1xuaW1wb3J0IFwiY29kZW1pcnJvci90aGVtZS9tb25va2FpLmNzc1wiO1xuaW1wb3J0IFwiY29kZW1pcnJvci90aGVtZS9zb2xhcml6ZWQuY3NzXCI7XG5cbmltcG9ydCBcIi4uL3N0eWxlL21haW4uY3NzXCI7XG5pbXBvcnQgcnVuQ2FsbCBmcm9tIFwiLi9ydW4tcmVxdWVzdFwiO1xuaW1wb3J0IGNvZGVNaXJyb3IgZnJvbSBcIi4vZWRpdG9yXCI7XG5pbXBvcnQgbGFuZ1JlcXVlc3QgZnJvbSBcIi4vbGFuZ3MtcmVxdWVzdFwiO1xuaW1wb3J0IHJ1bm5lckNvbmZpZyBmcm9tIFwiLi9jb25maWctdXRpbHNcIjtcbmltcG9ydCBzZXRMYW5nIGZyb20gXCIuL3NldC1jb2RlXCI7XG5cbnZhciBsYW5ncztcblxuY29kZU1pcnJvci5zZXRWYWx1ZShcbiAgICAgIFwiZGVmIGZpYm9uYWNjaShuKTpcXG5cXHRpZiBuPD0xOlxcblxcdFxcdHJldHVybiBuXFxuXFx0ZWxzZTpcXG5cXHRcXHRyZXR1cm4oZmlib25hY2NpKG4tMSkgKyBmaWJvbmFjY2kobi0yKSlcXG5cXG5uID0gNVxcblxcbmZpYm9fc2VyaWVzID0gW11cXG5cXG5mb3IgaSBpbiByYW5nZSgwLG4pOlxcblxcdGZpYm9fc2VyaWVzLmFwcGVuZChmaWJvbmFjY2koaSkpXFxuXFxucHJpbnQoJ0hlbGxvLCBXb3JsZCBmcm9tIFB5dGhvbiEgSGVyZVxcXFwncyBzb21lIGZpYm9uYWNjaSBudW1iZXJzOicpXFxucHJpbnQoZmlib19zZXJpZXMpXCJcbik7XG5cbmxhbmdSZXF1ZXN0KClcbiAgLnRoZW4oZnVuY3Rpb24gKHJlc3VsdCkge1xuICAgIHZhciByZXMgPSBKU09OLnBhcnNlKHJlc3VsdCk7XG4gICAgLy8gdW5jb21tZW50IGZvciB0ZXN0aW5nXG4gICAgLy8gdmFyIHJlcyA9IHsgbGFuZ3VhZ2VzOiBbXCJweXRob24zXCIsIFwibm9kZVwiLCBcImMrKzExXCIsIFwiZ29cIl0gfTtcbiAgICBsYW5ncyA9IHJlcy5sYW5ndWFnZXM7XG4gIH0pXG4gIC5jYXRjaChmdW5jdGlvbiAoZXJyKSB7XG4gICAgbGFuZ3MgPSBbXCJFcnJvciFcIl07XG4gICAgY29uc29sZS5sb2coXCJFcnJvciB3aGVuIGZldGNoaW5nIGxhbmd1YWdlczogXCIgKyBlcnIpO1xuICB9KVxuICAuZmluYWxseShmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGxhbmdfbWVudSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibGFuZy1zZWxlY3RcIik7XG4gICAgZm9yIChjb25zdCBsYW5nIG9mIGxhbmdzKSB7XG4gICAgICB2YXIgY2hpbGQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwib3B0aW9uXCIpO1xuICAgICAgY2hpbGQuaW5uZXJUZXh0ID0gbGFuZztcbiAgICAgIGxhbmdfbWVudS5hcHBlbmRDaGlsZChjaGlsZCk7XG4gICAgfVxuICAgIHJ1bm5lckNvbmZpZy5nZXRTZWxlY3RlZExhbmd1YWdlKCk7XG4gIH0pO1xuXG5mdW5jdGlvbiBzZWxlY3RUaGVtZSgpIHtcbiAgY29uc3Qgc2VsZWN0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ0aGVtZS1zZWxlY3RcIik7XG4gIHZhciB0aGVtZSA9IHNlbGVjdC5vcHRpb25zW3NlbGVjdC5zZWxlY3RlZEluZGV4XS50ZXh0Q29udGVudDtcbiAgY29kZU1pcnJvci5zZXRPcHRpb24oXCJ0aGVtZVwiLCB0aGVtZSk7XG59XG5cbmNvbnN0IHN1Ym1pdEJ0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic3VibWl0LWJ0blwiKTtcbnN1Ym1pdEJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgcnVuQ2FsbCk7XG5cbmNvbnN0IHNlbGVjdG9yID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ0aGVtZS1zZWxlY3RcIik7XG5zZWxlY3Rvci5hZGRFdmVudExpc3RlbmVyKFwiY2hhbmdlXCIsIHNlbGVjdFRoZW1lKTtcblxuY29uc3QgbGFuZ1NlbGVjdG9yID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJsYW5nLXNlbGVjdFwiKTtcbmxhbmdTZWxlY3Rvci5hZGRFdmVudExpc3RlbmVyKFwiY2hhbmdlXCIsIHNldExhbmcpO1xuIiwiaW1wb3J0IGNvZGVNaXJyb3IgZnJvbSBcIi4vZWRpdG9yXCI7XG5pbXBvcnQgcnVubmVyQ29uZmlnIGZyb20gXCIuL2NvbmZpZy11dGlsc1wiO1xuaW1wb3J0IFwiY29kZW1pcnJvci9saWIvY29kZW1pcnJvci5jc3NcIjtcblxuZnVuY3Rpb24gcnVuUmVxdWVzdCgpIHtcbiAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xuICAgIHZhciByZXEgPSB7XG4gICAgICBzb3VyY2U6IGNvZGVNaXJyb3IuZ2V0VmFsdWUoKSxcbiAgICAgIGxhbmd1YWdlOiBydW5uZXJDb25maWcuZ2V0U2VsZWN0ZWRMYW5ndWFnZSgpLFxuICAgIH07XG4gICAgbGV0IHhociA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuICAgIGNvbnN0IGZ1bGxVcmwgPSBydW5uZXJDb25maWcudXJsICsgcnVubmVyQ29uZmlnLnJ1bkVuZHBvaW50O1xuICAgIHhoci5vcGVuKFwiUE9TVFwiLCBmdWxsVXJsKTtcbiAgICB4aHIuc2V0UmVxdWVzdEhlYWRlcihcIkNvbnRlbnQtVHlwZVwiLCBcImFwcGxpY2F0aW9uL2pzb25cIik7XG4gICAgeGhyLm9ubG9hZCA9IGZ1bmN0aW9uKCkge1xuICAgICAgaWYgKHRoaXMuc3RhdHVzID49IDIwMCAmJiB0aGlzLnN0YXR1cyA8IDQwMCkge1xuICAgICAgICByZXNvbHZlKHhoci5yZXNwb25zZSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZWplY3Qoe1xuICAgICAgICAgIHN0YXR1czogdGhpcy5zdGF0dXMsXG4gICAgICAgICAgc3RhdHVzVGV4dDogeGhyLnN0YXR1c1RleHQsXG4gICAgICAgICAgYm9keTogeGhyLnJlc3BvbnNlXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH07XG4gICAgeGhyLm9uZXJyb3IgPSBmdW5jdGlvbigpIHtcbiAgICAgIHJlamVjdCh7XG4gICAgICAgIHN0YXR1czogdGhpcy5zdGF0dXMsXG4gICAgICAgIHN0YXR1c1RleHQ6IHhoci5zdGF0dXNUZXh0LFxuICAgICAgICBib2R5OiB4aHIucmVzcG9uc2VcbiAgICAgIH0pO1xuICAgIH07XG4gICAgeGhyLnNlbmQoSlNPTi5zdHJpbmdpZnkocmVxKSk7XG4gIH0pO1xufVxuXG5mdW5jdGlvbiBzdHJpbmdpZnkob2JqKSB7XG4gIGNvbnN0IFNFUCA9IFwiLCBcIjtcbiAgY29uc3QgRU1QVFlfVEVYVCA9IFwibm9uZVwiO1xuXG4gIGlmIChvYmogPT09IG51bGwpIHJldHVybiBFTVBUWV9URVhUO1xuXG4gIGxldCBpbm5lciA9IFwiXCI7XG4gIGNvbnN0IGtleXMgPSBPYmplY3Qua2V5cyhvYmopO1xuICBrZXlzLmZvckVhY2goKGtleSwgaSkgPT4ge1xuICAgIGlmIChvYmpba2V5XSA9PT0gbnVsbCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlubmVyICs9IGtleSArIFwiOiBcIiArIFN0cmluZyhvYmpba2V5XSk7XG5cbiAgICBpZiAoaSA8IGtleXMubGVuZ3RoIC0gMSkgaW5uZXIgKz0gU0VQO1xuICB9KTtcblxuICBpZiAoaW5uZXIgPT0gXCJcIikgaW5uZXIgPSBFTVBUWV9URVhUO1xuXG4gIHJldHVybiBpbm5lcjtcbn1cblxuYXN5bmMgZnVuY3Rpb24gcnVuQ2FsbCgpIHtcbiAgbGV0IHN0ZG91dCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic3Rkb3V0LWZpZWxkXCIpO1xuICBsZXQgc3RkZXJyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzdGRlcnItZmllbGRcIik7XG4gIGxldCBlcnJvciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZXJyLWZpZWxkXCIpO1xuXG5cbiAgYXdhaXQgcnVuUmVxdWVzdCgpXG4gICAgLnRoZW4oZnVuY3Rpb24ocmVzdWx0KSB7XG4gICAgICBsZXQgb3V0ID0gSlNPTi5wYXJzZShyZXN1bHQpO1xuXG5cbiAgICAgIHN0ZG91dC5pbm5lckhUTUwgPVxuICAgICAgICBcIjxwcmU+U3Rkb3V0OiBcIiArIG91dFtcInN0ZG91dFwiXSArIFwiPC9wcmU+XCI7XG4gICAgICBzdGRvdXQucmVtb3ZlQXR0cmlidXRlKFwiaGlkZGVuXCIpO1xuXG4gICAgICBzdGRlcnIuaW5uZXJIVE1MID1cbiAgICAgICAgXCI8cHJlPlN0ZGVycjogXCIgKyBvdXRbXCJzdGRlcnJcIl0gKyBcIjwvcHJlPlwiO1xuICAgICAgc3RkZXJyLnJlbW92ZUF0dHJpYnV0ZShcImhpZGRlblwiKTtcblxuICAgICAgZXJyb3IuaW5uZXJIVE1MID0gXCI8cHJlPkVycm9yOiBcIiArIG91dFtcImVycm9yXCJdICsgXCI8L3ByZT5cIjtcbiAgICB9KVxuICAgIC5jYXRjaChmdW5jdGlvbihlcnIpIHtcbiAgICAgIGNvbnNvbGUubG9nKGVycik7XG4gICAgICBzdGRvdXQuc2V0QXR0cmlidXRlKFwiaGlkZGVuXCIsIHRydWUpO1xuICAgICAgc3RkZXJyLnNldEF0dHJpYnV0ZShcImhpZGRlblwiLCB0cnVlKTtcbiAgICAgIGVycm9yLmlubmVySFRNTCA9IFwiPHByZT5FcnJvcjogXCIgKyBzdHJpbmdpZnkoZXJyKSArIFwiPC9wcmU+XCI7XG4gICAgfSk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IHJ1bkNhbGw7XG4iLCJpbXBvcnQgY29kZU1pcnJvciBmcm9tIFwiLi9lZGl0b3JcIjtcblxuZnVuY3Rpb24gc2V0TGFuZygpIHtcbiAgY29uc3Qgc2VsZWN0b3IgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImxhbmctc2VsZWN0XCIpO1xuICBjb25zdCBsYW5nID0gc2VsZWN0b3Iub3B0aW9uc1tzZWxlY3Rvci5zZWxlY3RlZEluZGV4XS5pbm5lclRleHQ7XG4gIGlmIChsYW5nID09PSBcInB5dGhvbjNcIiB8fCBsYW5nID09PSBcInB5dGhvblwiKSB7XG4gICAgY29kZU1pcnJvci5zZXRPcHRpb24oXCJtb2RlXCIsIFwicHl0aG9uXCIpXG4gICAgY29kZU1pcnJvci5zZXRWYWx1ZShcbiAgICAgIFwiZGVmIGZpYm9uYWNjaShuKTpcXG5cXHRpZiBuPD0xOlxcblxcdFxcdHJldHVybiBuXFxuXFx0ZWxzZTpcXG5cXHRcXHRyZXR1cm4oZmlib25hY2NpKG4tMSkgKyBmaWJvbmFjY2kobi0yKSlcXG5cXG5uID0gNVxcblxcbmZpYm9fc2VyaWVzID0gW11cXG5cXG5mb3IgaSBpbiByYW5nZSgwLG4pOlxcblxcdGZpYm9fc2VyaWVzLmFwcGVuZChmaWJvbmFjY2koaSkpXFxuXFxucHJpbnQoJ0hlbGxvLCBXb3JsZCBmcm9tIFB5dGhvbiEgSGVyZVxcXFwncyBzb21lIGZpYm9uYWNjaSBudW1iZXJzOicpXFxucHJpbnQoZmlib19zZXJpZXMpXCJcbiAgICApO1xuICB9IGVsc2UgaWYgKFxuICAgIGxhbmcgPT09IFwibm9kZVwiIHx8XG4gICAgbGFuZyA9PT0gXCJub2RlanNcIiB8fFxuICAgIGxhbmcgPT09IFwianNcIiB8fFxuICAgIGxhbmcgPT09IFwiamF2YXNjcmlwdFwiXG4gICkge1xuICAgIGNvZGVNaXJyb3Iuc2V0T3B0aW9uKFwibW9kZVwiLCBcImphdmFzY3JpcHRcIik7XG4gICAgY29kZU1pcnJvci5zZXRWYWx1ZSgnY29uc3QgeyBleGVjIH0gPSByZXF1aXJlKFwiY2hpbGRfcHJvY2Vzc1wiKTtcXG5cXG5jb25zb2xlLmxvZyhcIkhlbGxvIHdvcmxkIGZyb20gTm9kZS5qcyEgTXkgdXB0aW1lIGlzOlwiKTtcXG5cXG5leGVjKFwidXB0aW1lXCIsIChlcnJvciwgc3Rkb3V0LCBzdGRlcnIpID0+IHtcXG5cXHRpZiAoZXJyb3IpIHtcXG5cXHRcXHRjb25zb2xlLmxvZyhgZXJyb3I6ICR7ZXJyb3IubWVzc2FnZX1gKTtcXG5cXHRcXHRyZXR1cm47XFxufVxcblxcdGlmIChzdGRlcnIpIHtcXG5cXHRcXHRjb25zb2xlLmxvZyhgc3RkZXJyOiAke3N0ZGVycn1gKTtcXG5cXHRcXHRyZXR1cm47XFxuXFx0fVxcblxcdFxcdGNvbnNvbGUubG9nKGBzdGRvdXQ6ICR7c3Rkb3V0fWApO1xcbn0pOycpO1xuICB9IGVsc2UgaWYgKGxhbmcgPT09IFwiYysrXCIgfHwgbGFuZyA9PT0gXCJjcHBcIiB8fCBsYW5nID09PSBcImMrKzExXCIpIHtcbiAgICBjb2RlTWlycm9yLnNldE9wdGlvbihcIm1vZGVcIiwgXCJjbGlrZVwiKTtcbiAgICBjb2RlTWlycm9yLnNldFZhbHVlKFxuICAgICAgYCNpbmNsdWRlPGlvc3RyZWFtPlxuI2luY2x1ZGU8dGhyZWFkPlxuaW50IG1haW4oKSB7XG5cdHVuc2lnbmVkIGludCBudGhyZWFkcyA9IHN0ZDo6dGhyZWFkOjpoYXJkd2FyZV9jb25jdXJyZW5jeSgpO1xuXHRzdGQ6OmNvdXQgPDwgXCJoZWxsbyB3b3JsZCBmcm9tIEMrKyFcIiA8PCBzdGQ6OmVuZGw7XG5cdHN0ZDo6Y2VyciA8PCBcIkkgaGF2ZSBcIiA8PCBudGhyZWFkcyA8PCBcIiB0aHJlYWRzIVwiIDw8IHN0ZDo6ZW5kbDtcblx0cmV0dXJuIDA7XG59YFxuICAgICk7XG4gIH0gZWxzZSBpZiAobGFuZyA9PT0gXCJnb1wiIHx8IGxhbmcgPT09IFwiZ29sYW5nXCIpIHtcbiAgICBjb2RlTWlycm9yLnNldE9wdGlvbihcIm1vZGVcIiwgXCJnb1wiKTtcbiAgICBjb2RlTWlycm9yLnNldFZhbHVlKFxuICAgICAgYHBhY2thZ2UgbWFpblxuaW1wb3J0IFwiZm10XCJcbmZ1bmMgbWFpbigpIHtcbiAgICBmbXQuUHJpbnRsbihcImhlbGxvIHdvcmxkIGZyb20gR28hXCIpXG59YFxuICAgICk7XG4gIH0gZWxzZSBpZiAobGFuZyA9PT0gXCJiYXNoXCIgfHwgbGFuZyA9PT0gXCJzaFwiKSB7XG4gICAgY29kZU1pcnJvci5zZXRPcHRpb24oXCJtb2RlXCIsIFwic2hlbGxcIilcbiAgICBjb2RlTWlycm9yLnNldFZhbHVlKFxuICAgICAgYFxuIyBGdW5jdGlvbiB0byBwcmludCBGaWJvbmFjY2kgU2VxdWVuY2VcbmZ1bmN0aW9uIHByaW50X2ZpYm9uYWNjaSgpIHtcbiAgICBudW09JDFcbiAgICBhPTBcbiAgICBiPTFcbiAgICBlY2hvIFwiVGhlIEZpYm9uYWNjaSBzZXF1ZW5jZSBmb3IgJG51bSB0ZXJtcyBpczogXCJcblxuICAgIGZvciAoKCBpPTA7IGk8bnVtOyBpKysgKSlcbiAgICBkb1xuICAgICAgICBlY2hvIC1uIFwiJGEgXCJcbiAgICAgICAgZm49JCgoYSArIGIpKVxuICAgICAgICBhPSRiXG4gICAgICAgIGI9JGZuXG4gICAgZG9uZVxufVxuXG5wcmludF9maWJvbmFjY2kgNVxuXHRcdFx0YFxuICAgICk7XG4gIH0gZWxzZSBpZiAobGFuZyA9PT0gXCJydXN0XCIpIHtcbiAgICBjb2RlTWlycm9yLnNldE9wdGlvbihcIm1vZGVcIiwgXCJydXN0XCIpO1xuICAgIGNvZGVNaXJyb3Iuc2V0VmFsdWUoYFxuc3RydWN0IE15U3RydWN0IHtcblx0bXNnOiBTdHJpbmcsXG59XG5cbmltcGwgTXlTdHJ1Y3Qge1xuXHRmbiBuZXcobXNnOiBTdHJpbmcpIC0+IFNlbGYge1xuXHRcdFNlbGYge1xuXHRcdFx0bXNnXG5cdFx0fVxuXHR9XG5cdFxuXHRmbiBwcmludCgmc2VsZikge1xuXHRcdHByaW50bG4hKFwie31cIiwgc2VsZi5tc2cpO1xuXHR9XG59XG5cbmZuIG1haW4oKSB7XG4gICAgbGV0IG15X3N0cnVjdCA9IE15U3RydWN0OjpuZXcoU3RyaW5nOjpmcm9tKFwiSGVsbG8sIFdvcmxkIVwiKSk7XG5cdFxuXHRteV9zdHJ1Y3QucHJpbnQoKTtcbn1cbmBcbiAgICApO1xuICB9IGVsc2Uge1xuICAgIGNvZGVNaXJyb3Iuc2V0VmFsdWUoXG4gICAgICBcImRlZiBmaWJvbmFjY2kobik6XFxuXFx0aWYgbjw9MTpcXG5cXHRcXHRyZXR1cm4gblxcblxcdGVsc2U6XFxuXFx0XFx0cmV0dXJuKGZpYm9uYWNjaShuLTEpICsgZmlib25hY2NpKG4tMikpXFxuXFxubiA9IDVcXG5cXG5maWJvX3NlcmllcyA9IFtdXFxuXFxuZm9yIGkgaW4gcmFuZ2UoMCxuKTpcXG5cXHRmaWJvX3Nlcmllcy5hcHBlbmQoZmlib25hY2NpKGkpKVxcblxcbnByaW50KCdIZWxsbywgV29ybGQgZnJvbSBQeXRob24hIEhlcmVcXFxcJ3Mgc29tZSBmaWJvbmFjY2kgbnVtYmVyczonKVxcbnByaW50KGZpYm9fc2VyaWVzKVwiXG4gICAgKTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBzZXRMYW5nO1xuIiwiLy8gSW1wb3J0c1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18gZnJvbSBcIi4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9zb3VyY2VNYXBzLmpzXCI7XG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fIGZyb20gXCIuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzXCI7XG52YXIgX19fQ1NTX0xPQURFUl9FWFBPUlRfX18gPSBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyk7XG5fX19DU1NfTE9BREVSX0VYUE9SVF9fXy5wdXNoKFttb2R1bGUuaWQsIFwiQGltcG9ydCB1cmwoaHR0cHM6Ly9mb250cy5nb29nbGVhcGlzLmNvbS9jc3MyP2ZhbWlseT1RdWlja3NhbmQ6d2dodEAzMDA7NDAwJmRpc3BsYXk9c3dhcCk7XCJdKTtcbl9fX0NTU19MT0FERVJfRVhQT1JUX19fLnB1c2goW21vZHVsZS5pZCwgXCJAaW1wb3J0IHVybChodHRwczovL2ZvbnRzLmdvb2dsZWFwaXMuY29tL2NzczI/ZmFtaWx5PUlCTStQbGV4K01vbm8mZGlzcGxheT1zd2FwKTtcIl0pO1xuX19fQ1NTX0xPQURFUl9FWFBPUlRfX18ucHVzaChbbW9kdWxlLmlkLCBcIkBpbXBvcnQgdXJsKGh0dHBzOi8vZm9udHMuZ29vZ2xlYXBpcy5jb20vY3NzMj9mYW1pbHk9V29yaytTYW5zJmRpc3BsYXk9c3dhcCk7XCJdKTtcbi8vIE1vZHVsZVxuX19fQ1NTX0xPQURFUl9FWFBPUlRfX18ucHVzaChbbW9kdWxlLmlkLCBcIi8qIERhcmsgbW9kZSAqL1xcbkBtZWRpYSAocHJlZmVycy1jb2xvci1zY2hlbWU6IGRhcmspIHtcXG4gICAgYm9keSB7XFxuICAgICAgICBiYWNrZ3JvdW5kOiAjMTgxODE4O1xcbiAgICAgICAgY29sb3I6ICNkOGQ4ZDg7XFxuICAgIH1cXG5cXG4gICAgYSB7XFxuICAgICAgICBjb2xvcjogI0NGOUZGRjtcXG4gICAgfVxcblxcbiAgICAuZmllbGQge1xcbiAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogIzI4MjgyODtcXG4gICAgICAgIGNvbG9yOiAjZDhkOGQ4O1xcbiAgICB9XFxufVxcblxcblxcblxcbi8qIExpZ2h0IG1vZGUgKi9cXG5AbWVkaWEgKHByZWZlcnMtY29sb3Itc2NoZW1lOiBsaWdodCkge1xcbiAgICBib2R5IHtcXG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6ICNmNWY1ZjU7XFxuICAgICAgICBjb2xvcjogIzI4MjgyODtcXG4gICAgfVxcblxcbiAgICBhIHtcXG4gICAgICAgIGNvbG9yOiAjNDAwMDgwO1xcbiAgICB9XFxuXFxuICAgIC5maWVsZCB7XFxuICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZDhkOGQ4O1xcbiAgICAgICAgY29sb3I6ICMyODI4Mjg7XFxuICAgIH1cXG59XFxuXFxuLkNvZGVNaXJyb3Ige1xcbiAgICBtYXJnaW46IGF1dG87XFxuICAgIGhlaWdodDogNDUwcHg7XFxuICAgIGZvbnQtc2l6ZTogMTVweDtcXG4gICAgdGV4dC1hbGlnbjogbGVmdDtcXG4gICAgdGV4dC1zaGFkb3c6IG5vbmU7XFxufVxcblxcbmJ1dHRvbiB7XFxuICAgIGZvbnQtc3R5bGU6IFxcXCJJQk0gUGxleCBNb25vXFxcIiwgbW9ub3NwYWNlO1xcbiAgICBwYWRkaW5nOiA0cHg7XFxuICAgIG1hcmdpbi10b3A6IDVweDtcXG59XFxuXFxuLnNlbGVjdG9ycyB7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcXG59XFxuXFxuc2VsZWN0IHtcXG4gICAgZm9udC1mYW1pbHk6IG1vbm9zcGFjZTtcXG4gICAgZm9udDogXFxcIklCTSBQbGV4IE1vbm9cXFwiO1xcbn1cXG5cXG4jd3JhcHBlciB7XFxuICAgIG1hcmdpbi10b3A6IDMlO1xcbiAgICB3aWR0aDogNTAlO1xcbn1cXG5cXG5cXG5ib2R5IHtcXG4gICAgZm9udC1mYW1pbHk6IFxcXCJJQk0gUGxleCBNb25vXFxcIiwgbW9ub3NwYWNlO1xcbiAgICB0ZXh0LXJlbmRlcmluZzogb3B0aW1pemVMZWdpYmlsaXR5O1xcbiAgICAvKiBsaW5lLWhlaWdodDogMS41OyAqL1xcbiAgICAvKiBtYXJnaW46IDFyZW0gMXJlbTsgKi9cXG59XFxuXFxuaHRtbCB7XFxuICAgIG1hcmdpbi1sZWZ0OiBjYWxjKDEwMHZ3IC0gMTAwJSk7XFxufVxcblxcbmE6dmlzaXRlZCB7XFxuICAgIGNvbG9yOiBncmF5O1xcbiAgICBmb250LXdlaWdodDogYm9sZDtcXG59XFxuXFxuZm9vdGVyIHtcXG4gICAgZm9udC1zaXplOiAxNHB4O1xcbiAgICBwYWRkaW5nOiAyMHB4O1xcbiAgICBtYXJnaW4tbGVmdDogMzAlO1xcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcbn1cXG5cXG4ub3V0cHV0IHtcXG4gICAgd2lkdGg6IDcwJTtcXG4gICAgbWFyZ2luLXRvcDogMTBweDtcXG59XFxuXFxuLmZpZWxkIHtcXG4gICAgYm9yZGVyLXJhZGl1czogMTBweDtcXG4gICAgLW1vei1ib3JkZXItcmFkaXVzOiAxMHB4O1xcbiAgICBtYXJnaW46IGF1dG87XFxuICAgIHRleHQtYWxpZ246IGxlZnQ7XFxuICAgIHBhZGRpbmc6IDVweDtcXG4gICAgZm9udC1zaXplOiAxNHB4O1xcbn1cXG5cXG4uYm94IHtcXG4gICAgd2lkdGg6IDkwJTtcXG59XFxuXFxucHJlIHtcXG4gICAgdGV4dC13cmFwOiBiYWxhbmNlO1xcbn1cXG5cXG4jd3JhcHBlciB7XFxuICAgIHdpZHRoOiA1MCU7XFxuICAgIG1hcmdpbi1sZWZ0OiAyNSU7XFxufVxcblwiLCBcIlwiLHtcInZlcnNpb25cIjozLFwic291cmNlc1wiOltcIndlYnBhY2s6Ly8uL3N0eWxlL21haW4uY3NzXCJdLFwibmFtZXNcIjpbXSxcIm1hcHBpbmdzXCI6XCJBQUtBLGNBQWM7QUFDZDtJQUNJO1FBQ0ksbUJBQW1CO1FBQ25CLGNBQWM7SUFDbEI7O0lBRUE7UUFDSSxjQUFjO0lBQ2xCOztJQUVBO1FBQ0kseUJBQXlCO1FBQ3pCLGNBQWM7SUFDbEI7QUFDSjs7OztBQUlBLGVBQWU7QUFDZjtJQUNJO1FBQ0kseUJBQXlCO1FBQ3pCLGNBQWM7SUFDbEI7O0lBRUE7UUFDSSxjQUFjO0lBQ2xCOztJQUVBO1FBQ0kseUJBQXlCO1FBQ3pCLGNBQWM7SUFDbEI7QUFDSjs7QUFFQTtJQUNJLFlBQVk7SUFDWixhQUFhO0lBQ2IsZUFBZTtJQUNmLGdCQUFnQjtJQUNoQixpQkFBaUI7QUFDckI7O0FBRUE7SUFDSSxzQ0FBc0M7SUFDdEMsWUFBWTtJQUNaLGVBQWU7QUFDbkI7O0FBRUE7SUFDSSxhQUFhO0lBQ2IsOEJBQThCO0FBQ2xDOztBQUVBO0lBQ0ksc0JBQXNCO0lBQ3RCLHFCQUFxQjtBQUN6Qjs7QUFFQTtJQUNJLGNBQWM7SUFDZCxVQUFVO0FBQ2Q7OztBQUdBO0lBQ0ksdUNBQXVDO0lBQ3ZDLGtDQUFrQztJQUNsQyxzQkFBc0I7SUFDdEIsdUJBQXVCO0FBQzNCOztBQUVBO0lBQ0ksK0JBQStCO0FBQ25DOztBQUVBO0lBQ0ksV0FBVztJQUNYLGlCQUFpQjtBQUNyQjs7QUFFQTtJQUNJLGVBQWU7SUFDZixhQUFhO0lBQ2IsZ0JBQWdCO0lBQ2hCLG1CQUFtQjtBQUN2Qjs7QUFFQTtJQUNJLFVBQVU7SUFDVixnQkFBZ0I7QUFDcEI7O0FBRUE7SUFDSSxtQkFBbUI7SUFDbkIsd0JBQXdCO0lBQ3hCLFlBQVk7SUFDWixnQkFBZ0I7SUFDaEIsWUFBWTtJQUNaLGVBQWU7QUFDbkI7O0FBRUE7SUFDSSxVQUFVO0FBQ2Q7O0FBRUE7SUFDSSxrQkFBa0I7QUFDdEI7O0FBRUE7SUFDSSxVQUFVO0lBQ1YsZ0JBQWdCO0FBQ3BCXCIsXCJzb3VyY2VzQ29udGVudFwiOltcIkBpbXBvcnQgdXJsKFxcXCJodHRwczovL2ZvbnRzLmdvb2dsZWFwaXMuY29tL2NzczI/ZmFtaWx5PVF1aWNrc2FuZDp3Z2h0QDMwMDs0MDAmZGlzcGxheT1zd2FwXFxcIik7XFxuQGltcG9ydCB1cmwoJ2h0dHBzOi8vZm9udHMuZ29vZ2xlYXBpcy5jb20vY3NzMj9mYW1pbHk9SUJNK1BsZXgrTW9ubyZkaXNwbGF5PXN3YXAnKTtcXG5cXG5AaW1wb3J0IHVybChcXFwiaHR0cHM6Ly9mb250cy5nb29nbGVhcGlzLmNvbS9jc3MyP2ZhbWlseT1Xb3JrK1NhbnMmZGlzcGxheT1zd2FwXFxcIik7XFxuXFxuLyogRGFyayBtb2RlICovXFxuQG1lZGlhIChwcmVmZXJzLWNvbG9yLXNjaGVtZTogZGFyaykge1xcbiAgICBib2R5IHtcXG4gICAgICAgIGJhY2tncm91bmQ6ICMxODE4MTg7XFxuICAgICAgICBjb2xvcjogI2Q4ZDhkODtcXG4gICAgfVxcblxcbiAgICBhIHtcXG4gICAgICAgIGNvbG9yOiAjQ0Y5RkZGO1xcbiAgICB9XFxuXFxuICAgIC5maWVsZCB7XFxuICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjMjgyODI4O1xcbiAgICAgICAgY29sb3I6ICNkOGQ4ZDg7XFxuICAgIH1cXG59XFxuXFxuXFxuXFxuLyogTGlnaHQgbW9kZSAqL1xcbkBtZWRpYSAocHJlZmVycy1jb2xvci1zY2hlbWU6IGxpZ2h0KSB7XFxuICAgIGJvZHkge1xcbiAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogI2Y1ZjVmNTtcXG4gICAgICAgIGNvbG9yOiAjMjgyODI4O1xcbiAgICB9XFxuXFxuICAgIGEge1xcbiAgICAgICAgY29sb3I6ICM0MDAwODA7XFxuICAgIH1cXG5cXG4gICAgLmZpZWxkIHtcXG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6ICNkOGQ4ZDg7XFxuICAgICAgICBjb2xvcjogIzI4MjgyODtcXG4gICAgfVxcbn1cXG5cXG4uQ29kZU1pcnJvciB7XFxuICAgIG1hcmdpbjogYXV0bztcXG4gICAgaGVpZ2h0OiA0NTBweDtcXG4gICAgZm9udC1zaXplOiAxNXB4O1xcbiAgICB0ZXh0LWFsaWduOiBsZWZ0O1xcbiAgICB0ZXh0LXNoYWRvdzogbm9uZTtcXG59XFxuXFxuYnV0dG9uIHtcXG4gICAgZm9udC1zdHlsZTogXFxcIklCTSBQbGV4IE1vbm9cXFwiLCBtb25vc3BhY2U7XFxuICAgIHBhZGRpbmc6IDRweDtcXG4gICAgbWFyZ2luLXRvcDogNXB4O1xcbn1cXG5cXG4uc2VsZWN0b3JzIHtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xcbn1cXG5cXG5zZWxlY3Qge1xcbiAgICBmb250LWZhbWlseTogbW9ub3NwYWNlO1xcbiAgICBmb250OiBcXFwiSUJNIFBsZXggTW9ub1xcXCI7XFxufVxcblxcbiN3cmFwcGVyIHtcXG4gICAgbWFyZ2luLXRvcDogMyU7XFxuICAgIHdpZHRoOiA1MCU7XFxufVxcblxcblxcbmJvZHkge1xcbiAgICBmb250LWZhbWlseTogXFxcIklCTSBQbGV4IE1vbm9cXFwiLCBtb25vc3BhY2U7XFxuICAgIHRleHQtcmVuZGVyaW5nOiBvcHRpbWl6ZUxlZ2liaWxpdHk7XFxuICAgIC8qIGxpbmUtaGVpZ2h0OiAxLjU7ICovXFxuICAgIC8qIG1hcmdpbjogMXJlbSAxcmVtOyAqL1xcbn1cXG5cXG5odG1sIHtcXG4gICAgbWFyZ2luLWxlZnQ6IGNhbGMoMTAwdncgLSAxMDAlKTtcXG59XFxuXFxuYTp2aXNpdGVkIHtcXG4gICAgY29sb3I6IGdyYXk7XFxuICAgIGZvbnQtd2VpZ2h0OiBib2xkO1xcbn1cXG5cXG5mb290ZXIge1xcbiAgICBmb250LXNpemU6IDE0cHg7XFxuICAgIHBhZGRpbmc6IDIwcHg7XFxuICAgIG1hcmdpbi1sZWZ0OiAzMCU7XFxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxufVxcblxcbi5vdXRwdXQge1xcbiAgICB3aWR0aDogNzAlO1xcbiAgICBtYXJnaW4tdG9wOiAxMHB4O1xcbn1cXG5cXG4uZmllbGQge1xcbiAgICBib3JkZXItcmFkaXVzOiAxMHB4O1xcbiAgICAtbW96LWJvcmRlci1yYWRpdXM6IDEwcHg7XFxuICAgIG1hcmdpbjogYXV0bztcXG4gICAgdGV4dC1hbGlnbjogbGVmdDtcXG4gICAgcGFkZGluZzogNXB4O1xcbiAgICBmb250LXNpemU6IDE0cHg7XFxufVxcblxcbi5ib3gge1xcbiAgICB3aWR0aDogOTAlO1xcbn1cXG5cXG5wcmUge1xcbiAgICB0ZXh0LXdyYXA6IGJhbGFuY2U7XFxufVxcblxcbiN3cmFwcGVyIHtcXG4gICAgd2lkdGg6IDUwJTtcXG4gICAgbWFyZ2luLWxlZnQ6IDI1JTtcXG59XFxuXCJdLFwic291cmNlUm9vdFwiOlwiXCJ9XSk7XG4vLyBFeHBvcnRzXG5leHBvcnQgZGVmYXVsdCBfX19DU1NfTE9BREVSX0VYUE9SVF9fXztcbiIsIlxuICAgICAgaW1wb3J0IEFQSSBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qc1wiO1xuICAgICAgaW1wb3J0IGRvbUFQSSBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlRG9tQVBJLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0Rm4gZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzXCI7XG4gICAgICBpbXBvcnQgc2V0QXR0cmlidXRlcyBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3NldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcy5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydFN0eWxlRWxlbWVudCBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydFN0eWxlRWxlbWVudC5qc1wiO1xuICAgICAgaW1wb3J0IHN0eWxlVGFnVHJhbnNmb3JtRm4gZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZVRhZ1RyYW5zZm9ybS5qc1wiO1xuICAgICAgaW1wb3J0IGNvbnRlbnQsICogYXMgbmFtZWRFeHBvcnQgZnJvbSBcIiEhLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9tYWluLmNzc1wiO1xuICAgICAgXG4gICAgICBcblxudmFyIG9wdGlvbnMgPSB7fTtcblxub3B0aW9ucy5zdHlsZVRhZ1RyYW5zZm9ybSA9IHN0eWxlVGFnVHJhbnNmb3JtRm47XG5vcHRpb25zLnNldEF0dHJpYnV0ZXMgPSBzZXRBdHRyaWJ1dGVzO1xuXG4gICAgICBvcHRpb25zLmluc2VydCA9IGluc2VydEZuLmJpbmQobnVsbCwgXCJoZWFkXCIpO1xuICAgIFxub3B0aW9ucy5kb21BUEkgPSBkb21BUEk7XG5vcHRpb25zLmluc2VydFN0eWxlRWxlbWVudCA9IGluc2VydFN0eWxlRWxlbWVudDtcblxudmFyIHVwZGF0ZSA9IEFQSShjb250ZW50LCBvcHRpb25zKTtcblxuXG5cbmV4cG9ydCAqIGZyb20gXCIhIS4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vbWFpbi5jc3NcIjtcbiAgICAgICBleHBvcnQgZGVmYXVsdCBjb250ZW50ICYmIGNvbnRlbnQubG9jYWxzID8gY29udGVudC5sb2NhbHMgOiB1bmRlZmluZWQ7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=