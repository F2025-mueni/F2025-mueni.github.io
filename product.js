let products = JSON.parse(localStorage.getItem("products")) || [];
let cart = JSON.parse(localStorage.getItem("cart")) || [];

function displayProducts() {
  const list = document.getElementById("product-list");
  list.innerHTML = "";

  products.forEach((p, index) => {
    const card = document.createElement("div");
    card.className = "product-card";
    card.innerHTML = `
      <h3>${p.name}</h3>
      <img src="${p.image}" alt="${p.name}">
      <p>${p.desc}</p>
      <p><strong>Price:</strong> Ksh ${p.price.toFixed(2)}</p>
      <button onclick="addToCart(${index})">Add to Cart</button>
    `;
    list.appendChild(card);
  });
}

function addToCart(index) {
  const existingItem = cart.find(item => item.name === products[index].name);
  if (existingItem) {
    existingItem.quantity++;
  } else {
    cart.push({ ...products[index], quantity: 1 });
  }
  localStorage.setItem("cart", JSON.stringify(cart)); // ✅ Save cart
  displayCart();
}

function displayCart() {
  const cartItems = document.getElementById("cart-items");
  const cartTotal = document.getElementById("cart-total");
  cartItems.innerHTML = "";
  let total = 0;

  cart.forEach((item, i) => {
    total += item.price * item.quantity;
    cartItems.innerHTML += `
      <div class="cart-item">
        <p>${item.name} - Ksh ${item.price.toFixed(2)} x ${item.quantity}</p>
        <button onclick="increaseQuantity(${i})">+</button>
        <button onclick="decreaseQuantity(${i})">-</button>
        <button onclick="removeItem(${i})">Remove</button>
      </div>
    `;
  });

  cartTotal.textContent = `Total: Ksh ${total.toFixed(2)}`;
}

function increaseQuantity(index) {
  cart[index].quantity++;
  localStorage.setItem("cart", JSON.stringify(cart)); // ✅ Save cart
  displayCart();
}

function decreaseQuantity(index) {
  if (cart[index].quantity > 1) {
    cart[index].quantity--;
  } else {
    cart.splice(index, 1);
  }
  localStorage.setItem("cart", JSON.stringify(cart)); // ✅ Save cart
  displayCart();
}

function removeItem(index) {
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart)); // ✅ Save cart
  displayCart();
}

// Initialize product list
displayProducts();
displayCart(); // ✅ Show cart on page load
