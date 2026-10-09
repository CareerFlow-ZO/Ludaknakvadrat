# LNK BUSINESS — Računi in računovodski servisi: QA za 10. oktober 2026

## Status
New modules: `racuni.html` (invoice *drafts only*), `racunovodstvo.html` (accountant registration, invitation and read-only access).
**Neither module can issue an official invoice**, fiscalize at FURS, send e-SLOG/PEPPOL documents, collect payment or file returns. No customer-facing production promise before legal and browser QA. Shared existing LNK DIGITAL and Euro Gurman data remains unchanged.

## Check list — two test users, synthetic records only
1. Log in as business A. Create test company with **fictional** legal identifiers and fake contact details in Settings. Add fictional customer A with address.
2. Open /racuni.html in same browser. Verify authenticated session continues. Create a bank-transfer-only invoice draft with product Qty 2 × EUR 500 and manually entered 22% VAT. Expect net EUR 1000, VAT EUR 220, total EUR 1220.
3. Confirm the saved draft appears after refreshing. Print and inspect A4 PDF. It must visibly display **OSNUTEK – NI IZDAN RAČUN** and no official issue claim.
4. Test not-VAT-registered option forces VAT rate 0 and ordinary VAT mode can be chosen again. Rates and legal grounds need manual verification.
5. Try invoice creation with missing seller address/tax ID, missing customer address, invalid negative price, duplicate draft reference, or no line item. It must reject.
6. Confirm drafts are only visible to their owner without any accountant invitation. Anonymous user may neither read nor write draft records.
7. Create a separate verified accountant login B at /racunovodstvo.html. Confirm e-mail and create practice name/email profile. The accountant initially sees **zero** connected companies and drafts.
8. Back as business A, generate invitation to the verified email of B. Do not paste invitation publicly. Use link copied in private session (not into public search).
9. Log in as B, open invite link and explicitly accept. B should see only A's invoice drafts, without edit, create, delete or issuing operations.
10. Create a separate business C invoice draft; confirm B cannot access it unless C separately invites B.
11. Revoke B from business A's portal. Refresh B and verify A draft disappears immediately and direct API read is denied.
12. Verify expired, reused, wrong-email, unconfirmed-email and malformed invite code are rejected by the redemption function.
13. Verify businessman A can delete *own* invoice draft; B cannot delete any firm drafts. Do not delete real records during testing.
14. Switch language from SL to EN, DE and BS in both modules, check buttons and titles; identify remaining untranslated sentences.
15. Confirm registration redirects to correct accountant portal URL and password is never shown in screenshots.
16. Verify iPhone Safari UI at 375px and desktop display; verify all prices, lines, and buyer/seller snapshot fields.
17. Verify no side effects in current LNK DIGITAL, Euro Gurman, or unrelated `public` schemas.
18. Test invoice handling under legal review of ZDDV-1 Article 82, SPOT's invoice guide and FURS rules. If any required rule is unimplemented, **leave real issuing disabled**.

## Launch prerequisites
- Written confirmed legal company details, tax status and official terms/privacy/DPA.
- Legally valid numbering model for each firm's premises/device and immutable issue/correction records.
- Legal VAT regimes (not VAT registered, exemptions, reverse charge, cross-border and other categories) reviewed by a Slovenian accountant/tax advisor.
- FURS fiscalization integration for cash/card payments (not just bank transfers), if supporting such payments.
- For 2028 domestic B2B, structured e-invoice exchange such as e-SLOG/Peppol or appropriate approved service integration; PDF alone does not satisfy mandatory structured exchange.
- Access logs, customer data erasure/retention, consent/invitation audit history and billing entitlements.
- End-to-end user testing, privacy/penetration test, anti-abuse checks, backups and incident handling.
