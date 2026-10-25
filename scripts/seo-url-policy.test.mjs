import { test } from 'node:test';
import assert from 'node:assert/strict';
import { ORIGIN, PUBLIC_PATHS, sitemapUrls, seoHead, checkIndexable, fetchChain } from './seo-url-policy.mjs';
const xml = urls => '<urlset>' + urls.map(u => '<url><loc>' + u + '</loc></url>').join('') + '</urlset>';
const urls = PUBLIC_PATHS.map(p => ORIGIN + p);
test('sitemap rejects missing, extra, duplicate and wrong-host entries', () => {
  assert.deepEqual(sitemapUrls(xml(urls)), urls);
  for (const bad of [urls.slice(1), [...urls, ORIGIN + '/privacy.html'],
    [...urls.slice(1), urls[1]], urls.map((u,i) => i ? u : 'https://www.ludaknakvadrat.com/')]) {
    assert.throws(() => sitemapUrls(xml(bad)));
  }
});
test('head parsing handles attribute order, googlebot, duplicates and commented tags', () => {
  const body = `<html lang='en'><head><!-- <link rel="canonical" href="bad"> -->
    <title>Example</title><link href='${ORIGIN}/' rel='canonical'>
    <meta content='noindex' name='googlebot'></head>`;
  assert.deepEqual(seoHead(body).canonicals, [ORIGIN + '/']);
  const page = {status:200, headers:new Headers({'content-type':'text/html'}), body};
  assert.throws(() => checkIndexable(page, ORIGIN + '/'), /noindex/);
  page.body = body.replace('noindex', 'index');
  checkIndexable(page, ORIGIN + '/');
  page.body = page.body.replace('</head>', `<link rel="canonical" href="${ORIGIN}/"></head>`);
  assert.throws(() => checkIndexable(page, ORIGIN + '/'), /canonical/);
});
test('HTTP X-Robots-Tag overrides an indexable HTML head', () => {
  assert.throws(() => checkIndexable({status:200, headers:new Headers({
    'content-type':'text/html', 'x-robots-tag':'googlebot: noindex'}),
    body:`<html lang="en"><head><title>Example</title><link rel="canonical" href="${ORIGIN}/"></head>`}, ORIGIN + '/'), /noindex/);
});
test('redirect walker keeps permanent hops and rejects temporary redirects and loops', async () => {
  const request = async u => u.endsWith('/old') ? new Response(null,{status:308,headers:{location:'/'}}) : new Response('ok');
  const result = await fetchChain(ORIGIN + '/old', request);
  assert.equal(result.url, ORIGIN + '/');
  assert.equal(result.hops.length, 1);
  await assert.rejects(fetchChain(ORIGIN + '/', async () => new Response(null,{status:302,headers:{location:'/other'}})), /Temporary/);
  await assert.rejects(fetchChain(ORIGIN + '/', async () => new Response(null,{status:308,headers:{location:'/'}})), /loop/);
});
