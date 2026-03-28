# Contact Forms — Cloudflare Worker + Resend Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add working contact forms to the hub page (modal) and all three showcase pages, using a self-owned Cloudflare Worker + Resend email relay instead of a third-party form service.

**Architecture:** A Cloudflare Worker deployed at `form-relay.cincinnatiwebfoundry.workers.dev` (or a custom subdomain later) receives all form POSTs, validates a shared secret, and dispatches via the Resend API to the Foundry's inbox. Every future client site will POST to the same Worker endpoint — routing is controlled by the Worker, not by per-site keys. The Astro site itself has no backend; all forms submit via `fetch()`.

**Tech Stack:** Cloudflare Workers (free — 100k req/day), Resend (free — 3k emails/month), Wrangler CLI for Worker deployment, existing Astro + hub.css + main.js for site forms.

---

## Prerequisites — Accounts & Secrets (do this first, ~20 min)

Before touching any code, collect these values. Keep them in a scratch file — you'll need them during Tasks 1 and 3.

1. **Cloudflare account** — sign up at cloudflare.com if you don't have one. Free plan is sufficient.
2. **Resend account** — sign up at resend.com. Verify the domain `cincinnatiwebfoundry.com` (or whatever domain you send from) in the Resend dashboard under Domains → Add Domain. Follow the DNS instructions. Generate an API key under API Keys → Create API Key. Copy it — it won't be shown again. Call it `RESEND_API_KEY`.
3. **Worker shared secret** — generate a random string (e.g. `openssl rand -hex 24` in terminal). This prevents random POSTs to your Worker. Call it `WORKER_SECRET`.
4. **To email** — the Foundry inbox address (e.g. `foundrysolutionsllc@gmail.com`).

---

## Files to Create / Modify

| File | Action | Purpose |
|------|--------|---------|
| `worker/index.js` | **Create** | Cloudflare Worker — receives POSTs, sends via Resend |
| `worker/wrangler.toml` | **Create** | Wrangler config for deployment |
| `src/styles/hub.css` | Modify | Add modal + form CSS at bottom |
| `src/pages/index.astro` | Modify | Swap nav/hero/CTA triggers → buttons; add modal HTML |
| `src/scripts/main.js` | Modify | Add modal open/close/submit JS inside DOMContentLoaded |
| `src/pages/showcase/bakery.astro` | Modify | Add contact section after hours, nav link, form JS |
| `src/pages/showcase/plumber.astro` | Modify | Add contact section after emergency, nav link, form JS |
| `src/pages/showcase/salon.astro` | Modify | Replace book-section buttons with form, nav link, form JS |

---

## Task 1: Create the Cloudflare Worker

**Files:**
- Create: `worker/index.js`
- Create: `worker/wrangler.toml`

- [ ] **Step 1: Create the worker directory**

```bash
mkdir -p worker
```

- [ ] **Step 2: Create `worker/wrangler.toml`**

Replace `YOUR_ACCOUNT_ID` with your Cloudflare account ID (found in the Cloudflare dashboard sidebar → Account ID).

```toml
name = "web-foundry-form-relay"
main = "index.js"
compatibility_date = "2024-01-01"
account_id = "YOUR_ACCOUNT_ID"
```

- [ ] **Step 3: Create `worker/index.js`**

```javascript
export default {
  async fetch(request, env) {
    // CORS preflight
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        headers: corsHeaders(),
      });
    }

    if (request.method !== 'POST') {
      return json({ success: false, message: 'Method not allowed' }, 405);
    }

    // Parse body
    let body;
    try {
      body = await request.json();
    } catch {
      return json({ success: false, message: 'Invalid JSON' }, 400);
    }

    // Validate shared secret
    if (body.secret !== env.WORKER_SECRET) {
      return json({ success: false, message: 'Unauthorized' }, 401);
    }

    // Build email
    const subject = body.subject || 'New Form Submission — The Web Foundry';
    const lines = Object.entries(body)
      .filter(([k]) => !['secret', 'botcheck'].includes(k))
      .map(([k, v]) => `<tr><td style="padding:4px 12px 4px 0;font-weight:600;vertical-align:top">${k}</td><td style="padding:4px 0">${v}</td></tr>`);
    const html = `<table style="font-family:sans-serif;font-size:14px;color:#333">${lines.join('')}</table>`;

    // Send via Resend
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Web Foundry Forms <forms@cincinnatiwebfoundry.com>',
        to: [env.TO_EMAIL],
        subject,
        html,
        reply_to: body.email || undefined,
      }),
    });

    if (!res.ok) {
      const err = await res.text();
      console.error('Resend error:', err);
      return json({ success: false, message: 'Email delivery failed' }, 500);
    }

    return json({ success: true });
  },
};

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json', ...corsHeaders() },
  });
}

function corsHeaders() {
  return {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };
}
```

- [ ] **Step 4: Install Wrangler globally (if not already installed)**

