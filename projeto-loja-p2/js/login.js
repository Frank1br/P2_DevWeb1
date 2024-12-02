const validEmail = "amanda@fatec.com";
const validPassword = "frank";
const userName = "Amanda"; // Nome do usuário associado ao email

document.getElementById("loginForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const error = document.getElementById("loginError");

  if (email === validEmail && password === validPassword) {
    // Armazena o nome do usuário no localStorage
    localStorage.setItem("userName", userName);
    // Redireciona para a página de produtos
    window.location.href = "index.html";
  } else {
    error.classList.remove("d-none");
  }
});
