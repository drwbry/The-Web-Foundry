# Phase 8 — Sanity-to-Coolify Webhook

## Contents

- Deploy webhook URL
- API authorization
- Sanity webhook configuration
- Live verification

## Preserved Playbook

## Phase 8 — Sanity Webhook [MANUAL]

**Pause and present these instructions to the user.** This webhook triggers a site rebuild whenever content is created, updated, or deleted in Sanity.

### Step 1: Get the Coolify deploy webhook URL

In Coolify → Community Website Showcase → **[client's resource]** → **Configuration** → **Webhooks**.

Copy the **Deploy Webhook URL** — it looks like:
```
https://coolify.thewebfoundry.org/api/v1/deploy?uuid=[uuid]&force=false
```

> **Note:** The URL shown in Coolify does NOT include auth. Authentication is added separately via an HTTP header (Step 2 below). Do not add a `token=` query param — use the header approach.

### Step 2: Get the Coolify API token

In Coolify → click your **profile/avatar** → **API Tokens**.

Use an already approved deploy credential only when its team/application access covers this exact client. Reuse does not require a new token per site, but must not broaden access or copy credentials from MCP configuration. Follow `tool-adapters.md`; no `root`, `write`, or `read:sensitive` permission is needed for this documented deploy path. Keep the token in provider/owner credential storage, never in chat or repo files.

> **Keep this token somewhere safe** — you can't view it again after creation.

### Step 3: Create the Sanity webhook

1. Go to [sanity.io/manage](https://sanity.io/manage) → select **[client's project]** → **API** → **Webhooks**
2. Click **Create webhook**
3. Configure:

| Setting | Value |
|---------|-------|
| **Name** | `[Business Name] — Coolify Deploy` |
| **URL** | *(the deploy webhook URL from Step 1)* |
| **Dataset** | `production` |
| **Trigger on** | Create, Update, Delete |
| **Filter** | `!(_id in path("drafts.**"))` |
| **Projection** | *(leave blank)* |
| **HTTP method** | POST |
| **Secret** | *(leave blank)* |

4. Expand **HTTP headers** and add:

| Name | Value |
|------|-------|
| `Authorization` | `Bearer [coolify-api-token]` |

5. Save the webhook.

The Sanity project scopes the content trigger, but the URL's Coolify UUID selects the deployment target. Verify both identities; a copied webhook can otherwise rebuild the wrong client.

### Verify

1. Go to `https://[client-slug].sanity.studio` and publish a piece of content
2. Check the webhook's **Attempts** log in Sanity — it should show a `200` response (not `401`)
3. Check Coolify — a new build should start within ~30 seconds
4. Once build completes, verify the change appears on the live site

> **If you see `401 Unauthenticated` in the attempts log:** the Authorization header is missing or the token is wrong. Edit the webhook and re-check the header value.

---
