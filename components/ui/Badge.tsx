import { cn } from '@/lib/cn'

export function Badge({
  children,
  className,
  dot = true,
}: {
  children: React.ReactNode
  className?: string
  dot?: boolean
}) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-2 rounded-full border border-border-2 bg-surface-2/70 px-3 py-1 text-[12px] font-medium text-text-2 backdrop-blur',
        className
      )}
    >
      {dot && (
        <span className="relative inline-flex h-1.5 w-1.5">
          <span className="absolute inset-0 animate-ping rounded-full bg-amber opacity-60" />
          <span className="relative inline-block h-1.5 w-1.5 rounded-full bg-amber" />
        </span>
      )}
      {children}
    </span>
  )
}
