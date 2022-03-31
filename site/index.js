const app = document.querySelector("#app")
const ul = document.querySelector("ul")



function addPokemonImage(pokemon) {
    const div = document.createElement("div")
    div.innerHTML = `
    <a href = "pokemon.html?pokemon=${pokemon.name}">
        <img src = "${pokemon.sprites.front_default}" alt = ${pokemon.name}" />
    </a>
    `
    console.log(div)
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

        console.log(responses)
        responses.forEach(response => {
            addPokemonImage(response)
        })
    })



























// function addPokemonImage(pokemon) {
//     const div = documenet.createElement("div")
//     div.innerHTML = `
//     <a href = "pokemon.html?pokemon=${pokemon.name}">
//         <img src = "${pokemon.sprites.front_default}" alt = ${pokemon.name}" />
//     </a>
//     `
//     pokemon.append(div)
// }
