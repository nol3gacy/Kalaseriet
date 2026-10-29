#!/usr/bin/env python3
"""SEO sweep over the static export: run `npm run build && python3 scripts/seo_check.py out`.

Reports duplicate titles/descriptions among indexable pages, titles over 65 and
descriptions outside 70-160 characters, pages without exactly one h1, images
without alt, missing canonicals and internal links or files that don't exist.
Exits 1 when it finds anything.
"""
import re, html, glob, os, sys, collections

OUT = sys.argv[1]
pages = {}
for f in glob.glob(f'{OUT}/**/*.html', recursive=True):
    rel = '/' + os.path.relpath(f, OUT)[:-5]
    rel = '/' if rel == '/index' else rel
    if rel in ('/404', '/_not-found'): continue
    pages[rel] = open(f).read()
def exists(path):
    path = path.split('#')[0].split('?')[0].rstrip('/') or '/'
    if path == '/': return True
    return os.path.exists(f'{OUT}{path}.html') or os.path.exists(f'{OUT}{path}/index.html') or os.path.exists(f'{OUT}{path}')
titles, descs = collections.defaultdict(list), collections.defaultdict(list)
issues = collections.defaultdict(list)
for p, s in sorted(pages.items()):
    t = re.search(r'<title>(.*?)</title>', s); t = html.unescape(t.group(1)) if t else None
    d = re.search(r'<meta name="description" content="([^"]*)"', s); d = html.unescape(d.group(1)) if d else None
    robots = re.search(r'<meta name="robots" content="([^"]*)"', s)
    noindex = robots and 'noindex' in robots.group(1)
    if noindex: continue
    if not t: issues[p].append('no title')
    else:
        titles[t].append(p)
        if len(t) > 65: issues[p].append(f'title {len(t)} chars')
    if not d: issues[p].append('no description')
    else:
        descs[d].append(p)
        if len(d) > 160: issues[p].append(f'description {len(d)} chars')
        if len(d) < 70: issues[p].append(f'description short {len(d)}')
    body = re.sub(r'<script.*?</script>', '', s, flags=re.S)
    h1 = len(re.findall(r'<h1[\s>]', body))
    if h1 != 1: issues[p].append(f'{h1} h1')
    for img in re.findall(r'<img\b[^>]*>', body):
        if 'alt=' not in img: issues[p].append('img without alt: ' + img[:90])
    if not re.search(r'<link rel="canonical"', s): issues[p].append('no canonical')
    for href in set(re.findall(r'href="(/[^"]*)"', body)):
        if href.startswith('/_next') or href.startswith('/wf/'): 
            if not exists(href): issues[p].append('missing asset ' + href)
            continue
        if not exists(href): issues[p].append('broken link ' + href)
    for src in set(re.findall(r'src="(/[^"]*)"', body)):
        if not exists(src): issues[p].append('missing src ' + src)
found = 0
for t, ps in titles.items():
    if len(ps) > 1: print('DUP TITLE', repr(t), ps); found += 1
for d, ps in descs.items():
    if len(ps) > 1: print('DUP DESC', repr(d[:60]), ps); found += 1
for p, iss in issues.items():
    for i in sorted(set(iss)): print(p, '|', i); found += 1
print(len(pages), 'pages checked,', found, 'findings')
sys.exit(1 if found else 0)
