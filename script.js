// Variáveis globais
let cart = [];
let selectedDeliveryOption = 'retirada';

// Elementos DOM
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar produtos
    displayProducts();
    
    // Configurar eventos
    setupEventListeners();
    
    // Verificar carrinho no localStorage
    loadCartFromLocalStorage();
    
    // Atualizar contagem do carrinho
    updateCartCount();
});

// Exibir produtos na página
function displayProducts() {
    const featuredProductsContainer = document.getElementById('featured-products');
    const allProductsContainer = document.getElementById('all-products');
    
    // Limpar containers
    featuredProductsContainer.innerHTML = '';
    allProductsContainer.innerHTML = '';
    
    // Exibir produtos em destaque
    const featuredProducts = products.filter(product => product.featured);
    featuredProducts.forEach(product => {
        featuredProductsContainer.appendChild(createProductCard(product));
    });
    
    // Exibir todos os produtos
    products.forEach(product => {
        allProductsContainer.appendChild(createProductCard(product));
    });
}

// Criar card de produto
function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';
    
    // Usar imagem padrão se a imagem do produto não estiver disponível
    const imageSrc = product.image || 'images/logo.png';
    
    card.innerHTML = `
        <div class="product-image">
            <img src="${imageSrc}" alt="${product.name}" onerror="this.src='images/logo.png'">
            <div class="product-category">${product.category}</div>
        </div>
        <div class="product-info">
            <h3 class="product-title">${product.name}</h3>
            <p class="product-description">${product.description}</p>
            <div class="product-footer">
                <span class="product-price">R$ ${product.price.toFixed(2)}</span>
                <button class="add-to-cart" data-id="${product.id}">Adicionar</button>
            </div>
        </div>
    `;
    
    return card;
}

// Configurar event listeners
function setupEventListeners() {
    // Abrir carrinho
    document.getElementById('cart-icon').addEventListener('click', openCart);
    
    // Fechar carrinho
    document.getElementById('close-cart').addEventListener('click', closeCart);
    
    // Adicionar ao carrinho (delegação de eventos)
    document.addEventListener('click', function(event) {
        if (event.target.classList.contains('add-to-cart')) {
            const productId = parseInt(event.target.getAttribute('data-id'));
            addToCart(productId);
        }
    });
    
    // Opções de entrega
    const deliveryOptions = document.querySelectorAll('input[name="delivery"]');
    deliveryOptions.forEach(option => {
        option.addEventListener('change', function() {
            selectedDeliveryOption = this.value;
        });
    });
    
    // Finalizar pedido
    document.getElementById('checkout-btn').addEventListener('click', finishOrder);
    
    // Menu mobile (toggle)
    const menuMobile = document.querySelector('.menu-mobile');
    if (menuMobile) {
        menuMobile.addEventListener('click', function() {
            const menu = document.querySelector('.menu');
            menu.classList.toggle('active');
        });
    }
}

// Abrir carrinho
function openCart() {
    document.getElementById('cart-overlay').classList.add('active');
    updateCartDisplay();
}

// Fechar carrinho
function closeCart() {
    document.getElementById('cart-overlay').classList.remove('active');
}

// Adicionar produto ao carrinho
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    
    if (!product) return;
    
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }
    
    // Salvar carrinho no localStorage
    saveCartToLocalStorage();
    
    // Atualizar contagem do carrinho
    updateCartCount();
    
    // Mostrar feedback visual
    showAddToCartFeedback(product.name);
}

// Remover produto do carrinho
function removeFromCart(productId) {
    const existingItemIndex = cart.findIndex(item => item.id === productId);
    
    if (existingItemIndex !== -1) {
        if (cart[existingItemIndex].quantity === 1) {
            cart.splice(existingItemIndex, 1);
        } else {
            cart[existingItemIndex].quantity -= 1;
        }
        
        // Salvar carrinho no localStorage
        saveCartToLocalStorage();
        
        // Atualizar contagem do carrinho
        updateCartCount();
        
        // Atualizar exibição do carrinho
        updateCartDisplay();
    }
}

