import { motion } from 'framer-motion'
import {
  Keyboard,
  CreditCard,
  Receipt,
  Trash2,
} from 'lucide-react'

const features = [
  {
    icon: Keyboard,
    title: 'Atajos de teclado',
    desc: 'F1 para cobrar, F2 para descuento, F3 para anular. Las manos no se mueven del teclado.',
  },
  {
    icon: CreditCard,
    title: 'MercadoPago integrado',
    desc: 'QR dinámico, link de pago o tarjeta. El ticket se cierra solo cuando entra la plata.',
  },
  {
    icon: Receipt,
    title: 'Ticket fiscal en un click',
    desc: 'Factura A, B o C emitida contra AFIP sin pasar a otra pantalla.',
  },
]

const products = [
  { name: 'Látex Interior 20L', price: '18.450', tag: 'Alba', selected: true },
  { name: 'Esmalte Sintético 4L', price: '9.820', tag: 'Sherwin' },
  { name: 'Diluyente 1L', price: '1.240', tag: 'Genérico' },
  { name: 'Pincel 2"', price: '780', tag: 'El Galgo' },
  { name: 'Rodillo Antigota', price: '1.650', tag: 'Pampero' },
  { name: 'Cinta de papel', price: '420', tag: '3M' },
]

const cart = [
  { name: 'Látex Interior 20L · Alba', qty: 2, price: 18450 },
  { name: 'Rodillo Antigota', qty: 1, price: 1650 },
  { name: 'Cinta de papel', qty: 3, price: 420 },
]

const subtotal = cart.reduce((s, i) => s + i.price * i.qty, 0)
const iva = Math.round(subtotal * 0.21)
const total = subtotal + iva
const fmt = (n: number) =>
  n.toLocaleString('es-AR', { minimumFractionDigits: 0 })

