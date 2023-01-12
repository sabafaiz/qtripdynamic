import config from "../conf/index.js";

async function init() {
  //Fetches list of all cities along with their images and description
  console.log("cities");
  let cities = await fetchCities();

  //Updates the DOM with the cities
  cities.forEach((key) => {
    addCityToDOM(key.id, key.city, key.description, key.image);
  });

  return cities;

}



//Implementation of fetch call
async function fetchCities() {
  // TODO: MODULE_CITIES
  // 1. Fetch cities using the Backend API and return the data
  try {
    let res = await fetch(config.backendEndpoint + "/cities");
    let data = await res.json();
    return data;
  }
  catch (err) {
    return null;
  }
}



//Implementation of DOM manipulation to add cities
function addCityToDOM(id, city, description, image) {
  // TODO: MODULE_CITIES
  // 1. Populate the City details and insert those details into the DOM
  let ele = document.createElement("div");

  ele.className = "col-6 col-lg-3 mb-4";

  ele.innerHTML = `
  <a href="pages/adventures/?city=${id}" id="${id}"> 
  <div class="tile">
  <img src="${image}" class="img-responsive"/>  
    <div class="tile-text text-center mb-4">
      <h5>${city}</h5>
      <p>${description}</p> 
    </div>
    
  </div> 
</a>`;
  document.getElementById("data").append(ele);
}


export { init, fetchCities, addCityToDOM };


