/* ==================== Global variable ==================== */

const categoriesItems = [
  {
    name: "smartphones",
    imageURL: "Phones.jpg",
  },
  {
    name: "laptops",
    imageURL: "laptop.jpg",
  },
  {
    name: "fragrances",
    imageURL: "perfumes.png",
  },
  {
    name: "skincare",
    imageURL: "skinCare.png",
  },
  {
    name: "groceries",
    imageURL: "Grocery.jpg",
  },
  {
    name: "home-decoration",
    imageURL: "home-decoration.jpg",
  },
];
let categories = document.getElementById("categories");
let clickedCategory;
let products = [];
let cart = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart"))
  : [];
let wishList = localStorage.getItem("wishList")
  ? JSON.parse(localStorage.getItem("wishList"))
  : [];
const productsContainer = document.getElementById("productsContainer");
const cartCounter = document.getElementById("cart-counter");
cartCounter.innerText = cart.length;
const wishListCounter = document.getElementById("wishlist-counter");
wishListCounter.innerText = wishList.length;

/* ==================== make category Element  ==================== */

for (let i = 0; i < categoriesItems.length; i++) {
  let createdElement = document.createElement("div");
  let elmentName = document.createElement("span");
  createdElement.setAttribute("class", "category");
  createdElement.setAttribute("id", categoriesItems[i].name);
  createdElement.style.backgroundImage = `url("./assets/images/${categoriesItems[i].imageURL}")`;
  elmentName.setAttribute("class", "categoryName");
  elmentName.innerText = categoriesItems[i].name;
  createdElement.appendChild(elmentName);
  createdElement.addEventListener("click", getCategory);
  categories.appendChild(createdElement);
}

/* ==================== Get categories ==================== */

