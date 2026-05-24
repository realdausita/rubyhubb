/* ===========================
   RUBY HUB - JAVASCRIPT
   Particles, Animations, Interactions
   =========================== */

// --- Script to Copy ---
const SCRIPT_TEXT = 'loadstring(game:HttpGet("https://rubyhub.vercel.app/loader.lua"))()';

// ===========================
// PARTICLE SYSTEM
// ===========================
(function initParticles() {
  const canvas = document.getElementById('particles-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let particles = [];
  let animationId;
  let width, height;

  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  }

  function createParticle() {
    return {
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      radius: Math.random() * 1.5 + 0.5,
      opacity: Math.random() * 0.5 + 0.1,
      color: Math.random() > 0.7 ? '#E31B54' : '#ffffff'
    };
  }

  function initParticleArray() {
    const count = Math.min(Math.floor((width * height) / 15000), 80);
    particles = [];
    for (let i = 0; i < count; i++) {
      particles.push(createParticle());
    }
  }

  function drawParticles() {
    ctx.clearRect(0, 0, width, height);

    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = p.color;
      ctx.globalAlpha = p.opacity;
      ctx.fill();

      // Draw connections
      for (let j = i + 1; j < particles.length; j++) {
        const p2 = particles[j];
        const dx = p.x - p2.x;
        const dy = p.y - p2.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 150) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.strokeStyle = p.color === '#E31B54' || p2.color === '#E31B54'
            ? 'rgba(227, 27, 84, 0.06)'
            : 'rgba(255, 255, 255, 0.04)';
          ctx.globalAlpha = 1 - dist / 150;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }

      // Update position
      p.x += p.vx;
      p.y += p.vy;

      // Wrap around
      if (p.x < 0) p.x = width;
      if (p.x > width) p.x = 0;
      if (p.y < 0) p.y = height;
      if (p.y > height) p.y = 0;
    }

    ctx.globalAlpha = 1;
    animationId = requestAnimationFrame(drawParticles);
  }

  resize();
  initParticleArray();
  drawParticles();

  window.addEventListener('resize', () => {
    resize();
    initParticleArray();
  });
})();


// ===========================
// NAVBAR SCROLL EFFECT
// ===========================
(function initNavbar() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;

  let lastScroll = 0;
  window.addEventListener('scroll', () => {
    const currentScroll = window.scrollY;
    if (currentScroll > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    lastScroll = currentScroll;
  }, { passive: true });
})();


// ===========================
// MOBILE MENU TOGGLE
// ===========================
(function initMobileMenu() {
  const toggle = document.getElementById('mobile-toggle');
  const navLinks = document.getElementById('nav-links');
  if (!toggle || !navLinks) return;

  toggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    toggle.classList.toggle('active');
  });

  // Close menu on link click
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      toggle.classList.remove('active');
    });
  });
})();


// ===========================
// SCROLL REVEAL ANIMATIONS
// ===========================
(function initScrollReveal() {
  const revealElements = document.querySelectorAll('.reveal');
  if (!revealElements.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  revealElements.forEach(el => observer.observe(el));
})();


// ===========================
// COPY TO CLIPBOARD
// ===========================
function copyScript() {
  navigator.clipboard.writeText(SCRIPT_TEXT).then(() => {
    showToast();
  }).catch(() => {
    // Fallback for older browsers
    const textarea = document.createElement('textarea');
    textarea.value = SCRIPT_TEXT;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
    showToast();
  });
}

function showToast() {
  const toast = document.getElementById('toast');
  if (!toast) return;
  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
  }, 2500);
}

// Copy button for code block
(function initCopyButtons() {
  const copyCodeBtn = document.getElementById('copy-code-btn');
  if (copyCodeBtn) {
    copyCodeBtn.addEventListener('click', () => {
      copyScript();
      copyCodeBtn.classList.add('copied');
      const originalHTML = copyCodeBtn.innerHTML;
      copyCodeBtn.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="14" height="14"><polyline points="20 6 9 17 4 12"/></svg> Copied!';
      setTimeout(() => {
        copyCodeBtn.classList.remove('copied');
        copyCodeBtn.innerHTML = originalHTML;
      }, 2000);
    });
  }

  // Hero copy button
  const heroCopyBtn = document.getElementById('hero-copy-btn');
  if (heroCopyBtn) {
    heroCopyBtn.addEventListener('click', copyScript);
  }

  // CTA copy button
  const ctaCopyBtn = document.getElementById('cta-copy-btn');
  if (ctaCopyBtn) {
    ctaCopyBtn.addEventListener('click', copyScript);
  }
})();


// ===========================
// SMOOTH SCROLL FOR NAV
// ===========================
(function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      e.preventDefault();
      const target = document.querySelector(targetId);
      if (target) {
        const navbarHeight = 72;
        const targetPosition = target.getBoundingClientRect().top + window.scrollY - navbarHeight;
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
})();


// ===========================
// STATS COUNTER ANIMATION
// ===========================
(function initCounters() {
  const statNumbers = document.querySelectorAll('.hero-stat-number');
  if (!statNumbers.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const finalText = el.textContent;
        const numMatch = finalText.match(/\d+/);

        if (numMatch) {
          const finalNum = parseInt(numMatch[0]);
          const suffix = finalText.replace(numMatch[0], '');
          let current = 0;
          const increment = Math.max(1, Math.floor(finalNum / 30));
          const duration = 1000;
          const steps = Math.ceil(finalNum / increment);
          const interval = duration / steps;

          const timer = setInterval(() => {
            current += increment;
            if (current >= finalNum) {
              current = finalNum;
              clearInterval(timer);
            }
            el.textContent = current + suffix;
          }, interval);
        }

        observer.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  statNumbers.forEach(el => observer.observe(el));
})();


// ===========================
// CARD TILT EFFECT (subtle)
// ===========================
(function initTiltEffect() {
  const cards = document.querySelectorAll('.feature-card, .game-card, .team-card');
  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = (y - centerY) / centerY * -3;
      const rotateY = (x - centerX) / centerX * 3;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
})();
