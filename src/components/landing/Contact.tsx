import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { motion } from 'framer-motion'
import {
  Mail,
  Phone,
  MapPin,
  MessageSquare,
  CheckCircle2,
  ArrowRight,
  Lock,
  AlertCircle,
} from 'lucide-react'
import { contactSchema, type ContactInput } from '@/lib/validations'
import { cn } from '@/lib/cn'

const contactPoints = [
  {
    icon: Mail,
    title: 'hola@pintana.com.ar',
    sub: 'Respondemos en menos de 4 horas hábiles',
  },
  {
    icon: Phone,
    title: '+54 9 11 6000 0000',
    sub: 'Lun a Vie · 9 a 19 hs',
  },
  {
    icon: MessageSquare,
    title: 'WhatsApp directo',
    sub: 'Consultas rápidas con el equipo',
  },
  {
    icon: MapPin,
    title: 'Buenos Aires, Argentina',
    sub: 'Soporte local · sin call centers offshore',
  },
]

const provinces = [
  'Buenos Aires',
  'CABA',
  'Catamarca',
  'Chaco',
  'Chubut',
  'Córdoba',
  'Corrientes',
  'Entre Ríos',
  'Formosa',
  'Jujuy',
  'La Pampa',
  'La Rioja',
  'Mendoza',
  'Misiones',
  'Neuquén',
  'Río Negro',
  'Salta',
  'San Juan',
  'San Luis',
  'Santa Cruz',
  'Santa Fe',
  'Santiago del Estero',
  'Tierra del Fuego',
  'Tucumán',
]

const labelCls =
  'block text-[12px] font-semibold uppercase tracking-[0.08em] text-text-3'
const inputCls =
  'w-full rounded-[10px] border border-border bg-surface-2 px-3.5 py-2.5 text-[14px] text-text placeholder:text-text-3 transition-colors focus:border-purple/60 focus:outline-none focus:ring-2 focus:ring-purple/20'
const errorCls = 'mt-1 inline-flex items-center gap-1 text-[12px] text-danger'

