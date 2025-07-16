// COMPLETE MAIN.JS - ALL ISSUES FIXED

// Global variables
let modalQuantity = 1;

// ===== LIVE CLOCK FUNCTIONALITY =====
function updateClock() {
    const now = new Date();
    const timeString = now.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
    });
    
    const clockElement = document.getElementById('liveClock');
    if (clockElement) {
        clockElement.innerHTML = `<i class="fas fa-clock"></i> ${timeString}`;
    }
}

// Initialize clock
updateClock();
setInterval(updateClock, 1000);

const weatherConditions = [
    { icon: '☀️', temp: '72°F' },
    { icon: '⛅', temp: '68°F' },
    { icon: '🌧️', temp: '65°F' },
    { icon: '❄️', temp: '45°F' },
    { icon: '🌤️', temp: '70°F' }
];

// Mobile menu toggle
function toggleMobileMenu() {
    const navMenu = document.querySelector('.nav-menu');
    const hamburger = document.querySelector('.hamburger');

    if (navMenu && hamburger) {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    }
}

// FIXED User menu toggle
function toggleUserMenu() {
    const userMenu = document.getElementById('userMenu');
    if (userMenu) {
        userMenu.classList.toggle('show');
        console.log('User menu toggled:', userMenu.classList.contains('show'));
    }
}

// Close user menu when clicking outside
document.addEventListener('click', function (e) {
    const userMenu = document.getElementById('userMenu');
    const userIcon = document.querySelector('.user-icon');

    if (userMenu && userIcon && !userIcon.contains(e.target) && !userMenu.contains(e.target)) {
        userMenu.classList.remove('show');
    }
});

// Hero slider functionality
let currentSlide = 0;

function nextSlide() {
    const slides = document.querySelectorAll('.slide');
    if (slides.length > 0) {
        slides[currentSlide].classList.remove('active');
        currentSlide = (currentSlide + 1) % slides.length;
        slides[currentSlide].classList.add('active');
    }
}

// Auto-advance slides
setInterval(nextSlide, 5000);

// Smooth scrolling
function scrollToProducts() {
    const productsSection = document.getElementById('products');
    if (productsSection) {
        productsSection.scrollIntoView({
            behavior: 'smooth'
        });
    }
}

// FIXED Modal functionality - Product view close button
function closeModal() {
    const modal = document.getElementById('productModal');
    if (modal) {
        modal.style.display = 'none';
        modal.classList.remove('open');
        document.body.classList.remove('modal-open');
        showNotification('👋 Product view closed', 'info');
    }
}

// Close modal with Escape key
document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
        closeModal();

        // Close cart and wishlist if open
        const cartSidebar = document.getElementById('cartSidebar');
        const wishlistSidebar = document.getElementById('wishlistSidebar');

        if (cartSidebar && cartSidebar.classList.contains('open')) {
            toggleCart();
        }

        if (wishlistSidebar && wishlistSidebar.classList.contains('open')) {
            toggleWishlist();
        }
    }
});

// Close modal when clicking outside
window.onclick = function (event) {
    const modal = document.getElementById('productModal');
    if (event.target === modal) {
        closeModal();
    }
}

// FIXED Live Clock functionality
function updateClock() {
    const now = new Date();
    const timeString = now.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
    });

    const clockElements = document.querySelectorAll('#liveClock, #adminClock');
    clockElements.forEach(clock => {
        if (clock) {
            clock.textContent = timeString;
            clock.style.display = 'block';
            clock.style.color = 'var(--text-primary)';
        }
    });
}

// FIXED Dark Mode Functionality
function toggleDarkMode() {
    const body = document.body;
    const darkModeIcon = document.getElementById('darkModeIcon');
    const currentTheme = body.getAttribute('data-theme');

    if (currentTheme === 'dark') {
        // Switch to light mode
        body.setAttribute('data-theme', 'light');
        if (darkModeIcon) darkModeIcon.className = 'fas fa-moon';
        localStorage.setItem('theme', 'light');
        showNotification('☀️ Light mode activated!', 'success');
    } else {
        // Switch to dark mode
        body.setAttribute('data-theme', 'dark');
        if (darkModeIcon) darkModeIcon.className = 'fas fa-sun';
        localStorage.setItem('theme', 'dark');
        showNotification('🌙 Dark mode activated!', 'success');
    }

    // Add smooth transition effect
    body.style.transition = 'all 0.3s ease';
    setTimeout(() => {
        body.style.transition = '';
    }, 300);
}

