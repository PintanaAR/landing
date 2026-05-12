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
} as const
