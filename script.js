// ============================================
// SONORA PREMIUM TEMPLATE - COMPLETE JAVASCRIPT
// Includes: Dark Mode | Timer | Cart | Mobile Menu | Interactions
// ============================================

// ========== DARK MODE TOGGLE ==========
(function() {
    const darkModeToggle = document.getElementById('darkModeToggle');
    const isDarkMode = localStorage.getItem('darkMode') === 'true';
    
    if (isDarkMode) {
        document.body.classList.add('dark-mode');
        if (darkModeToggle) {
            darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        }
    }
    
    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');
            const isDark = document.body.classList.contains('dark-mode');
            localStorage.setItem('darkMode', isDark);
            
            if (isDark) {
                darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
            } else {
                darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
            }
        });
    }
})();

// ========== FLASH SALE TIMER ==========
(function() {
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + 2);
    targetDate.setHours(23, 59, 59, 999);
    
    function updateTimer() {
        const now = new Date();
        const difference = targetDate - now;
        
        if (difference <= 0) {
            document.getElementById('days').innerHTML = '00';
            document.getElementById('hours').innerHTML = '00';
            document.getElementById('minutes').innerHTML = '00';
            document.getElementById('seconds').innerHTML = '00';
            
            const shopBtn = document.getElementById('shopNowBtn');
            if (shopBtn) {
                shopBtn.innerHTML = '<i class="fas fa-ticket-alt"></i> Sale Ended';
                shopBtn.style.opacity = '0.7';
                shopBtn.disabled = true;
            }
            return;
        }
        
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (86400000)) / (3600000));
        const minutes = Math.floor((difference % 3600000) / 60000);
        const seconds = Math.floor((difference % 60000) / 1000);
        
        document.getElementById('days').innerHTML = days.toString().padStart(2, '0');
        document.getElementById('hours').innerHTML = hours.toString().padStart(2, '0');
        document.getElementById('minutes').innerHTML = minutes.toString().padStart(2, '0');
        document.getElementById('seconds').innerHTML = seconds.toString().padStart(2, '0');
    }
    
    setInterval(updateTimer, 1000);
    updateTimer();
})();

// ========== MOBILE MENU TOGGLE ==========
(function() {
    const menuToggle = document.getElementById('menuToggle');
    const desktopNav = document.querySelector('.desktop-nav');
    let isMenuOpen = false;
    
    function closeMenu() {
        if (desktopNav && desktopNav.classList.contains('open')) {
            desktopNav.classList.remove('open');
            isMenuOpen = false;
            if (menuToggle) {
                const icon = menuToggle.querySelector('i');
                if (icon) icon.className = 'fas fa-bars';
            }
        }
    }
    
    function toggleMenu() {
        if (desktopNav) {
            if (desktopNav.classList.contains('open')) {
                closeMenu();
            } else {
                desktopNav.classList.add('open');
                isMenuOpen = true;
                if (menuToggle) {
                    const icon = menuToggle.querySelector('i');
                    if (icon) icon.className = 'fas fa-times';
                }
            }
        }
    }
    
    if (menuToggle && window.innerWidth <= 850) {
        menuToggle.style.display = 'flex';
        menuToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleMenu();
        });
    }
    
    // Add styles for mobile menu
    const style = document.createElement('style');
    style.textContent = `
        @media (max-width: 850px) {
            .desktop-nav {
                position: fixed;
                top: 70px;
                left: 0;
                right: 0;
                background: rgba(255, 255, 255, 0.98);
                backdrop-filter: blur(20px);
                flex-direction: column;
                align-items: center;
                gap: 0.5rem;
                padding: 1.5rem;
                box-shadow: 0 20px 30px rgba(0, 0, 0, 0.1);
                border-radius: 0 0 24px 24px;
                transform: translateY(-150%);
                opacity: 0;
                visibility: hidden;
                transition: all 0.35s ease;
                z-index: 998;
                border-bottom: 3px solid #667eea;
            }
            body.dark-mode .desktop-nav {
                background: rgba(18, 25, 45, 0.98);
            }
            .desktop-nav.open {
                transform: translateY(0);
                opacity: 1;
                visibility: visible;
            }
            .desktop-nav a {
                width: 100%;
                text-align: center;
                padding: 0.8rem;
            }
        }
    `;
    document.head.appendChild(style);
})();

// ========== CART FUNCTIONALITY ==========
(function() {
    let cartCount = 0;
    const cartBadge = document.querySelector('.cart-badge');
    const cartBtn = document.getElementById('cartBtn');
    
    function updateCartBadge() {
        if (cartBadge) {
            cartBadge.textContent = cartCount;
        }
    }
    
    if (cartBtn) {
        cartBtn.addEventListener('click', () => {
            cartCount++;
            updateCartBadge();
            alert(`🛍️ Added to cart! Total items: ${cartCount}`);
        });
    }
    
    // Add to cart buttons on products
    const addToCartBtns = document.querySelectorAll('.cart-add-btn');
    addToCartBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            cartCount++;
            updateCartBadge();
            
            // Show mini feedback
            const originalText = btn.innerHTML;
            btn.innerHTML = '<i class="fas fa-check"></i> Added';
            setTimeout(() => {
                btn.innerHTML = originalText;
            }, 1000);
        });
    });
})();

