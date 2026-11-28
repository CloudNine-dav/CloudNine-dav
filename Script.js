// Menu do celular (abre e fecha)
document.documentElement.classList.add('js');

const toggle = document.querySelector('.nav-toggle');
const menu = document.getElementById('menu');

toggle.addEventListener('click', () => {
  const open = menu.classList.toggle('open');
  toggle.setAttribute('aria-expanded', open);
  toggle.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
});

menu.addEventListener('click', (e) => {
  if (e.target.tagName === 'A') {
    menu.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
  }
});

// Seções aparecem suavemente ao rolar
const reveal = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      reveal.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

// Link do menu da seção atual fica destacado
const links = [...menu.querySelectorAll('a')];
const spy = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      links.forEach((a) => a.classList.toggle('active', a.hash === '#' + entry.target.id));
    }
  });
}, { rootMargin: '-40% 0px -55% 0px' });

document.querySelectorAll('.reveal').forEach((el) => {
  reveal.observe(el);
  spy.observe(el);
});

document.getElementById('ano').textContent = new Date().getFullYear();
