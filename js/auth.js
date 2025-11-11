/* auth.js */
// Guarda "logueado" en localStorage y redirecciona
function loginUser(email) {
  // podés agregar validaciones simples
  localStorage.setItem('malucca_user', JSON.stringify({ email }));
  // redirigir a home (ajustá ruta si la página está en pages/)
  window.location.href = '../index.html';
}

// Cerrar sesión
function logoutUser() {
  localStorage.removeItem('malucca_user');
  window.location.href = '../pages/login.html';
}

// Función para chequear si está logueado; si no, redirige al login
function requireAuth(redirectToLogin = true) {
  const user = localStorage.getItem('malucca_user');
  if (!user && redirectToLogin) {
    window.location.href = '../pages/login.html';
    return false;
  }
  return true;
}

// Al cargar página login: manejar formulario
document.addEventListener('DOMContentLoaded', () => {
  // Si estamos en login.html (comprobamos url)
  if (location.pathname.includes('/pages/login.html')) {
    const form = document.querySelector('.form-login');
    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.querySelector('#email').value.trim();
        const password = document.querySelector('#password').value.trim();
        // validación simple
        if (!email || !password) {
          alert('Completá email y contraseña');
          return;
        }
        // loguear (no real) y redirigir
        loginUser(email);
      });
    }
  }

  // Si hay un botón logout en la página, lo conectamos
  const logoutBtn = document.querySelector('[data-logout]');
  if (logoutBtn) logoutBtn.addEventListener('click', logoutUser);
});
