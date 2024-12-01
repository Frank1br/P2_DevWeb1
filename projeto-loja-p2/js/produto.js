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

  function logout() {
    window.location.href = "index.html";
  }