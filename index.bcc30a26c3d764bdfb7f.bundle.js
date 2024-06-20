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
/* harmony import */ var codemirror_theme_3024_day_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! codemirror/theme/3024-day.css */ "./node_modules/codemirror/theme/3024-day.css");
/* harmony import */ var codemirror_theme_3024_night_css__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! codemirror/theme/3024-night.css */ "./node_modules/codemirror/theme/3024-night.css");
/* harmony import */ var codemirror_theme_blackboard_css__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! codemirror/theme/blackboard.css */ "./node_modules/codemirror/theme/blackboard.css");
/* harmony import */ var codemirror_theme_darcula_css__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! codemirror/theme/darcula.css */ "./node_modules/codemirror/theme/darcula.css");
/* harmony import */ var codemirror_theme_dracula_css__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! codemirror/theme/dracula.css */ "./node_modules/codemirror/theme/dracula.css");
/* harmony import */ var codemirror_theme_eclipse_css__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! codemirror/theme/eclipse.css */ "./node_modules/codemirror/theme/eclipse.css");
/* harmony import */ var codemirror_theme_elegant_css__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! codemirror/theme/elegant.css */ "./node_modules/codemirror/theme/elegant.css");
/* harmony import */ var codemirror_theme_erlang_dark_css__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! codemirror/theme/erlang-dark.css */ "./node_modules/codemirror/theme/erlang-dark.css");
/* harmony import */ var codemirror_theme_idea_css__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! codemirror/theme/idea.css */ "./node_modules/codemirror/theme/idea.css");
/* harmony import */ var codemirror_theme_isotope_css__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! codemirror/theme/isotope.css */ "./node_modules/codemirror/theme/isotope.css");
/* harmony import */ var codemirror_theme_midnight_css__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! codemirror/theme/midnight.css */ "./node_modules/codemirror/theme/midnight.css");
/* harmony import */ var codemirror_theme_lucario_css__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! codemirror/theme/lucario.css */ "./node_modules/codemirror/theme/lucario.css");
/* harmony import */ var codemirror_theme_monokai_css__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! codemirror/theme/monokai.css */ "./node_modules/codemirror/theme/monokai.css");
/* harmony import */ var codemirror_theme_solarized_css__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! codemirror/theme/solarized.css */ "./node_modules/codemirror/theme/solarized.css");
/* harmony import */ var _style_main_css__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ../style/main.css */ "./style/main.css");
/* harmony import */ var _run_request__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ./run-request */ "./js/run-request.js");
/* harmony import */ var _editor__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ./editor */ "./js/editor.js");
/* harmony import */ var _langs_request__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ./langs-request */ "./js/langs-request.js");
/* harmony import */ var _config_utils__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! ./config-utils */ "./js/config-utils.js");
/* harmony import */ var _set_code__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! ./set-code */ "./js/set-code.js");







// other themes























var langs;

_editor__WEBPACK_IMPORTED_MODULE_22__["default"].setValue(
      "def fibonacci(n):\n\tif n<=1:\n\t\treturn n\n\telse:\n\t\treturn(fibonacci(n-1) + fibonacci(n-2))\n\nn = 5\n\nfibo_series = []\n\nfor i in range(0,n):\n\tfibo_series.append(fibonacci(i))\n\nprint('Hello, World from Python! Here\\'s some fibonacci numbers:')\nprint(fibo_series)"
);

(0,_langs_request__WEBPACK_IMPORTED_MODULE_23__["default"])()
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
    _config_utils__WEBPACK_IMPORTED_MODULE_24__["default"].getSelectedLanguage();
  });

function selectTheme() {
  const select = document.getElementById("theme-select");
  var theme = select.options[select.selectedIndex].textContent;
  _editor__WEBPACK_IMPORTED_MODULE_22__["default"].setOption("theme", theme);
}

const submitBtn = document.getElementById("submit-btn");
submitBtn.addEventListener("click", _run_request__WEBPACK_IMPORTED_MODULE_21__["default"]);

const selector = document.getElementById("theme-select");
selector.addEventListener("change", selectTheme);

