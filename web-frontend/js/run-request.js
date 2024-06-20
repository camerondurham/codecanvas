import codeMirror from "./editor";
import runnerConfig from "./config-utils";
import "codemirror/lib/codemirror.css";

function runRequest() {
  return new Promise(function(resolve, reject) {
    var req = {
      source: codeMirror.getValue(),
      language: runnerConfig.getSelectedLanguage(),
    };
    let xhr = new XMLHttpRequest();
    const fullUrl = runnerConfig.url + runnerConfig.runEndpoint;
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

export default runCall;
