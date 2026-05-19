// Main App Logic

// Show/Hide sections
function showSection(sectionId) {
    // Hide all sections
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => section.classList.remove('active'));

    // Show selected section
    const section = document.getElementById(sectionId);
    if (section) {
        section.classList.add('active');

        // Render specific sections
        if (sectionId === 'shop') {
            renderProducts();
        } else if (sectionId === 'cart') {
            renderCart();
        } else if (sectionId === 'profile') {
            updateProfileUI();
        }
    }

    // Update active nav link
    updateActiveNavLink(sectionId);
    
    // Scroll to top
    window.scrollTo(0, 0);
}

// Update active navigation link
function updateActiveNavLink(sectionId) {
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => link.classList.remove('active'));
    
    // Set active link based on section
    const linkMap = {
        'home': 'a[href="#home"]',
        'shop': 'a[href="#shop"]',
        'about': 'a[href="#about"]',
        'contact': 'a[href="#contact"]',
        'cart': 'a[href="#cart"]',
        'profile': 'a[href="#profile"]',
        'admin': 'a[href="#admin"]'
    };
    
    const selector = linkMap[sectionId];
    if (selector) {
        const link = document.querySelector(selector);
        if (link) link.classList.add('active');
    }
}

// Render products on shop page
function renderProducts() {
    const products = getAllProducts();
    const grid = document.getElementById('products-grid');
    
    if (products.length === 0) {
        grid.innerHTML = '<p>No products available</p>';
        return;
    }

    let html = '';
    products.forEach(product => {
        const stockStatus = product.stock > 0 ? `<span class="product-stock in-stock">In Stock</span>` : `<span class="product-stock out-of-stock">Out of Stock</span>`;
        
        html += `
            <div class="product-card">
                <div class="product-image">
                    <img src="${product.image}" alt="${product.name}">
                </div>
                <div class="product-info">
                    <p class="product-category">${product.category}</p>
                    <h3 class="product-name">${product.name}</h3>
                    <p class="product-description">${product.description}</p>
                    <p class="product-price">₱${product.price.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</p>
                    ${stockStatus}
                    <div class="product-actions">
                        <button class="btn-primary" ${product.stock === 0 ? 'disabled' : ''} onclick="addToCart(getProductById(${product.id}))">Add to Cart</button>
                        <button class="btn-secondary" onclick="viewProductDetail(${product.id})">View Details</button>
                    </div>
                </div>
            </div>
        `;
    });

    grid.innerHTML = html;
}

// View product detail
function viewProductDetail(productId) {
    const product = getProductById(productId);
    if (!product) return;

    const detailContent = document.getElementById('product-detail-content');
    const stars = '★'.repeat(Math.round(product.rating)) + '☆'.repeat(5 - Math.round(product.rating));
    const stockStatus = product.stock > 0 ? `<span class="product-stock in-stock">✓ In Stock (${product.stock} available)</span>` : `<span class="product-stock out-of-stock">Out of Stock</span>`;
    
    let html = `
        <div class="product-detail-image">
            <img src="${product.image}" alt="${product.name}">
        </div>
        <div class="product-detail-info">
            <h2>${product.name}</h2>
            <p class="product-detail-price">$${product.price.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</p>
            <div class="product-detail-rating">${stars} (${product.rating}/5)</div>
            <p class="product-detail-description">${product.description}</p>
            
            <div class="product-detail-meta">
                <p><strong>Category:</strong> ${product.category}</p>
                <p><strong>Stock:</strong> ${product.stock}</p>
            </div>

            <div class="quantity-selector">
                <label>Quantity:</label>
                <input type="number" id="detail-quantity" min="1" max="${product.stock || 1}" value="1">
            </div>

            ${stockStatus}

            <button class="btn-primary btn-lg" ${product.stock === 0 ? 'disabled' : ''} onclick="addDetailProductToCart(${product.id})" style="margin-top: 20px; width: 100%;">Add to Cart</button>
        </div>
    `;

    detailContent.innerHTML = html;
    showSection('product-detail');
}

// Add product from detail page to cart
function addDetailProductToCart(productId) {
    const quantity = parseInt(document.getElementById('detail-quantity').value) || 1;
    const product = getProductById(productId);
    
    if (product) {
        const cartItem = { ...product, quantity };
        const existingItem = cart.find(item => item.id === product.id);
        
        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            cart.push(cartItem);
        }
        
        saveCart();
        updateCartCount();
        alert(`${quantity}x ${product.name} added to cart!`);
        showSection('shop');
    }
}

