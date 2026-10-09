# LNK DIGITAL — aggregate website & enquiry measurement

Implementation: 9 October 2026. This is a technical/data-minimization note, **not** an approved full GDPR privacy policy.

## Goals and interpretation

Count six **actions**, by UTC day and one of LNK DIGITAL's 20 canonical public paths:

- `page_view`: one page load; **not unique visitors**, and not all visits (ad-blockers, tracking preferences, network failures).
- `brief_view`: the homepage project-brief section came into view, or the user clicked a link to the section (counted once per page load).
- `brief_whatsapp`: clicked the project brief's WhatsApp handoff.
- `brief_email`: clicked the project brief's e-mail handoff.
- `other_whatsapp`: clicked another existing WhatsApp contact link.
- `other_email`: clicked another existing business email link.

**None of these means a message was sent, lead qualified, sale closed, or payment received.** Real messages and invoices need independent reconciliation. Do not infer unique customers or exact conversion rates from page-load and click counters. Usage should be labeled directional.

## Collection and security

- LNK-specific client script: `/assets/js/lnk-metrics.js`, loaded only by the 20 root LNK HTML files.
- The script refuses to track on any host except `www.lnkdigital.com`. No logging on Euro Gurman, the music site, or preview builds. Also respects Do Not Track and Global Privacy Control.
- Browser sends strictly `{"v":1,"event":"<allowlisted action>","path":"<one of 20 public page paths>"}` to `https://mwgnwbmssiyugwlsnotz.supabase.co/functions/v1/lnk-metrics`.
- **Never send** enquiry text, email addresses, names, contact details, phone numbers, URL query strings, referrer URLs, IP addresses or user agents **as request payload fields**.
- Requests necessarily have ordinary HTTP transport metadata; Supabase infrastructure may retain its own network/security logs. This is distinct from the aggregate metrics table. Correctly disclose the provider in the final privacy policy.
- Edge Function enforces JWT verification, correct public Origin, request size, content shape, event-name allowlist and 20 public paths. Browser includes only a **public anon JWT**, never a service-role key.
- The Edge Function alone uses Supabase's server-side service role to invoke `public.lnk_metrics_record`.
- Dedicated database table `public.lnk_metrics_daily` in the already connected Supabase project `Ludak Na Kvadrat-Pesme`; no existing Euro Gurman tables or functions changed. Database RLS on, anon/authenticated SELECT and INSERT revoked, service-role RPC only.
- Table holds only `day, event_name, page_path, hits`, capped to 50,000/day/event/path to bound abuse. Does not hold visitor identifiers, messages or session keys.
- Browser stores **no new cookies or persistent tracking IDs**. The pre-existing homepage language preference in localStorage is unrelated and unchanged.
- Origin/JWT validation reduces casual abuse but a public event endpoint cannot fully prevent fabricated clicks; figures are estimates, not audited sales data.
- Database event totals are retained until a future retention/clean-up policy is agreed; technical counts are not per-person records. Confirm aggregate data retention and provider details when completing the final GDPR notice after AJPES changes.

## Data access

Accessible to project owners via the connected Supabase SQL tool (service-role). No visitor-facing analytics dashboard is exposed, and the endpoint never returns counts.

Example query (UTC days):

```sql
SELECT day, event_name, SUM(hits) AS total
FROM public.lnk_metrics_daily
WHERE day >= (NOW() AT TIME ZONE 'UTC')::date - 30
GROUP BY day,event_name
ORDER BY day DESC,event_name;
```

Example daily funnel (counted actions, **not distinct users**):

```sql
SELECT day,
  SUM(hits) FILTER (WHERE event_name='page_view') AS page_loads,
  SUM(hits) FILTER (WHERE event_name='brief_view') AS brief_views,
  SUM(hits) FILTER (WHERE event_name='brief_whatsapp') AS brief_whatsapp_clicks,
  SUM(hits) FILTER (WHERE event_name='brief_email') AS brief_email_clicks,
  SUM(hits) FILTER (WHERE event_name='other_whatsapp') AS other_whatsapp_clicks,
  SUM(hits) FILTER (WHERE event_name='other_email') AS other_email_clicks
FROM public.lnk_metrics_daily
GROUP BY day
ORDER BY day DESC
LIMIT 30;
```

## Operations and safety

- Run `node scripts/lnk-metrics-audit.mjs` and `node scripts/lnk-metrics-browser-audit.mjs` for source, client and privacy guard tests.
- Run `node scripts/lnk-metrics-health.mjs` to verify authenticated Edge GET and CORS preflight without writing events.
- Live event data begins **only after** production deployment and real visitors. No retroactive collection.
- Vercel analytics account currently denies analytics API reads (403). This separate Supabase aggregate source does not require paid Vercel custom events.
- The legal-notice / privacy-policy draft remains unmerged while official AJPES identity changes are pending; this document is operational, not legal advice.
