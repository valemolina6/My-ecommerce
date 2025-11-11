// Guarda "logueado" en localStorage y redirecciona
function loginUser(email) {
  localStorage.setItem('malucca_user', JSON.stringify({ email }));
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
  if (location.pathname.includes('/pages/login.html')) {
    const form = document.querySelector('.form-login');
    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.querySelector('#email').value.trim();
        const password = document.querySelector('#password').value.trim();
        if (!email || !password) {
          alert('Completá email y contraseña');
          return;
        }
        loginUser(email);
      });
    }
  }
});
