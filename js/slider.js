const body = document.body;
const slidePrev = document.querySelector('.slide-prev');
const slideNext = document.querySelector('.slide-next');

let randomNum;
function getRandomNum(min, max) {
    return randomNum = Math.floor(Math.random() * (max - min + 1)) + min;
}

// Возвращаем приветствие в зависимости от времени суток
function getImg() {
    if (hours >= 6 && hours < 12) {
        getRandomNum(1, 5);
    }
    if (hours >= 12 && hours < 18) {
        getRandomNum(6, 10);
    }
    if (hours >= 18 && hours < 24) {
        getRandomNum(11, 15);
    }
    if (hours >= 0 && hours < 6) {
        getRandomNum(16, 20);
    }
}
getImg();

function getSlidePrev() {
    if (randomNum == 1) {
        randomNum = 20;
        setBg();
    } else {
        randomNum--;
        setBg();
    }
}

function getSlideNext() {
    if (randomNum == 20) {
        randomNum = 1;
        setBg();
    } else {
        randomNum++;
        setBg();
    }
}

function setBg() {
    const img = new Image();
    img.src = `https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/evening/${String(randomNum).padStart(2, '0')}.jpg`;
    img.addEventListener('load', function () {
        document.body.style.backgroundImage = `url(${img.src})`;
    });
}
setBg();



slidePrev.onclick = () => {
    getSlidePrev();
};

slideNext.onclick = () => {
    getSlideNext();
};


getSlidePrev();
getSlideNext();

