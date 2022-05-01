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