import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import {
  Mic,
  BarChart3,
  BellRing,
  Smartphone,
  ShieldCheck,
  Paperclip,
  Phone,
  Video,
  MoreVertical,
  Check,
  CheckCheck,
  Play,
  ArrowLeft,
  Smile,
  Camera,
  Signal,
  Wifi,
  BatteryFull,
} from 'lucide-react'
import { cn } from '@/lib/cn'
import { PintanaIcon } from '@/components/ui/PintanaIcon'

const COLOR_SWATCHES: Record<string, string> = {
  Blanco: '#F5F5F5',
  Beige: '#DDC8A0',
  Gris: '#7E8084',
  Negro: '#1E1E1E',
  Marfil: '#F0E7CC',
}

type ChartItem = { label: string; pct: number }

type Step =
  | { kind: 'user'; text: string }
  | { kind: 'user-audio'; durationLabel: string; waveform: number[] }
  | { kind: 'typing' }
  | { kind: 'ai'; text: string }
  | { kind: 'ai-chart'; title: string; items: ChartItem[]; total: string }
  | { kind: 'pause'; ms: number }

type Message =
  | { id: number; kind: 'user'; text: string }
  | { id: number; kind: 'user-audio'; durationLabel: string; waveform: number[] }
  | { id: number; kind: 'ai'; text: string }
  | { id: number; kind: 'ai-chart'; title: string; items: ChartItem[]; total: string }

const SCRIPT: Step[] = [
  // Scenario A — voice note → stock update
  {
    kind: 'user-audio',
    durationLabel: '0:08',
    waveform: [
      20, 34, 52, 66, 44, 60, 82, 56, 70, 90, 64, 50, 36, 46, 60, 76, 56, 40,
      30, 50, 64, 80, 60, 45, 35, 24, 40, 30,
    ],
  },
  { kind: 'typing' },
  {
    kind: 'ai',
    text:
      'Entendí: 20 baldes látex blanco 20L · Alba + 15 baldes de 4L. ¿Cargo al depósito Centro?',
  },
  { kind: 'user', text: 'Sí, dale' },
  { kind: 'typing' },
  {
    kind: 'ai',
    text: '✅ Stock cargado. 35 unidades en total. Te paso el comprobante por mail.',
  },
  { kind: 'pause', ms: 1800 },

  // Scenario B — analytics + inline chart
  { kind: 'user', text: '¿Qué colores vendí más esta semana?' },
  { kind: 'typing' },
  {
    kind: 'ai-chart',
    title: 'Top 5 colores · semana en curso',
    items: [
      { label: 'Blanco', pct: 38 },
      { label: 'Beige', pct: 22 },
      { label: 'Gris', pct: 18 },
      { label: 'Negro', pct: 12 },
      { label: 'Marfil', pct: 10 },
    ],
    total: '127 baldes vendidos · $ 1.842.500',
  },
  { kind: 'pause', ms: 2200 },

  // Scenario C — proactive alert
  {
    kind: 'ai',
    text: '⚠️ Stock bajo: Esmalte sintético blanco 4L queda en 3 unidades.',
  },
  {
    kind: 'ai',
    text: 'Última compra a Sherwin: $ 9.820/u hace 6 días. ¿Repongo 12 al mismo precio?',
  },
  { kind: 'user', text: 'Sí' },
  { kind: 'typing' },
  {
    kind: 'ai',
    text: '✅ Orden de compra #1247 enviada a Sherwin. Te aviso cuando confirmen.',
  },
]

const STATIC_MESSAGES: Message[] = (() => {
  let id = 0
  const out: Message[] = []
  for (const step of SCRIPT) {
    if (step.kind === 'typing' || step.kind === 'pause') continue
    id += 1
    if (step.kind === 'user') out.push({ id, kind: 'user', text: step.text })
    else if (step.kind === 'user-audio')
      out.push({ id, kind: 'user-audio', durationLabel: step.durationLabel, waveform: step.waveform })
    else if (step.kind === 'ai') out.push({ id, kind: 'ai', text: step.text })
    else if (step.kind === 'ai-chart')
      out.push({
        id,
        kind: 'ai-chart',
        title: step.title,
        items: step.items,
        total: step.total,
      })
  }
  return out
})()

