/* ============================================================
   Rajan Shukla — portfolio interactions
   ============================================================ */

// Footer year
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

/* ---------- Reveal on scroll ---------- */
const revealEls = document.querySelectorAll(
  '.section, .hero, .marquee, .contact'
);
revealEls.forEach(el => el.classList.add('reveal'));

const io = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-in');
        io.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.08, rootMargin: '0px 0px -5% 0px' }
);
revealEls.forEach(el => io.observe(el));

/* ---------- Animated counters ---------- */
const counterEls = document.querySelectorAll('.metric__value[data-count]');

const countObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = parseFloat(el.dataset.count);
      const suffix = el.dataset.suffix || '';
      const duration = 1400;
      const start = performance.now();

      function tick(now) {
        const t = Math.min((now - start) / duration, 1);
        // ease-out cubic
        const eased = 1 - Math.pow(1 - t, 3);
        const val = target * eased;
        const display =
          target >= 10 ? Math.round(val) : val.toFixed(1).replace(/\.0$/, '');
        el.textContent = display + suffix;
        if (t < 1) requestAnimationFrame(tick);
      }
      requestAnimationFrame(tick);
      countObserver.unobserve(el);
    });
  },
  { threshold: 0.5 }
);
counterEls.forEach(el => countObserver.observe(el));

/* ---------- Smooth active-nav highlighting ---------- */
const navLinks = document.querySelectorAll('.topbar__nav a');
const sections = Array.from(navLinks).map(a => {
  const id = a.getAttribute('href').replace('#', '');
  return document.getElementById(id);
}).filter(Boolean);

function onScroll() {
  const y = window.scrollY + 140;
  let current = null;
  sections.forEach(s => {
    if (s.offsetTop <= y) current = s.id;
  });
  navLinks.forEach(a => {
    const match = a.getAttribute('href') === '#' + current;
    a.style.color = match ? 'var(--accent)' : '';
  });
}
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

/* ---------- Subtle parallax on scatter background ---------- */
const scatter = document.querySelector('.scatter-bg svg');
if (scatter) {
  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    scatter.style.transform = `translateY(${y * -0.05}px)`;
  }, { passive: true });
}
