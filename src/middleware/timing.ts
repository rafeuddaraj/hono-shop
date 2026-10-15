import { createMiddleware } from 'hono/factory'

export const timing = createMiddleware(async (c, next) => {
  const start = performance.now()
  await next()
  const ms = (performance.now() - start).toFixed(1)
  c.header('X-Response-Time', `${ms}ms`)
})
