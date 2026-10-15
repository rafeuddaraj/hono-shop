import { Hono } from 'hono'
import { HTTPException } from 'hono/http-exception'
import { z } from 'zod'
import { validate } from '../lib/validate.js'
import { orders, createOrder } from '../store/orders.js'

const createOrderSchema = z.object({
  productId: z.string(),
  quantity: z.number().int().min(1).max(10),
})

const app = new Hono()

app.post('/', validate('json', createOrderSchema), (c) => {
  const { productId, quantity } = c.req.valid('json')
  const order = createOrder(productId, quantity)
  return c.json(order, 201)
})

app.get('/:id', (c) => {
  const order = orders.get(c.req.param('id'))
  if (!order) {
    throw new HTTPException(404, { message: 'Order not found' })
  }
  return c.json(order)
})

export default app
