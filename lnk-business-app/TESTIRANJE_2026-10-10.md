# LNK BUSINESS — pilot QA for Saturday 10 October 2026

## Scope / safety
- Test project **only**: Vercel `lnk-business-saas`, Supabase tables prefixed `lb_`, Storage bucket `lb-food-photos`.
- Preserve LNK DIGITAL, Euro Gurman, and all other Supabase tables and Vercel sites.
- Use only clearly fictional test companies, client contact details and menu products. No real diner information, real tax invoices, payment card data or actual reservations.
- Before each QA session: verify production deployment READY, correct aliases and version. If Vercel daily API-deployment cap persists, **do not** assume GitHub commits are live; test only the current deployment and explicitly record the version.
- Regular U.S. company outreach or paying customers are out of scope of this technical QA.
- A displayed offer/PDF is **not** a compliant invoice or Slovenian structured e-račun. Recurring billing and automatic customer notification are **not enabled**.

## Manual test steps (two distinct accounts recommended)
1. Open https://lnk-business-saas.vercel.app/ in iPhone Safari and desktop browser; verify no horizontal overflow and sections are navigable.
2. Confirm current live Vercel deployment includes routes `/gastro-demo.html`, `/paketi.html` and `/sitemap.xml` after READY. Each must work via HTTPS directly.
3. Register test user A; confirm email; sign out and sign back in. Verify no credentials are shown in URL or logs. Do not share the password in chat.
4. Set test company A in Nastavitve. Refresh/reopen; verify the company persisted. Use fictional identifying numbers for testing only.
5. Create test client A; edit phone/address; refresh; verify saved and no duplicates.
6. Create new quote: **Website test | quantity 2 | €500** with user-provided illustrative 22% VAT. Expected net €1,000, VAT €220 and total €1,220. Print to A4 PDF on iPhone and desktop. Do not send it as a real tax document.
7. Create a second quote with two different line items and price 0 for one; verify totals/unique numbering. Confirm status buttons update.
8. Create an appointment. Verify local timezone, future date, edit, and conflict warning. Refresh to verify persistence.
9. Set restaurant name, slug and opening hours; publish QR menu. Open its link in a fresh private browser that is **not logged in**.
10. Add fictional food item with price and description, select checked allergen categories and publish. Verify correct price, fallback and allergen disclaimer on public page.
11. Upload a licensed/own small photo (JPG/PNG), test smartphone image conversion and preview. After saving, the public QR menu must show that exact image. Change or clear image URL, verify fallback.
12. Print A4 QR poster; scan QR with another phone. It must open the correct public menu.
13. Test public booking only after setting a lawful HTTPS privacy-notice URL and verifying owner has intentionally opted in. Use entirely synthetic names/numbers; do NOT submit genuine personal data. Confirm no automatic reservation acknowledgment is falsely claimed.
14. Admin → Rezervacije: test pending → confirmed/rejected statuses. There is **no automatic notification** to guests. Disable public booking after testing.
15. Sign in as separate test user B. Must not see A's private company, client list, quotes, appointments or booking requests, even with the same URL.
16. Guest must not be able to view or modify private booking requests or add restaurant menu items. Guest may view only **published** public menus, and menu publication off must hide them.
17. Export data (JSON) as logged-in user; verify it contains only own data. Store the file securely.
18. Open `/brezplacna-ponudba.html`, prepare a standalone offer on iPhone, save PDF, verify the tool does not register an account or charge.
19. Verify `/gastro-demo.html` is explicitly fictional, all filters work and illustrative prices are not presented as real orders. Verify `/paketi.html` states proposal/pilot pricing without claiming checkout is enabled.
20. Verify keyboard and screen reader navigation, form errors, image alt text and legibility at ~375px wide.

## Pass/fail evidence
For every step note: time, device, browser, route, actual result, expected result, screenshot (with no passwords or real PII), and issue severity. Keep a list of failed steps. The pilot is **not cleared for commercial use** merely because deployment reports READY.

## Outstanding blockers before customer billing
- Terms of service; privacy notice identifying verified data controller; DPA and retention/deletion policy; customer account/data deletion.
- Booking anti-spam/rate-limit and notifications after manual confirmation; privacy validation specific to each business.
- App security review, Supabase shared-project warnings, storage quota/billing protections and reliable end-to-end regression testing.
- Accounting/legal validation before Slovenian e-invoicing (ZIERDED / e-SLOG) and tax logic.
- Pricing and invoicing arrangements signed off; real payment collection/webhooks/subscription management not built.
- Google Search Console verification for the live production hostname if desired; a sitemap does not guarantee indexing.

## Key paths
Source branch: https://github.com/CareerFlow-ZO/Ludaknakvadrat/tree/lnk-business-beta-20261009/lnk-business-app
Public site after deploy: https://lnk-business-saas.vercel.app/
Free offer PDF: /brezplacna-ponudba.html
Illustrative Gastro showcase: /gastro-demo.html
Proposed packages: /paketi.html
A real restaurant's published menu: /menu.html?slug=YOUR-SLUG

## Explicit deployment limit
As of 2026-10-09, Vercel responded to API deployment requests with `402 api-deployments-free-per-day` (>100/day). New GitHub branch commits do **not** automatically update the standalone Vercel project. Do not purchase a plan or change another project to evade the cap. Only claim the new version is live after a production READY deployment with the canonical alias.
