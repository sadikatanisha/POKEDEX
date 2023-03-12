
let topScreen = document.querySelector(".top-screen")

let pokeName = document.querySelector(".name")
let id = document.querySelector(".id")
let frontImg = document.querySelector(".front-img")
let backImg = document.querySelector(".back-img")

function fetchPokemon(){
  
  const url = 'https://pokeapi.co/api/v2/pokemon/1'

  fetch(url)
      .then(res => res.json()) // parse response as JSON
      .then(data => {
        console.log(data)
        const pokemon = {
          name : data.name,
          pokeID : data.id,
          imgFront : data.sprites.front_default,
          imgBack: data.sprites.back_default,
          type: data.types.map((type)=> type.type.name).join(", ")
        }
        console.log(pokemon)
        pokeName.textContent = pokemon.name
        id.textContent = pokemon.pokeID
        frontImg.src = pokemon.imgFront
        backImg.src = pokemon.imgBack
        
      })
      .catch(err => {
          console.log(`error ${err}`)
      });
}

fetchPokemon()