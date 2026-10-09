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


## QR menu upgrade — photos, allergen markers, hours (2026-10-09)
- Additive migration: `lnk_business_qr_menu_photos_allergens_hours_20261009`. Touches only `lb_menu_items` and `lb_public_pages`, preserving existing records and original shared-project applications.
- `lb_menu_items.photo_url`: optional HTTPS food-photo link (not a file upload), max 900 characters. Client sanitizes URL; invalid or broken image uses a neutral fallback. Each product controls its own photo.
- `lb_menu_items.allergens`: array of stable identifiers matching the 14 groups in EU Annex II. Labels are in Slovenian. A blank array means **not provided**, never "contains no allergens". The restaurant remains responsible for verifying ingredients, cross-contact and correct disclosure before commercial use.
- `lb_public_pages.opening_hours`: optional max 500 characters of owner-written hours. The menu does not assert "open now" or live availability.
- `index.html`: new item fields, edit restoration, validations and menu dashboard image thumbnails. `menu.html`: responsive dish cards with independent photos, prices, allergen information, hours and an explicit fallback when image links fail.
- All client-side JS parsed successfully. SQL schema fields and RLS-backed anon public menu visibility were checked. Full real-device saving and remote image URL behavior still require an owner test.
- Note about external image hosting: external hosts receive visitors' image requests. Use images you own/are licensed to use; review hosting, privacy and any processor agreements before sales.
- Deployment is restricted by the Vercel API daily quota if it remains exhausted. Committing to this isolated branch does not automatically release to the Vercel project. Verify production READY and aliases before claiming public availability.

## Mobile image upload beta (staged, not deployed)
- Migration: `lnk_business_public_food_photo_bucket_20261009`. Public bucket `lb-food-photos` scoped to only LNK BUSINESS. File size is limited to 3 MiB and stored mime types are JPEG, PNG or WebP.
- Storage RLS enabled. Only authenticated users with an `lb_companies` row may INSERT images into a folder matching their own `auth.uid()`; no anonymous upload policy or broad update/delete policy was created. Public image URLs are intentionally readable on published menus.
- `index.html`: user picks a photo on iPhone, browser attempts JPEG conversion to max dimension 1600px and uploads it to a unique own-folder path via Supabase Storage. On success the public URL is populated; user must then click **Shrani jed**. A generated preview is shown. Existing HTTPS image URLs still work.
- Changes also set menu price input step to 0.01 for normal €9.90 prices. Any file above 15 MB before conversion is rejected; images above 3 MiB after conversion are rejected by client and bucket.
- After upload, if the user abandons saving, an orphan file may remain. Storage quota monitoring, lifecycle deletion and protection against excessive authenticated uploads still need implementation before commercial launch.
- Status: migration verified and code syntax parsed, **but browser upload, HEIC compatibility and live deployment not yet tested**. Vercel API daily deployment quota (100) was still exhausted (402) on the last deployment attempt. Do not claim new features are on the live site yet.


## Sales-ready materials prepared in source (not yet deployed)
- `gastro-demo.html`: clearly fictional Gastro sales presentation with 12 illustrative food entries and working category filters; NO real restaurant reference and no real customer booking collection.
- `paketi.html`: START €99 setup + €19/month, PRO €149 + €39/month, GASTRO €199 + €49/month, all expressly labeled proposed pilot prices. No online checkout, no automatic billing or claims that the package is already fully available.
- `index.html` links both demo and packages from public homepage and signed-in panel. QR restaurant admin includes A4 table QR poster printing.
- `robots.txt` and `sitemap.xml` committed, covering public demo, packages, free PDF generator and home.
- JavaScript source syntax has been checked for all interactive pages. A mocked DOM test rendered 12/12 demo products and 4/4 products after main-course category filter; a mocked public QR menu test rendered two cards, photo, allergen labels, owner-specified hours, image fallback, and kept booking disabled.
- These tests do **not** substitute for genuine browser, authenticated workflow, spam resistance or payment testing.
- Vercel latest READY deployment still predates the menu-photo, allergen, hours, sales, A4 QR poster changes. A deployment attempt was rejected with `402 api-deployments-free-per-day`, reported retryAfter 86400. **Do not claim live until a fresh deployment is verified READY with production alias**.
- Never point the project deployment at the existing LNK DIGITAL main project or merge this branch into main without verifying it will not trigger unrelated production builds. Standalone LNK BUSINESS Vercel project id: `prj_ECYJ9nhJsVht9tvoQ6NYr9k0BUVX`.
- Photo URLs are user-supplied; production photo upload, external image privacy checks, legal docs and allergen responsibility remain pre-sale review items.

## Internationalization (10 languages) — source ready
- Independent `i18n.js` dictionary for `sl,en,de,hr,bs,sr,it,fr,es,sq`. 160 fixed UI / allergen phrase mappings currently prepared, with user-selectable language picker on all seven HTML pages. Slovenian is default; selected language persists in local browser storage.
- Public QR menu also localizes the 14 EU-defined allergen category labels and standard menu category names. User-owned custom item names/descriptions remain unchanged. EUR price format is intentional for Slovenia.
- Static code and JS syntax checks passed for all eleven production source files. Complete content, legal notices, alerts and every message are **not fully translated** yet; review each language with a native speaker before marketing outside Slovenia.
- The source branch is separate from production and is not linked for auto-deployment. It contains `gastro-demo.html`, `paketi.html`, `pomoc.html`, `i18n.js`, `menu.html`, `rezervacija.html`, `brezplacna-ponudba.html`, `index.html`, `robots.txt`, `sitemap.xml` and `vercel.json`.
- Legal readiness drafts are `PRAVNO_ZA_PREGLED_2026-10-10.md` and `RELEASE_GATE_2026-10-10.md`. Do not publish as final terms.
- Vercel API deployment on 2026-10-09 returned `402 api-deployments-free-per-day` (free-plan quota). **New language code is not live until a fresh production deployment is READY.** Keep existing production untouched until then.
