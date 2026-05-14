import { motion } from 'framer-motion'
import { ArrowRight, Camera, Printer, GraduationCap, MessageCircle } from 'lucide-react'

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
    icon: Camera,
    title: 'Cargamos tu catálogo',
    body: 'Mandanos una foto del listado de tu proveedor. Nosotros lo cargamos en Pintana con códigos, precios y stock inicial. Vos no tipeás nada.',
  },
  {
    icon: Printer,
    title: 'Configuramos impresora y ARCA',
    body: 'Conectamos tu impresora fiscal, configuramos tus puntos de venta en ARCA y dejamos todo listo para emitir la primera factura.',
  },
  {
    icon: GraduationCap,
    title: 'Capacitamos a tu equipo',
    body: 'Una mañana con todo el equipo. Aprenden a cobrar, a hacer cierre de caja y a cargar una venta a cuenta corriente. Se quedan operando solos.',
  },
  {
    icon: MessageCircle,
    title: 'Soporte por WhatsApp todos los días',
    body: 'El primer mes te respondemos siete días a la semana. Una persona del equipo, no un bot. Después seguís con horario comercial extendido.',
  },
] as const

export function Onboarding() {
  return (
    <section
      id="empezar"
      aria-label="Empezar desde cero"
      className="relative overflow-hidden bg-surface-1 py-24 md:py-32"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_55%_45%_at_15%_30%,var(--sage-soft)_0%,transparent_72%)]"
      />

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        variants={container}
        className="container-page relative"
      >
        <div className="grid grid-cols-1 gap-14 md:grid-cols-[1.3fr_1fr] md:gap-16">
          <motion.ol variants={container} className="relative md:order-1">
            <span
              aria-hidden
              className="pointer-events-none absolute left-[27px] top-2 bottom-2 w-px bg-gradient-to-b from-sage/0 via-sage/30 to-sage/0"
            />
            {STEPS.map((step, i) => (
              <Step key={i} index={i} step={step} />
            ))}

            <motion.li
              variants={fadeUp}
              className="relative mt-8 rounded-2xl border border-sage/20 bg-sage/[0.04] p-5 pl-16"
            >
              <span
                aria-hidden
                className="absolute left-4 top-5 inline-flex h-7 w-7 items-center justify-center rounded-full bg-sage text-white"
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </span>
              <p className="font-display text-[17px] font-extrabold tracking-[-0.01em] text-text">
                No necesitás saber de sistemas. Necesitás saber vender pintura.
              </p>
              <p className="mt-1.5 text-[14px] leading-[1.55] text-text-2">
                Nosotros nos ocupamos de la parte técnica. Vos seguís
                haciendo lo que sabés hacer.
              </p>
            </motion.li>
          </motion.ol>

          <motion.div
            variants={fadeUp}
            className="md:sticky md:top-[88px] md:order-2 md:self-start"
          >
            <span className="overline text-sage">
              Para Excel · cuaderno · facturador AFIP
            </span>
            <h2
              className="mt-3 max-w-[16ch] font-editorial font-normal leading-[1.04] tracking-[-0.02em] text-text"
              style={{ fontSize: 'clamp(38px, 4.8vw, 56px)' }}
            >
              Estás operando en{' '}
              <em className="italic">48 horas.</em>
            </h2>
            <p className="mt-5 max-w-[42ch] text-[16px] leading-[1.65] text-text-2">
              Nunca usaste un sistema y eso está bien. Te lo dejamos andando
              llave en mano, capacitamos a tu equipo y te bancamos por
              WhatsApp el primer mes.
            </p>

            <a
              href="#contacto"
              className="mt-7 inline-flex items-center gap-2 rounded-[10px] border border-border-2 bg-surface-2 px-5 py-3 text-[14px] font-semibold text-text transition-all duration-150 hover:-translate-y-[1px] hover:border-text-3 hover:bg-surface-3"
            >
              Empezá hoy
              <ArrowRight size={15} strokeWidth={2.5} />
            </a>
          </motion.div>
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
        className="absolute left-0 top-0 flex h-[54px] w-[54px] items-center justify-center rounded-full border-2 border-sage/25 bg-surface-1 text-sage shadow-[0_2px_10px_rgba(53,94,59,0.10)]"
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
