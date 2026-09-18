# Website Factory Operations Runbook

Read this runbook before changing forms, the shared Cloudflare Worker, client onboarding, showcase setup, DNS/email, or multi-tenant deployment.

## Contact Forms & Security

All forms POST to a **shared Cloudflare Worker** (`worker/index.js`) deployed at `web-foundry-form-relay.cincinnati-web-foundry.workers.dev`. The Worker handles email delivery via Resend (internal notification + branded confirmation to submitter).

### Required form reliability rules (for every new client)

- Include a hidden `site_id` field (client slug) on every form. The Worker resolves the
  destination inbox server-side from KV via `site_id` (fallback: its `TO_EMAIL` env var).
  Do **not** add a `to_email` field — the Worker deliberately ignores client-supplied
  recipients (spoofing risk), so the field does nothing except leak into the
  notification email as a stray row.
- Submit as JSON (`Content-Type: application/json`) to the Worker, not multipart `FormData`.
- Frontend must only show success UI when `response.ok === true`.
- On failure, keep the form visible, show inline error, and refresh Turnstile token.
- Verify Worker CORS includes every live origin (`https://domain`, `https://www.domain` when used).

**Security layers:**
- **Cloudflare Turnstile** — bot verification widget on every form, token verified server-side in Worker
- **CORS lockdown** — Worker only accepts requests from domains listed in `ALLOWED_ORIGINS` env var
- **Honeypot** — hidden `botcheck` checkbox catches naive bots

