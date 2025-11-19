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
    const user = { email: email };
    sessionStorage.setItem('currentUser', JSON.stringify(user));
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

    const user = {
      name: nameInput.value.trim(),
      lastName: lastNameInput.value.trim(),
      email: emailInput.value.trim(),
      birthDate: dateInput.value.trim()
    };
    localStorage.setItem('lastRegisteredUser', JSON.stringify(user));

    alert('Registro exitoso. Ahora podés iniciar sesión.');
    window.location.href = './login.html';
  });
}
document.addEventListener('click', function (event) {
  const target = event.target;

  if (target && target.id === 'logout-button') {
    event.preventDefault();
    sessionStorage.removeItem('currentUser');
    window.location.href = '/pages/login.html';
  }
});

function requireAuth() {
  const userStr = sessionStorage.getItem('currentUser');
  if (!userStr) {
    window.location.href = '/pages/login.html';
  }
}
window.requireAuth = requireAuth;


