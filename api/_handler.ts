import { contactSchema } from '../src/lib/validations'

const buckets = new Map<string, { count: number; reset: number }>()
const LIMIT = 3
const WINDOW_MS = 60 * 60 * 1000

function rateLimit(ip: string) {
  const now = Date.now()
  const b = buckets.get(ip)
  if (!b || now > b.reset) {
    buckets.set(ip, { count: 1, reset: now + WINDOW_MS })
    return true
  }
  if (b.count >= LIMIT) return false
  b.count += 1
  return true
}

export type ContactResult = {
  status: number
  body: Record<string, unknown>
}

export async function handleContact({
  body,
  ip,
}: {
  body: unknown
  ip: string
}): Promise<ContactResult> {
  if (!rateLimit(ip)) {
    return {
      status: 429,
      body: { error: 'Demasiados envíos. Intente nuevamente en una hora.' },
    }
  }

  const parsed = contactSchema.safeParse(body)
  if (!parsed.success) {
    return {
      status: 400,
      body: { error: 'Datos inválidos', issues: parsed.error.flatten() },
    }
  }

  console.log('[contact] new lead', parsed.data)
  return { status: 200, body: { success: true } }
}