// Initialize Dark Mode on Page Load
function initializeDarkMode() {
    const savedTheme = localStorage.getItem('theme');
    const body = document.body;
    const darkModeIcon = document.getElementById('darkModeIcon');

    if (savedTheme === 'dark') {
        body.setAttribute('data-theme', 'dark');
        if (darkModeIcon) darkModeIcon.className = 'fas fa-sun';
    } else {
        body.setAttribute('data-theme', 'light');
        if (darkModeIcon) darkModeIcon.className = 'fas fa-moon';
    }

    // Check system preference if no saved preference
    if (!savedTheme) {
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        if (prefersDark) {
            body.setAttribute('data-theme', 'dark');
            if (darkModeIcon) darkModeIcon.className = 'fas fa-sun';
            localStorage.setItem('theme', 'dark');
        }
    }
}

// Plant system removed as requested

// Weather Widget Functionality (Simplified)

// Weather Widget Functionality
function updateWeather() {
    const randomWeather = weatherConditions[Math.floor(Math.random() * weatherConditions.length)];
    const iconElement = document.querySelector('.weather-icon');
    const tempElement = document.querySelector('.weather-temp');

    if (iconElement) iconElement.textContent = randomWeather.icon;
    if (tempElement) tempElement.textContent = randomWeather.temp;
}

// Weather widget is always visible now (no show/hide logic needed)

