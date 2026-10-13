/* LNK DIGITAL ULTRA — isolated homepage showroom and service translations.
 * Does not modify the existing checkout, client area, WhatsApp links or enquiry scripts. */
(function(){
"use strict";
var stage=document.getElementById("lnkuStage");
if(!stage)return;
var image=document.getElementById("lnkuMainImage");
var phone=document.getElementById("lnkuPhoneImage");
var title=document.getElementById("lnkuDemoTitle");
var subtitle=document.getElementById("lnkuDemoSub");
var teaser=document.getElementById("lnkuDemoTeaser");
var link=document.getElementById("lnkuDemoLink");
var url=document.getElementById("lnkuMockUrl");
var phoneBrand=document.getElementById("lnkuPhoneBrand");
var buttons=Array.prototype.slice.call(stage.querySelectorAll("[data-lnku-demo]"));
var pictureData={
 realestate:{image:"/assets/photos/hero.webp",phone:"/assets/photos/hero-320.webp",alt:"Premium website design example for luxury property",url:"NOVA / RESIDENCES",eyebrow:"PREMIUM WEB / DESIGN CONCEPT",title:"BEYOND THE EXPECTED.",text:"A first impression built for exceptional brands.",link:"/web-design-portfolio.html",cta:"SEE DESIGN CONCEPT ↗",brand:"NOVA."},
 restaurant:{image:"/assets/previews/restaurant.png",phone:"/assets/photos/business-320.webp",alt:"Illustrative restaurant website preview",url:"MAISON / RESTAURANT",eyebrow:"HOSPITALITY / WEBSITE CONCEPT",title:"A TASTE OF EXTRAORDINARY.",text:"An experience that starts before the first visit.",link:"/restaurant-website-design.html",cta:"EXPLORE RESTAURANTS ↗",brand:"MAISON."},
 shop:{image:"https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=1200&auto=format&fit=crop&q=85",phone:"/assets/previews/ecommerce.png",alt:"Nike red running shoe in an illustrative online shop design",url:"SNEAKER / STORE DEMO",eyebrow:"ONLINE SHOP / PRODUCT CONCEPT",title:"SHOP THE DROP.",text:"Product pages, shopping carts and checkout — illustrated with a Nike sneaker photograph.",link:"/izdelava-spletnih-trgovin.html",cta:"EXPLORE ONLINE STORES ↗",brand:"SNEAKER STORE."}
};
var current="realestate";
function fallback(img,preferred){
 if(!img)return;
 img.addEventListener("error",function(){
  if(img.dataset.fallback==="1"){img.style.opacity="0";return;}
  img.dataset.fallback="1";
  img.src=preferred;
 });
}
fallback(image,"/assets/previews/ecommerce.png");
fallback(phone,"/assets/photos/mobile-320.webp");

// Service images use a local fallback for external image hosts, preserving layout on iOS/desktop.
Array.prototype.forEach.call(document.querySelectorAll('#services .lnku-service-visual img[data-lnku-fallback]'),function(img){
 var alternative=img.getAttribute('data-lnku-fallback');
 if(!alternative)return;
 function onError(){
   if(img.getAttribute('data-lnku-fallback-used')==='yes'){img.classList.add('lnku-image-missing');return;}
   img.setAttribute('data-lnku-fallback-used','yes');
   img.removeAttribute('srcset');
   img.src=alternative;
 }
 img.addEventListener('error',onError);
 if(img.complete&&img.naturalWidth===0)onError();
});

function selectDemo(name){
 var d=pictureData[name];if(!d||!image||!phone)return;
 current=name;
 stage.classList.add("lnku-paint");
 url.textContent=d.url;title.textContent=d.title;subtitle.textContent=d.eyebrow;teaser.textContent=d.text;
 link.href=d.link;link.textContent=d.cta;phoneBrand.textContent=d.brand;
 image.dataset.fallback="0";phone.dataset.fallback="0";
 image.alt=d.alt;image.src=d.image;phone.src=d.phone;
 buttons.forEach(function(button){button.setAttribute("aria-pressed",String(button.dataset.lnkuDemo===name));});
 window.setTimeout(function(){stage.classList.remove("lnku-paint");},150);
}
buttons.forEach(function(button){button.addEventListener("click",function(){selectDemo(button.dataset.lnkuDemo);});});
/* Only new content needs this map; the existing LNK language scripts remain authoritative elsewhere. */
var content={
en:[
 ["Premium web & 3D experiences","Cinematic, responsive websites, elegant visual storytelling and polished user experiences across devices."],
 ["Online stores & sales","Clear product presentation, mobile shopping and simple paths from discovery to purchase."],
 ["SEO · GEO · AEO","Solid technical foundations, clear content and visibility-ready structures for search and AI discovery."],
 ["Booking & automation","Online reservations, QR menus and streamlined enquiries that reduce manual work."],
 ["Strategy & optimization","Practical analytics, redesign and continuous improvements to user experience and business clarity."]
],
bs:[
 ["Premium web i 3D iskustva","Cinematic web stranice, 3D detalji i moderan dizajn koji jednako dobro radi na mobitelu i računaru."],
 ["Webshop i prodaja","Profesionalni prikaz proizvoda, mobilna kupovina i jednostavan put od pregleda do narudžbe."],
 ["SEO · GEO · AEO","Tehnička optimizacija, kvalitetan sadržaj i struktura za pretraživače i AI sisteme."],
 ["Rezervacije i automatizacija","Online rezervacije, QR meniji i jednostavniji upiti uz manje ručnog rada."],
 ["Strategija i optimizacija","Analitika, redizajn i stalno unapređivanje korisničkog iskustva i poslovne prezentacije."]
],
hr:[
 ["Premium web i 3D iskustva","Cinematic web stranice, 3D detalji i moderan dizajn prilagođen mobitelima i računalima."],
 ["Webshop i prodaja","Kvalitetan prikaz proizvoda, mobilna kupnja i jednostavan put do narudžbe."],
 ["SEO · GEO · AEO","Tehnička optimizacija, sadržaj i struktura za tražilice i AI sustave."],
 ["Rezervacije i automatizacija","Online rezervacije, QR jelovnici i jednostavniji upiti uz manje ručnog rada."],
 ["Strategija i optimizacija","Analitika, redizajn i kontinuirano poboljšavanje korisničkog iskustva."]
],
sr:[
 ["Premium web i 3D iskustva","Cinematic veb-sajtovi, 3D detalji i moderan dizajn prilagođen telefonu i računaru."],
 ["Internet prodavnice i prodaja","Profesionalni prikaz proizvoda i jednostavna kupovina na telefonu."],
 ["SEO · GEO · AEO","Tehnička optimizacija i sadržaj prilagođen pretraživačima i AI sistemima."],
 ["Rezervacije i automatizacija","Onlajn rezervacije, QR jelovnici i lakši upiti uz manje ručnog rada."],
 ["Strategija i optimizacija","Analitika, redizajn i poboljšavanje korisničkog iskustva."]
],
sl:[
 ["Premium spletne strani in 3D izkušnje","Sodobne spletne strani z animacijami, močnim vizualnim slogom in odlično uporabnostjo na vseh napravah."],
 ["Spletne trgovine in prodaja","Kakovostna predstavitev izdelkov, mobilno nakupovanje in enostaven nakupni proces."],
 ["SEO · GEO · AEO","Tehnična optimizacija ter vsebina in struktura za iskalnike in AI odkrivanje."],
 ["Rezervacije in avtomatizacija","Spletne rezervacije, QR meniji in poenostavljena povpraševanja."],
 ["Strategija in optimizacija","Analitika, prenova in stalno izboljševanje uporabniške izkušnje."]
],
de:[
 ["Premium Webdesign & 3D-Erlebnisse","Hochwertige responsive Websites mit Animationen, klarer Gestaltung und starker Nutzerführung."],
 ["Onlineshops & Verkauf","Überzeugende Produktpräsentation, mobiles Shopping und unkomplizierte Kaufprozesse."],
 ["SEO · GEO · AEO","Technische Optimierung und klare Inhalte für Suchmaschinen und KI-Suche."],
 ["Buchung & Automatisierung","Online-Reservierungen, QR-Menüs und effiziente Kundenanfragen."],
 ["Strategie & Optimierung","Analysen, Redesign und kontinuierliche Verbesserung der Nutzererfahrung."]
],
it:[
 ["Siti premium ed esperienze 3D","Siti responsive con animazioni raffinate, identità visiva e usabilità eccellente."],
 ["E-commerce e vendite","Presentazioni dei prodotti curate e acquisti semplici da ogni dispositivo."],
 ["SEO · GEO · AEO","Struttura tecnica e contenuti ottimizzati per motori di ricerca e AI."],
 ["Prenotazioni e automazione","Prenotazioni online, menu QR e richieste più semplici."],
 ["Strategia e ottimizzazione","Analisi, redesign e miglioramenti dell'esperienza utente."]
],
fr:[
 ["Sites premium et expériences 3D","Sites responsive aux animations élégantes et à l'expérience utilisateur soignée."],
 ["Boutiques en ligne et ventes","Présentation des produits et parcours d'achat optimisés sur mobile."],
 ["SEO · GEO · AEO","Structure technique et contenus adaptés à la recherche et aux systèmes IA."],
 ["Réservation et automatisation","Réservations en ligne, menus QR et demandes clients simplifiées."],
 ["Stratégie et optimisation","Analyse, refonte et amélioration continue de l'expérience utilisateur."]
],
es:[
 ["Web premium y experiencias 3D","Sitios adaptables con animaciones elegantes y una experiencia de usuario cuidada."],
 ["Tiendas online y ventas","Productos bien presentados y compras sencillas desde el móvil."],
 ["SEO · GEO · AEO","Base técnica y contenidos preparados para buscadores y sistemas de IA."],
 ["Reservas y automatización","Reservas online, menús QR y consultas más sencillas."],
 ["Estrategia y optimización","Analítica, rediseño y mejora continua de la experiencia web."]
],
sq:[
 ["Uebfaqe premium dhe përvoja 3D","Faqe moderne me animacione dhe përvojë të kujdesshme në çdo pajisje."],
 ["Dyqane online dhe shitje","Paraqitje profesionale e produkteve dhe blerje e thjeshtë në telefon."],
 ["SEO · GEO · AEO","Strukturë teknike dhe përmbajtje për motorët e kërkimit dhe sistemet AI."],
 ["Rezervime dhe automatizim","Rezervime online, menu QR dhe kërkesa më të lehta nga klientët."],
 ["Strategji dhe optimizim","Analizë, ridizajnim dhe përmirësim i përvojës së përdoruesit."]
]
};
var sectionTitles={
en:"A complete digital experience.",bs:"Kompletno digitalno iskustvo.",hr:"Cjelovito digitalno iskustvo.",sr:"Kompletno digitalno iskustvo.",sl:"Celovita digitalna izkušnja.",de:"Ein ganzheitliches digitales Erlebnis.",it:"Un'esperienza digitale completa.",fr:"Une expérience digitale complète.",es:"Una experiencia digital completa.",sq:"Një përvojë e plotë digjitale."
};
var note={
en:"Illustrative design concepts, not client performance claims.",bs:"Ilustrativni dizajnerski koncepti, ne stvarni rezultati klijenata.",hr:"Ilustrativni dizajnerski koncepti, ne stvarni rezultati klijenata.",sr:"Ilustrativni koncepti dizajna, ne stvarni rezultati klijenata.",sl:"Ilustrativni oblikovni koncepti, ne rezultati strank.",de:"Illustrative Designkonzepte, keine Kundenkennzahlen.",it:"Concept illustrativi, non risultati reali dei clienti.",fr:"Concepts illustratifs, pas de résultats clients.",es:"Conceptos ilustrativos, no resultados reales de clientes.",sq:"Koncepte ilustruese, jo rezultate reale të klientëve."
};

// Contact appears as a clear heading with two separate options, across all enabled languages.
var contactCopy={
 en:["Contact","Contact — choose how to reach us","Chat with us directly","Send us project details"],
 bs:["Kontakt","Kontakt — izaberi način javljanja","Piši nam direktno","Pošalji detalje projekta"],
 hr:["Kontakt","Kontakt — odaberite način javljanja","Pošaljite poruku direktno","Pošaljite detalje projekta"],
 sr:["Kontakt","Kontakt — izaberi način javljanja","Piši nam direktno","Pošalji detalje projekta"],
 sl:["Kontakt","Kontakt — izberite način stika","Pišite nam neposredno","Pošljite podatke o projektu"],
 de:["Kontakt","Kontakt — wählen Sie Ihren Kontaktweg","Schreiben Sie uns direkt","Senden Sie uns die Projektdetails"],
 it:["Contatto","Contattaci — scegli un canale","Scrivici direttamente","Invia i dettagli del progetto"],
 fr:["Contact","Contact — choisissez un canal","Discutez directement avec nous","Envoyez les détails du projet"],
 es:["Contacto","Contacto — elige un canal","Escríbenos directamente","Envía los detalles del proyecto"],
 sq:["Kontakt","Kontakt — zgjidhni mënyrën e kontaktit","Na shkruani drejtpërdrejt","Dërgoni detajet e projektit"]
};

function translate(){
 var select=document.getElementById("languageSelect"),lang=select&&select.value||"en",set=content[lang]||content.en;
 var cards=document.querySelectorAll("#services [data-lnku-service]");
 Array.prototype.forEach.call(cards,function(card,i){
  if(!set[i])return;
  var t=card.querySelector("[data-lnku-title]"),p=card.querySelector("[data-lnku-description]");
  if(t)t.textContent=set[i][0];
  if(p)p.textContent=set[i][1];
 });
 var label=document.getElementById("lnkuServiceTitle");
 if(label)label.textContent=sectionTitles[lang]||sectionTitles.en;
 var n=document.getElementById("lnkuNote");
 if(n)n.textContent=note[lang]||note.en;
 var contact=contactCopy[lang]||contactCopy.en;
 [
  ["lnkuContactLabel",contact[0].toUpperCase()],
  ["lnkuContactMethodTitle",contact[1]],
  ["lnkuWaHint",contact[2]],
  ["lnkuEmailHint",contact[3]],
  ["lnkuNavContactDesktop",contact[0]],
  ["lnkuNavContactMobile",contact[0]],
  ["lnkuFooterContact",contact[0]]
 ].forEach(function(entry){var el=document.getElementById(entry[0]);if(el)el.textContent=entry[1];});
}
var languageSelect=document.getElementById("languageSelect");
if(languageSelect)languageSelect.addEventListener("change",translate);
translate();
})();
