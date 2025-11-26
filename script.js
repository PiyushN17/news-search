let btn = document.getElementById('searchBtn');
let search = document.getElementById('search');
let error = document.getElementById('error');
let wrap = document.getElementById('wrap');

btn.addEventListener('click', function() {
    if(search.value.trim().length === 0) {
        error.innerText = 'Please enter a search keyword.';
    }
    else {
        
        
        error.innerText = '';
        const input = search.value.trim();
        const API_URL = `https://gnews.io/api/v4/search?q=${input}&lang=en&max=5&apikey=4711a47f13de7405829d73cddb08c47f`;
        search.value = '';
        async function newsWeb() {
            const output = await fetch(API_URL);
            const response = await output.json();
            if(response.articles.length === 0) {
                error.innerText = 'No news found for that keyword.';
            }
            else {
                error.innerText = '';
                wrap.innerHTML = '';
                let num;
                for(i = 0; i < response.articles.length; i++) {
                        let element = document.createElement('div');
                    element.className = 'card';
                    let title = document.createElement('h3');
                    title.textContent = response.articles[i].title;
                    let desc = document.createElement('p');
                    desc.innerText = response.articles[i].description;
                    let image = document.createElement('img');
                    image.src = response.articles[i].image;
                    image.alt = 'Image Not Available';
                    let source = document.createElement('a');
                    source.innerText = response.articles[i].source.name;
                    source.href = response.articles[i].url;
                    source.target = '_blank';
                    element.appendChild(image);
                    element.appendChild(source);
                    element.appendChild(title);
                    element.appendChild(desc);
                    wrap.appendChild(element);
                }
            }
            
        }
        newsWeb();
    }
})

