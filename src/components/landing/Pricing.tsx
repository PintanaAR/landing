import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { site } from '@/lib/site'

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

export function Pricing() {
  const { anchor, period, comparison, note } = site.pricing
  return (
    <section
      id="precio"
      aria-label="Precio"
      className="relative bg-bg py-24 md:py-32"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_50%,var(--purple-soft)_0%,transparent_70%)]"
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
          className="mx-auto mb-12 max-w-[640px] text-center"
        >
          <span className="overline text-purple">Precio</span>
          <h2
            className="mt-3 font-editorial font-normal leading-[1.04] tracking-[-0.02em] text-text"
            style={{ fontSize: 'clamp(38px, 4.8vw, 56px)' }}
          >
            Un plan por sucursal.{' '}
            <em className="italic">Sin sorpresas.</em>
          </h2>
        </motion.div>

        <motion.div
          variants={fadeUp}
          className="mx-auto max-w-[920px] overflow-hidden rounded-2xl border border-border bg-surface-2 shadow-[0_8px_28px_rgba(15,17,23,0.08)]"
        >
          <span
            aria-hidden
            className="block h-px bg-gradient-to-r from-transparent via-purple/40 to-transparent"
          />

          <div className="grid grid-cols-1 md:grid-cols-[1fr_1.1fr]">
            <div className="border-b border-border p-8 md:border-b-0 md:border-r md:p-10">
              <p className="overline text-text-3">Desde</p>
              <p className="mt-3 flex items-baseline gap-2 font-display font-extrabold leading-[0.95] tracking-[-0.035em] text-text">
                <span style={{ fontSize: 'clamp(40px, 5vw, 64px)' }}>
                  {anchor}
                </span>
              </p>
              <p className="mt-3 text-[14px] text-text-2">{period}</p>

              <ul className="mt-7 space-y-2.5 text-[13.5px] text-text">
                {[
                  'Sin setup fee',
                  'Sin contratos largos · cancelás cuando quieras',
                  'Usuarios y empleados ilimitados por sucursal',
                  'Soporte por WhatsApp incluido',
                ].map((b) => (
                  <li key={b} className="flex items-start gap-2.5">
                    <span
                      aria-hidden
                      className="mt-[3px] inline-flex h-4 w-4 flex-none items-center justify-center rounded-full bg-purple/12 text-purple"
                    >
                      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </span>
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col justify-between p-8 md:p-10">
              <div>
                <p
                  className="max-w-[28ch] font-display font-extrabold leading-[1.1] tracking-[-0.02em] text-text"
                  style={{ fontSize: 'clamp(20px, 2vw, 26px)' }}
                >
                  {comparison}
                </p>
                <p className="mt-5 max-w-[44ch] text-[14px] leading-[1.6] text-text-2">
                  {note}
                </p>
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <a href="#contacto" className="btn-primary">
                  Pedí presupuesto a medida
                  <ArrowRight size={16} strokeWidth={2.5} />
                </a>
                <a
                  href="#faq"
                  className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-text-2 transition-colors hover:text-text"
                >
                  Mirá las preguntas frecuentes
                  <ArrowRight size={13} strokeWidth={2.5} />
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}
