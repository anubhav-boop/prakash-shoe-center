const products = [
  {
    id: 'shoe1',
    name: 'Men Classic Leather Shoes',
    price: 2800,
    img: 'https://i.imgur.com/1Q9Z1Zl.jpg',
  },
  {
    id: 'shoe2',
    name: 'Women Elegant Sandals',
    price: 2400,
    img: 'https://i.imgur.com/dxUecxM.jpg',
  },
  {
    id: 'shoe3',
    name: 'Kids Sporty Sneakers',
    price: 2100,
    img: 'https://i.imgur.com/NkKxO2M.jpg',
  }
];

// Get product ID from URL
const params = new URLSearchParams(window.location.search);
const productId = params.get("id");
const product = products.find(p => p.id === productId);

if (!product) {
  document.body.innerHTML = '<h2 style="text-align:center;color:red;">Product Not Found</h2>';
  throw new Error("Product not found");
}

// Display product info
document.getElementById("product-image").src = product.img;
document.getElementById("product-name").textContent = product.name;
document.getElementById("product-price").textContent = `Price: NPR ${product.price}`;

// Handle size & color select
const sizeSelect = document.getElementById("size-select");
const colorSelect = document.getElementById("color-select");
const addToCartBtn = document.getElementById("add-to-cart-btn");

function updateAddToCartState() {
  addToCartBtn.disabled = !(sizeSelect.value && colorSelect.value);
}

sizeSelect.addEventListener("change", updateAddToCartState);
colorSelect.addEventListener("change", updateAddToCartState);

addToCartBtn.addEventListener("click", () => {
  const size = sizeSelect.value;
  const color = colorSelect.value;

  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  cart.push({
    id: product.id,
    name: product.name,
    price: product.price,
    size: size,
    color: color,
    quantity: 1
  });

  localStorage.setItem("cart", JSON.stringify(cart));

  // Go to cart page
  window.location.href = "cart.html";
  // product.js
const products = [
  // Shoes (for reference)
  {
    id: 'shoe1',
    name: 'Men Classic Leather Shoes',
    price: 2800,
    colors: ['Black', 'Brown'],
    sizes: [39, 40, 41, 42, 43],
    img: 'https://i.imgur.com/1Q9Z1Zl.jpg',
    category: 'shoes',
  },
  // Slippers
  {
    id: 'slipper1',
    name: 'Kitto Black Slipper',
    price: 1200,
    colors: ['Black', 'Grey'],
    sizes: [38, 39, 40, 41],
    img: 'https://i.imgur.com/7HLzVyI.jpg',
    category: 'slippers',
  },
  {
    id: 'slipper2',
    name: 'Nike Blue Slipper',
    price: 1300,
    colors: ['Blue', 'White'],
    sizes: [39, 40, 41, 42],
    img: 'https://i.imgur.com/q5JjKcE.jpg',
    category: 'slippers',
  },
  // Add other slippers similarly...
];

function getProductIdFromURL() {
  const params = new URLSearchParams(window.location.search);
  return params.get('id');
}

function showNotification(message) {
  alert(message); // simple alert for notification, you can improve with custom div
}

function saveCart(cart) {
  localStorage.setItem('cart', JSON.stringify(cart));
}

function loadCart() {
  return JSON.parse(localStorage.getItem('cart')) || [];
}

function renderProductDetails(product) {
  const container = document.getElementById('product-details');
  if (!product) {
    container.innerHTML = '<h2>Product not found!</h2>';
    return;
  }

  container.innerHTML = `
    <h2>${product.name}</h2>
    <img src="${product.img}" alt="${product.name}" style="max-width:300px; display:block; margin-bottom:1rem;" />
    <p><strong>Price:</strong> NPR ${product.price}</p>
    <label for="size-select">Select Size:</label>
    <select id="size-select">
      <option value="">--Select Size--</option>
      ${product.sizes.map(size => `<option value="${size}">${size}</option>`).join('')}
    </select>
    <br /><br />
    <label for="color-select">Select Color:</label>
    <select id="color-select">
      <option value="">--Select Color--</option>
      ${product.colors.map(color => `<option value="${color}">${color}</option>`).join('')}
    </select>
    <br /><br />
    <button id="add-to-cart-btn" disabled>Add to Cart</button>
  `;

  const sizeSelect = document.getElementById('size-select');
  const colorSelect = document.getElementById('color-select');
  const addToCartBtn = document.getElementById('add-to-cart-btn');

  function checkEnableButton() {
    addToCartBtn.disabled = !(sizeSelect.value && colorSelect.value);
  }

  sizeSelect.addEventListener('change', checkEnableButton);
  colorSelect.addEventListener('change', checkEnableButton);

  addToCartBtn.addEventListener('click', () => {
    const cart = loadCart();
    const item = {
      id: product.id,
      name: product.name,
      price: product.price,
      size: sizeSelect.value,
      color: colorSelect.value,
      quantity: 1,
    };

    // Check if same product+size+color exists; increment quantity
    const existingIndex = cart.findIndex(c => c.id === item.id && c.size === item.size && c.color === item.color);
    if (existingIndex >= 0) {
      cart[existingIndex].quantity++;
    } else {
      cart.push(item);
    }

    saveCart(cart);
    showNotification('Item added to cart!');
    // Redirect to cart page
    window.location.href = 'cart.html';
  });
}

// Initialize
const productId = getProductIdFromURL();
const product = products.find(p => p.id === productId);
document.addEventListener('DOMContentLoaded', () => renderProductDetails(product));

});
