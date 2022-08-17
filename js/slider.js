const body = document.body;
const slidePrev = document.querySelector('.slide-prev');
const slideNext = document.querySelector('.slide-next');

const unsplashKey = 'gJkChubIgNt9kRxbmBLesSbAbBwRckJjILDU94tDLzk';
const orientationImg = 'landscape';

const flickrKey = 'e93ccbe4fc4a84fdf59b46f82b6d84cb';
const sizeImgFlickr = 'url_h';

const imgSourgeAPI = localStorage.getItem('imageSource');


function setBg() {
    const img = new Image();
    img.src = `https://raw.githubusercontent.com/Viruss-git/momentum-img/assets/images/${periodDay}/${String(randomNum).padStart(2, '0')}.jpg`;
    img.addEventListener('load', function () {
        document.body.style.backgroundImage = `url(${img.src})`;
        document.body.style.backgroundRepeat = 'no-repeat';
        document.body.style.backgroundSize = 'cover';
    });
}

async function getImageUnsplash() {
    getTagImgLocalStorege();
    const img = new Image();
    const url = `https://api.unsplash.com/photos/random?orientation=${orientationImg}&query=${tagImg}&client_id=${unsplashKey}`;
    console.log(url);
    const res = await fetch(url);
    const data = await res.json();
    img.src = data.urls.regular;
    img.addEventListener('load', function () {
        document.body.style.backgroundImage = `url(${img.src})`;
        document.body.style.backgroundSize = 'cover';
    });
}

let countFlickr = 0;
let dataFlickrAPI;
async function flickrAPI() {
    getTagImgLocalStorege();
    const img = new Image();
    const url = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${flickrKey}&tags=${tagImg}&extras=${sizeImgFlickr}&format=json&nojsoncallback=1`;
    console.log(url);
    const res = await fetch(url);
    dataFlickrAPI = await res.json();
    img.src = dataFlickrAPI.photos.photo[countFlickr].url_h;
    img.addEventListener('load', function () {
        document.body.style.backgroundImage = `url(${img.src})`;
        document.body.style.backgroundSize = 'cover';
    });
}

function nextPrevFlickrAPI() {
    const img = new Image();
    img.src = dataFlickrAPI.photos.photo[countFlickr].url_h;
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
        nextPrevFlickrAPI(countFlickr);
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
        nextPrevFlickrAPI(countFlickr);
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
