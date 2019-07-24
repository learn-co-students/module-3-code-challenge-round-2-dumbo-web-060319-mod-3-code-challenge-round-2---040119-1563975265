let listOfBeers = document.querySelector(".list-group");
let beerDetail = document.querySelector("#beer-detail");

function getBeers() {
fetch('http://localhost:3000/beers')
    .then(response => response.json())
    .then(data => {
        iterateThroughBeers(data);
    });
}

getBeers();

function iterateThroughBeers(data) {
    data.forEach(beer => {
        addBeerToDom(beer);
    });
}

function addBeerToDom(beer) {
    let beerLi = document.createElement("li");
    beerLi.className = "list-group-item";
    beerLi.innerHTML = `${beer.name}`
    listOfBeers.append(beerLi);

    beerLi.addEventListener("click", function() {
        displayBeerDetails(beer);
    });

};

function displayBeerDetails(beer) {
    beerDetail.innerHTML = `<h1>${beer.name}</h1>
    <img src=${beer.image_url}/>
    <h3>${beer.tagline}</h3>
    <textarea id="form">${beer.description}</textarea>
    <button id="edit-beer" class="btn btn-info" data-id="${beer.id}">
    Save
    </button>
    `

    let textAreaForm = beerDetail.querySelector("#form");
    //console.log(textAreaForm);
    let editBeerButton = beerDetail.querySelector("#edit-beer");
    //console.log(editBeerButton);
    beerDetail.addEventListener("click", function(event) {
        //console.log(event.target)
        event.preventDefault();
        if (event.target.className == "btn btn-info"){
            let input = textAreaForm.value;
            patchBeer(beer, input);
        }
    });

};

function patchBeer(beer, input) {
    
    beer.description = input;
    fetch(`http://localhost:3000/beers/${beer.id}`, {
        method: "PATCH",
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            description: input
        })
    })
    .then(response => response.json());
}