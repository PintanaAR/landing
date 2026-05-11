'use client'

import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import {
  Sparkles,
  MessageCircle,
  Smartphone,
  ShieldCheck,
  Mic,
  Paperclip,
  Phone,
  Video,
  MoreVertical,
  Check,
  CheckCheck,
} from 'lucide-react'
import { cn } from '@/lib/cn'

type Step =
  | { kind: 'user'; text: string }
  | { kind: 'typing' }
  | { kind: 'ai'; text: string }

type Message = {
  id: number
  kind: 'user' | 'ai'
  text: string
}

const SCRIPT: Step[] = [
  { kind: 'user', text: '¿Cuánto vendí hoy?' },
  { kind: 'typing' },
  {
    kind: 'ai',
    text:
      'Hoy llevás $ 487.230 en 49 tickets. La hora más fuerte fue 11:30 (6 tickets).',
  },
  { kind: 'user', text: 'Sumá 12 baldes de látex blanco 20L de Alba al stock' },
  { kind: 'typing' },
  {
    kind: 'ai',
    text: '✅ Listo. Látex interior 20L · Alba: 24 unidades en depósito Centro.',
  },
  { kind: 'user', text: 'Hacé factura A a Constructora Sur por $ 124.560' },
  { kind: 'typing' },
  {
    kind: 'ai',
    text:
      '¿Confirma? Factura A · Constructora Sur · CUIT 30-71042... · $ 124.560.',
  },
  { kind: 'user', text: 'Sí, dale' },
  { kind: 'typing' },
  {
    kind: 'ai',
    text:
      '✅ Factura emitida. CAE 75041234567890. Te adjunto el PDF al chat.',
  },
]

const STATIC_MESSAGES: Message[] = SCRIPT.filter(
  (s): s is { kind: 'user' | 'ai'; text: string } => s.kind !== 'typing'
).map((s, i) => ({ id: i, kind: s.kind, text: s.text }))

const features = [
  {
    icon: Sparkles,
    title: 'Hace lo mismo que un empleado',
    desc:
      'Si una persona puede hacerlo en el sistema, el asistente lo hace en WhatsApp. Sin excepciones.',
  },
  {
    icon: MessageCircle,
    title: 'Entiende el castellano de pintería',
    desc:
      'Reconoce productos, marcas, unidades (4L, 20L) y la forma de hablar de mostrador.',
  },
  {
    icon: Smartphone,
    title: 'Su WhatsApp de siempre',
    desc:
      'No hay que instalar nada nuevo. Se agrega el contacto del asistente y listo.',
  },
]

