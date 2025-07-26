   const apiKey = 'eda7bfad4ea2d91063c0256643d2019c';

    function setBackground(condition) {
  const backgrounds = {
    Clear : 'https://png.pngtree.com/thumb_back/fw800/background/20231205/pngtree-overcast-sky-and-a-striking-blue-sky-texture-image_13820125.png',
    Clouds: 'https://live.staticflickr.com/1828/28636482297_bd428f26e8_b.jpg',
    'Broken Clouds': 'https://live.staticflickr.com/1828/28636482297_bd428f26e8_b.jpg',
    'Overcast Clouds': 'https://png.pngtree.com/thumb_back/fw800/background/20231205/pngtree-overcast-sky-and-a-striking-blue-sky-texture-image_13820125.png',
    Rain: 'https://images.pexels.com/photos/110874/pexels-photo-110874.jpeg',
    Drizzle: 'https://images.pexels.com/photos/110874/pexels-photo-110874.jpeg',
    Thunderstorm: 'https://images.pexels.com/photos/53459/lightning-thunderstorm-weather-sky-53459.jpeg',
    Snow: 'https://images.pexels.com/photos/60561/snow-winter-season-cold-60561.jpeg',
    Mist: 'https://images.pexels.com/photos/4827/nature-forest-trees-fog.jpeg',
    Fog: 'https://images.pexels.com/photos/672358/pexels-photo-672358.jpeg',
    Haze: 'https://images.pexels.com/photos/216671/pexels-photo-216671.jpeg',
    Smoke: 'https://images.pexels.com/photos/92923/pexels-photo-92923.jpeg',
    Dust: 'https://images.pexels.com/photos/3227981/pexels-photo-3227981.jpeg',
    Sand: 'https://images.pexels.com/photos/2606534/pexels-photo-2606534.jpeg',
    Ash: 'https://images.pexels.com/photos/268245/pexels-photo-268245.jpeg',
    Squall: 'https://images.pexels.com/photos/1048531/pexels-photo-1048531.jpeg',
    Tornado: 'https://images.pexels.com/photos/80445/tornado-desert-clouds-storm-80445.jpeg'
  };

  // If exact match, use it; else, try a fallback
  const imageUrl = backgrounds[condition] || backgrounds[condition.toLowerCase()] || 'https://live.staticflickr.com/1828/28636482297_bd428f26e8_b.jpg';
  document.body.style.backgroundImage = `url("${imageUrl}")`;
}


    async function getWeather() {
      const location = document.getElementById('location').value;
      const currentUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`;
      const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${location}&appid=${apiKey}&units=metric`;

      const currentEl = document.getElementById('current-weather');
      const forecastEl = document.getElementById('forecast');

      try {
        const currentRes = await fetch(currentUrl);
        const currentData = await currentRes.json();

        if (currentData.cod !== 200) {
          currentEl.innerHTML = `
            <div class="not-found">
              <h3>Oops! City not found 😕</h3>
              <img src="https://media.giphy.com/media/3o6ZtaO9BZHcOjmErm/giphy.gif" width="150" />
            </div>
          `;
          forecastEl.innerHTML = '';
          return;
        }

        setBackground(currentData.weather[0].main);
        currentEl.innerHTML = `
          <div class="current-box">
            <h3>${currentData.name}</h3>
            <p><strong>Temperature:</strong> ${currentData.main.temp} °C</p>
            <p><strong>Humidity:</strong> ${currentData.main.humidity}%</p>
            <p><strong>Weather:</strong> ${currentData.weather[0].description}</p>
            <p><strong>Wind Speed:</strong> ${currentData.wind.speed} m/s</p>
          </div>
        `;

        const forecastRes = await fetch(forecastUrl);
        const forecastData = await forecastRes.json();

        const dailyData = {};
        forecastData.list.forEach(item => {
          const date = item.dt_txt.split(' ')[0];
          if (!dailyData[date]) {
            dailyData[date] = item;
          }
        });

        const forecastList = Object.values(dailyData).slice(1, 4);

        forecastEl.innerHTML = forecastList.map(day => `
          <div class="forecast-day ${day.weather[0].main}">
            <p><strong>${day.dt_txt.split(' ')[0]}</strong></p>
            <p>🌡️ ${day.main.temp} °C</p>
            <p>💧 ${day.main.humidity}% Humidity</p>
            <p>${day.weather[0].description}</p>
          </div>
        `).join('');

      } catch (error) {
        console.error("Failed to fetch weather data:", error);
        currentEl.innerHTML = `<p style="color:red;">Something went wrong!</p>`;
        forecastEl.innerHTML = '';
      }
    }
    // Replace 'cityInput' with the actual ID of your input field
const input = document.getElementById("cityInput");
const button = document.getElementById("getWeatherBtn"); // Assuming your button has this ID

input.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    event.preventDefault(); // Prevents form submission (if inside a form)
    button.click();         // Simulates clicking the button
  }
});
