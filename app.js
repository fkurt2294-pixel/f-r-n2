// LEZZET FIRINI - INTERACTIVE APPLICATION LOGIC

document.addEventListener('DOMContentLoaded', () => {

  // === 1. PRODUCT DATABASE ===
  const products = [
    {
      id: 'p1',
      title: 'Siyez Ekşi Mayalı Ekmek',
      category: 'ekmek',
      price: 55,
      image: 'images/sourdough.png',
      desc: '72 saat fermente edilmiş %100 ata tohumu siyez unlu, taş fırında odun ateşinde pişmiş ekşi mayalı ekmek.',
      badge: 'Taş Fırın'
    },
    {
      id: 'p2',
      title: 'Cevizli & Zeytinli Ekşi Maya',
      category: 'ekmek',
      price: 65,
      image: 'images/sourdough.png',
      desc: 'Doğal ekşi maya hamuruna taze Gemlik zeytini ve iri ceviz taneleri eklenmiş gurme lezzet.',
      badge: 'Çok Satan'
    },
    {
      id: 'p3',
      title: 'Tereyağlı Fransız Kruvasan',
      category: 'borek',
      price: 50,
      image: 'images/croissant.png',
      desc: 'Fransız Normandy tereyağı ile hazırlanan kat kat kat kat çıtır taze kruvasan.',
      badge: 'Sıcak'
    },
    {
      id: 'p4',
      title: 'Çikolatalı Belçika Roll Kruvasan',
      category: 'tatli',
      price: 65,
      image: 'images/croissant.png',
      desc: 'İçi yoğun Callebaut Belçika çikolata kremalı, üzeri fıstık kaplı çıtır roll kruvasan.',
      badge: 'Şefin Seçimi'
    },
    {
      id: 'p5',
      title: 'Geleneksel Kıymalı Su Böreği',
      category: 'borek',
      price: 80,
      image: 'images/hero.png',
      desc: 'Elde açılan incecik yufkalar, Bolu tereyağı ve özel dana kıymalı iç harçlı su böreği (Dilim).',
      badge: 'Geleneksel'
    },
    {
      id: 'p6',
      title: 'Peynirli & Dereotlu Taş Poğaça',
      category: 'borek',
      price: 22,
      image: 'images/hero.png',
      desc: 'Ezine peyniri ve taze dereotlu kıyır kıyır ev usulü fırın poğaçası.',
      badge: 'Taze'
    },
    {
      id: 'p7',
      title: 'Belçika Çikolatalı Özel Pasta',
      category: 'tatli',
      price: 450,
      image: 'images/cake.png',
      desc: '%70 bitter çikolata ganajı, taze orman meyveleri ve fıstık krokanlı doğum günü pastası.',
      badge: 'Spesiyal'
    },
    {
      id: 'p8',
      title: 'San Sebastian Cheesecake',
      category: 'tatli',
      price: 120,
      image: 'images/cake.png',
      desc: 'Akışkan iç kıvamı, karamelize olmuş üst yanığı ve yanında sıcak Belçika çikolatası sosu ile.',
      badge: 'Popüler'
    },
    {
      id: 'p9',
      title: 'Antep Fıstıklı Sıcak Baklava (250g)',
      category: 'tatli',
      price: 180,
      image: 'images/hero.png',
      desc: 'Gaziantep boz fıstığı ve saf sade yağ ile hazırlanan çıtır çıtır şerbetli baklava.',
      badge: 'Taze Çıktı'
    },
    {
      id: 'p10',
      title: 'Demleme Taze Türk Çayı',
      category: 'icecek',
      price: 25,
      image: 'images/hero.png',
      desc: 'Rize harmanından bakır demlikte demlenmiş tavşan kanı çay.',
      badge: 'Sıcak'
    },
    {
      id: 'p11',
      title: 'Artisan Latte / Cappuccino',
      category: 'icecek',
      price: 65,
      image: 'images/hero.png',
      desc: '%100 Arabica taze kavrulmuş kahve çekirdeklerinden hazırlanan özel kahve çeşitleri.',
      badge: 'Kahve'
    }
  ];

  // === 2. LIVE BATCH TRACKER DATA ===
  const trackerData = [
    {
      title: 'Siyez & Odun Ekşi Mayalı Ekmek',
      time: '3 dakika önce çıktı',
      status: 'fresh',
      statusText: 'FIRINDAN ÇIKTI',
      price: 55
    },
    {
      title: 'Tereyağlı Çıtır Kruvasan',
      time: '9 dakika önce çıktı',
      status: 'fresh',
      statusText: 'FIRINDAN ÇIKTI',
      price: 50
    },
    {
      title: 'Kıymalı Sıcak Su Böreği',
      time: '18 dakika önce çıktı',
      status: 'fresh',
      statusText: 'FIRINDAN ÇIKTI',
      price: 80
    },
    {
      title: 'Fıstıklı Sıcak Baklava Tepsi',
      time: 'Fırında - 12 dk kaldı',
      status: 'baking',
      statusText: 'FIRINDA PİŞİYOR',
      price: 180
    }
  ];

  // === 3. CART STATE ===
  let cart = [];

  // === DOM ELEMENTS ===
  const menuGrid = document.getElementById('menu-grid');
  const trackerGrid = document.getElementById('tracker-grid');
  const filterBtns = document.querySelectorAll('.filter-btn');
  const cartBtn = document.getElementById('open-cart-btn');
  const closeCartBtn = document.getElementById('close-cart-btn');
  const cartDrawer = document.getElementById('cart-drawer');
  const cartBackdrop = document.getElementById('cart-backdrop');
  const cartBody = document.getElementById('cart-body');
  const cartCountEl = document.getElementById('cart-count');
  const cartTotalPriceEl = document.getElementById('cart-total-price');
  const whatsappCheckoutBtn = document.getElementById('whatsapp-checkout-btn');
  const toastContainer = document.getElementById('toast-container');
  const header = document.getElementById('header');

  // === RENDER LIVE BATCH TRACKER ===
  function renderLiveTracker() {
    if (!trackerGrid) return;
    trackerGrid.innerHTML = trackerData.map(item => `
      <div class="tracker-card">
        <div class="tracker-card-top">
          <span class="tracker-badge ${item.status === 'fresh' ? 'badge-fresh' : 'badge-baking'}">
            <span class="pulse-dot"></span>
            ${item.statusText}
          </span>
        </div>
        <h3 class="tracker-title">${item.title}</h3>
        <p class="tracker-time"><i class="fa-regular fa-clock"></i> ${item.time}</p>
        <div class="tracker-action">
          <span class="tracker-price">${item.price} ₺</span>
          <button class="btn-sm-primary quick-add-btn" data-title="${item.title}" data-price="${item.price}">
            <i class="fa-solid fa-plus"></i> Hemen Al
          </button>
        </div>
      </div>
    `).join('');

    // Attach quick add handlers
    document.querySelectorAll('.quick-add-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const title = e.currentTarget.dataset.title;
        const price = parseFloat(e.currentTarget.dataset.price);
        addToCart({
          id: 'tracker-' + Math.random().toString(36).substr(2, 5),
          title: title,
          price: price,
          image: 'images/hero.png',
          qty: 1
        });
      });
    });
  }

  // === RENDER MENU ===
  function renderMenu(filter = 'all') {
    if (!menuGrid) return;
    const filtered = filter === 'all'
      ? products
      : products.filter(p => p.category === filter);

    menuGrid.innerHTML = filtered.map(p => `
      <div class="product-card">
        <div class="product-img-wrapper">
          <img src="${p.image}" alt="${p.title}" class="product-img" loading="lazy">
          <span class="product-tag">${p.badge}</span>
        </div>
        <div class="product-content">
          <h3 class="product-title">${p.title}</h3>
          <p class="product-desc">${p.desc}</p>
          <div class="product-footer">
            <span class="product-price">${p.price} ₺</span>
            <button class="add-cart-btn" data-id="${p.id}" aria-label="Sepete Ekle">
              <i class="fa-solid fa-plus"></i>
            </button>
          </div>
        </div>
      </div>
    `).join('');

    // Attach add to cart handlers
    document.querySelectorAll('.add-cart-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = e.currentTarget.dataset.id;
        const prod = products.find(p => p.id === id);
        if (prod) {
          addToCart({ ...prod, qty: 1 });
        }
      });
    });
  }

  // === FILTER CLICK HANDLERS ===
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;
      renderMenu(filter);
    });
  });

  // === CART MANAGEMENT ===
  function addToCart(item) {
    const existingIndex = cart.findIndex(c => c.id === item.id);
    if (existingIndex > -1) {
      cart[existingIndex].qty += item.qty || 1;
    } else {
      cart.push(item);
    }
    updateCartUI();
    showToast(`"${item.title}" sepetinize eklendi!`);
  }

  function removeFromCart(id) {
    cart = cart.filter(c => c.id !== id);
    updateCartUI();
  }

  function updateCartQty(id, change) {
    const item = cart.find(c => c.id === id);
    if (item) {
      item.qty += change;
      if (item.qty <= 0) {
        removeFromCart(id);
      } else {
        updateCartUI();
      }
    }
  }

  function updateCartUI() {
    // Total Items Count
    const totalCount = cart.reduce((sum, item) => sum + item.qty, 0);
    cartCountEl.textContent = totalCount;

    // Total Price
    const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
    cartTotalPriceEl.textContent = `${totalPrice} ₺`;

    // Render Drawer Content
    if (cart.length === 0) {
      cartBody.innerHTML = `
        <div style="text-align: center; color: var(--text-muted); margin-top: 3rem;">
          <i class="fa-solid fa-basket-shopping" style="font-size: 3rem; margin-bottom: 1rem; opacity: 0.4;"></i>
          <p>Sepetiniz henüz boş.</p>
          <p style="font-size: 0.85rem; margin-top: 0.5rem;">Fırından taze çıkan lezzetlerimizi keşfedin!</p>
        </div>
      `;
    } else {
      cartBody.innerHTML = cart.map(item => `
        <div class="cart-item">
          <img src="${item.image}" alt="${item.title}" class="cart-item-img">
          <div class="cart-item-details">
            <div class="cart-item-name">${item.title}</div>
            <div class="cart-item-price">${item.price} ₺</div>
            <div class="cart-item-qty">
              <button class="qty-btn" onclick="window.changeCartQty('${item.id}', -1)">-</button>
              <span style="font-weight: 700; font-size: 0.9rem;">${item.qty}</span>
              <button class="qty-btn" onclick="window.changeCartQty('${item.id}', 1)">+</button>
            </div>
          </div>
          <button style="color: var(--color-accent); font-size: 1rem;" onclick="window.removeCartItem('${item.id}')">
            <i class="fa-solid fa-trash-can"></i>
          </button>
        </div>
      `).join('');
    }
  }

  // Global exposes for inline cart item clicks
  window.changeCartQty = (id, change) => updateCartQty(id, change);
  window.removeCartItem = (id) => removeFromCart(id);

  // Cart Drawer Toggles
  function openCart() {
    cartDrawer.classList.add('open');
    cartBackdrop.classList.add('open');
  }

  function closeCart() {
    cartDrawer.classList.remove('open');
    cartBackdrop.classList.remove('open');
  }

  cartBtn.addEventListener('click', openCart);
  closeCartBtn.addEventListener('click', closeCart);
  cartBackdrop.addEventListener('click', closeCart);

  // WHATSAPP CHECKOUT GENERATOR
  whatsappCheckoutBtn.addEventListener('click', () => {
    if (cart.length === 0) {
      showToast('Sepetiniz boş! Lütfen önce ürün ekleyin.', 'error');
      return;
    }

    let message = `*🥖 LEZZET FIRINI - SİPARİŞ DETAYI*\n\n`;
    message += `Merhaba! Web siteniz üzerinden aşağıdaki siparişi vermek istiyorum:\n\n`;

    let total = 0;
    cart.forEach((item, index) => {
      const subtotal = item.price * item.qty;
      total += subtotal;
      message += `${index + 1}. *${item.title}* x ${item.qty} Adet = ${subtotal} ₺\n`;
    });

    message += `\n*Toplam Tutar:* ${total} ₺\n`;
    message += `*Tarih/Saat:* ${new Date().toLocaleString('tr-TR')}\n\n`;
    message += `Adresim ve teslimat detayları hakkında bilgi verebilir misiniz? Teşekkürler!`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/905421815321?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
  });

  // === 4. CUSTOM CAKE BUILDER LOGIC ===
  let customCakeState = {
    size: '6-8',
    sizePrice: 400,
    base: 'cikolata',
    basePrice: 0,
    filling: 'cilek-cikolata',
    fillingPrice: 40,
    message: ''
  };

  function updateCakeBuilder() {
    const total = customCakeState.sizePrice + customCakeState.basePrice + customCakeState.fillingPrice;
    document.getElementById('cake-total-price').textContent = `${total} ₺`;

    const sizeLabels = { '6-8': '6 - 8 Kişilik', '10-12': '10 - 12 Kişilik', '15-20': '15 - 20 Kişilik' };
    const baseLabels = { 'cikolata': 'Belçika Çikolatalı', 'vanilya': 'Fransız Vanilyalı', 'redvelvet': 'Red Velvet' };
    const fillingLabels = { 'cilek-cikolata': 'Taze Çilek & Çikolata', 'antep-fistigi': 'Taze Antep Fıstığı', 'karamel-muz': 'Tuzlu Karamel & Muz' };

    let text = `${sizeLabels[customCakeState.size]} | ${baseLabels[customCakeState.base]} | ${fillingLabels[customCakeState.filling]}`;
    if (customCakeState.message) {
      text += ` | Not: "${customCakeState.message}"`;
    }
    document.getElementById('cake-summary-text').textContent = text;
  }

  // Setup options selection listeners
  function setupOptionGroup(groupId, stateKey, priceKey) {
    const container = document.getElementById(groupId);
    if (!container) return;
    const cards = container.querySelectorAll('.option-card');
    cards.forEach(card => {
      card.addEventListener('click', () => {
        cards.forEach(c => c.classList.remove('selected'));
        card.classList.add('selected');
        customCakeState[stateKey] = card.dataset.value;
        customCakeState[priceKey] = parseFloat(card.dataset.price || 0);
        updateCakeBuilder();
      });
    });
  }

  setupOptionGroup('size-options', 'size', 'sizePrice');
  setupOptionGroup('base-options', 'base', 'basePrice');
  setupOptionGroup('filling-options', 'filling', 'fillingPrice');

  const cakeMessageInput = document.getElementById('cake-message-input');
  if (cakeMessageInput) {
    cakeMessageInput.addEventListener('input', (e) => {
      customCakeState.message = e.target.value.trim();
      updateCakeBuilder();
    });
  }

  // Add Custom Cake to Cart
  const addCustomCakeBtn = document.getElementById('add-custom-cake-btn');
  if (addCustomCakeBtn) {
    addCustomCakeBtn.addEventListener('click', () => {
      const total = customCakeState.sizePrice + customCakeState.basePrice + customCakeState.fillingPrice;
      const cakeSummaryText = document.getElementById('cake-summary-text').textContent;

      addToCart({
        id: 'cake-' + Date.now(),
        title: `Özel Tasarım Pasta (${customCakeState.size} Kişilik)`,
        price: total,
        image: 'images/cake.png',
        qty: 1,
        desc: cakeSummaryText
      });
    });
  }

  // === 5. TOAST SYSTEM ===
  function showToast(message, type = 'success') {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `
      <i class="fa-solid ${type === 'success' ? 'fa-circle-check' : 'fa-triangle-exclamation'}" 
         style="color: ${type === 'success' ? 'var(--color-primary)' : 'var(--color-accent)'}; font-size: 1.2rem;"></i>
      <span>${message}</span>
    `;
    toastContainer.appendChild(toast);
    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px)';
      toast.style.transition = '0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, 3000);
  }

  // === 6. SCROLL HEADER & NAV HIGHLIGHT ===
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // INITIALIZE
  renderLiveTracker();
  renderMenu('all');
  updateCartUI();
  updateCakeBuilder();

});
