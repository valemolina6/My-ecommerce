/* cards.js */

// Estructura de ejemplo para productos
const productos = [
  {
    id: 'p1',
    title: 'Collar dorado',
    description: 'Collar delicado con cadena dorada y dije.',
    price: 4500,
    img: '../img/products/collarperla.jpg'
  },
  {
    id: 'p2',
    title: 'Aros de perlas',
    description: 'Aros con perla y cierre dorado.',
    price: 3200,
    img: '../img/aros.jpg'
  }
];

// Generar cards en un contenedor con id="productos"
function renderProductos(containerSelector = '#productos') {
  const container = document.querySelector(containerSelector);
  if (!container) return;

  container.innerHTML = ''; // limpiar

  productos.forEach(p => {
    const card = document.createElement('article');
    card.className = 'card card-product';
    card.innerHTML = `
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
    container.appendChild(card);
  });

  // listeners para botones + / -
  container.addEventListener('click', (e) => {
    const btn = e.target.closest('.qty-btn');
    if (!btn) return;
    const wrapper = btn.closest('.card-qty');
    const numberEl = wrapper.querySelector('.qty-number');
    let num = parseInt(numberEl.textContent, 10);
    if (btn.dataset.action === 'increase') num++;
    else if (btn.dataset.action === 'decrease' && num > 1) num--;
    numberEl.textContent = num;
  });

  // agregar al carrito (ejemplo: guardamos en localStorage)
  container.addEventListener('click', (e) => {
    if (!e.target.classList.contains('btn-add')) return;
    const id = e.target.dataset.id;
    const qty = e.target.closest('.card-product').querySelector('.qty-number').textContent;
    // lógica simple: guardamos items en localStorage
    const cart = JSON.parse(localStorage.getItem('malucca_cart') || '[]');
    const existing = cart.find(i => i.id === id);
    if (existing) existing.qty += parseInt(qty, 10);
    else cart.push({ id, qty: parseInt(qty, 10) });
    localStorage.setItem('malucca_cart', JSON.stringify(cart));
    alert('Producto agregado al carrito');
  });
}

// auto render si existe #productos
document.addEventListener('DOMContentLoaded', () => {
  renderProductos('#productos');
});
