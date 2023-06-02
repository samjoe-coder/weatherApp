      const form = document.getElementById('weatherForm');
      const weatherInfo = document.getElementById('weatherInfo');

      form.addEventListener('submit', function(e) {
        e.preventDefault();
        const city = document.getElementById('city').value;
        getWeather(city);
      });

      function getWeather(city) {
        const apiKey = 'e879bce9f632e7c3da6f0593989900ce';
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

        fetch(apiUrl)
          .then(response => response.json())
          .then(data => {
            if (data.cod === '404') {
              weatherInfo.innerHTML = '<p>City not found. Please try again.</p>';
            } else {
              const temperature = Math.round(data.main.temp - 273.15);
              const humidity = data.main.humidity;
              const windSpeed = data.wind.speed;
              weatherInfo.innerHTML = `
                <p>City: ${data.name}</p>
                <p>Temperature: ${temperature}&deg;C</p>
                <p>Humidity: ${humidity}%</p>
                <p>Wind Speed: ${Math.round(windSpeed*3.6)} Km/H</p>
              `;
            }
          })
          .catch(error => {
            console.log('Error:', error);
            weatherInfo.innerHTML = '<p>An error occurred. Please try again later.</p>';
          });
      }