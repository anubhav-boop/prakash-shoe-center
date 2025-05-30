import app from './firebase-config.js';
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";

const db = getFirestore(app);

const form = document.getElementById('delivery-form');
const orderStatus = document.getElementById('order-status');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  // Get phone and address input
  const phone = document.getElementById('phone').value.trim();
  const address = document.getElementById('address').value.trim();

  if (!phone || !address) {
    orderStatus.innerText = "Please fill all fields.";
    return;
  }

  // Get user info from localStorage
  const user = JSON.parse(localStorage.getItem('user'));
  if (!user) {
    orderStatus.innerText = "User not logged in. Please login first.";
    return;
  }

  // Get cart from localStorage
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  if (cart.length === 0) {
    orderStatus.innerText = "Your cart is empty.";
    return;
  }

  // Save order to Firestore
  try {
    await addDoc(collection(db, "orders"), {
      userId: user.uid,
      userName: user.name,
      userEmail: user.email,
      phone: phone,
      address: address,
      cartItems: cart,
      status: "pending",
      orderDate: new Date().toISOString()
    });

    // Clear cart
    localStorage.removeItem('cart');

    orderStatus.innerText = "Order placed successfully! We will contact you soon.";
    form.reset();
  } catch (error) {
    console.error(error);
    orderStatus.innerText = "Failed to place order. Please try again.";
  }
});
