import { useEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import { Home } from '@/pages/Home'
import { Privacy } from '@/pages/Privacy'
import { Terms } from '@/pages/Terms'
import { DevCompare } from '@/pages/dev/Compare'
import { DevPreview } from '@/pages/dev/Preview'
import { DevVariants } from '@/pages/dev/Variants'

// On every route change, jump to top so legal pages don't open mid-scroll.
function ScrollToTop() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (hash) return // let the browser handle anchor scroll
    window.scrollTo(0, 0)
  }, [pathname, hash])
  return null
}

export function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/tos" element={<Terms />} />
        {import.meta.env.DEV && (
          <>
            <Route path="/dev/preview" element={<DevPreview />} />
            <Route path="/dev/compare/:component" element={<DevCompare />} />
            <Route path="/dev/variants/:component" element={<DevVariants />} />
          </>
        )}
      </Routes>
    </>
  )
}
