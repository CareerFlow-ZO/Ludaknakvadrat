# LNK BUSINESS — Workspace vNext Implementation Plan
Date: 2026-10-12
Branch: feature/lnk-business-workspace-20261012
Base: lnk-business-beta-20261009
Production: UNCHANGED

## Verified current implementation
Source: lnk-business-app/README.md and source files on base branch.
- Supabase authentication with isolated lb_ tables and row-level security.
- Company records, contacts/clients, editable quotes and PDF print, staff-entered appointments.
- QR menu publication, booking requests with protections, JSON export.
- Invoice **drafts only**, not legally issued invoices, fiscalization or e-invoicing.
- Billing beta/price UX exists but live checkout remains disabled.
- Production Vercel deployment READY from base branch. Recent unrelated cinematic-branch previews ERROR on same Vercel project; avoid touching its deployment configuration.

## Implemented in this branch
- workspace-lab.html: standalone noindex six-tab interactive feature lab, separate from existing app routes.
- Projects/tasks: browser-only create and view with statuses and deadlines.
- CRM: browser-only lead pipeline.
- Draft invoice/payment status simulation (NOT a legally valid invoice or real payment).
- Browser-only team messages; NOT multiuser communication.
- Client portal preview (not published, no invite sharing).
- Offline assistant planning template (NOT a hosted AI model).
- All demo state stored in browser localStorage and can be cleared.
- No routes, auth, Supabase SQL, live billing, payment handlers, or production files modified.

## Phase 1 — Secure projects/tasks and CRM
1. Add lb_projects, lb_tasks, lb_leads, lb_lead_activities to Supabase via versioned additive migrations, each with owner_id, created_at, updated_at, constraints, indexes and RLS.
2. Verify cross-tenant denial in two authenticated test accounts. Avoid permissive anonymous policies.
3. CRUD server/data layer with validation, company-scoped access and safe audit log.
4. Integrate into beta navigation only after passing staging tests.

## Phase 2 — Invoice drafts and payment tracking
1. Reuse existing invoice-draft model; migrate only missing fields with backward compatibility.
2. Payment records must be auditable; never fake a successful provider transaction.
3. Proper tax/legal invoice issuance and Slovenian/European e-invoicing require separate compliance review, legal sign-off and separate release gate.
4. Do not enable Stripe live or turn draft PDFs into official invoices.

## Phase 3 — Team chat
1. Workspace membership and invites with expiration and least-privilege roles.
2. lb_channels and lb_messages with membership RLS and rate limiting, file scanning and retention policies.
3. Real-time feature gated in staging; no customer data in demos.

## Phase 4 — Client portal
1. Explicit per-project client invitations and scoped authorization.
2. Read-only client milestones initially; later approvals and documents with access logs.
3. Security test cross-client isolation, revocation and export/deletion.

## Phase 5 — AI assistant
1. Backend proxy with authenticated org-scoped use, secrets server-side, token limits and budget caps.
2. Restrict AI context to permission-checked data, redact sensitive fields, require approval before any write or external action.
3. Explain outputs may be incorrect and log usage without retaining sensitive prompts unnecessarily.

## Release criteria
- Preview only; NO production alias or auto-merge.
- Static checks + mobile browser QA, auth/login/logout, RLS negative tests, CSRF/input sanitation, accessibility keyboard flow, basic i18n, GDPR/retention review.
- No regression in company/client/quote/appointments/QR menu/reservations.
- Signed approval before any migration, production deployment or paid checkout.
- Staging deploy only after Vercel preview routing verified; never deploy preview using production target.

## Known risk
Vercel deployment metadata for lnk-business-saas shows production READY on lnk-business-beta-20261009 but multiple ERROR builds from preview/lnk-cinematic-20261012. Project/source linkage should be reviewed before initiating ANY new Vercel deployment.