function getCategory() {
  clickedCategory = this.id;
  fetch("http://localhost:3000/products?category=" + clickedCategory)
    .then((response) => response.json())
    .then((data) => {
      products = [...data];
      createProducts(); // Call createProducts after fetching the data
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
}

/* ==================== products  ==================== */

function createProducts() {
  productsContainer.innerHTML = ""; // Clear previous products before adding new ones
  console.log(products.length);
  if (products && products.length > 0) {
    for (let k = 0; k < products.length; k++) {
      let product = document.createElement("div");
      product.setAttribute("class", "product");
      let customizedProduct = `	<div class="product-card" >
      <div class="product-tumb">
        <img src="${products[k].images[0]}" alt="">
      </div>
      <div class="product-details">   
        <h4><a href="./product.html?id=${products[k].id}">${
        products[k].title
      }</a></h4>
        <p>${products[k].description.slice(1, 30)}</p>
        <div class="product-bottom-details">
          <div class="product-price">${products[k].price} $</div>
          <div class="product-links">
            <span href="#"><i id="${
              products[k].id
            }" class="fa fa-heart" onClick="addToWishList(this)"></i></span>
            <span ><i id="${
              products[k].id
            }" class="fa fa-shopping-cart" onclick="addToCart(this)"></i></span>
          </div>
        </div>
      </div>
    </div>`;

      product.innerHTML = customizedProduct;
      productsContainer.appendChild(product);
    }
  } else {
    // Handle the case when no products are available for the selected category
    productsContainer.innerHTML = "No products available for this category.";
  }
}

/* ==================== cart function ==================== */

let pushedproduct;

function addToCart(e) {
  console.log("hello");
  pushedproduct = products.filter((product) => product.id == e.id)[0];
  if (cart.filter((product) => product.id == pushedproduct.id).length == 0)
    cart.push(pushedproduct);
  localStorage.setItem("cart", JSON.stringify(cart));
  cartCounter.innerText = cart.length;
}

function addToWishList(e) {
  console.log("wishlist");
  pushedproduct = products.filter((product) => product.id == e.id)[0];
  if (wishList.filter((product) => product.id == pushedproduct.id).length == 0)
    wishList.push(pushedproduct);
  localStorage.setItem("wishList", JSON.stringify(wishList));
  wishListCounter.innerText = wishList.length;
}

/* ==================== search filteration function ==================== */

function getproduct() {
  console.log("hellow world");
  const inputValue = document.getElementById("search").value;
  fetch(`http://localhost:3000/products`)
    .then((response) => response.json())
    .then((data) => {
      const productsData = [...data];
      products = productsData.filter((product) => {
        return product.title.toLowerCase().includes(inputValue.toLowerCase());
      });
      createProducts();
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
}

/* ==================== display all products ==================== */

function displayProducts() {
  fetch("http://localhost:3000/products")
    .then((response) => response.json())
    .then((data) => {
      products = [...data];
      createProducts();
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
  otherSlideFunc();
}
/* ==================== Hero section slider ==================== */

var ourimages = [];
ourimages[0] = "./assets/images/sliderImages/1.png";
ourimages[1] = "./assets/images/sliderImages/2.gif";
ourimages[2] = "./assets/images/sliderImages/3.jpg";
ourimages[3] = "./assets/images/sliderImages/4.png";
ourimages[4] = "./assets/images/sliderImages/5.png";
ourimages[5] = "./assets/images/sliderImages/6.png";
ourimages[6] = "./assets/images/sliderImages/7.png";
ourimages[7] = "./assets/images/sliderImages/8.png";
ourimages[8] = "./assets/images/sliderImages/9.png";
ourimages[9] = "./assets/images/sliderImages/10.png";
ourimages[10] = "./assets/images/sliderImages/11.png";
ourimages[11] = "./assets/images/sliderImages/12.png";
ourimages[12] = "./assets/images/sliderImages/13.png";
var counter = -1;
var y;
function autoPlay() {
  y = setInterval(function () {
    counter++;
    if (counter < ourimages.length) {
      document.getElementById("slid-img").src = ourimages[counter];
    } else {
      counter = -1;
    }
  }, 1000);
}
autoPlay();

document.getElementById("next2").addEventListener("click", function () {
  counter++;
  if (counter < ourimages.length) {
    document.getElementById("slid-img").src = ourimages[counter];
  } else {
    counter = -1;
  }
  clearInterval(y);
});
document.getElementById("prev2").addEventListener("click", function () {
  counter--;
  if (counter > -1) {
    document.getElementById("slid-img").src = ourimages[counter];
  } else {
    counter = 12;
  }
  clearInterval(y);
});

document.getElementById("next").addEventListener("mouseover", function () {
  document.getElementById("next2").style.display = "block";
  document.getElementById("next").style.display = "none";
});
document.getElementById("slid-img").addEventListener("mouseover", function () {
  document.getElementById("next").style.display = "block";
  document.getElementById("next2").style.display = "none";
});
document.getElementById("prev").addEventListener("mouseover", function () {
  document.getElementById("prev2").style.display = "block";
  document.getElementById("prev").style.display = "none";
});
document.getElementById("slid-img").addEventListener("mouseover", function () {
  document.getElementById("prev").style.display = "block";
  document.getElementById("prev2").style.display = "none";
});

/* ======================================================================== */

var othersProduct = document.querySelector("#othersProduct");
var othersProductSlider = othersProduct.querySelector("#product-slider");
/* var othersProductcards = othersProductSlider.querySelectorAll(".card");
 */
var bodybtn =
  '<button onclick="addToCart(this)">Add to cart <span><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-cart-plus" viewBox="0 0 16 16"><path d="M9 5.5a.5.5 0 0 0-1 0V7H6.5a.5.5 0 0 0 0 1H8v1.5a.5.5 0 0 0 1 0V8h1.5a.5.5 0 0 0 0-1H9V5.5z"/><path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1H.5zm3.915 10L3.102 4h10.796l-1.313 7h-8.17zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/></svg></span></button>';
var productsData = [];
function otherSlideFunc() {
  var reqObejct = new XMLHttpRequest();
  reqObejct.open("GET", "http://localhost:3000/products", true);
  reqObejct.send();
  reqObejct.onreadystatechange = function () {
    if (reqObejct.readyState == 4 && reqObejct.status == 200) {
      var ResponseData = reqObejct.response;
      var parsedData = JSON.parse(ResponseData);
      productsData = parsedData;
      for (let i = 0; i < productsData.length; i++) {
        let cards = document.createElement("div");
        cards.classList.add("card");
        let cardHeader = document.createElement("div");
        cardHeader.classList.add("card-header");
        let cardBody = document.createElement("div");
        cardBody.classList.add("card-body");
        let img = document.createElement("img");
        img.src = productsData[i].images[0];
        othersProductSlider.appendChild(cards);
        cards.appendChild(cardHeader);
        cardHeader.appendChild(img);
        cards.appendChild(cardBody);
        cardBody.innerHTML = bodybtn;
        cardBody.querySelector("button").id = productsData[i].id;
      }
    }
  };
}

function leftscroll() {
  othersProductSlider.scrollLeft -= 630;
}
function rightscroll() {
  othersProductSlider.scrollLeft += 630;
}
