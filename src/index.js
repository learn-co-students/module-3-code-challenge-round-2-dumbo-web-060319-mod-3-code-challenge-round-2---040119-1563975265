const LIST_GROUP = document.querySelector('.list-group');
const BEER_DETAIL = document.querySelector('#beer-detail');

// slaps individual beer on the DOM
function slapBeerOnTheDOM(beerData) {
	let beerItem = document.createElement('li');
	LIST_GROUP.append(beerItem);
	beerItem.className = "list-group-item";
	beerItem.dataset.id = beerData.id;
	beerItem.innerText = beerData.name

}

// renders the page with all of the beers in the API
function renderBeers(beersData) {
	for (beerData of beersData) {
		slapBeerOnTheDOM(beerData);
	}
}

// makes the GET request to the beers API and then parses it to json 
function fetchBeers() {
	return fetch('http://localhost:3000/beers')
	.then(res => res.json());
}

// tasks to do on page load
document.addEventListener("DOMContentLoaded", event => {
	// calling to fetch beer to get the beers from the API
	fetchBeers()
	.then(renderBeers);
});

// renders the beer detail to the DOM
function renderBeer(beerData) {
	console.log(beerData);
	BEER_DETAIL.innerHTML = `<h1> ${beerData.name} </h1>`;
	BEER_DETAIL.innerHTML += `<img src="${beerData.image_url}">`;
	BEER_DETAIL.innerHTML += `<h3> ${beerData.tagline}</h3>`;
	BEER_DETAIL.innerHTML += `<textarea class="description"> ${beerData.description} </textarea>`;
	BEER_DETAIL.innerHTML += `<button id="${beerData.id}" class="btn btn-info">
  Save
</button>`
}

// fetches data for a specific beer
function fetchBeer(beerId) {
	return fetch(`http://localhost:3000/beers/${beerId}`)
	.then(res => res.json());
}

// event listener triggered on clicks of list_group
LIST_GROUP.addEventListener("click", event => {
	// specific event click for a beer item
	if (event.target.className === "list-group-item"){
		fetchBeer(event.target.dataset.id)
		.then(renderBeer);
	}
});

// updates the description on the DOM NOT FINISHED
function updateDOMDescription(beerData) {
	// debugger;
	console.log(beerData);
	let items = LIST_GROUP.querySelectorAll(".list-group-item");
	let desiredItem = "";
	items.forEach(item => {if (item.dataset.id === beerData.id) {
	 	desiredItem = item;
	 }});
	// debugger;
}

// edits the beer's description
function updateBeerDescription(beerId, description) {
	fetch(`http://localhost:3000/beers/${beerId}`, {
		method: "PATCH",
		headers: {
	    'Content-Type': 'application/json',
	    'Accept': 'application/json'
	  },
	  body: JSON.stringify({description})
	})
	.then(res => res.json())
	.then(updateDOMDescription);
}

// event listener on click for beer detail section
BEER_DETAIL.addEventListener("click", event => {
	// specfic event click for saving description
	if (event.target.className === "btn btn-info") {
		let description = event.target.parentElement.querySelector(".description").value;
		updateBeerDescription(event.target.id, description)
	}
});