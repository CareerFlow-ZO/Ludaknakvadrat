# LNK BUSINESS — connected beta (October 2026)
Standalone web app at a separate Vercel project. Supabase Auth with password / email verification, server-stored per-owner data, Postgres RLS for businesses/clients/quotes/appointments, and public published restaurant menu.
The database migration **lnk_business_isolated_beta_schema_20261009** created lb_companies, lb_clients, lb_quotes, lb_appointments, lb_public_pages, lb_menu_items. No existing tables altered.
Authentication email redirect URLs must include the deployment production domain in Supabase Auth > URL Configuration.
Not yet included: Stripe payments, invoices, Slovenia e-SLOG e-invoice export/exchange, official tax verification, public booking form, cross-worker scheduling, legal privacy terms and DPA, security penetration testing.
Important: shared Supabase project has prior security advisor notices not caused by these new tables; these require independent review before full production.
Do not enter personal customer records until data processing and privacy terms are reviewed.
Client dependency: pinned @supabase/supabase-js@2.57.0 via jsDelivr.
