/* ─────────────────────────────────────────────────────────
   KLYDE DEL CASTILLO PORTFOLIO · script.js
   Includes: nav scroll, mobile burger, video modal,
             image lightbox, fade-in, back to top,
             active nav highlight
───────────────────────────────────────────────────────── */

// ── Nav scroll effect ─────────────────────────────────────
const nav = document.getElementById('nav');
if (nav) {
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 40);
  });
}

// ── Mobile burger menu ────────────────────────────────────
const burger   = document.getElementById('burger');
const navLinks = document.querySelector('.nav__links');

if (burger && navLinks) {
  burger.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    burger.setAttribute('aria-expanded', isOpen);
  });

  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      burger.setAttribute('aria-expanded', 'false');
    });
  });
}

// ── VIDEO MODAL ───────────────────────────────────────────
const videoModal = document.getElementById('video-modal');
const iframe     = document.getElementById('modal-iframe');
const videoClose = document.getElementById('modal-close');
const videoBg    = document.getElementById('modal-backdrop');

function openVideo(url) {
  if (!iframe || !videoModal) return;
  iframe.src = url;
  videoModal.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeVideo() {
  if (!iframe || !videoModal) return;
  videoModal.classList.remove('open');
  iframe.src = '';
  document.body.style.overflow = '';
}

// Watch Demo buttons (card body)
document.querySelectorAll('.project-card__demo').forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    const url = btn.dataset.video;
    if (url) openVideo(url);
  });
});

// Play overlay buttons (thumbnail)
document.querySelectorAll('.play-btn').forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    const card = btn.closest('.project-card');
    const url  = card ? card.dataset.video : null;
    if (url) openVideo(url);
  });
});

if (videoClose) videoClose.addEventListener('click', closeVideo);
if (videoBg)    videoBg.addEventListener('click', closeVideo);

// ── IMAGE LIGHTBOX ────────────────────────────────────────
const lightbox      = document.getElementById('lightbox');
const lightboxImg   = document.getElementById('lightbox-img');
const lightboxClose = document.getElementById('lightbox-close');
const lightboxBg    = document.getElementById('lightbox-backdrop');

function openLightbox(src, alt) {
  if (!lightboxImg || !lightbox) return;
  lightboxImg.src = src;
  lightboxImg.alt = alt || 'Workflow image';
  lightbox.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  if (!lightboxImg || !lightbox) return;
  lightbox.classList.remove('open');
  lightboxImg.src = '';
  document.body.style.overflow = '';
}

document.querySelectorAll('.gallery-img').forEach(img => {
  img.addEventListener('click', () => {
    openLightbox(img.dataset.full || img.src, img.alt);
  });
});

document.querySelectorAll('.zapier-card__img').forEach(img => {
  img.addEventListener('click', () => {
    openLightbox(img.src, img.alt);
  });
});

if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
if (lightboxBg)    lightboxBg.addEventListener('click', closeLightbox);

// ── ESC key closes both ───────────────────────────────────
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    if (videoModal && videoModal.classList.contains('open'))   closeVideo();
    if (lightbox   && lightbox.classList.contains('open'))     closeLightbox();
  }
});

// ── Scroll-triggered fade-in ──────────────────────────────
const fadeTargets = document.querySelectorAll(
  '.hero__content, .about__inner, .project-card, .proof-card, .zapier-card, .contact__inner'
);

fadeTargets.forEach(el => el.classList.add('fade-in'));

const fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      // Find sibling index for stagger — avoids the broken modulo pattern
      const siblings = Array.from(entry.target.parentElement?.children || []);
      const idx = siblings.indexOf(entry.target);
      entry.target.style.transitionDelay = Math.min(idx, 3) * 0.08 + 's';
      entry.target.classList.add('visible');
      fadeObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

fadeTargets.forEach(el => fadeObserver.observe(el));

// ── Back to top ───────────────────────────────────────────
const backTop = document.getElementById('back-top');

if (backTop) {
  window.addEventListener('scroll', () => {
    backTop.classList.toggle('visible', window.scrollY > 400);
  });

  backTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// ── Active nav link highlight on scroll ───────────────────
const sections   = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav__links a[href^="#"]');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navAnchors.forEach(a => a.style.color = '');
      const active = document.querySelector(`.nav__links a[href="#${entry.target.id}"]`);
      if (active && !active.classList.contains('nav__cta')) {
        active.style.color = '#F5A623';
      }
    }
  });
}, { threshold: 0.35 });

sections.forEach(s => sectionObserver.observe(s));