const arrDayEn = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const arrDayRu = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];

const time = document.querySelector('.time');
const date = document.querySelector('.date');

let language = 'en-En';

function showDate() {
    const getDate = new Date();
    const getDay = getDate.getDay(); // Номер текущего дня начиная с 0 (Sunday)
    const options = { month: 'long', day: 'numeric' };
    language == 'en-En' ? nameDay = arrDayEn[getDay] : nameDay = arrDayRu[getDay];
    const currentDate = getDate.toLocaleDateString(language, options);
    date.textContent = nameDay + ', ' + currentDate;
}

function showTime() {
    const getTime = new Date(); // Получает дату и время
    const currentTime = getTime.toLocaleTimeString(); // Получаем только время
    time.textContent = currentTime;
    showDate();
    setTimeout(showTime, 1000); // Рекурсивно вызываем функцию (для обновления времени)
}
showTime();