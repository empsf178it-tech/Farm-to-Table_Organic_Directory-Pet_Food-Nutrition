/**
 * Farm-to-Table Organic Directory - Pet Food & Nutrition
 * Product Catalog, Search, Filtering & Modal: js/products.js
 */

const PRODUCTS_DATA = [
  {
    id: 'prod-1',
    name: 'Free-Range Pasture Chicken Meal',
    category: 'Dog Food',
    price: 34.99,
    image: 'assets/images/organic-dog-food.jpg',
    supplier: 'Meadow Valley Organic Farms',
    isOrganic: true,
    rating: 4.9,
    description: 'Human-grade, slow-steamed free-range chicken blended with certified organic carrots, celery, and omega oil.',
    ingredients: ['Organic Chicken', 'Organic Sweet Potatoes', 'Organic Carrots', 'Flaxseed Oil', 'Spinach', 'Vitamins & Minerals'],
    nutrition: 'Protein 38% | Fat 18% | Moisture 10%'
  },
  {
    id: 'prod-2',
    name: 'Wild Pacific Salmon & Sweet Potato',
    category: 'Dog Food',
    price: 38.50,
    image: 'assets/images/salmon.jpg',
    supplier: 'Pacific Crest Catch & Co.',
    isOrganic: true,
    rating: 5.0,
    description: 'Wild sustainably-sourced salmon rich in DHA & EPA omega fatty acids to nurture lustrous coats and healthy skin.',
    ingredients: ['Wild Salmon', 'Organic Sweet Potatoes', 'Organic Peas', 'Blueberries', 'Kelp'],
    nutrition: 'Protein 34% | Fat 16% | Moisture 10%'
  },
  {
    id: 'prod-3',
    name: 'Grass-Fed Angus Beef Gently Steamed Feast',
    category: 'Fresh Meals',
    price: 42.00,
    image: 'assets/images/fresh-meat-ingredients.jpg',
    supplier: 'Highland Ridge Pastures',
    isOrganic: true,
    rating: 4.8,
    description: 'Fresh gently cooked beef patties packed in biodegradable chilled packs directly from organic pastures.',
    ingredients: ['Pasture-Raised Beef', 'Beef Liver', 'Organic Pumpkin', 'Kale', 'Bone Meal'],
    nutrition: 'Protein 42% | Fat 20% | Moisture 68%'
  },
  {
    id: 'prod-4',
    name: 'Grain-Free Turkey & Cranberry Cat Morsels',
    category: 'Cat Food',
    price: 26.90,
    image: 'assets/images/organic-cat-food.jpg',
    supplier: 'Whisker Green Sustainable Cattery',
    isOrganic: true,
    rating: 4.9,
    description: 'Moisture-dense turkey morsels fortified with cranberries to support sensitive urinary feline tracts.',
    ingredients: ['Organic Turkey', 'Turkey Broth', 'Organic Cranberries', 'Taurine', 'Parsley'],
    nutrition: 'Protein 45% | Fat 14% | Moisture 76%'
  },
  {
    id: 'prod-5',
    name: 'Freeze-Dried Raw Rabbit & Herb Bites',
    category: 'Natural Treats',
    price: 18.25,
    image: 'assets/images/freeze-dried-pet-food.jpg',
    supplier: 'Heritage Valley Farms',
    isOrganic: true,
    rating: 4.7,
    description: 'Single-source raw rabbit meat flash-frozen at peak freshness to preserve delicate enzymes and rich nutrients.',
    ingredients: ['100% Free-Range Rabbit', 'Ground Bone', 'Organic Thyme', 'Rosemary Extract'],
    nutrition: 'Protein 52% | Fat 22% | Moisture 5%'
  },
  {
    id: 'prod-6',
    name: 'Herbal Joint & Mobility Boost Powder',
    category: 'Nutrition Supplements',
    price: 29.50,
    image: 'assets/images/pet-nutrition-supplements.jpg',
    supplier: 'Pure Botanicals Pet Lab',
    isOrganic: true,
    rating: 4.9,
    description: 'Veterinarian-formulated botanical blend featuring green-lipped mussel, organic turmeric, and glucosamine.',
    ingredients: ['Organic Curcumin Turmeric', 'Green Lipped Mussel', 'Rosehips', 'Glucosamine HCl'],
    nutrition: 'Botanical Active Blend 100%'
  },
  {
    id: 'prod-7',
    name: 'Ocean Mackerel & Pumpkin Cat Pouch',
    category: 'Cat Food',
    price: 22.00,
    image: 'assets/images/wet-cat-food.jpg',
    supplier: 'Coastal Organic Pet Pantry',
    isOrganic: true,
    rating: 4.6,
    description: 'Wild ocean mackerel paired with gut-soothing farm pumpkin in a savory grain-free broth.',
    ingredients: ['Wild Mackerel', 'Pumpkin Puree', 'Cat Grass Extract', 'Vitamins'],
    nutrition: 'Protein 36% | Fat 12% | Moisture 78%'
  },
  {
    id: 'prod-8',
    name: 'Crispy Dental Kelp & Mint Biscuits',
    category: 'Natural Treats',
    price: 14.50,
    image: 'assets/images/dental-treats.jpg',
    supplier: 'Green Bark Bakery',
    isOrganic: true,
    rating: 4.8,
    description: 'Oven-baked crunchy biscuits with organic spearmint and kelp to naturally control tartar and freshen breath.',
    ingredients: ['Organic Oat Flour', 'Atlantic Kelp', 'Organic Spearmint', 'Coconut Oil'],
    nutrition: 'Protein 16% | Fat 8% | Fiber 6%'
  },
  {
    id: 'prod-9',
    name: 'Heritage Farm Golden Broth & Superfoods',
    category: 'Organic Ingredients',
    price: 16.99,
    image: 'assets/images/pet-food-superfoods.jpg',
    supplier: 'Highland Ridge Pastures',
    isOrganic: true,
    rating: 4.9,
    description: 'Slow-simmered 24-hour grass-fed bone broth infused with organic ginger, turmeric, and chia seeds.',
    ingredients: ['Grass-Fed Beef Bones', 'Filtered Water', 'Organic Apple Cider Vinegar', 'Organic Turmeric'],
    nutrition: 'Collagen 12% | Moisture 86%'
  },
  {
    id: 'prod-10',
    name: 'Puppy Growth & Vitality Stew',
    category: 'Fresh Meals',
    price: 36.00,
    image: 'assets/images/puppy-nutrition.jpg',
    supplier: 'Meadow Valley Organic Farms',
    isOrganic: true,
    rating: 5.0,
    description: 'High calcium and balanced phosphorus ratio engineered for healthy skeletal growth in developing puppies.',
    ingredients: ['Pasture Raised Lamb', 'Brown Rice', 'Organic Spinach', 'Eggshell Calcium', 'Fish Oil'],
    nutrition: 'Protein 39% | Fat 19% | Moisture 65%'
  },
  {
    id: 'prod-11',
    name: 'Senior Golden Years Low-Fat Medley',
    category: 'Dog Food',
    price: 33.50,
    image: 'assets/images/senior-pet-nutrition.jpg',
    supplier: 'Sunny Meadow Nutritionists',
    isOrganic: true,
    rating: 4.8,
    description: 'Gentle on senior digestive systems with lean turkey, antioxidant-rich berries, and fiber-dense oats.',
    ingredients: ['Lean Organic Turkey', 'Organic Blueberries', 'Rolled Oats', 'Probiotics Blend'],
    nutrition: 'Protein 30% | Fat 10% | Moisture 12%'
  },
  {
    id: 'prod-12',
    name: 'Wild Salmon Oil Pure Dropper (250ml)',
    category: 'Nutrition Supplements',
    price: 24.99,
    image: 'assets/images/salmon-omega-ingredients.jpg',
    supplier: 'Pacific Crest Catch & Co.',
    isOrganic: true,
    rating: 4.9,
    description: '100% cold-pressed wild salmon oil dropper for daily skin conditioning, brain health and joint lubrication.',
    ingredients: ['100% Cold-Pressed Wild Alaskan Salmon Oil', 'Mixed Tocopherols'],
    nutrition: 'Omega-3 30% | DHA 12% | EPA 11%'
  }
];