```bash
npm install -g wrangler
```

Expected: `wrangler` version output, or already installed message.

- [ ] **Step 5: Authenticate Wrangler with Cloudflare**

```bash
cd worker && wrangler login
```

Expected: Browser opens to Cloudflare OAuth. Approve. Terminal shows "Successfully logged in."

- [ ] **Step 6: Set Worker secrets via Wrangler (never committed to git)**

Run each command and paste the value when prompted:

```bash
wrangler secret put RESEND_API_KEY
wrangler secret put WORKER_SECRET
wrangler secret put TO_EMAIL
```

- [ ] **Step 7: Deploy the Worker**

```bash
wrangler deploy
```

Expected output ends with something like:
```
Deployed web-foundry-form-relay (X.XX sec)
  https://web-foundry-form-relay.YOUR_SUBDOMAIN.workers.dev
```

Copy that URL — you'll use it in every form's `fetch()` call. Call it `WORKER_URL`.

- [ ] **Step 8: Smoke-test the Worker with curl**

Replace `WORKER_URL` and `WORKER_SECRET_VALUE` with actual values:

```bash
curl -X POST WORKER_URL \
  -H "Content-Type: application/json" \
  -d '{"secret":"WORKER_SECRET_VALUE","subject":"Test — curl","name":"Test User","email":"test@example.com","message":"Hello from curl"}'
```

Expected: `{"success":true}` and an email arrives in the Foundry inbox within seconds.

- [ ] **Step 9: Commit the Worker files**

```bash
cd .. && git add worker/index.js worker/wrangler.toml
git commit -m "feat: add Cloudflare Worker form relay with Resend"
```

---

## Task 2: Hub Modal CSS (`src/styles/hub.css`)

**Files:**
- Modify: `src/styles/hub.css` (append after line 1001)

- [ ] **Step 1: Append modal CSS to end of `src/styles/hub.css`**

Add immediately after the last line of the file:

```css
/* ============================================================
   MODAL
   ============================================================ */

/* Overlay */
.modal-overlay {
  position: fixed; inset: 0; z-index: 9999;
  background: rgba(10,10,10,0.85);
  backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px);
  display: flex; align-items: center; justify-content: center;
  padding: 1.5rem;
  opacity: 0; pointer-events: none;
  transition: opacity 0.35s var(--ease-out-quart);
}
.modal-overlay.is-open { opacity: 1; pointer-events: auto; }
.modal-overlay[hidden] { display: none; }

/* Card */
.modal-card {
  background: var(--black-card);
  border: 1px solid var(--border-gold);
  border-radius: 10px;
  padding: 3rem;
  width: 100%; max-width: 620px; max-height: 90vh;
  overflow-y: auto; position: relative;
  transform: scale(0.94) translateY(16px);
  transition: transform 0.4s var(--ease-out-expo);
}
.modal-overlay.is-open .modal-card { transform: scale(1) translateY(0); }

/* Close button */
.modal-close {
  position: absolute; top: 1.2rem; right: 1.2rem;
  width: 32px; height: 32px;
  display: flex; align-items: center; justify-content: center;
  color: var(--cream-muted); font-size: 1rem; border-radius: 4px;
  transition: color 0.2s, background 0.2s;
}
.modal-close:hover { color: var(--cream); background: var(--border); }

/* Title */
.modal-title {
  font-family: var(--ff-display);
  font-size: clamp(1.8rem, 4vw, 2.6rem);
  font-weight: 700; line-height: 1.15; color: var(--cream);
  margin-bottom: 2rem;
}
.modal-title em { font-style: italic; color: var(--gold); }

/* Form layout */
.form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
.form-group { display: flex; flex-direction: column; gap: 0.4rem; margin-bottom: 1.2rem; }
.form-group label, .form-fieldset legend {
  font-size: 0.78rem; font-weight: 600;
  letter-spacing: 0.06em; text-transform: uppercase; color: var(--cream-muted);
}
.form-group input, .form-group textarea {
  background: var(--black-soft);
  border: 1px solid var(--border);
  border-radius: 4px; color: var(--cream);
  font-family: var(--ff-body); font-size: 0.95rem;
  padding: 0.75rem 1rem; width: 100%;
  transition: border-color 0.2s;
}
.form-group input:focus, .form-group textarea:focus { outline: none; border-color: var(--gold); }
.form-group input::placeholder, .form-group textarea::placeholder { color: var(--cream-muted); }
textarea { resize: vertical; min-height: 100px; }

/* Fieldsets */
.form-fieldset { border: none; margin-bottom: 1.2rem; }
.form-fieldset legend { margin-bottom: 0.6rem; display: block; }
.form-radios { display: flex; gap: 1.5rem; }
.radio-label { display: flex; align-items: center; gap: 0.45rem; font-size: 0.9rem; color: var(--cream-dim); cursor: pointer; }
.radio-label input[type="radio"] { accent-color: var(--gold); width: 16px; height: 16px; cursor: pointer; }

/* Error / submit */
.form-error {
  color: #FF6B6B; font-size: 0.82rem; margin-bottom: 1rem;
  padding: 0.6rem 1rem;
  background: rgba(255,107,107,0.08); border: 1px solid rgba(255,107,107,0.25); border-radius: 4px;
}
.form-submit { width: 100%; justify-content: center; margin-top: 0.5rem; }
.form-submit:disabled { opacity: 0.6; cursor: not-allowed; transform: none; }

/* Success state */
.modal-success {
  text-align: center; padding: 3rem 1rem;
  display: flex; flex-direction: column; align-items: center; gap: 1rem;
}
.modal-success__icon {
  width: 56px; height: 56px; border-radius: 50%;
  background: rgba(212,168,83,0.15); border: 1px solid var(--border-gold);
  display: flex; align-items: center; justify-content: center;
  font-size: 1.5rem; color: var(--gold);
}
.modal-success__title { font-family: var(--ff-display); font-size: 1.8rem; color: var(--cream); }
.modal-success__sub { font-size: 0.95rem; color: var(--cream-dim); line-height: 1.7; max-width: 380px; }

/* nav__cta as button — reset button defaults, keep existing .nav__cta visual styles */
button.nav__cta {
  background: none;
  font-family: inherit;
  cursor: pointer;
}

@media (max-width: 640px) {
  .modal-card { padding: 2rem 1.5rem; }
  .form-row { grid-template-columns: 1fr; }
  .form-radios { flex-direction: column; gap: 0.75rem; }
}
```

