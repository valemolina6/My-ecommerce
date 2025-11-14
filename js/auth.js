
document.addEventListener('DOMContentLoaded', function () {
const loginForm = document.getElementById('login-form');

  if (loginForm) {
    loginForm.addEventListener('submit', function (event) {
      event.preventDefault();
      const emailInput = document.getElementById('email');
      const passwordInput = document.getElementById('password');

      if (
        !emailInput.value.trim() ||
        !passwordInput.value.trim()
      ) {
        alert('Por favor, completá correo y contraseña.');
        return;
      }
      window.location.href = '../index.html';
    });
  }
const registerForm = document.getElementById('register-form');

  if (registerForm) {
    registerForm.addEventListener('submit', function (event) {
      event.preventDefault(); 

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
      alert('Registro exitoso. Ahora podés iniciar sesión.');
      window.location.href = './login.html';
    });
  }
  const logoutButton = document.getElementById('logout-button');
  if (logoutButton) {
    logoutButton.addEventListener('click', function () {
      window.location.href = './login.html';
    });
  }
});

