(() => {
  'use strict';
  if (window.__LNK_SIGNATURE_2026_V2) return;
  window.__LNK_SIGNATURE_2026_V2 = true;

  const WA='38631244612';
  const PORTFOLIO=[
    ['BARBER PRO','Premium booking / local business','/assets/previews/barbershop.png?v=2','cyan'],
    ['BEAUTY LUXE','Elegant salon / booking concept','/assets/previews/beauty.png?v=2','violet'],
    ['AUTO PERFORMANCE','Automotive service / lead concept','/assets/previews/auto.png?v=2','blue'],
    ['TRUCK INDUSTRIAL','Fleet / VIN / service concept','/assets/previews/truck.png?v=2','purple'],
    ['RESTAURANT EMBER','Menu / reservation concept','/assets/previews/restaurant.png?v=2','cyan'],
    ['REAL ESTATE PRIME','Property / lead generation concept','/assets/previews/realestate.png?v=2','violet']
  ];

  const SERVICE_VISUAL='/assets/previews/services-signature-v1.png?v=1';
  const PACKAGE_VISUALS=[
    '/assets/previews/business.png?v=2',
    '/assets/previews/auto.png?v=2',
    '/assets/previews/realestate.png?v=2',
    '/assets/previews/ecommerce.png?v=2'
  ];

  const COPY={
    sl:{
      eyebrow:'LNK DIGITAL',
      title:'Vse digitalne<br>storitve na <span class="sig-gradient">enem mestu.</span>',
      text:'Celoten digitalni nastop za uspešno in prepoznavno blagovno znamko. Strategija, dizajn in rešitve, ki pomagajo tvojemu poslu rasti.',
      cta:'Začni svoj projekt',second:'Poglej storitve',
      trust:['SEO pripravljeno','Hiter kontakt','Premium dizajn'],
      stats:[['100%','po meri'],['SEO','pripravljeno'],['1:1','podpora'],['∞','možnosti']],
      servicesEy:'NAŠE STORITVE',servicesTitle:'Strategija. Dizajn. Rezultati.',servicesLead:'Vse, kar potrebuješ za močno spletno prisotnost — na enem mestu.',
      serviceCards:[
        ['🖥️','Spletne strani','Moderne, hitre in SEO pripravljene spletne strani.','#web-stranice',''],
        ['📈','Digitalni marketing','Več obiska, več povpraševanj in merljivi rezultati.','#digital-catalog','marketing'],
        ['✦','Branding','Celostna grafična podoba in vizualna identiteta, ki izstopa.','#digital-catalog','brand'],
        ['AI','AI rešitve','Avtomatizacija, AI orodja in rešitve za večjo učinkovitost.','#digital-catalog','ai']
      ],
      portfolioEy:'PORTFOLIO',portfolioTitle:'Dizajni, ki prodajajo.',portfolioText:'Oglej si nekaj smeri in demo projektov. Vsak končni projekt prilagodimo tvoji znamki, vsebini in ciljem.',portfolioBtn:'Odpri projekt',
      packagesEy:'SPLETNI PAKETI',packagesTitle:'Izberi nivo svojega novega spletnega nastopa.',popular:'NAJBOLJ IZBRANO',choose:'Izberi paket',
      packages:[
        ['BASIC','599,99 €',['Do 5 podstrani','Premium responsive dizajn','Kontaktni obrazec + WhatsApp','Google Maps + osnovni SEO','SSL + 2 kroga popravkov']],
        ['PREMIUM','999,99 €',['Do 10 podstrani','Premium dizajn + animacije','Google Analytics','SEO osnove + hitrost','3 krogi popravkov']],
        ['VIP','1.499,99 €',['Do 15 podstrani','Popolnoma custom VIP dizajn','Napredne animacije','Booking / order sistem','Več jezikov + blog','Prednostna podpora']],
        ['WEB SHOP','od 1.499,99 €',['Premium spletna trgovina','Spletna plačila','Dostava + naročila','Responsive dizajn','Pripravljeno za rast']]
      ],
      nav:['Domov','Storitve','Portfolio','O nas','WhatsApp']
    },
    sr:{
      eyebrow:'LNK DIGITAL',
      title:'Sve digitalne<br>usluge na <span class="sig-gradient">jednom mjestu.</span>',
      text:'Kompletan digitalni nastup za ozbiljan i prepoznatljiv brend. Strategija, dizajn i rješenja koja pomažu tvom poslu da raste.',
      cta:'Započni svoj projekat',second:'Pogledaj usluge',
      trust:['SEO spremno','Brz kontakt','Premium dizajn'],
      stats:[['100%','po mjeri'],['SEO','spremno'],['1:1','podrška'],['∞','mogućnosti']],
      servicesEy:'NAŠE USLUGE',servicesTitle:'Strategija. Dizajn. Rezultati.',servicesLead:'Sve što ti treba za snažan digitalni nastup — na jednom mjestu.',
      serviceCards:[
        ['🖥️','Web stranice','Moderni, brzi i SEO spremni web sajtovi.','#web-stranice',''],
        ['📈','Digitalni marketing','Više posjeta, više upita i mjerljivi rezultati.','#digital-catalog','marketing'],
        ['✦','Branding','Kompletan vizuelni identitet koji se pamti.','#digital-catalog','brand'],
        ['AI','AI rješenja','Automatizacija, AI alati i rješenja za veću efikasnost.','#digital-catalog','ai']
      ],
      portfolioEy:'PORTFOLIO',portfolioTitle:'Dizajni koji prodaju.',portfolioText:'Pogledaj nekoliko pravaca i demo projekata. Finalni projekat se prilagođava tvom brendu, sadržaju i ciljevima.',portfolioBtn:'Otvori projekat',
      packagesEy:'WEB PAKETI',packagesTitle:'Izaberi nivo svog novog web nastupa.',popular:'NAJPOPULARNIJI',choose:'Izaberi paket',
      packages:[
        ['BASIC','599,99 €',['Do 5 stranica','Premium responsive dizajn','Kontakt forma + WhatsApp','Google Maps + osnovni SEO','SSL + 2 kruga izmjena']],
        ['PREMIUM','999,99 €',['Do 10 stranica','Premium dizajn + animacije','Google Analytics','SEO osnove + brzina','3 kruga izmjena']],
        ['VIP','1.499,99 €',['Do 15 stranica','Potpuno custom VIP dizajn','Napredne animacije','Booking / order sistem','Više jezika + blog','Prioritetna podrška']],
        ['WEB SHOP','od 1.499,99 €',['Premium web shop','Online plaćanje','Dostava + narudžbe','Responsive dizajn','Spremno za rast']]
      ],
      nav:['Početna','Usluge','Portfolio','O nama','WhatsApp']
    },
    en:{
      eyebrow:'LNK DIGITAL',
      title:'All digital<br>services in <span class="sig-gradient">one place.</span>',
      text:'A complete digital presence for a strong and recognizable brand. Strategy, design and solutions built to help your business grow.',
      cta:'Start your project',second:'View services',
      trust:['SEO ready','Fast contact','Premium design'],
      stats:[['100%','custom'],['SEO','ready'],['1:1','support'],['∞','possibilities']],
      servicesEy:'OUR SERVICES',servicesTitle:'Strategy. Design. Results.',servicesLead:'Everything you need for a strong digital presence — in one place.',
      serviceCards:[
        ['🖥️','Websites','Modern, fast and SEO-ready business websites.','#web-stranice',''],
        ['📈','Digital marketing','More traffic, more inquiries and measurable results.','#digital-catalog','marketing'],
        ['✦','Branding','A complete visual identity designed to stand out.','#digital-catalog','brand'],
        ['AI','AI solutions','Automation, AI tools and solutions for greater efficiency.','#digital-catalog','ai']
      ],
      portfolioEy:'PORTFOLIO',portfolioTitle:'Design that sells.',portfolioText:'Explore selected directions and demo projects. Every final project is tailored to your brand, content and goals.',portfolioBtn:'Open project',
      packagesEy:'WEBSITE PACKAGES',packagesTitle:'Choose the level of your new digital presence.',popular:'MOST POPULAR',choose:'Choose package',
      packages:[
        ['BASIC','€599.99',['Up to 5 pages','Premium responsive design','Contact form + WhatsApp','Google Maps + basic SEO','SSL + 2 revision rounds']],
        ['PREMIUM','€999.99',['Up to 10 pages','Premium design + animations','Google Analytics','SEO basics + speed','3 revision rounds']],
        ['VIP','€1,499.99',['Up to 15 pages','Fully custom VIP design','Advanced animations','Booking / order system','Multilingual + blog','Priority support']],
        ['WEB SHOP','from €1,499.99',['Premium e-commerce','Online payments','Shipping + orders','Responsive design','Ready to scale']]
      ],
      nav:['Home','Services','Portfolio','About','WhatsApp']
    },
    de:{
      eyebrow:'LNK DIGITAL',
      title:'Alle digitalen<br>Leistungen an <span class="sig-gradient">einem Ort.</span>',
      text:'Ein kompletter digitaler Auftritt für eine starke und erkennbare Marke. Strategie, Design und Lösungen für nachhaltiges Wachstum.',
      cta:'Projekt starten',second:'Leistungen ansehen',
      trust:['SEO-ready','Schneller Kontakt','Premium Design'],
      stats:[['100%','individuell'],['SEO','ready'],['1:1','Support'],['∞','Möglichkeiten']],
      servicesEy:'UNSERE LEISTUNGEN',servicesTitle:'Strategie. Design. Ergebnisse.',servicesLead:'Alles für einen starken digitalen Auftritt — an einem Ort.',
      serviceCards:[
        ['🖥️','Webseiten','Moderne, schnelle und SEO-fertige Business-Webseiten.','#web-stranice',''],
        ['📈','Digitales Marketing','Mehr Besucher, mehr Anfragen und messbare Ergebnisse.','#digital-catalog','marketing'],
        ['✦','Branding','Eine komplette visuelle Identität mit Wiedererkennung.','#digital-catalog','brand'],
        ['AI','KI-Lösungen','Automatisierung, KI-Tools und Lösungen für mehr Effizienz.','#digital-catalog','ai']
      ],
      portfolioEy:'PORTFOLIO',portfolioTitle:'Design, das verkauft.',portfolioText:'Ausgewählte Richtungen und Demo-Projekte. Jedes finale Projekt wird an Marke, Inhalte und Ziele angepasst.',portfolioBtn:'Projekt öffnen',
      packagesEy:'WEBSEITEN-PAKETE',packagesTitle:'Wähle das Level deines neuen Webauftritts.',popular:'BELIEBTESTE',choose:'Paket wählen',
      packages:[
        ['BASIC','599,99 €',['Bis zu 5 Seiten','Premium Responsive Design','Kontaktformular + WhatsApp','Google Maps + Basis-SEO','SSL + 2 Korrekturrunden']],
        ['PREMIUM','999,99 €',['Bis zu 10 Seiten','Premium Design + Animationen','Google Analytics','SEO-Basis + Speed','3 Korrekturrunden']],
        ['VIP','1.499,99 €',['Bis zu 15 Seiten','Komplett individuelles VIP Design','Erweiterte Animationen','Booking / Order System','Mehrsprachig + Blog','Prioritäts-Support']],
        ['WEB SHOP','ab 1.499,99 €',['Premium Webshop','Online-Zahlung','Versand + Bestellungen','Responsive Design','Skalierbar']]
      ],
      nav:['Start','Leistungen','Portfolio','Über uns','WhatsApp']
    }
  };
  COPY.bs=COPY.sr; COPY.hr=COPY.sr;
  for(const l of ['fr','es','it','sq','tr','mk']) COPY[l]=COPY.en;

  function lang(){return document.getElementById('language')?.value||localStorage.getItem('lnkDisplayLang')||localStorage.getItem('ludakLang')||'sl'}
  function t(){return COPY[lang()]||COPY.sl}

  function scrollToId(id){
    const el=document.querySelector(id); if(!el)return;
    const h=document.querySelector('.site-header')?.offsetHeight||70;
    window.scrollTo({top:el.getBoundingClientRect().top+scrollY-h-22,behavior:'smooth'});
  }
  function category(cat){
    const sec=document.getElementById('digital-catalog'); if(!sec)return;
    const b=sec.querySelector('.dc-filter[data-cat="'+cat+'"]'); if(b)b.click();
    setTimeout(()=>scrollToId('#digital-catalog'),30);
  }

  function hero(){
    const c=t(), copy=document.querySelector('.hero-copy'), art=document.querySelector('.hero-art');
    if(copy){
      copy.innerHTML=
        '<div class="eyebrow"><span></span><span>'+c.eyebrow+'</span><span></span></div>'+
        '<h1>'+c.title+'</h1>'+
        '<p>'+c.text+'</p>'+
        '<div class="lnk-hero-trust">'+c.trust.map(x=>'<span>'+x+'</span>').join('')+'</div>'+
        '<div class="hero-buttons">'+
          '<a class="lnk-order-btn sig-primary" href="#web-naruci">✦ &nbsp;'+c.cta+' &nbsp;→</a>'+
          '<a class="lnk-order-btn sig-secondary" href="#lnk-usluge">'+c.second+'</a>'+
        '</div>';
    }
    if(art) art.innerHTML='<div class="halo"></div><img src="/lnk-digital-logo.svg?v=4" alt="LNK DIGITAL" class="hero-logo">';
  }

  function stats(){
    const s=document.querySelector('.stats'), c=t(); if(!s)return;
    s.innerHTML=c.stats.map(x=>'<div><strong>'+x[0]+'</strong><span>'+x[1]+'</span></div>').join('');
  }

  function services(){
    const sec=document.getElementById('lnk-usluge'), c=t(); if(!sec)return;
    sec.innerHTML='<div class="lnk-quick-inner">'+
      '<span class="eyebrow">'+c.servicesEy+'</span>'+
      '<h2>'+c.servicesTitle+'</h2>'+
      '<p class="lnk-services-lead">'+c.servicesLead+'</p>'+
      '<div class="lnk-quick-grid">'+c.serviceCards.map((x,i)=>
        '<article class="lnk-card">'+
          '<a class="sig-service-visual sig-service-link" href="'+x[3]+'" data-cat="'+x[4]+'" aria-label="'+x[1]+'" style="--sig-service-y:'+i+';background-image:url('+SERVICE_VISUAL+')"><span>Pogledaj primjer ↗</span></a>'+
          '<div class="sig-service-icon">'+x[0]+'</div>'+
          '<h3>'+x[1]+'</h3><p>'+x[2]+'</p>'+
          '<a class="lnk-order-btn sig-service-link" href="'+x[3]+'" data-cat="'+x[4]+'" aria-label="'+x[1]+'">Open</a>'+
        '</article>').join('')+
      '</div></div>';
  }

  function portfolio(){
    const c=t();
    let sec=document.getElementById('portfolio');
    if(!sec){
      sec=document.createElement('section'); sec.id='portfolio'; sec.className='sig-portfolio';
      const web=document.getElementById('web-stranice');
      if(web) web.before(sec); else document.getElementById('lnk-usluge')?.after(sec);
    }
    sec.innerHTML='<div class="sig-portfolio-wrap">'+
      '<div class="sig-portfolio-head"><div><span>'+c.portfolioEy+'</span><h2>'+c.portfolioTitle+'</h2><p>'+c.portfolioText+'</p></div></div>'+
      '<div class="sig-project-grid">'+PORTFOLIO.map((p,i)=>
        '<button type="button" class="sig-project-card sig-'+p[3]+'" data-lnk-preview-src="'+p[2]+'" data-lnk-preview-title="'+p[0]+'">'+
          '<div class="sig-project-browser"><div class="sig-browser-bar"><i></i><i></i><i></i></div><div class="sig-project-screen sig-project-image"><img src="'+p[2]+'" alt="'+p[0]+' — LNK DIGITAL preview" loading="lazy"></div></div>'+
          '<div class="sig-project-copy"><span>0'+(i+1)+'</span><div><h3>'+p[0]+'</h3><p>'+p[1]+'</p></div><b>'+c.portfolioBtn+' →</b></div>'+
        '</button>').join('')+
      '</div></div>';
  }

  function packages(){
    const c=t(), web=document.getElementById('web-stranice'); if(!web)return;
    const inner=web.querySelector('.lnk-quick-inner')||web;
    let grid=inner.querySelector(':scope > .lnk-quick-grid');
    if(!grid){grid=document.createElement('div');grid.className='lnk-quick-grid';inner.prepend(grid)}
    let eyebrow=inner.querySelector(':scope > .eyebrow'); if(eyebrow)eyebrow.textContent=c.packagesEy;
    let h2=inner.querySelector(':scope > h2'); if(h2)h2.textContent=c.packagesTitle;
    grid.className='lnk-quick-grid sig-package-grid';
    grid.innerHTML=c.packages.map((p,i)=>
      '<article class="lnk-card sig-package-card '+(i===1?'lnk-featured':'')+'">'+
        (i===1?'<div class="lnk-best">'+c.popular+'</div>':'')+
        '<button type="button" class="sig-package-visual" data-lnk-preview-src="'+PACKAGE_VISUALS[i]+'" data-lnk-preview-title="'+p[0]+' — LNK DIGITAL"><img src="'+PACKAGE_VISUALS[i]+'" alt="'+p[0]+' — LNK DIGITAL website preview" loading="lazy"><span>Pogledaj primjer ↗</span></button>'+
        '<div class="sig-package-top"><span class="sig-package-name">'+p[0]+'</span><div class="lnk-price">'+p[1]+'</div></div>'+
        '<ul class="sig-package-list">'+p[2].map(x=>'<li>'+x+'</li>').join('')+'</ul>'+
        '<a class="lnk-order-btn web-pick sig-package-btn" href="#web-naruci" data-package="'+p[0]+' — '+p[1]+'">'+c.choose+' →</a>'+
      '</article>').join('');
    const sel=web.querySelector('select[name="package"]');
    if(sel){
      const current=sel.value;
      sel.innerHTML=c.packages.map(p=>'<option value="'+p[0]+' — '+p[1]+'">'+p[0]+' — '+p[1]+'</option>').join('')+'<option value="Branding & Social">Branding & Social</option>';
      if([...sel.options].some(o=>o.value===current))sel.value=current;
    }
    grid.querySelectorAll('.web-pick').forEach(a=>a.onclick=()=>{
      const form=document.getElementById('web-naruci'), select=form?.querySelector('select[name="package"]');
      if(select)select.value=a.dataset.package;
    });
  }

  function desktopNav(){
    const nav=document.querySelector('.desktop-nav'), c=t(); if(!nav)return;
    nav.innerHTML=
      '<a href="#top">'+c.nav[0]+'</a>'+
      '<a href="#lnk-usluge">'+c.nav[1]+'</a>'+
      '<a href="#portfolio">'+c.nav[2]+'</a>'+
      '<a href="#o-nama">'+c.nav[3]+'</a>'+
      '<a href="https://wa.me/'+WA+'" target="_blank" rel="noopener">'+c.nav[4]+'</a>';
  }

  function mobileDock(){
    const dock=document.getElementById('lnk-mobile-dock'), c=t(); if(!dock)return;
    dock.innerHTML=
      '<a href="#top" data-key="home"><span class="dock-icon">⌂</span><span>'+c.nav[0]+'</span></a>'+
      '<a href="#lnk-usluge" data-key="services"><span class="dock-icon">▦</span><span>'+c.nav[1]+'</span></a>'+
      '<a href="#portfolio" data-key="portfolio"><span class="dock-icon">▣</span><span>'+c.nav[2]+'</span></a>'+
      '<a href="#o-nama" data-key="about"><span class="dock-icon">◉</span><span>'+c.nav[3]+'</span></a>'+
      '<a href="https://wa.me/'+WA+'" target="_blank" rel="noopener" data-key="order"><span class="dock-icon">✆</span><span>'+c.nav[4]+'</span></a>';
  }

  function bind(){
    if(document.body.dataset.sigV2Bound)return; document.body.dataset.sigV2Bound='1';
    document.addEventListener('click',e=>{
      const service=e.target.closest('.sig-service-link');
      if(service&&service.dataset.cat){e.preventDefault();category(service.dataset.cat);return}
      const smooth=e.target.closest('a[href^="#"]');
      if(smooth){
        const h=smooth.getAttribute('href');
        if(h&&h.length>1&&document.querySelector(h)){e.preventDefault();scrollToId(h)}
      }
    });
    document.getElementById('language')?.addEventListener('change',()=>setTimeout(apply,180));
  }

  function apply(){
    document.title='LNK DIGITAL';
    document.querySelectorAll('.brand img,.footer-brand img').forEach(img=>{img.src='/lnk-digital-logo.svg?v=4';img.alt='LNK DIGITAL'});
    const brand=document.querySelector('.brand span'); if(brand)brand.textContent='LNK DIGITAL';
    hero(); stats(); services(); portfolio(); packages(); desktopNav(); mobileDock();
  }

  let repairTimer;
  function repair(){
    clearTimeout(repairTimer);
    repairTimer=setTimeout(()=>{
      const broken =
        !document.getElementById('portfolio') ||
        !document.querySelector('.hero .sig-gradient') ||
        !document.querySelector('#lnk-usluge .sig-service-icon') ||
        !document.querySelector('#web-stranice .sig-package-grid') ||
        !document.querySelector('#lnk-mobile-dock a[href="#portfolio"]');
      if(broken) apply();
    },90);
  }

  function boot(){
    apply(); bind();
    // One light repair after the remaining modules finish loading.
    setTimeout(repair,420);
    const obs=new MutationObserver(()=>{
      if(
        !document.getElementById('portfolio') ||
        !document.querySelector('#lnk-usluge .sig-service-visual') ||
        !document.querySelector('#web-stranice .sig-package-grid')
      ) repair();
    });
    obs.observe(document.body,{childList:true,subtree:true});
    setTimeout(()=>obs.disconnect(),5000);
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});else boot();
})();