(() => {
  'use strict';

  const COPY = {
    sr:{ey:'LNK DIGITAL • WEB • MARKETING • AI • KREATIVA',title:'Digitalna rešenja za biznis koji želi više.',desc:'Web stranice, branding, marketing, SEO, AI automatizacija, video, društvene mreže, e-commerce i kreativne usluge — sve na jednom mestu.',services:'Pogledaj sve usluge',quote:'Pošalji upit',web:'Web paketi',song:'Personalizovane pesme',order:'Naruči uslugu',float:'Web • Branding • Marketing • AI',floatSub:'Kompletan digitalni nastup na jednom mestu.',stats:['70+','digitalnih usluga','31+','jezika','100%','online usluga','24–48h','brza izrada']},
    bs:{ey:'LNK DIGITAL • WEB • MARKETING • AI • KREATIVA',title:'Digitalna rješenja za biznis koji želi više.',desc:'Web stranice, branding, marketing, SEO, AI automatizacija, video, društvene mreže, e-commerce i kreativne usluge — sve na jednom mjestu.',services:'Pogledaj sve usluge',quote:'Pošalji upit',web:'Web paketi',song:'Personalizovane pjesme',order:'Naruči uslugu',float:'Web • Branding • Marketing • AI',floatSub:'Kompletan digitalni nastup na jednom mjestu.',stats:['70+','digitalnih usluga','31+','jezika','100%','online usluga','24–48h','brza izrada']},
    hr:{ey:'LNK DIGITAL • WEB • MARKETING • AI • KREATIVA',title:'Digitalna rješenja za poslovanje koje želi više.',desc:'Web stranice, branding, marketing, SEO, AI automatizacija, video, društvene mreže, e-commerce i kreativne usluge — sve na jednom mjestu.',services:'Pogledaj sve usluge',quote:'Pošalji upit',web:'Web paketi',song:'Personalizirane pjesme',order:'Naruči uslugu',float:'Web • Branding • Marketing • AI',floatSub:'Kompletan digitalni nastup na jednom mjestu.',stats:['70+','digitalnih usluga','31+','jezika','100%','online usluga','24–48h','brza izrada']},
    sl:{ey:'LNK DIGITAL • SPLET • MARKETING • AI • KREATIVA',title:'Digitalne rešitve za podjetja, ki želijo več.',desc:'Spletne strani, branding, marketing, SEO, AI avtomatizacija, video, družbena omrežja, e-trgovina in kreativne storitve — vse na enem mestu.',services:'Poglej vse storitve',quote:'Pošlji povpraševanje',web:'Spletni paketi',song:'Personalizirane pesmi',order:'Naroči storitev',float:'Splet • Branding • Marketing • AI',floatSub:'Celoten digitalni nastop na enem mestu.',stats:['70+','digitalnih storitev','31+','jezikov','100%','spletno','24–48h','hitra izvedba']},
    en:{ey:'LNK DIGITAL • WEB • MARKETING • AI • CREATIVE',title:'Digital solutions for businesses that want more.',desc:'Websites, branding, marketing, SEO, AI automation, video, social media, e-commerce and creative services — all in one place.',services:'Explore all services',quote:'Send an inquiry',web:'Website packages',song:'Personalized songs',order:'Order a service',float:'Web • Branding • Marketing • AI',floatSub:'Your complete digital presence in one place.',stats:['70+','digital services','31+','languages','100%','online service','24–48h','fast delivery']},
    de:{ey:'LNK DIGITAL • WEB • MARKETING • KI • KREATIV',title:'Digitale Lösungen für Unternehmen mit mehr Anspruch.',desc:'Webseiten, Branding, Marketing, SEO, KI-Automatisierung, Video, Social Media, E-Commerce und kreative Services — alles aus einer Hand.',services:'Alle Leistungen ansehen',quote:'Anfrage senden',web:'Web-Pakete',song:'Personalisierte Songs',order:'Leistung bestellen',float:'Web • Branding • Marketing • KI',floatSub:'Der komplette digitale Auftritt aus einer Hand.',stats:['70+','digitale Leistungen','31+','Sprachen','100%','online','24–48h','schnelle Umsetzung']},
    fr:{ey:'LNK DIGITAL • WEB • MARKETING • IA • CRÉATIF',title:'Des solutions numériques pour les entreprises ambitieuses.',desc:'Sites web, branding, marketing, SEO, automatisation IA, vidéo, réseaux sociaux, e-commerce et services créatifs — au même endroit.',services:'Voir tous les services',quote:'Envoyer une demande',web:'Packs web',song:'Chansons personnalisées',order:'Commander un service',float:'Web • Branding • Marketing • IA',floatSub:'Toute votre présence numérique au même endroit.',stats:['70+','services numériques','31+','langues','100%','en ligne','24–48h','livraison rapide']},
    es:{ey:'LNK DIGITAL • WEB • MARKETING • IA • CREATIVO',title:'Soluciones digitales para negocios que quieren más.',desc:'Web, branding, marketing, SEO, automatización con IA, vídeo, redes sociales, e-commerce y servicios creativos — todo en un solo lugar.',services:'Ver todos los servicios',quote:'Enviar consulta',web:'Paquetes web',song:'Canciones personalizadas',order:'Pedir un servicio',float:'Web • Branding • Marketing • IA',floatSub:'Toda tu presencia digital en un solo lugar.',stats:['70+','servicios digitales','31+','idiomas','100%','online','24–48h','entrega rápida']},
    it:{ey:'LNK DIGITAL • WEB • MARKETING • AI • CREATIVITÀ',title:'Soluzioni digitali per aziende che vogliono di più.',desc:'Siti web, branding, marketing, SEO, automazione AI, video, social media, e-commerce e servizi creativi — tutto in un unico posto.',services:'Vedi tutti i servizi',quote:'Invia una richiesta',web:'Pacchetti web',song:'Canzoni personalizzate',order:'Ordina un servizio',float:'Web • Branding • Marketing • AI',floatSub:'La tua presenza digitale completa in un unico posto.',stats:['70+','servizi digitali','31+','lingue','100%','online','24–48h','consegna rapida']},
    sq:{ey:'LNK DIGITAL • WEB • MARKETING • AI • KREATIV',title:'Zgjidhje digjitale për biznese që duan më shumë.',desc:'Faqe web, branding, marketing, SEO, automatizim AI, video, rrjete sociale, e-commerce dhe shërbime kreative — të gjitha në një vend.',services:'Shiko të gjitha shërbimet',quote:'Dërgo kërkesë',web:'Paketat web',song:'Këngë të personalizuara',order:'Porosit shërbim',float:'Web • Branding • Marketing • AI',floatSub:'Prania jote e plotë digjitale në një vend.',stats:['70+','shërbime digjitale','31+','gjuhë','100%','online','24–48h','dorëzim i shpejtë']},
    tr:{ey:'LNK DIGITAL • WEB • PAZARLAMA • AI • KREATİF',title:'Daha fazlasını isteyen işletmeler için dijital çözümler.',desc:'Web siteleri, marka, pazarlama, SEO, AI otomasyonu, video, sosyal medya, e-ticaret ve kreatif hizmetler — hepsi tek yerde.',services:'Tüm hizmetleri gör',quote:'Talep gönder',web:'Web paketleri',song:'Kişiye özel şarkılar',order:'Hizmet sipariş et',float:'Web • Marka • Pazarlama • AI',floatSub:'Tüm dijital varlığın tek yerde.',stats:['70+','dijital hizmet','31+','dil','100%','online','24–48h','hızlı teslimat']},
    mk:{ey:'LNK DIGITAL • ВЕБ • МАРКЕТИНГ • AI • КРЕАТИВА',title:'Дигитални решенија за бизниси што сакаат повеќе.',desc:'Веб страници, брендинг, маркетинг, SEO, AI автоматизација, видео, социјални мрежи, e-commerce и креативни услуги — сè на едно место.',services:'Види ги сите услуги',quote:'Испрати барање',web:'Веб пакети',song:'Персонализирани песни',order:'Нарачај услуга',float:'Веб • Брендинг • Маркетинг • AI',floatSub:'Комплетен дигитален настап на едно место.',stats:['70+','дигитални услуги','31+','јазици','100%','онлајн','24–48h','брза изработка']}
  };

  function currentLang(){ return document.getElementById('language')?.value || localStorage.getItem('ludakLang') || 'sr'; }
  function copy(){ return COPY[currentLang()] || COPY.sr; }

  function apply(){
    const t=copy();
    document.title='LNK DIGITAL — Web, branding, marketing, AI i digitalne usluge';
    const meta=document.querySelector('meta[name="description"]');
    if(meta) meta.content='LNK DIGITAL — web stranice, branding, marketing, SEO, AI automatizacija, video, društvene mreže, e-commerce i kreativne digitalne usluge.';

    const nav=document.querySelector('.desktop-nav');
    if(nav) nav.innerHTML=`<a href="#lnk-usluge">${t.services}</a><a href="#web-stranice">${t.web}</a><a href="#digital-catalog">Digital</a><a href="#cenovnik">${t.song}</a>`;

    const headerBtn=document.querySelector('.header-actions .btn,.header-actions .lnk-order-btn');
    if(headerBtn){ headerBtn.textContent=t.order; headerBtn.href='#digital-order'; headerBtn.removeAttribute('data-i18n'); }

    const hero=document.querySelector('.hero-copy');
    if(hero){
      hero.innerHTML=`<div class="eyebrow"><span></span><span>${t.ey}</span><span></span></div><h1>${t.title}</h1><p>${t.desc}</p><div class="hero-service-chips"><span>🌐 Web</span><span>✨ Branding</span><span>📈 Marketing</span><span>🤖 AI</span><span>🎬 Video</span><span>🔎 SEO</span></div><div class="hero-buttons"><a class="lnk-order-btn" href="#digital-catalog">${t.services}</a><a class="btn btn-outline" href="#digital-order">${t.quote}</a></div>`;
    }

    const floating=document.querySelector('.floating-card');
    if(floating) floating.innerHTML=`<span class="mini-icon">✦</span><div><strong>${t.float}</strong><small>${t.floatSub}</small></div>`;

    const stats=document.querySelectorAll('.stats > div');
    if(stats.length>=4){
      for(let i=0;i<4;i++){
        const strong=stats[i].querySelector('strong'), span=stats[i].querySelector('span');
        if(strong) strong.textContent=t.stats[i*2];
        if(span){ span.textContent=t.stats[i*2+1]; span.removeAttribute('data-i18n'); }
      }
    }
  }

  function boot(){
    apply();
    document.getElementById('language')?.addEventListener('change',()=>setTimeout(apply,180));
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',boot); else boot();
})();