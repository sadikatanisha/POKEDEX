
let topScreen = document.querySelector(".top-screen")
let pokeName = document.querySelector(".name")
let pokeID = document.querySelector(".id")
let frontImg = document.querySelector(".front-img")
let backImg = document.querySelector(".back-img")
let typeOne = document.querySelector(".poke-type-one")
let typeTwo = document.querySelector(".poke-type-two")
let listItems = document.querySelectorAll(".list-item")
let leftButton = document.querySelector(".left-button")
let rightButton = document.querySelector(".right-button")

//event listeners
leftButton.addEventListener("click", handleLeftButton)
rightButton.addEventListener("click", handleRightButton)

listItems.forEach((listItem)=>{
  listItem.addEventListener("click", handleListItemClick)
})

//functions
let capitalize = (str) => str[0].toUpperCase() + str.substr(1)


function fetchPokemon(id){

  fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
      .then(res => res.json()) // parse response as JSON
      .then(data => {
        
        const pokemon = {
          name : data.name,
          pokeID : data.id,
          frontImg : data.sprites.front_default,
          backImg: data.sprites.back_default,
          type: data.types.map((type)=> type.type.name)
        }
        console.log(pokemon)
        pokeName.textContent = capitalize (pokemon.name)
        pokeID.textContent = pokemon.pokeID
        frontImg.src = pokemon.frontImg
        backImg.src = pokemon.backImg
        typeOne.textContent = pokemon.type[0]
        typeTwo.textContent = pokemon.type[1]
        
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
  .then(res => res.json())
    .then(data => {
      const { results, previous, next } = data;
      prevUrl = previous;
      nextUrl = next;


    listItems.forEach((item,i)=>{
      let listItem = item
      let result = results[i]
      if(result){
        let urlArray = result.url.split("/")
        let id = urlArray[urlArray.length-2]
        listItem.textContent = id + ". " + capitalize(result.name)
        
      }else {
        listItem.textContent = '';
      }
    })


  })


}


// click functions
function handleLeftButton(){
  if(prevUrl){
    fetchPokemonList(prevUrl)
  }
}
function handleRightButton(){
  if(nextUrl){
    fetchPokemonList(nextUrl)
  }
}

function handleListItemClick(e){
  
    if(!e.target){
      return
    }
    let id = e.target.textContent.split(".")[0]
    fetchPokemon(id)

}


fetchPokemonList('https://pokeapi.co/api/v2/pokemon?offset=0&limit=20')