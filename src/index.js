import fetchWeather from "./model.js";
import {loadPage, handleError} from "./view.js";

const key = '385a639dc1d7268963aee07c275a219d';
const btn = document.getElementById('search-btn')

btn.addEventListener('click', handleSearch);

async function handleSearch(){
    try {
        const city = document.getElementById('cityInput').value;
        if(/\d/.test(city)) throw new Error;
        const format = document.getElementById('format').value;
        const weatherInfo = await fetchWeather(key, city, format);
        loadPage(city, weatherInfo, format);     
    }
    catch (err){
        handleError(err);
    }
}
