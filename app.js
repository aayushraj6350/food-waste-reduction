const app = {
    user: null,
    currentMode: 'signin',
    selectedItem: null,
    currentShopIdForRating: null,
    tempRating: 0,
    trackingInterval: null,
    orders: [], // Array to store completed orders
    
    imageMap: {
        'Paneer Tikka': 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=400&h=300&fit=crop',
        'Butter Chicken': 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=400&h=300&fit=crop',
        'Dal Makhani': 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400&h=300&fit=crop',
        'Garlic Naan': 'https://images.unsplash.com/photo-1626074353765-517a681e40be?w=400&h=300&fit=crop',
        'Biryani': 'https://images.unsplash.com/photo-1563379091339-03b21bc4a4f8?w=400&h=300&fit=crop',
        'Gulab Jamun': 'https://images.unsplash.com/photo-1589119908995-c6837fa14848?w=400&h=300&fit=crop',
        'Samosa': 'https://images.unsplash.com/photo-1601050638917-3f00fd0aa4ba?w=400&h=300&fit=crop',
        'Grilled Fish': 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=400&h=300&fit=crop',
        'Sushi Platter': 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=400&h=300&fit=crop',
        'Margherita Pizza': 'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=400&h=300&fit=crop',
        'Pasta Carbonara': 'https://images.unsplash.com/photo-1612874742237-6526221588e3?w=400&h=300&fit=crop',
        'Avocado Toast': 'https://images.unsplash.com/photo-1525351484163-7529414344d8?w=400&h=300&fit=crop',
        'Vegan Burger': 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=300&fit=crop',
        'Hakka Noodles': 'https://images.unsplash.com/photo-1585032226651-759b368d7246?w=400&h=300&fit=crop',
        'Dim Sum': 'https://images.unsplash.com/photo-1496116218417-1a781b1c416c?w=400&h=300&fit=crop',
        'Tiramisu': 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=400&h=300&fit=crop',
        'default': 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop'
    },

    shops: [
        {
            id: 's1', name: 'The Grand Heritage', isDiscountActive: true, rating: 4.5, totalRatings: 120,
            items: [
                { id: 's1i0', name: 'Paneer Tikka', price: 280 },
                { id: 's1i1', name: 'Butter Chicken', price: 450 },
                { id: 's1i2', name: 'Dal Makhani', price: 220 },
                { id: 's1i3', name: 'Garlic Naan', price: 80 }
            ]
        },
        {
            id: 's2', name: 'Oceanic Delights', isDiscountActive: false, rating: 4.2, totalRatings: 85,
            items: [
                { id: 's2i0', name: 'Grilled Fish', price: 550 },
                { id: 's2i1', name: 'Sushi Platter', price: 890 }
            ]
        },
        {
            id: 's3', name: 'Spice Route Kitchen', isDiscountActive: true, rating: 4.8, totalRatings: 210,
            items: [
                { id: 's3i0', name: 'Hakka Noodles', price: 220 },
                { id: 's3i1', name: 'Dim Sum', price: 280 }
            ]
        },
        {
            id: 's4', name: 'The Italian Bistro', isDiscountActive: false, rating: 4.6, totalRatings: 150,
            items: [
                { id: 's4i0', name: 'Margherita Pizza', price: 350 },
                { id: 's4i1', name: 'Tiramisu', price: 280 }
            ]
        },
        {
            id: 's5', name: 'Urban Greens Cafe', isDiscountActive: true, rating: 4.4, totalRatings: 95,
            items: [
                { id: 's5i0', name: 'Avocado Toast', price: 320 },
                { id: 's5i1', name: 'Vegan Burger', price: 380 }
            ]
        }
    ],

    init() {
        this.updateTimeStatus();
        setInterval(() => this.updateTimeStatus(), 60000);
    },

    isAfter8PM() {
        const now = new Date();
        return now.getHours() >= 20;
    },

    updateTimeStatus() {
        const statuses = ['time-status', 'menu-time-status'];
        const is8PM = this.isAfter8PM();
        const timeString = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        
        statuses.forEach(id => {
            const el = document.getElementById(id);
            if (el) {
                el.innerHTML = is8PM 
                    ? `<span style="color: var(--primary)">🕒 ${timeString} - 50% Food Rescue Is Active!</span>`
                    : `<span>🕒 ${timeString} - Standard Pricing</span>`;
            }
        });
    },

    getItemImage(name) {
        return this.imageMap[name] || `https://source.unsplash.com/featured/?${encodeURIComponent(name)},food`;
    },

    showView(id) {
        ['hero-view', 'customer-dashboard', 'shopkeeper-dashboard', 'restaurant-list-view', 'menu-view', 'checkout-view', 'payment-view', 'track-order-view', 'order-history-view'].forEach(viewId => {
            const el = document.getElementById(viewId);
            if (el) el.classList.add('hidden');
        });
        document.getElementById(id).classList.remove('hidden');
    },

    showAuthModal(mode, typeSuggestion) {
        this.currentMode = mode;
        const modal = document.getElementById('auth-modal');
        document.getElementById('modal-title').innerText = mode === 'signin' ? 'Sign In' : 'Sign Up';
        modal.classList.remove('hidden');
        document.getElementById('auth-choice').classList.remove('hidden');
        document.getElementById('auth-form').classList.add('hidden');
        if (typeSuggestion) this.selectAuthType(typeSuggestion);
    },

    closeModal() { document.getElementById('auth-modal').classList.add('hidden'); },

    selectAuthType(type) {
        document.getElementById('auth-choice').classList.add('hidden');
        document.getElementById('auth-form').classList.remove('hidden');
        const shopNameGroup = document.getElementById('shop-name-group');
        if (type === 'shopkeeper' && this.currentMode === 'signup') {
            shopNameGroup.classList.remove('hidden');
        } else {
            shopNameGroup.classList.add('hidden');
        }
        document.getElementById('submit-btn').innerText = `${this.currentMode === 'signin' ? 'Sign In' : 'Sign Up'} as ${type}`;
        document.getElementById('auth-form').onsubmit = (e) => { e.preventDefault(); this.login(type); };
    },

    login(type) {
        const email = document.getElementById('email').value;
        const shopNameInput = document.getElementById('shop-name-input').value;
        this.user = { 
            name: email.split('@')[0], 
            type: type,
            shopName: shopNameInput || `${email.split('@')[0]}'s Kitchen`
        };
        if (type === 'shopkeeper' && this.currentMode === 'signup') {
            const newShop = {
                id: 's' + (this.shops.length + 1),
                name: this.user.shopName,
                isDiscountActive: false,
                rating: 0,
                totalRatings: 0,
                items: []
            };
            this.shops.push(newShop);
        }
        this.closeModal();
        this.updateUIAfterLogin();
    },

    logout() {
        this.user = null;
        this.orders = []; // Clear for security
        this.showView('hero-view');
        document.getElementById('auth-buttons').classList.remove('hidden');
        document.getElementById('user-profile').classList.add('hidden');
    },

    updateUIAfterLogin() {
        document.getElementById('auth-buttons').classList.add('hidden');
        document.getElementById('user-profile').classList.remove('hidden');
        document.getElementById('user-name').innerText = `👋 Hello, ${this.user.name}`;
        this.showView(this.user.type === 'customer' ? 'customer-dashboard' : 'shopkeeper-dashboard');
        if (this.user.type === 'shopkeeper') this.renderShopkeeperView();
    },

    showRestaurantList() {
        this.showView('restaurant-list-view');
        const grid = document.getElementById('shop-grid');
        grid.innerHTML = '';
        this.shops.forEach(shop => {
            const card = document.createElement('div');
            card.className = 'shop-card glass-card';
            const ratingText = shop.totalRatings > 0 ? `${shop.rating.toFixed(1)} ★ (${shop.totalRatings} Reviews)` : 'New Restaurant';
            card.innerHTML = `
                <h3>${shop.name}</h3>
                <div class="shop-rating">${ratingText}</div>
                <p>${shop.isDiscountActive ? '✅ 50% Off Enabled' : '❌ Fixed Prices'}</p>
                <button class="btn-primary full-width" onclick="app.showMenu('${shop.id}')" style="margin-top: 1rem;">View Menu</button>
            `;
            grid.appendChild(card);
        });
    },

    showMenu(shopId) {
        const shop = this.shops.find(s => s.id === shopId);
        this.currentShop = shop;
        document.getElementById('menu-restaurant-name').innerText = shop.name;
        this.showView('menu-view');
        this.renderMenuItems(shop);
    },

    renderMenuItems(shop) {
        const container = document.getElementById('menu-items-container');
        container.innerHTML = '';
        const is8PM = this.isAfter8PM();
        shop.items.forEach(item => {
            const isDiscounted = is8PM && shop.isDiscountActive;
            const price = isDiscounted ? item.price * 0.5 : item.price;
            const card = document.createElement('div');
            card.className = 'menu-item-card';
            card.innerHTML = `
                <div class="item-img-container">
                    <img src="${this.getItemImage(item.name)}" alt="${item.name}">
                </div>
                <div>
                    <h4>${item.name}</h4>
                    <p>${isDiscounted ? `<span class="price-strike">₹${item.price}</span>` : ''} <span class="price-new">₹${price.toFixed(2)}</span></p>
                </div>
                <button class="btn-secondary" onclick="app.orderItem('${item.name}', ${price}, '${shop.id}')">Add to Cart</button>
            `;
            container.appendChild(card);
        });
    },

    orderItem(name, price, shopId) {
        this.selectedItem = { name, price, shopId };
        this.showView('checkout-view');
        window.scrollTo(0, 0);
    },

    handleAddressSubmit(e) {
        e.preventDefault();
        const name = document.getElementById('checkout-name').value;
        const address = document.getElementById('checkout-address').value;
        document.getElementById('payment-summary').innerText = `${this.selectedItem.name} - ₹${this.selectedItem.price.toFixed(2)} for ${name} at ${address}`;
        this.showView('payment-view');
    },

    completeOrder(method) {
        const shop = this.shops.find(s => s.id === this.selectedItem.shopId);
        const order = {
            id: `SF-${Math.floor(1000 + Math.random() * 9000)}`,
            restaurant: shop.name,
            item: this.selectedItem.name,
            amount: this.selectedItem.price,
            date: new Date().toLocaleDateString() + ' ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            method: method
        };
        this.orders.unshift(order); // Add to history
        this.startOrderTracking(order.id);
    },

    startOrderTracking(orderId) {
        this.showView('track-order-view');
        document.getElementById('track-order-id').innerText = `Order ${orderId}`;
        
        document.getElementById('step-delivery').classList.remove('active');
        document.getElementById('step-arrived').classList.remove('active');
        document.getElementById('eta-time').innerText = "25 - 35 mins";

        setTimeout(() => {
            document.getElementById('step-delivery').classList.add('active');
            document.getElementById('eta-time').innerText = "10 - 15 mins";
        }, 5000);

        setTimeout(() => {
            document.getElementById('step-arrived').classList.add('active');
            document.getElementById('eta-time').innerText = "Arrived!";
        }, 10000);
    },

    completeTracking() {
        this.showRatingFlow(this.selectedItem.shopId);
    },

    showOrderHistory() {
        this.showView('order-history-view');
        const list = document.getElementById('order-history-list');
        
        if (this.orders.length === 0) {
            list.innerHTML = '<p class="text-muted" style="text-align: center; padding: 2rem;">No orders yet. Start saving food today!</p>';
            return;
        }

        list.innerHTML = this.orders.map(order => `
            <div class="order-history-item">
                <div class="order-info">
                    <span class="status-badge">Delivered</span>
                    <h4>${order.item}</h4>
                    <p class="order-date">${order.restaurant} • ${order.date}</p>
                </div>
                <div class="order-amount">
                    <span class="order-price">₹${order.amount.toFixed(2)}</span>
                    <span class="text-muted" style="font-size: 0.8rem;">Paid via ${order.method}</span>
                </div>
            </div>
        `).join('');
    },

    showRatingFlow(shopId) {
        const shop = this.shops.find(s => s.id === shopId);
        this.currentShopIdForRating = shopId;
        document.getElementById('rating-shop-name').innerText = `How was your meal from ${shop.name}?`;
        document.getElementById('rating-modal').classList.remove('hidden');
        this.setRating(0); 
    },

    setRating(n) {
        this.tempRating = n;
        const stars = document.querySelectorAll('.star');
        stars.forEach((s, i) => {
            if (i < n) s.classList.add('active');
            else s.classList.remove('active');
        });
    },

    submitRating() {
        if (this.tempRating === 0) {
            alert("Please select a star rating!");
            return;
        }
        const shop = this.shops.find(s => s.id === this.currentShopIdForRating);
        const totalWeight = (shop.rating || 0) * (shop.totalRatings || 0);
        shop.totalRatings = (shop.totalRatings || 0) + 1;
        shop.rating = (totalWeight + this.tempRating) / shop.totalRatings;
        
        alert(`Thank you! Your ${this.tempRating}-star rating has been submitted.`);
        document.getElementById('rating-modal').classList.add('hidden');
        this.showView('customer-dashboard');
    },

    renderShopkeeperView() {
        let myShop = this.shops.find(s => s.name === this.user.shopName) || this.shops[0];
        document.getElementById('shop-name-display').innerText = myShop.name;
        document.getElementById('discount-toggle').checked = myShop.isDiscountActive;
        this.updateShopDiscountStatus(myShop);
        this.renderShopkeeperMenu(myShop);
    },

    toggleDiscount() {
        let myShop = this.shops.find(s => s.name === this.user.shopName) || this.shops[0];
        myShop.isDiscountActive = !myShop.isDiscountActive;
        this.updateShopDiscountStatus(myShop);
    },

    updateShopDiscountStatus(shop) {
        document.getElementById('discount-status').innerText = `Current Status: ${shop.isDiscountActive ? 'Active (50% Off after 8 PM)' : 'Fixed Price'}`;
    },

    renderShopkeeperMenu(shop) {
        const list = document.getElementById('menu-items-list');
        list.innerHTML = '';
        shop.items.forEach(item => {
            const row = document.createElement('div');
            row.className = 'item-row';
            row.innerHTML = `
                <span>${item.name}</span>
                <div>
                    <span>₹${item.price}</span>
                    <button class="btn-delete" onclick="app.deleteItem('${shop.id}', '${item.id}')" style="margin-left: 1rem;">Delete</button>
                </div>
            `;
            list.appendChild(row);
        });
    },

    deleteItem(shopId, itemId) {
        if (confirm("Delete this item from your menu?")) {
            const shop = this.shops.find(s => s.id === shopId);
            shop.items = shop.items.filter(i => i.id !== itemId);
            this.renderShopkeeperMenu(shop);
        }
    },

    addMenuItem() {
        const name = prompt("Enter item name (e.g., Chicken Curry):");
        const price = parseFloat(prompt("Enter price (₹):"));
        if (name && !isNaN(price)) {
            let myShop = this.shops.find(s => s.name === this.user.shopName) || this.shops[0];
            myShop.items.push({ id: `new${Date.now()}`, name, price });
            this.renderShopkeeperMenu(myShop);
        }
    }
};

window.onload = () => app.init();
