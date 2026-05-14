import { motion } from 'framer-motion'
import { Nav } from '@/components/landing/Nav'
import { Footer } from '@/components/landing/Footer'
import { Migration } from '@/components/landing/Migration'
import { Contact } from '@/components/landing/Contact'

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

export function Migrate() {
  return (
    <>
      <Nav />
      <main id="top">
        <section
          aria-label="Migración a Pintana"
          className="relative bg-bg pt-[120px] pb-16 md:pt-[160px] md:pb-20"
        >
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_30%,var(--purple-soft)_0%,transparent_70%)]"
          />
          <motion.div
            initial="hidden"
            animate="visible"
            variants={container}
            className="container-page relative"
          >
            <motion.span
              variants={fadeUp}
              className="overline text-purple"
            >
              Migración
            </motion.span>
            <motion.h1
              variants={fadeUp}
              className="mt-3 max-w-[20ch] font-editorial font-normal leading-[1.04] tracking-[-0.02em] text-text"
              style={{ fontSize: 'clamp(40px, 5.6vw, 72px)' }}
            >
              Cambiá de sistema sin{' '}
              <em className="italic">parar la pinturería.</em>
            </motion.h1>
            <motion.p
              variants={fadeUp}
              className="mt-6 max-w-[60ch] text-[17px] leading-[1.65] text-text-2"
            >
              Sabemos que migrar asusta. Por eso lo hacemos nosotros — en
              paralelo con tu sistema actual, manteniendo tu numeración ARCA, y
              al ritmo que vos digas.
            </motion.p>
          </motion.div>
        </section>

        <Migration />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
