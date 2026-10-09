# LNK BUSINESS — B2B izdaja računov in računovodski servisi
**Osnutek specifikacije / samo za pravni pregled (2026-10-09).**

## Računi
- Prvi modul `racuni.html` ustvarja izključno **osnutke** in označen PDF. Ni predviden za pošiljanje kot uradni račun.
- Izdajatelj: ime firme, poslovni naslov, davčna številka, TRR. Kupec: ime, naslov, davčna številka. Vse podatke mora zavezanec preveriti; trenutno niso samodejno potrjeni v registrih.
- Datum osnutka, datum storitve, predvidena zapadlost, vrstice, količina, cena, DDV stopnja in opombe.
- Referenca `OSN-YYYY-NNN` ni zakonsko zaporedna številka izdanega računa; ne pretvarjajte je v obvezno številko izdanega računa.
- Potrebno pripraviti spremembe za pravilno numeracijo, izjemne režime DDV, storitve in dobave v tujini, kopije izdanih računov, popravke, dobropise in verodostojno revizijsko sled.
- Če podpremo gotovinsko/kartično plačilo, moramo po pravilih preveriti obveznosti davčnega potrjevanja FURS; samo neposredno TRR nakazilo se za ta namen ne šteje za gotovinsko plačilo.
- ZIERDED za domače B2B e-račune 1.1.2028 zahteva strukturirane podatke in izmenjavo. PDF sam ni strukturiran e-račun.
- Pogoji uporabe morajo jasno obravnavati obveznosti izdajatelja in omejitve ponudnika programske opreme.

## Računovodski servis
- `lb_accountant_profiles` profil po uspešni potrditvi registracijskega e-maila.
- `lb_accountant_invites`: lastnik podjetja izdela enkratno UUID povezavo z omejenim 7-dnevnim rokom; validacija potrjenega e-maila ob sprejemu.
- `lb_accountant_access`: vzpostavi se izključno preko RPC za sprejem vabila; lastnik ga lahko prekliče. Računovodja ima le RLS SELECT na `lb_invoice_drafts` za povezane firme.
- Računovodja ne more ustvariti, urediti ali izbrisati osnutkov podjetja ter nima dostopa do surovih tabel strank ali obstoječih ponudb.
- Povezovanje predstavlja razkritje poslovnih in osebnih podatkov računovodskemu servisu; potrebno je preveriti pogodbe, podlage, vloge upravljavca in obdelovalca, revizijsko sled in omejitev dostopa.
- Pred prodajo dodati elektronsko podpisan dogovor ali izrecno privolitev za povezavo in revizijo sprememb pravic. Če ni ustreznih dokumentov, pustiti računovodski del le za testne uporabnike.

## Uradni viri, preverjeni ob pripravi
- https://spot.gov.si/sl/teme/izdajanje-racunov/
- https://www.gov.si/teme/davcni-postopek-in-davcno-potrjevanje-racunov/
- https://www.gov.si/novice/2025-10-23-drzavni-zbor-sprejel-zakon-o-izmenjavi-elektronskih-racunov-in-drugih-elektronskih-dokumentov/
