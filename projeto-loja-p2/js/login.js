const validEmail = "amanda@fatec.com";
const validPassword = "frank";

document.getElementById("loginForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const error = document.getElementById("loginError");

  if (email === validEmail && password === validPassword) {
    window.location.href = "produto.html";
  } else {
    error.classList.remove("d-none");
  }
});