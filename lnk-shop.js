(() => {
  'use strict';
  if (window.__LNK_SHOP_V1) return;
  window.__LNK_SHOP_V1 = true;

  const WA='38631244612';

  const COPY={
    sr:{
      kicker:'LNK DIGITAL STORE',
      title:'Digitalni proizvodi.<br>Jednom kupiš. <span class="ls-gradient">Koristiš ponovo.</span>',
      lead:'Gotovi web templateovi, personalizovani muzički pokloni i kreativni paketi za društvene mreže — bez miješanja sa cijenama custom izrade.',
      sideTitle:'Template ≠ custom web stranica',
      sideText:'Cijena u shopu je za gotov proizvod. Ako želiš potpuno prilagođenu web stranicu za svoju firmu, koristi naše Web pakete.',
      cats:[['🎵','MUSIC','Personalizovane pjesme i digitalni pokloni','music'],['🖥️','WEBSITES','Premium gotovi web dizajni','web'],['📱','CREATOR PACKS','Social media i branding paketi','social']],
      webK:'WEBSITE TEMPLATES',webT:'Premium gotovi web dizajni',webP:'Kupi gotov template ili zatraži da ga prilagodimo tvom biznisu.',
      musicK:'MUSIC & DIGITAL GIFTS',musicT:'Personalizovane pjesme i digitalni pokloni',musicP:'Pokloni koji se mogu naručiti brzo i personalizovati za posebnu osobu.',
      socialK:'SOCIAL MEDIA PACKS',socialT:'Kreativni paketi za tvoj brend',socialP:'Gotovi vizuali i branding elementi spremni za TikTok, Instagram i druge mreže.',
      demo:'Pogledaj dizajn',buy:'Naruči',custom:'Prilagodi',popular:'POPULARNO',
      benefits:[['⚡','Brza narudžba','Odaberi proizvod i pošalji upit preko WhatsAppa.'],['∞','Višekratna upotreba','Template i dizajn možeš koristiti za svoj projekat.'],['✦','Premium dizajn','Vizuelno usklađeno sa LNK DIGITAL stilom.'],['💬','Direktan kontakt','Prije kupovine možeš pitati sve što te zanima.']],
      note:'Napomena: web template je gotov dizajn/kod i nije isto što i kompletna custom izrada sajta. Hosting, domena, dodatne funkcije i prilagođavanje se dogovaraju posebno.',
      nav:'LNK Shop',
      orderText:'Pozdrav, zanima me LNK SHOP proizvod: '
    },
    bs:{},
    hr:{},
    sl:{
      kicker:'LNK DIGITAL STORE',title:'Digitalni izdelki.<br>Kupiš enkrat. <span class="ls-gradient">Uporabljaš znova.</span>',
      lead:'Pripravljene spletne predloge, personalizirana glasbena darila in kreativni paketi za družbena omrežja — ločeno od cen izdelave po meri.',
      sideTitle:'Predloga ≠ spletna stran po meri',sideText:'Cena v trgovini velja za pripravljen izdelek. Za popolnoma prilagojeno spletno stran uporabi naše spletne pakete.',
      cats:[['🎵','MUSIC','Personalizirane pesmi in digitalna darila','music'],['🖥️','WEBSITES','Premium pripravljeni spletni dizajni','web'],['📱','CREATOR PACKS','Paketi za družbena omrežja in branding','social']],
      webK:'WEBSITE TEMPLATES',webT:'Premium pripravljeni spletni dizajni',webP:'Kupi pripravljeno predlogo ali naroči prilagoditev svojemu podjetju.',
      musicK:'MUSIC & DIGITAL GIFTS',musicT:'Personalizirane pesmi in digitalna darila',musicP:'Darila, ki jih lahko hitro naročiš in prilagodiš posebni osebi.',
      socialK:'SOCIAL MEDIA PACKS',socialT:'Kreativni paketi za tvoj brand',socialP:'Pripravljeni vizuali in branding elementi za TikTok, Instagram in druga omrežja.',
      demo:'Pogledaj dizajn',buy:'Naroči',custom:'Prilagodi',popular:'POPULARNO',
      benefits:[['⚡','Hitro naročilo','Izberi izdelek in pošlji povpraševanje prek WhatsAppa.'],['∞','Večkratna uporaba','Predlogo in dizajn lahko uporabljaš za svoj projekt.'],['✦','Premium dizajn','Vizualno usklajeno s stilom LNK DIGITAL.'],['💬','Neposreden kontakt','Pred nakupom lahko vprašaš vse, kar te zanima.']],
      note:'Opomba: spletna predloga je pripravljen dizajn/koda in ni isto kot celotna izdelava spletne strani po meri. Gostovanje, domena, dodatne funkcije in prilagoditve se dogovorijo posebej.',
      nav:'LNK Shop',orderText:'Pozdravljeni, zanima me LNK SHOP izdelek: '
    },
    en:{
      kicker:'LNK DIGITAL STORE',title:'Digital products.<br>Buy once. <span class="ls-gradient">Use again.</span>',
      lead:'Ready-made website templates, personalized music gifts and creative social media packs — clearly separated from custom website pricing.',
      sideTitle:'Template ≠ custom website',sideText:'Shop pricing is for a ready-made product. For a fully customized business website, choose one of our Website packages.',
      cats:[['🎵','MUSIC','Personalized songs & digital gifts','music'],['🖥️','WEBSITES','Premium ready-made web designs','web'],['📱','CREATOR PACKS','Social media & branding packs','social']],
      webK:'WEBSITE TEMPLATES',webT:'Premium ready-made web designs',webP:'Buy the template as-is or ask us to customize it for your business.',
      musicK:'MUSIC & DIGITAL GIFTS',musicT:'Personalized songs and digital gifts',musicP:'Fast-to-order gifts personalized for someone special.',
      socialK:'SOCIAL MEDIA PACKS',socialT:'Creative packs for your brand',socialP:'Ready-made visuals and branding elements for TikTok, Instagram and more.',
      demo:'Pogledaj dizajn',buy:'Order',custom:'Customize',popular:'POPULAR',
      benefits:[['⚡','Fast ordering','Choose a product and send your inquiry on WhatsApp.'],['∞','Reusable','Use your purchased template or design for your project.'],['✦','Premium design','Built to match the LNK DIGITAL visual identity.'],['💬','Direct contact','Ask questions before ordering or purchasing.']],
      note:'Note: a website template is a ready-made design/code product and is not the same as a fully custom website build. Hosting, domain, extra functionality and customization are quoted separately.',
      nav:'LNK Shop',orderText:'Hello, I am interested in this LNK SHOP product: '
    },
    de:{
      kicker:'LNK DIGITAL STORE',title:'Digitale Produkte.<br>Einmal kaufen. <span class="ls-gradient">Mehrfach nutzen.</span>',
      lead:'Fertige Website-Templates, personalisierte Musikgeschenke und Social-Media-Pakete — klar getrennt von individuellen Website-Preisen.',
      sideTitle:'Template ≠ individuelle Website',sideText:'Der Shop-Preis gilt für ein fertiges Produkt. Für eine komplett individuelle Firmenwebsite wähle unsere Website-Pakete.',
      cats:[['🎵','MUSIC','Personalisierte Songs & digitale Geschenke','music'],['🖥️','WEBSITES','Premium fertige Webdesigns','web'],['📱','CREATOR PACKS','Social Media & Branding Pakete','social']],
      webK:'WEBSITE TEMPLATES',webT:'Premium fertige Webdesigns',webP:'Template kaufen oder individuell an dein Unternehmen anpassen lassen.',
      musicK:'MUSIC & DIGITAL GIFTS',musicT:'Personalisierte Songs und digitale Geschenke',musicP:'Schnell bestellbare Geschenke für besondere Menschen.',
      socialK:'SOCIAL MEDIA PACKS',socialT:'Kreativpakete für deine Marke',socialP:'Fertige Visuals und Branding-Elemente für TikTok, Instagram und mehr.',
      demo:'Pogledaj dizajn',buy:'Bestellen',custom:'Anpassen',popular:'BELIEBT',
      benefits:[['⚡','Schnelle Bestellung','Produkt auswählen und Anfrage per WhatsApp senden.'],['∞','Mehrfach nutzbar','Template oder Design für dein Projekt verwenden.'],['✦','Premium Design','Passend zur LNK DIGITAL Markenwelt.'],['💬','Direkter Kontakt','Fragen vor der Bestellung direkt klären.']],
      note:'Hinweis: Ein Website-Template ist ein fertiges Design-/Code-Produkt und keine vollständige individuelle Website-Erstellung. Hosting, Domain, Zusatzfunktionen und Anpassungen werden separat vereinbart.',
      nav:'LNK Shop',orderText:'Hallo, ich interessiere mich für dieses LNK SHOP Produkt: '
    }
  };
  COPY.bs=COPY.sr; COPY.hr=COPY.sr;
  for(const l of ['fr','es','it','sq','tr','mk']) COPY[l]=COPY.en;

  const webProducts=[
    {icon:'✂️',name:'Barbershop Website',desc:'Premium dark barber template sa booking prikazom i jasnim cjenovnikom.',price:'49,99 €',preset:'barber'},
    {icon:'✨',name:'Beauty Salon Website',desc:'Elegantni beauty template sa uslugama, galerijom i rezervacijom termina.',price:'49,99 €',preset:'beauty'},
    {icon:'🚘',name:'Auto Service Website',desc:'Mehaničarski premium template za servis vozila, usluge i kontakt.',price:'59,99 €',preset:'auto'},
    {icon:'🚚',name:'Truck Service Website',desc:'Industrijski VIP template za kamione, dijagnostiku, VIN i servisne upite.',price:'69,99 €',preset:'truck'},
    {icon:'🍽️',name:'Restaurant Website',desc:'Moderan restoran template sa menijem, galerijom i rezervacijama.',price:'59,99 €',preset:'restaurant'},
    {icon:'🏠',name:'Real Estate Website',desc:'Premium prikaz nekretnina sa istaknutim ponudama i lead formama.',price:'69,99 €',preset:'realestate'},
    {icon:'🦷',name:'Dental Clinic Website',desc:'Čist medicinski template za ordinaciju, usluge i online termin.',price:'69,99 €',preset:'dental'},
    {icon:'🏋️',name:'Fitness / Gym Website',desc:'Snažan fitness template za članarine, trenere, raspored i CTA.',price:'59,99 €',preset:'gym'},
    {icon:'🛒',name:'E-commerce Website',desc:'Moderni shop template sa proizvodima, kategorijama i checkout izgledom.',price:'79,99 €',preset:'ecommerce'},
    {icon:'💼',name:'Premium Business Website',desc:'Univerzalni high-end poslovni template za ozbiljan prvi utisak.',price:'79,99 €',preset:'business'}
  ];
  const musicProducts=[
    {icon:'✍️',name:'Personalizovani tekst pjesme',desc:'Originalan tekst prema tvojoj priči.',price:'19,99 €',cat:'content'},
    {icon:'🖼️',name:'Cover za pjesmu',desc:'16:9 + 9:16 vizual za YouTube i TikTok.',price:'14,99 €',cat:'video'},
    {icon:'🎬',name:'Lyric video',desc:'Video sa tekstom spreman za objavu.',price:'29,99 €',cat:'video'},
    {icon:'🎵',name:'Personalizovana pjesma + cover',desc:'Pjesma i kompletan cover paket.',price:'49,99 €',cat:'music'},
    {icon:'💿',name:'Pjesma + cover + lyric video',desc:'Kompletan paket spreman za objavu.',price:'79,99 €',cat:'music'},
    {icon:'❤️',name:'Digital Love Gift',desc:'Personalizovana pjesma + cover + QR poklon.',price:'39,99 €',featured:true,cat:'music'}
  ];
  const socialProducts=[
    {icon:'🛍️',name:'Starter Pack',desc:'10 Instagram/TikTok dizajnova spremnih za objavu.',price:'19,99 €',cat:'social'},
    {icon:'👑',name:'Business Pack',desc:'Logo + profilna + 20 objava + story dizajni.',price:'39,99 €',cat:'brand'},
    {icon:'💎',name:'Premium Branding Pack',desc:'Logo + cover + social kit + vizuelni identitet.',price:'69,99 €',cat:'brand'}
  ];

  function lang(){return document.getElementById('language')?.value || localStorage.getItem('lnkDisplayLang') || localStorage.getItem('ludakLang') || 'sr'}
  function t(){return COPY[lang()]||COPY.sr}
  function wa(product,price){return 'https://wa.me/'+WA+'?text='+encodeURIComponent(t().orderText+product+' — '+price)}
  function productPreview(p,kind){
    const category=kind==='web'?'template':(p.cat||kind);
    const title=(p.preset? p.name+' • '+p.preset.toUpperCase() : p.name);
    return window.LNKVisuals?.dataUri(title,category,p.icon) || '';
  }

  function card(p,kind){
    const c=t(), img=productPreview(p,kind), actions=[];
    actions.push('<button type="button" class="ls-btn ls-preview-open" data-lnk-preview-src="'+img+'" data-lnk-preview-title="'+p.name.replace(/\"/g,'&quot;')+'">'+c.demo+'</button>');
    actions.push('<a class="ls-btn primary" href="'+wa(p.name,p.price)+'" target="_blank" rel="noopener">'+c.buy+'</a>');
    return '<article class="ls-card'+(p.featured?' featured':'')+'">'+(p.featured?'<span class="ls-popular">'+c.popular+'</span>':'')+
      '<button type="button" class="ls-product-visual" data-lnk-preview-src="'+img+'" data-lnk-preview-title="'+p.name.replace(/\"/g,'&quot;')+'"><img src="'+img+'" alt="'+p.name.replace(/\"/g,'&quot;')+' — LNK DIGITAL preview" loading="lazy"><span>'+c.demo+' ↗</span></button>'+
      '<div class="ls-card-copy"><div class="ls-card-top-mini"><span class="ls-card-icon">'+p.icon+'</span><span class="ls-preview-badge">LNK DIGITAL</span></div>'+
      '<h4>'+p.name+'</h4><p>'+p.desc+'</p><div class="ls-price">'+p.price+'</div>'+
      '<div class="ls-actions two">'+actions.join('')+'</div></div></article>';
  }

  function markup(){
    const c=t();
    return '<div class="ls-wrap">'+
      '<div class="ls-head"><div><span class="ls-kicker">'+c.kicker+'</span><h2>'+c.title+'</h2><p>'+c.lead+'</p></div><div class="ls-head-side"><strong>'+c.sideTitle+'</strong><span>'+c.sideText+'</span></div></div>'+
      '<div class="ls-categories">'+c.cats.map((x,i)=>'<a class="ls-category" style="--ls-glow:'+(i===0?'rgba(218,65,255,.32)':i===1?'rgba(43,148,255,.34)':'rgba(93,79,255,.32)')+'" href="#lnk-shop-'+x[3]+'"><span class="ls-cat-icon">'+x[0]+'</span><span><strong>'+x[1]+'</strong><small>'+x[2]+'</small></span><span class="ls-arrow">→</span></a>').join('')+'</div>'+
      group('web',c.webK,c.webT,c.webP,webProducts)+
      group('music',c.musicK,c.musicT,c.musicP,musicProducts)+
      group('social',c.socialK,c.socialT,c.socialP,socialProducts)+
      '<div class="ls-benefits">'+c.benefits.map(b=>'<div class="ls-benefit"><i>'+b[0]+'</i><div><b>'+b[1]+'</b><span>'+b[2]+'</span></div></div>').join('')+'</div>'+
      '<div class="ls-note">'+c.note+'</div></div>';
  }
  function group(id,kicker,title,desc,items){
    return '<section class="ls-group" id="lnk-shop-'+id+'"><div class="ls-group-head"><div><span class="ls-group-kicker">'+kicker+'</span><h3>'+title+'</h3></div><p>'+desc+'</p></div><div class="ls-grid '+id+'">'+items.map(p=>card(p,id)).join('')+'</div></section>';
  }

  function ensure(){
    let sec=document.getElementById('lnk-shop');
    if(!sec){
      sec=document.createElement('section');sec.id='lnk-shop';
      const web=document.getElementById('web-stranice');
      const catalog=document.getElementById('digital-catalog');
      if(web) web.after(sec); else if(catalog) catalog.before(sec); else document.querySelector('main')?.appendChild(sec);
    }
    sec.innerHTML=markup();
    ensureNav();
  }

  function ensureNav(){
    const nav=document.querySelector('.desktop-nav');
    if(nav && !nav.querySelector('a[href="#lnk-shop"]')){
      const a=document.createElement('a');a.href='#lnk-shop';a.textContent=t().nav;
      const last=nav.lastElementChild; if(last) nav.insertBefore(a,last); else nav.appendChild(a);
    } else {
      const a=nav?.querySelector('a[href="#lnk-shop"]'); if(a) a.textContent=t().nav;
    }
  }

  function bind(){
    document.addEventListener('click',e=>{
      const a=e.target.closest('a[href^="#lnk-shop"]');
      if(!a) return;
      const target=document.querySelector(a.getAttribute('href'));
      if(!target) return;
      e.preventDefault();
      const h=document.querySelector('.site-header')?.offsetHeight||72;
      window.scrollTo({top:target.getBoundingClientRect().top+scrollY-h-12,behavior:'smooth'});
    });
    document.getElementById('language')?.addEventListener('change',()=>setTimeout(ensure,280));
    const nav=document.querySelector('.desktop-nav');
    if(nav) new MutationObserver(()=>ensureNav()).observe(nav,{childList:true});
  }

  function boot(){ensure();bind();setTimeout(ensure,500)}
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',boot); else boot();
})();