import { motion } from 'framer-motion'
import { MousePointerClick, Server, Receipt, Check } from 'lucide-react'
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

const STEPS = [
  {
    icon: MousePointerClick,
    time: '0.0 s',
    label: 'Cobrás',
    detail: 'Confirmás la venta desde el POS.',
  },
  {
    icon: Server,
    time: '4.2 s',
    label: 'CAE recibido',
    detail: 'Pintana solicita el CAE a ARCA y lo recibe.',
  },
  {
    icon: Receipt,
    time: '7.8 s',
    label: 'Factura entregada',
    detail: 'Sale el comprobante con CAE, listo para el cliente.',
  },
] as const

const CAPABILITIES = [
  'Factura A, B, C y E con CAE en segundos',
  'Notas de crédito y débito en el mismo flujo',
  'Resumen mensual a ARCA, automático',
  'Compatible con tu impresora fiscal actual',
]

export function ARCAFeature() {
  return (
    <section
      id="arca"
      aria-label="Facturación ARCA"
      className="relative overflow-hidden bg-surface-1 py-20 md:py-24"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_50%_30%,var(--purple-soft)_0%,transparent_72%)]"
      />

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        variants={container}
        className="container-page relative"
      >
        <motion.div
          variants={fadeUp}
          className="mx-auto mb-12 max-w-[680px] text-center md:mb-16"
        >
          <span className="overline text-purple">ARCA · sin fricción</span>
          <h2
            className="mt-3 max-w-[18ch] mx-auto font-editorial font-normal leading-[1.04] tracking-[-0.02em] text-text"
            style={{ fontSize: 'clamp(36px, 4.6vw, 56px)' }}
          >
            Del clic a la <em className="italic">factura.</em> Menos de ocho
            segundos.
          </h2>
          <p className="mt-5 max-w-[54ch] mx-auto text-[16px] leading-[1.6] text-text-2">
            Cobrás en Pintana y la factura sale con CAE, lista para entregar.
            Nada de pegar datos en un facturador externo.
          </p>
        </motion.div>

        {/* Flow steps — clic → CAE → factura */}
        <motion.div
          variants={fadeUp}
          className="relative rounded-2xl border border-border bg-surface-2 p-6 shadow-[0_8px_28px_rgba(15,17,23,0.06)] md:p-9"
        >
          <span
            aria-hidden
            className="pointer-events-none absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-purple/40 to-transparent"
          />

          <div className="relative grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-3">
            <span
              aria-hidden
              className="pointer-events-none absolute left-[16%] right-[16%] top-[40px] hidden h-[2px] bg-gradient-to-r from-purple/0 via-purple/40 to-purple/0 md:block"
            />

            {STEPS.map((s, i) => (
              <Step key={i} index={i} step={s} />
            ))}
          </div>

          {/* Inline capabilities — collapsed under the flow, no separate card */}
          <ul className="mt-8 grid grid-cols-1 gap-x-6 gap-y-2.5 border-t border-border pt-6 sm:grid-cols-2">
            {CAPABILITIES.map((c) => (
              <li
                key={c}
                className="flex items-start gap-2.5 text-[13.5px] leading-[1.5] text-text-2"
              >
                <span
                  aria-hidden
                  className="mt-[3px] inline-flex h-4 w-4 flex-none items-center justify-center rounded-full bg-purple/12 text-purple"
                >
                  <Check size={11} strokeWidth={3} />
                </span>
                <span>{c}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      </motion.div>
    </section>
  )
}

function Step({
  index,
  step,
}: {
  index: number
  step: (typeof STEPS)[number]
}) {
  const Icon = step.icon
  return (
    <div className="relative flex flex-col items-center text-center md:px-4">
      <div
        className={cn(
          'relative z-10 flex h-[80px] w-[80px] items-center justify-center rounded-full border-2 border-purple/30 bg-surface-2 text-purple shadow-[0_4px_16px_rgba(139,92,246,0.18)]',
        )}
      >
        <Icon size={26} strokeWidth={2} />
      </div>
      <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.16em] text-text-3">
        T+{step.time}
      </p>
      <p className="mt-2 font-display text-[17px] font-extrabold tracking-[-0.01em] text-text">
        {step.label}
      </p>
      <p className="mt-2 max-w-[26ch] text-[13px] leading-[1.55] text-text-2">
        {step.detail}
      </p>
      <span
        aria-hidden
        className="absolute right-2 top-0 font-mono text-[10px] uppercase tracking-[0.16em] text-text-3 md:right-4"
      >
        {String(index + 1).padStart(2, '0')} / {String(STEPS.length).padStart(2, '0')}
      </span>
    </div>
  )
}
