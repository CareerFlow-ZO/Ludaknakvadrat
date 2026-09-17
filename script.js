(() => {
  'use strict';

  const nativeLanguages = new Set(['sr','bs','hr','sl','en','de','fr','es','it','sq','tr','mk']);

  function installBootScreen() {
    if (!document.body || document.getElementById('lnk-boot-screen')) return;

    const style = document.createElement('style');
    style.id = 'lnk-boot-style';
    style.textContent = `
      body.lnk-booting{background:#02070d!important;overflow:hidden!important}
      body.lnk-booting> :not(#lnk-boot-screen):not(script){visibility:hidden!important}
      body.lnk-booting *{animation-play-state:paused!important}
      #lnk-boot-screen{position:fixed;inset:0;z-index:2147483647;display:grid;place-items:center;background:radial-gradient(circle at 50% 38%,rgba(0,140,255,.18),transparent 30%),linear-gradient(180deg,#02070d,#05111c);opacity:1;transition:opacity .24s ease}
      #lnk-boot-screen.lnk-hide{opacity:0;pointer-events:none}
      #lnk-boot-card{display:grid;place-items:center;gap:15px;text-align:center;padding:28px}
      #lnk-boot-mark{width:76px;height:76px;border-radius:22px;display:grid;place-items:center;border:1px solid rgba(83,205,255,.46);background:linear-gradient(145deg,#071b2b,#02070d);box-shadow:0 0 48px rgba(0,145,255,.24),0 18px 45px rgba(0,0,0,.35);font:900 23px/1 Inter,Arial,sans-serif;color:#effaff;letter-spacing:-.05em}
      #lnk-boot-title{font:800 14px/1.2 Inter,Arial,sans-serif;letter-spacing:.18em;color:#dff6ff}
      #lnk-boot-sub{font:600 11px/1.4 Inter,Arial,sans-serif;letter-spacing:.08em;color:#6f92a9}
      #lnk-boot-line{width:132px;height:3px;border-radius:99px;overflow:hidden;background:rgba(73,185,255,.10)}
      #lnk-boot-line:after{content:"";display:block;width:46%;height:100%;border-radius:99px;background:linear-gradient(90deg,#3ad9ff,#087fff,#2457ff);animation:lnkLoad 1s ease-in-out infinite alternate}
      @keyframes lnkLoad{from{transform:translateX(-8%)}to{transform:translateX(125%)}}
      @media(prefers-reduced-motion:reduce){#lnk-boot-line:after{animation:none;width:100%}}
    `;
    document.head.appendChild(style);

    document.body.classList.add('lnk-booting');
    const loader = document.createElement('div');
    loader.id = 'lnk-boot-screen';
    loader.innerHTML = `<div id="lnk-boot-card"><div id="lnk-boot-mark">LNK</div><div id="lnk-boot-title">LNK DIGITAL</div><div id="lnk-boot-sub">WEB • BRANDING • MARKETING • AI</div><div id="lnk-boot-line"></div></div>`;
    document.body.appendChild(loader);
  }

  function finishBoot() {
    window.__LNK_PAUSE_SITE_OBSERVERS = true;
    document.querySelectorAll('.reveal').forEach(el => el.classList.add('visible'));

    const loader = document.getElementById('lnk-boot-screen');
    const showSite = () => {
      document.body?.classList.remove('lnk-booting');
      if (loader) {
        loader.classList.add('lnk-hide');
        setTimeout(() => loader.remove(), 280);
      }
      setTimeout(() => document.getElementById('lnk-boot-style')?.remove(), 400);
    };

    const selected = localStorage.getItem('lnkDisplayLang') || localStorage.getItem('ludakLang') || 'sr';
    const wait = nativeLanguages.has(selected) ? 90 : 1100;
    setTimeout(() => requestAnimationFrame(() => requestAnimationFrame(showSite)), wait);
  }

  installBootScreen();
  const bootFallback = setTimeout(finishBoot, 4200);

  function addStyle(href, key) {
    if (document.querySelector(`link[data-lnk-${key}]`)) return;
    const l = document.createElement('link');
    l.rel = 'stylesheet';
    l.href = href;
    l.dataset[`lnk${key.replace(/-([a-z])/g,(_,c)=>c.toUpperCase())}`] = '1';
    document.head.appendChild(l);
  }

  addStyle('/lnk-blue-theme.css?v=5', 'blue');
  addStyle('/lnk-final-polish.css?v=5', 'final-polish');
  addStyle('/lnk-compact-fix.css?v=2', 'compact-fix');

  document.querySelectorAll('.brand img,.hero-logo,.footer-brand img').forEach(img => {
    img.src = '/lnk-digital-logo.svg?v=1';
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

  const safeLoad = async (src) => {
    try { await load(src); }
    catch (err) { console.warn('LNK DIGITAL optional file skipped:', src, err); }
  };

  const boot = async () => {
    await safeLoad('/lnk-image-fix.js?v=2');
    await safeLoad('/lnk-observer-bridge.js?v=2');

    await safeLoad('/script-core.js?v=2');
    await safeLoad('/web-services.js?v=2');
    await safeLoad('/digital-catalog.js?v=2');

    for (const src of [
      '/lnk-core-bs-hr.js?v=2','/lnk-core-1.js?v=2','/lnk-core-2.js?v=2','/lnk-core-3.js?v=2',
      '/lnk-web-data.js?v=2','/lnk-cat-data.js?v=2','/lnk-services-data.js?v=2','/lnk-service-translations.js?v=2'
    ]) await safeLoad(src);

    await safeLoad('/lnk-runtime.js?v=2');
    await safeLoad('/lnk-service-runtime.js?v=2');
    await safeLoad('/lnk-extra-languages.js?v=2');

    await safeLoad('/lnk-ux-fix.js?v=2');
    await safeLoad('/lnk-click-fix.js?v=3');
    await safeLoad('/lnk-logo-final.js?v=1');
    await safeLoad('/lnk-price-fix.js?v=1');

    clearTimeout(bootFallback);
    finishBoot();
  };

  boot().catch(err => {
    console.error('LNK DIGITAL loader error', err);
    clearTimeout(bootFallback);
    finishBoot();
  });
})();
