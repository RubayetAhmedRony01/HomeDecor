// Product Data with Google Images
const products = [
    // Living Room Products
    {
        id: 1,
        title: "Modern Sofa Set",
        description: "Comfortable 3-seater sofa with premium fabric upholstery",
        price: 899.99,
        category: "living-room",
        image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&h=300&fit=crop",
        badge: "Best Seller"
    },
    {
        id: 2,
        title: "Coffee Table",
        description: "Elegant wooden coffee table with storage compartments",
        price: 299.99,
        category: "living-room",
        image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop",
        badge: "New"
    },
    {
        id: 3,
        title: "Floor Lamp",
        description: "Contemporary floor lamp with adjustable brightness",
        price: 149.99,
        category: "living-room",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop",
        badge: "Sale"
    },
    {
        id: 4,
        title: "Wall Art Set",
        description: "Set of 3 abstract canvas paintings for modern homes",
        price: 199.99,
        category: "living-room",
        image: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400&h=300&fit=crop",
        badge: "Popular"
    },
    {
        id: 5,
        title: "Throw Pillows",
        description: "Set of 4 decorative throw pillows in various colors",
        price: 79.99,
        category: "living-room",
        image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop"
    },
    {
        id: 6,
        title: "Area Rug",
        description: "Large Persian-style area rug for living spaces",
        price: 399.99,
        category: "living-room",
        image: "https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=400&h=300&fit=crop"
    },

    // Bedroom Products
    {
        id: 7,
        title: "Bed Frame",
        description: "Queen size wooden bed frame with headboard",
        price: 599.99,
        category: "bedroom",
        image: "https://images.unsplash.com/photo-1540932239986-30128078f3c5?w=400&h=300&fit=crop",
        badge: "Best Seller"
    },
    {
        id: 8,
        title: "Nightstand",
        description: "Modern nightstand with drawer and open shelf",
        price: 129.99,
        category: "bedroom",
        image: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=400&h=300&fit=crop"
    },
    {
        id: 9,
        title: "Table Lamp",
        description: "Bedside table lamp with fabric shade",
        price: 89.99,
        category: "bedroom",
        image: "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=400&h=300&fit=crop"
    },
    {
        id: 10,
        title: "Wardrobe",
        description: "Large wardrobe with mirror and multiple compartments",
        price: 799.99,
        category: "bedroom",
        image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop",
        badge: "New"
    },
    {
        id: 11,
        title: "Bedding Set",
        description: "Luxury cotton bedding set with pillowcases",
        price: 159.99,
        category: "bedroom",
        image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=400&h=300&fit=crop"
    },
    {
        id: 12,
        title: "Dresser",
        description: "6-drawer dresser with modern handles",
        price: 449.99,
        category: "bedroom",
        image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop"
    },

    // Kitchen Products
    {
        id: 13,
        title: "Bar Stools",
        description: "Set of 2 adjustable bar stools with back support",
        price: 199.99,
        category: "kitchen",
        image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop",
        badge: "Popular"
    },
    {
        id: 14,
        title: "Kitchen Island",
        description: "Mobile kitchen island with storage and wheels",
        price: 699.99,
        category: "kitchen",
        image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=300&fit=crop",
        badge: "Best Seller"
    },
    {
        id: 15,
        title: "Pendant Lights",
        description: "Set of 3 modern pendant lights for kitchen island",
        price: 249.99,
        category: "kitchen",
        image: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400&h=300&fit=crop"
    },
    {
        id: 16,
        title: "Spice Rack",
        description: "Wall-mounted spice rack with 20 glass jars",
        price: 89.99,
        category: "kitchen",
        image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop"
    },
    {
        id: 17,
        title: "Kitchen Cart",
        description: "Rolling kitchen cart with wine storage",
        price: 299.99,
        category: "kitchen",
        image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=300&fit=crop",
        badge: "Sale"
    },
    {
        id: 18,
        title: "Cutting Board Set",
        description: "Bamboo cutting board set with different sizes",
        price: 49.99,
        category: "kitchen",
        image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop"
    },

    // Bathroom Products
    {
        id: 19,
        title: "Vanity Mirror",
        description: "LED-lit vanity mirror with touch controls",
        price: 199.99,
        category: "bathroom",
        image: "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=400&h=300&fit=crop",
        badge: "New"
    },
    {
        id: 20,
        title: "Towel Rack",
        description: "Wall-mounted towel rack with multiple bars",
        price: 79.99,
        category: "bathroom",
        image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=400&h=300&fit=crop"
    },
    {
        id: 21,
        title: "Shower Curtain",
        description: "Waterproof shower curtain with modern pattern",
        price: 39.99,
        category: "bathroom",
        image: "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=400&h=300&fit=crop"
    },
    {
        id: 22,
        title: "Bath Mat Set",
        description: "Non-slip bath mat set in various sizes",
        price: 59.99,
        category: "bathroom",
        image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=400&h=300&fit=crop"
    },
    {
        id: 23,
        title: "Storage Cabinet",
        description: "Over-toilet storage cabinet with shelves",
        price: 149.99,
        category: "bathroom",
        image: "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=400&h=300&fit=crop",
        badge: "Popular"
    },
    {
        id: 24,
        title: "Soap Dispenser Set",
        description: "Automatic soap dispenser with matching accessories",
        price: 89.99,
        category: "bathroom",
        image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=400&h=300&fit=crop"
    }
];

