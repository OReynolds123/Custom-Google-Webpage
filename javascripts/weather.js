// WEATHER
var weatherDates = [];
var weatherDescriptions = [];
var weatherIds = [];
var weatherTempMin = [];
var weatherTempMax = [];
var weatherHumidity = [];
var weatherPressure = [];
var weatherWind = [];
var weatherWindDeg = [];
var weatherSunrise = [];
var weatherSunset = [];
var weatherOther = [];
var weatherFailNum = 0;
parseWeatherData();
function parseWeatherData() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            try {
                var weatherText = this.responseText;
                var r1 = (weatherText.split('"gs$rowCount":{"$t":"'))[1].split('"');
                var rowCount = parseInt(r1[0]);
                var c1 = (weatherText.split('"gs$colCount":{"$t":"'))[1].split('"');
                var colCount = parseInt(c1[0]);
                var i;
                for (i = 0; i < rowCount; i++) {
                    weatherDates[i] = (weatherText.split('"content":{"type":"text","$t":"'))[(1) + (colCount * i)].split('"}')[0];
                    weatherDescriptions[i] = (weatherText.split('"content":{"type":"text","$t":"'))[(2) + (colCount * i)].split('"}')[0];
                    weatherIds[i] = (weatherText.split('"content":{"type":"text","$t":"'))[(3) + (colCount * i)].split('"}')[0];
                    weatherTempMin[i] = (weatherText.split('"content":{"type":"text","$t":"'))[(4) + (colCount * i)].split('"}')[0];
                    weatherTempMax[i] = (weatherText.split('"content":{"type":"text","$t":"'))[(5) + (colCount * i)].split('"}')[0];
                    weatherHumidity[i] = (weatherText.split('"content":{"type":"text","$t":"'))[(6) + (colCount * i)].split('"}')[0];
                    weatherPressure[i] = (weatherText.split('"content":{"type":"text","$t":"'))[(7) + (colCount * i)].split('"}')[0];
                    weatherWind[i] = (weatherText.split('"content":{"type":"text","$t":"'))[(8) + (colCount * i)].split('"}')[0];
                    weatherWindDeg[i] = (weatherText.split('"content":{"type":"text","$t":"'))[(9) + (colCount * i)].split('"}')[0];
                    weatherSunrise[i] = (weatherText.split('"content":{"type":"text","$t":"'))[(10) + (colCount * i)].split('"}')[0];
                    weatherSunset[i] = (weatherText.split('"content":{"type":"text","$t":"'))[(11) + (colCount * i)].split('"}')[0];
                }
                weatherOther[0] = (weatherText.split('"content":{"type":"text","$t":"'))[(12)].split('"}')[0];
                weatherOther[1] = (weatherText.split('"content":{"type":"text","$t":"'))[(13)].split('"}')[0];
                populateWeatherData(weatherDates, weatherDescriptions, weatherIds, weatherTempMin, weatherTempMax, weatherOther);
                console.log("(Success) Parsed Weather XML");
            } catch (e) {
                console.log("(Error) Failed To Parse Weather XML");
                weatherFailNum = weatherFailNum + 1;
                if (weatherFailNum < 50) {
                    parseWeatherData();
                }
            }
        }
    };
    xhttp.open("GET", "", true);
    xhttp.send();
}

