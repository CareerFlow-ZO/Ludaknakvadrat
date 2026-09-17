const Stripe = require("stripe");
const { supabase } = require("../_supabase");

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const PRICES = {
  BASIC: { amount: 15.99, name: "Ludak Na Kvadrat — BASIC personalizovana pesma", type: "song" },
  PREMIUM: { amount: 29.99, name: "Ludak Na Kvadrat — PREMIUM personalizovana pesma", type: "song" },
  VIP: { amount: 49.99, name: "Ludak Na Kvadrat — VIP personalizovana pesma", type: "song" },
  WEB_START: { amount: 149, name: "LNK DIGITAL — START web stranica", type: "web" },
  WEB_BUSINESS: { amount: 299, name: "LNK DIGITAL — BUSINESS web stranica", type: "web" },
  WEB_PREMIUM: { amount: 499, name: "LNK DIGITAL — PREMIUM web stranica", type: "web" },
  WEB_LAUNCH: { amount: 799, name: "LNK DIGITAL — BUSINESS LAUNCH paket", type: "web" }
};

function clean(value, max = 1800) {
  return String(value ?? "").trim().slice(0, max);
}

module.exports = async (req, res) => {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  try {
    const {
      name, email, recipient, occasion, style, language,
      package: packageKey, story, mood, deadline, orderType
    } = req.body || {};

    const price = PRICES[packageKey];
    if (!price) return res.status(400).json({ error: "Nepoznat paket." });

    const isWeb = price.type === "web" || orderType === "web";
    if (!name || !email || !packageKey || !story || (!isWeb && (!recipient || !occasion || !style || !language))) {
      return res.status(400).json({ error: "Nedostaju obavezni podaci." });
    }

    const amountCents = Math.round(price.amount * 100);
    const safeRecipient = isWeb ? clean(recipient || "Web stranica", 100) : clean(recipient, 100);
    const safeOccasion = isWeb ? clean(occasion || "Izrada web stranice", 100) : clean(occasion, 100);
    const safeStyle = isWeb ? clean(style || "LNK DIGITAL", 120) : clean(style, 120);
    const safeLanguage = clean(language || "sr", 60);

    const orderRows = await supabase("orders", {
      method: "POST",
      headers: { "Prefer": "return=representation" },
      body: JSON.stringify({
        name: clean(name, 100), email: clean(email, 160), recipient: safeRecipient,
        occasion: safeOccasion, style: safeStyle, language: safeLanguage,
        package: packageKey, amount_cents: amountCents, currency: "eur",
        mood: clean(mood || (isWeb ? "WEB ORDER" : ""), 80), deadline: clean(deadline, 80),
        story: clean(story, 1800), status: "pending"
      })
    });

    const order = orderRows?.[0];
    if (!order?.id) throw new Error("Narudžbina nije sačuvana.");

    const origin = process.env.PUBLIC_SITE_URL || `https://${req.headers.host}`;
    const description = isWeb
      ? `${safeRecipient} · ${packageKey.replace("WEB_", "")}`
      : `${safeRecipient} · ${safeOccasion} · ${safeStyle}`;

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      customer_email: clean(email, 160),
      line_items: [{
        price_data: {
          currency: "eur",
          product_data: { name: price.name, description },
          unit_amount: amountCents
        },
        quantity: 1
      }],
      metadata: { order_id: order.id, order_type: isWeb ? "web" : "song" },
      success_url: `${origin}/success.html?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/index.html#${isWeb ? "web-stranice" : "naruci"}`,
      billing_address_collection: "auto",
      allow_promotion_codes: true,
      locale: "auto"
    });

    await supabase(`orders?id=eq.${encodeURIComponent(order.id)}`, {
      method: "PATCH",
      headers: { "Prefer": "return=minimal" },
      body: JSON.stringify({ stripe_session_id: session.id })
    });

    return res.status(200).json({ url: session.url });
  } catch (error) {
    console.error("Stripe checkout error:", error);
    return res.status(500).json({ error: "Plaćanje trenutno nije dostupno. Proveri podešavanja ili naruči preko WhatsApp-a." });
  }
};
