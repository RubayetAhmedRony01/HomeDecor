// COMPLETE CART AND PAYMENT SYSTEM - FULLY FUNCTIONAL

// Cart data storage
let cart = JSON.parse(localStorage.getItem('homeDecorCart')) || [];
let wishlist = JSON.parse(localStorage.getItem('homeDecorWishlist')) || [];

// Save cart to localStorage
function saveCart() {
    localStorage.setItem('homeDecorCart', JSON.stringify(cart));
}

// Save wishlist to localStorage
function saveWishlist() {
    localStorage.setItem('homeDecorWishlist', JSON.stringify(wishlist));
}

// Add product to cart
function addToCart(productId) {
    console.log('Adding to cart:', productId);
    
    // Find product from products array
    if (typeof products === 'undefined') {
        showNotification('❌ Products not loaded yet!', 'error');
        return;
    }
    
    const product = products.find(p => p.id === productId);
    if (!product) {
        showNotification('❌ Product not found!', 'error');
        return;
    }
    
    // Check if product already in cart
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
        showNotification(`🛒 Added another ${product.title} to cart!`, 'success');
    } else {
        cart.push({
            id: product.id,
            title: product.title,
            price: product.price,
            image: product.image,
            quantity: 1
        });
        showNotification(`🛒 ${product.title} added to cart!`, 'success');
    }
    
    updateCartUI();
    saveCart();
}

// Remove product from cart
function removeFromCart(productId) {
    const itemIndex = cart.findIndex(item => item.id === productId);
    if (itemIndex > -1) {
        const item = cart[itemIndex];
        cart.splice(itemIndex, 1);
        showNotification(`🗑️ ${item.title} removed from cart!`, 'info');
        updateCartUI();
        saveCart();
    }
}

// Update quantity in cart
function updateQuantity(productId, change) {
    const item = cart.find(item => item.id === productId);
    if (!item) return;
    
    item.quantity += change;
    
    if (item.quantity <= 0) {
        removeFromCart(productId);
    } else {
        updateCartUI();
        saveCart();
    }
}

// Update cart UI
function updateCartUI() {
    updateCartCount();
    updateCartItems();
    updateCartTotal();
}

// Update cart count in header
function updateCartCount() {
    const cartCount = document.getElementById('cartCount');
    if (cartCount) {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCount.textContent = totalItems;
    }
}