function populateWeatherData(dates, descriptions, ids, tempMin, tempMax, other) {
    (document.getElementsByClassName("weatherWidget_locationText")[0]).innerHTML = dates[0];
    (document.getElementsByClassName("weatherWidget_currIconImg")[0]).src = getWeatherIco(ids[0], other[1]);
    (document.getElementsByClassName("weatherWidget_currTemp")[0]).innerHTML = other[0] + "\xB0" + "F";
    (document.getElementsByClassName("weatherWidget_currDesc")[0]).innerHTML = descriptions[0];
    for (var i = 0; i < 5; i++) {
        (document.getElementsByClassName("weatherWidget_dayText")[i]).innerHTML = getWeatherDate(i);
        (document.getElementsByClassName("weatherWidget_dayIconImg")[i]).src = getWeatherIco(ids[i], other[1]);
        (document.getElementsByClassName("weatherWidget_dayHigh")[i]).innerHTML = tempMax[i] + "\xB0" + "F";
        (document.getElementsByClassName("weatherWidget_dayLow")[i]).innerHTML = tempMin[i] + "\xB0" + "F";
    }
}
function getWeatherIco(id, isDay) {
    var ret = "images/WeatherIcons/sunny.png";
    if (id == "200" || id == "201" || id == "202" || id == "210" || id == "211" || id == "212") {
        ret = "images/WeatherIcons/strong_tstorms.png";
    } else if ((id == "230" || id == "231" || id == "232" || id == "221") && (isDay == "TRUE")) {
        ret = "images/WeatherIcons/isolated_scattered_tstorms_day.png";
    } else if ((id == "230" || id == "231" || id == "232" || id == "221") && (isDay != "TRUE")) {
        ret = "images/WeatherIcons/isolated_scattered_tstorms_night.png";
    } else if (id == "300" || id == "301" || id == "302" || id == "310" || id == "311" || id == "312" || id == "313" || id == "314" || id == "321") {
        ret = "images/WeatherIcons/drizzle.png";
    } else if (id == "500" || id == "501" || id == "520" || id == "521") {
        ret = "images/WeatherIcons/showers_rain.png";
    } else if (id == "502" || id == "503" || id == "504" || id == "522") {
        ret = "images/WeatherIcons/heavy_rain.png";
    } else if (id == "531" && isDay == "TRUE") {
        ret = "images/WeatherIcons/scattered_showers_day.png";
    } else if (id == "531" && isDay != "TRUE") {
        ret = "images/WeatherIcons/scattered_showers_night.png";
    } else if (id == "511" || id == "611" || id == "612" || id == "613" || id == "615" || id == "616") {
        ret = "images/WeatherIcons/wintry_mix.png";
    } else if (id == "600" || id == "620") {
        ret = "images/WeatherIcons/flurries.png";
    } else if (id == "601" || id == "602" || id == "621" || id == "622") {
        ret = "images/WeatherIcons/snow_showers.png";
    } else if (id == "701" || id == "711" || id == "721" || id == "731" || id == "741" || id == "751" || id == "761" || id == "762" || id == "771" || id == "781") {
        ret = "images/WeatherIcons/haze_fog.png";
    } else if (id == "800" && isDay == "TRUE") {
        ret = "images/WeatherIcons/sunny.png";
    } else if (id == "800" && isDay != "TRUE") {
        ret = "images/WeatherIcons/clear_night.png";
    } else if (id == "801" && isDay == "TRUE") {
        ret = "images/WeatherIcons/mostly_sunny.png";
    } else if (id == "801" && isDay != "TRUE") {
        ret = "images/WeatherIcons/mostly_clear_night.png";
    } else if (id == "802" && isDay == "TRUE") {
        ret = "images/WeatherIcons/partly_cloudy_day.png";
    } else if (id == "802" && isDay != "TRUE") {
        ret = "images/WeatherIcons/partly_cloudy_night.png";
    } else if ((id == "803" || id == "804") && isDay == "TRUE") {
        ret = "images/WeatherIcons/mostly_cloudy_day.png";
    } else if ((id == "803" || id == "804") && isDay != "TRUE") {
        ret = "images/WeatherIcons/mostly_cloudy_night.png";
    }
    return ret;
}
function getWeatherDate(i) {
    var currDate = new Date();
    var currDay = currDate.getDay();
    var ret;
    if (i == 0) {
        if (currDay == 0) {
            ret = "Sun";
        } else if (currDay == 1) {
            ret = "Mon";
        } else if (currDay == 2) {
            ret = "Tue";
        } else if (currDay == 3) {
            ret = "Wed";
        } else if (currDay == 4) {
            ret = "Thu";
        } else if (currDay == 5) {
            ret = "Fri";
        } else if (currDay == 6) {
            ret = "Sat";
        }
    } else if (i == 1) {
        if (currDay == 0) {
            ret = "Mon";
        } else if (currDay == 1) {
            ret = "Tue";
        } else if (currDay == 2) {
            ret = "Wed";
        } else if (currDay == 3) {
            ret = "Thu";
        } else if (currDay == 4) {
            ret = "Fri";
        } else if (currDay == 5) {
            ret = "Sat";
        } else if (currDay == 6) {
            ret = "Sun";
        }
    } else if (i == 2) {
        if (currDay == 0) {
            ret = "Tue";
        } else if (currDay == 1) {
            ret = "Wed";
        } else if (currDay == 2) {
            ret = "Thu";
        } else if (currDay == 3) {
            ret = "Fri";
        } else if (currDay == 4) {
            ret = "Sat";
        } else if (currDay == 5) {
            ret = "Sun";
        } else if (currDay == 6) {
            ret = "Mon";
        }
    } else if (i == 3) {
        if (currDay == 0) {
            ret = "Wed";
        } else if (currDay == 1) {
            ret = "Thu";
        } else if (currDay == 2) {
            ret = "Fri";
        } else if (currDay == 3) {
            ret = "Sat";
        } else if (currDay == 4) {
            ret = "Sun";
        } else if (currDay == 5) {
            ret = "Mon";
        } else if (currDay == 6) {
            ret = "Tue";
        }
    } else if (i == 4) {
        if (currDay == 0) {
            ret = "Thu";
        } else if (currDay == 1) {
            ret = "Fri";
        } else if (currDay == 2) {
            ret = "Sat";
        } else if (currDay == 3) {
            ret = "Sun";
        } else if (currDay == 4) {
            ret = "Mon";
        } else if (currDay == 5) {
            ret = "Tue";
        } else if (currDay == 6) {
            ret = "Wed";
        }
    }
    return ret;
}

