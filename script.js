(() => {
  if (!document.querySelector('link[data-lnk-blue]')) {
    const theme = document.createElement('link');
    theme.rel = 'stylesheet';
    theme.href = '/lnk-blue-theme.css';
    theme.dataset.lnkBlue = '1';
    document.head.appendChild(theme);
  }

  // Show the new LNK DIGITAL identity immediately, before the rest of the runtime finishes loading.
  document.querySelectorAll('.brand img,.hero-logo,.footer-brand img').forEach(img => {
    img.src = '/lnk-digital-logo.jpg';
    img.alt = 'LNK DIGITAL';
  });
  const brandText = document.querySelector('.brand span');
  if (brandText) brandText.textContent = 'LNK DIGITAL';
  const footerText = document.querySelector('.footer-brand strong');
  if (footerText) footerText.textContent = 'LNK DIGITAL';

  const load = (src) => new Promise((resolve, reject) => {
    const s = document.createElement('script');
    s.src = src;
    s.onload = resolve;
    s.onerror = reject;
    document.head.appendChild(s);
  });

  load('/lnk-observer-bridge.js')
    .then(() => load('/script-core.js'))
    .then(() => load('/web-services.js'))
    .then(() => load('/digital-catalog.js'))
    .then(() => load('/lnk-core-bs-hr.js'))
    .then(() => load('/lnk-core-1.js'))
    .then(() => load('/lnk-core-2.js'))
    .then(() => load('/lnk-core-3.js'))
    .then(() => load('/lnk-web-data.js'))
    .then(() => load('/lnk-cat-data.js'))
    .then(() => load('/lnk-services-data.js'))
    .then(() => load('/lnk-service-translations.js'))
    .then(() => load('/lnk-runtime.js'))
    .then(() => load('/lnk-service-runtime.js'))
    .then(() => load('/lnk-extra-languages.js'))
    .then(() => {
      // Load one final visual layer after all dynamic styles so the blue / black / silver brand always wins.
      if (!document.querySelector('link[data-lnk-final-polish]')) {
        const finalTheme = document.createElement('link');
        finalTheme.rel = 'stylesheet';
        finalTheme.href = '/lnk-final-polish.css?v=3';
        finalTheme.dataset.lnkFinalPolish = '1';
        document.head.appendChild(finalTheme);
      }
    })
    .catch((err) => console.error('LNK DIGITAL loader error', err));
})();
