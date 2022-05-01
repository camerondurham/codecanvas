import "codemirror/lib/codemirror.css";
import "codemirror/theme/material.css";
import "codemirror/theme/neat.css";
import "codemirror/mode/xml/xml";
import "codemirror/mode/javascript/javascript";
import "codemirror/mode/python/python";

// other themes
import "codemirror/theme/3024-day.css";
import "codemirror/theme/3024-night.css";
import "codemirror/theme/blackboard.css";
import "codemirror/theme/darcula.css";
import "codemirror/theme/dracula.css";
import "codemirror/theme/eclipse.css";
import "codemirror/theme/elegant.css";
import "codemirror/theme/erlang-dark.css";
import "codemirror/theme/idea.css";
import "codemirror/theme/isotope.css";
import "codemirror/theme/midnight.css";
import "codemirror/theme/lucario.css";
import "codemirror/theme/material.css";
import "codemirror/theme/monokai.css";
import "codemirror/theme/solarized.css";

import "../style/main.css";
import runCall from "./run-request";
import codeMirror from "./editor";
import langRequest from "./langs-request";

var codeMirror = CodeMirror.fromTextArea(document.getElementById("code"), {
    mode: "python",
    autofocus: true,
    lineNumbers: true,
    indentWithTabs: true,
    smartIndent: false,
});

codeMirror.setValue("def main():\n\tprint('Hello, World!')\n\nif __name__ == '__main__':\n\tmain()");
selectTheme();

var langs;
langRequest()
    .then(function (result) {
        var res = JSON.parse(result);
        langs = res.languages;
        //langs = ['debug1', 'debug2', 'debug3'];
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
    codeMirror.setOption('theme', theme);
}

function updateLanguage() {
  const selector = document.getElementById("lang-select");
  return selector.options[selector.selectedIndex].innerText;
}

// only single export per .js file allowed
// exporting this since we will need it to retrieve the current language from the document/DOM
export default updateLanguage;