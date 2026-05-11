import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'node:path'
import { handleContact } from './api/_handler'

export default defineConfig({
  plugins: [
    react(),
    {
      name: 'dev-contact-api',
      configureServer(server) {
        server.middlewares.use('/api/contact', async (req, res, next) => {
          if (req.method !== 'POST') return next()
          try {
            const chunks: Buffer[] = []
            for await (const chunk of req) chunks.push(chunk as Buffer)
            const raw = Buffer.concat(chunks).toString('utf-8')
            const body = raw ? JSON.parse(raw) : {}
            const ip =
              (req.headers['x-forwarded-for'] as string | undefined)
                ?.split(',')[0]
                ?.trim() ||
              (req.headers['x-real-ip'] as string | undefined) ||
              req.socket.remoteAddress ||
              'unknown'
            const result = await handleContact({ body, ip })
            res.setHeader('content-type', 'application/json')
            res.statusCode = result.status
            res.end(JSON.stringify(result.body))
          } catch {
            res.statusCode = 500
            res.setHeader('content-type', 'application/json')
            res.end(JSON.stringify({ error: 'Internal error' }))
          }
        })
      },
    },
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  server: {
    port: 3000,
  },
})
