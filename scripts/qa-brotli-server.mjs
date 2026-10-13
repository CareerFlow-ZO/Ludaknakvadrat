/* Static localhost server for Lighthouse/Chromium CI.
   Reproduces Vercel's Brotli text compression without touching production. */
import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { resolve, relative, extname, join } from 'node:path';
import { brotliCompressSync, constants } from 'node:zlib';

const ROOT=process.cwd();
const MIME={
 '.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8',
 '.js':'text/javascript; charset=utf-8','.json':'application/json; charset=utf-8',
 '.xml':'application/xml; charset=utf-8','.svg':'image/svg+xml','.txt':'text/plain; charset=utf-8',
 '.webp':'image/webp','.png':'image/png','.jpg':'image/jpeg','.jpeg':'image/jpeg',
 '.ico':'image/x-icon','.woff2':'font/woff2','.pdf':'application/pdf',
};
const compressible=/\.(html|css|js|json|xml|svg|txt)$/i;
createServer(async(req,res)=>{
 if(!['GET','HEAD'].includes(req.method||'')){res.writeHead(405);return res.end('Method not allowed')}
 try{
  const reqPath=decodeURIComponent(new URL(req.url||'/', 'http://127.0.0.1:4173').pathname);
  const candidate=resolve(ROOT,'.'+reqPath,(reqPath.endsWith('/')?'index.html':''));
  if(relative(ROOT,candidate).startsWith('..')){res.writeHead(403);return res.end()}
  let filename=candidate;
  try{if((await stat(filename)).isDirectory())filename=join(filename,'index.html')}
  catch(_) {}
  const body=await readFile(filename);
  const ext=extname(filename).toLowerCase();
  const headers={'Content-Type':MIME[ext]||'application/octet-stream',
    'X-Content-Type-Options':'nosniff','Vary':'Accept-Encoding',
    'Cache-Control':ext==='.html'?'public, max-age=0, must-revalidate':'public, max-age=3600'};
  let output=body;
  if(compressible.test(filename)&&/\\bbr\\b/.test(req.headers['accept-encoding']||'')){
    output=brotliCompressSync(body,{params:{[constants.BROTLI_PARAM_QUALITY]:4}});
    headers['Content-Encoding']='br';
  }
  headers['Content-Length']=String(output.length);
  res.writeHead(200,headers);res.end(req.method==='HEAD'?undefined:output);
 }catch(err){res.writeHead(err.code==='ENOENT'?404:500,{'Content-Type':'text/plain'});res.end('Not found')}
}).listen(4173,'127.0.0.1',()=>console.log('QA Brotli server listening on 127.0.0.1:4173'));
