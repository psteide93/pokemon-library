const app = document.querySelector("#app")
const ul = document.querySelector("ul")
const div = document.querySelector("div")



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

// function abilityReducer(pokemon){
//     pokemon.abilities.reduce(function (onlyAbilities, pokemon){
//         return [...onlyAbilities, pokemon.ability,]
//     }, []);

// }

function addPokemonDetail(pokemon){
     const ul = document.createElement("ul")
    ul.classList.add("abilities")
    pokemon.abilities.map(ability => {
        const li=document.createElement("li")
        li.innerHTML = `
            <span class = "ability-name">${ability.ability.name}</span>
            <span class = "ability-short-description">
                ${
                    fetch(ability.ability.url)
                        .then(response =>{
                           return response.json()
                }).then(parsedResponse => {
                    parsedResponse.flavor_text_entries.map(flavor_text_entries => {
                        const result = flavor_text_entries.flavor_text
                        console.log((result))
                        return(result)
                    }) 
                })}     
            </span>
        `
        ul.append(li)
        console.log( li)
    })

    div.append(ul)
 }


const url = new URL(window.location)
const queryString = new URLSearchParams(url.search)
fetch(`https://pokeapi.co/api/v2/pokemon/${queryString.get("pokemon")}`)
    .then(response => {
        return response.json()
    }).then(parsedResponse => {
        console.log(parsedResponse)
        addPokemonImage(parsedResponse)
        addPokemonDetail(parsedResponse)
    })

function pokeNameUpperCase(name) {
    return name.charAt(0).toUpperCase() + name.slice(1)
}
