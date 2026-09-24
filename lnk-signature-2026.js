(() => {
  'use strict';
  if (window.__LNK_SIGNATURE_2026) return;
  window.__LNK_SIGNATURE_2026 = true;

  const WA='38631244612';
  const COPY={
    sl:{
      eyebrow:'LNK DIGITAL',
      title:'Vse digitalne<br>storitve na <span class="sig-gradient">enem mestu.</span>',
      text:'Celoten digitalni nastop za uspešno in prepoznavno blagovno znamko. Strategija, dizajn in rešitve, ki pomagajo tvojemu poslu rasti.',
      cta:'Začni svoj projekt',
      second:'Poglej storitve',
      trust:['SEO pripravljeno','Hiter kontakt','Premium dizajn'],
      stats:[['100%','po meri'],['SEO','pripravljeno'],['1:1','podpora'],['∞','možnosti']],
      servicesEy:'NAŠE STORITVE',
      servicesTitle:'Strategija. Dizajn. Rezultati.',
      servicesLead:'Vse, kar potrebuješ za močno spletno prisotnost — na enem mestu.',
      serviceCards:[
        ['🖥️','Spletne strani','Moderne, hitre in SEO pripravljene spletne strani.','#web-stranice',''],
        ['📈','Digitalni marketing','Več obiska, več povpraševanj in merljivi rezultati.','#digital-catalog','marketing'],
        ['✦','Branding','Celostna grafična podoba in vizualna identiteta, ki izstopa.','#digital-catalog','brand'],
        ['AI','AI rešitve','Avtomatizacija, AI orodja in rešitve za večjo učinkovitost.','#digital-catalog','ai']
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
      nav:['Početna','Usluge','Portfolio','O nama','WhatsApp']
    },
    bs:null,hr:null,
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
    if(art){
      art.innerHTML='<div class="halo"></div><img src="/lnk-digital-logo.svg?v=3" alt="LNK DIGITAL" class="hero-logo">';
    }
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
          '<div class="sig-service-icon">'+x[0]+'</div>'+
          '<h3>'+x[1]+'</h3><p>'+x[2]+'</p>'+
          '<a class="lnk-order-btn sig-service-link" href="'+x[3]+'" data-cat="'+x[4]+'" aria-label="'+x[1]+'">Open</a>'+
        '</article>').join('')+
      '</div></div>';
  }

  function desktopNav(){
    const nav=document.querySelector('.desktop-nav'), c=t(); if(!nav)return;
    nav.innerHTML=
      '<a href="#top">'+c.nav[0]+'</a>'+
      '<a href="#lnk-usluge">'+c.nav[1]+'</a>'+
      '<a href="#web-showcase">'+c.nav[2]+'</a>'+
      '<a href="#o-nama">'+c.nav[3]+'</a>'+
      '<a href="https://wa.me/'+WA+'" target="_blank" rel="noopener">'+c.nav[4]+'</a>';
  }

  function mobileDock(){
    const dock=document.getElementById('lnk-mobile-dock'), c=t(); if(!dock)return;
    dock.innerHTML=
      '<a href="#top" data-key="home"><span class="dock-icon">⌂</span><span>'+c.nav[0]+'</span></a>'+
      '<a href="#lnk-usluge" data-key="services"><span class="dock-icon">▦</span><span>'+c.nav[1]+'</span></a>'+
      '<a href="#web-showcase" data-key="portfolio"><span class="dock-icon">▣</span><span>'+c.nav[2]+'</span></a>'+
      '<a href="#o-nama" data-key="about"><span class="dock-icon">◉</span><span>'+c.nav[3]+'</span></a>'+
      '<a href="https://wa.me/'+WA+'" target="_blank" rel="noopener" data-key="order"><span class="dock-icon">✆</span><span>'+c.nav[4]+'</span></a>';
  }

  function bind(){
    if(document.body.dataset.sigBound)return; document.body.dataset.sigBound='1';
    document.addEventListener('click',e=>{
      const a=e.target.closest('.sig-service-link');
      if(a&&a.dataset.cat){e.preventDefault();category(a.dataset.cat);return}
      const smooth=e.target.closest('a[href^="#"]');
      if(smooth){
        const h=smooth.getAttribute('href');
        if(h&&h.length>1&&document.querySelector(h)){e.preventDefault();scrollToId(h)}
      }
    });
    document.getElementById('language')?.addEventListener('change',()=>setTimeout(apply,350));
  }

  function apply(){
    document.title='LNK DIGITAL';
    document.querySelectorAll('.brand img,.footer-brand img').forEach(img=>{img.src='/lnk-digital-logo.svg?v=3';img.alt='LNK DIGITAL'});
    const brand=document.querySelector('.brand span'); if(brand)brand.textContent='LNK DIGITAL';
    hero(); stats(); services(); desktopNav(); mobileDock();
  }

  function boot(){
    apply();bind();
    setTimeout(apply,250);
    setTimeout(apply,900);
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});else boot();
})();