// Suppliers Data
const SUPPLIERS_DATA = [
  {
    id: 'sup-1',
    name: 'Meadow Valley Organic Farms',
    location: 'Sonoma County, California',
    category: 'Poultry & Veggies',
    description: 'Certified humane, open-pasture organic farm dedicated to ethical poultry and pesticide-free heirloom vegetables.',
    image: 'assets/images/fresh-farm-produce.jpg',
    phone: '+1 (707) 555-0142',
    email: 'hello@meadowvalleyfarms.demo'
  },
  {
    id: 'sup-2',
    name: 'Pacific Crest Catch & Co.',
    location: 'Astoria, Oregon',
    category: 'Wild Seafood',
    description: 'Small-batch sustainable fishing fleet providing wild Alaskan salmon and ocean mackerel rich in essential omegas.',
    image: 'assets/images/salmon.jpg',
    phone: '+1 (503) 555-0188',
    email: 'info@pacificcrestcatch.demo'
  },
  {
    id: 'sup-3',
    name: 'Highland Ridge Pastures',
    location: 'Boulder County, Colorado',
    category: 'Grass-Fed Meats',
    description: '100% grass-finished regenerative cattle ranch supplying human-grade beef and bone marrow to raw pet food crafters.',
    image: 'assets/images/farm-to-table-ingredients.jpg',
    phone: '+1 (303) 555-0199',
    email: 'team@highlandridge.demo'
  }
];