// Atualizar contagem do carrinho
function updateCartCount() {
    const cartCount = document.querySelector('.cart-count');
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    
    cartCount.textContent = totalItems;
    
    // Mostrar/esconder elementos do carrinho baseado no estado
    const cartEmpty = document.getElementById('cart-empty');
    const cartFooter = document.getElementById('cart-footer');
    
    if (totalItems === 0) {
        cartEmpty.style.display = 'block';
        cartFooter.style.display = 'none';
    } else {
        cartEmpty.style.display = 'none';
        cartFooter.style.display = 'block';
    }
}

// Atualizar exibição do carrinho
function updateCartDisplay() {
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotalElement = document.getElementById('cart-total');
    
    // Limpar container
    cartItemsContainer.innerHTML = '';
    
    // Adicionar itens do carrinho
    cart.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        
        cartItem.innerHTML = `
            <div class="cart-item-info">
                <h4 class="cart-item-title">${item.name}</h4>
                <p class="cart-item-price">R$ ${item.price.toFixed(2)}</p>
            </div>
            <div class="cart-item-controls">
                <button class="quantity-btn decrease-btn" data-id="${item.id}">-</button>
                <span class="item-quantity">${item.quantity}</span>
                <button class="quantity-btn increase-btn" data-id="${item.id}">+</button>
            </div>
        `;
        
        cartItemsContainer.appendChild(cartItem);
    });
    
    // Adicionar event listeners para os botões de quantidade
    const decreaseButtons = document.querySelectorAll('.decrease-btn');
    const increaseButtons = document.querySelectorAll('.increase-btn');
    
    decreaseButtons.forEach(button => {
        button.addEventListener('click', function() {
            const productId = parseInt(this.getAttribute('data-id'));
            removeFromCart(productId);
        });
    });
    
    increaseButtons.forEach(button => {
        button.addEventListener('click', function() {
            const productId = parseInt(this.getAttribute('data-id'));
            addToCart(productId);
        });
    });
    
    // Atualizar total
    const total = calculateTotal();
    cartTotalElement.textContent = `R$ ${total.toFixed(2)}`;
}

// Calcular total do carrinho
function calculateTotal() {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
}

// Finalizar pedido via WhatsApp
function finishOrder() {
    const phoneNumber = '5511962774367'; // Número de exemplo
    
    // Construir mensagem com detalhes do pedido
    let message = 'Olá! Gostaria de fazer um pedido:\n\n';
    
    cart.forEach(item => {
        message += `${item.quantity}x ${item.name} - R$ ${(item.price * item.quantity).toFixed(2)}\n`;
    });
    
    message += `\nTotal: R$ ${calculateTotal().toFixed(2)}`;
    message += `\nForma de entrega: ${getDeliveryOptionText(selectedDeliveryOption)}`;
    
    // Codificar a mensagem para URL
    const encodedMessage = encodeURIComponent(message);
    
    // Abrir WhatsApp com a mensagem
    window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, '_blank');
    
    // Limpar carrinho após finalizar pedido
    clearCart();
}

// Obter texto da opção de entrega
function getDeliveryOptionText(option) {
    switch(option) {
        case 'retirada':
            return 'Retirada na loja';
        case 'uber':
            return 'Uber Moto';
        case '99':
            return '99 Entrega';
        default:
            return option;
    }
}

// Salvar carrinho no localStorage
function saveCartToLocalStorage() {
    localStorage.setItem('cuquieCart', JSON.stringify(cart));
}

// Carregar carrinho do localStorage
function loadCartFromLocalStorage() {
    const savedCart = localStorage.getItem('cuquieCart');
    
    if (savedCart) {
        cart = JSON.parse(savedCart);
    }
}

// Limpar carrinho
function clearCart() {
    cart = [];
    saveCartToLocalStorage();
    updateCartCount();
    closeCart();
}

// Mostrar feedback visual ao adicionar produto
function showAddToCartFeedback(productName) {
    // Criar elemento de feedback
    const feedback = document.createElement('div');
    feedback.className = 'add-to-cart-feedback';
    feedback.textContent = `${productName} adicionado ao carrinho!`;
    
    // Adicionar ao body
    document.body.appendChild(feedback);
    
    // Remover após animação
    setTimeout(() => {
        feedback.classList.add('show');
        
        setTimeout(() => {
            feedback.classList.remove('show');
            
            setTimeout(() => {
                document.body.removeChild(feedback);
            }, 300);
        }, 2000);
    }, 10);
}
