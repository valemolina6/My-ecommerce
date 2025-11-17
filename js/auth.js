const loginForm = document.getElementById('login-form');

if (loginForm) {
  loginForm.addEventListener('submit', function (event) {
    event.preventDefault();

    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');

    if (!emailInput || !passwordInput) return;

    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();

    if (!email || !password) {
      alert('Por favor, completá correo y contraseña.');
      return;
    }

    window.location.href = '/home.html';
  });
}

const registerForm = document.getElementById('register-form');

if (registerForm) {
  registerForm.addEventListener('submit', function (event) {
    event.preventDefault();

    const nameInput = document.getElementById('Nombre');
    const lastNameInput = document.getElementById('Apellido');
    const emailInput = document.getElementById('Email');
    const dateInput = document.getElementById('Fecha');
    const passwordInput = document.getElementById('Contrasena');

    if (
      !nameInput.value.trim() ||
      !lastNameInput.value.trim() ||
      !emailInput.value.trim() ||
      !dateInput.value.trim() ||
      !passwordInput.value.trim()
    ) {
      alert('Por favor, completá todos los campos del registro.');
      return;
    }

    alert('Registro exitoso. Ahora podés iniciar sesión.');
    window.location.href = './login.html';
  });
}

const logoutButton = document.getElementById('logout-button');

if (logoutButton) {
  logoutButton.addEventListener('click', function () {
    window.location.href = '/pages/login.html';
  });
}