- [ ] **Step 2: Verify build is clean**

```bash
npm run build
```

Expected: Build completes with no errors.

- [ ] **Step 3: Commit**

```bash
git add src/styles/hub.css
git commit -m "feat: add modal and form CSS to hub.css"
```

---

## Task 3: Hub Modal HTML (`src/pages/index.astro`)

**Files:**
- Modify: `src/pages/index.astro`

Note: `WORKER_URL` = the `workers.dev` URL from Task 1 Step 7. `WORKER_SECRET_VALUE` = the secret you set. These go in the JS (Task 4), not here — the HTML has no secrets.

- [ ] **Step 1: Replace the nav "Get in Touch" link (line 24) with a button**

Find this exact text:
```html
        <li><a href="#contact" class="nav__cta">Get in Touch</a></li>
```

Replace with:
```html
        <li><button class="nav__cta js-open-modal">Get in Touch</button></li>
```

- [ ] **Step 2: Replace the hero "Let's Talk" link (line 61) with a button**

Find:
```html
        <a href="#contact" class="btn btn--ghost">Let's Talk</a>
```

Replace with:
```html
        <button class="btn btn--ghost js-open-modal">Let's Talk</button>
```

- [ ] **Step 3: Replace the CTA section mailto link (line 260) with a button**

Find:
```html
        <a href="mailto:hello@dbdesign.dev" class="btn btn--cta">
          hello@dbdesign.dev
          <span class="btn-arrow">→</span>
        </a>
```

Replace with:
```html
        <button class="btn btn--cta js-open-modal">
          Let's get started
          <span class="btn-arrow">→</span>
        </button>
```

- [ ] **Step 4: Add modal HTML before `</BaseLayout>`**

Find the closing tag at the very end of the file:
```
</BaseLayout>
```

