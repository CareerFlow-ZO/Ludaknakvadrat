# LNK BUSINESS — Stripe Checkout / Billing TEST integration

**10 October 2026 — test mode only. Do NOT enable live payments or advertise billing until the legal entity, VAT/merchant onboarding, tax and GDPR checks are complete.**

## Status

- Private pending AJPES identity: `public.lb_pending_company_identity` (separate, RLS owner-only): proposed company `Osmic, Zemir Osmic s.p.`, tax **number** `12155314`; VAT ID `SI12155314` is **NOT verified**. The proposal never automatically replaces document seller details or the current `lb_companies` record. Do not put these on public official invoices.
- `public.lb_billing_subscriptions`: owner can SELECT only their own Stripe-synchronized record; all authenticated INSERT/UPDATE/DELETE privileges revoked. Stripe webhook service role manages status. No bank settlement verification is implied.
- `public.lb_stripe_webhook_events`: server-only event receipts for deduplication, not public.
- `/placanje.html`: optional authenticated test billing dashboard. Informative START (19€/mo +99€ setup), PRO (39€/mo +149€), GASTRO (49€/mo +199€). These are pilot suggested prices, not a sale.
- Supabase Edge Function `lb-billing`: requires signed-in, email-confirmed Supabase user; test-mode Stripe Checkout subscriptions and Stripe Billing Portal. Price IDs are read **only on server**. An existing active subscription cannot start another Checkout.
- Supabase Edge Function `lb-stripe-webhook`: `verify_jwt=false` because Stripe does not supply a Supabase JWT; it verifies raw-body `Stripe-Signature` HMAC-SHA256 with 5-minute tolerance, and rejects live events. Only this function can update subscriptions with service role. A browser returning from Checkout is NOT proof of payment.
- All endpoints **fail closed** unless `LB_PAYMENT_MODE=test` and `STRIPE_SECRET_KEY` begins `sk_test_`. Never place secret Stripe keys, webhook secrets or Supabase service-role keys in GitHub, HTML, JavaScript bundles or the conversation.

## Required Stripe connection and operator steps

1. Confirm actual legal merchant identity, bank account, address, tax status and business authorization in Stripe. **Do not begin real collection during pending AJPES transfer.**
2. Connect Stripe securely. In the Stripe Dashboard **test mode**, create six prices: recurring EUR monthly 19/39/49 and **one-time** EUR setup 99/149/199 for START/PRO/GASTRO. Get exact test `price_...` IDs; never guess them.
3. Configure Supabase Edge Function secrets (project `mwgnwbmssiyugwlsnotz`) through the secure Supabase Dashboard, not through the chat:
   - `LB_PAYMENT_MODE=test`
   - `STRIPE_SECRET_KEY=sk_test_...`
   - `STRIPE_PRICE_START_MONTHLY=price_...`
   - `STRIPE_PRICE_START_SETUP=price_...`
   - `STRIPE_PRICE_PRO_MONTHLY=price_...`
   - `STRIPE_PRICE_PRO_SETUP=price_...`
   - `STRIPE_PRICE_GASTRO_MONTHLY=price_...`
   - `STRIPE_PRICE_GASTRO_SETUP=price_...`
   - `STRIPE_WEBHOOK_SECRET=whsec_...` from the endpoint created in Stripe test mode.
4. Add the Stripe test webhook endpoint `https://mwgnwbmssiyugwlsnotz.supabase.co/functions/v1/lb-stripe-webhook` and subscribe to **checkout.session.completed**, **customer.subscription.created**, **customer.subscription.updated**, **customer.subscription.deleted**. Test signature, duplicate deliveries, cancellation, billing portal and out-of-order events.
5. Test logged-in customer Checkout with Stripe-provided test card, cancelled Checkout, webhook activation, duplicate event replay, subscription status and access isolation with two different test users. Confirm no live card details or actual money are collected.
6. Before real-world billing: production legal entity and VAT validation; approved terms/privacy/DPA; taxes and Stripe Tax setup; compliant official invoices/fiscalization as required; refunds/cancellation rights; actual customer billing and tax flows; payment provider KYC; rate limits/monitoring and accessibility; migration and operational plan.

## Important constraints

- **Only test transactions** are implemented. Test customer status in `lb_billing_subscriptions` is not legal proof of an invoice being issued.
- Site access is **not yet gated by plan**; subscriptions are NOT activated for authorization to functions. This avoids excluding current beta testers until entitlements and policies are tested.
- No production business invoices, bank-certified Slovenian UPN QR, FURS fiscal validation or automatic customer email delivery exist yet.
- Payments cannot be activated simply by publishing the page; Stripe must be configured and tested end-to-end. Do **not** turn on live Stripe or sell subscriptions automatically.
- The Supabase project is shared with unrelated apps; these changes are isolated to `lb_*` tables and the named `lb-*` functions.


## Production-ready Stripe switch (prepared, NOT enabled)

The Edge Functions were updated to **version 2**, supporting an explicitly gated `LB_PAYMENT_MODE=live` without mixing the old test price/customer resources. Only a merchant-verified Stripe account is accepted for real payment initiation; the authenticated Checkout function checks Stripe `charges_enabled`, `payouts_enabled` and `details_submitted`. The Checkout requests Stripe **automatic tax** and explicit terms-of-service consent in live mode. Webhook verifies a **different live-mode signature key** and rejects events where `event.livemode` does not match configured mode.

Live secrets and flags required in **Supabase Edge Functions (never in the frontend, GitHub or chat)**:

- `LB_PAYMENT_MODE=live`
- `LB_LIVE_BILLING_APPROVED=yes`
- `LB_LIVE_TAX_READY=yes`
- `LB_LIVE_TERMS_READY=yes`
- `STRIPE_LIVE_SECRET_KEY=sk_live_...` (only secure vault)
- `STRIPE_LIVE_WEBHOOK_SECRET=whsec_...` from separately configured *live* Stripe webhook endpoint
- Six Stripe **live** `price_...` IDs: `STRIPE_LIVE_PRICE_START_MONTHLY`, `STRIPE_LIVE_PRICE_START_SETUP`, `STRIPE_LIVE_PRICE_PRO_MONTHLY`, `STRIPE_LIVE_PRICE_PRO_SETUP`, `STRIPE_LIVE_PRICE_GASTRO_MONTHLY`, `STRIPE_LIVE_PRICE_GASTRO_SETUP`.

**Important:** `LB_LIVE_TAX_READY` and `LB_LIVE_TERMS_READY` must only be set after genuine configuration and legal review, not merely to bypass safeguards. FURS statutory obligations and official invoice issuance are not solved by Stripe Tax alone. Merchant onboarding should accurately reflect the present legally responsible seller and settlement bank account; registration updates at AJPES are still being processed. Confirm `12155314` as the tax number and independently confirm whether `SI12155314` is a VAT ID.

The domain-facing `/placanje.html` was developed but Vercel rejected the latest upload with `402 api-deployments-free-per-day`, so visitors cannot access it on the canonical domain yet. On the Vercel quota reset, deploy all 16 static files and **verify READY**. Do not claim live checkout before Stripe is connected, prices exist, webhook is verified, and the user has tested first transactions/refunds.

Stripe ChatGPT plugin currently installed, but no Stripe account-management actions were available in the present session. User must connect the actual account through the Stripe plugin or securely configure the required production Stripe environment on Supabase. Do not paste secret keys into chat.
