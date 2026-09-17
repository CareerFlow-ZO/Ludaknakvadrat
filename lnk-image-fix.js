(() => {
  'use strict';

  const enc = (s) => 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(s);

  function brandSvg() {
    return enc(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000">
      <defs>
        <radialGradient id="bg" cx="50%" cy="45%" r="62%"><stop offset="0" stop-color="#0c2134"/><stop offset="1" stop-color="#02070d"/></radialGradient>
        <linearGradient id="g" x1="0" x2="1"><stop stop-color="#35d8ff"/><stop offset=".55" stop-color="#078cff"/><stop offset="1" stop-color="#164cff"/></linearGradient>
        <filter id="glow"><feGaussianBlur stdDeviation="14" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
      </defs>
      <rect width="1000" height="1000" rx="90" fill="url(#bg)"/>
      <circle cx="500" cy="500" r="420" fill="none" stroke="url(#g)" stroke-width="18" filter="url(#glow)"/>
      <text x="500" y="555" text-anchor="middle" font-family="Arial,Helvetica,sans-serif" font-size="280" font-weight="900" fill="#eef8ff" letter-spacing="-22">LNK</text>
      <text x="500" y="690" text-anchor="middle" font-family="Arial,Helvetica,sans-serif" font-size="70" font-weight="700" fill="#9fddff" letter-spacing="28">DIGITAL</text>
    </svg>`);
  }

  function thumbSvg(title) {
    const safe = title.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
    return enc(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1280 720">
      <defs>
        <radialGradient id="bg" cx="75%" cy="22%" r="85%"><stop offset="0" stop-color="#0d3150"/><stop offset=".48" stop-color="#061421"/><stop offset="1" stop-color="#02070d"/></radialGradient>
        <linearGradient id="g" x1="0" x2="1"><stop stop-color="#43dcff"/><stop offset=".55" stop-color="#0a8dff"/><stop offset="1" stop-color="#184fff"/></linearGradient>
        <filter id="glow"><feGaussianBlur stdDeviation="12" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
      </defs>
      <rect width="1280" height="720" fill="url(#bg)"/>
      <circle cx="990" cy="360" r="250" fill="none" stroke="url(#g)" stroke-width="10" opacity=".9" filter="url(#glow)"/>
      <text x="990" y="390" text-anchor="middle" font-family="Arial,Helvetica,sans-serif" font-size="150" font-weight="900" fill="#effaff">LNK</text>
      <text x="82" y="120" font-family="Arial,Helvetica,sans-serif" font-size="34" font-weight="800" fill="#42d7ff" letter-spacing="7">LNK DIGITAL</text>
      <text x="82" y="330" font-family="Arial,Helvetica,sans-serif" font-size="78" font-weight="900" fill="#ffffff">${safe}</text>
      <text x="82" y="405" font-family="Arial,Helvetica,sans-serif" font-size="30" font-weight="600" fill="#91abc0">PERSONALIZOVANA MUZIKA • ORIGINALNI RAD</text>
      <rect x="82" y="500" width="185" height="68" rx="34" fill="url(#g)"/>
      <polygon points="155,520 155,548 184,534" fill="#fff"/>
      <text x="200" y="545" font-family="Arial,Helvetica,sans-serif" font-size="27" font-weight="800" fill="#fff">POSLUŠAJ</text>
    </svg>`);
  }

  const logoFallback = brandSvg();
  const thumbs = [
    ['IxG9VmDO7YU','JOŠ TE VOLIM'],
    ['ZUggrg1D1rs','NISAM JA TEBE BIRAO'],
    ['5Mmq_uxnMhQ','KEXI'],
    ['C0Yys63YZ5w','MALENA']
  ];

  function fixBrandImages(root=document) {
    root.querySelectorAll?.('.brand img,.hero-logo,.footer-brand img').forEach(img => {
      img.alt = 'LNK DIGITAL';
      img.decoding = 'async';
      img.loading = img.classList.contains('hero-logo') ? 'eager' : 'lazy';
      img.onerror = () => { img.onerror = null; img.src = logoFallback; };
      const target = '/lnk-digital-logo.jpg?v=6';
      if (!img.src.includes('lnk-digital-logo.jpg')) img.src = target;
    });
  }

  function fixVideoImages(root=document) {
    root.querySelectorAll?.('.video-card').forEach((card, i) => {
      const img = card.querySelector('.video-thumb img');
      if (!img || img.dataset.lnkFixed === '1') return;
      img.dataset.lnkFixed = '1';
      const title = card.querySelector('h3')?.textContent?.trim() || thumbs[i]?.[1] || 'LNK DIGITAL';
      const id = thumbs[i]?.[0];
      const fallback = thumbSvg(title);
      img.src = fallback;
      img.alt = `${title} — LNK DIGITAL`;
      img.loading = 'lazy';
      img.decoding = 'async';
      if (id) {
        const remote = new Image();
        remote.referrerPolicy = 'no-referrer';
        remote.onload = () => {
          if (remote.naturalWidth > 200 && remote.naturalHeight > 100) img.src = remote.src;
        };
        remote.src = `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;
      }
    });
  }

  function fixAll(root=document) {
    fixBrandImages(root);
    fixVideoImages(root);
  }

  fixAll();
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', () => fixAll());

  const obs = new MutationObserver(mutations => {
    for (const m of mutations) {
      for (const n of m.addedNodes) if (n.nodeType === 1) fixAll(n);
    }
  });
  const start = () => document.body && obs.observe(document.body,{childList:true,subtree:true});
  if (document.body) start(); else document.addEventListener('DOMContentLoaded', start, {once:true});
})();
