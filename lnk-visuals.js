(() => {
  'use strict';
  if (window.LNKVisuals) return;

  const esc = (v='') => String(v).replace(/[&<>"']/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&apos;'}[ch]));
  const hash = (s='') => { let h=2166136261; for (let i=0;i<s.length;i++){ h^=s.charCodeAt(i); h=Math.imul(h,16777619); } return h>>>0; };
  const palettes = {
    web:['#54d8ff','#305cff','#07111c','#0b1b2a'],
    brand:['#b96cff','#ff55a6','#100817','#1b0d23'],
    social:['#ff5e86','#8c65ff','#130912','#1b1024'],
    marketing:['#ff7b45','#ffcf5b','#160b08','#241308'],
    seo:['#57e6aa','#19a7ff','#06130f','#071d18'],
    ai:['#5ee7ff','#7a5cff','#07101a','#101328'],
    shop:['#61e6b8','#2e7dff','#07120f','#071725'],
    video:['#ff5c76','#a65cff','#14080d','#1b0d25'],
    content:['#ffd66e','#ff8f5d','#151009','#22140b'],
    career:['#68c7ff','#7d8cff','#081018','#101827'],
    tech:['#63f2ff','#2a81ff','#050d14','#071a29'],
    music:['#ff5fa2','#9b5cff','#150915','#230d2a'],
    template:['#5fe0ff','#6b5cff','#06101a','#0d1830']
  };

  const categoryName = {
    web:'WEB DESIGN',brand:'BRANDING',social:'SOCIAL',marketing:'MARKETING',seo:'SEO',ai:'AI / AUTOMATION',
    shop:'E-COMMERCE',video:'VIDEO / DESIGN',content:'CONTENT',career:'CAREER',tech:'TECH',music:'MUSIC',template:'WEBSITE TEMPLATE'
  };

  function palette(cat,name){
    const p=palettes[cat]||palettes.template;
    const n=hash(name)%5;
    return n===0?p:[p[1],p[0],p[2],p[3]];
  }

  function browserChrome(){
    return '<rect x="20" y="18" width="1160" height="684" rx="28" fill="#05080d" stroke="rgba(255,255,255,.16)"/>'+
      '<rect x="20" y="18" width="1160" height="54" rx="28" fill="#0d131d"/>'+
      '<circle cx="56" cy="45" r="7" fill="#ff5f57"/><circle cx="82" cy="45" r="7" fill="#ffbd2e"/><circle cx="108" cy="45" r="7" fill="#28c840"/>'+
      '<rect x="146" y="34" width="490" height="20" rx="10" fill="#182130"/><rect x="944" y="34" width="190" height="20" rx="10" fill="#182130"/>';
  }

  function serviceSvg(name,cat='template',icon='✦'){
    const [a,b,bg,bg2]=palette(cat,name);
    const h=hash(name);
    const v=h%6;
    const short=esc(name.length>38?name.slice(0,36)+'…':name);
    const label=esc(categoryName[cat]||'LNK DIGITAL');
    const glow='<defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop stop-color="'+a+'"/><stop offset="1" stop-color="'+b+'"/></linearGradient><radialGradient id="r"><stop stop-color="'+a+'" stop-opacity=".34"/><stop offset="1" stop-color="'+a+'" stop-opacity="0"/></radialGradient><filter id="blur"><feGaussianBlur stdDeviation="30"/></filter></defs>';
    let ui='';
    if(v===0){
      ui='<rect x="92" y="170" width="510" height="330" rx="24" fill="#0b111b" stroke="'+a+'" stroke-opacity=".32"/>'+
        '<rect x="126" y="208" width="210" height="16" rx="8" fill="'+a+'" opacity=".9"/><rect x="126" y="244" width="360" height="48" rx="12" fill="#eef6ff" opacity=".92"/>'+
        '<rect x="126" y="316" width="316" height="16" rx="8" fill="#688097" opacity=".46"/><rect x="126" y="346" width="268" height="16" rx="8" fill="#688097" opacity=".32"/>'+
        '<rect x="126" y="397" width="142" height="44" rx="12" fill="url(#g)"/>'+
        '<rect x="648" y="170" width="450" height="330" rx="28" fill="url(#g)" opacity=".22"/><circle cx="866" cy="330" r="112" fill="url(#r)"/>'+
        '<rect x="735" y="235" width="260" height="184" rx="26" fill="#0c1320" stroke="#ffffff" stroke-opacity=".18"/><rect x="776" y="276" width="178" height="18" rx="9" fill="#fff" opacity=".9"/><rect x="776" y="314" width="145" height="14" rx="7" fill="'+a+'" opacity=".8"/>';
    }else if(v===1){
      ui='<rect x="92" y="168" width="1006" height="84" rx="20" fill="#0b1119" stroke="#fff" stroke-opacity=".08"/>'+
        '<rect x="124" y="194" width="170" height="14" rx="7" fill="'+a+'"/><rect x="820" y="192" width="110" height="18" rx="9" fill="#435064"/><rect x="946" y="192" width="120" height="18" rx="9" fill="url(#g)"/>'+
        '<rect x="92" y="276" width="314" height="228" rx="24" fill="#0d1520"/><rect x="430" y="276" width="314" height="228" rx="24" fill="#0d1520"/><rect x="768" y="276" width="330" height="228" rx="24" fill="#0d1520"/>'+
        '<circle cx="160" cy="340" r="34" fill="url(#g)"/><rect x="214" y="316" width="142" height="18" rx="9" fill="#edf6ff" opacity=".92"/><rect x="214" y="350" width="112" height="12" rx="6" fill="#63758c" opacity=".55"/>'+
        '<path d="M462 442 C510 382 552 430 596 352 S682 396 714 320" fill="none" stroke="'+a+'" stroke-width="10" stroke-linecap="round"/>'+
        '<rect x="804" y="320" width="250" height="22" rx="11" fill="#27364a"/><rect x="804" y="364" width="202" height="22" rx="11" fill="'+b+'" opacity=".75"/><rect x="804" y="408" width="150" height="22" rx="11" fill="'+a+'" opacity=".85"/>';
    }else if(v===2){
      ui='<rect x="92" y="166" width="690" height="342" rx="28" fill="#0b111b"/><rect x="126" y="200" width="190" height="14" rx="7" fill="'+a+'"/>'+
        '<rect x="126" y="238" width="420" height="56" rx="15" fill="#f3f7fb" opacity=".94"/><rect x="126" y="316" width="530" height="18" rx="9" fill="#71839a" opacity=".38"/><rect x="126" y="350" width="464" height="18" rx="9" fill="#71839a" opacity=".25"/>'+
        '<rect x="126" y="402" width="180" height="48" rx="14" fill="url(#g)"/><rect x="326" y="402" width="160" height="48" rx="14" fill="#111b28" stroke="#ffffff" stroke-opacity=".13"/>'+
        '<rect x="826" y="160" width="230" height="410" rx="38" fill="#090e16" stroke="'+a+'" stroke-opacity=".38"/><rect x="850" y="204" width="182" height="280" rx="24" fill="url(#g)" opacity=".24"/>'+
        '<circle cx="941" cy="300" r="68" fill="url(#r)"/><rect x="876" y="398" width="130" height="16" rx="8" fill="#f4f8ff" opacity=".9"/><rect x="894" y="432" width="94" height="12" rx="6" fill="'+a+'"/>';
    }else if(v===3){
      ui='<rect x="90" y="164" width="1010" height="350" rx="30" fill="#0b1019"/><rect x="126" y="198" width="226" height="18" rx="9" fill="#f4f8ff" opacity=".9"/>'+
        '<rect x="126" y="238" width="370" height="14" rx="7" fill="#6b7b90" opacity=".42"/>'+
        '<rect x="126" y="294" width="250" height="164" rx="24" fill="url(#g)" opacity=".24"/><rect x="400" y="294" width="250" height="164" rx="24" fill="'+a+'" opacity=".12"/><rect x="674" y="294" width="250" height="164" rx="24" fill="'+b+'" opacity=".12"/>'+
        '<circle cx="252" cy="366" r="46" fill="url(#g)"/><path d="M448 410 L490 360 L532 388 L588 330" fill="none" stroke="'+a+'" stroke-width="10" stroke-linecap="round"/>'+
        '<rect x="722" y="334" width="154" height="18" rx="9" fill="#eef5ff" opacity=".86"/><rect x="722" y="372" width="112" height="18" rx="9" fill="'+b+'"/>';
    }else if(v===4){
      ui='<rect x="96" y="170" width="470" height="336" rx="26" fill="#0c121c"/><rect x="124" y="202" width="176" height="14" rx="7" fill="'+a+'"/><rect x="124" y="238" width="390" height="180" rx="22" fill="url(#g)" opacity=".18"/>'+
        '<rect x="148" y="270" width="344" height="16" rx="8" fill="#fff" opacity=".85"/><rect x="148" y="304" width="270" height="13" rx="7" fill="#9fb2c8" opacity=".45"/><rect x="148" y="344" width="154" height="44" rx="12" fill="url(#g)"/>'+
        '<rect x="606" y="170" width="490" height="336" rx="26" fill="#0c121c"/><rect x="642" y="206" width="386" height="228" rx="18" fill="#070b12"/>'+
        '<path d="M674 400 C726 334 770 374 814 308 S900 352 974 252" fill="none" stroke="'+a+'" stroke-width="12" stroke-linecap="round"/>'+
        '<circle cx="974" cy="252" r="14" fill="'+b+'"/>';
    }else{
      ui='<rect x="90" y="162" width="1014" height="350" rx="30" fill="url(#g)" opacity=".13"/>'+
        '<rect x="120" y="194" width="570" height="286" rx="24" fill="#08101a" stroke="#fff" stroke-opacity=".09"/>'+
        '<rect x="154" y="230" width="204" height="18" rx="9" fill="'+a+'"/><rect x="154" y="270" width="420" height="48" rx="14" fill="#f3f7fb" opacity=".92"/>'+
        '<rect x="154" y="342" width="330" height="15" rx="8" fill="#65768a" opacity=".46"/><rect x="154" y="374" width="270" height="15" rx="8" fill="#65768a" opacity=".28"/>'+
        '<rect x="730" y="196" width="316" height="286" rx="30" fill="#0a111b"/><circle cx="888" cy="330" r="104" fill="url(#r)"/>'+
        '<rect x="820" y="274" width="136" height="20" rx="10" fill="#fff" opacity=".88"/><rect x="834" y="316" width="108" height="16" rx="8" fill="'+a+'"/><rect x="806" y="360" width="164" height="50" rx="16" fill="url(#g)"/>';
    }
    return '<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="720" viewBox="0 0 1200 720">'+glow+
      '<rect width="1200" height="720" rx="34" fill="'+bg+'"/><circle cx="1010" cy="82" r="230" fill="url(#r)" filter="url(#blur)"/>'+browserChrome()+
      '<text x="92" y="118" fill="'+a+'" font-family="Arial,Helvetica,sans-serif" font-size="18" font-weight="700" letter-spacing="3">'+label+'</text>'+
      '<text x="92" y="148" fill="#eef6ff" font-family="Arial,Helvetica,sans-serif" font-size="24" font-weight="800">'+short+'</text>'+ui+
      '<text x="92" y="650" fill="#65768a" font-family="Arial,Helvetica,sans-serif" font-size="15" font-weight="700" letter-spacing="2">LNK DIGITAL • VISUAL PREVIEW</text>'+
      '<rect x="902" y="620" width="196" height="44" rx="22" fill="url(#g)"/><text x="1000" y="648" text-anchor="middle" fill="#fff" font-family="Arial,Helvetica,sans-serif" font-size="14" font-weight="800">PREVIEW</text>'+
      '</svg>';
  }

  function dataUri(name,cat='template',icon='✦'){
    return 'data:image/svg+xml;charset=UTF-8,'+encodeURIComponent(serviceSvg(name,cat,icon));
  }

  function ensureModal(){
    let m=document.getElementById('lnk-visual-modal');
    if(m) return m;
    const style=document.createElement('style');
    style.id='lnk-visual-modal-style';
    style.textContent=`
      #lnk-visual-modal{position:fixed;inset:0;z-index:2147483000;display:none;align-items:center;justify-content:center;padding:24px}
      #lnk-visual-modal.open{display:flex}
      .lvm-backdrop{position:absolute;inset:0;background:rgba(0,4,9,.86);backdrop-filter:blur(14px)}
      .lvm-card{position:relative;width:min(1120px,96vw);max-height:92vh;overflow:auto;border:1px solid rgba(113,166,255,.26);border-radius:24px;background:linear-gradient(180deg,#0a111b,#05090f);box-shadow:0 40px 120px rgba(0,0,0,.7)}
      .lvm-head{display:flex;justify-content:space-between;gap:20px;align-items:center;padding:18px 20px;border-bottom:1px solid rgba(255,255,255,.08)}
      .lvm-head small{display:block;color:#68cfff;font:800 10px/1.2 Inter,Arial,sans-serif;letter-spacing:.14em;text-transform:uppercase;margin-bottom:5px}
      .lvm-head h3{margin:0;color:#f7fbff;font:800 22px/1.2 Inter,Arial,sans-serif}
      .lvm-close{width:42px;height:42px;border-radius:12px;border:1px solid rgba(255,255,255,.14);background:#0e1622;color:#fff;font-size:24px;cursor:pointer}
      .lvm-media{padding:18px}.lvm-media img{display:block;width:100%;height:auto;border-radius:18px;border:1px solid rgba(255,255,255,.08);background:#05090f}
      .lvm-foot{padding:0 20px 20px;color:#8497aa;font:500 12px/1.65 Inter,Arial,sans-serif}
      body.lvm-lock{overflow:hidden!important}
    `;
    document.head.appendChild(style);
    m=document.createElement('div');m.id='lnk-visual-modal';m.setAttribute('aria-hidden','true');
    m.innerHTML='<div class="lvm-backdrop" data-lvm-close></div><div class="lvm-card" role="dialog" aria-modal="true"><div class="lvm-head"><div><small>LNK DIGITAL • VISUAL PREVIEW</small><h3></h3></div><button class="lvm-close" type="button" data-lvm-close aria-label="Close">×</button></div><div class="lvm-media"><img alt=""></div><div class="lvm-foot">Vizuelni prikaz služi kao primjer stila. Boje, tekstovi, fotografije, sadržaj i funkcije prilagođavaju se projektu i brendu klijenta.</div></div>';
    document.body.appendChild(m);
    m.addEventListener('click',e=>{if(e.target.closest('[data-lvm-close]'))close()});
    document.addEventListener('keydown',e=>{if(e.key==='Escape'&&m.classList.contains('open'))close()});
    return m;
  }

  function open(src,title='Preview'){
    const m=ensureModal();
    m.querySelector('h3').textContent=title;
    const img=m.querySelector('img');img.src=src;img.alt=title;
    m.classList.add('open');m.setAttribute('aria-hidden','false');document.body.classList.add('lvm-lock');
  }
  function close(){
    const m=document.getElementById('lnk-visual-modal');if(!m)return;
    m.classList.remove('open');m.setAttribute('aria-hidden','true');document.body.classList.remove('lvm-lock');
  }

  document.addEventListener('click',e=>{
    const b=e.target.closest('[data-lnk-preview-src]');
    if(!b)return;
    e.preventDefault();
    open(b.dataset.lnkPreviewSrc,b.dataset.lnkPreviewTitle||'LNK DIGITAL Preview');
  });

  window.LNKVisuals={dataUri,serviceSvg,open,close};
})();