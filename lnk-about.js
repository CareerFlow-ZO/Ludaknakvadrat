(() => {
  'use strict';

  const INFO = {
    owner: 'Zemir Osmić',
    vat: 'SI12155314',
    iban: 'SI56 3300 0001 1547 065',
    bank: 'ADDIKO BANK D.D',
    address: 'Cesta Franceta Preserna 3D, 4270 Jesenice, Slovenia',
    phone: '+38631244612',
    email: 'contact@ludaknakvadrat.com'
  };

  const T = {
    sr:{nav:'O nama',eyebrow:'LNK-DIGITAL • O NAMA',title:'Digitalni partner za moderan biznis.',text:'LNK-DIGITAL pruža web, branding, marketing, SEO, AI automatizaciju, e-commerce, video, sadržaj i druge digitalne usluge na jednom mestu. Cilj nam je da svaki projekat izgleda profesionalno, radi brzo i bude spreman za rast.',owner:'Vlasnik',vat:'ID za DDV',account:'TRR / IBAN',bank:'Banka',address:'Naslov',phone:'Kontakt',email:'E-mail',company:'LNK-DIGITAL'},
    bs:{nav:'O nama',eyebrow:'LNK-DIGITAL • O NAMA',title:'Digitalni partner za moderan biznis.',text:'LNK-DIGITAL pruža web, branding, marketing, SEO, AI automatizaciju, e-commerce, video, sadržaj i druge digitalne usluge na jednom mjestu. Cilj nam je da svaki projekat izgleda profesionalno, radi brzo i bude spreman za rast.',owner:'Vlasnik',vat:'ID za PDV',account:'TRR / IBAN',bank:'Banka',address:'Adresa',phone:'Kontakt',email:'E-mail',company:'LNK-DIGITAL'},
    hr:{nav:'O nama',eyebrow:'LNK-DIGITAL • O NAMA',title:'Digitalni partner za moderan biznis.',text:'LNK-DIGITAL pruža web, branding, marketing, SEO, AI automatizaciju, e-commerce, video, sadržaj i druge digitalne usluge na jednom mjestu. Cilj nam je da svaki projekt izgleda profesionalno, radi brzo i bude spreman za rast.',owner:'Vlasnik',vat:'PDV ID',account:'TRR / IBAN',bank:'Banka',address:'Adresa',phone:'Kontakt',email:'E-mail',company:'LNK-DIGITAL'},
    sl:{nav:'O nas',eyebrow:'LNK-DIGITAL • O NAS',title:'Digitalni partner za sodobno poslovanje.',text:'LNK-DIGITAL ponuja spletne strani, branding, marketing, SEO, AI avtomatizacijo, e-trgovino, video, vsebine in druge digitalne storitve na enem mestu. Naš cilj je, da je vsak projekt profesionalen, hiter in pripravljen na rast.',owner:'Lastnik',vat:'ID za DDV',account:'TRR / IBAN',bank:'Banka',address:'Naslov',phone:'Kontakt',email:'E-pošta',company:'LNK-DIGITAL'},
    en:{nav:'About us',eyebrow:'LNK-DIGITAL • ABOUT US',title:'Your digital partner for modern business.',text:'LNK-DIGITAL provides websites, branding, marketing, SEO, AI automation, e-commerce, video, content and other digital services in one place. Our goal is to make every project look professional, perform fast and be ready to grow.',owner:'Owner',vat:'VAT ID',account:'Business account / IBAN',bank:'Bank',address:'Address',phone:'Contact',email:'Email',company:'LNK-DIGITAL'},
    de:{nav:'Über uns',eyebrow:'LNK-DIGITAL • ÜBER UNS',title:'Ihr digitaler Partner für modernes Business.',text:'LNK-DIGITAL bietet Webseiten, Branding, Marketing, SEO, KI-Automatisierung, E-Commerce, Video, Content und weitere digitale Leistungen aus einer Hand. Unser Ziel: professionelle Projekte, schnelle Performance und eine starke Basis für Wachstum.',owner:'Inhaber',vat:'USt-IdNr.',account:'Geschäftskonto / IBAN',bank:'Bank',address:'Adresse',phone:'Kontakt',email:'E-Mail',company:'LNK-DIGITAL'},
    fr:{nav:'À propos',eyebrow:'LNK-DIGITAL • À PROPOS',title:'Votre partenaire digital pour une entreprise moderne.',text:'LNK-DIGITAL propose sites web, branding, marketing, SEO, automatisation IA, e-commerce, vidéo, contenu et autres services digitaux en un seul endroit. Notre objectif est de créer des projets professionnels, rapides et prêts à évoluer.',owner:'Propriétaire',vat:'N° TVA',account:'Compte / IBAN',bank:'Banque',address:'Adresse',phone:'Contact',email:'E-mail',company:'LNK-DIGITAL'},
    es:{nav:'Sobre nosotros',eyebrow:'LNK-DIGITAL • SOBRE NOSOTROS',title:'Tu socio digital para un negocio moderno.',text:'LNK-DIGITAL ofrece páginas web, branding, marketing, SEO, automatización con IA, e-commerce, vídeo, contenido y otros servicios digitales en un solo lugar. Nuestro objetivo es crear proyectos profesionales, rápidos y preparados para crecer.',owner:'Propietario',vat:'ID de IVA',account:'Cuenta / IBAN',bank:'Banco',address:'Dirección',phone:'Contacto',email:'E-mail',company:'LNK-DIGITAL'},
    it:{nav:'Chi siamo',eyebrow:'LNK-DIGITAL • CHI SIAMO',title:'Il tuo partner digitale per un business moderno.',text:'LNK-DIGITAL offre siti web, branding, marketing, SEO, automazione AI, e-commerce, video, contenuti e altri servizi digitali in un unico posto. Il nostro obiettivo è creare progetti professionali, veloci e pronti a crescere.',owner:'Titolare',vat:'Partita IVA',account:'Conto / IBAN',bank:'Banca',address:'Indirizzo',phone:'Contatto',email:'E-mail',company:'LNK-DIGITAL'},
    sq:{nav:'Rreth nesh',eyebrow:'LNK-DIGITAL • RRETH NESH',title:'Partneri yt digjital për biznes modern.',text:'LNK-DIGITAL ofron faqe web, branding, marketing, SEO, automatizim me AI, e-commerce, video, përmbajtje dhe shërbime të tjera digjitale në një vend. Qëllimi ynë është që çdo projekt të duket profesional, të funksionojë shpejt dhe të jetë gati për rritje.',owner:'Pronari',vat:'ID e TVSH-së',account:'Llogaria / IBAN',bank:'Banka',address:'Adresa',phone:'Kontakt',email:'E-mail',company:'LNK-DIGITAL'},
    tr:{nav:'Hakkımızda',eyebrow:'LNK-DIGITAL • HAKKIMIZDA',title:'Modern işletmeler için dijital ortağınız.',text:'LNK-DIGITAL web sitesi, marka tasarımı, pazarlama, SEO, yapay zekâ otomasyonu, e-ticaret, video, içerik ve diğer dijital hizmetleri tek yerde sunar. Amacımız her projeyi profesyonel, hızlı ve büyümeye hazır hale getirmektir.',owner:'Sahibi',vat:'KDV Kimliği',account:'Hesap / IBAN',bank:'Banka',address:'Adres',phone:'İletişim',email:'E-posta',company:'LNK-DIGITAL'},
    mk:{nav:'За нас',eyebrow:'LNK-DIGITAL • ЗА НАС',title:'Ваш дигитален партнер за модерен бизнис.',text:'LNK-DIGITAL нуди веб-страници, брендинг, маркетинг, SEO, AI автоматизација, е-трговија, видео, содржина и други дигитални услуги на едно место. Нашата цел е секој проект да изгледа професионално, да работи брзо и да биде подготвен за раст.',owner:'Сопственик',vat:'ДДВ ID',account:'Сметка / IBAN',bank:'Банка',address:'Адреса',phone:'Контакт',email:'Е-пошта',company:'LNK-DIGITAL'}
  };

  function lang(){
    return document.getElementById('language')?.value || localStorage.getItem('lnkDisplayLang') || localStorage.getItem('ludakLang') || 'sr';
  }
  function tr(){ return T[lang()] || T.sr; }

  function addStyles(){
    if(document.getElementById('lnk-about-style')) return;
    const s=document.createElement('style');
    s.id='lnk-about-style';
    s.textContent=`
      #o-nama{padding:72px 7vw;background:radial-gradient(circle at 85% 20%,rgba(0,148,255,.13),transparent 32%),linear-gradient(180deg,rgba(3,10,17,.86),rgba(5,19,31,.92));border-top:1px solid rgba(67,190,255,.14);border-bottom:1px solid rgba(67,190,255,.14)}
      .about-wrap{max-width:1180px;margin:auto;display:grid;grid-template-columns:1.05fr .95fr;gap:34px;align-items:start}
      .about-copy .eyebrow{color:#50d8ff;font-size:12px;font-weight:800;letter-spacing:.12em}.about-copy h2{margin:14px 0 18px;font:900 clamp(34px,4vw,54px)/1.04 Inter,system-ui,sans-serif;letter-spacing:-.045em;color:#f4f9ff}.about-copy p{max-width:700px;color:#94aabd;font-size:16px;line-height:1.75}
      .about-card{padding:25px;border-radius:22px;background:linear-gradient(145deg,rgba(10,27,43,.96),rgba(4,12,20,.97));border:1px solid rgba(69,183,255,.22);box-shadow:0 22px 60px rgba(0,0,0,.25),0 0 50px rgba(0,135,255,.06)}
      .about-brand{display:flex;align-items:center;gap:14px;margin-bottom:20px;padding-bottom:18px;border-bottom:1px solid rgba(70,184,255,.15)}.about-mark{width:54px;height:54px;border-radius:15px;display:grid;place-items:center;background:linear-gradient(135deg,#102d45,#05101a);border:1px solid rgba(82,208,255,.42);color:#effaff;font-weight:900;box-shadow:0 0 25px rgba(0,145,255,.16)}.about-brand strong{display:block;color:#f5fbff;font-size:19px}.about-brand small{color:#56d7ff;font-size:11px;letter-spacing:.12em;font-weight:800}
      .about-details{display:grid;gap:10px}.about-row{display:grid;grid-template-columns:145px 1fr;gap:14px;padding:12px 0;border-bottom:1px solid rgba(70,184,255,.10)}.about-row:last-child{border-bottom:0}.about-row span{color:#6f8ca2;font-size:12px;font-weight:800;text-transform:uppercase;letter-spacing:.07em}.about-row b,.about-row a{color:#eaf7ff;font-size:14px;line-height:1.5;word-break:break-word}.about-row a{text-decoration:none}.about-row a:hover{color:#55d9ff}
      @media(max-width:820px){#o-nama{padding:54px 18px}.about-wrap{grid-template-columns:1fr;gap:24px}.about-card{padding:20px}.about-row{grid-template-columns:1fr;gap:5px}.about-copy h2{font-size:36px}.about-copy p{font-size:15px}}
    `;
    document.head.appendChild(s);
  }

  function ensureNav(t){
    const nav=document.querySelector('.desktop-nav');
    if(!nav) return;
    let a=nav.querySelector('a[data-lnk-about]');
    if(!a){
      a=document.createElement('a');
      a.href='#o-nama';
      a.dataset.lnkAbout='1';
      const order=nav.querySelector('a[href="#naruci"]');
      if(order) nav.insertBefore(a,order); else nav.appendChild(a);
    }
    a.textContent=t.nav;
  }

  function ensureSection(t){
    let sec=document.getElementById('o-nama');
    if(!sec){
      sec=document.createElement('section');
      sec.id='o-nama';
      const footer=document.querySelector('footer');
      if(footer) footer.before(sec); else document.body.appendChild(sec);
    }
    sec.innerHTML=`
      <div class="about-wrap">
        <div class="about-copy">
          <span class="eyebrow">${t.eyebrow}</span>
          <h2>${t.title}</h2>
          <p>${t.text}</p>
        </div>
        <div class="about-card">
          <div class="about-brand"><div class="about-mark notranslate">LNK</div><div><strong class="notranslate">${t.company}</strong><small>DIGITAL SERVICES</small></div></div>
          <div class="about-details">
            <div class="about-row"><span>${t.owner}</span><b>${INFO.owner}</b></div>
            <div class="about-row"><span>${t.vat}</span><b>${INFO.vat}</b></div>
            <div class="about-row"><span>${t.account}</span><b>${INFO.iban}</b></div>
            <div class="about-row"><span>${t.bank}</span><b>${INFO.bank}</b></div>
            <div class="about-row"><span>${t.address}</span><b>${INFO.address}</b></div>
            <div class="about-row"><span>${t.phone}</span><b><a class="notranslate" href="tel:${INFO.phone}">${INFO.phone}</a></b></div>
            <div class="about-row"><span>${t.email}</span><b><a class="notranslate" href="mailto:${INFO.email}">${INFO.email}</a></b></div>
          </div>
        </div>
      </div>`;
  }

  function apply(){
    const t=tr();
    addStyles();
    ensureNav(t);
    ensureSection(t);
  }

  function boot(){
    apply();
    document.getElementById('language')?.addEventListener('change',()=>setTimeout(apply,0));
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',boot,{once:true}); else boot();
})();
