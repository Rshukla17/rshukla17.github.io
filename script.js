/* ============================================================
   Rajan Shukla — Portfolio v2 · motion edition
   ============================================================ */

// -------- Footer year --------
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// -------- Cursor glow (lerp for smoothness) --------
const glow = document.querySelector('.cursor-glow');
let mx = window.innerWidth / 2;
let my = window.innerHeight / 2;
let gx = mx, gy = my;

if (glow && !window.matchMedia('(hover: none)').matches) {
  window.addEventListener('mousemove', e => {
    mx = e.clientX;
    my = e.clientY;
  }, { passive: true });

  function raf() {
    gx += (mx - gx) * 0.12;
    gy += (my - gy) * 0.12;
    glow.style.transform = `translate(${gx}px, ${gy}px) translate(-50%, -50%)`;
    requestAnimationFrame(raf);
  }
  raf();
}

// -------- Scroll-trigger reveals --------
const revealEls = document.querySelectorAll('.section, .contact, .marquee');

const io = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-in');
        io.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
);
revealEls.forEach(el => io.observe(el));

const projectEls = document.querySelectorAll('.project');
const pio = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-in');
        pio.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.2 }
);
projectEls.forEach(el => pio.observe(el));

// -------- Animated counters --------
const counterEls = document.querySelectorAll('.metric__value[data-count]');

const countObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = parseFloat(el.dataset.count);
      const suffix = el.dataset.suffix || '';
      const duration = 1600;
      const start = performance.now();

      function tick(now) {
        const t = Math.min((now - start) / duration, 1);
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

// -------- Active nav highlight --------
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

// -------- Parallax background layers --------
const scatter = document.querySelector('.scatter-bg svg');
const gridOverlay = document.querySelector('.grid-overlay');

window.addEventListener('scroll', () => {
  const y = window.scrollY;
  if (scatter) scatter.style.transform = `translateY(${y * -0.08}px)`;
  if (gridOverlay) gridOverlay.style.transform = `translateY(${y * -0.03}px)`;
}, { passive: true });

// -------- Magnetic contact cards --------
document.querySelectorAll('.contact__card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) * 0.1;
    const y = (e.clientY - rect.top - rect.height / 2) * 0.1;
    card.style.transform = `translate(${x}px, ${y - 4}px) scale(1.01)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});

// -------- Project viz 3D tilt --------
document.querySelectorAll('.project').forEach(parent => {
  const viz = parent.querySelector('.project__viz');
  if (!viz) return;

  parent.addEventListener('mousemove', e => {
    const rect = viz.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    viz.style.transform = `perspective(800px) rotateY(${x * 6}deg) rotateX(${-y * 6}deg) scale(1.02)`;
  });
  parent.addEventListener('mouseleave', () => {
    viz.style.transform = '';
  });
});
