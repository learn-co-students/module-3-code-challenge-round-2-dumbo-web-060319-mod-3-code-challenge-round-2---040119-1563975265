let ulOfBeers = document.querySelector("#list-group");
let beerDetailsDiv = document.querySelector("#beer-detail");
let div = document.querySelector('.col-md-8');

document.addEventListener("DOMContentLoaded", function(){
    fetch("http://localhost:3000/beers")
    .then(response => response.json())
    .then(beers => renderAllBeers(beers))
})

function renderAllBeers(beers){
    beers.forEach(beer => {
        renderOneBeer(beer);
    })
}

function renderOneBeer(beer){
    let beerLi = document.createElement('li');
    beerLi.id = `${beer.id}`;
    beerLi.classList.add("list-group-item");
    beerLi.innerText = `${beer.name}`;

    ulOfBeers.append(beerLi);

    beerLi.addEventListener('click', function(event){
        let id = beer.id

        fetch(`http://localhost:3000/beers/${id}`)
        .then(response => response.json())
        .then(beer => showBeerDetails(beer))
    })

}

function showBeerDetails(beer){

   beerDetailsDiv.innerHTML = `
            <h1>${beer.name}</h1>
            <img src="${beer.image_url}">
            <h3>${beer.tagline}</h3>
            <textarea>${beer.description}</textarea>
            <button id="edit-beer" class="btn btn-info">Save</button>
            `
    div.append(beerDetailsDiv);
    
    let editButton = document.querySelector('#edit-beer');
    editButton.addEventListener('click', function(event){
        let text = document.querySelector('textarea').innerHTML;
       
         

        fetch(`http://localhost:3000/beers/${beer.id}`,{
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Accepts: "application/json"
            },
            body: JSON.stringify({
                "description": text
            })
        }).then(response => response.json())
        .then(
            console.log
        )
        
     })
}
