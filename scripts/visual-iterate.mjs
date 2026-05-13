#!/usr/bin/env node
// scripts/visual-iterate.mjs <component-slug>
//
// Prints every URL and filepath Claude Code (or a human) needs to start
// iterating on a single landing component:
//
//   - the /dev/preview anchor for in-context viewing
//   - the /dev/compare URL for side-by-side vs reference
//   - the /dev/variants URL
//   - the path to the source component
//   - the path to the reference image (and whether it exists)
//   - the path to the notes file (and whether it exists)
//
// Intentionally read-only and dependency-free. Does NOT start the dev server
// — assumes you've already run `npm run dev` (port 3000). It probes the
// server with a HEAD request and prints a hint if it's not responding.
//
// Usage:
//   node scripts/visual-iterate.mjs hero
//   npm run visual hero            (after adding the npm script — optional)

import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..')

const DEV_URL = process.env.PINTANA_DEV_URL || 'http://localhost:3000'

const slug = process.argv[2]

if (!slug) {
  console.error('Usage: node scripts/visual-iterate.mjs <component-slug>')
  console.error('')
  console.error('Available slugs (see src/dev/registry.ts for the source of truth):')
  console.error('  nav, hero, app-window, stats, modules, pos-feature,')
  console.error('  whatsapp-feature, faq, contact, footer')
  process.exit(1)
}

// Best-effort slug -> PascalCase mapping. This stays in sync with the
// registry by convention; if a component file moves or is renamed, the
// printed path is wrong but the URLs still work.
const SLUG_TO_NAME = {
  nav: 'Nav',
  hero: 'Hero',
  'app-window': 'AppWindow',
  stats: 'Stats',
  modules: 'Modules',
  'pos-feature': 'POSFeature',
  'whatsapp-feature': 'WhatsAppFeature',
  faq: 'FAQ',
  contact: 'Contact',
  footer: 'Footer',
}

const name = SLUG_TO_NAME[slug] || slug

const refDir = path.join(ROOT, 'design-references', slug)
const refImg = path.join(refDir, 'reference.png')
const notes = path.join(refDir, 'notes.md')
const src = path.join(ROOT, 'src', 'components', 'landing', `${name}.tsx`)

const exists = (p) => {
  try {
    fs.statSync(p)
    return true
  } catch {
    return false
  }
}

const bold = (s) => `\x1b[1m${s}\x1b[0m`
const dim = (s) => `\x1b[2m${s}\x1b[0m`
const green = (s) => `\x1b[32m${s}\x1b[0m`
const yellow = (s) => `\x1b[33m${s}\x1b[0m`

const tag = (ok) => (ok ? green('✓ exists') : yellow('✗ missing'))

console.log('')
console.log(bold(`Visual iteration — ${name} (${slug})`))
console.log('')
console.log(bold('URLs') + dim('  (open these in a browser or via Playwright MCP)'))
console.log(`  preview   ${DEV_URL}/dev/preview#section-${slug}`)
console.log(`  compare   ${DEV_URL}/dev/compare/${slug}`)
console.log(`  variants  ${DEV_URL}/dev/variants/${slug}`)
console.log('')
console.log(bold('Files'))
console.log(`  source    ${tag(exists(src))}  ${path.relative(ROOT, src)}`)
console.log(`  reference ${tag(exists(refImg))}  ${path.relative(ROOT, refImg)}`)
console.log(`  notes     ${tag(exists(notes))}  ${path.relative(ROOT, notes)}`)
console.log('')

if (!exists(refImg)) {
  console.log(yellow('Tip:'), 'no reference yet. Drop a PNG at the path above,')
  console.log('     then reload /dev/compare to see it side-by-side with the live build.')
  console.log('')
}

// Soft check that the dev server is responding. Avoid fetch on Node < 18 by
// using a tiny http.get probe.
import http from 'node:http'
import https from 'node:https'

const probeUrl = `${DEV_URL}/dev/preview`
const probe = probeUrl.startsWith('https') ? https : http
const req = probe.get(probeUrl, { timeout: 800 }, (res) => {
  if (res.statusCode && res.statusCode < 500) {
    console.log(dim(`Dev server: responding at ${DEV_URL} (HTTP ${res.statusCode})`))
  } else {
    console.log(yellow(`Dev server: returned HTTP ${res.statusCode} at ${probeUrl}`))
  }
  res.resume()
})
req.on('timeout', () => {
  req.destroy()
  console.log(yellow(`Dev server: no response at ${DEV_URL} — run \`npm run dev\` first.`))
})
req.on('error', () => {
  console.log(yellow(`Dev server: no response at ${DEV_URL} — run \`npm run dev\` first.`))
})
