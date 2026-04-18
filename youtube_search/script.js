const API_KEY = "AIzaSyA5GETrqN3PkF7HY9N7ZZ2Q0C_GyxRZWlU";
const searchBtn = document.getElementById('searchBtn');
const searchInput = document.getElementById('searchInput');
const resultsDiv = document.getElementById('videoResults');

// Listen for Click
searchBtn.addEventListener('click', searchVideos);

// Listen for "Enter" key
searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') searchVideos();
});

async function searchVideos() {
    const query = searchInput.value.trim();
    if (!query) return;

    // Show simple loader
    resultsDiv.innerHTML = '<div class="placeholder-text">Tuning in...</div>';

    try {
        const response = await fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=${query}&maxResults=12&type=video&key=${API_KEY}`);
        const data = await response.json();

        if (data.error) throw new Error(data.error.message);

        resultsDiv.innerHTML = ""; // Clear results

        data.items.forEach(item => {
            const videoId = item.id.videoId;
            const title = item.snippet.title;
            const channel = item.snippet.channelTitle;
            const thumbnail = item.snippet.thumbnails.high.url;

            const card = `
                <div class="video-card" onclick="window.open('https://youtube.com/watch?v=${videoId}', '_blank')">
                    <div class="thumb-container">
                        <img src="${thumbnail}" alt="${title}">
                    </div>
                    <div class="card-info">
                        <h4>${title}</h4>
                        <p>${channel}</p>
                    </div>
                </div>
            `;
            resultsDiv.innerHTML += card;
        });

    } catch (error) {
        resultsDiv.innerHTML = `<div class="placeholder-text" style="color: #ff4444;">Error: ${error.message}</div>`;
    }
}
