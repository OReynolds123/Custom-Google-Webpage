// FINANCE
var par = document.getElementsByClassName("portfolioStock");
var financeFailNum = 0;
loadXMLDoc();
function loadXMLDoc() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            try {
                var stockText = this.responseText;
                var r1 = (stockText.split('"gs$rowCount":{"$t":"'))[1].split('"');
                var rowCount = parseInt(r1[0]);
                var c1 = (stockText.split('"gs$colCount":{"$t":"'))[1].split('"');
                var colCount = parseInt(c1[0]);
                var headers = [];
                var currP = [];
                var chanP = [];
                var chang = [];
                var overall = [];
                var i;
                for (i = 0; i < colCount; i++) {
                    headers[i] = (stockText.split('"content":{"type":"text","$t":"'))[(i + 1) + (colCount * 0)].split('"')[0];
                    currP[i] = (stockText.split('"content":{"type":"text","$t":"'))[(i + 1) + (colCount * 1)].split('"')[0];
                    chanP[i] = (stockText.split('"content":{"type":"text","$t":"'))[(i + 1) + (colCount * 2)].split('"')[0];
                    chang[i] = (stockText.split('"content":{"type":"text","$t":"'))[(i + 1) + (colCount * 3)].split('"')[0];
                    overall[i] = (stockText.split('"content":{"type":"text","$t":"'))[(i + 1) + (colCount * 4)].split('"')[0];
                }
                for (i = 0; i < headers.length; i++) {
                    if (headers[i] == "Portfolio") {
                        updateTextPort(par[i], currP[i], chang[i], overall[i]);
                    } else if (headers[i] == "HMBL") {
                        updateTextStock(par[i], currP[i], chanP[i], chang[i]);
                    } else {
                        updateText(par[i], currP[i], chanP[i], chang[i]);
                    }
                }
                console.log("(Success) Parsed Stocks XML");
            } catch (e) {
                console.log("(Error) Failed To Parse Stocks XML");
                financeFailNum = financeFailNum + 1;
                if (financeFailNum < 50) {
                    loadXMLDoc();
                }
            }
        }
    };
    xhttp.open("GET", "", true);
    xhttp.send();
}
function makeNegative(parent) {
    var arwDiv = parent.children[0];
    var rightDiv = parent.children[2];
    arwDiv.classList.remove("positive");
    arwDiv.classList.add("negative");
    rightDiv.classList.remove("positiveC");
    rightDiv.classList.add("negativeC");
}
function makePositive(parent) {
    var arwDiv = parent.children[0];
    var rightDiv = parent.children[2];
    arwDiv.classList.remove("negative");
    arwDiv.classList.add("positive");
    rightDiv.classList.remove("negativeC");
    rightDiv.classList.add("positiveC");
}
function updateText(parent, priceTxt, percentTxt, changeTxt) {
    var middleDiv = parent.children[1];
    var middlePrice = middleDiv.children[1];
    var rightDiv = parent.children[2];
    var rightPercent = rightDiv.children[0];
    var rightChange = rightDiv.children[1];
    if (changeTxt < 0) {
        middlePrice.innerHTML = priceTxt;
        rightPercent.innerHTML = percentTxt + "%";
        rightChange.innerHTML = changeTxt;
        makeNegative(parent);
    } else {
        middlePrice.innerHTML = priceTxt;
        rightPercent.innerHTML = "+" + percentTxt + "%";
        rightChange.innerHTML = "+" + changeTxt;
        makePositive(parent);
    }
}
function updateTextStock(parent, priceTxt, percentTxt, changeTxt) {
    var middleDiv = parent.children[1];
    var middlePrice = middleDiv.children[1];
    var rightDiv = parent.children[2];
    var rightPercent = rightDiv.children[0];
    var rightChange = rightDiv.children[1];
    var stockGraphPrice = document.getElementsByClassName("stocks-graph-price");
    var stockGraphPercent = document.getElementsByClassName("stocks-graph-percent");
    var stockGraphChange = document.getElementsByClassName("stocks-graph-change");
    if (changeTxt < 0) {
        middlePrice.innerHTML = priceTxt;
        rightPercent.innerHTML = percentTxt + "%";
        rightChange.innerHTML = changeTxt;
        makeNegative(parent);
        stockGraphPrice[0].innerHTML = priceTxt;
        stockGraphPercent[0].innerHTML = percentTxt + "%";
        stockGraphChange[0].innerHTML = changeTxt;
        stockGraphPercent[0].classList.remove("positive");
        stockGraphPercent[0].classList.add("negativeNR");
        stockGraphChange[0].classList.remove("positiveC");
        stockGraphChange[0].classList.add("negativeC");
    } else {
        middlePrice.innerHTML = priceTxt;
        rightPercent.innerHTML = "+" + percentTxt + "%";
        rightChange.innerHTML = "+" + changeTxt;
        makePositive(parent);
        stockGraphPrice[0].innerHTML = priceTxt;
        stockGraphPercent[0].innerHTML = "+" + percentTxt + "%";
        stockGraphChange[0].innerHTML = "+" + changeTxt;
        stockGraphPercent[0].classList.remove("negativeNR");
        stockGraphPercent[0].classList.add("positive");
        stockGraphChange[0].classList.remove("negativeC");
        stockGraphChange[0].classList.add("positiveC");
    }
}
function updateTextPort(parent, priceTxt, changeTxt, overallTxt) {
    var middleDiv = parent.children[1];
    var middlePrice = middleDiv.children[1];
    var rightDiv = parent.children[2];
    var rightChange = rightDiv.children[0];
    var rightAmount = rightDiv.children[1];
    if (changeTxt < 0) {
        middlePrice.innerHTML = priceTxt;
        rightChange.innerHTML = changeTxt;
        var arwDiv = parent.children[0];
        arwDiv.classList.remove("positive");
        arwDiv.classList.add("negative");
        rightChange.classList.remove("positiveC");
        rightChange.classList.add("negativeC");
    } else {
        middlePrice.innerHTML = priceTxt;
        rightChange.innerHTML = "+" + changeTxt;
        var arwDiv = parent.children[0];
        arwDiv.classList.remove("negative");
        arwDiv.classList.add("positive");
        rightChange.classList.remove("negativeC");
        rightChange.classList.add("positiveC");
    }
    if (overallTxt < 0) {
        rightAmount.innerHTML = overallTxt;
        rightAmount.classList.remove("positiveC");
        rightAmount.classList.add("negativeC");
    } else {
        rightAmount.innerHTML = "+" + overallTxt;
        rightAmount.classList.remove("negativeC");
        rightAmount.classList.add("positiveC");
    }
}
function stockClick() {
    var cont = document.getElementById("portfolioC");
    var cont1 = document.getElementById("portfolioC2");
    var ch1 = cont1.children[1];
    var script = document.createElement("script");
    script.innerHTML = 'new TradingView.MediumWidget({"symbols": [["Humbl", "OTC:HMBL|1D"]], "chartOnly": true, "width": "100%", "height": "100%", "locale": "en", "colorTheme": "light", "gridLineColor": "#F0F3FA", "trendLineColor": "#2196F3", "fontColor": "#787B86", "underLineColor": "#E3F2FD", "isTransparent": true, "autosize": true, "container_id": "tradingview_1234"});';
    ch1.appendChild(script);
    cont.classList.remove("show");
    cont1.classList.add("show");
}
function stockBackBtn() {
    var cont = document.getElementById("portfolioC");
    var cont1 = document.getElementById("portfolioC2");
    cont1.classList.remove("show");
    cont.classList.add("show");
}