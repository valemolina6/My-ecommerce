// js/auth.js

document.addEventListener('DOMContentLoaded', function () {
  // 1) LOGIN
  const loginForm = document.getElementById('login-form');

  if (loginForm) {
    loginForm.addEventListener('submit', function (event) {
      event.preventDefault(); // evita que la página se recargue

      const emailInput = document.getElementById('email');
      const passwordInput = document.getElementById('password');

      if (
        !emailInput.value.trim() ||
        !passwordInput.value.trim()
      ) {
        alert('Por favor, completá correo y contraseña.');
        return;
      }

      // Si todo está completo, "logueamos" y vamos a la home
      window.location.href = '../index.html';
    });
  }

  // 2) REGISTRO
  const registerForm = document.getElementById('register-form');

  if (registerForm) {
    registerForm.addEventListener('submit', function (event) {
      event.preventDefault(); // evitamos recargar la página

      const nombre = document.getElementById('nombre');
      const apellido = document.getElementById('apellido');
      const email = document.getElementById('email');
      const fecha = document.getElementById('fecha');
      const password = document.getElementById('password');

      if (
        !nombre.value.trim() ||
        !apellido.value.trim() ||
        !email.value.trim() ||
        !fecha.value ||
        !password.value.trim()
      ) {
        alert('Por favor, completá todos los campos.');
        return;
      }

      // Acá podrías guardar datos en localStorage si quisieras (no es obligatorio para la consigna)

      alert('Registro exitoso. Ahora podés iniciar sesión.');
      // Desde /pages/registro.html vamos a /pages/login.html
      window.location.href = './login.html';
    });
  }

  // 3) LOGOUT (si tenés un botón con id="logout-button")
  const logoutButton = document.getElementById('logout-button');

  if (logoutButton) {
    logoutButton.addEventListener('click', function () {
      // Volvemos al login
      window.location.href = './login.html';
    });
  }
});

