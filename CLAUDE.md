# Pintana Landing Page — Agent Guide

You are building and maintaining the **Pintana marketing landing page** — a Next.js SPA that converts SME paint store owners (dueños de pinturerías) into demo leads. This is NOT the ERP application UI. This is the public-facing marketing site.

**Primary goal**: Make business owners stop scrolling and say *"esto es lo que necesito"*, then fill out the contact form.

---

## Tech Stack

- **Framework**: Next.js 14+ App Router, TypeScript strict mode
- **Styling**: Tailwind CSS v3 + CSS custom properties for design tokens
- **Animations**: Framer Motion for scroll-triggered reveals and hero entrance
- **Forms**: React Hook Form + Zod + server action (or API route `/api/contact`)
- **Fonts**: `Bricolage Grotesque` (headings, display) + `DM Sans` (body) — load via `next/font/google`
- **Icons**: `lucide-react` (outline, 16–20px in UI, 24px in feature cards)
- **Email**: Resend (or fallback to `nodemailer`) for form submissions
- **Analytics**: Plausible or Vercel Analytics (no Google Analytics — privacy-first)
- **Deployment**: Vercel

---

## Design System

### Philosophy: Premium Dark SaaS
This landing page must feel like Linear, Vercel, or Loom — premium, confident, and visually striking — while being immediately legible to non-technical SME owners. The "wow factor" comes from depth, motion, and restraint — not clutter.

**The one rule that governs everything**: Every decision should make the business owner feel like they're looking at a category-defining product, not another boring local software vendor.

### Color Tokens
```css
/* globals.css */
:root {
  --bg:          #060608;
  --surface-1:   #0D0E12;
  --surface-2:   #13141A;
  --surface-3:   #1A1B23;

  --border:      rgba(255, 255, 255, 0.07);
  --border-2:    rgba(255, 255, 255, 0.12);

  --purple:       #8B5CF6;
  --purple-light: #C4B5FD;
  --purple-glow:  rgba(139, 92, 246, 0.15);
  --purple-soft:  rgba(139, 92, 246, 0.06);

  --indigo:      #6366F1;
  --indigo-glow: rgba(99, 102, 241, 0.12);

  --text:        #ECEDF2;
  --text-2:      #8B8FA8;
  --text-3:      #52556A;

  --success:     #10B981;
  --danger:      #EF4444;
}
```

Always reference tokens. Never hardcode hex values in JSX or Tailwind classes.

Map to Tailwind in `tailwind.config.ts`:
```ts
colors: {
  bg: 'var(--bg)',
  surface: { 1: 'var(--surface-1)', 2: 'var(--surface-2)', 3: 'var(--surface-3)' },
  purple: { DEFAULT: 'var(--purple)', light: 'var(--purple-light)', glow: 'var(--purple-glow)', soft: 'var(--purple-soft)' },
  border: { DEFAULT: 'var(--border)', 2: 'var(--border-2)' },
  text: { DEFAULT: 'var(--text)', 2: 'var(--text-2)', 3: 'var(--text-3)' },
}
```

### Typography
```css
--font-display: 'Bricolage Grotesque', sans-serif;  /* Headlines, hero, display */
--font-body:    'DM Sans', sans-serif;               /* Body, UI, labels */
```

**Scale** (never exceed these):
- Hero h1: `clamp(44px, 6vw, 68px)`, weight 800, tracking `-0.035em`
- Section h2: `clamp(32px, 4vw, 48px)`, weight 800, tracking `-0.03em`
- Card h3: `18–20px`, weight 700, tracking `-0.02em`
- Body: `15–17px`, weight 400, line-height 1.7
- Labels/overlines: `11px`, weight 600, uppercase, tracking `0.1em`

**Purple gradient text** — use on key words in h1/h2 (one per section max):
```tsx
<span className="bg-gradient-to-r from-purple to-purple-light bg-clip-text text-transparent">
  merecía
</span>
```

### Depth & Atmosphere
These are the effects that create the "premium dark SaaS" feeling. Use them deliberately:

