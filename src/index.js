
const BEERLIST = document.querySelector("#list-group")

function fetchBeers(){
    fetch('http://localhost:3000/beers')
    .then(response => response.json())
    .then(response => response.forEach((beer)=>{
        displayBeer(beer)
    }))
}

function displayBeer(beer){
 const beerItem = document.createElement('li')
 beerItem.className = "list-group-item"
 beerItem.innerText = beer.name 
 BEERLIST.append(beerItem)

 beerItem.addEventListener('click', function(){

     fetch(`http://localhost:3000/beers/${beer.id}`)
     .then(response => response.json())
     .then(beerData => showDetails(beerData, beer))
 })
}

function showDetails(beerData, beer){
    const beerInfo = document.querySelector("#beer-detail")
   

    beerInfo.innerHTML= `
    <h1>${beer.name}</h1>
    <img src="${beer.image_url}">
    <h3>${beer.tagline}</h3>
    <textarea class="text-area">${beer.description}</textarea>
    <button id="edit-beer" class="btn btn-info">Save</button>
 ` 

    //--- EDIT BEER --- //
    const editBeer = beerInfo.querySelector("#edit-beer") 

    editBeer.addEventListener("click", function(){

        let newDescription = beerInfo.querySelector(".text-area").value

        fetch('http://localhost:3000/beers/' + beer.id, {
        method: "PATCH",
        headers:{
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body:JSON.stringify({
            "description": newDescription
        })
    }).then(response => response.json())
    .then(response => {
        beer.description = response.description;
    })

    })

    
}

document.addEventListener('DOMContentLoaded', function(){
    fetchBeers()
})


// When looking at the details of a beer, I can edit the current description of a beer. Clicking the 'Save' button will save any changes added to the description in the database. The edited beer should also update the DOM. For example, if I update the details of "Beer A" then click on another beer, when I go back to "Beer A", the description should be updated.

// To update a beer you'll need to make a PATCH request
// * **Route:** PATCH `http://localhost:3000/beers/:id`
// * **Body:**
// ```js
//   {description: "your new description"}
// ```
// * **Headers:**
// ```js
//   {
//     'Content-Type': 'application/json',
//     'Accept': 'application/json'
//   }
//   ```