export function POSFeature() {
  return (
    <section
      id="pos"
      aria-label="Punto de venta"
      className="relative py-24 md:py-32"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-border-2 to-transparent"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute right-[-120px] top-[120px] h-[500px] w-[500px] bg-[radial-gradient(circle,rgba(139,92,246,0.06)_0%,transparent_70%)]"
      />

      <div className="container-page">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          {/* Left: copy + features */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="overline">Mostrador</span>
            <h2
              className="mt-3 max-w-[14ch] font-display font-extrabold leading-[1.05] tracking-[-0.03em] text-text"
              style={{ fontSize: 'clamp(32px, 4vw, 48px)' }}
            >
              El POS más rápido que probó{' '}
              <span className="bg-gradient-to-r from-purple to-purple-light bg-clip-text text-transparent">
                en su vida
              </span>
            </h2>
            <p className="mt-5 max-w-[52ch] text-[16px] leading-[1.7] text-text-2">
              Diseñado para vender mientras hay cola. Sin esperar pantallas, sin
              hojas sueltas, sin contar el vuelto con la calculadora del celular.
            </p>

            <ul className="mt-8 space-y-5">
              {features.map(({ icon: Icon, title, desc }) => (
                <li key={title} className="flex gap-4">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-border bg-surface-2 text-purple">
                    <Icon size={18} strokeWidth={2} />
                  </span>
                  <div>
                    <h4 className="font-display text-[16px] font-bold tracking-[-0.01em] text-text">
                      {title}
                    </h4>
                    <p className="mt-1 max-w-[44ch] text-[14px] leading-[1.6] text-text-2">
                      {desc}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Right: POS mockup */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.05 }}
            className="relative"
          >
            <div
              className="theme-dark relative overflow-hidden rounded-2xl border border-border-2 bg-surface-1"
              style={{
                boxShadow:
                  '0 0 0 1px rgba(255,255,255,0.04), 0 40px 80px rgba(0,0,0,0.55), 0 0 60px rgba(139,92,246,0.05)',
              }}
            >
              {/* Top bar */}
              <div className="flex items-center justify-between border-b border-border bg-surface-2/70 px-4 py-2.5">
                <div className="flex items-center gap-2 text-[12px] text-text-2">
                  <span className="relative inline-flex h-2 w-2" aria-hidden>
                    <span className="absolute inset-0 animate-ping rounded-full bg-purple opacity-60" />
                    <span className="relative inline-block h-2 w-2 rounded-full bg-purple shadow-[0_0_8px_rgba(139,92,246,0.7)]" />
                  </span>
                  <span className="font-semibold text-purple">Sesión activa</span>
                  <span className="text-text-3">· Caja 01 · Marta R.</span>
                </div>
                <span className="font-mono text-[11px] text-text-3">
                  Ticket #00342
                </span>
              </div>

              <div className="grid grid-cols-[1fr_240px]">
                {/* Product grid */}
                <div className="border-r border-border p-3">
                  <div className="mb-2 flex items-center justify-between">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-text-3">
                      Productos
                    </p>
                    <span className="rounded-md border border-border bg-surface-2 px-2 py-0.5 font-mono text-[10px] text-text-2">
                      / buscar
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 md:grid-cols-3">
                    {products.map((p) => (
                      <div
                        key={p.name}
                        className={
                          'relative rounded-lg border p-2.5 text-left transition-colors ' +
                          (p.selected
                            ? 'border-purple/50 bg-purple/[0.06]'
                            : 'border-border bg-surface-2 hover:border-border-2')
                        }
                      >
                        {p.selected && (
                          <span className="absolute right-2 top-2 inline-block h-1.5 w-1.5 rounded-full bg-purple shadow-[0_0_6px_rgba(139,92,246,0.7)]" />
                        )}
                        <p className="text-[11px] uppercase tracking-[0.06em] text-text-3">
                          {p.tag}
                        </p>
                        <p className="mt-1 text-[12px] font-semibold leading-tight text-text">
                          {p.name}
                        </p>
                        <p className="mt-2 text-[13px] font-bold text-text">
                          ${p.price}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Cart sidebar */}
                <div className="flex flex-col bg-surface-1">
                  <div className="border-b border-border px-3.5 py-2.5">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-text-3">
                      Carrito · {cart.length} ítems
                    </p>
                  </div>
                  <ul className="flex-1 divide-y divide-border px-3.5">
                    {cart.map((item) => (
                      <li key={item.name} className="flex items-start gap-2 py-2.5">
                        <span className="mt-0.5 inline-block min-w-[18px] rounded bg-surface-3 px-1 text-center font-mono text-[10px] font-semibold text-text-2">
                          ×{item.qty}
                        </span>
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-[12px] text-text">
                            {item.name}
                          </p>
                          <p className="text-[11px] text-text-3">
                            ${fmt(item.price)}
                          </p>
                        </div>
                        <button
                          aria-label="Quitar"
                          className="text-text-3 transition-colors hover:text-danger"
                        >
                          <Trash2 size={12} />
                        </button>
                      </li>
                    ))}
                  </ul>
                  <div className="space-y-1 border-t border-border px-3.5 py-3 text-[12px]">
                    <div className="flex justify-between text-text-2">
                      <span>Subtotal</span>
                      <span>${fmt(subtotal)}</span>
                    </div>
                    <div className="flex justify-between text-text-2">
                      <span>IVA 21%</span>
                      <span>${fmt(iva)}</span>
                    </div>
                    <div className="mt-1 flex items-baseline justify-between border-t border-border pt-2">
                      <span className="text-[11px] font-semibold uppercase tracking-[0.08em] text-text-3">
                        Total
                      </span>
                      <span className="font-display text-[20px] font-extrabold tracking-[-0.02em] text-text">
                        ${fmt(total)}
                      </span>
                    </div>
                  </div>
                  <div className="px-3.5 pb-3.5">
                    <button
                      className="relative w-full overflow-hidden rounded-[10px] bg-purple px-3 py-2.5 text-[13px] font-bold text-white shadow-[0_0_0_0_rgba(139,92,246,0)] before:absolute before:inset-0 before:bg-gradient-to-br before:from-white/15 before:to-transparent before:pointer-events-none motion-safe:animate-[cta-breathe_3.4s_ease-in-out_infinite]"
                    >
                      Cobrar ahora
                    </button>
                    <div className="mt-2 flex items-center justify-center gap-1.5 text-[10px] text-text-3">
                      {['F1', 'F2', 'F3'].map((k) => (
                        <kbd
                          key={k}
                          className="rounded border border-border bg-surface-2 px-1.5 py-0.5 font-mono text-text-2"
                        >
                          {k}
                        </kbd>
                      ))}
                      <span>cobrar · descuento · anular</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
