import type { Metadata } from 'next'
import { Bricolage_Grotesque, DM_Sans } from 'next/font/google'
import '../styles/globals.css'

const display = Bricolage_Grotesque({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
  weight: ['400', '600', '700', '800'],
})

const body = DM_Sans({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
})

export const metadata: Metadata = {
  metadataBase: new URL('https://pintana.com.ar'),
  title: 'Pintana — ERP para Pinturerías Argentinas',
  description:
    'Sistema de gestión integral para pinturerías: ERP, punto de venta, inventario y CRM en una plataforma. Diseñado para el mercado argentino.',
  keywords: [
    'ERP pintería',
    'sistema gestión pintería',
    'punto de venta pintería argentina',
    'software pintería',
  ],
  openGraph: {
    title: 'Pintana — El sistema que su pintería merecía',
    description: 'ERP, POS, inventario y CRM para pinturerías argentinas.',
    images: [{ url: '/og.png', width: 1200, height: 630 }],
    locale: 'es_AR',
    type: 'website',
  },
  twitter: { card: 'summary_large_image' },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es-AR" className={`${display.variable} ${body.variable}`}>
      <body className="min-h-screen bg-bg text-text font-body">
        {children}
      </body>
    </html>
  )
}
