fetch('http://localhost:3000/beers')
.then(response => response.json())
.then(data => renderBeers(data))



function renderBeers(data){
    const ul = document.querySelector('#list-group')
    data.forEach(beer => {
        ul.append(beerLi(beer))
    })
}

function beerLi(beer){
    const li = document.createElement('li')
        li.className = 'list-group-item'
        li.innerText = `${beer.name}`
        li.dataset.beerId = beer.id
        
        li.addEventListener('click', beerDetail)

        return li
}

function beerDetail(){
    const id = event.target.dataset.beerId

    fetch(`http://localhost:3000/beers/${id}`)
    .then(response => response.json())
    .then(data => {
        showBeer(data)
    })
}

function showBeer(data){
    const div = document.querySelector('#beer-detail')
    debugger
    div.innerHTML = `
        <h1>${data.name}</h1>
        <img src="${data.image_url}">
        <h2>${data.tagline}</h2>
        <p>${data.description}</p>
        <h3>Write Your Own Description</h3>
        <textarea>${data.description}</textarea>
        <button data-id=${data.id} id="edit-beer" class="btn btn-info">
          Save
        </button>
    `
    const form = div.querySelector('textarea')
    const button = div.querySelector('#edit-beer')

    button.addEventListener('click', event =>{
        editDescription(event, form)
    })
}

function editDescription(event, form){
    let id = parseInt(event.target.dataset.id)
    let newDescription = form.value
    
    fetch(`http://localhost:3000/beers/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },

        body: JSON.stringify({
            'description': newDescription
        })
    }).then(response => response.json())
      .then(data => {
          const div = document.querySelector('#beer-detail')
          const description = div.querySelector('p')
          description.innerText = `${data.description}`
      })
}

