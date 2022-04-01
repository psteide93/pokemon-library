const app = document.querySelector("#app")
const ul = document.querySelector("ul")
const div = document.querySelector("div")

function NameUpperCase(name) {
    return name.charAt(0).toUpperCase() + name.slice(1)
}

function addPokemonImage(pokemon) {
    const div = document.createElement("div")
    div.classList.add("pokemon-details")
    div.innerHTML = `   
    <figure>
        <img src= "${pokemon.sprites.front_default}" alt = "${pokemon.name}"/>
        <figcaption>${NameUpperCase(pokemon.name)}</figcaption>
    </figure>
    `
    ul.append(div)
}

function addPokemonDetail(pokemon) {
    const ul = document.createElement("ul")
    ul.classList.add("abilities")
    pokemon.abilities.map(ability => {
        fetch(ability.ability.url)
            .then(response => {
                return response.json()
            }).then(parsedResponse => {
                const flavor_text = parsedResponse.flavor_text_entries
                    .find(flavor_text_entry => flavor_text_entry.language.name === "en")
                const li = document.createElement("li")
                li.innerHTML = `
                        <span class = "ability-name">${NameUpperCase(ability.ability.name)}</span>
                        <span class = "ability-short-description">${flavor_text.flavor_text}</span>
                    `
                ul.append(li)
            })

        div.append(ul)
    })
}

const url = new URL(window.location)
const queryString = new URLSearchParams(url.search)
fetch(`https://pokeapi.co/api/v2/pokemon/${queryString.get("pokemon")}`)
    .then(response => {
        return response.json()
    }).then(parsedResponse => {
        addPokemonImage(parsedResponse)
        addPokemonDetail(parsedResponse)
    })
