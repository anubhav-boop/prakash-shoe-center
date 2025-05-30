import app from './firebase-config.js';
import { getAuth, GoogleAuthProvider, signInWithPopup } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";

const auth = getAuth(app);
const provider = new GoogleAuthProvider();

const loginBtn = document.getElementById("google-login-btn");
const loginStatus = document.getElementById("login-status");

loginBtn.addEventListener("click", () => {
  signInWithPopup(auth, provider)
    .then((result) => {
      const user = result.user;
      loginStatus.innerText = `Welcome, ${user.displayName}`;
      // Save user info to localStorage (or sessionStorage)
      localStorage.setItem("user", JSON.stringify({
        uid: user.uid,
        name: user.displayName,
        email: user.email,
      }));
      // Redirect to delivery info page
      window.location.href = "delivery.html";
    })
    .catch((error) => {
      console.error(error);
      loginStatus.innerText = "Login failed. Please try again.";
    });
});
