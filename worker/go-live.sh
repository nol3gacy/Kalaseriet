#!/usr/bin/env bash
# Go-live for the Kalaseriet Worker.
#
# Works without `wrangler login` (which needs a browser OAuth round-trip to
# localhost — that's what breaks over Parsec). Uses a Cloudflare API token
# instead, so everything happens in this terminal.
#
#   1. Create a token: dash.cloudflare.com -> My Profile -> API Tokens
#      -> Create Token -> "Edit Cloudflare Workers" template
#   2. Run:  ./go-live.sh
#
# Secrets are typed at a local prompt and piped straight to Cloudflare —
# they never appear in your shell history or in any file.

set -euo pipefail
cd "$(dirname "$0")"

bold() { printf '\033[1m%s\033[0m\n' "$1"; }
ok()   { printf '\033[32m✓\033[0m %s\n' "$1"; }
warn() { printf '\033[33m!\033[0m %s\n' "$1"; }

if [ -z "${CLOUDFLARE_API_TOKEN:-}" ]; then
  bold "Cloudflare API token"
  echo "  dash.cloudflare.com -> My Profile -> API Tokens -> Edit Cloudflare Workers"
  read -rsp "  Paste token: " CLOUDFLARE_API_TOKEN; echo
  export CLOUDFLARE_API_TOKEN
fi

echo
bold "1/4  Deploying Worker (includes the corrected download-link map)"
npx wrangler deploy
ok "Worker deployed"

echo
bold "2/4  Stripe secret key"
echo "  Stripe -> Developers -> API keys -> Secret key (starts with sk_live_)"
echo "  Input is hidden."
npx wrangler secret put STRIPE_SECRET_KEY
ok "STRIPE_SECRET_KEY set"

echo
bold "3/4  Stripe webhook signing secret"
echo "  Stripe -> Developers -> Webhooks (make sure you're in LIVE mode, not Test)"
echo "  Endpoint URL: https://kalaseriet-api.kalaseriet.workers.dev/webhooks/stripe"
echo "  Event:        checkout.session.completed"
echo "  Then copy its signing secret (starts with whsec_). Input is hidden."
npx wrangler secret put STRIPE_WEBHOOK_SECRET
ok "STRIPE_WEBHOOK_SECRET set"

echo
bold "4/4  Verifying live mode"
resp=$(curl -s -X POST https://kalaseriet-api.kalaseriet.workers.dev/checkout \
  -H "Content-Type: application/json" -H "Origin: https://kalaseriet.se" \
  -d '{"items":[{"productId":"p26","productName":"Sportkalaset","price":99,"quantity":1}]}')

if grep -q 'cs_live_' <<<"$resp"; then
  ok "LIVE mode confirmed — real payments will be charged"
elif grep -q 'cs_test_' <<<"$resp"; then
  warn "Still TEST mode. The key you entered was sk_test_, not sk_live_. Re-run this script."
else
  warn "Unexpected response:"; echo "$resp" | head -c 400; echo
fi

echo
bold "Done. Tell Claude and it will run a real end-to-end purchase to verify."
