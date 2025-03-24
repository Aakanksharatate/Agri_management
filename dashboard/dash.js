const apiKey = '2367b4ddd311724b9dc66036047a34cb';

function findUserLocation() {
  const city = document.getElementById('userLocation').value;
  const unit = document.getElementById('converter').value === '°C' ? 'metric' : 'imperial';

  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${unit}`)
    .then(response => response.json())
    .then(data => {
      const temperature = data.main.temp;
      const feelsLike = data.main.feels_like;
      const weatherDescription = data.weather[0].description;
      const iconCode = data.weather[0].icon;
      const date = new Date().toLocaleDateString();

      let suggestion = "";
      if (weatherDescription.includes('clear')) {
        suggestion = "It's going to be a sunny day.";
      } else if (weatherDescription.includes('cloud')) {
        suggestion = "Expect a cloudy sky.";
      } else if (weatherDescription.includes('rain')) {
        suggestion = "Carry an umbrella, rain is expected.";
      } else if (weatherDescription.includes('storm')) {
        suggestion = "Stay safe, possible storm today.";
      } else {
        suggestion = "Weather is normal today.";
      }

      document.querySelector('.current-weather').innerHTML = `
        <img src="https://openweathermap.org/img/wn/${iconCode}@2x.png" class="weather-icon" alt="Weather Icon" style="width: 60px; height: 60px; ">
        <h2 class="temperature">${temperature}°${unit === 'metric' ? 'C' : 'F'}</h2>
        <p class="feelsLike">Feels Like: ${feelsLike}°${unit === 'metric' ? 'C' : 'F'}</p>
        <p class="description">${weatherDescription}</p>
        <p class="suggestion">${suggestion}</p>
        <p class="date">${date}</p>
        <p class="city">${city}</p>
      `;
    })
    .catch(error => {
      console.error('Error fetching weather:', error);
      document.querySelector('.current-weather').innerHTML = `<p>City not found or API error</p>`;
    });
}
