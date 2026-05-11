import { useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowRight, Check } from 'lucide-react'
import { Badge } from '@/components/ui/Badge'
import { MagneticButton } from '@/components/ui/MagneticButton'

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

type Particle = {
  id: number
  left: number
  size: number
  duration: number
  delay: number
  drift: number
  tone: 'purple' | 'indigo'
}

function generateParticles(n: number): Particle[] {
  return Array.from({ length: n }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    size: 1 + Math.random() * 1.8,
    duration: 18 + Math.random() * 14,
    delay: -Math.random() * 22,
    drift: (Math.random() - 0.5) * 60,
    tone: Math.random() < 0.7 ? 'purple' : 'indigo',
  }))
}

export function Hero() {
  const reduce = useReducedMotion()
  const sectionRef = useRef<HTMLElement>(null)
  const [particles, setParticles] = useState<Particle[]>([])

  // Particles populate post-mount so server/client render the same empty layer.
  useEffect(() => {
    if (reduce) return
    setParticles(generateParticles(26))
  }, [reduce])

  // Cursor-driven CSS variables, throttled via rAF; no React re-renders.
  useEffect(() => {
    const el = sectionRef.current
    if (!el || reduce) return
    if (window.matchMedia('(pointer: coarse)').matches) return

    let raf = 0
    let nx = 0
    let ny = 0

    const apply = () => {
      el.style.setProperty('--cursor-x', `${nx}px`)
      el.style.setProperty('--cursor-y', `${ny}px`)
      el.style.setProperty('--cursor-opacity', '1')
      raf = 0
    }

    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect()
      nx = e.clientX - rect.left
      ny = e.clientY - rect.top
      if (!raf) raf = requestAnimationFrame(apply)
    }

    const onLeave = () => {
      el.style.setProperty('--cursor-opacity', '0')
    }

    el.addEventListener('mousemove', onMove, { passive: true })
    el.addEventListener('mouseleave', onLeave)
    return () => {
      el.removeEventListener('mousemove', onMove)
      el.removeEventListener('mouseleave', onLeave)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [reduce])

  const driftPurple = reduce
    ? {}
    : {
        animate: { x: [-40, 40, -40], y: [-20, 20, -20] },
        transition: { duration: 22, repeat: Infinity, ease: 'easeInOut' as const },
      }

  const driftIndigo = reduce
    ? {}
    : {
        animate: { x: [30, -30, 30], y: [25, -15, 25] },
        transition: { duration: 18, repeat: Infinity, ease: 'easeInOut' as const },
      }

  return (
    <section
      ref={sectionRef}
      id="producto"
      className="relative isolate overflow-hidden pt-[58px]"
      aria-label="Hero"
      style={
        {
          '--cursor-x': '50%',
          '--cursor-y': '30%',
          '--cursor-opacity': '0',
        } as React.CSSProperties
      }
    >
      {/* Solid base */}
      <div className="absolute inset-0 bg-bg" aria-hidden />

      {/* Faint ambient grid — wide soft radial mask */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:60px_60px] [mask-image:radial-gradient(ellipse_80%_70%_at_50%_20%,black_0%,transparent_80%)]"
      />

      {/* Bright grid only inside a tight cursor radius — "spotlight" reveal */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(196,181,253,0.18)_1px,transparent_1px),linear-gradient(90deg,rgba(196,181,253,0.18)_1px,transparent_1px)] bg-[size:60px_60px] transition-opacity duration-200"
        style={{
          maskImage:
            'radial-gradient(220px circle at var(--cursor-x) var(--cursor-y), black 0%, transparent 70%)',
          WebkitMaskImage:
            'radial-gradient(220px circle at var(--cursor-x) var(--cursor-y), black 0%, transparent 70%)',
          opacity: 'var(--cursor-opacity)',
        }}
      />

      {/* Cursor-following soft purple spotlight */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 transition-opacity duration-300"
        style={{
          background:
            'radial-gradient(520px circle at var(--cursor-x) var(--cursor-y), rgba(139,92,246,0.10), transparent 60%)',
          opacity: 'var(--cursor-opacity)',
        }}
      />

      {/* Slow rotating conic beam behind the headline */}
      {!reduce && (
        <motion.div
          aria-hidden
          animate={{ rotate: 360 }}
          transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
          className="pointer-events-none absolute left-1/2 top-[40%] h-[1100px] w-[1100px] -translate-x-1/2 -translate-y-1/2 opacity-70 [background:conic-gradient(from_0deg,transparent_0deg,rgba(139,92,246,0.07)_60deg,transparent_180deg,rgba(99,102,241,0.06)_270deg,transparent_360deg)] [mask-image:radial-gradient(circle_at_center,black_0%,transparent_60%)]"
        />
      )}

      <motion.div
        aria-hidden
        {...driftIndigo}
        className="pointer-events-none absolute left-[-120px] top-[140px] h-[520px] w-[520px] rounded-full bg-[radial-gradient(circle,rgba(99,102,241,0.10)_0%,transparent_70%)]"
      />
      <motion.div
        aria-hidden
        {...driftPurple}
        className="pointer-events-none absolute left-1/2 top-[-220px] h-[640px] w-[860px] -translate-x-1/2 bg-[radial-gradient(ellipse_at_50%_40%,rgba(139,92,246,0.10)_0%,transparent_65%)]"
      />

      {/* Floating ambient particles */}
      {particles.length > 0 && (
        <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
          {particles.map((p) => (
            <span
              key={p.id}
              className={
                'absolute bottom-[-4%] rounded-full will-change-transform ' +
                (p.tone === 'purple' ? 'bg-purple-light/45' : 'bg-indigo/40')
              }
              style={{
                left: `${p.left}%`,
                width: `${p.size}px`,
                height: `${p.size}px`,
                animation: `hero-particle-rise ${p.duration}s linear ${p.delay}s infinite`,
                ['--particle-drift' as string]: `${p.drift}px`,
              }}
            />
          ))}
        </div>
      )}

      {/* Faint noise/grain — pure CSS, very subtle */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.04] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>\")",
        }}
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
            <span className="relative inline-block">
              <span
                className="bg-[linear-gradient(110deg,var(--purple)_0%,var(--purple-light)_45%,var(--purple)_100%)] bg-clip-text text-transparent"
                style={{
                  backgroundSize: '220% 100%',
                  animation: reduce ? undefined : 'hero-shimmer 5s ease-in-out infinite',
                }}
              >
                merecía
              </span>
              <BrushUnderline reduce={!!reduce} />
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
            <MagneticButton href="#contacto" className="btn-primary">
              Solicitar demo gratuita
              <ArrowRight size={16} strokeWidth={2.5} />
            </MagneticButton>
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

      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent to-bg"
      />
    </section>
  )
}

