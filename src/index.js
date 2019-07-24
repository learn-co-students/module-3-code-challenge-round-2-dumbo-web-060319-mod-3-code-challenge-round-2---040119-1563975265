document.addEventListener("DOMContentLoaded", function(e) {

    fetch("http://localhost:3000/beers")
    .then(response => response.json())
    .then(renderBeers)

    function renderBeers(beers) {
        console.log(beers)
        const ul = document.querySelector("#list-group")
        beers.forEach(beer => {
            li = document.createElement("li")
            li.className = "list-group-item"
            li.dataset.beerId = beer.id 
            li.innerText = beer.name 
            ul.append(li)
        })

        
        ul.addEventListener("click", function(e) {
            if (e.target.className === "list-group-item") {
                // console.log(e.target)
                showBeer(e.target)
            }
        })

        function showBeer(target) {
            let beerId = parseInt(target.dataset.beerId)
            
            fetch(`http://localhost:3000/beers/${beerId}`)
            .then(response => response.json())
            .then(renderSingleBeer)
        }

        function renderSingleBeer(beer) {
            // console.log(beer)
            const div = document.querySelector("#beer-detail")

            div.innerHTML = `
            <h1>${beer.name}</h1>
            <img src=${beer.image_url}>
            <h3>${beer.tagline}</h3>
            <h4> Brewer's Tip: ${beer.brewers_tips} </h4>
            <h4>Food Pairing: ${beer.food_pairing} </h4>
            Description:
            <span> <textarea> ${beer.description} </textarea>
            <button data-beer-id=${beer.id} id="edit-beer" class="btn btn-info">
              Save
            </button> </span>
                                `
      
            const button = document.querySelector("#edit-beer")
            
            button.addEventListener("click", function(e) {
                addComment(e.target, beer.id)
            })

            function addComment(target, id) {
               
                span = target.parentElement
                let comment = span.querySelector("textarea").value
                // console.log(comment)
                // console.log(id)

                fetch(`http://localhost:3000/beers/${id}`, {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "aplication/json"
                    },
                    body: JSON.stringify({
                        description: comment
                    })
                }).then(response => response.json())
                  .then(updateDescription)

                  function updateDescription(data) {
                      
                      let textBox = span.querySelector("textarea")
                        textBox.innerText = data.description 
                        window.alert("Your description has been saved!");
                  }
            
            }
        }


    
    }



})