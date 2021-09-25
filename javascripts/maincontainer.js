// TOGGLE MAIN CONTAINER
var landing = document.getElementsByClassName("landingDiv");
var lightBtn = document.getElementById("light");
var weatherBtn = document.getElementById("weather");
var portfolioBtn = document.getElementById("portfolio");
var newsBtn = document.getElementById("news");
var lightCon = document.getElementById("lightC");
var weatherCon = document.getElementById("weatherC");
var weatherCon2 = document.getElementById("weatherC2");
var portfolioCon = document.getElementById("portfolioC");
var portfolioCon2 = document.getElementById("portfolioC2");
var newsCon = document.getElementById("newsC");
var leftArrow = document.getElementById("mainContainer-leftArw");
var rightArrow = document.getElementById("mainContainer-rightArw");
var currContainter = "none";
var lightInterval;
var stockInterval;
var newsInterval;

document.addEventListener('keydown', function (e) {
    if (searchActive == false) {
        if (e.keyCode == 76) {
            toggleLightFunc();
        } else if (e.keyCode == 87) {
            toggleWeatherFunc();
        } else if (e.keyCode == 80) {
            togglePortfolioFunc();
        } else if (e.keyCode == 78) {
            toggleNewsFunc();
        } else if (e.keyCode == 37 && currContainter != "none") {
            leftArrowFunc();
        } else if (e.keyCode == 39 && currContainter != "none") {
            rightArrowFunc();
        } else if (e.keyCode == 27 && currContainter != "none") {
            lightCon.classList.remove("show");
            weatherCon.classList.remove("show");
            weatherCon2.classList.remove("show");
            portfolioCon.classList.remove("show");
            portfolioCon2.classList.remove("show");
            newsCon.classList.remove("show");
            leftArrow.classList.remove("show");
            rightArrow.classList.remove("show");
            currContainter = "none";
            clearInterval(lightInterval);
            clearInterval(stockInterval);
            clearInterval(newsInterval);
        } else if (e.keyCode == 72) {
            window.location.replace('http://google.com/');
        } else if (e.keyCode == 69) {
            window.location.replace('https://uga.view.usg.edu/d2l/home');
        }
    }
});
documentBody.addEventListener('click', function (e) {
    if (e.target.className == "bar-searchBox" || e.target.className == "logo" || e.target.className == "logo-outerDiv" || e.target.className == "landingDiv" || e.target.className == "mainContainer-outerDiv") {
        lightCon.classList.remove("show");
        weatherCon.classList.remove("show");
        weatherCon2.classList.remove("show");
        portfolioCon.classList.remove("show");
        portfolioCon2.classList.remove("show");
        newsCon.classList.remove("show");
        leftArrow.classList.remove("show");
        rightArrow.classList.remove("show");
        currContainter = "none";
        clearInterval(lightInterval);
        clearInterval(stockInterval);
        clearInterval(newsInterval);
    }
});
lightBtn.addEventListener('click', function () { toggleLightFunc() });
weatherBtn.addEventListener('click', function () { toggleWeatherFunc() });
portfolioBtn.addEventListener('click', function () { togglePortfolioFunc() });
newsBtn.addEventListener('click', function () { toggleNewsFunc() });
leftArrow.addEventListener('click', function () { leftArrowFunc() });
rightArrow.addEventListener('click', function () { rightArrowFunc() });

