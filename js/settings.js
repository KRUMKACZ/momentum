const settingsButton = document.querySelector('.settings');
const settingsPanel = document.querySelector('.settings__panel');
const settingsItem = document.querySelector('.settings__item');

const settingsHeader = document.querySelector('.settings-header');
const settingsLanguage = document.querySelector('.settings-language');
const settingsTime = document.querySelector('.settings-time');
const settingsDate = document.querySelector('.settings-date');
const settingsGreeting = document.querySelector('.settings-greeting');
const settingsQuote = document.querySelector('.settings-quote');
const settingsWeather = document.querySelector('.settings-weather');
const settingsAudio = document.querySelector('.settings-audio');
const settingsTodolist = document.querySelector('.settings-todolist');


const state = {
    name: 'Settings',
    language: 'en',
    photoSource: 'github',
    blocks: ['Language', 'Time', 'Date', 'Greeting', 'Quote', 'Weather', 'Audio', 'Todolist'],
    blocksRu: ['Язык', 'Время', 'Дата', 'Приветствие', 'Цитата', 'Погода', 'Аудио', 'Дела']
};

// Присваиваем значение value каждому треку в соответствии с положением в playList
state.blocks.forEach((el, index) => {
    let blocksSettings = document.createElement('div');
    let blocksName = document.createElement('div');
    let setValue = document.createElement('div');

    blocksSettings.classList.add('blocks-settings');
    blocksName.classList.add('settings-it');
    setValue.classList.add('set-value');

    blocksName.textContent = el;
    blocksSettings.appendChild(blocksName);
    blocksSettings.appendChild(setValue);
    settingsItem.append(blocksSettings);
});

settingsHeader.textContent = state.name;

settingsButton.onclick = () => {
    settingsPanel.classList.toggle('settings__panel_active');
};

