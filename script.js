// Product Data
const products = [
    {
        id: 1,
        name: "Alasaka",
        price: 80,
        image: "images/alaska.JPG",
        description: "alaska best edition"
    },
    {
        id: 2,
        name: "Arkansas",
        price: 79.99,
        image: "images/arkansas.JPG",
        description: "scannable"
    },
    {
        id: 3,
        name: "colorado",
        price: 78.99,
        image: "images/colorado.JPG",
        description: "Colorado scannable edition"
    },
    {
        id: 4,
        name: "Florida",
        price: 89.99,
        image: "images/florida.JPG",
        description: "florida scannable for active lifestyle"
    },
    {
        id: 5,
        name: "Hawaii",
        price: 60.99,
        image: "images/hawaii.JPG",
        description: "hawaii new edition"
    },
    {
        id: 6,
        name: "Indiana",
        price: 69.99,
        image: "images/indiana.JPG",
        description: "Indiana timeless style"
    },
    {
        id: 7,
        name: "Kentucky",
        price: 69.99,
        image: "images/kentucky.PNG",
        description: "kentucky for everyday comfort"
    },
    {
        id: 8,
        name: "Maryland",
        price: 50.99,
        image: "images/maryland.JPG",
        description: "maryland scannable for cooler days"
    },
    {
        id: 9,
        name: "Michigan",
        price: 80.99,
        image: "images/michigan.PNG",
        description: "Elegant for business occasions"
    },
    {
        id: 10,
        name: "Minnesota",
        price: 59.99,
        image: "images/minnesota.JPG",
        description: "feel secure"
    },
    {
        id: 11,
        name: "Montana",
        price: 80.99,
        image: "images/montana.JPG",
        description: "montana new edition"
    },
    {
        id: 12,
        name: "Nevada",
        price: 64.99,
        image: "images/nevada.JPG",
        description: "best selling"
    },
    {
        id: 13,
        name: "North carolina",
        price: 69.99,
        image: "images/north carolina.JPG",
        description: "Classic new edition scannable"
    },
    {
        id: 14,
        name: "Oklahoma",
        price: 68.99,
        image: "images/oklahoma.JPG",
        description: "scannable edition"
    },
    {
        id: 15,
        name: "South Carolina",
        price: 60,
        image: "images/south carolina.JPG",
        description: "new scannable"
    },
    {
        id: 16,
        name: "South Dakota",
        price: 70,
        image: "images/south dokota.JPG",
        description: "Elegant high class scannable"
    },
    {
        id: 17,
        name: "UTAH",
        price: 60,
        image: "images/utah.JPG",
        description: "new edition"
    },
    {
        id: 18,
        name: "Washington",
        price: 90,
        image: "images/washington.JPG",
        description: "Blazer"
    },
    {
        id: 19,
        name: "Ohio",
        price: 70,
        image: "images/ohio.JPG",
        description: "ohio best selling"
    },
    {
        id: 20,
        name: "Idaho",
        price: 60,
        image: "images/idaho.JPG",
        description: "new edition"
    },
    {
        id: 21,
        name: "California",
        price: 80,
        image: "images/california.JPG",
        description: "Best layering"
    },
    {
        id: 22,
        name: "New york",
        price: 89,
        image: "images/new york.JPG",
        description: "Best selling 2025"
    }
];

// Cart State
let cart = [];

// DOM Elements
const productsGrid = document.getElementById('productsGrid');
const cartBtn = document.getElementById('cartBtn');
const cartSidebar = document.getElementById('cartSidebar');
const cartOverlay = document.getElementById('cartOverlay');
const closeCart = document.getElementById('closeCart');
const cartItems = document.getElementById('cartItems');
const cartCount = document.getElementById('cartCount');
const cartTotal = document.getElementById('cartTotal');
const checkoutBtn = document.getElementById('checkoutBtn');

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    renderProducts();
    loadCart();
    updateCartUI();
    setupCartOptionListeners();
});

// Setup cart option radio button listeners (only once)
function setupCartOptionListeners() {
    // Use event delegation for dynamically added radio buttons
    document.addEventListener('change', function(e) {
        if (e.target && e.target.name === 'cartOption') {
            // Remove selected class from all option items
            document.querySelectorAll('.option-item').forEach(item => {
                item.classList.remove('selected');
            });
            // Add selected class to the checked option's parent
            if (e.target.checked) {
                e.target.closest('.option-item').classList.add('selected');
            }
        }
    });
}

// Render Products
function renderProducts() {
    productsGrid.innerHTML = products.map(product => `
        <div class="product-card">
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}" onerror="this.onerror=null; this.src='images/placeholder.jpg'; this.style.objectFit='cover';">
            </div>
            <div class="product-info">
                <h3 class="product-name">${product.name}</h3>
                <p class="product-price">$${product.price.toFixed(2)}</p>
                <button class="add-to-cart" onclick="addToCart(${product.id})">
                    Add to Cart
                </button>
            </div>
        </div>
    `).join('');
}

// Add to Cart
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

    saveCart();
    updateCartUI();
    showNotification(`${product.name} added to cart!`);
}

// Remove from Cart
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    saveCart();
    updateCartUI();
}

