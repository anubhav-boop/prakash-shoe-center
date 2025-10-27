// 🛍 Example product list (you can expand this)
const products = {
  shoe1: {
    name: "Men Classic Leather Shoes",
    price: 4500,
    image: "images/shoe1.jpg",
  },
  shoe2: {
    name: "Jordan Air Sneakers",
    price: 5500,
    image: "images/shoe2.jpg",
  },
  shoe3: {
    name: "Adidas Sports Runner",
    price: 6000,
    image: "images/shoe3.jpg",
  },
};

// 🧭 Get product ID from URL
const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get("id");
const product = products[productId];

// 🧾 Elements
const nameEl = document.getElementById("product-name");
const priceEl = document.getElementById("product-price");
const imageEl = document.getElementById("product-image");
const addBtn = document.getElementById("add-to-cart-btn");
const sizeSelect = document.getElementById("size-select");
const colorSelect = document.getElementById("color-select");
const cartCountEl = document.getElementById("cart-count");

// 🧠 Display product details
if (product) {
  nameEl.textContent = product.name;
  priceEl.textContent = `Price: NPR ${product.price}`;
  imageEl.src = product.image;
} else {
  document.querySelector(".product-detail").innerHTML = "<p>Product not found.</p>";
}

// 🛒 Enable button when size & color selected
function updateButtonState() {
  addBtn.disabled = !sizeSelect.value || !colorSelect.value;
}
sizeSelect.addEventListener("change", updateButtonState);
colorSelect.addEventListener("change", updateButtonState);

// 📦 Add to Cart
addBtn.addEventListener("click", () => {
  if (!product) return;

  const size = sizeSelect.value;
  const color = colorSelect.value;
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  // check if already in cart (same name, size, color)
  const existing = cart.find(
    (item) => item.name === product.name && item.size === size && item.color === color
  );

  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({
      name: product.name,
      price: product.price,
      image: product.image,
      size,
      color,
      quantity: 1,
    });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
  alert("✅ Added to cart successfully!");
});

// 🔢 Update cart count (top right)
function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const count = cart.reduce((sum, item) => sum + item.quantity, 0);
  cartCountEl.textContent = count;
}

updateCartCount();
