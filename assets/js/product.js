// product details content
let currantCart = JSON.parse(localStorage.getItem("cart"))
  ? JSON.parse(localStorage.getItem("cart"))
  : [];
let product;

// let cart = localStorage.getItem("cart")
//   ? JSON.parse(localStorage.getItem("cart"))
//   : [];
const cartCounter = document.getElementById("cart-counter");
cartCounter.innerText = currantCart.length;

let ratingValue = document.getElementById("prog");
const myKyesValues = window.location.search;
const urlparams = new URLSearchParams(myKyesValues);
const param1 = urlparams.get("id");
fetch(`https://products-rica.onrender.com/products?id=` + param1)
  .then((response) => response.json())
  .then((data) => {
    product = data[0];
    for (var i = 0; i < data.length; i++) {
      document.getElementById("product-titel").innerHTML = data[i].title;
      document.getElementById("product-description").innerHTML =
        data[i].description +
        "<br>brand: " +
        data[i].brand +
        "<br>category: " +
        data[i].category;
      document.getElementById("prog").value = data[i].rating;
      document.getElementById("price-value").innerHTML = data[i].price + "$";
      var descout = parseInt(
        data[i].price - (data[i].discountPercentage / 100) * data[i].price
      );
      document.getElementById("descount").innerHTML = descout + " " + "$";
      var img = document.getElementById("big-img");
      img.src = data[i].thumbnail;
      for (var x = 0; x < 4; x++) {
        var myImg = document.createElement("img");
        myImg.setAttribute("onclick", "changImg(this)");
        var productImg = document.getElementById("smal-images");
        productImg.appendChild(myImg);
        myImg.src = data[i].images[x];
      }
    }
    document.getElementById("set-data").addEventListener("click", function () {
      if (
        currantCart.filter((cartProduct) => cartProduct.id == product.id)
          .length != 1
      ) {
        currantCart.push(product);
      }
      localStorage.setItem("cart", JSON.stringify(currantCart));
      // console.log(JSON.parse(localStorage.getItem("cart")));
      document.getElementById("cart-counter").innerText = currantCart.length;
    });
  });

// chang img function
function changImg(img) {
  document.getElementById("big-img").src = img.src;
}

//search
var searchInputValue = document.getElementById("search_input").value;
var searchIcon = document.getElementById("search_icon");
searchIcon.addEventListener("click", function () {
  window.location.href = "../../index.html?search=" + searchInputValue;
});
