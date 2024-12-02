// Função para adicionar ao carrinho
function addToCart(productName, productPrice) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const product = {
      name: productName,
      price: productPrice,
      quantity: 1
    };
  
    // Verifica se o produto já está no carrinho
    const existingProductIndex = cart.findIndex(item => item.name === productName);
    if (existingProductIndex > -1) {
      cart[existingProductIndex].quantity += 1;
    } else {
      cart.push(product);
    }
  
    // Salva o carrinho no localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
    alert(`${productName} foi adicionado ao carrinho.`);
  }
  
  // Exibe o nome do usuário e o ícone na NavBar, além do botão de logout
  window.addEventListener("DOMContentLoaded", () => {
    const userName = localStorage.getItem("userName");
  
    const navBar = document.querySelector(".navbar .container-fluid");
    const loginButton = document.querySelector(".navbar .btn-danger");  // Seleciona o botão de login
  
    if (userName) {
      // Exibe o nome do usuário e o ícone
      const userDisplay = document.createElement("div");
      userDisplay.classList.add("d-flex", "align-items-center", "ms-auto");
  
      userDisplay.innerHTML = `
        <span class="text-white">Bem-vindo, ${userName}</span>
        <button class="btn btn-danger ms-3" id="logoutBtn">Deslogar</button>
      `;
  
      navBar.appendChild(userDisplay);
  
      // Esconde o botão de login
      loginButton.style.display = "none";
  
      // Adiciona o evento de logout
      document.getElementById("logoutBtn").addEventListener("click", logout);
    }
  });
  
  // Função de login
  function login() {
    localStorage.removeItem("userName"); // Remove o nome do usuário do localStorage
    window.location.href = "login.html"; // Redireciona para a página de login
  }
  function logout() {
    localStorage.removeItem("userName"); // Remove o nome do usuário do localStorage
    window.location.href = "index.html"; // Redireciona para a página de login
  }
  