const features = [
  {
    icon: Mic,
    title: 'Voz, texto y fotos — todo le sirve',
    desc:
      'Mandele un audio desde el mostrador, una foto del remito o un mensaje. El asistente entiende los tres y actúa.',
  },
  {
    icon: BarChart3,
    title: 'Análisis y reportes al toque',
    desc:
      '"¿Qué color vendí más?" "¿Quién me debe?" "Comparame con el mes pasado." Le contesta con números, no con teoría.',
  },
  {
    icon: BellRing,
    title: 'Avisa antes que pase',
    desc:
      'Stock bajo, cliente que se atrasa, factura por reenviar — lo nota primero y le pinga con la acción ya armada.',
  },
]

function stepWait(step: Step): number {
  switch (step.kind) {
    case 'typing':
      return 1500
    case 'pause':
      return step.ms
    case 'user':
      return 1300
    case 'user-audio':
      return 2400
    case 'ai':
      return 2200
    case 'ai-chart':
      return 3400
  }
}

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
          timer = setTimeout(advance, 700)
        }, 6800)
        return
      }
      const step = SCRIPT[stepIndex++]
      const wait = stepWait(step)

      if (step.kind === 'typing') {
        setIsTyping(true)
        timer = setTimeout(advance, wait)
        return
      }
      if (step.kind === 'pause') {
        setIsTyping(false)
        timer = setTimeout(advance, wait)
        return
      }

      setIsTyping(false)
      const id = ++idRef.current
      const next: Message =
        step.kind === 'user'
          ? { id, kind: 'user', text: step.text }
          : step.kind === 'user-audio'
          ? {
              id,
              kind: 'user-audio',
              durationLabel: step.durationLabel,
              waveform: step.waveform,
            }
          : step.kind === 'ai'
          ? { id, kind: 'ai', text: step.text }
          : {
              id,
              kind: 'ai-chart',
              title: step.title,
              items: step.items,
              total: step.total,
            }
      setMessages((prev) => [...prev, next])
      timer = setTimeout(advance, wait)
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
              {/* Dynamic island */}
              <div
                aria-hidden
                className="absolute left-1/2 top-2 z-20 h-6 w-28 -translate-x-1/2 rounded-full bg-black"
              />

              {/* OS status bar */}
              <div className="absolute inset-x-0 top-0 z-10 flex h-9 items-center justify-between px-6 pt-2 text-[11px] font-semibold tabular-nums text-white">
                <span>11:32</span>
                <span className="flex items-center gap-1.5 text-white">
                  <Signal size={11} strokeWidth={2.5} aria-hidden />
                  <Wifi size={12} strokeWidth={2.5} aria-hidden />
                  <BatteryFull size={16} strokeWidth={2.2} aria-hidden />
                </span>
              </div>

              <div className="flex h-full flex-col pt-9">
                {/* Chat header */}
                <div className="flex items-center gap-2.5 border-b border-white/5 bg-[#1F2C34] px-2.5 py-2">
                  <ArrowLeft
                    size={18}
                    strokeWidth={2}
                    className="shrink-0 text-white/70"
                    aria-hidden
                  />
                  <span
                    aria-hidden
                    className="inline-flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-full bg-[#0F1A20] ring-1 ring-inset ring-white/10"
                  >
                    <PintanaIcon size={22} />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-[13px] font-semibold text-white">
                      Pintana · Asistente
                    </p>
                    <p className="text-[10.5px] text-[#8FA1AC]">en línea</p>
                  </div>
                  <div className="flex items-center gap-3.5 text-white/65">
                    <Video size={16} strokeWidth={1.9} aria-hidden />
                    <Phone size={15} strokeWidth={1.9} aria-hidden />
                    <MoreVertical size={16} strokeWidth={2} aria-hidden />
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
                        <Bubble key={m.id} message={m} reduce={!!reduce} />
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
                <div className="flex items-center gap-2 bg-[#1F2C34] px-2.5 pb-3 pt-2">
                  <div className="flex flex-1 items-center gap-2 rounded-full bg-[#2A3942] px-3 py-2 text-[12.5px] text-white/45">
                    <Smile size={18} strokeWidth={1.9} className="shrink-0" aria-hidden />
                    <span className="flex-1 truncate">Mensaje</span>
                    <Paperclip
                      size={16}
                      strokeWidth={1.9}
                      className="shrink-0 -rotate-45"
                      aria-hidden
                    />
                    <Camera size={16} strokeWidth={1.9} className="shrink-0" aria-hidden />
                  </div>
                  <button
                    type="button"
                    aria-label="Grabar mensaje de voz"
                    className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#00A884] text-white"
                  >
                    <Mic size={16} strokeWidth={2.2} aria-hidden />
                  </button>
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
              Hable con el asistente como con un empleado más. Le manda un audio,
              una foto o un mensaje — entiende los tres y hace cualquier cosa que se
              haga en el sistema.
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
                    <p className="mt-1 max-w-[50ch] text-[14px] leading-[1.6] text-text-2">
                      {desc}
                    </p>
                  </div>
                </li>
              ))}
            </ul>

            <div className="mt-8 overflow-hidden rounded-xl border border-border bg-surface-2/60">
              <div className="flex items-start gap-3 px-4 py-3">
                <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-purple/15 text-purple">
                  <ShieldCheck size={14} strokeWidth={2.2} />
                </span>
                <p className="text-[13px] leading-[1.5] text-text-2">
                  <span className="font-semibold text-text">
                    Confirma antes de mover plata.
                  </span>{' '}
                  Para facturar, cobrar o cargar stock, el asistente le pide el OK
                  primero.
                </p>
              </div>
              <div className="flex items-start gap-3 border-t border-border px-4 py-3">
                <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-purple/15 text-purple">
                  <Smartphone size={14} strokeWidth={2.2} />
                </span>
                <p className="text-[13px] leading-[1.5] text-text-2">
                  <span className="font-semibold text-text">
                    Su WhatsApp de siempre.
                  </span>{' '}
                  Sin app nueva, sin instalar nada — Pintana se agrega como un
                  contacto más.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

