(function(){
"use strict";
const form=document.getElementById("lnkLeadForm");
if(!form)return;
const select=document.getElementById("languageSelect");
const status=document.getElementById("lnkLeadStatus");
const btn=document.getElementById("lnkLeadSubmit");
const translations={
en:["Tell us about your project","Send the details directly, or use WhatsApp/email above.","Your name","Business (optional)","Your email","What do you need?","New website","Website redesign","Online store","SEO · GEO · AEO","Bookings / automation","Other","Tell us briefly what you need","I agree to LNK DIGITAL securely storing my details to reply to this enquiry.","Send project enquiry","Your enquiry was received. We will contact you by email.","Could not send. Please use WhatsApp or email."],
sl:["Povejte nam več o projektu","Pošljite povpraševanje neposredno ali uporabite WhatsApp/e-pošto.","Vaše ime","Podjetje (neobvezno)","Vaš e-naslov","Kaj potrebujete?","Nova spletna stran","Prenova spletne strani","Spletna trgovina","SEO · GEO · AEO","Rezervacije / avtomatizacija","Drugo","Na kratko opišite projekt","Strinjam se, da LNK DIGITAL varno shrani moje podatke za odgovor na to povpraševanje.","Pošlji povpraševanje","Povpraševanje je prejeto. Odgovorili bomo po e-pošti.","Pošiljanje ni uspelo. Uporabite WhatsApp ali e-pošto."],
bs:["Ispričajte nam o svom projektu","Pošaljite upit direktno ili koristite WhatsApp/e-mail.","Vaše ime","Firma (nije obavezno)","Vaš e-mail","Šta vam treba?","Novi web sajt","Redizajn sajta","Online trgovina","SEO · GEO · AEO","Rezervacije / automatizacija","Ostalo","Ukratko opišite projekt","Saglasan/saglasna sam da LNK DIGITAL sigurno sačuva moje podatke radi odgovora.","Pošalji upit","Upit je primljen. Odgovorit ćemo e-mailom.","Nije poslano. Koristite WhatsApp ili e-mail."],
de:["Erzählen Sie uns von Ihrem Projekt","Senden Sie Ihre Anfrage direkt oder nutzen Sie WhatsApp/E-Mail.","Ihr Name","Firma (optional)","Ihre E-Mail","Was benötigen Sie?","Neue Website","Website-Relaunch","Online-Shop","SEO · GEO · AEO","Buchungen / Automatisierung","Sonstiges","Beschreiben Sie kurz Ihr Projekt","Ich stimme der sicheren Speicherung meiner Angaben zur Beantwortung dieser Anfrage zu.","Anfrage senden","Anfrage erhalten. Wir melden uns per E-Mail.","Senden fehlgeschlagen. Bitte WhatsApp oder E-Mail nutzen."],
it:["Parlaci del tuo progetto","Invia la richiesta direttamente o usa WhatsApp/email.","Il tuo nome","Azienda (facoltativa)","La tua email","Di cosa hai bisogno?","Nuovo sito web","Restyling del sito","Negozio online","SEO · GEO · AEO","Prenotazioni / automazione","Altro","Descrivi brevemente il progetto","Acconsento alla conservazione sicura dei dati per rispondere alla richiesta.","Invia richiesta","Richiesta ricevuta. Risponderemo via email.","Invio non riuscito. Usa WhatsApp o email."],
fr:["Parlez-nous de votre projet","Envoyez votre demande ou utilisez WhatsApp/e-mail.","Votre nom","Entreprise (facultatif)","Votre e-mail","Votre besoin","Nouveau site web","Refonte du site","Boutique en ligne","SEO · GEO · AEO","Réservations / automatisation","Autre","Décrivez brièvement votre projet","J'accepte le stockage sécurisé de mes données pour recevoir une réponse.","Envoyer la demande","Demande reçue. Nous répondrons par e-mail.","Envoi impossible. Utilisez WhatsApp ou e-mail."],
es:["Cuéntanos tu proyecto","Envía tu consulta directamente o usa WhatsApp/correo.","Tu nombre","Empresa (opcional)","Tu correo electrónico","¿Qué necesitas?","Nueva web","Rediseño web","Tienda online","SEO · GEO · AEO","Reservas / automatización","Otro","Describe brevemente tu proyecto","Acepto que LNK DIGITAL guarde mis datos de forma segura para responder.","Enviar consulta","Consulta recibida. Te responderemos por correo.","No se pudo enviar. Usa WhatsApp o correo."],
sq:["Na tregoni për projektin tuaj","Dërgoni kërkesën ose përdorni WhatsApp/email.","Emri juaj","Biznesi (opsional)","Email-i juaj","Çfarë ju duhet?","Uebsajt i ri","Ridizajnim uebsajti","Dyqan online","SEO · GEO · AEO","Rezervime / automatizim","Tjetër","Përshkruani shkurt projektin","Pranoj ruajtjen e sigurt të të dhënave për përgjigjen ndaj kërkesës.","Dërgo kërkesën","Kërkesa u pranua. Do t'ju përgjigjemi me email.","Dërgimi dështoi. Përdorni WhatsApp ose email."]
};
translations.hr=translations.bs;translations.sr=translations.bs;
const keys=["title","intro","name","company","email","service","website","redesign","ecommerce","seo","booking","other","message","consent","send","success","failure"];
function t(){return translations[select?.value]||translations.en}
function localize(){
 const words=t();
 document.querySelectorAll("[data-lead-translate]").forEach(el=>{
 const i=keys.indexOf(el.getAttribute("data-lead-translate"));
 if(i>=0)el.textContent=words[i];
 });
}
select?.addEventListener("change",localize);
localize();
form.addEventListener("submit",async function(e){
 e.preventDefault();
 if(!form.reportValidity())return;
 const data=new FormData(form);
 btn.disabled=true;
 status.textContent="";
 try{
  const payload={name:String(data.get("name")||""),email:String(data.get("email")||""),company:String(data.get("company")||""),service:String(data.get("service")||""),message:String(data.get("message")||""),consent:data.get("consent")==="yes",website_hidden:String(data.get("website_hidden")||"")};
  const response=await fetch("/api/lnk-digital-lead",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(payload)});
  if(!response.ok)throw Error("Lead service unavailable");
  form.reset();status.textContent=t()[15];status.dataset.state="success";
 }catch(_err){status.textContent=t()[16];status.dataset.state="error"}
 finally{btn.disabled=false}
});
})();