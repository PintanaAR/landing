import { cn } from '@/lib/cn'

type Splatter = {
  cx: number
  cy: number
  size: number
  rotation: number
}

const SHAPES = [
  // Each shape is a path inside a 100x100 viewBox, roughly centered at (50,50)
  'M50 30 Q56 38 64 36 Q72 38 70 48 Q76 54 70 60 Q72 70 60 68 Q54 76 46 70 Q36 74 34 64 Q26 60 30 52 Q26 42 36 42 Q42 32 50 30 Z M22 26 a2 2 0 1 0 0.1 0 Z M78 70 a3 3 0 1 0 0.1 0 Z',
  'M48 28 Q58 30 60 38 Q68 38 66 48 Q72 56 64 60 Q66 70 56 70 Q50 76 42 70 Q32 72 32 62 Q24 56 32 50 Q26 42 36 40 Q40 30 48 28 Z M70 22 a2.5 2.5 0 1 0 0.1 0 Z',
  'M50 32 Q58 36 60 42 Q70 42 68 52 Q74 58 66 62 Q68 72 58 70 Q52 78 44 70 Q34 72 34 62 Q26 58 32 50 Q28 42 38 40 Q42 32 50 32 Z M30 78 a2 2 0 1 0 0.1 0 Z',
]

const DEFAULTS: Splatter[] = [
  { cx: 12, cy: 18, size: 80, rotation: 12 },
  { cx: 86, cy: 30, size: 60, rotation: -22 },
  { cx: 20, cy: 78, size: 50, rotation: 35 },
  { cx: 78, cy: 82, size: 90, rotation: -8 },
]

export function PaintSplatter({
  splatters = DEFAULTS,
  className,
  color = 'var(--purple)',
  opacity = 0.05,
}: {
  splatters?: Splatter[]
  className?: string
  color?: string
  opacity?: number
}) {
  return (
    <div
      aria-hidden
      className={cn(
        'pointer-events-none absolute inset-0 overflow-hidden',
        className,
      )}
    >
      {splatters.map((s, i) => (
        <svg
          key={i}
          viewBox="0 0 100 100"
          style={{
            position: 'absolute',
            left: `${s.cx}%`,
            top: `${s.cy}%`,
            width: `${s.size}px`,
            height: `${s.size}px`,
            transform: `translate(-50%, -50%) rotate(${s.rotation}deg)`,
            opacity,
          }}
        >
          <path d={SHAPES[i % SHAPES.length]} fill={color} />
        </svg>
      ))}
    </div>
  )
}
