import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const html = readFileSync(new URL("../seo-console.html", import.meta.url), "utf8");
const js = readFileSync(new URL("../seo-console.js", import.meta.url), "utf8");
const api = readFileSync(new URL("../api/seo-gsc.js", import.meta.url), "utf8");
assert.match(html, /<meta name="robots" content="noindex,nofollow,noarchive">/);
assert.match(html, /<script defer src="\/seo-console\.js"><\/script>/);
for (const id of ["file","status","clicks","impressions","ctr","position","keyword-rows","ideas","brief","search","locale","export","reset","copy","sync"]) {
  assert.match(html, new RegExp('id="' + id + '"'), "Missing UI id: " + id);
}
assert.match(js, /function parseCSV\(/);
assert.match(js, /function parseQueries\(/);
assert.match(js, /function csvCell\(/);
assert.match(js, /navigator\.clipboard/);
assert.match(js, /fetch\("\/api\/seo-gsc"/);
assert.doesNotMatch(js, /\bXMLHttpRequest\b|\bsendBeacon\s*\(/);
assert.match(api, /requireAuth\(req, res\)/);
assert.match(api, /GSC_SERVICE_ACCOUNT_EMAIL/);
assert.match(api, /GSC_PRIVATE_KEY/);
assert.match(api, /sc-domain:lnkdigital\.com/);
assert.doesNotMatch(js, /localStorage|sessionStorage/);
new Function(js); // Parse JavaScript without executing it.
new Function("require", "module", "process", api); // Parse CommonJS endpoint without executing it.
console.log("LNK SEO Console contract PASS");
