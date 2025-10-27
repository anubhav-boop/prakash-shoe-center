/* product.js - universal renderer for product detail pages */
/* Requires: store-data.js (window.__STORE_PRODUCTS) */

(function(){
  const params = new URLSearchParams(window.location.search);
  const id = params.get('id');
  const PRODUCTS = window.__STORE_PRODUCTS || [];
  const FALLBACK = window.__STORE_FALLBACK_IMAGE || '';

  const product = PRODUCTS.find(p=>p.id===id);
  const container = document.getElementById('product-detail') || document.querySelector('.product-detail');

  if(!container){
    console.warn('product.js: container not found (id=product-detail or class=product-detail).');
  }

  if(!product){
    const html = `<div class="card"><p style="padding:20px">Product not found.</p></div>`;
    if(container) container.innerHTML = html;
    return;
  }

  // Render markup (keeps markup minimal so it fits different page templates)
  const markup = `
    <div class="product-detail card">
      <div class="image-wrap">
        <img id="main-image" class="main-image" src="${product.image||FALLBACK}" alt="${product.name}" onerror="this.onerror=null;this.src='${FALLBACK}'" />
      </div>
      <div class="info">
        <h2>${product.name}</h2>
        <div style="font-weight:800; color:#007bff; margin-top:6px">NPR ${Number(product.price).toFixed(0)}</div>

        <div class="form-row">
          <label for="size-select">Size</label>
          <select id="size-select">
            <option value="">Choose size</option>
            <option value="36">36</option><option value="37">37</option><option value="38">38</option>
            <option value="39">39</option><option value="40">40</option><option value="41">41</option>
            <option value="42">42</option><option value="43">43</option>
          </select>
        </div>

        <div class="form-row" style="margin-top:12px">
          <label>Color</label>
          <div class="swatches" id="swatches"></div>
        </div>

        <div style="margin-top:18px; display:flex; gap:12px">
          <button id="add-to-cart" class="btn btn-primary">Add to Cart</button>
          <a href="cart.html" class="btn btn-ghost">View Cart</a>
        </div>
      </div>
    </div>
  `;

  container.innerHTML = markup;

  const swatchesEl = document.getElementById('swatches');
  const mainImage = document.getElementById('main-image');

  // If product.colors exists (object of colorName -> imageUrl), use that.
  if(product.colors && typeof product.colors === 'object' && Object.keys(product.colors).length){
    Object.entries(product.colors).forEach(([color, url], idx) => {
      const d=document.createElement('div');
      d.className='swatch'+(idx===0? ' selected':'');
      d.style.background = (color && color.toLowerCase()) || '#ddd';
      d.dataset.url = url;
      d.dataset.color = color;
      d.title = color;
      d.addEventListener('click', ()=>{
        document.querySelectorAll('.swatch').forEach(s=>s.classList.remove('selected'));
        d.classList.add('selected');
        mainImage.src = url || FALLBACK;
      });
      swatchesEl.appendChild(d);
    });
  } else {
    // Single image product -> show one non-clickable swatch
    const d=document.createElement('div');
    d.className='swatch selected';
    d.style.background = '#ddd';
    d.dataset.url = product.image || FALLBACK;
    d.dataset.color = 'Default';
    swatchesEl.appendChild(d);
  }

  // Add to cart logic
  document.getElementById('add-to-cart').addEventListener('click', ()=>{
    const size = document.getElementById('size-select').value;
    if(!size){ alert('Please choose a size'); return; }
    const sw = document.querySelector('.swatch.selected');
    const color = sw ? (sw.dataset.color || '') : '';
    const image = sw ? (sw.dataset.url || product.image || FALLBACK) : (product.image||FALLBACK);

    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existing = cart.find(i=> i.id===product.id && i.size===size && i.color===color);
    if(existing){ existing.quantity = (existing.quantity||0)+1; }
    else {
      cart.push({
        id: product.id, name: product.name, price:Number(product.price)||0,
        image, size, color, quantity:1
      });
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    showToast(`${product.name} added to cart`);
    updateCartCount();
  });

  // small utilities
  function showToast(msg){
    let t=document.querySelector('.toast');
    if(!t){ t=document.createElement('div'); t.className='toast'; document.body.appendChild(t); }
    t.textContent=msg; t.classList.add('show');
    setTimeout(()=>t.classList.remove('show'),2600);
  }

  function updateCartCount(){
    const cart = JSON.parse(localStorage.getItem('cart'))||[];
    const count = cart.reduce((s,i)=> s + (i.quantity||0), 0);
    document.querySelectorAll('[data-cart-count]').forEach(el=> el.textContent = count);
  }
  updateCartCount();
})();
