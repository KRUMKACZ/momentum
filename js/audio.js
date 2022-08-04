import playList from './playList.js';
const playListContainer = document.querySelector('.play-list');

// Присваиваем значение value каждому треку в соответствии с положением в playList
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
const nameAudio = document.querySelector('.name-audio');
const playItem = document.querySelectorAll('.play-item');

const audio = new Audio();
let isPlay = false; // Флаг проигрывания музыки по умолчанию
let playNum = 0;    // Проигрываемый трек по умолчанию

nameAudio.innerHTML = '<i> Track not selected...</i>';

// Запуск плеера
function playAudio() {
    console.log('Играет трек № ' + playNum);
    audio.src = playList[playNum].src;    // Ссылка на трек
    //audio.currentTime = 0;                // Всегда начинать трек с начала
    //audio.duration = playList[playNum].duration;
    console.log(audio.currentTime);
    console.log(audio.duration);
    audio.play();                         // Замустить проигрыватель 
    nameAudio.innerHTML = '<i><b>Play: </b>' + playList[playNum].title + '</i>';
    playItem[playNum].classList.add('play-item__active'); // Добавляем класс активной мелодии

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
        pauseAudio();   // Ставим музыку на паузу
        toggleBtn();    // Меняем кнопку проигрывателя
    }
}

function controlsPrevNext() {
    playAudio();    // Запускаем музыку
    isPlay = true;  // Музыка включена 
    play.classList.add('pause');
}

function playPrev() {
    if (playNum <= (playList.length - 1) && playNum > 0) {
        playNum--;
        controlsPrevNext();
        playItem[playNum + 1].classList.remove('play-item__active'); // Удаляем класс активности предыдущей мелодии мелодии
    }
    else {
        console.log('Плейлист переключен на последний трек');
        playNum = playList.length - 1;
        controlsPrevNext();
        playItem[0].classList.remove('play-item__active'); // Удаляем класс активности предыдущей мелодии мелодии
    }
}

function playNext() {
    if (playNum < (playList.length - 1)) {
        playNum++;
        controlsPrevNext();
        playItem[playNum - 1].classList.remove('play-item__active'); // Удаляем класс активности предыдущей мелодии мелодии
    } else {
        console.log('Плейлист начат с начала');
        playNum = 0;
        controlsPrevNext();
        playItem[playList.length - 1].classList.remove('play-item__active'); // Удаляем класс активности предыдущей мелодии мелодии
    }
}

// События кликов по кнопкам
play.addEventListener('click', controls);
setPlayPrev.addEventListener('click', playPrev);
setPlayNext.addEventListener('click', playNext);

// Запуск проигрывателя при клике на название трека
document.addEventListener('click', (event) => {
    if (event.target.classList.contains('play-item')) {
        playNum = event.target.attributes.value.value; // Атрибут равный номеру мелодии в массиве
        isPlay = true;                  // Музыка включена 
        document.querySelectorAll('.play-list .play-item__active').forEach(li => li.classList.remove('play-item__active')); // Удаляем класс активности при случайном выборе мелодии
        playAudio();                    // Запускаем музыку
        play.classList.add('pause');    // Меняем вид кнопки проигрывания
    }
});

// Исправить вид кнопки при проигрывании мелодии