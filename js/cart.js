function renderCart(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;
  const cartItems = getCartItems(); 
  if (!cartItems.length) {
    container.innerHTML = '<p class="cart-empty">No hay productos en el carrito.</p>';
    if (window.updateCartCount) window.updateCartCount();
    return;
  }

  let total = 0;

  const table = document.createElement('table');
  table.className = 'cart-table';

  const thead = document.createElement('thead');
  thead.innerHTML = `
    <tr>
      <th>Producto</th>
      <th>Categoría</th>
      <th>Cantidad</th>
      <th>Precio</th>
      <th>Subtotal</th>
      <th>Acciones</th>
    </tr>
  `;
  table.appendChild(thead);

  const tbody = document.createElement('tbody');

  cartItems.forEach((item, index) => {
    const subtotal = item.price * item.quantity;
    total += subtotal;

    const tr = document.createElement('tr');
    tr.dataset.index = index;

    tr.innerHTML = `
      <td class="cart-product">
        <img src="${item.image}" alt="${item.name}" class="cart-thumb">
        <span>${item.name}</span>
      </td>
      <td>${item.category}</td>
      <td>${item.quantity}</td>
      <td>$${item.price.toLocaleString('es-AR')}</td>
      <td>$${subtotal.toLocaleString('es-AR')}</td>
      <td>
        <button type="button" class="btn btn-remove cart-remove-btn">Eliminar</button>
      </td>
    `;
    tbody.appendChild(tr);
  });

  table.appendChild(tbody);

  container.innerHTML = '';
  container.appendChild(table);

  const totalEl = document.createElement('p');
  totalEl.className = 'cart-total';
  totalEl.textContent = `Total: $${total.toLocaleString('es-AR')}`;
  container.appendChild(totalEl);

  tbody.addEventListener('click', (event) => {
    if (event.target.classList.contains('cart-remove-btn')) {
      const row = event.target.closest('tr');
      const index = parseInt(row.dataset.index, 10);

      const items = getCartItems();
      items.splice(index, 1);
      saveCartItems(items);
      renderCart(containerId);

      if (window.updateCartCount) {
        window.updateCartCount();
      }
    }
  });
  if (window.updateCartCount) {
    window.updateCartCount();
  }
}

window.renderCart = renderCart;
