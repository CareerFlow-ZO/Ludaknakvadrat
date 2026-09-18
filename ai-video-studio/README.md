# LNK AI Music Video Studio

Business rule implemented:

- 1 free AI music video per day
- Free video must be 5 minutes or shorter
- Additional videos require payment
- Tracks over 5 minutes require payment
- Supports 16:9, 9:16, and 1:1
- Stripe checkout scaffold included
- Real AI rendering provider can be connected later in `/app/api/generate/route.ts`

## Run locally

```bash
npm install
npm run dev
```

## Vercel environment variables

Copy `.env.example` values into Vercel:

- `STRIPE_SECRET_KEY`
- `NEXT_PUBLIC_SITE_URL`
- `PAID_VIDEO_PRICE_CENTS`
- `AI_VIDEO_API_KEY` (when the real renderer is connected)

## Important production note

The current “1 free per day” control uses an HTTP-only browser cookie, which is fine for an MVP but can be bypassed by clearing cookies or switching devices. For a real commercial launch, connect user authentication and a database/Redis usage counter so the daily free allowance is enforced per account.
