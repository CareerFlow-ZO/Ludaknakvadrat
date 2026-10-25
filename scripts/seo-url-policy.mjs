import assert from 'node:assert/strict';

export const ORIGIN = 'https://www.lnkdigital.com';
export const OLD_HOSTS = ['ludaknakvadrat.com', 'www.ludaknakvadrat.com'];
// Independent inventory: a missing sitemap entry must fail, not shrink test coverage.
export const PUBLIC_PATHS = [
  '/', '/web-design.html', '/izdelava-spletnih-strani.html',
  '/barbershop-website-design.html', '/auto-repair-website-design.html',
  '/prenova-spletne-strani.html', '/izdelava-spletnih-trgovin.html',
  '/izdelava-spletne-strani-cena.html', '/web-design-austria.html',
  '/web-design-germany.html', '/web-design-switzerland.html',
  '/web-design-croatia.html', '/web-design-italy.html', '/web-design-usa.html',
  '/restaurant-website-design.html', '/hotel-website-design.html',
  '/construction-company-website-design.html', '/small-business-website-design.html',
  '/website-redesign-services.html', '/web-design-portfolio.html',
  '/website-design-questions.html', '/seo-geo-aeo.html'
];
export const HOME_ALIASES = ['/index.html', '/lnk-digital-home.html'];
export const LANGUAGES = ['en', 'sl', 'de', 'hr', 'bs', 'sr', 'it', 'fr', 'es', 'sq'];
export const PREVIEW_DIRS = ['previews', 'euro-gurman-preview',
  'drone-records-sarajevo-preview', 'bosnia-preview', 'hoc-preview',
  'landforce-preview', 'potting-preview'];

const decode = s => s.replace(/&amp;/g, '&').replace(/&quot;/g, '"')
  .replace(/&apos;/g, "'").replace(/&lt;/g, '<').replace(/&gt;/g, '>');
export function sitemapUrls(xml) {
  assert.match(xml, /<urlset\b/, 'Expected an XML urlset');
  // Never filter by host before validation: wrong-host entries must be rejected.
  const urls = [...xml.matchAll(/<loc\b[^>]*>\s*([^<]+?)\s*<\/loc>/g)]
    .map(m => decode(m[1].trim()));
  assert.equal(urls.length, PUBLIC_PATHS.length, 'Missing or extra sitemap URLs');
  assert.equal(new Set(urls).size, urls.length, 'Duplicate sitemap URLs');
  assert.deepEqual([...urls].sort(), PUBLIC_PATHS.map(p => ORIGIN + p).sort(),
    'Sitemap must contain exactly the canonical public URL inventory');
  return urls;
}

function attributes(tag) {
  return Object.fromEntries([...tag.matchAll(/([\w:-]+)\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+))/g)]
    .map(m => [m[1].toLowerCase(), decode(m[2] ?? m[3] ?? m[4])]));
}
export function seoHead(html) {
  const head = (html.split(/<\/head\s*>/i)[0] || '')
    .replace(/<!--[\s\S]*?-->/g, '').replace(/<script\b[^>]*>[\s\S]*?<\/script\s*>/gi, '');
  const links = (head.match(/<link\b[^>]*>/gi) || []).map(attributes);
  const meta = (head.match(/<meta\b[^>]*>/gi) || []).map(attributes);
  return {
    canonicals: links.filter(a => (a.rel || '').toLowerCase().split(/\s+/).includes('canonical')).map(a => a.href),
    robots: meta.filter(a => /^(robots|googlebot)$/i.test(a.name || '')).map(a => a.content || '').join(' '),
    title: head.match(/<title>\s*([^<]+)\s*<\/title>/i)?.[1],
    lang: attributes(html.match(/<html\b[^>]*>/i)?.[0] || '').lang
  };
}
export const hasNoindex = value => /\b(?:noindex|none)\b/i.test(value || '');

export function checkIndexable(page, canonical) {
  assert.equal(page.status, 200, 'Expected HTTP 200');
  assert.match(page.headers.get('content-type') || '', /text\/html/i, 'Expected HTML');
  const head = seoHead(page.body);
  assert.deepEqual(head.canonicals, [canonical], 'Expected exactly one matching canonical');
  assert(!hasNoindex(head.robots + ' ' + (page.headers.get('x-robots-tag') || '')), 'Unexpected noindex');
  assert(head.title, 'Missing title');
  assert(head.lang, 'Missing HTML language');
}

export async function fetchChain(url, request = fetch) {
  const hops = [], seen = new Set();
  for (let i = 0; i <= 4; i++) {
    assert(!seen.has(url), 'Redirect loop: ' + url);
    seen.add(url);
    const r = await request(url, { redirect: 'manual', signal: AbortSignal.timeout(25000),
      headers: { 'User-Agent': 'LNK-DIGITAL-SEO-QA/2.0 (site owner)' } });
    if ([301, 302, 303, 307, 308].includes(r.status)) {
      const location = r.headers.get('location');
      await r.body?.cancel();
      assert(location, 'Redirect without Location');
      assert([301, 308].includes(r.status), 'Temporary SEO redirect: ' + url);
      const target = new URL(location, url);
      assert(['http:', 'https:'].includes(target.protocol), 'Unexpected redirect protocol');
      hops.push({ from: url, status: r.status, to: target.href });
      url = target.href;
    } else return { url, status: r.status, headers: r.headers, body: await r.text(), hops };
  }
  throw new Error('Too many redirect hops');
}
