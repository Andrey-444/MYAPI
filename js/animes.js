const API_ALBUM = "https://api.jikan.moe/v4/anime";

function getAlbum(api) {
    fetch(api)
        .then((response) => response.json())
        .then((json) => {
            fillData(json.data);
        })
        .catch((error) => {
            console.error("Error consumiendo laAPI:", error);
        });
}

function fillData(results) {
    let cards = "";
    results.forEach(anime => {
        cards += `
            <div class="col">
                <div class="card h-100" style="width: 12rem;">
                    <img src="${anime.images.jpg.image_url}" class="card-img-top" alt="img-anime">
                    <div class="card-body">
                        <h2 class="card-title">${anime.title}</h2>
                        <h5 class="card-title">Episodes: ${anime.episodes || 'N/A'}</h5>
                    </div>
                </div>
            </div>`;
    });
    document.getElementById("dataAlbum").innerHTML = cards;
}

function searchAnime() {
    const searchTerm = document.getElementById("animeInput").value;
    const API_SEARCH = `https://api.jikan.moe/v4/anime?q=${encodeURIComponent(searchTerm)}&sfw`;
    
    getAlbum(API_SEARCH);
}

// Initial load of anime
getAlbum(API_ALBUM);