**Radial glow blobs** — soft, low-opacity, never overpowering:
```tsx
// Hero purple glow (top-center)
<div className="absolute top-[-200px] left-1/2 -translate-x-1/2 w-[800px] h-[600px]
  bg-[radial-gradient(ellipse_at_50%_40%,rgba(139,92,246,0.08)_0%,transparent_65%)]
  pointer-events-none" />

// Indigo glow (left accent)
<div className="absolute top-[200px] left-[-100px] w-[500px] h-[500px]
  bg-[radial-gradient(circle,rgba(99,102,241,0.05)_0%,transparent_70%)]
  pointer-events-none" />
```

**Grid texture overlay** — applied to hero and key sections:
```tsx
<div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)]
  bg-[size:60px_60px]
  [mask-image:radial-gradient(ellipse_80%_70%_at_50%_20%,black_0%,transparent_80%)]
  pointer-events-none" />
```

**Top edge glow on cards** — 1px line gradient at the top of featured cards:
```css
.card::before {
  content: '';
  position: absolute;
  top: 0; left: 0; right: 0;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(139,92,246,0.35), transparent);
}
```

**App window shadow** — the product screenshot/mockup section:
```css
box-shadow: 0 0 0 1px rgba(255,255,255,0.04), 0 60px 120px rgba(0,0,0,0.8), 0 0 80px rgba(139,92,246,0.04);
```

**Interactive card hover** — mouse-following inner glow:
```tsx
// On mousemove, set --cx and --cy CSS vars, then use in ::after
const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
  const rect = e.currentTarget.getBoundingClientRect()
  e.currentTarget.style.setProperty('--cx', `${e.clientX - rect.left}px`)
  e.currentTarget.style.setProperty('--cy', `${e.clientY - rect.top}px`)
}

// CSS:
// .card::after { background: radial-gradient(circle at var(--cx) var(--cy), rgba(139,92,246,0.04), transparent 60%) }
```

### Buttons
```tsx
// Primary CTA — purple fill with inner gloss. White text (not near-black)
// because dark text on #8B5CF6 falls below 4.5:1 AA contrast.
<button className="relative overflow-hidden bg-purple text-white font-bold text-[14px]
  px-6 py-3 rounded-[10px] tracking-[-0.01em] transition-all duration-150
  hover:bg-[#7C3AED] hover:-translate-y-[1px]
  before:absolute before:inset-0 before:bg-gradient-to-br
  before:from-white/15 before:to-transparent before:pointer-events-none">
  Solicitar demo gratuita →
</button>

// Secondary / ghost
<button className="bg-surface-2 text-text border border-border-2 font-medium text-[14px]
  px-5 py-3 rounded-[10px] transition-all duration-150
  hover:bg-surface-3 hover:border-white/20">
  Ver el producto
</button>
```

**Only one primary purple button visible at a time per viewport.** Secondary buttons may coexist.

---

## Page Sections

Build the landing page in this exact order. Each section is a separate component in `/components/landing/`.

### 1. `<Nav />` — `components/landing/Nav.tsx`
- Fixed, 58px height, `backdrop-blur-xl`, dark bg `rgba(6,6,8,0.75)`
- Logo: purple square icon + "Pintana" wordmark
- Center: pill-shaped tab nav (`bg-surface-2`, `border border-border`, `rounded-full`)
- Right: "Iniciar sesión" ghost link + "Solicitar demo" purple CTA
- Hides pill tabs on mobile, shows hamburger menu

### 2. `<Hero />` — `components/landing/Hero.tsx`
- Full viewport height, centered content
- Background layers (bottom to top): bg color → grid texture → left indigo glow → top purple glow → content
- **Badge pill**: `"Nuevo: Integración MercadoPago en tiempo real"` with pulsing purple dot
- **h1**: `"El sistema que su pintería merecía desde siempre"` — "merecía" in purple gradient
- **Subheadline**: short, direct, no jargon. Max 2 lines.
- **CTA row**: Primary "Solicitar demo gratuita →" + Ghost "Ver el producto"
- **Social proof row**: 4 avatar stack + separator + count + separator + star rating
- **Scroll-animated entrance**: stagger each element 60ms apart, `translateY(16px) → 0`, `opacity 0 → 1`

