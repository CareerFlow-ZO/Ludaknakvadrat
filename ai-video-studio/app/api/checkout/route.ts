import { NextResponse } from "next/server";
import Stripe from "stripe";

export async function POST(req: Request) {
  if (!process.env.STRIPE_SECRET_KEY) {
    return NextResponse.json({
      error: "Stripe is not configured yet. Add STRIPE_SECRET_KEY in Vercel."
    }, { status: 503 });
  }

  const body = await req.json();
  const seconds = Math.max(1, Number(body?.duration || 0));
  const base = Number(process.env.PAID_VIDEO_PRICE_CENTS || "999");
  const amount = seconds > 300 ? Math.round(base * 1.5) : base;

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  const site = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    line_items: [{
      quantity: 1,
      price_data: {
        currency: "eur",
        unit_amount: amount,
        product_data: {
          name: "LNK AI Music Video",
          description: seconds > 300
            ? "AI music video generation — extended track"
            : "AI music video generation"
        }
      }
    }],
    success_url: `${site}/?payment=success`,
    cancel_url: `${site}/?payment=cancelled`
  });

  return NextResponse.json({ url: session.url });
}
