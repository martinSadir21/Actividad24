// base de datos con los usuarios
const baseDeDatos = {
  usuarios: [
    { id: 1, name: "Steve Jobs", email: "steve@jobs.com", password: "Steve123" },
    { id: 2, name: "Ervin Howell", email: "shanna@melissa.tv", password: "Ervin345" },
    { id: 3, name: "Clementine Bauch", email: "nathan@yesenia.net", password: "Floppy39876" },
    { id: 4, name: "Patricia Lebsack", email: "julianne.oconner@kory.org", password: "MysuperPassword345" },
  ],
};

// agarro los elementos del html
const emailInput = document.querySelector("#email-input");
const passInput = document.querySelector("#password-input");
const loginBtn = document.querySelector(".login-btn");
const loader = document.querySelector("#loader");
const errorBox = document.querySelector("#error-container");
const form = document.querySelector("form");
const main = document.querySelector("main");

// validar que el email tenga pinta de mail
function esEmailValido(valor) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(valor);
}

// simular demora como si fuese el server
function esperar(ms) {
  return new Promise((res) => setTimeout(res, ms));
}

// buscar usuario en la "base de datos"
function buscarUsuario(email, pass) {
  return baseDeDatos.usuarios.find(
    (u) => u.email === email && u.password === pass
  );
}

// cuando se hace click en el botón
loginBtn.addEventListener("click", async () => {
  // limpio mensajes viejos
  errorBox.textContent = "";
  errorBox.classList.add("hidden");

  const email = emailInput.value.trim();
  const pass = passInput.value;

  // validar inputs
  if (!esEmailValido(email) || pass.length < 5) {
    errorBox.textContent = "Alguno de los datos ingresados son incorrectos";
    errorBox.classList.remove("hidden");
    return;
  }

  // muestro el loader
  loader.classList.remove("hidden");
  loginBtn.disabled = true;

  // espero 3 seg
  await esperar(3000);

  // chequeo si existe
  const user = buscarUsuario(email, pass);

  if (!user) {
    errorBox.textContent = "Alguno de los datos ingresados son incorrectos";
    errorBox.classList.remove("hidden");
    loader.classList.add("hidden");
    loginBtn.disabled = false;
    return;
  }

  // si entra, saco el form y muestro bienvenida
  main.innerHTML = `<h1>Bienvenido al sitio 😀</h1><p>Hola ${user.name}</p>`;
});
