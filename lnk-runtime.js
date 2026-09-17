(() => {
const LOGO="/lnk-digital-logo.jpg";
const D=window.LNK_DATA||{};
const LANGS=D.langs||[];const CORE=window.LNK_CORE||{};const WEB=D.web||{};const WEB_D=D.webd||{};const CAT=D.cat||{};const CAT_LABELS=D.catlabels||{};const SERVICE_EN=D.service_en||[];const SERVICE_SR=D.service_sr||[];
const catKeys=['web','brand','social','marketing','seo','ai','shop','video','content','career','tech'];
const SERVICE_MAP=Object.fromEntries(SERVICE_SR.map((name,i)=>[name,SERVICE_EN[i]||name]));

function ensureTheme(){
  if(!document.querySelector('link[data-lnk-blue]')){const l=document.createElement('link');l.rel='stylesheet';l.href='/lnk-blue-theme.css';l.dataset.lnkBlue='1';document.head.appendChild(l);}
  if(!document.querySelector('.lnk-glow-orb')){document.body.insertAdjacentHTML('afterbegin','<div class="lnk-glow-orb one"></div><div class="lnk-glow-orb two"></div>');}
  const meta=document.querySelector('meta[name="theme-color"]'); if(meta) meta.content='#07111b';
}
function setLogo(){
  document.querySelectorAll('.brand img,.hero-logo,.footer-brand img').forEach(img=>{img.src=LOGO;img.alt='LNK DIGITAL';});
  const brand=document.querySelector('.brand span'); if(brand) brand.textContent='LNK DIGITAL';
  const fb=document.querySelector('.footer-brand strong'); if(fb) fb.textContent='LNK DIGITAL';
  let icon=document.querySelector('link[rel="icon"]'); if(!icon){icon=document.createElement('link');icon.rel='icon';document.head.appendChild(icon);} icon.href=LOGO;
}
function setupLanguages(){
 const s=document.getElementById('language'); if(!s) return;
 const current=localStorage.getItem('ludakLang')||s.value||'sr';
 s.innerHTML=LANGS.map(([v,l])=>`<option value="${v}">${l}</option>`).join('');
 s.value=LANGS.some(x=>x[0]===current)?current:'sr';
}
function currentLang(){return document.getElementById('language')?.value||localStorage.getItem('ludakLang')||'sr';}

function applyCore(lang){
  const dict=CORE[lang]; if(!dict) return;
  document.documentElement.lang=lang;
  document.querySelectorAll('[data-i18n]').forEach(el=>{const k=el.dataset.i18n;if(dict[k]!=null) el.innerHTML=dict[k];});
  if(lang==='tr'||lang==='mk'){
    const name=document.querySelector('#songOrderForm input[name="name"]'); if(name) name.placeholder=lang==='tr'?'Örn. Mark':'Пр. Марко';
    const rec=document.querySelector('#songOrderForm input[name="recipient"]'); if(rec) rec.placeholder=lang==='tr'?'Örn. Anna':'Пр. Ана';
    const sty=document.querySelector('#songOrderForm input[name="style"]'); if(sty) sty.placeholder=lang==='tr'?'Örn. pop, folk, rap, balad...':'Пр. поп, фолк, рап, балада...';
    const story=document.querySelector('#songOrderForm textarea[name="story"]'); if(story) story.placeholder=lang==='tr'?'İsimleri, anıları, önemli olayları ve vermek istediğin mesajı yaz...':'Напиши имиња, спомени, важни настани и порака што сакаш да ја пренесеш...';
  }
}

const SONG_SELECTS={
 sr:{occasion:['Izaberi povod','Rođendan','Godišnjica','Svadba','Prosidba','Partner/partnerka','Prijatelj','Porodica','Šaljiva pesma','Drugo'],mood:['❤️ Emotivna','🎉 Vesela','💕 Romantična','🔥 Moćna','🌙 Setna','😂 Šaljiva','✨ Po izboru autora'],deadline:['Standardno (1–2 dana)','VIP prioritet (24h)','Ekspres (+10 €)']},
 bs:{occasion:['Izaberi povod','Rođendan','Godišnjica','Svadba','Prosidba','Partner/partnerka','Prijatelj','Porodica','Šaljiva pjesma','Drugo'],mood:['❤️ Emotivna','🎉 Vesela','💕 Romantična','🔥 Moćna','🌙 Sjetna','😂 Šaljiva','✨ Po izboru autora'],deadline:['Standardno (1–2 dana)','VIP prioritet (24h)','Ekspres (+10 €)']},
 hr:{occasion:['Odaberi povod','Rođendan','Godišnjica','Vjenčanje','Prosidba','Partner/partnerica','Prijatelj','Obitelj','Šaljiva pjesma','Drugo'],mood:['❤️ Emotivna','🎉 Vesela','💕 Romantična','🔥 Moćna','🌙 Sjetna','😂 Šaljiva','✨ Po izboru autora'],deadline:['Standardno (1–2 dana)','VIP prioritet (24h)','Ekspres (+10 €)']},
 sl:{occasion:['Izberi priložnost','Rojstni dan','Obletnica','Poroka','Zaroka','Partner/partnerka','Prijatelj','Družina','Zabavna pesem','Drugo'],mood:['❤️ Čustvena','🎉 Vesela','💕 Romantična','🔥 Močna','🌙 Melanholična','😂 Zabavna','✨ Po izbiri avtorja'],deadline:['Standardno (1–2 dni)','VIP prednostno (24h)','Ekspresno (+10 €)']},
 en:{occasion:['Choose an occasion','Birthday','Anniversary','Wedding','Proposal','Partner','Friend','Family','Funny song','Other'],mood:['❤️ Emotional','🎉 Happy','💕 Romantic','🔥 Powerful','🌙 Melancholic','😂 Funny','✨ Author’s choice'],deadline:['Standard (1–2 days)','VIP priority (24h)','Express (+10 €)']},
 de:{occasion:['Anlass auswählen','Geburtstag','Jahrestag','Hochzeit','Heiratsantrag','Partner/in','Freund/in','Familie','Lustiger Song','Andere'],mood:['❤️ Emotional','🎉 Fröhlich','💕 Romantisch','🔥 Kraftvoll','🌙 Melancholisch','😂 Lustig','✨ Wahl des Autors'],deadline:['Standard (1–2 Tage)','VIP-Priorität (24h)','Express (+10 €)']},
 fr:{occasion:['Choisissez une occasion','Anniversaire','Anniversaire de couple','Mariage','Demande','Partenaire','Ami(e)','Famille','Chanson humoristique','Autre'],mood:['❤️ Émotionnelle','🎉 Joyeuse','💕 Romantique','🔥 Puissante','🌙 Mélancolique','😂 Drôle','✨ Choix de l’auteur'],deadline:['Standard (1–2 jours)','Priorité VIP (24h)','Express (+10 €)']},
 es:{occasion:['Elige una ocasión','Cumpleaños','Aniversario','Boda','Propuesta','Pareja','Amigo/a','Familia','Canción divertida','Otro'],mood:['❤️ Emotiva','🎉 Alegre','💕 Romántica','🔥 Potente','🌙 Melancólica','😂 Divertida','✨ Elección del autor'],deadline:['Estándar (1–2 días)','Prioridad VIP (24h)','Exprés (+10 €)']},
 it:{occasion:['Scegli un’occasione','Compleanno','Anniversario','Matrimonio','Proposta','Partner','Amico/a','Famiglia','Canzone divertente','Altro'],mood:['❤️ Emotiva','🎉 Allegra','💕 Romantica','🔥 Potente','🌙 Malinconica','😂 Divertente','✨ Scelta dell’autore'],deadline:['Standard (1–2 giorni)','Priorità VIP (24h)','Express (+10 €)']},
 sq:{occasion:['Zgjidh rastin','Ditëlindje','Përvjetor','Dasmë','Propozim','Partner/e','Mik/e','Familje','Këngë humoristike','Tjetër'],mood:['❤️ Emocionale','🎉 E gëzueshme','💕 Romantike','🔥 E fuqishme','🌙 Melankolike','😂 Humoristike','✨ Zgjedhja e autorit'],deadline:['Standard (1–2 ditë)','Prioritet VIP (24h)','Express (+10 €)']},
 tr:{occasion:['Özel günü seç','Doğum günü','Yıldönümü','Düğün','Evlilik teklifi','Partner','Arkadaş','Aile','Eğlenceli şarkı','Diğer'],mood:['❤️ Duygusal','🎉 Neşeli','💕 Romantik','🔥 Güçlü','🌙 Hüzünlü','😂 Eğlenceli','✨ Sanatçı seçimi'],deadline:['Standart (1–2 gün)','VIP öncelik (24h)','Ekspres (+10 €)']},
 mk:{occasion:['Избери повод','Роденден','Годишнина','Свадба','Запросување','Партнер/ка','Пријател/ка','Семејство','Забавна песна','Друго'],mood:['❤️ Емотивна','🎉 Весела','💕 Романтична','🔥 Моќна','🌙 Меланхолична','😂 Забавна','✨ По избор на авторот'],deadline:['Стандардно (1–2 дена)','VIP приоритет (24h)','Експрес (+10 €)']}
};
function applySongSelects(lang){
 const form=document.getElementById('songOrderForm'), t=SONG_SELECTS[lang]||SONG_SELECTS.sr;if(!form)return;
 const occ=form.querySelector('select[name="occasion"]');if(occ){const base=[...occ.options].filter(o=>!['Razvod','Raskid','Pomirenje','Izvinjenje','Nedostaješ mi'].includes(o.value));base.slice(0,10).forEach((o,i)=>{if(t.occasion[i])o.textContent=t.occasion[i];});}
 const mood=form.querySelector('select[name="mood"]');if(mood)[...mood.options].forEach((o,i)=>{if(t.mood[i])o.textContent=t.mood[i];});
 const dead=form.querySelector('select[name="deadline"]');if(dead)[...dead.options].forEach((o,i)=>{if(t.deadline[i])o.textContent=t.deadline[i];});
}

function applyWeb(lang){
  const w=WEB[lang]||WEB.en, d=WEB_D[lang]||WEB_D.en;
  const nav=document.querySelector('.desktop-nav'); if(nav){const n=w[0].split('|');nav.innerHTML=`<a href="#lnk-usluge">${n[0]}</a><a href="#web-stranice">${n[1]}</a><a href="#digital-catalog">${n[2]}</a><a href="#cenovnik">${n[3]}</a>`;}
  const hero=document.querySelector('.hero-copy'); if(hero) hero.innerHTML=`<div class="eyebrow"><span></span><span>${w[3]}</span><span></span></div><h1>${w[4]}</h1><p>${w[5]}</p><div class="hero-buttons"><a class="lnk-order-btn" href="#web-stranice">${w[2]}</a><a class="lnk-order-btn" href="#digital-catalog">${w[6]}</a><a class="btn btn-outline" href="#naruci">${w[1]}</a></div>`;
  const qa=document.querySelector('#lnk-usluge .lnk-quick-inner'); if(qa) qa.innerHTML=`<span class="eyebrow">LNK DIGITAL</span><h2>${w[6]}</h2><div class="lnk-quick-grid"><div class="lnk-card"><h3>${w[7]}</h3><p>${w[8]}</p><a class="lnk-order-btn" href="#web-stranice">${w[2]}</a></div><div class="lnk-card" id="digital-shop"><h3>${w[9]}</h3><p>${w[10]}</p><a class="lnk-order-btn" href="#digital-catalog">${w[15]}</a></div><div class="lnk-card"><h3>🤖 AI & Automation</h3><p>${lang==='de'?'Chatbots, Workflows, CRM und Business-Automatisierung.':lang==='fr'?'Chatbots, workflows, CRM et automatisation métier.':lang==='es'?'Chatbots, flujos, CRM y automatización empresarial.':lang==='it'?'Chatbot, workflow, CRM e automazione aziendale.':lang==='sq'?'Chatbot, workflow, CRM dhe automatizim biznesi.':lang==='tr'?'Chatbot, iş akışları, CRM ve iş otomasyonu.':lang==='mk'?'Chatbot, workflow, CRM и деловна автоматизација.':'Chatbot, workflow, CRM i poslovna automatizacija.'}</p><a class="lnk-order-btn" href="#digital-catalog">${w[15]}</a></div><div class="lnk-card"><h3>${w[11]}</h3><p>${w[12]}</p><a class="lnk-order-btn" href="#naruci">${w[1]}</a></div></div>`;
  const webSec=document.getElementById('web-stranice'); if(webSec){
    const wrap=webSec.querySelector('.lnk-quick-inner'); if(wrap) wrap.innerHTML=`<span class="eyebrow">${w[13]}</span><h2>${w[14]}</h2><div class="lnk-quick-grid">${['START','BUSINESS','PREMIUM','BUSINESS LAUNCH'].map((n,i)=>`<div class="lnk-card"><h3>${n}</h3><div class="lnk-price">${['149.99€','299.99€','499.99€','799.99–999.99€'][i]}</div><p>${d[i]}</p><a class="lnk-order-btn web-pick-modern" href="#web-naruci-modern" data-package="${n} — ${['149.99€','299.99€','499.99€','799.99–999.99€'][i]}">${w[15]}</a></div>`).join('')}</div><form id="web-naruci-modern" class="web-order-form"><h3>${d[4]}</h3><p>${d[5]}</p><div class="web-form-grid"><input required name="name" placeholder="${d[6]}"><input required type="email" name="email" placeholder="${d[7]}"><input name="phone" placeholder="${d[8]}"><input name="company" placeholder="${d[9]}"><input class="web-full" name="activity" placeholder="${d[10]}"><select class="web-full" name="package"><option>START — 149.99€</option><option>BUSINESS — 299.99€</option><option>PREMIUM — 499.99€</option><option>BUSINESS LAUNCH — 799.99–999.99€</option><option>Branding & Social</option><option>AI & Automation</option></select><textarea class="web-full" required name="details" placeholder="${d[11]}"></textarea><button class="lnk-order-btn web-full" type="submit">✉️ ${d[12]}</button></div><div class="web-form-status"></div></form>`;
    bindWebForm(lang);
  }
}
function bindWebForm(lang){
 const form=document.getElementById('web-naruci-modern'); if(!form||form.dataset.bound) return; form.dataset.bound='1';
 document.querySelectorAll('.web-pick-modern').forEach(a=>a.addEventListener('click',()=>{form.elements.package.value=a.dataset.package;}));
 form.addEventListener('submit',e=>{e.preventDefault();const fd=new FormData(form);const sub=`LNK DIGITAL — ${fd.get('package')}`;const body=`LNK DIGITAL\n\nName: ${fd.get('name')}\nEmail: ${fd.get('email')}\nPhone: ${fd.get('phone')||'-'}\nCompany: ${fd.get('company')||'-'}\nActivity: ${fd.get('activity')||'-'}\nService: ${fd.get('package')}\n\nDetails:\n${fd.get('details')}`;location.href=`mailto:contact@ludaknakvadrat.com?subject=${encodeURIComponent(sub)}&body=${encodeURIComponent(body)}`;});
}
function applyCatalog(lang){
  const c=CAT[lang]||CAT.en, labels=CAT_LABELS[lang]||CAT_LABELS.en;
  const sec=document.getElementById('digital-catalog'); if(!sec) return;
  const ey=sec.querySelector('.dc-head .eyebrow'); if(ey) ey.textContent=c[0];
  const h2=sec.querySelector('.dc-head h2'); if(h2) h2.textContent=c[1];
  const p=sec.querySelector('.dc-head p'); if(p) p.textContent=c[2];
  const search=sec.querySelector('.dc-search'); if(search) search.placeholder=c[3];
  const filters=sec.querySelectorAll('.dc-filter'); filters.forEach((b,i)=>{b.textContent=i===0?c[4]:(labels[i-1]||b.textContent);});
  const cards=sec.querySelectorAll('.dc-card'); cards.forEach((card,i)=>{const cat=card.dataset.cat;const catEl=card.querySelector('.dc-cat');if(catEl) catEl.textContent=labels[catKeys.indexOf(cat)]||cat;const h=card.querySelector('h3');const original=(card.querySelector('.dc-order')?.dataset.service||'').split(' — ')[0]||h?.textContent||'';if(h&& !['sr','bs','hr'].includes(lang) && SERVICE_MAP[original]){h.textContent=SERVICE_MAP[original];card.dataset.search=(SERVICE_MAP[original]+' '+(labels[catKeys.indexOf(cat)]||cat)).toLowerCase();}const price=card.querySelector('.dc-price');if(price) price.childNodes[0].textContent=c[5]+' ';const o=card.querySelector('.dc-order');if(o)o.textContent=c[6];});
  const mh=sec.querySelector('.dc-monthly h3');if(mh)mh.textContent=c[7];const mp=sec.querySelector('.dc-monthly>p');if(mp)mp.textContent=c[8];const monthlyText={en:['Website care • small updates • 2 visuals • technical support','10 posts • profile management • basic SEO • monthly report','Web support • social media • SEO • creative • automation • priority'],de:['Website-Pflege • kleine Änderungen • 2 Visuals • technischer Support','10 Posts • Profilbetreuung • Basis-SEO • Monatsbericht','Web-Support • Social Media • SEO • Kreativleistungen • Automatisierung • Priorität'],sl:['Vzdrževanje strani • manjše spremembe • 2 vizuala • tehnična podpora','10 objav • upravljanje profila • osnovni SEO • mesečno poročilo','Spletna podpora • družbena omrežja • SEO • kreativa • avtomatizacija • prioriteta'],fr:['Maintenance web • petites modifications • 2 visuels • support technique','10 publications • gestion de profil • SEO de base • rapport mensuel','Support web • réseaux sociaux • SEO • créatif • automatisation • priorité'],es:['Mantenimiento web • pequeños cambios • 2 visuales • soporte técnico','10 publicaciones • gestión de perfil • SEO básico • informe mensual','Soporte web • redes sociales • SEO • creatividad • automatización • prioridad'],it:['Manutenzione web • piccole modifiche • 2 visual • supporto tecnico','10 post • gestione profilo • SEO base • report mensile','Supporto web • social media • SEO • creatività • automazione • priorità'],sq:['Mirëmbajtje web • ndryshime të vogla • 2 vizuale • mbështetje teknike','10 postime • menaxhim profili • SEO bazë • raport mujor','Mbështetje web • rrjete sociale • SEO • kreativë • automatizim • prioritet'],tr:['Web bakımı • küçük değişiklikler • 2 görsel • teknik destek','10 gönderi • profil yönetimi • temel SEO • aylık rapor','Web desteği • sosyal medya • SEO • kreatif • otomasyon • öncelik'],mk:['Одржување веб • мали измени • 2 визуали • техничка поддршка','10 објави • управување профил • основен SEO • месечен извештај','Веб поддршка • социјални мрежи • SEO • креатива • автоматизација • приоритет']};const mt=monthlyText[lang];if(mt)sec.querySelectorAll('.dc-monthly-card p').forEach((el,i)=>{if(mt[i])el.textContent=mt[i];});
  const form=sec.querySelector('.dc-form'); if(form){const fh=form.querySelector('h3');if(fh)fh.textContent=c[9];const fp=form.querySelector(':scope>p');if(fp)fp.textContent=c[10];const inputs=form.querySelectorAll('input'); if(inputs[0])inputs[0].placeholder=(lang==='de'?'Vor- und Nachname':lang==='fr'?'Nom complet':lang==='es'?'Nombre completo':lang==='it'?'Nome completo':lang==='sq'?'Emri i plotë':lang==='tr'?'Ad soyad':lang==='mk'?'Име и презиме':lang==='sl'?'Ime in priimek':'Full name'); if(inputs[1])inputs[1].placeholder='Email'; const ta=form.querySelector('textarea');if(ta)ta.placeholder=c[10];const btn=form.querySelector('button');if(btn)btn.textContent='✉️ '+c[6];}
  const note=sec.querySelector('.dc-note'); if(note) note.textContent=c[11];
  const empty=sec.querySelector('.dc-empty'); if(empty)empty.textContent=c[12];
}
function polish(){
 document.title='LNK DIGITAL — Web, Branding, AI & Digital Services';
 const desc=document.querySelector('meta[name="description"]'); if(desc) desc.content='LNK DIGITAL — profesionalne web stranice, branding, social media, SEO, AI automatizacija, e-commerce i personalizovane pesme.';
 document.querySelectorAll('a[href="mailto:contactludak@gmail.com"]').forEach(a=>a.href='mailto:contact@ludaknakvadrat.com');
 setLogo();
}
let mutating=false;
function applyAll(){if(mutating)return;mutating=true;const lang=currentLang();localStorage.setItem('ludakLang',lang);applyCore(lang);applySongSelects(lang);applyWeb(lang);applyCatalog(lang);polish();setTimeout(()=>mutating=false,40);}
function boot(){ensureTheme();setupLanguages();setLogo();applyAll();const sel=document.getElementById('language');if(sel)sel.addEventListener('change',()=>setTimeout(applyAll,35));const obs=new MutationObserver(()=>{if(!mutating)setTimeout(applyAll,20);});obs.observe(document.body,{childList:true,subtree:true});}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot);else boot();
})();
