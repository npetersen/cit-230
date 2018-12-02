townID = getQueryVariable('id');

if (!townID || townID.length != 7) {
    alert('A valid town identifier is required. Please choose a town from the main navigation menu');
    location.href = 'index.html';
}

currentWeatherURL = "https://api.openweathermap.org/data/2.5/weather?id=" + townID + "&units=imperial&appid=003d0dc716b994bd0c126c319d745b07";
forecastWeatherURL = "https://api.openweathermap.org/data/2.5/forecast?id=" + townID + "&units=imperial&appid=003d0dc716b994bd0c126c319d745b07";
iconURL = "https://openweathermap.org/img/w/";

weatherRequest = new XMLHttpRequest();
weatherRequest.open('GET', currentWeatherURL);
weatherRequest.responseType = 'json';
weatherRequest.send();

forecastRequest = new XMLHttpRequest();
forecastRequest.open('GET', forecastWeatherURL);
forecastRequest.responseType = 'json';
forecastRequest.send();

weatherRequest.onload = function() {
    var weatherData = weatherRequest.response;
    populatePageContent(townID);
    populateWeatherData(weatherData);
}

forecastRequest.onload = function() {
    var forecastData = forecastRequest.response;
    populateForecastData(forecastData);
}

function populateWeatherData(json) {

    var weatherData = json;
    var weatherIcon = document.getElementById('weather-icon');
    var weatherAtGlance = document.getElementById('weather-at-glance');
    var currentCondition = document.getElementById('current-condition');
    var currentTemp = document.getElementById('current-temp');
    var currentHumidity = document.getElementById('current-humidity');
    var currentPrecip = document.getElementById('current-precip');
    var windSpeed = document.getElementById('wind-speed');
    var windChill = document.getElementById('wind-chill');

    if (weatherIcon) { weatherIcon.src = iconURL + weatherData.weather[0].icon + '.png' }
    if (weatherAtGlance) { weatherAtGlance.innerHTML = weatherData.weather[0].description + " " + Math.round(weatherData.main.temp) + "&deg" }
    if (currentCondition) { currentCondition.innerHTML = weatherData.weather[0].description }
    if (currentTemp) { currentTemp.innerHTML = Math.round(weatherData.main.temp) + "&deg; F"; }
    if (currentHumidity) { currentHumidity.innerHTML = weatherData.main.humidity + "%"; }
    if (currentPrecip && weatherData.hasOwnProperty('rain')) { 
        currentPrecip.innerHTML = weatherData.rain['1h'] + " inches"; 
    } else {
        currentPrecip.innerHTML = "Not Available"
    }
    if (windSpeed) { windSpeed.innerHTML = weatherData.wind.speed + " mph" }
    if (windChill) { windChill.innerHTML = calcWindChill(weatherData) + "&deg;" }

}

function populateForecastData(json) {
    
    var forecastData = json;
    var date = new Date();
    var today = date.getDay();
    var days = ['Sun', 'Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat'];
    var tbody = document.getElementById('forecast').children[2].children[0];
    var fiveDayForecast = [];

    for (var i = 0; i < forecastData.list.length; i++) {
        if (forecastData.list[i].dt_txt.includes('15:00:00')) {
            fiveDayForecast.push(forecastData.list[i].main.temp_max);
        }
    }

    for (var i = 0; i < fiveDayForecast.length; i++) {
        var node = document.createElement('td');
        var nodeText = document.createTextNode(Math.round(fiveDayForecast[i])); 
        node.appendChild(nodeText);
        tbody.appendChild(node).insertAdjacentHTML('beforeend', '&deg; F');
    }

}

function populatePageContent(townID) {

    var townName;
    var titleText;
    var townHeroImg;

    if (townID == 5604473) {
        townName = "Preston";
        titleText = " - Where the city meets the mountains";
        townHeroImg = "images/hero-preston.jpg";
    } else if (townID == 5607916) {
        townName = "Soda Springs";
        titleText = " - The Outdoors at Your Front Door";
        townHeroImg = "images/hero-soda-springs.jpg";
    } else if (townID == 5585010) {
        townName = "Fish Haven";
        titleText = " - The Small Town in Idaho You Will Fall In Love With";
        townHeroImg = "images/hero-fish-haven.jpg";
    }

    document.title = "Weather or Not - " + townName + titleText;
    document.getElementById('town-page-h1').innerHTML = "The Town of " + townName;
    document.getElementById('hero-image').src = townHeroImg;
    document.getElementById('forecast').children[0].innerHTML = townName + " Five Day Forecast";

}

function calcWindChill(json) {

    var weatherData = json;
    var wind;
    var temp;
    var chill;

    wind = parseInt(weatherData.wind.speed);
    temp = parseInt(weatherData.main.temp);
    chill = (0.0817 * (3.71 * (Math.pow(wind, 0.5)) + 5.81 - 0.25 * wind) * (temp - 91.4) + 91.4);

    return Math.round(chill);

}

function getQueryVariable(variable) {
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=");
        if (pair[0] == variable) {
            return pair[1];
        }
    }
    
    return(false);
}
