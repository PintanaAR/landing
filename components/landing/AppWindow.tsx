'use client'

import { motion } from 'framer-motion'
import {
  LayoutDashboard,
  Boxes,
  ShoppingCart,
  Receipt,
  Users,
  Settings,
  Search,
  TrendingUp,
  TrendingDown,
  Package,
  DollarSign,
  ArrowUpRight,
} from 'lucide-react'

const bars = [
  { label: 'Lun', value: 62 },
  { label: 'Mar', value: 74 },
  { label: 'Mié', value: 58 },
  { label: 'Jue', value: 86 },
  { label: 'Vie', value: 94 },
  { label: 'Sáb', value: 71 },
  { label: 'Dom', value: 40 },
]

const kpis = [
  {
    label: 'Ventas hoy',
    value: '$ 482.350',
    delta: '+12,4%',
    up: true,
    icon: DollarSign,
  },
  {
    label: 'Tickets',
    value: '47',
    delta: '+5',
    up: true,
    icon: Receipt,
  },
  {
    label: 'Ticket prom.',
    value: '$ 10.262',
    delta: '+3,1%',
    up: true,
    icon: TrendingUp,
  },
  {
    label: 'Stock crítico',
    value: '8',
    delta: '−2',
    up: false,
    icon: Package,
  },
]

const inventory = [
  { sku: 'PIN-LAT-04', name: 'Látex interior 20L · Alba', stock: 12, status: 'OK' },
  { sku: 'PIN-ESM-21', name: 'Esmalte sintético blanco 4L', stock: 4, status: 'BAJO' },
  { sku: 'PIN-LAT-08', name: 'Látex exterior 10L · Sherwin', stock: 22, status: 'OK' },
  { sku: 'PIN-DIL-03', name: 'Diluyente · aguarrás 1L', stock: 2, status: 'CRÍT' },
]

const activity = [
  { who: 'Marta R.', what: 'Cobró ticket', detail: '$ 18.420 · MercadoPago', when: 'hace 1 min' },
  { who: 'Sistema', what: 'Stock bajo', detail: 'Esmalte sintético blanco 4L', when: 'hace 4 min' },
  { who: 'Juan L.', what: 'Factura A emitida', detail: 'CUIT 30-7045... · $ 124.560', when: 'hace 9 min' },
  { who: 'Sistema', what: 'Sincronizó AFIP', detail: '12 comprobantes', when: 'hace 14 min' },
]

const sidebarItems = [
  { icon: LayoutDashboard, label: 'Dashboard', active: true },
  { icon: ShoppingCart, label: 'Punto de venta' },
  { icon: Boxes, label: 'Inventario' },
  { icon: Receipt, label: 'Facturación' },
  { icon: Users, label: 'Clientes' },
  { icon: Settings, label: 'Ajustes' },
]

