// Dev-only component registry used by /dev/preview, /dev/compare, /dev/variants.
//
// Each entry maps a kebab-case slug -> the canonical landing component plus an
// optional list of in-flight variants. The slug becomes the URL param and the
// folder name under design-references/.
//
// When you start exploring variants for a component, add files under
// src/components/landing/<Name>/variants/ and register them here. There is no
// filesystem scan — the browser bundle has no access to disk, so the registry
// is the single source of truth.

import type { ComponentType } from 'react'

import { AppWindow } from '@/components/landing/AppWindow'
import { Contact } from '@/components/landing/Contact'
import { FAQ } from '@/components/landing/FAQ'
import { Footer } from '@/components/landing/Footer'
import { Hero } from '@/components/landing/Hero'
import { Modules } from '@/components/landing/Modules'
import { Nav } from '@/components/landing/Nav'
import { POSFeature } from '@/components/landing/POSFeature'
import { Stats } from '@/components/landing/Stats'
import { WhatsAppFeature } from '@/components/landing/WhatsAppFeature'

export type DevVariant = {
  id: string // 'v1', 'v2', etc. — appears in the URL and the label
  label: string // 'V1 — Compact', shown above the variant
  thesis?: string // one-line design thesis, shown under the label
  component: ComponentType
}

export type DevComponentEntry = {
  slug: string // kebab-case, used in URLs and design-references/ folder
  name: string // PascalCase, the import name (display)
  description?: string // short blurb shown in /dev/preview TOC
  component: ComponentType // the canonical / current implementation
  variants?: DevVariant[]
  // When true, the component is rendered full-bleed (no container padding).
  // Use for Nav, Footer, Hero — anything that owns its own layout.
  fullBleed?: boolean
}

export const devRegistry: DevComponentEntry[] = [
  {
    slug: 'nav',
    name: 'Nav',
    description: 'Fixed top navigation with logo, pill tabs, and demo CTA.',
    component: Nav,
    fullBleed: true,
  },
  {
    slug: 'hero',
    name: 'Hero',
    description: 'Above-the-fold headline, sub, CTAs, social proof.',
    component: Hero,
    fullBleed: true,
  },
  {
    slug: 'app-window',
    name: 'AppWindow',
    description: 'macOS-style product mockup showing the ERP shell.',
    component: AppWindow,
    fullBleed: true,
  },
  {
    slug: 'stats',
    name: 'Stats',
    description: 'Four key metrics in a bordered band.',
    component: Stats,
    fullBleed: true,
  },
  {
    slug: 'modules',
    name: 'Modules',
    description: 'Bento grid of platform modules (ERP / POS / Inventario / RRHH).',
    component: Modules,
    fullBleed: true,
  },
  {
    slug: 'pos-feature',
    name: 'POSFeature',
    description: 'Two-column POS deep-dive with feature list + mockup.',
    component: POSFeature,
    fullBleed: true,
  },
  {
    slug: 'whatsapp-feature',
    name: 'WhatsAppFeature',
    description: 'WhatsApp integration storyboard.',
    component: WhatsAppFeature,
    fullBleed: true,
  },
  {
    slug: 'faq',
    name: 'FAQ',
    description: 'Common questions from pintería owners.',
    component: FAQ,
    fullBleed: true,
  },
  {
    slug: 'contact',
    name: 'Contact',
    description: 'Two-column lead capture form + contact points.',
    component: Contact,
    fullBleed: true,
  },
  {
    slug: 'footer',
    name: 'Footer',
    description: 'Minimal footer with legal links.',
    component: Footer,
    fullBleed: true,
  },
]

export function findEntry(slug: string | undefined): DevComponentEntry | undefined {
  if (!slug) return undefined
  return devRegistry.find((e) => e.slug === slug)
}
