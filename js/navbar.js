/* navbar.js */

// Estructura de datos: páginas (títulos y rutas)
const paginas = [
  { title: 'Inicio', href: '../index.html' },
  { title: 'Remeras', href: 'remeras.html' },
  { title: 'Pantalones', href: 'pantalones.html' },
  { title: 'Accesorios', href: 'accesorios.html' },
  { title: 'Mi cuenta', href: 'pages/login.html' } // ejemplo
];

// Genera el navbar a partir de un contenedor con id="navbar"
function renderNavbar(containerSelector = '#navbar') {
  const container = document.querySelector(containerSelector);
  if (!container) return;

  // Si el usuario está logueado, mostramos logout
  const user = JSON.parse(localStorage.getItem('malucca_user') || 'null');
  const nav = document.createElement('nav');
  nav.className = 'main-nav';

  // Brand
  const brand = document.createElement('div');
  brand.className = 'brand';
  brand.innerHTML = `<a class="brand-link" href="../index.html"><img src="../img/logo_malucca.png" alt="logo" class="logo" /></a>`;
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

  // Right side: user or login
  const right = document.createElement('div');
  right.className = 'nav-right';
  if (user) {
    right.innerHTML = `<span class="nav-user">Hola, ${user.email}</span>
                       <button data-logout class="btn btn-logout">Cerrar sesión</button>`;
  } else {
    right.innerHTML = `<a class="nav-link" href="../pages/login.html">Iniciar sesión</a>`;
  }
  nav.appendChild(right);

  container.appendChild(nav);

  // conectar logout dinámico si existe
  const logoutBtn = container.querySelector('[data-logout]');
  if (logoutBtn) logoutBtn.addEventListener('click', () => {
    localStorage.removeItem('malucca_user');
    window.location.href = '../pages/login.html';
  });
}

// auto render si hay un contenedor #navbar
document.addEventListener('DOMContentLoaded', () => {
  renderNavbar('#navbar');
});
