document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM content has loaded");
  let url = "http://localhost:3000/restaurants";
  fetch(url)
    .then((resp) => resp.json())
    .then((data) =>
      data.forEach((restaurant) => {
        displayRow(restaurant);
      })
    );
});

function displayRow(row) {
  const table = document.querySelector("#restaurant-table");
  table.innerHTML += `
  <tr>
    <td>${row.name}</td><br>
    <td>${row.address}</td>
    <td>${row.closing_time}</td>
    <td>${row.opening_time}</td>
    <td>${row.price_range}</td>
    <td>${row.category}</td>
  </tr>
  `;
}

function myFunction() {
  // Declare variables
  var input, filter, table, tr, td, i, txtValue;
  input = document.getElementById("myInput");
  filter = input.value.toUpperCase();
  table = document.getElementById("myTable");
  tr = table.getElementsByTagName("tr");

  // Loop through all table rows, and hide those who don't match the search query
  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[0];
    if (td) {
      txtValue = td.textContent || td.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }
  }
}

document.getElementById(`button`).addEventListener("click", function () {
  document.querySelector(`.bg-modal`).style.display = "flex";
});

document.querySelector(`.close`).addEventListener("click", function () {
  document.querySelector(`.bg-modal`).style.display = "none";
});