Replace with:
```html
  <!-- ── Contact Modal ── -->
  <div class="modal-overlay" id="contact-modal" role="dialog" aria-modal="true" aria-labelledby="modal-title" hidden>
    <div class="modal-card">
      <button class="modal-close" id="modal-close" aria-label="Close">✕</button>

      <div class="modal-body" id="modal-body">
        <span class="section-tag">Let's Talk</span>
        <h2 class="modal-title" id="modal-title">Tell us about<br/><em>your business</em></h2>

        <form id="contact-form" novalidate>
          <input type="checkbox" name="botcheck" style="display:none">

          <div class="form-row">
            <div class="form-group">
              <label for="f-name">Your Name *</label>
              <input type="text" id="f-name" name="name" required autocomplete="name" placeholder="Maria Chen">
            </div>
            <div class="form-group">
              <label for="f-email">Email Address *</label>
              <input type="email" id="f-email" name="email" required autocomplete="email" placeholder="maria@example.com">
            </div>
          </div>

          <div class="form-group">
            <label for="f-phone">Phone (optional)</label>
            <input type="tel" id="f-phone" name="phone" autocomplete="tel" placeholder="(513) 555-0100">
          </div>

          <fieldset class="form-fieldset">
            <legend>Who is this for?</legend>
            <div class="form-radios">
              <label class="radio-label">
                <input type="radio" name="who_for" value="My business" checked>
                <span>My business</span>
              </label>
              <label class="radio-label">
                <input type="radio" name="who_for" value="Someone else's business">
                <span>Someone else's business</span>
              </label>
            </div>
          </fieldset>

          <fieldset class="form-fieldset">
            <legend>Do you have an existing website?</legend>
            <div class="form-radios">
              <label class="radio-label">
                <input type="radio" name="has_website" value="yes" id="has-website-yes">
                <span>Yes</span>
              </label>
              <label class="radio-label">
                <input type="radio" name="has_website" value="no" id="has-website-no" checked>
                <span>No</span>
              </label>
            </div>
          </fieldset>

          <div class="form-group" id="url-field" hidden>
            <label for="f-url">Website URL</label>
            <input type="url" id="f-url" name="website_url" placeholder="https://yourbusiness.com">
          </div>

          <div class="form-group">
            <label for="f-message">Anything else you'd like us to know?</label>
            <textarea id="f-message" name="message" rows="4" placeholder="Tell us about your business, goals, timeline..."></textarea>
          </div>

          <div class="form-error" id="form-error" hidden></div>

          <button type="submit" class="btn btn--primary form-submit" id="form-submit-btn">
            Send Message <span class="btn-arrow">→</span>
          </button>
        </form>
      </div>

      <div class="modal-success" id="modal-success" hidden>
        <div class="modal-success__icon">✓</div>
        <h3 class="modal-success__title">Message received!</h3>
        <p class="modal-success__sub">We'll be in touch within 24 hours. Check your email for a confirmation.</p>
        <button class="btn btn--ghost" id="modal-success-close">Close</button>
      </div>
    </div>
  </div>

</BaseLayout>
```

- [ ] **Step 5: Verify build**

```bash
npm run build
```

Expected: No errors.

- [ ] **Step 6: Commit**

```bash
git add src/pages/index.astro
git commit -m "feat: add hub modal HTML and swap mailto/anchor triggers to buttons"
```

---

## Task 4: Hub Modal JS (`src/scripts/main.js`)

**Files:**
- Modify: `src/scripts/main.js`

Replace `WORKER_URL` with the actual workers.dev URL from Task 1 Step 7.
Replace `WORKER_SECRET_VALUE` with the actual secret value.

- [ ] **Step 1: Add modal JS inside the DOMContentLoaded listener**

Find the closing of the listener at the bottom of the file:
```javascript
});
```
(the very last `});` at line 79)

Insert the following block immediately **before** that closing `});`:

```javascript
  // ── Contact Modal ────────────────────────────────────────────
  const modal = document.getElementById('contact-modal');
  const modalCard = modal?.querySelector('.modal-card');
  const modalBody = document.getElementById('modal-body');
  const modalSuccess = document.getElementById('modal-success');

  function openModal() {
    modal.removeAttribute('hidden');
    requestAnimationFrame(() => requestAnimationFrame(() => modal.classList.add('is-open')));
    document.body.style.overflow = 'hidden';
    document.getElementById('modal-close')?.focus();
  }

  function closeModal() {
    modal.classList.remove('is-open');
    document.body.style.overflow = '';
    modal.addEventListener('transitionend', () => {
      modal.setAttribute('hidden', '');
      if (modalBody) modalBody.hidden = false;
      if (modalSuccess) modalSuccess.hidden = true;
    }, { once: true });
  }

  document.querySelectorAll('.js-open-modal').forEach(btn =>
    btn.addEventListener('click', (e) => { e.preventDefault(); openModal(); })
  );
  document.getElementById('modal-close')?.addEventListener('click', closeModal);
  document.getElementById('modal-success-close')?.addEventListener('click', closeModal);
  modal?.addEventListener('click', (e) => { if (!modalCard?.contains(e.target)) closeModal(); });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal?.classList.contains('is-open')) closeModal();
  });

  // Conditional URL field
  const urlField = document.getElementById('url-field');
  const urlInput = document.getElementById('f-url');
  document.querySelectorAll('input[name="has_website"]').forEach(radio => {
    radio.addEventListener('change', () => {
      const show = radio.value === 'yes' && radio.checked;
      urlField.hidden = !show;
      if (!show) urlInput.value = '';
    });
  });

  // Form submission → Cloudflare Worker
  const form = document.getElementById('contact-form');
  const submitBtn = document.getElementById('form-submit-btn');
  const formError = document.getElementById('form-error');

  form?.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (!form.checkValidity()) { form.reportValidity(); return; }
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending…';
    formError.hidden = true;

    const payload = Object.fromEntries(new FormData(form));
    payload.secret = 'WORKER_SECRET_VALUE';
    payload.subject = 'New Website Inquiry — The Web Foundry';

    try {
      const res = await fetch('WORKER_URL', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(payload),
      });
      const result = await res.json();
      if (result.success) {
        modalBody.hidden = true;
        modalSuccess.hidden = false;
        form.reset();
      } else {
        throw new Error(result.message || 'Something went wrong.');
      }
    } catch (err) {
      formError.textContent = err.message || 'Could not send message. Please email hello@cincinnatiwebfoundry.com directly.';
      formError.hidden = false;
      submitBtn.disabled = false;
      submitBtn.innerHTML = 'Send Message <span class="btn-arrow">→</span>';
    }
  });
```

