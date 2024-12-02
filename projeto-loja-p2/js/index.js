// Script to handle login and logout
window.addEventListener("DOMContentLoaded", () => {
  const userName = localStorage.getItem("userName");
  const navBar = document.querySelector(".navbar .container-fluid");
  const loginButton = document.getElementById("loginBtn");

  if (userName) {
    const userDisplay = document.createElement("div");
    userDisplay.classList.add("d-flex", "align-items-center", "ms-auto");
    userDisplay.innerHTML = `
      <span class="text-white">Bem-vindo, ${userName}</span>
      <button class="btn btn-danger ms-3" id="logoutBtn">Deslogar</button>
    `;

    navBar.appendChild(userDisplay);
    loginButton.style.display = "none"; // Hide login button

    // Logout functionality
    document.getElementById("logoutBtn").addEventListener("click", logout);
  }
});

function login() {
  window.location.href = "login.html"; // Redirect to login page
}

function logout() {
  localStorage.removeItem("userName"); // Remove user data from localStorage
  window.location.href = "index.html"; // Redirect to home page
}

// CARRINHO

let carrinho = [];
let total = 0;

function adicionarAoCarrinho(nomeProduto, preco, imagem) {
  // Verificar se o produto já está no carrinho
  const itemExistente = carrinho.find(item => item.nome === nomeProduto);
  if (itemExistente) {
    itemExistente.quantidade += 1; // Aumentar a quantidade
  } else {
    carrinho.push({ nome: nomeProduto, preco: preco, imagem: imagem, quantidade: 1 });
  }
  total += preco;
  atualizarCarrinho();
  atualizarQuantidadeCarrinho();
}

function atualizarCarrinho() {
  const carrinhoLista = document.getElementById('carrinhoLista');
  carrinhoLista.innerHTML = ''; // Limpar lista

  carrinho.forEach(item => {
    const itemCarrinho = document.createElement('li');
    itemCarrinho.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');

    // Adicionar conteúdo do item
    itemCarrinho.innerHTML = `
      <img src="${item.imagem}" alt="${item.nome}" style="width: 50px; height: 50px; object-fit: cover;" class="me-3">
      <span>${item.nome}</span>
      <div class="d-flex align-items-center">
        <button class="btn btn-sm btn-danger me-2" onclick="removerItem('${item.nome}')">Remover</button>
        <button class="btn btn-sm btn-secondary" onclick="alterarQuantidade('${item.nome}', -1)">-</button>
        <span class="mx-2">${item.quantidade}</span>
        <button class="btn btn-sm btn-secondary" onclick="alterarQuantidade('${item.nome}', 1)">+</button>
      </div>
      <span>R$ ${(item.preco * item.quantidade).toFixed(2)}</span>
    `;

    carrinhoLista.appendChild(itemCarrinho);
  });

  document.getElementById('totalCarrinho').textContent = total.toFixed(2);
}

function alterarQuantidade(nomeProduto, quantidade) {
  const item = carrinho.find(item => item.nome === nomeProduto);
  if (item) {
    item.quantidade += quantidade;
    if (item.quantidade <= 0) {
      carrinho = carrinho.filter(item => item.nome !== nomeProduto); // Remover item se quantidade for 0 ou negativa
    }
    total = carrinho.reduce((acc, item) => acc + item.preco * item.quantidade, 0);
    atualizarCarrinho();
    atualizarQuantidadeCarrinho();
  }
}

function removerItem(nomeProduto) {
  carrinho = carrinho.filter(item => item.nome !== nomeProduto);
  total = carrinho.reduce((acc, item) => acc + item.preco * item.quantidade, 0);
  atualizarCarrinho();
  atualizarQuantidadeCarrinho();
}

function finalizarCompra() {
  // Limpar o carrinho e exibir uma mensagem de finalização
  carrinho = [];
  total = 0;
  atualizarCarrinho();
  atualizarQuantidadeCarrinho();
  alert('Compra finalizada com sucesso!');
}

function atualizarQuantidadeCarrinho() {
  const quantidadeCarrinho = carrinho.reduce((acc, item) => acc + item.quantidade, 0);
  document.getElementById('carrinhoBtn').textContent = `Carrinho (${quantidadeCarrinho})`;
}