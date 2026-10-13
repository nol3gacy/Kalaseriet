#!/bin/bash
# Upload out/ to Loopia over FTP using curl.
#
# The password is written to a 0600 curl config file rather than passed as an
# argument, so it never appears in `ps` output or shell history.
set -euo pipefail

HOST="${FTP_HOST:-ftpcluster.loopia.se}"
REMOTE="${FTP_REMOTE:-/kalaseriet.se/public_html}"
USER_NAME="${1:-${FTP_USER:-}}"
ROOT="$(cd "$(dirname "$0")/.." && pwd)/out"

[ -d "$ROOT" ] || { echo "No build at $ROOT — run 'npm run build' first."; exit 1; }
[ -n "$USER_NAME" ] || { echo "Usage: $0 <ftp-username>"; exit 1; }

if [ -n "${FTP_PASSWORD:-}" ]; then
  PASS="$FTP_PASSWORD"
else
  read -r -s -p "FTP password for $USER_NAME@$HOST: " PASS
  echo
fi

CONF="$(mktemp)"
chmod 600 "$CONF"
trap 'rm -f "$CONF"' EXIT

{
  printf 'user = "%s:%s"\n' "$USER_NAME" "$PASS"
  printf 'ftp-create-dirs\n'
  printf 'silent\n'
  printf 'show-error\n'
  printf 'fail\n'
} > "$CONF"

count=0
while IFS= read -r -d '' file; do
  rel="${file#"$ROOT"/}"
  printf 'url = "ftp://%s%s/%s"\n' "$HOST" "$REMOTE" "$rel" >> "$CONF"
  printf 'upload-file = "%s"\n' "$file" >> "$CONF"
  count=$((count + 1))
done < <(find "$ROOT" -type f -print0)

echo "Uploading $count files to $HOST$REMOTE ..."
if curl -K "$CONF"; then
  echo "Done — $count files uploaded, 0 errors."
else
  echo "Upload finished with errors (curl exit $?)."
  exit 1
fi
