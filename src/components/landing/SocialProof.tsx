import { motion } from 'framer-motion'
import { site } from '@/lib/site'

const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  },
}

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
}

/**
 * Renders pinturería logos, testimonials, and an aggregate counter line.
 *
 * Hidden until we have at least one logo or testimonial — see
 * `site.socialProof`. Add entries there and the section becomes visible
 * automatically. No code changes required to ship the first client.
 */
export function SocialProof() {
  const { logos, testimonials, aggregate } = site.socialProof
  const hasLogos = logos.length > 0
  const hasTestimonials = testimonials.length > 0

  if (!hasLogos && !hasTestimonials) return null

  return (
    <section
      id="clientes"
      aria-label="Pinturerías que ya usan Pintana"
      className="relative bg-bg py-20 md:py-24"
    >
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        variants={container}
        className="container-page relative"
      >
        <motion.div
          variants={fadeUp}
          className="mx-auto max-w-[640px] text-center"
        >
          <span className="overline text-sage">Pinturerías con Pintana</span>
          {(aggregate.stores > 0 || aggregate.branches > 0) && (
            <h2
              className="mt-3 max-w-[22ch] mx-auto font-editorial font-normal leading-[1.04] tracking-[-0.02em] text-text"
              style={{ fontSize: 'clamp(28px, 3.4vw, 40px)' }}
            >
              {aggregate.stores > 0 && (
                <>
                  {aggregate.stores} pinturerías
                </>
              )}
              {aggregate.branches > 0 && (
                <>
                  {' · '}
                  {aggregate.branches} sucursales
                </>
              )}
              {aggregate.invoicedThisMonth && (
                <>
                  {' · '}
                  {aggregate.invoicedThisMonth} facturados este mes
                </>
              )}
            </h2>
          )}
        </motion.div>

        {hasLogos && (
          <motion.div
            variants={fadeUp}
            className="mt-10 flex flex-wrap items-center justify-center gap-x-10 gap-y-6"
          >
            {logos.map((l) => (
              <span
                key={l.name}
                className="font-display text-[18px] font-bold tracking-[-0.01em] text-text-2"
              >
                {l.src ? (
                  <img
                    src={l.src}
                    alt={l.name}
                    className="h-8 w-auto opacity-70"
                  />
                ) : (
                  l.name
                )}
              </span>
            ))}
          </motion.div>
        )}

        {hasTestimonials && (
          <motion.div
            variants={fadeUp}
            className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2"
          >
            {testimonials.map((t, i) => (
              <figure
                key={i}
                className="rounded-2xl border border-border bg-surface-2 p-7 md:p-8"
              >
                <blockquote className="font-display text-[18px] font-medium leading-[1.5] tracking-[-0.01em] text-text">
                  "{t.quote}"
                </blockquote>
                <figcaption className="mt-5 flex items-center gap-3">
                  {t.photo ? (
                    <img
                      src={t.photo}
                      alt={t.name}
                      className="h-10 w-10 rounded-full object-cover"
                    />
                  ) : (
                    <span
                      aria-hidden
                      className="flex h-10 w-10 items-center justify-center rounded-full bg-sage text-[13px] font-bold text-white"
                    >
                      {t.name
                        .split(' ')
                        .map((n) => n[0])
                        .slice(0, 2)
                        .join('')}
                    </span>
                  )}
                  <div>
                    <p className="text-[14px] font-semibold text-text">
                      {t.name}
                    </p>
                    <p className="text-[12px] text-text-2">{t.role}</p>
                  </div>
                </figcaption>
              </figure>
            ))}
          </motion.div>
        )}
      </motion.div>
    </section>
  )
}
