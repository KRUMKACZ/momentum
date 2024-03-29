const weatherIcon = document.querySelector('.weather-icon');
const temperature = document.querySelector('.temperature');
const weatherDescription = document.querySelector('.weather-description');
const wind = document.querySelector('.wind');
const humidity = document.querySelector('.humidity');
const weatherContent = document.querySelector('.weather-content');
let city = document.querySelector('.city');

const weatherSettingHidden = document.querySelector('.weather');
localStorage.getItem('switchWeather') == 0 ? weatherSettingHidden.classList.add('hidden') : weatherSettingHidden.classList.remove('hidden');

// Сохранение введенного имени в Local Storage
function setCityWeather() {
    localStorage.setItem('city', city.value); // Сохраняем введенные данные
}
window.addEventListener('beforeunload', setCityWeather);

// Получение города из Local Storage
function getCityWeather() {
    if (localStorage.getItem('city')) { // Выводим данные если они сохранены 
        city.value = localStorage.getItem('city');
        return city.value;
    } else {
        city.value = 'Minsk';
        return 'Minsk';
    }
}
//window.addEventListener('load', getCityWeather);


async function getWeather() {
    let keyAPI = '5c10fcf2508db1dee5a0feb5c3fd0b43';
    let lang = localStorage.getItem('switchLanguage');
    let cityWeather = getCityWeather(); // Устанавливаем город погоды из localStorage
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityWeather}&lang=${lang}&appid=${keyAPI}&units=metric`;
    const res = await fetch(url);
    const data = await res.json();

    if (data.cod == 200) {
        city.value = data.name;
        weatherIcon.className = 'weather-icon owf';
        weatherIcon.classList.add(`owf-${data.weather[0].id}`);
        temperature.textContent = `${data.main.temp.toFixed(0)}°C`;
        weatherDescription.textContent = data.weather[0].description;
        let windSpeed = Math.round(data.wind.speed);
        let humidityvalue = data.main.humidity;
        if (lang == 'en') {
            wind.textContent = `Wind speed: ${windSpeed} m/s`;
            humidity.textContent = `Humidity: ${humidityvalue}%`;
        } else {
            wind.textContent = `Скорость ветра: ${windSpeed} м/с`;
            humidity.textContent = `Влажность: ${humidityvalue}%`;
        }
    } else {
        weatherContent.textContent = `Incorrect data entered!`;
        //wind.textContent = `Введены некорректные данные!`;
        // console.log('Введены некорректные данные');
    }

}

function setCity(event) {
    if (event.code === 'Enter') {
        setCityWeather(); // Записываем введенный город в localStorage по нажатию ENTER
        getWeather(); // Вызываем функцию обновления погоды
        city.blur();
    }
}

document.addEventListener('DOMContentLoaded', getWeather);
city.addEventListener('keypress', setCity);
changeLanguageClick.addEventListener('click', getWeather);