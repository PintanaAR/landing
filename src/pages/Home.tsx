import { Nav } from '@/components/landing/Nav'
import { Hero } from '@/components/landing/Hero'
import { AppWindow } from '@/components/landing/AppWindow'
import { Bifurcation } from '@/components/landing/Bifurcation'
import { SocialProof } from '@/components/landing/SocialProof'
import { Stats } from '@/components/landing/Stats'
import { Modules } from '@/components/landing/Modules'
import { Differentiators } from '@/components/landing/Differentiators'
import { POSFeature } from '@/components/landing/POSFeature'
import { ARCAFeature } from '@/components/landing/ARCAFeature'
import { WhatsAppFeature } from '@/components/landing/WhatsAppFeature'
import { Onboarding } from '@/components/landing/Onboarding'
import { FAQ } from '@/components/landing/FAQ'
import { Contact } from '@/components/landing/Contact'
import { Footer } from '@/components/landing/Footer'

export function Home() {
  return (
    <>
      <Nav />
      <main id="top">
        <Hero />
        <AppWindow />
        <Bifurcation />
        <SocialProof />
        <Stats />
        <Modules />
        <Differentiators />
        <POSFeature />
        <ARCAFeature />
        <WhatsAppFeature />
        <Onboarding />
        <FAQ />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
