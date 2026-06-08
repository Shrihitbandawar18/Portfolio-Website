/* ========================================
   SHRIHIT BANDAWAR PORTFOLIO – script.js
   ======================================== */

'use strict';

// ── Loader ──────────────────────────────
const loader = document.getElementById('loader');
window.addEventListener('load', () => {
  setTimeout(() => loader?.classList.add('done'), 1600);
});

// ── Custom Cursor ────────────────────────
const cursorDot = document.getElementById('cursorDot');
const cursorRing = document.getElementById('cursorRing');
if (window.matchMedia('(pointer: fine)').matches) {
  document.addEventListener('mousemove', e => {
    cursorDot.style.left = e.clientX + 'px';
    cursorDot.style.top = e.clientY + 'px';
    cursorRing.style.left = e.clientX + 'px';
    cursorRing.style.top = e.clientY + 'px';
  });
  document.querySelectorAll('a, button, .project-card, .skill-category').forEach(el => {
    el.addEventListener('mouseenter', () => cursorRing.style.transform = 'translate(-50%, -50%) scale(1.6)');
    el.addEventListener('mouseleave', () => cursorRing.style.transform = 'translate(-50%, -50%) scale(1)');
  });
}

// ── Theme Toggle ─────────────────────────
const themeToggle = document.getElementById('themeToggle');
const root = document.documentElement;
const savedTheme = localStorage.getItem('theme') || 'dark';
applyTheme(savedTheme);

themeToggle?.addEventListener('click', () => {
  const current = root.getAttribute('data-theme');
  applyTheme(current === 'dark' ? 'light' : 'dark');
});

function applyTheme(theme) {
  root.setAttribute('data-theme', theme);
  document.body.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
  if (themeToggle) themeToggle.querySelector('.toggle-icon').textContent = theme === 'dark' ? '☀' : '☾';
}

// ── Navbar Scroll & Active ───────────────
const navbar = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
  // Scrolled class for shadow
  navbar?.classList.toggle('scrolled', window.scrollY > 20);

  // Active nav link
  let current = '';
  sections.forEach(sec => {
    const top = sec.offsetTop - 100;
    if (window.scrollY >= top) current = sec.id;
  });
  navLinks.forEach(link => {
    link.classList.toggle('active', link.dataset.section === current);
  });
}, { passive: true });

// Smooth scroll for nav links
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    const target = document.querySelector(link.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    // Close mobile menu
    navLinksMenu?.classList.remove('open');
    hamburger?.classList.remove('open');
    hamburger?.setAttribute('aria-expanded', 'false');
  });
});

// ── Hamburger Menu ───────────────────────
const hamburger = document.getElementById('hamburger');
const navLinksMenu = document.getElementById('navLinks');
hamburger?.addEventListener('click', () => {
  const open = navLinksMenu.classList.toggle('open');
  hamburger.classList.toggle('open', open);
  hamburger.setAttribute('aria-expanded', String(open));
});

// ── Scroll Reveal ────────────────────────
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      // Staggered delay for grid items
      const delay = entry.target.closest('.skills-grid, .projects-grid, .resume-grid')
        ? Array.from(entry.target.parentElement.children).indexOf(entry.target) * 80
        : 0;
      setTimeout(() => entry.target.classList.add('in-view'), delay);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// ── Typing Effect ─────────────────────────
const phrases = [
  'scalable web apps.',
  'AI-powered solutions.',
  'data dashboards.',
  'full-stack products.',
  'ML models.',
  'clean REST APIs.'
];
let phraseIdx = 0, charIdx = 0, deleting = false;
const typedEl = document.getElementById('typedText');

function typeWriter() {
  if (!typedEl) return;
  const phrase = phrases[phraseIdx];
  if (!deleting) {
    typedEl.textContent = phrase.slice(0, ++charIdx);
    if (charIdx === phrase.length) { deleting = true; setTimeout(typeWriter, 2200); return; }
  } else {
    typedEl.textContent = phrase.slice(0, --charIdx);
    if (charIdx === 0) { deleting = false; phraseIdx = (phraseIdx + 1) % phrases.length; }
  }
  setTimeout(typeWriter, deleting ? 55 : 80);
}
setTimeout(typeWriter, 1800);

// ── Project Filter ────────────────────────
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => { b.classList.remove('active'); b.setAttribute('aria-selected', 'false'); });
    btn.classList.add('active');
    btn.setAttribute('aria-selected', 'true');

    const filter = btn.dataset.filter;
    projectCards.forEach(card => {
      const match = filter === 'all' || card.dataset.category === filter;
      card.classList.toggle('hidden', !match);
      // Re-trigger reveal for newly shown cards
      if (match && !card.classList.contains('in-view')) {
        card.classList.add('in-view');
      }
    });
  });
});

// ── Contact Form Validation ───────────────
const form = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');

function getField(id) { return document.getElementById(id); }
function getError(id) { return document.getElementById(id + 'Error'); }

function validateField(id, errorId, validator, message) {
  const el = getField(id);
  const err = getError(errorId.replace('Error', ''));
  if (!el || !err) return true;
  const valid = validator(el.value.trim());
  el.classList.toggle('error', !valid);
  err.textContent = valid ? '' : message;
  return valid;
}

function validateAll() {
  const checks = [
    validateField('fname', 'name', v => v.length >= 2, 'Please enter your name (min 2 characters).'),
    validateField('femail', 'email', v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v), 'Please enter a valid email address.'),
    validateField('fsubject', 'subject', v => v.length >= 3, 'Subject must be at least 3 characters.'),
    validateField('fmessage', 'message', v => v.length >= 20, 'Message should be at least 20 characters.')
  ];
  return checks.every(Boolean);
}

// Live validation on blur
['fname', 'femail', 'fsubject', 'fmessage'].forEach(id => {
  const el = getField(id);
  el?.addEventListener('blur', () => validateAll());
  el?.addEventListener('input', () => {
    if (el.classList.contains('error')) validateAll();
  });
});

form?.addEventListener('submit', e => {
  e.preventDefault();
  if (!validateAll()) return;

  const submitBtn = document.getElementById('submitBtn');
  const btnText = submitBtn?.querySelector('.btn-text');
  if (btnText) btnText.textContent = 'Sending…';
  submitBtn?.setAttribute('disabled', 'true');

  // Simulate submission (replace with actual backend / EmailJS / Formspree)
  setTimeout(() => {
    formSuccess.textContent = '✓ Message sent! I\'ll get back to you soon.';
    formSuccess.classList.add('show');
    form.reset();
    if (btnText) btnText.textContent = 'Send Message';
    submitBtn?.removeAttribute('disabled');
    setTimeout(() => { formSuccess.textContent = ''; formSuccess.classList.remove('show'); }, 5000);
  }, 1200);
});

// ── Reveal Staggered delays for hero ────
document.querySelectorAll('.hero-content.reveal').forEach(el => {
  // Hero reveals on load after loader
  setTimeout(() => el.classList.add('in-view'), 1700);
});
document.querySelectorAll('.hero-visual.reveal').forEach(el => {
  setTimeout(() => el.classList.add('in-view'), 1900);
});
