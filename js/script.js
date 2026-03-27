/* ─────────────────────────────────────────────────────────
   KLYDE DEL CASTILLO PORTFOLIO · script.js
   Includes: nav, video modal, image lightbox, fade-in,
             back to top, active nav highlight
───────────────────────────────────────────────────────── */

// ── Nav scroll effect ─────────────────────────────────────
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 40);
});

// ── Mobile burger menu ────────────────────────────────────
const burger   = document.getElementById('burger');
const navLinks = document.querySelector('.nav__links');

burger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  burger.setAttribute('aria-expanded', navLinks.classList.contains('open'));
});

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    burger.setAttribute('aria-expanded', 'false');
  });
});

// ── VIDEO MODAL ───────────────────────────────────────────
const videoModal  = document.getElementById('video-modal');
const iframe      = document.getElementById('modal-iframe');
const videoClose  = document.getElementById('modal-close');
const videoBg     = document.getElementById('modal-backdrop');

function openVideo(url) {
  // Ensure clean URL — no autoplay param needed, YouTube handles it via allow attribute
  iframe.src = url;
  videoModal.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeVideo() {
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

videoClose.addEventListener('click', closeVideo);
videoBg.addEventListener('click', closeVideo);

// ── IMAGE LIGHTBOX ────────────────────────────────────────
const lightbox     = document.getElementById('lightbox');
const lightboxImg  = document.getElementById('lightbox-img');
const lightboxClose = document.getElementById('lightbox-close');
const lightboxBg   = document.getElementById('lightbox-backdrop');

function openLightbox(src, alt) {
  lightboxImg.src = src;
  lightboxImg.alt = alt || 'Workflow image';
  lightbox.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  lightbox.classList.remove('open');
  lightboxImg.src = '';
  document.body.style.overflow = '';
}

// Make all gallery images clickable
document.querySelectorAll('.gallery-img').forEach(img => {
  img.style.cursor = 'zoom-in';
  img.addEventListener('click', () => {
    const src = img.dataset.full || img.src;
    openLightbox(src, img.alt);
  });
});

// Also make zapier-card images clickable (in case not marked gallery-img)
document.querySelectorAll('.zapier-card__img').forEach(img => {
  img.style.cursor = 'zoom-in';
  img.addEventListener('click', () => {
    openLightbox(img.src, img.alt);
  });
});

lightboxClose.addEventListener('click', closeLightbox);
lightboxBg.addEventListener('click', closeLightbox);

// ── ESC key closes both modal and lightbox ────────────────
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    if (videoModal.classList.contains('open'))   closeVideo();
    if (lightbox.classList.contains('open'))     closeLightbox();
  }
});

// ── Scroll-triggered fade-in ──────────────────────────────
const fadeEls = document.querySelectorAll(
  '.hero__content, .about__inner, .project-card, .proof-card, .zapier-card, .contact__inner'
);

fadeEls.forEach(el => el.classList.add('fade-in'));

const fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      // Stagger delay for grid items
      entry.target.style.transitionDelay = (i % 4) * 0.08 + 's';
      entry.target.classList.add('visible');
      fadeObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

fadeEls.forEach(el => fadeObserver.observe(el));

// ── Back to top ───────────────────────────────────────────
const backTop = document.getElementById('back-top');

window.addEventListener('scroll', () => {
  backTop.classList.toggle('visible', window.scrollY > 400);
});

backTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ── Active nav link highlight on scroll ───────────────────
const sections   = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav__links a[href^="#"]');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navAnchors.forEach(a => a.style.color = '');
      const active = document.querySelector(`.nav__links a[href="#${entry.target.id}"]`);
      if (active && !active.classList.contains('nav__cta')) {
        active.style.color = '#00cfff';
      }
    }
  });
}, { threshold: 0.35 });

sections.forEach(s => sectionObserver.observe(s));