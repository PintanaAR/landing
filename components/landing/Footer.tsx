import { Logo } from '@/components/ui/Logo'

const links = [
  { label: 'Privacidad', href: '#' },
  { label: 'Términos', href: '#' },
  { label: 'Soporte', href: '#' },
  { label: 'Contacto', href: '#contacto' },
]

export function Footer() {
  return (
    <footer className="border-t border-border bg-bg">
      <div className="container-page flex flex-col items-start justify-between gap-6 py-10 sm:flex-row sm:items-center">
        <Logo />
        <nav aria-label="Footer">
          <ul className="flex flex-wrap items-center gap-x-6 gap-y-3 text-[13px] text-text-2">
            {links.map((l) => (
              <li key={l.label}>
                <a href={l.href} className="transition-colors hover:text-text">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div className="border-t border-border">
        <div className="container-page py-5 text-[12px] text-text-3">
          © 2025 Pintana · Hecho en Argentina 🇦🇷
        </div>
      </div>
    </footer>
  )
}