// Update Quantity
function updateQuantity(productId, change) {
    const item = cart.find(item => item.id === productId);
    if (!item) return;

    item.quantity += change;
    
    if (item.quantity <= 0) {
        removeFromCart(productId);
    } else {
        saveCart();
        updateCartUI();
    }
}

// Update Cart UI
function updateCartUI() {
    // Update cart count
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;
    cartCount.style.display = totalItems > 0 ? 'flex' : 'none';

    // Show/hide cart options based on cart content
    const cartOptions = document.getElementById('cartOptions');
    if (cart.length === 0) {
        cartItems.innerHTML = '<p class="empty-cart">Your cart is empty</p>';
        if (cartOptions) {
            cartOptions.style.display = 'none';
        }
        // Reset radio buttons when cart is empty
        const radioButtons = document.querySelectorAll('input[name="cartOption"]');
        radioButtons.forEach(radio => radio.checked = false);
    } else {
        cartItems.innerHTML = cart.map(item => `
            <div class="cart-item">
                <div class="cart-item-image">
                    <img src="${item.image}" alt="${item.name}" onerror="this.onerror=null; this.src='images/placeholder.jpg'; this.style.objectFit='cover';">
                </div>
                <div class="cart-item-info">
                    <div class="cart-item-name">${item.name}</div>
                    <div class="cart-item-price">$${item.price.toFixed(2)}</div>
                    <div class="cart-item-quantity">
                        <button class="quantity-btn" onclick="updateQuantity(${item.id}, -1)">-</button>
                        <span>${item.quantity}</span>
                        <button class="quantity-btn" onclick="updateQuantity(${item.id}, 1)">+</button>
                    </div>
                    <button class="remove-item" onclick="removeFromCart(${item.id})">Remove</button>
                </div>
            </div>
        `).join('');
        if (cartOptions) {
            cartOptions.style.display = 'block';
        }
    }

    // Update cart total
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cartTotal.textContent = total.toFixed(2);
    
    // Clear selected state when cart is updated
    if (cart.length === 0) {
        document.querySelectorAll('.option-item').forEach(item => {
            item.classList.remove('selected');
        });
    }
}

// Cart Sidebar Toggle
cartBtn.addEventListener('click', () => {
    cartSidebar.classList.add('active');
    cartOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
});

closeCart.addEventListener('click', closeCartSidebar);
cartOverlay.addEventListener('click', closeCartSidebar);

function closeCartSidebar() {
    cartSidebar.classList.remove('active');
    cartOverlay.classList.remove('active');
    document.body.style.overflow = '';
}

// Checkout
checkoutBtn.addEventListener('click', () => {
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }
    
    // Check if an option is selected
    const selectedOption = document.querySelector('input[name="cartOption"]:checked');
    if (!selectedOption) {
        showNotification('Please select a delivery option before proceeding to checkout.', 'error');
        return;
    }
    
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const selectedOptionValue = selectedOption.value;
    
    // Format order details for Telegram message
    let orderMessage = `🛍️ *New Order*\n\n`;
    orderMessage += `📋 *Order Details:*\n\n`;
    
    cart.forEach((item, index) => {
        orderMessage += `${index + 1}. ${item.name}\n`;
        orderMessage += `   Quantity: ${item.quantity}\n`;
        orderMessage += `   Price: $${item.price.toFixed(2)} each\n`;
        orderMessage += `   Subtotal: $${(item.price * item.quantity).toFixed(2)}\n\n`;
    });
    
    orderMessage += `💰 *Total Amount: $${total.toFixed(2)}*\n\n`;
    orderMessage += `📦 *Selected Option: ${selectedOptionValue}*\n\n`;
    orderMessage += `Thank you for your order!`;
    
    // Encode message for URL
    const encodedMessage = encodeURIComponent(orderMessage);
    
    // Create Telegram link with order details
    const telegramLink = `https://t.me/BraxtorIDfakes?text=${encodedMessage}`;
    
    // Open Telegram in new tab/window
    window.open(telegramLink, '_blank');
    
    // Show confirmation
    showNotification('Redirecting to Telegram to complete your order...');
    
    // Clear cart after a short delay
    setTimeout(() => {
        cart = [];
        saveCart();
        updateCartUI();
        closeCartSidebar();
    }, 1000);
});

// Save Cart to LocalStorage
function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Load Cart from LocalStorage
function loadCart() {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
    }
}

// Show Notification
function showNotification(message, type = 'success') {
    // Create notification element
    const notification = document.createElement('div');
    const bgColor = type === 'error' ? '#e74c3c' : '#27ae60'; // Error: red, Success: green
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${bgColor};
        color: white;
        padding: 1rem 2rem;
        border-radius: 5px;
        box-shadow: 0 4px 10px rgba(0,0,0,0.2);
        z-index: 3000;
        animation: slideIn 0.3s ease;
        max-width: 400px;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);

    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            if (document.body.contains(notification)) {
                document.body.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Add CSS animations for notifications
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Smooth Scroll for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const href = this.getAttribute('href');
        const target = document.querySelector(href);
        
        if (target) {
            // Update active navigation state
            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active');
            });
            if (this.classList.contains('nav-link')) {
                this.classList.add('active');
            }
            
            // Calculate offset for sticky header (approximately 80px)
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Update active nav link on scroll
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const scrollPos = window.scrollY + 100;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active');
            });
            if (navLink) {
                navLink.classList.add('active');
            }
        }
    });
});

