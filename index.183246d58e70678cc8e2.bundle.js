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
    console.log("FULL URL LANG: ", fullUrl);
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
  return new Promise(function (resolve, reject) {
    var req = {
      source: _editor__WEBPACK_IMPORTED_MODULE_0__["default"].getValue(),
      language: _config_utils__WEBPACK_IMPORTED_MODULE_1__["default"].getSelectedLanguage(),
    };
    let xhr = new XMLHttpRequest();
    const fullUrl = _config_utils__WEBPACK_IMPORTED_MODULE_1__["default"].url + _config_utils__WEBPACK_IMPORTED_MODULE_1__["default"].runEndpoint;
    xhr.open("POST", fullUrl);
    xhr.setRequestHeader("Content-Type", "application/json");
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
    xhr.send(JSON.stringify(req));
  });
}

async function runCall() {
  await runRequest()
    .then(function (result) {
      let out = JSON.parse(result);
      document.getElementById("stdout-field").innerHTML =
        "Stdout: " + out["stdout"].replace(/\n/g, "<br>");
      document.getElementById("stderr-field").innerHTML =
        "Stderr: " + out["stderr"];
      document.getElementById("err-field").innerHTML = "Error: " + out["error"];
    })
    .catch(function (err) {
      console.log(err);
      document.getElementById("output-field").textContent = "Error: " + err;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguMTgzMjQ2ZDU4ZTcwNjc4Y2M4ZTIuYnVuZGxlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGlFQUFlLFlBQVksRUFBQzs7Ozs7Ozs7Ozs7Ozs7OztBQ2RjOztBQUUxQztBQUNBO0FBQ0E7QUFDQSxvQkFBb0IseURBQWdCLEdBQUcsa0VBQXlCO0FBQ2hFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0EsR0FBRztBQUNIOztBQUVBLGlFQUFlLFdBQVcsRUFBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUM1Qlk7QUFDQTtBQUNKO0FBQ0Y7QUFDYztBQUNSOztBQUV2QztBQUN1QztBQUNFO0FBQ0E7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNJO0FBQ1A7QUFDRztBQUNDO0FBQ0Q7QUFDQztBQUNEO0FBQ0U7O0FBRWI7QUFDUztBQUNGO0FBQ1E7QUFDQTtBQUNUOztBQUVqQzs7QUFFQSx5REFBbUI7QUFDbkI7QUFDQTs7QUFFQSwyREFBVztBQUNYO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQjtBQUNuQjtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJLDBFQUFnQztBQUNwQyxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBLEVBQUUsMERBQW9CO0FBQ3RCOztBQUVBO0FBQ0Esb0NBQW9DLHFEQUFPOztBQUUzQztBQUNBOztBQUVBO0FBQ0Esd0NBQXdDLGtEQUFPOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUN2RWI7QUFDUTtBQUNIOztBQUV2QztBQUNBO0FBQ0E7QUFDQSxjQUFj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QiwrRkFBTTtBQUN2Qiw2QkFBNkIsc0dBQWtCOztBQUUvQyxhQUFhLDBHQUFHLENBQUMscUZBQU87Ozs7QUFJNEM7QUFDcEUsT0FBTyxpRUFBZSxxRkFBTyxJQUFJLDRGQUFjLEdBQUcsNEZBQWMsWUFBWSxFQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vcnVubmVyLXdlYi1mcm9udGVuZC8uL2pzL2NvbmZpZy11dGlscy5qcyIsIndlYnBhY2s6Ly9ydW5uZXItd2ViLWZyb250ZW5kLy4vanMvbGFuZ3MtcmVxdWVzdC5qcyIsIndlYnBhY2s6Ly9ydW5uZXItd2ViLWZyb250ZW5kLy4vanMvbG9hZC5qcyIsIndlYnBhY2s6Ly9ydW5uZXItd2ViLWZyb250ZW5kLy4vanMvcnVuLXJlcXVlc3QuanMiLCJ3ZWJwYWNrOi8vcnVubmVyLXdlYi1mcm9udGVuZC8uL2pzL3NldC1jb2RlLmpzIiwid2VicGFjazovL3J1bm5lci13ZWItZnJvbnRlbmQvLi9zdHlsZS9tYWluLmNzcyIsIndlYnBhY2s6Ly9ydW5uZXItd2ViLWZyb250ZW5kLy4vc3R5bGUvbWFpbi5jc3M/N2Y1NCJdLCJzb3VyY2VzQ29udGVudCI6WyJmdW5jdGlvbiBnZXRTZWxlY3RlZExhbmd1YWdlKCkge1xuICBjb25zdCBzZWxlY3RvciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibGFuZy1zZWxlY3RcIik7XG4gIHJldHVybiBzZWxlY3Rvci5vcHRpb25zW3NlbGVjdG9yLnNlbGVjdGVkSW5kZXhdLmlubmVyVGV4dDtcbn1cblxuY29uc3QgcnVubmVyQ29uZmlnID0ge1xuICBnZXRTZWxlY3RlZExhbmd1YWdlOiBnZXRTZWxlY3RlZExhbmd1YWdlLFxuICB1cmw6IFwiaHR0cHM6Ly9ydW5uZXIuZmx5LmRldi9hcGkvdjEvXCIsXG4gIHJ1bkVuZHBvaW50OiBcInJ1blwiLFxuICBsYW5nRW5kcG9pbnQ6IFwibGFuZ3VhZ2VzXCIsXG59O1xuXG4vLyBvbmx5IHNpbmdsZSBleHBvcnQgcGVyIC5qcyBmaWxlIGFsbG93ZWRcbi8vIGV4cG9ydGluZyB0aGlzIHNpbmNlIHdlIHdpbGwgbmVlZCBpdCB0byByZXRyaWV2ZSB0aGUgY3VycmVudCBsYW5ndWFnZSBmcm9tIHRoZSBkb2N1bWVudC9ET01cbmV4cG9ydCBkZWZhdWx0IHJ1bm5lckNvbmZpZztcbiIsImltcG9ydCBydW5uZXJDb25maWcgZnJvbSBcIi4vY29uZmlnLXV0aWxzXCI7XG5cbmZ1bmN0aW9uIGxhbmdSZXF1ZXN0KCkge1xuICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgIGxldCB4aHIgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcbiAgICBjb25zdCBmdWxsVXJsID0gcnVubmVyQ29uZmlnLnVybCArIHJ1bm5lckNvbmZpZy5sYW5nRW5kcG9pbnQ7XG4gICAgY29uc29sZS5sb2coXCJGVUxMIFVSTCBMQU5HOiBcIiwgZnVsbFVybCk7XG4gICAgeGhyLm9wZW4oXCJHRVRcIiwgZnVsbFVybCk7XG4gICAgeGhyLm9ubG9hZCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIGlmICh0aGlzLnN0YXR1cyA+PSAyMDAgJiYgdGhpcy5zdGF0dXMgPCA0MDApIHtcbiAgICAgICAgcmVzb2x2ZSh4aHIucmVzcG9uc2UpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmVqZWN0KHtcbiAgICAgICAgICBzdGF0dXM6IHRoaXMuc3RhdHVzLFxuICAgICAgICAgIHN0YXR1c1RleHQ6IHhoci5zdGF0dXNUZXh0LFxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9O1xuICAgIHhoci5vbmVycm9yID0gZnVuY3Rpb24gKCkge1xuICAgICAgcmVqZWN0KHtcbiAgICAgICAgc3RhdHVzOiB0aGlzLnN0YXR1cyxcbiAgICAgICAgc3RhdHVzVGV4dDogeGhyLnN0YXR1c1RleHQsXG4gICAgICB9KTtcbiAgICB9O1xuICAgIHhoci5zZW5kKCk7XG4gIH0pO1xufVxuXG5leHBvcnQgZGVmYXVsdCBsYW5nUmVxdWVzdDtcbiIsImltcG9ydCBcImNvZGVtaXJyb3IvbGliL2NvZGVtaXJyb3IuY3NzXCI7XG5pbXBvcnQgXCJjb2RlbWlycm9yL3RoZW1lL21hdGVyaWFsLmNzc1wiO1xuaW1wb3J0IFwiY29kZW1pcnJvci90aGVtZS9uZWF0LmNzc1wiO1xuaW1wb3J0IFwiY29kZW1pcnJvci9tb2RlL3htbC94bWxcIjtcbmltcG9ydCBcImNvZGVtaXJyb3IvbW9kZS9qYXZhc2NyaXB0L2phdmFzY3JpcHRcIjtcbmltcG9ydCBcImNvZGVtaXJyb3IvbW9kZS9weXRob24vcHl0aG9uXCI7XG5cbi8vIG90aGVyIHRoZW1lc1xuaW1wb3J0IFwiY29kZW1pcnJvci90aGVtZS8zMDI0LWRheS5jc3NcIjtcbmltcG9ydCBcImNvZGVtaXJyb3IvdGhlbWUvMzAyNC1uaWdodC5jc3NcIjtcbmltcG9ydCBcImNvZGVtaXJyb3IvdGhlbWUvYmxhY2tib2FyZC5jc3NcIjtcbmltcG9ydCBcImNvZGVtaXJyb3IvdGhlbWUvZGFyY3VsYS5jc3NcIjtcbmltcG9ydCBcImNvZGVtaXJyb3IvdGhlbWUvZHJhY3VsYS5jc3NcIjtcbmltcG9ydCBcImNvZGVtaXJyb3IvdGhlbWUvZWNsaXBzZS5jc3NcIjtcbmltcG9ydCBcImNvZGVtaXJyb3IvdGhlbWUvZWxlZ2FudC5jc3NcIjtcbmltcG9ydCBcImNvZGVtaXJyb3IvdGhlbWUvZXJsYW5nLWRhcmsuY3NzXCI7XG5pbXBvcnQgXCJjb2RlbWlycm9yL3RoZW1lL2lkZWEuY3NzXCI7XG5pbXBvcnQgXCJjb2RlbWlycm9yL3RoZW1lL2lzb3RvcGUuY3NzXCI7XG5pbXBvcnQgXCJjb2RlbWlycm9yL3RoZW1lL21pZG5pZ2h0LmNzc1wiO1xuaW1wb3J0IFwiY29kZW1pcnJvci90aGVtZS9sdWNhcmlvLmNzc1wiO1xuaW1wb3J0IFwiY29kZW1pcnJvci90aGVtZS9tYXRlcmlhbC5jc3NcIjtcbmltcG9ydCBcImNvZGVtaXJyb3IvdGhlbWUvbW9ub2thaS5jc3NcIjtcbmltcG9ydCBcImNvZGVtaXJyb3IvdGhlbWUvc29sYXJpemVkLmNzc1wiO1xuXG5pbXBvcnQgXCIuLi9zdHlsZS9tYWluLmNzc1wiO1xuaW1wb3J0IHJ1bkNhbGwgZnJvbSBcIi4vcnVuLXJlcXVlc3RcIjtcbmltcG9ydCBjb2RlTWlycm9yIGZyb20gXCIuL2VkaXRvclwiO1xuaW1wb3J0IGxhbmdSZXF1ZXN0IGZyb20gXCIuL2xhbmdzLXJlcXVlc3RcIjtcbmltcG9ydCBydW5uZXJDb25maWcgZnJvbSBcIi4vY29uZmlnLXV0aWxzXCI7XG5pbXBvcnQgc2V0TGFuZyBmcm9tIFwiLi9zZXQtY29kZVwiO1xuXG52YXIgbGFuZ3M7XG5cbmNvZGVNaXJyb3Iuc2V0VmFsdWUoXG4gICAgICBcImRlZiBmaWJvbmFjY2kobik6XFxuXFx0aWYgbjw9MTpcXG5cXHRcXHRyZXR1cm4gblxcblxcdGVsc2U6XFxuXFx0XFx0cmV0dXJuKGZpYm9uYWNjaShuLTEpICsgZmlib25hY2NpKG4tMikpXFxuXFxubiA9IDVcXG5cXG5maWJvX3NlcmllcyA9IFtdXFxuXFxuZm9yIGkgaW4gcmFuZ2UoMCxuKTpcXG5cXHRmaWJvX3Nlcmllcy5hcHBlbmQoZmlib25hY2NpKGkpKVxcblxcbnByaW50KCdIZWxsbywgV29ybGQgZnJvbSBQeXRob24hIEhlcmVcXFxcJ3Mgc29tZSBmaWJvbmFjY2kgbnVtYmVyczonKVxcbnByaW50KGZpYm9fc2VyaWVzKVwiXG4pO1xuXG5sYW5nUmVxdWVzdCgpXG4gIC50aGVuKGZ1bmN0aW9uIChyZXN1bHQpIHtcbiAgICB2YXIgcmVzID0gSlNPTi5wYXJzZShyZXN1bHQpO1xuICAgIC8vIHVuY29tbWVudCBmb3IgdGVzdGluZ1xuICAgIC8vIHZhciByZXMgPSB7IGxhbmd1YWdlczogW1wicHl0aG9uM1wiLCBcIm5vZGVcIiwgXCJjKysxMVwiLCBcImdvXCJdIH07XG4gICAgbGFuZ3MgPSByZXMubGFuZ3VhZ2VzO1xuICB9KVxuICAuY2F0Y2goZnVuY3Rpb24gKGVycikge1xuICAgIGxhbmdzID0gW1wiRXJyb3IhXCJdO1xuICAgIGNvbnNvbGUubG9nKFwiRXJyb3Igd2hlbiBmZXRjaGluZyBsYW5ndWFnZXM6IFwiICsgZXJyKTtcbiAgfSlcbiAgLmZpbmFsbHkoZnVuY3Rpb24gKCkge1xuICAgIHZhciBsYW5nX21lbnUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImxhbmctc2VsZWN0XCIpO1xuICAgIGZvciAoY29uc3QgbGFuZyBvZiBsYW5ncykge1xuICAgICAgdmFyIGNoaWxkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcIm9wdGlvblwiKTtcbiAgICAgIGNoaWxkLmlubmVyVGV4dCA9IGxhbmc7XG4gICAgICBsYW5nX21lbnUuYXBwZW5kQ2hpbGQoY2hpbGQpO1xuICAgIH1cbiAgICBydW5uZXJDb25maWcuZ2V0U2VsZWN0ZWRMYW5ndWFnZSgpO1xuICB9KTtcblxuZnVuY3Rpb24gc2VsZWN0VGhlbWUoKSB7XG4gIGNvbnN0IHNlbGVjdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidGhlbWUtc2VsZWN0XCIpO1xuICB2YXIgdGhlbWUgPSBzZWxlY3Qub3B0aW9uc1tzZWxlY3Quc2VsZWN0ZWRJbmRleF0udGV4dENvbnRlbnQ7XG4gIGNvZGVNaXJyb3Iuc2V0T3B0aW9uKFwidGhlbWVcIiwgdGhlbWUpO1xufVxuXG5jb25zdCBzdWJtaXRCdG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInN1Ym1pdC1idG5cIik7XG5zdWJtaXRCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHJ1bkNhbGwpO1xuXG5jb25zdCBzZWxlY3RvciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidGhlbWUtc2VsZWN0XCIpO1xuc2VsZWN0b3IuYWRkRXZlbnRMaXN0ZW5lcihcImNoYW5nZVwiLCBzZWxlY3RUaGVtZSk7XG5cbmNvbnN0IGxhbmdTZWxlY3RvciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibGFuZy1zZWxlY3RcIik7XG5sYW5nU2VsZWN0b3IuYWRkRXZlbnRMaXN0ZW5lcihcImNoYW5nZVwiLCBzZXRMYW5nKTtcbiIsImltcG9ydCBjb2RlTWlycm9yIGZyb20gXCIuL2VkaXRvclwiO1xuaW1wb3J0IHJ1bm5lckNvbmZpZyBmcm9tIFwiLi9jb25maWctdXRpbHNcIjtcbmltcG9ydCBcImNvZGVtaXJyb3IvbGliL2NvZGVtaXJyb3IuY3NzXCI7XG5cbmZ1bmN0aW9uIHJ1blJlcXVlc3QoKSB7XG4gIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgdmFyIHJlcSA9IHtcbiAgICAgIHNvdXJjZTogY29kZU1pcnJvci5nZXRWYWx1ZSgpLFxuICAgICAgbGFuZ3VhZ2U6IHJ1bm5lckNvbmZpZy5nZXRTZWxlY3RlZExhbmd1YWdlKCksXG4gICAgfTtcbiAgICBsZXQgeGhyID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG4gICAgY29uc3QgZnVsbFVybCA9IHJ1bm5lckNvbmZpZy51cmwgKyBydW5uZXJDb25maWcucnVuRW5kcG9pbnQ7XG4gICAgeGhyLm9wZW4oXCJQT1NUXCIsIGZ1bGxVcmwpO1xuICAgIHhoci5zZXRSZXF1ZXN0SGVhZGVyKFwiQ29udGVudC1UeXBlXCIsIFwiYXBwbGljYXRpb24vanNvblwiKTtcbiAgICB4aHIub25sb2FkID0gZnVuY3Rpb24gKCkge1xuICAgICAgaWYgKHRoaXMuc3RhdHVzID49IDIwMCAmJiB0aGlzLnN0YXR1cyA8IDQwMCkge1xuICAgICAgICByZXNvbHZlKHhoci5yZXNwb25zZSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZWplY3Qoe1xuICAgICAgICAgIHN0YXR1czogdGhpcy5zdGF0dXMsXG4gICAgICAgICAgc3RhdHVzVGV4dDogeGhyLnN0YXR1c1RleHQsXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH07XG4gICAgeGhyLm9uZXJyb3IgPSBmdW5jdGlvbiAoKSB7XG4gICAgICByZWplY3Qoe1xuICAgICAgICBzdGF0dXM6IHRoaXMuc3RhdHVzLFxuICAgICAgICBzdGF0dXNUZXh0OiB4aHIuc3RhdHVzVGV4dCxcbiAgICAgIH0pO1xuICAgIH07XG4gICAgeGhyLnNlbmQoSlNPTi5zdHJpbmdpZnkocmVxKSk7XG4gIH0pO1xufVxuXG5hc3luYyBmdW5jdGlvbiBydW5DYWxsKCkge1xuICBhd2FpdCBydW5SZXF1ZXN0KClcbiAgICAudGhlbihmdW5jdGlvbiAocmVzdWx0KSB7XG4gICAgICBsZXQgb3V0ID0gSlNPTi5wYXJzZShyZXN1bHQpO1xuICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzdGRvdXQtZmllbGRcIikuaW5uZXJIVE1MID1cbiAgICAgICAgXCJTdGRvdXQ6IFwiICsgb3V0W1wic3Rkb3V0XCJdLnJlcGxhY2UoL1xcbi9nLCBcIjxicj5cIik7XG4gICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInN0ZGVyci1maWVsZFwiKS5pbm5lckhUTUwgPVxuICAgICAgICBcIlN0ZGVycjogXCIgKyBvdXRbXCJzdGRlcnJcIl07XG4gICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImVyci1maWVsZFwiKS5pbm5lckhUTUwgPSBcIkVycm9yOiBcIiArIG91dFtcImVycm9yXCJdO1xuICAgIH0pXG4gICAgLmNhdGNoKGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgIGNvbnNvbGUubG9nKGVycik7XG4gICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm91dHB1dC1maWVsZFwiKS50ZXh0Q29udGVudCA9IFwiRXJyb3I6IFwiICsgZXJyO1xuICAgIH0pO1xufVxuXG5leHBvcnQgZGVmYXVsdCBydW5DYWxsO1xuIiwiaW1wb3J0IGNvZGVNaXJyb3IgZnJvbSBcIi4vZWRpdG9yXCI7XG5cbmZ1bmN0aW9uIHNldExhbmcoKSB7XG4gIGNvbnN0IHNlbGVjdG9yID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJsYW5nLXNlbGVjdFwiKTtcbiAgY29uc3QgbGFuZyA9IHNlbGVjdG9yLm9wdGlvbnNbc2VsZWN0b3Iuc2VsZWN0ZWRJbmRleF0uaW5uZXJUZXh0O1xuICBpZiAobGFuZyA9PT0gXCJweXRob24zXCIgfHwgbGFuZyA9PT0gXCJweXRob25cIikge1xuICAgIGNvZGVNaXJyb3Iuc2V0VmFsdWUoXG4gICAgICBcImRlZiBmaWJvbmFjY2kobik6XFxuXFx0aWYgbjw9MTpcXG5cXHRcXHRyZXR1cm4gblxcblxcdGVsc2U6XFxuXFx0XFx0cmV0dXJuKGZpYm9uYWNjaShuLTEpICsgZmlib25hY2NpKG4tMikpXFxuXFxubiA9IDVcXG5cXG5maWJvX3NlcmllcyA9IFtdXFxuXFxuZm9yIGkgaW4gcmFuZ2UoMCxuKTpcXG5cXHRmaWJvX3Nlcmllcy5hcHBlbmQoZmlib25hY2NpKGkpKVxcblxcbnByaW50KCdIZWxsbywgV29ybGQgZnJvbSBQeXRob24hIEhlcmVcXFxcJ3Mgc29tZSBmaWJvbmFjY2kgbnVtYmVyczonKVxcbnByaW50KGZpYm9fc2VyaWVzKVwiXG4gICAgKTtcbiAgfSBlbHNlIGlmIChcbiAgICBsYW5nID09PSBcIm5vZGVcIiB8fFxuICAgIGxhbmcgPT09IFwibm9kZWpzXCIgfHxcbiAgICBsYW5nID09PSBcImpzXCIgfHxcbiAgICBsYW5nID09PSBcImphdmFzY3JpcHRcIlxuICApIHtcbiAgICBjb2RlTWlycm9yLnNldFZhbHVlKCdjb25zdCB7IGV4ZWMgfSA9IHJlcXVpcmUoXCJjaGlsZF9wcm9jZXNzXCIpO1xcblxcbmNvbnNvbGUubG9nKFwiSGVsbG8gd29ybGQgZnJvbSBOb2RlLmpzISBNeSB1cHRpbWUgaXM6XCIpO1xcblxcbmV4ZWMoXCJ1cHRpbWVcIiwgKGVycm9yLCBzdGRvdXQsIHN0ZGVycikgPT4ge1xcblxcdGlmIChlcnJvcikge1xcblxcdFxcdGNvbnNvbGUubG9nKGBlcnJvcjogJHtlcnJvci5tZXNzYWdlfWApO1xcblxcdFxcdHJldHVybjtcXG59XFxuXFx0aWYgKHN0ZGVycikge1xcblxcdFxcdGNvbnNvbGUubG9nKGBzdGRlcnI6ICR7c3RkZXJyfWApO1xcblxcdFxcdHJldHVybjtcXG5cXHR9XFxuXFx0XFx0Y29uc29sZS5sb2coYHN0ZG91dDogJHtzdGRvdXR9YCk7XFxufSk7Jyk7XG4gIH0gZWxzZSBpZiAobGFuZyA9PT0gXCJjKytcIiB8fCBsYW5nID09PSBcImNwcFwiIHx8IGxhbmcgPT09IFwiYysrMTFcIikge1xuICAgIGNvZGVNaXJyb3Iuc2V0VmFsdWUoXG4gICAgICBgI2luY2x1ZGU8aW9zdHJlYW0+XG4jaW5jbHVkZTx0aHJlYWQ+XG5pbnQgbWFpbigpIHtcblx0dW5zaWduZWQgaW50IG50aHJlYWRzID0gc3RkOjp0aHJlYWQ6OmhhcmR3YXJlX2NvbmN1cnJlbmN5KCk7XG5cdHN0ZDo6Y291dCA8PCBcImhlbGxvIHdvcmxkIGZyb20gQysrIVwiIDw8IHN0ZDo6ZW5kbDtcblx0c3RkOjpjZXJyIDw8IFwiSSBoYXZlIFwiIDw8IG50aHJlYWRzIDw8IFwiIHRocmVhZHMhXCIgPDwgc3RkOjplbmRsO1xuXHRyZXR1cm4gMDtcbn1gXG4gICAgKTtcbiAgfSBlbHNlIGlmIChsYW5nID09PSBcImdvXCIgfHwgbGFuZyA9PT0gXCJnb2xhbmdcIikge1xuICAgIGNvZGVNaXJyb3Iuc2V0VmFsdWUoXG4gICAgICBgcGFja2FnZSBtYWluXG5pbXBvcnQgXCJmbXRcIlxuZnVuYyBtYWluKCkge1xuICAgIGZtdC5QcmludGxuKFwiaGVsbG8gd29ybGRcIilcbn1gXG4gICAgKTtcbiAgfSBlbHNlIHtcbiAgICBjb2RlTWlycm9yLnNldFZhbHVlKFxuICAgICAgXCJkZWYgZmlib25hY2NpKG4pOlxcblxcdGlmIG48PTE6XFxuXFx0XFx0cmV0dXJuIG5cXG5cXHRlbHNlOlxcblxcdFxcdHJldHVybihmaWJvbmFjY2kobi0xKSArIGZpYm9uYWNjaShuLTIpKVxcblxcbm4gPSA1XFxuXFxuZmlib19zZXJpZXMgPSBbXVxcblxcbmZvciBpIGluIHJhbmdlKDAsbik6XFxuXFx0Zmlib19zZXJpZXMuYXBwZW5kKGZpYm9uYWNjaShpKSlcXG5cXG5wcmludCgnSGVsbG8sIFdvcmxkIGZyb20gUHl0aG9uISBIZXJlXFxcXCdzIHNvbWUgZmlib25hY2NpIG51bWJlcnM6JylcXG5wcmludChmaWJvX3NlcmllcylcIlxuICAgICk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgc2V0TGFuZztcbiIsIi8vIEltcG9ydHNcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fIGZyb20gXCIuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvc291cmNlTWFwcy5qc1wiO1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyBmcm9tIFwiLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qc1wiO1xudmFyIF9fX0NTU19MT0FERVJfRVhQT1JUX19fID0gX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18pO1xuX19fQ1NTX0xPQURFUl9FWFBPUlRfX18ucHVzaChbbW9kdWxlLmlkLCBcIkBpbXBvcnQgdXJsKGh0dHBzOi8vZm9udHMuZ29vZ2xlYXBpcy5jb20vY3NzMj9mYW1pbHk9UXVpY2tzYW5kOndnaHRAMzAwOzQwMCZkaXNwbGF5PXN3YXApO1wiXSk7XG5fX19DU1NfTE9BREVSX0VYUE9SVF9fXy5wdXNoKFttb2R1bGUuaWQsIFwiQGltcG9ydCB1cmwoaHR0cHM6Ly9mb250cy5nb29nbGVhcGlzLmNvbS9jc3MyP2ZhbWlseT1JQk0rUGxleCtNb25vJmRpc3BsYXk9c3dhcCk7XCJdKTtcbl9fX0NTU19MT0FERVJfRVhQT1JUX19fLnB1c2goW21vZHVsZS5pZCwgXCJAaW1wb3J0IHVybChodHRwczovL2ZvbnRzLmdvb2dsZWFwaXMuY29tL2NzczI/ZmFtaWx5PVdvcmsrU2FucyZkaXNwbGF5PXN3YXApO1wiXSk7XG4vLyBNb2R1bGVcbl9fX0NTU19MT0FERVJfRVhQT1JUX19fLnB1c2goW21vZHVsZS5pZCwgXCIvKiBEYXJrIG1vZGUgKi9cXG5AbWVkaWEgKHByZWZlcnMtY29sb3Itc2NoZW1lOiBkYXJrKSB7XFxuICAgIGJvZHkge1xcbiAgICAgICAgYmFja2dyb3VuZDogIzE4MTgxODtcXG4gICAgICAgIGNvbG9yOiAjZDhkOGQ4O1xcbiAgICB9XFxuXFxuICAgIGEge1xcbiAgICAgICAgY29sb3I6ICNDRjlGRkY7XFxuICAgIH1cXG5cXG4gICAgLmZpZWxkIHtcXG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6ICMyODI4Mjg7XFxuICAgICAgICBjb2xvcjogI2Q4ZDhkODtcXG4gICAgfVxcbn1cXG5cXG5cXG5cXG4vKiBMaWdodCBtb2RlICovXFxuQG1lZGlhIChwcmVmZXJzLWNvbG9yLXNjaGVtZTogbGlnaHQpIHtcXG4gICAgYm9keSB7XFxuICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZjVmNWY1O1xcbiAgICAgICAgY29sb3I6ICMyODI4Mjg7XFxuICAgIH1cXG5cXG4gICAgYSB7XFxuICAgICAgICBjb2xvcjogIzQwMDA4MDtcXG4gICAgfVxcblxcbiAgICAuZmllbGQge1xcbiAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogI2Q4ZDhkODtcXG4gICAgICAgIGNvbG9yOiMyODI4Mjg7XFxuICAgIH1cXG59XFxuXFxuLkNvZGVNaXJyb3Ige1xcbiAgICBtYXJnaW46IGF1dG87XFxuICAgIGhlaWdodDogNDUwcHg7XFxuICAgIGZvbnQtc2l6ZTogMTVweDtcXG4gICAgdGV4dC1hbGlnbjogbGVmdDtcXG4gICAgdGV4dC1zaGFkb3c6IG5vbmU7XFxufVxcblxcbmJ1dHRvbiB7XFxuICAgIGZvbnQtc3R5bGU6IFxcXCJJQk0gUGxleCBNb25vXFxcIiwgbW9ub3NwYWNlO1xcbiAgICBwYWRkaW5nOiA0cHg7XFxuICAgIG1hcmdpbi10b3A6IDVweDtcXG59XFxuXFxuLnNlbGVjdG9ycyB7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcXG59XFxuXFxuc2VsZWN0IHtcXG4gICAgZm9udC1mYW1pbHk6IG1vbm9zcGFjZTtcXG4gICAgZm9udDogXFxcIklCTSBQbGV4IE1vbm9cXFwiO1xcbn1cXG5cXG4jd3JhcHBlciB7XFxuICAgIG1hcmdpbi10b3A6IDMlO1xcbiAgICB3aWR0aDogNTAlO1xcbn1cXG5cXG5cXG5ib2R5IHtcXG4gICAgZm9udC1mYW1pbHk6IFxcXCJJQk0gUGxleCBNb25vXFxcIiwgbW9ub3NwYWNlO1xcbiAgICB0ZXh0LXJlbmRlcmluZzogb3B0aW1pemVMZWdpYmlsaXR5O1xcbiAgICAvKiBsaW5lLWhlaWdodDogMS41OyAqL1xcbiAgICAvKiBtYXJnaW46IDFyZW0gMXJlbTsgKi9cXG59XFxuXFxuaHRtbCB7XFxuICAgIG1hcmdpbi1sZWZ0OiBjYWxjKDEwMHZ3IC0gMTAwJSk7XFxufVxcblxcbmE6dmlzaXRlZCB7XFxuICAgIGNvbG9yOiBncmF5O1xcbiAgICBmb250LXdlaWdodDogYm9sZDtcXG59XFxuXFxuZm9vdGVyIHtcXG4gICAgZm9udC1zaXplOiAxNHB4O1xcbiAgICBwYWRkaW5nOiAyMHB4O1xcbiAgICBtYXJnaW4tbGVmdDogMzAlO1xcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcbn1cXG5cXG4ub3V0cHV0IHtcXG4gICAgd2lkdGg6IDcwJTtcXG4gICAgbWFyZ2luLXRvcDogMTBweDtcXG59XFxuXFxuLmZpZWxkIHtcXG4gICAgYm9yZGVyLXJhZGl1czogMTBweDtcXG4gICAgLW1vei1ib3JkZXItcmFkaXVzOiAxMHB4O1xcbiAgICBtYXJnaW46IGF1dG87XFxuICAgIHRleHQtYWxpZ246IGxlZnQ7XFxuICAgIHBhZGRpbmc6IDVweDtcXG4gICAgZm9udC1zaXplOiAxNHB4O1xcbn1cXG5cXG4uYm94IHtcXG4gICAgd2lkdGg6IDkwJTtcXG59XFxuXFxuI3dyYXBwZXIge1xcbiAgICB3aWR0aDogNTAlO1xcbiAgICBtYXJnaW4tbGVmdDogMjUlO1xcbn1cIiwgXCJcIix7XCJ2ZXJzaW9uXCI6MyxcInNvdXJjZXNcIjpbXCJ3ZWJwYWNrOi8vLi9zdHlsZS9tYWluLmNzc1wiXSxcIm5hbWVzXCI6W10sXCJtYXBwaW5nc1wiOlwiQUFLQSxjQUFjO0FBQ2Q7SUFDSTtRQUNJLG1CQUFtQjtRQUNuQixjQUFjO0lBQ2xCOztJQUVBO1FBQ0ksY0FBYztJQUNsQjs7SUFFQTtRQUNJLHlCQUF5QjtRQUN6QixjQUFjO0lBQ2xCO0FBQ0o7Ozs7QUFJQSxlQUFlO0FBQ2Y7SUFDSTtRQUNJLHlCQUF5QjtRQUN6QixjQUFjO0lBQ2xCOztJQUVBO1FBQ0ksY0FBYztJQUNsQjs7SUFFQTtRQUNJLHlCQUF5QjtRQUN6QixhQUFhO0lBQ2pCO0FBQ0o7O0FBRUE7SUFDSSxZQUFZO0lBQ1osYUFBYTtJQUNiLGVBQWU7SUFDZixnQkFBZ0I7SUFDaEIsaUJBQWlCO0FBQ3JCOztBQUVBO0lBQ0ksc0NBQXNDO0lBQ3RDLFlBQVk7SUFDWixlQUFlO0FBQ25COztBQUVBO0lBQ0ksYUFBYTtJQUNiLDhCQUE4QjtBQUNsQzs7QUFFQTtJQUNJLHNCQUFzQjtJQUN0QixxQkFBcUI7QUFDekI7O0FBRUE7SUFDSSxjQUFjO0lBQ2QsVUFBVTtBQUNkOzs7QUFHQTtJQUNJLHVDQUF1QztJQUN2QyxrQ0FBa0M7SUFDbEMsc0JBQXNCO0lBQ3RCLHVCQUF1QjtBQUMzQjs7QUFFQTtJQUNJLCtCQUErQjtBQUNuQzs7QUFFQTtJQUNJLFdBQVc7SUFDWCxpQkFBaUI7QUFDckI7O0FBRUE7SUFDSSxlQUFlO0lBQ2YsYUFBYTtJQUNiLGdCQUFnQjtJQUNoQixtQkFBbUI7QUFDdkI7O0FBRUE7SUFDSSxVQUFVO0lBQ1YsZ0JBQWdCO0FBQ3BCOztBQUVBO0lBQ0ksbUJBQW1CO0lBQ25CLHdCQUF3QjtJQUN4QixZQUFZO0lBQ1osZ0JBQWdCO0lBQ2hCLFlBQVk7SUFDWixlQUFlO0FBQ25COztBQUVBO0lBQ0ksVUFBVTtBQUNkOztBQUVBO0lBQ0ksVUFBVTtJQUNWLGdCQUFnQjtBQUNwQlwiLFwic291cmNlc0NvbnRlbnRcIjpbXCJAaW1wb3J0IHVybChcXFwiaHR0cHM6Ly9mb250cy5nb29nbGVhcGlzLmNvbS9jc3MyP2ZhbWlseT1RdWlja3NhbmQ6d2dodEAzMDA7NDAwJmRpc3BsYXk9c3dhcFxcXCIpO1xcbkBpbXBvcnQgdXJsKCdodHRwczovL2ZvbnRzLmdvb2dsZWFwaXMuY29tL2NzczI/ZmFtaWx5PUlCTStQbGV4K01vbm8mZGlzcGxheT1zd2FwJyk7XFxuXFxuQGltcG9ydCB1cmwoXFxcImh0dHBzOi8vZm9udHMuZ29vZ2xlYXBpcy5jb20vY3NzMj9mYW1pbHk9V29yaytTYW5zJmRpc3BsYXk9c3dhcFxcXCIpO1xcblxcbi8qIERhcmsgbW9kZSAqL1xcbkBtZWRpYSAocHJlZmVycy1jb2xvci1zY2hlbWU6IGRhcmspIHtcXG4gICAgYm9keSB7XFxuICAgICAgICBiYWNrZ3JvdW5kOiAjMTgxODE4O1xcbiAgICAgICAgY29sb3I6ICNkOGQ4ZDg7XFxuICAgIH1cXG5cXG4gICAgYSB7XFxuICAgICAgICBjb2xvcjogI0NGOUZGRjtcXG4gICAgfVxcblxcbiAgICAuZmllbGQge1xcbiAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogIzI4MjgyODtcXG4gICAgICAgIGNvbG9yOiAjZDhkOGQ4O1xcbiAgICB9XFxufVxcblxcblxcblxcbi8qIExpZ2h0IG1vZGUgKi9cXG5AbWVkaWEgKHByZWZlcnMtY29sb3Itc2NoZW1lOiBsaWdodCkge1xcbiAgICBib2R5IHtcXG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6ICNmNWY1ZjU7XFxuICAgICAgICBjb2xvcjogIzI4MjgyODtcXG4gICAgfVxcblxcbiAgICBhIHtcXG4gICAgICAgIGNvbG9yOiAjNDAwMDgwO1xcbiAgICB9XFxuXFxuICAgIC5maWVsZCB7XFxuICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZDhkOGQ4O1xcbiAgICAgICAgY29sb3I6IzI4MjgyODtcXG4gICAgfVxcbn1cXG5cXG4uQ29kZU1pcnJvciB7XFxuICAgIG1hcmdpbjogYXV0bztcXG4gICAgaGVpZ2h0OiA0NTBweDtcXG4gICAgZm9udC1zaXplOiAxNXB4O1xcbiAgICB0ZXh0LWFsaWduOiBsZWZ0O1xcbiAgICB0ZXh0LXNoYWRvdzogbm9uZTtcXG59XFxuXFxuYnV0dG9uIHtcXG4gICAgZm9udC1zdHlsZTogXFxcIklCTSBQbGV4IE1vbm9cXFwiLCBtb25vc3BhY2U7XFxuICAgIHBhZGRpbmc6IDRweDtcXG4gICAgbWFyZ2luLXRvcDogNXB4O1xcbn1cXG5cXG4uc2VsZWN0b3JzIHtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xcbn1cXG5cXG5zZWxlY3Qge1xcbiAgICBmb250LWZhbWlseTogbW9ub3NwYWNlO1xcbiAgICBmb250OiBcXFwiSUJNIFBsZXggTW9ub1xcXCI7XFxufVxcblxcbiN3cmFwcGVyIHtcXG4gICAgbWFyZ2luLXRvcDogMyU7XFxuICAgIHdpZHRoOiA1MCU7XFxufVxcblxcblxcbmJvZHkge1xcbiAgICBmb250LWZhbWlseTogXFxcIklCTSBQbGV4IE1vbm9cXFwiLCBtb25vc3BhY2U7XFxuICAgIHRleHQtcmVuZGVyaW5nOiBvcHRpbWl6ZUxlZ2liaWxpdHk7XFxuICAgIC8qIGxpbmUtaGVpZ2h0OiAxLjU7ICovXFxuICAgIC8qIG1hcmdpbjogMXJlbSAxcmVtOyAqL1xcbn1cXG5cXG5odG1sIHtcXG4gICAgbWFyZ2luLWxlZnQ6IGNhbGMoMTAwdncgLSAxMDAlKTtcXG59XFxuXFxuYTp2aXNpdGVkIHtcXG4gICAgY29sb3I6IGdyYXk7XFxuICAgIGZvbnQtd2VpZ2h0OiBib2xkO1xcbn1cXG5cXG5mb290ZXIge1xcbiAgICBmb250LXNpemU6IDE0cHg7XFxuICAgIHBhZGRpbmc6IDIwcHg7XFxuICAgIG1hcmdpbi1sZWZ0OiAzMCU7XFxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxufVxcblxcbi5vdXRwdXQge1xcbiAgICB3aWR0aDogNzAlO1xcbiAgICBtYXJnaW4tdG9wOiAxMHB4O1xcbn1cXG5cXG4uZmllbGQge1xcbiAgICBib3JkZXItcmFkaXVzOiAxMHB4O1xcbiAgICAtbW96LWJvcmRlci1yYWRpdXM6IDEwcHg7XFxuICAgIG1hcmdpbjogYXV0bztcXG4gICAgdGV4dC1hbGlnbjogbGVmdDtcXG4gICAgcGFkZGluZzogNXB4O1xcbiAgICBmb250LXNpemU6IDE0cHg7XFxufVxcblxcbi5ib3gge1xcbiAgICB3aWR0aDogOTAlO1xcbn1cXG5cXG4jd3JhcHBlciB7XFxuICAgIHdpZHRoOiA1MCU7XFxuICAgIG1hcmdpbi1sZWZ0OiAyNSU7XFxufVwiXSxcInNvdXJjZVJvb3RcIjpcIlwifV0pO1xuLy8gRXhwb3J0c1xuZXhwb3J0IGRlZmF1bHQgX19fQ1NTX0xPQURFUl9FWFBPUlRfX187XG4iLCJcbiAgICAgIGltcG9ydCBBUEkgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbmplY3RTdHlsZXNJbnRvU3R5bGVUYWcuanNcIjtcbiAgICAgIGltcG9ydCBkb21BUEkgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZURvbUFQSS5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydEZuIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0QnlTZWxlY3Rvci5qc1wiO1xuICAgICAgaW1wb3J0IHNldEF0dHJpYnV0ZXMgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRTdHlsZUVsZW1lbnQgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRTdHlsZUVsZW1lbnQuanNcIjtcbiAgICAgIGltcG9ydCBzdHlsZVRhZ1RyYW5zZm9ybUZuIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVUYWdUcmFuc2Zvcm0uanNcIjtcbiAgICAgIGltcG9ydCBjb250ZW50LCAqIGFzIG5hbWVkRXhwb3J0IGZyb20gXCIhIS4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vbWFpbi5jc3NcIjtcbiAgICAgIFxuICAgICAgXG5cbnZhciBvcHRpb25zID0ge307XG5cbm9wdGlvbnMuc3R5bGVUYWdUcmFuc2Zvcm0gPSBzdHlsZVRhZ1RyYW5zZm9ybUZuO1xub3B0aW9ucy5zZXRBdHRyaWJ1dGVzID0gc2V0QXR0cmlidXRlcztcblxuICAgICAgb3B0aW9ucy5pbnNlcnQgPSBpbnNlcnRGbi5iaW5kKG51bGwsIFwiaGVhZFwiKTtcbiAgICBcbm9wdGlvbnMuZG9tQVBJID0gZG9tQVBJO1xub3B0aW9ucy5pbnNlcnRTdHlsZUVsZW1lbnQgPSBpbnNlcnRTdHlsZUVsZW1lbnQ7XG5cbnZhciB1cGRhdGUgPSBBUEkoY29udGVudCwgb3B0aW9ucyk7XG5cblxuXG5leHBvcnQgKiBmcm9tIFwiISEuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL21haW4uY3NzXCI7XG4gICAgICAgZXhwb3J0IGRlZmF1bHQgY29udGVudCAmJiBjb250ZW50LmxvY2FscyA/IGNvbnRlbnQubG9jYWxzIDogdW5kZWZpbmVkO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9