const changeQuote = document.querySelector('.change-quote');
const qoute = document.querySelector('.quote');
const author = document.querySelector('.author');
const quoteItem = document.querySelector('.quote__item');

localStorage.getItem('switchQuote') == 0 ? quoteItem.classList.add('hidden') : quoteItem.classList.remove('hidden');

async function getQuotes() {
    let languageQuote = localStorage.getItem('switchLanguage');
    languageQuote == 'en' ? quotes = 'assets/json/quoteOfTheDay.json' : quotes = 'assets/json/quoteOfTheDayRu.json';
    // const quotes = 'assets/json/quoteOfTheDay.json';
    const res = await fetch(quotes);
    const data = await res.json();
    let item = Math.floor(Math.random() * (data.length));

    qoute.textContent = data[item].text;
    author.textContent = data[item].author;
}
getQuotes();

changeQuote.addEventListener('click', getQuotes);
changeLanguageClick.addEventListener('click', getQuotes);