(() => {
  'use strict';
  if (window.__LNK_QUICK_NAV_V2) return;
  window.__LNK_QUICK_NAV_V2 = true;

  const COPY = {
    sr:{quick:'BRZI IZBOR',title:'Šta ti treba?',desc:'Do najvažnijeg dela sajta u jednom kliku.',web:'Web',webSub:'Sajtovi i shop',brand:'Branding',brandSub:'Logo i identitet',marketing:'Marketing',marketingSub:'Oglasi i rast',ai:'AI',aiSub:'Automatizacija',songs:'Pesme',songsSub:'Personalizovane',contact:'Kontakt',contactSub:'Pošalji upit',home:'Početna',services:'Usluge',order:'Naruči'},
    bs:{quick:'BRZI IZBOR',title:'Šta ti treba?',desc:'Do najvažnijeg dijela sajta u jednom kliku.',web:'Web',webSub:'Sajtovi i shop',brand:'Branding',brandSub:'Logo i identitet',marketing:'Marketing',marketingSub:'Oglasi i rast',ai:'AI',aiSub:'Automatizacija',songs:'Pjesme',songsSub:'Personalizovane',contact:'Kontakt',contactSub:'Pošalji upit',home:'Početna',services:'Usluge',order:'Naruči'},
    hr:{quick:'BRZI IZBOR',title:'Što ti treba?',desc:'Do najvažnijeg dijela stranice jednim klikom.',web:'Web',webSub:'Web i shop',brand:'Branding',brandSub:'Logo i identitet',marketing:'Marketing',marketingSub:'Oglasi i rast',ai:'AI',aiSub:'Automatizacija',songs:'Pjesme',songsSub:'Personalizirane',contact:'Kontakt',contactSub:'Pošalji upit',home:'Početna',services:'Usluge',order:'Naruči'},
    sl:{quick:'HITRA IZBIRA',title:'Kaj potrebuješ?',desc:'Do najpomembnejšega dela strani z enim dotikom.',web:'Splet',webSub:'Strani in trgovine',brand:'Branding',brandSub:'Logo in identiteta',marketing:'Marketing',marketingSub:'Oglasi in rast',ai:'AI',aiSub:'Avtomatizacija',songs:'Pesmi',songsSub:'Personalizirane',contact:'Kontakt',contactSub:'Pošlji povpraševanje',home:'Domov',services:'Storitve',order:'Naroči'},
    en:{quick:'QUICK ACCESS',title:'What do you need?',desc:'Reach the right part of the site in one tap.',web:'Web',webSub:'Sites & shops',brand:'Branding',brandSub:'Logo & identity',marketing:'Marketing',marketingSub:'Ads & growth',ai:'AI',aiSub:'Automation',songs:'Songs',songsSub:'Personalized',contact:'Contact',contactSub:'Send inquiry',home:'Home',services:'Services',order:'Order'},
    de:{quick:'SCHNELLAUSWAHL',title:'Was brauchst du?',desc:'Mit einem Klick zum richtigen Bereich.',web:'Web',webSub:'Websites & Shops',brand:'Branding',brandSub:'Logo & Identität',marketing:'Marketing',marketingSub:'Ads & Wachstum',ai:'KI',aiSub:'Automatisierung',songs:'Songs',songsSub:'Personalisiert',contact:'Kontakt',contactSub:'Anfrage senden',home:'Start',services:'Leistungen',order:'Bestellen'}
  };
  for (const l of ['fr','es','it','sq','tr','mk']) COPY[l] = COPY.en;

  const EXTRA = {
    sr:{showAll:'Prikaži sve usluge',showLess:'Prikaži manje',packages:'Paketi',occasions:'Posebne prilike',extras:'Dodaci',faq:'Česta pitanja',faqTitle:'Brzi odgovori pre narudžbe',
      qs:[['Kako najbrže da pronađem uslugu?','Koristi Brzi izbor na vrhu ili donji meni na telefonu. Kategorija će te odvesti direktno na odgovarajući deo sajta.'],['Koliko traje izrada?','Rok zavisi od usluge i paketa. Kod narudžbe napiši željeni rok, a za personalizovane pesme postoje standardne i prioritetne opcije.'],['Mogu li naručiti više usluga odjednom?','Da. U detaljima upita napiši sve što ti treba i možemo spojiti više digitalnih usluga u jednu ponudu.'],['Kako naručujem personalizovanu pesmu?','Otvori Pesme, izaberi paket ili posebnu priliku, pa popuni formular. Narudžbu možeš poslati putem ponuđenih kanala na sajtu.'],['Mogu li tražiti izmene?','Da, broj izmena zavisi od izabranog paketa ili dogovorene digitalne usluge.'],['Ne znam šta mi tačno treba — šta da izaberem?','Izaberi Kontakt / Naruči i ukratko opiši cilj. Na osnovu toga se može odabrati odgovarajuća usluga.']]},
    bs:{showAll:'Prikaži sve usluge',showLess:'Prikaži manje',packages:'Paketi',occasions:'Posebne prilike',extras:'Dodaci',faq:'Česta pitanja',faqTitle:'Brzi odgovori prije narudžbe'},
    hr:{showAll:'Prikaži sve usluge',showLess:'Prikaži manje',packages:'Paketi',occasions:'Posebne prilike',extras:'Dodaci',faq:'Česta pitanja',faqTitle:'Brzi odgovori prije narudžbe'},
    sl:{showAll:'Prikaži vse storitve',showLess:'Prikaži manj',packages:'Paketi',occasions:'Posebne priložnosti',extras:'Dodatki',faq:'Pogosta vprašanja',faqTitle:'Hitri odgovori pred naročilom'},
    en:{showAll:'Show all services',showLess:'Show less',packages:'Packages',occasions:'Special occasions',extras:'Extras',faq:'FAQ',faqTitle:'Quick answers before ordering'},
    de:{showAll:'Alle Leistungen anzeigen',showLess:'Weniger anzeigen',packages:'Pakete',occasions:'Besondere Anlässe',extras:'Extras',faq:'FAQ',faqTitle:'Schnelle Antworten vor der Bestellung'}
  };
  EXTRA.bs.qs=EXTRA.sr.qs; EXTRA.hr.qs=EXTRA.sr.qs; EXTRA.sl.qs=EXTRA.en.qs; EXTRA.en.qs=[
    ['How do I find the right service quickly?','Use Quick Access near the top or the fixed mobile menu. Each shortcut takes you directly to the relevant section.'],
    ['How long does delivery take?','Timing depends on the service and package. Add your preferred deadline to the inquiry; personalized songs also offer standard and priority options.'],
    ['Can I order several services together?','Yes. Describe everything you need in the inquiry and multiple digital services can be combined into one scope.'],
    ['How do I order a personalized song?','Open Songs, choose a package or occasion, then complete the order form using the available contact or payment option.'],
    ['Can I request revisions?','Yes. The number of revisions depends on the selected package or the agreed digital service.'],
    ['I am not sure what I need. What should I choose?','Open Contact / Order and describe your goal briefly. The right service can then be selected from your needs.']
  ]; EXTRA.de.qs=EXTRA.en.qs;
  for (const l of ['fr','es','it','sq','tr','mk']) EXTRA[l]=EXTRA.en;
  function x(){ return EXTRA[lang()] || EXTRA.sr; }


  function lang(){ return document.getElementById('language')?.value || localStorage.getItem('lnkDisplayLang') || localStorage.getItem('ludakLang') || 'sr'; }
  function t(){ return COPY[lang()] || COPY.sr; }

  function scrollToHash(hash){
    let el = document.querySelector(hash);
    if (!el && hash === '#digital-order') el = document.querySelector('#digital-catalog .dc-form') || document.getElementById('digital-catalog');
    if (!el && hash === '#web-stranice') el = document.getElementById('digital-catalog');
    if (!el) return;
    const h = document.querySelector('.site-header')?.offsetHeight || 70;
    const y = el.getBoundingClientRect().top + scrollY - h - 14;
    window.scrollTo({top:y,behavior:'smooth'});
  }

  function chooseCategory(cat){
    const section = document.getElementById('digital-catalog');
    if (!section) return;
    const btn = section.querySelector('.dc-filter[data-cat="'+cat+'"]');
    if (btn) btn.click();
    setTimeout(()=>scrollToHash('#digital-catalog'),40);
  }

  function hubMarkup(){
    const c=t();
    return '<div class="lnk-qh-wrap"><div class="lnk-qh-head"><div><span class="lnk-qh-kicker">'+c.quick+'</span><h2>'+c.title+'</h2></div><p>'+c.desc+'</p></div><div class="lnk-qh-grid">'+
      card('🌐',c.web,c.webSub,'#web-stranice','')+
      card('✨',c.brand,c.brandSub,'#digital-catalog','brand')+
      card('📈',c.marketing,c.marketingSub,'#digital-catalog','marketing')+
      card('🤖',c.ai,c.aiSub,'#digital-catalog','ai')+
      card('🎵',c.songs,c.songsSub,'#cenovnik','')+
      card('💬',c.contact,c.contactSub,'#digital-order','')+
    '</div></div>';
  }
  function card(icon,label,sub,href,cat){
    const image = cat==='brand' ? '/assets/previews/beauty.png?v=2' :
      cat==='marketing' ? '/assets/previews/ecommerce.png?v=2' :
      cat==='ai' ? '/assets/previews/truck.png?v=2' :
      href==='#web-stranice' ? '/assets/previews/business.png?v=2' :
      href==='#cenovnik' ? '/assets/music/vip.png?v=1' :
      '/assets/previews/realestate.png?v=2';
    return '<a class="lnk-qh-card" href="'+href+'"'+(cat?' data-cat="'+cat+'"':'')+'><span class="lnk-qh-media"><img src="'+image+'" alt="" loading="lazy"></span><span class="lnk-qh-icon">'+icon+'</span><span class="lnk-qh-copy"><strong>'+label+'</strong><small>'+sub+'</small></span></a>';
  }

  function ensureHub(){
    let hub=document.getElementById('lnk-quick-hub');
    if(!hub){
      hub=document.createElement('section');
      hub.id='lnk-quick-hub';
      hub.className='lnk-quick-hub';
      const stats=document.querySelector('.stats');
      if(stats) stats.after(hub); else document.querySelector('main')?.prepend(hub);
    }
    hub.innerHTML=hubMarkup();
  }

  function ensureDock(){
    const c=t();
    let dock=document.getElementById('lnk-mobile-dock');
    if(!dock){ dock=document.createElement('nav'); dock.id='lnk-mobile-dock'; dock.className='lnk-mobile-dock'; dock.setAttribute('aria-label','Quick navigation'); document.body.appendChild(dock); }
    dock.innerHTML=
      dockItem('#top','⌂',c.home,'home')+
      dockItem('#digital-catalog','⌕',c.services,'services')+
      dockItem('#web-stranice','🌐',c.web,'web')+
      dockItem('#cenovnik','♫',c.songs,'songs')+
      dockItem('#digital-order','✦',c.order,'order');

    let floating=document.getElementById('lnk-floating-order');
    if(!floating){ floating=document.createElement('a'); floating.id='lnk-floating-order'; floating.className='lnk-floating-order'; document.body.appendChild(floating); }
    floating.href='#digital-order';
    floating.innerHTML='<span>✦</span>'+c.order;
  }
  function dockItem(href,icon,label,key){ return '<a href="'+href+'" data-key="'+key+'"><span class="dock-icon">'+icon+'</span><span>'+label+'</span></a>'; }

  function ensureDesktopNav(){
    const c=t(), nav=document.querySelector('.desktop-nav');
    if(!nav) return;
    nav.innerHTML='<a href="#top">'+c.home+'</a><a href="#digital-catalog">'+c.services+'</a><a href="#web-stranice">'+c.web+'</a><a href="#cenovnik">'+c.songs+'</a><a href="#digital-order">'+c.order+'</a>';
  }

  function addSectionTabs(){
    const catalog=document.getElementById('digital-catalog');
    if(!catalog || catalog.querySelector('.lnk-section-tabs')) return;
    const head=catalog.querySelector('.dc-head');
    if(!head) return;
    const c=t();
    const tabs=document.createElement('div');
    tabs.className='lnk-section-tabs';
    tabs.innerHTML='<a class="lnk-section-tab" href="#digital-catalog">'+c.services+'</a><a class="lnk-section-tab" href="#web-stranice">'+c.web+'</a><a class="lnk-section-tab" href="#cenovnik">'+c.songs+'</a><a class="lnk-section-tab" href="#digital-order">'+c.order+'</a>';
    head.after(tabs);
  }


  function ensureCatalogToggle(){
    const grid=document.querySelector('#digital-catalog .dc-grid');
    if(!grid) return;
    grid.classList.add('lnk-collapsed');
    let btn=document.getElementById('lnk-catalog-toggle');
    if(!btn){
      btn=document.createElement('button');
      btn.type='button'; btn.id='lnk-catalog-toggle'; btn.className='lnk-catalog-toggle';
      grid.after(btn);
      btn.addEventListener('click',()=>{
        const collapsed=grid.classList.toggle('lnk-collapsed');
        btn.textContent=collapsed ? '＋ '+x().showAll : '− '+x().showLess;
      });
    }
    btn.textContent=grid.classList.contains('lnk-collapsed') ? '＋ '+x().showAll : '− '+x().showLess;
  }

  function ensureSongTabs(){
    const sec=document.getElementById('cenovnik');
    const pricing=sec?.querySelector('.pricing-grid');
    const occasions=sec?.querySelector('.occasion-wrap');
    const head=sec?.querySelector('.section-heading');
    if(!sec || !pricing || !occasions || !head) return;
    let tabs=sec.querySelector('.lnk-song-tabs');
    if(!tabs){
      tabs=document.createElement('div'); tabs.className='lnk-song-tabs'; head.after(tabs);
      if(!occasions.querySelector('.lnk-extra-title')){
        const h=document.createElement('h3'); h.className='lnk-extra-title'; occasions.prepend(h);
      }
      tabs.addEventListener('click',e=>{
        const b=e.target.closest('.lnk-song-tab'); if(!b) return;
        const mode=b.dataset.mode;
        tabs.querySelectorAll('.lnk-song-tab').forEach(v=>v.classList.toggle('active',v===b));
        pricing.style.display=mode==='packages'?'grid':'none';
        occasions.style.display=mode==='packages'?'none':'block';
        const title=occasions.querySelector('h3:not(.lnk-extra-title)');
        const extraTitle=occasions.querySelector('.lnk-extra-title');
        const og=occasions.querySelector('.occasion-grid'), ex=occasions.querySelector('.extras');
        if(mode==='occasions'){
          occasions.classList.remove('lnk-extras-only');
          if(title) title.style.display=''; if(extraTitle) extraTitle.style.display='none';
          if(og) og.style.display='grid'; if(ex) ex.style.display='none';
        }else if(mode==='extras'){
          occasions.classList.add('lnk-extras-only');
          if(title) title.style.display='none'; if(extraTitle) extraTitle.style.display='';
          if(og) og.style.display='none'; if(ex) ex.style.display='block';
        }
      });
    }
    const m=x();
    tabs.innerHTML='<button class="lnk-song-tab active" data-mode="packages">'+m.packages+'</button><button class="lnk-song-tab" data-mode="occasions">'+m.occasions+'</button><button class="lnk-song-tab" data-mode="extras">'+m.extras+'</button>';
    const extraTitle=occasions.querySelector('.lnk-extra-title'); if(extraTitle) extraTitle.textContent=m.extras;
    pricing.style.display='grid'; occasions.style.display='none';
  }

  function ensureFaq(){
    let faq=document.getElementById('lnk-faq');
    if(!faq){
      faq=document.createElement('section'); faq.id='lnk-faq'; faq.className='lnk-faq';
      document.querySelector('footer')?.before(faq);
    }
    const m=x(), qs=m.qs || EXTRA.en.qs;
    faq.innerHTML='<div class="lnk-faq-wrap"><div class="lnk-faq-head"><span>'+m.faq+'</span><h2>'+m.faqTitle+'</h2></div>'+
      qs.map(q=>'<details><summary>'+q[0]+'</summary><p>'+q[1]+'</p></details>').join('')+'</div>';
  }

  function bind(){
    document.addEventListener('click', e=>{
      const q=e.target.closest('.lnk-qh-card[data-cat]');
      if(q){
        e.preventDefault();
        chooseCategory(q.dataset.cat);
        return;
      }
      const a=e.target.closest('#lnk-mobile-dock a,#lnk-floating-order,.lnk-section-tab');
      if(a){
        const href=a.getAttribute('href')||'';
        if(href.startsWith('#')){
          e.preventDefault();
          scrollToHash(href);
          document.querySelector('.desktop-nav')?.classList.remove('mobile-open');
        }
      }
    });

    const ids=[['top','home'],['digital-catalog','services'],['web-stranice','web'],['cenovnik','songs'],['digital-order','order']];
    const update=()=>{
      const y=scrollY+innerHeight*.33; let key='home';
      ids.forEach(([id,k])=>{const el=document.getElementById(id); if(el && el.offsetTop<=y) key=k;});
      document.querySelectorAll('#lnk-mobile-dock a').forEach(a=>a.classList.toggle('active',a.dataset.key===key));
    };
    window.addEventListener('scroll',update,{passive:true}); update();

    document.getElementById('language')?.addEventListener('change',()=>setTimeout(apply,260));
  }

  function apply(){
    ensureHub(); ensureDock(); ensureDesktopNav(); ensureFaq();
    setTimeout(()=>{ addSectionTabs(); ensureCatalogToggle(); ensureSongTabs(); },100);
  }

  function boot(){
    apply(); bind();
    const obs=new MutationObserver(()=>{
      if(!document.getElementById('lnk-quick-hub')) ensureHub();
      if(document.getElementById('digital-catalog') && !document.querySelector('#digital-catalog .lnk-section-tabs')) addSectionTabs();
      if(document.getElementById('digital-catalog') && !document.getElementById('lnk-catalog-toggle')) ensureCatalogToggle();
      if(document.getElementById('cenovnik') && !document.querySelector('#cenovnik .lnk-song-tabs')) ensureSongTabs();
    });
    obs.observe(document.body,{childList:true,subtree:true});
  }

  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',boot); else boot();
})();