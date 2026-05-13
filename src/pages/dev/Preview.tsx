import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { devRegistry } from '@/dev/registry'

// /dev/preview — renders every landing component in its own section so they
// can be reviewed in isolation, with a sticky TOC and a viewport-width
// simulator. Dev-only: guarded by import.meta.env.DEV at the route level.

type Viewport = 'mobile' | 'tablet' | 'desktop' | 'full'

const VIEWPORT_WIDTHS: Record<Viewport, number | null> = {
  mobile: 375,
  tablet: 768,
  desktop: 1440,
  full: null,
}

export function DevPreview() {
  const [viewport, setViewport] = useState<Viewport>('desktop')
  const [active, setActive] = useState<string | null>(null)

  // Track which section is in view for TOC highlighting.
  useEffect(() => {
    const sections = devRegistry
      .map((e) => document.getElementById(`section-${e.slug}`))
      .filter((el): el is HTMLElement => !!el)

    const obs = new IntersectionObserver(
      (entries) => {
        const hit = entries.find((e) => e.isIntersecting)
        if (hit) setActive(hit.target.id.replace(/^section-/, ''))
      },
      { rootMargin: '-30% 0px -60% 0px', threshold: 0 },
    )
    sections.forEach((s) => obs.observe(s))
    return () => obs.disconnect()
  }, [])

  const width = VIEWPORT_WIDTHS[viewport]
  const wrapperStyle = useMemo(
    () => (width ? { maxWidth: `${width}px` } : undefined),
    [width],
  )

  return (
    <div className="min-h-screen bg-neutral-100 text-text">
      {/* Sticky sidebar TOC */}
      <aside className="fixed left-0 top-0 z-50 h-screen w-[260px] overflow-y-auto border-r border-border bg-white/80 backdrop-blur-md">
        <div className="px-5 py-5 border-b border-border">
          <div className="text-[11px] font-semibold uppercase tracking-[0.1em] text-text-2">
            Pintana · Dev
          </div>
          <div className="mt-1 font-display text-[18px] font-bold tracking-[-0.02em]">
            /dev/preview
          </div>
        </div>

        <div className="px-5 py-4 border-b border-border">
          <div className="text-[10px] font-semibold uppercase tracking-[0.1em] text-text-3 mb-2">
            Viewport
          </div>
          <div className="grid grid-cols-4 gap-1">
            {(Object.keys(VIEWPORT_WIDTHS) as Viewport[]).map((v) => (
              <button
                key={v}
                onClick={() => setViewport(v)}
                className={`rounded px-2 py-1.5 text-[11px] font-medium transition-colors ${
                  viewport === v
                    ? 'bg-text text-bg'
                    : 'bg-surface-2 text-text-2 hover:bg-surface-3'
                }`}
              >
                {v === 'full' ? '100%' : v[0].toUpperCase()}
              </button>
            ))}
          </div>
          <div className="mt-2 text-[10px] text-text-3">
            {width ? `${width}px` : 'Full width'}
          </div>
        </div>

        <nav className="py-2">
          {devRegistry.map((entry) => (
            <a
              key={entry.slug}
              href={`#section-${entry.slug}`}
              className={`block px-5 py-2 text-[13px] transition-colors ${
                active === entry.slug
                  ? 'bg-purple-soft text-purple font-semibold'
                  : 'text-text-2 hover:bg-surface-2 hover:text-text'
              }`}
            >
              <div className="font-medium">{entry.name}</div>
              {entry.description && (
                <div className="mt-0.5 text-[11px] text-text-3 line-clamp-2">
                  {entry.description}
                </div>
              )}
            </a>
          ))}
        </nav>

        <div className="px-5 py-4 border-t border-border space-y-2">
          <Link
            to="/"
            className="block text-[11px] text-text-2 hover:text-text"
          >
            ← Volver al sitio
          </Link>
          <div className="text-[10px] text-text-3 leading-relaxed">
            Nota: componentes con <code>position:fixed</code> (Nav) ignoran el
            ancho de viewport simulado.
          </div>
        </div>
      </aside>

      {/* Main content */}
      <main className="pl-[260px]">
        {devRegistry.map((entry) => (
          <section
            key={entry.slug}
            id={`section-${entry.slug}`}
            className="border-b border-border"
          >
            <header className="sticky top-0 z-10 border-b border-border bg-white/80 backdrop-blur-md px-6 py-3 flex items-center justify-between">
              <div>
                <div className="font-display text-[15px] font-bold tracking-[-0.01em]">
                  {entry.name}
                </div>
                <div className="text-[11px] text-text-3 font-mono">
                  {entry.slug}
                </div>
              </div>
              <div className="flex items-center gap-3 text-[11px]">
                <Link
                  to={`/dev/compare/${entry.slug}`}
                  className="text-text-2 hover:text-text underline-offset-4 hover:underline"
                >
                  Compare
                </Link>
                <Link
                  to={`/dev/variants/${entry.slug}`}
                  className="text-text-2 hover:text-text underline-offset-4 hover:underline"
                >
                  Variants
                </Link>
              </div>
            </header>

            <div className="bg-bg">
              <div className="mx-auto" style={wrapperStyle}>
                <entry.component />
              </div>
            </div>
          </section>
        ))}
        <div className="px-6 py-12 text-center text-[12px] text-text-3">
          {devRegistry.length} components registered.
        </div>
      </main>
    </div>
  )
}
