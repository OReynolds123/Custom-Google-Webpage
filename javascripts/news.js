// NEWS
var newsPar = document.getElementsByClassName("newsWidget-newsDiv");
var newsLeftArrow = document.getElementById("newsWidget-leftArw");
var newsRightArrow = document.getElementById("newsWidget-rightArw");
var newsUrls = [];
var newsImgs = [];
var newsTitles = [];
var newsTexts = [];
var newsDates = [];
var newsCurrentLoc = 0;
var newsMaxLoc = 60;
var newsFailNum = 0;
parseNewsData();
function parseNewsData() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            try {
                var newsText = this.responseText;
                var r1 = (newsText.split('"gs$rowCount":{"$t":"'))[1].split('"');
                var rowCount = parseInt(r1[0]);
                var c1 = (newsText.split('"gs$colCount":{"$t":"'))[1].split('"');
                var colCount = parseInt(c1[0]);
                newsMaxLoc = rowCount;
                var i;
                for (i = 0; i < rowCount; i++) {
                    newsUrls[i] = (newsText.split('"content":{"type":"text","$t":"'))[(1) + (colCount * i)].split('"}')[0];
                    newsImgs[i] = (newsText.split('"content":{"type":"text","$t":"'))[(2) + (colCount * i)].split('"}')[0];
                    newsTitles[i] = (newsText.split('"content":{"type":"text","$t":"'))[(3) + (colCount * i)].split('"}')[0];
                    newsTexts[i] = (newsText.split('"content":{"type":"text","$t":"'))[(4) + (colCount * i)].split('"}')[0];
                    newsDates[i] = (newsText.split('"content":{"type":"text","$t":"'))[(5) + (colCount * i)].split('"}')[0];
                    if (newsUrls[i] == "_" && newsTexts[i] == "_") {
                        newsMaxLoc = i;
                        break;
                    }
                }
                populateNewsData(newsPar[0], newsUrls[0], newsImgs[0], newsTitles[0], newsTexts[0], newsDates[0]);
                populateNewsData(newsPar[1], newsUrls[1], newsImgs[1], newsTitles[1], newsTexts[1], newsDates[1]);
                console.log("(Success) Parsed News XML");
            } catch (e) {
                console.log("(Error) Failed To Parse News XML");
                newsFailNum = newsFailNum + 1;
                if (newsFailNum < 50) {
                    parseNewsData();
                }
            }
        }
    };
    xhttp.open("GET", "", true);
    xhttp.send();
}
function populateNewsData(parent, url, img, title, text, date) {
    var imgDiv = parent.children[0];
    var textDiv = parent.children[1];
    var titleDiv = textDiv.children[0];
    var contentDiv = textDiv.children[1];
    var dateDiv = textDiv.children[2];
    imgDiv.style.backgroundImage = "url('" + img + "')";
    textDiv.href = url;
    titleDiv.innerHTML = title;
    text = text.replaceAll('\\"', '"');
    contentDiv.innerHTML = text;
    dateDiv.innerHTML = date;
}
newsLeftArrow.addEventListener("click", function () {
    if ((newsCurrentLoc - 2) >= 0) {
        newsCurrentLoc = newsCurrentLoc - 2;
        populateNewsData(newsPar[0], newsUrls[newsCurrentLoc], newsImgs[newsCurrentLoc], newsTitles[newsCurrentLoc], newsTexts[newsCurrentLoc], newsDates[newsCurrentLoc]);
        populateNewsData(newsPar[1], newsUrls[newsCurrentLoc + 1], newsImgs[newsCurrentLoc + 1], newsTitles[newsCurrentLoc + 1], newsTexts[newsCurrentLoc + 1], newsDates[newsCurrentLoc + 1]);
    }
});
newsRightArrow.addEventListener("click", function () {
    if ((newsCurrentLoc + 2) < newsMaxLoc) {
        newsCurrentLoc = newsCurrentLoc + 2;
        populateNewsData(newsPar[0], newsUrls[newsCurrentLoc], newsImgs[newsCurrentLoc], newsTitles[newsCurrentLoc], newsTexts[newsCurrentLoc], newsDates[newsCurrentLoc]);
        populateNewsData(newsPar[1], newsUrls[newsCurrentLoc + 1], newsImgs[newsCurrentLoc + 1], newsTitles[newsCurrentLoc + 1], newsTexts[newsCurrentLoc + 1], newsDates[newsCurrentLoc + 1]);
    }
});