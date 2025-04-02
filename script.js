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
        /* const weather = current.weather[0].main.toLowerCase() */

        let weather = current.weather[0].main.toLowerCase();


        /* weather = "rain"  */
      
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

        const messageElement = document.getElementById("stockholm-heading");
        /* let message = ""; */
  
        if (weather === "clear") {
          messageElement.innerHTML = `
          <i class="fa-solid fa-sun icon"></i> <p> Get your sunnies on! <br> Stockholm is looking rather great today.</p> 
          `;
          document.getElementById("stockholm-heading").classList.add('sunny-text')
          document.getElementById("weather-box").classList.add('sunny-text', 'capitalize')
          document.getElementById("forecast").classList.add('sunny-text')
          document.getElementById("app-container").classList.add('sunny')

        } else if (weather === "rain") {
          messageElement.innerHTML =  `
          <i class="fa-solid fa-umbrella icon"></i> <p> Don't forget your umbrella. <br> It’s wet in Stockholm today.</p> 
          `;
          document.getElementById("stockholm-heading").classList.add('rainy-text')
          document.getElementById("weather-box").classList.add('rainy-text' , 'capitalize')
          document.getElementById("forecast").classList.add('rainy-text')
          document.getElementById("app-container").classList.add('rainy')

        } else if (weather === "clouds") {
          messageElement.innerHTML =  ` 
          <i class="fas fa-cloud icon"></i>
          <p>Don't let the grey get you down.<br>Stockholm is looking cloudy today.</p>
        `;
          document.getElementById("stockholm-heading").classList.add('cloudy-text')
          document.getElementById("weather-box").classList.add('cloudy-text', 'capitalize')
          document.getElementById("forecast").classList.add('cloudy-text')
          document.getElementById("app-container").classList.add('cloudy')

        } else {
          messageElement.innerHTML = `
          <p>The weather in Stockholm is currently: ${current.weather[0].description}. </p>
          ` ;
        }
  
        /* messageElement.textContent = message; */
        
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
