'use client'

import { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'
import { Logo } from '@/components/ui/Logo'
import { cn } from '@/lib/cn'

const tabs = [
  { label: 'Producto', href: '#producto' },
  { label: 'Módulos', href: '#modulos' },
  { label: 'POS', href: '#pos' },
  { label: 'Contacto', href: '#contacto' },
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
          ? 'bg-[rgba(6,6,8,0.78)] border-b border-border'
          : 'bg-[rgba(6,6,8,0.55)] border-b border-transparent'
      )}
    >
      <div className="container-page flex h-full items-center justify-between">
        <a href="#top" className="flex items-center" aria-label="Pintana — Inicio">
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
            href="#"
            className="hidden text-[13px] font-medium text-text-2 transition-colors hover:text-text md:inline-block"
          >
            Iniciar sesión
          </a>
          <a
            href="#contacto"
            className="btn-primary !px-4 !py-2 !text-[13px]"
          >
            Solicitar demo
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
        <div className="border-t border-border bg-[rgba(6,6,8,0.95)] backdrop-blur-xl md:hidden">
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
            <a
              href="#"
              onClick={() => setOpen(false)}
              className="rounded-md px-2 py-2.5 text-[14px] font-medium text-text-2 transition-colors hover:bg-surface-2 hover:text-text"
            >
              Iniciar sesión
            </a>
          </div>
        </div>
      )}
    </header>
  )
}
