const parentUl = document.querySelector('#list-group')
const parentDiv = document.querySelector('#beer-detail')


fetch('http://localhost:3000/beers')
.then(resp => resp.json())
.then(showAllBeers)

beerDetails()

function showAllBeers(beers){
  for(beer of beers){
    const beerLi = document.createElement('li')
    beerLi.className = 'list-group-item'
    beerLi.id = `${beer.id}`
    beerLi.innerText = `${beer.name}`
    parentUl.append(beerLi)
  }
  parentUl.addEventListener('click', (event) => {
    if (event.target.classList.contains('list-group-item')) {
      fetch(`http://localhost:3000/beers/${event.target.id}`)
      .then(resp => resp.json())
      .then(function(beer) {
        parentDiv.innerHTML = `
          <h1>${beer.name}</h1>
          <img src="${beer.image_url}">
          <h3>${beer.tagline}</h3>
          <textarea class='description'>${beer.description}</textarea>
          <button id="${beer.id}" class="btn btn-info">
            Save
          </button>
        `
      })

    }
  })
  // beerDetails()
}

function beerDetails() {
  document.addEventListener('click', (event) => {
    if(event.target.classList.contains('btn')) {
      let description = document.querySelector('textArea')
      fetch(`http://localhost:3000/beers/${event.target.id}`, {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json'
            },
            body: JSON.stringify({
              description: `${description.value}`
            })
          })
          .then(resp => resp.json())
          .then(function(data) {
            description.value = `${data.description}`
          })
    }
  })
}


