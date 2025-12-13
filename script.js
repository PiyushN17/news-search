let loader = document.getElementById('loader');
let container = document.getElementById('container');
let search = document.getElementById('search');
let inputField = document.getElementById('inputField');
let err = document.getElementById('err');
let loadMore = document.getElementById('loadMore');
let category = document.querySelectorAll('.nav-link');
let headlines = document.getElementById('headlines');

let HOME_URL = `https://newsdata.io/api/1/news?apikey=pub_d24c0188a81f4138bef8bbbd6c1f7a5a&country=in&category=top&language=en`;

const containerArray = [];
let nextPage = null;
let currentBaseURL = HOME_URL;

document.addEventListener('DOMContentLoaded', function() {
    fetchNews(HOME_URL);
});

async function fetchNews(URL) {
    try {
        let output = await fetch(URL);
        let response = await output.json();

        if (!response.results || response.results.length === 0) {
            loader.hidden = true;
            err.innerText = 'No News Found';
            loadMore.hidden = true;
            return;
        }

        nextPage = response.nextPage;
        loadMore.hidden = !nextPage;

        containerArray.push(response.results);
        contain();
    } catch (e) {
        loader.hidden = true;
        err.innerText = e.message;
    }
}

function contain() {
    loader.hidden = true;

    for (let i = 0; i < containerArray.length; i++) {
        for (let j = 0; j < containerArray[i].length; j++) {
            const news = containerArray[i][j];

            let element = document.createElement('div');
            element.className = 'card';
            element.style.width = '18rem';

            let image = document.createElement('img');
            image.className = 'card-img-top';
            image.src = news.image_url;
            image.alt = 'Image Not Available';
            image.onerror = () => element.remove();

            let source = document.createElement('a');
            source.innerText = news.source_name;
            source.href = news.link;
            source.target = '_blank';

            let title = document.createElement('h3');
            title.textContent = news.title;

            let desc = document.createElement('p');
            desc.innerText = news.description || '';

            element.appendChild(image);
            element.appendChild(source);
            element.appendChild(title);
            element.appendChild(desc);

            container.appendChild(element);
        }
    }
}

search.addEventListener('click', function(e) {
    e.preventDefault();

    let value = inputField.value.trim();
    if (value === '') {
        err.innerText = 'Please enter a valid input';
        return;
    }

    err.innerText = '';
    container.innerHTML = '';
    containerArray.length = 0;
    loader.hidden = false;
    headlines.innerText = `Top Headlines: ${value}`;
    currentBaseURL = `https://newsdata.io/api/1/latest?apikey=pub_d24c0188a81f4138bef8bbbd6c1f7a5a&q=${value}&country=in&language=en`;
    nextPage = null;

    fetchNews(currentBaseURL);
});

loadMore.addEventListener('click', () => {
    if (!nextPage) return;

    loader.hidden = false;
    let paginatedURL = `${currentBaseURL}&page=${nextPage}`;
    fetchNews(paginatedURL);
});

category.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();

        let cat = e.target.id;
        container.innerHTML = '';
        containerArray.length = 0;
        loader.hidden = false;

        category.forEach(l => {
            l.classList.remove('active');
        })
        e.target.classList.add('active');
        cat = cat[0].toUpperCase() + cat.slice(1);
        headlines.innerText = `Top Headlines: ${cat}`;
        currentBaseURL = `https://newsdata.io/api/1/news?apikey=pub_d24c0188a81f4138bef8bbbd6c1f7a5a&country=in&category=${cat}&language=en`;
        fetchNews(currentBaseURL);
    });
});


