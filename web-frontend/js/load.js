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
    var select = document.getElementById('theme-select');
    var theme = select.options[select.selectedIndex].textContent;
    codeMirror.setOption('theme', theme);
}