import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { serveStatic } from '@hono/node-server/serve-static'
import { logger } from 'hono/logger'
import { cors } from 'hono/cors'
import { secureHeaders } from 'hono/secure-headers'
import { requestId } from 'hono/request-id'
import { HTTPException } from 'hono/http-exception'
import { timing } from './middleware/timing.js'
import products from './routes/products.js'
import orders from './routes/orders.js'
import checkout from './routes/checkout.js'
import pages from './routes/pages.js'
import webhook from './routes/webhook.js'

const app = new Hono()

app.use(logger())
app.use(timing)
app.use(requestId())
app.use(secureHeaders())
app.use('/api/*', cors())
app.use('/public/*', serveStatic({ root: './' }))

const api = new Hono().basePath('/api')
api.route('/products', products)
api.route('/orders', orders)
api.route('/checkout', checkout)

app.route('/', api)
app.route('/webhook', webhook)
app.route('/', pages)

app.notFound((c) => {
  return c.json({ error: { message: `Not found: ${c.req.path}`, requestId: c.get('requestId') } }, 404)
})

app.onError((err, c) => {
  if (err instanceof HTTPException) {
    return c.json({ error: { message: err.message, requestId: c.get('requestId') } }, err.status)
  }
  console.error(err)
  return c.json({ error: { message: 'Something went wrong', requestId: c.get('requestId') } }, 500)
})

const port = Number(process.env.PORT ?? 3000)

serve({ fetch: app.fetch, port }, (info) => {
  console.log(`Server is running on http://localhost:${info.port}`)
})
