const fetchStockholmWeather = () => {
    fetch("https://api.openweathermap.org/data/2.5/forecast?lat=59.3293&lon=18.0686&appid=2763c58dedac9a282a2495ed4f349bae&units=metric")
      .then(response => response.json())
      .then(data => {
        console.log(data);
  
        if (!data.list || data.list.length === 0) {
          console.error("Inget väderdata hittades");
          return;
        }
        const current = data.list[0];
        const weather = current.weather[0].main.toLowerCase()
      
        const messageElement = document.getElementById("stockholm-heading");

        const sunriseUnix = data.city.sunrise;
        const sunsetUnix = data.city.sunset;


        const sunriseTime = new Date(sunriseUnix * 1000).toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
            hour12: false
            });

            const sunsetTime = new Date(sunsetUnix * 1000).toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
            hour12: false
            });

        let message = "";
  
        if (weather === "clear") {
          message = "😎 Get your sunnies on. Stockholm is looking rather great today.";
          document.getElementById("stockholm-heading").classList.add('sunny-text')
          document.body.classList.add("sunny");

        } else if (weather === "rain") {
          message = "☔ Don't forget your umbrella. It’s wet in Stockholm today.";
          document.getElementById("stockholm-heading").classList.add('rainy-text')
          document.body.classList.add("rainy");

        } else if (weather === "clouds") {
          message = "☁️ Light a fire and get cosy. Stockholm is looking grey today.";
          document.getElementById("stockholm-heading").classList.add('cloudy-text')
          document.body.classList.add("cloudy");

        } else {
          message = `The weather in Stockholm is currently: ${current.weather[0].description}.`;
        }
  
        messageElement.textContent = message;
        
        document.getElementById("description").textContent = current.weather[0].description;
        document.getElementById("temperature").textContent = current.main.temp + "°C";
        document.getElementById("sunrise").textContent = sunriseTime;
        document.getElementById("sunset").textContent = sunsetTime;
      })
      .catch(error => console.error("Något gick fel:", error));
  };
  
 

const fetchForecast = () => {
    fetch("https://api.openweathermap.org/data/2.5/forecast?lat=59.3293&lon=18.0686&appid=2763c58dedac9a282a2495ed4f349bae&units=metric")
    .then(response => response.json())
    .then( data => {
        const forecasts = data.list.filter(item => item.dt_txt.includes("12:00:00"));
        displayForecast(forecasts);
    });
};

const displayForecast = (dailyForecasts) => {
    const weekdays = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
    const forecastContainer = document.getElementById("forecast");
    forecastContainer.innerHTML = ""; 
  
    dailyForecasts.forEach(forecast => {
      const date = new Date(forecast.dt_txt);
      const dayName = weekdays[date.getDay()];
      const temp = Math.round(forecast.main.temp);
  
      const row = document.createElement("div");
      row.innerHTML = `
        <span>${dayName}</span>
        <span>${temp}°</span>
      `;
      row.classList.add("forecast-row");
      forecastContainer.appendChild(row);
    });
  };
  
  fetchStockholmWeather();
  fetchForecast();