- [ ] **Step 2: Verify build**

```bash
npm run build
```

Expected: No errors.

- [ ] **Step 3: Smoke-test in browser**

```bash
npm run dev
```

- Open `http://localhost:4321`
- Click "Get in Touch" in nav → modal opens with fade+scale animation
- Click "Let's Talk" in hero → same modal opens
- Click the CTA section button → same modal opens
- Select "Yes" for existing website → URL field appears; "No" → field hides and clears
- Submit empty form → native browser validation fires
- Submit valid form → success state shown, form resets
- Press ESC → modal closes; body scroll restored
- Click backdrop → modal closes

- [ ] **Step 4: Commit**

```bash
git add src/scripts/main.js
git commit -m "feat: wire hub modal open/close/submit to Cloudflare Worker"
```

---

## Task 5: Bakery Contact Section (`src/pages/showcase/bakery.astro`)

**Files:**
- Modify: `src/pages/showcase/bakery.astro`

Replace `WORKER_URL` and `WORKER_SECRET_VALUE` in the JS block below.

- [ ] **Step 1: Add contact section CSS to the `<style is:global>` block**

Find the closing `</style>` tag after the last `@media` block (around line 425). Insert before it:

```css
/* ── Contact ── */
.contact-section { padding: 7rem 2rem; background: var(--cream); }
.contact-inner { max-width: 640px; margin: 0 auto; }
.contact-title {
  font-family: var(--ff-display); font-style: italic;
  font-size: clamp(1.8rem, 4vw, 2.8rem); font-weight: 700;
  color: var(--cocoa); margin-bottom: 0.6rem;
}
.contact-sub { font-size: 0.97rem; color: var(--text-mid); line-height: 1.75; margin-bottom: 2.5rem; }
.contact-form .form-group { display: flex; flex-direction: column; gap: 0.4rem; margin-bottom: 1.2rem; }
.contact-form label { font-size: 0.75rem; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; color: var(--text-mid); }
.contact-form input, .contact-form textarea {
  background: var(--cream-card); border: 1.5px solid var(--border); border-radius: 8px;
  color: var(--text); font-family: var(--ff-body); font-size: 0.95rem;
  padding: 0.8rem 1rem; width: 100%; transition: border-color 0.2s;
}
.contact-form input:focus, .contact-form textarea:focus { outline: none; border-color: var(--terra); }
.contact-form input::placeholder, .contact-form textarea::placeholder { color: var(--text-light); }
textarea { resize: vertical; min-height: 110px; }
.contact-submit { margin-top: 0.5rem; }
.contact-submit:disabled { opacity: 0.6; cursor: not-allowed; transform: none; }
.bakery-form-error { color: #c0392b; font-size: 0.82rem; margin-bottom: 1rem; padding: 0.6rem 1rem; background: rgba(192,57,43,0.06); border: 1px solid rgba(192,57,43,0.2); border-radius: 6px; }
.bakery-form-success { color: var(--sage); font-size: 0.9rem; font-weight: 600; margin-bottom: 1rem; padding: 0.75rem 1rem; background: var(--sage-light); border: 1px solid rgba(122,158,130,0.3); border-radius: 6px; }
```

- [ ] **Step 2: Add a Contact nav link**

Find the nav `<ul class="nav__links">` block (around line 431). The last item before the closing `</ul>` is a PDF download link. Add a new `<li>` before the closing `</ul>`:

```html
              <li><a href="#contact">Contact</a></li>
```

- [ ] **Step 3: Add the contact section HTML**

Find the closing `</section>` of the hours section (line 615), followed by the blank line and `<script is:inline>` at line 617. Insert the following between line 615 and 617:

```html
  <!-- ── CONTACT ── -->
  <section class="contact-section" id="contact">
    <div class="contact-inner">
      <div class="contact-header reveal">
        <span class="section-tag">Say Hello</span>
        <h2 class="contact-title">Start the conversation</h2>
        <p class="contact-sub">Have a question, a catering inquiry, or just want to say hi? We'd love to hear from you.</p>
      </div>
      <form id="bakery-contact-form" class="contact-form reveal reveal-delay-1" novalidate>
        <input type="checkbox" name="botcheck" style="display:none">
        <div class="form-group">
          <label for="b-name">Your Name *</label>
          <input type="text" id="b-name" name="name" required placeholder="Your name">
        </div>
        <div class="form-group">
          <label for="b-email">Email Address *</label>
          <input type="email" id="b-email" name="email" required placeholder="your@email.com">
        </div>
        <div class="form-group">
          <label for="b-message">Message</label>
          <textarea id="b-message" name="message" rows="5" placeholder="How can we help?"></textarea>
        </div>
        <div class="bakery-form-error" id="bakery-form-error" hidden></div>
        <div class="bakery-form-success" id="bakery-form-success" hidden>Thank you! We'll be in touch soon.</div>
        <button type="submit" class="btn-primary contact-submit" id="bakery-submit">Send Message</button>
      </form>
    </div>
  </section>

```

