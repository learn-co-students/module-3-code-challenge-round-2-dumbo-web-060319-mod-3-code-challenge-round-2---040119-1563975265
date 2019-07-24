fetchBeers()

/// FETCH THE BEER \\\
function fetchBeers(){
  fetch("http://localhost:3000/beers")
  .then(resp => resp.json())
  .then(beers => iterateBeers(beers))
}
/// ITERATE THROUGH BEERS \\\
function iterateBeers(beers){
  beers.forEach(beer => {
    renderBeers(beer)
  });
}
/// RENDER BEER LIST \\\
function renderBeers(beer){
  const ul = document.querySelector(".list-group")
  const li = document.createElement("li")
  li.innerHTML = `<li class="list-group-item", data-id="${beer.id}">${beer.name}</li>`
  ul.append(li)

  /// SENDS US TO THE SHOW PAGE \\\  
  li.addEventListener("click", function(e){
    showBeers(e)
  })
}

/// BEER SHOW PAGE \\\
function showBeers(e){
  const id = e.target.dataset.id
  
  fetch(`http://localhost:3000/beers/${id}`)
  .then(resp => resp.json())
  .then(beer => viewBeer(beer))
}

function viewBeer(beer){
  const beerDiv = document.querySelector("#beer-detail")
  beerDiv.innerHTML = `<h1>${beer.name}</h1>
                      <img src="${beer.image_url}">
                      <h3>${beer.tagline}</h3>
                      <textarea>${beer.description}</textarea>
                      <button id="${beer.id}" class="btn btn-info">
                        Save
                      </button>`
  const buttonId = beerDiv.querySelector(".btn-info")
  buttonId.addEventListener("click", function(e){
    editBeer(e)
  })
}

function editBeer(e){
  const id = e.target.id

  // const descript = e.target.textarea

  fetch(`http://localhost:3000/beers/${id}`, {
    method: "PATCH",
    headers:   {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({
      "description": "PLACEHOLDER"
    })
  })
  

}