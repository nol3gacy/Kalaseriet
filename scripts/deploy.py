#!/usr/bin/env python3
"""Upload the static export in out/ to Loopia over FTP.

Password comes from the FTP_PASSWORD env var or a hidden prompt — never
from an argument, so it stays out of shell history and process listings.
"""
import ftplib
import os
import sys
from getpass import getpass
from pathlib import Path

HOST = os.environ.get("FTP_HOST", "ftpcluster.loopia.se")
USER = sys.argv[1] if len(sys.argv) > 1 else os.environ.get("FTP_USER")
REMOTE_ROOT = os.environ.get("FTP_REMOTE", "/kalaseriet.se/public_html")
LOCAL_ROOT = Path(__file__).resolve().parent.parent / "out"


def ensure_dir(ftp: ftplib.FTP, path: str) -> None:
    try:
        ftp.cwd(path)
    except ftplib.error_perm:
        parent, _, leaf = path.rpartition("/")
        if parent:
            ensure_dir(ftp, parent)
        try:
            ftp.mkd(path)
        except ftplib.error_perm:
            pass  # created concurrently, or already there
        ftp.cwd(path)


def main() -> int:
    if not LOCAL_ROOT.is_dir():
        print(f"No build found at {LOCAL_ROOT} — run `npm run build` first.")
        return 1
    if not USER:
        print("Set FTP_USER (or pass the username as the first argument).")
        return 1

    password = os.environ.get("FTP_PASSWORD") or getpass(f"FTP password for {USER}@{HOST}: ")

    files = sorted(p for p in LOCAL_ROOT.rglob("*") if p.is_file())
    print(f"Uploading {len(files)} files to {HOST}{REMOTE_ROOT} ...")

    ftp = ftplib.FTP(HOST, timeout=60)
    ftp.login(USER, password)
    ensure_dir(ftp, REMOTE_ROOT)

    made: set[str] = set()
    errors = 0
    for i, local in enumerate(files, 1):
        rel = local.relative_to(LOCAL_ROOT)
        remote_dir = f"{REMOTE_ROOT}/{rel.parent.as_posix()}".rstrip("/.")
        if remote_dir not in made:
            ensure_dir(ftp, remote_dir)
            made.add(remote_dir)
        try:
            with local.open("rb") as fh:
                ftp.storbinary(f"STOR {REMOTE_ROOT}/{rel.as_posix()}", fh)
        except ftplib.all_errors as err:
            errors += 1
            print(f"  FAILED {rel}: {err}")
        if i % 100 == 0 or i == len(files):
            print(f"  {i}/{len(files)}")

    ftp.quit()
    print(f"Done — {len(files) - errors} uploaded, {errors} errors.")
    return 1 if errors else 0


if __name__ == "__main__":
    raise SystemExit(main())
