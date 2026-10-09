#!/usr/bin/env node
// Static SEO quality gate for LNK DIGITAL. No API keys or external network required.
import { readFileSync, existsSync, readdirSync, statSync } from 'node:fs';
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

// Legacy LNK canonical consistency: prevent conflicting host hints.
const legacyRobots = text('lnk-robots.txt');
const legacySitemap = text('lnk-sitemap.xml');
if (legacyRobots !== robots) fail('lnk-robots.txt', 'Legacy robots file differs from canonical robots file');
if (legacySitemap !== sitemap) fail('lnk-sitemap.xml', 'Legacy sitemap differs from canonical sitemap');
const legacyLanding = text('lnk-digital-home.html');
if (legacyLanding.includes('https://lnkdigital.com/')) fail('lnk-digital-home.html', 'Outdated non-www absolute SEO URL');
for (const redirect of vercel.redirects || []) {
  if (typeof redirect.destination === 'string' && redirect.destination.startsWith('https://lnkdigital.com/')) {
    fail('vercel.json', 'Legacy redirect introduces a second redirect hop: ' + redirect.source);
  }
}
const euroRoot = (vercel.routes || []).some(r => r.src === '^/$' && r.dest === '/euro-gurman-preview/index.html' &&
  r.has?.some(h => h.type === 'host' && h.value === 'eurogurman.si'));
const euroWww = (vercel.routes || []).some(r => r.src === '^/(.*)$' && r.status === 308 &&
  r.headers?.Location === 'https://eurogurman.si/$1' && r.has?.some(h => h.type === 'host' && h.value === 'www.eurogurman.si'));
if (!euroRoot || !euroWww) fail('vercel.json', 'Euro Gurman production routing must remain intact');

// Homepage performance regression guard (LNK-only; client site routes unchanged).
const homeHtml = text('index.html');
const homeJsPath = 'assets/js/lnk-home.js';
if (!homeHtml.includes('<script defer src="/assets/js/lnk-home.js"></script>')) {
  fail('index.html', 'Missing deferred homepage script');
}
if (!homeHtml.includes('<link rel="preload" as="image" href="/assets/photos/hero-600.webp"') ||
    !homeHtml.includes('imagesrcset="/assets/photos/hero-600.webp 600w, /assets/photos/hero.webp 960w"') ||
    !homeHtml.includes('fetchpriority="high">')) {
  fail('index.html', 'Missing high-priority hero preload');
}
if (/const LNK_TRANSLATIONS\s*=/.test(homeHtml)) fail('index.html', 'Homepage translation bundle should not block inline HTML parsing');
if (!existsSync(join(root, homeJsPath))) {
  fail(homeJsPath, 'Deferred homepage script does not exist');
} else {
  const homeJs = text(homeJsPath);
  if (!homeJs.includes('const LNK_TRANSLATIONS=') || !homeJs.includes('const btn=document.getElementById')) {
    fail(homeJsPath, 'Translations or mobile navigation missing from optimized bundle');
  }
  try { new Function(homeJs); } catch (error) { fail(homeJsPath, 'Invalid JavaScript syntax: ' + error.message); }
}

