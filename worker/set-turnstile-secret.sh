#!/usr/bin/env bash
# Set a site's Turnstile secret in KV and enable enforcement.
#
#   ./set-turnstile-secret.sh <site_id>
#
# Prompts for the secret without echoing it, and sanity-checks it against
# Cloudflare's siteverify before writing.
#
# IMPORTANT -- what that check can and cannot prove. Verifying with a dummy token
# only shows the secret is a well-formed, recognised secret. It CANNOT show the
# secret belongs to the widget on the site, because no real token is involved.
# A secret copied from the wrong widget passes this check and then fails every
# real submission with invalid-input-secret.
#
# So "invalid-input-secret" at submit time does NOT mean the key is malformed. It
# means the secret does not pair with the SITE KEY that issued the token. Check
# the data-sitekey on the live page and copy the secret from THAT widget:
#   curl -s https://<site> | grep -o 'data-sitekey="[^"]*"'
# (This cost a long debugging session on terrys-lawncare on 2026-09-18.)
#
# Nothing prints the secret. Safe to run with someone watching.

set -euo pipefail

SITE_ID="${1:-}"
[ -z "$SITE_ID" ] && { echo "usage: $0 <site_id>"; exit 1; }

cd "$(dirname "$0")"
set -a; . ./.env; set +a
NS=d79b82d55c094670be496e4306b7fa8a

read -rsp "Turnstile SECRET key for '$SITE_ID' (input hidden): " SECRET; echo
[ -z "$SECRET" ] && { echo "No secret entered. Aborted."; exit 1; }

# --- validate before writing -------------------------------------------------
# A dummy token against a VALID secret returns invalid-input-response.
# An INVALID secret returns invalid-input-secret. That distinguishes them
# without needing a real token from a real form submission.
echo "Validating secret against Cloudflare siteverify..."
# Verified behaviour (checked 2026-09-18 against the live endpoint):
#   real production secret + dummy token -> error-codes: [invalid-input-response]
#   bad secret                           -> error-codes: [invalid-input-secret]
#   Cloudflare's always-passes TEST key  -> success: true, no error codes
VERDICT=$(curl -s -X POST https://challenges.cloudflare.com/turnstile/v0/siteverify \
  -d "secret=$SECRET" -d "response=dummy-token-for-validation" \
  | python3 -c '
import json, sys
r = json.load(sys.stdin)
codes = r.get("error-codes", [])
if "invalid-input-secret" in codes:      print("BAD")
elif "invalid-input-response" in codes:  print("GOOD")
elif r.get("success") is True:           print("TESTKEY")
else:                                    print("UNKNOWN:" + ",".join(codes))
')

case "$VERDICT" in
  BAD)
    echo "REJECTED: Cloudflare says this secret is not valid. Nothing was written."
    echo "Get it from: Cloudflare Dashboard -> Turnstile -> [widget] -> Edit -> Secret Key"
    exit 1 ;;
  GOOD)
    echo "Secret is recognised by Cloudflare."
    echo "NOTE: this does NOT prove it belongs to the widget on the site. If real"
    echo "submissions then fail with invalid-input-secret, the secret is from the"
    echo "wrong widget -- compare the live page's data-sitekey and re-copy." ;;
  TESTKEY)
    echo "WARNING: that is one of Cloudflare's always-passes TEST keys, not a real"
    echo "widget secret. It would accept ANY token and provide no bot protection."
    echo "Nothing was written."
    exit 1 ;;
  *)
    echo "Unexpected siteverify result: [$VERDICT]. Nothing was written."
    exit 1 ;;
esac

# --- read, modify, write, read back ------------------------------------------
TMP=$(mktemp); trap 'rm -f "$TMP"' EXIT

npx wrangler kv key get "$SITE_ID" --namespace-id $NS --remote 2>/dev/null \
  | SECRET="$SECRET" python3 -c '
import json, os, sys
d = json.load(sys.stdin)
d["turnstileSecretKey"] = os.environ["SECRET"]
d["enforceTurnstile"] = True
json.dump(d, sys.stdout)
' > "$TMP"

npx wrangler kv key put "$SITE_ID" --path "$TMP" --namespace-id $NS --remote >/dev/null 2>&1

echo
echo "=== $SITE_ID after write (secret masked) ==="
npx wrangler kv key get "$SITE_ID" --namespace-id $NS --remote 2>/dev/null | python3 -c '
import json, sys
d = json.load(sys.stdin)
for k in sorted(d):
    print(f"  {k:20} {'"'"'<present, masked>'"'"' if k == "turnstileSecretKey" else d[k]}")
'
echo
echo "Now submit a real form on the live site. That is the ONLY check that proves"
echo "the secret pairs with the widget -- siteverify above cannot tell you that."
echo "If it fails with invalid-input-secret, the key is from the wrong widget."
