import { motion } from 'framer-motion'
import { ArrowRight, Database, FileText, Repeat, Power } from 'lucide-react'

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
  visible: { transition: { staggerChildren: 0.07 } },
}

const STEPS = [
  {
    icon: Database,
    title: 'Exportamos tu base',
    body: 'Tomamos productos, clientes, proveedores y cuentas corrientes de tu sistema actual. Las cargamos en Pintana sin que reescribas un solo registro.',
  },
  {
    icon: FileText,
    title: 'Mantenemos tu numeración ARCA',
    body: 'Conservamos la numeración de tus puntos de venta. Sin saltos, sin quiebres ante ARCA, sin sobresaltos con tu contador.',
  },
  {
    icon: Repeat,
    title: 'Corremos en paralelo 15 días',
    body: 'Pintana y tu sistema viejo trabajan juntos mientras tu equipo se acostumbra. Si algo falla, todavía tenés red.',
  },
  {
    icon: Power,
    title: 'Apagamos el viejo cuando vos digas',
    body: 'Vos decidís el día. Nosotros migramos lo último, validamos los saldos y dejamos el sistema anterior solo de consulta.',
  },
] as const

export function Migration() {
  return (
    <section
      id="migracion"
      aria-label="Migración desde otro sistema"
      className="relative overflow-hidden bg-bg py-24 md:py-32"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_55%_45%_at_85%_30%,var(--navy-soft)_0%,transparent_72%)]"
      />

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        variants={container}
        className="container-page relative"
      >
        <div className="grid grid-cols-1 gap-14 md:grid-cols-[1fr_1.3fr] md:gap-16">
          <motion.div
            variants={fadeUp}
            className="md:sticky md:top-[88px] md:self-start"
          >
            <span className="overline text-navy">
              Para Zeus · Flexxus · Líder
            </span>
            <h2
              className="mt-3 max-w-[18ch] font-editorial font-normal leading-[1.04] tracking-[-0.02em] text-text"
              style={{ fontSize: 'clamp(38px, 4.8vw, 56px)' }}
            >
              Te migramos sin{' '}
              <em className="italic">parar la pinturería.</em>
            </h2>
            <p className="mt-5 max-w-[42ch] text-[16px] leading-[1.65] text-text-2">
              Sabemos que cambiar de sistema asusta. Por eso lo hacemos
              nosotros — en paralelo, con tu numeración intacta, y a tu ritmo.
            </p>

            <a
              href="#contacto"
              className="mt-7 inline-flex items-center gap-2 rounded-[10px] border border-border-2 bg-surface-2 px-5 py-3 text-[14px] font-semibold text-text transition-all duration-150 hover:-translate-y-[1px] hover:border-text-3 hover:bg-surface-3"
            >
              Pedí tu plan de migración
              <ArrowRight size={15} strokeWidth={2.5} />
            </a>
          </motion.div>

          <motion.ol variants={container} className="relative">
            {/* Vertical connector */}
            <span
              aria-hidden
              className="pointer-events-none absolute left-[27px] top-2 bottom-2 w-px bg-gradient-to-b from-navy/0 via-navy/30 to-navy/0"
            />
            {STEPS.map((step, i) => (
              <Step key={i} index={i} step={step} />
            ))}

            <motion.li
              variants={fadeUp}
              className="relative mt-8 rounded-2xl border border-navy/20 bg-navy/[0.04] p-5 pl-16"
            >
              <span
                aria-hidden
                className="absolute left-4 top-5 inline-flex h-7 w-7 items-center justify-center rounded-full bg-navy text-white"
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </span>
              <p className="font-display text-[17px] font-extrabold tracking-[-0.01em] text-text">
                Lo hacemos nosotros. Vos seguís vendiendo.
              </p>
              <p className="mt-1.5 text-[14px] leading-[1.55] text-text-2">
                Una persona del equipo de Pintana te acompaña desde el día uno
                hasta que el sistema viejo se apaga.
              </p>
            </motion.li>
          </motion.ol>
        </div>
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
    <motion.li
      variants={fadeUp}
      className="relative pb-8 pl-16 last:pb-0"
    >
      <span
        aria-hidden
        className="absolute left-0 top-0 flex h-[54px] w-[54px] items-center justify-center rounded-full border-2 border-navy/25 bg-bg text-navy shadow-[0_2px_10px_rgba(31,58,95,0.10)]"
      >
        <Icon size={20} strokeWidth={2.1} />
      </span>
      <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-text-3">
        Paso {String(index + 1).padStart(2, '0')}
      </p>
      <p className="mt-1.5 font-display text-[19px] font-extrabold tracking-[-0.01em] text-text md:text-[21px]">
        {step.title}
      </p>
      <p className="mt-2 max-w-[52ch] text-[14.5px] leading-[1.6] text-text-2">
        {step.body}
      </p>
    </motion.li>
  )
}
