// 🛍 Example product list (you can expand this)// product.js
const products = [
  {
    id: "shoe1",
    name: "Men Classic Leather Shoes",
    price: 2800,
    image: "images/shoe1.jpg",
  },
  {
    id: "shoe2",
    name: "Women Elegant Sandals",
    price: 2400,
    image: "images/shoe2.jpg",
  },
  {
    id: "shoe3",
    name: "Kids Sporty Sneakers",
    price: 2100,
    image: "images/shoe3.jpg",
  },
  {
    id: "slipper1",
    name: "Men Comfortable Slippers",
    price: 1200,
    image: "images/slipper1.jpg",
  },
  {
    id: "gumboot1",
    name: "Durable Gumboots for Rain",
    price: 2900,
    image: "images/gumboot1.jpg",
  },
  {
    id: "sock1",
    name: "Pack of Cotton Socks",
    price: 600,
    image: "images/sock1.jpg",
  },
];

// Get product ID from URL
const params = new URLSearchParams(window.location.search);
const productId = params.get("id");

// Find product by ID
const product = products.find((p) => p.id === productId);

// Display product info
if (product) {
  document.getElementById("product-image").src = product.image;
  document.getElementById("product-name").textContent = product.name;
  document.getElementById("product-price").textContent = `NPR ${product.price}`;
}

// Enable add button when size & color selected
const sizeSelect = document.getElementById("size-select");
const colorSelect = document.getElementById("color-select");
const addBtn = document.getElementById("add-to-cart-btn");

function checkForm() {
  addBtn.disabled = !(sizeSelect.value && colorSelect.value);
}

sizeSelect.addEventListener("change", checkForm);
colorSelect.addEventListener("change", checkForm);

// Add to cart
addBtn.addEventListener("click", () => {
  const size = sizeSelect.value;
  const color = colorSelect.value;

  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  // Check if same product with same size/color already exists
  const existing = cart.find(
    (item) => item.id === product.id && item.size === size && item.color === color
  );

  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      size,
      color,
      quantity: 1,
    });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  alert(`${product.name} added to cart!`);
});
