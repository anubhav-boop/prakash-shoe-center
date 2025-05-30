const products = [
  {
    id: 'shoe1',
    name: 'Men Classic Leather Shoes',
    price: 2800,
    category: 'shoes',
    img: 'https://i.imgur.com/1Q9Z1Zl.jpg',
  },
  {
    id: 'shoe2',
    name: 'Women Elegant Sandals',
    price: 2400,
    category: 'sandals',
    img: 'https://i.imgur.com/dxUecxM.jpg',
  },
  {
    id: 'shoe3',
    name: 'Kids Sporty Sneakers',
    price: 2100,
    category: 'shoes',
    img: 'https://i.imgur.com/NkKxO2M.jpg',
  },
  {
    id: 'slipper1',
    name: 'Men Comfortable Slippers',
    price: 1200,
    category: 'slippers',
    img: 'https://i.imgur.com/7HLzVyI.jpg',
  },
  {
    id: 'gumboot1',
    name: 'Durable Gumboots for Rain',
    price: 2900,
    category: 'gumboots',
    img: 'https://i.imgur.com/2UuVBO5.jpg',
  },
  {
    id: 'sock1',
    name: 'Pack of Cotton Socks',
    price: 600,
    category: 'socks',
    img: 'https://i.imgur.com/FtPtVvQ.jpg',
  },
];

// Helper: Get cart from localStorage
function getCart() {
  return JSON.parse(localStorage.getItem('cart')) || [];
}

// Helper: Save cart to localStorage
function saveCart(cart) {
  localStorage.setItem('cart', JSON.stringify(cart));
}

// Update cart count shown in navbar (if you have a span or element with id 'cart-count')
function updateCartCount() {
  const cart = getCart();
  const count = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartCountElem = document.getElementById('cart-count');
  if (cartCountElem) {
    cartCountElem.textContent = count;
  }
}

// Show notification message
function showNotification(message) {
  const notification = document.getElementById('notification');
  notification.textContent = message;
  notification.style.display = 'block';
  setTimeout(() => {
    notification.style.display = 'none';
  }, 3000);
}

// Main function after page load
window.addEventListener('DOMContentLoaded', () => {
  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get('id');
  const product = products.find(p => p.id === productId);

  if (!product) {
    alert('Product not found!');
    return;
  }

  // Set product details
  document.getElementById('product-image').src = product.img;
  document.getElementById('product-name').textContent = product.name;
  document.getElementById('product-price').textContent = `NPR ${product.price}`;

  const sizeSelect = document.getElementById('size-select');
  const colorSelect = document.getElementById('color-select');
  const addToCartBtn = document.getElementById('add-to-cart-btn');

  // Enable Add to Cart only if size and color are selected
  function updateButtonState() {
    addToCartBtn.disabled = !(sizeSelect.value && colorSelect.value);
    const sizeSelect = document.getElementById('size-select');
const colorSelect = document.getElementById('color-select');
const addToCartBtn = document.getElementById('add-to-cart-btn');

// Function to update button state
function updateButtonState() {
  if (sizeSelect.value && colorSelect.value) {
    addToCartBtn.disabled = false;  // Enable button if both selected
  } else {
    addToCartBtn.disabled = true;   // Disable otherwise
  }
}

// Listen for changes
sizeSelect.addEventListener('change', updateButtonState);
colorSelect.addEventListener('change', updateButtonState);

// Optional: call once on page load in case of default selections
updateButtonState();

  }

  sizeSelect.addEventListener('change', updateButtonState);
  colorSelect.addEventListener('change', updateButtonState);

  // Initialize button state (in case dropdowns have defaults)
  updateButtonState();

  addToCartBtn.addEventListener('click', () => {
    const selectedSize = sizeSelect.value;
    const selectedColor = colorSelect.value;

    if (!selectedSize || !selectedColor) {
      return; // should never happen due to disabled button
    }

    // Get current cart
    const cart = getCart();

    // Check if this product with same size and color already exists in cart
    const existingItemIndex = cart.findIndex(item => 
      item.id === product.id && item.size === selectedSize && item.color === selectedColor
    );

    if (existingItemIndex >= 0) {
      // Increase quantity
      cart[existingItemIndex].quantity += 1;
    } else {
      // Add new item
      cart.push({
        id: product.id,
        name: product.name,
        price: product.price,
        size: selectedSize,
        color: selectedColor,
        quantity: 1
      });
    }

    // Save cart and update cart count in navbar
    saveCart(cart);
    updateCartCount();

    // Show notification
    showNotification(`${product.name} (Size: ${selectedSize}, Color: ${selectedColor}) added to cart!`);
  });

  // Update cart count on page load
  updateCartCount();
});
