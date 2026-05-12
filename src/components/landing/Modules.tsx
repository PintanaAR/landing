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

// A painted color tile — each module gets its own earth-paint color so the
// row reads as a swatch fan you'd see on a wall of a pinturería, instead of
// four identical surface-2 squares.
function PaintChip({
  color,
  children,
}: {
  color: string
  children: React.ReactNode
}) {
  return (
    <span
      className="relative inline-flex h-11 w-11 items-center justify-center rounded-[10px]"
      style={{
        backgroundColor: color,
        boxShadow:
          'inset 0 -2px 4px rgba(0,0,0,0.24), inset 0 1px 0 rgba(255,255,255,0.16), 0 1px 0 rgba(255,255,255,0.04)',
      }}
    >
      {/* Paint grain — subtle turbulence for that hand-applied look */}
      <span
        aria-hidden
        className="absolute inset-0 rounded-[10px] opacity-[0.35] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='1.6' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%25' height='100%25' filter='url(%23n)' opacity='0.9'/></svg>\")",
        }}
      />
      {/* Sheen — the highlight you see on a fresh paint chip */}
      <span
        aria-hidden
        className="absolute inset-x-1 top-1 h-2 rounded-[6px] bg-white/10 blur-[2px]"
      />
      <span className="relative text-white/95 drop-shadow-[0_1px_0_rgba(0,0,0,0.25)]">
        {children}
      </span>
    </span>
  )
}

// Muted earth-paint palette — colors you'd actually see lined up on a
// pinturería sample wall. Tuned to read against the dark surface-1 bg.
const PAINT = {
  slate: '#3E5A6C', // ERP central — conservative, ledger-like
  ochre: '#A87B3E', // POS — warm, transactional
  terracotta: '#9A4F35', // Inventario — paint-can red-brown
  sage: '#5E6E45', // Equipo — grounded, team
}

export function Modules() {
  return (
    <section
      id="modulos"
      aria-label="Módulos"
      className="relative bg-surface-1 pb-24 mt-36 md:pb-32"
    >
      {/* The drip's top sits exactly at AppWindow's content-end (which is
          now `pb-6` below the window mockup), so the band's top edge is
          flush against the previous section's content. Visual flow:
          window mockup → band → drips → Modules content. No empty bg
          strip above the band. Section drops overflow-hidden so the band
          can extend up into the previous section. */}
      <PaintDrip className="absolute inset-x-0 -top-6 z-0" />
      <PaintSplatter />

      <div className="container-page relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={container}
          className="mx-auto mb-12 max-w-[720px] text-center"
        >
          <motion.span variants={fadeUp} className="overline">
            El sistema completo
          </motion.span>
          <motion.h2
            variants={fadeUp}
            className="mt-3 font-display font-extrabold leading-[1.1] tracking-[-0.03em] text-text"
            style={{ fontSize: 'clamp(32px, 4vw, 48px)' }}
          >
            Todo en un solo lugar.
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="mt-4 text-[16px] leading-[1.7] text-text-2"
          >
            Reemplaza la planilla, el cuaderno, el POS viejo y los
            WhatsApp con el contador.
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
              <div className="relative">
                <PaintChip color={PAINT.slate}>
                  <Database size={20} strokeWidth={2.2} />
                </PaintChip>
                <h3 className="mt-5 font-display text-[20px] font-bold tracking-[-0.02em] text-text">
                  ERP central
                </h3>
                <p className="mt-2 max-w-[52ch] text-[15px] leading-[1.65] text-text-2">
                  Ventas, compras, caja, cuentas corrientes y facturación AFIP
                  en un solo lugar.
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
              <PaintChip color={PAINT.ochre}>
                <ShoppingCart size={20} strokeWidth={2.2} />
              </PaintChip>
              <h3 className="mt-5 font-display text-[20px] font-bold tracking-[-0.02em] text-text">
                Punto de venta
              </h3>
              <p className="mt-2 text-[15px] leading-[1.65] text-text-2">
                Cobrás desde el mostrador. MercadoPago y ticket fiscal sin
                cambiar de pantalla.
              </p>
            </BentoCard>
          </motion.div>

          {/* Inventario narrow */}
          <motion.div variants={fadeUp}>
            <BentoCard className="h-full">
              <PaintChip color={PAINT.terracotta}>
                <PaintBucket size={20} strokeWidth={2.2} />
              </PaintChip>
              <h3 className="mt-5 font-display text-[20px] font-bold tracking-[-0.02em] text-text">
                Inventario
              </h3>
              <p className="mt-2 text-[15px] leading-[1.65] text-text-2">
                Stock por sucursal, alertas de mínimos y trazabilidad de cada
                balde desde la compra hasta la venta.
              </p>
            </BentoCard>
          </motion.div>

          {/* Equipo wide */}
          <motion.div variants={fadeUp} className="md:col-span-2">
            <BentoCard className="h-full">
              <div className="relative">
                <PaintChip color={PAINT.sage}>
                  <Users size={20} strokeWidth={2.2} />
                </PaintChip>
                <h3 className="mt-5 font-display text-[20px] font-bold tracking-[-0.02em] text-text">
                  Equipo y permisos
                </h3>
                <p className="mt-2 max-w-[52ch] text-[15px] leading-[1.65] text-text-2">
                  Cada empleado con su perfil. El cierre de caja siempre queda
                  con el responsable que cobró cada ticket.
                </p>
                <ul className="mt-5 grid grid-cols-1 gap-2 text-[13px] text-text sm:grid-cols-2">
                  {[
                    'Permisos por rol y sucursal',
                    'Comisiones automáticas',
                    'Turnos y cierres de caja',
                    'Auditoría de cada operación',
                  ].map((f) => (
                    <li key={f} className="flex items-center gap-2 text-text-2">
                      <CheckCircle2 size={14} className="text-text-3" />
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
