// delivery.js - places order into firestore if configured, else only local pending
(async function(){
  // helper for optional Firestore integration if you implemented helper addOrderToFirestore
  const addOrderToFirestore = window.addOrderToFirestore || null;

  const form = document.getElementById('delivery-form');
  const orderStatus = document.getElementById('order-status');

  if(!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const phone = document.getElementById('phone').value.trim();
    const address = document.getElementById('address').value.trim();
    if(!phone || !address){ orderStatus.innerText = 'Please fill all fields.'; return; }

    const user = JSON.parse(localStorage.getItem('user')) || { uid:'guest', name:'Guest', email:'' };
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    if(!cart.length){ orderStatus.innerText = 'Your cart is empty.'; return; }

    const order = {
      id: 'ORD-'+Date.now(),
      userId: user.uid,
      userName: user.name,
      userEmail: user.email || '',
      phone, address,
      cartItems: cart,
      status: 'pending',
      orderDate: new Date().toISOString()
    };

    try {
      // Save to local pending orders
      const pending = JSON.parse(localStorage.getItem('pendingOrders')) || [];
      pending.push(order);
      localStorage.setItem('pendingOrders', JSON.stringify(pending));

      // If you provided an addOrderToFirestore helper, call it
      if(typeof addOrderToFirestore === 'function'){
        await addOrderToFirestore(order);
      }

      // Clear cart
      localStorage.removeItem('cart');
      orderStatus.innerText = 'Order placed successfully! We will contact you soon.';
      form.reset();
    } catch(err){
      console.error(err);
      orderStatus.innerText = 'Failed to place order. Please try again.';
    }
  });
})();