export function Contact() {
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
    mode: 'onTouched',
  })

  const onSubmit = handleSubmit(async (data) => {
    setErrorMsg(null)
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (!res.ok) {
        const body = await res.json().catch(() => ({}))
        throw new Error(body.error ?? 'No pudimos enviar el formulario.')
      }
      setStatus('success')
      reset()
    } catch (e) {
      setStatus('error')
      setErrorMsg(e instanceof Error ? e.message : 'Error desconocido')
    }
  })

  return (
    <section
      id="contacto"
      aria-label="Contacto"
      className="relative bg-surface-1 py-24 md:py-32"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-border-2 to-transparent"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-[80px] h-[420px] w-[820px] -translate-x-1/2 bg-[radial-gradient(ellipse,rgba(139,92,246,0.04)_0%,transparent_70%)]"
      />

      <div className="container-page">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_1.05fr]">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="overline">Hablemos</span>
            <h2
              className="mt-3 max-w-[17ch] font-display font-extrabold leading-[1.05] tracking-[-0.03em] text-text"
              style={{ fontSize: 'clamp(32px, 4vw, 48px)' }}
            >
              Veámoslo funcionando en tu pintería.
            </h2>
            <p className="mt-4 max-w-[50ch] text-[16px] leading-[1.7] text-text-2">
              30 minutos. Te mostramos el sistema con datos reales de tu
              negocio y te pasamos un presupuesto a tu medida. Sin compromiso.
            </p>

            <ul className="mt-10 space-y-5">
              {contactPoints.map(({ icon: Icon, title, sub }) => (
                <li key={title} className="flex items-start gap-4">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-border bg-surface-2 text-text-2">
                    <Icon size={17} strokeWidth={2} />
                  </span>
                  <div>
                    <p className="font-display text-[15px] font-bold tracking-[-0.01em] text-text">
                      {title}
                    </p>
                    <p className="mt-0.5 text-[13px] text-text-2">{sub}</p>
                  </div>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Right: form card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.05 }}
            className="relative overflow-hidden rounded-2xl border border-border bg-surface-2 p-6 sm:p-8 card-glow"
          >
            {status === 'success' ? (
              <div className="flex min-h-[480px] flex-col items-center justify-center text-center">
                <span className="flex h-14 w-14 items-center justify-center rounded-full border border-purple/40 bg-purple/10 text-purple">
                  <CheckCircle2 size={26} />
                </span>
                <h3 className="mt-5 font-display text-[24px] font-extrabold tracking-[-0.02em] text-text">
                  ¡Gracias! Te contactamos pronto
                </h3>
                <p className="mt-3 max-w-[36ch] text-[14px] text-text-2">
                  Recibimos tu consulta. Un miembro del equipo te va a escribir
                  en menos de 4 horas hábiles.
                </p>
                <button
                  onClick={() => setStatus('idle')}
                  className="btn-secondary mt-7"
                >
                  Enviar otra consulta
                </button>
              </div>
            ) : (
              <form onSubmit={onSubmit} noValidate className="space-y-4">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="firstName" className={labelCls}>
                      Nombre
                    </label>
                    <input
                      id="firstName"
                      autoComplete="given-name"
                      className={cn(inputCls, 'mt-1.5')}
                      placeholder="Juan"
                      {...register('firstName')}
                    />
                    {errors.firstName && (
                      <p className={errorCls}>
                        <AlertCircle size={12} /> {errors.firstName.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <label htmlFor="lastName" className={labelCls}>
                      Apellido
                    </label>
                    <input
                      id="lastName"
                      autoComplete="family-name"
                      className={cn(inputCls, 'mt-1.5')}
                      placeholder="Pérez"
                      {...register('lastName')}
                    />
                    {errors.lastName && (
                      <p className={errorCls}>
                        <AlertCircle size={12} /> {errors.lastName.message}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className={labelCls}>
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    autoComplete="email"
                    className={cn(inputCls, 'mt-1.5')}
                    placeholder="juan@pinturerialacolor.com.ar"
                    {...register('email')}
                  />
                  {errors.email && (
                    <p className={errorCls}>
                      <AlertCircle size={12} /> {errors.email.message}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="phone" className={labelCls}>
                    WhatsApp
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    autoComplete="tel"
                    className={cn(inputCls, 'mt-1.5')}
                    placeholder="+54 9 11 0000 0000"
                    {...register('phone')}
                  />
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="province" className={labelCls}>
                      Provincia
                    </label>
                    <select
                      id="province"
                      className={cn(inputCls, 'mt-1.5 appearance-none pr-9')}
                      defaultValue=""
                      {...register('province')}
                    >
                      <option value="" disabled>
                        Seleccionar…
                      </option>
                      {provinces.map((p) => (
                        <option key={p} value={p}>
                          {p}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label htmlFor="branches" className={labelCls}>
                      Sucursales
                    </label>
                    <select
                      id="branches"
                      className={cn(inputCls, 'mt-1.5 appearance-none pr-9')}
                      defaultValue=""
                      {...register('branches')}
                    >
                      <option value="" disabled>
                        Seleccionar…
                      </option>
                      <option value="1">1 sucursal</option>
                      <option value="2-3">2 a 3 sucursales</option>
                      <option value="4-10">4 a 10 sucursales</option>
                      <option value="10+">Más de 10</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className={labelCls}>
                    ¿En qué te podemos ayudar?
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    className={cn(inputCls, 'mt-1.5 resize-none')}
                    placeholder="Hoy uso planilla y un POS viejo. Quisiera ver cómo funciona la facturación AFIP…"
                    {...register('message')}
                  />
                </div>

                {status === 'error' && (
                  <div className="flex items-start gap-2 rounded-[10px] border border-danger/30 bg-danger/10 px-3 py-2.5 text-[13px] text-danger">
                    <AlertCircle size={14} className="mt-0.5 shrink-0" />
                    <span>
                      {errorMsg ?? 'No pudimos enviar el formulario. Intente nuevamente.'}
                    </span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-primary w-full justify-center disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {isSubmitting ? 'Enviando…' : 'Solicitar demo gratuita'}
                  {!isSubmitting && <ArrowRight size={16} strokeWidth={2.5} />}
                </button>

                <p className="flex items-center justify-center gap-1.5 pt-1 text-[12px] text-text-3">
                  <Lock size={11} />
                  Tus datos están seguros. No hacemos spam.
                </p>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
