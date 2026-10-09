#!/usr/bin/env node
// Independent read-only live crawl of LNK DIGITAL's 20 public SEO pages.
import assert from 'node:assert/strict';

const ORIGIN = 'https://www.lnkdigital.com';
const issues = [];
async function fetchPage(url) {
  const response = await fetch(url, {
    headers: { 'User-Agent': 'LNK-DIGITAL-SEO-QA/1.0 (site owner)' },
    signal: AbortSignal.timeout(20000),
    redirect: 'follow'
  });
  return { status: response.status, url: response.url,
    headers: response.headers, body: await response.text() };
}
const sitemap = await fetchPage(ORIGIN + '/sitemap.xml');
assert.equal(sitemap.status, 200, 'Sitemap must return 200');
assert(!/text\/html/i.test(sitemap.headers.get('content-type') || ''), 'Sitemap delivered HTML');
const urls = [...sitemap.body.matchAll(/<loc>\s*(https:\/\/www\.lnkdigital\.com\/[^<]*)\s*<\/loc>/g)]
  .map(match => match[1].trim().replaceAll('&amp;', '&'));
assert.equal(urls.length, 20, 'Expected 20 URLs in sitemap');
assert.equal(new Set(urls).size, 20, 'Duplicate sitemap URLs');
const robots = await fetchPage(ORIGIN + '/robots.txt');
assert.equal(robots.status, 200, 'robots.txt must return 200');
assert(robots.body.includes('Sitemap: ' + ORIGIN + '/sitemap.xml'), 'Wrong robots sitemap declaration');
let next = 0;
async function worker() {
  while (next < urls.length) {
    const url = urls[next++];
    const pathname = new URL(url).pathname;
    try {
      const page = await fetchPage(url);
      const canonical = page.body.match(/<link\s+rel=["']canonical["']\s+href=["']([^"']+)["']/i)?.[1];
      const title = page.body.match(/<title>([^<]+)<\/title>/i)?.[1]?.trim();
      const lang = page.body.match(/<html\b[^>]*\blang=["']([^"']+)["']/i)?.[1];
      const robotsMeta = page.body.match(/<meta\b[^>]*name=["']robots["'][^>]*content=["']([^"']+)["']/i)?.[1] || '';
      const robotsHeader = page.headers.get('x-robots-tag') || '';
      const errors = [];
      if (page.status !== 200) errors.push('HTTP ' + page.status);
      if (page.url !== url) errors.push('Unexpected redirect to ' + page.url);
      if (!/text\/html/i.test(page.headers.get('content-type') || '')) errors.push('Non-HTML response');
      if (canonical !== url) errors.push('Canonical ' + (canonical || 'missing'));
      if (!title) errors.push('Missing title');
      if (!lang) errors.push('Missing HTML language');
      if (/(?:noindex|none)/i.test(robotsMeta + ' ' + robotsHeader)) errors.push('Noindex detected');
      if (errors.length) issues.push(pathname + ': ' + errors.join('; '));
      console.log((errors.length ? 'FAIL' : 'PASS') + ' ' + page.status + ' ' + pathname +
        ' canonical=' + (canonical || '-') + ' lang=' + (lang || '-'));
    } catch (error) {
      issues.push(pathname + ': ' + error.message);
      console.error('FAIL ' + pathname + ': ' + error.message);
    }
  }
}
await Promise.all(Array.from({ length: 4 }, () => worker()));
if (issues.length) {
  console.error('LIVE SEO CRAWL FAILED (' + issues.length + '):\n' + issues.join('\n'));
  process.exitCode = 1;
} else console.log('LIVE SEO CRAWL PASS: 20/20 pages return HTML 200, self-canonical, title, language, and no index block.');