const langSelector = document.getElementById("lang-select");
langSelector.addEventListener("change", _set_code__WEBPACK_IMPORTED_MODULE_25__["default"]);


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
        });
      }
    };
    xhr.onerror = function() {
      reject({
        status: this.status,
        statusText: xhr.statusText,
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

      out["error"] = stringify(out["error"]);

      stdout.innerHTML =
        "Stdout: " + out["stdout"].replace(/\n/g, "<br>");
      stdout.removeAttribute("hidden");

      stderr.innerHTML =
        "Stderr: " + out["stderr"];
      stderr.removeAttribute("hidden");

      error.innerHTML = "Error: " + out["error"];
    })
    .catch(function(err) {
      console.log(err);
      stdout.setAttribute("hidden", true);
      stderr.setAttribute("hidden", true);
      error.innerHTML = "Error: " + stringify(err);
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
___CSS_LOADER_EXPORT___.push([module.id, "/* Dark mode */\n@media (prefers-color-scheme: dark) {\n    body {\n        background: #181818;\n        color: #d8d8d8;\n    }\n\n    a {\n        color: #CF9FFF;\n    }\n\n    .field {\n        background-color: #282828;\n        color: #d8d8d8;\n    }\n}\n\n\n\n/* Light mode */\n@media (prefers-color-scheme: light) {\n    body {\n        background-color: #f5f5f5;\n        color: #282828;\n    }\n\n    a {\n        color: #400080;\n    }\n\n    .field {\n        background-color: #d8d8d8;\n        color:#282828;\n    }\n}\n\n.CodeMirror {\n    margin: auto;\n    height: 450px;\n    font-size: 15px;\n    text-align: left;\n    text-shadow: none;\n}\n\nbutton {\n    font-style: \"IBM Plex Mono\", monospace;\n    padding: 4px;\n    margin-top: 5px;\n}\n\n.selectors {\n    display: flex;\n    justify-content: space-between;\n}\n\nselect {\n    font-family: monospace;\n    font: \"IBM Plex Mono\";\n}\n\n#wrapper {\n    margin-top: 3%;\n    width: 50%;\n}\n\n\nbody {\n    font-family: \"IBM Plex Mono\", monospace;\n    text-rendering: optimizeLegibility;\n    /* line-height: 1.5; */\n    /* margin: 1rem 1rem; */\n}\n\nhtml {\n    margin-left: calc(100vw - 100%);\n}\n\na:visited {\n    color: gray;\n    font-weight: bold;\n}\n\nfooter {\n    font-size: 14px;\n    padding: 20px;\n    margin-left: 30%;\n    align-items: center;\n}\n\n.output {\n    width: 70%;\n    margin-top: 10px;\n}\n\n.field {\n    border-radius: 10px;\n    -moz-border-radius: 10px;\n    margin: auto;\n    text-align: left;\n    padding: 5px;\n    font-size: 14px;\n}\n\n.box {\n    width: 90%;\n}\n\n#wrapper {\n    width: 50%;\n    margin-left: 25%;\n}", "",{"version":3,"sources":["webpack://./style/main.css"],"names":[],"mappings":"AAKA,cAAc;AACd;IACI;QACI,mBAAmB;QACnB,cAAc;IAClB;;IAEA;QACI,cAAc;IAClB;;IAEA;QACI,yBAAyB;QACzB,cAAc;IAClB;AACJ;;;;AAIA,eAAe;AACf;IACI;QACI,yBAAyB;QACzB,cAAc;IAClB;;IAEA;QACI,cAAc;IAClB;;IAEA;QACI,yBAAyB;QACzB,aAAa;IACjB;AACJ;;AAEA;IACI,YAAY;IACZ,aAAa;IACb,eAAe;IACf,gBAAgB;IAChB,iBAAiB;AACrB;;AAEA;IACI,sCAAsC;IACtC,YAAY;IACZ,eAAe;AACnB;;AAEA;IACI,aAAa;IACb,8BAA8B;AAClC;;AAEA;IACI,sBAAsB;IACtB,qBAAqB;AACzB;;AAEA;IACI,cAAc;IACd,UAAU;AACd;;;AAGA;IACI,uCAAuC;IACvC,kCAAkC;IAClC,sBAAsB;IACtB,uBAAuB;AAC3B;;AAEA;IACI,+BAA+B;AACnC;;AAEA;IACI,WAAW;IACX,iBAAiB;AACrB;;AAEA;IACI,eAAe;IACf,aAAa;IACb,gBAAgB;IAChB,mBAAmB;AACvB;;AAEA;IACI,UAAU;IACV,gBAAgB;AACpB;;AAEA;IACI,mBAAmB;IACnB,wBAAwB;IACxB,YAAY;IACZ,gBAAgB;IAChB,YAAY;IACZ,eAAe;AACnB;;AAEA;IACI,UAAU;AACd;;AAEA;IACI,UAAU;IACV,gBAAgB;AACpB","sourcesContent":["@import url(\"https://fonts.googleapis.com/css2?family=Quicksand:wght@300;400&display=swap\");\n@import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Mono&display=swap');\n\n@import url(\"https://fonts.googleapis.com/css2?family=Work+Sans&display=swap\");\n\n/* Dark mode */\n@media (prefers-color-scheme: dark) {\n    body {\n        background: #181818;\n        color: #d8d8d8;\n    }\n\n    a {\n        color: #CF9FFF;\n    }\n\n    .field {\n        background-color: #282828;\n        color: #d8d8d8;\n    }\n}\n\n\n\n/* Light mode */\n@media (prefers-color-scheme: light) {\n    body {\n        background-color: #f5f5f5;\n        color: #282828;\n    }\n\n    a {\n        color: #400080;\n    }\n\n    .field {\n        background-color: #d8d8d8;\n        color:#282828;\n    }\n}\n\n.CodeMirror {\n    margin: auto;\n    height: 450px;\n    font-size: 15px;\n    text-align: left;\n    text-shadow: none;\n}\n\nbutton {\n    font-style: \"IBM Plex Mono\", monospace;\n    padding: 4px;\n    margin-top: 5px;\n}\n\n.selectors {\n    display: flex;\n    justify-content: space-between;\n}\n\nselect {\n    font-family: monospace;\n    font: \"IBM Plex Mono\";\n}\n\n#wrapper {\n    margin-top: 3%;\n    width: 50%;\n}\n\n\nbody {\n    font-family: \"IBM Plex Mono\", monospace;\n    text-rendering: optimizeLegibility;\n    /* line-height: 1.5; */\n    /* margin: 1rem 1rem; */\n}\n\nhtml {\n    margin-left: calc(100vw - 100%);\n}\n\na:visited {\n    color: gray;\n    font-weight: bold;\n}\n\nfooter {\n    font-size: 14px;\n    padding: 20px;\n    margin-left: 30%;\n    align-items: center;\n}\n\n.output {\n    width: 70%;\n    margin-top: 10px;\n}\n\n.field {\n    border-radius: 10px;\n    -moz-border-radius: 10px;\n    margin: auto;\n    text-align: left;\n    padding: 5px;\n    font-size: 14px;\n}\n\n.box {\n    width: 90%;\n}\n\n#wrapper {\n    width: 50%;\n    margin-left: 25%;\n}"],"sourceRoot":""}]);
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
/******/ __webpack_require__.O(0, ["vendors-node_modules_codemirror_lib_codemirror_css","vendors-node_modules_codemirror_mode_javascript_javascript_js-node_modules_codemirror_mode_py-ffb6d3","vendors-node_modules_codemirror_lib_codemirror_js"], () => (__webpack_exec__("./js/load.js")));
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguYmNjMzBhMjZjM2Q3NjRiZGZiN2YuYnVuZGxlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxpRUFBZSxZQUFZLEVBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7QUNoQmM7O0FBRTFDO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQix5REFBZ0IsR0FBRyxrRUFBeUI7QUFDaEU7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0EsR0FBRztBQUNIOztBQUVBLGlFQUFlLFdBQVcsRUFBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUMzQlk7QUFDQTtBQUNKO0FBQ0Y7QUFDYztBQUNSOztBQUV2QztBQUN1QztBQUNFO0FBQ0E7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNJO0FBQ1A7QUFDRztBQUNDO0FBQ0Q7QUFDQztBQUNEO0FBQ0U7O0FBRWI7QUFDUztBQUNGO0FBQ1E7QUFDQTtBQUNUOztBQUVqQzs7QUFFQSx5REFBbUI7QUFDbkI7QUFDQTs7QUFFQSwyREFBVztBQUNYO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQjtBQUNuQjtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJLDBFQUFnQztBQUNwQyxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBLEVBQUUsMERBQW9CO0FBQ3RCOztBQUVBO0FBQ0Esb0NBQW9DLHFEQUFPOztBQUUzQztBQUNBOztBQUVBO0FBQ0Esd0NBQXdDLGtEQUFPOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUN2RWI7QUFDUTtBQUNIOztBQUV2QztBQUNBO0FBQ0E7QUFDQSxjQUFjLHdEQUFtQjtBQUNqQyxnQkFBZ0IseUVBQWdDO0FBQ2hEO0FBQ0E7QUFDQSxvQkFBb0IseURBQWdCLEdBQUcsaUVBQXdCO0FBQy9EO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0EsR0FBRztBQUNIOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQSxHQUFHOztBQUVIOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUEsaUVBQWUsT0FBTyxFQUFDOzs7Ozs7Ozs7Ozs7Ozs7O0FDdkZXOztBQUVsQztBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUksd0RBQW1CO0FBQ3ZCO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUksd0RBQW1CLFVBQVUsT0FBTywyQkFBMkIsMkRBQTJELCtDQUErQyxnQkFBZ0IsNEJBQTRCLGNBQWMsR0FBRyxhQUFhLEdBQUcsaUJBQWlCLDZCQUE2QixPQUFPLEdBQUcsYUFBYSxLQUFLLDZCQUE2QixPQUFPLEdBQUcsR0FBRyxFQUFFO0FBQ2hYLElBQUk7QUFDSixJQUFJLHdEQUFtQjtBQUN2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBLElBQUk7QUFDSixJQUFJLHdEQUFtQjtBQUN2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBLElBQUk7QUFDSixJQUFJLHdEQUFtQjtBQUN2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxnQkFBZ0IsT0FBTztBQUN2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0osSUFBSSx3REFBbUI7QUFDdkI7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsaUVBQWUsT0FBTyxFQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDaEV2QjtBQUMwRztBQUNqQjtBQUN6Riw4QkFBOEIsbUZBQTJCLENBQUMsNEZBQXFDO0FBQy9GLGtIQUFrSCxrQkFBa0I7QUFDcEksMkhBQTJIO0FBQzNILHVIQUF1SDtBQUN2SDtBQUNBLGdHQUFnRyxZQUFZLDhCQUE4Qix5QkFBeUIsT0FBTyxXQUFXLHlCQUF5QixPQUFPLGdCQUFnQixvQ0FBb0MseUJBQXlCLE9BQU8sR0FBRyxnRUFBZ0UsWUFBWSxvQ0FBb0MseUJBQXlCLE9BQU8sV0FBVyx5QkFBeUIsT0FBTyxnQkFBZ0Isb0NBQW9DLHdCQUF3QixPQUFPLEdBQUcsaUJBQWlCLG1CQUFtQixvQkFBb0Isc0JBQXNCLHVCQUF1Qix3QkFBd0IsR0FBRyxZQUFZLCtDQUErQyxtQkFBbUIsc0JBQXNCLEdBQUcsZ0JBQWdCLG9CQUFvQixxQ0FBcUMsR0FBRyxZQUFZLDZCQUE2Qiw4QkFBOEIsR0FBRyxjQUFjLHFCQUFxQixpQkFBaUIsR0FBRyxZQUFZLGdEQUFnRCx5Q0FBeUMsMkJBQTJCLDhCQUE4QixLQUFLLFVBQVUsc0NBQXNDLEdBQUcsZUFBZSxrQkFBa0Isd0JBQXdCLEdBQUcsWUFBWSxzQkFBc0Isb0JBQW9CLHVCQUF1QiwwQkFBMEIsR0FBRyxhQUFhLGlCQUFpQix1QkFBdUIsR0FBRyxZQUFZLDBCQUEwQiwrQkFBK0IsbUJBQW1CLHVCQUF1QixtQkFBbUIsc0JBQXNCLEdBQUcsVUFBVSxpQkFBaUIsR0FBRyxjQUFjLGlCQUFpQix1QkFBdUIsR0FBRyxPQUFPLHNGQUFzRixLQUFLLEtBQUssWUFBWSxXQUFXLE9BQU8sS0FBSyxVQUFVLE9BQU8sS0FBSyxZQUFZLFdBQVcsTUFBTSxRQUFRLFVBQVUsS0FBSyxLQUFLLFlBQVksV0FBVyxPQUFPLEtBQUssVUFBVSxPQUFPLEtBQUssWUFBWSxXQUFXLE1BQU0sTUFBTSxLQUFLLFVBQVUsVUFBVSxVQUFVLFlBQVksYUFBYSxPQUFPLEtBQUssWUFBWSxXQUFXLFVBQVUsT0FBTyxLQUFLLFVBQVUsWUFBWSxPQUFPLEtBQUssWUFBWSxhQUFhLE9BQU8sS0FBSyxVQUFVLFVBQVUsT0FBTyxLQUFLLFlBQVksYUFBYSxhQUFhLGFBQWEsT0FBTyxLQUFLLFlBQVksT0FBTyxLQUFLLFVBQVUsWUFBWSxPQUFPLEtBQUssVUFBVSxVQUFVLFlBQVksYUFBYSxPQUFPLEtBQUssVUFBVSxZQUFZLE9BQU8sS0FBSyxZQUFZLGFBQWEsV0FBVyxZQUFZLFdBQVcsVUFBVSxPQUFPLEtBQUssVUFBVSxNQUFNLEtBQUssVUFBVSxZQUFZLG9HQUFvRyxvQkFBb0IscUZBQXFGLHFGQUFxRiwwREFBMEQsWUFBWSw4QkFBOEIseUJBQXlCLE9BQU8sV0FBVyx5QkFBeUIsT0FBTyxnQkFBZ0Isb0NBQW9DLHlCQUF5QixPQUFPLEdBQUcsZ0VBQWdFLFlBQVksb0NBQW9DLHlCQUF5QixPQUFPLFdBQVcseUJBQXlCLE9BQU8sZ0JBQWdCLG9DQUFvQyx3QkFBd0IsT0FBTyxHQUFHLGlCQUFpQixtQkFBbUIsb0JBQW9CLHNCQUFzQix1QkFBdUIsd0JBQXdCLEdBQUcsWUFBWSwrQ0FBK0MsbUJBQW1CLHNCQUFzQixHQUFHLGdCQUFnQixvQkFBb0IscUNBQXFDLEdBQUcsWUFBWSw2QkFBNkIsOEJBQThCLEdBQUcsY0FBYyxxQkFBcUIsaUJBQWlCLEdBQUcsWUFBWSxnREFBZ0QseUNBQXlDLDJCQUEyQiw4QkFBOEIsS0FBSyxVQUFVLHNDQUFzQyxHQUFHLGVBQWUsa0JBQWtCLHdCQUF3QixHQUFHLFlBQVksc0JBQXNCLG9CQUFvQix1QkFBdUIsMEJBQTBCLEdBQUcsYUFBYSxpQkFBaUIsdUJBQXVCLEdBQUcsWUFBWSwwQkFBMEIsK0JBQStCLG1CQUFtQix1QkFBdUIsbUJBQW1CLHNCQUFzQixHQUFHLFVBQVUsaUJBQWlCLEdBQUcsY0FBYyxpQkFBaUIsdUJBQXVCLEdBQUcsbUJBQW1CO0FBQzk1STtBQUNBLGlFQUFlLHVCQUF1QixFQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ1R2QyxNQUErRjtBQUMvRixNQUFxRjtBQUNyRixNQUE0RjtBQUM1RixNQUErRztBQUMvRyxNQUF3RztBQUN4RyxNQUF3RztBQUN4RyxNQUFrRztBQUNsRztBQUNBOztBQUVBOztBQUVBLDRCQUE0QixxR0FBbUI7QUFDL0Msd0JBQXdCLGtIQUFhOztBQUVyQyx1QkFBdUIsdUdBQWE7QUFDcEM7QUFDQSxpQkFBaUIsK0ZBQU07QUFDdkIsNkJBQTZCLHNHQUFrQjs7QUFFL0MsYUFBYSwwR0FBRyxDQUFDLHFGQUFPOzs7O0FBSTRDO0FBQ3BFLE9BQU8saUVBQWUscUZBQU8sSUFBSSw0RkFBYyxHQUFHLDRGQUFjLFlBQVksRUFBQyIsInNvdXJjZXMiOlsid2VicGFjazovL3J1bm5lci13ZWItZnJvbnRlbmQvLi9qcy9jb25maWctdXRpbHMuanMiLCJ3ZWJwYWNrOi8vcnVubmVyLXdlYi1mcm9udGVuZC8uL2pzL2xhbmdzLXJlcXVlc3QuanMiLCJ3ZWJwYWNrOi8vcnVubmVyLXdlYi1mcm9udGVuZC8uL2pzL2xvYWQuanMiLCJ3ZWJwYWNrOi8vcnVubmVyLXdlYi1mcm9udGVuZC8uL2pzL3J1bi1yZXF1ZXN0LmpzIiwid2VicGFjazovL3J1bm5lci13ZWItZnJvbnRlbmQvLi9qcy9zZXQtY29kZS5qcyIsIndlYnBhY2s6Ly9ydW5uZXItd2ViLWZyb250ZW5kLy4vc3R5bGUvbWFpbi5jc3MiLCJ3ZWJwYWNrOi8vcnVubmVyLXdlYi1mcm9udGVuZC8uL3N0eWxlL21haW4uY3NzPzdmNTQiXSwic291cmNlc0NvbnRlbnQiOlsiZnVuY3Rpb24gZ2V0U2VsZWN0ZWRMYW5ndWFnZSgpIHtcbiAgY29uc3Qgc2VsZWN0b3IgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImxhbmctc2VsZWN0XCIpO1xuICByZXR1cm4gc2VsZWN0b3Iub3B0aW9uc1tzZWxlY3Rvci5zZWxlY3RlZEluZGV4XS5pbm5lclRleHQ7XG59XG5cbmNvbnN0IHJ1bm5lckNvbmZpZyA9IHtcbiAgZ2V0U2VsZWN0ZWRMYW5ndWFnZTogZ2V0U2VsZWN0ZWRMYW5ndWFnZSxcbiAgLy8gVW5jb21tZW50IGZvciBsb2NhbCB0ZXN0aW5nXG4gIC8vIHVybDogXCJodHRwOi8vbG9jYWxob3N0OjEwMTAwL2FwaS92MS9cIixcbiAgdXJsOiBcImh0dHBzOi8vcnVubmVyLmZseS5kZXYvYXBpL3YxL1wiLFxuICBydW5FbmRwb2ludDogXCJydW5cIixcbiAgbGFuZ0VuZHBvaW50OiBcImxhbmd1YWdlc1wiLFxufTtcblxuLy8gb25seSBzaW5nbGUgZXhwb3J0IHBlciAuanMgZmlsZSBhbGxvd2VkXG4vLyBleHBvcnRpbmcgdGhpcyBzaW5jZSB3ZSB3aWxsIG5lZWQgaXQgdG8gcmV0cmlldmUgdGhlIGN1cnJlbnQgbGFuZ3VhZ2UgZnJvbSB0aGUgZG9jdW1lbnQvRE9NXG5leHBvcnQgZGVmYXVsdCBydW5uZXJDb25maWc7XG4iLCJpbXBvcnQgcnVubmVyQ29uZmlnIGZyb20gXCIuL2NvbmZpZy11dGlsc1wiO1xuXG5mdW5jdGlvbiBsYW5nUmVxdWVzdCgpIHtcbiAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICBsZXQgeGhyID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG4gICAgY29uc3QgZnVsbFVybCA9IHJ1bm5lckNvbmZpZy51cmwgKyBydW5uZXJDb25maWcubGFuZ0VuZHBvaW50O1xuICAgIHhoci5vcGVuKFwiR0VUXCIsIGZ1bGxVcmwpO1xuICAgIHhoci5vbmxvYWQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICBpZiAodGhpcy5zdGF0dXMgPj0gMjAwICYmIHRoaXMuc3RhdHVzIDwgNDAwKSB7XG4gICAgICAgIHJlc29sdmUoeGhyLnJlc3BvbnNlKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJlamVjdCh7XG4gICAgICAgICAgc3RhdHVzOiB0aGlzLnN0YXR1cyxcbiAgICAgICAgICBzdGF0dXNUZXh0OiB4aHIuc3RhdHVzVGV4dCxcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfTtcbiAgICB4aHIub25lcnJvciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIHJlamVjdCh7XG4gICAgICAgIHN0YXR1czogdGhpcy5zdGF0dXMsXG4gICAgICAgIHN0YXR1c1RleHQ6IHhoci5zdGF0dXNUZXh0LFxuICAgICAgfSk7XG4gICAgfTtcbiAgICB4aHIuc2VuZCgpO1xuICB9KTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgbGFuZ1JlcXVlc3Q7XG4iLCJpbXBvcnQgXCJjb2RlbWlycm9yL2xpYi9jb2RlbWlycm9yLmNzc1wiO1xuaW1wb3J0IFwiY29kZW1pcnJvci90aGVtZS9tYXRlcmlhbC5jc3NcIjtcbmltcG9ydCBcImNvZGVtaXJyb3IvdGhlbWUvbmVhdC5jc3NcIjtcbmltcG9ydCBcImNvZGVtaXJyb3IvbW9kZS94bWwveG1sXCI7XG5pbXBvcnQgXCJjb2RlbWlycm9yL21vZGUvamF2YXNjcmlwdC9qYXZhc2NyaXB0XCI7XG5pbXBvcnQgXCJjb2RlbWlycm9yL21vZGUvcHl0aG9uL3B5dGhvblwiO1xuXG4vLyBvdGhlciB0aGVtZXNcbmltcG9ydCBcImNvZGVtaXJyb3IvdGhlbWUvMzAyNC1kYXkuY3NzXCI7XG5pbXBvcnQgXCJjb2RlbWlycm9yL3RoZW1lLzMwMjQtbmlnaHQuY3NzXCI7XG5pbXBvcnQgXCJjb2RlbWlycm9yL3RoZW1lL2JsYWNrYm9hcmQuY3NzXCI7XG5pbXBvcnQgXCJjb2RlbWlycm9yL3RoZW1lL2RhcmN1bGEuY3NzXCI7XG5pbXBvcnQgXCJjb2RlbWlycm9yL3RoZW1lL2RyYWN1bGEuY3NzXCI7XG5pbXBvcnQgXCJjb2RlbWlycm9yL3RoZW1lL2VjbGlwc2UuY3NzXCI7XG5pbXBvcnQgXCJjb2RlbWlycm9yL3RoZW1lL2VsZWdhbnQuY3NzXCI7XG5pbXBvcnQgXCJjb2RlbWlycm9yL3RoZW1lL2VybGFuZy1kYXJrLmNzc1wiO1xuaW1wb3J0IFwiY29kZW1pcnJvci90aGVtZS9pZGVhLmNzc1wiO1xuaW1wb3J0IFwiY29kZW1pcnJvci90aGVtZS9pc290b3BlLmNzc1wiO1xuaW1wb3J0IFwiY29kZW1pcnJvci90aGVtZS9taWRuaWdodC5jc3NcIjtcbmltcG9ydCBcImNvZGVtaXJyb3IvdGhlbWUvbHVjYXJpby5jc3NcIjtcbmltcG9ydCBcImNvZGVtaXJyb3IvdGhlbWUvbWF0ZXJpYWwuY3NzXCI7XG5pbXBvcnQgXCJjb2RlbWlycm9yL3RoZW1lL21vbm9rYWkuY3NzXCI7XG5pbXBvcnQgXCJjb2RlbWlycm9yL3RoZW1lL3NvbGFyaXplZC5jc3NcIjtcblxuaW1wb3J0IFwiLi4vc3R5bGUvbWFpbi5jc3NcIjtcbmltcG9ydCBydW5DYWxsIGZyb20gXCIuL3J1bi1yZXF1ZXN0XCI7XG5pbXBvcnQgY29kZU1pcnJvciBmcm9tIFwiLi9lZGl0b3JcIjtcbmltcG9ydCBsYW5nUmVxdWVzdCBmcm9tIFwiLi9sYW5ncy1yZXF1ZXN0XCI7XG5pbXBvcnQgcnVubmVyQ29uZmlnIGZyb20gXCIuL2NvbmZpZy11dGlsc1wiO1xuaW1wb3J0IHNldExhbmcgZnJvbSBcIi4vc2V0LWNvZGVcIjtcblxudmFyIGxhbmdzO1xuXG5jb2RlTWlycm9yLnNldFZhbHVlKFxuICAgICAgXCJkZWYgZmlib25hY2NpKG4pOlxcblxcdGlmIG48PTE6XFxuXFx0XFx0cmV0dXJuIG5cXG5cXHRlbHNlOlxcblxcdFxcdHJldHVybihmaWJvbmFjY2kobi0xKSArIGZpYm9uYWNjaShuLTIpKVxcblxcbm4gPSA1XFxuXFxuZmlib19zZXJpZXMgPSBbXVxcblxcbmZvciBpIGluIHJhbmdlKDAsbik6XFxuXFx0Zmlib19zZXJpZXMuYXBwZW5kKGZpYm9uYWNjaShpKSlcXG5cXG5wcmludCgnSGVsbG8sIFdvcmxkIGZyb20gUHl0aG9uISBIZXJlXFxcXCdzIHNvbWUgZmlib25hY2NpIG51bWJlcnM6JylcXG5wcmludChmaWJvX3NlcmllcylcIlxuKTtcblxubGFuZ1JlcXVlc3QoKVxuICAudGhlbihmdW5jdGlvbiAocmVzdWx0KSB7XG4gICAgdmFyIHJlcyA9IEpTT04ucGFyc2UocmVzdWx0KTtcbiAgICAvLyB1bmNvbW1lbnQgZm9yIHRlc3RpbmdcbiAgICAvLyB2YXIgcmVzID0geyBsYW5ndWFnZXM6IFtcInB5dGhvbjNcIiwgXCJub2RlXCIsIFwiYysrMTFcIiwgXCJnb1wiXSB9O1xuICAgIGxhbmdzID0gcmVzLmxhbmd1YWdlcztcbiAgfSlcbiAgLmNhdGNoKGZ1bmN0aW9uIChlcnIpIHtcbiAgICBsYW5ncyA9IFtcIkVycm9yIVwiXTtcbiAgICBjb25zb2xlLmxvZyhcIkVycm9yIHdoZW4gZmV0Y2hpbmcgbGFuZ3VhZ2VzOiBcIiArIGVycik7XG4gIH0pXG4gIC5maW5hbGx5KGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgbGFuZ19tZW51ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJsYW5nLXNlbGVjdFwiKTtcbiAgICBmb3IgKGNvbnN0IGxhbmcgb2YgbGFuZ3MpIHtcbiAgICAgIHZhciBjaGlsZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJvcHRpb25cIik7XG4gICAgICBjaGlsZC5pbm5lclRleHQgPSBsYW5nO1xuICAgICAgbGFuZ19tZW51LmFwcGVuZENoaWxkKGNoaWxkKTtcbiAgICB9XG4gICAgcnVubmVyQ29uZmlnLmdldFNlbGVjdGVkTGFuZ3VhZ2UoKTtcbiAgfSk7XG5cbmZ1bmN0aW9uIHNlbGVjdFRoZW1lKCkge1xuICBjb25zdCBzZWxlY3QgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInRoZW1lLXNlbGVjdFwiKTtcbiAgdmFyIHRoZW1lID0gc2VsZWN0Lm9wdGlvbnNbc2VsZWN0LnNlbGVjdGVkSW5kZXhdLnRleHRDb250ZW50O1xuICBjb2RlTWlycm9yLnNldE9wdGlvbihcInRoZW1lXCIsIHRoZW1lKTtcbn1cblxuY29uc3Qgc3VibWl0QnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzdWJtaXQtYnRuXCIpO1xuc3VibWl0QnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBydW5DYWxsKTtcblxuY29uc3Qgc2VsZWN0b3IgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInRoZW1lLXNlbGVjdFwiKTtcbnNlbGVjdG9yLmFkZEV2ZW50TGlzdGVuZXIoXCJjaGFuZ2VcIiwgc2VsZWN0VGhlbWUpO1xuXG5jb25zdCBsYW5nU2VsZWN0b3IgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImxhbmctc2VsZWN0XCIpO1xubGFuZ1NlbGVjdG9yLmFkZEV2ZW50TGlzdGVuZXIoXCJjaGFuZ2VcIiwgc2V0TGFuZyk7XG4iLCJpbXBvcnQgY29kZU1pcnJvciBmcm9tIFwiLi9lZGl0b3JcIjtcbmltcG9ydCBydW5uZXJDb25maWcgZnJvbSBcIi4vY29uZmlnLXV0aWxzXCI7XG5pbXBvcnQgXCJjb2RlbWlycm9yL2xpYi9jb2RlbWlycm9yLmNzc1wiO1xuXG5mdW5jdGlvbiBydW5SZXF1ZXN0KCkge1xuICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgdmFyIHJlcSA9IHtcbiAgICAgIHNvdXJjZTogY29kZU1pcnJvci5nZXRWYWx1ZSgpLFxuICAgICAgbGFuZ3VhZ2U6IHJ1bm5lckNvbmZpZy5nZXRTZWxlY3RlZExhbmd1YWdlKCksXG4gICAgfTtcbiAgICBsZXQgeGhyID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG4gICAgY29uc3QgZnVsbFVybCA9IHJ1bm5lckNvbmZpZy51cmwgKyBydW5uZXJDb25maWcucnVuRW5kcG9pbnQ7XG4gICAgeGhyLm9wZW4oXCJQT1NUXCIsIGZ1bGxVcmwpO1xuICAgIHhoci5zZXRSZXF1ZXN0SGVhZGVyKFwiQ29udGVudC1UeXBlXCIsIFwiYXBwbGljYXRpb24vanNvblwiKTtcbiAgICB4aHIub25sb2FkID0gZnVuY3Rpb24oKSB7XG4gICAgICBpZiAodGhpcy5zdGF0dXMgPj0gMjAwICYmIHRoaXMuc3RhdHVzIDwgNDAwKSB7XG4gICAgICAgIHJlc29sdmUoeGhyLnJlc3BvbnNlKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJlamVjdCh7XG4gICAgICAgICAgc3RhdHVzOiB0aGlzLnN0YXR1cyxcbiAgICAgICAgICBzdGF0dXNUZXh0OiB4aHIuc3RhdHVzVGV4dCxcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfTtcbiAgICB4aHIub25lcnJvciA9IGZ1bmN0aW9uKCkge1xuICAgICAgcmVqZWN0KHtcbiAgICAgICAgc3RhdHVzOiB0aGlzLnN0YXR1cyxcbiAgICAgICAgc3RhdHVzVGV4dDogeGhyLnN0YXR1c1RleHQsXG4gICAgICB9KTtcbiAgICB9O1xuICAgIHhoci5zZW5kKEpTT04uc3RyaW5naWZ5KHJlcSkpO1xuICB9KTtcbn1cblxuZnVuY3Rpb24gc3RyaW5naWZ5KG9iaikge1xuICBjb25zdCBTRVAgPSBcIiwgXCI7XG4gIGNvbnN0IEVNUFRZX1RFWFQgPSBcIm5vbmVcIjtcblxuICBpZiAob2JqID09PSBudWxsKSByZXR1cm4gRU1QVFlfVEVYVDtcblxuICBsZXQgaW5uZXIgPSBcIlwiO1xuICBjb25zdCBrZXlzID0gT2JqZWN0LmtleXMob2JqKTtcbiAga2V5cy5mb3JFYWNoKChrZXksIGkpID0+IHtcbiAgICBpZiAob2JqW2tleV0gPT09IG51bGwpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpbm5lciArPSBrZXkgKyBcIjogXCIgKyBTdHJpbmcob2JqW2tleV0pO1xuXG4gICAgaWYgKGkgPCBrZXlzLmxlbmd0aCAtIDEpIGlubmVyICs9IFNFUDtcbiAgfSk7XG5cbiAgaWYgKGlubmVyID09IFwiXCIpIGlubmVyID0gRU1QVFlfVEVYVDtcblxuICByZXR1cm4gaW5uZXI7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIHJ1bkNhbGwoKSB7XG4gIGxldCBzdGRvdXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInN0ZG91dC1maWVsZFwiKTtcbiAgbGV0IHN0ZGVyciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic3RkZXJyLWZpZWxkXCIpO1xuICBsZXQgZXJyb3IgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImVyci1maWVsZFwiKTtcblxuXG4gIGF3YWl0IHJ1blJlcXVlc3QoKVxuICAgIC50aGVuKGZ1bmN0aW9uKHJlc3VsdCkge1xuICAgICAgbGV0IG91dCA9IEpTT04ucGFyc2UocmVzdWx0KTtcblxuICAgICAgb3V0W1wiZXJyb3JcIl0gPSBzdHJpbmdpZnkob3V0W1wiZXJyb3JcIl0pO1xuXG4gICAgICBzdGRvdXQuaW5uZXJIVE1MID1cbiAgICAgICAgXCJTdGRvdXQ6IFwiICsgb3V0W1wic3Rkb3V0XCJdLnJlcGxhY2UoL1xcbi9nLCBcIjxicj5cIik7XG4gICAgICBzdGRvdXQucmVtb3ZlQXR0cmlidXRlKFwiaGlkZGVuXCIpO1xuXG4gICAgICBzdGRlcnIuaW5uZXJIVE1MID1cbiAgICAgICAgXCJTdGRlcnI6IFwiICsgb3V0W1wic3RkZXJyXCJdO1xuICAgICAgc3RkZXJyLnJlbW92ZUF0dHJpYnV0ZShcImhpZGRlblwiKTtcblxuICAgICAgZXJyb3IuaW5uZXJIVE1MID0gXCJFcnJvcjogXCIgKyBvdXRbXCJlcnJvclwiXTtcbiAgICB9KVxuICAgIC5jYXRjaChmdW5jdGlvbihlcnIpIHtcbiAgICAgIGNvbnNvbGUubG9nKGVycik7XG4gICAgICBzdGRvdXQuc2V0QXR0cmlidXRlKFwiaGlkZGVuXCIsIHRydWUpO1xuICAgICAgc3RkZXJyLnNldEF0dHJpYnV0ZShcImhpZGRlblwiLCB0cnVlKTtcbiAgICAgIGVycm9yLmlubmVySFRNTCA9IFwiRXJyb3I6IFwiICsgc3RyaW5naWZ5KGVycik7XG4gICAgfSk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IHJ1bkNhbGw7XG4iLCJpbXBvcnQgY29kZU1pcnJvciBmcm9tIFwiLi9lZGl0b3JcIjtcblxuZnVuY3Rpb24gc2V0TGFuZygpIHtcbiAgY29uc3Qgc2VsZWN0b3IgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImxhbmctc2VsZWN0XCIpO1xuICBjb25zdCBsYW5nID0gc2VsZWN0b3Iub3B0aW9uc1tzZWxlY3Rvci5zZWxlY3RlZEluZGV4XS5pbm5lclRleHQ7XG4gIGlmIChsYW5nID09PSBcInB5dGhvbjNcIiB8fCBsYW5nID09PSBcInB5dGhvblwiKSB7XG4gICAgY29kZU1pcnJvci5zZXRWYWx1ZShcbiAgICAgIFwiZGVmIGZpYm9uYWNjaShuKTpcXG5cXHRpZiBuPD0xOlxcblxcdFxcdHJldHVybiBuXFxuXFx0ZWxzZTpcXG5cXHRcXHRyZXR1cm4oZmlib25hY2NpKG4tMSkgKyBmaWJvbmFjY2kobi0yKSlcXG5cXG5uID0gNVxcblxcbmZpYm9fc2VyaWVzID0gW11cXG5cXG5mb3IgaSBpbiByYW5nZSgwLG4pOlxcblxcdGZpYm9fc2VyaWVzLmFwcGVuZChmaWJvbmFjY2koaSkpXFxuXFxucHJpbnQoJ0hlbGxvLCBXb3JsZCBmcm9tIFB5dGhvbiEgSGVyZVxcXFwncyBzb21lIGZpYm9uYWNjaSBudW1iZXJzOicpXFxucHJpbnQoZmlib19zZXJpZXMpXCJcbiAgICApO1xuICB9IGVsc2UgaWYgKFxuICAgIGxhbmcgPT09IFwibm9kZVwiIHx8XG4gICAgbGFuZyA9PT0gXCJub2RlanNcIiB8fFxuICAgIGxhbmcgPT09IFwianNcIiB8fFxuICAgIGxhbmcgPT09IFwiamF2YXNjcmlwdFwiXG4gICkge1xuICAgIGNvZGVNaXJyb3Iuc2V0VmFsdWUoJ2NvbnN0IHsgZXhlYyB9ID0gcmVxdWlyZShcImNoaWxkX3Byb2Nlc3NcIik7XFxuXFxuY29uc29sZS5sb2coXCJIZWxsbyB3b3JsZCBmcm9tIE5vZGUuanMhIE15IHVwdGltZSBpczpcIik7XFxuXFxuZXhlYyhcInVwdGltZVwiLCAoZXJyb3IsIHN0ZG91dCwgc3RkZXJyKSA9PiB7XFxuXFx0aWYgKGVycm9yKSB7XFxuXFx0XFx0Y29uc29sZS5sb2coYGVycm9yOiAke2Vycm9yLm1lc3NhZ2V9YCk7XFxuXFx0XFx0cmV0dXJuO1xcbn1cXG5cXHRpZiAoc3RkZXJyKSB7XFxuXFx0XFx0Y29uc29sZS5sb2coYHN0ZGVycjogJHtzdGRlcnJ9YCk7XFxuXFx0XFx0cmV0dXJuO1xcblxcdH1cXG5cXHRcXHRjb25zb2xlLmxvZyhgc3Rkb3V0OiAke3N0ZG91dH1gKTtcXG59KTsnKTtcbiAgfSBlbHNlIGlmIChsYW5nID09PSBcImMrK1wiIHx8IGxhbmcgPT09IFwiY3BwXCIgfHwgbGFuZyA9PT0gXCJjKysxMVwiKSB7XG4gICAgY29kZU1pcnJvci5zZXRWYWx1ZShcbiAgICAgIGAjaW5jbHVkZTxpb3N0cmVhbT5cbiNpbmNsdWRlPHRocmVhZD5cbmludCBtYWluKCkge1xuXHR1bnNpZ25lZCBpbnQgbnRocmVhZHMgPSBzdGQ6OnRocmVhZDo6aGFyZHdhcmVfY29uY3VycmVuY3koKTtcblx0c3RkOjpjb3V0IDw8IFwiaGVsbG8gd29ybGQgZnJvbSBDKyshXCIgPDwgc3RkOjplbmRsO1xuXHRzdGQ6OmNlcnIgPDwgXCJJIGhhdmUgXCIgPDwgbnRocmVhZHMgPDwgXCIgdGhyZWFkcyFcIiA8PCBzdGQ6OmVuZGw7XG5cdHJldHVybiAwO1xufWBcbiAgICApO1xuICB9IGVsc2UgaWYgKGxhbmcgPT09IFwiZ29cIiB8fCBsYW5nID09PSBcImdvbGFuZ1wiKSB7XG4gICAgY29kZU1pcnJvci5zZXRWYWx1ZShcbiAgICAgIGBwYWNrYWdlIG1haW5cbmltcG9ydCBcImZtdFwiXG5mdW5jIG1haW4oKSB7XG4gICAgZm10LlByaW50bG4oXCJoZWxsbyB3b3JsZCBmcm9tIEdvIVwiKVxufWBcbiAgICApO1xuICB9IGVsc2UgaWYgKGxhbmcgPT09IFwiYmFzaFwiIHx8IGxhbmdlID09PSBcInNoXCIpIHtcbiAgICBjb2RlTWlycm9yLnNldFZhbHVlKFxuICAgICAgYFxuIyBGdW5jdGlvbiB0byBwcmludCBGaWJvbmFjY2kgU2VxdWVuY2VcbmZ1bmN0aW9uIHByaW50X2ZpYm9uYWNjaSgpIHtcbiAgICBudW09JDFcbiAgICBhPTBcbiAgICBiPTFcbiAgICBlY2hvIFwiVGhlIEZpYm9uYWNjaSBzZXF1ZW5jZSBmb3IgJG51bSB0ZXJtcyBpczogXCJcblxuICAgIGZvciAoKCBpPTA7IGk8bnVtOyBpKysgKSlcbiAgICBkb1xuICAgICAgICBlY2hvIC1uIFwiJGEgXCJcbiAgICAgICAgZm49JCgoYSArIGIpKVxuICAgICAgICBhPSRiXG4gICAgICAgIGI9JGZuXG4gICAgZG9uZVxufVxuXG5wcmludF9maWJvbmFjY2kgNVxuXHRcdFx0YFxuICAgICk7XG4gIH0gZWxzZSB7XG4gICAgY29kZU1pcnJvci5zZXRWYWx1ZShcbiAgICAgIFwiZGVmIGZpYm9uYWNjaShuKTpcXG5cXHRpZiBuPD0xOlxcblxcdFxcdHJldHVybiBuXFxuXFx0ZWxzZTpcXG5cXHRcXHRyZXR1cm4oZmlib25hY2NpKG4tMSkgKyBmaWJvbmFjY2kobi0yKSlcXG5cXG5uID0gNVxcblxcbmZpYm9fc2VyaWVzID0gW11cXG5cXG5mb3IgaSBpbiByYW5nZSgwLG4pOlxcblxcdGZpYm9fc2VyaWVzLmFwcGVuZChmaWJvbmFjY2koaSkpXFxuXFxucHJpbnQoJ0hlbGxvLCBXb3JsZCBmcm9tIFB5dGhvbiEgSGVyZVxcXFwncyBzb21lIGZpYm9uYWNjaSBudW1iZXJzOicpXFxucHJpbnQoZmlib19zZXJpZXMpXCJcbiAgICApO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IHNldExhbmc7XG4iLCIvLyBJbXBvcnRzXG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyBmcm9tIFwiLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL3NvdXJjZU1hcHMuanNcIjtcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18gZnJvbSBcIi4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanNcIjtcbnZhciBfX19DU1NfTE9BREVSX0VYUE9SVF9fXyA9IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fKTtcbl9fX0NTU19MT0FERVJfRVhQT1JUX19fLnB1c2goW21vZHVsZS5pZCwgXCJAaW1wb3J0IHVybChodHRwczovL2ZvbnRzLmdvb2dsZWFwaXMuY29tL2NzczI/ZmFtaWx5PVF1aWNrc2FuZDp3Z2h0QDMwMDs0MDAmZGlzcGxheT1zd2FwKTtcIl0pO1xuX19fQ1NTX0xPQURFUl9FWFBPUlRfX18ucHVzaChbbW9kdWxlLmlkLCBcIkBpbXBvcnQgdXJsKGh0dHBzOi8vZm9udHMuZ29vZ2xlYXBpcy5jb20vY3NzMj9mYW1pbHk9SUJNK1BsZXgrTW9ubyZkaXNwbGF5PXN3YXApO1wiXSk7XG5fX19DU1NfTE9BREVSX0VYUE9SVF9fXy5wdXNoKFttb2R1bGUuaWQsIFwiQGltcG9ydCB1cmwoaHR0cHM6Ly9mb250cy5nb29nbGVhcGlzLmNvbS9jc3MyP2ZhbWlseT1Xb3JrK1NhbnMmZGlzcGxheT1zd2FwKTtcIl0pO1xuLy8gTW9kdWxlXG5fX19DU1NfTE9BREVSX0VYUE9SVF9fXy5wdXNoKFttb2R1bGUuaWQsIFwiLyogRGFyayBtb2RlICovXFxuQG1lZGlhIChwcmVmZXJzLWNvbG9yLXNjaGVtZTogZGFyaykge1xcbiAgICBib2R5IHtcXG4gICAgICAgIGJhY2tncm91bmQ6ICMxODE4MTg7XFxuICAgICAgICBjb2xvcjogI2Q4ZDhkODtcXG4gICAgfVxcblxcbiAgICBhIHtcXG4gICAgICAgIGNvbG9yOiAjQ0Y5RkZGO1xcbiAgICB9XFxuXFxuICAgIC5maWVsZCB7XFxuICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjMjgyODI4O1xcbiAgICAgICAgY29sb3I6ICNkOGQ4ZDg7XFxuICAgIH1cXG59XFxuXFxuXFxuXFxuLyogTGlnaHQgbW9kZSAqL1xcbkBtZWRpYSAocHJlZmVycy1jb2xvci1zY2hlbWU6IGxpZ2h0KSB7XFxuICAgIGJvZHkge1xcbiAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogI2Y1ZjVmNTtcXG4gICAgICAgIGNvbG9yOiAjMjgyODI4O1xcbiAgICB9XFxuXFxuICAgIGEge1xcbiAgICAgICAgY29sb3I6ICM0MDAwODA7XFxuICAgIH1cXG5cXG4gICAgLmZpZWxkIHtcXG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6ICNkOGQ4ZDg7XFxuICAgICAgICBjb2xvcjojMjgyODI4O1xcbiAgICB9XFxufVxcblxcbi5Db2RlTWlycm9yIHtcXG4gICAgbWFyZ2luOiBhdXRvO1xcbiAgICBoZWlnaHQ6IDQ1MHB4O1xcbiAgICBmb250LXNpemU6IDE1cHg7XFxuICAgIHRleHQtYWxpZ246IGxlZnQ7XFxuICAgIHRleHQtc2hhZG93OiBub25lO1xcbn1cXG5cXG5idXR0b24ge1xcbiAgICBmb250LXN0eWxlOiBcXFwiSUJNIFBsZXggTW9ub1xcXCIsIG1vbm9zcGFjZTtcXG4gICAgcGFkZGluZzogNHB4O1xcbiAgICBtYXJnaW4tdG9wOiA1cHg7XFxufVxcblxcbi5zZWxlY3RvcnMge1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XFxufVxcblxcbnNlbGVjdCB7XFxuICAgIGZvbnQtZmFtaWx5OiBtb25vc3BhY2U7XFxuICAgIGZvbnQ6IFxcXCJJQk0gUGxleCBNb25vXFxcIjtcXG59XFxuXFxuI3dyYXBwZXIge1xcbiAgICBtYXJnaW4tdG9wOiAzJTtcXG4gICAgd2lkdGg6IDUwJTtcXG59XFxuXFxuXFxuYm9keSB7XFxuICAgIGZvbnQtZmFtaWx5OiBcXFwiSUJNIFBsZXggTW9ub1xcXCIsIG1vbm9zcGFjZTtcXG4gICAgdGV4dC1yZW5kZXJpbmc6IG9wdGltaXplTGVnaWJpbGl0eTtcXG4gICAgLyogbGluZS1oZWlnaHQ6IDEuNTsgKi9cXG4gICAgLyogbWFyZ2luOiAxcmVtIDFyZW07ICovXFxufVxcblxcbmh0bWwge1xcbiAgICBtYXJnaW4tbGVmdDogY2FsYygxMDB2dyAtIDEwMCUpO1xcbn1cXG5cXG5hOnZpc2l0ZWQge1xcbiAgICBjb2xvcjogZ3JheTtcXG4gICAgZm9udC13ZWlnaHQ6IGJvbGQ7XFxufVxcblxcbmZvb3RlciB7XFxuICAgIGZvbnQtc2l6ZTogMTRweDtcXG4gICAgcGFkZGluZzogMjBweDtcXG4gICAgbWFyZ2luLWxlZnQ6IDMwJTtcXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG59XFxuXFxuLm91dHB1dCB7XFxuICAgIHdpZHRoOiA3MCU7XFxuICAgIG1hcmdpbi10b3A6IDEwcHg7XFxufVxcblxcbi5maWVsZCB7XFxuICAgIGJvcmRlci1yYWRpdXM6IDEwcHg7XFxuICAgIC1tb3otYm9yZGVyLXJhZGl1czogMTBweDtcXG4gICAgbWFyZ2luOiBhdXRvO1xcbiAgICB0ZXh0LWFsaWduOiBsZWZ0O1xcbiAgICBwYWRkaW5nOiA1cHg7XFxuICAgIGZvbnQtc2l6ZTogMTRweDtcXG59XFxuXFxuLmJveCB7XFxuICAgIHdpZHRoOiA5MCU7XFxufVxcblxcbiN3cmFwcGVyIHtcXG4gICAgd2lkdGg6IDUwJTtcXG4gICAgbWFyZ2luLWxlZnQ6IDI1JTtcXG59XCIsIFwiXCIse1widmVyc2lvblwiOjMsXCJzb3VyY2VzXCI6W1wid2VicGFjazovLy4vc3R5bGUvbWFpbi5jc3NcIl0sXCJuYW1lc1wiOltdLFwibWFwcGluZ3NcIjpcIkFBS0EsY0FBYztBQUNkO0lBQ0k7UUFDSSxtQkFBbUI7UUFDbkIsY0FBYztJQUNsQjs7SUFFQTtRQUNJLGNBQWM7SUFDbEI7O0lBRUE7UUFDSSx5QkFBeUI7UUFDekIsY0FBYztJQUNsQjtBQUNKOzs7O0FBSUEsZUFBZTtBQUNmO0lBQ0k7UUFDSSx5QkFBeUI7UUFDekIsY0FBYztJQUNsQjs7SUFFQTtRQUNJLGNBQWM7SUFDbEI7O0lBRUE7UUFDSSx5QkFBeUI7UUFDekIsYUFBYTtJQUNqQjtBQUNKOztBQUVBO0lBQ0ksWUFBWTtJQUNaLGFBQWE7SUFDYixlQUFlO0lBQ2YsZ0JBQWdCO0lBQ2hCLGlCQUFpQjtBQUNyQjs7QUFFQTtJQUNJLHNDQUFzQztJQUN0QyxZQUFZO0lBQ1osZUFBZTtBQUNuQjs7QUFFQTtJQUNJLGFBQWE7SUFDYiw4QkFBOEI7QUFDbEM7O0FBRUE7SUFDSSxzQkFBc0I7SUFDdEIscUJBQXFCO0FBQ3pCOztBQUVBO0lBQ0ksY0FBYztJQUNkLFVBQVU7QUFDZDs7O0FBR0E7SUFDSSx1Q0FBdUM7SUFDdkMsa0NBQWtDO0lBQ2xDLHNCQUFzQjtJQUN0Qix1QkFBdUI7QUFDM0I7O0FBRUE7SUFDSSwrQkFBK0I7QUFDbkM7O0FBRUE7SUFDSSxXQUFXO0lBQ1gsaUJBQWlCO0FBQ3JCOztBQUVBO0lBQ0ksZUFBZTtJQUNmLGFBQWE7SUFDYixnQkFBZ0I7SUFDaEIsbUJBQW1CO0FBQ3ZCOztBQUVBO0lBQ0ksVUFBVTtJQUNWLGdCQUFnQjtBQUNwQjs7QUFFQTtJQUNJLG1CQUFtQjtJQUNuQix3QkFBd0I7SUFDeEIsWUFBWTtJQUNaLGdCQUFnQjtJQUNoQixZQUFZO0lBQ1osZUFBZTtBQUNuQjs7QUFFQTtJQUNJLFVBQVU7QUFDZDs7QUFFQTtJQUNJLFVBQVU7SUFDVixnQkFBZ0I7QUFDcEJcIixcInNvdXJjZXNDb250ZW50XCI6W1wiQGltcG9ydCB1cmwoXFxcImh0dHBzOi8vZm9udHMuZ29vZ2xlYXBpcy5jb20vY3NzMj9mYW1pbHk9UXVpY2tzYW5kOndnaHRAMzAwOzQwMCZkaXNwbGF5PXN3YXBcXFwiKTtcXG5AaW1wb3J0IHVybCgnaHR0cHM6Ly9mb250cy5nb29nbGVhcGlzLmNvbS9jc3MyP2ZhbWlseT1JQk0rUGxleCtNb25vJmRpc3BsYXk9c3dhcCcpO1xcblxcbkBpbXBvcnQgdXJsKFxcXCJodHRwczovL2ZvbnRzLmdvb2dsZWFwaXMuY29tL2NzczI/ZmFtaWx5PVdvcmsrU2FucyZkaXNwbGF5PXN3YXBcXFwiKTtcXG5cXG4vKiBEYXJrIG1vZGUgKi9cXG5AbWVkaWEgKHByZWZlcnMtY29sb3Itc2NoZW1lOiBkYXJrKSB7XFxuICAgIGJvZHkge1xcbiAgICAgICAgYmFja2dyb3VuZDogIzE4MTgxODtcXG4gICAgICAgIGNvbG9yOiAjZDhkOGQ4O1xcbiAgICB9XFxuXFxuICAgIGEge1xcbiAgICAgICAgY29sb3I6ICNDRjlGRkY7XFxuICAgIH1cXG5cXG4gICAgLmZpZWxkIHtcXG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6ICMyODI4Mjg7XFxuICAgICAgICBjb2xvcjogI2Q4ZDhkODtcXG4gICAgfVxcbn1cXG5cXG5cXG5cXG4vKiBMaWdodCBtb2RlICovXFxuQG1lZGlhIChwcmVmZXJzLWNvbG9yLXNjaGVtZTogbGlnaHQpIHtcXG4gICAgYm9keSB7XFxuICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZjVmNWY1O1xcbiAgICAgICAgY29sb3I6ICMyODI4Mjg7XFxuICAgIH1cXG5cXG4gICAgYSB7XFxuICAgICAgICBjb2xvcjogIzQwMDA4MDtcXG4gICAgfVxcblxcbiAgICAuZmllbGQge1xcbiAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogI2Q4ZDhkODtcXG4gICAgICAgIGNvbG9yOiMyODI4Mjg7XFxuICAgIH1cXG59XFxuXFxuLkNvZGVNaXJyb3Ige1xcbiAgICBtYXJnaW46IGF1dG87XFxuICAgIGhlaWdodDogNDUwcHg7XFxuICAgIGZvbnQtc2l6ZTogMTVweDtcXG4gICAgdGV4dC1hbGlnbjogbGVmdDtcXG4gICAgdGV4dC1zaGFkb3c6IG5vbmU7XFxufVxcblxcbmJ1dHRvbiB7XFxuICAgIGZvbnQtc3R5bGU6IFxcXCJJQk0gUGxleCBNb25vXFxcIiwgbW9ub3NwYWNlO1xcbiAgICBwYWRkaW5nOiA0cHg7XFxuICAgIG1hcmdpbi10b3A6IDVweDtcXG59XFxuXFxuLnNlbGVjdG9ycyB7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcXG59XFxuXFxuc2VsZWN0IHtcXG4gICAgZm9udC1mYW1pbHk6IG1vbm9zcGFjZTtcXG4gICAgZm9udDogXFxcIklCTSBQbGV4IE1vbm9cXFwiO1xcbn1cXG5cXG4jd3JhcHBlciB7XFxuICAgIG1hcmdpbi10b3A6IDMlO1xcbiAgICB3aWR0aDogNTAlO1xcbn1cXG5cXG5cXG5ib2R5IHtcXG4gICAgZm9udC1mYW1pbHk6IFxcXCJJQk0gUGxleCBNb25vXFxcIiwgbW9ub3NwYWNlO1xcbiAgICB0ZXh0LXJlbmRlcmluZzogb3B0aW1pemVMZWdpYmlsaXR5O1xcbiAgICAvKiBsaW5lLWhlaWdodDogMS41OyAqL1xcbiAgICAvKiBtYXJnaW46IDFyZW0gMXJlbTsgKi9cXG59XFxuXFxuaHRtbCB7XFxuICAgIG1hcmdpbi1sZWZ0OiBjYWxjKDEwMHZ3IC0gMTAwJSk7XFxufVxcblxcbmE6dmlzaXRlZCB7XFxuICAgIGNvbG9yOiBncmF5O1xcbiAgICBmb250LXdlaWdodDogYm9sZDtcXG59XFxuXFxuZm9vdGVyIHtcXG4gICAgZm9udC1zaXplOiAxNHB4O1xcbiAgICBwYWRkaW5nOiAyMHB4O1xcbiAgICBtYXJnaW4tbGVmdDogMzAlO1xcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcbn1cXG5cXG4ub3V0cHV0IHtcXG4gICAgd2lkdGg6IDcwJTtcXG4gICAgbWFyZ2luLXRvcDogMTBweDtcXG59XFxuXFxuLmZpZWxkIHtcXG4gICAgYm9yZGVyLXJhZGl1czogMTBweDtcXG4gICAgLW1vei1ib3JkZXItcmFkaXVzOiAxMHB4O1xcbiAgICBtYXJnaW46IGF1dG87XFxuICAgIHRleHQtYWxpZ246IGxlZnQ7XFxuICAgIHBhZGRpbmc6IDVweDtcXG4gICAgZm9udC1zaXplOiAxNHB4O1xcbn1cXG5cXG4uYm94IHtcXG4gICAgd2lkdGg6IDkwJTtcXG59XFxuXFxuI3dyYXBwZXIge1xcbiAgICB3aWR0aDogNTAlO1xcbiAgICBtYXJnaW4tbGVmdDogMjUlO1xcbn1cIl0sXCJzb3VyY2VSb290XCI6XCJcIn1dKTtcbi8vIEV4cG9ydHNcbmV4cG9ydCBkZWZhdWx0IF9fX0NTU19MT0FERVJfRVhQT1JUX19fO1xuIiwiXG4gICAgICBpbXBvcnQgQVBJIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5qZWN0U3R5bGVzSW50b1N0eWxlVGFnLmpzXCI7XG4gICAgICBpbXBvcnQgZG9tQVBJIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVEb21BUEkuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRGbiBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydEJ5U2VsZWN0b3IuanNcIjtcbiAgICAgIGltcG9ydCBzZXRBdHRyaWJ1dGVzIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0U3R5bGVFbGVtZW50IGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0U3R5bGVFbGVtZW50LmpzXCI7XG4gICAgICBpbXBvcnQgc3R5bGVUYWdUcmFuc2Zvcm1GbiBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlVGFnVHJhbnNmb3JtLmpzXCI7XG4gICAgICBpbXBvcnQgY29udGVudCwgKiBhcyBuYW1lZEV4cG9ydCBmcm9tIFwiISEuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL21haW4uY3NzXCI7XG4gICAgICBcbiAgICAgIFxuXG52YXIgb3B0aW9ucyA9IHt9O1xuXG5vcHRpb25zLnN0eWxlVGFnVHJhbnNmb3JtID0gc3R5bGVUYWdUcmFuc2Zvcm1Gbjtcbm9wdGlvbnMuc2V0QXR0cmlidXRlcyA9IHNldEF0dHJpYnV0ZXM7XG5cbiAgICAgIG9wdGlvbnMuaW5zZXJ0ID0gaW5zZXJ0Rm4uYmluZChudWxsLCBcImhlYWRcIik7XG4gICAgXG5vcHRpb25zLmRvbUFQSSA9IGRvbUFQSTtcbm9wdGlvbnMuaW5zZXJ0U3R5bGVFbGVtZW50ID0gaW5zZXJ0U3R5bGVFbGVtZW50O1xuXG52YXIgdXBkYXRlID0gQVBJKGNvbnRlbnQsIG9wdGlvbnMpO1xuXG5cblxuZXhwb3J0ICogZnJvbSBcIiEhLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9tYWluLmNzc1wiO1xuICAgICAgIGV4cG9ydCBkZWZhdWx0IGNvbnRlbnQgJiYgY29udGVudC5sb2NhbHMgPyBjb250ZW50LmxvY2FscyA6IHVuZGVmaW5lZDtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==