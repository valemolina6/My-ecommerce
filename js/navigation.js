const navLinks = [
  { href: '/home.html', label: 'Inicio' },
  { href: '/pages/remeras.html', label: 'Remeras' },
  { href: '/pages/pantalones.html', label: 'Pantalones' },
  { href: '/pages/accesorios.html', label: 'Accesorios' }
];

function renderNavbar(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const nav = document.createElement('nav');
  nav.className = 'main-nav';

  const ul = document.createElement('ul');
  ul.className = 'nav-list';

  navLinks.forEach(link => {
    const li = document.createElement('li');
    const a = document.createElement('a');

    a.className = 'nav-link';
    a.href = link.href;
    a.textContent = link.label;

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


