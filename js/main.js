
let topScreen = document.querySelector(".top-screen")

let pokeName = document.querySelector(".name")
let pokeID = document.querySelector(".id")
let frontImg = document.querySelector(".front-img")
let backImg = document.querySelector(".back-img")

let listItems = document.querySelectorAll(".list-item")

function fetchPokemon(id){
  
  const url = `https://pokeapi.co/api/v2/pokemon/${id}`

  fetch(url)
      .then(res => res.json()) // parse response as JSON
      .then(data => {
        console.log(data)
        const pokemon = {
          name : data.name,
          pokeID : data.id,
          frontImg : data.sprites.front_default,
          backImg: data.sprites.back_default,
          type: data.types.map((type)=> type.type.name)
        }
        console.log(pokemon)
        pokeName.textContent = pokemon.name
        pokeID.textContent = pokemon.pokeID
        frontImg.src = pokemon.frontImg
        backImg.src = pokemon.backImg
        
      })
      .catch(err => {
          console.log(`error ${err}`)
      });
}

//set the previous url and next url to null
let prevUrl = null
let nextUrl = null
//fetch pokemon to the list --> limit 20 each time
function fetchPokemonList(url){
  fetch(url)
  .then(res=> res.json())
  .then(data=>{
    let {results, prev,next} = data
     prevUrl = prev
     nextUrl = next

     console.log(data)

    listItems.forEach((item,i)=>{
      let listItem = item
      let result = results[i]
      console.log(result)
      if(result){
        let urlArray = result.url.split("/")
        let id = urlArray[urlArray.length-2]
        listItem.textContent = id + "." + result.name
        
      }else {
        listItem.textContent = '';
      }
    })


  })


}
fetchPokemon()



fetchPokemonList('https://pokeapi.co/api/v2/pokemon?offset=0&limit=20')