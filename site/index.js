const app = document.querySelector("#app")
const ul = document.querySelector("ul")
const spinner = document.querySelector("img")



function addPokemonImage(pokemon) {
    const div = document.createElement("div")
    div.classList.add("pokemon-listing")
    div.innerHTML = `
    <figure>
        <img src= "${pokemon.sprites.front_default}" alt = "${pokemon.name}"/>
        <figcaption>
            <a href="pokemon.html?pokemon=${pokemon.id}">${pokeNameUpperCase(pokemon.name)}</a>
        </figcaption>
    </figure>
`    
    ul.append(div)
}

const url = "https://pokeapi.co/api/v2/pokemon?offset=251&limit=50"

fetch(url)
    .then(response => {
    
        return response.json()
    }).then(parsedResponse => {
        const urls = parsedResponse.results.map(result => result.url)
        const fetches = urls.map(url => fetch(url).then(response => response.json()))
        return Promise.all(fetches)
    }).then(responses => {
        spinner.classList.add("hidden")
        responses.forEach(response => {
            addPokemonImage(response)
        })
    })


function pokeNameUpperCase(name){
    return name.charAt(0).toUpperCase() + name.slice(1)
}
