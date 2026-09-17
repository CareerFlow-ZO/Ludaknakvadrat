(() => {
  const D = window.LNK_DATA || {};
  const SERVICE_NAMES = D.service_names || {};
  const SERVICE_EN = D.service_en || [];
  const SERVICE_SR = D.service_sr || [];
  const CORE = window.LNK_CORE || {};

  if (CORE.tr) Object.assign(CORE.tr, {
    occ_divorce: 'Boşanma',
    occ_breakup: 'Ayrılık',
    occ_reconcile: 'Barışma',
    occ_apology: 'Özür',
    occ_missyou: 'Seni özledim',
    occ_other: 'Diğer'
  });
  if (CORE.mk) Object.assign(CORE.mk, {
    occ_divorce: 'Развод',
    occ_breakup: 'Раскинување',
    occ_reconcile: 'Помирување',
    occ_apology: 'Извинување',
    occ_missyou: 'Ми недостигаш',
    occ_other: 'Друго'
  });

  function lang() {
    return document.getElementById('language')?.value || localStorage.getItem('ludakLang') || 'sr';
  }

  function namesFor(current) {
    if (SERVICE_NAMES[current]) return SERVICE_NAMES[current];
    if (current === 'en') return SERVICE_EN;
    if (['sr','bs','hr'].includes(current)) return SERVICE_SR;
    return SERVICE_EN;
  }

  function buttonLabel(current) {
    return ({sr:'Naruči',bs:'Naruči',hr:'Naruči',sl:'Naroči',en:'Order',de:'Bestellen',fr:'Commander',es:'Pedir',it:'Ordina',sq:'Porosit',tr:'Sipariş',mk:'Нарачај'})[current] || 'Order';
  }

  function categoryText(card) {
    return card.querySelector('.dc-cat')?.textContent || '';
  }

  function translateCatalogNames() {
    const current = lang();
    const names = namesFor(current);
    const cards = document.querySelectorAll('#digital-catalog .dc-card');
    cards.forEach((card, i) => {
      const name = names[i];
      if (!name) return;
      const h3 = card.querySelector('h3');
      if (h3 && h3.textContent !== name) h3.textContent = name;
      card.dataset.search = (name + ' ' + categoryText(card)).toLowerCase();
      const order = card.querySelector('.dc-order');
      if (order) {
        const currentValue = order.dataset.service || '';
        const divider = currentValue.indexOf(' — ');
        const price = divider >= 0 ? currentValue.slice(divider + 3) : '';
        order.dataset.service = price ? `${name} — ${price}` : name;
        order.textContent = buttonLabel(current);
      }
    });
  }

  function translateExtraOccasions() {
    const current = lang();
    const dict = CORE[current] || {};
    ['occ_divorce','occ_breakup','occ_reconcile','occ_apology','occ_missyou','occ_other'].forEach(key => {
      if (!dict[key]) return;
      document.querySelectorAll(`[data-i18n="${key}"]`).forEach(el => { if (el.textContent !== dict[key]) el.textContent = dict[key]; });
    });
  }

  let scheduled = false;
  function apply() {
    if (scheduled) return;
    scheduled = true;
    requestAnimationFrame(() => {
      scheduled = false;
      translateCatalogNames();
      translateExtraOccasions();
    });
  }

  function boot() {
    apply();
    document.getElementById('language')?.addEventListener('change', () => setTimeout(apply, 90));
    const catalog = document.getElementById('digital-catalog');
    if (catalog) {
      new MutationObserver(apply).observe(catalog, {childList:true, subtree:true});
      catalog.addEventListener('input', () => setTimeout(apply, 0));
      catalog.addEventListener('click', () => setTimeout(apply, 0));
    }
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
})();
