# LNK DIGITAL — legal, privacy and reference publication readiness

> INTERNAL WORKING CHECKLIST — NOT A PUBLISHED PRIVACY POLICY OR LEGAL OPINION.
> No registered company identifiers or actual client achievements are assumed. This file is not linked from the website and must not be presented as a final legal notice.

## AJPES transition: owner update, 9 October 2026

**Publication hold:** The owner states that the legal name and tax registration are changing, and a related registration involving the owner's father's company is also in progress. **Do not assign the same tax number to two entities, infer a final ownership relationship, or publish an imprint/privacy notice until a fresh AJPES/FURS record confirms the final legal entity.**

Owner-provided provisional details (not yet registry-verified):

- Business brand: **LNK DIGITAL**
- Earlier reported working form/name: **LNK DIGITAL, Zemir Osmic s.p.** — **not verified as the final registration**
- Address reported: **Cesta Franceta Prešerna 3D, 4270 Jesenice, Slovenia**
- Company registration number reported: **9834117000**, final match pending AJPES
- **Corrected tax number communicated: 23838060** (without assuming VAT ID or attaching an SI prefix)
- A previously communicated tax value was corrected and **must not be reused** in public documents.
- Verify which tax number belongs to **which legal entity**, the exact registered name, and VAT status after AJPES/FURS updates.

**Only after confirmation:** create public `legal-notice.html`, link it visibly, and review GDPR notice attribution and actual data-processing practices. Do not publish a draft with potentially incorrect identifiers.

## 1. Confirm the company identity before publishing legal pages

Ask the owner to confirm and, where applicable, verify against Slovenia's business register:

- Exact **registered legal entity name** (not just the LNK DIGITAL brand).
- Entity type: **s.p.**, **d.o.o.**, or other; do not infer from marketing materials.
- Registered business / service address and country.
- Registration / company number (**matična številka**) and tax number (**davčna številka**).
- VAT registration status and VAT ID, if applicable.
- For a company where relevant, registration court and share capital disclosures.
- Whether services are sold to businesses only or also to consumers; any relevant licensing details.
- Confirm the existing contact email and phone are appropriate for legal notices; never silently change website contacts.

Official Slovenian business-website information:
https://spot.gov.si/sl/teme/spletna-prodaja
https://pisrs.si/Pis.web/pregledPredpisa?id=ZAKO4291

## 2. Complete the GDPR Article 13 processing inventory

**Before** drafting or publishing the privacy notice, obtain:

1. Verified name and contact details of the personal-data controller.
2. Data collected in each channel: emails, WhatsApp inquiries, calls, possible future lead forms, analytics, logs, customer projects.
3. Purposes and lawful basis for each operation; do not blanket-label all processing as consent.
4. Actual hosting, email, messaging, analytics and other vendors, and the controller/processor relationship for each.
5. Storage countries, non-EEA transfers if any, safeguards, and applicable processor terms.
6. Retention periods or decision criteria for leads, client emails, project files, logs and analytics.
7. Contact route and process to exercise rights: access, rectification, erasure, objection, restriction, portability (as applicable).
8. Appropriate complaint authority and actual contact / procedure.
9. Whether automated decision-making, automated profiling, targeted marketing or newsletters are used.
10. Whether children are targeted (do not assume), and security-incident procedure.

Source: European Commission GDPR notice guidance, https://commission.europa.eu/law/law-topic/data-protection/information-individuals_en

## 3. Cookie and third-party inventory before consent UI

- Inspect the **live** website in a clean browser on desktop and mobile for actual cookies, local/session storage, embedded widgets, Google/Meta analytics tags and third-party calls.
- The 20 indexable HTML sources currently do **not** declare forms, third-party analytics JavaScript or embedded iframes. This is a source-level observation, **not** proof that the entire public site sets no cookies.
- The website links to WhatsApp; clarify the provider and user disclosure for that external link.
- Decide whether non-essential analytics/marketing cookies are needed. Obtain informed consent **before** setting non-essential tracking where required; provide equally available withdrawal and preferences controls.
- Do **not** add a decorative cookie banner if there are no non-essential cookies to govern.

## 4. Draft legal publication plan (blocked until verified)

Proposed public navigation, once reviewed and approved:

- `/privacy-policy.html` — clear, dated privacy notice (Slovenian plus appropriate languages)
- `/cookie-policy.html` — only after technical inventory, with accurate technologies and retention
- `/legal-notice.html` — mandatory business identification / imprint according to registered entity and commercial scope
- `/terms.html` — only if offering publicly agreed contractual or consumer sales terms; must reflect actual operation

**Gate:** The legal owner should approve the specific words, dates and identity details; if needed, seek local professional review. No placeholder, invented registration number, invented address, assumed VAT status or inaccurate cookie claim goes live.

## 5. Verified portfolio / client-proof approval

The live portfolio currently contains design **concepts**, not verified named case studies. Before identifying a real customer or publishing a project:

- Obtain the client's permission to name them and reproduce screenshots, logos, and project details.
- Confirm the page/design was actually completed or delivered by LNK DIGITAL, and record the scope and public URL.
- Verify any claimed improvement with evidence and a measurement period; do not claim SEO positions, conversion gains or visits without data.
- Check confidentiality and any brand/ownership restrictions.
- Mark mockups and work-in-progress concepts explicitly. Never label them as completed paid work.

Potential candidates from the operator's business history are **not** confirmed references. No client name or logo should be published solely because a project folder, demo or domain is present in the repository.

## 6. Security boundary for this shared Vercel project

- `vercel.json` serves multiple distinct clients/domains, including Euro Gurman, using host-based routing. Do not change it globally solely to improve LNK security.
- Preserve existing noindex response headers on preview/admin paths, robots exclusions, canonical redirects and verified domains.
- No global Content-Security-Policy, HSTS, cookies or cache headers without checking all hosted domains; CSP needs a domain- and asset-aware deployment plan.
- Use regression tests for LNK links/scripts, honest portfolio copy and existing client routes.
- Never expose private API tokens, client backups, business identifiers or customer messages in this public repository.

## Release conditions

1. Portfolio copy and integrity tests pass.
2. Existing 20-page SEO crawl, 10-language accessibility/locale tests, image tests and Euro Gurman smoke tests pass.
3. Vercel preview is READY; client routes/configuration untouched.
4. Any legal pages remain unlinked/unpublished pending exact registered-company details and privacy-processing confirmations.

_Last review draft: 9 October 2026. Confirm and update against current practices before legal publication._
