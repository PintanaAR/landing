import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
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

const inventory = [
  {
    sku: 'PIN-LAT-04',
    name: 'Látex interior 20L · Alba',
    stock: 12,
    status: 'OK',
    swatch: '#F5F5F5',
  },
  {
    sku: 'PIN-ESM-21',
    name: 'Esmalte sintético blanco 4L',
    stock: 4,
    status: 'BAJO',
    swatch: '#FAFAFA',
  },
  {
    sku: 'PIN-LAT-08',
    name: 'Látex exterior 10L · Beige claro',
    stock: 22,
    status: 'OK',
    swatch: '#DDC8A0',
  },
  {
    sku: 'PIN-DIL-03',
    name: 'Diluyente · aguarrás 1L',
    stock: 2,
    status: 'CRÍT',
    swatch: 'transparent',
  },
]

const sidebarItems = [
  { icon: LayoutDashboard, label: 'Dashboard', active: true },
  { icon: ShoppingCart, label: 'Punto de venta' },
  { icon: Boxes, label: 'Inventario' },
  { icon: Receipt, label: 'Facturación' },
  { icon: Users, label: 'Clientes' },
  { icon: Settings, label: 'Ajustes' },
]

type Activity = {
  id: number
  who: string
  what: string
  detail: string
  age: number
}

const INITIAL_ACTIVITY: Activity[] = [
  { id: 1, who: 'Marta R.', what: 'Cobró ticket', detail: '$ 18.420 · MercadoPago', age: 0 },
  { id: 2, who: 'Sistema', what: 'Stock bajo', detail: 'Esmalte sintético blanco 4L', age: 24 },
  { id: 3, who: 'Juan L.', what: 'Factura A emitida', detail: 'CUIT 30-7045... · $ 124.560', age: 65 },
  { id: 4, who: 'Sistema', what: 'Sincronizó AFIP', detail: '12 comprobantes', age: 180 },
]

const PEOPLE = ['Marta R.', 'Juan L.', 'Carolina P.', 'Sebastián O.', 'Diego M.']
const PRODUCTS_LOW = [
  'Esmalte sintético blanco 4L',
  'Látex interior 20L · Alba',
  'Diluyente · aguarrás 1L',
  'Rodillo antigota 22cm',
  'Cinta de papel 50m',
]
const PAY_METHODS = ['MercadoPago', 'Efectivo', 'QR MercadoPago', 'Tarjeta débito']

const pick = <T,>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)]
const rand = (min: number, max: number) => Math.floor(min + Math.random() * (max - min))
const fmt = (n: number) => n.toLocaleString('es-AR')

function buildActivity(id: number): {
  activity: Activity
  ventasDelta: number
  ticketsDelta: number
} {
  const kind = Math.random()
  if (kind < 0.5) {
    const amt = rand(4000, 38000)
    return {
      activity: {
        id,
        who: pick(PEOPLE),
        what: 'Cobró ticket',
        detail: `$ ${fmt(amt)} · ${pick(PAY_METHODS)}`,
        age: 0,
      },
      ventasDelta: amt,
      ticketsDelta: 1,
    }
  }
  if (kind < 0.75) {
    const amt = rand(30000, 240000)
    return {
      activity: {
        id,
        who: pick(PEOPLE),
        what: 'Factura A emitida',
        detail: `CUIT 30-${rand(1000000, 9999999)}... · $ ${fmt(amt)}`,
        age: 0,
      },
      ventasDelta: amt,
      ticketsDelta: 1,
    }
  }
  if (kind < 0.9) {
    return {
      activity: {
        id,
        who: 'Sistema',
        what: 'Stock bajo',
        detail: pick(PRODUCTS_LOW),
        age: 0,
      },
      ventasDelta: 0,
      ticketsDelta: 0,
    }
  }
  return {
    activity: {
      id,
      who: 'Sistema',
      what: 'Sincronizó AFIP',
      detail: `${rand(3, 18)} comprobantes`,
      age: 0,
    },
    ventasDelta: 0,
    ticketsDelta: 0,
  }
}

