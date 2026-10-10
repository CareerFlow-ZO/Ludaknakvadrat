# LNK BUSINESS — Live activation status (2026-10-10)

## Completed and independently verified
- Existing Stripe LIVE merchant `acct_1UFGZnKpQgXbrb0c` (LNK DIGITAL): `charges_enabled=true`, `payouts_enabled=true`, `details_submitted=true`. EUR Addiko payout account ending 7065. Stripe payout schedule is **manual**, not automatic.
- LIVE Stripe catalog: START `prod_VPgIJaBeLoruUz`, PRO `prod_VPgIAGcgAphavM`, GASTRO `prod_VPgI3YVsPeUdoQ`.
- Six Live prices confirmed and set to `tax_behavior=exclusive`:
  - START monthly `price_1UOqwcKpQgXbrb0ckbfANsZT` EUR19; setup `price_1UOqwfKpQgXbrb0cRydWEMsX` EUR99.
  - PRO monthly `price_1UOqwjKpQgXbrb0cERGobgvf` EUR39; setup `price_1UOqwnKpQgXbrb0cX12BCs2a` EUR149.
  - GASTRO monthly `price_1UOqwrKpQgXbrb0cF98FCoWi` EUR49; setup `price_1UOqwuKpQgXbrb0cWlfaB5MR` EUR199.
- LIVE Stripe customer portal `bpc_1UOqzbKpQgXbrb0ci8jpS8xC` created and active (card changes, billing history, cancellation at period end).
- **Dedicated LNK BUSINESS Stripe LIVE webhook endpoint** `we_1UOrbwKpQgXbrb0cNuyIunAz`: URL `https://mwgnwbmssiyugwlsnotz.supabase.co/functions/v1/lb-stripe-webhook`. Provisioned then deliberately **disabled**, because signing secret has not yet been configured in Supabase. Once secret is securely configured and signed-test deliveries validated, enable this same webhook endpoint in the Stripe Dashboard.
- The existing music-order webhook incorrectly handled other checkouts. Fixed in **PR #23** and merged to main as `6286921d688b0f7dcbb613a6aa030533493819de`. Mock tests: unrelated SaaS Checkout => 200, zero emails, zero music DB operations; song Checkout with order_id => two expected music emails. GitHub Vercel status was green. The music project is otherwise unchanged.
- Supabase function `lb-billing` v4 ACTIVE (verified JWT). Requires separate live safety flags and prices; before making a LIVE Checkout it independently re-fetches Stripe account/price data and validates EUR amounts, monthly intervals and `exclusive` tax behavior. Fail-closed by default. `lb-stripe-webhook` v2 ACTIVE, endpoint signature check and replay protection, but live readiness gates are not set.
- Source `placanje.html` has disabled buttons by default; only signed-in users get Stripe mode/availability verification, explicit warning before real payment; source `paketi.html` and `placanje.html` show **brez DDV**.
- The latest static website frontend changes are only in `lnk-business-beta-20261009`; deploying through Vercel was rejected with `402 api-deployments-free-per-day` even on retry (2026-10-10). Old production deployment `dpl_6i6jzSNWVbYxLbNhVa2fvpBmCzP6` does **not** include the Checkout page.

## Remaining actions — only after actual confirmation
1. **Legal seller:** Operator supplied proposed future name `Osmic, Zemir Osmic s.p.` and tax number `12155314`. AJPES transfer had been stated as pending. Verify existing Stripe legal entity aligns with actual contracting seller; do not claim unverified registered name.
2. **VAT/OSS:** Operator explicitly confirms prices EXCLUDING VAT, but Stripe Tax shows only an **SI IOSS** tax registration. IOSS alone is not confirmation of general SaaS/VAT registration or proper electronic-services VAT collection. Tax professional should confirm Slovenian and cross-border B2B/B2C treatment, FURS registration, Stripe tax codes and whether Stripe automatic_tax has correct registrations.
3. **Legals:** Proper public terms, privacy/DPA, cancellation/refund policy, verified support details and Stripe Dashboard TOS URL are not yet checked. The LIVE Checkout implementation requires customer agreement to merchant TOS.
4. **Configure Supabase secrets using secure Dashboard (never send keys in chat / GitHub):**
   - `STRIPE_LIVE_SECRET_KEY` (Stripe Live restricted secret API key with needed account/price/checkout/portal read/write capabilities)
   - `STRIPE_LIVE_WEBHOOK_SECRET` (Stripe Live signing secret for **we_1UOrbwKpQgXbrb0cNuyIunAz**)
   - `STRIPE_LIVE_PRICE_START_MONTHLY=price_1UOqwcKpQgXbrb0ckbfANsZT`
   - `STRIPE_LIVE_PRICE_START_SETUP=price_1UOqwfKpQgXbrb0cRydWEMsX`
   - `STRIPE_LIVE_PRICE_PRO_MONTHLY=price_1UOqwjKpQgXbrb0cERGobgvf`
   - `STRIPE_LIVE_PRICE_PRO_SETUP=price_1UOqwnKpQgXbrb0cX12BCs2a`
   - `STRIPE_LIVE_PRICE_GASTRO_MONTHLY=price_1UOqwrKpQgXbrb0cF98FCoWi`
   - `STRIPE_LIVE_PRICE_GASTRO_SETUP=price_1UOqwuKpQgXbrb0cWlfaB5MR`
   - After verified merchant, tax, terms and webhook configuration **only**, set `LB_PAYMENT_MODE=live`, `LB_LIVE_BILLING_APPROVED=yes`, `LB_LIVE_TAX_READY=yes`, `LB_LIVE_TERMS_READY=yes`.
5. **End-to-end tests:** webhook signatures, event subscriptions, customer matching, status transitions, cancellation/renewal/refund reconciliation, no duplicate subscriptions or charges, card/3DS authentication, entitlement checks, customer-visible invoices and legally required tax documentation. Test on Stripe's sandbox before real purchases.
6. **Vercel:** wait for API quota reset or have merchant resolve the limit/plan. Redeploy 16 app static assets, confirm READY, the correct project/team and production aliases, 200 on `/placanje.html`.
7. **Enable Stripe webhook** only after signing secret is installed and trial deliveries have succeeded. Do not enable LIVE payment collection for customers before all conditions above are genuinely true.

## Links for operator
- Products: https://dashboard.stripe.com/products
- Stripe Webhooks: https://dashboard.stripe.com/webhooks
- Stripe API keys: https://dashboard.stripe.com/apikeys
- Supabase project Edge Function secrets: https://supabase.com/dashboard/project/mwgnwbmssiyugwlsnotz/settings/functions
- Vercel project: https://vercel.com/ludak-na-kvadrat/lnk-business-saas

**This document is a readiness report, not confirmation that live payments are active.**
