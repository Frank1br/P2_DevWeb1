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

  // Restaurar o carrinho da memória local
  restaurarCarrinho();
});

function login() {
  window.location.href = "login.html"; // Redirect to login page
}

function logout() {
  localStorage.removeItem("userName"); // Remove user data from localStorage
  window.location.href = "index.html"; // Redirect to home page
}

function verificarLogin() {
  const usuarioLogado = localStorage.getItem("usuario"); // Supondo que você armazene o usuário logado no localStorage
  if (!usuarioLogado) {
    window.location.href = "login.html"; // Redireciona para a página de login se não estiver logado
  }
}

// CARRINHO

let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
let total = carrinho.reduce((acc, item) => acc + item.preco * item.quantidade, 0);

// Função para adicionar um produto ao carrinho
function adicionarAoCarrinho(nomeProduto, preco, imagem) {
  const itemExistente = carrinho.find(item => item.nome === nomeProduto);
  if (itemExistente) {
    itemExistente.quantidade += 1; // Aumentar a quantidade
  } else {
    carrinho.push({ nome: nomeProduto, preco: preco, imagem: imagem, quantidade: 1 });
  }
  total += preco;
  salvarCarrinho();
  atualizarCarrinho();
  atualizarQuantidadeCarrinho();
}

// Função para salvar o carrinho no localStorage
function salvarCarrinho() {
  localStorage.setItem("carrinho", JSON.stringify(carrinho));
}

// Função para restaurar o carrinho do localStorage
function restaurarCarrinho() {
  atualizarCarrinho();
  atualizarQuantidadeCarrinho();
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
  carrinho = [];
  total = 0;
  salvarCarrinho();
  atualizarCarrinho();
  atualizarQuantidadeCarrinho();
  alert('Compra finalizada com sucesso!');
  window.location.href = "checkout.html";
}

// Função para atualizar a quantidade do carrinho no botão
function atualizarQuantidadeCarrinho() {
  const quantidadeCarrinho = carrinho.reduce((acc, item) => acc + item.quantidade, 0);
  const carrinhoBtn = document.getElementById('carrinhoBtn');
  if (carrinhoBtn) {
    carrinhoBtn.textContent = `Carrinho (${quantidadeCarrinho})`;
  }
}

function buscarEndereco() {
  const cep = document.getElementById('cep').value.replace(/\D/g, ''); // Limpa caracteres não numéricos
  if (cep.length === 8) {
    // Faz a requisição à API ViaCEP
    fetch(`https://viacep.com.br/ws/${cep}/json/`)
      .then(response => response.json())
      .then(data => {
        if (!data.erro) {
          // Preenche os campos com os dados recebidos
          document.getElementById('rua').value = data.logradouro;
          document.getElementById('bairro').value = data.bairro;
          document.getElementById('cidade').value = data.localidade;
          document.getElementById('estado').value = data.uf;
        } else {
          alert("CEP não encontrado.");
          limparCampos(); // Limpa os campos de endereço se o CEP não for encontrado
        }
      })
      .catch(() => {
        alert("Erro ao buscar o CEP.");
        limparCampos(); // Limpa os campos de endereço em caso de erro
      });
  } else {
    alert("Por favor, insira um CEP válido.");
    limparCampos(); // Limpa os campos de endereço se o CEP for inválido
  }
}
// Função para limpar os campos de endereço
function limparCampos() {
  document.getElementById('rua').value = '';
  document.getElementById('bairro').value = '';
  document.getElementById('cidade').value = '';
  document.getElementById('estado').value = '';
}