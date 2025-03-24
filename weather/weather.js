const userLocation = document.getElementById("userLocation"),
      converter = document.getElementById("converter"),
      temperature = document.querySelector(".temperature"),
      feelsLike = document.querySelector(".feelsLike"),
      description = document.querySelector(".description"),
      date = document.querySelector(".date"),
      city = document.querySelector(".city"),
      Forecast = document.getElementById("Forecast");

const API_KEY = '2367b4ddd311724b9dc66036047a34cb';
const WEATHER_API_ENDPOINT = 'https://api.openweathermap.org/data/2.5/weather';
const FORECAST_API_ENDPOINT = 'https://api.openweathermap.org/data/2.5/forecast';

let tempCelsius = 0;
let feelsLikeCelsius = 0;

function findUserLocation() {
  const cityName = userLocation.value.trim();
  if (cityName === "") {
    alert("Please enter a city name");
    return;
  }
  fetchWeatherByCity(cityName);
}

function fetchWeatherByCity(cityName) {
  fetch(`${WEATHER_API_ENDPOINT}?q=${cityName}&appid=${API_KEY}&units=metric`)
    .then(response => response.json())
    .then(data => {
      if (data.cod === 200) {
        updateWeatherUI(data);
        tempCelsius = data.main.temp;
        feelsLikeCelsius = data.main.feels_like;
        updateTemperature();
      } else {
        alert("City not found. Please enter a valid city name.");
      }
    })
    .catch(error => console.error("Error fetching weather:", error));

  fetch(`${FORECAST_API_ENDPOINT}?q=${cityName}&appid=${API_KEY}&units=metric`)
    .then(response => response.json())
    .then(data => updateForecastUI(data))
    .catch(error => console.error("Error fetching forecast:", error));
}

function updateWeatherUI(data) {
  temperature.innerHTML = `${data.main.temp} °C`;
  feelsLike.innerHTML = `Feels Like: ${data.main.feels_like} °C`;
  description.innerHTML = data.weather[0].description;
  date.innerHTML = new Date().toLocaleDateString();
  city.innerHTML = data.name;
  HValue.innerHTML = `${data.main.humidity}%`;
  WValue.innerHTML = `${data.wind.speed} m/s`;
  SSValue.innerHTML = `${new Date(data.sys.sunset * 1000).toLocaleTimeString()}`;
  CValue.innerHTML = `${data.clouds.all}%`;
  UVValue.innerHTML = 'N/A';
  PValue.innerHTML = `${data.main.pressure} hPa`;
}

function updateForecastUI(forecastData) {
  let forecastHTML = "";
  forecastData.list.slice(0, 5).forEach(forecast => {
    forecastHTML += `
      <div class="forecast-item">
        <p>${new Date(forecast.dt * 1000).toLocaleDateString()}</p>
        <p>Temp: ${forecast.main.temp} °C</p>
        <p>${forecast.weather[0].description}</p>
      </div>
    `;
  });
  Forecast.innerHTML = forecastHTML;
}

function updateTemperature() {
  const unit = converter.value;
  if (unit === "°C") {
    temperature.textContent = `${tempCelsius.toFixed(2)} °C`;
    feelsLike.textContent = `Feels Like: ${feelsLikeCelsius.toFixed(2)} °C`;
  } else {
    const tempF = (tempCelsius * 9) / 5 + 32;
    const feelsLikeF = (feelsLikeCelsius * 9) / 5 + 32;
    temperature.textContent = `${tempF.toFixed(2)} °F`;
    feelsLike.textContent = `Feels Like: ${feelsLikeF.toFixed(2)} °F`;
  }
}

  