

document.addEventListener("DOMContentLoaded", function()
{
    beerRow = document.querySelector("#list-group");
    beerDisplay = document.querySelector("#beer-detail");
    renderBeerListOnSide();
})

function renderBeerListOnSide()
{
    fetch(`http://localhost:3000/beers`)
    .then(function(resp)
    {
        return resp.json();
    })
    .then(function(data)
    {
        displayBeerInRows(data);
    })
}

function displayBeerInRows(info)
{
    for (let i=0; i < info.length; i++)
    {
        //LOOP through array of beers, then add to sidebar
        makeActualBeerObjectOnSide(info[i]);
    }
}
function makeActualBeerObjectOnSide(info)
{
    let newLi = document.createElement("li");
    newLi.innerText = info.name;
    newLi.classList.add("list-group-item");
    newLi.dataset.beer_id = info.id;
    //ADD Event Listener Here!
    addEventListenerToNewLi(newLi);
    beerRow.append(newLi);
}
function addEventListenerToNewLi(e)
{
    e.addEventListener("click", function()
    {
        fetch(`http://localhost:3000/beers/${e.dataset.beer_id}`)
        .then(function(resp)
        {
            return resp.json();
        })
        .then(function(data)
        {
            showPageForSingleBeer(data);
        })
    })
}
function showPageForSingleBeer(info)
{
    //CLEAR beerDisplay and set to empty
    beerDisplay.innerHTML = " ";
    //CREATE NEW ELEMENTS FOR SINGLE BEER 
    
    let myH1 = document.createElement("h1");
    myH1.innerText = info.name;

    let myImg = document.createElement("img");
    myImg.src = info.image_url;

    let myTagline = document.createElement("h3");
    myTagline.innerText = info.tagline;

    let myTextArea = document.createElement("textarea");
    myTextArea.innerText = info.description;
    //Add class to pull value later for edit 
    myTextArea.classList.add("identifyEdit");

    let myButton = document.createElement("button");
    myButton.id = "edit-beer";
    myButton.classList.add("btn");
    myButton.classList.add("btn-info");
    myButton.innerText = "Save";
    //add Dataset to identify associated beer
    myButton.dataset.beer_info = info.id;
    addEventListenerToEdit(myButton);

    //SINGULARLY APPEND TO middle div
    beerDisplay.append(myH1);
    beerDisplay.append(myImg);
    beerDisplay.append(myTagline);
    beerDisplay.append(myTextArea);
    beerDisplay.append(myButton);

}

function addEventListenerToEdit(btn)
{
    btn.addEventListener("click", function(e)
    {
        
        let textareaValue = document.querySelector(".identifyEdit").value;
        fetch(`http://localhost:3000/beers/${btn.dataset.beer_info}`,
        {
            method: "PATCH",
            headers: 
            {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify
            ({
                "description": textareaValue
            })
        })
        .then(function(resp)
        {
            return resp.json();
        })
        .then(function(data)
        {
            showPageForSingleBeer(data);

            let tellUser = document.createElement("p");
            tellUser.innerText = "Hey there, beer Connoisseur! You have just edited this listing! Congrats (This is necessary because the HTML loaded is the SAME as the one that already exists, since the textarea is live-typed and displays changes in real-time.";
            tellUser.style.color = "red";
            tellUser.style.fontSize = "16px";
            beerDisplay.append(tellUser);
        })
    })
}