document.addEventListener('DOMContentLoaded', () => {
  initProductCatalog();
  initProductDetailsModal();
});

function initProductCatalog() {
  const container = document.getElementById('productsCatalogGrid');
  const searchInput = document.getElementById('productSearchInput');
  const categoryFilter = document.getElementById('categoryFilter');
  const priceFilter = document.getElementById('priceFilter');
  const sortFilter = document.getElementById('sortFilter');
  const resetBtn = document.getElementById('resetFiltersBtn');
  const resultCount = document.getElementById('productResultCount');
  const emptyState = document.getElementById('emptySearchState');

  if (!container) return; // Not on page with catalog

  function render(products) {
    container.innerHTML = '';

    if (resultCount) {
      resultCount.textContent = `Showing ${products.length} organic items`;
    }

    if (products.length === 0) {
      if (emptyState) emptyState.style.display = 'block';
      return;
    } else {
      if (emptyState) emptyState.style.display = 'none';
    }

    const favs = getFavorites();

    products.forEach(p => {
      const isFav = favs.includes(p.id);
      const card = document.createElement('article');
      card.className = 'product-card';
      card.innerHTML = `
        <div class="product-thumb">
          <img src="${p.image}" alt="${p.name}" loading="lazy">
          <span class="badge badge-organic product-badge-float">🌱 Certified Organic Demo</span>
          <button class="btn-favorite-float ${isFav ? 'favorited' : ''}" data-product-id="${p.id}" aria-label="Save ${p.name} to favorites" title="Toggle Favorite">
            ${isFav ? '❤️' : '🤍'}
          </button>
        </div>
        <div class="product-body">
          <span class="product-category">${escapeHtml(p.category)}</span>
          <h3 class="product-title">${escapeHtml(p.name)}</h3>
          <p class="product-desc">${escapeHtml(p.description)}</p>
          <div class="product-supplier">
            <span>Supplier:</span> ${escapeHtml(p.supplier)}
          </div>
          <div class="product-footer">
            <div class="product-price">$${p.price.toFixed(2)}</div>
            <button class="btn btn-primary btn-sm btn-view-details" data-id="${p.id}">View Details</button>
          </div>
        </div>
      `;
      container.appendChild(card);
    });

    attachCardEventListeners();
    if (typeof initInteractive3DCards === 'function') {
      initInteractive3DCards();
    }
  }

  function filterAndSort() {
    const q = (searchInput?.value || '').toLowerCase().trim();
    const cat = categoryFilter?.value || 'all';
    const priceRange = priceFilter?.value || 'all';
    const sort = sortFilter?.value || 'featured';

    let list = PRODUCTS_DATA.filter(item => {
      const matchesSearch = item.name.toLowerCase().includes(q) || 
                            item.supplier.toLowerCase().includes(q) || 
                            item.description.toLowerCase().includes(q) ||
                            item.category.toLowerCase().includes(q);

      const matchesCategory = cat === 'all' || item.category === cat;

      let matchesPrice = true;
      if (priceRange === 'under-20') matchesPrice = item.price < 20;
      else if (priceRange === '20-35') matchesPrice = item.price >= 20 && item.price <= 35;
      else if (priceRange === 'over-35') matchesPrice = item.price > 35;

      return matchesSearch && matchesCategory && matchesPrice;
    });

    if (sort === 'price-low') {
      list.sort((a, b) => a.price - b.price);
    } else if (sort === 'price-high') {
      list.sort((a, b) => b.price - a.price);
    } else if (sort === 'name-asc') {
      list.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sort === 'rating') {
      list.sort((a, b) => b.rating - a.rating);
    }

    render(list);
  }

  // Filter Event Listeners
  searchInput?.addEventListener('input', filterAndSort);
  categoryFilter?.addEventListener('change', filterAndSort);
  priceFilter?.addEventListener('change', filterAndSort);
  sortFilter?.addEventListener('change', filterAndSort);

  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      if (searchInput) searchInput.value = '';
      if (categoryFilter) categoryFilter.value = 'all';
      if (priceFilter) priceFilter.value = 'all';
      if (sortFilter) sortFilter.value = 'featured';
      filterAndSort();
    });
  }

  // Quick category pills
  const pills = document.querySelectorAll('.filter-tag-pill');
  pills.forEach(pill => {
    pill.addEventListener('click', () => {
      pills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      const targetCat = pill.getAttribute('data-cat');
      if (categoryFilter) {
        categoryFilter.value = targetCat;
        filterAndSort();
      }
    });
  });

  // Check URL query parameters (e.g. ?search=chicken or ?cat=Dog%20Food)
  const urlParams = new URLSearchParams(window.location.search);
  const qParam = urlParams.get('search');
  const catParam = urlParams.get('category');
  if (qParam && searchInput) searchInput.value = qParam;
  if (catParam && categoryFilter) categoryFilter.value = catParam;

  filterAndSort();
}