// Display products
function displayProducts(productsToShow = products) {
    const productsGrid = document.getElementById('productsGrid');
    productsGrid.innerHTML = '';

    productsToShow.forEach(product => {
        const productCard = createProductCard(product);
        productsGrid.appendChild(productCard);
    });
}

// Create product card
function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card fade-in-up';
    card.setAttribute('data-category', product.category);

    card.innerHTML = `
        <div class="product-image">
            <img src="${product.image}" alt="${product.title}" loading="lazy">
            ${product.badge ? `<div class="product-badge">${product.badge}</div>` : ''}
        </div>
        <div class="product-info">
            <h3 class="product-title">${product.title}</h3>
            <p class="product-description">${product.description}</p>
            <div class="product-price">$${product.price}</div>
            <div class="product-actions">
                <button class="btn btn-primary" onclick="window.location.href='products.html'">
                    <i class="fas fa-shopping-bag"></i> Shop Now
                </button>
                <button class="btn btn-secondary" onclick="viewProduct(${product.id})">
                    <i class="fas fa-eye"></i> View Details
                </button>
            </div>
        </div>
    `;

    return card;
}

// Filter products
function filterProducts(category, buttonElement = null) {
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(btn => btn.classList.remove('active'));
    
    // Find the clicked button or use the first matching button
    if (buttonElement) {
        buttonElement.classList.add('active');
    } else {
        const activeButton = document.querySelector(`[onclick*="${category}"]`);
        if (activeButton) activeButton.classList.add('active');
    }

    let filteredProducts;
    if (category === 'all') {
        filteredProducts = products;
    } else {
        filteredProducts = products.filter(product => product.category === category);
    }

    displayProducts(filteredProducts);
}

// Search products
function searchProducts(query) {
    const filteredProducts = products.filter(product => 
        product.title.toLowerCase().includes(query.toLowerCase()) ||
        product.description.toLowerCase().includes(query.toLowerCase()) ||
        product.category.toLowerCase().includes(query.toLowerCase())
    );
    
    displayProducts(filteredProducts);
}

// View product details
function viewProduct(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const modalContent = document.getElementById('modalContent');
    modalContent.innerHTML = `
        <div class="product-detail">
            <div class="product-detail-image">
                <img src="${product.image}" alt="${product.title}">
            </div>
            <div class="product-detail-info">
                <h2>${product.title}</h2>
                <p class="product-detail-description">${product.description}</p>
                <div class="product-detail-price">$${product.price}</div>
                <div class="product-detail-actions">
                    <button class="btn btn-primary" onclick="window.location.href='products.html'">
                        <i class="fas fa-shopping-bag"></i> Shop This Product
                    </button>
                    <button class="btn btn-secondary" onclick="closeModal()">
                        <i class="fas fa-times"></i> Close
                    </button>
                </div>
                <div class="product-features">
                    <h4>Features:</h4>
                    <ul>
                        <li>High-quality materials</li>
                        <li>Modern design</li>
                        <li>Easy assembly</li>
                        <li>1-year warranty</li>
                    </ul>
                </div>
            </div>
        </div>
    `;

    document.getElementById('productModal').style.display = 'block';
}

// Initialize products display
document.addEventListener('DOMContentLoaded', function() {
    displayProducts();
    
    // Search functionality
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const query = this.value.trim();
            if (query) {
                searchProducts(query);
            } else {
                displayProducts();
            }
        });
    }
});