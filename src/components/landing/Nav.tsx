import { useEffect, useState } from 'react'
import { ArrowRight, Menu, X } from 'lucide-react'
import { Logo } from '@/components/ui/Logo'
import { cn } from '@/lib/cn'

const tabs = [
  { label: 'Producto', href: '/#producto' },
  { label: 'Módulos', href: '/#modulos' },
  { label: 'Asistente', href: '/#whatsapp' },
  { label: 'FAQ', href: '/#faq' },
  { label: 'Contacto', href: '/#contacto' },
]

export function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 h-[58px] backdrop-blur-xl transition-colors',
        scrolled
          ? 'bg-[rgba(var(--section-fade),0.78)] border-b border-border'
          : 'bg-[rgba(var(--section-fade),0.55)] border-b border-transparent',
      )}
    >
      <div className="container-page flex h-full items-center justify-between">
        <a href="/" className="flex items-center" aria-label="Pintana — Inicio">
          <Logo />
        </a>

        <nav
          aria-label="Secciones"
          className="pointer-events-auto absolute left-1/2 hidden -translate-x-1/2 items-center gap-1 rounded-full border border-border bg-surface-2/80 p-1 backdrop-blur md:flex"
        >
          {tabs.map((t) => (
            <a
              key={t.href}
              href={t.href}
              className="rounded-full px-3.5 py-1.5 text-[13px] font-medium text-text-2 transition-colors hover:bg-surface-3 hover:text-text"
            >
              {t.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href="/#contacto"
            className="group inline-flex items-center gap-1.5 rounded-full border border-border-2 bg-surface-2 px-3.5 py-1.5 text-[13px] font-medium text-text transition-all duration-150 hover:border-text-3 hover:bg-surface-3"
          >
            Solicitar demo
            <ArrowRight
              size={13}
              strokeWidth={2.5}
              className="transition-transform duration-150 group-hover:translate-x-0.5"
            />
          </a>
          <button
            type="button"
            aria-label="Abrir menú"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="ml-1 inline-flex h-9 w-9 items-center justify-center rounded-md border border-border bg-surface-2 text-text-2 transition-colors hover:text-text md:hidden"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-border bg-[rgba(var(--section-fade),0.95)] backdrop-blur-xl md:hidden">
          <div className="container-page flex flex-col py-3">
            {tabs.map((t) => (
              <a
                key={t.href}
                href={t.href}
                onClick={() => setOpen(false)}
                className="rounded-md px-2 py-2.5 text-[14px] font-medium text-text-2 transition-colors hover:bg-surface-2 hover:text-text"
              >
                {t.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  )
}
