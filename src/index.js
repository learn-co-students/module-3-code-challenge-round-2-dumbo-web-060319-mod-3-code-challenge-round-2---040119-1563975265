const url = "http://localhost:3000/beers";
const urlId = "http://localhost:3000/beers/:id"
const ul = document.querySelector(".list-group");
const div = document.querySelector("#beer-detail")



//-----------------  Dom beer Show Page-----------
fetch(url)
.then(res => res.json())
.then(showbeers)

function showbeers(beers){
  beers.forEach(beer => {
    beerOnDom(beer);
  })
}

function beerOnDom(beer){
  let li = document.createElement("li");
  li.className = "list-group-item";
  li.innerHTML = `${beer.name}`;
  ul.append(li);

  li.addEventListener("click" , function()
  {
    fetch(`http://localhost:3000/beers/${beer.id}`)
    .then(res => res.json())
    .then(showdetails)
  })
}

function showdetails(beer){
  let divli = document.createElement("li")
  console.log(beer);
  div.innerHTML = `
      <h1>${beer.name}</h1>
      <img src="${beer.image_url}">
      <h3>${beer.tagline}</h3>
      <textarea>  data-h=${beer.description}</textarea>
      <button  id="edit" class="btn btn-info">
        Save
      </button>
      `

    div.addEventListener("click" , function(event){

        // newdata = event.target.parentElement
        // debugger;
        newdata = "dsadasd "
        console.log(newdata)
          fetch(`http://localhost:3000/beers/${beer.id}`,
            {
          method: "PATCH",
          headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"},
          body: JSON.stringify({
            description: newdata
              })
        }).then(resp => resp.json())
        .then(showdetails)
})
}
