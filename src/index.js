// Constants Declaration
const GET_url = `http://localhost:3000/beers`
const list_UL = document.querySelector('#list-group')
const beer_Detail_Div = document.querySelector('#beer-detail')


// As a user, when the page loads, I should see a list of beer names retrieved from an API on the left hand side of the screen.
fetch(GET_url)
  .then(resp => resp.json())
  .then(beers => {
    console.log(beers)
    beers.forEach(beer => {
      list_UL.innerHTML +=
        `
        <li class="list-group-item" data-id = ${beer.id}>${beer.name}</li>
      `
    });
  })
  .catch(err => console.log(err.message))




// -- As a user, when I click a beer name, the application should reveal more information about that particular beer.

// -- As a user, when looking at the details of a beer, I can edit the current description of a beer. Clicking the 'Save' button will save any changes added to the description in the database


list_UL.addEventListener('click', event => {
  if (event.target.tagName == 'LI') {
    console.log('beer clicked')
    const id = event.target.dataset.id;
    console.log(id)

    fetch(`${GET_url}/${id}`)
      .then(resp => resp.json())
      .then(beer => {
        console.log(beer)

        beer_Detail_Div.innerHTML = ""
        beer_Detail_Div.innerHTML +=
          `
            <h1> ${ beer.name}</h1 >
            <img src="${beer.image_url}">
            <h3>${beer.tagline}</h3>
            <textarea>${beer.description}</textarea>
            <form>
              <input type="text" placeholder="Enter New Beer Description">
              <button id="edit-beer" class="btn btn-info">
                Save
              </button>
            </form>
        `

        const edit_Beer_Button = beer_Detail_Div.querySelector('button#edit-beer')
        edit_Beer_Button.addEventListener('click', event => {
          event.preventDefault();
          console.log('Save Clicked!', event.target)
          console.log(beer.description)
          const beer_Input = event.target.previousElementSibling
          const beer_Description_Text = event.target.parentElement.previousElementSibling
          console.log(beer_Input)
          console.log(beer_Description_Text)
          console.log(beer_Input.value)

          fetch(`${GET_url}/${id}`, {
            method: "PATCH",
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json'
            },
            body: JSON.stringify({
              description: beer_Input.value
            })
          })
            .then(resp => resp.json())
            .then(data => {
              console.log(data)
              beer_Detail_Div.querySelector('textarea').innerHTML = beer_Input.value;
              beer_Detail_Div.querySelector('form').reset();
              console.log('Hoopidie Doopidie Doo');
            })
            .catch(err => console.error(err.message))



        })

      })

      .catch(err => console.error(err.message))


  }
})