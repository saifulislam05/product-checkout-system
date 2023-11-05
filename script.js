const Products = [
  {
    id: 0,
    name: "Shoe",
    price: 1200,
    totalPrice: 0,
    quantity: 0,
    image: "https://m.media-amazon.com/images/I/61zyOKq6WhL._AC_UL320_.jpg",
  },
  {
    id: 1,
    name: "Shirt",
    price: 1500,
    totalPrice: 0,
    quantity: 0,
    image: "https://m.media-amazon.com/images/I/51Js-8owaUL._AC_UL320_.jpg",
  },
  {
    id: 2,
    name: "Jeans",
    price: 5000,
    totalPrice: 0,
    quantity: 0,
    image: "https://m.media-amazon.com/images/I/81MP30nDiYL._AC_UL320_.jpg",
  },
  {
    id: 3,
    name: "T-shirt",
    price: 300,
    totalPrice: 0,
    quantity: 0,
    image: "https://m.media-amazon.com/images/I/81wFLUDzAbL._AC_UL320_.jpg",
  },
  {
    id: 4,
    name: "Kurta",
    price: 2000,
    totalPrice: 0,
    quantity: 0,
    image: "https://m.media-amazon.com/images/I/51vA9e2vmcL._AC_UL320_.jpg",
  },
  {
    id: 5,
    name: "Watch",
    price: 10000,
    totalPrice: 0,
    quantity: 0,
    image: "https://m.media-amazon.com/images/I/61LO6l4zB4L._AC_UL320_.jpg",
  },
];

let cart = [];


const product_wrapper = document.getElementById("product-wrapper");
const action_btn = document.getElementsByClassName("action-btn");

const cart_wrapper = document.getElementById("cart-wrapper");
const total = document.getElementById("total");

const cart_inner = document.getElementById('cart-inner');
const no_cartItem = document.getElementById("no-cartItem");

// update cart ui
function updateCartUI() {
  if (cart.length > 0) {
    cart_inner.classList.remove("hidden");
    no_cartItem.classList.add("hidden")
  } else {
    cart_inner.classList.add("hidden");
    no_cartItem.classList.remove("hidden");
  }
  let cartItems = "";
  let allTotal = 0;
  cart.forEach((item) => {
    cartItems += `
      <div class="cart-item flex w-full items-center justify-between mb-2">
        <span class="font-semibold">${item.name}</span>
        <div id=${item.id} class="action-btn">
          <span class="font-semibold"><span class="quantity">${item.quantity}</span> <span>x</span></span>
          <span class="font-semibold">${item.price}</span>
        </div>
      </div>`;
    item.totalPrice = item.price * item.quantity;
    allTotal += item.totalPrice;
  });
  cart_wrapper.innerHTML = cartItems;
  total.innerText = allTotal;
}


// update products ui
function updatedProductUi() {
  let productItems = "";
  Products.forEach((item) => {
    productItems += `<div class="card shadow-lg text-center overflow-hidden">
        <div class="image-wrapper w-full h-40 bg-white border flex justify-center items-center">
          <img src="${item.image}" alt="${item.name}" class="max-h-full object-contain">
        </div>
        <div class="card-body p-4">
          <h2 class="card-title text-xl font-semibold mx-auto mb-2">${item.name}</h2>
          <p>Price <span>${item.price}</span></p>
          <div id=${item.id} class="action-btn btn-group mx-auto mt-2">
            <button class="btn btn-sm text-xl decrease">-</button>
            <button class="btn btn-sm ">${item.quantity}</button>
            <button class="btn btn-sm text-xl increase">+</button>
          </div>
        </div>
      </div>`;
  });
  product_wrapper.innerHTML = productItems;
  // update cart array
  cart = Products.filter((item) => {
    return item.quantity > 0;
  });
  // invoke updateCartUI function
  updateCartUI();
}

updatedProductUi();

product_wrapper.addEventListener('click', (e) => {

  const target = e.target;
  if (target.classList.contains("increase")) {
    const productId = target.parentElement.id;
    Products[productId].quantity = Products[productId].quantity + 1;
    console.log(productId);
    updatedProductUi();
  } else if (target.classList.contains("decrease")) {
    const productId = target.parentElement.id;
    if (Products[productId].quantity > 0) {
      Products[productId].quantity = Products[productId].quantity - 1;
      updatedProductUi();
    }
  }
})

const themeBtn = document.getElementById("themeBtn");

themeBtn.addEventListener("click", (event) =>{
  event.preventDefault();

  const currentTheme = document.documentElement.getAttribute("data-theme");
  const newTheme = currentTheme === "light" ? "dark" : "light";

  document.documentElement.setAttribute("data-theme", newTheme);
});


