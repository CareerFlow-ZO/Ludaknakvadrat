import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const html = readFileSync(new URL("../seo-console.html", import.meta.url), "utf8");
const js = readFileSync(new URL("../seo-console.js", import.meta.url), "utf8");
assert.match(html, /<meta name="robots" content="noindex,nofollow,noarchive">/);
assert.match(html, /<script defer src="\/seo-console\.js"><\/script>/);
for (const id of ["file","status","clicks","impressions","ctr","position","keyword-rows","ideas","brief","search","locale","export","reset","copy"]) {
  assert.match(html, new RegExp('id="' + id + '"'), "Missing UI id: " + id);
}
assert.match(js, /function parseCSV\(/);
assert.match(js, /function parseQueries\(/);
assert.match(js, /function csvCell\(/);
assert.match(js, /navigator\.clipboard/);
assert.doesNotMatch(js, /\bfetch\s*\(|\bXMLHttpRequest\b|\bsendBeacon\s*\(/);
assert.doesNotMatch(js, /localStorage|sessionStorage/);
new Function(js); // Parse JavaScript without executing it.
console.log("LNK SEO Console contract PASS");
