const API_ALBUM = "https://pokeapi.co/api/v2/pokemon?limit=20&offset=0";

function getAlbum(api) {
    fetch(api)
        .then((response) => response.json())
        .then((json) => {
            fillData(json.results), pagination(json);
        })
        .catch((error) => {
            console.log(error, "error consumiendo la API")
        })
}

function fillData(results) {
    let cards = "";
    for (let i = 0; i < 20; i++) {
        fetch(results[i].url)
            .then(response => response.json())
            .then(pokemon => {
                fetch(pokemon.species.url)
                    .then(speciesResponse => speciesResponse.json())
                    .then(speciesData => {
                        const speciesName = speciesData.genera.find(genus => genus.language.name === "en").genus;
                        cards += `<div class= "col">
                        <div class= "card h-100" style="width: 12rem;">
                        <img src="${pokemon.sprites.front_default}" class="card-img-top" alt="img-personaje">
                        <h2 class="card-title" > ${pokemon.name} </h2>
                        <div class="card-body">
                        <h5 class="card-title">Type: ${pokemon.types[0].type.name}</h5>
                        <h5 class="card-title">Species: ${speciesName}</h5>
                        </div>
                        </div>
                        </div>
                        `;
                        document.getElementById("dataAlbum").innerHTML = cards;
                    });
            });
    }
}

function pagination(info) {
    let prevDisabled = "";
    let nextDisabled = "";

    if (!info.previous) {
        prevDisabled = "disabled"
    }

    if (!info.next) {
        nextDisabled = "disabled"
    }

    let html = `
    <li class="page-item ${prevDisabled}"><a class="page-link" onclick="getAlbum('${info.previous || API_ALBUM}')" >prev</a></li> 
    <li class="page-item ${nextDisabled}"><a class="page-link" onclick="getAlbum('${info.next || API_ALBUM}')" >next</a></li> 
    `;

    document.getElementById("pagination").innerHTML = html
}

getAlbum(API_ALBUM)