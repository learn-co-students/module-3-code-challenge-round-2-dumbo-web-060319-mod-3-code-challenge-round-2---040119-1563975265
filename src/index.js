console.log('running');

// Beers URL
const BEERS_URL = 'http://localhost:3000/beers';
// Single Beer Example: http://localhost:3000/beers/:id

// Items we'll need from the page
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
    li.classList = 'list-group-item';
    li.innerText = beer.name;
  }
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
