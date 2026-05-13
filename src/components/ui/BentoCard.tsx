import { useCallback } from 'react'
import type { MouseEvent, ReactNode } from 'react'
import { cn } from '@/lib/cn'

export function BentoCard({
  children,
  className,
  topGlow = false,
}: {
  children: ReactNode
  className?: string
  topGlow?: boolean
}) {
  const onMove = useCallback((e: MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    e.currentTarget.style.setProperty('--cx', `${e.clientX - rect.left}px`)
    e.currentTarget.style.setProperty('--cy', `${e.clientY - rect.top}px`)
  }, [])

  return (
    <div
      onMouseMove={onMove}
      className={cn(
        'group relative isolate overflow-hidden rounded-2xl border border-border bg-bg p-6 shadow-[0_1px_2px_rgba(15,17,23,0.04),0_4px_12px_rgba(15,17,23,0.04)] transition-all duration-300 hover:-translate-y-[3px] hover:border-border-2 hover:shadow-[0_2px_4px_rgba(15,17,23,0.06),0_12px_28px_rgba(15,17,23,0.08)] card-mouse-glow',
        topGlow && 'card-glow',
        className
      )}
    >
      {children}
    </div>
  )
}
