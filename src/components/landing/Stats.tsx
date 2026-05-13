import { motion } from 'framer-motion'
import { site } from '@/lib/site'
import { cn } from '@/lib/cn'

type StatEntry = {
  value: string
  unit?: string
  label: string
  source?: string
}

const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  },
}

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09 } },
}

// The big numbers all read in ink so the eye lands on the *facts*, not the
// colors. Each stat still carries a paint chip beneath it — same palette as
// Modules — but at a tiny scale, so the section feels cohesive without four
// loud colors competing for attention.
const PAINT_STRIPES = ['bg-purple', 'bg-sage', 'bg-navy', 'bg-ink'] as const

export function Stats() {
  const customer = site.stats.customerStats
  const facts = site.stats.productFacts
  const entries: ReadonlyArray<StatEntry> =
    customer.length > 0 ? customer : facts.length > 0 ? facts : []

  if (entries.length === 0) return null

  const usingCustomerStats = customer.length > 0
  const eyebrow = usingCustomerStats ? 'Resultados reales' : 'El producto'
  // Editorial heading treatment: Instrument Serif with italic flair on
  // the contrarian second clause. Magazine-spread feel — the only place
  // on the page where we break out of the display sans.
  const heading = usingCustomerStats ? (
    <>
      Pinturerías que ya <em className="italic">cobran tranquilas.</em>
    </>
  ) : (
    <>
      Hechos. <em className="italic">No promesas.</em>
    </>
  )
  const sub = usingCustomerStats
    ? 'Lo que cambia cuando una pintería deja la planilla y empieza a operar con Pintana.'
    : 'Lo que vas a notar desde la primera semana — antes de que cualquier otro sistema te muestre un dashboard.'

  return (
    <section
      id="el-producto"
      aria-label="El producto en hechos"
      className="relative bg-bg"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_50%_50%,var(--sage-soft)_0%,transparent_72%)]"
      />
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        className="container-page relative py-20 md:py-28"
      >
        <motion.div
          variants={fadeUp}
          className="mx-auto mb-14 flex max-w-[720px] flex-col items-center text-center md:mb-20"
        >
          <span className="overline text-sage">{eyebrow}</span>
          <h2
            className="mt-4 max-w-[20ch] font-editorial font-normal leading-[1.04] tracking-[-0.02em] text-text"
            style={{ fontSize: 'clamp(46px, 5.6vw, 72px)' }}
          >
            {heading}
          </h2>
          <p className="mt-5 max-w-[56ch] text-[16px] leading-[1.65] text-text-2">
            {sub}
          </p>
        </motion.div>

        {/* Editorial 4-up grid. Hairline dividers on desktop only; on
            mobile, vertical rhythm carries it. */}
        <div className="grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-y-14 lg:grid-cols-4 lg:gap-y-0">
          {entries.map((entry, i) => (
            <StatColumn
              key={i}
              entry={entry}
              stripe={PAINT_STRIPES[i % PAINT_STRIPES.length]}
              index={i}
              total={entries.length}
            />
          ))}
        </div>
      </motion.div>
    </section>
  )
}

function StatColumn({
  entry,
  stripe,
  index,
  total,
}: {
  entry: StatEntry
  stripe: string
  index: number
  total: number
}) {
  // Desktop: 1px hairline between cells (skip the first one).
  // Tablet: 1px hairline between cells in 2-col layout (skip 1st of each row).
  const showDividerLg = index > 0
  const showDividerSm = index % 2 === 1

  return (
    <motion.div
      variants={fadeUp}
      className={cn(
        'relative min-w-0 px-2 lg:px-6',
        showDividerSm && 'sm:border-l sm:border-border lg:border-l-0',
        showDividerLg && 'lg:border-l lg:border-border',
      )}
    >
      {/* Tiny magazine page-number indicator */}
      <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-text-3">
        {String(index + 1).padStart(2, '0')}
        <span className="mx-1 text-border-2">/</span>
        {String(total).padStart(2, '0')}
      </p>

      {/* Value + optional unit. Inline flow inside a block <p> so long
          phrases like "En el celu" wrap inside the column instead of
          bleeding into the next one. */}
      <p className="mt-6 max-w-full font-display font-extrabold leading-[0.92] tracking-[-0.045em] text-text [text-wrap:balance]">
        <span style={{ fontSize: 'clamp(46px, 5.2vw, 76px)' }}>
          {entry.value}
        </span>
        {entry.unit ? (
          <>
            {' '}
            <span
              className="font-display font-bold tracking-[-0.02em] text-text-2"
              style={{ fontSize: 'clamp(14px, 1.4vw, 19px)' }}
            >
              {entry.unit}
            </span>
          </>
        ) : null}
      </p>

      {/* Paint stripe — a solid sample of paint, like the chip a customer
          would peel off a catalog page. Four stripes across the row form
          the only color story in this section, so the numbers above can
          read as facts instead of as decorations. */}
      <span
        aria-hidden
        className={cn('mt-5 inline-block h-[3px] w-12 rounded-full', stripe)}
      />

      {/* Body */}
      <p className="mt-5 max-w-[28ch] text-[14px] leading-[1.55] text-text-2">
        {entry.label}
      </p>

      {entry.source ? (
        <p className="mt-3 text-[11px] font-semibold uppercase tracking-[0.1em] text-text-3">
          — {entry.source}
        </p>
      ) : null}
    </motion.div>
  )
}
