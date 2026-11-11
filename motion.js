'use strict';
(() => {
  const $ = s => document.querySelector(s), $$ = s => [...document.querySelectorAll(s)];
  const clamp = v => Math.max(0, Math.min(1, v));
  const ease = v => { v = clamp(v); return v * v * (3 - 2 * v); };
  const story = $('.story-chapter'), stage = $('.story-stage');
  const letters = $$('.build-letter');
  const portrait = $('.story-portrait');
  const rows = $$('.service, .principle, .sector-list span');
  const gallery = $$('.gallery-photo');
  const patterns = $$('.army-pattern, .story-stage');
  const creed = $('.creed-sequence'), form = $('.enquiry');
  const serviceItems = $$('.service');
  const servicePhoto = $('.service-layout aside img');
  const serviceLabel = $('.service-view-index');
  const frame = document.createElement('div'); frame.className = 'service-photo-frame';
  servicePhoto.before(frame); frame.append(servicePhoto);
  const tiles = document.createElement('div'); tiles.className = 'service-tiles'; tiles.setAttribute('aria-hidden', 'true'); frame.append(tiles);
  for (let i = 0; i < 5; i++) {
    const tile = document.createElement('i'); tile.className = 'service-tile';
    tile.style.left = `${i * 20}%`; tile.style.setProperty('--tile', i);
    tile.style.setProperty('--direction', i % 2 ? -1 : 1); tiles.append(tile);
  }
  let enabled = false, raf = 0, currentService = -1, tileTimer = 0;
  const desktopStory = matchMedia('(min-width:900px) and (min-height:740px)');
  function layoutTiles(animate = false) {
    if (!servicePhoto.complete || !servicePhoto.naturalWidth) return;
    const w = frame.clientWidth, h = frame.clientHeight;
    const scale = Math.max(w / servicePhoto.naturalWidth, h / servicePhoto.naturalHeight);
    const iw = servicePhoto.naturalWidth * scale, ih = servicePhoto.naturalHeight * scale;
    [...tiles.children].forEach((tile, i) => {
      tile.style.backgroundImage = `url("${servicePhoto.getAttribute('src')}")`;
      tile.style.backgroundSize = `${iw}px ${ih}px`;
      tile.style.backgroundPosition = `${-(iw - w) / 2 - w * i / 5}px ${-(ih - h) / 2}px`;
    });
    if (animate && enabled) {
      tiles.classList.remove('changing');
      // Restart after a paint without forcing synchronous layout.
      requestAnimationFrame(() => tiles.classList.add('changing'));
      clearTimeout(tileTimer); tileTimer = setTimeout(() => tiles.classList.remove('changing'), 1000);
    }
  }
  servicePhoto.addEventListener('load', () => layoutTiles(true));
  new MutationObserver(() => { if (servicePhoto.complete) layoutTiles(true); }).observe(servicePhoto, { attributes: true, attributeFilter: ['src'] });
  function activateService(i) {
    if (currentService === i) return;
    currentService = i;
    serviceItems.forEach((item, n) => item.classList.toggle('is-current', n === i));
    const src = i === 1 || i === 3 ? 'assets/tactical.webp' : i === 2 || i === 5 || i === 6 ? 'assets/team.webp' : 'assets/guards.webp';
    if (servicePhoto.getAttribute('src') !== src) servicePhoto.src = src;
    servicePhoto.alt = src.includes('tactical') ? 'Hataff tactical team' : src.includes('team') ? 'Hataff security group portrait' : 'Hataff uniformed guards';
    serviceLabel.textContent = `0${i + 1} / ${serviceItems[i].querySelector('h3').textContent.toUpperCase()}`;
  }
  serviceItems.forEach((item, i) => {
    item.addEventListener('mouseenter', () => activateService(i));
    item.addEventListener('focusin', () => activateService(i));
  });
  function update() {
    raf = 0;
    if (!enabled) return;
    const vh = innerHeight;
    const sr = story.getBoundingClientRect();
    const pinned = desktopStory.matches;
    const p = pinned ? clamp(-sr.top / Math.max(1, story.offsetHeight - vh)) : clamp((vh * .85 - sr.top) / (vh * .65));
    // Each glyph has a small deterministic offset; scrolling backwards reconstructs it.
    if (sr.bottom > 0 && sr.top < vh) {
      const exit = pinned ? ease((p - .82) / .18) : 0;
      letters.forEach((letter, i) => {
        const arrive = ease((p - .015 * (i % 7)) / .26);
        const scatter = 1 - arrive;
        const sign = i % 2 ? 1 : -1;
        const distance = pinned ? 1 : .35;
        const x = sign * (scatter * (18 + i % 5 * 7) + exit * (15 + i % 4 * 9)) * distance;
        const y = sign * (scatter * (22 + i % 3 * 9) - exit * (30 + i % 5 * 9)) * distance;
        letter.style.setProperty('--lx', `${x}px`); letter.style.setProperty('--ly', `${y}px`);
        letter.style.setProperty('--lr', `${sign * (scatter * 8 + exit * 9) * distance}deg`);
        letter.style.setProperty('--lo', .35 + arrive * .65 - exit * .6);
      });
      const reveal = ease((p - .08) / .35);
      stage.style.setProperty('--portrait-mask', `${(1 - reveal) * 60}%`);
      stage.style.setProperty('--portrait-y', `${(1 - reveal) * 45 - exit * 30}px`);
      stage.style.setProperty('--portrait-r', `${(1 - reveal) * 4 - exit * 3}deg`);
      stage.style.setProperty('--story-copy', .2 + ease((p - .18) / .26) * .8);
      stage.style.setProperty('--copy-y', `${(1 - ease((p - .18) / .26)) * 25}px`);
    }
    rows.forEach((row, i) => {
      const r = row.getBoundingClientRect(); if (r.bottom < -50 || r.top > vh + 80) return;
      const progress = ease((vh * .94 - r.top) / (vh * .40));
      row.style.setProperty('--row-build', progress);
      row.style.setProperty('--row-opacity', .38 + progress * .62);
      row.style.setProperty('--row-x', `${(1 - progress) * (i % 2 ? 22 : -22)}px`);
      row.style.setProperty('--row-y', `${(1 - progress) * 22}px`);
    });
    // Automatic image changes follow the service closest to the reading line.
    let nearest = -1, distance = Infinity;
    serviceItems.forEach((item, i) => {
      const r = item.getBoundingClientRect();
      if (r.top < vh * .8 && r.bottom > vh * .18) {
        const d = Math.abs(r.top - vh * .44); if (d < distance) { distance = d; nearest = i; }
      }
    });
    if (nearest !== -1 && !$('.service:hover') && !$('.service:focus-within')) activateService(nearest);
    const cr = creed.getBoundingClientRect();
    if (cr.bottom > 0 && cr.top < vh) {
      const q = clamp((vh - cr.top) / (vh + cr.height));
      creed.style.setProperty('--creed-x', `${(q - .5) * Math.min(120, innerWidth * .09)}px`);
      creed.style.setProperty('--creed-opacity', .45 + Math.sin(q * Math.PI) * .55);
    }
    gallery.forEach((item, i) => {
      const r = item.getBoundingClientRect(); if (r.bottom < 0 || r.top > vh) return;
      const q = ease((vh - r.top) / (vh * .65));
      item.style.setProperty('--gallery-mask', `${(1 - q) * 22}%`);
      item.style.setProperty('--gallery-y', `${(1 - q) * (i % 2 ? 65 : 30)}px`);
    });
    patterns.forEach(pattern => {
      const r = pattern.getBoundingClientRect(); if (r.bottom < 0 || r.top > vh) return;
      pattern.style.setProperty('--camo-drift', `${clamp((vh - r.top) / (vh + r.height)) * 50 - 25}px`);
    });
    const fr = form.getBoundingClientRect();
    if (fr.bottom > 0 && fr.top < vh) {
      const q = ease((vh - fr.top) / (vh * .5));
      form.style.setProperty('--form-mask', `${(1 - q) * 12}%`);
      form.style.setProperty('--form-y', `${(1 - q) * 25}px`);
    }
  }
  function schedule() { if (!raf) raf = requestAnimationFrame(update); }
  function syncMotion() {
    enabled = document.documentElement.classList.contains('motion-ready') && !document.documentElement.classList.contains('motion-paused');
    if (enabled) { layoutTiles(); schedule(); }
    else {
      letters.forEach(e => ['--lx','--ly','--lr','--lo'].forEach(k => e.style.removeProperty(k)));
      [stage,...rows,...gallery,creed,form,...patterns].forEach(e => {
        [...e.style].filter(k => /^(--portrait|--story-copy|--copy-y|--row-(build|opacity|x|y)|--gallery|--creed|--form|--camo)/.test(k)).forEach(k => e.style.removeProperty(k));
      });
    }
  }
  new MutationObserver(syncMotion).observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
  addEventListener('scroll', schedule, { passive: true });
  addEventListener('resize', () => { layoutTiles(); schedule(); }, { passive: true });
  addEventListener('pageshow', schedule);
  desktopStory.addEventListener('change', schedule);
  // Recompute after self-hosted typography has settled.
  document.fonts?.ready.then(() => { layoutTiles(); schedule(); });
  syncMotion();
})();
