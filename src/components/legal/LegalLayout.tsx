import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { Nav } from '@/components/landing/Nav'
import { Footer } from '@/components/landing/Footer'

type Props = {
  title: string
  updatedAt: string
  children: ReactNode
}

export function LegalLayout({ title, updatedAt, children }: Props) {
  return (
    <>
      <Nav />
      <main className="pt-[58px]">
        <div className="container-page py-16 md:py-24">
          <div className="mx-auto max-w-[720px]">
            <Link
              to="/"
              className="inline-flex items-center gap-1.5 text-[13px] font-medium text-text-2 transition-colors hover:text-text"
            >
              <ArrowLeft size={14} strokeWidth={2.5} />
              Volver al inicio
            </Link>
            <h1
              className="mt-6 font-display font-extrabold leading-[1.1] tracking-[-0.03em] text-text"
              style={{ fontSize: 'clamp(32px, 4vw, 44px)' }}
            >
              {title}
            </h1>
            <p className="mt-3 text-[13px] text-text-3">
              Última actualización: {updatedAt}
            </p>
            <div className="legal-prose mt-10 text-[15px] leading-[1.75] text-text-2">
              {children}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