function attachCardEventListeners() {
  // Favorite buttons
  const favBtns = document.querySelectorAll('.btn-favorite-float');
  favBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const prodId = btn.getAttribute('data-product-id');
      toggleFavorite(prodId, btn);
    });
  });

  // View details modal buttons
  const detailBtns = document.querySelectorAll('.btn-view-details');
  detailBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-id');
      openProductDetails(id);
    });
  });
}

/* ==========================================================================
   Favorites LocalStorage Persistence
   ========================================================================== */
function getFavorites() {
  try {
    const raw = localStorage.getItem('pet_directory_favorites');
    return raw ? JSON.parse(raw) : ['prod-1', 'prod-4'];
  } catch (e) {
    return ['prod-1', 'prod-4'];
  }
}

function saveFavorites(list) {
  try {
    localStorage.setItem('pet_directory_favorites', JSON.stringify(list));
  } catch (e) {
    console.error('Storage save error', e);
  }
}

function toggleFavorite(id, btnElement) {
  let favs = getFavorites();
  const prod = PRODUCTS_DATA.find(p => p.id === id);
  const name = prod ? prod.name : 'Product';

  if (favs.includes(id)) {
    favs = favs.filter(item => item !== id);
    saveFavorites(favs);
    if (btnElement) {
      btnElement.classList.remove('favorited');
      btnElement.innerHTML = '🤍';
    }
    showToast(`Removed "${name}" from Favorites`, 'info');
  } else {
    favs.push(id);
    saveFavorites(favs);
    if (btnElement) {
      btnElement.classList.add('favorited');
      btnElement.innerHTML = '❤️';
    }
    showToast(`Added "${name}" to Favorites! 🌱`, 'success');
  }

  // Dispatch custom event for dashboard sync
  window.dispatchEvent(new CustomEvent('favoritesUpdated'));
}

