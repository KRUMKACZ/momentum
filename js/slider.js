const body = document.body;
const slidePrev = document.querySelector('.slide-prev');
const slideNext = document.querySelector('.slide-next');

const unsplashKey = 'gJkChubIgNt9kRxbmBLesSbAbBwRckJjILDU94tDLzk';
const orientationImg = 'landscape';

const flickrKey = 'e93ccbe4fc4a84fdf59b46f82b6d84cb';
const sizeImgFlickr = 'url_h';

const imgSourgeAPI = localStorage.getItem('imageSource');

let randomNum;
function getRandomNum(min, max) {
    return randomNum = Math.floor(Math.random() * (max - min + 1)) + min;
}

// Возвращаем приветствие в зависимости от времени суток
function getImg() {
    if (hours >= 6 && hours < 12) {
        periodDay = 'morning';
    }
    if (hours >= 12 && hours < 18) {
        periodDay = 'afternoon';
    }
    if (hours >= 18 && hours < 24) {
        periodDay = 'evening';
    }
    if (hours >= 0 && hours < 6) {
        periodDay = 'night';
    }
    getRandomNum(0, 20);
}
getImg();


function setBg() {
    const img = new Image();
    img.src = `https://raw.githubusercontent.com/Viruss-git/momentum-img/assets/images/${periodDay}/${String(randomNum).padStart(2, '0')}.jpg`;
    img.addEventListener('load', function () {
        document.body.style.backgroundImage = `url(${img.src})`;
        document.body.style.backgroundRepeat = 'no-repeat';
    });
}

async function getImageUnsplash() {
    getTagImgLocalStorege();
    const img = new Image();
    const url = `https://api.unsplash.com/photos/random?orientation=${orientationImg}&query=${unsplasTagImg}&client_id=${unsplashKey}`;
    const res = await fetch(url);
    const data = await res.json();
    img.src = data.urls.regular;
    img.addEventListener('load', function () {
        document.body.style.backgroundImage = `url(${img.src})`;
        document.body.style.backgroundSize = 'cover';
    });
}

let countFlickr = 0;
async function flickrAPI() {
    getTagImgLocalStorege();
    const img = new Image();
    const url = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${flickrKey}&tags=${unsplasTagImg}&extras=${sizeImgFlickr}&format=json&nojsoncallback=1`;
    const res = await fetch(url);
    const data = await res.json();
    img.src = data.photos.photo[countFlickr].url_h;
    img.addEventListener('load', function () {
        document.body.style.backgroundImage = `url(${img.src})`;
        document.body.style.backgroundSize = 'cover';
    });
}

function getSlidePrev() {
    let imgSourgeAPI = localStorage.getItem('imageSource');
    if (imgSourgeAPI == 'GitHub') {
        if (randomNum == 1) {
            randomNum = 20;
            setBg();
        } else {
            randomNum--;
            setBg();
        }
    }

    if (imgSourgeAPI == 'UnsplashAPI') {
        getImageUnsplash();
    }

    if (imgSourgeAPI == 'FlickrAPI') {
        if (countFlickr < 1) {
            countFlickr = 50;
        } else {
            countFlickr--;
        }
        flickrAPI(countFlickr);
    }
}

function getSlideNext() {
    let imgSourgeAPI = localStorage.getItem('imageSource');

    if (imgSourgeAPI == 'GitHub') {
        if (randomNum == 20) {
            randomNum = 1;
            setBg();
        } else {
            randomNum++;
            setBg();
        }
    }

    if (imgSourgeAPI == 'UnsplashAPI') {
        getImageUnsplash();
    }

    if (imgSourgeAPI == 'FlickrAPI') {
        if (countFlickr > 50) {
            countFlickr = 0;
        } else {
            countFlickr++;
        }
        flickrAPI(countFlickr);
    }

}


switch (imgSourgeAPI) {
    case 'GitHub':
        setBg();
        break;
    case 'UnsplashAPI':
        getImageUnsplash();
        break;
    case 'FlickrAPI':
        flickrAPI();
        break;
}


slidePrev.onclick = () => {
    getSlidePrev();
};

slideNext.onclick = () => {
    getSlideNext();
};
