const beersUrl = "http://localhost:3000/beers"
const beerShow = "http://localhost:3000/beers/:id"
const listSelector = document.querySelector("#list-group")
const beerDetailSelector = document.querySelector("#beer-detail")

//tbh so proud of what I accomplished and I hope I get atleast 5 janky points

window.addEventListener('DOMContentLoaded', (event) => {
    console.log('Hey boo, keep it cute.');
    grabAllBeers();
});

// document.addEventListener(click, renderBeerDetail(beer));

// function renderBeerDetail(){ - create the element, innerHTML, then append to the div
    // ```html
    // <h1>Beer Name</h1>
    // <img src="<add beer img url here>">
    // <h3>Beer Tagline</h3>
    // <textarea>Beer Description</textarea>
    // <button id="edit-beer" class="btn btn-info">
    //   Save
    // </button>
    // ```
// }

function grabAllBeers(){
    fetch(beersUrl)
    .then(resp => resp.json())
    .then(data => renderAllBeers(data));
};

function renderAllBeers(data){
    data.forEach(beerElement => {
        li = document.createElement('li')
        li.innerHTML = `
        <p id = ${beerElement.id}> 
        <a href="http://localhost:3000/beers/${beerElement.id}"> ${beerElement.name} </a> <p>
        `
        listSelector.append(li);
        //obvi the show link should not go here, it should trigger a click event which appends
        //to the beerDetailSelector and I will be soooo prepared for next time
        //proud I made it this far tho for realz
    });
    // how did I forget about forEach for mad long?!
    // console.log(data)
    // li = document.createElement('li')
    // li.classList = "all-beer"
    // //data[1].name = name of beer
    // //so now iterate yo!
    // // console.log(data)
    // debugger
};

// function displayBeer(){
//     let request = new XMLHttpRequest();
//     request.open('GET', beersUrl);
//     request.responseType = 'text';
//     console.log(request.value)
//     debugger
// }

