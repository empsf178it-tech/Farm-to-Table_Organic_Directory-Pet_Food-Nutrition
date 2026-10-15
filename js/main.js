/**
 * Farm-to-Table Organic Directory - Pet Food & Nutrition
 * Shared Interactions & Global State: js/main.js
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initScrollEffects();
  initHero3DExperience();
  initAIChatIntegration();
  initCounterAnimations();
  initScrollReveal();
  initDynamicIconAnimations();
  initInteractive3DCards();
  initNewsletter();
  initFAQAccordion();
  initQuickModals();
});

/* ==========================================================================
   Navigation & Hamburger Menu (Strict <=1024px)
   ========================================================================== */
function initNavigation() {
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const mobileNavDrawer = document.getElementById('mobileNavDrawer');
  const mobileNavBackdrop = document.getElementById('mobileNavBackdrop');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
  const header = document.querySelector('.site-header');

  if (!hamburgerBtn || !mobileNavDrawer) return;

  function openMobileMenu() {
    hamburgerBtn.classList.add('is-active');
    hamburgerBtn.setAttribute('aria-expanded', 'true');
    mobileNavDrawer.classList.add('is-open');
    if (mobileNavBackdrop) mobileNavBackdrop.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  }

  function closeMobileMenu() {
    hamburgerBtn.classList.remove('is-active');
    hamburgerBtn.setAttribute('aria-expanded', 'false');
    mobileNavDrawer.classList.remove('is-open');
    if (mobileNavBackdrop) mobileNavBackdrop.classList.remove('is-open');
    document.body.style.overflow = '';
  }

  hamburgerBtn.addEventListener('click', () => {
    const isOpen = hamburgerBtn.classList.contains('is-active');
    if (isOpen) {
      closeMobileMenu();
    } else {
      openMobileMenu();
    }
  });

  if (mobileNavBackdrop) {
    mobileNavBackdrop.addEventListener('click', closeMobileMenu);
  }

  // Close when clicking mobile nav links
  mobileNavLinks.forEach(link => {
    link.addEventListener('click', () => {
      closeMobileMenu();
    });
  });

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && hamburgerBtn.classList.contains('is-active')) {
      closeMobileMenu();
    }
  });

  // Sticky header shadow on scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      header?.classList.add('scrolled');
    } else {
      header?.classList.remove('scrolled');
    }
  });

  // Window resize check: if > 1024px, auto-close mobile drawer
  window.addEventListener('resize', () => {
    if (window.innerWidth > 1024) {
      closeMobileMenu();
    }
  });
}

/* ==========================================================================
   Scroll Effects & Scroll-to-Top
   ========================================================================== */
function initScrollEffects() {
  const scrollTopBtn = document.getElementById('scrollTopBtn');
  const progressBar = document.getElementById('scrollProgressBar');
  if (!scrollTopBtn) return;

  function updateScrollProgress() {
    const scrollY = window.scrollY || window.pageYOffset;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    
    // Show button across all sections after scrolling 120px
    if (scrollY > 120) {
      scrollTopBtn.classList.add('is-visible');
    } else {
      scrollTopBtn.classList.remove('is-visible');
    }

    // Update circular progress ring
    if (progressBar && docHeight > 0) {
      const scrollPercent = Math.min(Math.max(scrollY / docHeight, 0), 1);
      const totalDash = 138; // 2 * PI * r (r = 22)
      const offset = totalDash - (scrollPercent * totalDash);
      progressBar.style.strokeDashoffset = offset.toFixed(1);
    }
  }

  window.addEventListener('scroll', updateScrollProgress, { passive: true });
  updateScrollProgress();

  scrollTopBtn.addEventListener('click', () => {
    // Add micro-spring animation on click
    scrollTopBtn.style.transform = 'translateY(-10px) scale(0.9)';
    setTimeout(() => {
      scrollTopBtn.style.transform = '';
    }, 250);

    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

/* ==========================================================================
   Toast Notification System
   ========================================================================== */
function showToast(message, type = 'info') {
  let container = document.getElementById('toastContainer');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toastContainer';
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  
  let icon = '🔔';
  if (type === 'success') icon = '🌿';
  if (type === 'danger') icon = '⚠️';

  toast.innerHTML = `<span>${icon}</span> <span>${message}</span>`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => {
      toast.remove();
    }, 300);
  }, 4000);
}

