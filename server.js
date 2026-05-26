import cron from 'node-cron'
import { createServer } from 'node:http'
import { readFile, stat } from 'node:fs/promises'
import { extname, join, normalize, resolve, sep } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = fileURLToPath(new URL('.', import.meta.url))
const distDir = resolve(__dirname, 'dist')
const port = Number(process.env.PORT) || 4173
const host = '0.0.0.0'

const mimeTypes = {
  '.css': 'text/css; charset=utf-8',
  '.gif': 'image/gif',
  '.html': 'text/html; charset=utf-8',
  '.ico': 'image/x-icon',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.ttf': 'font/ttf',
  '.webp': 'image/webp',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
}

function isInsideDist(filePath) {
  const relativePath = normalize(filePath).replace(distDir, '')
  return relativePath === '' || relativePath.startsWith(sep)
}

async function sendFile(response, filePath) {
  const file = await readFile(filePath)
  response.writeHead(200, {
    'Cache-Control': filePath.endsWith('index.html')
      ? 'no-cache'
      : 'public, max-age=31536000, immutable',
    'Content-Type': mimeTypes[extname(filePath)] || 'application/octet-stream',
  })
  response.end(file)
}

const server = createServer(async (request, response) => {
  try {
    const url = new URL(request.url || '/', `http://${request.headers.host}`)

    if (url.pathname === '/health') {
      response.writeHead(200, { 'Content-Type': 'application/json' })
      response.end(JSON.stringify({ ok: true }))
      return
    }

    const requestedPath = resolve(join(distDir, decodeURIComponent(url.pathname)))
    const indexPath = join(distDir, 'index.html')

    if (!isInsideDist(requestedPath)) {
      response.writeHead(403)
      response.end('Forbidden')
      return
    }

    try {
      const fileStat = await stat(requestedPath)
      await sendFile(response, fileStat.isDirectory() ? indexPath : requestedPath)
    } catch {
      await sendFile(response, indexPath)
    }
  } catch (error) {
    console.error(error)
    response.writeHead(500)
    response.end('Server error')
  }
})

server.listen(port, host, () => {
  console.log(`Server listening on http://${host}:${port}`)
})

cron.schedule('*/10 * * * *', async () => {
  const keepAliveUrl =
    process.env.KEEP_ALIVE_URL ||
    process.env.RENDER_EXTERNAL_URL ||
    `http://localhost:${port}/health`

  try {
    const response = await fetch(keepAliveUrl)
    console.log(`Keep-alive ping ${keepAliveUrl}: ${response.status}`)
  } catch (error) {
    console.warn(`Keep-alive ping failed: ${error.message}`)
  }
})
