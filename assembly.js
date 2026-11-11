'use strict';
(() => {
  const reduce = matchMedia('(prefers-reduced-motion: reduce)');
  if (!('IntersectionObserver' in window) || reduce.matches) return;
  document.querySelectorAll('.assemble-heading').forEach(heading => {
    heading.querySelectorAll('.assemble-word').forEach((word, i) => {
      word.style.setProperty('--word-index', i);
      word.style.setProperty('--word-x', (i % 2 ? -24 : 24) + 'px');
      word.style.setProperty('--word-y', (i % 3 ? 30 : -22) + 'px');
      word.style.setProperty('--word-r', (i % 2 ? -5 : 5) + 'deg');
    });
  });
  document.querySelectorAll('.assemble-item').forEach((item, i) => item.style.setProperty('--panel-x', (i % 2 ? 30 : -30) + 'px'));
  document.documentElement.classList.add('assembly-ready');
  const timers = new Set();
  const observer = new IntersectionObserver(entries => entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const node = entry.target;
    node.classList.add('is-entering');
    observer.unobserve(node); // One bounded animation, never a continuous scroll loop.
    const timer = setTimeout(() => { node.classList.remove('is-entering'); timers.delete(timer); }, 1600);
    timers.add(timer);
  }), { threshold: .12, rootMargin: '0px 0px -25px 0px' });
  document.querySelectorAll('.assemble-heading,.assemble-item,.frame-build,.assembly-scene').forEach(node => observer.observe(node));
  reduce.addEventListener('change', () => {
    if (!reduce.matches) return;
    observer.disconnect(); timers.forEach(clearTimeout); timers.clear();
    document.querySelectorAll('.is-entering').forEach(node => node.classList.remove('is-entering'));
    document.documentElement.classList.remove('assembly-ready');
  });
})();
