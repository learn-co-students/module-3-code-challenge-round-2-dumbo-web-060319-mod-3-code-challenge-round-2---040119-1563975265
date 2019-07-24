// fetch
fetch("http://localhost:3000/beers")
.then(resp => resp.json())
.then(function(data){
    data.forEach(beer => {
        slapBeerName(beer)
        
    });
})


function fetchPatchReq(event){
    let text=event.target.parentNode.querySelector("textarea").value
    let id=event.target.dataset.id
    fetch("http://localhost:3000/beers/"+id,{
        method:"PATCH",
        headers:{
        'Content-Type': 'application/json',
        'Accept':'application/json'
    },
     body: JSON.stringify({
        description :text
    })
})
    .then(resp=>resp.json())
    .then(function(data){
        slapEditedDescription(data)
    })

    
}


function fetchBeerInfo(id){
    fetch("http://localhost:3000/beers/"+id)
    .then(resp => resp.json())
    .then(function(data){
        slapBeerinfo(data)
    })
}

// fetch end



// slap
function slapBeerName(beer){
    let ul=document.querySelector(".list-group")
    let li=document.createElement("li")
    li.className="list-group-item"
    li.innerText=`${beer.name}`
    ul.append(li)
    
    li.addEventListener("click",function(event){
        fetchBeerInfo(beer.id)
        // slapBeerinfo(beer)
    })
}



function slapBeerinfo(beer){
    let div=document.querySelector("#beer-detail")
    div.dataset.divId=beer.id
    div.innerHTML=`
    <h1>${beer.name}</h1>
    <img src="${beer.image_url}">
    <h3>${beer.tagline}</h3>
    <textarea>${beer.description}</textarea>
    <button id="edit-beer" class="btn btn-info">
    Save
    </button>
    `
    let button=div.querySelector("button")
    button.dataset.id=beer.id

    button.addEventListener("click",function(event){

        fetchPatchReq(event)
    })
}


function slapEditedDescription(beer){
let div=document.querySelector(`[data-div-id="${beer.id}"]`)
div.querySelector("textarea").value =beer.description

}

// slap end