'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Check } from 'lucide-react'
import { Badge } from '@/components/ui/Badge'

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  },
}

const container = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.06, delayChildren: 0.1 },
  },
}

const trustSignals = [
  'Compatible AFIP',
  'MercadoPago integrado',
  'Soporte en español',
]

export function Hero() {
  return (
    <section
      id="producto"
      className="relative isolate overflow-hidden pt-[58px]"
      aria-label="Hero"
    >
      {/* Background layers */}
      <div className="absolute inset-0 bg-bg" aria-hidden />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:60px_60px] [mask-image:radial-gradient(ellipse_80%_70%_at_50%_20%,black_0%,transparent_80%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute left-[-120px] top-[140px] h-[520px] w-[520px] rounded-full bg-[radial-gradient(circle,rgba(99,102,241,0.10)_0%,transparent_70%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-[-220px] h-[640px] w-[860px] -translate-x-1/2 bg-[radial-gradient(ellipse_at_50%_40%,rgba(139,92,246,0.10)_0%,transparent_65%)]"
      />

      <div className="container-page relative flex min-h-[calc(100vh-58px)] flex-col items-center justify-center py-24 text-center">
        <motion.div
          variants={container}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center"
        >
          <motion.div variants={fadeUp}>
            <Badge>Nuevo: Integración MercadoPago en tiempo real</Badge>
          </motion.div>

          <motion.h1
            variants={fadeUp}
            className="mt-7 max-w-[16ch] font-display font-extrabold leading-[1.04] tracking-[-0.035em] text-text"
            style={{ fontSize: 'clamp(44px, 6vw, 68px)' }}
          >
            El sistema que su pintería{' '}
            <span className="bg-gradient-to-r from-purple to-purple-light bg-clip-text text-transparent">
              merecía
            </span>{' '}
            desde siempre
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="mt-6 max-w-[58ch] text-[17px] leading-[1.7] text-text-2"
          >
            ERP, punto de venta e inventario en una sola pantalla.
            Facturación AFIP y cobros MercadoPago desde el mostrador, sin
            papeles y en tiempo real.
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="mt-9 flex flex-wrap items-center justify-center gap-3"
          >
            <a href="#contacto" className="btn-primary">
              Solicitar demo gratuita
              <ArrowRight size={16} strokeWidth={2.5} />
            </a>
            <a href="#producto-vista" className="btn-secondary">
              Ver el producto
            </a>
          </motion.div>

          <motion.ul
            variants={fadeUp}
            className="mt-10 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-[13px] text-text-2"
          >
            {trustSignals.map((label) => (
              <li key={label} className="inline-flex items-center gap-1.5">
                <span
                  aria-hidden
                  className="inline-flex h-4 w-4 items-center justify-center rounded-full bg-purple/15 text-purple"
                >
                  <Check size={10} strokeWidth={3} />
                </span>
                {label}
              </li>
            ))}
          </motion.ul>
        </motion.div>
      </div>

      {/* Bottom fade into next section */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent to-bg"
      />
    </section>
  )
}
