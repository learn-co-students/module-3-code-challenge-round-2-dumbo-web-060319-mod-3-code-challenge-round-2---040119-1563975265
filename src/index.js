////////----Variables---///
const ul = document.getElementById('list-group')
const div = document.getElementById('beer-detail')



//----Display Beers---// 
const displayBeers = (beers) => {
    // debugger
    div.innerHTML = '' 
    for(beer of beers){
        console.log(beers);
        
        const beerName = beer.name 
        const beerTag = beer.tagline 
        const beerDescription = beer.description
        const beerImg = beer.image_url
        const beerId = beer.id 
        console.log(beer);
        
        div.innerHTML += ` 
        <ul data-single= class="list-group">
        <li class="list-group-item">${beerName}1</li>
        <li class="list-group-item">${beerName}2</li>
        <h1>${beerName}</h1>
    <img src="${beerImg}">
    <h3>${beerTag}</h3>
    <textarea class='input'> ${beerDescription} </textarea>
    <button id="edit-beer" data-id=${beerId}class="btn-info"> 
    Save
    </button>
        </ul>`
        displaySingleBeer(beer)
    }
}

    ////---EVENT LISTENER---////
    // div.addEventListener('click', function(event){
    //     if(event.target.className = 'list-group-item') {

    //     }
        // console.log(event);
        
    // })


    const displaySingleBeer = (beer) => {
        // fetch(`http://localhost:3000/beers/:id`) 
    }

        ///---EVENT listener---////
        // ul.addEventListener('click', )


        ////---PATCH REQUEST---/////////
        const updateBeers = () => { 
            div.addEventListener('click', function(event){
                console.log('updateBeers func', event);
                debugger
            if(event.target.className === 'btn-info' && event.target.classList === 'input') {
                let id = event.target.parentElement.dataset.id  
                
                console.log(id);            
                let input = event.target.previousSibling           
                console.log(input);
                fetch(`http://localhost:3000/beers/:${id}`, {
                    method: "PATCH", 
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                        }, 
                        body: JSON.stringify({
                            id, 
                            input
                        })
                })
                .then(resp => resp.json())
            }
        })
    }              
            updateBeers()




///--FETCH BEERS---//// 
const getBeers = (() => {
    fetch('http://localhost:3000/beers')
    .then(resp => resp.json())
    .then(displayBeers)
})()

