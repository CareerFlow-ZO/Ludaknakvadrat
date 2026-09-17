(() => {
  'use strict';
  if (window.__LNK_PRICE_FIX_LOADED) return;
  window.__LNK_PRICE_FIX_LOADED = true;

  const FROM = {
    sr:'od', bs:'od', hr:'od', sl:'od', en:'from', de:'ab', fr:'à partir de', es:'desde', it:'da', sq:'nga', tr:'itibaren', mk:'од'
  };

  function lang(){
    return document.getElementById('language')?.value || localStorage.getItem('ludakLang') || 'sr';
  }

  function extractPrice(card){
    const btn = card.querySelector('.dc-order,.dc-month-order');
    const raw = btn?.dataset?.service || '';
    const marker = ' — ';
    const i = raw.lastIndexOf(marker);
    if (i >= 0) return raw.slice(i + marker.length).trim();
    const select = document.querySelector('#digital-order select[name="service"]');
    const name = card.querySelector('h3,h4')?.textContent?.trim();
    if (select && name) {
      const opt = [...select.options].find(o => o.textContent.startsWith(name + marker));
      if (opt) return opt.textContent.slice((name + marker).length).trim();
    }
    return '';
  }

  function fixCard(card){
    const priceEl = card.querySelector('.dc-price');
    if (!priceEl) return;
    const price = extractPrice(card);
    if (!price) return;
    const prefix = FROM[lang()] || FROM.sr;
    const wanted = `${prefix} ${price}`;
    if (priceEl.dataset.lnkPrice === price && priceEl.textContent.trim() === wanted) return;
    priceEl.dataset.lnkPrice = price;
    priceEl.innerHTML = `<span class="dc-from">${prefix}</span> <strong class="dc-amount">${price}</strong>`;
  }

  function fixAll(){
    document.querySelectorAll('#digital-catalog .dc-card,#digital-catalog .dc-monthly-card').forEach(fixCard);
  }

  const style = document.createElement('style');
  style.textContent = `
    #digital-catalog .dc-price{display:flex!important;align-items:baseline!important;gap:7px!important;min-height:30px!important;white-space:normal!important}
    #digital-catalog .dc-from{font-size:.72em!important;letter-spacing:.06em!important;text-transform:uppercase!important;opacity:.9!important}
    #digital-catalog .dc-amount{font-size:1.04em!important;font-weight:900!important;color:#72ddff!important;text-shadow:0 0 18px rgba(32,174,255,.16)!important}
  `;
  document.head.appendChild(style);

  fixAll();
  document.addEventListener('DOMContentLoaded', fixAll, {once:true});
  document.getElementById('language')?.addEventListener('change', () => setTimeout(fixAll, 120));

  const catalog = document.getElementById('digital-catalog');
  if (catalog) {
    const obs = new MutationObserver(() => requestAnimationFrame(fixAll));
    obs.observe(catalog,{childList:true,subtree:true});
  }

  setTimeout(fixAll, 250);
  setTimeout(fixAll, 900);
})();
