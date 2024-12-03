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
    loginButton.style.display = "none";

    document.getElementById("logoutBtn").addEventListener("click", logout);
  }

  // Restaurar o carrinho da memória local
  restaurarCarrinho();

  // Atualizar o botão do carrinho
  const carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
  const carrinhoBtn = document.getElementById("carrinhoBtn");
  carrinhoBtn.textContent = `Carrinho (${carrinho.length})`;
});


function login() {
  window.location.href = "login.html"; // Redirect to login page
}

function logout() {
  localStorage.removeItem("userName"); // Remove user data from localStorage
  window.location.href = "index.html"; // Redirect to home page
}

function verificarLogin() {
  const usuarioLogado = localStorage.getItem("userName");
  if (!usuarioLogado) {
    alert("Você precisa estar logado para acessar esta página.");
    window.location.href = "login.html"; // Redirecionar para a página de login
  }
}


// CARRINHO

let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
let total = carrinho.reduce((acc, item) => acc + item.preco * item.quantidade, 0);

// Função para adicionar um produto ao carrinho
function adicionarAoCarrinho(nome, preco, imagem) {
  const carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
  carrinho.push({ nome, preco, imagem });

  localStorage.setItem("carrinho", JSON.stringify(carrinho));
  restaurarCarrinho();

  const carrinhoBtn = document.getElementById("carrinhoBtn");
  carrinhoBtn.textContent = `Carrinho (${carrinho.length})`; // Atualiza o contador
}


// Função para salvar o carrinho no localStorage
function salvarCarrinho() {
  localStorage.setItem("carrinho", JSON.stringify(carrinho));
}

// Função para restaurar o carrinho do localStorage
function restaurarCarrinho() {
  const carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
  const carrinhoLista = document.getElementById("carrinhoLista");
  const totalCarrinho = document.getElementById("totalCarrinho");

  carrinhoLista.innerHTML = ""; // Limpa a lista para evitar duplicação
  let total = 0;

  carrinho.forEach(item => {
    const li = document.createElement("li");
    li.classList.add("list-group-item");
    li.innerHTML = `
      <div class="d-flex justify-content-between">
        <span>${item.nome}</span>
        <span>R$ ${item.preco.toFixed(2)}</span>
      </div>
    `;
    carrinhoLista.appendChild(li);
    total += item.preco;
  });

  totalCarrinho.textContent = total.toFixed(2);
}


// Função para atualizar a lista do carrinho
function atualizarCarrinho() {
  const carrinhoLista = document.getElementById('carrinhoLista');
  if (!carrinhoLista) return; // Garantir que o elemento exista antes de usar
  carrinhoLista.innerHTML = ''; // Limpar lista

  carrinho.forEach(item => {
    const itemCarrinho = document.createElement('li');
    itemCarrinho.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');

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

// Função para alterar a quantidade de um item no carrinho
function alterarQuantidade(nomeProduto, quantidade) {
  const item = carrinho.find(item => item.nome === nomeProduto);
  if (item) {
    item.quantidade += quantidade;
    if (item.quantidade <= 0) {
      carrinho = carrinho.filter(item => item.nome !== nomeProduto); // Remover item se quantidade for 0 ou negativa
    }
    total = carrinho.reduce((acc, item) => acc + item.preco * item.quantidade, 0);
    salvarCarrinho();
    atualizarCarrinho();
    atualizarQuantidadeCarrinho();
  }
}

// Função para remover um item do carrinho
function removerItem(nomeProduto) {
  carrinho = carrinho.filter(item => item.nome !== nomeProduto);
  total = carrinho.reduce((acc, item) => acc + item.preco * item.quantidade, 0);
  salvarCarrinho();
  atualizarCarrinho();
  atualizarQuantidadeCarrinho();
}

// Função para finalizar a compra
function finalizarCompra() {
  const carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
  if (carrinho.length === 0) {
    alert("Seu carrinho está vazio.");
    return;
  }

  alert("Compra finalizada com sucesso! Obrigado pela preferência.");
  localStorage.removeItem("carrinho"); // Limpa o carrinho
  restaurarCarrinho(); // Atualiza o modal do carrinho
  const carrinhoBtn = document.getElementById("carrinhoBtn");
  carrinhoBtn.textContent = "Carrinho (0)"; // Reseta o contador
}


// Função para atualizar a quantidade do carrinho no botão
function atualizarQuantidadeCarrinho() {
  const quantidadeCarrinho = carrinho.reduce((acc, item) => acc + item.quantidade, 0);
  const carrinhoBtn = document.getElementById('carrinhoBtn');
  if (carrinhoBtn) {
    carrinhoBtn.textContent = `Carrinho (${quantidadeCarrinho})`;
  }
}

async function buscarEndereco() {
  const cep = document.getElementById("cep").value;
  if (cep.length === 8) {
    try {
      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      if (!response.ok) throw new Error("Erro ao buscar endereço");
      const data = await response.json();

      document.getElementById("rua").value = data.logradouro || "";
      document.getElementById("bairro").value = data.bairro || "";
      document.getElementById("cidade").value = data.localidade || "";
      document.getElementById("estado").value = data.uf || "";
    } catch (error) {
      alert("Erro ao buscar endereço. Verifique o CEP digitado.");
    }
  }
}

// Função para limpar os campos de endereço
function limparCampos() {
  document.getElementById('rua').value = '';
  document.getElementById('bairro').value = '';
  document.getElementById('cidade').value = '';
  document.getElementById('estado').value = '';
}

document.querySelector("form").addEventListener("submit", (e) => {
  const nome = document.getElementById("nome").value.trim();
  const email = document.getElementById("email").value.trim();
  const mensagem = document.getElementById("mensagem").value.trim();

  if (!nome || !email || !mensagem) {
    alert("Por favor, preencha todos os campos.");
    e.preventDefault(); // Evita o envio do formulário
  } else if (!/^\S+@\S+\.\S+$/.test(email)) {
    alert("Por favor, insira um e-mail válido.");
    e.preventDefault();
  }
});

function irParaCheckout() {
  const carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
  if (carrinho.length === 0) {
    alert("Seu carrinho está vazio. Adicione itens antes de continuar.");
    return;
  }

  // Redireciona para a página de checkout
  window.location.href = "checkout.html";
}
