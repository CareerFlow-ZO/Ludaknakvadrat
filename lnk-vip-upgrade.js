(() => {
  'use strict';
  if (window.__LNK_VIP_UPGRADE) return;
  window.__LNK_VIP_UPGRADE = true;

  const WA = '38631244612';
  const COPY = {
    sr:{best:'NAJPOPULARNIJI',sticky:'Zatraži ponudu',sub:'LNK DIGITAL • WhatsApp',trust:['Premium dizajn','Mobile-first','SEO spremno','Brz kontakt'],wa:'Pošalji upit na WhatsApp'},
    bs:{best:'NAJPOPULARNIJI',sticky:'Zatraži ponudu',sub:'LNK DIGITAL • WhatsApp',trust:['Premium dizajn','Mobile-first','SEO spremno','Brz kontakt'],wa:'Pošalji upit na WhatsApp'},
    hr:{best:'NAJPOPULARNIJI',sticky:'Zatraži ponudu',sub:'LNK DIGITAL • WhatsApp',trust:['Premium dizajn','Mobile-first','SEO spremno','Brz kontakt'],wa:'Pošalji upit na WhatsApp'},
    sl:{best:'NAJBOLJ IZBRANO',sticky:'Pošlji povpraševanje',sub:'LNK DIGITAL • WhatsApp',trust:['Premium dizajn','Mobile-first','SEO pripravljeno','Hiter kontakt'],wa:'Pošlji povpraševanje na WhatsApp'},
    en:{best:'MOST POPULAR',sticky:'Get a quote',sub:'LNK DIGITAL • WhatsApp',trust:['Premium design','Mobile-first','SEO ready','Fast contact'],wa:'Send inquiry on WhatsApp'},
    de:{best:'BELIEBTESTE',sticky:'Angebot anfragen',sub:'LNK DIGITAL • WhatsApp',trust:['Premium Design','Mobile-first','SEO-ready','Schneller Kontakt'],wa:'Anfrage per WhatsApp senden'}
  };
  for (const l of ['fr','es','it','sq','tr','mk']) COPY[l] = COPY.en;

  function lang(){
    return document.getElementById('language')?.value || localStorage.getItem('lnkDisplayLang') || localStorage.getItem('ludakLang') || 'sr';
  }
  function t(){ return COPY[lang()] || COPY.sr; }

  function trust(){
    const hero = document.querySelector('.hero-copy');
    if (!hero) return;
    let row = hero.querySelector('.lnk-hero-trust');
    if (!row) {
      row = document.createElement('div');
      row.className = 'lnk-hero-trust';
      hero.appendChild(row);
    }
    row.innerHTML = t().trust.map(x => '<span>'+x+'</span>').join('');
  }

  function featured(){
    const cards = [...document.querySelectorAll('#web-stranice .lnk-card')];
    cards.forEach(card => {
      const name = (card.querySelector('h3')?.textContent || '').trim().toUpperCase();
      card.classList.toggle('lnk-featured', name === 'PREMIUM');
      let badge = card.querySelector('.lnk-best');
      if (name === 'PREMIUM') {
        if (!badge) {
          badge = document.createElement('div');
          badge.className = 'lnk-best';
          card.prepend(badge);
        }
        badge.textContent = t().best;
      } else if (badge) badge.remove();
    });
  }

  function formUpgrade(){
    const form = document.getElementById('web-naruci');
    if (!form || form.querySelector('.lnk-wa-send')) return;
    const grid = form.querySelector('.web-form-grid');
    if (!grid) return;
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'lnk-order-btn lnk-wa-send web-full';
    btn.textContent = '💬 ' + t().wa;
    btn.addEventListener('click', () => {
      const d = new FormData(form);
      const message = [
        'LNK DIGITAL — upit za web stranicu',
        '',
        'Paket: ' + (d.get('package') || '-'),
        'Ime: ' + (d.get('name') || '-'),
        'E-mail: ' + (d.get('email') || '-'),
        'Telefon: ' + (d.get('phone') || '-'),
        'Firma: ' + (d.get('company') || '-'),
        'Djelatnost: ' + (d.get('activity') || '-'),
        '',
        'Detalji:',
        d.get('details') || '-'
      ].join('\n');
      window.open('https://wa.me/' + WA + '?text=' + encodeURIComponent(message), '_blank', 'noopener');
    });
    grid.appendChild(btn);
  }

  function sticky(){
    let a = document.querySelector('.lnk-sticky-cta');
    if (!a) {
      a = document.createElement('a');
      a.className = 'lnk-sticky-cta';
      a.href = '#web-naruci';
      document.body.appendChild(a);
    }
    a.innerHTML = '<span>'+t().sticky+'</span><small>'+t().sub+'</small>';
  }

  function enhance(){
    trust();
    featured();
    formUpgrade();
    sticky();
  }

  let timer;
  const observer = new MutationObserver(() => {
    clearTimeout(timer);
    timer = setTimeout(enhance, 80);
  });

  function boot(){
    enhance();
    observer.observe(document.body,{childList:true,subtree:true});
    document.getElementById('language')?.addEventListener('change',()=>setTimeout(enhance,300));
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
})();