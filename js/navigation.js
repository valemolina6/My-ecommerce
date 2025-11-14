const navLinks = [
  { href: '../index.html', label: 'Inicio' },
  { href: 'remeras.html', label: 'Remeras' },
  { href: 'pantalones.html', label: 'Pantalones' },
  { href: 'accesorios.html', label: 'Accesorios' }
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
  logoutButton.textContent = 'Cerrar sesión';

  nav.innerHTML = '';
  nav.appendChild(ul);
  nav.appendChild(logoutButton);

  container.innerHTML = '';
  container.appendChild(nav);
}
