import { Link } from 'react-router-dom'
import { Logo } from '@/components/ui/Logo'

type LinkItem = { label: string; href: string; external?: boolean }

const links: LinkItem[] = [
  { label: 'Privacidad', href: '/privacy' },
  { label: 'Términos', href: '/tos' },
  { label: 'Soporte', href: '/#contacto' },
  { label: 'Contacto', href: '/#contacto' },
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
                {l.href.startsWith('/') && !l.href.includes('#') ? (
                  <Link
                    to={l.href}
                    className="transition-colors hover:text-text"
                  >
                    {l.label}
                  </Link>
                ) : (
                  <a
                    href={l.href}
                    className="transition-colors hover:text-text"
                  >
                    {l.label}
                  </a>
                )}
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div className="border-t border-border">
        <div className="container-page py-5 text-[12px] text-text-3">
          © 2026 Pintana · Hecho en Argentina 🇦🇷
        </div>
      </div>
    </footer>
  )
}
