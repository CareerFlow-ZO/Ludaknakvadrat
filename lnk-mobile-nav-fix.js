(() => {
  'use strict';
  if(window.__LNK_MOBILE_NAV_FIX_V1) return;
  window.__LNK_MOBILE_NAV_FIX_V1=true;
  const WA='38631244612';

  const COPY={
    sr:{menu:'MENI',all:'Sve na jednom mjestu',home:'Početna',services:'Usluge',catalog:'Sve usluge',portfolio:'Portfolio',web:'Web paketi',shop:'LNK Shop',songs:'Pjesme',about:'O nama',order:'Započni projekat',wa:'WhatsApp',
      subs:['Vrh stranice','Glavne usluge','Digitalni katalog','Naši radovi','Izrada web stranica','Digitalni proizvodi','Personalizovane pjesme','Ko smo mi']},
    bs:{menu:'MENI',all:'Sve na jednom mjestu',home:'Početna',services:'Usluge',catalog:'Sve usluge',portfolio:'Portfolio',web:'Web paketi',shop:'LNK Shop',songs:'Pjesme',about:'O nama',order:'Započni projekat',wa:'WhatsApp',
      subs:['Vrh stranice','Glavne usluge','Digitalni katalog','Naši radovi','Izrada web stranica','Digitalni proizvodi','Personalizovane pjesme','Ko smo mi']},
    hr:{menu:'IZBORNIK',all:'Sve na jednom mjestu',home:'Početna',services:'Usluge',catalog:'Sve usluge',portfolio:'Portfolio',web:'Web paketi',shop:'LNK Shop',songs:'Pjesme',about:'O nama',order:'Započni projekt',wa:'WhatsApp',
      subs:['Vrh stranice','Glavne usluge','Digitalni katalog','Naši radovi','Izrada web stranica','Digitalni proizvodi','Personalizirane pjesme','O nama']},
    sl:{menu:'MENI',all:'Vse na enem mestu',home:'Domov',services:'Storitve',catalog:'Vse storitve',portfolio:'Portfolio',web:'Spletni paketi',shop:'LNK Shop',songs:'Pesmi',about:'O nas',order:'Začni projekt',wa:'WhatsApp',
      subs:['Vrh strani','Glavne storitve','Digitalni katalog','Naši projekti','Izdelava spletnih strani','Digitalni izdelki','Personalizirane pesmi','Kdo smo']},
    en:{menu:'MENU',all:'Everything in one place',home:'Home',services:'Services',catalog:'All services',portfolio:'Portfolio',web:'Website packages',shop:'LNK Shop',songs:'Songs',about:'About',order:'Start your project',wa:'WhatsApp',
      subs:['Back to top','Main services','Digital catalog','Our work','Website builds','Digital products','Personalized songs','Who we are']},
    de:{menu:'MENÜ',all:'Alles an einem Ort',home:'Start',services:'Leistungen',catalog:'Alle Leistungen',portfolio:'Portfolio',web:'Web-Pakete',shop:'LNK Shop',songs:'Songs',about:'Über uns',order:'Projekt starten',wa:'WhatsApp',
      subs:['Nach oben','Hauptleistungen','Digitaler Katalog','Unsere Arbeiten','Website-Erstellung','Digitale Produkte','Personalisierte Songs','Über uns']}
  };
  for(const l of ['fr','es','it','sq','tr','mk']) COPY[l]=COPY.en;

  function lang(){return document.getElementById('language')?.value||localStorage.getItem('lnkDisplayLang')||localStorage.getItem('ludakLang')||'sr'}
  function t(){return COPY[lang()]||COPY.sr}

  function link(icon,label,sub,href,cls=''){
    return '<a class="lnk-mm-link '+cls+'" href="'+href+'"><i>'+icon+'</i><span>'+label+'<small>'+sub+'</small></span></a>';
  }
  function markup(){
    const c=t(),s=c.subs;
    return '<div class="lnk-mm-head"><div><span>LNK DIGITAL</span><strong>'+c.menu+' · '+c.all+'</strong></div><button class="lnk-mm-close" type="button" aria-label="Close menu">×</button></div>'+
      '<div class="lnk-mm-grid">'+
      link('⌂',c.home,s[0],'#top')+
      link('▦',c.services,s[1],'#lnk-usluge')+
      link('⌕',c.catalog,s[2],'#digital-catalog')+
      link('▣',c.portfolio,s[3],'#portfolio')+
      link('🌐',c.web,s[4],'#web-stranice')+
      link('✦',c.shop,s[5],'#lnk-shop','shop')+
      link('♫',c.songs,s[6],'#cenovnik')+
      link('◉',c.about,s[7],'#o-nama')+
      '<a class="lnk-mm-link order" href="#web-naruci">✦ '+c.order+' →</a>'+
      '<a class="lnk-mm-link whatsapp" href="https://wa.me/'+WA+'" target="_blank" rel="noopener">◉ '+c.wa+'</a>'+
      '</div>';
  }

  function ensurePanel(){
    let p=document.getElementById('lnk-mobile-menu-panel');
    if(!p){p=document.createElement('nav');p.id='lnk-mobile-menu-panel';p.setAttribute('aria-label','Mobile menu');document.body.appendChild(p)}
    const wasOpen=p.classList.contains('open');
    p.innerHTML=markup();
    if(wasOpen)p.classList.add('open');
    return p;
  }
  function close(){
    document.getElementById('lnk-mobile-menu-panel')?.classList.remove('open');
    document.body.classList.remove('lnk-menu-open');
    document.querySelector('.desktop-nav')?.classList.remove('mobile-open');
    document.getElementById('menuToggle')?.setAttribute('aria-expanded','false');
  }
  function open(){
    const p=ensurePanel();p.classList.add('open');
    document.body.classList.add('lnk-menu-open');
    document.querySelector('.desktop-nav')?.classList.remove('mobile-open');
    document.getElementById('menuToggle')?.setAttribute('aria-expanded','true');
  }
  function scrollToTarget(hash){
    let el=document.querySelector(hash);
    if(!el && hash==='#web-naruci') el=document.querySelector('#web-stranice .web-order-form')||document.getElementById('digital-order');
    if(!el && hash==='#lnk-shop') el=document.getElementById('digital-catalog');
    if(!el) return false;
    const h=document.querySelector('.site-header')?.offsetHeight||76;
    window.scrollTo({top:Math.max(0,el.getBoundingClientRect().top+scrollY-h-18),behavior:'smooth'});
    return true;
  }
  function patchHero(){
    const btn=document.querySelector('.hero .sig-primary')||document.querySelector('.hero-buttons .lnk-order-btn:first-child');
    if(btn){btn.setAttribute('href','#web-naruci');btn.dataset.lnkStartProject='1'}
  }

  function bind(){
    const toggle=document.getElementById('menuToggle');
    if(toggle && !toggle.dataset.lnkMenuFix){
      toggle.dataset.lnkMenuFix='1';
      toggle.setAttribute('aria-expanded','false');
      toggle.addEventListener('click',e=>{
        if(innerWidth>950)return;
        e.preventDefault();e.stopImmediatePropagation();
        const p=ensurePanel();
        p.classList.contains('open')?close():open();
      },true);
    }

    document.addEventListener('click',e=>{
      if(e.target.closest('.lnk-mm-close')){e.preventDefault();close();return}
      const start=e.target.closest('[data-lnk-start-project],.hero .sig-primary');
      if(start){
        e.preventDefault();
        if(!scrollToTarget('#web-naruci')) window.open('https://wa.me/'+WA,'_blank','noopener');
        close();return;
      }
      const a=e.target.closest('#lnk-mobile-menu-panel a[href^="#"]');
      if(a){
        e.preventDefault();
        const hash=a.getAttribute('href');
        close();
        setTimeout(()=>scrollToTarget(hash),40);
      }
    },true);

    document.addEventListener('keydown',e=>{if(e.key==='Escape')close()});
    document.getElementById('language')?.addEventListener('change',()=>setTimeout(()=>{ensurePanel();patchHero()},260));
    addEventListener('resize',()=>{if(innerWidth>950)close()},{passive:true});
  }

  function repair(){
    patchHero();
    document.querySelector('.desktop-nav')?.classList.remove('mobile-open');
  }
  function boot(){
    ensurePanel();patchHero();bind();repair();
    setTimeout(repair,500);
    const obs=new MutationObserver(()=>{
      if(!document.getElementById('lnk-mobile-menu-panel')) ensurePanel();
    });
    obs.observe(document.body,{childList:true,subtree:true});
    setTimeout(()=>obs.disconnect(),5000);
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});else boot();
})();