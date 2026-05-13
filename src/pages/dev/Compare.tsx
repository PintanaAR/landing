import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { findEntry } from '@/dev/registry'

// /dev/compare/:component — Side-by-side reference vs implementation.
// Reference image is served from /design-references/<slug>/reference.png by a
// small Vite dev middleware (see vite.config.ts).

export function DevCompare() {
  const { component } = useParams<{ component: string }>()
  const entry = findEntry(component)
  const [refLoaded, setRefLoaded] = useState<boolean | null>(null)

  if (!entry) {
    return <NotFound slug={component} />
  }

  const refSrc = `/design-references/${entry.slug}/reference.png`

  return (
    <div className="min-h-screen bg-neutral-100">
      <Header
        title={`Compare: ${entry.name}`}
        slug={entry.slug}
        currentRoute="compare"
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
        {/* Reference */}
        <div className="border-r border-border bg-white">
          <PanelHeader label="Referencia" subLabel={refSrc} />
          <div className="p-4">
            {refLoaded === false ? (
              <MissingReference path={refSrc} slug={entry.slug} />
            ) : (
              <img
                src={refSrc}
                alt={`Reference for ${entry.name}`}
                onLoad={() => setRefLoaded(true)}
                onError={() => setRefLoaded(false)}
                className="w-full h-auto rounded border border-border"
              />
            )}
          </div>
        </div>

        {/* Implementation */}
        <div className="bg-white">
          <PanelHeader
            label="Implementación actual"
            subLabel={`src/components/landing/${entry.name}.tsx`}
          />
          <div className="bg-bg">
            <entry.component />
          </div>
        </div>
      </div>
    </div>
  )
}

function Header({
  title,
  slug,
  currentRoute,
}: {
  title: string
  slug: string
  currentRoute: 'compare' | 'variants'
}) {
  return (
    <header className="sticky top-0 z-50 flex items-center justify-between border-b border-border bg-white/85 backdrop-blur-md px-6 py-3">
      <div>
        <div className="text-[11px] font-semibold uppercase tracking-[0.1em] text-text-3">
          /dev/{currentRoute}
        </div>
        <div className="font-display text-[16px] font-bold tracking-[-0.02em]">
          {title}
        </div>
      </div>
      <nav className="flex items-center gap-4 text-[12px]">
        <Link to="/dev/preview" className="text-text-2 hover:text-text">
          ← Preview
        </Link>
        <Link
          to={`/dev/preview#section-${slug}`}
          className="text-text-2 hover:text-text"
        >
          In context
        </Link>
        <Link
          to={`/dev/variants/${slug}`}
          className="text-text-2 hover:text-text"
        >
          Variants →
        </Link>
      </nav>
    </header>
  )
}

function PanelHeader({ label, subLabel }: { label: string; subLabel: string }) {
  return (
    <div className="border-b border-border px-4 py-2">
      <div className="text-[10px] font-semibold uppercase tracking-[0.1em] text-text-3">
        {label}
      </div>
      <div className="font-mono text-[10px] text-text-2 truncate">
        {subLabel}
      </div>
    </div>
  )
}

function MissingReference({ path, slug }: { path: string; slug: string }) {
  return (
    <div className="flex flex-col items-center justify-center rounded border border-dashed border-border-2 bg-surface-1 p-10 text-center">
      <div className="font-display text-[16px] font-bold mb-2">
        Falta la referencia
      </div>
      <p className="text-[13px] text-text-2 max-w-md">
        Subí un PNG a:
      </p>
      <code className="mt-2 rounded bg-bg px-3 py-1.5 text-[11px] font-mono text-text border border-border">
        design-references/{slug}/reference.png
      </code>
      <p className="mt-3 text-[11px] text-text-3">
        Path solicitado: <code className="font-mono">{path}</code>
      </p>
    </div>
  )
}

function NotFound({ slug }: { slug?: string }) {
  return (
    <div className="min-h-screen bg-neutral-100 flex items-center justify-center p-8">
      <div className="text-center max-w-md">
        <div className="text-[11px] font-semibold uppercase tracking-[0.1em] text-text-3 mb-2">
          /dev/compare
        </div>
        <div className="font-display text-[22px] font-bold mb-2">
          Componente no registrado
        </div>
        <p className="text-[13px] text-text-2">
          El slug <code className="font-mono">{slug}</code> no existe en el
          registry. Agregalo en{' '}
          <code className="font-mono">src/dev/registry.ts</code>.
        </p>
        <Link
          to="/dev/preview"
          className="mt-4 inline-block text-[13px] text-purple hover:underline"
        >
          ← Volver a /dev/preview
        </Link>
      </div>
    </div>
  )
}
