import { motion } from 'framer-motion'
import {
  Database,
  ShoppingCart,
  PaintBucket,
  Users,
  CheckCircle2,
} from 'lucide-react'
import { BentoCard } from '@/components/ui/BentoCard'
import { PaintDrip } from '@/components/ui/PaintDrip'
import { PaintSplatter } from '@/components/ui/PaintSplatter'

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
  visible: { transition: { staggerChildren: 0.07 } },
}

function TagPill({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-surface-2/80 px-2.5 py-1 text-[11px] font-medium text-text-2">
      {children}
    </span>
  )
}

export function Modules() {
  return (
    <section
      id="modulos"
      aria-label="Módulos"
      className="relative overflow-hidden bg-surface-1 pb-24 pt-36 md:pb-32 md:pt-44"
    >
      <PaintDrip className="absolute inset-x-0 top-0" />
      <PaintSplatter />

      <div className="container-page">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={container}
          className="mx-auto mb-12 max-w-[720px] text-center"
        >
          <motion.span variants={fadeUp} className="overline">
            Plataforma completa
          </motion.span>
          <motion.h2
            variants={fadeUp}
            className="mt-3 font-display font-extrabold leading-[1.1] tracking-[-0.03em] text-text"
            style={{ fontSize: 'clamp(32px, 4vw, 48px)' }}
          >
            Todo integrado.{' '}
            <span className="bg-gradient-to-r from-purple to-purple-light bg-clip-text text-transparent">
              Cero fricción.
            </span>
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="mt-4 text-[16px] leading-[1.7] text-text-2"
          >
            Un solo sistema reemplaza la planilla, el cuaderno, el software de POS
            viejo y los WhatsApp con el contador.
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={container}
          className="grid grid-cols-1 gap-3 md:grid-cols-3"
        >
          {/* ERP wide */}
          <motion.div variants={fadeUp} className="md:col-span-2">
            <BentoCard topGlow className="h-full">
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 bg-gradient-to-br from-purple-soft via-transparent to-transparent"
              />
              <div className="relative">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-surface-2 text-purple">
                  <Database size={20} strokeWidth={2} />
                </span>
                <h3 className="mt-5 font-display text-[20px] font-bold tracking-[-0.02em] text-text">
                  ERP central
                </h3>
                <p className="mt-2 max-w-[52ch] text-[15px] leading-[1.65] text-text-2">
                  Ventas, compras, caja, cuentas corrientes y facturación electrónica AFIP
                  en un solo lugar. Los números cuadran solos a fin de mes.
                </p>
                <div className="mt-5 flex flex-wrap gap-2">
                  <TagPill>Facturación AFIP A/B/C</TagPill>
                  <TagPill>Cuentas corrientes</TagPill>
                  <TagPill>Caja y banco</TagPill>
                  <TagPill>Multi-sucursal</TagPill>
                </div>
              </div>
            </BentoCard>
          </motion.div>

          {/* POS narrow */}
          <motion.div variants={fadeUp}>
            <BentoCard className="h-full">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-surface-2 text-purple">
                <ShoppingCart size={20} strokeWidth={2} />
              </span>
              <h3 className="mt-5 font-display text-[20px] font-bold tracking-[-0.02em] text-text">
                Punto de venta
              </h3>
              <p className="mt-2 text-[15px] leading-[1.65] text-text-2">
                Cobrá en segundos desde el mostrador. Atajos de teclado, MercadoPago y
                ticket fiscal sin cambiar de pantalla.
              </p>
            </BentoCard>
          </motion.div>

          {/* Inventario narrow */}
          <motion.div variants={fadeUp}>
            <BentoCard className="h-full">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-surface-2 text-purple">
                <PaintBucket size={20} strokeWidth={2} />
              </span>
              <h3 className="mt-5 font-display text-[20px] font-bold tracking-[-0.02em] text-text">
                Inventario
              </h3>
              <p className="mt-2 text-[15px] leading-[1.65] text-text-2">
                Stock por sucursal, alertas de mínimos y trazabilidad de cada balde
                desde la compra hasta la venta.
              </p>
            </BentoCard>
          </motion.div>

          {/* RRHH wide */}
          <motion.div variants={fadeUp} className="md:col-span-2">
            <BentoCard topGlow className="h-full">
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 bg-gradient-to-bl from-purple-soft via-transparent to-transparent"
              />
              <div className="relative">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-surface-2 text-purple">
                  <Users size={20} strokeWidth={2} />
                </span>
                <h3 className="mt-5 font-display text-[20px] font-bold tracking-[-0.02em] text-text">
                  Equipo y RRHH
                </h3>
                <p className="mt-2 max-w-[52ch] text-[15px] leading-[1.65] text-text-2">
                  Cada empleado con su perfil, permisos finos y comisiones por venta.
                  Cierres de caja con el responsable que cobró cada ticket.
                </p>
                <ul className="mt-5 grid grid-cols-1 gap-2 text-[13px] text-text sm:grid-cols-2">
                  {[
                    'Permisos por rol y sucursal',
                    'Comisiones automáticas',
                    'Turnos y cierres de caja',
                    'Auditoría de cada operación',
                  ].map((f) => (
                    <li key={f} className="flex items-center gap-2 text-text-2">
                      <CheckCircle2 size={14} className="text-purple" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            </BentoCard>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
