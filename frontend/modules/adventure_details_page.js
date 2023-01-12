import config from "../conf/index.js";

//Implementation to extract adventure ID from query params
function getAdventureIdFromURL(search) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Get the Adventure Id from the URL
  let searchData = new URLSearchParams(search).get("adventure");
  console.log(searchData);
  // Place holder for functionality to work in the Stubs
  return searchData;
}
//Implementation of fetch call with a paramterized input based on adventure ID
async function fetchAdventureDetails(adventureId) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Fetch the details of the adventure by making an API call
  try {
    let result = await fetch(
      config.backendEndpoint + `/adventures/detail?adventure=${adventureId}`
    );
    let data = await result.json();
    return data;
  } catch (err) {
    return null;
  }
  // Place holder for functionality to work in the Stubs
}

//Implementation of DOM manipulation to add adventure details to DOM
function addAdventureDetailsToDOM(adventure) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the details of the adventure to the HTML DOM
  console.log(adventure);
  let heading = document.getElementById("adventure-name");
  heading.innerHTML = adventure.name;

  let subHeading = document.getElementById("adventure-subtitle");
  subHeading.innerHTML = adventure.subtitle;

  let advImag = document.getElementById("photo-gallery");
  adventure.images.forEach((ele) => {
    console.log(ele);
    var img = document.createElement("img");
    img.className = "activity-card-image";
    img.src = `${ele}`;
    advImag.appendChild(img);
  });

  const content = document.getElementById("adventure-content");
  content.innerHTML = adventure.content;

  const costPerHead = document.getElementById("reservation-person-cost");
  costPerHead.innerHTML = adventure.costPerHead;
}

//Implementation of bootstrap gallery component
function addBootstrapPhotoGallery(images) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the bootstrap carousel to show the Adventure images
  console.log(images);

  document.getElementById("photo-gallery").innerHTML = `
  <div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="carousel">
  <div class="carousel-indicators" id="carousel-indicators">
  </div>
  <div class="carousel-inner" id="carousel-inner"></div>
  <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
</div>
  `;

  images.forEach((image, index) => {
    const carouselItemEle = document.createElement("div");
    const activeClass = index === 0 ? " active" : "";
    carouselItemEle.className = `carousel-item${activeClass}`;
    carouselItemEle.innerHTML = `
    <img src=${image}
          alt=""
          class="activity-card-image pb-3 pb-md-0"
    />`;

    document.getElementById("carousel-inner").appendChild(carouselItemEle);

    const indicatorEle = `
  <button type="button" data-bs-target="#carouselExampleIndicators"
   data-bs-slide-to="${index}" 
   aria-label="${index + 1}"
  ${
    index === 0
      ? `class="active" aria-current="true" aria-label="Slide 1" `
      : ""
  }>
  </button>
  `;
    document.getElementById("carousel-indicators").innerHTML += indicatorEle;
  });
}

//Implementation of conditional rendering of DOM based on availability
function conditionalRenderingOfReservationPanel(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If the adventure is already reserved, display the sold-out message.

  if (adventure["available"] === true) {
    document.getElementById("reservation-panel-sold-out").style.display =
      "none";
    document.getElementById("reservation-panel-available").style.display =
      "block";
      const costPerHead = document.getElementById("reservation-person-cost");
      costPerHead.innerHTML = adventure.costPerHead;
  } else {
    document.getElementById("reservation-panel-sold-out").style.display =
      "block";
    document.getElementById("reservation-panel-available").style.display =
      "none";
  }

}

//Implementation of reservation cost calculation based on persons
function calculateReservationCostAndUpdateDOM(adventure, persons) {
  // TODO: MODULE_RESERVATIONS
  // 1. Calculate the cost based on number of persons and update the reservation-cost field
  console.log(persons);

  document.getElementById("reservation-cost").innerHTML =
    adventure.costPerHead * persons;
}

//Implementation of reservation form submission
function captureFormSubmit(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. Capture the query details and make a POST API call using fetch() to make the reservation
  // 2. If the reservation is successful, show an alert with "Success!" and refresh the page. If the reservation fails, just show an alert with "Failed!".

  let dataForm = document.getElementById("myForm");

  dataForm.addEventListener('submit' , async(e) =>{
    e.preventDefault();
    let url = config.backendEndpoint + "/reservations/new";
    let formData = dataForm.elements;
    console.log(formData);

    try{
      const postData = await fetch(url ,{
        method :"POST",
        body: JSON.stringify({
          "name" : formData.name.value,
          "date" : formData.date.value,
          "person": formData.person.value,
          "adventure":adventure.id,
        }),
        headers:{
          "Content-Type" :"application/json",
        },
      });

      const resData = await postData.json();
      console.log(postData);
      alert("sucess!");
      console.log(resData);

    }catch(err){
      alert("failed!")
    }
  })

  // let dataForm = document.getElementById("myForm")
  //   .addEventListener("submit", async (e) => {
  //     e.preventDefault();
  //     let formData = dataForm.elements;
  //     console.log(formData);
  //     let submitFormData = {
  //       "name" : formData.name.value,
  //       "date" : formData.date.value,
  //       "person": formData.person.value,
  //       "adventure":adventure.id,
  //     };
  //     console.log(formData);

  //     let response = await fetch(config.backendEndpoint + "/reservations/new", {
  //       method: "POST",
  //       headers: {
  //         "content-type": "application/json",
  //       },
  //       body: JSON.stringify(submitFormData),
  //     });

  //     let result = await response.json();

  //     if (result.success) {
  //       alert("Success!");
  //     } else {
  //       alert("Failed!");
  //     }
  //   });
}

//Implementation of success banner after reservation
function showBannerIfAlreadyReserved(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If user has already reserved this adventure, show the reserved-banner, else don't
  if (adventure.reserved) {
    document.getElementById("reserved-banner").style.display = "block";
  } else {
    document.getElementById("reserved-banner").style.display = "none";
  }
}

export {
  getAdventureIdFromURL,
  fetchAdventureDetails,
  addAdventureDetailsToDOM,
  addBootstrapPhotoGallery,
  conditionalRenderingOfReservationPanel,
  captureFormSubmit,
  calculateReservationCostAndUpdateDOM,
  showBannerIfAlreadyReserved,
};
