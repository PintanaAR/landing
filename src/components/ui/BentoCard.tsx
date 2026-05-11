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
        'group relative isolate overflow-hidden rounded-2xl border border-border bg-surface-1 p-6 transition-colors hover:border-border-2 card-mouse-glow',
        topGlow && 'card-glow',
        className
      )}
    >
      {children}
    </div>
  )
}
