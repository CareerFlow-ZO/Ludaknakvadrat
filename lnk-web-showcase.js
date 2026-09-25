(() => {
  'use strict';
  if (window.__LNK_WEB_SHOWCASE) return;
  window.__LNK_WEB_SHOWCASE = true;

  const copy = {
    sr:{k:'WEB DESIGN PREVIEW',title:'Izaberi kako želiš da tvoj sajt izgleda.',desc:'Pogledaj različite Basic, Premium i VIP stilove prije narudžbe. Boje, sadržaj, fotografije i detalji se kasnije prilagođavaju tvom biznisu.',hint:'Klikni na pregled za veći prikaz',all:'Svi stilovi',basic:'Basic',premium:'Premium',vip:'VIP',view:'Veliki pregled',choose:'Izaberi dizajn',from:'od',popular:'NAJTRAŽENIJI',exclusive:'EXCLUSIVE',selected:'Dizajn je dodat u narudžbu',modal:'PREGLED DIZAJNA',note:'Ovo je vizuelni smjer. Finalni sajt se prilagođava tvojoj firmi, sadržaju i funkcijama.'},
    bs:{k:'WEB DESIGN PREVIEW',title:'Izaberi kako želiš da tvoj sajt izgleda.',desc:'Pogledaj različite Basic, Premium i VIP stilove prije narudžbe. Boje, sadržaj, fotografije i detalji se kasnije prilagođavaju tvom biznisu.',hint:'Klikni na pregled za veći prikaz',all:'Svi stilovi',basic:'Basic',premium:'Premium',vip:'VIP',view:'Veliki pregled',choose:'Izaberi dizajn',from:'od',popular:'NAJTRAŽENIJI',exclusive:'EXCLUSIVE',selected:'Dizajn je dodat u narudžbu',modal:'PREGLED DIZAJNA',note:'Ovo je vizuelni smjer. Finalni sajt se prilagođava tvojoj firmi, sadržaju i funkcijama.'},
    hr:{k:'WEB DESIGN PREVIEW',title:'Odaberi kako želiš da tvoja stranica izgleda.',desc:'Pregledaj različite Basic, Premium i VIP stilove prije narudžbe. Boje, sadržaj, fotografije i detalji kasnije se prilagođavaju tvom poslovanju.',hint:'Klikni pregled za veći prikaz',all:'Svi stilovi',basic:'Basic',premium:'Premium',vip:'VIP',view:'Veliki pregled',choose:'Odaberi dizajn',from:'od',popular:'NAJTRAŽENIJI',exclusive:'EXCLUSIVE',selected:'Dizajn je dodan u narudžbu',modal:'PREGLED DIZAJNA',note:'Ovo je vizualni smjer. Finalna stranica prilagođava se tvom poslovanju, sadržaju i funkcijama.'},
    sl:{k:'PREDOGLED SPLETNEGA DIZAJNA',title:'Izberi videz svoje spletne strani.',desc:'Pred naročilom si oglej različne Basic, Premium in VIP stile. Barve, vsebino, fotografije in podrobnosti nato prilagodimo tvojemu podjetju.',hint:'Klikni predogled za večji prikaz',all:'Vsi stili',basic:'Basic',premium:'Premium',vip:'VIP',view:'Velik predogled',choose:'Izberi dizajn',from:'od',popular:'NAJBOLJ ISKANO',exclusive:'EXCLUSIVE',selected:'Dizajn je dodan v naročilo',modal:'PREDOGLED DIZAJNA',note:'To je vizualna smer. Končna stran se prilagodi tvojemu podjetju, vsebini in funkcijam.'},
    en:{k:'WEBSITE DESIGN PREVIEW',title:'Choose how you want your website to look.',desc:'Explore Basic, Premium and VIP directions before ordering. Colors, content, images and details are customized to your business later.',hint:'Open a preview for a larger view',all:'All styles',basic:'Basic',premium:'Premium',vip:'VIP',view:'Large preview',choose:'Choose design',from:'from',popular:'MOST POPULAR',exclusive:'EXCLUSIVE',selected:'Design added to your order',modal:'DESIGN PREVIEW',note:'This is a visual direction. The final website is customized to your business, content and required features.'},
    de:{k:'WEBSITE DESIGN VORSCHAU',title:'Wähle den Look deiner Webseite.',desc:'Sieh dir Basic-, Premium- und VIP-Stile vor der Bestellung an. Farben, Inhalte, Bilder und Details werden später an dein Unternehmen angepasst.',hint:'Vorschau für größere Ansicht öffnen',all:'Alle Stile',basic:'Basic',premium:'Premium',vip:'VIP',view:'Große Vorschau',choose:'Design wählen',from:'ab',popular:'BELIEBT',exclusive:'EXCLUSIVE',selected:'Design wurde zur Bestellung hinzugefügt',modal:'DESIGN-VORSCHAU',note:'Dies ist eine visuelle Richtung. Die finale Webseite wird an dein Unternehmen, Inhalte und Funktionen angepasst.'}
  };
  for (const l of ['fr','es','it','sq','tr','mk']) copy[l]=copy.en;

  const designs = [
    {id:'basic-clean',tier:'basic',name:'Clean Start',price:'599.99€',theme:'clean',pkg:'BASIC — 599.99€',desc:{sr:'Čist, brz i jednostavan izgled za obrte, usluge i lične brendove.',sl:'Čist in hiter videz za storitve, manjša podjetja in osebne znamke.',en:'Clean, fast layout for services, small businesses and personal brands.',de:'Klarer, schneller Look für Dienstleister, kleine Firmen und Personal Brands.'},tags:['Minimal','Mobile','CTA']},
    {id:'barber-steel',tier:'basic',name:'Barber Steel',price:'599.99€',theme:'barber',pkg:'BASIC — 599.99€',desc:{sr:'Tamni barber izgled sa terminima, cjenovnikom i snažnim lokalnim identitetom.',sl:'Temen barber videz z rezervacijami, cenikom in močnim lokalnim nastopom.',en:'Dark barber direction with booking, pricing and a strong local brand.',de:'Dunkler Barber-Look mit Buchung, Preisen und starkem lokalen Auftritt.'},tags:['Barber','Booking','Dark']},
    {id:'beauty-rose',tier:'basic',name:'Beauty Rose',price:'599.99€',theme:'beauty',pkg:'BASIC — 599.99€',desc:{sr:'Elegantan beauty dizajn za salone, tretmane, galeriju i rezervacije.',sl:'Eleganten beauty dizajn za salone, tretmaje, galerijo in rezervacije.',en:'Elegant beauty design for salons, treatments, gallery and bookings.',de:'Elegantes Beauty-Design für Salons, Behandlungen, Galerie und Termine.'},tags:['Beauty','Elegant','Booking']},
    {id:'premium-modern',tier:'premium',name:'Modern Business',price:'999.99€',theme:'modern',pkg:'PREMIUM — 999.99€',popular:true,desc:{sr:'Ozbiljan moderni nastup za firme koje žele više povjerenja i jasnu prodajnu strukturu.',sl:'Sodoben poslovni nastop za več zaupanja in jasno prodajno strukturo.',en:'Modern business presence built for trust and a clear sales flow.',de:'Moderner Business-Auftritt für Vertrauen und klare Verkaufsstruktur.'},tags:['Business','Premium','Lead']},
    {id:'auto-performance',tier:'premium',name:'Auto Performance',price:'999.99€',theme:'auto',pkg:'PREMIUM — 999.99€',desc:{sr:'Premium automobilski izgled za servis, detailing, prodaju vozila i rezervacije.',sl:'Premium avtomobilski videz za servis, detailing, prodajo vozil in rezervacije.',en:'Premium automotive direction for service, detailing, sales and booking.',de:'Premium Automotive-Look für Service, Detailing, Verkauf und Buchung.'},tags:['Automotive','Service','Lead']},
    {id:'truck-industrial',tier:'premium',name:'Truck Industrial',price:'999.99€',theme:'truck',pkg:'PREMIUM — 999.99€',desc:{sr:'Industrijski stil za kamione, logistiku, servisne upite, VIN i vozni park.',sl:'Industrijski stil za tovornjake, logistiko, servisne prijave, VIN in vozni park.',en:'Industrial style for trucks, logistics, VIN, service requests and fleets.',de:'Industrie-Stil für LKW, Logistik, VIN, Serviceanfragen und Fuhrparks.'},tags:['Truck','VIN','Fleet']},
    {id:'restaurant-ember',tier:'premium',name:'Restaurant Ember',price:'999.99€',theme:'restaurant',pkg:'PREMIUM — 999.99€',desc:{sr:'Vizuelno bogat restoran dizajn sa menijem, rezervacijom i premium fotografijama.',sl:'Vizualno bogat dizajn restavracije z menijem, rezervacijami in premium fotografijami.',en:'Rich restaurant direction with menu, reservations and premium imagery.',de:'Hochwertiger Restaurant-Look mit Menü, Reservierung und starken Bildern.'},tags:['Restaurant','Menu','Reservation']},
    {id:'realestate-prime',tier:'premium',name:'Real Estate Prime',price:'999.99€',theme:'realestate',pkg:'PREMIUM — 999.99€',desc:{sr:'Čist premium prikaz nekretnina sa filtrima, lead formama i istaknutim ponudama.',sl:'Čist premium prikaz nepremičnin s filtri, lead obrazci in izpostavljeno ponudbo.',en:'Clean premium property presentation with filters, lead forms and featured listings.',de:'Premium Immobilien-Look mit Filtern, Leads und hervorgehobenen Objekten.'},tags:['Property','Lead','Premium']},
    {id:'dental-clear',tier:'premium',name:'Dental Clear',price:'999.99€',theme:'dental',pkg:'PREMIUM — 999.99€',desc:{sr:'Čist i pouzdan medicinski stil sa uslugama, timom i online terminima.',sl:'Čist in zaupanja vreden medicinski stil s storitvami, ekipo in termini.',en:'Clean, trustworthy medical direction with services, team and online booking.',de:'Klarer medizinischer Stil mit Leistungen, Team und Online-Terminen.'},tags:['Clinic','Trust','Booking']},
    {id:'fitness-energy',tier:'premium',name:'Fitness Energy',price:'999.99€',theme:'gym',pkg:'PREMIUM — 999.99€',desc:{sr:'Energičan fitness dizajn sa paketima, trenerima, rasporedom i jakim CTA elementima.',sl:'Energičen fitness dizajn s paketi, trenerji, urnikom in močnimi CTA elementi.',en:'High-energy fitness direction with plans, trainers, schedules and strong CTAs.',de:'Energiegeladener Fitness-Look mit Tarifen, Trainern, Plan und starken CTAs.'},tags:['Fitness','Membership','CTA']},
    {id:'vip-luxury',tier:'vip',name:'Luxury Signature',price:'1499.99€',theme:'luxury',pkg:'VIP — 1499.99€',exclusive:true,desc:{sr:'Luksuzan high-end izgled za ozbiljan brend, premium usluge i snažan prvi utisak.',sl:'Luksuzen high-end videz za premium znamke in močan prvi vtis.',en:'High-end luxury direction for premium brands and a powerful first impression.',de:'Luxuriöser High-End-Look für Premium-Marken und einen starken ersten Eindruck.'},tags:['Luxury','Custom','High-end']},
    {id:'vip-noir',tier:'vip',name:'Noir Motion',price:'1499.99€',theme:'noir',pkg:'VIP — 1499.99€',desc:{sr:'Odvažan VIP stil za kreativne brendove, muziku, evente, automobile i moderne projekte.',sl:'Drzen VIP stil za kreativne znamke, glasbo, dogodke, avtomobile in moderne projekte.',en:'Bold VIP direction for creative brands, music, events, automotive and modern projects.',de:'Mutiger VIP-Stil für kreative Marken, Musik, Events, Automotive und moderne Projekte.'},tags:['Dark','Motion','Creative']}
  ];

  function lang(){return document.getElementById('language')?.value || localStorage.getItem('lnkDisplayLang') || localStorage.getItem('ludakLang') || 'sr'}
  function t(){return copy[lang()] || copy.sr}
  function dtext(d){const l=lang();return d.desc[l] || d.desc.sr || d.desc.en}

  const SHOWCASE_IMAGES={
    clean:'/assets/previews/business.png?v=2',
    barber:'/assets/previews/barbershop.png?v=2',
    beauty:'/assets/previews/beauty.png?v=2',
    modern:'/assets/previews/business.png?v=2',
    auto:'/assets/previews/auto.png?v=2',
    truck:'/assets/previews/truck.png?v=2',
    restaurant:'/assets/previews/restaurant.png?v=2',
    realestate:'/assets/previews/realestate.png?v=2',
    dental:'/assets/previews/dental.png?v=2',
    gym:'/assets/previews/fitness.png?v=2',
    luxury:null,
    noir:null
  };

  function preview(d,large=false){
    const img=SHOWCASE_IMAGES[d.theme] || window.LNKVisuals?.dataUri(d.name+' • '+d.theme,'template','✦') || SHOWCASE_IMAGES.modern;
    return '<button type="button" class="wds-image-preview '+(large?'large':'')+'" data-lnk-preview-src="'+img+'" data-lnk-preview-title="'+d.name.replace(/\"/g,'&quot;')+'"><img src="'+img+'" alt="'+d.name.replace(/\"/g,'&quot;')+' — LNK DIGITAL design preview" loading="lazy"></button>';
  }

  function card(d){
    const c=t();
    return '<article class="wds-card" data-tier="'+d.tier+'" data-id="'+d.id+'">'+
      (d.popular?'<div class="wds-ribbon">'+c.popular+'</div>':d.exclusive?'<div class="wds-ribbon">'+c.exclusive+'</div>':'')+
      '<div class="wds-preview-wrap">'+preview(d)+'</div><div class="wds-card-copy"><div class="wds-meta"><span class="wds-tier">'+d.tier.toUpperCase()+'</span><span class="wds-price">'+c.from+' '+d.price+'</span></div>'+
      '<h4>'+d.name+'</h4><p>'+dtext(d)+'</p><div class="wds-tags">'+d.tags.map(x=>'<span>'+x+'</span>').join('')+'</div>'+
      '<div class="wds-actions"><button type="button" class="wds-btn wds-view" data-view="'+d.id+'">'+c.view+'</button><button type="button" class="wds-btn wds-choose" data-choose="'+d.id+'">'+c.choose+'</button></div></div></article>';
  }

  function markup(){
    const c=t();
    return '<div class="wds-head"><div><span class="wds-kicker">'+c.k+'</span><h3>'+c.title+'</h3><p>'+c.desc+'</p></div><div class="wds-hint">⌕ '+c.hint+'</div></div>'+
      '<div class="wds-filters"><button class="wds-filter active" data-filter="all">'+c.all+'</button><button class="wds-filter" data-filter="basic">'+c.basic+'</button><button class="wds-filter" data-filter="premium">'+c.premium+'</button><button class="wds-filter" data-filter="vip">'+c.vip+'</button></div>'+
      '<div class="wds-grid">'+designs.map(card).join('')+'</div>';
  }

  function ensureModal(){
    let modal=document.getElementById('wds-modal');
    if(modal) return modal;
    modal=document.createElement('div');modal.id='wds-modal';modal.className='wds-modal';modal.setAttribute('aria-hidden','true');
    modal.innerHTML='<div class="wds-modal-backdrop" data-close></div><div class="wds-modal-card" role="dialog" aria-modal="true"><div class="wds-modal-top"><div><small></small><h4></h4></div><button class="wds-close" type="button" data-close aria-label="Close">×</button></div><div class="wds-modal-preview"></div><div class="wds-modal-foot"><p></p><button type="button" class="wds-btn wds-choose wds-modal-choose"></button></div></div>';
    document.body.appendChild(modal);
    modal.addEventListener('click',e=>{const pick=e.target.closest('[data-choose]');if(pick){choose(pick.dataset.choose);return}if(e.target.closest('[data-close]')) closeModal()});
    document.addEventListener('keydown',e=>{if(e.key==='Escape'&&modal.classList.contains('open'))closeModal()});
    return modal;
  }

  function openModal(id){
    const d=designs.find(x=>x.id===id); if(!d)return;
    const c=t(), modal=ensureModal();
    modal.querySelector('.wds-modal-top small').textContent=c.modal+' • '+d.tier.toUpperCase()+' • '+c.from+' '+d.price;
    modal.querySelector('.wds-modal-top h4').textContent=d.name;
    modal.querySelector('.wds-modal-preview').innerHTML=preview(d,true);
    modal.querySelector('.wds-modal-foot p').textContent=c.note;
    const choose=modal.querySelector('.wds-modal-choose');choose.textContent=c.choose;choose.dataset.choose=d.id;
    modal.classList.add('open');modal.setAttribute('aria-hidden','false');document.body.style.overflow='hidden';
  }
  function closeModal(){const m=document.getElementById('wds-modal');if(!m)return;m.classList.remove('open');m.setAttribute('aria-hidden','true');document.body.style.overflow=''}

  function toast(msg){
    let el=document.getElementById('wds-toast');if(!el){el=document.createElement('div');el.id='wds-toast';el.className='wds-toast';document.body.appendChild(el)}
    el.textContent='✓ '+msg;el.classList.add('show');clearTimeout(window.__wdsToast);window.__wdsToast=setTimeout(()=>el.classList.remove('show'),2300);
  }

  function choose(id){
    const d=designs.find(x=>x.id===id);if(!d)return;
    const form=document.getElementById('web-naruci') || document.querySelector('#web-stranice .web-order-form');
    if(!form)return;
    const select=form.elements?.package || form.querySelector('[name="package"]');
    if(select){
      let option=[...select.options].find(o=>o.value===d.pkg);
      if(!option){option=document.createElement('option');option.value=d.pkg;option.textContent=d.pkg;select.appendChild(option)}
      select.value=d.pkg;
    }
    const details=form.elements?.details || form.querySelector('textarea');
    const line='Odabrani dizajn: '+d.name+' ('+d.tier.toUpperCase()+').';
    if(details && !details.value.includes('Odabrani dizajn:')){
      details.value=(details.value.trim()?details.value.trim()+'\n\n':'')+line;
    }
    closeModal(); toast(t().selected);
    form.classList.add('wds-form-focus');setTimeout(()=>form.classList.remove('wds-form-focus'),1600);
    const h=document.querySelector('.site-header')?.offsetHeight||70;
    const y=form.getBoundingClientRect().top+scrollY-h-14;window.scrollTo({top:y,behavior:'smooth'});
  }

  function bind(section){
    section.addEventListener('click',e=>{
      const filter=e.target.closest('[data-filter]');
      if(filter){section.querySelectorAll('.wds-filter').forEach(b=>b.classList.toggle('active',b===filter));const f=filter.dataset.filter;section.querySelectorAll('.wds-card').forEach(c=>c.hidden=f!=='all'&&c.dataset.tier!==f);return}
      const view=e.target.closest('[data-view]');if(view){openModal(view.dataset.view);return}
      const pick=e.target.closest('[data-choose]');if(pick){choose(pick.dataset.choose);return}
    });
  }

  function render(){
    const web=document.getElementById('web-stranice'); if(!web)return false;
    const inner=web.querySelector('.lnk-quick-inner')||web;
    let section=document.getElementById('web-showcase');
    if(!section){section=document.createElement('section');section.id='web-showcase';section.className='wds-showcase';const form=web.querySelector('#web-naruci');if(form)form.before(section);else inner.appendChild(section);bind(section)}
    section.innerHTML=markup();
    return true;
  }

  function boot(){
    render();ensureModal();
    document.getElementById('language')?.addEventListener('change',()=>setTimeout(render,260));
    const obs=new MutationObserver(()=>{if(!document.getElementById('web-showcase'))render()});
    obs.observe(document.body,{childList:true,subtree:true});
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot);else boot();
})();