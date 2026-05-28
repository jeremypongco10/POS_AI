import { createServer } from 'vite'

const server = await createServer({
  server: {
    host: '127.0.0.1',
    port: Number(process.env.PORT ?? 5173),
  },
})

await server.listen()
server.printUrls()

process.on('SIGINT', async () => {
  await server.close()
  process.exit(0)
})

setInterval(() => {}, 1 << 30)
