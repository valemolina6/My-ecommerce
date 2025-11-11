/* auth.js
  - Manejo simple de login/logout con localStorage
  - Funciona para páginas en la raíz y en /pages/ (detecta basePath)
*/

(function () {
  // Detectar base para rutas: si estamos en /pages/... subimos un nivel
  const base = location.pathname.includes('/pages/') ? '..' : '.';

  // Guardar usuario simple en localStorage
  function loginUser(email) {
    localStorage.setItem('malucca_user', JSON.stringify({ email }));
    // redirigir a la home (ajusta base si estás en pages/)
    window.location.href = `${base}/index.html`;
  }

  // Logout: borrar y redirigir al login (si estamos en root, usar pages/login)
  function logoutUser() {
    localStorage.removeItem('malucca_user');
    window.location.href = `${base}/pages/login.html`;
  }

  // Forzar auth: si no está logueado redirige al login
  function requireAuth(redirectToLogin = true) {
    const user = localStorage.getItem('malucca_user');
    if (!user && redirectToLogin) {
      const baseForLogin = location.pathname.includes('/pages/') ? '.' : './pages';
      window.location.href = `${baseForLogin}/login.html`;
      return false;
    }
    return true;
  }

  // Cuando la página carga
  document.addEventListener('DOMContentLoaded', () => {
    // 1) Conectar formulario de login si existe
    const form = document.querySelector('.form-login') || document.querySelector('#loginForm');
    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const emailEl = form.querySelector('#email') || form.querySelector('input[type="email"]');
        const passEl = form.querySelector('#password') || form.querySelector('input[type="password"]');
        const email = emailEl ? emailEl.value.trim() : '';
        const password = passEl ? passEl.value.trim() : '';
        if (!email || !password) {
          alert('Completá email y contraseña');
          return;
        }
        // Aquí podrías validar formato del email si querés
        loginUser(email);
      });
    }

    // 2) Conectar logout si existe cualquier elemento con attribute data-logout
    document.querySelectorAll('[data-logout]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        logoutUser();
      });
    });
  });

  // Exponer funciones globalmente por si las necesitás en consola o en otros scripts
  window.maluccaAuth = {
    loginUser,
    logoutUser,
    requireAuth
  };
})();
