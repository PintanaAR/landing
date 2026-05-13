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
        value: '1 min',
        unit: '',
        label: 'Cerrás caja al final del día. Sin cuadrar con Excel.',
      },
      {
        value: 'Cero',
        unit: 'papeles',
        label: 'Facturás ARCA al instante. Adiós a los archivadores.',
      },
      {
        value: 'En el celu',
        unit: '',
        label: 'Ves cada venta y cada caja, estés donde estés.',
      },
      {
        value: '1',
        unit: 'responsable',
        label: 'Cada cobro queda firmado. Sin filtraciones.',
      },
    ] as ReadonlyArray<{
      value: string
      unit?: string
      label: string
    }>,
  },

  // FAQ section — preempts the most common pre-demo objections. Read by
  // <FAQ />. Edit, reorder, add, or remove entries here; the section
  // re-renders automatically. If the array is empty the section hides
  // itself. Keep `q` short (one line) and `a` to 2–3 sentences max.
  faq: [
    {
      q: '¿Cuánto cuesta?',
      a: 'Plan mensual sin contratos largos. Te armamos un presupuesto en la demo según cantidad de sucursales y empleados. Cancelás cuando quieras.',
    },
    {
      q: '¿Cuánto tarda en estar operativo?',
      a: 'En 1 día empezás a vender con el POS. La migración completa de tu stock y clientes desde planillas o tu sistema actual se hace en 1 semana, con acompañamiento del equipo de Pintana.',
    },
    {
      q: '¿Y si ya uso otro sistema?',
      a: 'Migramos tu base de productos, precios, clientes y proveedores desde tu sistema actual o desde planillas. No reescribís nada a mano.',
    },
    {
      q: '¿Funciona si se cae internet?',
      a: 'Sí. El punto de venta sigue cobrando offline y sincroniza con el sistema cuando vuelve la conexión. No perdés ninguna venta.',
    },
    {
      q: '¿Mis empleados van a saber usarlo?',
      a: 'Sí. El POS está pensado para que un empleado nuevo cobre desde el primer turno. Incluye un tutorial guiado dentro de la pantalla y soporte por WhatsApp.',
    },
    {
      q: '¿Sirve si tengo una sola sucursal?',
      a: 'Sí. Pintana funciona igual con una o veinte sucursales — el módulo multi-sucursal se activa cuando lo necesitás, sin migrar nada.',
    },
  ] as ReadonlyArray<{ q: string; a: string }>,
} as const
