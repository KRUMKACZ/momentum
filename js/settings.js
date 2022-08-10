const settingsButton = document.querySelector('.settings');
const settingsPanel = document.querySelector('.settings__panel');
const settingsBlock = document.querySelector('.settings__block');
const settingsHeader = document.querySelector('.settings-header');

const timeSetting = document.querySelector('.time');
const dateSetting = document.querySelector('.date');
const greetingSetting = document.querySelector('.greeting');
const greetingNameSetting = document.querySelector('.name');
const quoteSetting = document.querySelector('.quote__item');

const weatherSetting = document.querySelector('.weather');
const audioSetting = document.querySelector('.player');


const state = {
    name: 'Settings',
    language: 'en',
    photoSource: 'github',
    blocks: ['Language', 'Time', 'Date', 'Greeting', 'Quote', 'Weather', 'Audio', 'Todolist'],
    blocksRu: ['Язык', 'Время', 'Дата', 'Приветствие', 'Цитата', 'Погода', 'Аудио', 'Дела']
};

settingsHeader.textContent = state.name;

// Присваиваем значение value каждому треку в соответствии с положением в playList
state.blocks.forEach((el, index) => {
    let blocksSettings = document.createElement('div');
    let blocksName = document.createElement('div');
    let setValue = document.createElement('div');
    let switchBtn = document.createElement('div');

    blocksSettings.classList.add('settings__item');
    blocksName.classList.add('settings-name');
    setValue.classList.add('value-' + state.blocks[index].toLowerCase());
    switchBtn.classList.add('switch-' + state.blocks[index].toLowerCase(), 'switch-btn');

    blocksName.textContent = el;
    blocksSettings.appendChild(blocksName);
    setValue.appendChild(switchBtn);
    blocksSettings.appendChild(setValue);
    settingsBlock.append(blocksSettings);
});

// Сохраняем введенные данные в локальное хранилище
function setLocalStorageSettings(item, value) {
    localStorage.setItem(item, value);
}

const switchLanguage = document.querySelector('.switch-language');
const switchTime = document.querySelector('.switch-time');
const switchDate = document.querySelector('.switch-date');
const switchGreeting = document.querySelector('.switch-greeting');
const switchQuote = document.querySelector('.switch-quote');
const switchWeather = document.querySelector('.switch-weather');
const switchAudio = document.querySelector('.switch-audio');
const switchTodolist = document.querySelector('.switch-todolist');

const settingsArray = {
    property: [switchLanguage, switchTime, switchDate, switchGreeting, switchQuote, switchWeather, switchAudio, switchTodolist],
    name: ['switchLanguage', 'switchTime', 'switchDate', 'switchGreeting', 'switchQuote', 'switchWeather', 'switchAudio', 'switchTodolist']
};

// Перебираем массив с настройками и выбираем значения из локального хранилища
// Если значения отсутствует, устанавливаем 0
function getLocalStorageSettings() {
    settingsArray.name.forEach((elSet, index) => {
        if (!localStorage.getItem(elSet)) {
            setLocalStorageSettings(elSet, 1);
            settingsArray.property[index].classList.add('switch-on');
        } else if (localStorage.getItem(elSet) == 1) {
            settingsArray.property[index].classList.add('switch-on');
        } else {
            settingsArray.property[index].classList.remove('switch-on');
        }
    });
}
// Запускаем перебор настроек после загрузки страницы
window.addEventListener('load', getLocalStorageSettings);


switchLanguage.onclick = function () {
    this.classList.toggle('switch-on');
    this.classList.contains('switch-on') ? setLocalStorageSettings('switchLanguage', 1) : setLocalStorageSettings('switchLanguage', 0);
};

switchTime.onclick = function () {
    this.classList.toggle('switch-on');
    this.classList.contains('switch-on') ? setLocalStorageSettings('switchTime', 1) : setLocalStorageSettings('switchTime', 0);
    !this.classList.contains('switch-on') ? timeSetting.classList.add('hidden') : timeSetting.classList.remove('hidden');
    timeSetting.style.transition = 'all .5s linear';
};

switchDate.onclick = function () {
    this.classList.toggle('switch-on');
    this.classList.contains('switch-on') ? setLocalStorageSettings('switchDate', 1) : setLocalStorageSettings('switchDate', 0);
    !this.classList.contains('switch-on') ? dateSetting.classList.add('hidden') : dateSetting.classList.remove('hidden');
    dateSetting.style.transition = 'all .5s linear';
};

switchGreeting.onclick = function () {
    this.classList.toggle('switch-on');
    this.classList.contains('switch-on') ? setLocalStorageSettings('switchGreeting', 1) : setLocalStorageSettings('switchGreeting', 0);
    if (!this.classList.contains('switch-on')) {
        greetingSetting.classList.add('hidden');
        greetingNameSetting.classList.add('hidden');
    } else {
        greetingSetting.classList.remove('hidden');
        greetingNameSetting.classList.remove('hidden');
    }
    greetingSetting.style.transition = 'all .5s linear';
    greetingNameSetting.style.transition = 'all .5s linear';
};

switchQuote.onclick = function () {
    this.classList.toggle('switch-on');
    this.classList.contains('switch-on') ? setLocalStorageSettings('switchQuote', 1) : setLocalStorageSettings('switchQuote', 0);
    !this.classList.contains('switch-on') ? quoteSetting.classList.add('hidden') : quoteSetting.classList.remove('hidden');
    quoteSetting.style.transition = 'all .5s linear';
};

switchWeather.onclick = function () {
    this.classList.toggle('switch-on');
    this.classList.contains('switch-on') ? setLocalStorageSettings('switchWeather', 1) : setLocalStorageSettings('switchWeather', 0);
    !this.classList.contains('switch-on') ? weatherSetting.classList.add('hidden') : weatherSetting.classList.remove('hidden');
    weatherSetting.style.transition = 'all .5s linear';
};

switchAudio.onclick = function () {
    this.classList.toggle('switch-on');
    this.classList.contains('switch-on') ? setLocalStorageSettings('switchAudio', 1) : setLocalStorageSettings('switchAudio', 0);
    !this.classList.contains('switch-on') ? audioSetting.classList.add('hidden') : audioSetting.classList.remove('hidden');
    audioSetting.style.transition = 'all .5s linear';
};

switchTodolist.onclick = function () {
    this.classList.toggle('switch-on');
    this.classList.contains('switch-on') ? setLocalStorageSettings('switchTodolist', 1) : setLocalStorageSettings('switchTodolist', 0);
};

// Открываем панель
settingsButton.onclick = () => {
    settingsPanel.classList.toggle('settings__panel_active');
};