### 3. `<AppWindow />` — `components/landing/AppWindow.tsx`
This is the most important "wow" section. It shows the actual ERP product.

- macOS-style window chrome: traffic lights, tab bar with "Dashboard / Inventario / POS", `⌘K` search pill
- Full app shell inside: sidebar + main content with live-looking data
- **Content to show**: KPI row (4 stats), bar chart (weekly sales), activity feed, mini inventory table
- Purple glow radiating from bottom of the window: `radial-gradient(ellipse, rgba(139,92,246,0.12), transparent)`
- Animate bars on mount with a staggered height transition
- This section has NO headline — it's a pure product visual that speaks for itself

### 4. `<Modules />` — `components/landing/Modules.tsx`
- Background: `var(--surface-1)`
- Overline: "PLATAFORMA COMPLETA"
- h2: "Todo integrado. *Cero fricción.*"
- **Bento grid layout** (not a regular card grid):
  - Top row: wide card (ERP, 2/3 width) + narrow card (POS, 1/3)
  - Bottom row: narrow (Inventario) + wide (RRHH, 2/3 width)
  - Each card: icon, h3, 2-line description
  - Wide cards: subtle directional gradient background + tech tag pills
  - Mouse-following inner glow on hover (see depth effects above)

### 5. `<POSFeature />` — `components/landing/POSFeature.tsx`
- Two-column: left = copy + feature list, right = POS mockup
- Feature list: 3 items with icon chip, h4, description
- **POS mockup**: realistic preview showing product grid (6 items, one selected/purple) + cart sidebar with total + purple "Cobrar ahora" button showing `F1·F2·F3` shortcuts
- Top bar of mockup shows "● Sesión activa" in purple

### 6. `<Stats />` — `components/landing/Stats.tsx`
- Tight band, `border-y border-border`
- 4 stats in a grid separated by 1px border lines
- Numbers: 42px, weight 800, alternating white/purple gradient text
- No icons, no decoration — the numbers ARE the design
- Animate count-up on scroll entry (use `react-countup` or custom hook)

### 7. `<Contact />` — `components/landing/Contact.tsx`
Two-column layout:
- **Left**: overline + h2 + 2-line sub + 4 contact points (icon chip + title + subtitle)
- **Right**: form card with top-edge purple glow
  - Form fields: Nombre, Apellido (grid), Email, WhatsApp, Provincia (select), Sucursales (select), Textarea
  - Submit: full-width purple button
  - Note: "🔒 Sus datos están seguros. No hacemos spam."
  - On success: replace form with a success state (checkmark + "¡Gracias! Le contactamos pronto")
  - On error: show inline error toast

### 8. `<Footer />` — `components/landing/Footer.tsx`
- Minimal: logo left, links right
- Links: Privacidad, Términos, Soporte, Contacto
- "© 2025 Pintana · Hecho en Argentina 🇦🇷"

---

## Animation System

Use Framer Motion. Keep it purposeful — motion communicates state and guides attention, never decoration for its own sake.

### Scroll Reveal (apply to all sections)
```tsx
import { motion } from 'framer-motion'

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } }
}

// Wrap section content:
<motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }}>
```

### Staggered Children
```tsx
const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } }
}
// Parent gets container variants, children get fadeUp variants
```

### Hero Entrance
Stagger each element 60ms. First element starts at 100ms delay. NO layout shifts.

### Number Counter (Stats section)
```tsx
// On viewport entry, animate from 0 to target over 1.5s
// Use easeOut curve so it decelerates naturally
// Purple numbers pulse once on completion (scale 1 → 1.04 → 1, 200ms)
```

### App Window Bars
```tsx
// On mount, animate each bar from height 0% to target height
// Stagger: 30ms per bar
// Easing: spring(stiffness:200, damping:20)
```

---

## Content & Copy Guidelines

The audience is **dueños de pinturerías** — often 40–65 years old, not tech-savvy, skeptical of software vendors, pressed for time. Copy must be:

- **Direct and concrete**: "Factura electrónica AFIP en el mismo flujo de venta" not "gestión documental avanzada"
- **Local and specific**: Mention AFIP, MercadoPago, pesos argentinos, "pintería" not "tienda" or "negocio de pinturas"
- **Confident without being pushy**: State facts, don't sell. Let the product visual do the convincing.
- **Short**: No paragraph longer than 2 lines. Headings max 8 words.

