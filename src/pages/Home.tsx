import { Nav } from '@/components/landing/Nav'
import { Hero } from '@/components/landing/Hero'
import { AppWindow } from '@/components/landing/AppWindow'
import { Modules } from '@/components/landing/Modules'
import { POSFeature } from '@/components/landing/POSFeature'
import { WhatsAppFeature } from '@/components/landing/WhatsAppFeature'
import { Contact } from '@/components/landing/Contact'
import { Footer } from '@/components/landing/Footer'

export function Home() {
  return (
    <>
      <Nav />
      <main id="top">
        <Hero />
        <AppWindow />
        <Modules />
        <POSFeature />
        <WhatsAppFeature />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
