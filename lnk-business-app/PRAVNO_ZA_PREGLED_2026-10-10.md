# LNK BUSINESS — PREDLOG PRAVNE DOKUMENTACIJE ZA PREGLED (NI ZA JAVNO OBJAVO)

**Status: OSNUTEK, zahteva pregled in potrditev odgovorne pravne osebe in pravnega strokovnjaka.**

Datum: 2026-10-09. Velja samo za LNK BUSINESS, ne za storitve drugih projektov.

## A. Podatki upravljavca — obvezna potrditev
- Pravna oseba / s.p.: **[POTRDITI VELJAVNO IME IN PRAVNO OBLIKO]**
- Sedež: **[POTRDITI REGISTRIRANI NASLOV]**
- Matična številka: **[POTRDITI]**
- Davčna številka / identifikacija za DDV: **[POTRDITI]**
- Kontaktni e-mail za varstvo podatkov: **[POTRDITI]**
- Kontakt za prijavo napak in zahtev za izbris: **[POTRDITI]**
- Namen B2B aplikacije in podatkovne vloge: v LNK BUSINESS ponudnik praviloma upravlja registracijske in obračunske podatke uporabnikov; posamezno podjetje je lahko upravljavec osebnih podatkov svojih strank in gostov, ponudnik LNK BUSINESS pa obdelovalec. Vloge je treba pravno preveriti.

Ne prepisujte starih ali še neaktualnih davčnih ali registrskih podatkov. **Ni dovoljeno** objaviti osnutka z nepreverjenimi identifikacijskimi podatki.

## B. Osnutek obvestila o zasebnosti
- Kaj aplikacija hrani: e-mail in identiteto uporabniškega računa; podatke podjetja; stranke, njihove kontakte in interne opombe; ponudbe; interne termine; menije in slike; javna povpraševanja za rezervacije (ime, telefon, e-pošta, termin, število oseb, opomba, potrditev seznanitve).
- Kdo vidi podatke: poslovni uporabnik lastnega podjetja; potencialno pooblaščeno tehnično osebje po potrebi, skladno s pogodbo o obdelavi. Objavljeni jedilniki, cene, slike in podatki o odprtosti restavracije so javno dostopni.
- Namen in pravne podlage: zagotavljanje storitve na podlagi pogodbe; izpolnjevanje zakonskih obveznosti; pravne podlage za podatke gostov/restavracij mora upravljavec določiti posebej.
- Ponudniki storitev: Supabase (avtentikacija, podatki in shranjevanje fotografij), Vercel (gostovanje), dostava JavaScript knjižnice jsDelivr; zunanji ponudnik QR slike qrserver.com lahko prejme javno URL povezavo, zunanji strežnik hrane prejme zahtevek za fotografijo. Pregledati dejanske pogodbe, regije in morebitne prenose.
- Varnost: Supabase Row Level Security in lastništvo `owner_id`, objavljene menije lahko berejo obiskovalci, API dostopi po HTTPS. Varnostni pregled in penetracijski testi še niso dokončani.
- Čas hrambe: **[DOLOČITI ZA VSAKO KATEGORIJO]**; posebna pravila lahko veljajo za poslovne in davčne evidence.
- Pravice: dostop, popravek, izbris, omejitev, prenosljivost in ugovor, kjer so relevantne; poti in roki obravnave: **[DOLOČITI]**.
- Izvozi JSON so omogočeni lastniku poslovnega računa; brisanje računa in vseh shranjenih podatkov še ni avtomatizirano.
- Piškotki in lokalna shramba: Supabase uporabniška seja za prijavo in shranjena nastavitev izbranega jezika (funkcionalna nastavitev). Potrebna pregledna dokumentacija in preveritev, ali obstajajo dodatne tehnologije sledenja.
- Profiliranje in avtomatizirano odločanje: **[PREVERITI REALNO IMPLEMENTACIJO]**.
- Kontakt za varstvo osebnih podatkov in pristojni nadzor: **[DOPOLNITI]**.

## C. Pogodba o obdelavi podatkov (DPA), ključne točke
- Namen, trajanje, vrste in kategorije podatkov ter obdelav.
- Navodila upravljavca, zaupnost, varnostni ukrepi, obdelovalci na podlagi dovoljenja.
- Pomoč pri zahtevah posameznikov, varnostnih incidentih, hrambi, izbrisu, reviziji.
- Mehanizmi za mednarodne prenose in podpogoji.

## D. Pogoji poslovanja
- Opis dostopnih funkcij; QR meni, PDF **ponudbe**, termini in zahtevki niso davčni računi ali zakonski strukturirani e-računi.
- Rezervacijski obrazec odda zgolj **zahtevo**, lokal mora rezervacijo posebej potrditi; nobenega samodejnega sporočila še ni.
- Obveznosti uporabnika: zakonita obdelava podatkov; točni podatki o cenah, jedilnih sestavinah in alergenih; pravice do objavljenih fotografij; pravilna davčna stopnja.
- Cene trenutno le informativni **pilotni predlogi**, spletni nakup, mesečno zaračunavanje in samodejni podaljški ne obstajajo.
- Uporabniški dostop, odpoved, podpora, razpoložljivost, omejitve odgovornosti, reševanje sporov, veljavno pravo: **[USKLADITI S PRAVNIM STROKOVNJAKOM]**.
- E-računi v Sloveniji: pred uporabo preveriti zakonske zahteve, e-SLOG/XML/PEPPOL, identifikacijo izdajatelja, dostavo in morebitno davčno potrjevanje.

## E. Blokade pred javno uporabo osebnih podatkov in pobiranjem plačil
1. Potrjen veljaven subjekt na dan lansiranja in točne davčne oznake, ločitev od nepreverjenih podatkov starega podjetja.
2. Pravno pregledana politika zasebnosti in pogoji uporabe; podpisana potrebna DPA.
3. Funkcionalna obdelava zahtevkov za izbris, dostop in izvoz; znano časovno obdobje hrambe.
4. Test varstva osebnih podatkov, test izolacije dveh podjetij; pregled skupnih Supabase opozoril brez spreminjanja drugih aplikacij.
5. Pristop proti spam zahtevkom (rate limit/CAPTCHA) pred aktivacijo javnih rezervacij; privzeto ostanejo izklopljene.
6. Popoln end-to-end test prijave, menija, fotografij, PDF, mobilnega prikaza, jezikov in izvozov.
7. Dogovorjene cene, pogoji plačil in davčne obveznosti; šele nato integracija licenciranega plačilnega ponudnika.
8. Šele nato prodajno lansiranje. Brez trditev, da so e-računi ali avtomatske naročnine že na voljo.

## F. Jeziki
Osnovne navigacijske in obrazčne oznake prevedene v sl, en, de, hr, bs, sr, it, fr, es, sq.
**Pravni dokumenti, daljši opisi, preverjanje davkov in izvoz poslovnih dokumentov niso prevedeni ali pravno lokalizirani.** Pred trženjem posamezni državi je potreben jezikovni in pravni pregled.