// ========== QUICK VIEW OVERLAY ==========
(function() {
    const quickViews = document.querySelectorAll('.quick-overlay');
    quickViews.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const productCard = btn.closest('.product-card');
            const productTitle = productCard?.querySelector('.product-title')?.innerText || 'Product';
            alert(`🔍 Quick View - ${productTitle}\nMore details coming soon!`);
        });
    });
})();

// ========== PRODUCT CARD CLICK ==========
(function() {
    const productCards = document.querySelectorAll('.product-card');
    productCards.forEach(card => {
        card.addEventListener('click', () => {
            const title = card.querySelector('.product-title')?.innerText || 'Product';
            alert(`📦 ${title} - View product details coming soon!`);
        });
    });
})();

// ========== SHOP BUTTONS ==========
(function() {
    const shopBtn = document.getElementById('shopBtn');
    if (shopBtn) {
        shopBtn.addEventListener('click', () => {
            alert('🛒 Explore our premium collection!');
        });
    }
    
    const shopNowBtn = document.getElementById('shopNowBtn');
    if (shopNowBtn) {
        shopNowBtn.addEventListener('click', () => {
            alert('⚡ Flash Sale items are waiting for you!');
        });
    }
})();

// ========== NAVIGATION LINKS ==========
(function() {
    const navLinks = document.querySelectorAll('.desktop-nav a, .bottom-nav-items a, .section-link, .store-links a, .legal-links a');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const text = link.innerText.trim() || link.querySelector('span')?.innerText || 'Page';
            alert(`🚀 Navigating to ${text} - Coming soon!`);
        });
    });
})();

// ========== ICON BUTTONS ==========
(function() {
    const searchBtn = document.getElementById('searchBtn');
    const userBtn = document.getElementById('userBtn');
    const signupBtn = document.getElementById('signupBtn');
    
    if (searchBtn) {
        searchBtn.addEventListener('click', () => {
            alert('🔍 Search products by name, brand, or category');
        });
    }
    
    if (userBtn) {
        userBtn.addEventListener('click', () => {
            alert('👤 Account - Sign in or create new account');
        });
    }
    
    if (signupBtn) {
        signupBtn.addEventListener('click', () => {
            alert('📝 Sign up for exclusive deals and 10% off your first order!');
        });
    }
})();

// ========== NEWSLETTER SUBSCRIPTION ==========
(function() {
    const subBtn = document.getElementById('subBtn');
    const newsEmail = document.getElementById('newsEmail');
    
    if (subBtn && newsEmail) {
        subBtn.addEventListener('click', () => {
            const email = newsEmail.value.trim();
            if (email && email.includes('@') && email.includes('.')) {
                alert('✅ Subscribed! Check your email for 10% off coupon.');
                newsEmail.value = '';
            } else {
                alert('❌ Please enter a valid email address.');
            }
        });
        
        newsEmail.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                subBtn.click();
            }
        });
    }
})();

// ========== SOCIAL ICONS ==========
(function() {
    const socialIcons = document.querySelectorAll('.social-icon');
    const platforms = ['Instagram', 'Twitter', 'Facebook', 'YouTube'];
    socialIcons.forEach((icon, index) => {
        icon.addEventListener('click', (e) => {
            e.preventDefault();
            alert(`📱 Follow us on ${platforms[index] || 'social media'}!`);
        });
    });
})();

// ========== BOTTOM NAVIGATION ACTIVE STATE ==========
(function() {
    const bottomNavItems = document.querySelectorAll('.bottom-nav-items a');
    bottomNavItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            bottomNavItems.forEach(nav => nav.classList.remove('active'));
            item.classList.add('active');
        });
    });
})();

// ========== SCROLL HEADER EFFECT ==========
(function() {
    const floatingHeader = document.querySelector('.floating-header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            floatingHeader.style.boxShadow = '0 20px 45px rgba(0, 0, 0, 0.12), 0 0 0 1px rgba(102, 126, 234, 0.25)';
            floatingHeader.style.background = 'rgba(255, 255, 255, 0.98)';
            
            if (document.body.classList.contains('dark-mode')) {
                floatingHeader.style.background = 'rgba(18, 25, 45, 0.98)';
            }
        } else {
            floatingHeader.style.boxShadow = '0 15px 40px rgba(0, 0, 0, 0.08), 0 0 0 1px rgba(102, 126, 234, 0.15)';
            floatingHeader.style.background = 'rgba(255, 255, 255, 0.95)';
            
            if (document.body.classList.contains('dark-mode')) {
                floatingHeader.style.background = 'rgba(18, 25, 45, 0.95)';
            }
        }
    });
})();

// ========== FEATURE ITEMS INTERACTION ==========
(function() {
    const featureItems = document.querySelectorAll('.feature-item');
    featureItems.forEach(item => {
        item.addEventListener('click', () => {
            const title = item.querySelector('h4')?.innerText || 'Feature';
            alert(`✨ ${title} - Learn more about this benefit!`);
        });
    });
})();

console.log('✅ SONORA Template loaded! Dark mode, timer, cart, and all interactions ready!');
