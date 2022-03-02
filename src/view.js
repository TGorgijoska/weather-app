import {format, fromUnixTime, getHours, parseISO } from 'date-fns';

    export default function loadPage (city, data){
        reset();
        const date = format(fromUnixTime(data.current.dt), 'EEEE, MMM d yyyy');
        const time = format(fromUnixTime(data.current.dt), 'kk:mm');
        const sunset = format(fromUnixTime(data.current.sunset), 'kk:mm');
        const sunrise = format(fromUnixTime(data.current.sunrise), 'kk:mm');
        setBG(time, sunrise, sunset);
        renderCurrentSection(city, date, data.current.temp, data.current.weather[0].main, sunrise, sunset, data.current.weather[0].icon);
        renderFutureSection(data.daily);
    }

    const renderCurrentSection = (city, datetime, dataTemp, dataDescr, sunrise, sunset, icon) =>{
        const section = document.querySelector('.currentSection');

        const name = document.createElement('h1');
        name.setAttribute('id', 'cityName');
        name.textContent = city;

        const date = document.createElement('p');
        date.setAttribute('id', 'date');
        date.textContent = datetime;

        const temp = document.createElement('h2');
        temp.setAttribute('id', 'temp');
        temp.textContent = dataTemp;

        const descr = document.createElement('p');
        descr.setAttribute('id', 'descr');
        descr.textContent = dataDescr;

        const iconImg = document.createElement('img');
        iconImg.setAttribute('src', `http://openweathermap.org/img/wn/${icon}.png`)
        descr.appendChild(iconImg);

        const sunGroup = document.createElement('p');
        sunGroup.classList.add('sun');
        sunGroup.textContent = `${sunrise} / ${sunset}`;

        section.appendChild(name)
        section.appendChild(date)
        section.appendChild(temp)
        section.appendChild(descr)
        section.appendChild(sunGroup);

    }
    const renderFutureSection = (days) => {
        const section = document.querySelector('.futureSection');

        days.forEach(day => {
            let dayName = format(fromUnixTime(day.dt), 'EEEE');
            section.appendChild(renderDay(day.temp.min, day.temp.max, dayName))
        })
    }
    const renderDay = (tempMin, tempMax, dayName) =>{
        const div = document.createElement('div');
        const temp = document.createElement('p');
        const day = document.createElement('p');

        div.className = 'day-group';
        temp.className = 'minmax';
        temp.textContent = `${tempMin}°C / ${tempMax}°C`;
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
        const current = getHours(parseISO(time));
        const rise = getHours(parseISO(sunrise));
        const set = getHours(parseISO(sunset))
        if(current < rise) console.log('night')
        if(current > set) console.log('night')
        if(current > rise && current < set) console.log('day')
    }