/**
 * Farm-to-Table Organic Directory - Pet Food & Nutrition
 * Dashboard Logic & State Management: js/dashboard.js
 */

document.addEventListener('DOMContentLoaded', () => {
  initDashboardTabs();
  renderDashboardData();
  initProfileForm();
  initPasswordForm();

  // Listen for favorites updates
  window.addEventListener('favoritesUpdated', () => {
    renderDashboardData();
  });
});

function initDashboardTabs() {
  const menuItems = document.querySelectorAll('.dash-menu-item[data-tab]');
  const tabPanes = document.querySelectorAll('.dash-tab-pane');

  menuItems.forEach(item => {
    item.addEventListener('click', () => {
      const target = item.getAttribute('data-tab');

      menuItems.forEach(i => i.classList.remove('active'));
      tabPanes.forEach(p => p.classList.remove('active'));

      item.classList.add('active');
      const pane = document.getElementById(`tab-${target}`);
      if (pane) pane.classList.add('active');
    });
  });

  const logoutBtn = document.getElementById('dashLogoutBtn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
      if (confirm('Are you sure you want to log out from your demo dashboard?')) {
        localStorage.removeItem('pet_directory_user');
        showToast('Logged out successfully.', 'info');
        setTimeout(() => {
          window.location.href = 'index.html';
        }, 600);
      }
    });
  }
}

