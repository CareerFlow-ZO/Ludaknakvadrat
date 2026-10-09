# LNK BUSINESS — RELEASE GATE (10 October 2026)

Source branch: `lnk-business-beta-20261009` (do not merge into LNK DIGITAL main).

## Verified in source
- 10 selectable languages on homepage, dashboard, menu, reservation form, standalone PDF tool, Gastro demo, pilot packages and help.
- Slovenian default, remembered language on same device; mapping is partial: static UI labels and EU allergen names, **not a certified full localization**.
- Contact and offering channels work by links only; **not active payment checkout**.
- Shared Vercel project `lnk-business-saas`, and only Supabase `lb_*` tables and Storage `lb-food-photos`.

## Deployment
- Ensure the latest Vercel project deployment is READY and assigned to https://lnk-business-saas.vercel.app/.
- Before READY, the newest language files/routes are in GitHub only; do not misrepresent as publicly available.
- Vercel last responded `402 api-deployments-free-per-day`. No plan upgrade approved; wait for cap renewal or a documented authorized deploy.

## Smoke tests
1. Open home on mobile Safari, select EN -> DE -> BS -> SL; navigate among Stranke, Ponudbe, QR meni. Check stable language selection. Refresh, validate persistence.
2. Create two fictional business users, ensure strict RLS separation; no production customers should be used.
3. Generate single- and multi-item PDF quotes; cross-check VAT totals.
4. Create, edit, delete fictional contacts and appointments; test overlap warning.
5. QR menu: enter item, allergens and hours; upload one own image and verify public page in an incognito browser; test broken-image fallback.
6. Print QR A4 poster and scan on a second device.
7. Public menu: test available language switcher, allergen translations and price format. No 'open now' assumptions.
8. Booking requests: explicitly opt in **only after** valid privacy notice and spam controls are in place; with synthetic data only, then opt out.
9. Check static marketing, demo/pricing/help and free PDF routes.
10. Inspect Supabase security advisories; verify public menu guest SELECT-only and booking SELECT blocked for guest.

## Still required before real customers
- Written terms/privacy/DPA verified with actual legal entity. See `PRAVNO_ZA_PREGLED_2026-10-10.md`.
- Full translations of longer messages/terms, independent translation and accessibility QA.
- Robust abuse prevention for public booking, automatic confirmation notifications, optional payments and compliant e-invoice engine if advertised as invoicing.
- End-to-end browser/device tests, error monitoring and data deletion/retention process.

Launch stage allowed with current readiness: **internal QA only**; a marketing demo without collecting genuine personal data may go live after READY. No claims that full SaaS or payments are commercially launched.
