# LNK BUSINESS vNext — pre-production verification gate

**Status:** NOT APPROVED FOR PRODUCTION.
**Branch:** feature/lnk-business-workspace-20261012
**Deploy:** no Vercel deployment requested; production alias unchanged.

## Implemented
- `workspace-secure-staging.html`: sign-in session verification with Supabase Auth `getSession` and `getUser`, owner-scoped CRUD for projects, tasks, and CRM leads, user-visible error reporting and no direct HTML insertion from database data.
- By default the page uses sentinel placeholders for the staging Supabase URL and publishable key and will refuse to connect until these are replaced *in an isolated staging-only build*.
- SQL migration creates `lb_projects`, `lb_tasks`, `lb_leads`, `lb_lead_activities` with RLS and owner-only policies; client cross-owner reference removed until composite foreign keys can be tested.
- Never apply this migration to the shared production Supabase project.

## Required verification in a dedicated test project
1. Provision a separate, non-production Supabase database with a distinct project ref. Do not share the real `mwgnwbmssiyugwlsnotz` database.
2. Add only synthetic test users A and B, create verified sessions, and set secure redirect URLs.
3. Apply migration to staging only; review dependencies and policy expressions for all four tables.
4. As A: create project/task/lead/activity; read/edit/delete own objects.
5. As B: ensure all A objects are invisible; attempt guessing A UUIDs and inserting owner_id=A UUID; all must fail; check cross-owner foreign-key use.
6. Sign out and verify no anonymous read/write; check expired sessions and revoked access.
7. Check malformed inputs, excessive lengths, empty names, client side and DB constraints, deletion cascade, and repeated requests.
8. Check existing quote, customer, menu, booking and invoice draft regression tests on separate production-compatible build with synthetic data.
9. Inspect CSP/XSS, dependencies, responsive layout, keyboard access and Slovenian translations.
10. Only after separate successful beta deploy and written sign-off, merge feature branch and deploy to production.

## Deferred deliberately
- Team chat requires member permissions, channels, Realtime policies, anti-spam limits and retention.
- Client portal requires invitations with strict per-client scope and access revocation.
- AI backend requires secret isolation, org scoped data access, action approvals and usage limits.
- Legal invoices/Stripe payment activation not implemented; existing invoice drafts are not official invoices.

## Static checks
The following were checked in the source: staging-only configuration placeholders, user verification, owner scoped queries, no service_role key in the browser, all four RLS clauses, anonymous revoke, no unscoped client FK.
These are **source checks only**; functional and cross-account tests are pending.
