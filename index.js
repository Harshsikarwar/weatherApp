
async function fetchWeather(city){
    const apiKey="7f8d19071a4590ea941ca5d71b869c2d";
    const apiUrl = "https://api.openweathermap.org/data/2.5/weather?" + "appid=" + apiKey + "&q=" + city;
    
    let data;
    if(city != ""){
        try{
            const response = await fetch(apiUrl);
                
            if(!response.ok){
                console.error("HTTP error", response.status);
            }
            data = await response.json();
        }
        catch(err){
            alert("error: somthing went wrong, check your internet connection")
            return
        }
    }
    else{
        return;
    }

    let Main = [data.main.temp, data.main.feels_like, data.main.temp_min, data.main.temp_max, data.main.humidity, data.main.pressure];
    let Weather = [data.weather[0].main, data.weather[0].description, data.weather[0].icon];
    let wind = [data.wind.speed, data.wind.deg, data.wind.gust];
    console.log("Data:", data);
    console.log("Main:", Main);
    console.log("Weather:", Weather);
    console.log("Wind:", wind);

    const weatherInfo = document.getElementById("weatherInfo");

    const cityName = document.getElementById("cityName");
    const currTemp = document.getElementById("currTemp");
    const dicription = document.getElementById("descript");
    const feelsLike = document.getElementById("feelslike");
    const minTemp = document.getElementById("minTemp");
    const maxTemp = document.getElementById("maxTemp");
    const humidity = document.getElementById("humidity");
    const pressure = document.getElementById("pressure");
    const windSpeed = document.getElementById("windSpeed");
    const weatherIcon = document.getElementById("weatherLogo");

    weatherInfo.style.display = "flex";
    weatherIcon.src = `https://openweathermap.org/img/wn/${Weather[2]}@2x.png`;

    cityName.innerText=city;
    currTemp.innerText = Math.round(Main[0] - 273.15) + "°C";
    dicription.innerText = Weather[0] + " - " + Weather[1];
    feelsLike.innerText = "Feels Like : " + Math.round(Main[1] - 273.15) + "°C";
    minTemp.innerText = "Min Temprature : " + Math.round(Main[2] - 273.15) + "°C";
    maxTemp.innerText = "Max Temprature : " + Math.round(Main[3] - 273.15) + "°C";
    humidity.innerText = "Humidity : " + Main[4] + "%";
    pressure.innerText = "Pressure : " + Main[5] + " hPa";
    windSpeed.innerText = "Wind Speed : " + wind[0] + " m/s";
}

const city = document.getElementById("cityInput");
const search = document.querySelectorAll("#search");


search.forEach(()=>{
    addEventListener("click",()=>{
        fetchWeather(city.value);
    })
})
