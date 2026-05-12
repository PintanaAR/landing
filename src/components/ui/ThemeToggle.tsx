import { useEffect, useState } from 'react'
import { Moon, Sun } from 'lucide-react'
import { cn } from '@/lib/cn'

type Theme = 'light' | 'dark'

const STORAGE_KEY = 'pintana-theme'

function readTheme(): Theme {
  if (typeof document === 'undefined') return 'light'
  return document.documentElement.classList.contains('theme-dark') ? 'dark' : 'light'
}

function applyTheme(theme: Theme) {
  const root = document.documentElement
  if (theme === 'dark') {
    root.classList.add('theme-dark')
    root.classList.remove('theme-light')
  } else {
    root.classList.add('theme-light')
    root.classList.remove('theme-dark')
  }
  try {
    localStorage.setItem(STORAGE_KEY, theme)
  } catch {
    /* ignore storage errors */
  }
}

export function ThemeToggle({ className }: { className?: string }) {
  const [theme, setTheme] = useState<Theme>('light')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setTheme(readTheme())
    setMounted(true)
  }, [])

  const next = theme === 'dark' ? 'light' : 'dark'

  return (
    <button
      type="button"
      aria-label={`Cambiar a tema ${next === 'dark' ? 'oscuro' : 'claro'}`}
      onClick={() => {
        applyTheme(next)
        setTheme(next)
      }}
      className={cn(
        'inline-flex h-9 w-9 items-center justify-center rounded-md border border-border bg-surface-2 text-text-2 transition-colors hover:text-text',
        className,
      )}
    >
      {/* Render both icons but only show one to keep size stable before mount */}
      {mounted ? (
        theme === 'dark' ? (
          <Sun size={16} strokeWidth={2} aria-hidden />
        ) : (
          <Moon size={16} strokeWidth={2} aria-hidden />
        )
      ) : (
        <Moon size={16} strokeWidth={2} aria-hidden />
      )}
    </button>
  )
}
