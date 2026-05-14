import { motion } from 'framer-motion'
import { ArrowRight, Database } from 'lucide-react'

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  },
}

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
}

export function Bifurcation() {
  return (
    <section
      id="elegi-tu-camino"
      aria-label="Migración desde tu sistema actual"
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
          className="mx-auto mb-12 max-w-[680px] text-center md:mb-14"
        >
          <span className="overline text-purple">Cambiá de sistema sin frenar</span>
          <h2
            className="mt-3 font-editorial font-normal leading-[1.04] tracking-[-0.02em] text-text"
            style={{ fontSize: 'clamp(36px, 4.6vw, 56px)' }}
          >
            Ya tenés sistema, <em className="italic">pero te frena.</em>
          </h2>
          <p className="mt-5 text-[16px] leading-[1.6] text-text-2">
            La pantalla es de hace 15 años. El soporte tarda. No funciona desde
            el celular. Sabés que migrar duele — pero quedarte donde estás duele
            más, todos los días.
          </p>
        </motion.div>

        <motion.a
          variants={fadeUp}
          href="/migrate"
          className="group relative mx-auto block max-w-[760px] overflow-hidden rounded-2xl p-8 text-white transition-all duration-300 hover:-translate-y-[3px] hover:shadow-[0_12px_32px_rgba(15,17,23,0.18)] sm:p-10"
          style={{
            backgroundColor: 'var(--navy)',
            boxShadow:
              '0 1px 2px rgba(15,17,23,0.06), 0 8px 24px rgba(15,17,23,0.10)',
          }}
        >
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-[0.18] mix-blend-overlay"
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml;utf8,<svg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%25' height='100%25' filter='url(%23n)' opacity='0.9'/></svg>\")",
            }}
          />
          <span
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent"
          />

          <div className="relative md:flex md:items-center md:gap-8">
            <span className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/25 bg-white/10 text-white">
              <Database size={20} strokeWidth={2.2} />
            </span>

            <div className="mt-5 md:mt-0 md:flex-1">
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white/65">
                Hoy: Zeus, Flexxus, Líder u otro sistema
              </p>
              <h3
                className="mt-2 max-w-[22ch] font-display font-extrabold leading-[1.05] tracking-[-0.025em] text-white"
                style={{ fontSize: 'clamp(22px, 2.4vw, 30px)' }}
              >
                Te migramos sin parar la pinturería.
              </h3>
              <p className="mt-3 max-w-[52ch] text-[15px] leading-[1.55] text-white/80">
                Tomamos tu base, mantenemos tu numeración ARCA y corremos en
                paralelo 15 días. Apagás el sistema viejo el día que vos digas.
              </p>

              <span className="mt-5 inline-flex items-center gap-2 text-[14px] font-semibold text-white">
                Ver cómo lo hacemos
                <ArrowRight
                  size={16}
                  strokeWidth={2.5}
                  className="transition-transform duration-200 group-hover:translate-x-0.5"
                />
              </span>
            </div>
          </div>
        </motion.a>

        {/* Soft secondary path — Excel/cuaderno users get a quiet link, not a card */}
        <motion.p
          variants={fadeUp}
          className="mx-auto mt-8 max-w-[680px] text-center text-[14px] text-text-2"
        >
          ¿Hoy llevás todo en Excel y un cuaderno?{' '}
          <a
            href="#contacto"
            className="font-semibold text-text underline decoration-purple/40 decoration-[1.5px] underline-offset-[5px] transition-colors hover:decoration-purple"
          >
            También te ayudamos a empezar de cero
          </a>
          .
        </motion.p>
      </motion.div>
    </section>
  )
}
