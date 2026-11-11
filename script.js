'use strict';
(() => {
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
  const header = $('header');
  const menu = $('.menu');
  const nav = $('#nav');
  const motionButton = $('.motion-toggle');
  const preference = matchMedia('(prefers-reduced-motion: reduce)');
  let paused = preference.matches;
  let motionChoice = false;

  function setMenu(open, restoreFocus = false) {
    nav.classList.toggle('open', open);
    menu.setAttribute('aria-expanded', String(open));
    menu.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
    if (restoreFocus) menu.focus();
  }
  menu.addEventListener('click', () => setMenu(menu.getAttribute('aria-expanded') !== 'true'));
  $$('a', nav).forEach(a => a.addEventListener('click', () => setMenu(false)));
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && nav.classList.contains('open')) setMenu(false, true);
  });
  document.addEventListener('click', e => {
    if (!header.contains(e.target)) setMenu(false);
  });
  matchMedia('(min-width: 761px)').addEventListener('change', e => {
    if (e.matches) setMenu(false);
  });

  // Content is visible by default, including when JavaScript is unavailable.
  if ('IntersectionObserver' in window) {
    const reveal = new IntersectionObserver(entries => entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('visible'); reveal.unobserve(e.target); }
    }), { threshold: 0.04 });
    $$('.reveal').forEach(e => reveal.observe(e));
    const sections = new IntersectionObserver(entries => entries.forEach(e => {
      if (!e.isIntersecting) return;
      $$('a', nav).forEach(a => {
        const current = a.hash === '#' + e.target.id;
        a.classList.toggle('active', current);
        if (current) a.setAttribute('aria-current', 'location');
        else a.removeAttribute('aria-current');
      });
    }), { rootMargin: '-15% 0px -50% 0px' });
    $$('main section[id]').forEach(e => sections.observe(e));
  }

  const dialog = $('#lightbox');
  let galleryOpener;
  $$('[data-image]').forEach(button => button.addEventListener('click', () => {
    if (typeof dialog.showModal !== 'function') {
      window.open(button.dataset.image, '_blank', 'noopener'); return;
    }
    galleryOpener = button;
    $('img', dialog).src = button.dataset.image;
    $('img', dialog).alt = button.dataset.caption;
    $('p', dialog).textContent = button.dataset.caption;
    dialog.showModal();
    document.documentElement.classList.add('dialog-open');
  }));
  $('.close-dialog').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', e => {
    const r = dialog.getBoundingClientRect();
    if (e.target === dialog && (e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom)) dialog.close();
  });
  dialog.addEventListener('close', () => {
    document.documentElement.classList.remove('dialog-open');
    galleryOpener?.focus({ preventScroll: true });
  });

  const form = $('#enquiry');
  const name = $('[name=name]', form);
  const phone = $('[name=phone]', form);
  const service = $('[name=service]', form);
  const status = $('#form-status');
  $('button[type=submit]', form).disabled = false;
  name.addEventListener('input', () => name.setCustomValidity(''));
  phone.addEventListener('input', () => phone.setCustomValidity(''));
  $$('[data-service]').forEach(a => a.addEventListener('click', () => {
    service.selectedIndex = Number(a.dataset.service) + 1;
    status.textContent = '';
  }));
  form.addEventListener('submit', e => {
    e.preventDefault();
    name.setCustomValidity(name.value.trim() ? '' : 'Please enter your name.');
    const digits = phone.value.replace(/\D/g, '');
    phone.setCustomValidity(digits.length >= 7 && digits.length <= 15 ? '' : 'Please enter a phone number with 7 to 15 digits.');
    if (!form.reportValidity()) return;
    const data = new FormData(form);
    const text = `New security enquiry from the Hataff website\n\nName: ${name.value.trim()}\nPhone: ${phone.value.trim()}\nRequirement: ${data.get('service')}\nDetails: ${String(data.get('details') || '').trim() || 'Not provided'}`;
    // Same-tab navigation avoids popup blockers and does not imply a message was sent.
    window.location.assign('https://wa.me/923004342219?text=' + encodeURIComponent(text));
  });

  const film = $('.scroll-film');
  const stage = $('.film-stage');
  const titles = $$('.film-title');
  const counter = $('.chapter-counter');
  const chapterName = $('.chapter-name');
  const clamp = (v, a = 0, b = 1) => Math.max(a, Math.min(b, v));
  const smooth = v => { v = clamp(v); return v * v * (3 - 2 * v); };
  let range = 1;
  let frame = 0;
  let chapter = -1;
  let cachedPosition = -1;
  let enabled = true;
  function measure() { range = Math.max(1, film.offsetHeight - stage.offsetHeight); updateFilm(true); }
  function updateFilm(force = false) {
    frame = 0;
    const rect = film.getBoundingClientRect();
    header.classList.toggle('solid', rect.bottom < innerHeight + 80);
    if (!enabled) return;
    const p = clamp(-rect.top / range);
    if (!force && p === cachedPosition) return;
    cachedPosition = p;
    const a = smooth((p - .22) / .18), b = smooth((p - .58) / .18);
    const values = {
      '--wipe-two': (100 - a * 100) + '%', '--wipe-three': (100 - b * 100) + '%',
      '--zoom-one': 1.02 + p * .23, '--zoom-two': 1.16 - a * .12 + clamp((p - .4) / .6) * .1,
      '--zoom-three': 1.15 - b * .12,
      '--o-one': 1 - smooth((p - .16) / .14),
      '--o-two': smooth((p - .3) / .12) * (1 - smooth((p - .55) / .12)),
      '--o-three': smooth((p - .67) / .13),
      '--y-one': (-p * 180) + 'px',
      '--y-two': (55 * (1 - smooth((p - .3) / .15)) - 70 * smooth((p - .55) / .15)) + 'px',
      '--y-three': (60 * (1 - smooth((p - .67) / .15))) + 'px', '--film-progress': p * 100 + '%'
    };
    for (const [key, value] of Object.entries(values)) stage.style.setProperty(key, value);
    const next = p < .32 ? 0 : p < .67 ? 1 : 2;
    if (chapter !== next) {
      chapter = next;
      counter.textContent = `0${next + 1} / 03`;
      chapterName.textContent = ['VIGILANCE', 'HERITAGE', 'DISCIPLINE'][next];
      // Preserve the main heading in the accessibility tree throughout scrolling.
      titles.forEach((title, i) => {
        $$('a', title).forEach(a => {
          a.tabIndex = i === next ? 0 : -1;
          a.setAttribute('aria-hidden', String(i !== next));
          a.style.pointerEvents = i === next ? 'auto' : 'none';
        });
      });
    }
  }
  function schedule() { if (!frame) frame = requestAnimationFrame(() => updateFilm()); }
  function setMotion() {
    enabled = !paused;
    document.documentElement.classList.toggle('motion-paused', paused);
    document.documentElement.classList.add('motion-ready');
    motionButton.textContent = paused ? 'Enable motion' : 'Pause motion';
    motionButton.setAttribute('aria-pressed', String(paused));
    motionButton.setAttribute('aria-label', paused ? 'Enable scroll animations' : 'Pause scroll animations');
    chapter = -1; cachedPosition = -1;
    if (paused) {
      stage.removeAttribute('style');
      titles.forEach((title, i) => $$('a', title).forEach(a => {
        a.tabIndex = i === 0 ? 0 : -1;
        a.setAttribute('aria-hidden', String(i !== 0));
        a.style.pointerEvents = i === 0 ? 'auto' : 'none';
      }));
    }
    measure();
  }
  motionButton.addEventListener('click', () => { motionChoice = true; paused = !paused; setMotion(); });
  preference.addEventListener('change', () => { if (!motionChoice) { paused = preference.matches; setMotion(); } });
  addEventListener('scroll', schedule, { passive: true });
  addEventListener('resize', measure, { passive: true });
  addEventListener('pageshow', measure);
  setMotion();

  const servicePhoto = $('.service-layout aside img');
  const serviceIndex = $('.service-view-index');
  $$('.service').forEach((item, i) => {
    function activate() {
      const src = i === 1 || i === 3 ? 'assets/tactical.webp' : i === 2 || i === 5 || i === 6 ? 'assets/team.webp' : 'assets/guards.webp';
      if (servicePhoto.getAttribute('src') !== src) servicePhoto.src = src;
      servicePhoto.alt = src.includes('tactical') ? 'Hataff tactical team' : src.includes('team') ? 'Hataff security team' : 'Hataff uniformed guards';
      serviceIndex.textContent = `0${i + 1} / ${$('h3', item).textContent.toUpperCase()}`;
    }
    item.addEventListener('mouseenter', activate);
    item.addEventListener('focusin', activate);
  });
})();
