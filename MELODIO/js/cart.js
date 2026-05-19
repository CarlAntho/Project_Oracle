// Shopping Cart Management
let cart = [];

// Initialize cart from localStorage
function initCart() {
    const stored = localStorage.getItem('cart');
    if (stored) {
        cart = JSON.parse(stored);
    }
}

// Add to cart
function addToCart(product) {
    const existingItem = cart.find(item => item.id === product.id);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }
    
    saveCart();
    updateCartCount();
    alert(`${product.name} added to cart!`);
}

// Remove from cart
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    saveCart();
    renderCart();
    updateCartCount();
}

// Update cart item quantity
function updateCartQuantity(productId, quantity) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        if (quantity <= 0) {
            removeFromCart(productId);
        } else {
            item.quantity = quantity;
            saveCart();
            renderCart();
            updateCartCount();
        }
    }
}

// Clear cart
function clearCart() {
    if (confirm('Are you sure you want to clear the cart?')) {
        cart = [];
        saveCart();
        renderCart();
        updateCartCount();
    }
}

// Save cart to localStorage
function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Get cart total
function getCartTotal() {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
}

// Get cart item count
function getCartCount() {
    return cart.reduce((count, item) => count + item.quantity, 0);
}

// Update cart count display
function updateCartCount() {
    document.getElementById('cart-count').textContent = getCartCount();
}

// Render cart items
function renderCart() {
    const cartItemsContainer = document.getElementById('cart-items');
    const cartSummaryContainer = document.getElementById('cart-summary');
    
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = `
            <div class="cart-empty">
                <p>Your cart is empty</p>
                <button class="btn-primary" onclick="showSection('shop')">Continue Shopping</button>
            </div>
        `;
        cartSummaryContainer.innerHTML = '';
        return;
    }

    let html = '';
    cart.forEach(item => {
        html += `
            <div class="cart-item">
                <div class="cart-item-image">
                    <img src="${item.image}" alt="${item.name}">
                </div>
                <div class="cart-item-details">
                    <h4>${item.name}</h4>
                    <p class="product-category">${item.category}</p>
                    <p class="product-price">$${item.price.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</p>
                </div>
                <div class="cart-item-controls">
                    <p class="cart-item-price">$${(item.price * item.quantity).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</p>
                    <div style="display: flex; gap: 10px; align-items: center;">
                        <input type="number" min="1" value="${item.quantity}" onchange="updateCartQuantity(${item.id}, this.value)" style="width: 60px; padding: 5px;">
                        <button class="btn-danger" style="padding: 5px 10px;" onclick="removeFromCart(${item.id})">Remove</button>
                    </div>
                </div>
            </div>
        `;
    });

    cartItemsContainer.innerHTML = html;

    // Render cart summary
    const subtotal = getCartTotal();
    const tax = subtotal * 0.1;
    const total = subtotal + tax;

    cartSummaryContainer.innerHTML = `
        <h3>Order Summary</h3>
        <div class="summary-row">
            <span>Subtotal:</span>
            <span>$${subtotal.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</span>
        </div>
        <div class="summary-row">
            <span>Shipping:</span>
            <span>Free</span>
        </div>
        <div class="summary-row">
            <span>Tax (10%):</span>
            <span>$${tax.toFixed(2)}</span>
        </div>
        <div class="summary-row total">
            <span>Total:</span>
            <span>$${total.toFixed(2)}</span>
        </div>
        <button class="btn-primary btn-lg" onclick="proceedToCheckout()" style="width: 100%; margin-top: 20px;">Proceed to Checkout</button>
        <button class="btn-secondary" onclick="clearCart()" style="width: 100%; margin-top: 10px;">Clear Cart</button>
    `;
}

// Proceed to checkout
function proceedToCheckout() {
    if (!currentUser) {
        alert('Please login to proceed with checkout');
        showSection('login');
        return;
    }

    if (cart.length === 0) {
        alert('Your cart is empty');
        return;
    }

    renderCheckout();
    showSection('checkout');
}

// Render checkout summary
function renderCheckout() {
    const checkoutSummaryContainer = document.getElementById('checkout-summary');
    const subtotal = getCartTotal();
    const tax = subtotal * 0.1;
    const total = subtotal + tax;

    let html = '<h3>Order Summary</h3>';
    cart.forEach(item => {
        html += `
            <div class="checkout-item">
                <span>${item.name} x ${item.quantity}</span>
                <span>$${(item.price * item.quantity).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</span>
            </div>
        `;
    });

    html += `
        <div class="summary-row total" style="margin-top: 15px;">
            <span>Subtotal:</span>
            <span>$${subtotal.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</span>
        </div>
        <div class="summary-row">
            <span>Shipping:</span>
            <span>Free</span>
        </div>
        <div class="summary-row">
            <span>Tax (10%):</span>
            <span>$${tax.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</span>
        </div>
        <div class="summary-row total">
            <span>Total:</span>
            <span>$${total.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</span>
        </div>
    `;

    checkoutSummaryContainer.innerHTML = html;
}

// Handle checkout form submission
document.addEventListener('DOMContentLoaded', function() {
    const checkoutForm = document.getElementById('checkout-form');
    if (checkoutForm) {
        checkoutForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const order = {
                id: Date.now(),
                date: new Date().toLocaleDateString(),
                items: cart,
                total: getCartTotal() * 1.1,
                shipping: {
                    fullname: document.getElementById('fullname').value,
                    email: document.getElementById('email').value,
                    phone: document.getElementById('phone').value,
                    address: document.getElementById('address').value,
                    city: document.getElementById('city').value,
                    state: document.getElementById('state').value,
                    zipcode: document.getElementById('zipcode').value,
                    country: document.getElementById('country').value
                }
            };

            // Update user's orders
            if (currentUser) {
                if (!currentUser.orders) currentUser.orders = [];
                currentUser.orders.push({
                    id: order.id,
                    date: order.date,
                    total: order.total
                });
                localStorage.setItem('currentUser', JSON.stringify(currentUser));
            }

            // Save order to localStorage
            let orders = JSON.parse(localStorage.getItem('orders') || '[]');
            orders.push(order);
            localStorage.setItem('orders', JSON.stringify(orders));

            // Show confirmation
            displayOrderConfirmation(order);
            
            // Clear cart
            cart = [];
            saveCart();
            updateCartCount();
        });
    }

    initCart();
    updateCartCount();
});

// Display order confirmation
function displayOrderConfirmation(order) {
    const confirmationDiv = document.getElementById('confirmation-details');
    let html = '<p><strong>Order Number:</strong> ' + order.id + '</p>';
    html += '<p><strong>Date:</strong> ' + order.date + '</p>';
    html += '<p><strong>Name:</strong> ' + order.shipping.fullname + '</p>';
    html += '<p><strong>Email:</strong> ' + order.shipping.email + '</p>';
    html += '<p><strong>Address:</strong> ' + order.shipping.address + ', ' + order.shipping.city + ', ' + order.shipping.state + ' ' + order.shipping.zipcode + '</p>';
    html += '<p><strong>Total Amount:</strong> $' + order.total.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2}) + '</p>';
    confirmationDiv.innerHTML = html;

    document.getElementById('order-number').textContent = 'Order #' + order.id;
    showSection('order-confirmation');
}
