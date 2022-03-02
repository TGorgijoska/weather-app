async function fetchWeather(key, city, format){
    try{
        const cityCoords = await geocoding(city, key);
        const lat = cityCoords.lat;
        const lon = cityCoords.lon;
        const response = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=${format}&appid=${key}`,{mode:'cors'});
        const result = await response.json();
        console.log(result);
        return result;
    }
    catch (err){
        return err;
    }
    
}
async function geocoding(city, key){
    try {
        const response = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&&appid=${key}`, {mode: 'cors'});
        const result = await response.json();
        return {
            'lat': result[0].lat,
            'lon': result[0].lon, 
         }
    }
    catch(error) {
        return error;
    }
}

export default fetchWeather;