// Verify that all local resources linked from indexable pages exist.
const localAssetPattern = /\.(?:html|css|js|png|jpe?g|webp|svg|ico|woff2?|pdf)$/i;
const validatedAssets = new Set();
for (const url of urls) {
  const pathname = new URL(url).pathname;
  const pageFile = pathname === '/' ? 'index.html' : pathname.slice(1);
  if (!existsSync(join(root, pageFile))) continue;
  const markup = text(pageFile);
  for (const [, href] of markup.matchAll(/\b(?:src|href)=["'](\/[^"']+)["']/gi)) {
    const path = href.split(/[?#]/)[0].slice(1);
    if (!localAssetPattern.test(path) || validatedAssets.has(path)) continue;
    validatedAssets.add(path);
    if (path.includes('..') || !existsSync(join(root, path))) {
      fail(pageFile, 'Missing local asset or link target: /' + path);
    }
  }
}
const homeImages = [...homeHtml.matchAll(/<img\b[^>]*>/gi)].map(match => match[0]);
for (const image of ['beauty', 'barbershop', 'auto']) {
  const tag = homeImages.find(tag => tag.includes('/assets/previews/' + image + '.png')) || '';
  if (!tag.includes('loading="lazy"') || !tag.includes('fetchpriority="low"')) {
    fail('index.html', 'Portfolio image should load lazily at low priority: ' + image);
  }
}

// LNK DIGITAL responsive images: maintain original photo files for retina displays.
const photoNames = ['hero', 'strategy', 'artdirection', 'business', 'redesign', 'seo',
  'discover', 'design', 'build', 'launch', 'positioning', 'mobile', 'growth'];
for (const name of photoNames) {
  const original = `assets/photos/${name}.webp`;
  const small = `assets/photos/${name}-600.webp`;
  if (!existsSync(join(root, original)) || !existsSync(join(root, small))) {
    fail('index.html', `Missing responsive image: ${original} or ${small}`);
    continue;
  }
  if (statSync(join(root, small)).size >= statSync(join(root, original)).size) {
    fail(small, 'Responsive variant must be smaller than original');
  }
  const expectedSrcset = `srcset="/assets/photos/${name}-600.webp 600w, /assets/photos/${name}.webp 960w"`;
  if (!homeHtml.includes(expectedSrcset)) fail('index.html', `Missing responsive srcset: ${name}`);
}
if (!homeHtml.includes('imagesrcset="/assets/photos/hero-600.webp 600w, /assets/photos/hero.webp 960w"')) {
  fail('index.html', 'Hero image preload must match responsive source candidates');
}

// Prevent the Lighthouse non-composited gradient animation from returning on phones.
const mobileStaticGradient = /@media\s*\(max-width:\s*760px\)\s*\{\s*\.gradient-text\s*\{\s*animation:\s*none\s*;\s*background-size:\s*100%\s+100%\s*;\s*background-position:\s*50%\s+50%\s*;/;
if (!mobileStaticGradient.test(homeHtml)) {
  fail('index.html', 'Mobile heading gradient must not animate background-position');
}

// Accessible image regression guard for all 20 indexable LNK pages.
for (const url of urls) {
  const pageFile = new URL(url).pathname.slice(1) || 'index.html';
  if (!existsSync(join(root, pageFile))) continue;
  const pageMarkup = text(pageFile);
  for (const match of pageMarkup.matchAll(/<img\b[^>]*>/gi)) {
    if (!/\balt=["'][^"']*["']/i.test(match[0])) {
      fail(pageFile, 'Image without alt attribute: ' + match[0].slice(0, 90));
    }
  }
}
if (!homeHtml.includes('data-i18n-alt="heroImageAlt"')) {
  fail('index.html', 'Featured visual must have language-aware image description');
}

// Portfolio preview performance guard across the 20 LNK pages.
const previews = ['beauty', 'barbershop', 'auto'];
for (const name of previews) {
  const original = join(root, 'assets/previews/' + name + '.png');
  for (const suffix of ['.webp', '-720.webp']) {
    const optimized = join(root, 'assets/previews/' + name + suffix);
    if (!existsSync(original) || !existsSync(optimized)) {
      fail('assets/previews', 'Missing original or WebP preview asset: ' + name + suffix);
      continue;
    }
    if (statSync(optimized).size >= statSync(original).size) {
      fail('assets/previews', 'Preview WebP must be smaller than original PNG: ' + name + suffix);
    }
  }
}
let optimizedImageCount = 0;
for (const url of urls) {
  const pageFile = new URL(url).pathname.slice(1) || 'index.html';
  const markup = text(pageFile);
  for (const match of markup.matchAll(/<img\b[^>]*>/gi)) {
    const tag = match[0];
    const item = tag.match(/src="\/assets\/previews\/(beauty|barbershop|auto)\.(png|webp)"/);
    if (!item) continue;
    const name = item[1];
    optimizedImageCount++;
    const expected = 'srcset="/assets/previews/' + name + '-720.webp 720w, /assets/previews/' + name + '.webp 1448w"';
    if (item[2] !== 'webp' || !tag.includes(expected) || !tag.includes(' sizes="')) {
      fail(pageFile, 'Portfolio preview missing responsive WebP: ' + name);
    }
    if (!tag.includes('loading="lazy"') || !tag.includes('decoding="async"') || !tag.includes('fetchpriority="low"')) {
      fail(pageFile, 'Portfolio preview loading hints regressed: ' + name);
    }
  }
}
if (optimizedImageCount !== 56) fail('index.html', 'Portfolio preview image count unexpectedly changed: ' + optimizedImageCount);

if (failures.length) {
  console.error(`SEO QA FAILED (${failures.length} issues)\n` + failures.map(e => ` - ${e}`).join('\n'));
  process.exitCode = 1;
} else {
  console.log(`SEO QA PASS: ${urls.length} public pages, metadata, JSON-LD, image dimensions, hreflang and preview noindex rules.`);
}
