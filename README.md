# Ludak Na Kvadrat — V6

GitHub/Vercel-ready website with:
- personalized song order form
- Stripe Checkout
- Supabase order database
- Resend email notifications
- protected admin panel
- song delivery by download link

## Vercel
This V6 removes the invalid custom `runtime` declaration that caused the Vercel build error. Vercel will automatically detect the Node.js serverless functions, with Node 22 selected through `package.json` engines.

## Environment variables
Set these in Vercel Project Settings → Environment Variables:

- `STRIPE_SECRET_KEY`
- `STRIPE_WEBHOOK_SECRET`
- `PUBLIC_SITE_URL`
- `SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`
- `RESEND_API_KEY`
- `NOTIFICATION_EMAIL`
- `ADMIN_EMAIL`
- `ADMIN_PASSWORD`
- `ADMIN_SESSION_SECRET`

Never put real secret keys in GitHub.

## Stripe
The checkout endpoint is `/api/create-checkout-session` and the webhook endpoint is `/api/stripe-webhook`.

## Deployment
Push/upload the project files to the GitHub repository and let Vercel deploy the `main` branch.
