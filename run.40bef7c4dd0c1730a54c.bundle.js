"use strict";
(self["webpackChunkrunner_web_frontend"] = self["webpackChunkrunner_web_frontend"] || []).push([["run"],{

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
        getSelectedLanguage();
    });

function selectTheme() {
    const select = document.getElementById('theme-select');
    var theme = select.options[select.selectedIndex].textContent;
    _editor__WEBPACK_IMPORTED_MODULE_22__["default"].setOption('theme', theme);
}

function getSelectedLanguage() {
  const selector = document.getElementById("lang-select");
  return selector.options[selector.selectedIndex].innerText;
}

const submitBtn = document.getElementById("submit-btn");
submitBtn.addEventListener("click", _run_request__WEBPACK_IMPORTED_MODULE_21__["default"]);

const selector = document.getElementById("theme-select");
selector.addEventListener("change", selectTheme);

// only single export per .js file allowed
// exporting this since we will need it to retrieve the current language from the document/DOM
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (getSelectedLanguage);

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
/******/ __webpack_require__.O(0, ["vendors-node_modules_codemirror_mode_javascript_javascript_js-node_modules_codemirror_mode_py-a44da3","vendors-node_modules_codemirror_lib_codemirror_js"], () => (__webpack_exec__("./js/run-request.js")));
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicnVuLjQwYmVmN2M0ZGQwYzE3MzBhNTRjLmJ1bmRsZS5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQSxpRUFBZSxXQUFXLEVBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQzVCWTtBQUNBO0FBQ0o7QUFDRjtBQUNjO0FBQ1I7O0FBRXZDO0FBQ3VDO0FBQ0U7QUFDQTtBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0k7QUFDUDtBQUNHO0FBQ0M7QUFDRDtBQUNDO0FBQ0Q7QUFDRTs7QUFFYjtBQUNTO0FBQ0Y7QUFDUTs7QUFFMUM7O0FBRUEseURBQW1COztBQUVuQiwyREFBVztBQUNYO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0EsSUFBSSwwREFBb0I7QUFDeEI7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxvQ0FBb0MscURBQU87O0FBRTNDO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGlFQUFlLG1CQUFtQjs7Ozs7Ozs7Ozs7Ozs7Ozs7QUN2RUE7QUFDTztBQUNGOztBQUV2QztBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGNBQWMsd0RBQW1CO0FBQ2pDLGdCQUFnQixpREFBbUI7QUFDbkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0EsR0FBRztBQUNIOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUEsaUVBQWUsT0FBTyxFQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDcER2QjtBQUMwRztBQUNqQjtBQUN6Riw4QkFBOEIsbUZBQTJCLENBQUMsNEZBQXFDO0FBQy9GO0FBQ0EsdURBQXVELDZCQUE2QixtQkFBbUIsb0JBQW9CLHNCQUFzQix3QkFBd0IseUJBQXlCLEdBQUcsWUFBWSx5QkFBeUIsb0JBQW9CLHVCQUF1QixHQUFHLGdCQUFnQixvQkFBb0Isb0NBQW9DLEdBQUcsWUFBWSwyQkFBMkIsR0FBRyxjQUFjLHNCQUFzQixHQUFHLFVBQVUsZ0NBQWdDLHlCQUF5Qiw4QkFBOEIsbUJBQW1CLEdBQUcsa0JBQWtCLG1CQUFtQix5QkFBeUIsR0FBRyxZQUFZLHlCQUF5Qix1QkFBdUIscUJBQXFCLEdBQUcsYUFBYSxpQkFBaUIsd0JBQXdCLEdBQUcsWUFBWSxpQ0FBaUMsOEJBQThCLDJCQUEyQixnQ0FBZ0Msb0JBQW9CLG9CQUFvQix3QkFBd0Isb0JBQW9CLEdBQUcsVUFBVSxrQkFBa0IsR0FBRyxjQUFjLGlCQUFpQixtQkFBbUIsR0FBRyxTQUFTLGlGQUFpRixZQUFZLFdBQVcsVUFBVSxVQUFVLFlBQVksYUFBYSxPQUFPLEtBQUssWUFBWSxXQUFXLFVBQVUsT0FBTyxLQUFLLFVBQVUsWUFBWSxPQUFPLEtBQUssWUFBWSxPQUFPLEtBQUssVUFBVSxPQUFPLEtBQUssWUFBWSxhQUFhLGFBQWEsV0FBVyxPQUFPLEtBQUssVUFBVSxZQUFZLE9BQU8sS0FBSyxZQUFZLFdBQVcsVUFBVSxPQUFPLEtBQUssVUFBVSxZQUFZLE9BQU8sS0FBSyxZQUFZLGFBQWEsYUFBYSxhQUFhLFdBQVcsVUFBVSxZQUFZLFdBQVcsT0FBTyxLQUFLLFVBQVUsTUFBTSxLQUFLLFVBQVUsVUFBVSx1Q0FBdUMsNkJBQTZCLG1CQUFtQixvQkFBb0Isc0JBQXNCLHdCQUF3Qix5QkFBeUIsR0FBRyxZQUFZLHlCQUF5QixvQkFBb0IsdUJBQXVCLEdBQUcsZ0JBQWdCLG9CQUFvQixvQ0FBb0MsR0FBRyxZQUFZLDJCQUEyQixHQUFHLGNBQWMsc0JBQXNCLEdBQUcsVUFBVSxnQ0FBZ0MseUJBQXlCLDhCQUE4QixtQkFBbUIsR0FBRyxrQkFBa0IsbUJBQW1CLHlCQUF5QixHQUFHLFlBQVkseUJBQXlCLHVCQUF1QixxQkFBcUIsR0FBRyxhQUFhLGlCQUFpQix3QkFBd0IsR0FBRyxZQUFZLGlDQUFpQyw4QkFBOEIsMkJBQTJCLGdDQUFnQyxvQkFBb0Isb0JBQW9CLHdCQUF3QixvQkFBb0IsR0FBRyxVQUFVLGtCQUFrQixHQUFHLGNBQWMsaUJBQWlCLG1CQUFtQixHQUFHLHFCQUFxQjtBQUNsc0Y7QUFDQSxpRUFBZSx1QkFBdUIsRUFBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNOdkMsTUFBK0Y7QUFDL0YsTUFBcUY7QUFDckYsTUFBNEY7QUFDNUYsTUFBK0c7QUFDL0csTUFBd0c7QUFDeEcsTUFBd0c7QUFDeEcsTUFBa0c7QUFDbEc7QUFDQTs7QUFFQTs7QUFFQSw0QkFBNEIscUdBQW1CO0FBQy9DLHdCQUF3QixrSEFBYTs7QUFFckMsdUJBQXVCLHVHQUFhO0FBQ3BDO0FBQ0EsaUJBQWlCLCtGQUFNO0FBQ3ZCLDZCQUE2QixzR0FBa0I7O0FBRS9DLGFBQWEsMEdBQUcsQ0FBQyxxRkFBTzs7OztBQUk0QztBQUNwRSxPQUFPLGlFQUFlLHFGQUFPLElBQUksNEZBQWMsR0FBRyw0RkFBYyxZQUFZLEVBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9ydW5uZXItd2ViLWZyb250ZW5kLy4vanMvbGFuZ3MtcmVxdWVzdC5qcyIsIndlYnBhY2s6Ly9ydW5uZXItd2ViLWZyb250ZW5kLy4vanMvbG9hZC5qcyIsIndlYnBhY2s6Ly9ydW5uZXItd2ViLWZyb250ZW5kLy4vanMvcnVuLXJlcXVlc3QuanMiLCJ3ZWJwYWNrOi8vcnVubmVyLXdlYi1mcm9udGVuZC8uL3N0eWxlL21haW4uY3NzIiwid2VicGFjazovL3J1bm5lci13ZWItZnJvbnRlbmQvLi9zdHlsZS9tYWluLmNzcz83ZjU0Il0sInNvdXJjZXNDb250ZW50IjpbIi8vIFRPRE86IG1ha2UgdGhpcyBhIGNvbmZpZ3VyYWJsZSBleHBvcnQgZnJvbSBsb2FkLmpzXG5jb25zdCB1cmwgPSBcImh0dHBzOi8vcnVubmVyLmZseS5kZXYvYXBpL3YxL1wiO1xuY29uc3QgbGFuZ19lbmRwb2ludCA9IFwibGFuZ3VhZ2VzXCI7XG5cbmZ1bmN0aW9uIGxhbmdSZXF1ZXN0KCkge1xuICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgIGxldCB4aHIgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcbiAgICB4aHIub3BlbihcIkdFVFwiLCB1cmwgKyBsYW5nX2VuZHBvaW50KTtcbiAgICB4aHIub25sb2FkID0gZnVuY3Rpb24gKCkge1xuICAgICAgaWYgKHRoaXMuc3RhdHVzID49IDIwMCAmJiB0aGlzLnN0YXR1cyA8IDQwMCkge1xuICAgICAgICByZXNvbHZlKHhoci5yZXNwb25zZSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZWplY3Qoe1xuICAgICAgICAgIHN0YXR1czogdGhpcy5zdGF0dXMsXG4gICAgICAgICAgc3RhdHVzVGV4dDogeGhyLnN0YXR1c1RleHQsXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH07XG4gICAgeGhyLm9uZXJyb3IgPSBmdW5jdGlvbiAoKSB7XG4gICAgICByZWplY3Qoe1xuICAgICAgICBzdGF0dXM6IHRoaXMuc3RhdHVzLFxuICAgICAgICBzdGF0dXNUZXh0OiB4aHIuc3RhdHVzVGV4dCxcbiAgICAgIH0pO1xuICAgIH07XG4gICAgeGhyLnNlbmQoKTtcbiAgfSk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGxhbmdSZXF1ZXN0O1xuIiwiaW1wb3J0IFwiY29kZW1pcnJvci9saWIvY29kZW1pcnJvci5jc3NcIjtcbmltcG9ydCBcImNvZGVtaXJyb3IvdGhlbWUvbWF0ZXJpYWwuY3NzXCI7XG5pbXBvcnQgXCJjb2RlbWlycm9yL3RoZW1lL25lYXQuY3NzXCI7XG5pbXBvcnQgXCJjb2RlbWlycm9yL21vZGUveG1sL3htbFwiO1xuaW1wb3J0IFwiY29kZW1pcnJvci9tb2RlL2phdmFzY3JpcHQvamF2YXNjcmlwdFwiO1xuaW1wb3J0IFwiY29kZW1pcnJvci9tb2RlL3B5dGhvbi9weXRob25cIjtcblxuLy8gb3RoZXIgdGhlbWVzXG5pbXBvcnQgXCJjb2RlbWlycm9yL3RoZW1lLzMwMjQtZGF5LmNzc1wiO1xuaW1wb3J0IFwiY29kZW1pcnJvci90aGVtZS8zMDI0LW5pZ2h0LmNzc1wiO1xuaW1wb3J0IFwiY29kZW1pcnJvci90aGVtZS9ibGFja2JvYXJkLmNzc1wiO1xuaW1wb3J0IFwiY29kZW1pcnJvci90aGVtZS9kYXJjdWxhLmNzc1wiO1xuaW1wb3J0IFwiY29kZW1pcnJvci90aGVtZS9kcmFjdWxhLmNzc1wiO1xuaW1wb3J0IFwiY29kZW1pcnJvci90aGVtZS9lY2xpcHNlLmNzc1wiO1xuaW1wb3J0IFwiY29kZW1pcnJvci90aGVtZS9lbGVnYW50LmNzc1wiO1xuaW1wb3J0IFwiY29kZW1pcnJvci90aGVtZS9lcmxhbmctZGFyay5jc3NcIjtcbmltcG9ydCBcImNvZGVtaXJyb3IvdGhlbWUvaWRlYS5jc3NcIjtcbmltcG9ydCBcImNvZGVtaXJyb3IvdGhlbWUvaXNvdG9wZS5jc3NcIjtcbmltcG9ydCBcImNvZGVtaXJyb3IvdGhlbWUvbWlkbmlnaHQuY3NzXCI7XG5pbXBvcnQgXCJjb2RlbWlycm9yL3RoZW1lL2x1Y2FyaW8uY3NzXCI7XG5pbXBvcnQgXCJjb2RlbWlycm9yL3RoZW1lL21hdGVyaWFsLmNzc1wiO1xuaW1wb3J0IFwiY29kZW1pcnJvci90aGVtZS9tb25va2FpLmNzc1wiO1xuaW1wb3J0IFwiY29kZW1pcnJvci90aGVtZS9zb2xhcml6ZWQuY3NzXCI7XG5cbmltcG9ydCBcIi4uL3N0eWxlL21haW4uY3NzXCI7XG5pbXBvcnQgcnVuQ2FsbCBmcm9tIFwiLi9ydW4tcmVxdWVzdFwiO1xuaW1wb3J0IGNvZGVNaXJyb3IgZnJvbSBcIi4vZWRpdG9yXCI7XG5pbXBvcnQgbGFuZ1JlcXVlc3QgZnJvbSBcIi4vbGFuZ3MtcmVxdWVzdFwiO1xuXG52YXIgbGFuZ3M7XG5cbmNvZGVNaXJyb3Iuc2V0VmFsdWUoXCJkZWYgbWFpbigpOlxcblxcdHByaW50KCdIZWxsbywgV29ybGQhJylcXG5cXG5pZiBfX25hbWVfXyA9PSAnX19tYWluX18nOlxcblxcdG1haW4oKVwiKTtcblxubGFuZ1JlcXVlc3QoKVxuICAgIC50aGVuKGZ1bmN0aW9uIChyZXN1bHQpIHtcbiAgICAgICAgdmFyIHJlcyA9IEpTT04ucGFyc2UocmVzdWx0KTtcbiAgICAgICAgbGFuZ3MgPSByZXMubGFuZ3VhZ2VzO1xuICAgIH0pXG4gICAgLmNhdGNoKGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgbGFuZ3MgPSBbJ0Vycm9yISddO1xuICAgICAgICBjb25zb2xlLmxvZyhcIkVycm9yIHdoZW4gZmV0Y2hpbmcgbGFuZ3VhZ2VzOiBcIiArIGVycik7XG4gICAgfSlcbiAgICAuZmluYWxseShmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBsYW5nX21lbnUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbGFuZy1zZWxlY3QnKTtcbiAgICAgICAgZm9yIChjb25zdCBsYW5nIG9mIGxhbmdzKSB7XG4gICAgICAgICAgICB2YXIgY2hpbGQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdvcHRpb24nKTtcbiAgICAgICAgICAgIGNoaWxkLmlubmVyVGV4dCA9IGxhbmc7XG4gICAgICAgICAgICBsYW5nX21lbnUuYXBwZW5kQ2hpbGQoY2hpbGQpO1xuICAgICAgICB9XG4gICAgICAgIGdldFNlbGVjdGVkTGFuZ3VhZ2UoKTtcbiAgICB9KTtcblxuZnVuY3Rpb24gc2VsZWN0VGhlbWUoKSB7XG4gICAgY29uc3Qgc2VsZWN0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3RoZW1lLXNlbGVjdCcpO1xuICAgIHZhciB0aGVtZSA9IHNlbGVjdC5vcHRpb25zW3NlbGVjdC5zZWxlY3RlZEluZGV4XS50ZXh0Q29udGVudDtcbiAgICBjb2RlTWlycm9yLnNldE9wdGlvbigndGhlbWUnLCB0aGVtZSk7XG59XG5cbmZ1bmN0aW9uIGdldFNlbGVjdGVkTGFuZ3VhZ2UoKSB7XG4gIGNvbnN0IHNlbGVjdG9yID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJsYW5nLXNlbGVjdFwiKTtcbiAgcmV0dXJuIHNlbGVjdG9yLm9wdGlvbnNbc2VsZWN0b3Iuc2VsZWN0ZWRJbmRleF0uaW5uZXJUZXh0O1xufVxuXG5jb25zdCBzdWJtaXRCdG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInN1Ym1pdC1idG5cIik7XG5zdWJtaXRCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHJ1bkNhbGwpO1xuXG5jb25zdCBzZWxlY3RvciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidGhlbWUtc2VsZWN0XCIpO1xuc2VsZWN0b3IuYWRkRXZlbnRMaXN0ZW5lcihcImNoYW5nZVwiLCBzZWxlY3RUaGVtZSk7XG5cbi8vIG9ubHkgc2luZ2xlIGV4cG9ydCBwZXIgLmpzIGZpbGUgYWxsb3dlZFxuLy8gZXhwb3J0aW5nIHRoaXMgc2luY2Ugd2Ugd2lsbCBuZWVkIGl0IHRvIHJldHJpZXZlIHRoZSBjdXJyZW50IGxhbmd1YWdlIGZyb20gdGhlIGRvY3VtZW50L0RPTVxuZXhwb3J0IGRlZmF1bHQgZ2V0U2VsZWN0ZWRMYW5ndWFnZTsiLCJpbXBvcnQgY29kZU1pcnJvciBmcm9tIFwiLi9lZGl0b3JcIjtcbmltcG9ydCBnZXRTZWxlY3RlZExhbmd1YWdlIGZyb20gXCIuL2xvYWRcIjtcbmltcG9ydCBcImNvZGVtaXJyb3IvbGliL2NvZGVtaXJyb3IuY3NzXCI7XG5cbmNvbnN0IHVybCA9IFwiaHR0cHM6Ly9ydW5uZXIuZmx5LmRldi9hcGkvdjEvXCI7XG5jb25zdCBydW5fZW5kcG9pbnQgPSBcInJ1blwiO1xuXG5mdW5jdGlvbiBydW5SZXF1ZXN0KCkge1xuICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgIHZhciByZXEgPSB7XG4gICAgICBzb3VyY2U6IGNvZGVNaXJyb3IuZ2V0VmFsdWUoKSxcbiAgICAgIGxhbmd1YWdlOiBnZXRTZWxlY3RlZExhbmd1YWdlKCksXG4gICAgfTtcbiAgICBsZXQgeGhyID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG4gICAgeGhyLm9wZW4oXCJQT1NUXCIsIHVybCArIHJ1bl9lbmRwb2ludCk7XG4gICAgeGhyLnNldFJlcXVlc3RIZWFkZXIoXCJDb250ZW50LVR5cGVcIiwgXCJhcHBsaWNhdGlvbi9qc29uXCIpO1xuICAgIHhoci5vbmxvYWQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICBpZiAodGhpcy5zdGF0dXMgPj0gMjAwICYmIHRoaXMuc3RhdHVzIDwgNDAwKSB7XG4gICAgICAgIHJlc29sdmUoeGhyLnJlc3BvbnNlKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJlamVjdCh7XG4gICAgICAgICAgc3RhdHVzOiB0aGlzLnN0YXR1cyxcbiAgICAgICAgICBzdGF0dXNUZXh0OiB4aHIuc3RhdHVzVGV4dCxcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfTtcbiAgICB4aHIub25lcnJvciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIHJlamVjdCh7XG4gICAgICAgIHN0YXR1czogdGhpcy5zdGF0dXMsXG4gICAgICAgIHN0YXR1c1RleHQ6IHhoci5zdGF0dXNUZXh0LFxuICAgICAgfSk7XG4gICAgfTtcbiAgICB4aHIuc2VuZChKU09OLnN0cmluZ2lmeShyZXEpKTtcbiAgfSk7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIHJ1bkNhbGwoKSB7XG4gIGF3YWl0IHJ1blJlcXVlc3QoKVxuICAgIC50aGVuKGZ1bmN0aW9uIChyZXN1bHQpIHtcbiAgICAgIGxldCBvdXQgPSBKU09OLnBhcnNlKHJlc3VsdCk7XG4gICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInN0ZG91dC1maWVsZFwiKS5pbm5lckhUTUwgPVxuICAgICAgICBcIlN0ZG91dDogXCIgKyBvdXRbXCJzdGRvdXRcIl0ucmVwbGFjZSgvXFxuL2csIFwiPGJyPlwiKTtcbiAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic3RkZXJyLWZpZWxkXCIpLmlubmVySFRNTCA9XG4gICAgICAgIFwiU3RkZXJyOiBcIiArIG91dFtcInN0ZGVyclwiXTtcbiAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZXJyLWZpZWxkXCIpLmlubmVySFRNTCA9IFwiRXJyb3I6IFwiICsgb3V0W1wiZXJyb3JcIl07XG4gICAgfSlcbiAgICAuY2F0Y2goZnVuY3Rpb24gKGVycikge1xuICAgICAgY29uc29sZS5sb2coZXJyKTtcbiAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwib3V0cHV0LWZpZWxkXCIpLnRleHRDb250ZW50ID0gXCJFcnJvcjogXCIgKyBlcnI7XG4gICAgfSk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IHJ1bkNhbGw7XG4iLCIvLyBJbXBvcnRzXG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyBmcm9tIFwiLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL3NvdXJjZU1hcHMuanNcIjtcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18gZnJvbSBcIi4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanNcIjtcbnZhciBfX19DU1NfTE9BREVSX0VYUE9SVF9fXyA9IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fKTtcbi8vIE1vZHVsZVxuX19fQ1NTX0xPQURFUl9FWFBPUlRfX18ucHVzaChbbW9kdWxlLmlkLCBcIi5Db2RlTWlycm9yIHtcXG4gICAgYm9yZGVyOiA0cHggc29saWQgZ3JheTtcXG4gICAgbWFyZ2luOiBhdXRvO1xcbiAgICBoZWlnaHQ6IDUwMHB4O1xcbiAgICBmb250LXNpemU6IDE2cHg7XFxuICAgIHRleHQtYWxpZ246IGxlZnQ7IFxcbiAgICB0ZXh0LXNoYWRvdzogbm9uZTsgXFxufVxcblxcbmJ1dHRvbiB7XFxuICAgIGZvbnQtd2VpZ2h0OiBib2xkOyBcXG4gICAgcGFkZGluZzogNHB4OyBcXG4gICAgbWFyZ2luLXRvcDogNXB4OyBcXG59XFxuXFxuLnNlbGVjdG9ycyB7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGp1c3RpZnktY29udGVudDpzcGFjZS1iZXR3ZWVuO1xcbn1cXG5cXG5zZWxlY3Qge1xcblxcdGZvbnQtZmFtaWx5OiBtb25vc3BhY2U7XFxufVxcblxcbiN3cmFwcGVyIHtcXG4gICAgbWFyZ2luLXRvcDogNSU7IFxcbn1cXG5cXG5ib2R5IHtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogaW5kaWdvOyBcXG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xcbiAgICBmb250LWZhbWlseTogbW9ub3NwYWNlOyBcXG4gICAgY29sb3I6IHdoaXRlO1xcbn1cXG5cXG5hLCBhOnZpc2l0ZWQge1xcbiAgICBjb2xvcjogZ3JheTsgXFxuICAgIGZvbnQtd2VpZ2h0OiBib2xkOyBcXG59XFxuXFxuZm9vdGVyIHtcXG4gICAgZm9udC1zdHlsZTogaXRhbGljO1xcbiAgICBmb250LXNpemU6IDE0cHg7IFxcbiAgICBwYWRkaW5nOiAxMHB4OyBcXG59XFxuXFxuLm91dHB1dCB7XFxuICAgIHdpZHRoOiA2MCU7XFxuICAgIG1hcmdpbi10b3A6IDEwcHg7IFxcbn1cXG5cXG4uZmllbGQge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiBza3libHVlOyBcXG4gICAgYm9yZGVyOiAycHggc29saWQgYmx1ZTsgXFxuICAgIGJvcmRlci1yYWRpdXM6IDEwcHg7IFxcbiAgICAtbW96LWJvcmRlci1yYWRpdXM6IDEwcHg7IFxcbiAgICBjb2xvcjogYmxhY2s7IFxcbiAgICBtYXJnaW46IGF1dG87IFxcbiAgICB0ZXh0LWFsaWduOiBsZWZ0OyBcXG4gICAgcGFkZGluZzogNXB4OyBcXG59XFxuXFxuLmJveCB7XFxuICAgIHdpZHRoOiA5MCU7IFxcbn1cXG5cXG4jd3JhcHBlciB7XFxuICAgIHdpZHRoOiA1MCU7XFxuICAgIG1hcmdpbjogYXV0bztcXG59XFxuXCIsIFwiXCIse1widmVyc2lvblwiOjMsXCJzb3VyY2VzXCI6W1wid2VicGFjazovLy4vc3R5bGUvbWFpbi5jc3NcIl0sXCJuYW1lc1wiOltdLFwibWFwcGluZ3NcIjpcIkFBQUE7SUFDSSxzQkFBc0I7SUFDdEIsWUFBWTtJQUNaLGFBQWE7SUFDYixlQUFlO0lBQ2YsZ0JBQWdCO0lBQ2hCLGlCQUFpQjtBQUNyQjs7QUFFQTtJQUNJLGlCQUFpQjtJQUNqQixZQUFZO0lBQ1osZUFBZTtBQUNuQjs7QUFFQTtJQUNJLGFBQWE7SUFDYiw2QkFBNkI7QUFDakM7O0FBRUE7Q0FDQyxzQkFBc0I7QUFDdkI7O0FBRUE7SUFDSSxjQUFjO0FBQ2xCOztBQUVBO0lBQ0ksd0JBQXdCO0lBQ3hCLGtCQUFrQjtJQUNsQixzQkFBc0I7SUFDdEIsWUFBWTtBQUNoQjs7QUFFQTtJQUNJLFdBQVc7SUFDWCxpQkFBaUI7QUFDckI7O0FBRUE7SUFDSSxrQkFBa0I7SUFDbEIsZUFBZTtJQUNmLGFBQWE7QUFDakI7O0FBRUE7SUFDSSxVQUFVO0lBQ1YsZ0JBQWdCO0FBQ3BCOztBQUVBO0lBQ0kseUJBQXlCO0lBQ3pCLHNCQUFzQjtJQUN0QixtQkFBbUI7SUFDbkIsd0JBQXdCO0lBQ3hCLFlBQVk7SUFDWixZQUFZO0lBQ1osZ0JBQWdCO0lBQ2hCLFlBQVk7QUFDaEI7O0FBRUE7SUFDSSxVQUFVO0FBQ2Q7O0FBRUE7SUFDSSxVQUFVO0lBQ1YsWUFBWTtBQUNoQlwiLFwic291cmNlc0NvbnRlbnRcIjpbXCIuQ29kZU1pcnJvciB7XFxuICAgIGJvcmRlcjogNHB4IHNvbGlkIGdyYXk7XFxuICAgIG1hcmdpbjogYXV0bztcXG4gICAgaGVpZ2h0OiA1MDBweDtcXG4gICAgZm9udC1zaXplOiAxNnB4O1xcbiAgICB0ZXh0LWFsaWduOiBsZWZ0OyBcXG4gICAgdGV4dC1zaGFkb3c6IG5vbmU7IFxcbn1cXG5cXG5idXR0b24ge1xcbiAgICBmb250LXdlaWdodDogYm9sZDsgXFxuICAgIHBhZGRpbmc6IDRweDsgXFxuICAgIG1hcmdpbi10b3A6IDVweDsgXFxufVxcblxcbi5zZWxlY3RvcnMge1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6c3BhY2UtYmV0d2VlbjtcXG59XFxuXFxuc2VsZWN0IHtcXG5cXHRmb250LWZhbWlseTogbW9ub3NwYWNlO1xcbn1cXG5cXG4jd3JhcHBlciB7XFxuICAgIG1hcmdpbi10b3A6IDUlOyBcXG59XFxuXFxuYm9keSB7XFxuICAgIGJhY2tncm91bmQtY29sb3I6IGluZGlnbzsgXFxuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcXG4gICAgZm9udC1mYW1pbHk6IG1vbm9zcGFjZTsgXFxuICAgIGNvbG9yOiB3aGl0ZTtcXG59XFxuXFxuYSwgYTp2aXNpdGVkIHtcXG4gICAgY29sb3I6IGdyYXk7IFxcbiAgICBmb250LXdlaWdodDogYm9sZDsgXFxufVxcblxcbmZvb3RlciB7XFxuICAgIGZvbnQtc3R5bGU6IGl0YWxpYztcXG4gICAgZm9udC1zaXplOiAxNHB4OyBcXG4gICAgcGFkZGluZzogMTBweDsgXFxufVxcblxcbi5vdXRwdXQge1xcbiAgICB3aWR0aDogNjAlO1xcbiAgICBtYXJnaW4tdG9wOiAxMHB4OyBcXG59XFxuXFxuLmZpZWxkIHtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogc2t5Ymx1ZTsgXFxuICAgIGJvcmRlcjogMnB4IHNvbGlkIGJsdWU7IFxcbiAgICBib3JkZXItcmFkaXVzOiAxMHB4OyBcXG4gICAgLW1vei1ib3JkZXItcmFkaXVzOiAxMHB4OyBcXG4gICAgY29sb3I6IGJsYWNrOyBcXG4gICAgbWFyZ2luOiBhdXRvOyBcXG4gICAgdGV4dC1hbGlnbjogbGVmdDsgXFxuICAgIHBhZGRpbmc6IDVweDsgXFxufVxcblxcbi5ib3gge1xcbiAgICB3aWR0aDogOTAlOyBcXG59XFxuXFxuI3dyYXBwZXIge1xcbiAgICB3aWR0aDogNTAlO1xcbiAgICBtYXJnaW46IGF1dG87XFxufVxcblwiXSxcInNvdXJjZVJvb3RcIjpcIlwifV0pO1xuLy8gRXhwb3J0c1xuZXhwb3J0IGRlZmF1bHQgX19fQ1NTX0xPQURFUl9FWFBPUlRfX187XG4iLCJcbiAgICAgIGltcG9ydCBBUEkgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbmplY3RTdHlsZXNJbnRvU3R5bGVUYWcuanNcIjtcbiAgICAgIGltcG9ydCBkb21BUEkgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZURvbUFQSS5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydEZuIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0QnlTZWxlY3Rvci5qc1wiO1xuICAgICAgaW1wb3J0IHNldEF0dHJpYnV0ZXMgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRTdHlsZUVsZW1lbnQgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRTdHlsZUVsZW1lbnQuanNcIjtcbiAgICAgIGltcG9ydCBzdHlsZVRhZ1RyYW5zZm9ybUZuIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVUYWdUcmFuc2Zvcm0uanNcIjtcbiAgICAgIGltcG9ydCBjb250ZW50LCAqIGFzIG5hbWVkRXhwb3J0IGZyb20gXCIhIS4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vbWFpbi5jc3NcIjtcbiAgICAgIFxuICAgICAgXG5cbnZhciBvcHRpb25zID0ge307XG5cbm9wdGlvbnMuc3R5bGVUYWdUcmFuc2Zvcm0gPSBzdHlsZVRhZ1RyYW5zZm9ybUZuO1xub3B0aW9ucy5zZXRBdHRyaWJ1dGVzID0gc2V0QXR0cmlidXRlcztcblxuICAgICAgb3B0aW9ucy5pbnNlcnQgPSBpbnNlcnRGbi5iaW5kKG51bGwsIFwiaGVhZFwiKTtcbiAgICBcbm9wdGlvbnMuZG9tQVBJID0gZG9tQVBJO1xub3B0aW9ucy5pbnNlcnRTdHlsZUVsZW1lbnQgPSBpbnNlcnRTdHlsZUVsZW1lbnQ7XG5cbnZhciB1cGRhdGUgPSBBUEkoY29udGVudCwgb3B0aW9ucyk7XG5cblxuXG5leHBvcnQgKiBmcm9tIFwiISEuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL21haW4uY3NzXCI7XG4gICAgICAgZXhwb3J0IGRlZmF1bHQgY29udGVudCAmJiBjb250ZW50LmxvY2FscyA/IGNvbnRlbnQubG9jYWxzIDogdW5kZWZpbmVkO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9