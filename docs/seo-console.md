# LNK SEO Console — v1

## Purpose
Browser-based SEO research and editorial tool for LNK DIGITAL. **This does not automatically publish content, generate backlinks, claim rankings or guarantee traffic.** Existing public site and client previews remain unchanged.

## Setup
1. Open https://search.google.com/search-console and choose property sc-domain:lnkdigital.com.
2. Performance → Search results → Queries → Export → CSV.
3. Open /seo-console.html, import Queries.csv (Top queries, Clicks, Impressions, CTR, Position).
4. See query opportunities, select target market SL/DE/EN, generate briefs and export a 30-day DRAFT content calendar.
5. Check every draft for helpfulness, factual accuracy, local language and originality before publishing.

GSC query CSV may omit anonymized searches; its summed metrics are **not whole-site totals**. Dashboard KPIs represent imported query rows only. Without valid data, KPIs are dashes, not invented zeros. Proposed topics without evidence are labelled hypotheses.

## Privacy and safeguards
- Browser File API processes the report locally. No report rows are uploaded or sent to external services by the console.
- Data is in memory only for the current browser tab. Clear data or reload to discard it.
- Static UI is reachable without authentication; noindex is **not** a security boundary. Never hard-code internal secrets or reports there.
- Export escapes CSV formula triggers for untrusted keywords.
- SEO page has a noindex meta tag; Vercel header can reinforce it.
- This feature does not install trackers, call an AI model, buy links, or auto-publish.

## Current automated checks
The repository already has GitHub workflow .github/workflows/lnk-seo-qa.yml, which checks on-page metadata, sitemap, robots and production crawl on PRs and pushes. The new SEO console audit ensures the UI and scripts remain internally consistent.

## Automatic live Search Console sync: future integration
Requires authenticated server-side Google Search Console access via OAuth or a service account explicitly authorized for sc-domain:lnkdigital.com. Store tokens in server-side secrets (never browser JavaScript or GitHub). Protect server endpoints using admin authentication and restrict returned analytics. Being connected to GSC Wizard in ChatGPT does not grant the Vercel website API credentials. Confirm a genuine settled reporting period before comparing performance.

Avoid unreviewed article farms, reciprocal backlink schemes, and ranking promises.
