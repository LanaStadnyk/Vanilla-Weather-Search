function formatDate(timestamp) {
  let date = new Date(timestamp);
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return ` ${day} ${hours}:${minutes}`;
}

function displayTemperature(response) {
  celsiusTemperature = response.data.temperature.current;
  document.querySelector("#temperature").innerHTML =
    Math.round(celsiusTemperature);
  document.querySelector("#humidity").innerHTML =
    response.data.temperature.humidity;
  document.querySelector("#wind-speed").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#condition").innerHTML =
    response.data.condition.description;
  document.querySelector("#city").innerHTML = response.data.city;
  document.querySelector("#date").innerHTML = formatDate(
    response.data.time * 1000
  );
  document
    .querySelector("#weather-icon")
    .setAttribute("src", `${response.data.condition.icon_url}`);
  document
    .querySelector("#weather-icon")
    .setAttribute("alt", `${response.data.condition.description}`);
}

function search(city) {
  let apiKey = "124ftfab6b55c54beo58d91354585001";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#search-input");
  search(cityInput.value);
}

function displayFahrenheitTemperature(event) {
  event.preventDefault();
  document.querySelector("#temperature").innerHTML = Math.round(
    (celsiusTemperature * 9) / 5 + 32
  );
  document.querySelector("#fahrenheit-link").classList.add("active");
  document.querySelector("#celsius-link").classList.remove("active");
}

function displayCelsiusTemperature(event) {
  event.preventDefault();
  document.querySelector("#temperature").innerHTML =
    Math.round(celsiusTemperature);
  document.querySelector("#celsius-link").classList.add("active");
  document.querySelector("#fahrenheit-link").classList.remove("active");
}

function displayForecast() {
  let forecastHTML = `<div class="row">`;
  let days = ["Sun", "Mon", "Tue"];
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `<div class="col-2">
<div class="forecast-date">${day}</div>
<img
  src="https://ssl.gstatic.com/onebox/weather/64/rain.png"
  alt=""
  width="48"
/>
<div class="forecast-temperatures">
  <span class="forecast-temperature-max"> 12° </span>
  <span class="forecast-temperature-min"> 4° </span>
</div>
</div>`;
  });
  forecastHTML = forecastHTML + `</div>`;
  document.querySelector("#forecast").innerHTML = forecastHTML;
}

celsiusTemperature = null;

document.querySelector("#search-form").addEventListener("submit", handleSubmit);

document
  .querySelector("#fahrenheit-link")
  .addEventListener("click", displayFahrenheitTemperature);
document
  .querySelector("#celsius-link")
  .addEventListener("click", displayCelsiusTemperature);

search("Odesa");
displayForecast();
