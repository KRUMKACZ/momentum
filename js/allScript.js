let changeLanguageClick = document.querySelector('.switch-language');

// Сохранение введенного имени в Local Storage
function setLocalStorage() {
    let userName = document.querySelector('.name'); // Находим элемент ввода имени
    localStorage.setItem('userName', userName.value); // Сохраняем введенные данные
}
window.addEventListener('beforeunload', setLocalStorage);


function getLocalStorage() {
    let userName = document.querySelector('.name'); // Находим элемент ввода имени
    // Выводим данные если они сохранены и включены в настройках
    if (localStorage.getItem('userName') && localStorage.getItem('switchGreeting') == 1) {
        userName.value = localStorage.getItem('userName');
    }
}
window.addEventListener('load', getLocalStorage);


