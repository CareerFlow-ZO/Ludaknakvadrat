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

## Reservation-request module — 2026-10-09
- `lb_booking_requests` created with RLS and anonymous *column-only INSERT*. Anonymous SELECT, UPDATE, DELETE and table-wide INSERT were **explicitly revoked** and verified.
- Customers can submit an inquiry at `/rezervacija.html?slug=...` ONLY if restaurant explicitly publishes its menu, enables bookings, and supplies an HTTPS URL to its own privacy notice.
- `/menu.html?slug=...` shows a reservation CTA only when enabled. Admin: `Rezervacije` inbox lists submitted requests; owner can mark confirmed/rejected or remove a request.
- Requests are **not** automatically confirmed; admin status update does NOT send a customer message. External notification service and hard bot defense still missing.
- One request per shop/phone/day index provides limited repeat-submission protection; it is NOT sufficient against determined spam. Keep public booking disabled for commercial launch pending captcha/rate limiting, GDPR notices, and real end-to-end user testing.
- Any personal data submitted belongs to the restaurant controller. A valid specific privacy statement, retention process, and processing contract need to be established before live bookings.
- Existing data and pre-existing site projects were not altered.
