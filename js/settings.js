const settingsButton = document.querySelector('.settings');
const settingsPanel = document.querySelector('.settings__panel');

const settingsHeader = document.querySelector('.settings-header');
const settingsLanguage = document.querySelector('.settings-language');


const state = {
    name: 'Settings',
    language: 'en',
    photoSource: 'github',
    blocks: ['time', 'date', 'greeting', 'quote', 'weather', 'audio', 'todolist']
};

settingsHeader.textContent = state.name;
settingsLanguage.textContent = state.name;


settingsButton.onclick = (eldd) => {
    settingsPanel.classList.toggle('settings__panel_active');
    // settingsPanel.classList.add('settings__panel_active');
};