- [ ] **Step 4: Add bakery form JS to the existing `<script is:inline>` block**

Find the closing `})();` of the menu tabs IIFE (around line 679), followed by `</script>`. Add immediately after `})();` and before `</script>`:

```javascript
    // ── Contact Form ──
    (function() {
      const form = document.getElementById('bakery-contact-form');
      const btn = document.getElementById('bakery-submit');
      const errorEl = document.getElementById('bakery-form-error');
      const successEl = document.getElementById('bakery-form-success');
      form?.addEventListener('submit', async (e) => {
        e.preventDefault();
        if (!form.checkValidity()) { form.reportValidity(); return; }
        btn.disabled = true; btn.textContent = 'Sending…';
        errorEl.hidden = true; successEl.hidden = true;
        const payload = Object.fromEntries(new FormData(form));
        payload.secret = 'WORKER_SECRET_VALUE';
        payload.subject = 'New Inquiry — Sweet Crumb Bakery';
        try {
          const res = await fetch('WORKER_URL', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
            body: JSON.stringify(payload),
          });
          const data = await res.json();
          if (data.success) { form.reset(); successEl.hidden = false; btn.textContent = 'Sent!'; }
          else throw new Error(data.message || 'Something went wrong.');
        } catch (err) {
          errorEl.textContent = err.message; errorEl.hidden = false;
          btn.disabled = false; btn.textContent = 'Send Message';
        }
      });
    })();
```

- [ ] **Step 5: Verify build and commit**

```bash
npm run build && git add src/pages/showcase/bakery.astro && git commit -m "feat: add contact section to bakery showcase"
```

---

## Task 6: Plumber Contact Section (`src/pages/showcase/plumber.astro`)

**Files:**
- Modify: `src/pages/showcase/plumber.astro`

Replace `WORKER_URL` and `WORKER_SECRET_VALUE` below.

- [ ] **Step 1: Add contact CSS to the `<style is:global>` block**

Find the closing `</style>` (around line 153). Insert before it:

```css
/* ── Contact ── */
.contact-section { padding: 7rem 2rem; background: var(--navy); }
.contact-inner { max-width: 640px; margin: 0 auto; }
.contact-form .form-group { display: flex; flex-direction: column; gap: 0.4rem; margin-bottom: 1.2rem; }
.contact-form label { font-size: 0.72rem; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; color: rgba(255,255,255,0.5); }
.contact-form input, .contact-form textarea {
  background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.12); border-radius: 4px;
  color: var(--white); font-family: var(--ff-body); font-size: 0.95rem;
  padding: 0.85rem 1rem; width: 100%; transition: border-color 0.2s;
}
.contact-form input:focus, .contact-form textarea:focus { outline: none; border-color: var(--orange); }
.contact-form input::placeholder, .contact-form textarea::placeholder { color: rgba(255,255,255,0.25); }
textarea { resize: vertical; min-height: 110px; }
.contact-submit { width: 100%; justify-content: center; margin-top: 0.5rem; }
.contact-submit:disabled { opacity: 0.6; cursor: not-allowed; transform: none; }
.plumber-form-error { color: #FF6B6B; font-size: 0.82rem; margin-bottom: 1rem; padding: 0.6rem 1rem; background: rgba(255,107,107,0.08); border: 1px solid rgba(255,107,107,0.2); border-radius: 4px; }
.plumber-form-success { color: var(--orange); font-size: 0.9rem; font-weight: 700; letter-spacing: 0.04em; margin-bottom: 1rem; padding: 0.75rem 1rem; background: rgba(255,107,43,0.08); border: 1px solid rgba(255,107,43,0.25); border-radius: 4px; }
```

- [ ] **Step 2: Add Contact nav link**

Find the nav `<ul>` (around line 161). Add before the closing `</ul>`:

```html
          <li><a href="#contact-form">Contact</a></li>
```

- [ ] **Step 3: Add contact section HTML**

The emergency section closes at line 246 (`</section>`) and `</ShowcaseLayout>` is line 247. Insert between them:

