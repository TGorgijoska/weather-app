import fetchWeather from "./model.js";
import loadPage from "./view.js";

const key = '385a639dc1d7268963aee07c275a219d';
const btn = document.getElementById('search-btn')

btn.addEventListener('click', handleSearch);

async function handleSearch(){
    try {
        const city = document.getElementById('cityInput').value;
        const format = document.getElementById('format').value;
        const weatherInfo = await fetchWeather(key, city, format);
        loadPage(city, weatherInfo, format);     
    }
    catch (err){
        console.log(err);
    }
}
