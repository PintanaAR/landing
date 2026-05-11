import { Nav } from '@/components/landing/Nav'
import { Hero } from '@/components/landing/Hero'
import { AppWindow } from '@/components/landing/AppWindow'
import { Modules } from '@/components/landing/Modules'
import { POSFeature } from '@/components/landing/POSFeature'
import { WhatsAppFeature } from '@/components/landing/WhatsAppFeature'
import { Stats } from '@/components/landing/Stats'
import { Contact } from '@/components/landing/Contact'
import { Footer } from '@/components/landing/Footer'

export function App() {
  return (
    <>
      <Nav />
      <main id="top">
        <Hero />
        <AppWindow />
        <Modules />
        <POSFeature />
        <WhatsAppFeature />
        <Stats />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
