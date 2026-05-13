import { motion, useReducedMotion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { HeroPaintBackdrop } from '@/components/ui/HeroPaintBackdrop'

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
    transition: { staggerChildren: 0.07, delayChildren: 0.1 },
  },
}

export function Hero() {
  const reduce = useReducedMotion()
  return (
    <section
      id="producto"
      className="relative isolate overflow-hidden pt-[58px]"
      aria-label="Hero"
    >
      <div className="absolute inset-0 bg-bg" aria-hidden />

      {/* On-brand paint identity layer — brush wash, splatters, color chips */}
      <HeroPaintBackdrop />

      {/* One faint ambient grid, masked to fade out */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(var(--grid-line)_1px,transparent_1px),linear-gradient(90deg,var(--grid-line)_1px,transparent_1px)] bg-[size:60px_60px] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_25%,black_0%,transparent_75%)]"
      />

      {/* Soft warm wash at top-center — paint-accent ambient glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-[-220px] h-[560px] w-[820px] -translate-x-1/2 bg-[radial-gradient(ellipse_at_50%_40%,var(--purple-glow)_0%,transparent_65%)]"
      />

      <div
        className="container-page relative flex min-h-[calc(100vh-58px)] flex-col items-center justify-center py-24 text-center"
        // Pin the content to its own GPU compositing layer so the animated
        // paint backdrop sweeping behind it can't invalidate the content
        // layer's painting (was the source of intermittent content-pane
        // twitching during brushstroke animations).
        style={{ transform: 'translate3d(0, 0, 0)' }}
      >
        <motion.div
          variants={container}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center"
        >
          <motion.div variants={fadeUp}>
            <Eyebrow />
          </motion.div>

          <motion.h1
            variants={fadeUp}
            className="mt-6 max-w-[14ch] font-display font-extrabold leading-[1.02] tracking-[-0.035em] text-text"
            style={{ fontSize: 'clamp(48px, 7vw, 84px)' }}
          >
            Menos caos.
            <br />
            <span className="relative inline-block">
              <span className="text-text">Más ventas.</span>
              <BrushUnderline reduce={!!reduce} />
            </span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="mt-7 max-w-[52ch] text-[17px] leading-[1.65] text-text-2"
          >
            Otras pinturerías cierran caja a mano y rastrean stock por
            WhatsApp.{' '}
            <span className="font-semibold text-text">Pintana lo hace por vos</span>
            {' '}— en tiempo real, en todas tus sucursales.
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
              Ver cómo funciona
            </a>
          </motion.div>
        </motion.div>
      </div>

      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent to-bg"
      />
    </section>
  )
}

function Eyebrow() {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-border-2 bg-surface-1/70 py-1.5 pl-2 pr-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-text-2 backdrop-blur">
      <span
        className="relative inline-flex h-1.5 w-1.5"
        aria-hidden
      >
        <span className="absolute inset-0 animate-ping rounded-full bg-purple/60" />
        <span className="relative inline-block h-1.5 w-1.5 rounded-full bg-purple" />
      </span>
      Sistema operativo · Pinturerías
      <span className="text-text-3">·</span>
      Multi-sucursal
    </span>
  )
}

function BrushUnderline({ reduce }: { reduce: boolean }) {
  const draw = reduce
    ? { initial: { pathLength: 1, opacity: 1 } }
    : {
        initial: { pathLength: 0, opacity: 0 },
        animate: { pathLength: 1, opacity: 1 },
        transition: {
          pathLength: {
            duration: 1.1,
            ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
          },
          opacity: { duration: 0.2 },
          delay: 0.7,
        },
      }

  const bristleFade = reduce
    ? { initial: { opacity: 0.55 } }
    : {
        initial: { opacity: 0 },
        animate: { opacity: 0.55 },
        transition: { duration: 0.35, delay: 1.55 },
      }

  return (
    <svg
      aria-hidden
      viewBox="0 0 120 16"
      preserveAspectRatio="none"
      className="pointer-events-none absolute -bottom-[0.26em] left-[-3%] h-[0.44em] w-[106%]"
    >
      <defs>
        <linearGradient id="brush-grad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="var(--ink)" stopOpacity="0" />
          <stop offset="14%" stopColor="var(--ink)" stopOpacity="0.92" />
          <stop offset="82%" stopColor="var(--ink)" stopOpacity="0.92" />
          <stop offset="100%" stopColor="var(--ink)" stopOpacity="0" />
        </linearGradient>
        <filter id="bristle" x="-2%" y="-50%" width="104%" height="200%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.9 1.6"
            numOctaves="2"
            seed="3"
            result="noise"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="noise"
            scale="1.3"
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>
      </defs>

      <motion.path
        d="M 3 8.5 C 24 4, 44 12, 62 8 C 80 4, 98 12, 116 7"
        stroke="url(#brush-grad)"
        strokeWidth="3.2"
        strokeLinecap="round"
        fill="none"
        filter="url(#bristle)"
        {...draw}
      />

      <motion.path
        d="M 6 11 C 28 7, 46 13, 64 10 C 82 7, 98 13, 114 10.5"
        stroke="url(#brush-grad)"
        strokeWidth="0.9"
        strokeLinecap="round"
        fill="none"
        opacity={0.4}
        filter="url(#bristle)"
        {...draw}
      />

      <motion.g {...bristleFade}>
        <path
          d="M 112 7 L 119 7.6"
          stroke="var(--ink)"
          strokeWidth="0.55"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M 112 9 L 118 9.4"
          stroke="var(--ink-2)"
          strokeWidth="0.5"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M 112 10.8 L 116.5 11"
          stroke="var(--ink)"
          strokeWidth="0.45"
          strokeLinecap="round"
          fill="none"
        />
      </motion.g>
    </svg>
  )
}
