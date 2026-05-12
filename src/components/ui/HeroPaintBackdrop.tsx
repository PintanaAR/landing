import { useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

const PAINT_PALETTE = [
  '#F5F5F5', // blanco
  '#DDC8A0', // beige
  '#7E8084', // gris
  '#1E1E1E', // negro
  '#F0E7CC', // marfil
  '#C2410C', // terracota
  '#0E7490', // petróleo
  '#15803D', // verde
  '#7C3AED', // violeta
  '#B45309', // ocre
  '#1E40AF', // azul
  '#9D174D', // bordó
]

type Chip = {
  id: number
  color: string
  left: number
  top: number
  size: number
  rotation: number
  duration: number
  delay: number
}

function generateChips(): Chip[] {
  return Array.from({ length: 14 }, (_, i) => ({
    id: i,
    color: PAINT_PALETTE[i % PAINT_PALETTE.length],
    left: Math.random() * 100,
    top: 10 + Math.random() * 75,
    size: 10 + Math.random() * 14,
    rotation: (Math.random() - 0.5) * 40,
    duration: 14 + Math.random() * 12,
    delay: -Math.random() * 15,
  }))
}

export function HeroPaintBackdrop() {
  const reduce = useReducedMotion()
  const [chips, setChips] = useState<Chip[]>([])

  useEffect(() => {
    setChips(generateChips())
  }, [])

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 overflow-hidden"
      // Force the entire paint backdrop onto its own GPU compositing layer so
      // its continuous SVG animations don't invalidate the content layer
      // sitting above it (was producing intermittent twitches in the hero
      // content region — classic compositor churn).
      style={{ transform: 'translate3d(0, 0, 0)' }}
    >
      {/* Large soft brush-stroke wash — sweeps diagonally behind the headline */}
      <svg
        className="absolute left-1/2 top-[12%] w-[140%] -translate-x-1/2"
        viewBox="0 0 1400 600"
        preserveAspectRatio="xMidYMid meet"
        style={{ height: '70%' }}
      >
        <defs>
          <linearGradient id="hero-stroke-grad" x1="0" y1="0" x2="1" y2="0.4">
            <stop offset="0%" stopColor="var(--purple)" stopOpacity="0" />
            <stop offset="30%" stopColor="var(--purple)" stopOpacity="0.10" />
            <stop offset="60%" stopColor="var(--purple-light)" stopOpacity="0.07" />
            <stop offset="100%" stopColor="var(--purple)" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="hero-stroke-grad-2" x1="0" y1="0" x2="0.7" y2="1">
            <stop offset="0%" stopColor="var(--indigo)" stopOpacity="0" />
            <stop offset="50%" stopColor="var(--indigo)" stopOpacity="0.08" />
            <stop offset="100%" stopColor="var(--indigo)" stopOpacity="0" />
          </linearGradient>
          <filter
            id="hero-stroke-blur"
            x="-50%"
            y="-50%"
            width="200%"
            height="200%"
          >
            <feGaussianBlur stdDeviation="14" />
          </filter>
        </defs>
        <path
          d="M -50 380
             C 250 200, 500 460, 800 280
             C 1050 140, 1250 360, 1500 220
             L 1500 460
             C 1250 560, 1050 400, 800 500
             C 500 620, 250 420, -50 580 Z"
          fill="url(#hero-stroke-grad)"
          filter="url(#hero-stroke-blur)"
        />
        <path
          d="M -80 120
             C 300 60, 600 220, 900 100
             C 1150 30, 1350 180, 1500 80
             L 1500 240
             C 1350 320, 1150 200, 900 280
             C 600 380, 300 240, -80 320 Z"
          fill="url(#hero-stroke-grad-2)"
          filter="url(#hero-stroke-blur)"
        />
      </svg>

      {/* Animated brushstrokes — periodically trace across the hero, fade
          out, pause, repeat. Two strokes with offset timings so the page
          always has *something* tracing somewhere but they don't sync up.
          NOTE: the SVG feGaussianBlur that used to soften these strokes was
          recomputing on every frame as pathLength changed, which was the
          main source of intermittent content-layer flicker (the brush
          sweeps fire periodically — matching the user's "sometimes twitches"
          report). Replaced with a CSS filter on the SVG wrapper so the blur
          is compositor-accelerated and cached, and cycles are slowed so the
          sweep is rarer + less attention-grabbing. */}
      {!reduce && (
        <svg
          className="absolute inset-0 h-full w-full"
          preserveAspectRatio="xMidYMid slice"
          viewBox="0 0 1600 900"
          aria-hidden
          style={{ filter: 'blur(6px)', transform: 'translate3d(0, 0, 0)' }}
        >
          {/* Both stroke endpoints are pulled well inward from the viewBox
              edges so the fully-drawn rounded linecaps have clear margin on
              each side instead of nearly touching the hero's overflow-
              hidden boundary. */}
          <motion.path
            d="M 320 240 C 520 100, 780 400, 1040 220 C 1240 90, 1300 270, 1320 240"
            stroke="var(--purple-light)"
            strokeWidth={48}
            strokeLinecap="round"
            fill="none"
            animate={{
              pathLength: [0, 1, 1, 0],
              opacity: [0, 0.55, 0.55, 0],
            }}
            transition={{
              duration: 16,
              times: [0, 0.4, 0.7, 1],
              repeat: Infinity,
              ease: 'easeInOut',
              repeatDelay: 5,
            }}
          />
          <motion.path
            d="M 1300 660 C 1100 790, 820 510, 540 680 C 340 800, 300 600, 320 660"
            stroke="var(--indigo)"
            strokeWidth={42}
            strokeLinecap="round"
            fill="none"
            animate={{
              pathLength: [0, 1, 1, 0],
              opacity: [0, 0.45, 0.45, 0],
            }}
            transition={{
              duration: 18,
              times: [0, 0.4, 0.7, 1],
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 6,
              repeatDelay: 6,
            }}
          />
        </svg>
      )}

      {/* Paint splatters near the corners */}
      <svg
        className="absolute left-[3%] top-[18%] h-[180px] w-[180px] opacity-[0.07]"
        viewBox="0 0 100 100"
      >
        <path
          d="M52 28 Q60 32 64 40 Q74 38 72 50 Q78 56 70 62 Q72 72 60 70 Q54 78 46 72 Q34 76 32 64 Q22 60 28 50 Q22 40 34 40 Q42 28 52 28 Z M22 22 a2.5 2.5 0 1 0 0.1 0 Z M82 30 a2 2 0 1 0 0.1 0 Z M76 78 a3 3 0 1 0 0.1 0 Z M30 84 a1.5 1.5 0 1 0 0.1 0 Z"
          fill="var(--purple)"
          transform="rotate(-15 50 50)"
        />
      </svg>
      <svg
        className="absolute right-[5%] top-[60%] h-[200px] w-[200px] opacity-[0.06]"
        viewBox="0 0 100 100"
      >
        <path
          d="M48 30 Q58 32 60 42 Q70 42 66 52 Q74 58 64 62 Q66 72 56 70 Q50 78 42 70 Q32 72 32 62 Q22 56 32 50 Q26 40 36 38 Q40 30 48 30 Z M16 50 a2 2 0 1 0 0.1 0 Z M80 24 a2.5 2.5 0 1 0 0.1 0 Z M68 84 a2 2 0 1 0 0.1 0 Z"
          fill="var(--purple-light)"
          transform="rotate(28 50 50)"
        />
      </svg>

      {/* Drifting color-swatch chips — the "paint catalog" Easter egg */}
      {chips.map((c) => (
        <motion.span
          key={c.id}
          className="absolute block rounded-[3px] ring-1 ring-inset ring-black/15"
          style={{
            left: `${c.left}%`,
            top: `${c.top}%`,
            width: c.size,
            height: c.size,
            backgroundColor: c.color,
            opacity: 0.18,
            transform: `rotate(${c.rotation}deg)`,
          }}
          animate={
            reduce
              ? undefined
              : {
                  y: [0, -14, 0],
                  rotate: [c.rotation, c.rotation + 4, c.rotation],
                }
          }
          transition={
            reduce
              ? undefined
              : {
                  duration: c.duration,
                  delay: c.delay,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }
          }
        />
      ))}
    </div>
  )
}