```html

  <!-- ── CONTACT ── -->
  <section class="contact-section" id="contact-form">
    <div class="container">
      <div class="section-header reveal">
        <span class="section-tag">Get In Touch</span>
        <h2 class="section-title">GET A QUOTE</h2>
        <p class="section-sub">Not an emergency? Send a message and we'll get back to you within one business day.</p>
      </div>
      <div class="contact-inner reveal reveal-delay-1">
        <form id="plumber-contact-form" class="contact-form" novalidate>
          <input type="checkbox" name="botcheck" style="display:none">
          <div class="form-group">
            <label for="p-name">Your Name *</label>
            <input type="text" id="p-name" name="name" required placeholder="Your name">
          </div>
          <div class="form-group">
            <label for="p-email">Email Address *</label>
            <input type="email" id="p-email" name="email" required placeholder="your@email.com">
          </div>
          <div class="form-group">
            <label for="p-message">Describe the Issue</label>
            <textarea id="p-message" name="message" rows="5" placeholder="Tell us what's going on..."></textarea>
          </div>
          <div class="plumber-form-error" id="plumber-form-error" hidden></div>
          <div class="plumber-form-success" id="plumber-form-success" hidden>Got it — we'll be in touch soon!</div>
          <button type="submit" class="btn-call contact-submit" id="plumber-submit">Send Message ➜</button>
        </form>
      </div>
    </div>
  </section>
```

- [ ] **Step 4: Add plumber script block before `</ShowcaseLayout>`**

Plumber has no existing script block. Find `</ShowcaseLayout>` at the end of the file. Insert immediately before it:

```html
<script is:inline>
(function() {
  const form = document.getElementById('plumber-contact-form');
  const btn = document.getElementById('plumber-submit');
  const errorEl = document.getElementById('plumber-form-error');
  const successEl = document.getElementById('plumber-form-success');
  form?.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (!form.checkValidity()) { form.reportValidity(); return; }
    btn.disabled = true; btn.textContent = 'Sending…';
    errorEl.hidden = true; successEl.hidden = true;
    const payload = Object.fromEntries(new FormData(form));
    payload.secret = 'WORKER_SECRET_VALUE';
    payload.subject = 'New Inquiry — Peak Flow Plumbing';
    try {
      const res = await fetch('WORKER_URL', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (data.success) { form.reset(); successEl.hidden = false; btn.textContent = 'Sent!'; }
      else throw new Error(data.message || 'Something went wrong.');
    } catch (err) {
      errorEl.textContent = err.message; errorEl.hidden = false;
      btn.disabled = false; btn.textContent = 'Send Message ➜';
    }
  });
})();
</script>
```

- [ ] **Step 5: Verify build and commit**

```bash
npm run build && git add src/pages/showcase/plumber.astro && git commit -m "feat: add contact section to plumber showcase"
```

---

## Task 7: Salon Book Section → Contact Form (`src/pages/showcase/salon.astro`)

**Files:**
- Modify: `src/pages/showcase/salon.astro`

Replace `WORKER_URL` and `WORKER_SECRET_VALUE` below.

- [ ] **Step 1: Add contact CSS to the `<style is:global>` block**

Find the closing `</style>` (around line 139). Insert before it:

```css
/* ── Contact Form ── */
.contact-form { text-align: left; margin-top: 2.5rem; max-width: 480px; margin-left: auto; margin-right: auto; }
.contact-form .form-group { display: flex; flex-direction: column; gap: 0.4rem; margin-bottom: 1.2rem; }
.contact-form label { font-size: 0.72rem; font-weight: 600; letter-spacing: 0.16em; text-transform: uppercase; color: var(--blush-muted); }
.contact-form input, .contact-form textarea {
  background: transparent; border: 1px solid var(--border-gold);
  color: var(--blush); font-family: var(--ff-body); font-size: 0.95rem; font-weight: 300;
  padding: 0.8rem 1rem; width: 100%; transition: border-color 0.25s;
}
.contact-form input:focus, .contact-form textarea:focus { outline: none; border-color: var(--champagne); }
.contact-form input::placeholder, .contact-form textarea::placeholder { color: var(--blush-muted); }
textarea { resize: vertical; min-height: 110px; }
.contact-submit { width: 100%; justify-content: center; margin-top: 0.5rem; letter-spacing: 0.12em; }
.contact-submit:disabled { opacity: 0.6; cursor: not-allowed; transform: none; }
.salon-form-error { color: #FF8A8A; font-size: 0.82rem; margin-bottom: 1rem; padding: 0.6rem 1rem; background: rgba(255,138,138,0.06); border: 1px solid rgba(255,138,138,0.2); }
.salon-form-success { color: var(--champagne); font-size: 0.88rem; font-weight: 600; letter-spacing: 0.08em; margin-bottom: 1rem; padding: 0.75rem 1rem; background: var(--champagne-dim); border: 1px solid var(--border-gold); text-align: center; }
```

- [ ] **Step 2: Add Contact nav link**

Find the nav `<ul>` (around line 145). Add before the closing `</ul>`:

```html
          <li><a href="#book">Contact</a></li>
```

- [ ] **Step 3: Replace the book section button div and address paragraph with the form**