function Bubble({ message, reduce }: { message: Message; reduce: boolean }) {
  const isUser = message.kind === 'user' || message.kind === 'user-audio'
  return (
    <motion.div
      layout
      initial={reduce ? false : { opacity: 0, y: 6, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
      className={cn('flex', isUser ? 'justify-end pr-2' : 'justify-start pl-2')}
    >
      <div
        className={cn(
          'relative max-w-[82%] px-2.5 py-1.5 text-white shadow-[0_1px_0_rgba(0,0,0,0.2)]',
          isUser
            ? 'rounded-[8px] rounded-tr-[2px] bg-[#005C4B]'
            : 'rounded-[8px] rounded-tl-[2px] bg-[#1F2C34]'
        )}
      >
        <BubbleTail kind={isUser ? 'sent' : 'received'} />
        {message.kind === 'user' || message.kind === 'ai' ? (
          <p className="whitespace-pre-wrap break-words pr-12 text-[13px] leading-snug">
            {message.text}
          </p>
        ) : message.kind === 'user-audio' ? (
          <AudioBlock durationLabel={message.durationLabel} waveform={message.waveform} />
        ) : (
          <ChartBlock
            title={message.title}
            items={message.items}
            total={message.total}
            reduce={reduce}
          />
        )}
        <BubbleMeta isUser={isUser} />
      </div>
    </motion.div>
  )
}

function BubbleTail({ kind }: { kind: 'sent' | 'received' }) {
  if (kind === 'sent') {
    return (
      <svg
        aria-hidden
        width="9"
        height="13"
        viewBox="0 0 9 13"
        className="absolute -right-[7px] top-0 drop-shadow-[0_1px_0_rgba(0,0,0,0.2)]"
      >
        <path
          d="M0 0 C1 4 4 7 9 9 L 9 0 Z"
          fill="#005C4B"
        />
      </svg>
    )
  }
  return (
    <svg
      aria-hidden
      width="9"
      height="13"
      viewBox="0 0 9 13"
      className="absolute -left-[7px] top-0 drop-shadow-[0_1px_0_rgba(0,0,0,0.2)]"
    >
      <path
        d="M9 0 C8 4 5 7 0 9 L 0 0 Z"
        fill="#1F2C34"
      />
    </svg>
  )
}

function BubbleMeta({ isUser }: { isUser: boolean }) {
  return (
    <div className="-mb-0.5 -mt-0.5 flex items-center justify-end gap-1 text-[9.5px] text-white/55">
      <span className="tabular-nums">11:32</span>
      {isUser && <CheckCheck size={12} className="text-[#53BDEB]" aria-hidden />}
    </div>
  )
}

function AudioBlock({
  durationLabel,
  waveform,
}: {
  durationLabel: string
  waveform: number[]
}) {
  return (
    <div className="flex min-w-[225px] items-center gap-2 py-0.5">
      <span
        aria-hidden
        className="relative inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white text-[#005C4B]"
      >
        <Play size={13} fill="currentColor" strokeWidth={0} className="translate-x-[1px]" />
      </span>
      <div className="flex flex-1 flex-col gap-1">
        <div className="flex h-6 items-center gap-[1.8px]">
          {waveform.map((h, i) => (
            <span
              key={i}
              className={cn(
                'block w-[2px] rounded-full',
                i < 6 ? 'bg-white/95' : 'bg-white/40'
              )}
              style={{ height: `${Math.max(12, h)}%` }}
            />
          ))}
        </div>
        <span className="text-[10px] tabular-nums text-white/60">{durationLabel}</span>
      </div>
      <span
        aria-hidden
        className="ml-1 flex h-5 w-5 shrink-0 items-center justify-center text-white/55"
      >
        <Mic size={12} strokeWidth={2.2} />
      </span>
    </div>
  )
}

function ChartBlock({
  title,
  items,
  total,
  reduce,
}: {
  title: string
  items: ChartItem[]
  total: string
  reduce: boolean
}) {
  return (
    <div className="min-w-[240px] space-y-1.5">
      <p className="text-[11.5px] font-semibold text-white">{title}</p>
      <ul className="space-y-1.5 pt-1">
        {items.map((it, i) => {
          const swatch = COLOR_SWATCHES[it.label]
          return (
            <li
              key={it.label}
              className="flex items-center gap-2 text-[11px] text-white/85"
            >
              <span
                aria-hidden
                className="block h-3 w-3 shrink-0 rounded-[3px] ring-1 ring-inset ring-white/20"
                style={{ backgroundColor: swatch ?? '#9CA3AF' }}
              />
              <span className="w-14 shrink-0 truncate">{it.label}</span>
              <span className="relative h-2 flex-1 overflow-hidden rounded-full bg-white/10">
                <motion.span
                  initial={reduce ? false : { width: 0 }}
                  animate={{ width: `${it.pct}%` }}
                  transition={{
                    duration: 0.6,
                    ease: [0.16, 1, 0.3, 1],
                    delay: 0.05 + i * 0.06,
                  }}
                  className="block h-full rounded-full bg-[#00A884]"
                />
              </span>
              <span className="w-8 shrink-0 text-right tabular-nums text-white/60">
                {it.pct}%
              </span>
            </li>
          )
        })}
      </ul>
      <p className="pt-1 text-[10.5px] text-white/55">{total}</p>
    </div>
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