function BrushUnderline({ reduce }: { reduce: boolean }) {
  const draw = reduce
    ? { initial: { pathLength: 1, opacity: 1 } }
    : {
        initial: { pathLength: 0, opacity: 0 },
        animate: { pathLength: 1, opacity: 1 },
        transition: {
          pathLength: { duration: 1.3, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
          opacity: { duration: 0.25 },
          delay: 0.85,
        },
      }

  return (
    <svg
      aria-hidden
      viewBox="0 0 120 14"
      preserveAspectRatio="none"
      className="pointer-events-none absolute -bottom-[0.32em] left-[-2%] h-[0.38em] w-[104%]"
    >
      <defs>
        <linearGradient id="brush-grad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="var(--purple)" stopOpacity="0.25" />
          <stop offset="35%" stopColor="var(--purple-light)" stopOpacity="0.95" />
          <stop offset="70%" stopColor="var(--purple)" stopOpacity="0.95" />
          <stop offset="100%" stopColor="var(--purple-light)" stopOpacity="0.2" />
        </linearGradient>
      </defs>
      <motion.path
        d="M 3 8 C 22 3, 42 11, 60 7 C 78 3, 98 11, 117 6"
        stroke="url(#brush-grad)"
        strokeWidth="3.2"
        strokeLinecap="round"
        fill="none"
        {...draw}
      />
      <motion.path
        d="M 5 10 C 26 6, 44 12, 62 9 C 80 6, 96 12, 115 9"
        stroke="url(#brush-grad)"
        strokeWidth="1.4"
        strokeLinecap="round"
        fill="none"
        opacity={0.55}
        {...draw}
      />
    </svg>
  )
}
