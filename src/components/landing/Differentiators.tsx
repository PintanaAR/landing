import { motion } from 'framer-motion'
import { Check, Palette, ListChecks, Users, type LucideIcon } from 'lucide-react'
import { cn } from '@/lib/cn'

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
  visible: { transition: { staggerChildren: 0.08 } },
}

type Differentiator = {
  id: string
  icon: LucideIcon
  eyebrow: string
  title: string
  body: string
  bullets: string[]
  mockup: 'tintometrico' | 'precios' | 'pintores'
}

const ITEMS: ReadonlyArray<Differentiator> = [
  {
    id: 'tintometrico',
    icon: Palette,
    eyebrow: 'Sistema tintométrico integrado',
    title: 'El mismo color, seis meses después.',
    body: 'Cargás la fórmula una vez. Cuando el cliente vuelve, reproducís el color exacto con un clic — sin probar tonos a ojo ni perder el balde por error de mezcla.',
    bullets: [
      'Fórmulas guardadas por cliente y por obra',
      'Trazabilidad de bases y colorantes en stock',
      'Compatibilidad con los principales sistemas tintométricos',
      'Histórico de mezclas con fecha y responsable',
    ],
    mockup: 'tintometrico',
  },
  {
    id: 'precios',
    icon: ListChecks,
    eyebrow: 'Listas de precios para Argentina',
    title: 'Actualizás precios sin volverte loco.',
    body: 'Un proveedor te avisa que subió 18%. En dos clics actualizás toda su línea. La doble moneda USD/ARS te protege de la inflación sin que tu vendedor tenga que hacer cuentas en el mostrador.',
    bullets: [
      'Actualización masiva por proveedor o por porcentaje',
      'Doble moneda USD/ARS con tipo de cambio configurable',
      'Historial completo de precios por producto',
      'Descuentos en cascada por cliente, volumen y forma de pago',
    ],
    mockup: 'precios',
  },
  {
    id: 'pintores',
    icon: Users,
    eyebrow: 'Cuenta corriente con pintores',
    title: 'El pintor profesional es la mitad de tu facturación.',
    body: 'Los pintores son el 40-60% del ticket de una pinturería. Manejá su cuenta corriente, su límite de crédito y sus obras como lo que son: tu cliente más importante.',
    bullets: [
      'Cuenta corriente, límite de crédito y antigüedad por pintor',
      'Recordatorios automáticos por WhatsApp',
      'Histórico de obras y consumo recurrente',
      'Listas de precios diferenciadas para profesionales',
    ],
    mockup: 'pintores',
  },
]

export function Differentiators() {
  return (
    <section
      id="diferenciadores"
      aria-label="Diferenciadores de pinturería"
      className="relative bg-bg py-24 md:py-32"
    >
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        variants={container}
        className="container-page relative"
      >
        <motion.div
          variants={fadeUp}
          className="mx-auto mb-16 max-w-[760px] text-center md:mb-24"
        >
          <span className="overline text-sage">No es un POS genérico</span>
          <h2
            className="mt-3 max-w-[20ch] mx-auto font-editorial font-normal leading-[1.04] tracking-[-0.02em] text-text"
            style={{ fontSize: 'clamp(40px, 5vw, 64px)' }}
          >
            Hecho para <em className="italic">pinturerías.</em> No para tiendas
            de barrio.
          </h2>
          <p className="mt-5 max-w-[58ch] mx-auto text-[16px] leading-[1.65] text-text-2">
            Tres cosas que ningún sistema genérico hace bien. Y que en una
            pintería te cuestan plata todos los días.
          </p>
        </motion.div>

        <div className="space-y-20 md:space-y-28">
          {ITEMS.map((item, i) => (
            <Row key={item.id} item={item} reverse={i % 2 === 1} />
          ))}
        </div>
      </motion.div>
    </section>
  )
}

