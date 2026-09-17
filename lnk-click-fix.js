(() => {
  'use strict';

  if (window.__LNK_CLICK_FIX_LOADED) return;
  window.__LNK_CLICK_FIX_LOADED = true;

  const style = document.createElement('style');
  style.textContent = `
    .noise,.halo,.lnk-glow-orb,.hero::before,.service-card::after{pointer-events:none!important}
    a,button,select,input,textarea,label{pointer-events:auto!important}
    .site-header,.hero-copy,.hero-buttons,.desktop-nav,.header-actions,.lnk-card,.dc-card,.price-card,.video-card,.web-order-form,.dc-form,.order-form{position:relative;z-index:2}
    button,a,[role="button"]{touch-action:manipulation}
  `;
  document.head.appendChild(style);

  function findTarget(hash){
    if (!hash || hash === '#') return null;
    try { return document.querySelector(hash); } catch (_) { return null; }
  }

  function go(hash){
    let target = findTarget(hash);
    if (!target && hash === '#digital-order') target = document.querySelector('#digital-catalog .dc-form') || document.getElementById('digital-catalog');
    if (!target && hash === '#web-naruci-modern') target = document.querySelector('#web-stranice .web-order-form') || document.getElementById('web-stranice');
    if (!target && hash === '#lnk-usluge') target = document.getElementById('digital-catalog') || document.getElementById('usluge');
    if (!target) return false;
    const header = document.querySelector('.site-header');
    const offset = (header?.offsetHeight || 70) + 14;
    const y = target.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({top:y,behavior:'smooth'});
    history.replaceState(null,'',hash);
    return true;
  }

  function closeMenu(){
    document.querySelector('.desktop-nav')?.classList.remove('mobile-open');
  }

  document.addEventListener('click', (e) => {
    const menu = e.target.closest('#menuToggle,.menu-toggle');
    if (menu) {
      e.preventDefault();
      e.stopPropagation();
      document.querySelector('.desktop-nav')?.classList.toggle('mobile-open');
      return;
    }

    const serviceBtn = e.target.closest('.dc-order');
    if (serviceBtn) {
      e.preventDefault();
      const form = document.getElementById('digital-order') || document.querySelector('#digital-catalog .dc-form');
      if (form) {
        const service = serviceBtn.dataset.service || serviceBtn.closest('.dc-card')?.querySelector('h3')?.textContent || '';
        const field = form.elements?.service || form.querySelector('[name="service"]');
        if (field) field.value = service;
      }
      go('#digital-order');
      return;
    }

    const webPick = e.target.closest('.web-pick-modern');
    if (webPick) {
      e.preventDefault();
      const form = document.getElementById('web-naruci-modern') || document.querySelector('#web-stranice .web-order-form');
      if (form) {
        const field = form.elements?.package || form.querySelector('[name="package"]');
        if (field && webPick.dataset.package) field.value = webPick.dataset.package;
      }
      go('#web-naruci-modern');
      return;
    }

    const a = e.target.closest('a[href]');
    if (!a) return;
    const href = a.getAttribute('href') || '';

    if (href.startsWith('#')) {
      e.preventDefault();
      closeMenu();
      go(href);
      return;
    }
  }, true);

  document.addEventListener('change', (e) => {
    if (e.target?.id === 'language') closeMenu();
  });

  // Keep mobile navigation clickable even when another runtime replaces its innerHTML.
  const nav = document.querySelector('.desktop-nav');
  if (nav) nav.style.pointerEvents = 'auto';

  // Ensure reveal content never stays invisible if another script fails.
  setTimeout(() => document.querySelectorAll('.reveal').forEach(el => el.classList.add('visible')), 1600);
})();
