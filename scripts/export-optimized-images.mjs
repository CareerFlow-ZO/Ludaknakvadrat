#!/usr/bin/env node
// Build optimized copies of existing public demo images. No uploads or credentials.
import sharp from 'sharp';
const files=[
  ['restaurant','assets/previews/restaurant.png'],
  ['ecommerce','assets/previews/ecommerce.png']
];
async function emit(name,raw){
 const b64=raw.toString('base64');
 console.log('ASSET_META:'+name+':'+raw.length);
 const n=Math.ceil(b64.length/3000);
 for(let k=0;k<n;k++)console.log('ASSET_B64:'+name+':'+k+'/'+n+':'+b64.slice(k*3000,(k+1)*3000));
}
for (const [name,source] of files) {
  for(const width of [720,1200]){
    const out=await sharp(source).rotate().resize({width,withoutEnlargement:true})
      .webp({quality:78,effort:5}).toBuffer();
    const outName=name+(width===720?'-720':'')+'.webp';
    await emit(outName,out);
  }
}
const url='https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=1200&auto=format&fit=crop&q=85';
const response=await fetch(url,{signal:AbortSignal.timeout(30000)});
if(!response.ok)throw Error('Could not download existing approved Nike shoe image: HTTP '+response.status);
const nike=Buffer.from(await response.arrayBuffer());
for(const width of [720,1200]){
 const out=await sharp(nike).resize({width,withoutEnlargement:true}).webp({quality:80,effort:5}).toBuffer();
 await emit('nike-shoe'+(width===720?'-720':'')+'.webp',out);
}