/* ==========================================================================
   Newsletter Subscription Form
   ========================================================================== */
function initNewsletter() {
  const form = document.getElementById('newsletterForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const emailInput = document.getElementById('newsletterEmail');
    const msgElement = document.getElementById('newsletterMsg');
    const email = emailInput ? emailInput.value.trim() : '';

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      if (msgElement) {
        msgElement.textContent = 'Please provide a valid email address.';
        msgElement.style.color = '#FF8A80';
      }
      showToast('Please enter a valid email address.', 'danger');
      return;
    }

    if (msgElement) {
      msgElement.textContent = 'Thank you for subscribing! 🌱 (Demo confirmation - not saved to server)';
      msgElement.style.color = '#C8E6C9';
    }
    showToast('Subscribed to farm updates! (Demo)', 'success');
    form.reset();
  });
}

/* ==========================================================================
   FAQ Accordion
   ========================================================================== */
function initFAQAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');
  if (!faqItems.length) return;

  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question');
    if (!questionBtn) return;

    questionBtn.addEventListener('click', () => {
      const isOpen = item.classList.contains('is-open');
      // Close others
      faqItems.forEach(other => other.classList.remove('is-open'));
      if (!isOpen) {
        item.classList.add('is-open');
      }
    });
  });
}

/* ==========================================================================
   Quick Modal Helpers
   ========================================================================== */
function initQuickModals() {
  // Global modal escape close listener
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      const openModals = document.querySelectorAll('.modal-overlay.is-open');
      openModals.forEach(modal => {
        modal.classList.remove('is-open');
      });
      document.body.style.overflow = '';
    }
  });

  // Close modals when clicking overlay backdrop
  const modalOverlays = document.querySelectorAll('.modal-overlay');
  modalOverlays.forEach(overlay => {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) {
        overlay.classList.remove('is-open');
        document.body.style.overflow = '';
      }
    });
  });

  // Modal close buttons
  const closeBtns = document.querySelectorAll('[data-close-modal]');
  closeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const modalId = btn.getAttribute('data-close-modal');
      const targetModal = document.getElementById(modalId);
      if (targetModal) {
        targetModal.classList.remove('is-open');
        document.body.style.overflow = '';
      }
    });
  });
}

/* ==========================================================================
   Hero 3D Perspective Tilt, Floating Particle Canvas & 8D Spatial Audio
   ========================================================================== */
