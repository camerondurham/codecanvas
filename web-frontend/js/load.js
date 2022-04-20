var codeMirror = CodeMirror.fromTextArea(document.getElementById("code"), {
    mode: "python",
    autofocus: true,
    lineNumbers: true,
    indentWithTabs: true, 
    smartIndent: false, 
});

/*
//for fun 
colors = ["plum", "skyblue", "pink", "clay", "tan", "steelblue", "teal", "thistle", "mintcream", "mediumpurple", "indigo", "honeydew", "gray", "white", "fuchsia", "gold", "greenyellow", "green", "darkred", "coral"]
clr = colors[Math.floor(Math.random() * colors.length)];

document.body.setAttribute("style", "background-color:"+clr);
*/