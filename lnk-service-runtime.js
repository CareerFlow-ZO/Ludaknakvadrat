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

  const aliases = {
        en:{'Basic website do 5 stranica':'Basic website up to 5 pages','Premium website do 10 stranica':'Premium website up to 10 pages','VIP custom website do 15 stranica':'VIP custom website up to 15 pages','Basic redesign postojeće web stranice':'Basic website redesign','Premium redesign postojeće web stranice':'Premium website redesign','VIP redesign postojeće web stranice':'VIP website redesign','Osnovna SEO optimizacija':'Basic SEO optimization','Napredni SEO paket':'Advanced SEO package','Start web shop':'Starter online store','Business web shop':'Business online store','Premium web shop':'Premium online store'},
        sl:{'Basic website do 5 stranica':'Osnovna spletna stran do 5 strani','Premium website do 10 stranica':'Premium spletna stran do 10 strani','VIP custom website do 15 stranica':'VIP spletna stran do 15 strani','Basic redesign postojeće web stranice':'Osnovna prenova spletne strani','Premium redesign postojeće web stranice':'Premium prenova spletne strani','VIP redesign postojeće web stranice':'VIP prenova spletne strani','Osnovna SEO optimizacija':'Osnovna SEO optimizacija','Napredni SEO paket':'Napredni SEO paket','Start web shop':'Osnovna spletna trgovina','Business web shop':'Poslovna spletna trgovina','Premium web shop':'Premium spletna trgovina'},
        de:{'Basic website do 5 stranica':'Basis-Website bis 5 Seiten','Premium website do 10 stranica':'Premium-Website bis 10 Seiten','VIP custom website do 15 stranica':'VIP-Website bis 15 Seiten','Basic redesign postojeće web stranice':'Einfaches Website-Redesign','Premium redesign postojeće web stranice':'Premium Website-Redesign','VIP redesign postojeće web stranice':'VIP Website-Redesign','Osnovna SEO optimizacija':'Grundlegende SEO-Optimierung','Napredni SEO paket':'Erweitertes SEO-Paket','Start web shop':'Starter-Onlineshop','Business web shop':'Business-Onlineshop','Premium web shop':'Premium-Onlineshop'}
      };
  function localizedServiceName(original,current){
    const names=namesFor(current);
    const sourceIndex=SERVICE_SR.indexOf(original);
    return ['sr','bs','hr'].includes(current) ? original : (aliases[current]?.[original] || aliases.en[original] || (sourceIndex>=0 ? names[sourceIndex] : original));
  }
  window.LNKServiceName=localizedServiceName;

  function categoryText(card) {
    return card.querySelector('.dc-cat')?.textContent || '';
  }

  function syncCatalogPreview(card,name) {
    const visual=card.querySelector('.dc-visual');
    const img=visual?.querySelector('img');
    if(!visual || !img || !name) return;

    const cat=card.dataset.cat || 'template';
    const icon=card.querySelector('.dc-icon')?.textContent?.trim() || '✦';
    let src='';
    try{ src=window.LNKVisuals?.dataUri(name,cat,icon) || ''; }catch(_){}
    if(!src) return;

    // Always keep preview image, modal source and translated title in sync.
    if(img.src.includes('/assets/previews/')) src=img.src;
    else if(img.src !== src) img.src=src;
    img.loading='lazy';
    img.decoding='async';
    img.alt=name+' — LNK DIGITAL preview';
    visual.dataset.lnkPreviewSrc=src;
    visual.dataset.lnkPreviewTitle=name;
  }

  function translateCatalogNames() {
    const current = lang();
    const cards = document.querySelectorAll('#digital-catalog .dc-card');
    cards.forEach((card, i) => {
      const original = card.dataset.originalName || '';
      const name = localizedServiceName(original,current);
      if (!name) return;
      const h3 = card.querySelector('h3');
      if (h3 && h3.textContent !== name) h3.textContent = name;
      card.dataset.search = (name + ' ' + categoryText(card)).toLowerCase();
      syncCatalogPreview(card,name);
      const order = card.querySelector('.dc-order');
      if (order) order.textContent = buttonLabel(current);
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
