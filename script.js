(() => {
  'use strict';

  function addStyle(href, key) {
    if (document.querySelector(`link[data-lnk-${key}]`)) return;
    const l = document.createElement('link');
    l.rel = 'stylesheet';
    l.href = href;
    l.dataset[`lnk${key.replace(/-([a-z])/g,(_,c)=>c.toUpperCase())}`] = '1';
    document.head.appendChild(l);
  }

  // Load the visual identity immediately so the page does not flash the old gold theme.
  addStyle('/lnk-blue-theme.css?v=4', 'blue');
  addStyle('/lnk-final-polish.css?v=4', 'final-polish');
  addStyle('/lnk-compact-fix.css?v=1', 'compact-fix');

  document.querySelectorAll('.brand img,.hero-logo,.footer-brand img').forEach(img => {
    img.src = '/lnk-digital-logo.jpg?v=6';
    img.alt = 'LNK DIGITAL';
  });
  const brandText = document.querySelector('.brand span');
  if (brandText) brandText.textContent = 'LNK DIGITAL';
  const footerText = document.querySelector('.footer-brand strong');
  if (footerText) footerText.textContent = 'LNK DIGITAL';

  const load = (src) => new Promise((resolve, reject) => {
    if (document.querySelector(`script[data-lnk-src="${src}"]`)) return resolve();
    const s = document.createElement('script');
    s.src = src;
    s.dataset.lnkSrc = src;
    s.onload = () => resolve();
    s.onerror = () => reject(new Error(`Failed to load ${src}`));
    document.head.appendChild(s);
  });

  // A failed optional enhancement should not stop the rest of the website from loading.
  const safeLoad = async (src) => {
    try { await load(src); }
    catch (err) { console.warn('LNK DIGITAL optional file skipped:', src, err); }
  };

  const boot = async () => {
    // Repair images first so the visitor never sees broken image boxes.
    await safeLoad('/lnk-image-fix.js?v=1');
    await safeLoad('/lnk-observer-bridge.js');

    // Base functionality first.
    await safeLoad('/script-core.js');
    await safeLoad('/web-services.js');
    await safeLoad('/digital-catalog.js');

    // Translation/data layers.
    for (const src of [
      '/lnk-core-bs-hr.js','/lnk-core-1.js','/lnk-core-2.js','/lnk-core-3.js',
      '/lnk-web-data.js','/lnk-cat-data.js','/lnk-services-data.js','/lnk-service-translations.js'
    ]) await safeLoad(src);

    // Runtime rendering and language support.
    await safeLoad('/lnk-runtime.js');
    await safeLoad('/lnk-service-runtime.js');
    await safeLoad('/lnk-extra-languages.js');

    // Final user-facing cleanup always runs last.
    await safeLoad('/lnk-ux-fix.js?v=1');
  };

  boot().catch(err => console.error('LNK DIGITAL loader error', err));
})();
