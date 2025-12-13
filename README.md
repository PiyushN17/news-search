# TopStories – News Aggregator App

**Requirements**
- A modern web browser (Chrome, Firefox, Edge, Safari)  
- Active internet connection to fetch live news data  
- A valid **NewsData.io API key** configured inside `script.js`  
- Basic understanding of HTML and JavaScript to modify or extend the project  
- (Optional) A local static server for smooth development and testing  

**Technologies Used**
- **HTML** for structuring the news dashboard and navigation  
- **Vanilla JavaScript** for handling events, dynamic rendering, and API integration  
- **Fetch API** for making asynchronous HTTP requests  
- **Bootstrap (CDN)** for responsive navigation and layout utilities  
- **JavaScript DOM APIs** for creating and updating news cards dynamically  

**About the API**
- **NewsData.io News API**
  - Used to fetch real-time news articles by category, keyword, and pagination  
  - Example endpoint (Top headlines):  
    `https://newsdata.io/api/1/news?apikey={API_KEY}&country=in&category=top&language=en`
  - Example endpoint (Search):  
    `https://newsdata.io/api/1/latest?apikey={API_KEY}&q={keyword}&country=in&language=en`
  - Provides article title, description, image URL, source name, article link, and pagination (`nextPage`)  
  - Pagination is handled using the `nextPage` token returned by the API  

**Features Implemented**
- Displays top headlines on initial page load  
- Category-based news filtering (Politics, Sports, Business, Technology, etc.)  
- Keyword-based news search with validation  
- Dynamic news cards with image, source link, title, and short description  
- “Load More” button to fetch paginated results  
- Loading spinner shown during API requests  
- Graceful error handling for:
  - Empty search input  
  - No news results  
  - Network or API errors  
- Automatically removes articles with missing or broken images  

**Application Flow**
- On page load, top headlines are fetched and displayed  
- Clicking a category resets existing content and loads category-specific news  
- Searching clears previous results and fetches news based on the keyword  
- Clicking **Load More** fetches the next page of results using API pagination  
- Loader appears during all async operations and hides on completion or error  

**Notes**
- Avoid committing real API keys to public repositories  
- Free API plans may have rate limits—use pagination responsibly  
- Some articles may not contain images; such cards are filtered out automatically  
- Designed as a clean, client-side project to practice API handling and dynamic UI rendering  

**Possible Enhancements**
- Add debounce to search input  
- Implement infinite scroll instead of “Load More”  
- Cache results to reduce repeated API calls  
- Add filters for date, source, or region  
- Improve accessibility and keyboard navigation  
