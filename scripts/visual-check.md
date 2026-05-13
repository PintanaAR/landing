# scripts/visual-check.md

Pre-built prompt blocks Claude Code can lean on while running the visual
iteration loop. These are templates, not hard rules — adapt to the section.

---

## Setup (run once per session)

```
The Playwright MCP server provides browser tools. To check it is connected:
1. Call `browser_navigate` to http://localhost:3000/dev/preview
2. Call `browser_snapshot` to capture an accessibility snapshot
3. If both work, you are good to go. If not, ask the user to install Playwright MCP.
```

---

## Loop A — Iterate against a reference

Use when `design-references/<slug>/reference.png` exists and the goal is to
close the gap.

```
1. Read design-references/<slug>/notes.md if it exists, and look at reference.png
   (it's served at /design-references/<slug>/reference.png by the dev server).
2. Read src/components/landing/<Name>.tsx.
3. With Playwright MCP, navigate to http://localhost:3000/dev/compare/<slug>
   and take a full-page screenshot.
4. BEFORE writing any code: list the top 10 visual differences between
   reference and current, ordered by user-perceived impact (hierarchy,
   density, color, type, spacing, motion, polish). Quote pixel rough
   estimates where useful.
5. Wait for the user to confirm which differences to address — unless the
   prompt explicitly says "proceed with all".
6. Apply the fixes in src/components/landing/<Name>.tsx. Never invent new
   tokens — use what is in tailwind.config.ts and src/styles/globals.css.
7. Re-screenshot, self-critique, iterate. Cap at 5 cycles.
8. Save the final screenshot as design-references/<slug>/current-state.png
   (gitignored, fine to overwrite).
9. Hand off with a short summary: what changed, what was left unaddressed
   and why.
```

---

## Loop B — Generate variants

Use when the user is exploring directions, not refining a single goal.

```
1. Plan 2–4 variants that differ in MEANINGFUL ways (layout, hierarchy,
   density, motion). Cosmetic-only variants are noise — kill them.
2. For each, write a one-line "design thesis": what is this variant arguing
   for? Make sure each thesis is contradictable by another.
3. Create files under src/components/landing/<Name>/variants/V<n><Slug>.tsx.
   (If the component is still a single file, move it into a folder first.)
4. Register the variants in src/dev/registry.ts under the matching entry.
5. Screenshot /dev/variants/<slug> with Playwright MCP. Present the URL plus
   each variant's design thesis. Do not advocate for one yet.
6. Wait for the user to pick one (or ask for refinement). Only then merge
   the chosen variant back into the canonical index.tsx and archive the
   rest under _archive/<date>-<old>.tsx.
```

---

## Hard rules during iteration

- **Never** introduce a new color or font without explicit approval.
- **Never** add a library to fix a styling problem.
- **Never** justify a change with "it looks better" alone — name the
  principle (hierarchy / density / rhythm / consistency / contrast).
- Animations: framer-motion only, easing `[0.16, 1, 0.3, 1]`, duration
  0.4–0.7s. No spring overshoots, no bounces, no looping motion.
- Body text minimum contrast: WCAG AA against the surface it sits on.
- Respect `prefers-reduced-motion` (already handled globally — don't bypass).
