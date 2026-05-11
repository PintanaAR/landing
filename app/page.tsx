import { Nav } from '@/components/landing/Nav'
import { Hero } from '@/components/landing/Hero'
import { AppWindow } from '@/components/landing/AppWindow'

export default function Page() {
  return (
    <>
      <Nav />
      <main id="top">
        <Hero />
        <AppWindow />
      </main>
    </>
  )
}
