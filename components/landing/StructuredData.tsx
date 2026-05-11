export function StructuredData() {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Pintana',
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web',
    description:
      'Sistema de gestión integral para pinturerías: ERP, punto de venta, inventario y CRM en una plataforma. Diseñado para el mercado argentino.',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'ARS',
      description: 'Demo gratuita',
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}
