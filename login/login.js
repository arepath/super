const selectElement = document.getElementById('error');
selectElement.style.display = 'none';

function login() {
  const id = document.getElementById('username').value;
  const pass = document.getElementById('password').value;
  window.electronAPI.login({ id: id, pass: pass });
}

function logout() {
  document.getElementById('loginForm').style.display = 'block';
  document.getElementById('dashboard').style.display = 'none';
}

window.electronAPI.onLoginFallido((dataFromEvent) => {
  const selectElement = document.getElementById('error');
  selectElement.textContent = dataFromEvent;
  selectElement.style.display = 'block';
});