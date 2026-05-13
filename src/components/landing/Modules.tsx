import { motion } from 'framer-motion'
import { PaintDrip } from '@/components/ui/PaintDrip'
import { cn } from '@/lib/cn'

// Heading variant — gentle reveal. The h2 + sub sit at the top of the
// section, well above the cards. They precede the drama.
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  },
}

// Card variant — physical "drop into place." Spring tuned for a single
// thud with a hint of settle: stiffness/damping ratio produces ~3% of
// overshoot before resting. Slight initial rotation reads as the block
// hitting the grid slightly tilted and squaring up — like dropping a
// paint chip onto a tabletop.
const cardDrop = {
  hidden: { opacity: 0, y: 80, rotate: -1.4, scale: 0.94 },
  visible: {
    opacity: 1,
    y: 0,
    rotate: 0,
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 95,
      damping: 16,
      mass: 0.9,
    },
  },
}

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.14 } },
}

// Slower stagger between the dropping cards specifically — gives each
// "thud" room to land before the next one starts falling.
const cardsContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.16, delayChildren: 0.12 } },
}

type ModuleCard = {
  number: string
  label: string
  title: string
  body: string
  /** Solid paint background — CSS var name without the `var()` */
  paint:
    | 'var(--navy)'
    | 'var(--ink)'
    | 'var(--sage)'
    | 'var(--purple)'
  tags?: string[]
  bullets?: string[]
  wide?: boolean
}

const MODULES: ModuleCard[] = [
  {
    number: '01',
    label: 'Núcleo de gestión',
    title: 'Un libro. Un cierre.',
    body: 'Ventas, compras, caja y facturación ARCA en el mismo flujo. Una sola contabilidad para todas tus sucursales.',
    paint: 'var(--navy)',
    tags: ['ARCA A/B/C', 'Cuentas corrientes', 'Caja y banco', 'Multi-sucursal'],
    wide: true,
  },
  {
    number: '02',
    label: 'Punto de venta',
    title: 'Cobrás más rápido.',
    body: 'MercadoPago, efectivo y cheque combinados en una sola venta. F1·F2·F3 para los productos top.',
    paint: 'var(--ink)',
  },
  {
    number: '03',
    label: 'Inventario',
    title: 'Stock siempre real.',
    body: 'Alertas de mínimo por sucursal y trazabilidad de cada balde — de la compra a la venta.',
    paint: 'var(--sage)',
  },
  {
    number: '04',
    label: 'Equipo y permisos',
    title: 'Sin cobros fantasma.',
    body: 'Cada empleado con su perfil. La caja cierra siempre con un responsable.',
    paint: 'var(--purple)',
    bullets: [
      'Permisos por rol y sucursal',
      'Comisiones automáticas',
      'Turnos y cierres de caja',
      'Auditoría de cada operación',
    ],
    wide: true,
  },
]

