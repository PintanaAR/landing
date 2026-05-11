import { cn } from '@/lib/cn'

type Props = {
  size?: number
  className?: string
  title?: string
}

export function PintanaIcon({ size = 24, className, title }: Props) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 56 56"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role={title ? 'img' : undefined}
      aria-hidden={title ? undefined : true}
      className={cn('shrink-0', className)}
    >
      {title ? <title>{title}</title> : null}
      <g transform="translate(28,28)">
        <path
          d="M0,-20 C3,-11 14,-4 14,8 A14,14 0 0 1 -14,8 C-14,-4 -3,-11 0,-20 Z"
          fill="#3B1FA8"
        />
        <path
          d="M0,-20 C3,-11 14,-4 14,8 A14,14 0 0 1 0,22 L0,-20 Z"
          fill="#6D28D9"
        />
        <path
          d="M0,-20 C-3,-11 -14,-4 -14,8 A14,14 0 0 0 0,22 L0,-20 Z"
          fill="#8B5CF6"
        />
        <path
          d="M0,-20 C1.5,-11 3.5,-4 3,8 C1.5,16 0,22 0,22 C0,22 -1.5,16 -3,8 C-3.5,-4 -1.5,-11 0,-20 Z"
          fill="#A78BFA"
          opacity="0.45"
        />
        <ellipse
          cx="-4"
          cy="0"
          rx="3.5"
          ry="6"
          fill="rgba(255,255,255,0.22)"
          transform="rotate(-15 -4 0)"
        />
      </g>
    </svg>
  )
}
