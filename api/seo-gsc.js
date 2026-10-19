"use strict";
const crypto = require("node:crypto");
const { requireAuth } = require("../_admin-auth");

const scope = "https://www.googleapis.com/auth/webmasters.readonly";
const origin = "https://oauth2.googleapis.com/token";
let cache = null;

const base64url = (value) => Buffer.from(JSON.stringify(value)).toString("base64url");

function credential() {
  const client = process.env.GSC_SERVICE_ACCOUNT_EMAIL || "";
  const key = (process.env.GSC_PRIVATE_KEY || "").replace(/\\n/g, "\n");
  if (!client || !key) return null;
  return { client, key };
}

async function googleToken(cred) {
  if (cache && Date.now() < cache.expiresAt) return cache.token;
  const iat = Math.floor(Date.now() / 1000);
  const claims = base64url({
    iss: cred.client, scope, aud: origin, iat, exp: iat + 3400
  });
  const head = base64url({ alg: "RS256", typ: "JWT" });
  const message = head + "." + claims;
  const signature = crypto.sign("RSA-SHA256", Buffer.from(message), cred.key).toString("base64url");
  const assertion = message + "." + signature;
  const controller = new AbortController(), timer = setTimeout(() => controller.abort(), 15000);
  try {
    const resp = await fetch(origin, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer", assertion
      }),
      signal: controller.signal
    });
    if (!resp.ok) throw new Error("Google token request failed");
    const data = await resp.json();
    if (typeof data.access_token !== "string" || !data.access_token) throw new Error("Missing access token");
    cache = { token: data.access_token, expiresAt: Date.now() + Math.min(3300, Math.max(60, Number(data.expires_in || 3600) - 120)) * 1000 };
    return cache.token;
  } finally { clearTimeout(timer); }
}

function daysAgo(n) {
  const d = new Date();
  d.setUTCHours(0, 0, 0, 0);
  d.setUTCDate(d.getUTCDate() - n);
  return d.toISOString().slice(0, 10);
}

module.exports = async function handler(req, res) {
  res.setHeader("Cache-Control", "private, no-store");
  res.setHeader("X-Content-Type-Options", "nosniff");
  if (req.method !== "GET") return res.status(405).json({ error: "Method not allowed" });
  if (!requireAuth(req, res)) return;
  const cred = credential();
  if (!cred) return res.status(503).json({
    error: "GSC sync not configured. Add GSC_SERVICE_ACCOUNT_EMAIL and GSC_PRIVATE_KEY server-side, then grant the service account access to your GSC property."
  });
  const siteUrl = "sc-domain:lnkdigital.com"; // Strictly fixed to LNK DIGITAL, never caller-controlled.
  const endDate = daysAgo(3), startDate = daysAgo(30);
  const controller = new AbortController(), timer = setTimeout(() => controller.abort(), 20000);
  try {
    const token = await googleToken(cred);
    const googleUrl = "https://www.googleapis.com/webmasters/v3/sites/" + encodeURIComponent(siteUrl) + "/searchAnalytics/query";
    const resp = await fetch(googleUrl, {
      method: "POST",
      headers: { "Authorization": "Bearer " + token, "Content-Type": "application/json" },
      body: JSON.stringify({ startDate, endDate, dimensions: ["query"], rowLimit: 1000, type: "web" }),
      signal: controller.signal
    });
    if (!resp.ok) {
      // Never return Google error bodies: they might expose linked account details.
      return res.status(resp.status === 403 ? 403 : 502).json({
        error: resp.status === 403 ? "Service account lacks Google Search Console permission for lnkdigital.com." :
          "Google Search Console is temporarily unavailable."
      });
    }
    const data = await resp.json();
    const rows = (Array.isArray(data.rows) ? data.rows : []).slice(0, 1000).map(r => ({
      query: typeof r.keys?.[0] === "string" ? r.keys[0].slice(0, 300) : "",
      clicks: r.clicks,
      impressions: r.impressions,
      ctr: r.ctr,
      position: r.position
    })).filter(r => r.query && [r.clicks, r.impressions, r.ctr, r.position].every(Number.isFinite));
    return res.status(200).json({
      source: "Google Search Console API",
      siteUrl, startDate, endDate, rows,
      note: "Query rows may omit anonymized searches; totals are not full-site metrics."
    });
  } catch {
    return res.status(502).json({ error: "Google Search Console connection failed. Check server credentials and property permissions." });
  } finally { clearTimeout(timer); }
};
