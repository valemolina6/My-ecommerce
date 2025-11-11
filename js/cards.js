/* cards.js
  - Render de tarjetas de producto con control de cantidad y "Agregar"
  - Usa container #productos
*/

(function () {
  const base = location.pathname.includes('/pages/') ? '..' : '.';

  // EJEMPLO de datos: adaptá a tus imágenes y textos
  const productos = [
    {
      id: 'r1',
      title: 'Remera Beige',
      description: 'Remera suave, algodón premium.',
      price: 15000,
      img: `${base}../img/rembeige.jpg`
    },
    {
      id: 'p1',
      title: 'Pantalón Beige',
      description: 'Corte cómodo y elegante.',
      price: 25000,
      img: `${base}/img/pantbeige.jpg`
    },
    {
      id: 'a1',
      title: 'Collar perola',
      description: 'Collar delicado para diario.',
      price: 8000,
      img: `${base}/img/collarperla.jpg`
    }
  ];

  function renderProductos(containerSelector = '#productos') {
    const container = document.querySelector(containerSelector);
    if (!container) return;

    container.innerHTML = ''; // limpiar

    productos.forEach(p => {
      const article = document.createElement('article');
      article.className = 'card card-product';
      article.innerHTML = `
        <img src="${p.img}" alt="${p.title}" class="card-img" />
        <div class="card-body">
          <h3 class="card-title">${p.title}</h3>
          <p class="card-desc">${p.description}</p>
          <p class="card-price">$${p.price.toLocaleString()}</p>

          <div class="card-qty" data-id="${p.id}">
            <button class="qty-btn" data-action="decrease">-</button>
            <span class="qty-number">1</span>
            <button class="qty-btn" data-action="increase">+</button>
          </div>

          <button class="btn btn-add" data-id="${p.id}">Agregar al carrito</button>
        </div>
      `;
      container.appendChild(article);
    });

    // Delegación de eventos para + / - y Agregar
    container.addEventListener('click', (ev) => {
      const btn = ev.target.closest('.qty-btn');
      if (btn) {
        const wrapper = btn.closest('.card-qty');
        const numberEl = wrapper.querySelector('.qty-number');
        let num = parseInt(numberEl.textContent, 10);
        if (btn.dataset.action === 'increase') num++;
        else if (btn.dataset.action === 'decrease' && num > 1) num--;
        numberEl.textContent = num;
        return;
      }

      const addBtn = ev.target.closest('.btn-add');
      if (addBtn) {
        const id = addBtn.dataset.id;
        const card = addBtn.closest('.card-product');
        const qty = parseInt(card.querySelector('.qty-number').textContent, 10);
        const cart = JSON.parse(localStorage.getItem('malucca_cart') || '[]');
        const existing = cart.find(i => i.id === id);
        if (existing) existing.qty += qty;
        else cart.push({ id, qty });
        localStorage.setItem('malucca_cart', JSON.stringify(cart));
        alert('Producto agregado al carrito');
      }
    }, false);
  }

  document.addEventListener('DOMContentLoaded', () => renderProductos('#productos'));

  // si querés exponer productos: window.malucca_products = productos;
  window.renderMaluccaProductos = renderProductos;
})();
