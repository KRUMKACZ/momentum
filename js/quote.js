const changeQuote = document.querySelector('.change-quote');
const qoute = document.querySelector('.quote');
const author = document.querySelector('.author');

async function getQuotes() {
    const quotes = 'assets/json/quoteOfTheDay.json';
    const res = await fetch(quotes);
    const data = await res.json();
    let item = Math.floor(Math.random() * (data.length));

    qoute.textContent = data[item].text;
    author.textContent = data[item].author;
}
getQuotes();

changeQuote.addEventListener('click', getQuotes);