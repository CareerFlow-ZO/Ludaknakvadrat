# LNK SEO Console — v1

## Purpose
Browser-based SEO research and editorial tool for LNK DIGITAL. **This does not automatically publish content, generate backlinks, claim rankings or guarantee traffic.** Existing public site and client previews remain unchanged.

## Setup
1. Open https://search.google.com/search-console and choose property sc-domain:lnkdigital.com.
2. Performance → Search results → Queries → Export → CSV.
3. Open /seo-console.html. Click 'Preuzmi iz Googlea' to try protected server-side syncing, or import Queries.csv (Top queries, Clicks, Impressions, CTR, Position).
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
- The optional Google sync calls only our same-origin /api/seo-gsc endpoint when the user explicitly clicks the button; the endpoint requires a valid admin cookie.

## Current automated checks
The repository already has GitHub workflow .github/workflows/lnk-seo-qa.yml, which checks on-page metadata, sitemap, robots and production crawl on PRs and pushes. The new SEO console audit ensures the UI and scripts remain internally consistent.

## Enabling optional Search Console API sync

A protected serverless handler is included at /api/seo-gsc. It is inert until its credentials are configured. It calls Google Search Console via a read-only scope and returns the 28-day query rows ending three days ago. No public endpoint allows choosing other domains; the property is fixed to sc-domain:lnkdigital.com.

1. In Google Cloud, create a **service account** dedicated to GSC reporting (do not generate OAuth browser tokens or paste a private key in ChatGPT).
2. In Google Search Console → Settings → Users and permissions, explicitly grant its service account email appropriate access to sc-domain:lnkdigital.com. Google's domain property verification and access are still required.
3. Configure Vercel **server environment variables** GSC_SERVICE_ACCOUNT_EMAIL and GSC_PRIVATE_KEY with the service account email and private key respectively. Preserve key newlines or use escaped \\n. Keep ADMIN_PASSWORD and ADMIN_SESSION_SECRET configured for the existing admin session. Do not put credentials in Git, HTML, JavaScript, publicly shared documents, or the chat.
4. Deploy after a successful PR review and log into /admin.html. Open /seo-console.html and click **Preuzmi iz Googlea**.
5. If Google returns no query rows, the UI reports unavailable/empty period, not claimed zero traffic. Export import remains a fallback.

This is **one-click authenticated syncing, not scheduled daily reporting**. Scheduled aggregation, OAuth account flows, scoped team workspaces and secure metrics storage are later milestones. Connected GSC Wizard access in ChatGPT does not automatically share its tokens with Vercel.

Avoid unreviewed article farms, reciprocal backlink schemes, and ranking promises.