export function AppWindow() {
  return (
    <section
      id="producto-vista"
      aria-label="Vista del producto"
      className="relative -mt-16 pb-32"
    >
      {/* Amber halo behind the window */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 top-24 -z-10 bg-[radial-gradient(ellipse_60%_50%_at_50%_80%,rgba(245,158,11,0.12)_0%,transparent_70%)]"
      />

      <div className="container-page">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="relative mx-auto w-full max-w-[1120px] overflow-hidden rounded-[18px] border border-border-2 bg-surface-1"
          style={{
            boxShadow:
              '0 0 0 1px rgba(255,255,255,0.04), 0 60px 120px rgba(0,0,0,0.8), 0 0 80px rgba(245,158,11,0.04)',
          }}
        >
          {/* Window chrome */}
          <div className="flex items-center gap-3 border-b border-border bg-surface-2/80 px-4 py-3">
            <div className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-[#FF5F57]" />
              <span className="h-3 w-3 rounded-full bg-[#FEBC2E]" />
              <span className="h-3 w-3 rounded-full bg-[#28C840]" />
            </div>
            <div className="ml-2 hidden items-center gap-1 sm:flex">
              {['Dashboard', 'Inventario', 'POS'].map((t, i) => (
                <span
                  key={t}
                  className={
                    i === 0
                      ? 'rounded-md bg-surface-3 px-2.5 py-1 text-[12px] font-medium text-text'
                      : 'rounded-md px-2.5 py-1 text-[12px] font-medium text-text-2'
                  }
                >
                  {t}
                </span>
              ))}
            </div>
            <div className="ml-auto flex items-center gap-2">
              <div className="flex items-center gap-2 rounded-md border border-border bg-surface-1 px-2.5 py-1 text-[11px] text-text-3">
                <Search size={12} aria-hidden />
                <span className="hidden sm:inline">Buscar productos, clientes, facturas…</span>
                <span className="ml-2 rounded border border-border bg-surface-2 px-1.5 py-0.5 font-mono text-[10px] text-text-2">
                  ⌘K
                </span>
              </div>
            </div>
          </div>

          {/* App body */}
          <div className="grid grid-cols-[180px_1fr] md:grid-cols-[210px_1fr]">
            {/* Sidebar */}
            <aside className="hidden border-r border-border bg-surface-1 p-3 md:block">
              <p className="px-2 pb-2 text-[10px] font-semibold uppercase tracking-[0.1em] text-text-3">
                Pinturería Centro
              </p>
              <nav className="flex flex-col gap-0.5">
                {sidebarItems.map(({ icon: Icon, label, active }) => (
                  <span
                    key={label}
                    className={
                      'flex items-center gap-2.5 rounded-md px-2 py-2 text-[13px] font-medium ' +
                      (active
                        ? 'bg-surface-3 text-text'
                        : 'text-text-2 hover:bg-surface-2')
                    }
                  >
                    <Icon size={15} strokeWidth={2} className={active ? 'text-amber' : ''} />
                    {label}
                  </span>
                ))}
              </nav>
              <div className="mt-4 rounded-lg border border-border bg-surface-2 p-3">
                <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-text-3">
                  Cierre Z
                </p>
                <p className="mt-1 text-[13px] text-text">Pendiente</p>
                <button className="mt-2 inline-flex items-center gap-1 text-[12px] font-semibold text-amber hover:underline">
                  Generar <ArrowUpRight size={12} />
                </button>
              </div>
            </aside>

            {/* Main */}
            <div className="min-w-0 bg-bg p-4 md:p-6">
              {/* Header row */}
              <div className="mb-4 flex items-end justify-between">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-text-3">
                    Resumen · Lunes 11 de mayo
                  </p>
                  <h3 className="mt-1 font-display text-[20px] font-extrabold tracking-[-0.02em] text-text">
                    Dashboard
                  </h3>
                </div>
                <span className="hidden items-center gap-1.5 rounded-full border border-border bg-surface-2 px-2.5 py-1 text-[11px] text-text-2 sm:inline-flex">
                  <span className="h-1.5 w-1.5 rounded-full bg-success" />
                  AFIP conectado
                </span>
              </div>

              {/* KPI cards */}
              <div className="grid grid-cols-2 gap-2.5 md:grid-cols-4">
                {kpis.map((k) => {
                  const Icon = k.icon
                  return (
                    <div
                      key={k.label}
                      className="rounded-lg border border-border bg-surface-1 p-3"
                    >
                      <div className="flex items-center justify-between text-text-3">
                        <span className="text-[11px] font-semibold uppercase tracking-[0.08em]">
                          {k.label}
                        </span>
                        <Icon size={13} aria-hidden />
                      </div>
                      <p className="mt-2 font-display text-[18px] font-extrabold tracking-[-0.02em] text-text">
                        {k.value}
                      </p>
                      <p
                        className={
                          'mt-0.5 inline-flex items-center gap-0.5 text-[11px] font-semibold ' +
                          (k.up ? 'text-success' : 'text-amber')
                        }
                      >
                        {k.up ? <TrendingUp size={11} /> : <TrendingDown size={11} />}
                        {k.delta}
                      </p>
                    </div>
                  )
                })}
              </div>

              {/* Chart + activity */}
              <div className="mt-3 grid grid-cols-1 gap-2.5 lg:grid-cols-[1.4fr_1fr]">
                <div className="rounded-lg border border-border bg-surface-1 p-4">
                  <div className="mb-3 flex items-center justify-between">
                    <p className="text-[12px] font-semibold text-text">
                      Ventas de la semana
                    </p>
                    <span className="text-[11px] text-text-3">en miles de pesos</span>
                  </div>
                  <div className="flex h-32 items-end gap-2">
                    {bars.map((b, i) => (
                      <div key={b.label} className="flex flex-1 flex-col items-center gap-1.5">
                        <motion.span
                          initial={{ height: 0 }}
                          whileInView={{ height: `${b.value}%` }}
                          viewport={{ once: true, margin: '-40px' }}
                          transition={{
                            type: 'spring',
                            stiffness: 200,
                            damping: 20,
                            delay: 0.05 + i * 0.04,
                          }}
                          className={
                            'w-full rounded-t-[3px] ' +
                            (i === 4
                              ? 'bg-gradient-to-t from-amber to-amber-light'
                              : 'bg-surface-3')
                          }
                          aria-hidden
                        />
                        <span className="text-[10px] text-text-3">{b.label}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-lg border border-border bg-surface-1 p-4">
                  <p className="mb-3 text-[12px] font-semibold text-text">Actividad</p>
                  <ul className="space-y-2.5">
                    {activity.map((a, i) => (
                      <li key={i} className="flex items-start gap-2.5">
                        <span className="mt-1.5 inline-block h-1.5 w-1.5 rounded-full bg-amber" />
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-[12px] text-text">
                            <span className="font-semibold">{a.who}</span>{' '}
                            <span className="text-text-2">{a.what}</span>
                          </p>
                          <p className="truncate text-[11px] text-text-3">
                            {a.detail} · {a.when}
                          </p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Inventory table */}
              <div className="mt-3 overflow-hidden rounded-lg border border-border bg-surface-1">
                <div className="flex items-center justify-between border-b border-border px-4 py-3">
                  <p className="text-[12px] font-semibold text-text">
                    Inventario · alertas
                  </p>
                  <span className="text-[11px] text-text-3">4 ítems</span>
                </div>
                <table className="w-full text-left text-[12px]">
                  <thead className="text-text-3">
                    <tr>
                      <th className="px-4 py-2 font-medium">SKU</th>
                      <th className="px-4 py-2 font-medium">Producto</th>
                      <th className="px-4 py-2 font-medium text-right">Stock</th>
                      <th className="px-4 py-2 font-medium text-right">Estado</th>
                    </tr>
                  </thead>
                  <tbody>
                    {inventory.map((row, i) => (
                      <tr
                        key={row.sku}
                        className={
                          i !== inventory.length - 1 ? 'border-b border-border' : ''
                        }
                      >
                        <td className="px-4 py-2.5 font-mono text-text-2">{row.sku}</td>
                        <td className="px-4 py-2.5 text-text">{row.name}</td>
                        <td className="px-4 py-2.5 text-right text-text">{row.stock}</td>
                        <td className="px-4 py-2.5 text-right">
                          <span
                            className={
                              'rounded-full px-2 py-0.5 text-[10px] font-semibold ' +
                              (row.status === 'OK'
                                ? 'bg-success/15 text-success'
                                : row.status === 'BAJO'
                                ? 'bg-amber/15 text-amber-light'
                                : 'bg-danger/15 text-danger')
                            }
                          >
                            {row.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
