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
        const API_URL = `https://newsdata.io/api/1/latest?apikey=pub_b73f1a1c27d44867b0f9da3ceb4ba805&q=${input}`;
        async function newsWeb() {
            const output = await fetch(API_URL);
            const response = await output.json();
            if(response.results.length === 0) {
                error.innerText = 'No news found for that keyword.';
            }
            else {
                error.innerText = '';
                wrap.innerHTML = '';
                let num;
                for(i = 0; i < response.results.length; i++) {
                    let element = document.createElement('div');
                    element.className = 'card';
                    let title = document.createElement('h3');
                    title.textContent = response.results[i].title;
                    let desc = document.createElement('p');
                    desc.innerText = response.results[i].description;
                    let image = document.createElement('img');
                    image.src = response.results[i].image_url;
                    image.alt = 'Image Not Available';
                    let source = document.createElement('a');
                    source.innerText = response.results[i].source_name;
                    source.href = response.results[i].link;
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


