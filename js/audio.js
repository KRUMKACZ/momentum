import playList from './playList.js';
const playListContainer = document.querySelector('.play-list');

playList.forEach((el, index) => {
    let li = document.createElement('li');
    li.classList.add('play-item');
    li.setAttribute('value', index);
    li.textContent = el.title;
    playListContainer.append(li);
});

const setPlayPrev = document.querySelector('.play-prev');
const play = document.querySelector('.play');
const setPlayNext = document.querySelector('.play-next');
const activePlay = document.querySelectorAll('.play-item');

const audio = new Audio();
let isPlay = false; // Флаг проигрывания музыки
let playNum = 0;    // Проигрываемый трек по умолчанию

// Запуск плеера
function playAudio() {
    console.log('Играет трек № ' + playNum);
    audio.src = playList[playNum].src;    // Ссылка на трек
    audio.currentTime = 0;                // Всегда начинать трек с начала
    audio.play();                         // Замустить проигрыватель 
    //activePlay.classList.remove('play-item__active');
    activePlay[playNum].classList.add('play-item__active'); // Добавляем класс активной мелодии
}

// Пауза плеера
function pauseAudio() {
    audio.pause();
}

// Переключение кнопки проигрывания/паузы
function toggleBtn() {
    play.classList.toggle('pause');
}

// Функция запускает проигрыватель если музыка не играет
// Останавливает проигрывание при повторном нажатии play
function controls() {
    if (!isPlay) {      // isPlay = false
        isPlay = true;  // Музыка включена 
        playAudio();    // Запускаем музыку
        toggleBtn();    // Меняем кнопку
    } else {
        isPlay = false; // При повторном нажатии, музыка выключена
        pauseAudio();   // Ставим мцзыку на паузу
        toggleBtn();    // Меняем кнопку проигрывателя
    }
}

function playPrev() {
    if (playNum <= (playList.length - 1) && playNum > 0) {
        playNum--;
        playAudio();    // Запускаем музыку
        isPlay = true;  // Музыка включена 
        play.classList.add('pause');
    }
    else {
        console.log('Плейлист закончился');
    }
}

function playNext() {
    if (playNum < (playList.length - 1)) {
        playNum++;
        playAudio();    // Запускаем музыку
        isPlay = true;  // Музыка включена 
        play.classList.add('pause');
    } else {
        console.log('Плейлист закончился');
    }
}

play.addEventListener('click', controls);
setPlayPrev.addEventListener('click', playPrev);
setPlayNext.addEventListener('click', playNext);

document.addEventListener('click', (event) => {
    if (event.target.classList.contains('play-item')) {
        playNum = event.target.attributes.value.value; // Атрибут равный номеру мелодии в массиве
        isPlay = true;                  // Музыка включена 
        playAudio();                    // Запускаем музыку
        play.classList.add('pause');    // Меняем вид кнопки проигрывания

    }
});

// Исправить вид кнопки при проигрывании мелодии