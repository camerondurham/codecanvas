"use strict";
(self["webpackChunkrunner_web_frontend"] = self["webpackChunkrunner_web_frontend"] || []).push([["index"],{

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


/***/ }),

/***/ "./js/load.js":
/*!********************!*\
  !*** ./js/load.js ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
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







// other themes





















var langs;

_editor__WEBPACK_IMPORTED_MODULE_22__["default"].setValue("def main():\n\tprint('Hello, World!')\n\nif __name__ == '__main__':\n\tmain()");

var langs;
(0,_langs_request__WEBPACK_IMPORTED_MODULE_23__["default"])()
    .then(function (result) {
        var res = JSON.parse(result);
        langs = res.languages;
    })
    .catch(function (err) {
        langs = ['Error!'];
        console.log("Error when fetching languages: " + err);
    })
    .finally(function () {
        var lang_menu = document.getElementById('lang-select');
        for (const lang of langs) {
            var child = document.createElement('option');
            child.innerText = lang;
            lang_menu.appendChild(child);
        }
        updateLanguage();
    });

function selectTheme() {
    const select = document.getElementById('theme-select');
    var theme = select.options[select.selectedIndex].textContent;
    _editor__WEBPACK_IMPORTED_MODULE_22__["default"].setOption('theme', theme);
}

function updateLanguage() {
  const selector = document.getElementById("lang-select");
  return selector.options[selector.selectedIndex].innerText;
}

const submitBtn = document.getElementById("submit-btn");
submitBtn.addEventListener("click", _run_request__WEBPACK_IMPORTED_MODULE_21__["default"]);

const selector = document.getElementById("theme-select");
selector.addEventListener("change", selectTheme);

// only single export per .js file allowed
// exporting this since we will need it to retrieve the current language from the document/DOM
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (updateLanguage);

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
/* harmony import */ var _load__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./load */ "./js/load.js");
/* harmony import */ var codemirror_lib_codemirror_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! codemirror/lib/codemirror.css */ "./node_modules/codemirror/lib/codemirror.css");




const url = "https://runner.fly.dev/api/v1/";
const run_endpoint = "run";

