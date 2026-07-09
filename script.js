/* Rajan Shukla — Portfolio */

// Footer year
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// Mobile nav toggle
const toggle = document.querySelector('.nav__toggle');
const links = document.querySelector('.nav__links');

if (toggle && links) {
  toggle.addEventListener('click', () => {
    const open = links.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  });
  // Close menu after choosing a link
  links.querySelectorAll('a').forEach(a =>
    a.addEventListener('click', () => {
      links.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
    })
  );
}

// Scroll-triggered reveals
const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const revealTargets = document.querySelectorAll(
  '.section__head, .about__copy, .about__panel, .job, .paper, .proj, .stack__group, .award, .contact__inner'
);

if (!prefersReduced && 'IntersectionObserver' in window) {
  revealTargets.forEach(el => el.classList.add('reveal'));
  const io = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-in');
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -6% 0px' }
  );
  revealTargets.forEach(el => io.observe(el));
}

// Active nav highlight while scrolling
const navAnchors = document.querySelectorAll('.nav__links a[href^="#"]');
const sections = Array.from(navAnchors)
  .map(a => document.getElementById(a.getAttribute('href').slice(1)))
  .filter(Boolean);

function highlightNav() {
  const y = window.scrollY + 160;
  let current = null;
  sections.forEach(s => {
    if (s.offsetTop <= y) current = s.id;
  });
  navAnchors.forEach(a => {
    a.classList.toggle('is-active', a.getAttribute('href') === '#' + current);
  });
}
window.addEventListener('scroll', highlightNav, { passive: true });
highlightNav();
