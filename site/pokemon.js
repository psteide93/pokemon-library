const app = document.querySelector("#app")
const ul = document.querySelector("ul")



function addPokemonImage(pokemon) {
    const div = document.createElement("div")
    div.classList.add("pokemon-details")
    div.innerHTML = `   
    <figure>
        <img src= "${pokemon.sprites.front_default}" alt = "${pokemon.name}"/>
        <figcaption>${pokeNameUpperCase(pokemon.name)}</figcaption>
    </figure>
    `
    ul.append(div)
}

function addPokemonDetail(pokemon){
    
    


}


const url = new URL(window.location)
const queryString = new URLSearchParams(url.search)
fetch(`https://pokeapi.co/api/v2/pokemon/${queryString.get("pokemon")}`)
    .then(response => {
        return response.json()
    }).then(parsedResponse => {
        addPokemonImage(parsedResponse)
    })

function pokeNameUpperCase(name) {
    return name.charAt(0).toUpperCase() + name.slice(1)
}