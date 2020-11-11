const url = "http://localhost:3000/restaurants";

class Restaurant {
  constructor(
    image,
    id,
    name,
    address,
    category,
    price_range,
    closing_time,
    opening_time
  ) {
    this.image = image;
    this.id = id;
    this.name = name;
    this.address = address;
    this.category = category;
    this.price_range = price_range;
    this.opening_time = opening_time;
    this.closing_time = closing_time;
  }

  renderRestaurant() {
    document.querySelector(".products-center").innerHTML += ` 
      <article class="product">
          <div class="img-container">
            <img
              src=${this.image}
              alt="product"
              class="product-img"
            />
            </div>
            <button id=${this.id}>Click Me!</button>
          <h3>${this.name}</h3>
        </article>
    `;
  }

  static addRestaurantModal() {
    for (const restaurant of Restaurant.instances) {
      document.getElementById(`${restaurant.id}`).onclick = () => {
        document.getElementsByClassName("modal")[0].style.display = "block";
        document.getElementById(
          "restaurant-name"
        ).innerHTML += `${restaurant.name}`;
        document.getElementById(
          "category"
        ).innerHTML += `${restaurant.category}, ${restaurant.address}, ${restaurant.price_range}, ${restaurant.opening_time}, ${restaurant.closing_time}`;
        document.querySelector(".close-btn").style.display = "block";
      };
      document.querySelector(".close-btn").onclick = () => {
        document.querySelector(".close-btn").style.display = "none";
        document.getElementsByClassName("modal")[0].style.display = "none";
        document.getElementById("restaurant-name").innerHTML = ``;
        document.getElementById("category").innerHTML = ``;
      };
    }
  }

  static fetchRestaurants() {
    fetch(url)
      .then((response) => response.json())
      .then((restaurantData) => {
        for (const restaurant of restaurantData) {
          let newRestaurant = new Restaurant(
            restaurant["image"]["url"],
            restaurant["id"],
            restaurant["name"],
            restaurant["category"],
            restaurant["address"],
            restaurant["category"],
            restaurant["price_range"],
            restaurant["opening_time"],
            restaurant["closing_time"]
          );
          newRestaurant.renderRestaurant();
          Restaurant.instances.push(newRestaurant);
        }
        Restaurant.addRestaurantModal();
        Restaurant.createRestaurant();
      });
  }

  static createRestaurant() {
    document.getElementById("banner-btn").addEventListener("click", () => {
      Restaurant.renderNewRestaurant();
      document.getElementsByClassName("create-modal")[0].style.display =
        "block";
    });
  }

  static renderNewRestaurant() {
    document.getElementsByClassName("modal-title")[0].innerHTML = `
      <form id="restaurantsubmit">
	<h1>Create New Restaurant</h1><br>
          <label for="name"><i class="fa fa-user"></i> Restaurant Name:</label>
          <input type="text" name="newname" id="newname"></input><br><br>
          
          <label for="category"><i class="fa fa-cutlery" aria-hidden="true"></i> Category:</label>
          <input type="text" name="newcategory" id="newcategory"></input><br><br>

          <label for="address"><i class="fa fa-address-card-o"></i> Address:</label>
          <input type="text" name="newaddress" id="newadress"></input><br><br>

          <label for="price_range"><i class="fa fa-money" aria-hidden="true"></i> Price Range:</label>
          <input type="number" name="newprice_range" id="newprice_range" min="1" max="3"></input><br><br>

          <label for="opening_time"><i class="fa fa-clock-o" aria-hidden="true"></i> Opening Time:</label>
          <input type="time" name="newopening_time" id="newopening_time"></input><br><br>

          <label for="closing_time"><i class="fa fa-clock-o" aria-hidden="true"></i> Closing Time:</label>
          <input type="time" name="newclosing_time" id="newclosing_time"></input><br><br>
   
          <label for="img"><i class="fa fa-file-image-o" aria-hidden="true"></i> Image:</label>
          <input id="file" type="file" name="newphoto" accept="image/png, image/jpg"/><br><br>
          
          <input class="button is-primary" type="submit" value="Submit Restaurant" id="restaurantsubmit"></input>
      </form>
    `;
    Restaurant.renderPostNewRestaurant();
  }

  static renderPostNewRestaurant() {
    document.getElementById("restaurantsubmit").onsubmit = function (event) {
      console.log("submit");
      debugger;
      let configObj = {
        method: "POST",
        headers: {
          // Accept: "application/json",
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          restaurant: {
            name: event.target["newname"].value,
            category: event.target["newcategory"].value,
            address: event.target["newaddress"].value,
            price_range: event.target["newprice_range"].value,
            opening_time: event.target["newopening_time"].value,
            closing_time: event.target["newclosing_time"].value,
            // image: event.target["newphoto"].files,
          },
        }),
      };
      debugger;
      fetch(url, configObj)
        .then((response) => response.json())
        .then((restaurantData) => {
          debugger;
          let newRestaurant = new Restaurant(
            restaurantData["name"],
            restaurantData["category"],
            restaurantData["address"],
            restaurantData["category"],
            restaurantData["price_range"],
            restaurantData["opening_time"],
            restaurantData["closing_time"]
            // restaurantData["newphoto"]
          );
          // newRestaurant.renderRestaurant();
          Restaurant.instances.push(newRestaurant);
          newRestaurant.renderRestaurant();
          // Restaurant.addRestaurantModal();
          let file = event.target["newphoto"].files[0];
          let formData = new FormData();
          formData.append("file", file);
          let configObj2 = {
            method: "POST",
            headers: {
              // Accept: "application/json",
              "Content-Type": "application/json",
            },

            body: formData,
          };
          debugger;
          fetch(
            "http://localhost:3000/rails/active_storage/direct_uploads",
            configObj2
          )
            .then((response) => response.json())
            .then((restaurantData) => {
              console.log(restaurantData);
              debugger;
            });
        });
    };
  }
}