import { Link, useParams } from 'react-router-dom'
import { findEntry, type DevVariant } from '@/dev/registry'

// /dev/variants/:component — Side-by-side render of every registered variant
// for a single component, including the current canonical implementation as
// "current". Variants are declared in src/dev/registry.ts.

export function DevVariants() {
  const { component } = useParams<{ component: string }>()
  const entry = findEntry(component)

  if (!entry) {
    return (
      <div className="min-h-screen bg-neutral-100 flex items-center justify-center p-8">
        <div className="text-center max-w-md">
          <div className="font-display text-[22px] font-bold mb-2">
            Componente no registrado
          </div>
          <Link to="/dev/preview" className="text-[13px] text-purple hover:underline">
            ← Volver a /dev/preview
          </Link>
        </div>
      </div>
    )
  }

  const variants: DevVariant[] = [
    {
      id: 'current',
      label: 'Current',
      thesis: 'Versión canónica actual en src/components/landing/.',
      component: entry.component,
    },
    ...(entry.variants ?? []),
  ]

  return (
    <div className="min-h-screen bg-neutral-100">
      <header className="sticky top-0 z-50 flex items-center justify-between border-b border-border bg-white/85 backdrop-blur-md px-6 py-3">
        <div>
          <div className="text-[11px] font-semibold uppercase tracking-[0.1em] text-text-3">
            /dev/variants
          </div>
          <div className="font-display text-[16px] font-bold tracking-[-0.02em]">
            {entry.name} · {variants.length} variants
          </div>
        </div>
        <nav className="flex items-center gap-4 text-[12px]">
          <Link to="/dev/preview" className="text-text-2 hover:text-text">
            ← Preview
          </Link>
          <Link
            to={`/dev/compare/${entry.slug}`}
            className="text-text-2 hover:text-text"
          >
            Compare
          </Link>
        </nav>
      </header>

      {variants.length === 1 ? (
        <EmptyState slug={entry.slug} name={entry.name} />
      ) : (
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-0">
          {variants.map((variant) => (
            <VariantCard key={variant.id} variant={variant} />
          ))}
        </div>
      )}
    </div>
  )
}

function VariantCard({ variant }: { variant: DevVariant }) {
  return (
    <article className="border-b border-r border-border bg-white">
      <div className="border-b border-border px-4 py-3 flex items-start justify-between gap-4">
        <div>
          <div className="text-[10px] font-semibold uppercase tracking-[0.1em] text-text-3">
            {variant.id}
          </div>
          <div className="font-display text-[14px] font-bold tracking-[-0.01em]">
            {variant.label}
          </div>
          {variant.thesis && (
            <p className="mt-1 text-[11px] text-text-2 max-w-prose">
              {variant.thesis}
            </p>
          )}
        </div>
      </div>
      <div className="bg-bg">
        <variant.component />
      </div>
    </article>
  )
}

function EmptyState({ slug, name }: { slug: string; name: string }) {
  return (
    <div className="flex items-center justify-center p-16">
      <div className="max-w-lg text-center">
        <div className="font-display text-[18px] font-bold mb-2">
          Sin variantes todavía
        </div>
        <p className="text-[13px] text-text-2 mb-4">
          No hay variantes registradas para <strong>{name}</strong>. Para
          empezar a explorar variantes:
        </p>
        <ol className="text-left text-[12px] text-text-2 space-y-2 bg-white border border-border rounded p-4">
          <li>
            1. Creá <code className="font-mono text-[11px]">src/components/landing/{name}/variants/V1Compact.tsx</code>
          </li>
          <li>
            2. Importala en{' '}
            <code className="font-mono text-[11px]">src/dev/registry.ts</code>{' '}
            y agregala al campo <code className="font-mono">variants</code> del
            entry <code className="font-mono">{slug}</code>
          </li>
          <li>3. Recargá esta página</li>
        </ol>
      </div>
    </div>
  )
}
