console.log('running');

// Beers URL
const BEERS_URL = 'http://localhost:3000/beers';
// Single Beer Example: http://localhost:3000/beers/:id

// Items we'll need from the page
const body = document.querySelector('body');
const BEER_LIST_CONTAINER = document.querySelector('#list-group'); // UL to store beer list
const BEER_DETAIL_CONTAINER = document.querySelector('#beer-detail'); // DIV to store a single beer's details

// DELIVERABLE NO. 1
// When the DOM has loaded
document.addEventListener('DOMContentLoaded', event => {
  // fetch our beers
  fetchBeers();
});

// Fetch Beers
function fetchBeers() {
  fetch(BEERS_URL)
    .then(res => res.json())
    // get the list of beers on the page
    .then(getBeersOnPage);
}

// Get Beers on Page
function getBeersOnPage(beersData) {
  // console.log(beersData);
  // console.log(BEER_LIST_CONTAINER);
  for (const beer of beersData) {
    // Create the li
    let li = document.createElement('li');
    // append li to our list container
    BEER_LIST_CONTAINER.append(li);
    // give it the class name
    li.classList = 'list-group-item';
    // inner text is beer's name
    li.innerText = beer.name;
    // unique id
    li.id = `beer-list-item-${beer.id}`;
    // Dataset
    li.dataset.beerId = beer.id;
  }
}

// DELIVERABLE NO. 2 & 3

// Let's get a Click event on the page
body.addEventListener('click', event => {
  if (event.target.className === 'list-group-item') {
    // Grab that beer's id
    let beerId = event.target.dataset.beerId;
    // fetch that single beer
    fetchOneBeer(beerId);
  } else if (event.target.className == 'btn btn-info') {
    // if it's the save button
    // Get the id of the beer from the save button
    let beerId = event.target.id.split('-')[2];
    // Get the Sibling (textfield )'s value
    let description = event.target.previousElementSibling.value;
    // call function to edit one Beer, pass the beer's id and the new description
    editOneBeer(beerId, description);
  }
});

// Fetch one beer
function fetchOneBeer(id) {
  fetch(`${BEERS_URL}/${id}`)
    .then(res => res.json())
    .then(slapDetailsOnDom);
}

function slapDetailsOnDom(beerData) {
  BEER_DETAIL_CONTAINER.innerHTML = `
  <h1>${beerData.name} (${beerData.first_brewed})</h1>
  <img src="${beerData.image_url}">
  <h3>${beerData.tagline}</h3>
  <textarea>${beerData.description}</textarea>
  <button id="edit-beer-${beerData.id}" class="btn btn-info">
    Save
  </button>
  `;
  if (beerData.food_pairing.length > 0) {
    BEER_DETAIL_CONTAINER.innerHTML += `
    <br />
    <h4> ${beerData.name} pairs well with...</h4>
    <ul class="food-pairings" id="food-pairing-${beerData.id}"></ul>
    `;
    let ul = document.querySelector('.food-pairings');
    for (const pairing of beerData.food_pairing) {
      let li = document.createElement('li');
      ul.append(li);
      li.innerText = pairing;
    }
  }
  BEER_DETAIL_CONTAINER.innerHTML += `
  <br />
  <p>A contribution by ${beerData.contributed_by}<p>
  `
}

// The text field saves without me doing anything extra to the dom.
// If i click on five different beers and come back to it, it will remain the same, only if I've clicked save.
function editOneBeer(id, description) {
  fetch(`${BEERS_URL}/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    body: JSON.stringify({ description })
  })
    .then(res => res.json())
    .then(data => console.log(data))
    .catch(err => console.log(err));
}

/* on the page, LIST OF BEERS SHOULD LOOK LIKE
<ul class="list-group">
  <li class="list-group-item">Beer title 1</li>
  <li class="list-group-item">Beer title 2</li>
</ul>
  */

/* on the page, SINGLE BEER SHOULD LOOK LIKE
<div id="beer-detail">
  <h1>Beer Name</h1>
  <img src="<add beer img url here>">
  <h3>Beer Tagline</h3>
  <textarea>Beer Description</textarea>
  <button id="edit-beer" class="btn btn-info">
    Save
  </button>
</div>
  */
