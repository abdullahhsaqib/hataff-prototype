'use strict';
(() => {
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
  const header = $('header');
  const menu = $('.menu');
  const nav = $('#nav');

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

  document.documentElement.classList.add('enhanced');
})();