/* ==========================================================================
   Product Details Modal
   ========================================================================== */
function initProductDetailsModal() {
  const modal = document.getElementById('productDetailsModal');
  if (!modal) return;
}

function openProductDetails(id) {
  const modal = document.getElementById('productDetailsModal');
  const prod = PRODUCTS_DATA.find(p => p.id === id);
  if (!modal || !prod) return;

  // Track recently viewed
  addRecentlyViewed(id);

  const container = document.getElementById('productDetailsContent');
  const favs = getFavorites();
  const isFav = favs.includes(prod.id);

  if (container) {
    container.innerHTML = `
      <div class="product-modal-grid">
        <div class="product-modal-img">
          <img src="${prod.image}" alt="${prod.name}">
        </div>
        <div>
          <span class="badge badge-organic" style="margin-bottom: 8px;">🌱 Certified Organic Demo</span>
          <h2 style="font-family: var(--font-heading); color: var(--dark-green); margin: 6px 0 10px; font-size: 1.6rem;">${escapeHtml(prod.name)}</h2>
          <div style="color: var(--primary-green); font-weight: 700; font-size: 1.4rem; margin-bottom: 12px;">$${prod.price.toFixed(2)}</div>
          <p style="color: var(--muted-text); margin-bottom: 16px; font-size: 0.95rem;">${escapeHtml(prod.description)}</p>
          
          <div style="background: var(--light-green); padding: 12px 16px; border-radius: var(--radius-sm); margin-bottom: 18px;">
            <div style="font-size: 0.85rem; font-weight: 600; color: var(--dark-green);">Verified Sourced Supplier:</div>
            <div style="font-weight: 700; color: var(--dark-text);">${escapeHtml(prod.supplier)}</div>
            <div style="font-size: 0.8rem; color: var(--muted-text); margin-top: 4px;">Guaranteed Organic Farm-to-Table Integrity</div>
          </div>

          <div style="margin-bottom: 16px;">
            <strong style="font-size: 0.85rem; text-transform: uppercase; color: var(--dark-green);">Key Ingredients:</strong>
            <div style="display: flex; flex-wrap: wrap; gap: 6px; margin-top: 6px;">
              ${prod.ingredients.map(ing => `<span class="badge" style="background:#f1f8f4; color:#2E7D32; font-size:0.78rem;">${escapeHtml(ing)}</span>`).join('')}
            </div>
          </div>

          <div style="font-size: 0.85rem; color: var(--muted-text); margin-bottom: 22px;">
            <strong>Nutritional Profile:</strong> ${escapeHtml(prod.nutrition)}
          </div>

          <div style="display: flex; gap: 12px; flex-wrap: wrap;">
            <button class="btn btn-primary" onclick="toggleFavorite('${prod.id}', null); openProductDetails('${prod.id}');">
              ${isFav ? '❤️ Saved in Favorites' : '🤍 Add to Favorites'}
            </button>
            <a href="contact.html?inquiry=${encodeURIComponent(prod.name)}" class="btn btn-secondary">Inquire Supplier</a>
          </div>
        </div>
      </div>
    `;
  }

  modal.classList.add('is-open');
  document.body.style.overflow = 'hidden';
}

function addRecentlyViewed(id) {
  try {
    let recent = JSON.parse(localStorage.getItem('pet_directory_recent') || '[]');
    recent = recent.filter(item => item !== id);
    recent.unshift(id);
    if (recent.length > 6) recent = recent.slice(0, 6);
    localStorage.setItem('pet_directory_recent', JSON.stringify(recent));
  } catch (e) {
    console.error('Recent items error', e);
  }
}
