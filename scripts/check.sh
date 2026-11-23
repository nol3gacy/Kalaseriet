#!/usr/bin/env bash
# Release check: run before merging or deploying. Stops at the first failure.
#   ./scripts/check.sh
set -euo pipefail
cd "$(dirname "$0")/.."

echo "1/6 build"
npm run build >/tmp/kalaseriet-build.log 2>&1 || { tail -30 /tmp/kalaseriet-build.log; exit 1; }

echo "2/6 SEO sweep over out/"
python3 scripts/seo_check.py out

echo "3/6 structured data (JSON-LD) on every sitemap page"
node scripts/check-schema.mjs

echo "4/6 order email"
node --import ./scripts/ts-resolve.mjs scripts/order-email.test.mts 2>/dev/null

echo "5/6 Worker typecheck"
(cd worker && npx tsc --noEmit -p .)

echo "6/6 buy flow in a browser (checkout intercepted, nothing reaches Stripe)"
node scripts/buy-flow.test.mjs >/tmp/kalaseriet-buy-flow.log 2>&1 || { cat /tmp/kalaseriet-buy-flow.log; exit 1; }

echo "All checks passed."