function toggleLightFunc() {
    lightCon.classList.toggle("show");
    weatherCon.classList.remove("show");
    weatherCon2.classList.remove("show");
    portfolioCon.classList.remove("show");
    portfolioCon2.classList.remove("show");
    newsCon.classList.remove("show");
    clearInterval(stockInterval);
    clearInterval(newsInterval);
    if (currContainter == "none") {
        currContainter = "light";
        leftArrow.classList.add("show");
        rightArrow.classList.add("show");
        httpRequestRefresh("GET", "");
        lightInterval = setInterval(function () { httpRequestRefresh("GET", ""); }, 2000);
    } else if (currContainter == "light") {
        currContainter = "none";
        leftArrow.classList.remove("show");
        rightArrow.classList.remove("show");
        clearInterval(lightInterval);
    } else {
        currContainter = "light";
        httpRequestRefresh("GET", "");
        lightInterval = setInterval(function () { httpRequestRefresh("GET", ""); }, 2000);
    }
}
function toggleWeatherFunc() {
    lightCon.classList.remove("show");
    weatherCon.classList.toggle("show");
    weatherCon2.classList.remove("show");
    portfolioCon.classList.remove("show");
    portfolioCon2.classList.remove("show");
    newsCon.classList.remove("show");
    clearInterval(lightInterval);
    clearInterval(stockInterval);
    clearInterval(newsInterval);
    if (currContainter == "none") {
        currContainter = "weather";
        leftArrow.classList.add("show");
        rightArrow.classList.add("show");
    } else if (currContainter == "weather") {
        currContainter = "none";
        leftArrow.classList.remove("show");
        rightArrow.classList.remove("show");
    } else {
        currContainter = "weather";
    }
}
function togglePortfolioFunc() {
    lightCon.classList.remove("show");
    weatherCon.classList.remove("show");
    weatherCon2.classList.remove("show");
    portfolioCon.classList.toggle("show");
    portfolioCon2.classList.remove("show");
    newsCon.classList.remove("show");
    clearInterval(lightInterval);
    clearInterval(newsInterval);
    if (currContainter == "none") {
        currContainter = "portfolio";
        leftArrow.classList.add("show");
        rightArrow.classList.add("show");
        loadXMLDoc();
        stockInterval = setInterval(function () { loadXMLDoc(); }, 2000);
    } else if (currContainter == "portfolio") {
        currContainter = "none";
        leftArrow.classList.remove("show");
        rightArrow.classList.remove("show");
        clearInterval(stockInterval);
    } else {
        currContainter = "portfolio";
        loadXMLDoc();
        stockInterval = setInterval(function () { loadXMLDoc(); }, 2000);
    }
}
function toggleNewsFunc() {
    lightCon.classList.remove("show");
    weatherCon.classList.remove("show");
    weatherCon2.classList.remove("show");
    portfolioCon.classList.remove("show");
    portfolioCon2.classList.remove("show");
    newsCon.classList.toggle("show");
    clearInterval(lightInterval);
    clearInterval(stockInterval);
    if (currContainter == "none") {
        currContainter = "news";
        leftArrow.classList.add("show");
        rightArrow.classList.add("show");
        parseNewsData();
        newsInterval = setInterval(function () { parseNewsData(); }, 300000);
    } else if (currContainter == "news") {
        currContainter = "none";
        leftArrow.classList.remove("show");
        rightArrow.classList.remove("show");
        clearInterval(newsInterval);
    } else {
        currContainter = "news";
        parseNewsData();
        newsInterval = setInterval(function () { parseNewsData(); }, 300000);
    }
}
function leftArrowFunc() {
    if (currContainter == "light") {
        lightCon.classList.remove("show");
        newsCon.classList.add("show");
        currContainter = "news";
        clearInterval(lightInterval);
        clearInterval(stockInterval);
        parseNewsData();
        newsInterval = setInterval(function () { parseNewsData(); }, 300000);
    } else if (currContainter == "weather") {
        weatherCon.classList.remove("show");
        weatherCon2.classList.remove("show");
        lightCon.classList.add("show");
        currContainter = "light";
        httpRequestRefresh("GET", "");
        lightInterval = setInterval(function () { httpRequestRefresh("GET", ""); }, 2000);
        clearInterval(stockInterval);
        clearInterval(newsInterval);
    } else if (currContainter == "portfolio") {
        portfolioCon.classList.remove("show");
        portfolioCon2.classList.remove("show");
        weatherCon.classList.add("show");
        weatherCon2.classList.remove("show");
        currContainter = "weather";
        clearInterval(lightInterval);
        clearInterval(stockInterval);
        clearInterval(newsInterval);
    } else if (currContainter == "news") {
        newsCon.classList.remove("show");
        portfolioCon.classList.add("show");
        currContainter = "portfolio";
        clearInterval(lightInterval);
        loadXMLDoc();
        stockInterval = setInterval(function () { loadXMLDoc(); }, 2000);
        clearInterval(newsInterval);
    }
}
function rightArrowFunc() {
    if (currContainter == "light") {
        lightCon.classList.remove("show");
        weatherCon.classList.add("show");
        weatherCon2.classList.remove("show");
        currContainter = "weather";
        clearInterval(lightInterval);
        clearInterval(stockInterval);
        clearInterval(newsInterval);
    } else if (currContainter == "weather") {
        weatherCon.classList.remove("show");
        weatherCon2.classList.remove("show");
        portfolioCon.classList.add("show");
        currContainter = "portfolio";
        clearInterval(lightInterval);
        loadXMLDoc();
        stockInterval = setInterval(function () { loadXMLDoc(); }, 2000);
        clearInterval(newsInterval);
    } else if (currContainter == "portfolio") {
        portfolioCon.classList.remove("show");
        portfolioCon2.classList.remove("show");
        newsCon.classList.add("show");
        currContainter = "news";
        clearInterval(lightInterval);
        clearInterval(stockInterval);
        parseNewsData();
        newsInterval = setInterval(function () { parseNewsData(); }, 300000);
    } else if (currContainter == "news") {
        newsCon.classList.remove("show");
        lightCon.classList.add("show");
        currContainter = "light";
        httpRequestRefresh("GET", "");
        lightInterval = setInterval(function () { httpRequestRefresh("GET", ""); }, 2000);
        clearInterval(stockInterval);
        clearInterval(newsInterval);
    }
}