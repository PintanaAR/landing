# Pintana Landing — Design System

A curated summary of the design tokens, type scale, motion language, and
anti-patterns in use today. Authoritative sources, in order:

1. `src/styles/globals.css` — CSS custom properties (the *real* values).
2. `tailwind.config.ts` — Tailwind aliases that map class names to those
   variables.
3. The components in `src/components/landing/` — applied examples.

This file is a *map*, not the *territory*. When something here disagrees with
`globals.css`, **trust `globals.css`** and update this file.

---

## Theme

The marketing page is **light-first**. `--bg: #FAFAFA`. We do NOT support a
user-toggleable dark mode for the landing.

The `.theme-dark` class **is** defined in `globals.css`, but it is **scoped**
to product mockup containers (`AppWindow`, `POSFeature`, `WhatsAppFeature`)
so the in-page ERP preview can render dark inside an otherwise light page.
Never apply `.theme-dark` at the page root.

---

## Color tokens

All colors are CSS variables. Tailwind aliases them as classes (`bg-bg`,
`text-text-2`, `border-border`, etc.). Never hardcode hex in JSX.

### Surfaces

| Token         | Value                       | Tailwind            | Use                                |
|---------------|-----------------------------|---------------------|------------------------------------|
| `--bg`        | `#FAFAFA`                   | `bg-bg`             | Page background                    |
| `--surface-1` | `#EEEEF2`                   | `bg-surface-1`      | Subtle section bg                  |
| `--surface-2` | `#E5E5EB`                   | `bg-surface-2`      | Cards, secondary buttons           |
| `--surface-3` | `#D6D6DD`                   | `bg-surface-3`      | Pressed / hover state of surface-2 |
| `--border`    | `rgba(15,17,23,0.08)`       | `border` / `border-DEFAULT` | Default border                |
| `--border-2`  | `rgba(15,17,23,0.14)`       | `border-2`          | Emphasis border (hover, focus)     |

### Brand & accents

| Token              | Value                          | Tailwind          | Use                                |
|--------------------|--------------------------------|-------------------|------------------------------------|
| `--purple`         | `#8B5CF6`                      | `bg-purple` etc.  | Primary CTA, brand accent          |
| `--purple-light`   | `#C4B5FD`                      | `text-purple-light` | Gradient text pair-color        |
| `--purple-glow`    | `rgba(139,92,246,0.15)`        | `bg-purple-glow`  | Radial halos, top edge glows       |
| `--purple-soft`    | `rgba(139,92,246,0.06)`        | `bg-purple-soft`  | Card backgrounds, badge fills      |
| `--indigo`         | `#6366F1`                      | `bg-indigo`       | Secondary accent (sparingly)       |
| `--indigo-glow`    | `rgba(99,102,241,0.12)`        | `bg-indigo-glow`  | Background depth                   |

### Paint palette (solid pigments — never gradients on text)

| Token         | Value      | Use                                              |
|---------------|------------|--------------------------------------------------|
| `--sage`      | `#355E3B`  | Deep forest green — paint-can fills              |
| `--navy`      | `#1F3A5F`  | Deep blue — paint-can fills                      |
| `--ink`       | `#0F1117`  | "Wet paint" black — drips, splatters, brush      |

Each has `-light`, `-glow`, `-soft` variants for hover, halo, and tint use.

**Rule**: paint is **solid**. Don't gradient-fade these into each other or
into the background. They live as flat fills on cards or solid color
numbers in `<Stats />`.

### Text

| Token       | Value      | Tailwind        | Use                            |
|-------------|------------|-----------------|--------------------------------|
| `--text`    | `#0F1117`  | `text-text`     | Body and headings              |
| `--text-2`  | `#4A4E5C`  | `text-text-2`   | Subdued copy, labels           |
| `--text-3`  | `#8B8FA8`  | `text-text-3`   | Captions, helper text, hints   |

### Feedback

| Token             | Value      | Use                       |
|-------------------|------------|---------------------------|
| `--success`       | `#059669`  | Form success, "active" dots |
| `--warning`       | `#D97706`  | Inline warning copy        |
| `--warning-light` | `#F59E0B`  | Warning halo / accent      |
| `--danger`        | `#DC2626`  | Error state, destructive   |

---

## Typography

Two fonts, loaded via `<link>` in `index.html` (not `next/font`).

```css
--font-display: 'Bricolage Grotesque', 'Plus Jakarta Sans', system-ui, sans-serif;
--font-body:    'Plus Jakarta Sans', system-ui, ..., sans-serif;
```

Tailwind: `font-display`, `font-body`. Headings (`h1`–`h4`) default to
display via `globals.css`. Body inherits body font from `<html>`.

### Scale

Use these targets; cap at the upper bound — don't go larger.