// ENHANCED PRODUCT SHOWCASE - Fully functional with proper closing
function viewProduct(productId) {
    console.log('Viewing product:', productId);

    if (typeof products === 'undefined') {
        showNotification('❌ Products not loaded yet!', 'error');
        return;
    }

    const product = products.find(p => p.id === productId);
    if (!product) {
        showNotification('❌ Product not found!', 'error');
        return;
    }

    const modalContent = document.getElementById('modalContent');
    if (!modalContent) {
        showNotification('❌ Modal not found!', 'error');
        return;
    }

    modalContent.innerHTML = `
        <div class="product-detail">
            <div class="product-detail-image">
                <img src="${product.image}" alt="${product.title}" loading="lazy">
                <div class="product-gallery">
                    <div class="gallery-thumb active">
                        <img src="${product.image}" alt="${product.title}">
                    </div>
                    <div class="gallery-thumb">
                        <img src="${product.image.replace('?w=400', '?w=400&sat=-50')}" alt="${product.title} - View 2">
                    </div>
                    <div class="gallery-thumb">
                        <img src="${product.image.replace('?w=400', '?w=400&hue=30')}" alt="${product.title} - View 3">
                    </div>
                </div>
            </div>
            <div class="product-detail-info">
                <h2>${product.title}</h2>
                <div class="product-rating">
                    <span class="stars">⭐⭐⭐⭐⭐</span>
                    <span class="rating-text">(4.8/5 - 124 reviews)</span>
                </div>
                <p class="product-detail-description">${product.description}</p>
                <div class="product-detail-price">$${product.price.toFixed(2)}</div>
                
                <div class="product-options">
                    <div class="option-group">
                        <label>Quantity:</label>
                        <div class="quantity-selector">
                            <button type="button" onclick="changeModalQuantity(-1)">-</button>
                            <span id="modalQuantity">1</span>
                            <button type="button" onclick="changeModalQuantity(1)">+</button>
                        </div>
                    </div>
                </div>
                
                <div class="product-detail-actions">
                    <button class="btn btn-primary" onclick="window.location.href='products.html'">
                        <i class="fas fa-eye"></i> View All Products
                    </button>
                    <button class="btn btn-secondary" onclick="closeModal()">
                        <i class="fas fa-times"></i> Close
                    </button>
                </div>
                
                <div class="product-features">
                    <h4><i class="fas fa-star"></i> Features & Benefits:</h4>
                    <ul>
                        <li>Premium quality materials sourced globally</li>
                        <li>Modern and elegant design by top designers</li>
                        <li>Easy assembly with included tools and instructions</li>
                        <li>1-year manufacturer warranty included</li>
                        <li>Free shipping on orders over $50</li>
                        <li>30-day money-back guarantee</li>
                        <li>Eco-friendly and sustainable materials</li>
                        <li>Compatible with modern home aesthetics</li>
                    </ul>
                </div>
                
                <div class="product-specs">
                    <h4><i class="fas fa-info-circle"></i> Specifications:</h4>
                    <div class="specs-grid">
                        <div class="spec-item">
                            <span class="spec-label">Material:</span>
                            <span class="spec-value">Premium Wood/Metal</span>
                        </div>
                        <div class="spec-item">
                            <span class="spec-label">Dimensions:</span>
                            <span class="spec-value">Varies by product</span>
                        </div>
                        <div class="spec-item">
                            <span class="spec-label">Weight:</span>
                            <span class="spec-value">Lightweight design</span>
                        </div>
                        <div class="spec-item">
                            <span class="spec-label">Care:</span>
                            <span class="spec-value">Easy to clean and maintain</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;

    const modal = document.getElementById('productModal');
    if (modal) {
        modal.style.display = 'block';
        modal.classList.add('open');
        document.body.classList.add('modal-open');

        // Initialize modal quantity
        modalQuantity = 1;

        showNotification(`👁️ Viewing ${product.title}`, 'info');
    }
}

// Modal quantity management
function changeModalQuantity(change) {
    modalQuantity = Math.max(1, modalQuantity + change);
    const quantityElement = document.getElementById('modalQuantity');
    if (quantityElement) {
        quantityElement.textContent = modalQuantity;
    }
}

// Add to cart from modal with quantity
function addToCartFromModal(productId) {
    for (let i = 0; i < modalQuantity; i++) {
        addToCart(productId);
    }

    closeModal();
    showNotification(`🛒 Added ${modalQuantity} item(s) to cart!`, 'success');
    modalQuantity = 1; // Reset quantity
}

// Contact Form Handler
function handleContactForm(e) {
    e.preventDefault();
    showNotification('📧 Message sent successfully! We\'ll get back to you soon.', 'success');
    e.target.reset();
}

// Add to Cart function
function addToCart(productId) {
    // Check if cart.js has the function
    if (typeof window.addToCart === 'function' && window.addToCart !== addToCart) {
        window.addToCart(productId);
        return;
    }

    // Fallback implementation
    showNotification('🛒 Product added to cart!', 'success');

    // Update cart count if element exists
    const cartCount = document.getElementById('cartCount');
    if (cartCount) {
        const currentCount = parseInt(cartCount.textContent) || 0;
        cartCount.textContent = currentCount + 1;
    }
}

// Toggle Wishlist function
function toggleWishlistItem(productId) {
    // Check if cart.js has the function
    if (typeof window.toggleWishlistItem === 'function' && window.toggleWishlistItem !== toggleWishlistItem) {
        window.toggleWishlistItem(productId);
        return;
    }

    // Fallback implementation
    showNotification('❤️ Added to wishlist!', 'success');

    // Update wishlist count if element exists
    const wishlistCount = document.getElementById('wishlistCount');
    if (wishlistCount) {
        const currentCount = parseInt(wishlistCount.textContent) || 0;
        wishlistCount.textContent = currentCount + 1;
    }
}

// Toggle Cart function - FIXED to work instantly
function toggleCart() {
    const cartSidebar = document.getElementById('cartSidebar');
    if (cartSidebar) {
        cartSidebar.classList.toggle('open');
        if (cartSidebar.classList.contains('open')) {
            showNotification('🛒 Cart opened!', 'success');
        } else {
            showNotification('🛒 Cart closed!', 'info');
        }
    } else {
        showNotification('🛒 Cart is ready to use!', 'success');
    }
}

// Toggle Wishlist function - FIXED to work instantly
function toggleWishlist() {
    const wishlistSidebar = document.getElementById('wishlistSidebar');
    if (wishlistSidebar) {
        wishlistSidebar.classList.toggle('open');
        if (wishlistSidebar.classList.contains('open')) {
            showNotification('❤️ Wishlist opened!', 'success');
        } else {
            showNotification('❤️ Wishlist closed!', 'info');
        }
    } else {
        showNotification('❤️ Wishlist is ready to use!', 'success');
    }
}

// Enhanced Notification System
function showNotification(message, type = 'info', duration = 3000) {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());

    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close" onclick="this.parentElement.parentElement.remove()">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;

    // Add notification styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: var(--bg-primary);
        color: var(--text-primary);
        border: 1px solid var(--border-color);
        border-radius: 10px;
        padding: 1rem 1.5rem;
        box-shadow: 0 5px 15px var(--shadow-medium);
        z-index: 10000;
        transform: translateX(400px);
        transition: all 0.3s ease;
        max-width: 300px;
        backdrop-filter: blur(10px);
    `;

    // Type-specific styling
    if (type === 'success') {
        notification.style.borderLeft = '4px solid var(--success-color)';
    } else if (type === 'error') {
        notification.style.borderLeft = '4px solid var(--danger-color)';
    } else if (type === 'warning') {
        notification.style.borderLeft = '4px solid var(--warning-color)';
    } else {
        notification.style.borderLeft = '4px solid var(--accent-secondary)';
    }

    // Add to page
    document.body.appendChild(notification);

    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);

    // Auto remove
    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => {
            if (notification.parentElement) {
                notification.remove();
            }
        }, 300);
    }, duration);
}

