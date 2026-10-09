#!/usr/bin/env node
// Static SEO quality gate for LNK DIGITAL. No API keys or external network required.
import { readFileSync, existsSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

const root = process.cwd();
const host = 'https://www.lnkdigital.com';
const failures = [];
const text = (path) => readFileSync(join(root, path), 'utf8');
const fail = (where, message) => failures.push(`${where}: ${message}`);

const robots = text('robots.txt');
const sitemap = text('sitemap.xml');
if (!robots.includes(`Sitemap: ${host}/sitemap.xml`)) {
  fail('robots.txt', 'Sitemap URL must match the canonical host');
}
const urls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => m[1]);
if (!urls.length) fail('sitemap.xml', 'No indexable URLs found');
if (new Set(urls).size !== urls.length) fail('sitemap.xml', 'Duplicate URLs found');

for (const url of urls) {
  let parsed;
  try { parsed = new URL(url); } catch { fail('sitemap.xml', `Invalid URL: ${url}`); continue; }
  if (parsed.origin !== host) fail('sitemap.xml', `Wrong canonical origin: ${url}`);
  if (/-preview\/|\/previews\/|\/admin\b|\/success\.html/.test(parsed.pathname)) {
    fail('sitemap.xml', `Private or non-search page exposed: ${url}`);
  }
  const file = parsed.pathname === '/' ? 'index.html' : parsed.pathname.replace(/^\//, '');
  if (!existsSync(join(root, file))) { fail(file, 'Referenced in sitemap but file is missing'); continue; }
  const html = text(file);
  const canonical = html.match(/<link\s+rel=["']canonical["']\s+href=["']([^"']+)["']/i)?.[1];
  if (canonical !== url) fail(file, `Canonical mismatch: ${canonical || 'missing'}; expected ${url}`);
  if (!/<html\b[^>]*\blang=["'][^"']+["']/i.test(html)) fail(file, 'Missing html lang');
  if (!/<meta\b[^>]*\bname=["']viewport["']/i.test(html)) fail(file, 'Missing mobile viewport');
  if (!/<title>\s*[^<]+\s*<\/title>/i.test(html)) fail(file, 'Missing page title');
  if (!/<meta\b[^>]*\bname=["']description["']\s+content=["'][^"']{30,}/i.test(html)) fail(file, 'Missing useful meta description');
  if (!/<h1\b/i.test(html)) fail(file, 'Missing H1');
  const og = html.match(/<meta\b[^>]*\bproperty=["']og:url["']\s+content=["']([^"']+)/i)?.[1];
  if (og && og !== url) fail(file, `Open Graph URL differs from canonical: ${og}`);

  for (const tag of html.match(/<img\b[^>]*>/gi) || []) {
    if (!/\balt=["'][^"']*["']/i.test(tag)) fail(file, `Image missing alt: ${tag.slice(0, 90)}`);
    if (!/\bwidth=["']\d+["']/i.test(tag) || !/\bheight=["']\d+["']/i.test(tag)) {
      fail(file, `Image missing intrinsic dimensions: ${tag.slice(0, 90)}`);
    }
  }
  for (const match of html.matchAll(/<script\b[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)) {
    try { JSON.parse(match[1]); } catch { fail(file, 'Invalid JSON-LD schema data'); }
  }
}

for (const [, href] of sitemap.matchAll(/<xhtml:link\b[^>]*href=["']([^"']+)["']/g)) {
  if (!urls.includes(href)) fail('sitemap.xml', `hreflang target not listed as canonical URL: ${href}`);
}

const vercel = JSON.parse(text('vercel.json'));
const previewDirs = readdirSync(root, { withFileTypes: true })
  .filter(d => d.isDirectory() && (d.name === 'previews' || d.name.endsWith('-preview')))
  .map(d => d.name);
for (const dir of previewDirs) {
  const expected = `/${dir}/(.*)`;
  const rule = (vercel.headers || []).find(r => r.source === expected);
  if (!rule?.headers?.some(h => h.key.toLowerCase() === 'x-robots-tag' && /noindex/i.test(h.value))) {
    fail('vercel.json', `Missing noindex response header for ${expected}`);
  }
}
const successRule = (vercel.headers || []).find(r => r.source === '/success.html');
if (!successRule?.headers?.some(h => h.key.toLowerCase() === 'x-robots-tag' && /noindex/i.test(h.value))) {
  fail('vercel.json', 'Payment success page should be noindex');
}

// Legacy LNK canonical consistency: never publish conflicting host hints.
const legacyRobots = text('lnk-robots.txt');
const legacySitemap = text('lnk-sitemap.xml');
if (legacyRobots !== robots) fail('lnk-robots.txt', 'Legacy robots file differs from the canonical robots file');
if (legacySitemap !== sitemap) fail('lnk-sitemap.xml', 'Legacy sitemap differs from the canonical sitemap');
const legacyLanding = text('lnk-digital-home.html');
if (/https:\/\/lnkdigital\.com\//.test(legacyLanding)) fail('lnk-digital-home.html', 'Outdated non-www absolute SEO URL');
for (const redirect of vercel.redirects || []) {
  if (typeof redirect.destination === 'string' && redirect.destination.startsWith('https://lnkdigital.com/')) {
    fail('vercel.json', 'Legacy redirect introduces a second canonical redirect hop: ' + redirect.source);
  }
}
const euroRoot = (vercel.routes || []).some(r => r.src === '^/
  console.error(`SEO QA FAILED (${failures.length} issues)\n` + failures.map(e => ` - ${e}`).join('\n'));
  process.exitCode = 1;
} else {
  console.log(`SEO QA PASS: ${urls.length} public pages, metadata, JSON-LD, image dimensions, hreflang and preview noindex rules.`);
}
 && r.dest === '/euro-gurman-preview/index.html' &&
  r.has?.some(h => h.type === 'host' && h.value === 'eurogurman.si'));
const euroWww = (vercel.routes || []).some(r => r.src === '^/(.*)
  console.error(`SEO QA FAILED (${failures.length} issues)\n` + failures.map(e => ` - ${e}`).join('\n'));
  process.exitCode = 1;
} else {
  console.log(`SEO QA PASS: ${urls.length} public pages, metadata, JSON-LD, image dimensions, hreflang and preview noindex rules.`);
}
 && r.status === 308 &&
  r.headers?.Location === 'https://eurogurman.si/$1' && r.has?.some(h => h.type === 'host' && h.value === 'www.eurogurman.si'));
if (!euroRoot || !euroWww) fail('vercel.json', 'Euro Gurman production routing must remain intact');

if (failures.length) {
  console.error(`SEO QA FAILED (${failures.length} issues)\n` + failures.map(e => ` - ${e}`).join('\n'));
  process.exitCode = 1;
} else {
  console.log(`SEO QA PASS: ${urls.length} public pages, metadata, JSON-LD, image dimensions, hreflang and preview noindex rules.`);
}