| Element       | Size                    | Weight | Tracking      |
|---------------|-------------------------|--------|---------------|
| Hero `h1`     | `clamp(44px, 6vw, 68px)` | 800    | `-0.035em`    |
| Section `h2`  | `clamp(32px, 4vw, 48px)` | 800    | `-0.03em`     |
| Card `h3`     | `18–20px`                | 700    | `-0.02em`     |
| Body          | `15–17px`                | 400    | line-height 1.7 |
| Overline      | `11px`                   | 600    | `0.1em` uppercase |

### Gradient text

Use sparingly — **one purple-gradient word per section, maximum**. Reserve
for the key noun or verb in `h1`/`h2`.

```tsx
<span className="bg-gradient-to-r from-purple to-purple-light bg-clip-text text-transparent">
  merecía
</span>
```

---

## Spacing & layout

- Container max-width: `1200px`. Use the `.container-page` utility from
  `globals.css` (`@apply mx-auto w-full max-w-[1200px] px-6 md:px-8`).
- Inter-section vertical rhythm: 80–120px on desktop, 56–72px on mobile.
- Card inner padding: `p-6` (24px) to `p-8` (32px) depending on density.
- Grid gaps: `gap-4` for tight clusters, `gap-6` for cards, `gap-8` for
  bento panels.

---

## Border-radius scale

**Cap at two scales across the site.**

- `rounded-[10px]` — buttons, inputs, small chips.
- `rounded-[20px]` — cards, mockups, large containers.

Anything in between is drift. Push back if a request asks for `rounded-2xl`
without justification.

---

## Elevation & depth

No drop shadows in the body of the page. Depth comes from:

- **Top edge glow on cards** — see `.card-glow::before` in `globals.css`.
- **Mouse-following inner glow** — see `.card-mouse-glow::after` in
  `globals.css`. Triggered by setting `--cx` / `--cy` on the element.
- **Heavy mockup shadow** — only on the AppWindow and POS preview, where
  the product is being treated as a physical artifact:
  ```css
  box-shadow: 0 0 0 1px rgba(255,255,255,0.04),
              0 60px 120px rgba(0,0,0,0.8),
              0 0 80px rgba(139,92,246,0.04);
  ```

---

## Motion language

`framer-motion` is the only motion library. Use it deliberately.

### Easing

`[0.16, 1, 0.3, 1]` — the *only* easing for content motion. It is a strong
out-cubic that decelerates into rest. Do not introduce springs, bounces, or
linear motion for content.

### Duration

- **0.4s** — micro-transitions (hover, focus, fade-in).
- **0.5–0.6s** — section reveals, staggered children.
- **0.7s** — the slow, deliberate hero entrance and shine sweeps.

### Patterns

- **Fade-up reveal**: `opacity 0 → 1`, `y: 20 → 0`, 0.5s. Wrap section
  content with `whileInView` + `viewport={{ once: true, margin: '-80px' }}`.
- **Stagger**: `staggerChildren: 0.06` for grids and lists.
- **Hover lift**: `-translate-y-[1px]` on buttons and cards. No more.

### Accessibility

`globals.css` already collapses animations to ~0ms for users with
`prefers-reduced-motion: reduce`. **Never bypass this with `!important` or
inline overrides.**

---

## Buttons

Two recipes, both as utility classes in `globals.css`:

- `.btn-primary` — purple fill, white text, hover lift, shine sweep on
  hover. WHITE text intentionally (purple bg would fall below WCAG AA with
  dark text).
- `.btn-secondary` — surface-2 fill, neutral border, subtle lift on hover.

**One primary purple button per viewport.** Multiple secondaries are fine.

---

## Iconography

- Library: `lucide-react`.
- Size: `16–20px` inline in UI, `24px` in feature cards.
- Style: outline (no fills). Stroke width 1.5 (default) unless explicitly
  asked for a heavier weight.
- Use the same icon for the same concept across the site (e.g., the same
  icon for "inventory" everywhere).

---

## Copy / voice

Audience: dueños de pinturerías, 40–65, not tech-savvy, skeptical, busy.

- **Spanish (Argentine)**, "su negocio" register (not "tu"), grounded and
  concrete.
- Mention real local entities: ARCA (formerly AFIP), MercadoPago, pesos.
- No paragraph over 2 lines. No heading over 8 words.
- Show, don't sell. Specific verbs beat adjectives.

### Banned words

`solución`, `plataforma robusta`, `ecosistema`, `sinergia`, `potente`,
`intuitivo`.

### Preferred words

`control`, `en tiempo real`, `sin papeles`, `desde el mostrador`,
`su pintería`, concrete feature names.

---

## Anti-patterns

- Hardcoded hex in JSX or class strings.
- New fonts. Two only.
- New border-radius scale beyond `rounded-[10px]` / `rounded-[20px]`.
- Drop shadows on cards (use top-edge glow instead).
- Stock photography or generic avatars.
- Spring/bounce/loop animations.
- Bypassing `prefers-reduced-motion`.
- Emojis in production UI.
- Cookie banners, exit-intent popups, newsletter modals.
- More than one `<h1>` on the page.
- Gradients on the paint palette colors (sage, navy, ink) — those are solid.
- More than one purple-gradient text per section.
