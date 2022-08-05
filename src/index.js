let addToy = false;
const toyCollection = document.getElementById('toy-collection')
const toyURL = 'http://localhost:3000/toys';

function loadToyCards() {
  fetch(toyURL, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
  .then((response) => response.json())
  .then((json) => {
    console.log('Success:', json[0].name);
    // make a <div> card for each toy then
    // add to the toy collevtion div

    for(let toys in json) {
      //debugging
      const parsedData = JSON.parse(JSON.stringify(json[toys]));
      console.log("parsed data: " + JSON.stringify(parsedData))

      // create divs for toy cards and set HTML
      const toyCard = document.createElement('div');
      toyCard.innerHTML = `<h2>${json[toys].name}</h2>
                           <img src="${json[toys].image}" class="toy-avatar"/>
                           <p>${json[toys].likes} likes</p>
                           <button id="[${json[toys].id}]" class="like-btn">Like</button>`;
      toyCard.setAttribute('class', 'card')
      toyCollection.appendChild(toyCard)
    }
  })
}
async function postFormDataAsJson({ toyURL, formData }) {
  const plainFormData = Object.fromEntries(formData.entries());
  const newFormData = JSON.stringify(plainFormData)
  const fetchOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: newFormData
  };

  const response = await fetch(toyURL, fetchOptions);

  // if (!response.ok) {
  //   const errorMessage = await response.text();
  //   throw new Error(errorMessage);
  // }

  return response.json();
}

async function handleFormSubmit(event) {
  event.preventDefault();
  const form = event.currentTarget;

  try {
    const formData = new FormData(form);
    const responseData = await postFormDataAsJson({ toyURL, formData });
    console.log(responseData)

    console.log({ responseData });
  } catch (error) {
    console.error(error);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const submitBtn = document.querySelector("input.submit")
  const toyFormContainer = document.querySelector(".container");
  const nameForm = document.getElementsByName("name")
  const imageForm = document.getElementsByName('image')
  const toyURL = 'http://localhost:3000/toys';
  const form = document.querySelector("form");


  loadToyCards();

  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
  form.addEventListener("submit", handleFormSubmit);

  // submitBtn.addEventListener('submit', async (e) => {
  //   e.preventDefault();
  //   const form = e.currentTarget;
  //   const url = form.action
  //   try {
  //     const formResponse = await fetch(toyURL, {
  //       method: 'POST',
  //       headers: {
  //         "Content-Type": "application/json",
  //         Accept: "application/json"
  //       },
  //       body: JSON.stringify({
  //         "id" : '',
  //         "name": `${nameForm.value}`,
  //         "image": `${imageForm.value}`,
  //         "likes": 0
  //       })
  //     })

  //   }
  //   catch {

  //   }
    
});

