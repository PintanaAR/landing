import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Plus } from 'lucide-react'
import { site } from '@/lib/site'
import { cn } from '@/lib/cn'

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  },
}

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.05 } },
}

export function FAQ() {
  const entries = site.faq
  const [open, setOpen] = useState<number | null>(0)

  if (entries.length === 0) return null

  return (
    <section
      id="faq"
      aria-label="Preguntas frecuentes"
      className="relative bg-bg py-24 md:py-32"
    >
      {/* Soft sage corner wash — echoes the Stats credibility band so
          informational sections share a visual tone. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_15%_30%,var(--sage-soft)_0%,transparent_70%)]"
      />
      <div className="container-page relative">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-[1fr_1.4fr] md:gap-16">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={container}
            className="md:sticky md:top-[88px] md:self-start"
          >
            <motion.span variants={fadeUp} className="overline text-sage">
              Preguntas frecuentes
            </motion.span>
            <motion.h2
              variants={fadeUp}
              className="mt-3 max-w-[16ch] font-display font-extrabold leading-[1.05] tracking-[-0.03em] text-text"
              style={{ fontSize: 'clamp(32px, 4vw, 48px)' }}
            >
              Antes de pedir la demo.
            </motion.h2>
            <motion.p
              variants={fadeUp}
              className="mt-4 max-w-[34ch] text-[16px] leading-[1.6] text-text-2"
            >
              Lo que más nos preguntan los dueños de pinturerías cuando
              empiezan a evaluarnos.
            </motion.p>
          </motion.div>

          <motion.ul
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={container}
            className="border-t border-border"
          >
            {entries.map((entry, i) => (
              <FAQItem
                key={i}
                q={entry.q}
                a={entry.a}
                isOpen={open === i}
                onToggle={() => setOpen(open === i ? null : i)}
              />
            ))}
          </motion.ul>
        </div>
      </div>
    </section>
  )
}

function FAQItem({
  q,
  a,
  isOpen,
  onToggle,
}: {
  q: string
  a: string
  isOpen: boolean
  onToggle: () => void
}) {
  return (
    <motion.li variants={fadeUp} className="border-b border-border">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        className="group flex w-full items-start justify-between gap-6 py-5 text-left transition-colors hover:text-text"
      >
        <span className="font-display text-[18px] font-bold leading-[1.35] tracking-[-0.01em] text-text md:text-[20px]">
          {q}
        </span>
        <span
          className={cn(
            'mt-1 inline-flex h-7 w-7 flex-none items-center justify-center rounded-full border border-border-2 text-text-2 transition-all duration-300',
            isOpen
              ? 'rotate-45 border-purple/40 bg-purple/8 text-purple'
              : 'group-hover:border-text-3 group-hover:text-text',
          )}
        >
          <Plus size={15} strokeWidth={2.4} />
        </span>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{
              height: { duration: 0.32, ease: [0.16, 1, 0.3, 1] },
              opacity: { duration: 0.22, ease: 'easeOut' },
            }}
            className="overflow-hidden"
          >
            <p className="max-w-[64ch] pb-6 pr-12 text-[15px] leading-[1.65] text-text-2">
              {a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.li>
  )
}
