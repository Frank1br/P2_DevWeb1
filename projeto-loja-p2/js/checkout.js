// Exibe os produtos no checkout
function exibirProdutosCarrinho() {
  const carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
  const listaProdutos = document.getElementById("produtos-lista").querySelector("ul");
  const totalPedido = document.getElementById("total-pedido");

  let total = 0;

  carrinho.forEach(produto => {
    const item = document.createElement("li");
    item.classList.add("list-group-item", "d-flex", "justify-content-between");

    item.innerHTML = `
      <div class="d-flex">
        <img src="${produto.imagem}" alt="${produto.nome}" class="produto-imagem me-3">
        <div>
          <strong>${produto.nome}</strong>
          <p>${produto.descricao}</p>
        </div>
      </div>
      <span>R$ ${produto.preco.toFixed(2)} x ${produto.quantidade}</span>
    `;

    listaProdutos.appendChild(item);

    total += produto.preco * produto.quantidade;
  });

  totalPedido.textContent = total.toFixed(2);
}

// Exibe as informações de endereço e forma de pagamento
function exibirInformacoesPedido() {
  const endereco = localStorage.getItem("endereco");
  const pagamento = localStorage.getItem("pagamento");

  document.getElementById("endereco-entrega").textContent = endereco || "Não informado";
  document.getElementById("forma-pagamento").textContent = pagamento || "Não informado";
}

// Função que chama o redirecionamento para a página de produtos
function voltarParaProdutos() {
  window.location.href = "index.html";
}

// Função para inicializar a página de checkout
function inicializarCheckout() {
  exibirProdutosCarrinho();
  exibirInformacoesPedido();
}

// Inicia o checkout
inicializarCheckout();