**Worker env vars** (set via `wrangler secret put`):
- `TURNSTILE_SECRET_KEY` — fallback Turnstile server key, used only for sites with no
  per-site secret in KV (e.g. the Foundry hub's own form). **Not shared across client
  widgets** — see the KV `turnstileSecretKey` field below for why this matters.
- `ALLOWED_ORIGINS` — comma-separated allowed domains (e.g. `https://cincinnatiwebfoundry.com,http://localhost:4321`)
- `RESEND_API_KEY` — Resend email API key
- `TO_EMAIL` — internal notification recipient
- `ENFORCE_TURNSTILE` — optional strict mode (`true` to hard-fail invalid/missing Turnstile; default launch-safe mode is unset/false)

**Per-site Turnstile secret (`turnstileSecretKey` in KV, fixed 2026-07-29):** Each Cloudflare
Turnstile widget (site key) has its **own distinct secret key** — secrets are not shared across
widgets in an account, even under the same Cloudflare login. Every client gets their own widget
(Phase 5d), so every client needs their own secret stored in their `WEB_FOUNDRY_SITES` KV entry
as `turnstileSecretKey`. The Worker uses `config.turnstileSecretKey` when present, falling back
to the global `TURNSTILE_SECRET_KEY` only if it's missing. Get the value from **Cloudflare
Dashboard → Turnstile → [widget] → Edit Widget → Secret Key**. Until a client's KV entry has
this field, flipping `enforceTurnstile:true` for them will fail every submission with
`invalid-input-secret` — this went undetected platform-wide for months because
`enforceTurnstile` defaulted to `false` everywhere, so siteverify was never actually exercised
for any client. Before flipping the flag for **any** client, confirm `turnstileSecretKey` is
set in their KV entry first.

**Extra internal recipients (`notifyEmails` in KV, added 2026-09-17):** Optional per-site field for
sending the internal notification to more than one inbox — e.g. a client's own `sales@` group
alongside the Foundry's failsafe address. Accepts a string or an array of strings:

```json
{ "toEmail": "failsafe@example.com", "notifyEmails": "sales@client.com" }
```

Each extra recipient gets its **own separate email**, never a `cc`. That is the whole point of the
field: with a `cc`, one recipient hitting reply-all exposes every other recipient's address to the
lead and to each other. With separate sends, no recipient is ever on another's copy. `reply_to` is
still the lead on every copy, so replying reaches the prospect either way.

Notes:
- **Optional and inert when absent.** No `env` fallback — a site without the field sends exactly one
  internal email, unchanged. There is no global setting that can leak a recipient across sites.
- **`toEmail` is unaffected.** It remains the primary recipient, and its send is the one whose
  failure returns a 500 to the visitor.
- **Extra recipients are best-effort.** A failed send to a `notifyEmails` address is logged and
  swallowed, because the primary notification already captured the lead and a 500 would prompt the
  visitor to submit again and duplicate it. **So a broken extra recipient is silent** — it will not
  look like a form outage. Spot-check those inboxes periodically.
- Duplicates of `toEmail` are de-duplicated case-insensitively, so listing it twice sends once.

**Editing a KV entry safely:** `wrangler kv key put` **replaces the entire value**. Entries carry
`turnstileSecretKey`, so a put built by hand can silently drop it and break Turnstile on a live
form. Always read → modify → put the full object → read back and confirm:

```bash
cd worker && set -a && . ./.env && set +a
NS=<WEB_FOUNDRY_SITES namespace id>

npx wrangler kv key get <site_id> --namespace-id $NS --remote \
  | python3 -c 'import json,sys; d=json.load(sys.stdin); d["notifyEmails"]="sales@client.com"; print(json.dumps(d))' \
  > /tmp/site-kv.json

npx wrangler kv key put <site_id> --path /tmp/site-kv.json --namespace-id $NS --remote
npx wrangler kv key get <site_id> --namespace-id $NS --remote   # confirm turnstileSecretKey survived
```

**Sending identity (for client-side allowlisting):** the Worker sends from
`noreply@cincinnatiwebfoundry.com` via Resend. DMARC passes — the return path is
`send.cincinnatiwebfoundry.com` (`include:amazonses.com`), relaxed-aligned to the From org domain,
and DKIM at `resend._domainkey.cincinnatiwebfoundry.com` is strictly aligned. So mail landing in
quarantine is a spam/bulk/first-contact heuristic, not an auth failure, and the fix is a **Tenant
Allow/Block List sender entry** — not a transport rule and not an SPF change.

**When the extra recipient is a Microsoft 365 group**, expect a second, separate gate: Exchange
distribution lists ship with "require that all senders are authenticated" **on**, and M365 Groups
ship with external email **off**. Either one **rejects with an NDR** rather than quarantining, and
no allowlist fixes it. Ask the client's admin which object type the address is — a shared mailbox
has no such restriction. (ITA's `sales@` turned out to already accept external senders, so this is
a question to ask, not an assumption to act on.)

**Deploy Worker:** `cd worker && npx wrangler deploy`

### Recipient pattern and site inventory

**Standing pattern for new sites:** `toEmail` is the Foundry gmail
(`foundrysolutionsllc@gmail.com`). When the client is ready, add their address as `notifyEmails`
rather than replacing `toEmail`, so the Foundry always retains a copy.

**Know the asymmetry before applying this to an existing site.** `toEmail` is the *primary* send —
its failure returns a 500 and the visitor retries. `notifyEmails` is *best-effort* — its failure is
logged and swallowed. So the address in `notifyEmails` is the **fragile** one, and the Foundry gmail
in `toEmail` is mechanically the reliable one. The word "failsafe" in client docs implies the
reverse; it does not work that way.

Consequences:
**The rule: whoever acts on the leads gets `toEmail`.** They need guaranteed delivery. The party
keeping an archival copy can live in `notifyEmails`, because a gap there costs visibility, not
business.

- For a **new** site, `toEmail` = Foundry gmail, and move the client into `toEmail` when they are
  ready — adding them as `notifyEmails` is the interim step, not the end state.
- For an **existing** site whose `toEmail` is already the client's address, **add the Foundry gmail
  as `notifyEmails`** rather than swapping the two. Swapping demotes a working client inbox into the
  silently-droppable slot. (`mabassets` was handled this way on 2026-09-18.)
- Note this makes `itadata` the exception: its `toEmail` is the Foundry gmail and the acting party
  (`sales@itadata.com`) sits in the fragile slot, because that address was unverified when it was
  set up. It has since been confirmed working, so it is a candidate to flip.
- Either way, a client-address outage is **invisible** — no bounce surfaces, and the form keeps
  reporting success. Spot-check client inboxes periodically.

**Inventory as of 2026-09-18** (KV is the source of truth; this table goes stale):

| `site_id` | `toEmail` | `notifyEmails` | Turnstile enforced |
|---|---|---|---|
| `itadata` | Foundry gmail | `sales@itadata.com` | **yes** (has `turnstileSecretKey`) |
| `mabassets` | client gmail | Foundry gmail | **no** (no secret) |
| `terrys-lawncare` | Foundry gmail | — | **no** (no secret) |
| `demo-bakery`, `demo-plumber`, `demo-salon`, `web-foundry-hub` | no KV entry → `env.TO_EMAIL` | — | **no** |

Open gaps from that audit:
- **`mabassets` and `terrys-lawncare` have no bot protection.** The widget renders but no token is
  ever verified, because neither entry has a `turnstileSecretKey` and `enforceTurnstile` is
  false/absent. That is the *safe* state given no secret (see the Turnstile section above), but it
  is not protection. Fixing it needs each widget's secret from the Cloudflare dashboard.
- The four demo/hub `site_id`s have no KV entry, so they fall back to `env.TO_EMAIL` with default
  Web Foundry branding. Intended, but note `TO_EMAIL` is a Worker secret and its value cannot be read
  back from the API or dashboard — it can only be re-set. Confirm by submitting the hub's own form if
  its destination is ever in doubt.

### Post-deploy form smoke test (mandatory)

1. Submit one real form on the live domain.
2. Confirm internal notification reaches client inbox.
3. Confirm submitter confirmation email arrives.
4. If the site uses `notifyEmails`, confirm **each** extra recipient received its own copy, and
   check the Resend dashboard shows `delivered` for those messages — not merely `sent`/`accepted`.
   **`wrangler tail` cannot prove delivery here:** the Worker only logs when the Resend *API call*
   fails, and Resend returns 202 on queue, so a downstream bounce produces a clean tail and a
   successful-looking submission.
5. After deploying a Worker change, also submit one form on a site that did **not** change, to prove
   the untouched path still works.
6. If either fails, run:

```bash
cd worker
npx wrangler tail --format pretty --sampling-rate 0.99
```

## Keeping the Onboarding Skill Current

The client onboarding process is captured in the canonical shared skill at `skills/web-foundry-onboarding/` in this repo. Both `~/.claude/skills/web-foundry-onboarding` and `~/.agents/skills/web-foundry-onboarding` are symlinks to it, so Claude Code and Codex read the same workflow — edit the canonical directory, never the symlink paths. **Any time you make a change that affects how a new client site is spun up, update that skill immediately.** This includes:

- Changes to the Worker (new env vars, KV structure, form fields, deploy commands)
- Sanity schema or dataset conventions
- Coolify deployment steps or env var names
- Turnstile configuration
- DNS or domain setup changes
- New lessons learned from real onboardings

Also update `docs/cowork-intake-brief.md` and `docs/intake-form.md` if the changes affect what Cowork needs to know or what we ask clients.

## Adding a New Showcase Page

1. Copy the structure of an existing showcase page in `src/pages/showcase/`
2. Pick a distinct aesthetic (fonts, palette, motion style) — use the active tool's frontend or product-design workflow; in Claude Code, use the **frontend-design** skill
3. Link from `index.astro` — add a new `.project-card` in the showcase grid
4. Add the matching color swatches and mock wireframe CSS using the `.project-card__mock--[name]` pattern
5. Add a Turnstile widget (`<div class="cf-turnstile" data-sitekey="..." data-theme="auto">`) inside the contact form

## DNS & Email Setup

All domains use **Cloudflare for DNS management** and **Cloudflare Email Routing** for email forwarding (beyond form submissions).

### DNS Migration Process
1. Add domain to Cloudflare (creates nameserver pair)
2. Update domain registrar nameservers to point to Cloudflare
3. Cloudflare auto-imports existing DNS records (no data loss)
4. Verify Resend DKIM/SPF/MX records are present and verified

### Email Routing via Cloudflare
**For form submissions:** Cloudflare Worker + Resend (handled by `worker/index.js`)
**For general inbox forwarding:** Cloudflare Email Routing with routing rules
- Example: `hello@domain.com` → personal Gmail inbox
- Uses "Send to email" action (not Worker)
- No catch-all rules — only forward specific addresses to avoid spam/typos

**Why Cloudflare:**
- Single source of truth for DNS + email routing
- Auto-migrates records on nameserver switch
- Email Routing is free tier included
- Scales across all client sites

## Multi-Tenant Architecture (Website Factory)

This codebase is designed as a **base template** for spinning up client websites. The target is 20–30 static sites on a single 4-core/8GB VPS.

**Model:**
- Each client = 1 static Astro site forked from this template repo
- All sites share one Cloudflare Worker for form handling (serverless, zero VPS cost)
- Client sites use standard routes (`/menu`, `/services`, `/testimonials`) not `/showcase`
- Each client gets their own domain, GitHub repo, Coolify deployment, and Sanity dataset

**Scaling the Worker:**
- Add each new client domain to the Worker's `ALLOWED_ORIGINS`
- Every form must include a `site_id`; store per-site config (destination email, business name, brand colors, site URL) in Cloudflare KV

**Coolify tips:**
- Queue builds (don't run concurrent) to avoid CPU spikes from 3–4 simultaneous `npm run build`
- Each static site uses ~0 RAM at runtime (nginx serves files) — VPS headroom stays high
- For pull-request previews, follow Phase 6 Step 5a in the canonical onboarding skill. Existing
  Public GitHub applications should use the reversible manual repository-webhook route rather than
  accepting Coolify's permanent **Change Git Source** conversion warning.
- Check for an existing GitHub Actions production deploy before selecting manual-webhook events.
  Use **Pull requests only** when Actions already deploys pushes to `main`; selecting Pushes in both
  places can produce duplicate production deployments.
- Keep preview variables separate, leave public/fork PR deployments disabled, use DNS-only
  `*.preview.[domain]`, and verify the full create/build/HTTPS/close-cleanup lifecycle on the first
  controlled PR.
