
function runRequest() {
    return new Promise(function(resolve, reject) {
        var req = {
            "source": codeMirror.getValue(), 
            "language": updateLanguage(),
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