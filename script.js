(() => {
  if (!document.querySelector('link[data-lnk-blue]')) {
    const theme = document.createElement('link');
    theme.rel = 'stylesheet';
    theme.href = '/lnk-blue-theme.css';
    theme.dataset.lnkBlue = '1';
    document.head.appendChild(theme);
  }

  const load = (src) => new Promise((resolve, reject) => {
    const s = document.createElement('script');
    s.src = src;
    s.onload = resolve;
    s.onerror = reject;
    document.head.appendChild(s);
  });

  load('/script-core.js')
    .then(() => load('/web-services.js'))
    .then(() => load('/digital-catalog.js'))
    .then(() => load('/lnk-core-bs-hr.js'))
    .then(() => load('/lnk-core-1.js'))
    .then(() => load('/lnk-core-2.js'))
    .then(() => load('/lnk-core-3.js'))
    .then(() => load('/lnk-web-data.js'))
    .then(() => load('/lnk-cat-data.js'))
    .then(() => load('/lnk-services-data.js'))
    .then(() => load('/lnk-runtime.js'))
    .catch((err) => console.error('LNK DIGITAL loader error', err));
})();