#!/usr/bin/env bash
# Release check: run before merging or deploying. Stops at the first failure.
#   ./scripts/check.sh
set -euo pipefail
cd "$(dirname "$0")/.."

echo "1/4 build"
npm run build >/tmp/kalaseriet-build.log 2>&1 || { tail -30 /tmp/kalaseriet-build.log; exit 1; }

echo "2/4 SEO sweep over out/"
python3 scripts/seo_check.py out

echo "3/4 order email"
node --import ./scripts/ts-resolve.mjs scripts/order-email.test.mts 2>/dev/null

echo "4/4 Worker typecheck"
(cd worker && npx tsc --noEmit -p .)

echo "All checks passed."
