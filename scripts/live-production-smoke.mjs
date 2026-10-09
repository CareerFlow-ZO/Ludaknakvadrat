#!/usr/bin/env node
// Read-only production smoke test. No writes, credentials, or client modifications.
import { readFileSync } from 'node:fs';
import assert from 'node:assert/strict';

const LNK = 'https://www.lnkdigital.com';
const problems = [];
async function request(url, redirect = 'follow') {
  const response = await fetch(url, {
    redirect,
    signal: AbortSignal.timeout(25000),
    headers: { 'User-Agent': 'LNK-DIGITAL-production-smoke-test/1.0' }
  });
  return response;
}
async function check(label, test) {
  try { await test(); console.log('PASS ' + label); }
  catch (e) { problems.push(label + ': ' + e.message); console.error('FAIL ' + label + ': ' + e.message); }
}

await check('LNK homepage HTML and recent responsive preview markup', async () => {
  const r = await request(LNK + '/');
  assert.equal(r.status, 200);
  assert.match(r.headers.get('content-type') || '', /text\/html/i);
  const body = await r.text();
  assert.match(body, /<title>LNK DIGITAL\b/);
  for (const image of ['beauty', 'barbershop', 'auto']) {
    assert(body.includes('/assets/previews/' + image + '-720.webp 720w'),
      'Homepage missing responsive ' + image + ' preview');
  }
  assert(body.includes('data-i18n-alt="heroImageAlt"'), 'Localized hero description missing');
  assert(body.includes('/assets/js/lnk-home.js'), 'Ten-language runtime script missing');
});
await check('Homepage 10-language script available', async () => {
  const r = await request(LNK + '/assets/js/lnk-home.js');
  assert.equal(r.status, 200);
  const body = await r.text();
  assert(body.includes('LNK_TRANSLATIONS') && body.includes('requestedLocale'),
    'Missing translations or direct language links');
});

for (const name of ['beauty', 'barbershop', 'auto']) {
  for (const size of ['', '-720']) {
    const file = name + size + '.webp', path = '/assets/previews/' + file;
    await check('WebP image ' + file + ' (HTTP, format, size)', async () => {
      const r = await request(LNK + path);
      assert.equal(r.status, 200);
      assert.equal(new URL(r.url).pathname, path, 'Unexpected image redirect');
      assert.match(r.headers.get('content-type') || '', /image\/webp/i);
      const bytes = Buffer.from(await r.arrayBuffer());
      assert.equal(bytes.toString('ascii', 0, 4), 'RIFF');
      assert.equal(bytes.toString('ascii', 8, 12), 'WEBP');
      const localBytes = readFileSync('assets/previews/' + file);
      assert.equal(bytes.length, localBytes.length, 'Served binary size differs from repository');
      assert(bytes.equals(localBytes), 'Served binary differs from source-controlled original');
      console.log('      ' + bytes.length + ' bytes');
    });
  }
}
await check('Canonical LNK domain redirect', async () => {
  const r = await request('https://lnkdigital.com/', 'manual');
  assert([301, 302, 307, 308].includes(r.status), 'Unexpected status ' + r.status);
  assert.equal(new URL(r.headers.get('location')).href, LNK + '/');
});
await check('Euro Gurman production homepage remains accessible', async () => {
  const r = await request('https://eurogurman.si/');
  assert.equal(r.status, 200, 'Euro Gurman unexpected HTTP ' + r.status);
  assert.match(r.headers.get('content-type') || '', /text\/html/i);
  const body = await r.text();
  assert.match(body, /<title>[^<]+<\/title>/i, 'Missing Euro Gurman page title');
});
await check('Euro Gurman www redirects to apex domain', async () => {
  const r = await request('https://www.eurogurman.si/', 'manual');
  assert([301, 302, 307, 308].includes(r.status), 'Unexpected www Euro Gurman status ' + r.status);
  assert.equal(new URL(r.headers.get('location')).host, 'eurogurman.si');
});

if (problems.length) {
  console.error('PRODUCTION SMOKE FAILED (' + problems.length + '):\n' + problems.join('\n'));
  process.exitCode = 1;
} else {
  console.log('PRODUCTION SMOKE PASS: 6 live WebPs match repository bytes, LNK homepage/script, redirects, Euro Gurman homepage.');
}