export function WhatsAppFeature() {
  const reduce = useReducedMotion()
  const [messages, setMessages] = useState<Message[]>([])
  const [isTyping, setIsTyping] = useState(false)
  const chatRef = useRef<HTMLDivElement>(null)
  const idRef = useRef(0)

  useEffect(() => {
    if (reduce) {
      setMessages(STATIC_MESSAGES)
      setIsTyping(false)
      return
    }

    let cancelled = false
    let stepIndex = 0
    let timer: ReturnType<typeof setTimeout>

    const reset = () => {
      idRef.current = 0
      setMessages([])
      setIsTyping(false)
    }

    const advance = () => {
      if (cancelled) return
      if (stepIndex >= SCRIPT.length) {
        timer = setTimeout(() => {
          stepIndex = 0
          reset()
          timer = setTimeout(advance, 600)
        }, 6500)
        return
      }
      const step = SCRIPT[stepIndex++]
      if (step.kind === 'typing') {
        setIsTyping(true)
        timer = setTimeout(advance, 1500)
        return
      }
      setIsTyping(false)
      const id = ++idRef.current
      setMessages((prev) => [...prev, { id, kind: step.kind, text: step.text }])
      timer = setTimeout(advance, step.kind === 'user' ? 1300 : 2300)
    }

    timer = setTimeout(advance, 600)
    return () => {
      cancelled = true
      clearTimeout(timer)
    }
  }, [reduce])

  useEffect(() => {
    const el = chatRef.current
    if (!el) return
    el.scrollTo({ top: el.scrollHeight, behavior: 'smooth' })
  }, [messages, isTyping])

  return (
    <section
      id="whatsapp"
      aria-label="Asistente en WhatsApp"
      className="relative bg-surface-1 py-24 md:py-32"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-border-2 to-transparent"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute left-[50%] top-[10%] h-[520px] w-[820px] -translate-x-1/2 bg-[radial-gradient(ellipse,rgba(0,168,132,0.07)_0%,transparent_70%)]"
      />

      <div className="container-page">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[440px_1fr] lg:gap-16">
          {/* Phone mockup */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="mx-auto w-full max-w-[360px]"
          >
            <div
              className="relative mx-auto aspect-[9/19] overflow-hidden rounded-[44px] border border-white/10 bg-[#0B141A]"
              style={{
                boxShadow:
                  '0 0 0 1px rgba(255,255,255,0.04), 0 40px 90px rgba(0,0,0,0.7), 0 0 80px rgba(139,92,246,0.14)',
              }}
            >
              {/* Notch */}
              <div
                aria-hidden
                className="absolute left-1/2 top-2 z-20 h-6 w-28 -translate-x-1/2 rounded-full bg-black"
              />

              <div className="flex h-full flex-col pt-10">
                {/* Chat header */}
                <div className="flex items-center gap-3 border-b border-white/5 bg-[#1F2C34] px-3 py-2">
                  <span
                    aria-hidden
                    className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-purple text-[14px] font-extrabold text-white"
                  >
                    P
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-[13px] font-semibold text-white">
                      Pintana · Asistente
                    </p>
                    <p className="inline-flex items-center gap-1.5 text-[10px] text-[#8FA1AC]">
                      <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#00A884]" />
                      en línea
                    </p>
                  </div>
                  <div className="flex items-center gap-3 text-white/50">
                    <Video size={16} aria-hidden />
                    <Phone size={16} aria-hidden />
                    <MoreVertical size={16} aria-hidden />
                  </div>
                </div>

                {/* Chat body */}
                <div
                  ref={chatRef}
                  className="flex-1 overflow-y-auto bg-[#0B141A] bg-[radial-gradient(rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[length:18px_18px] px-3 py-3"
                >
                  <p className="mx-auto mb-3 w-fit rounded-md bg-[#182229] px-2 py-0.5 text-[10px] text-[#8FA1AC]">
                    Hoy
                  </p>
                  <div className="space-y-1.5">
                    <AnimatePresence initial={false}>
                      {messages.map((m) => (
                        <Bubble key={m.id} kind={m.kind} text={m.text} reduce={!!reduce} />
                      ))}
                      {isTyping && (
                        <motion.div
                          key="typing"
                          layout
                          initial={{ opacity: 0, y: 6 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -4 }}
                          transition={{ duration: 0.2 }}
                          className="mr-auto inline-flex max-w-[80%] items-center gap-1 rounded-[14px] bg-[#1F2C34] px-3 py-2.5"
                        >
                          <TypingDot delay={0} />
                          <TypingDot delay={160} />
                          <TypingDot delay={320} />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>

                {/* Input bar */}
                <div className="flex items-center gap-2 bg-[#1F2C34] px-2 py-2">
                  <Paperclip size={16} className="text-white/40" aria-hidden />
                  <div className="flex-1 rounded-full bg-[#2A3942] px-3 py-1.5 text-[12px] text-white/40">
                    Mensaje
                  </div>
                  <Mic size={16} className="text-white/40" aria-hidden />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Copy + features */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.05 }}
          >
            <span className="overline">WhatsApp · Asistente IA</span>
            <h2
              className="mt-3 max-w-[18ch] font-display font-extrabold leading-[1.05] tracking-[-0.03em] text-text"
              style={{ fontSize: 'clamp(32px, 4vw, 48px)' }}
            >
              Si sabe usar WhatsApp,{' '}
              <span className="bg-gradient-to-r from-purple to-purple-light bg-clip-text text-transparent">
                sabe usar Pintana
              </span>
            </h2>
            <p className="mt-5 max-w-[54ch] text-[17px] leading-[1.7] text-text-2">
              Hable con el asistente como con un empleado. Le pide algo, él lo hace.
              Facturar, cargar stock, ver caja, emitir notas — todo desde el chat de
              siempre, sin tocar la computadora.
            </p>

            <ul className="mt-8 space-y-5">
              {features.map(({ icon: Icon, title, desc }) => (
                <li key={title} className="flex gap-4">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-border bg-surface-2 text-purple">
                    <Icon size={18} strokeWidth={2} />
                  </span>
                  <div>
                    <h4 className="font-display text-[16px] font-bold tracking-[-0.01em] text-text">
                      {title}
                    </h4>
                    <p className="mt-1 max-w-[48ch] text-[14px] leading-[1.6] text-text-2">
                      {desc}
                    </p>
                  </div>
                </li>
              ))}
            </ul>

            <div className="mt-8 inline-flex items-start gap-3 rounded-xl border border-border bg-surface-2/60 px-4 py-3">
              <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-purple/15 text-purple">
                <ShieldCheck size={14} strokeWidth={2.2} />
              </span>
              <p className="text-[13px] leading-[1.5] text-text-2">
                <span className="font-semibold text-text">
                  Confirma antes de mover plata.
                </span>{' '}
                Para facturar, cobrar o cargar stock, el asistente le pide el OK
                primero. Usted siempre tiene la última palabra.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

function Bubble({
  kind,
  text,
  reduce,
}: {
  kind: 'user' | 'ai'
  text: string
  reduce: boolean
}) {
  const isUser = kind === 'user'
  return (
    <motion.div
      layout
      initial={reduce ? false : { opacity: 0, y: 6, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        'flex',
        isUser ? 'justify-end' : 'justify-start',
      )}
    >
      <div
        className={cn(
          'relative max-w-[78%] rounded-[14px] px-3 py-2 text-[12.5px] leading-snug text-white shadow-[0_1px_0_rgba(0,0,0,0.2)]',
          isUser ? 'bg-[#005C4B]' : 'bg-[#1F2C34]'
        )}
      >
        <p className="whitespace-pre-wrap break-words">{text}</p>
        <div
          className={cn(
            'mt-0.5 flex items-center justify-end gap-1 text-[9.5px] text-white/55',
          )}
        >
          <span>11:32</span>
          {isUser &&
            (reduce ? (
              <CheckCheck size={11} className="text-[#53BDEB]" />
            ) : (
              <CheckCheck size={11} className="text-[#53BDEB]" />
            ))}
          {!isUser && <Check size={11} className="text-white/45" />}
        </div>
      </div>
    </motion.div>
  )
}

function TypingDot({ delay }: { delay: number }) {
  return (
    <span
      aria-hidden
      className="inline-block h-1.5 w-1.5 rounded-full bg-white/60"
      style={{
        animation: `typing-bounce 1.2s ease-in-out ${delay}ms infinite`,
      }}
    />
  )
}
