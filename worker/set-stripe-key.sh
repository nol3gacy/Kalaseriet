#!/usr/bin/env bash
# Sets STRIPE_SECRET_KEY on the Worker — with validation.
#
# Why this exists: `wrangler secret put` uses a hidden prompt. If the paste
# silently fails (common over Parsec/RDP when clipboard sync is off) you get
# an empty secret and the Worker throws "Neither apiKey nor config.authenticator
# provided" at runtime. This reads the key visibly, checks it looks right, and
# confirms live mode afterwards.

set -euo pipefail
cd "$(dirname "$0")"

: "${CLOUDFLARE_API_TOKEN:?Set CLOUDFLARE_API_TOKEN first}"

echo "Paste your Stripe SECRET key (sk_live_... or sk_test_...) and press Enter."
echo "It will be visible so you can confirm the paste worked."
read -r KEY

KEY="$(printf '%s' "$KEY" | tr -d '[:space:]')"

if [ -z "$KEY" ]; then
  echo "✗ Nothing received — the paste didn't come through."
  echo "  Parsec: enable clipboard sharing, or type the key manually."
  exit 1
fi
case "$KEY" in
  sk_live_*) MODE="LIVE" ;;
  sk_test_*) MODE="TEST" ;;
  rk_*) echo "✗ That's a restricted key (rk_). Use the secret key (sk_live_)."; exit 1 ;;
  pk_*) echo "✗ That's a publishable key (pk_). Use the secret key (sk_live_)."; exit 1 ;;
  *)    echo "✗ Doesn't look like a Stripe secret key (should start with sk_)."; exit 1 ;;
esac
if [ "${#KEY}" -lt 40 ]; then
  echo "✗ Too short (${#KEY} chars) — looks truncated."; exit 1
fi

echo "✓ Looks like a $MODE secret key (${#KEY} chars, ends ...${KEY: -4})"
printf '%s' "$KEY" | npx wrangler secret put STRIPE_SECRET_KEY
echo "✓ Saved"

echo
echo "Verifying..."
sleep 3
resp=$(curl -s -X POST https://kalaseriet-api.kalaseriet.workers.dev/checkout \
  -H "Content-Type: application/json" -H "Origin: https://kalaseriet.se" \
  -d '{"items":[{"productId":"p26","productName":"Sportkalaset","price":99,"quantity":1}]}')

case "$resp" in
  *cs_live_*) echo "✓✓ LIVE MODE — real payments will be charged" ;;
  *cs_test_*) echo "✓ Working, but TEST mode (no real money). Re-run with sk_live_ when ready." ;;
  *) echo "✗ Still failing:"; printf '%s\n' "${resp:0:300}" ;;
esac
