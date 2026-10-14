/**
 * Farm-to-Table Organic Directory - Pet Food & Nutrition
 * Authentication & Modal Manager: js/auth.js
 * Frontend-only demonstration auth with localStorage simulation
 */

document.addEventListener('DOMContentLoaded', () => {
  initAuthModals();
  checkCurrentUser();
});

function initAuthModals() {
  const loginModal = document.getElementById('loginModal');
  const signupModal = document.getElementById('signupModal');
  
  const openLoginBtns = document.querySelectorAll('.open-login-btn');
  const openSignupBtns = document.querySelectorAll('.open-signup-btn');
  const switchToSignup = document.getElementById('switchToSignup');
  const switchToLogin = document.getElementById('switchToLogin');

  function openModal(modal) {
    if (!modal) return;
    document.querySelectorAll('.modal-overlay').forEach(m => m.classList.remove('is-open'));
    modal.classList.add('is-open');
    document.body.style.overflow = 'hidden';
    // Focus first input
    const firstInput = modal.querySelector('input');
    if (firstInput) setTimeout(() => firstInput.focus(), 100);
  }

  function closeModal(modal) {
    if (!modal) return;
    modal.classList.remove('is-open');
    document.body.style.overflow = '';
  }

  openLoginBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openModal(loginModal);
    });
  });

  openSignupBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openModal(signupModal);
    });
  });

  if (switchToSignup) {
    switchToSignup.addEventListener('click', (e) => {
      e.preventDefault();
      closeModal(loginModal);
      openModal(signupModal);
    });
  }

  if (switchToLogin) {
    switchToLogin.addEventListener('click', (e) => {
      e.preventDefault();
      closeModal(signupModal);
      openModal(loginModal);
    });
  }

  // Password visibility toggle
  const togglePassBtns = document.querySelectorAll('.password-toggle-btn');
  togglePassBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetInputId = btn.getAttribute('data-target');
      const input = document.getElementById(targetInputId);
      if (!input) return;
      if (input.type === 'password') {
        input.type = 'text';
        btn.textContent = '👁️‍🗨️';
      } else {
        input.type = 'password';
        btn.textContent = '👁️';
      }
    });
  });

  // Login Form Submission
  const loginForm = document.getElementById('loginForm');
  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = document.getElementById('loginEmail').value.trim();
      const pass = document.getElementById('loginPassword').value;
      const remember = document.getElementById('loginRemember')?.checked;

      let valid = true;
      if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        markInvalid('loginEmail', 'Valid email required');
        valid = false;
      } else {
        clearInvalid('loginEmail');
      }

      if (!pass || pass.length < 6) {
        markInvalid('loginPassword', 'Password must be at least 6 characters');
        valid = false;
      } else {
        clearInvalid('loginPassword');
      }

      if (!valid) return;

      // Simulate login session
      const user = {
        name: email.split('@')[0],
        email: email,
        isLoggedIn: true,
        loginDate: new Date().toLocaleDateString()
      };

      localStorage.setItem('pet_directory_user', JSON.stringify(user));
      closeModal(loginModal);
      showToast(`Welcome back, ${user.name}! (Demo Login)`, 'success');
      updateNavForLoggedIn(user);
    });
  }

  // Signup Form Submission
  const signupForm = document.getElementById('signupForm');
  if (signupForm) {
    signupForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('signupName').value.trim();
      const email = document.getElementById('signupEmail').value.trim();
      const pass = document.getElementById('signupPassword').value;
      const passConfirm = document.getElementById('signupConfirmPassword').value;
      const terms = document.getElementById('signupTerms')?.checked;

      let valid = true;

      if (!name) {
        markInvalid('signupName', 'Full name is required');
        valid = false;
      } else {
        clearInvalid('signupName');
      }

      if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        markInvalid('signupEmail', 'Valid email required');
        valid = false;
      } else {
        clearInvalid('signupEmail');
      }

      if (!pass || pass.length < 6) {
        markInvalid('signupPassword', 'Password must be at least 6 characters');
        valid = false;
      } else {
        clearInvalid('signupPassword');
      }

      if (pass !== passConfirm) {
        markInvalid('signupConfirmPassword', 'Passwords do not match');
        valid = false;
      } else {
        clearInvalid('signupConfirmPassword');
      }

      if (!terms) {
        showToast('Please agree to the Terms & Conditions.', 'danger');
        return;
      }

      if (!valid) return;

      const newUser = {
        name: name,
        email: email,
        isLoggedIn: true,
        joinDate: new Date().toLocaleDateString()
      };

      localStorage.setItem('pet_directory_user', JSON.stringify(newUser));
      closeModal(signupModal);
      showToast(`Welcome to the farm community, ${name}! (Demo Signup)`, 'success');
      updateNavForLoggedIn(newUser);
    });
  }
}

function markInvalid(inputId, message) {
  const input = document.getElementById(inputId);
  if (!input) return;
  input.classList.add('is-invalid');
  const parent = input.closest('.form-group');
  let feedback = parent?.querySelector('.invalid-feedback');
  if (feedback) feedback.textContent = message;
}

function clearInvalid(inputId) {
  const input = document.getElementById(inputId);
  if (!input) return;
  input.classList.remove('is-invalid');
}

function checkCurrentUser() {
  try {
    const raw = localStorage.getItem('pet_directory_user');
    if (raw) {
      const user = JSON.parse(raw);
      if (user && user.isLoggedIn) {
        updateNavForLoggedIn(user);
      }
    }
  } catch (e) {
    console.error('Local user storage error', e);
  }
}

function updateNavForLoggedIn(user) {
  const desktopAuth = document.querySelector('.nav-auth-actions');
  const mobileAuth = document.querySelector('.mobile-auth-actions');

  const greetingHtml = `
    <span style="font-size: 0.9rem; font-weight:600; color:var(--dark-green); margin-right:6px;">🌿 Hi, ${escapeHtml(user.name)}</span>
    <a href="dashboard.html" class="btn btn-primary btn-sm">Dashboard</a>
    <button id="navLogoutBtn" class="btn btn-secondary btn-sm" onclick="handleDemoLogout()">Logout</button>
  `;

  if (desktopAuth) {
    desktopAuth.innerHTML = greetingHtml;
  }

  if (mobileAuth) {
    mobileAuth.innerHTML = `
      <div style="font-weight:600; color:var(--dark-green); padding: 8px 0;">🌿 Logged in as ${escapeHtml(user.name)}</div>
      <a href="dashboard.html" class="btn btn-primary btn-block">Go to Dashboard</a>
      <button class="btn btn-secondary btn-block" onclick="handleDemoLogout()">Logout</button>
    `;
  }
}

function handleDemoLogout() {
  if (confirm('Are you sure you want to log out from this demo session?')) {
    localStorage.removeItem('pet_directory_user');
    showToast('You have been logged out (Demo)', 'info');
    setTimeout(() => {
      window.location.reload();
    }, 500);
  }
}

function escapeHtml(str) {
  if (!str) return '';
  return str.replace(/[&<>"']/g, function(m) {
    return {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;'
    }[m];
  });
}
