// Builds one print-ready PDF per package from the product ZIPs, in reading order:
// instructions, checklist, schedule, invitation, decorations, games, recipes, diploma.
//   node scripts/build-print-pdfs.mjs [zipDir=backup/loopia-dl] [outDir=backup/print-pdf]
// Upload to the R2 bucket next to the ZIPs (same base name, .pdf):
//   for f in backup/print-pdf/*.pdf; do npx wrangler r2 object put "kalaseriet-downloads/$(basename "$f")" --file "$f" --content-type application/pdf --remote; done
import { execFileSync } from 'node:child_process'
import { mkdtempSync, mkdirSync, readdirSync, readFileSync, writeFileSync, rmSync, statSync } from 'node:fs'
import { join, basename } from 'node:path'
import { tmpdir } from 'node:os'
import { PDFDocument } from 'pdf-lib'

const [zipDir = 'backup/loopia-dl', outDir = 'backup/print-pdf'] = process.argv.slice(2)

// Names in the ZIPs carry odd encodings (Ko?rshema), so match on ASCII letters only.
const ORDER = [/^instruktioner/, /^checklista/, /^k.*hema/, /^inbjudan/, /^dekorationer/, /^kalaslek/, /^recept/, /^diplom/]
export function rank(name) {
  const key = name.normalize('NFD').toLowerCase().replace(/[^a-z0-9.-]/g, '')
  const group = ORDER.findIndex(re => re.test(key))
  const num = Number(key.match(/-(\d+)\.pdf$/)?.[1] ?? 0)
  return [group === -1 ? ORDER.length : group, num]
}
const byRank = (a, b) => { const [ga, na] = rank(a), [gb, nb] = rank(b); return ga - gb || na - nb }

// Self-check of the ordering.
const sample = ['Diplom.pdf', 'Recept-2.pdf', 'Kalaslek-10.pdf', 'Kalaslek-2.pdf', 'Inbjudan.pdf', 'Körshema.pdf', 'Instruktioner.pdf']
const sorted = [...sample].sort(byRank).join(',')
if (sorted !== 'Instruktioner.pdf,Körshema.pdf,Inbjudan.pdf,Kalaslek-2.pdf,Kalaslek-10.pdf,Recept-2.pdf,Diplom.pdf') throw new Error('order self-check failed: ' + sorted)

function pdfsIn(dir) {
  return readdirSync(dir, { recursive: true })
    .map(String)
    .filter(p => p.toLowerCase().endsWith('.pdf') && !p.includes('__MACOSX') && !basename(p).startsWith('._'))
}

mkdirSync(outDir, { recursive: true })
const zips = readdirSync(zipDir).filter(f => f.endsWith('.zip'))
if (!zips.length) throw new Error(`no ZIPs in ${zipDir}`)
for (const zip of zips) {
  const tmp = mkdtempSync(join(tmpdir(), 'kalas-'))
  try {
    execFileSync('unzip', ['-qq', '-o', join(zipDir, zip), '-d', tmp])
    const files = pdfsIn(tmp).sort((a, b) => byRank(basename(a), basename(b)))
    const unknown = files.filter(f => rank(basename(f))[0] === ORDER.length)
    if (unknown.length) console.warn(`${zip}: unknown files placed last: ${unknown.map(f => basename(f)).join(', ')}`)
    const out = await PDFDocument.create()
    for (const f of files) {
      const src = await PDFDocument.load(readFileSync(join(tmp, f)), { ignoreEncryption: true })
      for (const page of await out.copyPages(src, src.getPageIndices())) out.addPage(page)
    }
    const target = join(outDir, zip.replace(/\.zip$/, '.pdf'))
    writeFileSync(target, await out.save())
    console.log(`${basename(target)}: ${files.length} files, ${out.getPageCount()} pages, ${(statSync(target).size / 1e6).toFixed(1)} MB`)
  } finally {
    rmSync(tmp, { recursive: true, force: true })
  }
}
