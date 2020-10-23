const url = "http://localhost:3000/restaurants";
const restaurantNameListDiv = document.querySelector(".products-center");

document.addEventListener("DOMContentLoaded", () => {
  fetch(url)
    .then((response) => response.json())
    .then((RestaurantNamesObject) => {
      renderRestaurantNamesList(RestaurantNamesObject);
    });
});

function renderRestaurantNamesList(restaurantNamesObject) {
  restaurantNamesObject.forEach((restaurantNameObject) => {
    renderRestaurantNameOnList(restaurantNameObject);
  });
}

function renderRestaurantNameOnList(restaurantNameObject) {
  const restaurantNameDiv = document.createElement("div");

  restaurantNameDiv.innerHTML = `<img src="images/restaurant1.jpg" alt="product" class="product-img" />
  <h3>${restaurantNameObject.name}<h3>`;

  restaurantNameListDiv.prepend(restaurantNameDiv);
}
