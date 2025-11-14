// js/navigation.js

// Estructura de datos: cada objeto representa una página
// Cambiá títulos o urls si tus archivos tienen otros nombres.
const pages = [
  { id: 'home',       title: 'Inicio',      url: '../Index.html' },
  { id: 'remeras',    title: 'Remeras',     url: './remeras.html' },
  { id: 'pantalones', title: 'Pantalones',  url: './pantalones.html' },
  { id: 'accesorios', title: 'Accesorios',  url: './accesorios.html' }
];

/**
 * Genera la barra de navegación dentro del elemento <nav>
 * que tenga el id que le pasemos.
 * Ejemplo de uso: renderNavbar('navbar');
 */
function renderNavbar(containerId) {
  const navElement = document.getElementById(containerId);
  if (!navElement) return;

  // Armamos los links recorriendo el array 'pages'
  let linksHtml = '';

  for (const page of pages) {
    linksHtml += `
      <li class="nav-item">
        <a href="${page.url}" class="nav-link">${page.title}</a>
      </li>
    `;
  }

  // Estructura HTML del navbar
  navElement.innerHTML = `
    <div class="nav-left">
      <a href="../Index.html" class="nav-logo">Malucca</a>
    </div>
    <ul class="nav-menu">
      ${linksHtml}
    </ul>
    <div class="nav-right">
      <button id="logout-button" class="logout-btn">Cerrar sesión</button>
    </div>
  `;
}
