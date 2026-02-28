// Sample product data
const products = [
    {
        id: 1,
        name: 'Laptop',
        description: 'High-performance laptop for work and gaming',
        price: 999.99
    },
    {
        id: 2,
        name: 'Smartphone',
        description: 'Latest model with advanced features',
        price: 699.99
    },
    {
        id: 3,
        name: 'Headphones',
        description: 'Wireless noise-cancelling headphones',
        price: 199.99
    },
    {
        id: 4,
        name: 'Smartwatch',
        description: 'Track your fitness and stay connected',
        price: 299.99
    },
    {
        id: 5,
        name: 'Tablet',
        description: 'Portable device for work and entertainment',
        price: 449.99
    },
    {
        id: 6,
        name: 'Camera',
        description: 'Professional DSLR camera',
        price: 1299.99
    }
];

// Shopping cart
let cart = [];

// Initialize the app
document.addEventListener('DOMContentLoaded', () => {
    loadProducts();
    setupNavigation();
    setupEventListeners();
});

// Load products into the grid
function loadProducts() {
    const productGrid = document.getElementById('product-grid');
    productGrid.innerHTML = '';

    products.forEach(product => {
        const productCard = createProductCard(product);
        productGrid.appendChild(productCard);
    });
}

// Create a product card element
function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.innerHTML = `
        <h3>${product.name}</h3>
        <p>${product.description}</p>
        <div class="product-price">$${product.price.toFixed(2)}</div>
        <button class="btn btn-success" onclick="addToCart(${product.id})">
            Add to Cart
        </button>
    `;
    return card;
}

// Add product to cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const existingItem = cart.find(item => item.id === productId);
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    updateCartDisplay();
    updateCartCount();
}

// Remove product from cart
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartDisplay();
    updateCartCount();
}

// Update quantity
function updateQuantity(productId, change) {
    const item = cart.find(item => item.id === productId);
    if (!item) return;

    item.quantity += change;
    if (item.quantity <= 0) {
        removeFromCart(productId);
    } else {
        updateCartDisplay();
        updateCartCount();
    }
}

// Update cart count in header
function updateCartCount() {
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);
    document.getElementById('cart-count').textContent = count;
}

// Update cart display
function updateCartDisplay() {
    const cartItems = document.getElementById('cart-items');
    
    if (cart.length === 0) {
        cartItems.innerHTML = '<div class="empty-state"><p>Your cart is empty</p></div>';
        document.getElementById('total-price').textContent = '0.00';
        return;
    }

    cartItems.innerHTML = '';
    let total = 0;

    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;

        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <div class="cart-item-info">
                <h4>${item.name}</h4>
                <p>$${item.price.toFixed(2)} each</p>
            </div>
            <div class="cart-item-actions">
                <button class="btn" onclick="updateQuantity(${item.id}, -1)">-</button>
                <span style="margin: 0 1rem;">${item.quantity}</span>
                <button class="btn" onclick="updateQuantity(${item.id}, 1)">+</button>
                <span style="margin-left: 1rem;">$${itemTotal.toFixed(2)}</span>
                <button class="btn btn-danger" onclick="removeFromCart(${item.id})" style="margin-left: 1rem;">Remove</button>
            </div>
        `;
        cartItems.appendChild(cartItem);
    });

    document.getElementById('total-price').textContent = total.toFixed(2);
}

// Setup navigation
function setupNavigation() {
    document.querySelectorAll('nav a').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const target = e.target.getAttribute('href').substring(1);
            
            // Hide all sections
            document.getElementById('hero').style.display = 'none';
            document.getElementById('products').style.display = 'none';
            document.getElementById('cart').style.display = 'none';
            
            // Show target section
            if (target === 'home') {
                document.getElementById('hero').style.display = 'block';
                document.getElementById('products').style.display = 'block';
            } else if (target === 'products') {
                document.getElementById('products').style.display = 'block';
            } else if (target === 'cart') {
                document.getElementById('cart').style.display = 'block';
            }
        });
    });
}

// Setup event listeners
function setupEventListeners() {
    document.getElementById('checkout-btn').addEventListener('click', () => {
        if (cart.length === 0) {
            alert('Your cart is empty!');
            return;
        }
        
        const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        alert(`Thank you for your order!\nTotal: $${total.toFixed(2)}\n\nThis is a demo - no actual payment processed.`);
        
        // Clear cart
        cart = [];
        updateCartDisplay();
        updateCartCount();
    });
}
