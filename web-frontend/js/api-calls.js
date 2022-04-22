var curr_lang = "python3";
let url = "http://localhost:10100/api/v1/";
let run_endpoint = "run";
let lang_endpoint = "languages";


function runCall() {
    var req = {
        "source": codeMirror.getValue(), 
        "language": curr_lang,
    }
    
    var xhr = new XMLHttpRequest();
    xhr.open("POST", url + run_endpoint, true);
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.addEventListener("load", function() {
        console.log(JSON.parse(xhr.response));
    }, false);
    xhr.send(JSON.stringify(req));
    
}

function langCall() {
    var xhr = new XMLHttpRequest(); 
    xhr.open("GET", url + lang_endpoint, true);
    xhr.addEventListener("load", function() {
        console.log(JSON.parse(xhr.response));
    }, false);
    xhr.send(); 
}