# LNK DIGITAL indexing recovery — 25 October 2026

## Scope and expected exclusions

Canonical origin: https://www.lnkdigital.com. The 22 public URLs are independently
listed in scripts/seo-url-policy.mjs and must match both sitemap XML files exactly.
Every public business path on either ludaknakvadrat.com host permanently redirects
to the same path on the canonical origin. Homepage aliases index.html and
lnk-digital-home.html redirect to /. Rules are explicitly host/path scoped; music,
API, payment, client and preview routes are not blanket redirected.

Language and service query parameters remain usable and canonicalize to the
homepage. This is the existing product choice, not independent multilingual SEO.
Privacy, admin, payment-success, internal dashboards and previews remain noindex.
An alternative-page, redirect or intentional noindex GSC exclusion is not a defect
and should not be changed merely to make an exclusion count disappear.

## Verification

- node --test scripts/seo-url-policy.test.mjs
- node scripts/seo-audit.mjs
- node scripts/live-seo-crawl.mjs
- node scripts/live-seo-crawl.mjs --variants (after deployment)
- node scripts/live-production-smoke.mjs

The full HTTP suite covers all 22 public paths and two homepage aliases across
HTTP/HTTPS and all four old/new www/apex hosts; it also tests query preservation,
all ten language parameters, intentional exclusions, both sitemaps and robots.
It records failures rather than treating a followed redirect as a canonical 200.
Existing Vercel apex-to-www domain redirects may add a hop before path migration.
Do not replace them with a domain-wide redirect to LNK: unrelated routes are shared.

HTTP tests do not establish Google indexing or Google's selected canonical.
They inspect response HTML/headers, not a rendered JavaScript DOM. Language DOM
behavior remains covered by the existing browser/locale QA.

## Remaining Search Console work

The three emails dated 22 October confirm canonical exclusion for lnkdigital.com,
and noindex plus redirects (including submitted-sitemap pages) for
https://www.ludaknakvadrat.com/. They do not list affected URLs or last crawl dates.
GSC Wizard access was refused because its trial/subscription is inactive.

With Search Console access:
1. Export examples for each exclusion and record last crawl, referring sitemap,
   declared canonical and Google-selected canonical.
2. Inspect final public URLs, run Test live URL and review rendered canonical and
   indexability. Do not request indexing for redirect sources or private pages.
3. Review submitted sitemaps and last-download dates in BOTH properties. The old
   host currently serves the new-domain sitemap; do not infer an old submission
   has refreshed merely because today's file is correct. Retire stale submissions
   only after identifying them; submit the canonical sitemap in the new property.
4. Request indexing for repaired public destinations where appropriate, then
   validate actual errors. Expected duplicate/redirect/noindex exclusions remain.

No site-wide Change of Address is assumed: the old domain also has unrelated uses.
