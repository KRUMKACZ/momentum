
// Сохранение введенного имени в Local Storage
function setLocalStorage() {
    let name = document.querySelector('.name'); // Находим элемент ввода имени
    localStorage.setItem('name', name.value); // Сохраняем введенные данные
}
window.addEventListener('beforeunload', setLocalStorage);

function getLocalStorage() {
    let name = document.querySelector('.name'); // Находим элемент ввода имени
    if (localStorage.getItem('name')) { // Выводим данные если они сохранены 
        name.value = localStorage.getItem('name');
    }
}
window.addEventListener('load', getLocalStorage);