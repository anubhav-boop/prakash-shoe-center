// login.js - Google login (works if firebase-config.js + firebase libs are included)
// If Firebase is not available, a local-storage fallback can be used (simple demo)

(async function(){
  function saveUserToLocal(user){
    localStorage.setItem('user', JSON.stringify({ uid:user.uid||user.email, name:user.displayName||user.name, email:user.email||user.email }));
  }

  const loginBtn = document.getElementById('google-login-btn');
  const loginStatus = document.getElementById('login-status');

  if(loginBtn){
    loginBtn.addEventListener('click', async ()=>{
      // If firebase auth available, use it
      if(window.firebase && window.firebase.auth){
        try {
          const provider = new firebase.auth.GoogleAuthProvider();
          const res = await firebase.auth().signInWithPopup(provider);
          const user = res.user;
          saveUserToLocal(user);
          loginStatus && (loginStatus.innerText = `Welcome, ${user.displayName}`);
          // redirect or continue
          setTimeout(()=> window.location.href = 'delivery.html', 700);
        } catch(err){
          console.error(err);
          alert('Login failed: '+(err.message||err));
        }
      } else {
        // fallback demo (not real auth)
        const name = prompt('Enter your name (demo)') || 'Guest';
        const email = prompt('Enter your email (demo)') || `guest@demo.local`;
        const user = { uid: 'demo-'+Date.now(), displayName: name, email };
        saveUserToLocal(user);
        loginStatus && (loginStatus.innerText = `Welcome, ${name}`);
        setTimeout(()=> window.location.href = 'delivery.html', 700);
      }
    });
  }
})();
