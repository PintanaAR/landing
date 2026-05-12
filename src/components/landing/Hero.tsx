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

      {/* Single soft purple glow at top-center — restraint */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-[-220px] h-[560px] w-[820px] -translate-x-1/2 bg-[radial-gradient(ellipse_at_50%_40%,rgba(139,92,246,0.08)_0%,transparent_65%)]"
      />

      <div className="container-page relative flex min-h-[calc(100vh-58px)] flex-col items-center justify-center py-24 text-center">
        <motion.div
          variants={container}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center"
        >
          <motion.h1
            variants={fadeUp}
            className="max-w-[16ch] font-display font-extrabold leading-[1.04] tracking-[-0.035em] text-text"
            style={{ fontSize: 'clamp(44px, 6vw, 68px)' }}
          >
            El sistema que tu pintería{' '}
            <span className="relative inline-block">
              <span
                className="bg-[linear-gradient(110deg,var(--purple)_0%,var(--purple-light)_55%,var(--purple)_100%)] bg-clip-text text-transparent"
                style={{ backgroundSize: '200% 100%' }}
              >
                merecía
              </span>
              <BrushUnderline reduce={!!reduce} />
            </span>{' '}
            desde siempre
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="mt-6 max-w-[56ch] text-[17px] leading-[1.7] text-text-2"
          >
            ERP, punto de venta e inventario en una sola pantalla.
            Facturás en ARCA (ex-AFIP) y cobrás con MercadoPago desde el
            mostrador, sin papeles.
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
              Ver el sistema
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

  // Static tail bristles fade in with the main stroke
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
          <stop offset="0%" stopColor="var(--purple)" stopOpacity="0.18" />
          <stop offset="22%" stopColor="var(--purple-light)" stopOpacity="0.95" />
          <stop offset="78%" stopColor="var(--purple)" stopOpacity="0.95" />
          <stop offset="100%" stopColor="var(--purple-light)" stopOpacity="0" />
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

      {/* Main confident stroke */}
      <motion.path
        d="M 3 8.5 C 24 4, 44 12, 62 8 C 80 4, 98 12, 116 7"
        stroke="url(#brush-grad)"
        strokeWidth="3.2"
        strokeLinecap="round"
        fill="none"
        filter="url(#bristle)"
        {...draw}
      />

      {/* Scratch follow-through, thinner and shifted down */}
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

      {/* Dry-brush tail bristles — separated marks where the brush ran out */}
      <motion.g {...bristleFade}>
        <path
          d="M 112 7 L 119 7.6"
          stroke="var(--purple)"
          strokeWidth="0.55"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M 112 9 L 118 9.4"
          stroke="var(--purple-light)"
          strokeWidth="0.5"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M 112 10.8 L 116.5 11"
          stroke="var(--purple)"
          strokeWidth="0.45"
          strokeLinecap="round"
          fill="none"
        />
      </motion.g>
    </svg>
  )
}