export function Modules() {
  return (
    <section
      id="modulos"
      aria-label="Módulos"
      className="relative bg-surface-1 pb-24 mt-16 md:pb-32"
    >
      {/* Dramatic paint moment between AppWindow and Modules — thick band
          of ink across the section seam, long drips trailing into the
          section below. Reads as the page literally being painted by a
          fresh stroke as the user scrolls in. */}
      <PaintDrip
        className="absolute inset-x-0 -top-10 z-0"
        bandHeight={52}
        drips={[
          { x: 4, width: 11, length: 96, delay: 0.05 },
          { x: 11, width: 7, length: 54, delay: 0.22 },
          { x: 19, width: 15, length: 162, delay: 0.08 },
          { x: 27, width: 6, length: 38, delay: 0.28 },
          { x: 36, width: 12, length: 124, delay: 0.04 },
          { x: 43, width: 9, length: 72, delay: 0.18 },
          { x: 51, width: 18, length: 196, delay: 0.1 },
          { x: 60, width: 7, length: 60, delay: 0.26 },
          { x: 68, width: 10, length: 108, delay: 0.07 },
          { x: 76, width: 8, length: 80, delay: 0.2 },
          { x: 84, width: 13, length: 144, delay: 0.12 },
          { x: 92, width: 6, length: 46, delay: 0.24 },
        ]}
      />

      {/* pt sits ~16px below the longest drip's tip
          (bandHeight 52 + maxLen 196 - top-10 offset 40 = 208px from
          section top; pt-56 = 224px → 16px breathing room). */}
      <div className="container-page relative z-10 pt-56">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={container}
          className="mx-auto mb-12 max-w-[720px] text-center"
        >
          <motion.span variants={fadeUp} className="overline text-sage">
            Módulos
          </motion.span>
          <motion.h2
            variants={fadeUp}
            className="mt-3 font-display font-extrabold leading-[1.02] tracking-[-0.035em] text-text"
            style={{ fontSize: 'clamp(36px, 4.5vw, 56px)' }}
          >
            Todo. En una pantalla.
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="mt-5 text-[16px] leading-[1.65] text-text-2"
          >
            Cuatro módulos pintados con la misma brocha.{' '}
            <span className="font-semibold text-text">Todo conectado</span>,
            sin saltar de app en app.
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={cardsContainer}
          className="grid grid-cols-1 gap-3 md:grid-cols-3"
        >
          {MODULES.map((m) => (
            <motion.div
              key={m.number}
              variants={cardDrop}
              className={cn(m.wide && 'md:col-span-2')}
              style={{ transformOrigin: 'center top' }}
            >
              <PaintBlockCard module={m} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

/**
 * Solid paint-block card — magazine spread style.
 *
 * Background = solid paint-can color. Foreground = white text + a huge
 * editorial number anchored top-right. Reads as a chip from a paint
 * fan, not a software-product feature card.
 */
function PaintBlockCard({ module: m }: { module: ModuleCard }) {
  return (
    <article
      className="group relative h-full overflow-hidden rounded-2xl p-7 text-white transition-all duration-300 hover:-translate-y-[3px] sm:p-8"
      style={{
        backgroundColor: m.paint,
        boxShadow:
          '0 1px 2px rgba(15,17,23,0.06), 0 8px 24px rgba(15,17,23,0.10)',
      }}
    >
      {/* Subtle paint-grain noise overlay — makes the solid bg feel like
          rolled-on paint rather than a flat CSS color. */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.18] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%25' height='100%25' filter='url(%23n)' opacity='0.9'/></svg>\")",
        }}
      />
      {/* Faint top-edge highlight — like a paint stripe catching light. */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent"
      />

      {/* Big editorial number — magazine "page number" treatment.
          Wide cards have horizontal room → number lives top-right.
          Narrow cards would collide with wrapping title → number drops
          to bottom-right corner where there's no body text. */}
      <span
        aria-hidden
        className={cn(
          'pointer-events-none absolute select-none font-display font-extrabold leading-none tracking-[-0.05em] text-white/10 transition-transform duration-500 group-hover:scale-[1.04]',
          m.wide
            ? 'right-5 top-3 sm:right-7 sm:top-5'
            : 'bottom-3 right-5 sm:bottom-5 sm:right-7',
        )}
        style={{
          fontSize: m.wide
            ? 'clamp(72px, 8.5vw, 128px)'
            : 'clamp(56px, 6.5vw, 88px)',
        }}
      >
        {m.number}
      </span>

      <div className="relative">
        <span className="inline-block text-[11px] font-semibold uppercase tracking-[0.16em] text-white/65">
          {m.label}
        </span>
        <h3
          className="mt-3 max-w-[14ch] font-display font-extrabold leading-[1.02] tracking-[-0.035em] text-white"
          style={{ fontSize: 'clamp(28px, 3.2vw, 40px)' }}
        >
          {m.title}
        </h3>
        <p className="mt-4 max-w-[48ch] text-[15px] leading-[1.55] text-white/80">
          {m.body}
        </p>

        {m.tags && (
          <div className="mt-6 flex flex-wrap gap-2">
            {m.tags.map((t) => (
              <span
                key={t}
                className="inline-flex items-center rounded-full border border-white/20 bg-white/8 px-3 py-1 text-[11px] font-medium text-white/85"
              >
                {t}
              </span>
            ))}
          </div>
        )}

        {m.bullets && (
          <ul className="mt-6 grid grid-cols-1 gap-2 text-[13px] sm:grid-cols-2">
            {m.bullets.map((b) => (
              <li key={b} className="flex items-start gap-2 text-white/85">
                <span
                  aria-hidden
                  className="mt-[7px] inline-block h-1.5 w-1.5 flex-none rounded-full bg-white/55"
                />
                <span>{b}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </article>
  )
}
