import { Nav } from '@/components/landing/Nav'
import { Hero } from '@/components/landing/Hero'
import { AppWindow } from '@/components/landing/AppWindow'
import { Modules } from '@/components/landing/Modules'

export default function Page() {
  return (
    <>
      <Nav />
      <main id="top">
        <Hero />
        <AppWindow />
        <Modules />
      </main>
    </>
  )
}
