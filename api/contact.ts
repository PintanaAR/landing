import type { VercelRequest, VercelResponse } from '@vercel/node'
import { handleContact } from './_handler'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }
  const ip =
    (req.headers['x-forwarded-for'] as string | undefined)
      ?.split(',')[0]
      ?.trim() ||
    (req.headers['x-real-ip'] as string | undefined) ||
    'unknown'
  const result = await handleContact({ body: req.body, ip })
  return res.status(result.status).json(result.body)
}
