# LNK BUSINESS — Connected pilot beta (October 2026)

Standalone Vercel project: https://lnk-business-saas.vercel.app/
Free no-login PDF offer generator: https://lnk-business-saas.vercel.app/brezplacna-ponudba.html

Business user features: Supabase Auth (email/password), individual company records, clients (including optional address/tax ID), editable quotes with PDF browser print, editable appointments, published QR menus, downloadable JSON data export. First version of enterprise offer preparation; not a regulated invoice engine. Data stored in Supabase with row-level security, apart from the standalone free quote tool whose fields remain in the visitor's browser.

## Infra
- Vercel project ID: prj_ECYJ9nhJsVht9tvoQ6NYr9k0BUVX
- Supabase project ref: mwgnwbmssiyugwlsnotz — shared with existing projects. Only **lb_** tables used; do not touch the original application.
- Supabase migration names: lnk_business_isolated_beta_schema_20261009; lnk_business_pilot_client_billing_fields_20261009
- Isolation: owner_id UUID from auth.uid; all private lb_ tables have RLS. Public menu policies permit SELECT only for explicitly published pages/menu items.

## Required before commercial sale
- Add https://lnk-business-saas.vercel.app/** to Supabase Auth redirect allowlist and verify email confirmation. This setting was NOT updated by these deployments.
- Verify sign up -> email verification -> login -> create company/client/quote/appointment -> PDF print and edit -> menu public view -> JSON export across two real browser sessions (not yet end-to-end tested).
- Perform security review of the pre-existing shared Supabase advisories, especially public security-definer function; don't change shared components without separate review.
- Finalize data-controller identity, privacy terms, processor agreements/DPA, retention and deletion policy, contact and tax information, basic accessibility.
- Implement billing/Stripe only after successful paid pilot, and only for supported features.
- Slovenian e-invoicing (ZIERDED) from January 1, 2028 is NOT implemented. PDF quote != invoice/e-SLOG/PEPPOL. Dedicated regulated-compliance project is required.
- Public booking submission NOT implemented. Appointments are entered by authenticated staff.

## Deploy process
Current Vercel project was deployed by standalone file-upload API, not linked to GitHub. After source updates, upload index.html, menu.html, brezplacna-ponudba.html, vercel.json, robots.txt, sitemap.xml to **this specific project**, not to LNK DIGITAL, Euro Gurman or other sites.
