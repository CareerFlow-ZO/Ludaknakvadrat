(() => {
  const EMAIL = 'contact@ludaknakvadrat.com';

  const UI = {
    sr: {
      eyebrow: 'LNK DIGITAL • DIGITALNI KATALOG',
      title: 'Sve digitalne usluge na jednom mestu.',
      intro: 'Od web stranice i brendinga do marketinga, SEO-a, automatizacije, videa, e-commerce rešenja i poslovne podrške. Izaberi uslugu i pošalji upit.',
      search: 'Pretraži usluge...',
      all: 'Sve',
      from: 'od',
      order: 'Naruči',
      monthly: 'Mesečni paketi',
      monthlyText: 'Za firme koje žele stalnu digitalnu podršku bez traženja više različitih izvođača.',
      formTitle: 'Naruči digitalnu uslugu',
      formText: 'Izaberi uslugu, napiši šta ti treba i pripremićemo upit za slanje e-mailom.',
      name: 'Ime i prezime', email: 'Tvoj e-mail', phone: 'Telefon / WhatsApp', company: 'Naziv firme', details: 'Opiši šta ti treba, rok i sve važne detalje', send: 'Pošalji upit',
      note: 'Prikazane cijene su početne cijene. Konačna cijena zavisi od obima, rokova, broja stranica, sadržaja, integracija i dodatnih zahtjeva.',
      noResults: 'Nema usluga za ovu pretragu.'
    },
    sl: {
      eyebrow: 'LNK DIGITAL • DIGITALNI KATALOG',
      title: 'Vse digitalne storitve na enem mestu.',
      intro: 'Od spletnih strani in brandinga do marketinga, SEO, avtomatizacije, videa, e-trgovine in poslovne podpore. Izberi storitev in pošlji povpraševanje.',
      search: 'Išči storitve...', all: 'Vse', from: 'od', order: 'Naroči', monthly: 'Mesečni paketi',
      monthlyText: 'Za podjetja, ki želijo stalno digitalno podporo na enem mestu.',
      formTitle: 'Naroči digitalno storitev', formText: 'Izberi storitev, opiši svoje potrebe in pripravi povpraševanje za e-pošto.',
      name: 'Ime in priimek', email: 'Tvoj e-mail', phone: 'Telefon / WhatsApp', company: 'Ime podjetja', details: 'Opiši, kaj potrebuješ, rok in pomembne podrobnosti', send: 'Pošlji povpraševanje',
      note: 'Prikazane cene so začetne. Končna cena je odvisna od obsega, rokov, vsebine, integracij in dodatnih zahtev.', noResults: 'Ni rezultatov.'
    },
    en: {
      eyebrow: 'LNK DIGITAL • DIGITAL CATALOG', title: 'All digital services in one place.',
      intro: 'From websites and branding to marketing, SEO, automation, video, e-commerce and business support. Choose a service and send an inquiry.',
      search: 'Search services...', all: 'All', from: 'from', order: 'Order', monthly: 'Monthly packages',
      monthlyText: 'For businesses that want ongoing digital support from one partner.',
      formTitle: 'Order a digital service', formText: 'Choose a service, describe what you need and prepare an email inquiry.',
      name: 'Full name', email: 'Your email', phone: 'Phone / WhatsApp', company: 'Company name', details: 'Describe what you need, deadline and important details', send: 'Send inquiry',
      note: 'Displayed prices are starting prices. Final pricing depends on scope, deadlines, content, integrations and additional requirements.', noResults: 'No services found.'
    },
    de: {
      eyebrow: 'LNK DIGITAL • DIGITALER KATALOG', title: 'Alle digitalen Leistungen an einem Ort.',
      intro: 'Von Webseiten und Branding bis Marketing, SEO, Automatisierung, Video, E-Commerce und Business-Support. Leistung auswählen und Anfrage senden.',
      search: 'Leistungen suchen...', all: 'Alle', from: 'ab', order: 'Bestellen', monthly: 'Monatliche Pakete',
      monthlyText: 'Für Unternehmen, die laufende digitale Unterstützung aus einer Hand möchten.',
      formTitle: 'Digitale Leistung bestellen', formText: 'Leistung auswählen, Bedarf beschreiben und E-Mail-Anfrage vorbereiten.',
      name: 'Vor- und Nachname', email: 'E-Mail', phone: 'Telefon / WhatsApp', company: 'Firmenname', details: 'Bedarf, Frist und wichtige Details beschreiben', send: 'Anfrage senden',
      note: 'Die angezeigten Preise sind Startpreise. Der Endpreis hängt von Umfang, Frist, Inhalt, Integrationen und Zusatzwünschen ab.', noResults: 'Keine Leistungen gefunden.'
    }
  };
  UI.bs = UI.sr; UI.hr = UI.sr; UI.fr = UI.en; UI.es = UI.en; UI.it = UI.en; UI.sq = UI.en;

  const CATEGORY_LABELS = {
    sr:{web:'Web',brand:'Branding',social:'Društvene mreže',marketing:'Marketing',seo:'SEO',ai:'AI & Automatizacija',shop:'E-commerce',video:'Video & Dizajn',content:'Sadržaj',career:'CV & Karijera',tech:'Tech & Integracije'},
    sl:{web:'Splet',brand:'Branding',social:'Družbena omrežja',marketing:'Marketing',seo:'SEO',ai:'AI & Avtomatizacija',shop:'E-trgovina',video:'Video & Dizajn',content:'Vsebina',career:'CV & Kariera',tech:'Tech & Integracije'},
    en:{web:'Web',brand:'Branding',social:'Social Media',marketing:'Marketing',seo:'SEO',ai:'AI & Automation',shop:'E-commerce',video:'Video & Design',content:'Content',career:'CV & Career',tech:'Tech & Integrations'},
    de:{web:'Web',brand:'Branding',social:'Social Media',marketing:'Marketing',seo:'SEO',ai:'KI & Automatisierung',shop:'E-Commerce',video:'Video & Design',content:'Content',career:'CV & Karriere',tech:'Tech & Integrationen'}
  };
  CATEGORY_LABELS.bs=CATEGORY_LABELS.sr; CATEGORY_LABELS.hr=CATEGORY_LABELS.sr; CATEGORY_LABELS.fr=CATEGORY_LABELS.en; CATEGORY_LABELS.es=CATEGORY_LABELS.en; CATEGORY_LABELS.it=CATEGORY_LABELS.en; CATEGORY_LABELS.sq=CATEGORY_LABELS.en;

  const services = [
    ['web','🌐','Landing page','299.99€'],
    ['web','🏢','Basic website do 5 stranica','599.99€'],
    ['web','💎','Premium website do 10 stranica','999.99€'],
    ['web','👑','VIP custom website do 15 stranica','1499.99€'],
    ['web','📅','Booking / rezervacioni sistem','149.99€'],
    ['web','♻️','Basic redesign postojeće web stranice','499.99€'],
    ['web','✨','Premium redesign postojeće web stranice','799.99€'],
    ['web','👑','VIP redesign postojeće web stranice','1199.99€'],
    ['web','⚡','Optimizacija brzine sajta','79.99€'],
    ['web','🌍','Dodatni jezik na sajtu','119.99€ / jezik'],
    ['web','🧰','Održavanje web stranice','39.99€ / mj'],
    ['web','🔗','Domena + DNS + poslovni e-mail setup','39.99€'],

    ['brand','✦','Logo koncept','99.99€'],
    ['brand','🎨','Logo + mini brand kit','99.99€'],
    ['brand','👑','Kompletan vizuelni identitet','199.99€'],
    ['brand','💳','Vizit karta','29.99€'],
    ['brand','📄','Flyer / poster','39.99€'],
    ['brand','📖','Cenovnik / meni / mini katalog','49.99€'],
    ['brand','📱','Social media brand kit','79.99€'],

    ['social','🖼️','10 objava za društvene mreže','79.99€'],
    ['social','🗂️','20 objava za društvene mreže','139.99€'],
    ['social','📲','10 Story predložaka','49.99€'],
    ['social','🎬','5 Reels / Shorts montaža','99.99€'],
    ['social','📆','Content kalendar','49.99€'],
    ['social','✨','Optimizacija Instagram / TikTok / FB profila','39.99€'],
    ['social','🚀','Mesečno vođenje društvenih mreža','199.99€ / mj'],

    ['marketing','📣','Meta Ads setup','99.99€'],
    ['marketing','🔎','Google Ads setup','99.99€'],
    ['marketing','📈','Vođenje reklamnih kampanja','149.99€ / mj'],
    ['marketing','✉️','Email marketing setup','69.99€'],
    ['marketing','📰','Newsletter dizajn','39.99€'],
    ['marketing','🧲','Lead generation funnel','149.99€'],
    ['marketing','✍️','Reklamni copy / ad tekst','29.99€'],

    ['seo','🔍','SEO audit','49.99€'],
    ['seo','🧭','Osnovna SEO optimizacija','149.99€'],
    ['seo','📍','Local SEO','79.99€'],
    ['seo','🏪','Google Business profil setup','99.99€'],
    ['seo','🗝️','Keyword research','39.99€'],
    ['seo','📊','Napredni SEO paket','249.99€ / mj'],

    ['ai','🤖','AI chatbot za web stranicu','149.99€'],
    ['ai','🧠','AI asistent za biznis','249.99€'],
    ['ai','💬','WhatsApp automatizacija','99.99€'],
    ['ai','📨','Email automatizacija','79.99€'],
    ['ai','⚙️','Make / Zapier automatizacija','79.99€ / workflow'],
    ['ai','🗃️','CRM setup i automatizacija','149.99€'],
    ['ai','📝','AI content paket','69.99€'],

    ['shop','🛒','Start web shop','1499.99€'],
    ['shop','🏢','Business web shop','2499.99€'],
    ['shop','👑','Premium web shop','3499.99€'],
    ['shop','💳','Online plaćanje / payment setup','59.99€'],
    ['shop','🚚','Dostava i shipping setup','59.99€'],
    ['shop','📦','Unos do 50 proizvoda','99.99€'],
    ['shop','🏷️','Opis proizvoda','4.99€ / proizvod'],
    ['shop','🛍️','Abandoned cart email setup','49.99€'],
    ['shop','🎟️','Kuponi i promo kodovi setup','39.99€'],

    ['video','🎥','Promo video do 30 sekundi','59.99€'],
    ['video','📹','Reel / Short montaža','24.99€'],
    ['video','🔤','Titlovi / subtitles','9.99€ / video'],
    ['video','🖼️','YouTube thumbnail','9.99€'],
    ['video','📢','Paket reklamnih vizuala','49.99€'],
    ['video','✨','Logo intro / jednostavna animacija','39.99€'],

    ['content','✍️','Copywriting za jednu web stranicu','29.99€'],
    ['content','📰','Blog članak','39.99€'],
    ['content','🌐','Prevod sadržaja','14.99€ / strana'],
    ['content','✅','Lektura / proofreading','9.99€ / strana'],
    ['content','📧','Poslovni e-mail tekst / template','19.99€'],
    ['content','📑','PDF ponuda / digitalna brošura','49.99€'],

    ['career','📄','Profesionalni CV','29.99€'],
    ['career','✉️','Motivaciono pismo','14.99€'],
    ['career','💼','LinkedIn profil optimizacija','29.99€'],
    ['career','🎯','CV + pismo + LinkedIn paket','59.99€'],

    ['tech','📊','Google Analytics / tracking setup','49.99€'],
    ['tech','🍪','Cookie banner osnovni setup','39.99€'],
    ['tech','🔐','Osnovni security hardening','79.99€'],
    ['tech','💾','Backup / migracija sajta','59.99€'],
    ['tech','🧩','Custom API / integracija','99.99€'],
    ['tech','📋','Admin dashboard / panel','299.99€'],
    ['tech','📱','No-code aplikacija','699.99€'],
    ['tech','🖥️','Custom web aplikacija','999.99€'],
    ['tech','🚀','SaaS MVP','1499.99€']
  ].map((x,i)=>({id:'svc-'+(i+1),cat:x[0],icon:x[1],name:x[2],price:x[3]}));

  const monthly = [
    {name:'BASIC CARE',price:'39.99€ / mj',text:'Osnovni nadzor • manje izmjene • tehnička podrška'},
    {name:'BUSINESS CARE',price:'69.99€ / mj',text:'Ažuriranja • sigurnost • manje sadržajne izmjene • podrška'},
    {name:'PREMIUM CARE',price:'119.99€ / mj',text:'Prioritetna podrška • redovne izmjene • optimizacija • nadzor web stranice'}
  ];

  const css = `
  #digital-catalog{padding:90px 7vw;background:linear-gradient(180deg,#060605,#0a0907,#060605);border-top:1px solid #241d12;border-bottom:1px solid #241d12}
  .dc-wrap{max-width:1220px;margin:auto}.dc-head{max-width:900px}.dc-head h2{font-family:Cinzel,serif;font-size:clamp(34px,5vw,62px);line-height:1.08;margin:14px 0}.dc-head p{color:#918c82;max-width:780px}
  .dc-tools{display:flex;gap:12px;align-items:center;flex-wrap:wrap;margin:30px 0 18px}.dc-search{flex:1;min-width:230px;background:#0b0a08;border:1px solid #3a2f1d;color:#fff;border-radius:12px;padding:14px 16px;font:inherit}
  .dc-filters{display:flex;gap:8px;flex-wrap:wrap;margin-bottom:24px}.dc-filter{border:1px solid #3a2f1d;background:#0b0a08;color:#b9b2a5;padding:9px 12px;border-radius:999px;cursor:pointer;font-weight:700}.dc-filter.active,.dc-filter:hover{background:#d9aa48;color:#090806;border-color:#e8c46c}
  .dc-count{color:#d9aa48;font-size:12px;font-weight:800;letter-spacing:.08em}.dc-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:14px}.dc-card{display:flex;flex-direction:column;min-height:218px;padding:22px;border:1px solid #302617;border-radius:17px;background:linear-gradient(145deg,#0f0e0b,#090907)}.dc-icon{font-size:27px}.dc-card h3{font-size:17px;margin:13px 0 7px;color:#f1eadc;line-height:1.3}.dc-cat{font-size:10px;text-transform:uppercase;letter-spacing:.1em;color:#817867}.dc-price{font-family:Cinzel,serif;color:#e2b34b;font-weight:800;font-size:21px;margin:10px 0}.dc-card .lnk-order-btn{margin-top:auto;width:100%;box-sizing:border-box}
  .dc-note{margin-top:18px;padding:14px 17px;border:1px solid #302617;border-radius:12px;background:#0b0a08;color:#8f887c;font-size:12px}.dc-empty{padding:30px;text-align:center;color:#8f887c;border:1px dashed #3a2f1d;border-radius:14px;grid-column:1/-1}
  .dc-monthly{margin-top:65px}.dc-monthly h3{font-family:Cinzel,serif;font-size:34px;margin-bottom:8px}.dc-monthly>p{color:#918c82}.dc-monthly-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:14px;margin-top:24px}.dc-monthly-card{padding:26px;border:1px solid #3a2d17;border-radius:18px;background:#0d0c09}.dc-monthly-card h4{color:#e2b34b;font-size:18px}.dc-monthly-card .dc-price{font-size:26px}.dc-monthly-card p{color:#918c82;min-height:70px}
  .dc-form{max-width:900px;margin:65px auto 0;padding:30px;border:1px solid #3a2d17;border-radius:22px;background:#0d0c09}.dc-form h3{font-size:30px;margin-bottom:7px}.dc-form>p{color:#918c82}.dc-form-grid{display:grid;grid-template-columns:1fr 1fr;gap:14px;margin-top:22px}.dc-form input,.dc-form select,.dc-form textarea{width:100%;background:#080806;color:#fff;border:1px solid #3a3020;border-radius:12px;padding:14px;font:inherit;box-sizing:border-box}.dc-form textarea{min-height:135px;resize:vertical}.dc-full{grid-column:1/-1}.dc-status{margin-top:12px;color:#e2b34b}
  @media(max-width:1050px){.dc-grid{grid-template-columns:repeat(3,1fr)}}@media(max-width:800px){.dc-grid{grid-template-columns:repeat(2,1fr)}.dc-monthly-grid{grid-template-columns:1fr}}
  @media(max-width:560px){#digital-catalog{padding:70px 20px}.dc-grid,.dc-form-grid{grid-template-columns:1fr}.dc-full{grid-column:auto}.dc-tools{align-items:stretch}.dc-search{width:100%}}
  `;

  if(!document.getElementById('dc-styles')){
    const style=document.createElement('style'); style.id='dc-styles'; style.textContent=css; document.head.appendChild(style);
  }

  let activeCat='all';
  let query='';
  let selectedService='';

  function lang(){ return document.getElementById('language')?.value || 'sr'; }
  function txt(){ return UI[lang()] || UI.sr; }
  function cats(){ return CATEGORY_LABELS[lang()] || CATEGORY_LABELS.sr; }
  function catLabel(key){ return cats()[key] || key; }

  function ensureSection(){
    let section=document.getElementById('digital-catalog');
    if(!section){
      section=document.createElement('section'); section.id='digital-catalog';
      const web=document.getElementById('web-stranice');
      if(web) web.after(section); else document.querySelector('.stats')?.before(section);
    }
    return section;
  }

  function selectOptions(){
    const grouped={}; services.forEach(s=>(grouped[s.cat]??=[]).push(s));
    let html='';
    Object.keys(grouped).forEach(cat=>{
      html+=`<optgroup label="${catLabel(cat)}">`;
      grouped[cat].forEach(s=>html+=`<option value="${s.name} — ${s.price}">${s.name} — ${s.price}</option>`);
      html+='</optgroup>';
    });
    monthly.forEach(m=>html+=`<option value="${m.name} — ${m.price}">${m.name} — ${m.price}</option>`);
    return html;
  }

  function card(s,t){
    return `<article class="dc-card" data-cat="${s.cat}" data-search="${(s.name+' '+catLabel(s.cat)).toLowerCase()}"><div class="dc-icon">${s.icon}</div><span class="dc-cat">${catLabel(s.cat)}</span><h3>${s.name}</h3><div class="dc-price">${t.from} ${s.price}</div><a class="lnk-order-btn dc-order" href="#digital-order" data-service="${s.name} — ${s.price}">${t.order}</a></article>`;
  }

  function renderCards(){
    const grid=document.querySelector('#digital-catalog .dc-grid'); if(!grid) return;
    const t=txt();
    const filtered=services.filter(s=>(activeCat==='all'||s.cat===activeCat)&&(!query||(s.name+' '+catLabel(s.cat)).toLowerCase().includes(query)));
    grid.innerHTML=filtered.length?filtered.map(s=>card(s,t)).join(''):`<div class="dc-empty">${t.noResults}</div>`;
    const count=document.querySelector('#digital-catalog .dc-count'); if(count) count.textContent=`${filtered.length} / ${services.length}`;
    document.querySelectorAll('.dc-order').forEach(a=>a.onclick=()=>pick(a.dataset.service));
  }

  function pick(value){
    selectedService=value;
    const form=document.getElementById('digital-order');
    if(form){ form.elements.service.value=value; setTimeout(()=>form.scrollIntoView({behavior:'smooth',block:'center'}),50); }
  }

  function render(){
    const t=txt(), c=cats(); const section=ensureSection();
    section.innerHTML=`<div class="dc-wrap"><div class="dc-head"><span class="eyebrow">${t.eyebrow}</span><h2>${t.title}</h2><p>${t.intro}</p></div>
      <div class="dc-tools"><input class="dc-search" type="search" placeholder="${t.search}" value="${query.replace(/"/g,'&quot;')}"><span class="dc-count"></span></div>
      <div class="dc-filters"><button class="dc-filter ${activeCat==='all'?'active':''}" data-cat="all">${t.all}</button>${Object.keys(c).map(k=>`<button class="dc-filter ${activeCat===k?'active':''}" data-cat="${k}">${c[k]}</button>`).join('')}</div>
      <div class="dc-grid"></div><div class="dc-note">ℹ️ ${t.note}</div>
      <div class="dc-monthly"><h3>${t.monthly}</h3><p>${t.monthlyText}</p><div class="dc-monthly-grid">${monthly.map(m=>`<div class="dc-monthly-card"><h4>${m.name}</h4><div class="dc-price">${t.from} ${m.price}</div><p>${m.text}</p><a class="lnk-order-btn dc-month-order" href="#digital-order" data-service="${m.name} — ${m.price}">${t.order}</a></div>`).join('')}</div></div>
      <form id="digital-order" class="dc-form"><h3>${t.formTitle}</h3><p>${t.formText}</p><div class="dc-form-grid"><input required name="name" placeholder="${t.name}"><input required type="email" name="email" placeholder="${t.email}"><input name="phone" placeholder="${t.phone}"><input name="company" placeholder="${t.company}"><select class="dc-full" required name="service">${selectOptions()}</select><textarea class="dc-full" required name="details" placeholder="${t.details}"></textarea><button class="lnk-order-btn dc-full" type="submit">✉️ ${t.send}</button></div><div class="dc-status" aria-live="polite"></div></form></div>`;

    const nav=document.querySelector('.desktop-nav');
    if(nav){ const links=nav.querySelectorAll('a'); if(links[2]) links[2].href='#digital-catalog'; }

    const search=section.querySelector('.dc-search'); search.oninput=()=>{query=search.value.trim().toLowerCase(); renderCards();};
    section.querySelectorAll('.dc-filter').forEach(b=>b.onclick=()=>{activeCat=b.dataset.cat; section.querySelectorAll('.dc-filter').forEach(x=>x.classList.toggle('active',x===b)); renderCards();});
    section.querySelectorAll('.dc-month-order').forEach(a=>a.onclick=()=>pick(a.dataset.service));
    const form=document.getElementById('digital-order');
    if(selectedService) form.elements.service.value=selectedService;
    form.onsubmit=e=>{
      e.preventDefault(); const d=new FormData(form); const service=d.get('service');
      const subject=`LNK DIGITAL — Upit: ${service}`;
      const body=`LNK DIGITAL — nova digitalna narudžba\n\nUsluga: ${service}\nIme: ${d.get('name')}\nE-mail: ${d.get('email')}\nTelefon / WhatsApp: ${d.get('phone')||'-'}\nFirma: ${d.get('company')||'-'}\n\nDetalji:\n${d.get('details')}`;
      window.location.href=`mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      const status=form.querySelector('.dc-status'); if(status) status.textContent=t.formText;
    };
    renderCards();
  }

  function boot(){
    render();
    const language=document.getElementById('language'); if(language) language.addEventListener('change',()=>setTimeout(render,0));
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',boot); else boot();
})();