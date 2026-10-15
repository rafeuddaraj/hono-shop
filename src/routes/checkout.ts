import { Hono } from 'hono'
import { HTTPException } from 'hono/http-exception'
import { z } from 'zod'
import { validate } from '../lib/validate.js'
import { createCheckoutSession } from '../lib/stripe.js'
import { orders } from '../store/orders.js'

const checkoutSchema = z.object({
  orderId: z.string(),
})

const app = new Hono()

app.post('/', validate('json', checkoutSchema), async (c) => {
  const { orderId } = c.req.valid('json')
  const order = orders.get(orderId)
  if (!order) {
    throw new HTTPException(404, { message: 'Order not found' })
  }
  if (order.status !== 'pending') {
    throw new HTTPException(409, { message: 'Order is already paid' })
  }

  const session = await createCheckoutSession(order)
  return c.json({ url: session.url })
})

export default app
