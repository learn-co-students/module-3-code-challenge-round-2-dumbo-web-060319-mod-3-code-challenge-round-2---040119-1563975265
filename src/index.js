const BEERS_URL = 'http://localhost:3000/beers/'
const beerList = document.querySelector("#list-group")
const beerDetail = document.querySelector("#beer-detail")

function renderBeerData(beerData, event){
  console.log(event)
  console.log(beerData)
  console.log(beerDetail)

  let beer = beerData

  beerDetail.innerHTML = `<h1>${beer.name}</h1>
  <img src=${beer.image_url}>
  <h3>${beer.tagline}</h3>
  <textarea data-id"${beer.id}>${beer.description}</textarea>
  <button id="edit-beer" class="btn btn-info" data-id="${beer.id}">
  Save
</button>`

}

function getBeerDataFetch(event){
  console.log(event.target)
  fetch(BEERS_URL + event.target.dataset.beerId)
  .then(response => response.json())
  .then(data => renderBeerData(data, event))
}

beerList.addEventListener("click", function(event) {
  console.log("event.target")
  if (event.target.classList.contains("list-group-item")){
    console.log(event.target.dataset.beerId)
    getBeerDataFetch(event);
  }
})

function renderEditOnDom(data, event) {
  console.log(data)
  console.log(event)

  //dont actually need to render changes on the dom?
  //the patch happens when save button is clicked
  //when the li is clicked again it fetches from the api
  //so any changes made will be rendered.....???

  // debugger
}

function editBeerFetch(event){
  let textArea = document.querySelector("textarea").value

  console.log(event.target.dataset.id)
  fetch(BEERS_URL + event.target.dataset.id, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Accept' : 'application/json'
      },
      body: JSON.stringify({
        "description" : textArea
      })
    })
    .then(response => response.json())
    .then(data => renderEditOnDom(data, event))
}

beerDetail.addEventListener("click", function(event){
  let textArea = document.querySelector("textarea")
  let saveButton = beerDetail.querySelector("#edit-beer")
  console.log(event.target)
  if (event.target === saveButton){
    console.log(textArea.value)
    editBeerFetch(event);
  }
})

// let textAreaTest = document.querySelector("textarea")
// textAreaTest.assEventListener("keydown", event => {
//   if (event.keyCode == 13) {
//     editBeerFetch(event);
//   }  JUST NEVERMIND THIS
// });

function renderAllBeerLis(beerData) {
  console.log(beerData)
  beerData.map(beer => createBeerLi(beer))
}

function createBeerLi(beer) {
  let beerLi = document.createElement("li")

  beerLi.className = `list-group-item`;
  beerLi.innerText = beer.name
  beerLi.dataset.beerId = beer.id

  beerList.append(beerLi)

  // beerLi.addEventListener()

  console.log(beerList)
  console.log(beer)
  // debugger
}

function getAllBeersFetch() {
  fetch(BEERS_URL)
  .then(response => response.json())
  .then(beerData => renderAllBeerLis(beerData))
}

document.addEventListener("DOMContentLoaded", function(event) {
  getAllBeersFetch();
})