function runRequest() {
  return new Promise(function (resolve, reject) {
    var req = {
      source: _editor__WEBPACK_IMPORTED_MODULE_0__["default"].getValue(),
      language: (0,_load__WEBPACK_IMPORTED_MODULE_1__["default"])(),
    };
    let xhr = new XMLHttpRequest();
    xhr.open("POST", url + run_endpoint);
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
// Module
___CSS_LOADER_EXPORT___.push([module.id, ".CodeMirror {\n    border: 4px solid gray;\n    margin: auto;\n    height: 500px;\n    font-size: 16px;\n    text-align: left; \n    text-shadow: none; \n}\n\nbutton {\n    font-weight: bold; \n    padding: 4px; \n    margin-top: 5px; \n}\n\n.selectors {\n    display: flex;\n    justify-content:space-between;\n}\n\nselect {\n\tfont-family: monospace;\n}\n\n#wrapper {\n    margin-top: 5%; \n}\n\nbody {\n    background-color: indigo; \n    text-align: center;\n    font-family: monospace; \n    color: white;\n}\n\na, a:visited {\n    color: gray; \n    font-weight: bold; \n}\n\nfooter {\n    font-style: italic;\n    font-size: 14px; \n    padding: 10px; \n}\n\n.output {\n    width: 60%;\n    margin-top: 10px; \n}\n\n.field {\n    background-color: skyblue; \n    border: 2px solid blue; \n    border-radius: 10px; \n    -moz-border-radius: 10px; \n    color: black; \n    margin: auto; \n    text-align: left; \n    padding: 5px; \n}\n\n.box {\n    width: 90%; \n}\n\n#wrapper {\n    width: 50%;\n    margin: auto;\n}\n", "",{"version":3,"sources":["webpack://./style/main.css"],"names":[],"mappings":"AAAA;IACI,sBAAsB;IACtB,YAAY;IACZ,aAAa;IACb,eAAe;IACf,gBAAgB;IAChB,iBAAiB;AACrB;;AAEA;IACI,iBAAiB;IACjB,YAAY;IACZ,eAAe;AACnB;;AAEA;IACI,aAAa;IACb,6BAA6B;AACjC;;AAEA;CACC,sBAAsB;AACvB;;AAEA;IACI,cAAc;AAClB;;AAEA;IACI,wBAAwB;IACxB,kBAAkB;IAClB,sBAAsB;IACtB,YAAY;AAChB;;AAEA;IACI,WAAW;IACX,iBAAiB;AACrB;;AAEA;IACI,kBAAkB;IAClB,eAAe;IACf,aAAa;AACjB;;AAEA;IACI,UAAU;IACV,gBAAgB;AACpB;;AAEA;IACI,yBAAyB;IACzB,sBAAsB;IACtB,mBAAmB;IACnB,wBAAwB;IACxB,YAAY;IACZ,YAAY;IACZ,gBAAgB;IAChB,YAAY;AAChB;;AAEA;IACI,UAAU;AACd;;AAEA;IACI,UAAU;IACV,YAAY;AAChB","sourcesContent":[".CodeMirror {\n    border: 4px solid gray;\n    margin: auto;\n    height: 500px;\n    font-size: 16px;\n    text-align: left; \n    text-shadow: none; \n}\n\nbutton {\n    font-weight: bold; \n    padding: 4px; \n    margin-top: 5px; \n}\n\n.selectors {\n    display: flex;\n    justify-content:space-between;\n}\n\nselect {\n\tfont-family: monospace;\n}\n\n#wrapper {\n    margin-top: 5%; \n}\n\nbody {\n    background-color: indigo; \n    text-align: center;\n    font-family: monospace; \n    color: white;\n}\n\na, a:visited {\n    color: gray; \n    font-weight: bold; \n}\n\nfooter {\n    font-style: italic;\n    font-size: 14px; \n    padding: 10px; \n}\n\n.output {\n    width: 60%;\n    margin-top: 10px; \n}\n\n.field {\n    background-color: skyblue; \n    border: 2px solid blue; \n    border-radius: 10px; \n    -moz-border-radius: 10px; \n    color: black; \n    margin: auto; \n    text-align: left; \n    padding: 5px; \n}\n\n.box {\n    width: 90%; \n}\n\n#wrapper {\n    width: 50%;\n    margin: auto;\n}\n"],"sourceRoot":""}]);
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
/******/ __webpack_require__.O(0, ["vendors-node_modules_codemirror_mode_javascript_javascript_js-node_modules_codemirror_mode_py-a44da3","vendors-node_modules_codemirror_lib_codemirror_js"], () => (__webpack_exec__("./js/load.js")));
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguOWMxN2M5NjFkNjRkMDQwZmVjNzkuYnVuZGxlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0EsR0FBRztBQUNIOztBQUVBLGlFQUFlLFdBQVcsRUFBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDNUJZO0FBQ0E7QUFDSjtBQUNGO0FBQ2M7QUFDUjs7QUFFdkM7QUFDdUM7QUFDRTtBQUNBO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDSTtBQUNQO0FBQ0c7QUFDQztBQUNEO0FBQ0M7QUFDRDtBQUNFOztBQUViO0FBQ1M7QUFDRjtBQUNROztBQUUxQzs7QUFFQSx5REFBbUI7O0FBRW5CO0FBQ0EsMkRBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBLElBQUksMERBQW9CO0FBQ3hCOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0Esb0NBQW9DLHFEQUFPOztBQUUzQztBQUNBOztBQUVBO0FBQ0E7QUFDQSxpRUFBZSxjQUFjOzs7Ozs7Ozs7Ozs7Ozs7OztBQ3hFSztBQUNFO0FBQ0c7O0FBRXZDO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsY0FBYyx3REFBbUI7QUFDakMsZ0JBQWdCLGlEQUFjO0FBQzlCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBLGlFQUFlLE9BQU8sRUFBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3BEdkI7QUFDMEc7QUFDakI7QUFDekYsOEJBQThCLG1GQUEyQixDQUFDLDRGQUFxQztBQUMvRjtBQUNBLHVEQUF1RCw2QkFBNkIsbUJBQW1CLG9CQUFvQixzQkFBc0Isd0JBQXdCLHlCQUF5QixHQUFHLFlBQVkseUJBQXlCLG9CQUFvQix1QkFBdUIsR0FBRyxnQkFBZ0Isb0JBQW9CLG9DQUFvQyxHQUFHLFlBQVksMkJBQTJCLEdBQUcsY0FBYyxzQkFBc0IsR0FBRyxVQUFVLGdDQUFnQyx5QkFBeUIsOEJBQThCLG1CQUFtQixHQUFHLGtCQUFrQixtQkFBbUIseUJBQXlCLEdBQUcsWUFBWSx5QkFBeUIsdUJBQXVCLHFCQUFxQixHQUFHLGFBQWEsaUJBQWlCLHdCQUF3QixHQUFHLFlBQVksaUNBQWlDLDhCQUE4QiwyQkFBMkIsZ0NBQWdDLG9CQUFvQixvQkFBb0Isd0JBQXdCLG9CQUFvQixHQUFHLFVBQVUsa0JBQWtCLEdBQUcsY0FBYyxpQkFBaUIsbUJBQW1CLEdBQUcsU0FBUyxpRkFBaUYsWUFBWSxXQUFXLFVBQVUsVUFBVSxZQUFZLGFBQWEsT0FBTyxLQUFLLFlBQVksV0FBVyxVQUFVLE9BQU8sS0FBSyxVQUFVLFlBQVksT0FBTyxLQUFLLFlBQVksT0FBTyxLQUFLLFVBQVUsT0FBTyxLQUFLLFlBQVksYUFBYSxhQUFhLFdBQVcsT0FBTyxLQUFLLFVBQVUsWUFBWSxPQUFPLEtBQUssWUFBWSxXQUFXLFVBQVUsT0FBTyxLQUFLLFVBQVUsWUFBWSxPQUFPLEtBQUssWUFBWSxhQUFhLGFBQWEsYUFBYSxXQUFXLFVBQVUsWUFBWSxXQUFXLE9BQU8sS0FBSyxVQUFVLE1BQU0sS0FBSyxVQUFVLFVBQVUsdUNBQXVDLDZCQUE2QixtQkFBbUIsb0JBQW9CLHNCQUFzQix3QkFBd0IseUJBQXlCLEdBQUcsWUFBWSx5QkFBeUIsb0JBQW9CLHVCQUF1QixHQUFHLGdCQUFnQixvQkFBb0Isb0NBQW9DLEdBQUcsWUFBWSwyQkFBMkIsR0FBRyxjQUFjLHNCQUFzQixHQUFHLFVBQVUsZ0NBQWdDLHlCQUF5Qiw4QkFBOEIsbUJBQW1CLEdBQUcsa0JBQWtCLG1CQUFtQix5QkFBeUIsR0FBRyxZQUFZLHlCQUF5Qix1QkFBdUIscUJBQXFCLEdBQUcsYUFBYSxpQkFBaUIsd0JBQXdCLEdBQUcsWUFBWSxpQ0FBaUMsOEJBQThCLDJCQUEyQixnQ0FBZ0Msb0JBQW9CLG9CQUFvQix3QkFBd0Isb0JBQW9CLEdBQUcsVUFBVSxrQkFBa0IsR0FBRyxjQUFjLGlCQUFpQixtQkFBbUIsR0FBRyxxQkFBcUI7QUFDbHNGO0FBQ0EsaUVBQWUsdUJBQXVCLEVBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDTnZDLE1BQStGO0FBQy9GLE1BQXFGO0FBQ3JGLE1BQTRGO0FBQzVGLE1BQStHO0FBQy9HLE1BQXdHO0FBQ3hHLE1BQXdHO0FBQ3hHLE1BQWtHO0FBQ2xHO0FBQ0E7O0FBRUE7O0FBRUEsNEJBQTRCLHFHQUFtQjtBQUMvQyx3QkFBd0Isa0hBQWE7O0FBRXJDLHVCQUF1Qix1R0FBYTtBQUNwQztBQUNBLGlCQUFpQiwrRkFBTTtBQUN2Qiw2QkFBNkIsc0dBQWtCOztBQUUvQyxhQUFhLDBHQUFHLENBQUMscUZBQU87Ozs7QUFJNEM7QUFDcEUsT0FBTyxpRUFBZSxxRkFBTyxJQUFJLDRGQUFjLEdBQUcsNEZBQWMsWUFBWSxFQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vcnVubmVyLXdlYi1mcm9udGVuZC8uL2pzL2xhbmdzLXJlcXVlc3QuanMiLCJ3ZWJwYWNrOi8vcnVubmVyLXdlYi1mcm9udGVuZC8uL2pzL2xvYWQuanMiLCJ3ZWJwYWNrOi8vcnVubmVyLXdlYi1mcm9udGVuZC8uL2pzL3J1bi1yZXF1ZXN0LmpzIiwid2VicGFjazovL3J1bm5lci13ZWItZnJvbnRlbmQvLi9zdHlsZS9tYWluLmNzcyIsIndlYnBhY2s6Ly9ydW5uZXItd2ViLWZyb250ZW5kLy4vc3R5bGUvbWFpbi5jc3M/N2Y1NCJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBUT0RPOiBtYWtlIHRoaXMgYSBjb25maWd1cmFibGUgZXhwb3J0IGZyb20gbG9hZC5qc1xuY29uc3QgdXJsID0gXCJodHRwczovL3J1bm5lci5mbHkuZGV2L2FwaS92MS9cIjtcbmNvbnN0IGxhbmdfZW5kcG9pbnQgPSBcImxhbmd1YWdlc1wiO1xuXG5mdW5jdGlvbiBsYW5nUmVxdWVzdCgpIHtcbiAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICBsZXQgeGhyID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG4gICAgeGhyLm9wZW4oXCJHRVRcIiwgdXJsICsgbGFuZ19lbmRwb2ludCk7XG4gICAgeGhyLm9ubG9hZCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIGlmICh0aGlzLnN0YXR1cyA+PSAyMDAgJiYgdGhpcy5zdGF0dXMgPCA0MDApIHtcbiAgICAgICAgcmVzb2x2ZSh4aHIucmVzcG9uc2UpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmVqZWN0KHtcbiAgICAgICAgICBzdGF0dXM6IHRoaXMuc3RhdHVzLFxuICAgICAgICAgIHN0YXR1c1RleHQ6IHhoci5zdGF0dXNUZXh0LFxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9O1xuICAgIHhoci5vbmVycm9yID0gZnVuY3Rpb24gKCkge1xuICAgICAgcmVqZWN0KHtcbiAgICAgICAgc3RhdHVzOiB0aGlzLnN0YXR1cyxcbiAgICAgICAgc3RhdHVzVGV4dDogeGhyLnN0YXR1c1RleHQsXG4gICAgICB9KTtcbiAgICB9O1xuICAgIHhoci5zZW5kKCk7XG4gIH0pO1xufVxuXG5leHBvcnQgZGVmYXVsdCBsYW5nUmVxdWVzdDtcbiIsImltcG9ydCBcImNvZGVtaXJyb3IvbGliL2NvZGVtaXJyb3IuY3NzXCI7XG5pbXBvcnQgXCJjb2RlbWlycm9yL3RoZW1lL21hdGVyaWFsLmNzc1wiO1xuaW1wb3J0IFwiY29kZW1pcnJvci90aGVtZS9uZWF0LmNzc1wiO1xuaW1wb3J0IFwiY29kZW1pcnJvci9tb2RlL3htbC94bWxcIjtcbmltcG9ydCBcImNvZGVtaXJyb3IvbW9kZS9qYXZhc2NyaXB0L2phdmFzY3JpcHRcIjtcbmltcG9ydCBcImNvZGVtaXJyb3IvbW9kZS9weXRob24vcHl0aG9uXCI7XG5cbi8vIG90aGVyIHRoZW1lc1xuaW1wb3J0IFwiY29kZW1pcnJvci90aGVtZS8zMDI0LWRheS5jc3NcIjtcbmltcG9ydCBcImNvZGVtaXJyb3IvdGhlbWUvMzAyNC1uaWdodC5jc3NcIjtcbmltcG9ydCBcImNvZGVtaXJyb3IvdGhlbWUvYmxhY2tib2FyZC5jc3NcIjtcbmltcG9ydCBcImNvZGVtaXJyb3IvdGhlbWUvZGFyY3VsYS5jc3NcIjtcbmltcG9ydCBcImNvZGVtaXJyb3IvdGhlbWUvZHJhY3VsYS5jc3NcIjtcbmltcG9ydCBcImNvZGVtaXJyb3IvdGhlbWUvZWNsaXBzZS5jc3NcIjtcbmltcG9ydCBcImNvZGVtaXJyb3IvdGhlbWUvZWxlZ2FudC5jc3NcIjtcbmltcG9ydCBcImNvZGVtaXJyb3IvdGhlbWUvZXJsYW5nLWRhcmsuY3NzXCI7XG5pbXBvcnQgXCJjb2RlbWlycm9yL3RoZW1lL2lkZWEuY3NzXCI7XG5pbXBvcnQgXCJjb2RlbWlycm9yL3RoZW1lL2lzb3RvcGUuY3NzXCI7XG5pbXBvcnQgXCJjb2RlbWlycm9yL3RoZW1lL21pZG5pZ2h0LmNzc1wiO1xuaW1wb3J0IFwiY29kZW1pcnJvci90aGVtZS9sdWNhcmlvLmNzc1wiO1xuaW1wb3J0IFwiY29kZW1pcnJvci90aGVtZS9tYXRlcmlhbC5jc3NcIjtcbmltcG9ydCBcImNvZGVtaXJyb3IvdGhlbWUvbW9ub2thaS5jc3NcIjtcbmltcG9ydCBcImNvZGVtaXJyb3IvdGhlbWUvc29sYXJpemVkLmNzc1wiO1xuXG5pbXBvcnQgXCIuLi9zdHlsZS9tYWluLmNzc1wiO1xuaW1wb3J0IHJ1bkNhbGwgZnJvbSBcIi4vcnVuLXJlcXVlc3RcIjtcbmltcG9ydCBjb2RlTWlycm9yIGZyb20gXCIuL2VkaXRvclwiO1xuaW1wb3J0IGxhbmdSZXF1ZXN0IGZyb20gXCIuL2xhbmdzLXJlcXVlc3RcIjtcblxudmFyIGxhbmdzO1xuXG5jb2RlTWlycm9yLnNldFZhbHVlKFwiZGVmIG1haW4oKTpcXG5cXHRwcmludCgnSGVsbG8sIFdvcmxkIScpXFxuXFxuaWYgX19uYW1lX18gPT0gJ19fbWFpbl9fJzpcXG5cXHRtYWluKClcIik7XG5cbnZhciBsYW5ncztcbmxhbmdSZXF1ZXN0KClcbiAgICAudGhlbihmdW5jdGlvbiAocmVzdWx0KSB7XG4gICAgICAgIHZhciByZXMgPSBKU09OLnBhcnNlKHJlc3VsdCk7XG4gICAgICAgIGxhbmdzID0gcmVzLmxhbmd1YWdlcztcbiAgICB9KVxuICAgIC5jYXRjaChmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgIGxhbmdzID0gWydFcnJvciEnXTtcbiAgICAgICAgY29uc29sZS5sb2coXCJFcnJvciB3aGVuIGZldGNoaW5nIGxhbmd1YWdlczogXCIgKyBlcnIpO1xuICAgIH0pXG4gICAgLmZpbmFsbHkoZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgbGFuZ19tZW51ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2xhbmctc2VsZWN0Jyk7XG4gICAgICAgIGZvciAoY29uc3QgbGFuZyBvZiBsYW5ncykge1xuICAgICAgICAgICAgdmFyIGNoaWxkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnb3B0aW9uJyk7XG4gICAgICAgICAgICBjaGlsZC5pbm5lclRleHQgPSBsYW5nO1xuICAgICAgICAgICAgbGFuZ19tZW51LmFwcGVuZENoaWxkKGNoaWxkKTtcbiAgICAgICAgfVxuICAgICAgICB1cGRhdGVMYW5ndWFnZSgpO1xuICAgIH0pO1xuXG5mdW5jdGlvbiBzZWxlY3RUaGVtZSgpIHtcbiAgICBjb25zdCBzZWxlY3QgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndGhlbWUtc2VsZWN0Jyk7XG4gICAgdmFyIHRoZW1lID0gc2VsZWN0Lm9wdGlvbnNbc2VsZWN0LnNlbGVjdGVkSW5kZXhdLnRleHRDb250ZW50O1xuICAgIGNvZGVNaXJyb3Iuc2V0T3B0aW9uKCd0aGVtZScsIHRoZW1lKTtcbn1cblxuZnVuY3Rpb24gdXBkYXRlTGFuZ3VhZ2UoKSB7XG4gIGNvbnN0IHNlbGVjdG9yID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJsYW5nLXNlbGVjdFwiKTtcbiAgcmV0dXJuIHNlbGVjdG9yLm9wdGlvbnNbc2VsZWN0b3Iuc2VsZWN0ZWRJbmRleF0uaW5uZXJUZXh0O1xufVxuXG5jb25zdCBzdWJtaXRCdG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInN1Ym1pdC1idG5cIik7XG5zdWJtaXRCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHJ1bkNhbGwpO1xuXG5jb25zdCBzZWxlY3RvciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidGhlbWUtc2VsZWN0XCIpO1xuc2VsZWN0b3IuYWRkRXZlbnRMaXN0ZW5lcihcImNoYW5nZVwiLCBzZWxlY3RUaGVtZSk7XG5cbi8vIG9ubHkgc2luZ2xlIGV4cG9ydCBwZXIgLmpzIGZpbGUgYWxsb3dlZFxuLy8gZXhwb3J0aW5nIHRoaXMgc2luY2Ugd2Ugd2lsbCBuZWVkIGl0IHRvIHJldHJpZXZlIHRoZSBjdXJyZW50IGxhbmd1YWdlIGZyb20gdGhlIGRvY3VtZW50L0RPTVxuZXhwb3J0IGRlZmF1bHQgdXBkYXRlTGFuZ3VhZ2U7IiwiaW1wb3J0IGNvZGVNaXJyb3IgZnJvbSBcIi4vZWRpdG9yXCI7XG5pbXBvcnQgdXBkYXRlTGFuZ3VhZ2UgZnJvbSBcIi4vbG9hZFwiO1xuaW1wb3J0IFwiY29kZW1pcnJvci9saWIvY29kZW1pcnJvci5jc3NcIjtcblxuY29uc3QgdXJsID0gXCJodHRwczovL3J1bm5lci5mbHkuZGV2L2FwaS92MS9cIjtcbmNvbnN0IHJ1bl9lbmRwb2ludCA9IFwicnVuXCI7XG5cbmZ1bmN0aW9uIHJ1blJlcXVlc3QoKSB7XG4gIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgdmFyIHJlcSA9IHtcbiAgICAgIHNvdXJjZTogY29kZU1pcnJvci5nZXRWYWx1ZSgpLFxuICAgICAgbGFuZ3VhZ2U6IHVwZGF0ZUxhbmd1YWdlKCksXG4gICAgfTtcbiAgICBsZXQgeGhyID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG4gICAgeGhyLm9wZW4oXCJQT1NUXCIsIHVybCArIHJ1bl9lbmRwb2ludCk7XG4gICAgeGhyLnNldFJlcXVlc3RIZWFkZXIoXCJDb250ZW50LVR5cGVcIiwgXCJhcHBsaWNhdGlvbi9qc29uXCIpO1xuICAgIHhoci5vbmxvYWQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICBpZiAodGhpcy5zdGF0dXMgPj0gMjAwICYmIHRoaXMuc3RhdHVzIDwgNDAwKSB7XG4gICAgICAgIHJlc29sdmUoeGhyLnJlc3BvbnNlKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJlamVjdCh7XG4gICAgICAgICAgc3RhdHVzOiB0aGlzLnN0YXR1cyxcbiAgICAgICAgICBzdGF0dXNUZXh0OiB4aHIuc3RhdHVzVGV4dCxcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfTtcbiAgICB4aHIub25lcnJvciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIHJlamVjdCh7XG4gICAgICAgIHN0YXR1czogdGhpcy5zdGF0dXMsXG4gICAgICAgIHN0YXR1c1RleHQ6IHhoci5zdGF0dXNUZXh0LFxuICAgICAgfSk7XG4gICAgfTtcbiAgICB4aHIuc2VuZChKU09OLnN0cmluZ2lmeShyZXEpKTtcbiAgfSk7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIHJ1bkNhbGwoKSB7XG4gIGF3YWl0IHJ1blJlcXVlc3QoKVxuICAgIC50aGVuKGZ1bmN0aW9uIChyZXN1bHQpIHtcbiAgICAgIGxldCBvdXQgPSBKU09OLnBhcnNlKHJlc3VsdCk7XG4gICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInN0ZG91dC1maWVsZFwiKS5pbm5lckhUTUwgPVxuICAgICAgICBcIlN0ZG91dDogXCIgKyBvdXRbXCJzdGRvdXRcIl0ucmVwbGFjZSgvXFxuL2csIFwiPGJyPlwiKTtcbiAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic3RkZXJyLWZpZWxkXCIpLmlubmVySFRNTCA9XG4gICAgICAgIFwiU3RkZXJyOiBcIiArIG91dFtcInN0ZGVyclwiXTtcbiAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZXJyLWZpZWxkXCIpLmlubmVySFRNTCA9IFwiRXJyb3I6IFwiICsgb3V0W1wiZXJyb3JcIl07XG4gICAgfSlcbiAgICAuY2F0Y2goZnVuY3Rpb24gKGVycikge1xuICAgICAgY29uc29sZS5sb2coZXJyKTtcbiAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwib3V0cHV0LWZpZWxkXCIpLnRleHRDb250ZW50ID0gXCJFcnJvcjogXCIgKyBlcnI7XG4gICAgfSk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IHJ1bkNhbGw7XG4iLCIvLyBJbXBvcnRzXG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyBmcm9tIFwiLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL3NvdXJjZU1hcHMuanNcIjtcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18gZnJvbSBcIi4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanNcIjtcbnZhciBfX19DU1NfTE9BREVSX0VYUE9SVF9fXyA9IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fKTtcbi8vIE1vZHVsZVxuX19fQ1NTX0xPQURFUl9FWFBPUlRfX18ucHVzaChbbW9kdWxlLmlkLCBcIi5Db2RlTWlycm9yIHtcXG4gICAgYm9yZGVyOiA0cHggc29saWQgZ3JheTtcXG4gICAgbWFyZ2luOiBhdXRvO1xcbiAgICBoZWlnaHQ6IDUwMHB4O1xcbiAgICBmb250LXNpemU6IDE2cHg7XFxuICAgIHRleHQtYWxpZ246IGxlZnQ7IFxcbiAgICB0ZXh0LXNoYWRvdzogbm9uZTsgXFxufVxcblxcbmJ1dHRvbiB7XFxuICAgIGZvbnQtd2VpZ2h0OiBib2xkOyBcXG4gICAgcGFkZGluZzogNHB4OyBcXG4gICAgbWFyZ2luLXRvcDogNXB4OyBcXG59XFxuXFxuLnNlbGVjdG9ycyB7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGp1c3RpZnktY29udGVudDpzcGFjZS1iZXR3ZWVuO1xcbn1cXG5cXG5zZWxlY3Qge1xcblxcdGZvbnQtZmFtaWx5OiBtb25vc3BhY2U7XFxufVxcblxcbiN3cmFwcGVyIHtcXG4gICAgbWFyZ2luLXRvcDogNSU7IFxcbn1cXG5cXG5ib2R5IHtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogaW5kaWdvOyBcXG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xcbiAgICBmb250LWZhbWlseTogbW9ub3NwYWNlOyBcXG4gICAgY29sb3I6IHdoaXRlO1xcbn1cXG5cXG5hLCBhOnZpc2l0ZWQge1xcbiAgICBjb2xvcjogZ3JheTsgXFxuICAgIGZvbnQtd2VpZ2h0OiBib2xkOyBcXG59XFxuXFxuZm9vdGVyIHtcXG4gICAgZm9udC1zdHlsZTogaXRhbGljO1xcbiAgICBmb250LXNpemU6IDE0cHg7IFxcbiAgICBwYWRkaW5nOiAxMHB4OyBcXG59XFxuXFxuLm91dHB1dCB7XFxuICAgIHdpZHRoOiA2MCU7XFxuICAgIG1hcmdpbi10b3A6IDEwcHg7IFxcbn1cXG5cXG4uZmllbGQge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiBza3libHVlOyBcXG4gICAgYm9yZGVyOiAycHggc29saWQgYmx1ZTsgXFxuICAgIGJvcmRlci1yYWRpdXM6IDEwcHg7IFxcbiAgICAtbW96LWJvcmRlci1yYWRpdXM6IDEwcHg7IFxcbiAgICBjb2xvcjogYmxhY2s7IFxcbiAgICBtYXJnaW46IGF1dG87IFxcbiAgICB0ZXh0LWFsaWduOiBsZWZ0OyBcXG4gICAgcGFkZGluZzogNXB4OyBcXG59XFxuXFxuLmJveCB7XFxuICAgIHdpZHRoOiA5MCU7IFxcbn1cXG5cXG4jd3JhcHBlciB7XFxuICAgIHdpZHRoOiA1MCU7XFxuICAgIG1hcmdpbjogYXV0bztcXG59XFxuXCIsIFwiXCIse1widmVyc2lvblwiOjMsXCJzb3VyY2VzXCI6W1wid2VicGFjazovLy4vc3R5bGUvbWFpbi5jc3NcIl0sXCJuYW1lc1wiOltdLFwibWFwcGluZ3NcIjpcIkFBQUE7SUFDSSxzQkFBc0I7SUFDdEIsWUFBWTtJQUNaLGFBQWE7SUFDYixlQUFlO0lBQ2YsZ0JBQWdCO0lBQ2hCLGlCQUFpQjtBQUNyQjs7QUFFQTtJQUNJLGlCQUFpQjtJQUNqQixZQUFZO0lBQ1osZUFBZTtBQUNuQjs7QUFFQTtJQUNJLGFBQWE7SUFDYiw2QkFBNkI7QUFDakM7O0FBRUE7Q0FDQyxzQkFBc0I7QUFDdkI7O0FBRUE7SUFDSSxjQUFjO0FBQ2xCOztBQUVBO0lBQ0ksd0JBQXdCO0lBQ3hCLGtCQUFrQjtJQUNsQixzQkFBc0I7SUFDdEIsWUFBWTtBQUNoQjs7QUFFQTtJQUNJLFdBQVc7SUFDWCxpQkFBaUI7QUFDckI7O0FBRUE7SUFDSSxrQkFBa0I7SUFDbEIsZUFBZTtJQUNmLGFBQWE7QUFDakI7O0FBRUE7SUFDSSxVQUFVO0lBQ1YsZ0JBQWdCO0FBQ3BCOztBQUVBO0lBQ0kseUJBQXlCO0lBQ3pCLHNCQUFzQjtJQUN0QixtQkFBbUI7SUFDbkIsd0JBQXdCO0lBQ3hCLFlBQVk7SUFDWixZQUFZO0lBQ1osZ0JBQWdCO0lBQ2hCLFlBQVk7QUFDaEI7O0FBRUE7SUFDSSxVQUFVO0FBQ2Q7O0FBRUE7SUFDSSxVQUFVO0lBQ1YsWUFBWTtBQUNoQlwiLFwic291cmNlc0NvbnRlbnRcIjpbXCIuQ29kZU1pcnJvciB7XFxuICAgIGJvcmRlcjogNHB4IHNvbGlkIGdyYXk7XFxuICAgIG1hcmdpbjogYXV0bztcXG4gICAgaGVpZ2h0OiA1MDBweDtcXG4gICAgZm9udC1zaXplOiAxNnB4O1xcbiAgICB0ZXh0LWFsaWduOiBsZWZ0OyBcXG4gICAgdGV4dC1zaGFkb3c6IG5vbmU7IFxcbn1cXG5cXG5idXR0b24ge1xcbiAgICBmb250LXdlaWdodDogYm9sZDsgXFxuICAgIHBhZGRpbmc6IDRweDsgXFxuICAgIG1hcmdpbi10b3A6IDVweDsgXFxufVxcblxcbi5zZWxlY3RvcnMge1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6c3BhY2UtYmV0d2VlbjtcXG59XFxuXFxuc2VsZWN0IHtcXG5cXHRmb250LWZhbWlseTogbW9ub3NwYWNlO1xcbn1cXG5cXG4jd3JhcHBlciB7XFxuICAgIG1hcmdpbi10b3A6IDUlOyBcXG59XFxuXFxuYm9keSB7XFxuICAgIGJhY2tncm91bmQtY29sb3I6IGluZGlnbzsgXFxuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcXG4gICAgZm9udC1mYW1pbHk6IG1vbm9zcGFjZTsgXFxuICAgIGNvbG9yOiB3aGl0ZTtcXG59XFxuXFxuYSwgYTp2aXNpdGVkIHtcXG4gICAgY29sb3I6IGdyYXk7IFxcbiAgICBmb250LXdlaWdodDogYm9sZDsgXFxufVxcblxcbmZvb3RlciB7XFxuICAgIGZvbnQtc3R5bGU6IGl0YWxpYztcXG4gICAgZm9udC1zaXplOiAxNHB4OyBcXG4gICAgcGFkZGluZzogMTBweDsgXFxufVxcblxcbi5vdXRwdXQge1xcbiAgICB3aWR0aDogNjAlO1xcbiAgICBtYXJnaW4tdG9wOiAxMHB4OyBcXG59XFxuXFxuLmZpZWxkIHtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogc2t5Ymx1ZTsgXFxuICAgIGJvcmRlcjogMnB4IHNvbGlkIGJsdWU7IFxcbiAgICBib3JkZXItcmFkaXVzOiAxMHB4OyBcXG4gICAgLW1vei1ib3JkZXItcmFkaXVzOiAxMHB4OyBcXG4gICAgY29sb3I6IGJsYWNrOyBcXG4gICAgbWFyZ2luOiBhdXRvOyBcXG4gICAgdGV4dC1hbGlnbjogbGVmdDsgXFxuICAgIHBhZGRpbmc6IDVweDsgXFxufVxcblxcbi5ib3gge1xcbiAgICB3aWR0aDogOTAlOyBcXG59XFxuXFxuI3dyYXBwZXIge1xcbiAgICB3aWR0aDogNTAlO1xcbiAgICBtYXJnaW46IGF1dG87XFxufVxcblwiXSxcInNvdXJjZVJvb3RcIjpcIlwifV0pO1xuLy8gRXhwb3J0c1xuZXhwb3J0IGRlZmF1bHQgX19fQ1NTX0xPQURFUl9FWFBPUlRfX187XG4iLCJcbiAgICAgIGltcG9ydCBBUEkgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbmplY3RTdHlsZXNJbnRvU3R5bGVUYWcuanNcIjtcbiAgICAgIGltcG9ydCBkb21BUEkgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZURvbUFQSS5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydEZuIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0QnlTZWxlY3Rvci5qc1wiO1xuICAgICAgaW1wb3J0IHNldEF0dHJpYnV0ZXMgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRTdHlsZUVsZW1lbnQgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRTdHlsZUVsZW1lbnQuanNcIjtcbiAgICAgIGltcG9ydCBzdHlsZVRhZ1RyYW5zZm9ybUZuIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVUYWdUcmFuc2Zvcm0uanNcIjtcbiAgICAgIGltcG9ydCBjb250ZW50LCAqIGFzIG5hbWVkRXhwb3J0IGZyb20gXCIhIS4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vbWFpbi5jc3NcIjtcbiAgICAgIFxuICAgICAgXG5cbnZhciBvcHRpb25zID0ge307XG5cbm9wdGlvbnMuc3R5bGVUYWdUcmFuc2Zvcm0gPSBzdHlsZVRhZ1RyYW5zZm9ybUZuO1xub3B0aW9ucy5zZXRBdHRyaWJ1dGVzID0gc2V0QXR0cmlidXRlcztcblxuICAgICAgb3B0aW9ucy5pbnNlcnQgPSBpbnNlcnRGbi5iaW5kKG51bGwsIFwiaGVhZFwiKTtcbiAgICBcbm9wdGlvbnMuZG9tQVBJID0gZG9tQVBJO1xub3B0aW9ucy5pbnNlcnRTdHlsZUVsZW1lbnQgPSBpbnNlcnRTdHlsZUVsZW1lbnQ7XG5cbnZhciB1cGRhdGUgPSBBUEkoY29udGVudCwgb3B0aW9ucyk7XG5cblxuXG5leHBvcnQgKiBmcm9tIFwiISEuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL21haW4uY3NzXCI7XG4gICAgICAgZXhwb3J0IGRlZmF1bHQgY29udGVudCAmJiBjb250ZW50LmxvY2FscyA/IGNvbnRlbnQubG9jYWxzIDogdW5kZWZpbmVkO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9