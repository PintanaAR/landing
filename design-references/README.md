# design-references

Source of truth for the **visual spec** of each landing section. The files in
this folder are read by `/dev/compare/:component` and by Claude Code when it
runs the visual iteration workflow described in `CLAUDE.md`.

## Folder structure

```
design-references/
├── README.md               ← this file
├── _inspiration/           ← vibes from other landings; NOT pixel-perfect targets
│   ├── README.md
│   └── *.png               ← gitignored, share via Drive/Notion
├── <component-slug>/       ← one folder per registered component
│   ├── reference.png       ← the goal; what we want this section to look like
│   ├── current-state.png   ← auto-generated snapshot of the live build (gitignored)
│   └── notes.md            ← constraints, decisions, anti-patterns specific to this section
```

The `<component-slug>` must match the `slug` in `src/dev/registry.ts`. The
available slugs are:

`nav`, `hero`, `app-window`, `stats`, `modules`, `pos-feature`,
`whatsapp-feature`, `faq`, `contact`, `footer`.

## How to add a reference

1. Create the component folder if it doesn't exist:
   `mkdir design-references/<slug>`
2. Drop the goal screenshot as `reference.png` inside.
3. Optionally add `notes.md` with bullet points: what to preserve, what to
   change, what to avoid, copy constraints.
4. Open `http://localhost:3000/dev/compare/<slug>` to verify it loads
   side-by-side with the live implementation.

Keep references **realistic** — a Figma export, a competitor screenshot we
genuinely want to match, a hand-mockup, or a previous iteration we liked. Do
not stash entire-page screenshots of other companies' landings as
"references" for individual sections — those belong in `_inspiration/`.

## `_inspiration/` vs `<slug>/`

- **`<slug>/reference.png`** is a **target**. Claude Code will try to close
  the gap between the live component and this image, ordered by impact.
- **`_inspiration/`** is **vibe**. Pages, sections, or details from other
  products that informed how we think about Pintana. Claude Code only reads
  these when you reference them explicitly ("look at the feel of
  linear-hero.png"). They are not pixel-perfect goals and **are gitignored**.

## File hygiene

- `reference.png` → **commit it**. It is the visual spec.
- `current-state.png` → **never commit** (already in `.gitignore`). Claude
  Code regenerates this on each iteration; it is noise in a diff.
- `notes.md` → **commit it**. It explains the *why* behind the reference.
- Anything in `_inspiration/` → **never commit**.

## Image format

- Prefer PNG, max 2400px wide, optimized via `pngquant` or similar.
- If a single PNG grows past ~1MB, run it through compression before
  committing. The repo is private today; do not assume that's permanent.
