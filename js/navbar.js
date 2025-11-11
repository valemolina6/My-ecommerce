/* navbar.js
  - Renderiza un navbar dinámico a partir de la estructura 'paginas'
  - Inserta el logo, links y el lado derecho (usuario/logout o link a login)
*/

(function () {
  const base = location.pathname.includes('/pages/') ? '..' : '.';

  // --- Estructura de páginas: modificá si querés otros títulos/rutas
  const paginas = [
    { title: 'Inicio', href: `${base}/index.html` },
    { title: 'Remeras', href: `${base}/pages/remeras.html` },
    { title: 'Pantalones', href: `${base}/pages/pantalones.html` },
    { title: 'Accesorios', href: `${base}/pages/accesorios.html` }
  ];

  function renderNavbar(containerSelector = '#navbar') {
    const container = document.querySelector(containerSelector);
    if (!container) return;

    // Limpiar contenedor
    container.innerHTML = '';

    // Crear nav
    const nav = document.createElement('nav');
    nav.className = 'main-nav';

    // Brand (logo)
    const brand = document.createElement('div');
    brand.className = 'brand';
    brand.innerHTML = `<a class="brand-link" href="${base}/index.html"><img src="${base}/img/logo_malucca.png" alt="Malucca" class="logo" /></a>`;
    nav.appendChild(brand);

    // Links
    const ul = document.createElement('ul');
    ul.className = 'nav-list';
    paginas.forEach(p => {
      const li = document.createElement('li');
      li.innerHTML = `<a class="nav-link" href="${p.href}">${p.title}</a>`;
      ul.appendChild(li);
    });
    nav.appendChild(ul);

    // Right side
    const right = document.createElement('div');
    right.className = 'nav-right';
    const user = JSON.parse(localStorage.getItem('malucca_user') || 'null');
    if (user) {
      right.innerHTML = `<span class="nav-user">Hola, ${user.email}</span>
                         <button class="btn btn-logout" data-logout>Cerrar sesión</button>`;
    } else {
      right.innerHTML = `<a class="nav-link" href="${base}/pages/login.html">Iniciar sesión</a>`;
    }
    nav.appendChild(right);

    container.appendChild(nav);

    // Si querés que el navbar esté sticky o con clases extra, hacelo por CSS
  }

  // Auto-render si existe #navbar
  document.addEventListener('DOMContentLoaded', () => renderNavbar('#navbar'));

  // Exponer si querés renderizar manualmente
  window.renderMaluccaNavbar = renderNavbar;
})();