function initHero3DExperience() {
  const heroSection = document.getElementById('heroSection');
  const tiltContainer = document.getElementById('heroTiltContainer');
  const canvas = document.getElementById('heroParticlesCanvas');
  const soundBar = document.getElementById('heroSoundBar');
  const soundToggleBtn = document.getElementById('soundToggleBtn');
  const soundIcon = document.getElementById('soundIcon');
  const soundStatusText = document.getElementById('soundStatusText');

  if (!heroSection) return;

  // 1. Interactive 3D Perspective Tilt following mouse cursor
  if (tiltContainer) {
    const depthTags = tiltContainer.querySelectorAll('.hero-badge-float, .hero-depth-tag, .hero-floating-orb');
    
    heroSection.addEventListener('mousemove', (e) => {
      const rect = heroSection.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      // Calculate tilt angles (-12deg to +12deg)
      const rotateX = ((y - centerY) / centerY) * -10;
      const rotateY = ((x - centerX) / centerX) * 12;

      tiltContainer.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateZ(10px)`;
      
      // Parallax effect on floating badges
      depthTags.forEach((badge, idx) => {
        const factor = (idx + 1) * 4;
        const transX = ((x - centerX) / centerX) * factor;
        const transY = ((y - centerY) / centerY) * factor;
        badge.style.transform = `translate3d(${transX.toFixed(1)}px, ${transY.toFixed(1)}px, ${40 + factor * 4}px)`;
      });
    });

    heroSection.addEventListener('mouseleave', () => {
      tiltContainer.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)';
      depthTags.forEach((badge) => {
        badge.style.transform = '';
      });
    });
  }

  // 2. Interactive Canvas Floating Particles (Organic Pollen / Spores / Leaves)
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let width = (canvas.width = heroSection.offsetWidth);
    let height = (canvas.height = heroSection.offsetHeight);

    window.addEventListener('resize', () => {
      if (!canvas) return;
      width = canvas.width = heroSection.offsetWidth;
      height = canvas.height = heroSection.offsetHeight;
    });

    const particles = [];
    const particleCount = window.innerWidth < 768 ? 20 : 45;
    const colors = [
      'rgba(46, 125, 50, 0.35)',   // Green
      'rgba(129, 199, 132, 0.4)',  // Soft light green
      'rgba(245, 124, 0, 0.35)',   // Warm amber
      'rgba(255, 213, 79, 0.35)'   // Golden sunlight
    ];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 3 + 1.5,
        color: colors[Math.floor(Math.random() * colors.length)],
        vx: (Math.random() - 0.5) * 0.6,
        vy: -Math.random() * 0.7 - 0.2, // Drift upwards gently
        oscillationSpeed: Math.random() * 0.02 + 0.01,
        angle: Math.random() * Math.PI * 2
      });
    }

    function renderParticles() {
      ctx.clearRect(0, 0, width, height);

      particles.forEach(p => {
        p.angle += p.oscillationSpeed;
        p.x += p.vx + Math.sin(p.angle) * 0.5;
        p.y += p.vy;

        // Wrap around boundaries
        if (p.y < -10) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.shadowBlur = 8;
        ctx.shadowColor = p.color;
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      animationFrameId = requestAnimationFrame(renderParticles);
    }
    renderParticles();
  }

  // 3. 8D Spatial Ambient Farm Audio (Procedural Web Audio API - Zero External Files Required!)
  let audioCtx = null;
  let isPlaying = false;
  let pannerInterval = null;
  let audioNodes = [];

  function stop8DAudio() {
    isPlaying = false;
    if (pannerInterval) clearInterval(pannerInterval);
    audioNodes.forEach(node => {
      try { node.stop ? node.stop() : node.disconnect(); } catch (err) {}
    });
    audioNodes = [];
    if (audioCtx && audioCtx.state !== 'closed') {
      audioCtx.close();
      audioCtx = null;
    }
    if (soundToggleBtn) soundToggleBtn.classList.remove('is-playing');
    if (soundIcon) soundIcon.textContent = '🎧';
    if (soundStatusText) soundStatusText.textContent = 'Click to listen to morning birds & gentle breeze';
  }

  function start8DAudio() {
    try {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (!AudioContextClass) return;
      audioCtx = new AudioContextClass();

      // Master gain
      const masterGain = audioCtx.createGain();
      masterGain.gain.setValueAtTime(0.08, audioCtx.currentTime);
      masterGain.connect(audioCtx.destination);

      // Stereo 8D Panner (Rotates sound around user in binaural space)
      let panner;
      if (audioCtx.createStereoPanner) {
        panner = audioCtx.createStereoPanner();
        panner.connect(masterGain);
      } else {
        panner = masterGain;
      }

      // 1) Wind / Rustling leaves noise synthesizer
      const bufferSize = audioCtx.sampleRate * 2;
      const noiseBuffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      let b0 = 0, b1 = 0, b2 = 0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        b0 = 0.99886 * b0 + white * 0.0555179;
        b1 = 0.99332 * b1 + white * 0.0750759;
        b2 = 0.96900 * b2 + white * 0.1538520;
        output[i] = (b0 + b1 + b2) * 0.1; // Gentle pink noise
      }

      const whiteNoise = audioCtx.createBufferSource();
      whiteNoise.buffer = noiseBuffer;
      whiteNoise.loop = true;

      // Filter for soft country meadow breeze
      const filter = audioCtx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(450, audioCtx.currentTime);

      whiteNoise.connect(filter);
      filter.connect(panner);
      whiteNoise.start(0);
      audioNodes.push(whiteNoise);

      // 2) Melodic Organic Bird Chimes Synthesizer
      function playBirdChirp() {
        if (!isPlaying || !audioCtx) return;
        const osc = audioCtx.createOscillator();
        const chirpGain = audioCtx.createGain();
        const chirpPanner = audioCtx.createStereoPanner ? audioCtx.createStereoPanner() : masterGain;

        osc.type = 'sine';
        const startFreq = 2200 + Math.random() * 1200;
        osc.frequency.setValueAtTime(startFreq, audioCtx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(startFreq + 600, audioCtx.currentTime + 0.08);
        osc.frequency.exponentialRampToValueAtTime(startFreq - 200, audioCtx.currentTime + 0.18);

        chirpGain.gain.setValueAtTime(0.001, audioCtx.currentTime);
        chirpGain.gain.linearRampToValueAtTime(0.06, audioCtx.currentTime + 0.03);
        chirpGain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.22);

        if (chirpPanner.pan) {
          chirpPanner.pan.setValueAtTime((Math.random() * 1.8) - 0.9, audioCtx.currentTime);
          osc.connect(chirpGain);
          chirpGain.connect(chirpPanner);
          chirpPanner.connect(masterGain);
        } else {
          osc.connect(chirpGain);
          chirpGain.connect(masterGain);
        }

        osc.start();
        osc.stop(audioCtx.currentTime + 0.25);

        // Schedule next random chirp
        const nextTime = Math.random() * 2500 + 1200;
        setTimeout(playBirdChirp, nextTime);
      }
      playBirdChirp();

      // 8D Circular Spatial Audio Panning Motion
      if (panner && panner.pan) {
        let angle = 0;
        pannerInterval = setInterval(() => {
          if (!isPlaying) return;
          angle += 0.05;
          const panValue = Math.sin(angle); // Swings seamlessly -1.0 to +1.0
          panner.pan.setValueAtTime(panValue, audioCtx.currentTime);
        }, 50);
      }

      isPlaying = true;
      if (soundToggleBtn) soundToggleBtn.classList.add('is-playing');
      if (soundIcon) soundIcon.textContent = '🔊';
      if (soundStatusText) soundStatusText.textContent = '8D Organic Soundscape playing • Spatial 360°';
    } catch (err) {
      console.warn('Web Audio not allowed or error:', err);
    }
  }

  if (soundBar) {
    soundBar.addEventListener('click', (e) => {
      e.preventDefault();
      if (isPlaying) {
        stop8DAudio();
      } else {
        start8DAudio();
      }
    });
  }
}

/* ==========================================================================
   AI Nutritionist Assistant & WhatsApp Live Connect Widget
   ========================================================================== */
function initAIChatIntegration() {
  const aiChatLauncher = document.getElementById('aiChatLauncher');
  const aiChatWindow = document.getElementById('aiChatWindow');
  const aiCloseBtn = document.getElementById('aiCloseBtn');
  const aiChatForm = document.getElementById('aiChatForm');
  const aiChatInput = document.getElementById('aiChatInput');
  const aiChatMessages = document.getElementById('aiChatMessages');
  const suggestionPills = document.querySelectorAll('.suggestion-pill');

  if (!aiChatLauncher || !aiChatWindow) return;

  function openChat() {
    aiChatWindow.classList.add('is-open');
    if (aiChatInput) setTimeout(() => aiChatInput.focus(), 250);
  }

  function closeChat() {
    aiChatWindow.classList.remove('is-open');
  }

  aiChatLauncher.addEventListener('click', () => {
    if (aiChatWindow.classList.contains('is-open')) {
      closeChat();
    } else {
      openChat();
    }
  });

  if (aiCloseBtn) {
    aiCloseBtn.addEventListener('click', closeChat);
  }

  // Quick prompt suggestions
  suggestionPills.forEach(pill => {
    pill.addEventListener('click', () => {
      const promptText = pill.getAttribute('data-prompt') || pill.textContent;
      sendUserMessage(promptText);
    });
  });

  if (aiChatForm) {
    aiChatForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const text = aiChatInput.value.trim();
      if (!text) return;
      aiChatInput.value = '';
      sendUserMessage(text);
    });
  }

  function sendUserMessage(text) {
    appendMessage(text, 'user');

    // Show simulated typing indicator
    const typingBubble = document.createElement('div');
    typingBubble.className = 'chat-bubble bot typing-indicator';
    typingBubble.innerHTML = '<em>Consulting organic farm database...</em>';
    aiChatMessages.appendChild(typingBubble);
    aiChatMessages.scrollTop = aiChatMessages.scrollHeight;

    setTimeout(() => {
      typingBubble.remove();
      const reply = generateAIResponse(text);
      appendMessage(reply, 'bot');
    }, 700);
  }

  function appendMessage(html, sender) {
    const bubble = document.createElement('div');
    bubble.className = `chat-bubble ${sender}`;
    bubble.innerHTML = html;
    aiChatMessages.appendChild(bubble);
    aiChatMessages.scrollTop = aiChatMessages.scrollHeight;
  }

  function generateAIResponse(query) {
    const lower = query.toLowerCase();

    if (lower.includes('puppy') || lower.includes('growth')) {
      return `🐕 <strong>Puppy Nutrition Advice:</strong><br>For growing puppies, look for our pasture-raised <em>Organic Free-Range Chicken & Pumpkin Puree</em>. It provides bioavailable calcium, DHA for brain development, and zero synthetic fillers. You can explore it in our <a href="services.html?category=Dog%20Food" style="color:var(--primary-green); text-decoration:underline;">Services & Products</a>!`;
    } else if (lower.includes('cat') || lower.includes('kitten') || lower.includes('salmon')) {
      return `🐈 <strong>Feline Raw & Wet Diets:</strong><br>Cats are obligate carnivores requiring high taurine. Our verified <em>Wild Pacific Salmon Fillet Bowl</em> has 88% fresh protein and omega-3s for coat health and urinary tract support.`;
    } else if (lower.includes('allergy') || lower.includes('itch') || lower.includes('sensitive') || lower.includes('grain')) {
      return `🌿 <strong>Sensitive Stomachs & Allergies:</strong><br>92% of common pet allergies are triggered by low-grade poultry meals or synthetic wheat fillers. Our directory features 100% grain-free novel proteins like pasture-raised venison and freeze-dried beef liver.`;
    } else if (lower.includes('supplier') || lower.includes('farm') || lower.includes('local') || lower.includes('where')) {
      return `🚜 <strong>Local Organic Suppliers:</strong><br>We partner with 45+ family-owned regenerative farms that deliver directly to pet owners. Check out the <a href="about.html#suppliers" style="color:var(--primary-green); text-decoration:underline;">Verified Supplier Directory</a> for certified humane producers near you.`;
    } else if (lower.includes('whatsapp') || lower.includes('human') || lower.includes('call') || lower.includes('expert')) {
      return `📱 <strong>Direct WhatsApp Chat:</strong><br>Would you prefer to talk with a live holistic nutrition specialist? Click the green WhatsApp button below or message us at <a href="https://wa.me/18005550199?text=Hi%2C%20I%20need%20personalized%20organic%20pet%20nutrition%20guidance" target="_blank" style="color:#25D366; font-weight:700;">+1 (800) 555-0199</a>!`;
    } else {
      return `🐾 <strong>Organic Nutrition Insight:</strong><br>All items listed on PawsOrganic are certified pesticide-free, human-grade, and ethically raised. Would you like product recommendations for a <strong>dog</strong>, a <strong>cat</strong>, or guidance for a specific dietary need?`;
    }
  }
}

/* ==========================================================================
   Animated Statistics Number Counter
   ========================================================================== */
function initCounterAnimations() {
  const counters = document.querySelectorAll('.counter-val');
  if (!counters.length) return;

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.getAttribute('data-target'), 10);
        if (isNaN(target)) return;

        let start = 0;
        const duration = 1800; // ms
        const startTime = performance.now();

        function updateCount(currentTime) {
          const elapsed = currentTime - startTime;
          const progress = Math.min(elapsed / duration, 1);
          // Ease out cubic
          const easeProgress = 1 - Math.pow(1 - progress, 3);
          const current = Math.floor(easeProgress * (target - start) + start);

          el.textContent = current.toLocaleString();

          if (progress < 1) {
            requestAnimationFrame(updateCount);
          } else {
            el.textContent = target.toLocaleString();
          }
        }

        requestAnimationFrame(updateCount);
        obs.unobserve(el);
      }
    });
  }, { threshold: 0.3 });

  counters.forEach(c => observer.observe(c));
}

/* ==========================================================================
   Smooth Intersection Scroll Reveal for Cards & Sections
   ========================================================================== */
function initScrollReveal() {
  const revealElements = document.querySelectorAll(
    '.category-card, .product-card, .supplier-card, .process-step, .testimonial-card, .why-item, .why-card'
  );

  if (!revealElements.length) return;

  revealElements.forEach((el, index) => {
    el.classList.add('reveal-on-scroll');
    // Stagger transition delay slightly per sibling in grid
    const delay = (index % 4) * 0.08;
    el.style.transitionDelay = `${delay}s`;
  });

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-revealed');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  revealElements.forEach(el => observer.observe(el));
}

/* ==========================================================================
   Dynamic JavaScript Icon 360° Rotations & Interactive Physics
   ========================================================================== */
function initDynamicIconAnimations() {
  // Target all icon elements across sections
  const interactiveIcons = document.querySelectorAll(
    '.trust-icon, .process-icon, .hero-badge-icon, .brand-icon, .search-icon-anim, .ai-avatar, .sound-icon'
  );

  interactiveIcons.forEach(icon => {
    // Enable 3D transform preservation
    icon.style.transition = 'transform 0.65s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.4s ease';
    icon.style.cursor = 'pointer';
    let currentRotation = 0;

    // 1. Mouseenter: Full 360 degree spin with spring pop
    icon.addEventListener('mouseenter', () => {
      currentRotation += 360;
      icon.style.transform = `scale(1.25) rotate(${currentRotation}deg)`;
    });

    // 2. Mouseleave: Settle back with elastic snap
    icon.addEventListener('mouseleave', () => {
      icon.style.transform = `scale(1) rotate(${currentRotation}deg)`;
    });

    // 3. Click: 720 degree double spin burst + micro sparkle
    icon.addEventListener('click', () => {
      currentRotation += 720;
      icon.style.transform = `scale(1.4) rotate(${currentRotation}deg)`;
      setTimeout(() => {
        icon.style.transform = `scale(1) rotate(${currentRotation}deg)`;
      }, 650);
    });
  });

  // Scroll-Coupled Icon Gyroscope: Subtle dynamic rotation as user scrolls
  let lastScrollY = window.scrollY;
  let scrollTicking = false;

  window.addEventListener('scroll', () => {
    if (!scrollTicking) {
      window.requestAnimationFrame(() => {
        const delta = window.scrollY - lastScrollY;
        lastScrollY = window.scrollY;
        const subtleAngle = Math.min(Math.max(delta * 0.4, -20), 20);

        const floatIcons = document.querySelectorAll('.hero-floating-orb, .trust-icon');
        floatIcons.forEach(fIcon => {
          if (!fIcon.matches(':hover')) {
            fIcon.style.transform = `rotate(${subtleAngle}deg)`;
          }
        });
        scrollTicking = false;
      });
      scrollTicking = true;
    }
  }, { passive: true });
}

/* ==========================================================================
   Interactive 3D Gyroscopic Card Tilt Engine (True 3D Spatial Physics)
   ========================================================================== */
function initInteractive3DCards() {
  const cards = document.querySelectorAll(
    '.product-card, .category-card, .supplier-card, .why-card, .process-step, .testimonial-card, .dash-stat-card, .contact-card'
  );
  if (!cards.length) return;

  cards.forEach(card => {
    // Preserve 3D context
    card.style.transformStyle = 'preserve-3d';
    card.style.perspective = '1000px';

    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      // Realistic 3D tilt angles based on cursor offset (-14deg to +14deg)
      const rotateX = ((y - centerY) / centerY) * -12;
      const rotateY = ((x - centerX) / centerX) * 14;

      card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-8px) scale3d(1.03, 1.03, 1.03)`;

      // Dynamic Specular Glare Follow
      const percentX = (x / rect.width) * 100;
      const percentY = (y / rect.height) * 100;
      card.style.setProperty('--glare-x', `${percentX}%`);
      card.style.setProperty('--glare-y', `${percentY}%`);

      // Parallax inner elements
      const badge = card.querySelector('.product-badge-float, .btn-favorite-float');
      if (badge) {
        badge.style.transform = 'translateZ(30px)';
      }
      const thumb = card.querySelector('.product-thumb img, .category-img-thumb');
      if (thumb) {
        thumb.style.transform = 'scale(1.1) translateZ(15px)';
      }
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0) scale3d(1, 1, 1)';
      const badge = card.querySelector('.product-badge-float, .btn-favorite-float');
      if (badge) {
        badge.style.transform = '';
      }
      const thumb = card.querySelector('.product-thumb img, .category-img-thumb');
      if (thumb) {
        thumb.style.transform = '';
      }
    });
  });
}