// Filter products
function filterProducts() {
    const searchQuery = document.getElementById('search-input').value;
    const category = document.getElementById('category-filter').value;

    let products = getAllProducts();

    // Apply category filter
    if (category) {
        products = products.filter(p => p.category === category);
    }

    // Apply search filter
    if (searchQuery) {
        products = products.filter(p =>
            p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            p.description.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }

    renderFilteredProducts(products);
}

// Render filtered products
function renderFilteredProducts(products) {
    const grid = document.getElementById('products-grid');
    
    if (products.length === 0) {
        grid.innerHTML = '<p style="grid-column: 1/-1; text-align: center; padding: 40px;">No products found</p>';
        return;
    }

    let html = '';
    products.forEach(product => {
        const stockStatus = product.stock > 0 ? `<span class="product-stock in-stock">In Stock</span>` : `<span class="product-stock out-of-stock">Out of Stock</span>`;
        
        html += `
            <div class="product-card">
                <div class="product-image">
                    <img src="${product.image}" alt="${product.name}">
                </div>
                <div class="product-info">
                    <p class="product-category">${product.category}</p>
                    <h3 class="product-name">${product.name}</h3>
                    <p class="product-description">${product.description}</p>
                    <p class="product-price">₱${product.price.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</p>
                    ${stockStatus}
                    <div class="product-actions">
                        <button class="btn-primary" ${product.stock === 0 ? 'disabled' : ''} onclick="addToCart(getProductById(${product.id}))">Add to Cart</button>
                        <button class="btn-secondary" onclick="viewProductDetail(${product.id})">View Details</button>
                    </div>
                </div>
            </div>
        `;
    });

    grid.innerHTML = html;
}

// Admin Functions
function switchAdminTab(tabName) {
    const tabs = document.querySelectorAll('.admin-tab-content');
    const buttons = document.querySelectorAll('.admin-tab-btn');
    
    tabs.forEach(tab => tab.classList.remove('active'));
    buttons.forEach(btn => btn.classList.remove('active'));
    
    document.getElementById(tabName).classList.add('active');
    event.target.classList.add('active');

    if (tabName === 'manage-products') {
        renderAdminProducts();
    } else if (tabName === 'orders') {
        renderAdminOrders();
    }
}

// Render admin products
function renderAdminProducts() {
    const products = getAllProducts();
    const container = document.getElementById('admin-products-list');
    
    if (products.length === 0) {
        container.innerHTML = '<p>No products</p>';
        return;
    }

    let html = '';
    products.forEach(product => {
        html += `
            <div class="admin-product-item">
                <div>
                    <p class="product-name">${product.name}</p>
                    <p>Price: $${product.price.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</p>
                </div>
                <div>
                    <p>Category: ${product.category}</p>
                    <p>Stock: ${product.stock}</p>
                </div>
                <div class="admin-actions">
                    <button class="btn-secondary" onclick="editProduct(${product.id})">Edit</button>
                    <button class="btn-danger" onclick="deleteProductAdmin(${product.id})">Delete</button>
                </div>
            </div>
        `;
    });

    container.innerHTML = html;
}

// Delete product admin
function deleteProductAdmin(id) {
    if (confirm('Are you sure you want to delete this product?')) {
        deleteProduct(id);
        renderAdminProducts();
        renderProducts();
    }
}

// Edit product (simplified)
function editProduct(id) {
    alert('Edit feature coming soon');
}

// Render admin orders
function renderAdminOrders() {
    const orders = JSON.parse(localStorage.getItem('orders') || '[]');
    const container = document.getElementById('admin-orders-list');
    
    if (orders.length === 0) {
        container.innerHTML = '<p>No orders</p>';
        return;
    }

    let html = '';
    orders.forEach(order => {
        html += `
            <div class="admin-order-item">
                <div>
                    <p><strong>Order #${order.id}</strong></p>
                    <p>${order.shipping.fullname}</p>
                </div>
                <div>
                    <p>Date: ${order.date}</p>
                    <p>Total: $${order.total.toFixed(2)}</p>
                </div>
                <div class="admin-actions">
                    <button class="btn-secondary" onclick="viewOrderDetails(${order.id})">View</button>
                </div>
            </div>
        `;
    });

    container.innerHTML = html;
}

// View order details
function viewOrderDetails(orderId) {
    const orders = JSON.parse(localStorage.getItem('orders') || '[]');
    const order = orders.find(o => o.id === orderId);
    
    if (order) {
        let details = `Order #${order.id}\n\n`;
        details += `Customer: ${order.shipping.fullname}\n`;
        details += `Email: ${order.shipping.email}\n`;
        details += `Address: ${order.shipping.address}, ${order.shipping.city}, ${order.shipping.state}\n`;
        details += `Total: $${order.total.toFixed(2)}\n\n`;
        details += 'Items:\n';
        order.items.forEach(item => {
            details += `- ${item.name} x${item.quantity} = $${(item.price * item.quantity).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}\n`;
        });
        alert(details);
    }
}

// Handle add product form
document.addEventListener('DOMContentLoaded', function() {
    const addProductForm = document.getElementById('add-product-form');
    if (addProductForm) {
        addProductForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const product = {
                id: null,
                name: document.getElementById('prod-name').value,
                category: document.getElementById('prod-category').value,
                price: parseFloat(document.getElementById('prod-price').value),
                description: document.getElementById('prod-description').value,
                image: document.getElementById('prod-image').value || 'data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 200 200%27%3E%3Crect fill=%27%23f0f0f0%27 width=%27200%27 height=%27200%27/%3E%3C/svg%3E',
                stock: parseInt(document.getElementById('prod-stock').value),
                rating: 0
            };

            addProduct(product);
            alert('Product added successfully!');
            
            // Reset form
            this.reset();
            
            // Refresh products display
            renderProducts();
            renderAdminProducts();
        });
    }

    // Initialize
    initCart();
    updateCartCount();
    showSection('home');
});

// Contact Form Handler
function submitContactForm(event) {
    event.preventDefault();
    
    const name = document.getElementById('contact-name').value;
    const email = document.getElementById('contact-email').value;
    const subject = document.getElementById('contact-subject').value;
    const message = document.getElementById('contact-message').value;
    
    // Store contact message in localStorage
    let contacts = JSON.parse(localStorage.getItem('contacts') || '[]');
    const contact = {
        id: Date.now(),
        name,
        email,
        subject,
        message,
        date: new Date().toLocaleString()
    };
    
    contacts.push(contact);
    localStorage.setItem('contacts', JSON.stringify(contacts));
    
    // Show success message
    const successDiv = document.getElementById('contact-success');
    successDiv.style.display = 'block';
    
    // Reset form
    document.getElementById('contact-form').reset();
    
    // Hide success message after 5 seconds
    setTimeout(() => {
        successDiv.style.display = 'none';
    }, 5000);
}
