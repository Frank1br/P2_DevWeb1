// Função para carregar o carrinho
function loadCart() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartItemsContainer = document.getElementById('cart-items');
    const totalPriceElement = document.getElementById('total-price');
    let totalPrice = 0;

    cartItemsContainer.innerHTML = ''; // Limpar o conteúdo atual

    cart.forEach(item => {
      const itemDiv = document.createElement('div');
      itemDiv.classList.add('col-12', 'col-md-6', 'mt-4');
      itemDiv.innerHTML = `
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">${item.name}</h5>
            <p class="card-text">R$ ${item.price.toFixed(2)}</p>
            <p class="card-text">Quantidade: ${item.quantity}</p>
          </div>
        </div>
      `;
      cartItemsContainer.appendChild(itemDiv);
      totalPrice += item.price * item.quantity;
    });

    totalPriceElement.textContent = totalPrice.toFixed(2);
  }

  function checkout() {
    alert('Compra finalizada!');
    localStorage.removeItem('cart');
    loadCart(); // Atualiza a página após o checkout
  }

  function logout() {
    window.location.href = "produto.html";
  }

  // Carregar o carrinho ao carregar a página
  loadCart();