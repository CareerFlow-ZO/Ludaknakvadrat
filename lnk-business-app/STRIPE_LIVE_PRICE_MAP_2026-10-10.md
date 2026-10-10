# LNK BUSINESS — VERIFIED Stripe LIVE product and price IDs (10 October 2026)

Stripe connected merchant account: `acct_1UFGZnKpQgXbrb0c` (LNK DIGITAL).
Live account read: charges_enabled=true, payouts_enabled=true, details_submitted=true.
Payout destination visible in Stripe: Addiko Bank d.d., EUR account ending 7065; payout schedule MANUAL.
The bank destination belongs to the connected Stripe account and was **not modified**.

Customer-facing price confirmation from operator: 2026-10-10. No recurring or one-time charges have been initiated by these product/price creation steps.

| Plan | Product | Monthly price ID / amount | Setup price ID / amount |
| --- | --- | --- | --- |
| START | `prod_VPgIJaBeLoruUz` | `price_1UOqwcKpQgXbrb0ckbfANsZT` — EUR 19.00 every month | `price_1UOqwfKpQgXbrb0cRydWEMsX` — EUR 99.00 once |
| PRO | `prod_VPgIAGcgAphavM` | `price_1UOqwjKpQgXbrb0cERGobgvf` — EUR 39.00 every month | `price_1UOqwnKpQgXbrb0cX12BCs2a` — EUR 149.00 once |
| GASTRO | `prod_VPgI3YVsPeUdoQ` | `price_1UOqwrKpQgXbrb0cF98FCoWi` — EUR 49.00 every month | `price_1UOqwuKpQgXbrb0cWlfaB5MR` — EUR 199.00 once |

These are **LIVE** catalog records, but Checkout is NOT yet switched on on LNK BUSINESS.
The six Price IDs are safe to store in repository documentation; Stripe **secret API keys and webhook signing secrets are NOT**.

Server-only price mapping for Supabase function `lb-billing`:
```
STRIPE_LIVE_PRICE_START_MONTHLY=price_1UOqwcKpQgXbrb0ckbfANsZT
STRIPE_LIVE_PRICE_START_SETUP=price_1UOqwfKpQgXbrb0cRydWEMsX
STRIPE_LIVE_PRICE_PRO_MONTHLY=price_1UOqwjKpQgXbrb0cERGobgvf
STRIPE_LIVE_PRICE_PRO_SETUP=price_1UOqwnKpQgXbrb0cX12BCs2a
STRIPE_LIVE_PRICE_GASTRO_MONTHLY=price_1UOqwrKpQgXbrb0cF98FCoWi
STRIPE_LIVE_PRICE_GASTRO_SETUP=price_1UOqwuKpQgXbrb0cWlfaB5MR
```

## Remaining before enabling customer payments

1. Confirm actual entity/legal operator on Stripe versus final AJPES record. Pending proposed identity in private `lb_pending_company_identity` is **not** an official fiscal invoice issuer.
2. Confirm tax treatment, inclusive/exclusive VAT, and whether the tax registration currently classified as SI `ioss` is applicable to recurring EU B2B/B2C SaaS services. **IOSS alone does not validate general VAT handling.** Tax specialist must verify.
3. Publish and obtain agreement to valid Terms of Service, Privacy Policy, refunds/cancellations, price disclosures and data processor agreements; configure public terms URL in Stripe Dashboard. `lb-billing` LIVE checkout explicitly requests customer acceptance of TOS.
4. Configure the function secrets securely (Supabase project `mwgnwbmssiyugwlsnotz`): `STRIPE_LIVE_SECRET_KEY` via Stripe Dashboard key management, `STRIPE_LIVE_WEBHOOK_SECRET` from **live** webhook endpoint `https://mwgnwbmssiyugwlsnotz.supabase.co/functions/v1/lb-stripe-webhook`, six LIVE price IDs above. Never send keys in chat or publish them in GitHub.
5. Once independently confirmed, set explicit live release switches `LB_PAYMENT_MODE=live`, `LB_LIVE_BILLING_APPROVED=yes`, `LB_LIVE_TAX_READY=yes`, `LB_LIVE_TERMS_READY=yes`. Do not mark these switches yes without actual checks.
6. Verify Edge Checkout and Stripe webhook event signatures, customer-to-Supabase owner_id metadata, subscription activation/cancellation/refunds, no duplicate charges, and live customer billing portal. Do not rely on browser success redirect as proof of payment.
7. Redeploy `lnk-business-app` to Vercel when the 402 free-deployment daily cap resets, and ensure production `/placanje.html` offers **live** mode only after the checks above. Previous production deployment `dpl_6i6jzSNWVbYxLbNhVa2fvpBmCzP6` does not contain `/placanje.html`.

This document is a catalog map, **not approval for activation**.

## Customer billing portal — verified LIVE

- Stripe portal configuration created: `bpc_1UOqzbKpQgXbrb0ci8jpS8xC`.
- Features: customers may update payment method/contact details, inspect invoice history and cancel a subscription **at the end of the current period**.
- Default return URL: `https://lnk-business-saas.vercel.app/placanje.html`.
- Created as the first/default portal configuration of the connected merchant. The prior configuration list was empty.
- The Live Stripe products and prices are verified via Stripe API, but there are no **public LNK BUSINESS Checkout payment links or launched customer subscriptions** from this setup.
- Supabase `lb-billing` Edge Function version 3 is ACTIVE with authenticated `status` action, fail-closed Live config flags and server-only API keys.
- Updated `/placanje.html` in source initially disables purchasing; it distinguishes TEST from LIVE only after an authenticated backend status response. **This frontend is NOT yet on Vercel** because new deployment is blocked by free-plan daily quota.
- The operator must securely add/configure Stripe Live secret key and webhook signing secret, verify tax and public terms, and approve live release flags. Do not force them or fabricate their values.

## Confirmed pricing excludes VAT — 10 October 2026

User explicitly confirmed that START, PRO and GASTRO prices, including monthly and setup charges, are **EXCLUDING VAT**. Stripe LIVE API updated **all six** listed prices in place to `tax_behavior=exclusive` and then independently re-read the six live price objects; all six were confirmed `exclusive` with amounts unchanged. This makes tax *additional when legitimately due* rather than included in the quoted amount; it does NOT establish which countries/transactions require VAT. Updated source `paketi.html` and `placanje.html` to visibly state `brez DDV`. Live checkout remains disabled pending verified merchant tax configuration, legally appropriate invoicing, legal terms, secure webhook/secrets and successful production deployment.
