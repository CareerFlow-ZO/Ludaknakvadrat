#!/usr/bin/env node
// Read-only HTTP audit. This proves technical indexability, never Google index status.
import assert from 'node:assert/strict';
import { ORIGIN, OLD_HOSTS, PUBLIC_PATHS, HOME_ALIASES, LANGUAGES,
  PREVIEW_DIRS, sitemapUrls, seoHead, hasNoindex, checkIndexable, fetchChain } from './seo-url-policy.mjs';

const issues = [], jobs = [];
const add = (label, run) => jobs.push({label, run});
for (const path of ['/sitemap.xml', '/lnk-sitemap.xml']) {
  add(path, async () => {
    const r = await fetchChain(ORIGIN + path);
    assert.equal(r.status, 200);
    assert.equal(r.hops.length, 0, 'Sitemap must not redirect');
    assert.match(r.headers.get('content-type') || '', /xml/i, 'Expected XML content type');
    sitemapUrls(r.body);
  });
}
add('/robots.txt', async () => {
  const r = await fetchChain(ORIGIN + '/robots.txt');
  assert.equal(r.status, 200);
  assert.equal(r.hops.length, 0);
  assert.match(r.headers.get('content-type') || '', /text\/plain/i);
  assert(r.body.includes('Sitemap: ' + ORIGIN + '/sitemap.xml'));
  // Check Googlebot-specific and wildcard groups, including broad accidental blocks.
  const groups = []; let agents = [], rules = [];
  for (const line of [...r.body.split(/\r?\n/), 'User-agent: __end__']) {
    const match = line.replace(/#.*$/, '').trim().match(/^([\w-]+)\s*:\s*(.*)$/);
    if (!match) continue;
    const key = match[1].toLowerCase(), value = match[2].trim();
    if (key === 'user-agent') {
      if (rules.length) { groups.push({agents, rules}); agents = []; rules = []; }
      agents.push(value.toLowerCase());
    } else if (['allow', 'disallow'].includes(key)) rules.push({key, value});
  }
  const specific = groups.filter(g => g.agents.includes('googlebot'));
  const applicable = specific.length ? specific : groups.filter(g => g.agents.includes('*'));
  for (const path of PUBLIC_PATHS) {
    const matching = applicable.flatMap(g => g.rules).filter(rule => {
      if (!rule.value) return false;
      const pattern = rule.value.split('*').map(part => part.replace(/[.+?^{}()|[\]\\]/g, '\\$&')).join('.*');
      return new RegExp('^' + pattern).test(path);
    }).sort((a,b) => b.value.length - a.value.length || (a.key === 'allow' ? -1 : 1));
    assert(matching[0]?.key !== 'disallow', 'robots.txt blocks ' + path);
  }
});
for (const path of PUBLIC_PATHS) add(path, async () => {
  const r = await fetchChain(ORIGIN + path);
  assert.equal(r.hops.length, 0, 'Canonical sitemap URL redirects');
  checkIndexable(r, ORIGIN + path);
});

if (process.argv.includes('--variants')) {
  // All public paths across HTTPS/HTTP, new/old host and www/apex variants.
  const hosts = ['www.lnkdigital.com', 'lnkdigital.com', ...OLD_HOSTS];
  for (const host of hosts) for (const scheme of ['https:', 'http:']) {
    for (const path of [...PUBLIC_PATHS, ...HOME_ALIASES]) {
      const source = scheme + '//' + host + path;
      if (scheme === 'https:' && host === 'www.lnkdigital.com' && PUBLIC_PATHS.includes(path)) continue;
      const target = ORIGIN + (HOME_ALIASES.includes(path) ? '/' : path);
      add(source, async () => {
        const r = await fetchChain(source);
        assert(r.hops.length > 0, 'Variant must permanently redirect');
        assert.equal(r.url, target, 'Wrong redirect destination');
        checkIndexable(r, target);
      });
    }
  }
  for (const lang of LANGUAGES) for (const suffix of ['', '&service=redesign']) {
    const query = '/?lang=' + lang + suffix;
    add(query, async () => {
      const r = await fetchChain(ORIGIN + query);
      assert.equal(r.hops.length, 0, 'Language/brief parameters must remain usable');
      checkIndexable(r, ORIGIN + '/');
    });
  }
  // Verify query preservation on the migrated old homepage and index alias.
  for (const path of ['/', '/index.html']) add('legacy query ' + path, async () => {
    const r = await fetchChain('https://www.ludaknakvadrat.com' + path + '?lang=sl&service=redesign');
    const final = new URL(r.url);
    assert.equal(final.origin + final.pathname, ORIGIN + '/');
    assert.equal(final.searchParams.get('lang'), 'sl');
    assert.equal(final.searchParams.get('service'), 'redesign');
    checkIndexable(r, ORIGIN + '/');
  });
  for (const host of ['www.lnkdigital.com', 'www.ludaknakvadrat.com']) {
    for (const path of ['/privacy.html', '/admin.html', '/success.html',
      '/lnk-growth-dashboard.html', '/lnk-growth-secure.html', ...PREVIEW_DIRS.map(p => '/' + p + '/')]) {
      add('noindex ' + host + path, async () => {
        const r = await fetchChain('https://' + host + path);
        // Some preview directory roots intentionally do not exist.
        assert([200, 401, 403, 404, 410].includes(r.status), 'Unexpected HTTP ' + r.status);
        if (r.status === 200) assert(hasNoindex(seoHead(r.body).robots + ' ' + (r.headers.get('x-robots-tag') || '')), 'Missing intentional noindex');
      });
    }
  }
}
let next = 0, passed = 0;
await Promise.all(Array.from({length: 6}, async () => {
  while (next < jobs.length) {
    const job = jobs[next++];
    try { await job.run(); passed++; console.log('PASS ' + job.label); }
    catch (error) { issues.push(job.label + ': ' + error.message); console.error('FAIL ' + issues.at(-1)); }
  }
}));
console.log(`LIVE SEO: ${passed}/${jobs.length} HTTP checks passed. Google indexing was not checked.`);
if (issues.length) { console.error(issues.join('\n')); process.exitCode = 1; }
