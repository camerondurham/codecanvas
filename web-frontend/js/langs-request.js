import runnerConfig from "./config-utils";

function langRequest() {
  return new Promise(function (resolve, reject) {
    let xhr = new XMLHttpRequest();
    const fullUrl = runnerConfig.url + runnerConfig.langEndpoint;
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

export default langRequest;