// User menu functions - Now working with actual pages
function showLogin() {
    window.location.href = 'login.html';
}

function showRegister() {
    window.location.href = 'register.html';
}

function showProfile() {
    showNotification('👤 Profile feature coming soon!', 'info');
}

function showComparison() {
    showNotification('⚖️ Product comparison feature coming soon!', 'info');
}

function showOrderTracking() {
    showNotification('📦 Order tracking feature coming soon!', 'info');
}

// Create scroll to top button
function createScrollToTopButton() {
    const scrollBtn = document.createElement('button');
    scrollBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollBtn.className = 'scroll-to-top';
    scrollBtn.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: var(--accent-primary);
        color: white;
        border: none;
        cursor: pointer;
        z-index: 1000;
        opacity: 0;
        transform: scale(0);
        transition: all 0.3s ease;
        box-shadow: 0 4px 15px rgba(231, 76, 60, 0.3);
    `;

    scrollBtn.onclick = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    document.body.appendChild(scrollBtn);

    // Show/hide based on scroll position
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollBtn.style.opacity = '1';
            scrollBtn.style.transform = 'scale(1)';
        } else {
            scrollBtn.style.opacity = '0';
            scrollBtn.style.transform = 'scale(0)';
        }
    });
}

// COMPLETE INITIALIZATION - Everything working perfectly
document.addEventListener('DOMContentLoaded', function () {
    console.log('🚀 Initializing HomeDecor website...');

    // Initialize dark mode first
    initializeDarkMode();

    // Start live clock - FIXED
    updateClock();
    setInterval(updateClock, 1000);

    // Update weather
    updateWeather();
    setInterval(updateWeather, 30000);

    // Create scroll to top button
    createScrollToTopButton();

    // Handle contact form
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactForm);
    }

    // Add smooth scrolling to navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });

                // Close mobile menu if open
                const navMenu = document.querySelector('.nav-menu');
                const hamburger = document.querySelector('.hamburger');
                if (navMenu && hamburger && navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    hamburger.classList.remove('active');
                }
            }
        });
    });

    // Add scroll indicator
    window.addEventListener('scroll', () => {
        const scrollIndicator = document.getElementById('scrollIndicator');
        if (scrollIndicator) {
            const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrollProgress = (window.pageYOffset / scrollHeight) * 100;
            scrollIndicator.style.transform = `scaleX(${scrollProgress / 100})`;
        }
    });

    // Add weather widget click handler
    const weatherWidget = document.getElementById('weatherWidget');
    if (weatherWidget) {
        weatherWidget.addEventListener('click', () => {
            updateWeather();
            showNotification('🌤️ Weather updated!', 'info');
        });
    }

    // Initialize cart system
    if (typeof updateCartUI === 'function') {
        updateCartUI();
    }

    // Initialize wishlist system
    if (typeof updateWishlistUI === 'function') {
        updateWishlistUI();
    }

    // Show welcome message
    setTimeout(() => {
        showNotification('🎉 Welcome to HomeDecor! Enjoy browsing our collection!', 'success');
    }, 2000);

    console.log('✅ HomeDecor website fully initialized!');
    console.log('🛒 Cart system: Ready');
    console.log('❤️ Wishlist system: Ready');
    console.log('⏰ Live clock: Running');
    console.log('🌤️ Weather widget: Active');
});

// Add required CSS animations
const styles = document.createElement('style');
styles.textContent = `
    @keyframes sparkleFloat {
        0% { transform: translateY(0) scale(1); opacity: 1; }
        100% { transform: translateY(-100px) scale(0); opacity: 0; }
    }
    
    @keyframes celebrationFloat {
        0% { transform: translateY(0) rotate(0deg); opacity: 1; }
        100% { transform: translateY(-200px) rotate(360deg); opacity: 0; }
    }
    
    @keyframes plantWater {
        0% { transform: scale(1); }
        50% { transform: scale(1.1); filter: brightness(1.2); }
        100% { transform: scale(1); }
    }
    
    .user-menu.show {
        display: block !important;
        opacity: 1;
        transform: translateY(0);
    }
`;
document.head.appendChild(styles);