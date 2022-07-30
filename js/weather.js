const weatherIcon = document.querySelector('.weather-icon');
const temperature = document.querySelector('.temperature');
const weatherDescription = document.querySelector('.weather-description');
const wind = document.querySelector('.wind');
const humidity = document.querySelector('.humidity');
const city = document.querySelector('.city');


// Сохранение введенного имени в Local Storage
function setCityWeather() {
    let city = document.querySelector('.city'); // Находим элемент ввода имени
    localStorage.setItem('city', city.value); // Сохраняем введенные данные
}
window.addEventListener('beforeunload', setCityWeather);

function getCityWeather() {
    let city = document.querySelector('.city'); // Находим элемент ввода имени
    if (localStorage.getItem('city')) { // Выводим данные если они сохранены 
        city.value = localStorage.getItem('city');
        return city.value;
    } else {
        city.value = 'Minsk';
        return 'Minsk';
    }
}
window.addEventListener('load', getCityWeather);


async function getWeather() {
    let keyAPI = '5c10fcf2508db1dee5a0feb5c3fd0b43';
    let lang = 'en';
    let city = getCityWeather(); // Устанавливаем город погоды из localStorage
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&lang=${lang}&appid=${keyAPI}&units=metric`;
    const res = await fetch(url);
    const data = await res.json();

    weatherIcon.className = 'weather-icon owf';
    weatherIcon.classList.add(`owf-${data.weather[0].id}`);
    temperature.textContent = `${data.main.temp.toFixed(0)}°C`;
    weatherDescription.textContent = data.weather[0].description;

    if (lang == 'en') {
        wind.textContent = `Wind speed: ${data.wind.speed} m/s`;
        humidity.textContent = `Humidity: ${data.main.humidity}%`;
    } else {
        wind.textContent = `Скорость ветра: ${data.wind.speed} м/с`;
        humidity.textContent = `влажность: ${data.main.humidity}%`;
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