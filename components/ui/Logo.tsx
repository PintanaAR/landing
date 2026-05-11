import { cn } from '@/lib/cn'
import { PintanaIcon } from '@/components/ui/PintanaIcon'

export function Logo({ className }: { className?: string }) {
  return (
    <div className={cn('flex items-center gap-2', className)}>
      <PintanaIcon size={28} title="Pintana" />
      <span className="font-display text-[19px] font-semibold tracking-[-0.02em] text-text">
        Pintana
      </span>
    </div>
  )
}
