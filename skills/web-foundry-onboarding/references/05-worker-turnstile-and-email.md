# Phase 5 — Worker, KV, Turnstile, and Email

## Contents

- KV site configuration
- Origin allowlist
- Shared Worker deployment
- Per-client Turnstile widget and secret
- Email branding
- Reliability gate

## Preserved Playbook

## Phase 5 — Worker KV Routing

> **Run every command in this phase from the template repo's `worker/` directory** — `~/projects/the-web-foundry/db-design-website/worker`. There is only one deployed Worker, shared by every client site; it is never deployed from a client fork. (If Phase 3 was followed, client forks don't have a `worker/` directory at all — see Step 2.)

### 5a: Add site config to KV

Read the template's `docs/operations-runbook.md` before any shared Worker/KV write. Confirm the exact account, namespace, client slug, recipient, and current deployment/repository state. The example below is for a **new, absent key only**. `kv key put` replaces the full value: for an existing key, read to an owner-only temporary file, modify the full object, write it back, and verify a redacted projection. Preserve `turnstileSecretKey`, `notifyEmails`, and unknown fields. Never print the complete KV object into chat/logs or paste a secret into a command.

```bash
cd ~/projects/the-web-foundry/db-design-website/worker
npx wrangler kv key put --binding WEB_FOUNDRY_SITES --remote "[client-slug]" \
  '{"toEmail":"[client-email]","businessName":"[Business Display Name]","brandColor":"[primary-hex]","headerBg":"[dark-hex]","siteUrl":"https://[client-domain.com]","enforceTurnstile":false}'
```

> **Important:** Use `--remote` flag. Without it, wrangler writes to the local KV store only, not the deployed Worker's KV.

**KV config fields:**

| Field | Required | Purpose |
|-------|----------|---------|
| `toEmail` | Yes | Where internal notification is sent |
| `notifyEmails` | Per approved routing | Foundry archival/failsafe recipient(s), sent separately from the client's primary copy. Preserve existing values; verify every configured inbox. |
| `businessName` | Yes | Email subject lines, header, footer |
| `brandColor` | Yes | Email accent: the wordmark text, the 3px rule under the header, and (Foundry only) the CTA button. Use the client's **primary accent**. Must be readable on `headerBg` (large-text contrast ≥ 3:1). |
| `headerBg` | Yes | Email header background **and** the "We've got your message." heading color (which sits on a **white** body). Use a **genuinely dark** brand tone (ink / espresso / navy). If the palette has no dark color, use a deep tint of the primary — too-light values make the heading unreadable. |
| `siteUrl` | Yes | Client's live domain (not used in CTA for client sites, but stored for future use) |
| `enforceTurnstile` | Recommended | Set `false` at launch, then flip to `true` for that specific site only after live verification succeeds |
| `turnstileSecretKey` | Required before `enforceTurnstile:true` | The client's own Turnstile widget secret (from Phase 5d Step 5). Not known yet at initial KV setup — added once the widget exists. **Without it, `enforceTurnstile:true` hard-fails every submission** (`invalid-input-secret`) because widget secrets aren't shared across a Cloudflare account. |

**How these are used in the confirmation email:**
- Client sites get their own brand colors in the email header, accent rule, and heading — no Web Foundry terracotta/ink
- The "View Our Work" CTA linking to cincinnatiwebfoundry.com is **only shown for Web Foundry's own form** — client site emails omit it
- The submission summary dynamically lists all form fields the user submitted (not just hardcoded name/phone/business/website)

**Theme the email to match the client's site.** The confirmation email is themed by **exactly these two colors** — everything else (layout, the white body, the sans-serif type) is fixed and does **not** vary per client. So don't try to match the client's fonts; match their colors:

1. `headerBg` = the site's **darkest surface** (its header/hero background). This paints the email header bar *and* the heading text on white.
2. `brandColor` = the site's **primary accent** (buttons/links). This paints the wordmark, the accent rule, and the CTA.
3. **Sanity-check contrast before deploying** — this is the step that's easy to skip and produces an ugly email:
   - `brandColor` on `headerBg` (wordmark) → aim ≥ 3:1
   - `headerBg` on white (heading) → needs to be dark enough to read; if the brand's "dark" is a mid-tone (e.g. a warm tan), deepen it into a near-black tint of that hue rather than shipping a washed-out heading.

Worked example — **Lumière Salon** (espresso + champagne): `headerBg: "#1C1410"`, `brandColor: "#C9A96E"`. The email then reads as the salon's own brand, not the Foundry's.

### 5b: Add domain to ALLOWED_ORIGINS

Edit `worker/wrangler.toml` — append the client domain to the `ALLOWED_ORIGINS` var:

```toml
[vars]
ALLOWED_ORIGINS = "https://cincinnatiwebfoundry.com,http://localhost:4321,https://[client-domain.com]"
```

**Important:** This is a plain `[vars]` entry, NOT a secret. Include both `https://[domain]` (no trailing slash). If the client also uses `www`, add `https://www.[domain]` too.

### 5c: Deploy Worker

Only deploy from the canonical template `worker/`, with authorization for the exact shared change. Verify drift and deployment scope using `docs/operations-runbook.md`; adding a client must not regress code or alter another client's routing. KV-only changes do not require a Worker code deployment.

