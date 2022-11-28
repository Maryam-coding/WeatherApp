// Feature 1: Current Data & Time
function changeDate() {
  let today = now.getDate();

  let currentDate = document.querySelector("#current-date");

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Satday",
  ];
  let day = days[now.getDay()];

  let months = [
    "January",
    "Febuary",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let month = months[now.getMonth()];

  let year = now.getFullYear();

  currentDate.innerHTML = `${day}, ${month} ${today}, ${year}`;
}
let now = new Date();
let currentDate = document.querySelector("#current-date");
changeDate();

function changeTime() {
  let currentTime = document.querySelector("#current-time");

  let hours = now.getHours();

  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  currentTime.innerHTML = `${hours}:${minutes}`;
}
let currentTime = document.querySelector("#current-time");

changeTime();

// Feature 2: Change City Name to Search Bar Input
function changeCity(event) {
  event.preventDefault();
  let currentCity = document.querySelector("#current-city");
  let searchFormInput = document.querySelector("#search-form-input");
  currentCity.innerHTML = `${searchFormInput.value}`;
}
let currentCity = document.querySelector("#current-city");
let form = document.querySelector("#search-form");
let searchBarInput = document.querySelector("#search-form-input");

form.addEventListener("submit", changeCity);

// Search Engine
function searchEngine() {
  let apiKey = "6f578b96aa9505bcce148ac22cb85794";
  let units = "metric";
  let city = document.querySelector("#search-form-input").value;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showWeather);
}

searchEngine();

function showWeather(response) {
  let currentCity = document.querySelector("#current-city");
  currentCity.innerHTML = response.data.name;

  let temperature = Math.round(response.data.main.temp);
  let currentWeather = document.querySelector("#current-weather");
  currentWeather.innerHTML = `${temperature}`;

  let humidity = Math.round(response.data.main.humidity);
  let currentHumidity = document.querySelector("#humidity");
  currentHumidity.innerHTML = `Humidity: ${humidity}%`;

  let currentWindSpeed = document.querySelector("#wind-speed");
  let windSpeed = Math.round(response.data.wind.speed);
  currentWindSpeed.innerHTML = `Windspeed: ${windSpeed}mph`;

  let currentConditions = document.querySelector("#conditions");
  let conditions = response.data.weather[0].main;
  currentConditions.innerHTML = `${conditions}`;
}

//Current Location Button
function currentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(currentPosition);
}

function currentPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "6f578b96aa9505bcce148ac22cb85794";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(showWeather);
}

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", currentLocation);
