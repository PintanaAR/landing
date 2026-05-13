import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'node:fs'
import path from 'node:path'
import { handleContact } from './api/_handler'

const IMAGE_MIME: Record<string, string> = {
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
}

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
    {
      // Dev-only: serve files from <root>/design-references/ under the URL
      // /design-references/*. Used by /dev/compare to load reference images.
      // Production builds never include this middleware.
      name: 'dev-design-references',
      apply: 'serve',
      configureServer(server) {
        const root = path.resolve(__dirname, 'design-references')
        server.middlewares.use('/design-references', (req, res, next) => {
          if (req.method !== 'GET' && req.method !== 'HEAD') return next()
          const url = (req.url || '').split('?')[0]
          const decoded = decodeURIComponent(url)
          const resolved = path.normalize(path.join(root, decoded))
          // Block path traversal outside design-references/.
          if (!resolved.startsWith(root + path.sep) && resolved !== root) {
            res.statusCode = 403
            return res.end('Forbidden')
          }
          fs.stat(resolved, (err, stat) => {
            if (err || !stat.isFile()) {
              res.statusCode = 404
              return res.end('Not found')
            }
            const ext = path.extname(resolved).toLowerCase()
            const mime = IMAGE_MIME[ext] || 'application/octet-stream'
            res.setHeader('content-type', mime)
            res.setHeader('cache-control', 'no-cache')
            fs.createReadStream(resolved).pipe(res)
          })
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