function Row({
  item,
  reverse,
}: {
  item: Differentiator
  reverse: boolean
}) {
  const Icon = item.icon
  return (
    <motion.div
      id={item.id}
      variants={fadeUp}
      className={cn(
        'grid grid-cols-1 items-center gap-10 md:grid-cols-2 md:gap-16',
      )}
    >
      <div className={cn('order-2', reverse ? 'md:order-2' : 'md:order-1')}>
        <span className="inline-flex items-center gap-2 rounded-full border border-border-2 bg-surface-2 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-text-2">
          <Icon size={13} strokeWidth={2.4} />
          {item.eyebrow}
        </span>
        <h3
          className="mt-5 max-w-[18ch] font-display font-extrabold leading-[1.05] tracking-[-0.025em] text-text"
          style={{ fontSize: 'clamp(28px, 3.2vw, 40px)' }}
        >
          {item.title}
        </h3>
        <p className="mt-5 max-w-[52ch] text-[16px] leading-[1.65] text-text-2">
          {item.body}
        </p>
        <ul className="mt-7 grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-x-6">
          {item.bullets.map((b) => (
            <li
              key={b}
              className="flex items-start gap-2.5 text-[14px] leading-[1.5] text-text"
            >
              <span
                aria-hidden
                className="mt-[3px] inline-flex h-4 w-4 flex-none items-center justify-center rounded-full bg-sage/10 text-sage"
              >
                <Check size={11} strokeWidth={3} />
              </span>
              <span>{b}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className={cn('order-1', reverse ? 'md:order-1' : 'md:order-2')}>
        {item.mockup === 'tintometrico' && <TintometricoMockup />}
        {item.mockup === 'precios' && <PreciosMockup />}
        {item.mockup === 'pintores' && <PintoresMockup />}
      </div>
    </motion.div>
  )
}

/* ── Mockups ─────────────────────────────────────────────────────── */

function MockupShell({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="relative rounded-2xl border border-border bg-surface-2 p-6 shadow-[0_8px_28px_rgba(15,17,23,0.08)] md:p-7"
      style={{ minHeight: 280 }}
    >
      <span
        aria-hidden
        className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-purple/35 to-transparent"
      />
      {children}
    </div>
  )
}

function TintometricoMockup() {
  // A "color card" with the swatch + formula recipe
  const colorants = [
    { code: 'B-01', name: 'Base blanca', amount: '3.640', unit: 'g' },
    { code: 'AY-12', name: 'Amarillo óxido', amount: '128', unit: 'g' },
    { code: 'RD-04', name: 'Rojo óxido', amount: '24', unit: 'g' },
    { code: 'BK-01', name: 'Negro', amount: '6', unit: 'g' },
  ]
  return (
    <MockupShell>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-[11px] font-mono uppercase tracking-[0.14em] text-text-3">
            Fórmula · #PIN-2049
          </p>
          <p className="mt-2 font-display text-[20px] font-extrabold tracking-[-0.02em] text-text">
            Terracota seco
          </p>
          <p className="mt-1 text-[12px] text-text-2">
            Cliente: Obra Ramírez · 4L latex interior
          </p>
        </div>
        <div
          className="h-16 w-16 flex-none rounded-md border border-border-2 shadow-inner"
          style={{ backgroundColor: '#B0613F' }}
          aria-hidden
        />
      </div>

      <div className="mt-6 space-y-2">
        {colorants.map((c) => (
          <div
            key={c.code}
            className="flex items-center justify-between rounded-md border border-border bg-surface-3/40 px-3 py-2"
          >
            <div className="flex items-center gap-3">
              <span className="text-[10px] font-mono uppercase tracking-[0.1em] text-text-3">
                {c.code}
              </span>
              <span className="text-[13px] text-text">{c.name}</span>
            </div>
            <span className="font-mono text-[13px] font-semibold tabular-nums text-text">
              {c.amount}
              <span className="ml-0.5 text-text-3">{c.unit}</span>
            </span>
          </div>
        ))}
      </div>

      <div className="mt-5 flex items-center justify-between border-t border-border pt-4">
        <span className="text-[11px] uppercase tracking-[0.12em] text-text-3">
          Última mezcla
        </span>
        <span className="text-[12px] font-medium text-text-2">
          12/03 · Luis
        </span>
      </div>
    </MockupShell>
  )
}

function PreciosMockup() {
  const rows = [
    {
      sku: 'PIN-LAT-04',
      name: 'Látex interior 20L',
      usd: 78.0,
      ars: 89_700,
      bump: '+18%',
    },
    {
      sku: 'PIN-LAT-08',
      name: 'Látex exterior 10L',
      usd: 52.0,
      ars: 59_800,
      bump: '+18%',
    },
    {
      sku: 'PIN-ESM-21',
      name: 'Esmalte sintético 4L',
      usd: 36.5,
      ars: 42_000,
      bump: '+18%',
    },
  ]
  return (
    <MockupShell>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[11px] font-mono uppercase tracking-[0.14em] text-text-3">
            Lista · Proveedor Alba
          </p>
          <p className="mt-1 font-display text-[16px] font-bold tracking-[-0.01em] text-text">
            Actualizar precios en lote
          </p>
        </div>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-purple px-3 py-1 text-[11px] font-bold text-white">
          +18% aplicado
        </span>
      </div>

      <div className="mt-5">
        <div className="grid grid-cols-[1fr_auto_auto] items-center gap-x-4 border-b border-border pb-2 text-[10px] font-semibold uppercase tracking-[0.12em] text-text-3">
          <span>Producto</span>
          <span className="text-right">USD</span>
          <span className="text-right">ARS</span>
        </div>
        <div className="divide-y divide-border">
          {rows.map((r) => (
            <div
              key={r.sku}
              className="grid grid-cols-[1fr_auto_auto] items-center gap-x-4 py-2.5"
            >
              <div className="min-w-0">
                <p className="truncate text-[13px] font-medium text-text">
                  {r.name}
                </p>
                <p className="text-[10px] font-mono text-text-3">{r.sku}</p>
              </div>
              <span className="text-right font-mono text-[12px] tabular-nums text-text-2">
                ${r.usd.toFixed(2)}
              </span>
              <span className="text-right font-mono text-[13px] font-semibold tabular-nums text-text">
                {r.ars.toLocaleString('es-AR')}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between border-t border-border pt-3 text-[11px] text-text-2">
        <span>3 productos · Última actualización 10:42</span>
        <span className="font-semibold text-sage">Guardado</span>
      </div>
    </MockupShell>
  )
}

function PintoresMockup() {
  return (
    <MockupShell>
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div
            aria-hidden
            className="flex h-12 w-12 flex-none items-center justify-center rounded-full bg-sage text-[15px] font-bold text-white"
          >
            MR
          </div>
          <div>
            <p className="font-display text-[18px] font-extrabold tracking-[-0.01em] text-text">
              Martín Ríos
            </p>
            <p className="text-[12px] text-text-2">
              Pintor profesional · Cliente desde 2019
            </p>
          </div>
        </div>
        <span className="inline-flex items-center rounded-full border border-sage/30 bg-sage/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.1em] text-sage">
          Al día
        </span>
      </div>

      <div className="mt-6 grid grid-cols-3 gap-3">
        <div className="rounded-md border border-border bg-surface-3/40 p-3">
          <p className="text-[10px] uppercase tracking-[0.1em] text-text-3">
            Saldo
          </p>
          <p className="mt-1 font-mono text-[15px] font-bold tabular-nums text-text">
            $184.500
          </p>
        </div>
        <div className="rounded-md border border-border bg-surface-3/40 p-3">
          <p className="text-[10px] uppercase tracking-[0.1em] text-text-3">
            Límite
          </p>
          <p className="mt-1 font-mono text-[15px] font-bold tabular-nums text-text">
            $400.000
          </p>
        </div>
        <div className="rounded-md border border-border bg-surface-3/40 p-3">
          <p className="text-[10px] uppercase tracking-[0.1em] text-text-3">
            12 meses
          </p>
          <p className="mt-1 font-mono text-[15px] font-bold tabular-nums text-text">
            $4,2M
          </p>
        </div>
      </div>

      <div className="mt-5 rounded-md border border-purple/25 bg-purple/8 p-3">
        <div className="flex items-start gap-2.5">
          <span
            aria-hidden
            className="mt-[2px] inline-flex h-5 w-5 flex-none items-center justify-center rounded-full bg-purple text-white"
          >
            <svg
              width="11"
              height="11"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden
            >
              <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.74.45 3.42 1.29 4.92L2 22l5.34-1.4c1.46.79 3.1 1.21 4.7 1.21h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.13-2.9-7-1.88-1.88-4.37-2.91-7.02-2.9z" />
            </svg>
          </span>
          <div className="min-w-0">
            <p className="text-[12px] font-semibold text-text">
              Recordatorio enviado por WhatsApp
            </p>
            <p className="mt-0.5 text-[11px] text-text-2">
              "Hola Martín, te quedan $184.500 pendientes del mes. ¿Pasás a
              saldar esta semana?"
            </p>
          </div>
        </div>
      </div>
    </MockupShell>
  )
}
