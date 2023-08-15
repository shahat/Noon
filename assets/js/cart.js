let currantCart = JSON.parse(localStorage.getItem("cart"))
  ? JSON.parse(localStorage.getItem("cart"))
  : [];

/* ==================== Cart and js ==================== */

const cartCounter = document.getElementById("cart-counter");
cartCounter.innerText = currantCart.length;

console.log(currantCart);

var cart = document.querySelector("#cart");
var emptyCart = document.querySelector("#emptyCart");
var cartHolder = document.querySelector(".cart-holder");

var removeBtn =
  '<button id="cartRemoveBtn" ><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16"><path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z"/><path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z"/></svg></button>';

var qun = "<button >-</button><span></span><button>+</button></>";

var productData = [...currantCart];

var totalPrice = 0;
/* var price = productData.map(product =>  ( product.price * product.count));
 */
function getData() {
  if (productData.length == 0) {
    cart.style.display = "none";
    emptyCart.style.display = "block";
  } else {
    cart.style.display = "flex";
    emptyCart.style.display = "none";

    for (let i = 0; i < productData.length; i++) {
      let card = document.createElement("div");
      card.classList.add("cart-card");
      card.classList.add("grid");
      card.id = productData[i].id;
      cartHolder.appendChild(card);
      card.addEventListener("click", (e) => {
        window.open("product.html?id=" + productData[i].id, "_blank");
      });
      for (let j = 0; j < 5; j++) {
        let cols = document.createElement("div");
        if (j == 4) {
          cols.classList.add("col-4");
          cols.id = "product-quantity";
        } else {
          cols.classList.add("col-2");
        }
        card.appendChild(cols);
      }
      var divs = card.querySelectorAll("div");
      let img = document.createElement("img");
      img.src = productData[i].images[0];
      divs[0].appendChild(img);
      let heading = document.createElement("h1");
      heading.innerText = productData[i].title;
      divs[1].appendChild(heading);
      let priceTag = document.createElement("p");
      priceTag.classList.add("price");
      priceTag.innerHTML = productData[i].price + "$";
      divs[2].appendChild(priceTag);
      divs[3].innerHTML = removeBtn;
      divs[4].innerHTML = qun;
      divs[3]
        .querySelector("button")
        .setAttribute("onclick", "removeitem(" + productData[i].id + " )");
      divs[4]
        .querySelectorAll("button")[0]
        .setAttribute("onclick", "decreaseProduct(" + productData[i].id + " )");
      divs[4]
        .querySelectorAll("button")[1]
        .setAttribute("onclick", "increaseProduct(" + productData[i].id + ")");
      divs[4].querySelector("span").innerHTML = productData[i].count;
      divs[4].querySelector("span").id = productData[i].id;
      checkingCounter();
    }
    orderPrice();
  }
}

function checkingCounter() {
  var cartCard = cartHolder.querySelectorAll(".cart-card");
  for (let i = 0; i < cartCard.length; i++) {
    if (cartCard[i].querySelector("span").innerText == 1) {
      cartCard[i].querySelectorAll("button")[1].setAttribute("disabled", true);
    } else {
      cartCard[i].querySelectorAll("button")[1].removeAttribute("disabled");
    }
  }
}
function increaseProduct(x) {
  event.stopPropagation();
  var productCount = cartHolder.querySelectorAll("span");
  for (let i = 0; i < productCount.length; i++) {
    if (productCount[i].id == x) {
      productData[i].count += 1;
      productCount[i].innerText = productData[i].count;
    }
  }
  checkingCounter();
  saveOnLocalStoarge();
  orderPrice();
}
function decreaseProduct(x) {
  event.stopPropagation();
  var productCount = cartHolder.querySelectorAll("span");
  for (let i = 0; i < productCount.length; i++) {
    if (productCount[i].id == x) {
      productData[i].count -= 1;
      productCount[i].innerText = productData[i].count;
    }
  }
  checkingCounter();
  saveOnLocalStoarge();
  orderPrice();
}

function removeitem(x) {
  event.stopPropagation();
  var cardsss = cartHolder.querySelectorAll(".cart-card");

  for (let i = 0; i < productData.length; i++) {
    if (cardsss[i].id == x) {
      cartHolder.removeChild(cardsss[i]);
      productData = productData.filter((product) => product.id != x);
    }
  }
  if (cartHolder.querySelectorAll(".cart-card").length == 0) {
    cart.style.display = "none";
    emptyCart.style.display = "block";
  } else {
    cart.style.display = "flex";
    emptyCart.style.display = "none";
  }
  cartCounter.innerText = productData.length;
  saveOnLocalStoarge();
  orderPrice();
}

function clearCart() {
  var cardsss = cartHolder.querySelectorAll(".cart-card");
  productData = [];
  for (let i = 0; i < cardsss.length; i++) {
    cartHolder.removeChild(cardsss[i]);
  }
  cart.style.display = "none";
  emptyCart.style.display = "block";
  saveOnLocalStoarge();
}

function saveOnLocalStoarge() {
  localStorage.setItem("cart", JSON.stringify(productData));
}

function orderPrice() {
  totalPrice = 0;
  for (let i = 0; i < productData.length; i++) {
    var price = parseInt(productData[i].price) * parseInt(productData[i].count);
    console.log([i] + " " + price);
    totalPrice += price;
    console.log(totalPrice);
  }

  document
    .querySelector(".order-subtotal")
    .querySelector(".price-value").innerHTML = totalPrice + "$";
  document
    .querySelector(".order-total")
    .querySelector(".price-value").innerHTML = totalPrice + 15 + "$";
}
