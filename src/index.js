import "./style.css"


async function fetchWeatherForecast(location){
    try{
        let country = encodeURIComponent(location);
        const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${country}?unitGroup=us&key=WLNQNBT3KPZRH9ULRPRUARC88`);
        if(!response.ok){
            throw new Error(`HTTP error! Status : ${response.status}`);
        }
        const weatherDatas = await response.json();
        const weatherData = processJSON(weatherDatas);
        displayWeather(weatherData);
        
    }catch (error){
        console.error(`Error fetching data:`, error);
    }
}

function processJSON(data){
    let DayWaether = [];
    for (let i = 0 ; i < 15 ; i++){
        DayWaether.push({
            location : data.resolvedAddress,
            date : data.days[i].datetime,
            temperature : data.days[i].temp,
            humidity : data.days[i].humidity,
            windSpeed : data.days[i].windspeed,
            summary : data.days[i].description
        })
    }
    return DayWaether;
}

function searchWeather(){
    const searchInput = document.getElementById("countryName").value;
    fetchWeatherForecast(searchInput);
}

function displayWeather(data){
    const div = document.getElementById("result");
    div.innerHTML = "";
    div.innerHTML = `<h1>${data[0].location}</h1>`;
    for(let j = 0; j < 15 ; j++){
        const sdiv = document.createElement("div");
        sdiv.innerHTML = `
            <h3>Date : ${data[j].date}</h3>
            <h5>Temperature : ${data[j].temperature}</h5>
            <h5>Humidity : ${data[j].humidity}</h5>
            <h7>Wind Speed : ${data[j].windSpeed}</h7>
            <h4>Summary : ${data[j].summary}</h4>
        `;
        div.appendChild(sdiv);  
    }
}

const submitBtn = document.getElementById("submit");
submitBtn.addEventListener("click" , searchWeather);

const search = document.getElementById("countryName");
search.addEventListener("keydown", (event) => {
    if(event.key === "Enter"){
        searchWeather();
    }
});


