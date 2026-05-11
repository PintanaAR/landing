import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        bg: 'var(--bg)',
        surface: {
          1: 'var(--surface-1)',
          2: 'var(--surface-2)',
          3: 'var(--surface-3)',
        },
        purple: {
          DEFAULT: 'var(--purple)',
          light: 'var(--purple-light)',
          glow: 'var(--purple-glow)',
          soft: 'var(--purple-soft)',
        },
        indigo: {
          DEFAULT: 'var(--indigo)',
          glow: 'var(--indigo-glow)',
        },
        border: {
          DEFAULT: 'var(--border)',
          2: 'var(--border-2)',
        },
        text: {
          DEFAULT: 'var(--text)',
          2: 'var(--text-2)',
          3: 'var(--text-3)',
        },
        success: 'var(--success)',
        danger: 'var(--danger)',
      },
      fontFamily: {
        display: ['var(--font-display)', 'sans-serif'],
        body: ['var(--font-body)', 'sans-serif'],
      },
      borderColor: {
        DEFAULT: 'var(--border)',
      },
    },
  },
  plugins: [],
}

export default config
