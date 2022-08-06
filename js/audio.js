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
const currentTime = document.querySelector('.current-time');
const audioDuration = document.querySelector('.audio-duration');
const playItem = document.querySelectorAll('.play-item');
const progressBar = document.querySelector('.progress-audio');
const volumeRange = document.querySelector('.volume-range');

const audio = new Audio();
let isPlay = false; // Флаг проигрывания музыки по умолчанию
let playNum = 0;    // Проигрываемый трек по умолчанию
audio.volume = 0.1; // Громкость звука умолчанию

// Рекурсивно выполняем обновления таймера пока музыка играет
function updateTime() {
    let timeAudio = '00',
        minutesCurrentTime = '00',
        secundsCurrentTime = '00';
    if (isPlay == true) {
        timeAudio = String(Math.floor(audio.currentTime)).padStart('2', '0');
        if (timeAudio > 59) {
            minutesCurrentTime = String(Math.floor(timeAudio / 60)).padStart('2', '0');
            secundsCurrentTime = String(Math.floor(timeAudio - (minutesCurrentTime * 60))).padStart('2', '0');
        } else {
            minutesCurrentTime = '00';
            secundsCurrentTime = timeAudio;
        }
        currentTime.textContent = `${minutesCurrentTime}:${secundsCurrentTime}` + ' /';
        progressBar.setAttribute('value', ((100 / audio.duration) * audio.currentTime).toFixed(3));
        setTimeout(updateTime, 1000);
    }
}

// Запуск плеера
function playAudio(currentTimeBar) {
    isPlay = true;                              // Музыка включена 
    audio.src = playList[playNum].src;          // Ссылка на трек
    if (currentTimeBar) {
        audio.currentTime = currentTimeBar;     // Начать воспроизведение с места по клику на progressBar
    }
    audio.play();                               // Замустить проигрыватель 
    audio.onloadedmetadata = () => {            // Определяем длительность трека после загрузки метаданных
        updateTime();
        let fullTimeAudio = Math.floor(audio.duration); // Полная длительность трека в сек.
        if (fullTimeAudio > 59) {                       // Длительность трека в мин. и сек. если fullTimeAudio > минуты
            let minutes = String(Math.floor(fullTimeAudio / 60)).padStart('2', '0');
            let secunds = String(Math.floor(fullTimeAudio % 60)).padStart('2', '0');
            audioDuration.textContent = '/ ' + `${minutes}:${secunds} -`;
        } else {
            audioDuration.textContent = '/ ' + `00:${Math.floor(audio.duration)} -`;
        }
    };
    nameAudio.innerHTML = `- <i>${playList[playNum].title}</i>`;
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
        document.querySelectorAll('.play-list .play-item__active').forEach(li => li.classList.remove('play-item__active')); // Удаляем класс активности при случайном выборе мелодии
        playAudio();                    // Запускаем музыку
        play.classList.add('pause');    // Меняем вид кнопки проигрывания
    }
});

// Проигрывать следующий трек после окончания предыдущего
audio.onended = () => {
    setTimeout(() => {
        playNext();
    }, 1500);
};

// Перемотка аудио по клику прогрессбара 
progressBar.addEventListener('click', (el) => {
    const progressBarWidth = parseInt(window.getComputedStyle(progressBar).width);
    const amountComplite = ((el.clientX - progressBar.getBoundingClientRect().left) / progressBarWidth);
    let currentTimeBar = Math.floor(audio.duration) * amountComplite;
    if (isPlay) { playAudio(currentTimeBar); }
});

volumeRange.onchange = () => {
    audio.volume = (volumeRange.value / 100).toFixed(2);
    console.log(volumeRange.value);
};