const apiImgRadio = document.querySelector('.switch-imagesource');
//console.log(apiImgRadio);

apiImgRadio.onclick = function (event) {
    console.log(event.target.value);
};

//let languageSettings = localStorage.getItem('switchLanguage');