```bash
npx wrangler deploy
```

### 5d: Create Turnstile Widget [MANUAL]

**Each client gets their own Cloudflare Turnstile widget.** Per-client widgets keep clients isolated from each other; the free tier allows 10 hostnames per widget.

> **One hostname per domain — not naked + www.** Cloudflare's docs are explicit: *"adding a
> hostname automatically authorizes all of its subdomains… the widget will work on that exact
> hostname and all of its subdomains."* So `clientdomain.com` already covers
> `www.clientdomain.com`. Adding the `www` variant is redundant. (The reverse is **not** true —
> a child does not cover its parent — so always list the naked domain.) This is also why the
> dashboard's hostname picker won't suggest `www.…`: it autocompletes *zones* on the account,
> and `www` is a record inside one. Adding it as a "custom hostname" works but is unnecessary.

**Present to user:**

1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com/) → **Turnstile**
2. Click **Add widget**
3. Configure:

| Setting | Value |
|---------|-------|
| **Widget name** | `[Business Name]` |
| **Hostname Management** | Add the naked `[client-domain.com]`; add `localhost` only when needed for authorized local tests. The naked domain already covers `www`. |
| **Widget Mode** | Managed |

4. Copy the **Site Key** — you'll need this in the form's `data-sitekey` attribute
5. Have the owner store the matching **Secret Key** securely; never request it in chat. Each widget has its own secret. The maintained `worker/set-turnstile-secret.sh <site_id>` prompts without echoing, preserves the existing KV object, and **also enables enforcement**. Use it only when the matching live site key/hostname is ready for immediate testing; it is not a staging-only setter. Its dummy-token check recognizes a secret but cannot prove widget pairing. If staging is needed earlier, use an authorized secure provider workflow that preserves the current enforcement flag.

> **Important:** Record the site key in the Site Plan and the client's `AGENTS.md`. The secret
> key is sensitive — don't put it in the Site Plan or any doc; it only ever lives in the KV
> entry. **A client's `enforceTurnstile:true` will hard-fail every submission with
> `invalid-input-secret` until their KV entry has the correct `turnstileSecretKey`** — this
> exact bug went undetected across the whole platform for months (see Common Mistakes) because
> `enforceTurnstile` defaults to `false`, so siteverify was never actually exercised.

Record the public site key and confirmation that the secret is securely stored or pending the live activation test. Do not wait for anyone to disclose the secret. Deployment can proceed with live-only checks explicitly pending below.

### 5e: Verify confirmation email branding

Once the client site is deployed and an authorized live test can run (Phase 9 for a net-new domain), test the form and open the confirmation email. Until then, record this check as pending. Confirm:
- It uses the client's brand colors (from KV `brandColor`/`headerBg`) and reads as *their* brand, not the Foundry's.
- **Both text elements are legible** — the terracotta-equivalent wordmark on the dark header, and the heading (which is `headerBg`-colored) on the white body. If the heading looks washed out, `headerBg` is too light — deepen it and re-put the KV entry.
- It does **not** show the "View Our Work" CTA (that's Foundry-only).
- The submission summary dynamically lists all submitted form fields.

### 5f: Form Reliability — configuration before Phase 6; live evidence before handoff

Before Phase 6, verify configuration items 1–3 and record the intended enforcement state. A net-new domain cannot pass a live submission before deployment/DNS: leave the live checks pending in onboarding state, proceed through Phases 6–8, then finish items 4–6 in Phase 9. Do not mark Phase 5 complete or hand off the site until its live evidence is present.

1. Confirm the intended client is `toEmail`, with any approved Foundry failsafe in `notifyEmails`. From the template repo's `worker/` directory, inspect only a safe projection:

   ```bash
   npx wrangler kv key get --binding WEB_FOUNDRY_SITES --remote "[client-slug]" \
     | jq '{toEmail, notifyEmails, businessName, siteUrl, enforceTurnstile, hasTurnstileSecret: ((.turnstileSecretKey // "") | length > 0)}'
   ```
2. Confirm each form includes the hidden `site_id = [client-slug]` field (no `to_email` field — the Worker ignores it by design).
3. Confirm Worker CORS allowlist includes every live origin:
   - `https://[client-domain.com]`
   - `https://www.[client-domain.com]` (if used)
4. Confirm Turnstile mode:
   - Default safe-launch mode: KV `enforceTurnstile: false` for the client site (fail-open; prevents false hard-fail launches)
   - After Turnstile widget+hostname verification is confirmed live: update that site's KV entry to `enforceTurnstile: true`
   - Only use Worker env `ENFORCE_TURNSTILE=true` if you intentionally want strict mode for every site on the shared Worker
5. In an authorized test window, run one real browser submission on the live site after enforcement is enabled, and verify delivery (provider acceptance alone is insufficient):
   - Internal notification arrives at client inbox
   - Submitter confirmation arrives at test sender inbox
   - Each configured `notifyEmails` inbox receives a separate copy
6. If submission fails, tail Worker logs immediately before continuing:

```bash
cd ~/projects/the-web-foundry/db-design-website/worker
npx wrangler tail --format pretty --sampling-rate 0.99
```

---
