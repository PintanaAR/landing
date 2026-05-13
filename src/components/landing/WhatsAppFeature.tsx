import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import {
  Mic,
  BarChart3,
  BellRing,
  Smartphone,
  ShieldCheck,
  Phone,
  Video,
  CheckCheck,
  Play,
  ArrowLeft,
  Camera,
  Signal,
  Wifi,
  BatteryFull,
  Plus,
  Sticker,
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

const WALLPAPER_DOODLES =
  "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200' viewBox='0 0 200 200'><g fill='none' stroke='%23ffffff' stroke-width='1.1' stroke-linecap='round' stroke-linejoin='round' opacity='0.06'><path d='M24 32c5-4 12-4 17 0'/><path d='M150 24l7 7m0-7l-7 7'/><circle cx='92' cy='52' r='3.5'/><path d='M52 84c0 5 4 9 9 9s9-4 9-9'/><path d='M125 92l-5 5 5 5 5-5z'/><path d='M26 142c7 2 13 2 20-2'/><path d='M166 148c0 7-5 12-12 12'/><circle cx='75' cy='168' r='2.5'/><path d='M125 168c3-3 8-3 12 0'/><path d='M184 66c-3 0-7 3-7 7'/><path d='M8 108l5-2 3 5'/><path d='M104 126l-3-6 6-3 3 6z'/><path d='M58 50h5m-2.5-2.5v5'/></g></svg>\")"

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
    title: 'Audio, foto o texto',
    desc:
      'Mandale un audio desde el mostrador, una foto del remito o un mensaje. Entiende los tres.',
  },
  {
    icon: BarChart3,
    title: 'Te contesta con números',
    desc:
      '"¿Qué color vendí más?" "¿Quién me debe?" "Comparame con el mes pasado." Datos concretos, no teoría.',
  },
  {
    icon: BellRing,
    title: 'Avisa antes que pase',
    desc:
      'Stock bajo, cliente atrasado, factura por reenviar — lo nota primero y te avisa con la acción ya armada.',
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
      className="relative overflow-hidden bg-surface-1 py-24 md:py-32"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-border-2 to-transparent"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute left-[50%] top-[10%] h-[520px] w-[820px] -translate-x-1/2 bg-[radial-gradient(ellipse,rgba(0,168,132,0.05)_0%,transparent_70%)]"
      />

      <div className="container-page">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[440px_1fr] lg:gap-16">
          {/* Phone mockup */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="theme-dark mx-auto w-full max-w-[360px]"
          >
            <div
              className="relative mx-auto aspect-[9/19] overflow-hidden rounded-[44px] border border-white/10 bg-[#0B141A]"
              style={{
                boxShadow:
                  '0 0 0 1px rgba(255,255,255,0.04), 0 40px 90px rgba(0,0,0,0.7)',
              }}
            >
              {/* Dynamic island */}
              <div
                aria-hidden
                className="absolute left-1/2 top-2 z-20 h-6 w-28 -translate-x-1/2 rounded-full bg-black"
              />

              {/* OS status bar */}
              <div className="absolute inset-x-0 top-0 z-20 flex h-11 items-center justify-between px-6 pt-3 text-[15px] font-semibold tabular-nums text-white">
                <span className="leading-none">11:32</span>
                <span className="flex items-center gap-1.5">
                  <Signal size={13} strokeWidth={2.5} aria-hidden />
                  <Wifi size={14} strokeWidth={2.5} aria-hidden />
                  <BatteryFull size={18} strokeWidth={2.2} aria-hidden />
                </span>
              </div>

              <div className="flex h-full flex-col pt-11">
                {/* Chat header */}
                <div className="relative z-10 flex items-center gap-3 border-b border-white/5 bg-[#1F2C33]/85 px-3 py-2 backdrop-blur-xl shadow-[0_1px_3px_rgba(0,0,0,0.3)]">
                  <ArrowLeft
                    size={20}
                    strokeWidth={2}
                    className="shrink-0 text-white/75"
                    aria-hidden
                  />
                  <span
                    aria-hidden
                    className="inline-flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-full bg-[#111B21] ring-1 ring-inset ring-white/10"
                  >
                    <PintanaIcon size={24} />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-[14.5px] font-medium leading-tight text-[#E9EDEF]">
                      Pintana · Asistente
                    </p>
                    <p className="mt-0.5 text-[11px] font-normal leading-tight text-[#8696A0]">
                      en línea
                    </p>
                  </div>
                  <div className="flex items-center gap-[18px] pl-1 text-white/90">
                    <Video size={22} strokeWidth={1.8} aria-hidden />
                    <Phone size={22} strokeWidth={1.8} aria-hidden />
                  </div>
                </div>

                {/* Chat body */}
                <div
                  ref={chatRef}
                  className="flex-1 overflow-y-auto bg-[#0B141A] px-1.5 py-3"
                  style={{
                    backgroundImage: WALLPAPER_DOODLES,
                    backgroundSize: '200px 200px',
                    backgroundRepeat: 'repeat',
                  }}
                >
                  <p className="mx-auto mb-3 w-fit rounded-[7.5px] bg-[#1D282F] px-3 py-1 text-[11px] font-medium uppercase tracking-wider text-[#8696A0] shadow-[0_1px_0.5px_rgba(0,0,0,0.18)]">
                    HOY
                  </p>
                  <div className="space-y-[3px]">
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
                          className="relative ml-1.5 inline-flex max-w-[80%] items-center gap-[3px] rounded-[7.5px] rounded-tl-[2px] bg-[#202C33] px-2.5 py-2 shadow-[0_1px_0.5px_rgba(0,0,0,0.2)]"
                        >
                          <BubbleTail kind="received" />
                          <TypingDot delay={0} />
                          <TypingDot delay={160} />
                          <TypingDot delay={320} />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>

                {/* Input bar */}
                <div className="flex items-center gap-3 bg-[#0B141A] px-2 pb-3 pt-1.5">
                  <Plus
                    size={24}
                    strokeWidth={1.8}
                    className="shrink-0 text-white/85"
                    aria-hidden
                  />
                  <div className="flex flex-1 items-center gap-3 rounded-full bg-[#1F2C33] px-3 py-[9px]">
                    <span className="flex-1" aria-hidden />
                    <Sticker
                      size={20}
                      strokeWidth={1.8}
                      className="shrink-0 text-white/85"
                      aria-hidden
                    />
                    <Camera
                      size={20}
                      strokeWidth={1.8}
                      className="shrink-0 text-white/85"
                      aria-hidden
                    />
                    <Mic
                      size={20}
                      strokeWidth={1.8}
                      className="shrink-0 text-white/85"
                      aria-hidden
                    />
                  </div>
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
            <span className="overline text-sage">Asistente WhatsApp</span>
            <h2
              className="mt-3 max-w-[18ch] font-display font-extrabold leading-[1.02] tracking-[-0.035em] text-text"
              style={{ fontSize: 'clamp(36px, 4.5vw, 56px)' }}
            >
              Si sabés usar WhatsApp, sabés usar Pintana.
            </h2>
            <p className="mt-5 max-w-[54ch] text-[17px] leading-[1.65] text-text-2">
              Otros sistemas te obligan a aprender pantallas nuevas.{' '}
              <span className="font-semibold text-text">
                Pintana te entiende como WhatsApp
              </span>
              {' '}— por audio, foto o texto, como le hablás a un empleado.
            </p>

            <ul className="mt-8 space-y-5">
              {features.map(({ icon: Icon, title, desc }) => (
                <li key={title} className="flex gap-4">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-border bg-surface-2 text-text-2">
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
                <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-md border border-border bg-surface-1 text-text-2">
                  <ShieldCheck size={14} strokeWidth={2.2} />
                </span>
                <p className="text-[13px] leading-[1.5] text-text-2">
                  <span className="font-semibold text-text">
                    Confirma antes de mover plata.
                  </span>{' '}
                  Para facturar, cobrar o cargar stock, el asistente te pide el OK
                  primero.
                </p>
              </div>
              <div className="flex items-start gap-3 border-t border-border px-4 py-3">
                <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-md border border-border bg-surface-1 text-text-2">
                  <Smartphone size={14} strokeWidth={2.2} />
                </span>
                <p className="text-[13px] leading-[1.5] text-text-2">
                  <span className="font-semibold text-text">
                    Tu WhatsApp de siempre.
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
  const isText = message.kind === 'user' || message.kind === 'ai'
  return (
    <motion.div
      layout
      initial={reduce ? false : { opacity: 0, y: 6, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
      className={cn('flex', isUser ? 'justify-end pr-1.5' : 'justify-start pl-1.5')}
    >
      <div
        className={cn(
          'relative max-w-[78%] text-[#E9EDEF] shadow-[0_1px_0.5px_rgba(0,0,0,0.2)]',
          // WhatsApp bubbles are barely rounded — 7.5px on most corners,
          // with the corner adjacent to the tail squared off to 2px.
          'rounded-[7.5px]',
          isUser
            ? 'rounded-tr-[2px] bg-[#005C4B]'
            : 'rounded-tl-[2px] bg-[#202C33]'
        )}
      >
        <BubbleTail kind={isUser ? 'sent' : 'received'} />
        {isText && (
          <p className="whitespace-pre-wrap break-words px-2.5 pb-[6px] pt-[6px] text-[13.5px] leading-[1.34]">
            {message.kind === 'user' || message.kind === 'ai' ? message.text : ''}
            <span
              aria-hidden
              className="inline-block align-text-bottom"
              style={{ width: isUser ? 68 : 44, height: 10 }}
            />
          </p>
        )}
        {message.kind === 'user-audio' && (
          <div className="px-2 pb-[20px] pt-2">
            <AudioBlock
              durationLabel={message.durationLabel}
              waveform={message.waveform}
            />
          </div>
        )}
        {message.kind === 'ai-chart' && (
          <div className="px-2.5 pb-[20px] pt-2">
            <ChartBlock
              title={message.title}
              items={message.items}
              total={message.total}
              reduce={reduce}
            />
          </div>
        )}
        <BubbleMeta isUser={isUser} />
      </div>
    </motion.div>
  )
}

function BubbleMeta({ isUser }: { isUser: boolean }) {
  return (
    <span className="pointer-events-none absolute bottom-[4px] right-[8px] inline-flex items-center gap-1 text-[11px] font-normal leading-none text-white/60">
      <span className="tabular-nums">11:32</span>
      {isUser && (
        <CheckCheck
          size={15}
          strokeWidth={2.2}
          className="-mr-0.5 text-[#53BDEB]"
          aria-hidden
        />
      )}
    </span>
  )
}

// Tails attach to the TOP corner of each bubble, matching real WhatsApp.
// Received bubble: tail on the upper-left. Sent bubble: tail on the upper-right.
// The shape is a thin pointer that flares into the bubble fill.
function BubbleTail({ kind }: { kind: 'sent' | 'received' }) {
  if (kind === 'sent') {
    return (
      <svg
        aria-hidden
        width="8"
        height="13"
        viewBox="0 0 8 13"
        className="absolute -right-[7px] top-0"
      >
        <path d="M0 0 L 8 0 L 0 8 Z" fill="#005C4B" />
      </svg>
    )
  }
  return (
    <svg
      aria-hidden
      width="8"
      height="13"
      viewBox="0 0 8 13"
      className="absolute -left-[7px] top-0"
    >
      <path d="M0 0 L 8 0 L 8 8 Z" fill="#202C33" />
    </svg>
  )
}

function AudioBlock({
  durationLabel,
  waveform,
}: {
  durationLabel: string
  waveform: number[]
}) {
  const played = 6
  const progressPct = (played / waveform.length) * 100
  return (
    <div className="flex min-w-[228px] items-center gap-2.5 py-0.5">
      {/* Play button — circular pill with subtle surface, matches real
          WhatsApp sent audio. translate-x adjusts for the visual weight of
          the play triangle. */}
      <button
        type="button"
        aria-hidden
        tabIndex={-1}
        className="flex h-[30px] w-[30px] shrink-0 items-center justify-center rounded-full bg-white/10 text-white/95"
      >
        <Play
          size={14}
          fill="currentColor"
          strokeWidth={0}
          className="translate-x-[1px]"
        />
      </button>
      <div className="min-w-0 flex-1">
        <div className="relative flex h-6 items-center gap-[3px]">
          {waveform.map((h, i) => (
            <span
              key={i}
              className={cn(
                'block w-[2.5px] rounded-full',
                i < played ? 'bg-white/95' : 'bg-white/35',
              )}
              style={{ height: `${Math.max(22, h)}%` }}
            />
          ))}
          <span
            aria-hidden
            className="absolute top-1/2 h-[14px] w-[14px] -translate-y-1/2 rounded-full bg-white shadow-[0_1px_3px_rgba(0,0,0,0.45)]"
            style={{ left: `calc(${progressPct}% - 7px)` }}
          />
        </div>
        <div className="mt-1 flex items-center justify-between gap-2">
          <span className="inline-flex items-center gap-1 text-[11px] tabular-nums text-white/60">
            <Mic
              size={11}
              strokeWidth={2.4}
              className="text-[#00A884]"
              aria-hidden
            />
            {durationLabel}
          </span>
          {/* Playback speed — appears once the listener taps play. We
              snapshot the audio mid-listen, so the badge is visible. */}
          <span className="rounded-full bg-white/10 px-1.5 py-[1px] text-[10px] font-semibold tabular-nums text-white/80">
            1×
          </span>
        </div>
      </div>
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
    <div className="min-w-[244px] space-y-1.5">
      <p className="text-[12px] font-semibold text-white">{title}</p>
      <ul className="space-y-1.5 pt-0.5">
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
              <span className="relative h-1.5 flex-1 overflow-hidden rounded-full bg-white/10">
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
      className="inline-block h-2 w-2 rounded-full bg-white/50"
      style={{
        animation: `typing-bounce 1.2s ease-in-out ${delay}ms infinite`,
      }}
    />
  )
}
