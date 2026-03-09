let products = JSON.parse(localStorage.getItem("products")) || [];

function addProduct() {
  const name = document.getElementById("name").value;
  const price = parseFloat(document.getElementById("price").value);
  const image = document.getElementById("image").value;
  const desc = document.getElementById("desc").value;

  if (!name || !price || !image || !desc) {
    document.getElementById("message").textContent = "❌ Please fill all fields!";
    return;
  }

  const product = { name, price, image, desc };
  products.push(product);
  localStorage.setItem("products", JSON.stringify(products));

  document.getElementById("message").textContent = "✅ Product added successfully!";
  clearForm();
  displayProducts();
}

function displayProducts() {
  const list = document.getElementById("product-list");
  list.innerHTML = "";

  products.forEach((p, index) => {
    const card = document.createElement("div");
    card.className = "product-card";
    card.innerHTML = `
      <h3>${p.name}</h3>
      <img src="${p.image}" alt="${p.name}" width="150">
      <p>${p.desc}</p>
      <p><strong>Price:</strong> Ksh ${p.price.toFixed(2)}</p>
      <button onclick="deleteProduct(${index})">Delete</button>
    `;
    list.appendChild(card);
  });
}

function deleteProduct(index) {
  products.splice(index, 1);
  localStorage.setItem("products", JSON.stringify(products));
  displayProducts();
}

function clearForm() {
  document.getElementById("name").value = "";
  document.getElementById("price").value = "";
  document.getElementById("image").value = "";
  document.getElementById("desc").value = "";
}

// Initialize product list
displayProducts();

