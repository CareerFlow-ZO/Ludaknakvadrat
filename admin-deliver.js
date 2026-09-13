const { requireAuth } = require("./_admin-auth");
const { supabase } = require("./_supabase");
const { Resend } = require("resend");

module.exports = async (req, res) => {
  if (!requireAuth(req, res)) return;
  if (req.method !== "POST") return res.status(405).json({error:"Method not allowed"});

  try {
    const { id, downloadUrl, message } = req.body || {};
    if (!id || !downloadUrl) return res.status(400).json({error:"Nedostaje link za preuzimanje pesme."});

    let parsed;
    try { parsed = new URL(String(downloadUrl)); }
    catch { return res.status(400).json({error:"Link za preuzimanje nije ispravan."}); }

    if (!["http:", "https:"].includes(parsed.protocol))
      return res.status(400).json({error:"Dozvoljeni su samo HTTP/HTTPS linkovi."});

    const rows = await supabase(`orders?id=eq.${encodeURIComponent(id)}&select=*`);
    const order = rows?.[0];
    if (!order) return res.status(404).json({error:"Narudžbina nije pronađena."});
    if (!order.email) return res.status(400).json({error:"Kupac nema e-mail adresu."});

    if (!process.env.RESEND_API_KEY)
      return res.status(500).json({error:"RESEND_API_KEY nije podešen."});

    const resend = new Resend(process.env.RESEND_API_KEY);
    const customerMessage = String(message || "Tvoja personalizovana pesma je gotova. Hvala ti što si izabrao/la Ludak Na Kvadrat!").trim().slice(0,2000);

    const email = await resend.emails.send({
      from: process.env.EMAIL_FROM || "Ludak Na Kvadrat <onboarding@resend.dev>",
      to: [order.email],
      subject: `🎵 Tvoja pesma je gotova — Ludak Na Kvadrat`,
      text:
`Zdravo ${order.name || ""},

${customerMessage}

PESMA: ${order.recipient || "Personalizovana pesma"}
PAKET: ${order.package || ""}

PREUZMI PESMU:
${parsed.toString()}

Ludak Na Kvadrat
Instagram: @official_ludak
TikTok: @official_ludak2
WhatsApp: 0038631244612`
    });

    await supabase(`orders?id=eq.${encodeURIComponent(id)}`, {
      method:"PATCH",
      headers:{"Prefer":"return=representation"},
      body:JSON.stringify({status:"completed", completed_at:new Date().toISOString()})
    });

    return res.status(200).json({ok:true, emailId:email?.data?.id || null});
  } catch (error) {
    console.error(error);
    return res.status(500).json({error:"Slanje pesme nije uspelo."});
  }
};
