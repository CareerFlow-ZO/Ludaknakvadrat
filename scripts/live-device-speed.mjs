#!/usr/bin/env node
// Real Chromium QA across phone, tablet and desktop. Read-only in production.
import { chromium } from 'playwright';
import { mkdir, writeFile } from 'node:fs/promises';
const BASE=process.env.LNK_URL||'https://www.lnkdigital.com';
const profiles=[
 {name:'small-phone',width:360,height:780,dpr:3,mobile:true},
 {name:'iphone',width:390,height:844,dpr:3,mobile:true},
 {name:'tablet',width:768,height:1024,dpr:2,mobile:true},
 {name:'desktop',width:1440,height:900,dpr:1,mobile:false},
 {name:'wide-desktop',width:1920,height:1080,dpr:1,mobile:false}
];
const failures=[], reports=[];
await mkdir('qa-report',{recursive:true});
const browser=await chromium.launch({headless:true,args:['--no-sandbox']});
for(const profile of profiles){
 const context=await browser.newContext({
   viewport:{width:profile.width,height:profile.height},
   deviceScaleFactor:profile.dpr,isMobile:profile.mobile,
   hasTouch:profile.mobile,reducedMotion:'reduce',locale:'en-US',
   ignoreHTTPSErrors:false
 });
 await context.addInitScript(()=>{
   window.__lnkVitals={lcp:0,cls:0};
   try{
     new PerformanceObserver(list=>{
       for(const e of list.getEntries())window.__lnkVitals.lcp=e.startTime;
     }).observe({type:'largest-contentful-paint',buffered:true});
     new PerformanceObserver(list=>{
       for(const e of list.getEntries())
         if(!e.hadRecentInput)window.__lnkVitals.cls+=e.value;
     }).observe({type:'layout-shift',buffered:true});
   }catch(_e){}
 });
 const page=await context.newPage();
 const errors=[];
 page.on('pageerror',error=>errors.push(error.message));
 try {
   const response=await page.goto(BASE+'/',{waitUntil:'domcontentloaded',timeout:45000});
   if(response?.status()!==200)throw Error('Home HTTP '+response?.status());
   await page.waitForTimeout(1800);
   const metric=await page.evaluate(()=>{
     const nav=performance.getEntriesByType('navigation')[0];
     const doc=document.documentElement;
     return {
       title:document.title,
       width:innerWidth,documentWidth:doc.scrollWidth,
       ttfbMs:Math.round(nav?.responseStart||0),
       domContentLoadedMs:Math.round(nav?.domContentLoadedEventEnd||0),
       loadMs:Math.round(nav?.loadEventEnd||0),
       lcpMs:Math.round(window.__lnkVitals?.lcp||0),
       cls:Number((window.__lnkVitals?.cls||0).toFixed(3)),
       images:document.images.length,
       loadedImages:[...document.images].filter(i=>i.complete&&i.naturalWidth>0).length,
       failedVisibleImages:[...document.images].filter(i=>i.complete&&i.naturalWidth===0&&getComputedStyle(i).display!=='none').map(i=>i.src)
     };
   });
   reports.push({profile:profile.name,...metric});
   if(metric.documentWidth>metric.width+3)
     failures.push(profile.name+': horizontal overflow '+metric.documentWidth+'px vs '+metric.width);
   if(!metric.title.includes('LNK DIGITAL'))failures.push(profile.name+': title missing');
   if(errors.length)failures.push(profile.name+': JS exceptions '+errors.join('; '));
   await page.screenshot({path:'qa-report/'+profile.name+'.png',fullPage:true,animations:'disabled',timeout:20000});
   // Test navigation, real image selection and language changes without submitting data.
   if(profile.name==='iphone'||profile.name==='desktop'){
     for(const name of ['restaurant','shop','realestate']){
       await page.locator('[data-lnku-demo="'+name+'"]').click({timeout:10000});
       await page.waitForTimeout(450);
       const chosen=await page.locator('#lnkuMainImage').evaluate(img=>({
         src:img.getAttribute('src')||'',actual:img.currentSrc,
         srcset:img.getAttribute('srcset')||''
       }));
       const button=await page.locator('[data-lnku-demo="'+name+'"]').getAttribute('aria-pressed');
       if(button!=='true')failures.push(profile.name+': '+name+' active tab not set');
       if(name==='shop' && (!chosen.src.includes('unsplash.com')||chosen.srcset))
         failures.push(profile.name+': e-commerce tab displays wrong image candidate');
       if(name==='restaurant' && (!chosen.src.includes('restaurant.png')||chosen.srcset))
         failures.push(profile.name+': restaurant tab displays wrong image candidate');
     }
     for(const lang of ['en','sl','de','bs','fr','it','es','sq','hr','sr']){
       await page.locator('#languageSelect').selectOption(lang);
       const active=await page.locator('html').getAttribute('lang');
       if(active!==lang)failures.push(profile.name+': language '+lang+' did not activate');
     }
     if(profile.mobile){
       const menu=page.locator('#menuBtn');
       await menu.click();
       if(await menu.getAttribute('aria-expanded')!=='true')
         failures.push(profile.name+': mobile menu did not expand');
       await menu.click();
     }
     const form=page.locator('#lnkLeadForm');
     if(await form.count()!==1)failures.push(profile.name+': inquiry form missing');
     else {
       await form.locator('input[name="name"]').fill('QA Name');
       await form.locator('input[name="email"]').fill('qa@example.invalid');
       await form.locator('textarea[name="message"]').fill('Test form validation without sending.');
       await form.locator('input[name="consent"]').check();
       const valid=await form.evaluate(el=>el.checkValidity());
       if(!valid)failures.push(profile.name+': form invalid with correct values');
       // Never submit: this is production and no fake customer lead should be created.
     }
   }
   console.log('DEVICE '+JSON.stringify({profile:profile.name,metric}));
 }catch(error){failures.push(profile.name+': '+error.message);}
 finally {await context.close();}
}
// Navigation, SEO and payment UI HTTP checks; never create Checkout sessions or charge cards.
const pages=['/seo-geo-aeo.html','/privacy.html','/ponuda/','/kalkulator/','/web-design-portfolio.html'];
for(const path of pages){
 try{
   const r=await fetch(BASE+path,{signal:AbortSignal.timeout(25000)});
   if(r.status!==200)failures.push(path+': HTTP '+r.status);
   else console.log('HTTP PASS '+path+' '+r.status);
 }catch(e){failures.push(path+': '+e.message);}
}
await writeFile('qa-report/device-speed.json',JSON.stringify({reports,failures},null,2));
await browser.close();
if(failures.length){
 console.error('DEVICE QA FAILED:\n'+failures.map(x=>' - '+x).join('\n'));
 process.exitCode=1;
}else console.log('DEVICE QA PASS: 5 device sizes, interactions, accessibility/overflow, live key pages');
