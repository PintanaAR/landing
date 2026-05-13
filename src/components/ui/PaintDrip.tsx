import { useId } from 'react'
import { cn } from '@/lib/cn'

type Drip = {
  x: number
  width: number
  length: number
  delay: number
}

const DEFAULT_DRIPS: Drip[] = [
  { x: 5, width: 8, length: 68, delay: 0.05 },
  { x: 13, width: 6, length: 38, delay: 0.18 },
  { x: 22, width: 12, length: 108, delay: 0.08 },
  { x: 30, width: 5, length: 26, delay: 0.22 },
  { x: 40, width: 10, length: 82, delay: 0.04 },
  { x: 48, width: 7, length: 52, delay: 0.16 },
  { x: 58, width: 13, length: 124, delay: 0.1 },
  { x: 67, width: 6, length: 44, delay: 0.24 },
  { x: 75, width: 9, length: 72, delay: 0.07 },
  { x: 84, width: 8, length: 92, delay: 0.14 },
  { x: 93, width: 5, length: 34, delay: 0.2 },
]

// Ink-black ramp — wet-paint drip imagery. Slightly off-pure-black at the
// band top so it reads as a deep pigment with subtle depth, pooling toward
// pure black at the drip tips. Graphic / editorial feel; doesn't compete
// with the purple brand and reads unambiguously as paint, not as a UI panel.
const SEAM_COLOR = '#16161B' // band bottom = drip top
const MID_DEEP = '#0A0A0D'
const BULB_DEEP = '#000000'
const BAND_LIGHT = '#3A3A42'
const BAND_MID = '#22232A'
const BAND_DEEP = '#16161B'

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
      {/* Cast shadow zone — the band is a physical ledge of paint, and
          the surface immediately below it sits in its shadow. Sits
          BEHIND every drip so drips silhouette over a darker background,
          reading as physically attached to a 3D edge instead of floating
          over a flat surface. Width matches the container; fades to
          transparent within ~48px. */}
      <div
        className="absolute inset-x-0"
        style={{
          top: `${bandHeight - 2}px`,
          height: '54px',
          background:
            'linear-gradient(to bottom, rgba(0,0,0,0.28) 0%, rgba(0,0,0,0.10) 45%, rgba(0,0,0,0) 100%)',
        }}
      />

      {/* Drips render FIRST so the band can paint on top and hide their
          attachment region. The seam between band and drip is no longer
          an exposed connection — it's just where the band ends.
          Intentionally STATIC — drips read as already-set paint, not as
          something rendering in real time. The earlier reveal animation
          looked like a glitch. Motion lives on the actual content
          (cards, KPIs) which is what the user is tracking. */}
      {dripWithR.map((drip, i) => {
        const { width: w, length, R } = drip
        const vbW = 2 * R + 6
        const cx = vbW / 2
        const totalDripH = bandHeight + length
        const gradId = `${idBase}-drip-${i}`
        const shineId = `${idBase}-drip-${i}-shine`
        const path = dripPath(w, length, R, bandHeight)

        return (
          <svg
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
          >
            <defs>
              {/* Body color: mostly flat. Holds SEAM_COLOR through the hidden
                  region AND well past the visible start, then nudges to
                  MID_DEEP only in the bottom third where paint physically
                  pools at the bulb. A flat-ish fill reads as opaque paint;
                  a smooth top-to-bottom gradient reads as glowing slime. */}
              <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={SEAM_COLOR} />
                <stop offset="78%" stopColor={SEAM_COLOR} />
                <stop offset="100%" stopColor={MID_DEEP} />
              </linearGradient>
              {/* Directional shadow: subtle darken on the right side so the
                  drip looks like it has a back side away from the light.
                  Slime is bright on every side; paint isn't. */}
              <linearGradient id={`${gradId}-shadow`} x1="0" y1="0.5" x2="1" y2="0.5">
                <stop offset="0%" stopColor="rgba(0,0,0,0)" />
                <stop offset="55%" stopColor="rgba(0,0,0,0)" />
                <stop offset="100%" stopColor="rgba(0,0,0,0.22)" />
              </linearGradient>
              {/* Specular reflection: small cool highlight on the wet bulb. */}
              <radialGradient id={shineId} cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="rgba(255,255,255,0.45)" />
                <stop offset="45%" stopColor="rgba(255,255,255,0.08)" />
                <stop offset="100%" stopColor="rgba(255,255,255,0)" />
              </radialGradient>
            </defs>
            <g transform={`translate(1, 0)`}>
              <path d={path} fill={`url(#${gradId})`} />
              <path d={path} fill={`url(#${gradId}-shadow)`} />
              <ellipse
                cx={cx - 1 - R * 0.32}
                cy={totalDripH - R * 1.7}
                rx={R * 0.18}
                ry={R * 0.3}
                fill={`url(#${shineId})`}
                transform={`rotate(-22 ${cx - 1 - R * 0.32} ${totalDripH - R * 1.7})`}
              />
            </g>
          </svg>
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
            <stop offset="0%" stopColor={BAND_LIGHT} />
            <stop offset="30%" stopColor={BAND_MID} />
            <stop offset="60%" stopColor={BAND_DEEP} />
            <stop offset="78%" stopColor={SEAM_COLOR} />
            <stop offset="100%" stopColor={SEAM_COLOR} />
          </linearGradient>
          {/* Top-edge highlight — soft falloff over ~3 viewBox units.
              Reads as the lit top face of a horizontal ledge catching
              ambient light from above. */}
          <linearGradient id={`${idBase}-highlight`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgba(255,255,255,0.28)" />
            <stop offset="40%" stopColor="rgba(255,255,255,0.10)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0)" />
          </linearGradient>
          {/* Inner shadow at the band's bottom — the underside of the
              ledge, just before the wavy edge where paint pools and
              drips form. Adds a sense of thickness. */}
          <linearGradient id={`${idBase}-underside`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgba(0,0,0,0)" />
            <stop offset="100%" stopColor="rgba(0,0,0,0.35)" />
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
        {/* Highlight strip sits ON TOP of the band gradient. Only
            covers the top portion so the wavy bottom edge keeps its
            dark seam color where it meets the drips. */}
        <rect
          x="0"
          y="0"
          width="1200"
          height={Math.max(3, bandHeight * 0.12)}
          fill={`url(#${idBase}-highlight)`}
        />
        {/* Underside shadow — bottom 35% of the band darkens, like the
            shaded face of a ledge. Clipped to the wavy-bottom band
            path via the same path used above. */}
        <path
          d={`M0 ${bandHeight * 0.55} L1200 ${bandHeight * 0.55} L1200 ${bandHeight - 2}
             C1140 ${bandHeight + 8}, 1080 ${bandHeight - 6}, 1020 ${bandHeight + 4}
             C960 ${bandHeight + 12}, 900 ${bandHeight - 4}, 840 ${bandHeight + 6}
             C780 ${bandHeight + 14}, 720 ${bandHeight - 2}, 660 ${bandHeight + 8}
             C600 ${bandHeight + 16}, 540 ${bandHeight - 4}, 480 ${bandHeight + 6}
             C420 ${bandHeight + 14}, 360 ${bandHeight - 8}, 300 ${bandHeight + 4}
             C240 ${bandHeight + 12}, 180 ${bandHeight - 4}, 120 ${bandHeight + 6}
             C60 ${bandHeight + 14}, 30 ${bandHeight - 2}, 0 ${bandHeight + 4} Z`}
          fill={`url(#${idBase}-underside)`}
        />
      </svg>
    </div>
  )
}
