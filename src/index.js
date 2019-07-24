const DB_PATH = 'http://localhost:3000/beers';
const BEER_LIST = document.querySelector('#list-group');
const BEER_SHOW = document.querySelector('#beer-detail');

class Beer {
  constructor(beerJson) {
    this.id = beerJson['id'];
    this.name = beerJson['name'];
    this.tagline = beerJson['tagline'];
    this.firstBrewed = beerJson['first_brewed'];
    this.description = beerJson['description'];
    this.imageUrl = beerJson['image_url'];
    this.foodPairing = beerJson['food_pairing'];
    this.brewersTips = beerJson['brewers_tips'];
    this.contributedBy = beerJson['contributedBy'];
    this.listEntry = this.renderListEntry();
    this.showEntry = this.renderShowEntry();
    this.listEntryListener();
  }

  renderListEntry() {
    this.li = document.createElement('li');
    this.li.className = 'list-group-item';
    this.li.textContent = this.name;
    BEER_LIST.append(this.li);
  }

  renderShowEntry() {
    this.div = document.createElement('div');

    this.h1 = document.createElement('h1');
    this.h1.textContent = this.name;

    this.img = document.createElement('img');
    this.img.src = this.imageUrl;

    this.h3 = document.createElement('h3');
    this.h3.textContent = this.tagline;

    this.textarea = document.createElement('textarea');
    this.textarea.textContent = this.description;

    this.button = document.createElement('button');
    this.button.id = 'edit-beer';
    this.button.className = 'btn btn-info';
    this.button.textContent = 'Save';
    this.button.addEventListener('click', function(e) {
      this.description = document.querySelector('textarea').value;
      let newDescription = {
        'description': this.description
      }
      fetch(DB_PATH + `/${this.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(newDescription)
      })
      .then(res => res.json());
    });

    this.div.append(this.h1);
    this.div.append(this.img);
    this.div.append(this.h3);
    this.div.append(this.textarea);
    this.div.append(this.button);

    return this.div;
  }

  listEntryListener(showEntry=this.showEntry) {
    this.li.addEventListener('click', function(e) {
      BEER_SHOW.innerHTML = '';
      BEER_SHOW.append(showEntry);
    });
  }


}

(function fetchBeers() {
  fetch(DB_PATH)
  .then(res => res.json())
  .then(myJson => myJson.forEach(function(elem) {
    new Beer(elem);
  }))
})();
