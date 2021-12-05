//this updates the current weather -sent by f.coordCity &/or f.search
function updateWeather(response) {
  document.querySelector("#current-city").innerHTML = response.data.name;

  let weatherDescription = document.querySelector("#weather-description");
  weatherDescription.innerHTML = response.data.weather[0].description;

  let temperature = Math.round(response.data.main.temp);
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = `${temperature}°F`;

  let humidity = Math.round(response.data.main.humidity);
  let humidityElement = document.querySelector("#humidity-element");
  humidityElement.innerHTML = `${humidity}%`;

  let wind = Math.round(response.data.wind.speed);
  let windElement = document.querySelector("#wind-element");
  windElement.innerHTML = `${wind}mph`;

  let icon = document.querySelector("#current-icon");
  icon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  icon.setAttribute("alt", response.data.weather[0].description);
  forecastApi(response.data.coord);
}

//this calls the API when you put in a city
function search(city) {
  let weatherApiKey = "a589138e19e414146bdc7b9f72b8baa4";
  let weatherAppEndpoint = "https://api.openweathermap.org/data/2.5/weather?q=";
  let weatherApiUrl = `${weatherAppEndpoint}${city}&units=imperial&appid=${weatherApiKey}`;

  axios.get(weatherApiUrl).then(updateWeather);
  console.log(weatherApiUrl);
}

//this allows you to put in a city in the searchbar
function handleInput(event) {
  event.preventDefault();
  let city = document.querySelector("#input-city").value;
  search(city);
}

//this fetches the coord API URL
function coordCity(position) {
  let weatherApiKey = "a589138e19e414146bdc7b9f72b8baa4";
  let coordWeatherApiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${weatherApiKey}&units=imperial`;

  axios.get(coordWeatherApiUrl).then(updateWeather);
  console.log(coordWeatherApiUrl);
}

//this allows Java Script to fetch coordinates & asks user for permisson to access location
function coordPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(coordCity);
}
//this defines the search bar and looks for movement there
let searchBar = document.querySelector("#search-bar");
searchBar.addEventListener("submit", handleInput);

//this defines the target button and looks for movement there
let myPosition = document.querySelector("#city-position");
myPosition.addEventListener("click", coordPosition);

//this is what the page will open to
search("New York");

//this fetches the forecast API
function forecastApi(coordinates) {
  let weatherApiKey = "a589138e19e414146bdc7b9f72b8baa4";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${weatherApiKey}&units=imperial`;
  axios.get(apiUrl).then(updateForecast);
}

//this formats the forecast days
function formatForecastDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  return days[day];
}

//this rearanges & updates inner html
function updateForecast(response) {
  let dailyForecast = response.data.daily;

  let forecastCard = document.querySelector("#weeklyForecast");

  let forecastHTML = `<div class="row forecastRow">`;
  dailyForecast.forEach(function (dailyForecast, index) {
    if (index < 4)
      forecastHTML =
        forecastHTML +
        `
    <div class="col-3 card">
      <div class="forecastDay">${formatForecastDay(dailyForecast.dt)}</div>
      <img
        src="http://openweathermap.org/img/wn/${
          dailyForecast.weather[0].icon
        }@2x.png" 
        alt="" class="forecastIcon" 
        width="126" />
      <div class="forecastTemps">
        <strong class="forecastTempMax">${Math.round(
          dailyForecast.temp.max
        )}°</strong>
        <span class="forexastTempMin">${Math.round(
          dailyForecast.temp.min
        )}°</span>
      </div>
    </div>
    `;
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastCard.innerHTML = forecastHTML;
}

//this sum bool

function formatTimeStamp(today) {
  let date = today.getDate();
  let year = today.getFullYear();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[today.getDay()];
  let months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
  ];
  let month = months[today.getMonth()];

  return `${day} ${month} ${date}, ${year} ${today.toLocaleString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  })}`;
}
let timeStamp = document.querySelector("#timestamp");
let currentTime = new Date();
timeStamp.innerHTML = formatTimeStamp(currentTime);
