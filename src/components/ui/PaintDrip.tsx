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
  { x: 5, width: 9, length: 70, delay: 0.05 },
  { x: 13, width: 6, length: 38, delay: 0.18 },
  { x: 22, width: 12, length: 120, delay: 0.08 },
  { x: 30, width: 5, length: 26, delay: 0.22 },
  { x: 40, width: 10, length: 90, delay: 0.04 },
  { x: 48, width: 7, length: 54, delay: 0.16 },
  { x: 58, width: 14, length: 140, delay: 0.1 },
  { x: 67, width: 6, length: 44, delay: 0.24 },
  { x: 75, width: 9, length: 78, delay: 0.07 },
  { x: 84, width: 8, length: 100, delay: 0.14 },
  { x: 93, width: 5, length: 32, delay: 0.2 },
]

export function PaintDrip({
  className,
  drips = DEFAULT_DRIPS,
  bandHeight = 30,
}: {
  className?: string
  drips?: Drip[]
  bandHeight?: number
}) {
  const reduce = useReducedMotion()
  const idBase = useId().replace(/:/g, '')
  const maxLen = Math.max(...drips.map((d) => d.length))
  const maxBulb = Math.max(...drips.map((d) => Math.max(d.width * 0.85, d.width / 2 + 2)))
  const totalHeight = bandHeight + maxLen + maxBulb + 6

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
        viewBox={`0 0 1200 ${bandHeight + 16}`}
        style={{ height: `${bandHeight + 16}px` }}
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

      {drips.map((drip, i) => {
        const w = drip.width
        const bulbR = Math.max(w * 0.85, w / 2 + 2)
        const vbW = bulbR * 2 + 2
        const cx = vbW / 2
        const length = drip.length
        const stemHeight = Math.max(length - bulbR, 2)
        const gradId = `${idBase}-drip-${i}`
        return (
          <motion.svg
            key={i}
            className="absolute"
            style={{
              left: `${drip.x}%`,
              top: `${bandHeight - 4}px`,
              transform: 'translateX(-50%)',
              transformOrigin: 'top center',
            }}
            width={vbW}
            height={length + 2}
            viewBox={`0 0 ${vbW} ${length + 2}`}
            initial={reduce ? { scaleY: 1 } : { scaleY: 0 }}
            whileInView={reduce ? undefined : { scaleY: 1 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{
              duration: 0.65,
              delay: drip.delay,
              ease: [0.34, 1.18, 0.64, 1] as [number, number, number, number],
            }}
          >
            <defs>
              <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--purple-light)" />
                <stop offset="35%" stopColor="var(--purple)" />
                <stop offset="80%" stopColor="var(--purple)" />
                <stop offset="100%" stopColor="#5B21B6" />
              </linearGradient>
              <radialGradient id={`${gradId}-shine`} cx="35%" cy="30%" r="65%">
                <stop offset="0%" stopColor="rgba(255,255,255,0.55)" />
                <stop offset="60%" stopColor="rgba(255,255,255,0)" />
              </radialGradient>
            </defs>
            <rect
              x={cx - w / 2}
              y={0}
              width={w}
              height={stemHeight + 1}
              rx={w / 3}
              fill={`url(#${gradId})`}
            />
            <circle
              cx={cx}
              cy={length - bulbR}
              r={bulbR}
              fill={`url(#${gradId})`}
            />
            <circle
              cx={cx}
              cy={length - bulbR}
              r={bulbR}
              fill={`url(#${gradId}-shine)`}
            />
          </motion.svg>
        )
      })}
    </div>
  )
}