function renderDashboardData() {
  // Load User Profile
  let user = {
    name: 'Sarah Jenkins',
    email: 'sarah.jenkins@example.com',
    petName: 'Barnaby & Luna',
    dietPreference: 'Raw & Certified Organic Sourced',
    location: 'Portland, OR'
  };

  try {
    const rawUser = localStorage.getItem('pet_directory_user');
    if (rawUser) {
      const parsed = JSON.parse(rawUser);
      user = { ...user, ...parsed };
    }
  } catch (e) {
    console.error(e);
  }

  // Update profile display
  const nameDisplay = document.getElementById('dashUserName');
  const emailDisplay = document.getElementById('dashUserEmail');
  const avatarLetter = document.getElementById('dashUserAvatar');
  const petDisplay = document.getElementById('dashPetSummary');

  if (nameDisplay) nameDisplay.textContent = user.name;
  if (emailDisplay) emailDisplay.textContent = user.email;
  if (avatarLetter) avatarLetter.textContent = user.name.charAt(0).toUpperCase();
  if (petDisplay) petDisplay.textContent = `${user.petName || 'Pets'} • ${user.dietPreference || 'Organic'}`;

  // Pre-fill profile settings form
  const inputName = document.getElementById('profileName');
  const inputEmail = document.getElementById('profileEmail');
  const inputPet = document.getElementById('profilePetName');
  const inputDiet = document.getElementById('profileDiet');
  if (inputName) inputName.value = user.name;
  if (inputEmail) inputEmail.value = user.email;
  if (inputPet) inputPet.value = user.petName || '';
  if (inputDiet) inputDiet.value = user.dietPreference || '';

  // Load Favorites
  let favIds = ['prod-1', 'prod-4'];
  try {
    const rawFavs = localStorage.getItem('pet_directory_favorites');
    if (rawFavs) favIds = JSON.parse(rawFavs);
  } catch (e) {}

  const favCountEl = document.getElementById('dashFavCount');
  if (favCountEl) favCountEl.textContent = favIds.length;

  const favGrid = document.getElementById('dashFavoritesGrid');
  const favEmpty = document.getElementById('dashFavoritesEmpty');
  if (favGrid) {
    favGrid.innerHTML = '';
    const favProducts = PRODUCTS_DATA.filter(p => favIds.includes(p.id));

    if (favProducts.length === 0) {
      if (favEmpty) favEmpty.style.display = 'block';
    } else {
      if (favEmpty) favEmpty.style.display = 'none';
      favProducts.forEach(p => {
        const item = document.createElement('div');
        item.className = 'product-card';
        item.innerHTML = `
          <div class="product-thumb">
            <img src="${p.image}" alt="${p.name}">
            <button class="btn-favorite-float favorited" data-product-id="${p.id}" title="Remove from favorites">❤️</button>
          </div>
          <div class="product-body">
            <span class="product-category">${p.category}</span>
            <h4 class="product-title">${p.name}</h4>
            <div class="product-supplier"><span>From:</span> ${p.supplier}</div>
            <div class="product-footer">
              <div class="product-price">$${p.price.toFixed(2)}</div>
              <button class="btn btn-primary btn-sm btn-view-details" data-id="${p.id}">View Details</button>
            </div>
          </div>
        `;
        favGrid.appendChild(item);
      });
      attachCardEventListeners();
    }
  }

  // Load Recently Viewed
  let recentIds = ['prod-2', 'prod-3'];
  try {
    const rawRecent = localStorage.getItem('pet_directory_recent');
    if (rawRecent) recentIds = JSON.parse(rawRecent);
  } catch (e) {}

  const recentCountEl = document.getElementById('dashRecentCount');
  if (recentCountEl) recentCountEl.textContent = recentIds.length;

  const recentGrid = document.getElementById('dashRecentGrid');
  const recentEmpty = document.getElementById('dashRecentEmpty');
  if (recentGrid) {
    recentGrid.innerHTML = '';
    const recentProducts = PRODUCTS_DATA.filter(p => recentIds.includes(p.id));

    if (recentProducts.length === 0) {
      if (recentEmpty) recentEmpty.style.display = 'block';
    } else {
      if (recentEmpty) recentEmpty.style.display = 'none';
      recentProducts.forEach(p => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
          <div class="product-thumb">
            <img src="${p.image}" alt="${p.name}">
          </div>
          <div class="product-body">
            <span class="product-category">${p.category}</span>
            <h4 class="product-title">${p.name}</h4>
            <div class="product-footer">
              <div class="product-price">$${p.price.toFixed(2)}</div>
              <button class="btn btn-primary btn-sm btn-view-details" data-id="${p.id}">View</button>
            </div>
          </div>
        `;
        recentGrid.appendChild(card);
      });
      attachCardEventListeners();
    }
  }

  // Saved Suppliers
  const suppliersGrid = document.getElementById('dashSuppliersGrid');
  if (suppliersGrid) {
    suppliersGrid.innerHTML = '';
    SUPPLIERS_DATA.forEach(s => {
      const col = document.createElement('div');
      col.className = 'supplier-card';
      col.innerHTML = `
        <div class="supplier-cover">
          <img src="${s.image}" alt="${s.name}">
          <span class="badge badge-organic supplier-badge">📍 ${s.location}</span>
        </div>
        <div class="supplier-content">
          <h3 class="supplier-name">${s.name}</h3>
          <p class="supplier-desc">${s.description}</p>
          <div style="font-size:0.85rem; color:var(--dark-green); margin-bottom:14px;">
            📞 ${s.phone} | ✉️ ${s.email}
          </div>
          <a href="contact.html?supplier=${encodeURIComponent(s.name)}" class="btn btn-secondary btn-sm">Message Supplier</a>
        </div>
      `;
      suppliersGrid.appendChild(col);
    });
  }

  if (typeof initInteractive3DCards === 'function') {
    initInteractive3DCards();
  }
}

function initProfileForm() {
  const form = document.getElementById('profileForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('profileName').value.trim();
    const email = document.getElementById('profileEmail').value.trim();
    const petName = document.getElementById('profilePetName').value.trim();
    const diet = document.getElementById('profileDiet').value;

    if (!name || !email) {
      showToast('Name and email are required.', 'danger');
      return;
    }

    let existing = {};
    try {
      existing = JSON.parse(localStorage.getItem('pet_directory_user') || '{}');
    } catch (e) {}

    const updated = {
      ...existing,
      name,
      email,
      petName,
      dietPreference: diet,
      isLoggedIn: true
    };

    localStorage.setItem('pet_directory_user', JSON.stringify(updated));
    showToast('Profile updated successfully! (Demo)', 'success');
    renderDashboardData();
  });
}

function initPasswordForm() {
  const form = document.getElementById('passwordForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const currentPass = document.getElementById('currentPassword').value;
    const newPass = document.getElementById('newPassword').value;
    const confirmPass = document.getElementById('confirmNewPassword').value;

    if (!currentPass || !newPass || !confirmPass) {
      showToast('Please fill all password fields.', 'danger');
      return;
    }

    if (newPass.length < 6) {
      showToast('New password must have at least 6 characters.', 'danger');
      return;
    }

    if (newPass !== confirmPass) {
      showToast('New passwords do not match.', 'danger');
      return;
    }

    showToast('Password changed successfully! (Demo simulation)', 'success');
    form.reset();
  });
}
