// Single source of truth for site-wide contact info. Swap these values when
// the real addresses, phone, and mailboxes are set up — every component on
// the page reads from here.

export const site = {
  name: 'Pintana',

  email: {
    // General inbox shown in Contact section and Terms of Service.
    general: 'hola@pintana.com.ar',
    // Privacy / data-rights mailbox referenced from the Privacy Policy.
    // Make sure this resolves (either a real mailbox or an alias) before
    // publishing the policy — data-rights requests are legally binding.
    privacy: 'privacidad@pintana.com.ar',
  },

  phone: {
    // Display form (with spaces) shown in the Contact section.
    display: '+54 9 11 6000 0000',
    // Used for the placeholder in the WhatsApp form field.
    placeholder: '+54 9 11 0000 0000',
  },

  location: {
    city: 'Buenos Aires, Argentina',
  },

  // External authorities / official URLs referenced in legal documents.
  links: {
    aaip: 'https://www.argentina.gob.ar/aaip',
  },

  // Stats section — DevRev-style social-proof / credibility band.
  //
  // The <Stats /> component picks the first non-empty list, in order:
  //   1. customerStats  — real customer outcomes (preferred once we have any)
  //   2. productFacts   — factual product capabilities (fallback for 0-client state)
  // If both are empty the section hides itself.
  //
  // When the first pilot client is live, append an entry to customerStats
  // and customerStats will take over automatically. No code changes needed.
  stats: {
    // Real customer outcomes. Shape per entry:
    //   { value: '8',        unit: 'sucursales', label: 'sincronizadas en tiempo real', source: 'Pinturas del Sur' }
    //   { value: '+25%',     unit: '',           label: 'recurrencia de clientes',      source: 'Color House' }
    //   { value: '<1 min',   unit: '',           label: 'cierre de caja diario',        source: 'Pinturería Norte' }
    // Add 3–4 entries when available. Display order = array order.
    customerStats: [] as ReadonlyArray<{
      value: string
      unit?: string
      label: string
      source?: string
    }>,

    // Outcome-driven product facts — used as the credibility band while we
    // don't have customer numbers. Phrased as what the OWNER gets, not what
    // the product includes. Keep entries to 4 (grid layout). value =
    // big punchline; unit = small modifier; label = 1-line proof.
    productFacts: [
      {
        value: '3',
        unit: 'clics',
        label: 'Cierre Z al final del día. Sin cuadrar con Excel.',
      },
      {
        value: '<8s',
        unit: '',
        label: 'Factura ARCA emitida con CAE, lista para imprimir.',
      },
      {
        value: 'En el celu',
        unit: '',
        label: 'Cada venta y cada caja, en tiempo real, estés donde estés.',
      },
      {
        value: '0',
        unit: 'planillas',
        label: 'Stock, listas de precios y cuentas corrientes en un solo lugar.',
      },
    ] as ReadonlyArray<{
      value: string
      unit?: string
      label: string
    }>,
  },

  // Pricing anchor — shown in the <Pricing /> section. Replace the
  // [PENDIENTE] values before publishing. Keep the comparison and note
  // verbatim regardless of the final number.
  pricing: {
    // Headline anchor — "Desde $X por sucursal/mes". Currency is part
    // of the string so we don't bake USD/ARS into copy until pricing
    // is locked. Replace `[PENDIENTE: USD XX]` with the agreed anchor.
    anchor: '[PENDIENTE: USD XX]',
    period: 'por sucursal/mes',
    // Relative-cost framing that lands for SMEs.
    comparison:
      'Cuesta menos que un empleado a medio tiempo. Y trabaja 24/7 en todas tus sucursales.',
    note: 'Presupuesto exacto en la demo, a medida de tu pinturería. Sin setup fee. Sin contratos largos.',
  } as {
    anchor: string
    period: string
    comparison: string
    note: string
  },

  // Social proof — empty until we have real clients. <SocialProof />
  // hides itself when `logos` and `testimonials` are both empty.
  socialProof: {
    logos: [] as ReadonlyArray<{ name: string; src?: string }>,
    testimonials: [] as ReadonlyArray<{
      quote: string
      name: string
      role: string
      photo?: string
    }>,
    // Aggregate counters — rendered alongside logos. `invoicedThisMonth`
    // is a display string, not a raw number, because the figure is
    // meaningless without currency + period framing.
    aggregate: {
      stores: 0,
      branches: 0,
      invoicedThisMonth: '',
    },
  } as {
    logos: ReadonlyArray<{ name: string; src?: string }>
    testimonials: ReadonlyArray<{
      quote: string
      name: string
      role: string
      photo?: string
    }>
    aggregate: {
      stores: number
      branches: number
      invoicedThisMonth: string
    }
  },

  // FAQ section — preempts the most common pre-demo objections from
  // both personas (Persona A = sale de Zeus/Flexxus/Líder; Persona B =
  // viene de Excel + cuaderno + facturador AFIP). Order matters:
  // highest-impact unblockers first. Read by <FAQ />. If the array
  // is empty the section hides itself.
  faq: [
    {
      q: '¿Migran mi base de datos desde Zeus, Flexxus o Líder?',
      a: 'Sí. Exportamos tus productos, precios, clientes, cuentas corrientes y proveedores desde tu sistema actual y los cargamos en Pintana. No reescribís ni un dato a mano.',
    },
    {
      q: '¿Mantienen mi numeración de facturación con ARCA?',
      a: 'Sí. Conservamos la numeración de tus puntos de venta para que no haya saltos ni quiebres ante ARCA. Lo configuramos antes de cortar el sistema viejo.',
    },
    {
      q: '¿Funciona si se corta internet?',
      a: 'Sí. El punto de venta sigue cobrando offline y sincroniza solo cuando vuelve la conexión. No perdés ninguna venta ni cierre de caja.',
    },
    {
      q: '¿Qué pasa con mis datos si decido irme?',
      a: 'Te los llevás. Exportamos toda tu información — productos, clientes, ventas, cuentas corrientes — en formatos abiertos. Sin trampas, sin demoras.',
    },
    {
      q: '¿Soporta mi impresora fiscal? ¿Cuáles son compatibles?',
      a: 'Trabajamos con las principales impresoras fiscales del mercado argentino — Epson, Hasar, NCR y Olivetti. Si tu modelo no está, lo certificamos antes de migrarte.',
    },
    {
      q: '¿Cuántos usuarios y sucursales incluye el plan?',
      a: 'El plan se arma por sucursal y se ajusta a tu equipo. No te cobramos por empleado: si tu pinturería tiene 8 personas, las 8 entran. El presupuesto exacto se define en la demo.',
    },
    {
      q: '¿Necesito contratar un sistemas para usarlo?',
      a: 'No. Pintana corre en la nube — no se instala servidor ni se contrata IT. Vos abrís el navegador y entrás. Nosotros nos ocupamos de todo lo técnico.',
    },
    {
      q: '¿Cómo es el soporte? ¿Tiene horarios?',
      a: 'Soporte por WhatsApp de lunes a sábado, en horario comercial extendido. Durante el primer mes, todos los días. La persona que te atiende conoce tu pinturería — no es un call center.',
    },
    {
      q: '¿Manejo varias sucursales con un solo login?',
      a: 'Sí. Un solo usuario ve todas tus sucursales en tiempo real desde cualquier dispositivo. Stock, caja, ventas y cuentas corrientes — todo consolidado, sin cambiar de sesión.',
    },
    {
      q: '¿Tienen app para el celular o solo web?',
      a: 'Pintana funciona en cualquier navegador del celular sin instalar nada. Mirás KPIs, autorizás operaciones y revisás stock desde el teléfono. La caja registradora rinde mejor en pantalla grande, pero operás desde cualquier lado.',
    },
  ] as ReadonlyArray<{ q: string; a: string }>,
} as const
