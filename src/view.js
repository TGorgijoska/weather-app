import {format, fromUnixTime} from 'date-fns';

    export function loadPage (city, data, unit){
        reset();
        const date = format(fromUnixTime(data.current.dt), 'EEEE, MMM d yyyy');
        const time = format(fromUnixTime(data.current.dt), 'kk:mm');
        const sunset = format(fromUnixTime(data.current.sunset), 'kk:mm');
        const sunrise = format(fromUnixTime(data.current.sunrise), 'kk:mm');
        setBG(time, sunrise, sunset);
        renderCurrentSection(city, date, Math.round(data.current.temp), data.current.weather[0].main, sunrise, sunset, data.current.weather[0].icon, unit);
        renderFutureSection(data.daily, unit);
    }
    export function handleError(){
        reset();
        const section = document.querySelector('.currentSection');
        section.innerHTML = 'There was an error, try again'
    }

    const renderCurrentSection = (city, datetime, dataTemp, dataDescr, sunrise, sunset, icon, unit) =>{
        const section = document.querySelector('.currentSection');

        const name = document.createElement('h1');
        name.setAttribute('id', 'cityName');
        name.textContent = city;

        const date = document.createElement('p');
        date.setAttribute('id', 'date');
        date.textContent = datetime;

        const temp = document.createElement('h2');
        temp.setAttribute('id', 'temp');
        unit == 'metric' ? temp.textContent = `${dataTemp} °C` : temp.textContent = `${dataTemp} F`;
        // temp.textContent = dataTemp;

        const descr = document.createElement('p');
        descr.setAttribute('id', 'descr');
        descr.textContent = dataDescr;

        const iconImg = document.createElement('img');
        iconImg.setAttribute('src', `http://openweathermap.org/img/wn/${icon}@2x.png`)
        
        const sunGroup = document.createElement('p');
        sunGroup.classList.add('sun');
        sunGroup.textContent = `sunrise: ${sunrise} / sunset: ${sunset}`;
        
        section.appendChild(descr)
        section.appendChild(iconImg);
        section.appendChild(name)
        section.appendChild(date)
        section.appendChild(temp)
        section.appendChild(sunGroup);

    }
    const renderFutureSection = (days, unit) => {
        const section = document.querySelector('.futureSection');

        days.forEach(day => {
            let dayName = format(fromUnixTime(day.dt), 'EEEE');
            section.appendChild(renderDay(Math.round(day.temp.min), Math.round(day.temp.max), dayName, unit))
        })
    }
    const renderDay = (tempMin, tempMax, dayName, unit) =>{
        const div = document.createElement('div');
        const temp = document.createElement('p');
        const day = document.createElement('p');

        div.className = 'day-group';
        temp.className = 'minmax';
        unit == 'metric' ? temp.textContent = `${tempMin}°C / ${tempMax}°C` : temp.textContent = `${tempMin} F / ${tempMax} F`;
        day.classList = 'dayName';
        day.textContent = dayName;
        div.appendChild(temp);
        div.appendChild(day);
        return div;
    }
    const reset = () => {
        document.querySelector('.currentSection').innerHTML = '';
        document.querySelector('.futureSection').innerHTML = '';
    }
    const setBG = (time, sunrise, sunset) => {
        const current = parseInt(time.slice(0,2));
        const rise = parseInt(sunrise.slice(0,2));
        const set = parseInt(sunset.slice(0,2));
        if(current < rise || current > set) {
            document.querySelector('body').className = 'night';
        }
        if(current > rise && current < set) {
            document.querySelector('body').className = 'day';
            
        }
    }