function fmtAge(age: number) {
  if (age <= 1) return 'ahora'
  if (age < 60) return `hace ${age} seg`
  const m = Math.floor(age / 60)
  return `hace ${m} min`
}

export function AppWindow() {
  const reduce = useReducedMotion()
  const [activity, setActivity] = useState<Activity[]>(INITIAL_ACTIVITY)
  const [ventas, setVentas] = useState(482350)
  const [tickets, setTickets] = useState(47)
  const idRef = useRef(INITIAL_ACTIVITY.length)

  useEffect(() => {
    if (reduce) return

    const ageTick = setInterval(() => {
      setActivity((prev) => prev.map((a) => ({ ...a, age: a.age + 1 })))
    }, 1000)

    const addTick = setInterval(() => {
      const id = ++idRef.current
      const { activity: next, ventasDelta, ticketsDelta } = buildActivity(id)
      setActivity((prev) => [next, ...prev].slice(0, 4))
      if (ventasDelta) setVentas((v) => v + ventasDelta)
      if (ticketsDelta) setTickets((t) => t + ticketsDelta)
    }, 4200)

    return () => {
      clearInterval(ageTick)
      clearInterval(addTick)
    }
  }, [reduce])

  return (
    <section
      id="producto-vista"
      aria-label="Vista del producto"
      className="relative -mt-16 pb-6"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 top-24 -z-10 bg-[radial-gradient(ellipse_60%_50%_at_50%_80%,rgba(139,92,246,0.12)_0%,transparent_70%)]"
      />

      <div className="container-page">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="theme-dark relative mx-auto w-full max-w-[1120px] overflow-hidden rounded-[18px] border border-border-2 bg-surface-1"
          style={{
            boxShadow:
              '0 0 0 1px rgba(255,255,255,0.04), 0 60px 120px rgba(0,0,0,0.8), 0 0 80px rgba(139,92,246,0.04)',
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
          <div className="grid grid-cols-1 md:grid-cols-[210px_1fr]">
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
                      (active ? 'bg-surface-3 text-text' : 'text-text-2 hover:bg-surface-2')
                    }
                  >
                    <Icon size={15} strokeWidth={2} className={active ? 'text-purple' : ''} />
                    {label}
                  </span>
                ))}
              </nav>
              <div className="mt-4 rounded-lg border border-border bg-surface-2 p-3">
                <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-text-3">
                  Cierre Z
                </p>
                <p className="mt-1 text-[13px] text-text">Pendiente</p>
                <button className="mt-2 inline-flex items-center gap-1 text-[12px] font-semibold text-purple hover:underline">
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
                  <span className="relative inline-flex h-1.5 w-1.5" aria-hidden>
                    <span className="absolute inset-0 animate-ping rounded-full bg-success opacity-60" />
                    <span className="relative inline-block h-1.5 w-1.5 rounded-full bg-success" />
                  </span>
                  AFIP conectado
                </span>
              </div>

              {/* KPI cards */}
              <div className="grid grid-cols-2 gap-2.5 md:grid-cols-4">
                <KpiCard label="Ventas hoy" icon={DollarSign} delta="+12,4%" up>
                  <AnimatedNumber value={`$ ${fmt(ventas)}`} />
                </KpiCard>
                <KpiCard label="Tickets" icon={Receipt} delta="+5" up>
                  <AnimatedNumber value={fmt(tickets)} />
                </KpiCard>
                <KpiCard label="Ticket prom." icon={TrendingUp} delta="+3,1%" up>
                  $ 10.262
                </KpiCard>
                <KpiCard label="Stock crítico" icon={Package} delta="−2" up={false}>
                  8
                </KpiCard>
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
                              ? 'bg-gradient-to-t from-purple to-purple-light'
                              : 'bg-surface-3')
                          }
                          style={
                            i === 4 && !reduce
                              ? { animation: 'peak-pulse 2.6s ease-in-out infinite' }
                              : undefined
                          }
                          aria-hidden
                        />
                        <span className="text-[10px] text-text-3">{b.label}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-lg border border-border bg-surface-1 p-4">
                  <div className="mb-3 flex items-center justify-between">
                    <p className="text-[12px] font-semibold text-text">Actividad</p>
                    <span className="inline-flex items-center gap-1.5 text-[10px] uppercase tracking-[0.08em] text-text-3">
                      <span className="relative inline-flex h-1.5 w-1.5" aria-hidden>
                        <span className="absolute inset-0 animate-ping rounded-full bg-purple opacity-60" />
                        <span className="relative inline-block h-1.5 w-1.5 rounded-full bg-purple" />
                      </span>
                      En vivo
                    </span>
                  </div>
                  <ul className="space-y-2.5">
                    <AnimatePresence initial={false} mode="popLayout">
                      {activity.map((a) => (
                        <motion.li
                          key={a.id}
                          layout
                          initial={{ opacity: 0, y: -8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 8 }}
                          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                          className="flex items-start gap-2.5"
                        >
                          <span className="mt-1.5 inline-block h-1.5 w-1.5 rounded-full bg-purple" />
                          <div className="min-w-0 flex-1">
                            <p className="truncate text-[12px] text-text">
                              <span className="font-semibold">{a.who}</span>{' '}
                              <span className="text-text-2">{a.what}</span>
                            </p>
                            <p className="truncate text-[11px] text-text-3">
                              {a.detail} · {fmtAge(a.age)}
                            </p>
                          </div>
                        </motion.li>
                      ))}
                    </AnimatePresence>
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
                      <th className="hidden px-4 py-2 font-medium sm:table-cell">SKU</th>
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
                        <td className="hidden px-4 py-2.5 font-mono text-text-2 sm:table-cell">{row.sku}</td>
                        <td className="px-4 py-2.5 text-text">
                          <span className="inline-flex items-center gap-2">
                            <span
                              aria-hidden
                              className="block h-3 w-3 shrink-0 rounded-[3px] ring-1 ring-inset ring-white/15"
                              style={{
                                backgroundColor: row.swatch,
                                backgroundImage:
                                  row.swatch === 'transparent'
                                    ? 'repeating-linear-gradient(45deg,rgba(255,255,255,0.18)_0_2px,transparent_2px_4px)'
                                    : undefined,
                              }}
                            />
                            {row.name}
                          </span>
                        </td>
                        <td className="px-4 py-2.5 text-right text-text">{row.stock}</td>
                        <td className="px-4 py-2.5 text-right">
                          <span
                            className={
                              'rounded-full px-2 py-0.5 text-[10px] font-semibold ' +
                              (row.status === 'OK'
                                ? 'bg-success/15 text-success'
                                : row.status === 'BAJO'
                                ? 'bg-warning/15 text-warning-light'
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

function KpiCard({
  label,
  icon: Icon,
  delta,
  up,
  children,
}: {
  label: string
  icon: typeof DollarSign
  delta: string
  up: boolean
  children: React.ReactNode
}) {
  return (
    <div className="rounded-lg border border-border bg-surface-1 p-3">
      <div className="flex items-center justify-between text-text-3">
        <span className="text-[11px] font-semibold uppercase tracking-[0.08em]">{label}</span>
        <Icon size={13} aria-hidden />
      </div>
      <p className="mt-2 font-display text-[18px] font-extrabold tracking-[-0.02em] text-text">
        {children}
      </p>
      <p
        className={
          'mt-0.5 inline-flex items-center gap-0.5 text-[11px] font-semibold ' +
          (up ? 'text-success' : 'text-warning')
        }
      >
        {up ? <TrendingUp size={11} /> : <TrendingDown size={11} />}
        {delta}
      </p>
    </div>
  )
}

function AnimatedNumber({ value }: { value: string }) {
  return (
    <span className="inline-block">
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={value}
          initial={{ y: -6, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 6, opacity: 0 }}
          transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
          className="inline-block"
        >
          {value}
        </motion.span>
      </AnimatePresence>
    </span>
  )
}