**Tone compass**: Trusted local expert who also happens to build world-class software. Not a startup bro. Not a corporate vendor. A person who deeply understands pinturerías AND technology.

**Words to avoid**: "solución", "plataforma robusta", "ecosistema", "sinergia", "potente", "intuitivo" (show don't tell)

**Words to prefer**: "control", "en tiempo real", "sin papeles", "desde el mostrador", "su negocio", concrete feature names

---

## Form Submission

```ts
// app/api/contact/route.ts
// POST handler:
// 1. Validate with Zod schema (same schema as client-side)
// 2. Send email via Resend to hola@pintana.com.ar with lead data
// 3. Optionally: POST to a CRM webhook or Google Sheets via Apps Script
// 4. Return { success: true } or { error: 'message' }

const contactSchema = z.object({
  firstName: z.string().min(2),
  lastName: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional(),
  province: z.string().optional(),
  branches: z.string().optional(),
  message: z.string().optional(),
})
```

Rate limit: max 3 submissions per IP per hour (use `@upstash/ratelimit` with Vercel KV or in-memory for dev).

---

## Performance Requirements

- Lighthouse score ≥ 90 on mobile (Performance, Accessibility, SEO)
- LCP < 2.5s: preload hero fonts, use `next/image` for any images, no layout shift
- Fonts: use `display: swap` and preconnect to `fonts.googleapis.com`
- No client-side data fetching on initial render (all static/ISR)
- Bundle: no library > 50kb gzipped unless justified (Framer Motion is justified)

---

## File Structure

```
app/
  page.tsx              ← Assembles all sections
  layout.tsx            ← Font loading, metadata
  api/
    contact/
      route.ts          ← Form submission handler
components/
  landing/
    Nav.tsx
    Hero.tsx
    AppWindow.tsx
    Modules.tsx
    POSFeature.tsx
    Stats.tsx
    Contact.tsx
    Footer.tsx
  ui/
    Badge.tsx           ← Reusable badge pill
    BentoCard.tsx       ← Card with mouse glow effect
    FeatureItem.tsx     ← Icon + title + description
lib/
  contact.ts            ← Email sending logic
  validations.ts        ← Zod schemas
styles/
  globals.css           ← CSS tokens, base styles
public/
  og.png                ← 1200×630 OG image
```

---

## SEO & Metadata

```tsx
// app/layout.tsx
export const metadata: Metadata = {
  title: 'Pintana — ERP para Pinturerías Argentinas',
  description: 'Sistema de gestión integral para pinturerías: ERP, punto de venta, inventario y CRM en una plataforma. Diseñado para el mercado argentino.',
  keywords: ['ERP pintería', 'sistema gestión pintería', 'punto de venta pintería argentina', 'software pintería'],
  openGraph: {
    title: 'Pintana — El sistema que su pintería merecía',
    description: 'ERP, POS, inventario y CRM para pinturerías argentinas.',
    images: [{ url: '/og.png', width: 1200, height: 630 }],
    locale: 'es_AR',
    type: 'website',
  },
  twitter: { card: 'summary_large_image' },
}
```

Schema.org structured data: `SoftwareApplication` type with `applicationCategory: "BusinessApplication"`.

---

## Anti-Patterns — Never Do These

- ❌ Light/white background on any section (this is a dark-first brand)
- ❌ Stock photography or placeholder avatar images
- ❌ Spinning loaders on the contact form (use skeleton or optimistic UI)
- ❌ Cookie banners, newsletter popups, or exit-intent overlays
- ❌ Auto-playing video (use a static mockup/screenshot instead)
- ❌ More than one `<h1>` on the page
- ❌ Long bullet lists in the copy — convert to feature cards
- ❌ The word "intuitivo" — show the UI, don't describe it
- ❌ Hardcoded hex colors in JSX — always use CSS variables
- ❌ `Inter` or `Roboto` — we use Bricolage Grotesque + DM Sans only
- ❌ Animations that run on every scroll (use `viewport={{ once: true }}`)
