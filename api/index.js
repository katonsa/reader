import build from '../app.js'

export default async function handler(req, reply) {
  const app = build({logger: false})
  await app.ready()
  app.server.emit('request', req, reply)
}
