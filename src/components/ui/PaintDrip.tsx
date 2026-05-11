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
  { x: 5, width: 7, length: 64, delay: 0.05 },
  { x: 14, width: 5, length: 36, delay: 0.18 },
  { x: 23, width: 9, length: 112, delay: 0.08 },
  { x: 31, width: 4, length: 24, delay: 0.22 },
  { x: 40, width: 8, length: 84, delay: 0.04 },
  { x: 49, width: 6, length: 50, delay: 0.16 },
  { x: 58, width: 10, length: 128, delay: 0.1 },
  { x: 66, width: 5, length: 40, delay: 0.24 },
  { x: 75, width: 7, length: 70, delay: 0.07 },
  { x: 84, width: 6, length: 92, delay: 0.14 },
  { x: 93, width: 4, length: 30, delay: 0.2 },
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
  const reactId = useId()
  const gradId = `paint-drip-grad-${reactId.replace(/:/g, '')}`
  const maxLen = Math.max(...drips.map((d) => d.length))
  const totalHeight = bandHeight + maxLen + 4

  return (
    <div
      aria-hidden
      className={cn('pointer-events-none relative w-full overflow-hidden', className)}
      style={{ height: `${totalHeight}px` }}
    >
      <svg width="0" height="0" style={{ position: 'absolute' }}>
        <defs>
          <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--purple-light)" />
            <stop offset="35%" stopColor="var(--purple)" />
            <stop offset="100%" stopColor="#5B21B6" />
          </linearGradient>
        </defs>
      </svg>

      <svg
        className="absolute inset-x-0 top-0 w-full"
        preserveAspectRatio="none"
        viewBox={`0 0 1200 ${bandHeight + 12}`}
        style={{ height: `${bandHeight + 12}px` }}
      >
        <path
          d={`M0 0 L1200 0 L1200 ${bandHeight - 2}
             C1140 ${bandHeight + 8}, 1080 ${bandHeight - 6}, 1020 ${bandHeight + 4}
             C960 ${bandHeight + 12}, 900 ${bandHeight - 4}, 840 ${bandHeight + 6}
             C780 ${bandHeight + 14}, 720 ${bandHeight - 2}, 660 ${bandHeight + 8}
             C600 ${bandHeight + 16}, 540 ${bandHeight - 4}, 480 ${bandHeight + 6}
             C420 ${bandHeight + 14}, 360 ${bandHeight - 8}, 300 ${bandHeight + 4}
             C240 ${bandHeight + 12}, 180 ${bandHeight - 4}, 120 ${bandHeight + 6}
             C60 ${bandHeight + 14}, 30 ${bandHeight - 2}, 0 ${bandHeight + 4} Z`}
          fill={`url(#${gradId})`}
        />
      </svg>

      {drips.map((drip, i) => {
        const w = drip.width
        const vbW = w + 2
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
            height={drip.length}
            viewBox={`0 0 ${vbW} ${drip.length}`}
            initial={reduce ? { scaleY: 1 } : { scaleY: 0 }}
            whileInView={reduce ? undefined : { scaleY: 1 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{
              duration: 0.6,
              delay: drip.delay,
              ease: [0.34, 1.18, 0.64, 1] as [number, number, number, number],
            }}
          >
            <path
              d={`M ${(vbW - w) / 2} 0
                  L ${(vbW + w) / 2} 0
                  L ${(vbW + w) / 2 + 0.4} ${drip.length - w * 0.9}
                  Q ${(vbW + w * 1.4) / 2} ${drip.length}, ${vbW / 2} ${drip.length}
                  Q ${(vbW - w * 1.4) / 2} ${drip.length}, ${(vbW - w) / 2 - 0.4} ${drip.length - w * 0.9}
                  Z`}
              fill={`url(#${gradId})`}
            />
          </motion.svg>
        )
      })}
    </div>
  )
}
