var curr_lang;
let url = "https://runner.fly.dev/api/v1/";
let run_endpoint = "run";
let lang_endpoint = "languages";

function updateLanguage()
{
    var selector = document.getElementById('lang-select');
    curr_lang = selector.options[selector.selectedIndex].innerText;
}

function runRequest() {
    return new Promise(function(resolve, reject) {
        var req = {
            "source": codeMirror.getValue(), 
            "language": curr_lang
        }
        let xhr = new XMLHttpRequest(); 
        xhr.open("POST", url + run_endpoint);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.onload = function() {
            if (this.status >= 200 && this.status < 400) {
                resolve(xhr.response);
            }
            else {
                reject({
                    status: this.status, 
                    statusText: xhr.statusText
                });
            }
        };
        xhr.onerror = function() {
            reject({
                status: this.status, 
                statusText: xhr.statusText
            });
        };
        xhr.send(JSON.stringify(req)); 
    });
}

async function runCall() {
    await runRequest()
        .then(function(result) {
            let out = JSON.parse(result);
            document.getElementById("stdout-field").innerHTML = "Stdout: " + out["stdout"].replace(/\n/g, '<br>');
            document.getElementById("stderr-field").innerHTML = "Stderr: " + out["stderr"];
            document.getElementById("err-field").innerHTML = "Error: " + out["error"];
        })
        .catch(function(err) {
            console.log(err);
            document.getElementById("output-field").textContent = "Error: " + err; 
        }); 
}

function langRequest() {
    return new Promise(function(resolve, reject) {
        let xhr = new XMLHttpRequest();
        xhr.open("GET", url + lang_endpoint);
        xhr.onload = function() {
            if(this.status >= 200 && this.status < 400) {
                resolve(xhr.response);
            }
            else {
                reject({
                    status: this.status, 
                    statusText: xhr.statusText
                });
            }
        };
        xhr.onerror = function() {
            reject({
                status: this.status, 
                statusText: xhr.statusText
            });
        };
        xhr.send(); 
    });
}