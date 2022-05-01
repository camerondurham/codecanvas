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
/******/ __webpack_require__.O(0, ["vendors-node_modules_codemirror_mode_javascript_javascript_js-node_modules_codemirror_mode_py-a44da3","vendors-node_modules_codemirror_lib_codemirror_js"], () => (__webpack_exec__("./js/run-request.js")));
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicnVuLjRmN2I5ODNmNjA1ZjQwZDhiNWIzLmJ1bmRsZS5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQSxpRUFBZSxXQUFXLEVBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQzVCWTtBQUNBO0FBQ0o7QUFDRjtBQUNjO0FBQ1I7O0FBRXZDO0FBQ3VDO0FBQ0U7QUFDQTtBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0k7QUFDUDtBQUNHO0FBQ0M7QUFDRDtBQUNDO0FBQ0Q7QUFDRTs7QUFFYjtBQUNTO0FBQ0Y7QUFDUTs7QUFFMUM7O0FBRUEseURBQW1COztBQUVuQjtBQUNBLDJEQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQSxJQUFJLDBEQUFvQjtBQUN4Qjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLG9DQUFvQyxxREFBTzs7QUFFM0M7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsaUVBQWUsY0FBYzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUN4RUs7QUFDRTtBQUNHOztBQUV2QztBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGNBQWMsd0RBQW1CO0FBQ2pDLGdCQUFnQixpREFBYztBQUM5QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQSxpRUFBZSxPQUFPLEVBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNwRHZCO0FBQzBHO0FBQ2pCO0FBQ3pGLDhCQUE4QixtRkFBMkIsQ0FBQyw0RkFBcUM7QUFDL0Y7QUFDQSx1REFBdUQsNkJBQTZCLG1CQUFtQixvQkFBb0Isc0JBQXNCLHdCQUF3Qix5QkFBeUIsR0FBRyxZQUFZLHlCQUF5QixvQkFBb0IsdUJBQXVCLEdBQUcsZ0JBQWdCLG9CQUFvQixvQ0FBb0MsR0FBRyxZQUFZLDJCQUEyQixHQUFHLGNBQWMsc0JBQXNCLEdBQUcsVUFBVSxnQ0FBZ0MseUJBQXlCLDhCQUE4QixtQkFBbUIsR0FBRyxrQkFBa0IsbUJBQW1CLHlCQUF5QixHQUFHLFlBQVkseUJBQXlCLHVCQUF1QixxQkFBcUIsR0FBRyxhQUFhLGlCQUFpQix3QkFBd0IsR0FBRyxZQUFZLGlDQUFpQyw4QkFBOEIsMkJBQTJCLGdDQUFnQyxvQkFBb0Isb0JBQW9CLHdCQUF3QixvQkFBb0IsR0FBRyxVQUFVLGtCQUFrQixHQUFHLGNBQWMsaUJBQWlCLG1CQUFtQixHQUFHLFNBQVMsaUZBQWlGLFlBQVksV0FBVyxVQUFVLFVBQVUsWUFBWSxhQUFhLE9BQU8sS0FBSyxZQUFZLFdBQVcsVUFBVSxPQUFPLEtBQUssVUFBVSxZQUFZLE9BQU8sS0FBSyxZQUFZLE9BQU8sS0FBSyxVQUFVLE9BQU8sS0FBSyxZQUFZLGFBQWEsYUFBYSxXQUFXLE9BQU8sS0FBSyxVQUFVLFlBQVksT0FBTyxLQUFLLFlBQVksV0FBVyxVQUFVLE9BQU8sS0FBSyxVQUFVLFlBQVksT0FBTyxLQUFLLFlBQVksYUFBYSxhQUFhLGFBQWEsV0FBVyxVQUFVLFlBQVksV0FBVyxPQUFPLEtBQUssVUFBVSxNQUFNLEtBQUssVUFBVSxVQUFVLHVDQUF1Qyw2QkFBNkIsbUJBQW1CLG9CQUFvQixzQkFBc0Isd0JBQXdCLHlCQUF5QixHQUFHLFlBQVkseUJBQXlCLG9CQUFvQix1QkFBdUIsR0FBRyxnQkFBZ0Isb0JBQW9CLG9DQUFvQyxHQUFHLFlBQVksMkJBQTJCLEdBQUcsY0FBYyxzQkFBc0IsR0FBRyxVQUFVLGdDQUFnQyx5QkFBeUIsOEJBQThCLG1CQUFtQixHQUFHLGtCQUFrQixtQkFBbUIseUJBQXlCLEdBQUcsWUFBWSx5QkFBeUIsdUJBQXVCLHFCQUFxQixHQUFHLGFBQWEsaUJBQWlCLHdCQUF3QixHQUFHLFlBQVksaUNBQWlDLDhCQUE4QiwyQkFBMkIsZ0NBQWdDLG9CQUFvQixvQkFBb0Isd0JBQXdCLG9CQUFvQixHQUFHLFVBQVUsa0JBQWtCLEdBQUcsY0FBYyxpQkFBaUIsbUJBQW1CLEdBQUcscUJBQXFCO0FBQ2xzRjtBQUNBLGlFQUFlLHVCQUF1QixFQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ052QyxNQUErRjtBQUMvRixNQUFxRjtBQUNyRixNQUE0RjtBQUM1RixNQUErRztBQUMvRyxNQUF3RztBQUN4RyxNQUF3RztBQUN4RyxNQUFrRztBQUNsRztBQUNBOztBQUVBOztBQUVBLDRCQUE0QixxR0FBbUI7QUFDL0Msd0JBQXdCLGtIQUFhOztBQUVyQyx1QkFBdUIsdUdBQWE7QUFDcEM7QUFDQSxpQkFBaUIsK0ZBQU07QUFDdkIsNkJBQTZCLHNHQUFrQjs7QUFFL0MsYUFBYSwwR0FBRyxDQUFDLHFGQUFPOzs7O0FBSTRDO0FBQ3BFLE9BQU8saUVBQWUscUZBQU8sSUFBSSw0RkFBYyxHQUFHLDRGQUFjLFlBQVksRUFBQyIsInNvdXJjZXMiOlsid2VicGFjazovL3J1bm5lci13ZWItZnJvbnRlbmQvLi9qcy9sYW5ncy1yZXF1ZXN0LmpzIiwid2VicGFjazovL3J1bm5lci13ZWItZnJvbnRlbmQvLi9qcy9sb2FkLmpzIiwid2VicGFjazovL3J1bm5lci13ZWItZnJvbnRlbmQvLi9qcy9ydW4tcmVxdWVzdC5qcyIsIndlYnBhY2s6Ly9ydW5uZXItd2ViLWZyb250ZW5kLy4vc3R5bGUvbWFpbi5jc3MiLCJ3ZWJwYWNrOi8vcnVubmVyLXdlYi1mcm9udGVuZC8uL3N0eWxlL21haW4uY3NzPzdmNTQiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gVE9ETzogbWFrZSB0aGlzIGEgY29uZmlndXJhYmxlIGV4cG9ydCBmcm9tIGxvYWQuanNcbmNvbnN0IHVybCA9IFwiaHR0cHM6Ly9ydW5uZXIuZmx5LmRldi9hcGkvdjEvXCI7XG5jb25zdCBsYW5nX2VuZHBvaW50ID0gXCJsYW5ndWFnZXNcIjtcblxuZnVuY3Rpb24gbGFuZ1JlcXVlc3QoKSB7XG4gIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgbGV0IHhociA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuICAgIHhoci5vcGVuKFwiR0VUXCIsIHVybCArIGxhbmdfZW5kcG9pbnQpO1xuICAgIHhoci5vbmxvYWQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICBpZiAodGhpcy5zdGF0dXMgPj0gMjAwICYmIHRoaXMuc3RhdHVzIDwgNDAwKSB7XG4gICAgICAgIHJlc29sdmUoeGhyLnJlc3BvbnNlKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJlamVjdCh7XG4gICAgICAgICAgc3RhdHVzOiB0aGlzLnN0YXR1cyxcbiAgICAgICAgICBzdGF0dXNUZXh0OiB4aHIuc3RhdHVzVGV4dCxcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfTtcbiAgICB4aHIub25lcnJvciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIHJlamVjdCh7XG4gICAgICAgIHN0YXR1czogdGhpcy5zdGF0dXMsXG4gICAgICAgIHN0YXR1c1RleHQ6IHhoci5zdGF0dXNUZXh0LFxuICAgICAgfSk7XG4gICAgfTtcbiAgICB4aHIuc2VuZCgpO1xuICB9KTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgbGFuZ1JlcXVlc3Q7XG4iLCJpbXBvcnQgXCJjb2RlbWlycm9yL2xpYi9jb2RlbWlycm9yLmNzc1wiO1xuaW1wb3J0IFwiY29kZW1pcnJvci90aGVtZS9tYXRlcmlhbC5jc3NcIjtcbmltcG9ydCBcImNvZGVtaXJyb3IvdGhlbWUvbmVhdC5jc3NcIjtcbmltcG9ydCBcImNvZGVtaXJyb3IvbW9kZS94bWwveG1sXCI7XG5pbXBvcnQgXCJjb2RlbWlycm9yL21vZGUvamF2YXNjcmlwdC9qYXZhc2NyaXB0XCI7XG5pbXBvcnQgXCJjb2RlbWlycm9yL21vZGUvcHl0aG9uL3B5dGhvblwiO1xuXG4vLyBvdGhlciB0aGVtZXNcbmltcG9ydCBcImNvZGVtaXJyb3IvdGhlbWUvMzAyNC1kYXkuY3NzXCI7XG5pbXBvcnQgXCJjb2RlbWlycm9yL3RoZW1lLzMwMjQtbmlnaHQuY3NzXCI7XG5pbXBvcnQgXCJjb2RlbWlycm9yL3RoZW1lL2JsYWNrYm9hcmQuY3NzXCI7XG5pbXBvcnQgXCJjb2RlbWlycm9yL3RoZW1lL2RhcmN1bGEuY3NzXCI7XG5pbXBvcnQgXCJjb2RlbWlycm9yL3RoZW1lL2RyYWN1bGEuY3NzXCI7XG5pbXBvcnQgXCJjb2RlbWlycm9yL3RoZW1lL2VjbGlwc2UuY3NzXCI7XG5pbXBvcnQgXCJjb2RlbWlycm9yL3RoZW1lL2VsZWdhbnQuY3NzXCI7XG5pbXBvcnQgXCJjb2RlbWlycm9yL3RoZW1lL2VybGFuZy1kYXJrLmNzc1wiO1xuaW1wb3J0IFwiY29kZW1pcnJvci90aGVtZS9pZGVhLmNzc1wiO1xuaW1wb3J0IFwiY29kZW1pcnJvci90aGVtZS9pc290b3BlLmNzc1wiO1xuaW1wb3J0IFwiY29kZW1pcnJvci90aGVtZS9taWRuaWdodC5jc3NcIjtcbmltcG9ydCBcImNvZGVtaXJyb3IvdGhlbWUvbHVjYXJpby5jc3NcIjtcbmltcG9ydCBcImNvZGVtaXJyb3IvdGhlbWUvbWF0ZXJpYWwuY3NzXCI7XG5pbXBvcnQgXCJjb2RlbWlycm9yL3RoZW1lL21vbm9rYWkuY3NzXCI7XG5pbXBvcnQgXCJjb2RlbWlycm9yL3RoZW1lL3NvbGFyaXplZC5jc3NcIjtcblxuaW1wb3J0IFwiLi4vc3R5bGUvbWFpbi5jc3NcIjtcbmltcG9ydCBydW5DYWxsIGZyb20gXCIuL3J1bi1yZXF1ZXN0XCI7XG5pbXBvcnQgY29kZU1pcnJvciBmcm9tIFwiLi9lZGl0b3JcIjtcbmltcG9ydCBsYW5nUmVxdWVzdCBmcm9tIFwiLi9sYW5ncy1yZXF1ZXN0XCI7XG5cbnZhciBsYW5ncztcblxuY29kZU1pcnJvci5zZXRWYWx1ZShcImRlZiBtYWluKCk6XFxuXFx0cHJpbnQoJ0hlbGxvLCBXb3JsZCEnKVxcblxcbmlmIF9fbmFtZV9fID09ICdfX21haW5fXyc6XFxuXFx0bWFpbigpXCIpO1xuXG52YXIgbGFuZ3M7XG5sYW5nUmVxdWVzdCgpXG4gICAgLnRoZW4oZnVuY3Rpb24gKHJlc3VsdCkge1xuICAgICAgICB2YXIgcmVzID0gSlNPTi5wYXJzZShyZXN1bHQpO1xuICAgICAgICBsYW5ncyA9IHJlcy5sYW5ndWFnZXM7XG4gICAgfSlcbiAgICAuY2F0Y2goZnVuY3Rpb24gKGVycikge1xuICAgICAgICBsYW5ncyA9IFsnRXJyb3IhJ107XG4gICAgICAgIGNvbnNvbGUubG9nKFwiRXJyb3Igd2hlbiBmZXRjaGluZyBsYW5ndWFnZXM6IFwiICsgZXJyKTtcbiAgICB9KVxuICAgIC5maW5hbGx5KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGxhbmdfbWVudSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdsYW5nLXNlbGVjdCcpO1xuICAgICAgICBmb3IgKGNvbnN0IGxhbmcgb2YgbGFuZ3MpIHtcbiAgICAgICAgICAgIHZhciBjaGlsZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ29wdGlvbicpO1xuICAgICAgICAgICAgY2hpbGQuaW5uZXJUZXh0ID0gbGFuZztcbiAgICAgICAgICAgIGxhbmdfbWVudS5hcHBlbmRDaGlsZChjaGlsZCk7XG4gICAgICAgIH1cbiAgICAgICAgdXBkYXRlTGFuZ3VhZ2UoKTtcbiAgICB9KTtcblxuZnVuY3Rpb24gc2VsZWN0VGhlbWUoKSB7XG4gICAgY29uc3Qgc2VsZWN0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3RoZW1lLXNlbGVjdCcpO1xuICAgIHZhciB0aGVtZSA9IHNlbGVjdC5vcHRpb25zW3NlbGVjdC5zZWxlY3RlZEluZGV4XS50ZXh0Q29udGVudDtcbiAgICBjb2RlTWlycm9yLnNldE9wdGlvbigndGhlbWUnLCB0aGVtZSk7XG59XG5cbmZ1bmN0aW9uIHVwZGF0ZUxhbmd1YWdlKCkge1xuICBjb25zdCBzZWxlY3RvciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibGFuZy1zZWxlY3RcIik7XG4gIHJldHVybiBzZWxlY3Rvci5vcHRpb25zW3NlbGVjdG9yLnNlbGVjdGVkSW5kZXhdLmlubmVyVGV4dDtcbn1cblxuY29uc3Qgc3VibWl0QnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzdWJtaXQtYnRuXCIpO1xuc3VibWl0QnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBydW5DYWxsKTtcblxuY29uc3Qgc2VsZWN0b3IgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInRoZW1lLXNlbGVjdFwiKTtcbnNlbGVjdG9yLmFkZEV2ZW50TGlzdGVuZXIoXCJjaGFuZ2VcIiwgc2VsZWN0VGhlbWUpO1xuXG4vLyBvbmx5IHNpbmdsZSBleHBvcnQgcGVyIC5qcyBmaWxlIGFsbG93ZWRcbi8vIGV4cG9ydGluZyB0aGlzIHNpbmNlIHdlIHdpbGwgbmVlZCBpdCB0byByZXRyaWV2ZSB0aGUgY3VycmVudCBsYW5ndWFnZSBmcm9tIHRoZSBkb2N1bWVudC9ET01cbmV4cG9ydCBkZWZhdWx0IHVwZGF0ZUxhbmd1YWdlOyIsImltcG9ydCBjb2RlTWlycm9yIGZyb20gXCIuL2VkaXRvclwiO1xuaW1wb3J0IHVwZGF0ZUxhbmd1YWdlIGZyb20gXCIuL2xvYWRcIjtcbmltcG9ydCBcImNvZGVtaXJyb3IvbGliL2NvZGVtaXJyb3IuY3NzXCI7XG5cbmNvbnN0IHVybCA9IFwiaHR0cHM6Ly9ydW5uZXIuZmx5LmRldi9hcGkvdjEvXCI7XG5jb25zdCBydW5fZW5kcG9pbnQgPSBcInJ1blwiO1xuXG5mdW5jdGlvbiBydW5SZXF1ZXN0KCkge1xuICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgIHZhciByZXEgPSB7XG4gICAgICBzb3VyY2U6IGNvZGVNaXJyb3IuZ2V0VmFsdWUoKSxcbiAgICAgIGxhbmd1YWdlOiB1cGRhdGVMYW5ndWFnZSgpLFxuICAgIH07XG4gICAgbGV0IHhociA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuICAgIHhoci5vcGVuKFwiUE9TVFwiLCB1cmwgKyBydW5fZW5kcG9pbnQpO1xuICAgIHhoci5zZXRSZXF1ZXN0SGVhZGVyKFwiQ29udGVudC1UeXBlXCIsIFwiYXBwbGljYXRpb24vanNvblwiKTtcbiAgICB4aHIub25sb2FkID0gZnVuY3Rpb24gKCkge1xuICAgICAgaWYgKHRoaXMuc3RhdHVzID49IDIwMCAmJiB0aGlzLnN0YXR1cyA8IDQwMCkge1xuICAgICAgICByZXNvbHZlKHhoci5yZXNwb25zZSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZWplY3Qoe1xuICAgICAgICAgIHN0YXR1czogdGhpcy5zdGF0dXMsXG4gICAgICAgICAgc3RhdHVzVGV4dDogeGhyLnN0YXR1c1RleHQsXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH07XG4gICAgeGhyLm9uZXJyb3IgPSBmdW5jdGlvbiAoKSB7XG4gICAgICByZWplY3Qoe1xuICAgICAgICBzdGF0dXM6IHRoaXMuc3RhdHVzLFxuICAgICAgICBzdGF0dXNUZXh0OiB4aHIuc3RhdHVzVGV4dCxcbiAgICAgIH0pO1xuICAgIH07XG4gICAgeGhyLnNlbmQoSlNPTi5zdHJpbmdpZnkocmVxKSk7XG4gIH0pO1xufVxuXG5hc3luYyBmdW5jdGlvbiBydW5DYWxsKCkge1xuICBhd2FpdCBydW5SZXF1ZXN0KClcbiAgICAudGhlbihmdW5jdGlvbiAocmVzdWx0KSB7XG4gICAgICBsZXQgb3V0ID0gSlNPTi5wYXJzZShyZXN1bHQpO1xuICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzdGRvdXQtZmllbGRcIikuaW5uZXJIVE1MID1cbiAgICAgICAgXCJTdGRvdXQ6IFwiICsgb3V0W1wic3Rkb3V0XCJdLnJlcGxhY2UoL1xcbi9nLCBcIjxicj5cIik7XG4gICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInN0ZGVyci1maWVsZFwiKS5pbm5lckhUTUwgPVxuICAgICAgICBcIlN0ZGVycjogXCIgKyBvdXRbXCJzdGRlcnJcIl07XG4gICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImVyci1maWVsZFwiKS5pbm5lckhUTUwgPSBcIkVycm9yOiBcIiArIG91dFtcImVycm9yXCJdO1xuICAgIH0pXG4gICAgLmNhdGNoKGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgIGNvbnNvbGUubG9nKGVycik7XG4gICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm91dHB1dC1maWVsZFwiKS50ZXh0Q29udGVudCA9IFwiRXJyb3I6IFwiICsgZXJyO1xuICAgIH0pO1xufVxuXG5leHBvcnQgZGVmYXVsdCBydW5DYWxsO1xuIiwiLy8gSW1wb3J0c1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18gZnJvbSBcIi4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9zb3VyY2VNYXBzLmpzXCI7XG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fIGZyb20gXCIuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzXCI7XG52YXIgX19fQ1NTX0xPQURFUl9FWFBPUlRfX18gPSBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyk7XG4vLyBNb2R1bGVcbl9fX0NTU19MT0FERVJfRVhQT1JUX19fLnB1c2goW21vZHVsZS5pZCwgXCIuQ29kZU1pcnJvciB7XFxuICAgIGJvcmRlcjogNHB4IHNvbGlkIGdyYXk7XFxuICAgIG1hcmdpbjogYXV0bztcXG4gICAgaGVpZ2h0OiA1MDBweDtcXG4gICAgZm9udC1zaXplOiAxNnB4O1xcbiAgICB0ZXh0LWFsaWduOiBsZWZ0OyBcXG4gICAgdGV4dC1zaGFkb3c6IG5vbmU7IFxcbn1cXG5cXG5idXR0b24ge1xcbiAgICBmb250LXdlaWdodDogYm9sZDsgXFxuICAgIHBhZGRpbmc6IDRweDsgXFxuICAgIG1hcmdpbi10b3A6IDVweDsgXFxufVxcblxcbi5zZWxlY3RvcnMge1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6c3BhY2UtYmV0d2VlbjtcXG59XFxuXFxuc2VsZWN0IHtcXG5cXHRmb250LWZhbWlseTogbW9ub3NwYWNlO1xcbn1cXG5cXG4jd3JhcHBlciB7XFxuICAgIG1hcmdpbi10b3A6IDUlOyBcXG59XFxuXFxuYm9keSB7XFxuICAgIGJhY2tncm91bmQtY29sb3I6IGluZGlnbzsgXFxuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcXG4gICAgZm9udC1mYW1pbHk6IG1vbm9zcGFjZTsgXFxuICAgIGNvbG9yOiB3aGl0ZTtcXG59XFxuXFxuYSwgYTp2aXNpdGVkIHtcXG4gICAgY29sb3I6IGdyYXk7IFxcbiAgICBmb250LXdlaWdodDogYm9sZDsgXFxufVxcblxcbmZvb3RlciB7XFxuICAgIGZvbnQtc3R5bGU6IGl0YWxpYztcXG4gICAgZm9udC1zaXplOiAxNHB4OyBcXG4gICAgcGFkZGluZzogMTBweDsgXFxufVxcblxcbi5vdXRwdXQge1xcbiAgICB3aWR0aDogNjAlO1xcbiAgICBtYXJnaW4tdG9wOiAxMHB4OyBcXG59XFxuXFxuLmZpZWxkIHtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogc2t5Ymx1ZTsgXFxuICAgIGJvcmRlcjogMnB4IHNvbGlkIGJsdWU7IFxcbiAgICBib3JkZXItcmFkaXVzOiAxMHB4OyBcXG4gICAgLW1vei1ib3JkZXItcmFkaXVzOiAxMHB4OyBcXG4gICAgY29sb3I6IGJsYWNrOyBcXG4gICAgbWFyZ2luOiBhdXRvOyBcXG4gICAgdGV4dC1hbGlnbjogbGVmdDsgXFxuICAgIHBhZGRpbmc6IDVweDsgXFxufVxcblxcbi5ib3gge1xcbiAgICB3aWR0aDogOTAlOyBcXG59XFxuXFxuI3dyYXBwZXIge1xcbiAgICB3aWR0aDogNTAlO1xcbiAgICBtYXJnaW46IGF1dG87XFxufVxcblwiLCBcIlwiLHtcInZlcnNpb25cIjozLFwic291cmNlc1wiOltcIndlYnBhY2s6Ly8uL3N0eWxlL21haW4uY3NzXCJdLFwibmFtZXNcIjpbXSxcIm1hcHBpbmdzXCI6XCJBQUFBO0lBQ0ksc0JBQXNCO0lBQ3RCLFlBQVk7SUFDWixhQUFhO0lBQ2IsZUFBZTtJQUNmLGdCQUFnQjtJQUNoQixpQkFBaUI7QUFDckI7O0FBRUE7SUFDSSxpQkFBaUI7SUFDakIsWUFBWTtJQUNaLGVBQWU7QUFDbkI7O0FBRUE7SUFDSSxhQUFhO0lBQ2IsNkJBQTZCO0FBQ2pDOztBQUVBO0NBQ0Msc0JBQXNCO0FBQ3ZCOztBQUVBO0lBQ0ksY0FBYztBQUNsQjs7QUFFQTtJQUNJLHdCQUF3QjtJQUN4QixrQkFBa0I7SUFDbEIsc0JBQXNCO0lBQ3RCLFlBQVk7QUFDaEI7O0FBRUE7SUFDSSxXQUFXO0lBQ1gsaUJBQWlCO0FBQ3JCOztBQUVBO0lBQ0ksa0JBQWtCO0lBQ2xCLGVBQWU7SUFDZixhQUFhO0FBQ2pCOztBQUVBO0lBQ0ksVUFBVTtJQUNWLGdCQUFnQjtBQUNwQjs7QUFFQTtJQUNJLHlCQUF5QjtJQUN6QixzQkFBc0I7SUFDdEIsbUJBQW1CO0lBQ25CLHdCQUF3QjtJQUN4QixZQUFZO0lBQ1osWUFBWTtJQUNaLGdCQUFnQjtJQUNoQixZQUFZO0FBQ2hCOztBQUVBO0lBQ0ksVUFBVTtBQUNkOztBQUVBO0lBQ0ksVUFBVTtJQUNWLFlBQVk7QUFDaEJcIixcInNvdXJjZXNDb250ZW50XCI6W1wiLkNvZGVNaXJyb3Ige1xcbiAgICBib3JkZXI6IDRweCBzb2xpZCBncmF5O1xcbiAgICBtYXJnaW46IGF1dG87XFxuICAgIGhlaWdodDogNTAwcHg7XFxuICAgIGZvbnQtc2l6ZTogMTZweDtcXG4gICAgdGV4dC1hbGlnbjogbGVmdDsgXFxuICAgIHRleHQtc2hhZG93OiBub25lOyBcXG59XFxuXFxuYnV0dG9uIHtcXG4gICAgZm9udC13ZWlnaHQ6IGJvbGQ7IFxcbiAgICBwYWRkaW5nOiA0cHg7IFxcbiAgICBtYXJnaW4tdG9wOiA1cHg7IFxcbn1cXG5cXG4uc2VsZWN0b3JzIHtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAganVzdGlmeS1jb250ZW50OnNwYWNlLWJldHdlZW47XFxufVxcblxcbnNlbGVjdCB7XFxuXFx0Zm9udC1mYW1pbHk6IG1vbm9zcGFjZTtcXG59XFxuXFxuI3dyYXBwZXIge1xcbiAgICBtYXJnaW4tdG9wOiA1JTsgXFxufVxcblxcbmJvZHkge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiBpbmRpZ287IFxcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxuICAgIGZvbnQtZmFtaWx5OiBtb25vc3BhY2U7IFxcbiAgICBjb2xvcjogd2hpdGU7XFxufVxcblxcbmEsIGE6dmlzaXRlZCB7XFxuICAgIGNvbG9yOiBncmF5OyBcXG4gICAgZm9udC13ZWlnaHQ6IGJvbGQ7IFxcbn1cXG5cXG5mb290ZXIge1xcbiAgICBmb250LXN0eWxlOiBpdGFsaWM7XFxuICAgIGZvbnQtc2l6ZTogMTRweDsgXFxuICAgIHBhZGRpbmc6IDEwcHg7IFxcbn1cXG5cXG4ub3V0cHV0IHtcXG4gICAgd2lkdGg6IDYwJTtcXG4gICAgbWFyZ2luLXRvcDogMTBweDsgXFxufVxcblxcbi5maWVsZCB7XFxuICAgIGJhY2tncm91bmQtY29sb3I6IHNreWJsdWU7IFxcbiAgICBib3JkZXI6IDJweCBzb2xpZCBibHVlOyBcXG4gICAgYm9yZGVyLXJhZGl1czogMTBweDsgXFxuICAgIC1tb3otYm9yZGVyLXJhZGl1czogMTBweDsgXFxuICAgIGNvbG9yOiBibGFjazsgXFxuICAgIG1hcmdpbjogYXV0bzsgXFxuICAgIHRleHQtYWxpZ246IGxlZnQ7IFxcbiAgICBwYWRkaW5nOiA1cHg7IFxcbn1cXG5cXG4uYm94IHtcXG4gICAgd2lkdGg6IDkwJTsgXFxufVxcblxcbiN3cmFwcGVyIHtcXG4gICAgd2lkdGg6IDUwJTtcXG4gICAgbWFyZ2luOiBhdXRvO1xcbn1cXG5cIl0sXCJzb3VyY2VSb290XCI6XCJcIn1dKTtcbi8vIEV4cG9ydHNcbmV4cG9ydCBkZWZhdWx0IF9fX0NTU19MT0FERVJfRVhQT1JUX19fO1xuIiwiXG4gICAgICBpbXBvcnQgQVBJIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5qZWN0U3R5bGVzSW50b1N0eWxlVGFnLmpzXCI7XG4gICAgICBpbXBvcnQgZG9tQVBJIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVEb21BUEkuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRGbiBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydEJ5U2VsZWN0b3IuanNcIjtcbiAgICAgIGltcG9ydCBzZXRBdHRyaWJ1dGVzIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0U3R5bGVFbGVtZW50IGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0U3R5bGVFbGVtZW50LmpzXCI7XG4gICAgICBpbXBvcnQgc3R5bGVUYWdUcmFuc2Zvcm1GbiBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlVGFnVHJhbnNmb3JtLmpzXCI7XG4gICAgICBpbXBvcnQgY29udGVudCwgKiBhcyBuYW1lZEV4cG9ydCBmcm9tIFwiISEuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL21haW4uY3NzXCI7XG4gICAgICBcbiAgICAgIFxuXG52YXIgb3B0aW9ucyA9IHt9O1xuXG5vcHRpb25zLnN0eWxlVGFnVHJhbnNmb3JtID0gc3R5bGVUYWdUcmFuc2Zvcm1Gbjtcbm9wdGlvbnMuc2V0QXR0cmlidXRlcyA9IHNldEF0dHJpYnV0ZXM7XG5cbiAgICAgIG9wdGlvbnMuaW5zZXJ0ID0gaW5zZXJ0Rm4uYmluZChudWxsLCBcImhlYWRcIik7XG4gICAgXG5vcHRpb25zLmRvbUFQSSA9IGRvbUFQSTtcbm9wdGlvbnMuaW5zZXJ0U3R5bGVFbGVtZW50ID0gaW5zZXJ0U3R5bGVFbGVtZW50O1xuXG52YXIgdXBkYXRlID0gQVBJKGNvbnRlbnQsIG9wdGlvbnMpO1xuXG5cblxuZXhwb3J0ICogZnJvbSBcIiEhLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9tYWluLmNzc1wiO1xuICAgICAgIGV4cG9ydCBkZWZhdWx0IGNvbnRlbnQgJiYgY29udGVudC5sb2NhbHMgPyBjb250ZW50LmxvY2FscyA6IHVuZGVmaW5lZDtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==