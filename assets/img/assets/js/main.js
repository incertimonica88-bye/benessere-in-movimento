// Benessere in Movimento — script condiviso

let revealObserver = null;

function initRevealObserver() {
  const revealEls = document.querySelectorAll('.reveal');
  if (!revealEls.length) return;
  if ('IntersectionObserver' in window) {
    if (!revealObserver) {
      revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            revealObserver.unobserve(entry.target);
          }
        });
      }, { threshold: 0.12 });
    }
    revealEls.forEach(el => {
      if (!el.classList.contains('is-visible')) revealObserver.observe(el);
    });
  } else {
    revealEls.forEach(el => el.classList.add('is-visible'));
  }
}
// Esposta per essere richiamata dagli script di pagina dopo l'inserimento di contenuti dinamici
window.observeReveals = initRevealObserver;

document.addEventListener('DOMContentLoaded', () => {
  const nav = document.querySelector('.nav');
  const toggle = document.querySelector('.nav__toggle');
  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const isOpen = nav.classList.toggle('nav--open');
      toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });
    nav.querySelectorAll('.nav__links a').forEach(link => {
      link.addEventListener('click', () => nav.classList.remove('nav--open'));
    });
  }

  initRevealObserver();
});
