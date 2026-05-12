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
  { x: 5, width: 9, length: 78, delay: 0.05 },
  { x: 13, width: 6, length: 44, delay: 0.18 },
  { x: 22, width: 13, length: 132, delay: 0.08 },
  { x: 30, width: 5, length: 30, delay: 0.22 },
  { x: 40, width: 11, length: 96, delay: 0.04 },
  { x: 48, width: 7, length: 60, delay: 0.16 },
  { x: 58, width: 15, length: 152, delay: 0.1 },
  { x: 67, width: 6, length: 50, delay: 0.24 },
  { x: 75, width: 10, length: 84, delay: 0.07 },
  { x: 84, width: 8, length: 108, delay: 0.14 },
  { x: 93, width: 5, length: 38, delay: 0.2 },
]

// Brand purple ramp — pulled from the PintanaIcon paint-drop palette
// so the drip reads as the same paint as the band, not a separate hue.
const SEAM_COLOR = '#5B21B6'
const MID_DEEP = '#4C1D95'
const BULB_DEEP = '#3B1FA8'

// Builds a vase-shaped silhouette: wide attachment at the top (hidden
// behind the band), narrow neck just below the band, then widens into
// the bulb and tapers to a soft tip. Pure cubic Bezier — no arcs.
function dripPath(w: number, visibleL: number, R: number, bandH: number) {
  const cx = R + 2
  const wTop = w * 1.55 // wide where it grabs the band
  const totalH = bandH + visibleL
  const neckY = Math.min(bandH + Math.max(visibleL * 0.12, 6), totalH - R * 1.4 - 4)
  const widestY = totalH - R * 1.25
  const bottomY = totalH
  return [
    `M ${cx - wTop / 2} 0`,
    `L ${cx + wTop / 2} 0`,
    // Right side: wide top → narrowest neck
    `C ${cx + wTop / 2} ${neckY * 0.45},`,
    `${cx + w / 2 + 1} ${neckY * 0.78},`,
    `${cx + w / 2} ${neckY}`,
    // Right side: neck → bulb widest point
    `C ${cx + w / 2} ${neckY + (widestY - neckY) * 0.35},`,
    `${cx + R} ${neckY + (widestY - neckY) * 0.72},`,
    `${cx + R} ${widestY}`,
    // Right side: widest → soft tip (slight inward pinch before bottom)
    `C ${cx + R} ${widestY + (bottomY - widestY) * 0.55},`,
    `${cx + R * 0.5} ${bottomY - 1},`,
    `${cx} ${bottomY}`,
    // Left side (mirror): tip → widest
    `C ${cx - R * 0.5} ${bottomY - 1},`,
    `${cx - R} ${widestY + (bottomY - widestY) * 0.55},`,
    `${cx - R} ${widestY}`,
    // Left side: widest → neck
    `C ${cx - R} ${neckY + (widestY - neckY) * 0.72},`,
    `${cx - w / 2} ${neckY + (widestY - neckY) * 0.35},`,
    `${cx - w / 2} ${neckY}`,
    // Left side: neck → wide top
    `C ${cx - w / 2 - 1} ${neckY * 0.78},`,
    `${cx - wTop / 2} ${neckY * 0.45},`,
    `${cx - wTop / 2} 0`,
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
    R: Math.max(d.width * 1.5, 7),
  }))
  const maxLen = Math.max(...dripWithR.map((d) => d.length))
  const totalHeight = bandHeight + maxLen + 6

  return (
    <div
      aria-hidden
      className={cn('pointer-events-none relative w-full overflow-hidden', className)}
      style={{ height: `${totalHeight}px` }}
    >
      {/* Drips render FIRST so the band can paint on top and hide their
          attachment region. The seam between band and drip is no longer
          an exposed connection — it's just where the band ends. */}
      {dripWithR.map((drip, i) => {
        const { width: w, length, R } = drip
        const vbW = 2 * R + 6
        const cx = vbW / 2
        const totalDripH = bandHeight + length
        const gradId = `${idBase}-drip-${i}`
        const shineId = `${idBase}-drip-${i}-shine`
        // path coords use cx = R + 2; viewBox is R + 3 wide. Inner <g>
        // shifts by 1px so the silhouette sits centered in the viewBox.
        const path = dripPath(w, length, R, bandHeight)

        return (
          <motion.svg
            key={i}
            className="absolute"
            style={{
              left: `${drip.x}%`,
              top: '0px',
              transform: 'translateX(-50%)',
            }}
            width={vbW}
            height={totalDripH + 2}
            viewBox={`0 0 ${vbW} ${totalDripH + 2}`}
            initial={reduce ? false : { clipPath: 'inset(0 0 100% 0)' }}
            whileInView={reduce ? undefined : { clipPath: 'inset(0 0 0% 0)' }}
            viewport={{ once: true, margin: '-30px' }}
            transition={{
              duration: 0.8,
              delay: drip.delay,
              ease: [0.22, 0.9, 0.4, 1.05] as [number, number, number, number],
            }}
          >
            <defs>
              <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
                {/* Hidden + visible-start region: SEAM_COLOR. Even if the
                    wave edge dips lower than expected, the color of the
                    drip at the join is the same flat tone the band ends on. */}
                <stop offset="0%" stopColor={SEAM_COLOR} />
                <stop offset={`${(bandHeight / totalDripH) * 100 + 8}%`} stopColor={SEAM_COLOR} />
                <stop offset="65%" stopColor={MID_DEEP} />
                <stop offset="100%" stopColor={BULB_DEEP} />
              </linearGradient>
              <radialGradient id={shineId} cx="32%" cy="28%" r="48%">
                <stop offset="0%" stopColor="rgba(196,181,253,0.65)" />
                <stop offset="55%" stopColor="rgba(196,181,253,0.18)" />
                <stop offset="100%" stopColor="rgba(196,181,253,0)" />
              </radialGradient>
            </defs>
            <g transform={`translate(1, 0)`}>
              <path d={path} fill={`url(#${gradId})`} />
              <ellipse
                cx={cx - 1 - R * 0.3}
                cy={totalDripH - R * 1.55}
                rx={R * 0.55}
                ry={R * 0.78}
                fill={`url(#${shineId})`}
                transform={`rotate(-12 ${cx - 1 - R * 0.3} ${totalDripH - R * 1.55})`}
              />
            </g>
          </motion.svg>
        )
      })}

      {/* Band paints LAST so it sits on top of every drip's hidden
          attachment region. Lower 22% of the gradient is solid
          SEAM_COLOR so the wavy bottom edge presents a uniform color
          to the drips peeking out below it. */}
      <svg
        className="absolute inset-x-0 top-0 w-full"
        preserveAspectRatio="none"
        viewBox={`0 0 1200 ${bandHeight + 18}`}
        style={{ height: `${bandHeight + 18}px` }}
      >
        <defs>
          <linearGradient id={`${idBase}-band`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--purple-light)" />
            <stop offset="30%" stopColor="var(--purple)" />
            <stop offset="60%" stopColor="#6D28D9" />
            <stop offset="78%" stopColor={SEAM_COLOR} />
            <stop offset="100%" stopColor={SEAM_COLOR} />
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
    </div>
  )
}
