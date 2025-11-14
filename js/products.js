const products = [
  // ACCESORIOS
  {
    id: 1,
    name: 'Collar dorado',
    description: 'Collar dorado Malucca con dije de perlas.',
    price: 4500,
    image: '../img/products/collarperla.jpg',
    category: 'accesorios'
  },
  {
    id: 2,
    name: 'Aros de perlas',
    description: 'Aros de perlas clásicos, ideales para todos los días.',
    price: 3200,
    image: '../img/products/arosperla.jpg',
    category: 'accesorios'
  },

  // REMERAS Y PANTALONES
  {
    id: 3,
    name: 'Remera beige',
    description: 'Remera básica beige de algodón 100% suave.',
    price: 15000,
    image: '../img/products/rembeige.jpg',
    category: 'remeras'
  },
{
    id: 4,
    name: 'Blusa blanco',
    description: 'Blusa de lino blanca, fresca y cómoda.',
    price: 15000,
    image: '../img/products/blusablanca.jpg',
    category: 'remeras'
  },
  {
    id: 5,
    name: 'Pantalón marron',
    description: 'Pantalón sastrero marrón tiro alto y elegante.',
    price: 25000,
    image: '../img/products/pantmarron.jpg',
    category: 'pantalones'
  },
  {
    id: 6,
    name: 'Pantalón beige',
    description: 'Pantalón beige de gabardina, cómodo y versátil.',
    price: 25000,
    image: '../img/products/pantbeige.jpg',
    category: 'pantalones'
  }
];
function renderProductCards(containerId, category) {
  const container = document.getElementById(containerId);
  if (!container) return;
  const filteredProducts = category
    ? products.filter(p => p.category === category)
    : products;

 
  let html = '<div class="productos">';

  for (const product of filteredProducts) {
    html += `
      <div class="card">
        <img src="${product.image}" alt="${product.name}">
        <h3>${product.name}</h3>
        <p>${product.description}</p>
        <p>$${product.price}</p>

        <!-- Controles de cantidad -->
        <div class="quantity-controls">
          <button class="btn quantity-btn" data-id="${product.id}" data-action="minus">-</button>
          <span id="quantity-${product.id}" class="quantity-value">1</span>
          <button class="btn quantity-btn" data-id="${product.id}" data-action="plus">+</button>
        </div>

        <!-- Botón de agregar (estética que ya tenías) -->
        <button class="btn btn-primary">Agregar</button>
      </div>
    `;
  }

  html += '</div>'; 
  container.innerHTML = html;
}
document.addEventListener('click', function (event) {
  if (!event.target.classList.contains('quantity-btn')) return;

  const productId = event.target.getAttribute('data-id');
  const action = event.target.getAttribute('data-action');
  const quantitySpan = document.getElementById(`quantity-${productId}`);

  let currentValue = parseInt(quantitySpan.textContent, 10);

  if (action === 'plus') {
    currentValue++;
  } else if (action === 'minus' && currentValue > 1) {
    currentValue--;
  }

  quantitySpan.textContent = String(currentValue);
});

