const apiImgRadio = document.querySelector('.switch-imagesource');
let inputTagsImgBlock = document.querySelector('.inputTagsImg');
let tagInputImg = document.querySelector('.tagInputImg');
let imageSource = localStorage.getItem('imageSource');
let tagsImg = localStorage.getItem('tagsImg');

function setImageSourseDefault() {
    let radioDefault;
    if (imageSource == null) {
        setLocalStorageSettings('imageSource', 'GitHub');
        radioDefault = document.getElementById('GitHub');
        radioDefault.setAttribute('checked', 'true');
    } else {
        radioDefault = document.getElementById(`${imageSource}`);
        radioDefault.setAttribute('checked', 'true');
    }
}
setImageSourseDefault();


function showInputTagsImgBlock() {
    imageSource == null || imageSource == 'GitHub' ? inputTagsImgBlock.classList.add('hidden') : inputTagsImgBlock.classList.remove('hidden');
}
showInputTagsImgBlock();


function setTagsImg() {
    localStorage.setItem('tagsImg', tagInputImg.value); // Сохраняем введенные данные  
}
window.addEventListener('beforeunload', setTagsImg);


function getTagsImg() {
    tagsImg = localStorage.getItem('tagsImg');
    tagInputImg.value = tagsImg;
}
if (tagsImg != null) {
    getTagsImg();
}

apiImgRadio.onclick = function (event) {
    if (event.target.value) {
        setLocalStorageSettings('imageSource', event.target.value);
    }

    if (event.target.value == 'UnsplashAPI' || event.target.value == 'FlickrAPI') {
        inputTagsImgBlock.classList.remove('hidden');
    } else {
        inputTagsImgBlock.classList.add('hidden');
    }
    // setImageSourseDefault();
};
