const apiImgRadio = document.querySelector('.switch-imagesource');
let imagesource = localStorage.getItem('imageSource');

function setImageSourseDefault() {
    let radioDefault;
    if (imagesource == null) {
        setLocalStorageSettings('imageSource', 'GitHub');
        radioDefault = document.getElementById('GitHub');
        radioDefault.setAttribute('checked', 'true');
    } else {
        radioDefault = document.getElementById(`${imagesource}`);
        radioDefault.setAttribute('checked', 'true');
    }
}
setImageSourseDefault();

apiImgRadio.onclick = function (event) {
    if (event.target.value) {
        setLocalStorageSettings('imageSource', event.target.value);
    }
   // setImageSourseDefault();
};
