let productsDataCache = null;

// ----------------- DATOS DE PRODUCTOS -----------------

async function loadProductsData() {
  if (productsDataCache) return productsDataCache;

  try {
    const response = await fetch('/data/products.json');
    if (!response.ok) {
      throw new Error('Error al cargar datos de productos');
    }
    const data = await response.json();
    productsDataCache = data;
    return data;
  } catch (error) {
    console.error(error);
    return { remeras: [], pantalones: [], accesorios: [] };
  }
}

// ----------------- CARRITO EN LOCALSTORAGE -----------------

function getCartItems() {
  try {
    return JSON.parse(localStorage.getItem('cartItems')) || [];
  } catch (e) {
    return [];
  }
}

function saveCartItems(cartItems) {
  localStorage.setItem('cartItems', JSON.stringify(cartItems));
}

// Nuevo: actualiza el badge del carrito en el navbar
function updateCartCount() {
  const cartItems = getCartItems();
  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const badge = document.getElementById('cart-count');

  if (!badge) return;

  if (totalQuantity > 0) {
    badge.textContent = ` ${totalQuantity}`;
  } else {
    badge.textContent = '';
  }
}

function addToCart(item) {
  const cartItems = getCartItems();
  const existingIndex = cartItems.findIndex(
    (cartItem) => cartItem.id === item.id
  );

  if (existingIndex >= 0) {
    cartItems[existingIndex].quantity += item.quantity;
  } else {
    cartItems.push(item);
  }

  saveCartItems(cartItems);
  updateCartCount(); // actualizo el contador del navbar

  alert(`Agregaste ${item.quantity} unidad(es) de "${item.name}" al carrito.`);
}

// ----------------- CARDS DE PRODUCTOS -----------------

function createProductCard(product, categoryKey) {
  const card = document.createElement('article');
  card.className = 'card card-product';

  const formattedPrice = product.price.toLocaleString('es-AR');

  card.innerHTML = `
    <img src="${product.image}" alt="${product.name}" class="card-img">
    <div class="card-body">
      <h3 class="card-title">${product.name}</h3>
      <p class="card-description">${product.description}</p>
      <p class="card-price">$${formattedPrice}</p>
      <div class="card-qty">
        <button type="button" class="qty-btn qty-minus">-</button>
        <span class="qty-value">1</span>
        <button type="button" class="qty-btn qty-plus">+</button>
      </div>
      <button type="button" class="btn btn-primary card-add">Agregar</button>
    </div>
  `;

  const minusBtn = card.querySelector('.qty-minus');
  const plusBtn = card.querySelector('.qty-plus');
  const valueEl = card.querySelector('.qty-value');

  minusBtn.addEventListener('click', () => {
    const current = parseInt(valueEl.textContent, 10) || 1;
    if (current > 1) valueEl.textContent = current - 1;
  });

  plusBtn.addEventListener('click', () => {
    const current = parseInt(valueEl.textContent, 10) || 1;
    valueEl.textContent = current + 1;
  });

  const addBtn = card.querySelector('.card-add');
  addBtn.addEventListener('click', () => {
    const quantity = parseInt(valueEl.textContent, 10) || 1;

    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      category: categoryKey,
      quantity: quantity
    });
  });

  return card;
}

// ----------- PÁGINAS POR CATEGORÍA -----------

async function renderProductCards(containerId, categoryKey) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const data = await loadProductsData();
  const items = data[categoryKey] || [];

  const grid = document.createElement('div');
  grid.className = 'productos';

  items.forEach((product) => {
    const card = createProductCard(product, categoryKey);
    grid.appendChild(card);
  });

  container.innerHTML = '';
  container.appendChild(grid);
}

// ----------- HOME DEL USUARIO LOGUEADO -----------

async function renderHomeProducts(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const data = await loadProductsData();

  const wrapper = document.createElement('div');
  wrapper.className = 'home-products';

  const categories = [
    { key: 'remeras', title: 'Remeras' },
    { key: 'pantalones', title: 'Pantalones' },
    { key: 'accesorios', title: 'Accesorios' }
  ];

  categories.forEach((cat) => {
    const products = (data[cat.key] || []).slice(0, 3);
    if (!products.length) return;

    const section = document.createElement('section');
    section.className = 'home-category-section';

    const heading = document.createElement('h3');
    heading.className = 'home-category-title';
    heading.textContent = cat.title;

    const grid = document.createElement('div');
    grid.className = 'productos';

    products.forEach((product) => {
      const card = createProductCard(product, cat.key);
      grid.appendChild(card);
    });

    section.appendChild(heading);
    section.appendChild(grid);
    wrapper.appendChild(section);
  });

  container.innerHTML = '';
  container.appendChild(wrapper);
}

// Exponer funciones globalmente para usarlas en los HTML
window.renderProductCards = renderProductCards;
window.renderHomeProducts = renderHomeProducts;
window.loadProductsData = loadProductsData;
window.getCartItems = getCartItems;
window.saveCartItems = saveCartItems;
window.updateCartCount = updateCartCount;

