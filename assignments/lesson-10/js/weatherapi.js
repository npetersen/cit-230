apiURL = "https://api.openweathermap.org/data/2.5/weather?id=5604473&units=imperial&appid=003d0dc716b994bd0c126c319d745b07";
iconURL = "https://openweathermap.org/img/w/";
weatherRequest = new XMLHttpRequest();

weatherRequest.open('GET', apiURL);
weatherRequest.responseType = 'json';
weatherRequest.send();

weatherRequest.onload = function() {
    var weatherData = weatherRequest.response;
    populateWeatherData(weatherData);

    //console.log(weatherData);
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

    if (weatherIcon) { weatherIcon.setAttribute('src', iconURL + weatherData.weather[0].icon + '.png'); }
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
