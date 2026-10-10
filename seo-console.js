"use strict";
(() => {
  const byId = (id) => document.getElementById(id);
  const fmt = new Intl.NumberFormat("bs-BA", { maximumFractionDigits: 0 });
  const fmtPercent = (n) => (n * 100).toLocaleString("bs-BA", { maximumFractionDigits: 2 }) + "%";
  const fmtPos = (n) => n.toLocaleString("bs-BA", { maximumFractionDigits: 1 });
  const MAX_BYTES = 2 * 1024 * 1024;
  let rows = [];
  let currentIdeas = [];

  const seeds = {
    sl: [
      ["Koliko stane izdelava spletne strani v Sloveniji?", "Cena in izbira ponudnika", "izdelava-spletne-strani-cena.html"],
      ["Kdaj se splača prenova spletne strani?", "Znaki za prenovo", "prenova-spletne-strani.html"],
      ["Spletna stran za gostilno: jedilnik in rezervacije", "Spletne strani za gostinstvo", "restaurant-website-design.html"],
      ["Kaj mora vsebovati spletna stran obrtnika?", "Strani za lokalna podjetja", "small-business-website-design.html"],
      ["Spletna trgovina: stroški in ključne funkcije", "Spletne trgovine", "izdelava-spletnih-trgovin.html"],
      ["Kako izbrati SEO izvajalca brez praznih obljub?", "SEO vodič", "web-design.html"],
      ["Kako pripraviti fotografije za hitro spletno stran?", "Hitrost in slike", "web-design.html"],
      ["Spletna stran za hotel: neposredne rezervacije", "Spletne strani za hotel", "hotel-website-design.html"]
    ],
    de: [
      ["Was kostet eine Firmenwebsite in Österreich?", "Kosten und Leistungsumfang", "web-design-austria.html"],
      ["Wann lohnt sich ein Website-Relaunch?", "Relaunch Checkliste", "website-redesign-services.html"],
      ["Website für Restaurants: Speisekarte und Reservierung", "Gastronomie Websites", "restaurant-website-design.html"],
      ["Webdesign für Handwerksbetriebe", "Lokale Unternehmensseiten", "small-business-website-design.html"],
      ["Was braucht ein kleiner Online-Shop?", "E-Commerce Planung", "izdelava-spletnih-trgovin.html"],
      ["Technisches SEO: Grundlagen für Firmenwebsites", "Technische Optimierung", "web-design-germany.html"],
      ["Mobile Website optimieren: typische Probleme", "Mobile UX", "web-design-germany.html"],
      ["Mehr Anfragen über die Firmenwebsite erhalten", "Conversion und Kontakt", "web-design-austria.html"]
    ],
    en: [
      ["How much does a small business website cost?", "Pricing and scope", "small-business-website-design.html"],
      ["When is a website redesign worth it?", "Redesign checklist", "website-redesign-services.html"],
      ["Restaurant websites that help customers book", "Hospitality websites", "restaurant-website-design.html"],
      ["What should a contractor website include?", "Local business design", "construction-company-website-design.html"],
      ["What does a small online store need?", "Ecommerce planning", "izdelava-spletnih-trgovin.html"],
      ["SEO basics for service businesses", "Search optimization", "web-design.html"],
      ["How to improve website mobile performance", "Mobile experience", "web-design.html"],
      ["How to get more enquiries from your website", "Conversion design", "web-design-usa.html"]
    ]
  };
  const localeName = { sl: "Slovenija", de: "DACH", en: "Globalno" };

  function message(s, error = false) {
    const el = byId("status");
    el.textContent = s;
    el.style.color = error ? "#ffb2a5" : "";
  }

  function detectDelimiter(text) {
    const header = text.replace(/^\uFEFF/, "").split(/\r?\n/).find(l => /query|top queries|clicks|impressions/i.test(l)) || text.slice(0, 300);
    const counts = [",", ";", "\t"].map(char => ({ char, score: (header.match(new RegExp(char === "\t" ? "\t" : "\\" + char, "g")) || []).length }));
    counts.sort((a, b) => b.score - a.score);
    return counts[0].score > 0 ? counts[0].char : ",";
  }

  // RFC 4180 CSV including escaped double quotes and embedded newlines.
  function parseCSV(text) {
    const delimiter = detectDelimiter(text);
    const records = [];
    let record = [], field = "", inside = false;
    text = text.replace(/^\uFEFF/, "");
    for (let i = 0; i < text.length; i++) {
      const c = text[i];
      if (c === '"') {
        if (inside && text[i + 1] === '"') { field += '"'; i++; }
        else if (field === "" || inside) inside = !inside;
        else field += c;
      } else if (!inside && c === delimiter) { record.push(field); field = ""; }
      else if (!inside && (c === "\n" || c === "\r")) {
        if (c === "\r" && text[i + 1] === "\n") i++;
        record.push(field);
        if (record.some(x => x.trim())) records.push(record);
        record = []; field = "";
      } else { field += c; }
    }
    if (inside) throw new Error("CSV sadrži nezatvoren navodnik.");
    record.push(field);
    if (record.some(x => x.trim())) records.push(record);
    return records;
  }

  function numberOf(raw) {
    let s = String(raw ?? "").replace(/[\s\u00A0%]/g, "").trim();
    if (!s) return NaN;
    if (s.includes(",") && s.includes(".")) {
      s = s.lastIndexOf(",") > s.lastIndexOf(".") ? s.replace(/\./g, "").replace(",", ".") : s.replace(/,/g, "");
    } else if (s.includes(",")) {
      s = /^\d{1,3}(,\d{3})+$/.test(s) ? s.replace(/,/g, "") : s.replace(",", ".");
    } else if (/^\d{1,3}(\.\d{3})+$/.test(s)) {
      s = s.replace(/\./g, "");
    }
    return Number(s);
  }

  function parseQueries(text) {
    const records = parseCSV(text);
    const headersIndex = records.findIndex(r => {
      const normalized = r.map(x => x.trim().toLowerCase());
      return (normalized.includes("top queries") || normalized.includes("query")) &&
             normalized.includes("clicks") && normalized.includes("impressions") &&
             normalized.includes("ctr") && normalized.includes("position");
    });
    if (headersIndex < 0) throw new Error("Treba CSV 'Queries.csv' s kolonama Top queries, Clicks, Impressions, CTR, Position.");
    const header = records[headersIndex].map(x => x.trim().toLowerCase());
    const at = (...names) => header.findIndex(x => names.includes(x));
    const qi = at("top queries", "query"), ci = at("clicks"), ii = at("impressions"), ti = at("ctr"), pi = at("position");
    const found = [];
    for (const r of records.slice(headersIndex + 1)) {
      const query = (r[qi] || "").trim().slice(0, 300);
      const clicks = numberOf(r[ci]), impressions = numberOf(r[ii]);
      const ctrRaw = String(r[ti] || "").trim();
      const ctr = numberOf(ctrRaw);
      const position = numberOf(r[pi]);
      if (!query || !Number.isFinite(clicks) || !Number.isFinite(impressions) ||
          !Number.isFinite(ctr) || !Number.isFinite(position) ||
          clicks < 0 || impressions < 0 || clicks > impressions || position <= 0 ||
          ctr < 0 || (!ctrRaw.includes("%") && ctr > 1) || (ctrRaw.includes("%") && ctr > 100)) continue;
      found.push({ query, clicks, impressions, ctr: ctrRaw.includes("%") ? ctr / 100 : ctr, position });
    }
    if (!found.length) throw new Error("CSV nema validnih redova za ključne riječi.");
    return found;
  }

  function score(r) {
    // Heuristic priority, NOT a Google ranking score or a traffic forecast.
    const visibility = Math.log1p(r.impressions);
    const positionFactor = r.position >= 4 && r.position <= 20 ? 1.8 :
      r.position > 20 && r.position <= 40 ? 1.25 : 0.75;
    const ctrFactor = r.ctr < 0.03 ? 1.5 : r.ctr < 0.07 ? 1.15 : 0.7;
    return visibility * positionFactor * ctrFactor;
  }
  function priority(r) {
    const s = score(r);
    return s >= 13 ? "Visoko" : s >= 7 ? "Srednje" : "Pratiti";
  }
  function sortRows() { return [...rows].sort((a, b) => score(b) - score(a)); }

  function setKpis() {
    const clicks = rows.reduce((s, r) => s + r.clicks, 0);
    const impressions = rows.reduce((s, r) => s + r.impressions, 0);
    byId("clicks").textContent = rows.length ? fmt.format(clicks) : "—";
    byId("impressions").textContent = rows.length ? fmt.format(impressions) : "—";
    byId("ctr").textContent = impressions ? fmtPercent(clicks / impressions) : "—";
    byId("position").textContent = impressions ?
      fmtPos(rows.reduce((s, r) => s + r.position * r.impressions, 0) / impressions) : "—";
  }

  function node(tag, content, className) {
    const el = document.createElement(tag);
    if (content != null) el.textContent = content;
    if (className) el.className = className;
    return el;
  }

  function renderKeywords() {
    const filter = byId("search").value.toLocaleLowerCase().trim();
    const visible = sortRows().filter(r => r.query.toLocaleLowerCase().includes(filter)).slice(0, 250);
    byId("keyword-count").textContent = rows.length ?
      rows.length + " učitanih upita. Prikazano " + visible.length + " (sortirano po našoj heuristici prioriteta)." :
      "Uvezi CSV da vidiš prioritete.";
    const target = byId("keyword-rows");
    target.replaceChildren();
    if (!visible.length) {
      const tr = node("tr"), td = node("td", rows.length ? "Nema rezultata za odabrani filter." :
        "Još nema podataka. Uvezi Queries.csv iz Google Search Console.", "empty");
      td.colSpan = 6; tr.append(td); target.append(tr); return;
    }
    for (const r of visible) {
      const tr = node("tr");
      const cells = [r.query, fmt.format(r.impressions), fmt.format(r.clicks),
        fmtPercent(r.ctr), fmtPos(r.position)];
      for (const value of cells) tr.append(node("td", value));
      const td = node("td"), label = node("span", priority(r), priority(r) === "Visoko" ? "tag high" : "tag");
      td.append(label); tr.append(td); target.append(tr);
    }
  }

  function plan() {
    const loc = byId("locale").value;
    const fromData = sortRows()
      .filter(r => r.impressions > 0 && r.query.length > 3)
      .slice(0, 4)
      .map(r => ({ title: r.query, label: "Search Console · " + fmt.format(r.impressions) + " prikaza", url: "/web-design.html", verified: true }));
    const starters = seeds[loc].map(([title, label, path]) =>
      ({ title, label, url: "/" + path, verified: false }));
    const ideas = [...fromData, ...starters].slice(0, 8);
    return ideas.map((x, i) => ({ ...x, day: [1, 4, 7, 11, 15, 19, 23, 27][i], locale: loc }));
  }

  function briefFor(item) {
    const origin = item.verified ? "Stvarni upit iz uvezenog CSV-a" : "Hipoteza / urednička ideja (bez dokaza o obimu pretrage)";
    return [
      "LNK DIGITAL — SEO urednički brief",
      "Tema / ključni upit: " + item.title,
      "Izvor: " + origin,
      "Tržište: " + localeName[item.locale],
      "Predloženi dan objave: " + item.day + " (plan, ne automatizovana objava)",
      "Relevantna postojeća stranica: https://www.lnkdigital.com" + item.url,
      "",
      "Svrha: odgovoriti na stvaran problem potencijalnog klijenta, bez nepotvrđenih obećanja.",
      "Struktura: kratak direktan odgovor → praktični koraci → primjeri i ograničenja → FAQ → poziv na upit.",
      "Provjera prije objave: činjenice, cijene, autentičnost referenci, lokalni jezik, originalnost, interno povezivanje, meta title, description, canonical i mobilni prikaz.",
      "CTA: Zatražite ponudu ili demonstraciju web stranice od LNK DIGITAL.",
      "Status: DRAFT — OBAVEZNO RUČNO ODOBRENJE."
    ].join("\n");
  }

  function renderIdeas() {
    currentIdeas = plan();
    byId("plan-source").textContent = rows.length ?
      "Do 4 ideje dolaze iz uvezenih GSC upita. Ostale su uredničke hipoteze." :
      "Početne uredničke ideje. Nema potvrđenih podataka o obimu pretrage.";
    const host = byId("ideas"); host.replaceChildren();
    for (const idea of currentIdeas) {
      const card = node("article", null, "idea");
      card.append(node("span", "DAN " + idea.day + " · " + (idea.verified ? "GSC PODATAK" : "POČETNA IDEJA"), "tag"));
      card.append(node("h3", idea.title));
      card.append(node("p", idea.label));
      const btn = node("button", "Pripremi brief →", "button");
      btn.type = "button";
      btn.addEventListener("click", () => {
        byId("brief").value = briefFor(idea);
        byId("brief").scrollIntoView({ behavior: "smooth", block: "nearest" });
      });
      card.append(btn);
      host.append(card);
    }
  }

  function switchTab(name) {
    for (const tab of document.querySelectorAll("[data-tab]")) {
      const selected = tab.dataset.tab === name;
      tab.setAttribute("aria-selected", selected ? "true" : "false");
      byId("panel-" + tab.dataset.tab).hidden = !selected;
    }
  }

  function csvCell(value) {
    let s = String(value);
    // Protect spreadsheet users from CSV formula injection in untrusted search queries.
    if (/^[\s]*[=+\-@\t\r]/.test(s)) s = "'" + s;
    return '"' + s.replace(/"/g, '""') + '"';
  }
  function saveCSV() {
    const today = new Date();
    const csv = [["Day", "Suggested date", "Market", "Proposed title", "Evidence", "Internal link", "Status"]
      .map(csvCell).join(",")];
    for (const idea of currentIdeas) {
      const date = new Date(today.getFullYear(), today.getMonth(), today.getDate() + idea.day - 1);
      const dateString = [date.getFullYear(), String(date.getMonth() + 1).padStart(2, "0"), String(date.getDate()).padStart(2, "0")].join("-");
      csv.push([idea.day, dateString, localeName[idea.locale], idea.title,
        idea.verified ? "Imported GSC query" : "Editorial hypothesis",
        "https://www.lnkdigital.com" + idea.url, "DRAFT - manual review required"].map(csvCell).join(","));
    }
    const blob = new Blob(["\uFEFF" + csv.join("\r\n")], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob), a = document.createElement("a");
    a.href = url; a.download = "lnk-seo-plan-" + byId("locale").value + ".csv";
    document.body.append(a); a.click(); a.remove(); setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  function loadMetrics(parsed, source) {
    rows = parsed;
    byId("search").value = "";
    message("Učitano " + rows.length + " upita iz " + source +
      ". Zbir po upitima nije ukupan promet sajta; anonimne pretrage mogu nedostajati.");
    setKpis(); renderKeywords(); renderIdeas(); switchTab("keywords");
  }

  async function syncGSC() {
    const btn = byId("sync"); btn.disabled = true; btn.textContent = "Provjeravam…";
    try {
      const resp = await fetch("/api/seo-gsc", { method: "GET", credentials: "same-origin", cache: "no-store", headers: { Accept: "application/json" } });
      const data = await resp.json();
      if (!resp.ok) {
        if (resp.status === 401) throw new Error("Prvo se prijavi u /admin.html (potrebna je admin sesija).");
        if (resp.status === 503) throw new Error("Automatski GSC pristup još nije konfigurisan na serveru. Možeš koristiti CSV uvoz.");
        throw new Error(data.error || "Google sinhronizacija nije uspjela.");
      }
      if (!Array.isArray(data.rows)) throw new Error("GSC odgovor nema očekivani format.");
      const parsed = data.rows.filter(r => r && typeof r.query === "string" &&
        r.query.length <= 300 && [r.clicks, r.impressions, r.ctr, r.position].every(Number.isFinite) &&
        r.clicks >= 0 && r.impressions >= r.clicks && r.ctr >= 0 && r.ctr <= 1 && r.position > 0);
      if (!parsed.length) {
        rows = []; setKpis(); renderKeywords(); renderIdeas();
        message("Google je dostupan, ali nije vratio upite za period " + data.startDate + " – " + data.endDate +
          ". To nije dokaz da je promet nula.");
        return;
      }
      loadMetrics(parsed, "Google Search Console API (" + data.startDate + " – " + data.endDate + ")");
    } catch (err) { message(err instanceof Error ? err.message : "Greška Google povezivanja.", true); }
    finally { btn.disabled = false; btn.textContent = "↻ Preuzmi iz Googlea"; }
  }

  async function importFile(file) {
    if (!file) return;
    if (file.size > MAX_BYTES) { message("Fajl je prevelik (maksimalno 2 MB).", true); return; }
    if (!/\.csv$/i.test(file.name)) { message("Izaberi .csv fajl iz Google Search Console.", true); return; }
    try {
      const parsed = parseQueries(await file.text());
      loadMetrics(parsed, file.name);
    } catch (err) { message(err instanceof Error ? err.message : "Greška u čitanju datoteke.", true); }
  }

  byId("sync").addEventListener("click", syncGSC);
  byId("file").addEventListener("change", e => { importFile(e.target.files[0]); e.target.value = ""; });
  byId("reset").addEventListener("click", () => {
    rows = []; byId("search").value = ""; byId("brief").value = "";
    message("Podaci očišćeni. Nijedan podatak nije poslan na server.");
    setKpis(); renderKeywords(); renderIdeas(); switchTab("overview");
  });
  byId("search").addEventListener("input", renderKeywords);
  byId("locale").addEventListener("change", () => { byId("brief").value = ""; renderIdeas(); });
  byId("export").addEventListener("click", saveCSV);
  byId("copy").addEventListener("click", async () => {
    const content = byId("brief").value;
    if (!content) { byId("brief").focus(); return; }
    try { await navigator.clipboard.writeText(content); message("Brief kopiran."); }
    catch { byId("brief").focus(); byId("brief").select(); message("Označen tekst. Kopiraj ga ručno ako preglednik blokira clipboard."); }
  });
  for (const button of document.querySelectorAll("[data-tab]")) {
    button.addEventListener("click", () => switchTab(button.dataset.tab));
  }
  setKpis(); renderKeywords(); renderIdeas();
})();
