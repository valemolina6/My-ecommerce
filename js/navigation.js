const navLinks = [
  { href: '/home.html', label: 'Inicio' },
  { href: '/pages/remeras.html', label: 'Remeras' },
  { href: '/pages/pantalones.html', label: 'Pantalones' },
  { href: '/pages/accesorios.html', label: 'Accesorios' },
  { href: '/pages/carrito.html', label: 'Carrito' }
];

function renderNavbar(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const nav = document.createElement('nav');
  nav.className = 'main-nav';

  const ul = document.createElement('ul');
  ul.className = 'nav-list';

  navLinks.forEach((link) => {
    const li = document.createElement('li');
    const a = document.createElement('a');

    a.className = 'nav-link';
    a.href = link.href;
    a.textContent = link.label;

    if (link.href.includes('carrito.html')) {
      const badge = document.createElement('span');
      badge.id = 'cart-count';
      badge.className = 'cart-count-badge';
      badge.textContent = ''; 
      a.appendChild(badge);
    }

    li.appendChild(a);
    ul.appendChild(li);
  });

  const logoutButton = document.createElement('button');
  logoutButton.id = 'logout-button';
  logoutButton.className = 'btn nav-logout-btn';
  logoutButton.type = 'button';
  logoutButton.textContent = 'Cerrar sesión';

  nav.appendChild(ul);
  nav.appendChild(logoutButton);

  container.innerHTML = '';
  container.appendChild(nav);
}
