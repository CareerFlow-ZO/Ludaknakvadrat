const crypto = require("crypto");

function secret() {
  return process.env.ADMIN_SESSION_SECRET || "";
}
function cookieName() { return "lnk_admin"; }

function sign(payload) {
  const value = Buffer.from(JSON.stringify(payload)).toString("base64url");
  const sig = crypto.createHmac("sha256", secret()).update(value).digest("base64url");
  return `${value}.${sig}`;
}
function verify(token) {
  if (!secret() || !token) return null;
  const [value, sig] = token.split(".");
  if (!value || !sig) return null;
  const expected = crypto.createHmac("sha256", secret()).update(value).digest("base64url");
  if (!crypto.timingSafeEqual(Buffer.from(sig), Buffer.from(expected))) return null;
  try {
    const payload = JSON.parse(Buffer.from(value, "base64url").toString("utf8"));
    if (!payload.exp || payload.exp < Date.now()) return null;
    return payload;
  } catch { return null; }
}
function getCookie(req, name) {
  const raw = req.headers.cookie || "";
  const found = raw.split(";").map(v => v.trim()).find(v => v.startsWith(name + "="));
  return found ? decodeURIComponent(found.slice(name.length + 1)) : "";
}
function setCookie(res, token) {
  res.setHeader("Set-Cookie", `${cookieName()}=${encodeURIComponent(token)}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=43200`);
}
function clearCookie(res) {
  res.setHeader("Set-Cookie", `${cookieName()}=; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=0`);
}
function isAuthenticated(req) {
  return Boolean(verify(getCookie(req, cookieName())));
}
function requireAuth(req, res) {
  if (!secret() || !process.env.ADMIN_PASSWORD) {
    res.status(500).json({ error: "Admin nije podešen. Dodaj ADMIN_PASSWORD i ADMIN_SESSION_SECRET." });
    return false;
  }
  if (!isAuthenticated(req)) {
    res.status(401).json({ error: "Niste prijavljeni." });
    return false;
  }
  return true;
}
function login(req, res, password) {
  if (!process.env.ADMIN_PASSWORD || !secret()) return res.status(500).json({error:"Admin nije podešen."});
  if (password !== process.env.ADMIN_PASSWORD) return res.status(401).json({error:"Pogrešna lozinka."});
  setCookie(res, sign({ admin: true, exp: Date.now() + 12*60*60*1000 }));
  return res.status(200).json({ok:true});
}
module.exports = { requireAuth, login, clearCookie };
