let beerListUl = document.querySelector('#list-group')
let beerDetailsDiv = document.querySelector('#beer-detail')


// FETCHES
  // Beer List Fetch
  const beerListFetch = () => {
    return fetch('http://localhost:3000/beers')
    .then(res => res.json())
  }

  // Beer Details Fetch
  const beerDetailsFetch = (beerId) => {
    return fetch(`http://localhost:3000/beers/${beerId}`)
    .then(res => res.json())
  }

  // Updating beer Description Fetch
  const updateBeerDetailsFetch = (beerId, descr) => {
    return fetch(`http://localhost:3000/beers/${beerId}`,{
      method: 'PATCH',
      headers:   {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
      body: JSON.stringify({
        description: descr
      }),
    })
    .then(res => res.json())
  }


// SLAP BEER LIST ON DOM
      beerListFetch().then(beerList => {
        beerList.forEach(beer => {
          // console.log(beer.name);
          let beerLi = document.createElement('li');
          beerLi.className = "list-group-item";
          beerLi.innerText = `${beer.name}`
          beerLi.dataset = "id";
          beerLi.dataset.id = `${beer.id}`
          beerListUl.append(beerLi);
        });
      })

  // Slap Beer Deatils on the DOM
    beerListUl.addEventListener('click', (e) => {
        if (e.target.tagName === 'LI') {
          let beerId = e.target.dataset.id;
          beerDetailsFetch(beerId).then(beer => {
            beerDetailsDiv.innerHTML = '';
            beerDetailsDiv.innerHTML = `
                <h1>${beer.name}</h1>
                <img src="${beer.image_url}">
                <h3>${beer.tagline}</h3>
                <textarea>${beer.description}</textarea>
                <button id="${beer.id}" class="btn btn-info">
                  Save
                </button>`;

                // UPDATING ACTION
                let saveButton = document.querySelector('.btn-info');
                saveButton.addEventListener('click', (e) => {
                  let beerId = e.currentTarget.id;
                  let beerDes = beerDetailsDiv.querySelector('textarea').innerHTML;
                  updateBeerDetailsFetch(beerId, 'No!!')
                });
          })
        }
    })