function weatherClick(dayNum) {
    var cont = document.getElementById("weatherC");
    var cont1 = document.getElementById("weatherC2");
    cont.classList.remove("show");
    cont1.classList.add("show");
    var con2Title = document.getElementsByClassName("weatherCon2-titleText")[0];
    if (dayNum == 0) {
        con2Title.innerHTML = "Today's Weather";
    } else if (dayNum == 1) {
        con2Title.innerHTML = "Tomorrow's Weather";
    } else {
        var dayClick = getWeatherDate(dayNum);
        if (dayClick == "Mon") {
            con2Title.innerHTML = "Monday's Weather";
        } else if (dayClick == "Tue") {
            con2Title.innerHTML = "Tuesday's Weather";
        } else if (dayClick == "Wed") {
            con2Title.innerHTML = "Wednesday's Weather";
        } else if (dayClick == "Thu") {
            con2Title.innerHTML = "Thursday's Weather";
        } else if (dayClick == "Fri") {
            con2Title.innerHTML = "Friday's Weather";
        } else if (dayClick == "Sat") {
            con2Title.innerHTML = "Saturday's Weather";
        } else if (dayClick == "Sun") {
            con2Title.innerHTML = "Sunday's Weather";
        }
    }
    (document.getElementsByClassName("weatherCon2-currIconImg")[0]).src = getWeatherIco(weatherIds[dayNum], weatherOther[1]);
    (document.getElementsByClassName("weatherCon2-currDescTitle")[0]).innerHTML = weatherDescriptions[dayNum];
    (document.getElementsByClassName("weatherCon2-bottomRow-text")[0]).innerHTML = weatherTempMax[dayNum] + "\xB0" + "/" + weatherTempMin[dayNum] + "\xB0";
    (document.getElementsByClassName("weatherCon2-bottomRow-text")[1]).innerHTML = weatherHumidity[dayNum] + "%";
    (document.getElementsByClassName("weatherCon2-bottomRow-text")[2]).innerHTML = weatherPressure[dayNum] + "hPa";
    (document.getElementsByClassName("weatherCon2-bottomRow-text")[3]).innerHTML = weatherWind[dayNum] + "mph";
    (document.getElementsByClassName("weatherCon2-bottomRow-windIcon")[0]).style.transform = "rotate(" + (180 + weatherWindDeg[dayNum]) + "deg)";
    (document.getElementsByClassName("weatherCon2-bottomRow-text")[4]).innerHTML = weatherSunrise[dayNum];
    (document.getElementsByClassName("weatherCon2-bottomRow-text")[5]).innerHTML = weatherSunset[dayNum];
}
function weatherBackBtn() {
    var cont = document.getElementById("weatherC");
    var cont1 = document.getElementById("weatherC2");
    cont1.classList.remove("show");
    cont.classList.add("show");
}