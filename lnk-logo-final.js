(() => {
  'use strict';
  const LOGO = '/lnk-digital-logo.svg?v=1';

  function applyLogo(root=document){
    root.querySelectorAll?.('.brand img,.hero-logo,.footer-brand img').forEach(img => {
      img.alt = 'LNK DIGITAL';
      img.decoding = 'async';
      img.loading = img.classList.contains('hero-logo') ? 'eager' : 'lazy';
      if (img.getAttribute('src') !== LOGO) img.setAttribute('src', LOGO);
      img.onerror = () => {
        img.onerror = null;
        img.removeAttribute('srcset');
        img.setAttribute('src', LOGO);
      };
    });

    const brandText = root.querySelector?.('.brand span');
    if (brandText) brandText.textContent = 'LNK DIGITAL';
    const footerText = root.querySelector?.('.footer-brand strong');
    if (footerText) footerText.textContent = 'LNK DIGITAL';

    let icon = document.querySelector('link[rel="icon"]');
    if (!icon) {
      icon = document.createElement('link');
      icon.rel = 'icon';
      document.head.appendChild(icon);
    }
    icon.type = 'image/svg+xml';
    icon.href = LOGO;
  }

  applyLogo();
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => applyLogo(), {once:true});
  }

  // One delayed pass catches any late dynamic rerender without creating an observer loop.
  setTimeout(() => applyLogo(), 350);
  setTimeout(() => applyLogo(), 1000);
})();
