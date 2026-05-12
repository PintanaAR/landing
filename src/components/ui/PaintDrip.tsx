import { useId } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { cn } from '@/lib/cn'

type Drip = {
  x: number
  width: number
  length: number
  delay: number
}

const DEFAULT_DRIPS: Drip[] = [
  { x: 5, width: 10, length: 75, delay: 0.05 },
  { x: 13, width: 7, length: 42, delay: 0.18 },
  { x: 22, width: 14, length: 130, delay: 0.08 },
  { x: 30, width: 6, length: 28, delay: 0.22 },
  { x: 40, width: 12, length: 95, delay: 0.04 },
  { x: 48, width: 8, length: 58, delay: 0.16 },
  { x: 58, width: 16, length: 150, delay: 0.1 },
  { x: 67, width: 7, length: 48, delay: 0.24 },
  { x: 75, width: 11, length: 82, delay: 0.07 },
  { x: 84, width: 9, length: 108, delay: 0.14 },
  { x: 93, width: 6, length: 36, delay: 0.2 },
]

function dripPath(w: number, L: number, R: number) {
  const cx = R + 1
  const stemH = Math.max(L - 2 * R, 2)
  return [
    `M ${cx - w / 2} 0`,
    `L ${cx + w / 2} 0`,
    `L ${cx + w / 2} ${stemH}`,
    `C ${cx + w / 2} ${stemH + R * 0.4},`,
    `${cx + R * 0.85} ${stemH + R * 0.55},`,
    `${cx + R} ${stemH + R}`,
    `A ${R} ${R} 0 0 1 ${cx - R} ${stemH + R}`,
    `C ${cx - R * 0.85} ${stemH + R * 0.55},`,
    `${cx - w / 2} ${stemH + R * 0.4},`,
    `${cx - w / 2} ${stemH}`,
    `Z`,
  ].join(' ')
}

export function PaintDrip({
  className,
  drips = DEFAULT_DRIPS,
  bandHeight = 32,
}: {
  className?: string
  drips?: Drip[]
  bandHeight?: number
}) {
  const reduce = useReducedMotion()
  const idBase = useId().replace(/:/g, '')
  const dripWithR = drips.map((d) => ({
    ...d,
    R: Math.max(d.width * 1.15, 6),
  }))
  const maxLen = Math.max(...dripWithR.map((d) => d.length))
  const totalHeight = bandHeight + maxLen + 4

  return (
    <div
      aria-hidden
      className={cn('pointer-events-none relative w-full overflow-hidden', className)}
      style={{ height: `${totalHeight}px` }}
    >
      {/* Band with wavy bottom edge */}
      <svg
        className="absolute inset-x-0 top-0 w-full"
        preserveAspectRatio="none"
        viewBox={`0 0 1200 ${bandHeight + 18}`}
        style={{ height: `${bandHeight + 18}px` }}
      >
        <defs>
          <linearGradient id={`${idBase}-band`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--purple-light)" />
            <stop offset="45%" stopColor="var(--purple)" />
            <stop offset="100%" stopColor="#5B21B6" />
          </linearGradient>
        </defs>
        <path
          d={`M0 0 L1200 0 L1200 ${bandHeight - 2}
             C1140 ${bandHeight + 8}, 1080 ${bandHeight - 6}, 1020 ${bandHeight + 4}
             C960 ${bandHeight + 12}, 900 ${bandHeight - 4}, 840 ${bandHeight + 6}
             C780 ${bandHeight + 14}, 720 ${bandHeight - 2}, 660 ${bandHeight + 8}
             C600 ${bandHeight + 16}, 540 ${bandHeight - 4}, 480 ${bandHeight + 6}
             C420 ${bandHeight + 14}, 360 ${bandHeight - 8}, 300 ${bandHeight + 4}
             C240 ${bandHeight + 12}, 180 ${bandHeight - 4}, 120 ${bandHeight + 6}
             C60 ${bandHeight + 14}, 30 ${bandHeight - 2}, 0 ${bandHeight + 4} Z`}
          fill={`url(#${idBase}-band)`}
        />
      </svg>

      {dripWithR.map((drip, i) => {
        const { width: w, length, R } = drip
        const vbW = 2 * R + 2
        const cx = vbW / 2
        const gradId = `${idBase}-drip-${i}`
        return (
          <motion.svg
            key={i}
            className="absolute"
            style={{
              left: `${drip.x}%`,
              top: `${bandHeight - 6}px`,
              transform: 'translateX(-50%)',
            }}
            width={vbW}
            height={length + 2}
            viewBox={`0 0 ${vbW} ${length + 2}`}
            initial={reduce ? false : { clipPath: 'inset(0 0 100% 0)' }}
            whileInView={reduce ? undefined : { clipPath: 'inset(0 0 0% 0)' }}
            viewport={{ once: true, margin: '-30px' }}
            transition={{
              duration: 0.75,
              delay: drip.delay,
              ease: [0.22, 0.9, 0.4, 1.05] as [number, number, number, number],
            }}
          >
            <defs>
              <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--purple-light)" />
                <stop offset="35%" stopColor="var(--purple)" />
                <stop offset="100%" stopColor="#5B21B6" />
              </linearGradient>
              <radialGradient
                id={`${gradId}-shine`}
                cx="30%"
                cy="25%"
                r="55%"
              >
                <stop offset="0%" stopColor="rgba(255,255,255,0.6)" />
                <stop offset="55%" stopColor="rgba(255,255,255,0.12)" />
                <stop offset="100%" stopColor="rgba(255,255,255,0)" />
              </radialGradient>
            </defs>
            <path d={dripPath(w, length, R)} fill={`url(#${gradId})`} />
            <circle
              cx={cx - R * 0.25}
              cy={length - R - R * 0.2}
              r={R * 0.7}
              fill={`url(#${gradId}-shine)`}
            />
          </motion.svg>
        )
      })}
    </div>
  )
}