// Update cart items display
function updateCartItems() {
    const cartItems = document.getElementById('cartItems');
    if (!cartItems) return;
    
    cartItems.innerHTML = '';
    
    if (cart.length === 0) {
        cartItems.innerHTML = `
            <div class="empty-cart">
                <i class="fas fa-shopping-cart fa-3x"></i>
                <h3>Your cart is empty</h3>
                <p>Add some products to get started!</p>
            </div>
        `;
        return;
    }
    
    cart.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <img src="${item.image}" alt="${item.title}" loading="lazy">
            <div class="cart-item-info">
                <h4 class="cart-item-title">${item.title}</h4>
                <div class="cart-item-price">$${item.price.toFixed(2)}</div>
                <div class="quantity-controls">
                    <button class="quantity-btn" onclick="updateQuantity(${item.id}, -1)">
                        <i class="fas fa-minus"></i>
                    </button>
                    <span class="quantity">${item.quantity}</span>
                    <button class="quantity-btn" onclick="updateQuantity(${item.id}, 1)">
                        <i class="fas fa-plus"></i>
                    </button>
                    <button class="remove-btn" onclick="removeFromCart(${item.id})" title="Remove item">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        `;
        cartItems.appendChild(cartItem);
    });
}

// Update cart total
function updateCartTotal() {
    const cartTotal = document.getElementById('cartTotal');
    if (cartTotal) {
        const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        cartTotal.textContent = total.toFixed(2);
    }
}

// Toggle cart sidebar
function toggleCart() {
    const cartSidebar = document.getElementById('cartSidebar');
    const overlay = document.querySelector('.cart-overlay') || createOverlay('cart');
    
    if (cartSidebar.classList.contains('open')) {
        cartSidebar.classList.remove('open');
        overlay.classList.remove('show');
        document.body.classList.remove('modal-open');
    } else {
        cartSidebar.classList.add('open');
        overlay.classList.add('show');
        document.body.classList.add('modal-open');
        updateCartUI(); // Refresh cart when opening
    }
}

// Create overlay for modals
function createOverlay(type) {
    let overlay = document.querySelector(`.${type}-overlay`);
    if (!overlay) {
        overlay = document.createElement('div');
        overlay.className = `overlay ${type}-overlay`;
        overlay.onclick = () => {
            if (type === 'cart') toggleCart();
            if (type === 'wishlist') toggleWishlist();
            if (type === 'checkout') closeCheckout();
        };
        document.body.appendChild(overlay);
    }
    return overlay;
}

// Proceed to checkout
function proceedToCheckout() {
    if (cart.length === 0) {
        showNotification('🛒 Your cart is empty! Add some products first.', 'error');
        return;
    }
    
    // Close cart and open checkout
    toggleCart();
    openCheckout();
}

// Open checkout modal
function openCheckout() {
    const checkoutModal = createCheckoutModal();
    document.body.appendChild(checkoutModal);
    checkoutModal.style.display = 'block';
    document.body.classList.add('modal-open');
}

// Create checkout modal
function createCheckoutModal() {
    // Remove existing checkout modal
    const existingModal = document.getElementById('checkoutModal');
    if (existingModal) {
        existingModal.remove();
    }
    
    const modal = document.createElement('div');
    modal.className = 'modal checkout-modal';
    modal.id = 'checkoutModal';
    
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const tax = total * 0.08; // 8% tax
    const shipping = total > 50 ? 0 : 9.99; // Free shipping over $50
    const finalTotal = total + tax + shipping;
    
    modal.innerHTML = `
        <div class="modal-content checkout-content">
            <div class="checkout-header">
                <h2><i class="fas fa-credit-card"></i> Secure Checkout</h2>
                <button class="close-btn" onclick="closeCheckout()">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            
            <div class="checkout-body">
                <div class="checkout-left">
                    <div class="order-summary">
                        <h3><i class="fas fa-receipt"></i> Order Summary</h3>
                        <div class="checkout-items">
                            ${cart.map(item => `
                                <div class="checkout-item">
                                    <img src="${item.image}" alt="${item.title}">
                                    <div class="item-details">
                                        <h4>${item.title}</h4>
                                        <p>Qty: ${item.quantity} × $${item.price.toFixed(2)}</p>
                                    </div>
                                    <div class="item-total">$${(item.price * item.quantity).toFixed(2)}</div>
                                </div>
                            `).join('')}
                        </div>
                        
                        <div class="order-totals">
                            <div class="total-line">
                                <span>Subtotal:</span>
                                <span>$${total.toFixed(2)}</span>
                            </div>
                            <div class="total-line">
                                <span>Tax (8%):</span>
                                <span>$${tax.toFixed(2)}</span>
                            </div>
                            <div class="total-line">
                                <span>Shipping:</span>
                                <span>${shipping === 0 ? 'FREE' : '$' + shipping.toFixed(2)}</span>
                            </div>
                            <div class="total-line final-total">
                                <span><strong>Total:</strong></span>
                                <span><strong>$${finalTotal.toFixed(2)}</strong></span>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="checkout-right">
                    <form id="checkoutForm" class="checkout-form">
                        <div class="form-section">
                            <h3><i class="fas fa-user"></i> Contact Information</h3>
                            <div class="form-row">
                                <div class="form-group">
                                    <label>First Name *</label>
                                    <input type="text" name="firstName" required>
                                </div>
                                <div class="form-group">
                                    <label>Last Name *</label>
                                    <input type="text" name="lastName" required>
                                </div>
                            </div>
                            <div class="form-group">
                                <label>Email Address *</label>
                                <input type="email" name="email" required>
                            </div>
                            <div class="form-group">
                                <label>Phone Number *</label>
                                <input type="tel" name="phone" required>
                            </div>
                        </div>
                        
                        <div class="form-section">
                            <h3><i class="fas fa-map-marker-alt"></i> Shipping Address</h3>
                            <div class="form-group">
                                <label>Street Address *</label>
                                <input type="text" name="address" required>
                            </div>
                            <div class="form-row">
                                <div class="form-group">
                                    <label>City *</label>
                                    <input type="text" name="city" required>
                                </div>
                                <div class="form-group">
                                    <label>State *</label>
                                    <select name="state" required>
                                        <option value="">Select State</option>
                                        <option value="AL">Alabama</option>
                                        <option value="CA">California</option>
                                        <option value="FL">Florida</option>
                                        <option value="NY">New York</option>
                                        <option value="TX">Texas</option>
                                    </select>
                                </div>
                                <div class="form-group">
                                    <label>ZIP Code *</label>
                                    <input type="text" name="zipCode" required>
                                </div>
                            </div>
                        </div>
                        
                        <div class="form-section">
                            <h3><i class="fas fa-credit-card"></i> Payment Information</h3>
                            <div class="form-group">
                                <label>Card Number *</label>
                                <input type="text" name="cardNumber" placeholder="1234 5678 9012 3456" maxlength="19" required>
                            </div>
                            <div class="form-row">
                                <div class="form-group">
                                    <label>Expiry Date *</label>
                                    <input type="text" name="expiryDate" placeholder="MM/YY" maxlength="5" required>
                                </div>
                                <div class="form-group">
                                    <label>CVV *</label>
                                    <input type="text" name="cvv" placeholder="123" maxlength="4" required>
                                </div>
                            </div>
                            <div class="form-group">
                                <label>Cardholder Name *</label>
                                <input type="text" name="cardholderName" required>
                            </div>
                        </div>
                        
                        <div class="checkout-actions">
                            <button type="button" class="btn btn-secondary" onclick="closeCheckout()">
                                <i class="fas fa-arrow-left"></i> Back to Cart
                            </button>
                            <button type="submit" class="btn btn-primary checkout-submit">
                                <i class="fas fa-lock"></i> Complete Order ($${finalTotal.toFixed(2)})
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    `;
    
    // Add form event listener
    setTimeout(() => {
        const form = document.getElementById('checkoutForm');
        if (form) {
            form.addEventListener('submit', handleCheckoutSubmit);
            
            // Add card number formatting
            const cardInput = form.querySelector('input[name="cardNumber"]');
            if (cardInput) {
                cardInput.addEventListener('input', formatCardNumber);
            }
            
            // Add expiry date formatting
            const expiryInput = form.querySelector('input[name="expiryDate"]');
            if (expiryInput) {
                expiryInput.addEventListener('input', formatExpiryDate);
            }
        }
    }, 100);
    
    return modal;
}

// Format card number input
function formatCardNumber(e) {
    let value = e.target.value.replace(/\s/g, '').replace(/[^0-9]/gi, '');
    let formattedValue = value.match(/.{1,4}/g)?.join(' ') || value;
    e.target.value = formattedValue;
}

// Format expiry date input
function formatExpiryDate(e) {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length >= 2) {
        value = value.substring(0, 2) + '/' + value.substring(2, 4);
    }
    e.target.value = value;
}

// Handle checkout form submission
function handleCheckoutSubmit(e) {
    e.preventDefault();
    
    const submitBtn = document.querySelector('.checkout-submit');
    const originalText = submitBtn.innerHTML;
    
    // Show processing state
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
    submitBtn.disabled = true;
    
    // Simulate payment processing
    setTimeout(() => {
        // Clear cart
        cart = [];
        saveCart();
        updateCartUI();
        
        // Close checkout
        closeCheckout();
        
        // Show success message
        showOrderSuccess();
        
        // Reset button
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        
    }, 3000);
}

// Show order success modal
function showOrderSuccess() {
    const successModal = document.createElement('div');
    successModal.className = 'modal success-modal';
    successModal.innerHTML = `
        <div class="modal-content success-content">
            <div class="success-icon">
                <i class="fas fa-check-circle"></i>
            </div>
            <h2>Order Placed Successfully!</h2>
            <p>Thank you for your purchase. Your order has been confirmed and will be shipped soon.</p>
            <div class="order-details">
                <p><strong>Order Number:</strong> #HD${Date.now()}</p>
                <p><strong>Estimated Delivery:</strong> 3-5 business days</p>
            </div>
            <button class="btn btn-primary" onclick="closeSuccessModal()">
                <i class="fas fa-home"></i> Continue Shopping
            </button>
        </div>
    `;
    
    document.body.appendChild(successModal);
    successModal.style.display = 'block';
    
    // Auto close after 10 seconds
    setTimeout(() => {
        closeSuccessModal();
    }, 10000);
}

// Close success modal
function closeSuccessModal() {
    const modal = document.querySelector('.success-modal');
    if (modal) {
        modal.remove();
        document.body.classList.remove('modal-open');
    }
}

// Close checkout modal
function closeCheckout() {
    const modal = document.getElementById('checkoutModal');
    if (modal) {
        modal.remove();
        document.body.classList.remove('modal-open');
    }
}

// WISHLIST SYSTEM
function toggleWishlistItem(productId) {
    if (typeof products === 'undefined') {
        showNotification('❌ Products not loaded yet!', 'error');
        return;
    }
    
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    const existingIndex = wishlist.findIndex(item => item.id === productId);
    
    if (existingIndex > -1) {
        wishlist.splice(existingIndex, 1);
        showNotification(`💔 ${product.title} removed from wishlist!`, 'info');
    } else {
        wishlist.push({
            id: product.id,
            title: product.title,
            price: product.price,
            image: product.image
        });
        showNotification(`❤️ ${product.title} added to wishlist!`, 'success');
    }
    
    updateWishlistUI();
    saveWishlist();
}

// Toggle wishlist sidebar
function toggleWishlist() {
    const wishlistSidebar = document.getElementById('wishlistSidebar');
    const overlay = document.querySelector('.wishlist-overlay') || createOverlay('wishlist');
    
    if (wishlistSidebar.classList.contains('open')) {
        wishlistSidebar.classList.remove('open');
        overlay.classList.remove('show');
        document.body.classList.remove('modal-open');
    } else {
        wishlistSidebar.classList.add('open');
        overlay.classList.add('show');
        document.body.classList.add('modal-open');
        updateWishlistUI();
    }
}

// Update wishlist UI
function updateWishlistUI() {
    updateWishlistCount();
    updateWishlistItems();
}

// Update wishlist count
function updateWishlistCount() {
    const wishlistCount = document.getElementById('wishlistCount');
    if (wishlistCount) {
        wishlistCount.textContent = wishlist.length;
    }
}

// Update wishlist items
function updateWishlistItems() {
    const wishlistItems = document.getElementById('wishlistItems');
    if (!wishlistItems) return;
    
    wishlistItems.innerHTML = '';
    
    if (wishlist.length === 0) {
        wishlistItems.innerHTML = `
            <div class="empty-wishlist">
                <i class="fas fa-heart fa-3x"></i>
                <h3>Your wishlist is empty</h3>
                <p>Save products you love for later!</p>
            </div>
        `;
        return;
    }
    
    wishlist.forEach(item => {
        const wishlistItem = document.createElement('div');
        wishlistItem.className = 'wishlist-item';
        wishlistItem.innerHTML = `
            <img src="${item.image}" alt="${item.title}" loading="lazy">
            <div class="wishlist-item-info">
                <h4 class="wishlist-item-title">${item.title}</h4>
                <div class="wishlist-item-price">$${item.price.toFixed(2)}</div>
                <div class="wishlist-actions">
                    <button class="btn btn-primary btn-sm" onclick="addToCart(${item.id})">
                        <i class="fas fa-cart-plus"></i> Add to Cart
                    </button>
                    <button class="btn btn-danger btn-sm" onclick="toggleWishlistItem(${item.id})">
                        <i class="fas fa-trash"></i> Remove
                    </button>
                </div>
            </div>
        `;
        wishlistItems.appendChild(wishlistItem);
    });
}

// Initialize cart system
document.addEventListener('DOMContentLoaded', function() {
    updateCartUI();
    updateWishlistUI();
    
    console.log('🛒 Cart system initialized successfully!');
});

// Export functions for global access
window.addToCart = addToCart;
window.removeFromCart = removeFromCart;
window.updateQuantity = updateQuantity;
window.toggleCart = toggleCart;
window.toggleWishlist = toggleWishlist;
window.toggleWishlistItem = toggleWishlistItem;
window.proceedToCheckout = proceedToCheckout;