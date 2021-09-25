// LIGHT
httpRequestRefresh("GET", "");
var ckbox = document.getElementById("check");
ckbox.addEventListener('change', function () {
    if (this.checked) {
        var type1 = "PUT";
        var url1 = "";
        httpRequest(type1, url1, 0);
    } else {
        var type = "PUT";
        var url = "";
        httpRequest(type, url, 0);
    }
});
function httpRequest(type, url) {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.addEventListener("load", transferComplete);
    xmlhttp.addEventListener("error", transferFailed);
    xmlhttp.open(type, url);
    xmlhttp.setRequestHeader("accountId", "");
    xmlhttp.setRequestHeader("tk", "");
    xmlhttp.send();
}
function transferComplete() {
    var resp = this.responseText;
    console.log("(Success) Light Status Changed");
}
function transferFailed() {
    var resp = this.responseText;
    console.log("(Error) Light Status Not Changed: " + resp);
}
function httpRequestRefresh(type, url) {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.addEventListener("load", transferCompleteRefresh);
    xmlhttp.addEventListener("error", transferFailedRefresh);
    xmlhttp.open(type, url);
    xmlhttp.setRequestHeader("accountId", "");
    xmlhttp.setRequestHeader("tk", "");
    xmlhttp.send();
}
function transferCompleteRefresh() {
    var ckbx = document.getElementById("check");
    var temp = this.responseText.split(":");
    var temp1 = temp[1].split(",");
    var status = temp1[0].slice(1, -1);
    console.log("(Success) Light Status: " + status);
    if (status == "on") {
        ckbx.checked = true;
    } else if (status == "off") {
        ckbx.checked = false;
    } else {
        console.log("(Error) Light Status: " + status);
    }
}
function transferFailedRefresh() {
    var resp = this.responseText;
    console.log("(Error) Light Status: " + resp);
}