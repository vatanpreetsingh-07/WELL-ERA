/* ============================================
   WELL-ERA — Anti-Gravity Watch Brand
   Interactive JavaScript Engine
   ============================================ */

// ── Wait for DOM ──
document.addEventListener('DOMContentLoaded', () => {

  // ═══════════════════════════════════════════
  // 1. LOADING SCREEN
  // ═══════════════════════════════════════════
  const loader = document.getElementById('loader');
  window.addEventListener('load', () => {
    setTimeout(() => {
      loader.classList.add('hidden');
    }, 2500);
  });
  // Fallback: remove loader after 4s even if assets are slow
  setTimeout(() => loader.classList.add('hidden'), 4000);

  // ═══════════════════════════════════════════
  // 2. CUSTOM CURSOR (desktop only)
  // ═══════════════════════════════════════════
  const cursorDot = document.getElementById('cursorDot');
  const cursorGlow = document.getElementById('cursorGlow');
  let mouseX = 0, mouseY = 0;
  let glowX = 0, glowY = 0;

  if (window.matchMedia('(pointer: fine)').matches) {
    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursorDot.style.left = mouseX + 'px';
      cursorDot.style.top = mouseY + 'px';
    });

    // Smooth glow follow
    function animateCursor() {
      glowX += (mouseX - glowX) * 0.15;
      glowY += (mouseY - glowY) * 0.15;
      cursorGlow.style.left = glowX + 'px';
      cursorGlow.style.top = glowY + 'px';
      requestAnimationFrame(animateCursor);
    }
    animateCursor();

    // Hover enlargement on interactive elements
    const hoverables = document.querySelectorAll('a, button, .color-swatch, .feature-card, .testimonial-card');
    hoverables.forEach(el => {
      el.addEventListener('mouseenter', () => cursorGlow.classList.add('hover'));
      el.addEventListener('mouseleave', () => cursorGlow.classList.remove('hover'));
    });
  }

  // ═══════════════════════════════════════════
  // 3. SCROLL PROGRESS INDICATOR
  // ═══════════════════════════════════════════
  const scrollProgress = document.getElementById('scrollProgress');
  window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    const progress = (scrolled / maxScroll) * 100;
    scrollProgress.style.width = progress + '%';
  }, { passive: true });

  // ═══════════════════════════════════════════
  // 4. NAVBAR SCROLL EFFECT
  // ═══════════════════════════════════════════
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 80) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }, { passive: true });

  // ═══════════════════════════════════════════
  // 5. MOBILE NAV TOGGLE
  // ═══════════════════════════════════════════
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');

  navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navLinks.classList.toggle('open');
  });

  // Close menu on link click
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navToggle.classList.remove('active');
      navLinks.classList.remove('open');
    });
  });

  // ═══════════════════════════════════════════
  // 6. HERO PARTICLES
  // ═══════════════════════════════════════════
  const heroParticles = document.getElementById('heroParticles');
  for (let i = 0; i < 40; i++) {
    const p = document.createElement('div');
    p.classList.add('hero-particle');
    const size = Math.random() * 4 + 2;
    p.style.width = size + 'px';
    p.style.height = size + 'px';
    p.style.left = Math.random() * 100 + '%';
    p.style.animationDuration = (Math.random() * 12 + 8) + 's';
    p.style.animationDelay = (Math.random() * 10) + 's';
    p.style.opacity = Math.random() * 0.6 + 0.2;
    heroParticles.appendChild(p);
  }

  // ═══════════════════════════════════════════
  // 7. HERO LIGHT STREAKS
  // ═══════════════════════════════════════════
  const heroStreaks = document.getElementById('heroStreaks');
  for (let i = 0; i < 12; i++) {
    const s = document.createElement('div');
    s.classList.add('hero-streak');
    s.style.left = Math.random() * 100 + '%';
    s.style.animationDuration = (Math.random() * 4 + 3) + 's';
    s.style.animationDelay = (Math.random() * 6) + 's';
    s.style.height = (Math.random() * 100 + 60) + 'px';
    heroStreaks.appendChild(s);
  }

  // ═══════════════════════════════════════════
  // 8. SCROLL REVEAL ANIMATIONS
  // ═══════════════════════════════════════════
  const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));

  // ═══════════════════════════════════════════
  // 9. STAT COUNTER ANIMATION
  // ═══════════════════════════════════════════
  const statNumbers = document.querySelectorAll('.about-stat-number[data-count]');
  let statsCounted = false;

  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !statsCounted) {
        statsCounted = true;
        statNumbers.forEach(num => {
          const target = parseInt(num.getAttribute('data-count'));
          let current = 0;
          const increment = target / 60;
          const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
              current = target;
              clearInterval(timer);
            }
            num.textContent = Math.round(current);
          }, 25);
        });
      }
    });
  }, { threshold: 0.5 });

  const statsSection = document.querySelector('.about-stats');
  if (statsSection) statsObserver.observe(statsSection);

  // ═══════════════════════════════════════════
  // 10. BUTTON RIPPLE EFFECT
  // ═══════════════════════════════════════════
  document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', function (e) {
      const ripple = document.createElement('span');
      ripple.classList.add('ripple');
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      ripple.style.width = ripple.style.height = size + 'px';
      ripple.style.left = (e.clientX - rect.left - size / 2) + 'px';
      ripple.style.top = (e.clientY - rect.top - size / 2) + 'px';
      this.appendChild(ripple);
      setTimeout(() => ripple.remove(), 700);
    });
  });

  // ═══════════════════════════════════════════
  // 11. PRODUCT COLOR SWITCHING
  // ═══════════════════════════════════════════
  const showcaseImg = document.getElementById('showcaseImg');
  const showcaseTitle = document.getElementById('showcaseTitle');
  const showcaseDesc = document.getElementById('showcaseDesc');
  const colorName = document.getElementById('colorName');
  const swatches = document.querySelectorAll('.color-swatch');

  const productData = {
    lavender: {
      image: 'images/watch-lavender.png',
      title: 'Lavender Edition',
      desc: 'Wrapped in our signature lavender gradient with a holographic sapphire dial. The Lavender Edition is the flagship statement piece — bold, dreamy, and utterly unforgettable.',
      colorName: 'Lavender Nebula'
    },
    white: {
      image: 'images/watch-white.png',
      title: 'White Edition',
      desc: 'Pure, minimal, and celestial. The White Edition features a frosted ceramic case with a crystalline dial — designed for those who let their style speak in silence.',
      colorName: 'Celestial White'
    }
  };

  swatches.forEach(swatch => {
    swatch.addEventListener('click', () => {
      const color = swatch.getAttribute('data-color');
      const data = productData[color];
      if (!data) return;

      // Set active swatch
      swatches.forEach(s => s.classList.remove('active'));
      swatch.classList.add('active');

      // Animate transition
      showcaseImg.style.opacity = '0';
      showcaseImg.style.transform = 'translateY(20px) scale(0.95)';

      setTimeout(() => {
        showcaseImg.src = data.image;
        showcaseTitle.textContent = data.title;
        showcaseDesc.textContent = data.desc;
        colorName.textContent = data.colorName;

        showcaseImg.style.opacity = '1';
        showcaseImg.style.transform = 'translateY(0) scale(1)';
      }, 350);
    });
  });

  // Make the showcase image transition smooth
  if (showcaseImg) {
    showcaseImg.style.transition = 'opacity 0.4s cubic-bezier(0.16,1,0.3,1), transform 0.4s cubic-bezier(0.16,1,0.3,1)';
  }

  // ═══════════════════════════════════════════
  // 12. TESTIMONIALS CAROUSEL
  // ═══════════════════════════════════════════
  const track = document.getElementById('testimonialsTrack');
  const controls = document.getElementById('testimonialControls');
  const cards = track ? track.querySelectorAll('.testimonial-card') : [];
  let currentSlide = 0;
  let cardsPerView = 3;
  let autoSlideInterval;

  function getCardsPerView() {
    if (window.innerWidth <= 768) return 1;
    if (window.innerWidth <= 1024) return 2;
    return 3;
  }

  function getTotalSlides() {
    return Math.ceil(cards.length / cardsPerView);
  }

  function buildDots() {
    if (!controls) return;
    controls.innerHTML = '';
    const total = getTotalSlides();
    for (let i = 0; i < total; i++) {
      const dot = document.createElement('button');
      dot.classList.add('testimonial-dot');
      if (i === 0) dot.classList.add('active');
      dot.setAttribute('aria-label', `View testimonial group ${i + 1}`);
      dot.addEventListener('click', () => goToSlide(i));
      controls.appendChild(dot);
    }
  }

  function goToSlide(index) {
    const total = getTotalSlides();
    currentSlide = ((index % total) + total) % total;
    const cardWidth = cards[0] ? cards[0].offsetWidth + 24 : 300; // 24 = gap
    const offset = currentSlide * cardsPerView * cardWidth;
    track.style.transform = `translateX(-${offset}px)`;

    // Update dots
    controls.querySelectorAll('.testimonial-dot').forEach((dot, i) => {
      dot.classList.toggle('active', i === currentSlide);
    });
  }

  function startAutoSlide() {
    autoSlideInterval = setInterval(() => {
      goToSlide(currentSlide + 1);
    }, 4500);
  }

  function resetAutoSlide() {
    clearInterval(autoSlideInterval);
    startAutoSlide();
  }

  // Init carousel
  if (track && cards.length) {
    cardsPerView = getCardsPerView();
    buildDots();
    startAutoSlide();

    // Pause on hover
    track.addEventListener('mouseenter', () => clearInterval(autoSlideInterval));
    track.addEventListener('mouseleave', startAutoSlide);

    // Handle resize
    window.addEventListener('resize', () => {
      const newPerView = getCardsPerView();
      if (newPerView !== cardsPerView) {
        cardsPerView = newPerView;
        currentSlide = 0;
        buildDots();
        goToSlide(0);
        resetAutoSlide();
      }
    });
  }

  // ═══════════════════════════════════════════
  // 13. PARALLAX FLOATING ELEMENTS
  // ═══════════════════════════════════════════
  const heroVisual = document.querySelector('.hero-visual');
  const heroWatch = document.querySelector('.hero-watch');

  if (heroVisual && window.matchMedia('(pointer: fine)').matches) {
    heroVisual.addEventListener('mousemove', (e) => {
      const rect = heroVisual.getBoundingClientRect();
      const x = (e.clientX - rect.left - rect.width / 2) / rect.width;
      const y = (e.clientY - rect.top - rect.height / 2) / rect.height;

      if (heroWatch) {
        heroWatch.style.transform = `translate(${x * 20}px, ${y * 15}px)`;
        heroWatch.style.transition = 'transform 0.3s ease-out';
      }
    });

    heroVisual.addEventListener('mouseleave', () => {
      if (heroWatch) {
        heroWatch.style.transform = 'translate(0, 0)';
      }
    });
  }

  // ═══════════════════════════════════════════
  // 14. SCROLL-BASED PARALLAX
  // ═══════════════════════════════════════════
  const heroGlows = document.querySelectorAll('.hero-glow');

  window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    heroGlows.forEach((glow, i) => {
      const speed = (i + 1) * 0.1;
      glow.style.transform = `translateY(${scrolled * speed}px)`;
    });
  }, { passive: true });

  // ═══════════════════════════════════════════
  // 15. NEWSLETTER FORM
  // ═══════════════════════════════════════════
  const newsletterForm = document.getElementById('newsletterForm');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = newsletterForm.querySelector('.newsletter-input');
      const btn = newsletterForm.querySelector('.newsletter-btn');
      const originalText = btn.textContent;

      btn.textContent = '✓ Joined!';
      btn.style.background = 'linear-gradient(135deg, #10b981, #059669)';
      input.value = '';

      setTimeout(() => {
        btn.textContent = originalText;
        btn.style.background = '';
      }, 2500);
    });
  }

  // ═══════════════════════════════════════════
  // 16. SMOOTH SCROLL FOR ANCHOR LINKS
  // ═══════════════════════════════════════════
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href === '#') return;
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        const offset = navbar.offsetHeight + 10;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  // ═══════════════════════════════════════════
  // 17. FEATURE CARDS TILT ON HOVER
  // ═══════════════════════════════════════════
  document.querySelectorAll('.feature-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      card.style.transform = `translateY(-8px) perspective(800px) rotateX(${y * -6}deg) rotateY(${x * 6}deg)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'translateY(0) perspective(800px) rotateX(0) rotateY(0)';
    });
  });

  // ═══════════════════════════════════════════
  // 18. CHATBOT FUNCTIONALITY
  // ═══════════════════════════════════════════
  const chatbotToggle = document.getElementById('chatbotToggle');
  const chatbotWindow = document.getElementById('chatbotWindow');
  const chatbotClose = document.getElementById('chatbotClose');
  const chatbotForm = document.getElementById('chatbotForm');
  const chatbotInput = document.getElementById('chatbotInput');
  const chatbotMessages = document.getElementById('chatbotMessages');

  if (chatbotToggle && chatbotWindow) {
    // Toggle Chatbot
    chatbotToggle.addEventListener('click', () => {
      chatbotWindow.classList.toggle('open');
      if (chatbotWindow.classList.contains('open')) {
        chatbotInput.focus();
      }
    });

    chatbotClose.addEventListener('click', () => {
      chatbotWindow.classList.remove('open');
    });

    // Handle form submit
    chatbotForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const messageText = chatbotInput.value.trim();
      if (!messageText) return;

      // Add user message
      appendMessage('user', messageText);
      chatbotInput.value = '';

      // Simulate bot typing
      setTimeout(() => {
        const botResponses = [
          "I'm an AI assistant for Well-Era. The Anti-Gravity watch is currently available for pre-order!",
          "Our floating balance technology ensures the watch feels weightless on your wrist.",
          "We offer the Lavender Nebula and Celestial White editions.",
          "Let me know if you need help with your pre-order or have questions about specs."
        ];
        const randomResponse = botResponses[Math.floor(Math.random() * botResponses.length)];
        appendMessage('bot', randomResponse);
      }, 1000);
    });

    function appendMessage(sender, text) {
      const msgDiv = document.createElement('div');
      msgDiv.classList.add('chat-msg');
      msgDiv.classList.add(sender === 'user' ? 'user-msg' : 'bot-msg');

      const avatarIcon = sender === 'user' ? 'fa-user' : 'fa-robot';
      
      msgDiv.innerHTML = `
        <div class="msg-avatar"><i class="fa-solid ${avatarIcon}"></i></div>
        <div class="msg-content">${text}</div>
      `;

      chatbotMessages.appendChild(msgDiv);
      chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    }
  }

});
