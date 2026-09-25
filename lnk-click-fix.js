(() => {
  'use strict';

  if (window.__LNK_CLICK_FIX_V4) return;
  window.__LNK_CLICK_FIX_V4 = true;

  const EMAIL = 'contact@ludaknakvadrat.com';
  const WA = '38631244612';

  const style = document.createElement('style');
  style.id = 'lnk-click-fix-v4-style';
  style.textContent = `
    .noise,.halo,.lnk-glow-orb,.hero::before,.hero::after,.service-card::before,.service-card::after,
    .lnk-card::before,.lnk-card::after,.dc-card::before,.dc-card::after,.price-card::before,.price-card::after{
      pointer-events:none!important
    }
    a,button,select,input,textarea,label,[role="button"]{pointer-events:auto!important;touch-action:manipulation}
    .site-header,.hero-copy,.hero-buttons,.desktop-nav,.header-actions,.lnk-card,.dc-card,.price-card,.video-card,
    .web-order-form,.dc-form,.order-form,.occasion-grid,.lnk-qh-card,.lnk-section-tab,.ls-card,.ls-actions{
      position:relative;z-index:3
    }
    .lnk-order-btn,.dc-order,.dc-month-order,.web-pick,.web-pick-modern,.web-service-email,
    .price-card a[href="#naruci"],.ls-btn,.lnk-floating-order,#lnk-mobile-dock a,#lnk-mobile-menu-panel a{
      cursor:pointer!important;position:relative;z-index:5
    }
    .occasion-grid>span{cursor:pointer!important;position:relative;z-index:4;touch-action:manipulation}
    .occasion-grid>span:focus-visible{outline:2px solid #52cfff;outline-offset:3px}
    #songOrderForm,#digital-order,#web-naruci,#web-naruci-modern{scroll-margin-top:110px}
    @media(max-width:760px){
      #songOrderForm,#digital-order,#web-naruci,#web-naruci-modern{scroll-margin-top:92px}
    }
  `;
  document.head.appendChild(style);

  function byHash(hash) {
    if (!hash || hash === '#') return null;
    const aliases = {
      '#digital-order': () => document.getElementById('digital-order') || document.querySelector('#digital-catalog .dc-form') || document.getElementById('digital-catalog'),
      '#web-naruci': () => document.getElementById('web-naruci') || document.getElementById('web-naruci-modern') || document.querySelector('#web-stranice .web-order-form') || document.getElementById('web-stranice'),
      '#web-naruci-modern': () => document.getElementById('web-naruci-modern') || document.getElementById('web-naruci') || document.querySelector('#web-stranice .web-order-form') || document.getElementById('web-stranice'),
      '#naruci': () => document.getElementById('songOrderForm') || document.getElementById('naruci'),
      '#lnk-usluge': () => document.getElementById('lnk-usluge') || document.getElementById('digital-catalog') || document.getElementById('usluge')
    };
    if (aliases[hash]) return aliases[hash]();
    try { return document.querySelector(hash); } catch (_) { return null; }
  }

  function go(hash, tries = 0) {
    const target = byHash(hash);
    if (!target) {
      if (tries < 8) setTimeout(() => go(hash, tries + 1), 120);
      return false;
    }
    const header = document.querySelector('.site-header');
    const offset = (header?.offsetHeight || 72) + 16;
    const y = Math.max(0, target.getBoundingClientRect().top + window.scrollY - offset);
    window.scrollTo({ top: y, behavior: 'smooth' });
    try { history.replaceState(null, '', hash); } catch (_) {}
    return true;
  }

  function closeMenu() {
    document.querySelector('.desktop-nav')?.classList.remove('mobile-open');
    document.getElementById('lnk-mobile-menu-panel')?.classList.remove('open');
    document.body.classList.remove('lnk-menu-open');
  }

  function songForm() {
    return document.getElementById('songOrderForm');
  }

  function setSongPackage(value) {
    const form = songForm();
    const select = document.getElementById('packageSelect') || form?.querySelector('select[name="package"]');
    if (!select || !value) return;
    const key = String(value).trim().toUpperCase();
    const option = [...select.options].find(o => String(o.value || o.textContent).toUpperCase().startsWith(key));
    if (option) {
      select.value = option.value;
      select.dispatchEvent(new Event('change', { bubbles: true }));
    }
  }

  function setSongOccasion(label) {
    const form = songForm();
    const select = form?.querySelector('select[name="occasion"]');
    if (!select || !label) return;
    const wanted = String(label).trim().toLowerCase();
    const option = [...select.options].find(o => {
      const text = String(o.textContent || '').trim().toLowerCase();
      const val = String(o.value || '').trim().toLowerCase();
      return text === wanted || val === wanted || text.includes(wanted) || wanted.includes(text);
    });
    if (option) {
      select.value = option.value;
      select.dispatchEvent(new Event('change', { bubbles: true }));
    }
  }

  function currentWebForm() {
    return document.getElementById('web-naruci-modern') ||
      document.getElementById('web-naruci') ||
      document.querySelector('#web-stranice .web-order-form');
  }

  function setWebPackage(value) {
    const form = currentWebForm();
    const field = form?.elements?.package || form?.querySelector('[name="package"]');
    if (!field || !value) return;
    const wanted = String(value).trim();
    const option = [...field.options].find(o =>
      String(o.value || o.textContent).trim() === wanted ||
      String(o.value || o.textContent).toLowerCase().includes(wanted.toLowerCase()) ||
      wanted.toLowerCase().includes(String(o.value || o.textContent).toLowerCase())
    );
    field.value = option ? option.value : wanted;
    field.dispatchEvent(new Event('change', { bubbles: true }));
  }

  function digitalForm() {
    return document.getElementById('digital-order') || document.querySelector('#digital-catalog .dc-form');
  }

  function setDigitalService(value) {
    const form = digitalForm();
    const field = form?.elements?.service || form?.querySelector('[name="service"]');
    if (!field || !value) return;
    const wanted = String(value).trim();
    const option = [...field.options].find(o =>
      String(o.value || o.textContent).trim() === wanted ||
      String(o.value || o.textContent).toLowerCase().includes(wanted.toLowerCase().split(' — ')[0])
    );
    if (option) field.value = option.value;
    else field.value = wanted;
    field.dispatchEvent(new Event('change', { bubbles: true }));
  }

  function status(text, error = false) {
    const el = document.getElementById('formStatus');
    if (!el) return;
    el.textContent = text;
    el.classList.toggle('error', !!error);
  }

  function valid(form) {
    if (!form) return false;
    if (!form.checkValidity()) {
      form.reportValidity();
      return false;
    }
    return true;
  }

  function songMessage() {
    const form = songForm();
    const d = new FormData(form);
    return `🎵 NOVA NARUDŽBINA — LNK DIGITAL

Ime: ${d.get('name')}
E-mail: ${d.get('email')}
Pesma za: ${d.get('recipient')}
Povod: ${d.get('occasion')}
Žanr / stil: ${d.get('style')}
Jezik: ${d.get('language')}
Paket: ${d.get('package')}
Atmosfera: ${d.get('mood')}
Rok: ${d.get('deadline')}

PRIČA / ŽELJE:
${d.get('story')}

Website: ludaknakvadrat.com`;
  }

  function sendSongWhatsApp() {
    const form = songForm();
    if (!valid(form)) return;
    const url = 'https://wa.me/' + WA + '?text=' + encodeURIComponent(songMessage());
    const w = window.open(url, '_blank', 'noopener');
    if (!w) window.location.href = url;
    status('✓ WhatsApp je otvoren sa pripremljenom narudžbinom.');
  }

  function sendSongEmail() {
    const form = songForm();
    if (!valid(form)) return;
    const d = new FormData(form);
    const subject = `Nova narudžbina — ${d.get('recipient')} — ${d.get('package')}`;
    window.location.href = 'mailto:' + EMAIL + '?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(songMessage());
    status('✓ Otvoren je e-mail sa pripremljenom narudžbinom.');
  }

  async function paySong(button) {
    const form = songForm();
    if (!valid(form)) return;
    const d = new FormData(form);
    const packageKey = String(d.get('package') || '').split(' ')[0].toUpperCase();
    const original = button.textContent;
    button.disabled = true;
    button.textContent = '⏳ Otvaram sigurnu naplatu...';
    status('');
    try {
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: d.get('name'),
          email: d.get('email'),
          recipient: d.get('recipient'),
          occasion: d.get('occasion'),
          style: d.get('style'),
          language: d.get('language'),
          package: packageKey,
          story: d.get('story'),
          mood: d.get('mood'),
          deadline: d.get('deadline')
        })
      });
      const result = await response.json().catch(() => ({}));
      if (!response.ok || !result.url) throw new Error(result.error || 'Plaćanje trenutno nije dostupno.');
      window.location.assign(result.url);
    } catch (err) {
      status('✕ ' + (err.message || 'Plaćanje trenutno nije dostupno. Probaj WhatsApp.'), true);
      button.disabled = false;
      button.textContent = original;
    }
  }

  function sendWebForm(form) {
    if (!valid(form)) return;
    const d = new FormData(form);
    const pkg = d.get('package') || d.get('service') || 'Web / digitalna usluga';
    const subject = 'LNK DIGITAL — Nova narudžba: ' + pkg;
    const body = `LNK DIGITAL — nova web narudžba

Ime: ${d.get('name') || '-'}
E-mail: ${d.get('email') || '-'}
Telefon / WhatsApp: ${d.get('phone') || '-'}
Firma: ${d.get('company') || '-'}
Djelatnost: ${d.get('activity') || '-'}
Paket / usluga: ${pkg}

Opis i želje:
${d.get('details') || d.get('story') || '-'}`;
    window.location.href = 'mailto:' + EMAIL + '?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
    const st = form.querySelector('.web-form-status,.dc-status');
    if (st) st.textContent = '✓ E-mail je pripremljen. Klikni Pošalji / Send u svojoj e-mail aplikaciji.';
  }

  function patch() {
    document.querySelectorAll('.price-card').forEach(card => {
      const plan = card.querySelector('.plan')?.textContent?.trim();
      const a = card.querySelector('a[href="#naruci"]');
      if (a && plan) a.dataset.lnkSongPackage = plan;
    });

    document.querySelectorAll('.occasion-grid>span').forEach(item => {
      item.setAttribute('role', 'button');
      item.setAttribute('tabindex', '0');
      item.dataset.lnkOccasion = item.querySelector('b')?.textContent?.trim() || '';
      item.setAttribute('aria-label', item.dataset.lnkOccasion ? 'Naruči: ' + item.dataset.lnkOccasion : 'Naruči pesmu');
    });

    document.querySelectorAll('.dc-order,.dc-month-order,.web-pick,.web-pick-modern,.web-service-email,.price-card a[href="#naruci"]').forEach(el => {
      el.style.pointerEvents = 'auto';
      el.style.touchAction = 'manipulation';
    });

    document.querySelectorAll('.reveal').forEach(el => el.classList.add('visible'));
  }

  document.addEventListener('click', e => {
    const pay = e.target.closest('#payOrder');
    if (pay) {
      e.preventDefault();
      e.stopImmediatePropagation();
      paySong(pay);
      return;
    }

    const email = e.target.closest('#emailOrder');
    if (email) {
      e.preventDefault();
      e.stopImmediatePropagation();
      sendSongEmail();
      return;
    }

    const dc = e.target.closest('.dc-order,.dc-month-order');
    if (dc) {
      e.preventDefault();
      e.stopImmediatePropagation();
      const value = dc.dataset.service || dc.closest('.dc-card,.dc-monthly-card')?.querySelector('h3,h4')?.textContent || '';
      setDigitalService(value);
      go('#digital-order');
      return;
    }

    const web = e.target.closest('.web-pick,.web-pick-modern,.web-service-email');
    if (web) {
      e.preventDefault();
      e.stopImmediatePropagation();
      const value = web.dataset.package || web.dataset.service || '';
      setWebPackage(value);
      go(currentWebForm()?.id === 'web-naruci-modern' ? '#web-naruci-modern' : '#web-naruci');
      return;
    }

    const songPick = e.target.closest('[data-lnk-song-package],.price-card a[href="#naruci"]');
    if (songPick) {
      e.preventDefault();
      e.stopImmediatePropagation();
      const plan = songPick.dataset.lnkSongPackage || songPick.closest('.price-card')?.querySelector('.plan')?.textContent || '';
      setSongPackage(plan);
      go('#naruci');
      return;
    }

    const occasion = e.target.closest('.occasion-grid>span');
    if (occasion) {
      e.preventDefault();
      e.stopImmediatePropagation();
      setSongOccasion(occasion.dataset.lnkOccasion || occasion.querySelector('b')?.textContent || '');
      go('#naruci');
      return;
    }

    const menu = e.target.closest('#menuToggle,.menu-toggle');
    if (menu && window.innerWidth > 950) {
      e.preventDefault();
      document.querySelector('.desktop-nav')?.classList.toggle('mobile-open');
      return;
    }

    const a = e.target.closest('a[href]');
    if (!a) return;
    const href = a.getAttribute('href') || '';
    if (href.startsWith('#')) {
      const target = byHash(href);
      if (target || ['#digital-order','#web-naruci','#web-naruci-modern','#naruci','#lnk-usluge'].includes(href)) {
        e.preventDefault();
        closeMenu();
        go(href);
      }
    }
  }, true);

  document.addEventListener('keydown', e => {
    const occasion = e.target.closest?.('.occasion-grid>span');
    if (occasion && (e.key === 'Enter' || e.key === ' ')) {
      e.preventDefault();
      setSongOccasion(occasion.dataset.lnkOccasion || occasion.querySelector('b')?.textContent || '');
      go('#naruci');
    }
  });

  document.addEventListener('submit', e => {
    const form = e.target;
    if (!(form instanceof HTMLFormElement)) return;

    if (form.id === 'songOrderForm') {
      e.preventDefault();
      e.stopImmediatePropagation();
      sendSongWhatsApp();
      return;
    }

    if (form.id === 'digital-order' || form.classList.contains('dc-form')) {
      e.preventDefault();
      e.stopImmediatePropagation();
      sendWebForm(form);
      return;
    }

    if (form.id === 'web-naruci' || form.id === 'web-naruci-modern' || form.classList.contains('web-order-form')) {
      e.preventDefault();
      e.stopImmediatePropagation();
      sendWebForm(form);
    }
  }, true);

  document.addEventListener('change', e => {
    if (e.target?.id === 'language') {
      closeMenu();
      setTimeout(patch, 120);
      setTimeout(patch, 500);
    }
  });

  const observer = new MutationObserver(() => {
    clearTimeout(window.__lnkClickPatchTimer);
    window.__lnkClickPatchTimer = setTimeout(patch, 70);
  });

  function boot() {
    patch();
    observer.observe(document.body, { childList: true, subtree: true });
    [250, 700, 1500, 3000].forEach(ms => setTimeout(patch, ms));
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot, { once: true });
  else boot();
})();