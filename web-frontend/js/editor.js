import CodeMirror from "codemirror";

// moving codeMirror into separate module so it can be shared

var codeMirror = CodeMirror.fromTextArea(document.getElementById("code"), {
  mode: "python",
  autofocus: true,
  lineNumbers: true,
  indentWithTabs: true,
  smartIndent: false,
});

export default codeMirror;
