
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

let pokeDetails = document.querySelector(".pokemon-details")
let openingImg = document.querySelector(".opening-img")
//
// let openingScreen = document.querySelector(".opening-screen")
//event listeners
leftButton.addEventListener("click", handleLeftButton)
rightButton.addEventListener("click", handleRightButton)

listItems.forEach((listItem)=>{
  listItem.addEventListener("click", handleListItemClick)
})

//functions

//function to capitalize the first letters
let capitalize = (str) => str[0].toUpperCase() + str.substr(1) 

let resetScreen = () => {
  openingImg.classList.add('hide');
  pokeDetails.classList.remove('hide')
  for (const type of types) {
    topScreen.classList.remove(type);
  }
};

function fetchPokemon(id){

  fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
      .then(res => res.json()) // parse response as JSON
      .then(data => {
        resetScreen()
        //pokemon object 
        const pokemon = {
          name : data.name,
          pokeID : data.id,
          frontImg : data.sprites.front_default,
          backImg: data.sprites.back_default,
          type: data.types.map((type)=> type.type.name)
        }
        // console.log(pokemon)
        let pokeTypeOne = pokemon.type[0]
        let pokeTypeTwo = pokemon.type[1]

        pokeName.textContent = capitalize (pokemon.name)
        pokeID.textContent = pokemon.pokeID
        frontImg.src = pokemon.frontImg
        backImg.src = pokemon.backImg
        typeOne.textContent = capitalize(pokemon.type[0])
        
        if(pokeTypeTwo){
          typeTwo.classList.remove("hide")
          typeTwo.textContent = capitalize(pokeTypeTwo)

        }else{
          typeTwo.classList.add("hide")
          typeTwo.textContent = ""
        }
        topScreen.classList.add(pokemon.type[0])

        
        
      })
      .catch(err => {
          console.log(`error ${err}`)
      });
}

//set the previous url and next url to null
let prevUrl = null
let nextUrl = null

let types = [
  'normal', 'fighting', 'flying',
  'poison', 'ground', 'rock',
  'bug', 'ghost', 'steel',
  'fire', 'water', 'grass',
  'electric', 'psychic', 'ice',
  'dragon', 'dark', 'fairy'
]

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
    //if we click anywhere else instead of the pokemon name --> return 
    if(!e.target){
      return
    }
    //get only the id no
    let id = e.target.textContent.split(".")[0]
    //pass it to the fetch pokemon function as an agrument
    fetchPokemon(id)

}


fetchPokemonList('https://pokeapi.co/api/v2/pokemon?offset=0&limit=20')