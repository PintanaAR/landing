'use client'

import { useEffect, useRef, useState } from 'react'
import { useInView, animate } from 'framer-motion'
import { cn } from '@/lib/cn'

type Stat = {
  value: number
  format: (n: number) => string
  label: string
  accent?: boolean
}

const stats: Stat[] = [
  {
    value: 120,
    format: (n) => `+${Math.round(n)}`,
    label: 'Pinturerías activas',
  },
  {
    value: 38,
    format: (n) => `${Math.round(n)}%`,
    label: 'Menos tiempo en cierre de caja',
    accent: true,
  },
  {
    value: 2.4,
    format: (n) => `${n.toFixed(1)}M`,
    label: 'Tickets emitidos en AFIP',
  },
  {
    value: 99.97,
    format: (n) => `${n.toFixed(2)}%`,
    label: 'Disponibilidad del servicio',
    accent: true,
  },
]

function CountUp({ stat }: { stat: Stat }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [display, setDisplay] = useState(stat.format(0))
  const [pulse, setPulse] = useState(false)

  useEffect(() => {
    if (!inView) return
    const controls = animate(0, stat.value, {
      duration: 1.5,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setDisplay(stat.format(v)),
      onComplete: () => {
        if (stat.accent) {
          setPulse(true)
          setTimeout(() => setPulse(false), 220)
        }
      },
    })
    return () => controls.stop()
  }, [inView, stat])

  return (
    <span
      ref={ref}
      className={cn(
        'inline-block font-display text-[42px] font-extrabold leading-none tracking-[-0.03em] transition-transform duration-200',
        pulse && 'scale-[1.04]',
        stat.accent
          ? 'bg-gradient-to-b from-purple-light to-purple bg-clip-text text-transparent'
          : 'text-text'
      )}
    >
      {display}
    </span>
  )
}

export function Stats() {
  return (
    <section
      aria-label="Resultados"
      className="relative border-y border-border bg-bg"
    >
      <div className="container-page">
        <div className="grid grid-cols-2 lg:grid-cols-4">
          {stats.map((s, i) => (
            <div
              key={s.label}
              className={cn(
                'px-4 py-10 sm:px-6 md:py-14',
                i !== 0 && 'lg:border-l border-border',
                i % 2 !== 0 && 'border-l border-border lg:border-l',
                i >= 2 && 'border-t border-border lg:border-t-0'
              )}
            >
              <CountUp stat={s} />
              <p className="mt-3 text-[13px] leading-[1.5] text-text-2">
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