The book section currently reads (lines 263–267):
```html
      <div style="display:flex;gap:1rem;justify-content:center;flex-wrap:wrap">
        <a href="#" class="btn-primary">Book Online</a>
        <a href="tel:+15559876543" class="btn-ghost">📞 Call Studio</a>
      </div>
      <p style="margin-top:2rem;font-size:.8rem;color:var(--blush-muted)">456 Willow Lane · Open Tue–Sat, 9am–7pm</p>
```

Replace those 5 lines with:

```html
      <form id="salon-contact-form" class="contact-form" novalidate>
        <input type="checkbox" name="botcheck" style="display:none">
        <div class="form-group">
          <label for="s-name">Your Name *</label>
          <input type="text" id="s-name" name="name" required placeholder="Your name">
        </div>
        <div class="form-group">
          <label for="s-email">Email Address *</label>
          <input type="email" id="s-email" name="email" required placeholder="your@email.com">
        </div>
        <div class="form-group">
          <label for="s-message">Your Inquiry</label>
          <textarea id="s-message" name="message" rows="5" placeholder="Tell us what you're looking for..."></textarea>
        </div>
        <div class="salon-form-error" id="salon-form-error" hidden></div>
        <div class="salon-form-success" id="salon-form-success" hidden>Thank you — we'll be in touch shortly.</div>
        <button type="submit" class="btn-primary contact-submit" id="salon-submit">Send Inquiry</button>
      </form>
      <p style="margin-top:2rem;font-size:.8rem;color:var(--blush-muted);text-align:center">456 Willow Lane · Open Tue–Sat, 9am–7pm</p>
```

- [ ] **Step 4: Add salon form JS to the existing `<script is:inline>` block**

The existing script block (lines 271–276) contains only a scroll listener. Find the closing `</script>` and insert before it:

```javascript
    // ── Contact Form ──
    (function() {
      const form = document.getElementById('salon-contact-form');
      const btn = document.getElementById('salon-submit');
      const errorEl = document.getElementById('salon-form-error');
      const successEl = document.getElementById('salon-form-success');
      form?.addEventListener('submit', async (e) => {
        e.preventDefault();
        if (!form.checkValidity()) { form.reportValidity(); return; }
        btn.disabled = true; btn.textContent = 'Sending…';
        errorEl.hidden = true; successEl.hidden = true;
        const payload = Object.fromEntries(new FormData(form));
        payload.secret = 'WORKER_SECRET_VALUE';
        payload.subject = 'New Inquiry — Lumière Salon & Spa';
        try {
          const res = await fetch('WORKER_URL', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
            body: JSON.stringify(payload),
          });
          const data = await res.json();
          if (data.success) { form.reset(); successEl.hidden = false; btn.textContent = 'Sent'; }
          else throw new Error(data.message || 'Something went wrong.');
        } catch (err) {
          errorEl.textContent = err.message; errorEl.hidden = false;
          btn.disabled = false; btn.textContent = 'Send Inquiry';
        }
      });
    })();
```

- [ ] **Step 5: Verify build and commit**

```bash
npm run build && git add src/pages/showcase/salon.astro && git commit -m "feat: replace salon book buttons with contact form"
```

---

## Task 8: Final Verification

- [ ] **Step 1: Run full dev server and manually test every form**

```bash
npm run dev
```

Test matrix:
- Hub nav "Get in Touch" → modal opens
- Hub hero "Let's Talk" → modal opens
- Hub CTA section button → modal opens
- Hub modal: "Yes" for existing website → URL field appears; "No" → hides and clears
- Hub modal: submit empty → native validation fires
- Hub modal: submit valid → Worker receives, Resend sends, inbox receives email, success state shown
- Hub modal: ESC closes, backdrop click closes, scroll lock releases
- Bakery: scroll to contact section, submit valid → success message shown, email arrives
- Plumber: scroll to contact section, submit valid → success message shown, email arrives
- Salon: form visible in book section, submit valid → success message shown, email arrives
- Mobile (375px): modal card scrolls, form-row collapses to 1 column

- [ ] **Step 2: Run production build**

```bash
npm run build
```

Expected: Build completes with no errors.

- [ ] **Step 3: Verify Worker logs in Cloudflare dashboard**

Go to Cloudflare dashboard → Workers & Pages → `web-foundry-form-relay` → Logs. Confirm each form submission appears with no errors.

- [ ] **Step 4: Final commit if any cleanup needed**

```bash
git add -A && git commit -m "chore: final cleanup for contact forms implementation"
```

---

## Security Notes

- `WORKER_SECRET` is set as a Cloudflare secret (never in git). The value embedded in the Astro JS is client-visible — this is intentional. It's a rate-limiting/attribution token, not an auth token. It prevents random POSTs but is not a cryptographic secret.
- `RESEND_API_KEY` is a Cloudflare secret only — never in any file.
- The `botcheck` hidden checkbox field filters bots via the Worker's field exclusion (it's just omitted from the email body).
- The `Access-Control-Allow-Origin: *` CORS header on the Worker is intentional — forms POST from any of your sites. Tighten to specific domains if desired.
