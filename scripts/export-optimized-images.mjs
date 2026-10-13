#!/usr/bin/env node
// Build optimized copies of existing public demo images. No uploads or credentials.
import sharp from 'sharp';
const files=[
  ['restaurant','assets/previews/restaurant.png'],
  ['ecommerce','assets/previews/ecommerce.png']
];
for (const [name,source] of files) {
  for(const width of [720,1200]){
    const out=await sharp(source).rotate().resize({width,withoutEnlargement:true})
      .webp({quality:78,effort:5}).toBuffer();
    const outName=name+(width===720?'-720':'')+'.webp';
    const code=out.toString('base64');
    console.log('ASSET_META:'+outName+':'+out.length);
    const n=Math.ceil(code.length/3000);
    for(let k=0;k<n;k++)
      console.log('ASSET_B64:'+outName+':'+k+'/'+n+':'+code.slice(k*3000,(k+1)*3000));
  }
}