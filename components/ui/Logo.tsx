import { cn } from '@/lib/cn'

export function Logo({ className }: { className?: string }) {
  return (
    <div className={cn('flex items-center gap-2.5', className)}>
      <span
        aria-hidden
        className="relative inline-flex h-7 w-7 items-center justify-center rounded-[7px] bg-purple text-white shadow-[0_4px_14px_-2px_var(--purple-glow),inset_0_1px_0_rgba(255,255,255,0.35)]"
      >
        <span className="font-display text-[15px] font-extrabold leading-none">P</span>
      </span>
      <span className="font-display text-[17px] font-extrabold tracking-[-0.02em] text-text">
        Pintana
      </span>
    </div>
  )
}
